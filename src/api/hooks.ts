import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useApiClient } from "./DataSourceContext";
import { ApiError, unwrap } from "./data-source";
import type { SourceArtifactListResult, SourceArtifactReadResult } from "./artifact-types";

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
export function useView(queryName: string, params?: ViewParams) {
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
