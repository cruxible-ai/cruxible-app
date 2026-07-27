import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useApiClient } from "./DataSourceContext";
import { ApiError, unwrap } from "./data-source";
import type { SourceArtifactListResult, SourceArtifactReadResult } from "./artifact-types";
import type {
  ContractListResult,
  DereferenceResult,
  ListEnvelope,
  ReceiptDetail,
  ReceiptListResult,
} from "./governance-types";

/** Instance id from the /i/:instanceId route segment. */
export function useInstanceId(): string {
  const { instanceId } = useParams();
  if (!instanceId) throw new Error("Route is missing :instanceId");
  return instanceId;
}

export type ViewParams = Record<string, string | number | undefined>;

/**
 * Named-query read surface: GET /views/{query_name}. Reserved keys
 * (limit/offset/relationship_state) plus forwarded query params. The contract
 * only declares the reserved keys, so forwarded params go through a cast —
 * reported as contract friction.
 */
export function useView(queryName: string, params?: ViewParams, enabled = true) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  // Receipted query runs are cached hard and keyed on graph structure: a
  // changed entity/edge count busts the cache immediately, otherwise results
  // stay fresh for 5 minutes. Keeps the UI current without a receipt per
  // navigation (receipts stay ON for every run that actually executes).
  const stats = useStats();
  const structureKey = stats.data
    ? `${stats.data.entity_count}:${stats.data.edge_count}`
    : "pending";
  // Forwarded (non-reserved) params aren't expressible in the generated
  // contract type, hence the cast — contract friction, reported upstream.
  const query = params as { limit?: number | null; offset?: number } | undefined;
  return useQuery({
    queryKey: ["view", instanceId, queryName, params ?? {}, structureKey],
    // Callers that only know their query name conditionally (a view keyed on
    // an entity property that may be absent) opt out rather than firing a
    // request at an empty route.
    enabled: enabled && queryName !== "",
    staleTime: 5 * 60 * 1000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/views/{query_name}", {
          params: {
            path: { instance_id: instanceId, query_name: queryName },
            ...(query !== undefined ? { query } : {}),
          },
        }),
      ),
  });
}

export function useQueryCatalog() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["queries", instanceId],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/queries", {
          params: { path: { instance_id: instanceId } },
        }),
      ),
    staleTime: 5 * 60_000,
  });
}

export function useStats() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["stats", instanceId],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/stats", {
          params: { path: { instance_id: instanceId } },
        }),
      ),
    // Stats is the cheap unreceipted freshness signal the view cache keys on,
    // so it polls; everything downstream refetches only when structure moves.
    staleTime: 15_000,
    refetchInterval: 30_000,
  });
}

export function useInstanceSchema() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["schema", instanceId],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/schema", {
          params: { path: { instance_id: instanceId } },
        }),
      ),
    staleTime: 5 * 60_000,
  });
}

/**
 * Upstream tracking metadata for a release-backed overlay: which entity and
 * relationship types the upstream release OWNS (and this instance therefore
 * cannot write). `upstream` is null on an instance that was composed from kits
 * rather than pulled from a published state — the authoritative answer simply
 * does not exist there, and callers fall back to derivation.
 */
export function useStateStatus() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["state-status", instanceId],
    staleTime: 5 * 60_000,
    retry: false,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/state/status", {
          params: { path: { instance_id: instanceId } },
        }),
      ),
  });
}

export function useInspectEntity(entityType: string, entityId: string, enabled = true) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["inspect-entity", instanceId, entityType, entityId],
    enabled: enabled && entityType !== "" && entityId !== "",
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/inspect/entity/{entity_type}/{entity_id}", {
          params: {
            path: { instance_id: instanceId, entity_type: entityType, entity_id: entityId },
          },
        }),
      ),
  });
}

export function useReceipt(receiptId: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["receipt", instanceId, receiptId],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/receipts/{receipt_id}", {
          params: { path: { instance_id: instanceId, receipt_id: receiptId } },
        }),
      ),
  });
}

export interface EvidenceLocator {
  source_artifact_id: string;
  chunk_id?: string | undefined;
  expected_content_hash?: string | undefined;
}

