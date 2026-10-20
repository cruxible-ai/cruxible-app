import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useApiClient } from "./DataSourceContext";
import { unwrap } from "./data-source";
import {
  claimReadBatchBody,
  getBatchBody,
  getBody,
  GET_BATCH_MAX,
  HISTORY_PAGE,
  GRAPH_PAGE,
  INCOMING_PAGE,
  LANDING_TRIGGERS_QUERY,
  LEDGER_PAGE,
  LINE_RUNS_PAGE,
  CLAIM_READ_BATCH_MAX,
  headQuery,
  inboxQuery,
  nextBody,
  orientQuery,
  proposalsQuery,
  queryBody,
  readingsBody,
  reviewBody,
  type QueryArgs,
} from "./requests";
import type {
  Schemas,
  AcceptedCoordinate,
  ClaimViewRecord,
  GetDetail,
  GetResult,
  Head,
  InboxStatus,
  OrientResult,
  OrientSection,
  ProposalStatus,
} from "./schemas";
import { useAtParam } from "@/lib/at";
import { walkNeighborhood, type IncomingReader } from "@/lib/neighborhood";

/**
 * Read hooks over the playbill daemon. Every state read is pinned to one
 * accepted coordinate: the page's `?at=` (or the head) is resolved once with
 * GET /head, and each read carries that full coordinate, so one page never
 * mixes generations and every cache entry is keyed on the generation it read.
 * Without `?at=` the head is polled; when it moves, the coordinate (and every
 * key) moves with it.
 */

/** Instance id from the /i/:instanceId route segment. */
export function useInstanceId(): string {
  const { instanceId } = useParams();
  if (!instanceId) throw new Error("Route is missing :instanceId");
  return instanceId;
}

const HEAD_POLL_MS = 30_000;
/** Pages fetched at most when following an orient section's cursor. */
const MAX_SECTION_PAGES = 20;
/** Largest orient page (the route's cap). */
export const ORIENT_PAGE = 500;

/** The accepted head, or the generation `at` names (immutable once resolved). */
export function useHead(at: string | null = null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["head", instanceId, at],
    staleTime: at === null ? 15_000 : Infinity,
    refetchInterval: at === null ? HEAD_POLL_MS : false,
    queryFn: async (): Promise<Head> =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/head", {
          params: { path: { instance_id: instanceId }, query: headQuery(at) },
        }),
      ),
  });
}

/** The coordinate this page reads at: `?at=` when pinned, else the head. */
export function usePin() {
  const at = useAtParam();
  const head = useHead(at);
  return { at, head, coordinate: head.data?.coordinate, generation: head.data?.generation };
}

/**
 * A query pinned to the page coordinate; waits for it and keys on its git
 * oid. When the pin itself is refused (an `at` naming no accepted
 * generation), the query fails with that refusal instead of waiting forever.
 */
function usePinnedQuery<T>(
  name: string,
  args: readonly unknown[],
  fetch: (coordinate: AcceptedCoordinate) => Promise<T>,
  enabled = true,
) {
  const instanceId = useInstanceId();
  const { at, coordinate, head } = usePin();
  const pinError = coordinate === undefined ? head.error : null;
  return useQuery({
    queryKey: [name, instanceId, coordinate?.git_oid ?? (pinError ? `refused:${at}` : null), ...args],
    enabled: enabled && (coordinate !== undefined || pinError !== null),
    staleTime: 60_000,
    ...(pinError ? { retry: false } : {}),
    queryFn: () => {
      if (coordinate === undefined) throw pinError;
      return fetch(coordinate);
    },
  });
}

function useOrientFetch() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return async (
    coordinate: AcceptedCoordinate,
    extra: { section?: OrientSection; kind?: string; limit?: number; cursor?: string },
  ): Promise<OrientResult> =>
    unwrap(
      await client.GET("/api/v1/{instance_id}/orient", {
        params: {
          path: { instance_id: instanceId },
          query: orientQuery({ coordinate, ...extra }),
        },
      }),
    );
}

/** The orient map's first page: kinds with counts, artifact counts, attention, floor, you. */
export function useOrient() {
  const orient = useOrientFetch();
  return usePinnedQuery("orient", [ORIENT_PAGE], (coordinate) =>
    orient(coordinate, { limit: ORIENT_PAGE }),
  );
}

