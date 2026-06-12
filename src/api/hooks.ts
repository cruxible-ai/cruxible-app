import { useQueries, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useApiClient } from "./DataSourceContext";
import { unwrap } from "./data-source";

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
  // Forwarded (non-reserved) params aren't expressible in the generated
  // contract type, hence the cast — contract friction, reported upstream.
  const query = params as { limit?: number | null; offset?: number } | undefined;
  return useQuery({
    queryKey: ["view", instanceId, queryName, params ?? {}],
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

export function useInspectEntity(entityType: string, entityId: string) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQuery({
    queryKey: ["inspect-entity", instanceId, entityType, entityId],
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