/**
 * Dereference a source-evidence locator to its markdown body. The endpoint is
 * a POST for locator-payload reasons but is semantically a read — the only
 * non-GET call in the app, cached like any query.
 */
export function useDereferenceEvidence(locator: EvidenceLocator | null) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["dereference", instanceId, locator],
    enabled: locator !== null,
    staleTime: 5 * 60_000,
    queryFn: async () =>
      unwrap(
        await client.POST("/api/v1/{instance_id}/source-evidence/dereference", {
          params: { path: { instance_id: instanceId } },
          body: {
            source_artifact_id: locator!.source_artifact_id,
            chunk_id: locator!.chunk_id ?? null,
            expected_content_hash: locator!.expected_content_hash ?? null,
          },
        }),
      ),
  });
}

/**
 * The source-artifact read endpoints are not in the generated OpenAPI schema
 * yet (the serving daemon branch merges after this one), so these hooks call
 * through a loosened GET signature against hand-written response types
 * (src/api/artifact-types.ts). Delete the cast when `pnpm gen:api` picks the
 * routes up.
 */
type UntypedGet = (
  path: string,
  init: { params: { path: Record<string, string>; query?: Record<string, number> } },
) => Promise<{ data?: unknown; error?: unknown; response: Response }>;

function useUntypedGet(): UntypedGet {
  const client = useApiClient();
  return client.GET as unknown as UntypedGet;
}

export function useSourceArtifacts(limit: number, offset: number) {
  const get = useUntypedGet();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["source-artifacts", instanceId, limit, offset],
    queryFn: async () =>
      unwrap(
        await get("/api/v1/{instance_id}/source-artifacts", {
          params: { path: { instance_id: instanceId }, query: { limit, offset } },
        }),
      ) as SourceArtifactListResult,
  });
}

export function useSourceArtifact(artifactId: string) {
  const get = useUntypedGet();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["source-artifact", instanceId, artifactId],
    queryFn: async () =>
      unwrap(
        await get("/api/v1/{instance_id}/source-artifacts/{artifact_id}", {
          params: { path: { instance_id: instanceId, artifact_id: artifactId } },
        }),
      ) as SourceArtifactReadResult,
  });
}

/**
 * Cheap sidebar probe: limit=1 list, returning the artifact total. Pre-merge
 * daemons 404 the route — that means "feature absent" (null), not an error,
 * so the nav entry simply never renders against an older daemon.
 */
export function useSourceArtifactsProbe() {
  const get = useUntypedGet();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["source-artifacts-probe", instanceId],
    retry: false,
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<number | null> => {
      try {
        const data = unwrap(
          await get("/api/v1/{instance_id}/source-artifacts", {
            params: { path: { instance_id: instanceId }, query: { limit: 1, offset: 0 } },
          }),
        ) as SourceArtifactListResult;
        return data.total;
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    },
  });
}

export function useEntityList(
  entityType: string,
  limit = 100,
  offset = 0,
  propertyFilter?: Record<string, string>,
) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["entity-list", instanceId, entityType, limit, offset, propertyFilter ?? null],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/list/{resource_type}", {
          params: {
            path: { instance_id: instanceId, resource_type: "entities" },
            query: {
              entity_type: entityType,
              limit,
              offset,
              ...(propertyFilter ? { property_filter: JSON.stringify(propertyFilter) } : {}),
            },
          },
        }),
      ),
  });
}

export type GroupStatus = "pending_review" | "auto_resolved" | "applying" | "resolved";
export const GROUP_STATUSES: GroupStatus[] = [
  "pending_review",
  "auto_resolved",
  "applying",
  "resolved",
];

/** Candidate groups, optionally filtered by status (governance read surface). */
export function useGroups(status?: GroupStatus, limit = 100) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["groups", instanceId, status ?? null, limit],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/groups", {
          params: {
            path: { instance_id: instanceId },
            query: { limit, ...(status ? { status } : {}) },
          },
        }),
      ),
  });
}