/**
 * Every Subject kind: the orient first page plus its continuation pages
 * (continuations carry kinds only). Kits rarely exceed one 500-row page.
 */
export function useOrientKinds() {
  const first = useOrient();
  const orient = useOrientFetch();
  const cursor = first.data?.next_cursor ?? null;
  const rest = usePinnedQuery(
    "orient-kinds-rest",
    [cursor],
    async (coordinate) => {
      const kinds = [];
      let next: string | null = cursor;
      for (let page = 0; next !== null && page < MAX_SECTION_PAGES; page += 1) {
        const result = await orient(coordinate, { limit: ORIENT_PAGE, cursor: next });
        kinds.push(...(result.kinds ?? []));
        next = result.next_cursor ?? null;
      }
      return { kinds, truncated: next !== null };
    },
    cursor !== null,
  );
  const pending = first.isPending || (cursor !== null && rest.isPending);
  return {
    isPending: pending,
    error: first.error ?? rest.error,
    data:
      first.data && !pending
        ? {
            kinds: [...(first.data.kinds ?? []), ...(rest.data?.kinds ?? [])],
            truncated: rest.data?.truncated ?? false,
          }
        : undefined,
  };
}

/** All rows of one paged orient section, following next_cursor. */
function useOrientSectionAll<
  K extends "claim_types" | "subject_kinds" | "lines" | "mandates" | "capture_contracts" | "pins",
>(
  section: K,
  enabled = true,
) {
  const orient = useOrientFetch();
  return usePinnedQuery(`orient-section-${section}`, [], async (coordinate) => {
    const rows: NonNullable<OrientResult[K]>[number][] = [];
    let cursor: string | undefined;
    for (let page = 0; page < MAX_SECTION_PAGES; page += 1) {
      const result = await orient(coordinate, {
        section,
        limit: ORIENT_PAGE,
        ...(cursor !== undefined ? { cursor } : {}),
      });
      rows.push(...((result[section] ?? []) as NonNullable<OrientResult[K]>));
      if (!result.next_cursor) return { rows, truncated: false };
      cursor = result.next_cursor;
    }
    return { rows, truncated: true };
  }, enabled);
}

/** Every ClaimType with cardinality, value type, evidence and staleness rules. */
export function useClaimTypes(enabled = true) {
  return useOrientSectionAll("claim_types", enabled);
}

/** Every SubjectKind's identity rule. */
export function useSubjectKinds(enabled = true) {
  return useOrientSectionAll("subject_kinds", enabled);
}

/** Every Line (lifecycle, procedure, authority, trigger, enablement). */
export function useLines(enabled = true) {
  return useOrientSectionAll("lines", enabled);
}

/** Every Mandate (procedure, grants, state, expiry). */
export function useMandates(enabled = true) {
  return useOrientSectionAll("mandates", enabled);
}

/** Every CaptureContract with grade and how many ClaimTypes admit it (ontology-sized). */
export function useCaptureContracts(enabled = true) {
  return useOrientSectionAll("capture_contracts", enabled);
}

/**
 * The required pins of every live definition (orient section=pins): who pins
 * a contract, a ClaimType, a Procedure. Ontology-sized (never a Claim's or a
 * Subject's pins); the gate world has about 650 over two pages.
 */
export function usePins(enabled = true) {
  return useOrientSectionAll("pins", enabled);
}

/**
 * The capture-landing Triggers with the contract each fires on and its target
 * (query kind=Trigger; the schedule detail is read per landing Trigger only).
 */
export function useLandingTriggers() {
  return useStateQuery(LANDING_TRIGGERS_QUERY);
}

/** One kind's detail: incoming predicates and sample Subject ids. */
export function useOrientKind(kind: string | null) {
  const orient = useOrientFetch();
  return usePinnedQuery(
    "orient-kind",
    [kind],
    (coordinate) => orient(coordinate, { kind: kind! }),
    kind !== null,
  );
}

/** Installed kits (head-only: GET /kits takes no coordinate). */
export function useKits() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["kits", instanceId],
    staleTime: 5 * 60_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/kits", {
          params: { path: { instance_id: instanceId } },
        }),
      ),
  });
}

