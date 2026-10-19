import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useApiClient } from "./DataSourceContext";
import { unwrap } from "./data-source";
import {
  claimReadBatchBody,
  getBatchBody,
  getBody,
  GET_BATCH_MAX,
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
  AcceptedCoordinate,
  GetDetail,
  GetResult,
  Head,
  InboxStatus,
  OrientResult,
  OrientSection,
  ProposalStatus,
} from "./schemas";
import { useAtParam } from "@/lib/at";

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

/** A query pinned to the page coordinate; waits for it, keys on its git oid. */
function usePinnedQuery<T>(
  name: string,
  args: readonly unknown[],
  fetch: (coordinate: AcceptedCoordinate) => Promise<T>,
  enabled = true,
) {
  const instanceId = useInstanceId();
  const { coordinate } = usePin();
  return useQuery({
    queryKey: [name, instanceId, coordinate?.git_oid ?? null, ...args],
    enabled: enabled && coordinate !== undefined,
    staleTime: 60_000,
    queryFn: () => fetch(coordinate!),
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
function useOrientSectionAll<K extends "claim_types" | "subject_kinds" | "lines" | "mandates">(
  section: K,
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
  });
}

/** Every ClaimType with cardinality, value type, evidence and staleness rules. */
export function useClaimTypes() {
  return useOrientSectionAll("claim_types");
}

/** Every SubjectKind's identity rule. */
export function useSubjectKinds() {
  return useOrientSectionAll("subject_kinds");
}

/** Every Line (lifecycle, procedure, authority, trigger, enablement). */
export function useLines() {
  return useOrientSectionAll("lines");
}

/** Every Mandate (procedure, grants, state, expiry). */
export function useMandates() {
  return useOrientSectionAll("mandates");
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

/** Up to 256 Claims' view records (admission accounts) at the page coordinate. */
export function useClaimReadBatch(claimIds: string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return usePinnedQuery(
    "claims-read-batch",
    [claimIds],
    async (coordinate) =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/claims/read-batch", {
          params: { path: { instance_id: instanceId } },
          body: claimReadBatchBody(claimIds, coordinate),
        }),
      ),
    claimIds.length > 0,
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