/** One candidate group with its members, signals, and trust metadata. */
export function useGroup(groupId: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["group", instanceId, groupId],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/groups/{group_id}", {
          params: { path: { instance_id: instanceId, group_id: groupId } },
        }),
      ),
  });
}

/** Provider execution trace summaries, newest first. */
export function useTraceList(limit = 100) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["trace-list", instanceId, limit],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/traces", {
          params: { path: { instance_id: instanceId }, query: { limit } },
        }),
      ),
  });
}

/** One provider execution trace with its pinned identity and payloads. */
export function useTrace(traceId: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["trace", instanceId, traceId],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/traces/{trace_id}", {
          params: { path: { instance_id: instanceId, trace_id: traceId } },
        }),
      ),
  });
}

/** Immutable state snapshots, newest first. */
export function useSnapshots() {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["snapshots", instanceId],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/snapshots", {
          params: { path: { instance_id: instanceId } },
        }),
      ),
  });
}

/** Group trust/resolution status: approved history, trust ladder, pending delta. */
export function useGroupStatus(groupId: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["group-status", instanceId, groupId],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/groups/{group_id}/status", {
          params: { path: { instance_id: instanceId, group_id: groupId } },
        }),
      ),
  });
}

/** Receipt summaries — the instance's mutation/read audit feed. */
export function useReceiptList(limit = 500) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["receipt-list", instanceId, limit],
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/list/{resource_type}", {
          params: {
            path: { instance_id: instanceId, resource_type: "receipts" },
            query: { limit },
          },
        }),
      ),
  });
}

/**
 * Every edge in the graph (the daemon honors large limits; the caller caps).
 * This is the state graph's heaviest read (~1.4MB at 2k edges since the
 * list route has no field projection for edges — reported as friction), so
 * it caches like useView: keyed on graph structure, fresh for 5 minutes.
 */
export function useEdgeList(limit: number, enabled = true) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const stats = useStats();
  const structureKey = stats.data
    ? `${stats.data.entity_count}:${stats.data.edge_count}`
    : "pending";
  return useQuery({
    queryKey: ["edge-list", instanceId, limit, structureKey],
    enabled: enabled && stats.data !== undefined,
    staleTime: 5 * 60 * 1000,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/list/{resource_type}", {
          params: {
            path: { instance_id: instanceId, resource_type: "edges" },
            query: { limit },
          },
        }),
      ),
  });
}

/** One list call per entity type — the whole-state fetch for the state graph.
 * Structure-keyed and cached like useEdgeList. */
export function useEntitiesForTypes(entityTypes: string[], limitPerType: number, enabled = true) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const stats = useStats();
  const structureKey = stats.data
    ? `${stats.data.entity_count}:${stats.data.edge_count}`
    : "pending";
  return useQueries({
    queries: entityTypes.map((entityType) => ({
      queryKey: ["entity-list", instanceId, entityType, limitPerType, 0, structureKey],
      enabled: enabled && stats.data !== undefined,
      staleTime: 5 * 60 * 1000,
      queryFn: async () =>
        unwrap(
          await client.GET("/api/v1/{instance_id}/list/{resource_type}", {
            params: {
              path: { instance_id: instanceId, resource_type: "entities" },
              query: { entity_type: entityType, limit: limitPerType },
            },
          }),
        ),
    })),
    // Without combine, useQueries returns a NEW array identity every render,
    // which defeats any useMemo keyed on the result (the state graph's force
    // layout, notably). combine + structural sharing keeps the reference
    // stable until a query actually changes.
    combine: (results) =>
      results.map((r) => ({ data: r.data, isPending: r.isPending, error: r.error })),
  });
}

/**
 * Server-computed totals per status value for one entity type — one filtered
 * list call per value (`limit: 1`; only `total` is consumed). The daemon has
 * no group-by surface yet (reported as friction), so orientation counts cost
 * one round trip per cell.
 */
