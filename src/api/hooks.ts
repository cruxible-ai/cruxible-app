import { useEffect, useMemo } from "react";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
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
  ACTIVITY_PAGE,
  captureReadBody,
  documentBodyRange,
  DOCUMENT_READ_MAX_BYTES,
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
  sinceBody,
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
import { cardOf } from "./schemas";
import { isOutsideRetention, useAtParam } from "@/lib/at";
import { useSettings } from "@/lib/settings";
import { walkNeighborhood, type IncomingReader } from "@/lib/neighborhood";
import { ontologyKinds } from "@/lib/type-graph";
import {
  logicalSources,
  readLineEnvelope,
  retentions,
  sourceSteps,
  type LandingTrigger,
  type ProcedureSpec,
} from "@/lib/definitions";
import { lineName } from "@/lib/lines";
import { decodeBase64 } from "@/lib/capture-body";

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
export function useHead(at: string | null = null, enabled = true) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["head", instanceId, at],
    enabled,
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

/**
 * The head as first read, held: what an unpinned page reads when the viewer
 * turned "Follow the head" off. It never refetches on its own; the
 * generation box offers the newer head and refreshes it (`HELD_HEAD_KEY`).
 */
function useHeldHead(enabled: boolean) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: [...HELD_HEAD_KEY, instanceId],
    enabled,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryFn: async (): Promise<Head> =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/head", {
          params: { path: { instance_id: instanceId }, query: headQuery(null) },
        }),
      ),
  });
}

export const HELD_HEAD_KEY = ["head-held"] as const;

/**
 * The coordinate this page reads at: `?at=` when pinned; else the head, which
 * every screen follows as new generations are accepted (polled), unless the
 * viewer turned "Follow the head" off: then the head as first read, held.
 */