/** One reference read (any ref form get accepts) at the page coordinate. */
export function useGet(
  ref: string | null,
  detail: GetDetail = "summary",
  page: { limit?: number; cursor?: string } = {},
) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "get",
    [ref, detail, page.limit ?? null, page.cursor ?? null],
    async (coordinate): Promise<GetResult> =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/get", {
          params: { path: { instance_id: instanceId } },
          body: getBody({ ref: ref!, coordinate, detail, ...page }),
        }),
      ),
    ref !== null && ref !== "",
  );
}

/**
 * Summary cards for many refs, 64 per call, all at the page coordinate (the
 * route also pins every ref to the first result's coordinate). Results keep
 * the order of `refs`.
 */
export function useGetBatch(refs: string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  const chunks: string[][] = [];
  for (let i = 0; i < refs.length; i += GET_BATCH_MAX) chunks.push(refs.slice(i, i + GET_BATCH_MAX));
  return useQueries({
    queries: chunks.map((chunk) => ({
      queryKey: ["get-batch", instanceId, coordinate?.git_oid ?? null, chunk],
      enabled: coordinate !== undefined,
      staleTime: 60_000,
      queryFn: async () =>
        unwrap(
          await client.POST("/api/v1/{instance_id}/get-batch", {
            params: { path: { instance_id: instanceId } },
            body: getBatchBody(chunk, coordinate!),
          }),
        ),
    })),
    combine: (results) => ({
      isPending: results.some((r) => r.isPending),
      error: results.find((r) => r.error)?.error ?? null,
      results: results.flatMap((r) => r.data?.results ?? []),
    }),
  });
}

/** One compact/spec/name query page at the page coordinate. */
export function useStateQuery(args: QueryArgs | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "query",
    [args],
    async (coordinate) =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/query", {
          params: { path: { instance_id: instanceId } },
          body: queryBody(args!, coordinate),
        }),
      ),
    args !== null,
  );
}

/**
 * One page of the `next` queue and its health status, at the page coordinate
 * and evaluated now. `next` has no server-side filter; screens group and
 * filter the page client-side.
 */
export function useNext(page: { limit?: number; cursor?: string } = {}) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery("next", [page.limit ?? null, page.cursor ?? null], async (coordinate) =>
    unwrap(
      await client.POST("/api/v1/{instance_id}/next", {
        params: { path: { instance_id: instanceId } },
        body: nextBody({ coordinate, evaluationTime: new Date().toISOString(), ...page }),
      }),
    ),
  );
}

/** Proposals by status (head-only: the list takes no coordinate). */
export function useProposals(status?: ProposalStatus, limit = 50, cursor?: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["proposals", instanceId, status ?? null, limit, cursor ?? null],
    staleTime: 15_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/proposals", {
          params: {
            path: { instance_id: instanceId },
            query: proposalsQuery(status, limit, cursor),
          },
        }),
      ),
  });
}

/** One proposal's review (a READ_ONLY POST: members, governance, attestations). */
export function useReview(proposalId: string | null, itemReasonsAfter?: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["review", instanceId, proposalId, itemReasonsAfter ?? null],
    enabled: proposalId !== null,
    staleTime: 15_000,
    queryFn: async () =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/proposals/{proposal_id}/review", {
          params: { path: { instance_id: instanceId, proposal_id: proposalId! } },
          body: reviewBody(itemReasonsAfter),
        }),
      ),
  });
}

/** Line inbox entries (head-only). */
export function useInbox(line?: string, status?: InboxStatus, limit = 50, cursor?: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["inbox", instanceId, line ?? null, status ?? null, limit, cursor ?? null],
    staleTime: 15_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/inbox", {
          params: {
            path: { instance_id: instanceId },
            query: inboxQuery(line, status, limit, cursor),
          },
        }),
      ),
  });
}

/** One Procedure run's state: Captures read, receipt (head-only). */
export function useRunState(runId: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["run-state", instanceId, runId],
    enabled: runId !== null,
    staleTime: 15_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/procedure-runs/{run_id}", {
          params: { path: { instance_id: instanceId, run_id: runId! } },
        }),
      ),
  });
}

/** One page of a Procedure's measurement readings at the page coordinate. */
export function useReadings(procedure: string | null, limit = 50, cursor?: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "readings",
    [procedure, limit, cursor ?? null],
    async (coordinate) =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/procedures/{name}/readings", {
          params: { path: { instance_id: instanceId, name: procedure! } },
          body: readingsBody(coordinate, limit, cursor),
        }),
      ),
    procedure !== null,
  );
}