export function useStatusTotals(entityType: string, statusValues: string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQueries({
    queries: statusValues.map((status) => ({
      queryKey: ["status-total", instanceId, entityType, status],
      queryFn: async () => {
        const data = unwrap(
          await client.GET("/api/v1/{instance_id}/list/{resource_type}", {
            params: {
              path: { instance_id: instanceId, resource_type: "entities" },
              query: {
                entity_type: entityType,
                limit: 1,
                property_filter: JSON.stringify({ status }),
              },
            },
          }),
        );
        return { status, total: (data as { total?: number }).total ?? 0 };
      },
    })),
  });
}

// ─────────────────────────────────────────────────────────────────────
// 0.3 governance read surfaces
//
// Outcome contracts are mounted but hidden from /openapi.json
// (include_in_schema=False), and the receipt list route serves fields the
// generated schema does not carry, so these go through loosened signatures
// against hand-written types in src/api/governance-types.ts — the same
// arrangement the source-artifact hooks above use. Delete the casts when
// `pnpm gen:api` picks the routes up.
// ─────────────────────────────────────────────────────────────────────

type LooseGet = (
  path: string,
  init: {
    params: {
      path: Record<string, string>;
      query?: Record<string, string | number | undefined>;
    };
  },
) => Promise<{ data?: unknown; error?: unknown; response: Response }>;

type LoosePost = (
  path: string,
  init: { params: { path: Record<string, string> }; body: Record<string, unknown> },
) => Promise<{ data?: unknown; error?: unknown; response: Response }>;

function useLooseGet(): LooseGet {
  const client = useApiClient();
  return client.GET as unknown as LooseGet;
}

function useLoosePost(): LoosePost {
  const client = useApiClient();
  return client.POST as unknown as LoosePost;
}

/**
 * Polling receipt feed — the live activity stream's spine.
 *
 * The receipt list is the cheap half: newest first, six fields per row, no
 * `committed` and no `actor_context`. It also cannot be filtered by actor,
 * outcome, or time window over HTTP, and `read_revision` does NOT move when a
 * receipt is written, so there is no cheap "anything new?" probe — polling the
 * list itself is the probe. All four are reported as friction; see
 * useReceiptDetails for the consequence.
 */
export function useReceiptFeed(limit = 60, intervalMs = 2500, live = true) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["receipt-feed", instanceId, limit],
    staleTime: 0,
    refetchInterval: live ? intervalMs : false,
    queryFn: async () =>
      unwrap(
        await client.GET("/api/v1/{instance_id}/list/{resource_type}", {
          params: {
            path: { instance_id: instanceId, resource_type: "receipts" },
            query: { limit },
          },
        }),
      ) as unknown as ReceiptListResult,
  });
}

/**
 * Full receipts for the ids currently on screen, one GET each.
 *
 * This N+1 is forced: `committed` (the ONLY committed-vs-refused
 * discriminator) and `actor_context` (who did it) exist solely on the
 * per-receipt route. Receipts are immutable, so each id is fetched exactly
 * once and then cached for the session — a poll that returns no new ids costs
 * nothing beyond the list call.
 */
export function useReceiptDetails(receiptIds: string[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQueries({
    queries: receiptIds.map((receiptId) => ({
      queryKey: ["receipt", instanceId, receiptId],
      staleTime: Infinity,
      gcTime: 30 * 60_000,
      retry: false,
      queryFn: async () =>
        unwrap(
          await client.GET("/api/v1/{instance_id}/receipts/{receipt_id}", {
            params: { path: { instance_id: instanceId, receipt_id: receiptId } },
          }),
        ) as ReceiptDetail,
    })),
    combine: (results) => {
      const byId = new Map<string, ReceiptDetail>();
      results.forEach((r, i) => {
        const id = receiptIds[i];
        if (id && r.data) byId.set(id, r.data as ReceiptDetail);
      });
      return { byId, pending: results.some((r) => r.isPending) };
    },
  });
}

/**
 * Resolution contracts for one entity type (or one subject).
 *
 * There is no batch "which of these ids have contracts" surface, so the queue
 * view lists every contract for the type and joins client-side on
 * `contract.entity_id` — reported as friction. Note `total` stays the
 * unfiltered store count when `status` is passed, so paging + status filtering
 * do not compose; the UI pages without a status filter.
 */
export function useOutcomeContracts(entityType?: string, entityId?: string, limit = 200) {
  const get = useLooseGet();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["outcome-contracts", instanceId, entityType ?? null, entityId ?? null, limit],
    retry: false,
    staleTime: 10_000,
    queryFn: async (): Promise<ContractListResult | null> => {
      try {
        return unwrap(
          await get("/api/v1/{instance_id}/outcome-contracts", {
            params: {
              path: { instance_id: instanceId },
              query: {
                limit,
                ...(entityType ? { entity_type: entityType } : {}),
                ...(entityId ? { entity_id: entityId } : {}),
              },
            },
          }),
        ) as ContractListResult;
      } catch (err) {
        // Older daemons do not mount the route; "feature absent" is null, not
        // an error, so the contract columns simply never render.
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    },
  });
}