export function usePin() {
  const at = useAtParam();
  const { settings } = useSettings();
  const hold = at === null && !settings.followHead;
  const followed = useHead(at, !hold);
  const held = useHeldHead(hold);
  const head = hold ? held : followed;
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

/**
 * One page of what happened, newest first (orient section=activity): accepted
 * generations, runs, Captures landing, occurrences coming due, inbox posts,
 * Line state changes. Operational state, read live at the latest head
 * whatever the page is pinned to (like the generation box's list).
 */
export function useActivity(cursor?: string) {
  const orient = useOrientFetch();
  const instanceId = useInstanceId();
  const coordinate = useHead(null).data?.coordinate;
  return useQuery({
    queryKey: ["activity", instanceId, coordinate?.git_oid ?? null, cursor ?? null],
    enabled: coordinate !== undefined,
    staleTime: 15_000,
    queryFn: () => orient(coordinate!, { section: "activity", limit: ACTIVITY_PAGE, ...(cursor !== undefined ? { cursor } : {}) }),
  });
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

/**
 * Every Subject kind with its ClaimTypes: the orient kinds (counts, identity)
 * joined with the claim_types section by each ClaimType's subject_kinds. The
 * default map names only a kind's first fields, so the type map, the Subject
 * page and the neighborhood read the ClaimTypes from the section.
 */
export function useOntologyKinds() {
  const kinds = useOrientKinds();
  const claimTypes = useClaimTypes();
  const data = useMemo(
    () =>
      kinds.data && claimTypes.data
        ? {
            kinds: ontologyKinds(kinds.data.kinds, claimTypes.data.rows),
            truncated: kinds.data.truncated || claimTypes.data.truncated,
          }
        : undefined,
    [kinds.data, claimTypes.data],
  );
  return {
    isPending: kinds.isPending || claimTypes.isPending,
    error: kinds.error ?? claimTypes.error,
    data,
  };
}

/** All rows of one paged orient section, following next_cursor. */
function useOrientSectionAll<
  K extends "claim_types" | "subject_kinds" | "lines" | "mandates" | "capture_contracts" | "pins" | "procedures" | "documents" | "captures",
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

/**
 * Each logical source's landings: how many, the latest (its Capture, when,
 * size, the Line or run that landed it, whether its body is still there) and
 * the contracts it lands under. Read live at the head (the section says so),
 * with the landings whose source couldn't be read counted apart.
 */
export function useSourceLandings(enabled = true) {
  const orient = useOrientFetch();
  return usePinnedQuery("orient-section-sources", [], async (coordinate) => {
    const rows: NonNullable<OrientResult["sources"]>[number][] = [];
    let unattributed = 0;
    let cursor: string | undefined;
    for (let page = 0; page < MAX_SECTION_PAGES; page += 1) {
      const result = await orient(coordinate, { section: "sources", limit: ORIENT_PAGE, ...(cursor !== undefined ? { cursor } : {}) });
      rows.push(...(result.sources ?? []));
      if (page === 0) unattributed = result.sources_unattributed ?? 0;
      if (!result.next_cursor) return { rows, unattributed, truncated: false };
      cursor = result.next_cursor;
    }
    return { rows, unattributed, truncated: true };
  }, enabled);
}

/** Every retained Capture: its contract, when it was observed and how many Claims cite it. */
export function useCaptures(enabled = true) {
  return useOrientSectionAll("captures", enabled);
}

/** Every ClaimType with cardinality, value type, evidence and staleness rules. */
export function useClaimTypes(enabled = true) {
  return useOrientSectionAll("claim_types", enabled);
}

/** Every SubjectKind's identity rule. */
export function useSubjectKinds(enabled = true) {
  return useOrientSectionAll("subject_kinds", enabled);
}

/** Every Procedure (name, lifecycle, how it runs). */
export function useProcedures(enabled = true) {
  return useOrientSectionAll("procedures", enabled);
}

/** Every Document (name, title, kind, media type). */
export function useDocuments(enabled = true) {
  return useOrientSectionAll("documents", enabled);
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

const cellText = (value: unknown) => (typeof value === "string" ? value : "");
const cellList = (value: unknown) => (Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);

/**
 * Where evidence comes from: every Procedure's authored
 * form (one get-batch per 64 Procedures), every Line's envelope (get-batch
 * detail=proof: parameters, trigger input, bindings), and the capture-landing
 * Triggers with the logical sources they select, joined into retentions and
 * logical sources (lib/definitions). Ontology-sized: Procedures, Lines,
 * Triggers.
 */
export function useSourceModel(enabled = true) {
  const procedures = useProcedures(enabled);
  const lines = useLines(enabled);
  const triggers = useStateQuery(enabled ? LANDING_TRIGGERS_QUERY : null);
  const procedureCards = useGetBatch((procedures.data?.rows ?? []).map((row) => `Procedure:${row.name.replace(/^Procedure:/, "")}`));
  const lineProofs = useGetBatch((lines.data?.rows ?? []).map((row) => `Line:${lineName(row.line)}`), "proof");
  const pending =
    procedures.isPending || lines.isPending || triggers.isPending || procedureCards.isPending || lineProofs.isPending;
  const data = useMemo(() => {
    if (pending || !procedures.data || !lines.data || !triggers.data) return undefined;
    const specs = new Map<string, ProcedureSpec>();
    for (const result of procedureCards.results) {
      const card = cardOf(result, "procedure");
      if (card?.authored) specs.set(card.procedure.replace(/^Procedure:/, ""), card.authored);
    }
    const lineDefinitions = lineProofs.results.flatMap((result) => {
      const line = readLineEnvelope(result.proof);
      return line ? [line] : [];
    });
    const landing: LandingTrigger[] = triggers.data.rows.map((row) => ({
      name: cellText(row.name),
      contract: cellText(row.capture_contract).replace(/^CaptureContract:/, ""),
      target: cellText(row.target),
      logicalSources: cellList(row.logical_sources),
    }));
    const runnable = new Map(procedures.data.rows.map((row) => [row.name.replace(/^Procedure:/, ""), row.runnable] as const));
    const all = retentions(
      [...specs].flatMap(([name, spec]) => sourceSteps(name, spec)),
      lineDefinitions,
      (procedure) => runnable.get(procedure) !== "line",
    );
    return {
      specs,
      lines: lineDefinitions,
      triggers: landing,
      retentions: all,
      sources: logicalSources(all, landing),
      truncated:
        procedures.data.truncated || lines.data.truncated || (triggers.data.capped?.length ?? 0) > 0 || triggers.data.truncated === true,
    };
  }, [pending, procedures.data, lines.data, triggers.data, procedureCards.results, lineProofs.results]);
  return {
    isPending: pending,
    error: procedures.error ?? lines.error ?? triggers.error ?? procedureCards.error ?? lineProofs.error,
    data,
  };
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

/**
 * Several kinds' detail at once (the same reads and cache entries
 * `useOrientKind` makes): one orient(kind=K) per kind, ontology-sized.
 * Results keep the order of `kinds`.
 */
export function useOrientKindDetails(kinds: readonly string[]) {
  const orient = useOrientFetch();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  return useQueries({
    queries: kinds.map((kind) => ({
      queryKey: ["orient-kind", instanceId, coordinate?.git_oid ?? null, kind],
      enabled: coordinate !== undefined,
      staleTime: 60_000,
      queryFn: () => orient(coordinate!, { kind }),
    })),
    combine: (results) => ({
      isPending: results.some((result) => result.isPending),
      error: results.find((result) => result.error)?.error ?? null,
      data: results.map((result) => result.data?.kind_detail ?? null),
    }),
  });
}

/**
 * The ChangeSet members accepted after `lower` through the page coordinate
 * (POST /since): one read of at most SINCE_ROWS rows, a Claim member with its
 * statement. Null `lower`: not yet known.
 */
export function useSince(lower: number | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "since",
    [lower],
    async (coordinate): Promise<Schemas["SinceResult"]> =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/since", {
          params: { path: { instance_id: instanceId } },
          body: sinceBody(lower!, coordinate),
        }),
      ),
    lower !== null,
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
export function useGetBatch(refs: string[], detail: "summary" | "proof" = "summary") {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  const chunks: string[][] = [];
  for (let i = 0; i < refs.length; i += GET_BATCH_MAX) chunks.push(refs.slice(i, i + GET_BATCH_MAX));
  return useQueries({
    queries: chunks.map((chunk) => ({
      queryKey: ["get-batch", instanceId, coordinate?.git_oid ?? null, detail, chunk],
      enabled: coordinate !== undefined,
      staleTime: 60_000,
      queryFn: async () =>
        unwrap(
          await client.POST("/api/v1/{instance_id}/get-batch", {
            params: { path: { instance_id: instanceId } },
            body: getBatchBody(chunk, coordinate!, detail),
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
    queryFn: async () => {
      const review = unwrap(
        await client.POST("/api/v1/{instance_id}/proposals/{proposal_id}/review", {
          params: { path: { instance_id: instanceId, proposal_id: proposalId! } },
          body: reviewBody(itemReasonsAfter),
        }),
      );
      // reviewBody asks for the detailed review; the summary form has no members.
      if (review.tag !== "playbill-proposal-review-v1") throw new Error(`review of ${proposalId} came back as a summary`);
      return review;
    },
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

/**
 * One ref's summary card at a given coordinate, never the page's: a
 * definition as it stood when a run was bound (a run's Procedure, a slot's
 * out Contract). Read only once `useRetainedAt` confirms the daemon retains
 * that coordinate's projection (a read past its window would rebuild it); a
 * card already read is kept and never refetched (accepted state at a
 * coordinate never changes). `retention` is null once the card is held.
 * Shares useCard's cache when the coordinate is the page's.
 */
export function useCardAt(ref: string | null, coordinate: AcceptedCoordinate | undefined) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const queryClient = useQueryClient();
  const queryKey = ["card", instanceId, coordinate?.git_oid ?? null, ref];
  const wanted = ref !== null && ref !== "" && coordinate !== undefined && queryClient.getQueryData(queryKey) === undefined;
  const window = useRetainedAt(wanted ? [coordinate.git_oid] : []);
  const retention = wanted ? (window.status.get(coordinate.git_oid) ?? "checking") : null;
  const read = useQuery({
    queryKey,
    enabled: ref !== null && ref !== "" && coordinate !== undefined && (retention === null || retention === "retained"),
    staleTime: Infinity,
    queryFn: async (): Promise<GetResult> => {
      const batch = unwrap(
        await client.POST("/api/v1/{instance_id}/get-batch", {
          params: { path: { instance_id: instanceId } },
          body: getBatchBody([ref!], coordinate!),
        }),
      );
      return batch.results[0]!;
    },
  });
  return { read, retention };
}

/**
 * One Capture's retained body (captures/read) at the page coordinate, up to
 * CAPTURE_READ_MAX_BYTES. Bodies never change under a digest, so it is read
 * once; a token below governed_write is refused (the page says so).
 */
export function useCaptureRead(capture: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "capture-read",
    [capture],
    async (coordinate): Promise<Schemas["CaptureRead"]> =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/captures/read", {
          params: { path: { instance_id: instanceId } },
          body: captureReadBody(capture!, coordinate),
        }),
      ),
    capture !== null && capture !== "",
  );
}

/** A Document's whole body, or why the page won't read it all. */
export type DocumentBody =
  | { status: "read"; bytes: Uint8Array; mediaType: string; digest: string }
  | { status: "too_large"; size: number; mediaType: string; digest: string };

/**
 * One Document's body (get detail="body") at the page coordinate, read in
 * DOCUMENT_RANGE_BYTES ranges and joined, up to DOCUMENT_READ_MAX_BYTES; the
 * daemon verifies the bytes against the body digest. A token below
 * governed_write is refused (the page says so).
 */
export function useDocumentBody(name: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "document-body",
    [name],
    async (coordinate): Promise<DocumentBody> => {
      const parts: Uint8Array[] = [];
      let start = 0;
      for (;;) {
        const result = unwrap(
          await client.POST("/api/v1/{instance_id}/get", {
            params: { path: { instance_id: instanceId } },
            body: documentBodyRange(name!, coordinate, start),
          }),
        );
        const body = result.body;
        if (!body) throw new Error(`The daemon returned no body for Document:${name}`);
        if (body.size > DOCUMENT_READ_MAX_BYTES) {
          return { status: "too_large", size: body.size, mediaType: body.media_type, digest: body.body_digest };
        }
        // a range that decodes as UTF-8 comes back as text, any other as base64
        parts.push(body.text != null ? new TextEncoder().encode(body.text) : decodeBase64(body.content_base64 ?? ""));
        start = body.range?.end ?? 0;
        if (body.range == null || start >= body.size) {
          return { status: "read", bytes: joinBytes(parts), mediaType: body.media_type, digest: body.body_digest };
        }
      }
    },
    name !== null && name !== "",
  );
}

function joinBytes(parts: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

/**
 * Summary cards for several refs, one get-batch each: the same reads (and
 * cache entries) `useCard` makes per ref, gathered for a table that sorts or
 * filters on what the cards say. Results keep the order of `refs`.
 */
export function useCards(refs: readonly string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  return useQueries({
    queries: refs.map((ref) => ({
      queryKey: ["card", instanceId, coordinate?.git_oid ?? null, ref],
      enabled: coordinate !== undefined,
      staleTime: 60_000,
      queryFn: async (): Promise<GetResult> => {
        const batch = unwrap(
          await client.POST("/api/v1/{instance_id}/get-batch", {
            params: { path: { instance_id: instanceId } },
            body: getBatchBody([ref], coordinate!),
          }),
        );
        return batch.results[0]!;
      },
    })),
    combine: (results) => results.map((result) => result.data),
  });
}

/**
 * Who a run ran for: the Line that triggered it (null for a direct run), its
 * Procedure and actor. A run's trigger never changes, so each run is read
 * once (its summary card through get-batch, as the run page reads it) and
 * kept whatever the head does.
 */
export function useRunAuthor(run: string | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  return useQuery({
    queryKey: ["run-author", instanceId, run],
    enabled: run !== null && coordinate !== undefined,
    staleTime: Infinity,
    queryFn: async () => {
      const batch = unwrap(
        await client.POST("/api/v1/{instance_id}/get-batch", {
          params: { path: { instance_id: instanceId } },
          body: getBatchBody([`ProcedureRun:${run!}`], coordinate!),
        }),
      );
      const card = cardOf(batch.results[0], "procedure_run");
      return {
        line: card?.triggered_by?.line ?? null,
        procedure: card?.procedure ?? null,
        actor: card?.actor ?? null,
      };
    },
  });
}

/** A definition's latest revision (its history's first row, newest first) at the page coordinate. */
export function useLatestRevision(ref: string | null) {
  const read = useGet(ref, "history", { limit: 1 });
  const history = read.data?.history;
  return { ...read, latest: history?.kind === "revisions" ? (history.revisions[0] ?? null) : null };
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
 * call, at the page coordinate. Only full Claim ids are sent: the route
 * resolves a CLM- prefix by listing every Claim of the instance.
 */
export function useAdmissionAccounts(claimIds: string[]) {
  const { coordinate } = usePin();
  return useClaimViewsAt([{ coordinate, ids: claimIds }]);
}

/**
 * Stored Claims read at given coordinates, never the page's: each group's
 * ids through claims/read-batch (256 per call) at that group's coordinate; a
 * group whose coordinate is not known yet waits. A run's page reads the
 * Claims it re-observed at the run's own coordinate, so a later revision
 * never stands in for the run's value. A `historical` group (a coordinate
 * the page did not pin) is read only once `useRetainedAt` confirms the
 * daemon retains it (past the window a read would rebuild that projection),
 * and once read is never refetched; `retention` gives each such coordinate's
 * check while its Claims are not held.
 */
export function useClaimViewsAt(groups: readonly { coordinate: AcceptedCoordinate | undefined; ids: readonly string[]; historical?: boolean }[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const queryClient = useQueryClient();
  const reads: { coordinate: AcceptedCoordinate | undefined; chunk: string[]; historical: boolean; key: unknown[] }[] = [];
  for (const group of groups) {
    const ids = [...new Set(group.ids.filter((id) => FULL_CLAIM_ID.test(id)))];
    for (let i = 0; i < ids.length; i += CLAIM_READ_BATCH_MAX) {
      const chunk = ids.slice(i, i + CLAIM_READ_BATCH_MAX);
      reads.push({ coordinate: group.coordinate, chunk, historical: group.historical === true, key: ["admission", instanceId, group.coordinate?.git_oid ?? null, chunk] });
    }
  }
  const wanted = reads.flatMap((r) => (r.historical && r.coordinate && queryClient.getQueryData(r.key) === undefined ? [r.coordinate.git_oid] : []));
  const window = useRetainedAt(wanted);
  const allowed = (r: (typeof reads)[number]) => !r.historical || !r.coordinate || !wanted.includes(r.coordinate.git_oid) || window.status.get(r.coordinate.git_oid) === "retained";
  return useQueries({
    queries: reads.map((r) => ({
      queryKey: r.key,
      enabled: r.coordinate !== undefined && allowed(r),
      staleTime: r.historical ? Infinity : 60_000,
      queryFn: async () =>
        unwrap(
          await client.POST("/api/v1/{instance_id}/claims/read-batch", {
            params: { path: { instance_id: instanceId } },
            body: claimReadBatchBody(r.chunk, r.coordinate!),
          }),
        ),
    })),
    combine: (results) => {
      const byClaim = new Map<string, ClaimViewRecord["admission_accounts"]>();
      // The stored Claim each view carries (its backing: the value's Capture, record, field, absence witness).
      const envelopes = new Map<string, ClaimViewRecord["envelope"]>();
      const statements = new Map<string, ClaimViewRecord["statement"]>();
      results.forEach((result, i) => {
        result.data?.claims.forEach((view, j) => {
          const id = claimIdOfView(view) ?? reads[i]!.chunk[j];
          if (id) {
            byClaim.set(id, view.admission_accounts);
            envelopes.set(id, view.envelope);
            statements.set(id, view.statement);
          }
        });
      });
      return {
        // a historical read held back by its retention check is not pending here: `retention` says whether it waits
        isPending: results.some((r, i) => r.isPending && (allowed(reads[i]!) || !reads[i]!.historical)),
        error: results.find((r) => r.error)?.error ?? null,
        byClaim,
        envelopes,
        statements,
        retention: window.status,
      };
    },
  });
}

/**
 * Full coordinates for accepted git oids (GET /head?at=<oid>, the read a
 * pinned page makes; shares its cache). A generation's coordinate never
 * changes, so each is read once.
 */
export function useCoordinatesAt(oids: readonly string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const unique = [...new Set(oids)].sort();
  return useQueries({
    queries: unique.map((oid) => ({
      queryKey: ["head", instanceId, oid],
      staleTime: Infinity,
      queryFn: async (): Promise<Head> =>
        unwrap(
          await client.GET("/api/v1/{instance_id}/head", {
            params: { path: { instance_id: instanceId }, query: headQuery(oid) },
          }),
        ),
    })),
    combine: (results) => {
      const byOid = new Map<string, AcceptedCoordinate>();
      const generations = new Map<string, number>();
      const failed = new Set<string>();
      results.forEach((r, i) => {
        if (r.isError) failed.add(unique[i]!);
        if (!r.data) return;
        byOid.set(unique[i]!, r.data.coordinate);
        generations.set(unique[i]!, r.data.generation);
      });
      return { byOid, generations, failed, isPending: results.some((r) => r.isPending), error: results.find((r) => r.error)?.error ?? null };
    },
  });
}

/**
 * Whether a historical read may be made at each accepted oid: the daemon
 * must still retain its projection, else the read rebuilds it (O(instance +
 * history)) on a routine page visit. The signal: GET /head?at=<oid> (its
 * generation) and GET /head (the latest head's), both answered from accepted
 * history without binding a projection; retained when within the newest
 * RETAINED_GENERATIONS (core's retention, which no route serves).
 *
 * Only a fresh head authorizes: a successful head read that is neither stale
 * nor being refetched (a cached head can trail the daemon's, whose newer
 * generations may have evicted the oid). While the head is pending, stale or
 * refetching, or the oid's generation is unread, each oid is `checking`, and
 * a stale head idle in the cache is refetched; a failed head or generation
 * read, or a generation past the window, is `outside` (fail closed).
 */
export type Retention = "retained" | "outside" | "checking";

export function useRetainedAt(oids: readonly string[]) {
  const latest = useHead(null);
  const unique = [...new Set(oids)].sort();
  const head = latest.data;
  const fresh = latest.isSuccess && !latest.isFetching && !latest.isStale;
  // the head's own oid needs no generation read
  const at = useCoordinatesAt(head ? unique.filter((oid) => oid !== head.coordinate.git_oid) : unique);
  const idleStale = unique.length > 0 && latest.isSuccess && latest.isStale && !latest.isFetching;
  const { refetch } = latest;
  useEffect(() => {
    if (idleStale) void refetch();
  }, [idleStale, refetch]);
  const key = unique.join("\n");
  return useMemo(() => {
    const status = new Map<string, Retention>();
    for (const oid of unique) {
      if (latest.isError || at.failed.has(oid)) status.set(oid, "outside");
      else if (!fresh || !head) status.set(oid, "checking");
      else if (oid === head.coordinate.git_oid) status.set(oid, "retained");
      else {
        const generation = at.generations.get(oid);
        if (generation === undefined) status.set(oid, "checking");
        else status.set(oid, isOutsideRetention(generation, head.generation) ? "outside" : "retained");
      }
    }
    return { status, checking: [...status.values()].includes("checking") };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by the oids and what the reads returned
  }, [key, fresh, head, latest.isError, at.generations, at.failed]);
}

/**
 * The outgoing neighborhood of one Subject, depth 1 or 2, capped at 150
 * nodes: ⌈frontier/64⌉ get-batch calls per hop at the page coordinate.
 */
export function useNeighborhood(root: string | null, depth: number) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const kinds = useOntologyKinds();
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
/**
 * The newest accepted generations as of the latest head, whatever the page is
 * pinned to (the generation box's list). The same read the Ledger makes at
 * the head, so the two share it.
 */
export function useRecentGenerations(enabled: boolean) {
  const orient = useOrientFetch();
  const instanceId = useInstanceId();
  const coordinate = useHead(null).data?.coordinate;
  return useQuery({
    queryKey: ["generations", instanceId, coordinate?.git_oid ?? null, null],
    enabled: enabled && coordinate !== undefined,
    staleTime: 60_000,
    queryFn: () => orient(coordinate!, { section: "generations", limit: LEDGER_PAGE }),
  });
}

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