/**
 * One ref's summary card through get-batch with name suggestions off. A
 * missing Subject then refuses from the identity indexes alone: `/get` would
 * compute nearest names over every Subject of the instance first.
 */
export function useCard(ref: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "card",
    [ref],
    async (coordinate): Promise<GetResult> => {
      const batch = unwrap(
        await client.POST("/api/v1/{instance_id}/get-batch", {
          params: { path: { instance_id: instanceId } },
          body: getBatchBody([ref!], coordinate),
        }),
      );
      return batch.results[0]!;
    },
    ref !== null && ref !== "",
  );
}

/** A Subject's field history (stated/changed/reobserved/retired), one page. */
export function useSubjectHistory(ref: string | null, cursor?: string) {
  return useGet(ref, "history", { limit: HISTORY_PAGE, ...(cursor !== undefined ? { cursor } : {}) });
}

/** A Claim's evidence: captures, attestations, rationale (on expand only). */
export function useClaimEvidence(claimId: string | null) {
  return useGet(claimId, "evidence");
}

/** A Claim's revisions (on expand only). */
export function useClaimRevisions(claimId: string | null) {
  return useGet(claimId, "history", { limit: HISTORY_PAGE });
}

/** The Claim id a view record reads (its envelope identity, `Claim:CLM-…`). */
export function claimIdOfView(view: ClaimViewRecord): string | null {
  const identity = (view.envelope as { identity?: unknown }).identity;
  return typeof identity === "string" ? identity.replace(/^Claim:/, "") : null;
}

const FULL_CLAIM_ID = /^CLM-[0-9a-f]{32}$/;

/**
 * Capture admission accounts per Claim through claims/read-batch, 256 ids per
 * call. Only full Claim ids are sent: the route resolves a CLM- prefix by
 * listing every Claim of the instance.
 */
export function useAdmissionAccounts(claimIds: string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  const ids = [...new Set(claimIds.filter((id) => FULL_CLAIM_ID.test(id)))];
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += CLAIM_READ_BATCH_MAX) chunks.push(ids.slice(i, i + CLAIM_READ_BATCH_MAX));
  return useQueries({
    queries: chunks.map((chunk) => ({
      queryKey: ["admission", instanceId, coordinate?.git_oid ?? null, chunk],
      enabled: coordinate !== undefined,
      staleTime: 60_000,
      queryFn: async () =>
        unwrap(
          await client.POST("/api/v1/{instance_id}/claims/read-batch", {
            params: { path: { instance_id: instanceId } },
            body: claimReadBatchBody(chunk, coordinate!),
          }),
        ),
    })),
    combine: (results) => {
      const byClaim = new Map<string, ClaimViewRecord["admission_accounts"]>();
      results.forEach((result, i) => {
        result.data?.claims.forEach((view, j) => {
          const id = claimIdOfView(view) ?? chunks[i]![j];
          if (id) byClaim.set(id, view.admission_accounts);
        });
      });
      return {
        isPending: results.some((r) => r.isPending),
        error: results.find((r) => r.error)?.error ?? null,
        byClaim,
      };
    },
  });
}

/**
 * The outgoing neighborhood of one Subject, depth 1 or 2, capped at 150
 * nodes: ⌈frontier/64⌉ get-batch calls per hop at the page coordinate.
 */
export function useNeighborhood(root: string | null, depth: number) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const kinds = useOrientKinds();
  return usePinnedQuery(
    "neighborhood",
    [root, depth],
    (coordinate) => {
      const incoming: IncomingReader = async (subject, cursor) => {
        const read = unwrap(
          await client.POST("/api/v1/{instance_id}/get", {
            params: { path: { instance_id: instanceId } },
            body: getBody({ ref: subject, coordinate, detail: "incoming", limit: INCOMING_PAGE, ...(cursor ? { cursor } : {}) }),
          }),
        );
        return { claims: read.incoming?.claims ?? [], nextCursor: read.next_cursor ?? null };
      };
      return walkNeighborhood(
        root!,
        depth,
        kinds.data!.kinds,
        async (refs) => {
          const batch = unwrap(
            await client.POST("/api/v1/{instance_id}/get-batch", {
              params: { path: { instance_id: instanceId } },
              body: getBatchBody(refs, coordinate),
            }),
          );
          return [...batch.results];
        },
        undefined,
        incoming,
      );
    },
    root !== null && kinds.data !== undefined,
  );
}