/** The due / overdue / contradicted outcome queues. */
export function useOutcomeQueue(queue: "due" | "overdue" | "contradicted", limit = 100) {
  const get = useLooseGet();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["outcome-queue", instanceId, queue, limit],
    retry: false,
    queryFn: async () => {
      try {
        return unwrap(
          await get("/api/v1/{instance_id}/outcome-contracts/queue", {
            params: { path: { instance_id: instanceId }, query: { queue, limit } },
          }),
        ) as ListEnvelope & { items: Record<string, unknown>[] };
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    },
  });
}

/** One entity with its properties and metadata (lifecycle, last actor). */
export function useEntity(entityType: string, entityId: string, enabled = true) {
  const get = useLooseGet();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["entity", instanceId, entityType, entityId],
    enabled: enabled && entityType !== "" && entityId !== "",
    queryFn: async () =>
      unwrap(
        await get("/api/v1/{instance_id}/entities/{entity_type}/{entity_id}", {
          params: {
            path: { instance_id: instanceId, entity_type: entityType, entity_id: entityId },
          },
        }),
      ) as {
        found: boolean;
        entity_type: string;
        entity_id: string;
        properties: Record<string, unknown>;
        metadata: Record<string, unknown>;
      },
  });
}

export interface SourceLocator {
  source_artifact_id: string;
  artifact_revision_id?: string | undefined;
  chunk_id?: string | undefined;
  heading_path?: string[] | undefined;
  block_selector?: string | undefined;
  expected_content_hash?: string | undefined;
}

/**
 * Dereference a source locator. Passing `artifact_revision_id` reads the
 * PINNED revision; omitting it resolves against the artifact's current head
 * and echoes back which revision that is.
 */
export function useDereference(locator: SourceLocator | null, enabled = true) {
  const post = useLoosePost();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["dereference-locator", instanceId, locator],
    enabled: enabled && locator !== null,
    staleTime: 5 * 60_000,
    retry: false,
    queryFn: async () =>
      unwrap(
        await post("/api/v1/{instance_id}/source-evidence/dereference", {
          params: { path: { instance_id: instanceId } },
          body: {
            source_artifact_id: locator!.source_artifact_id,
            artifact_revision_id: locator!.artifact_revision_id ?? null,
            chunk_id: locator!.chunk_id ?? null,
            heading_path: locator!.heading_path ?? null,
            block_selector: locator!.block_selector ?? null,
            expected_content_hash: locator!.expected_content_hash ?? null,
          },
        }),
      ) as DereferenceResult,
  });
}

/**
 * The artifact revision a pinned locator would resolve to TODAY.
 *
 * There is no route that reports an artifact's current revision cheaply: the
 * artifact list omits `revision` entirely and the per-artifact GET ships every
 * chunk (12 MB for the KEV catalog). An unpinned dereference of the same
 * locator answers the question in ~2 KB and is what this uses — reported as
 * friction, since "is my evidence current" should not require a workaround.
 */
export function useCurrentRevision(locator: SourceLocator | null, enabled = true) {
  const unpinned: SourceLocator | null = locator
    ? { ...locator, artifact_revision_id: undefined, expected_content_hash: undefined }
    : null;
  return useDereference(unpinned, enabled);
}