/** One page of the Subject-valued Claims pointing at a Subject (keyset-paged). */
export function useIncoming(ref: string | null, cursor?: string) {
  return useGet(ref, "incoming", { limit: INCOMING_PAGE, ...(cursor !== undefined ? { cursor } : {}) });
}

/** One page of a Line's runs, newest first (keyset-paged). */
export function useLineRuns(line: string | null, cursor?: string) {
  return useGet(line === null ? null : `Line:${line}`, "runs", {
    limit: LINE_RUNS_PAGE,
    ...(cursor !== undefined ? { cursor } : {}),
  });
}

/** One inbox item with its payload (head-only; O(1) by id). */
export function useInboxItem(itemId: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["inbox-item", instanceId, itemId],
    enabled: itemId !== null,
    staleTime: 60_000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/inbox/{item_id}", {
          params: { path: { instance_id: instanceId, item_id: itemId! } },
        }),
      ),
  });
}

/**
 * One page of the generation timeline, newest first from the page's pinned
 * generation (orient section=generations, O(page)).
 */
export function useGenerations(cursor?: string) {
  const orient = useOrientFetch();
  return usePinnedQuery("generations", [cursor ?? null], (coordinate) =>
    orient(coordinate, { section: "generations", limit: LEDGER_PAGE, ...(cursor !== undefined ? { cursor } : {}) }),
  );
}

/** The whole-graph read's first page (carries totals.subjects); only when asked. */
export function useGraphFirstPage(enabled: boolean) {
  const orient = useOrientFetch();
  return usePinnedQuery(
    "graph-first",
    [],
    async (coordinate) => {
      const started = performance.now();
      const page = await orient(coordinate, { section: "graph", limit: GRAPH_PAGE });
      return { page, elapsedMs: performance.now() - started };
    },
    enabled,
  );
}

export interface WholeGraph {
  nodes: Schemas["OrientGraphNode"][];
  edges: Schemas["OrientGraphEdge"][];
  subjects: number;
  pages: number;
  /** Edges stopped at the edge cap before the read finished. */
  edgesCapped: boolean;
  elapsedMs: number;
}

export interface GraphProgress {
  pages: number;
  nodes: number;
  edges: number;
  subjects: number;
}

/**
 * Every live Subject and every Subject-valued Claim, paged 500 at a time from
 * the first page's cursor (which pins its coordinate): O(Subjects + edges)
 * reads of one maintained index each, nothing else. Starts only when the
 * first page is in and the Subject total is under the caller's cap.
 */
export function useWholeGraph(
  first: { page: OrientResult; elapsedMs: number } | undefined,
  enabled: boolean,
  edgeCap: number,
  onProgress: (progress: GraphProgress) => void,
) {
  const orient = useOrientFetch();
  return usePinnedQuery(
    "graph-all",
    [first?.page.next_cursor ?? null, edgeCap],
    async (coordinate): Promise<WholeGraph> => {
      // The load time counts the first page's read too.
      const started = performance.now() - first!.elapsedMs;
      const nodes = [...(first!.page.graph?.nodes ?? [])];
      const edges = [...(first!.page.graph?.edges ?? [])];
      const subjects = first!.page.graph?.totals.subjects ?? nodes.length;
      let cursor = first!.page.next_cursor ?? null;
      let pages = 1;
      let edgesCapped = false;
      onProgress({ pages, nodes: nodes.length, edges: edges.length, subjects });
      while (cursor) {
        if (edges.length >= edgeCap) {
          edgesCapped = true;
          break;
        }
        const page = await orient(coordinate, { section: "graph", limit: GRAPH_PAGE, cursor });
        nodes.push(...(page.graph?.nodes ?? []));
        edges.push(...(page.graph?.edges ?? []));
        pages += 1;
        cursor = page.next_cursor ?? null;
        onProgress({ pages, nodes: nodes.length, edges: edges.length, subjects });
      }
      return { nodes, edges, subjects, pages, edgesCapped, elapsedMs: performance.now() - started };
    },
    enabled && first !== undefined,
  );
}
