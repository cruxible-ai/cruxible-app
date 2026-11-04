import { useQueries } from "@tanstack/react-query";
import { useApiClient } from "@/api/DataSourceContext";
import { unwrap } from "@/api/data-source";
import { useInstanceId } from "@/api/hooks";
import { headQuery, orientQuery } from "@/api/requests";
import type { AcceptedCoordinate } from "@/api/schemas";
import { isCoreIdentity } from "@/lib/ontology";
import { liveClaims, type GrowthPoint } from "@/lib/overview";

/** Largest orient page (the route's cap): one page holds every kind of a kit-sized instance. */
const ORIENT_PAGE = 500;

/**
 * Live Claims per kind at earlier generations, for the Overview's growth
 * chart: per generation, GET /head?at=N (its coordinate), orient's first page
 * there (its kinds and when it was accepted), and one orient(kind=K) for each
 * kind holding Subjects then. Requests grow with the generations sampled and
 * the kinds, never with Subjects or Claims; a generation's reads never change,
 * so they are cached for good. The page's own generation is not read here
 * (the page already holds it).
 */
export function useGrowthPoints(sequences: readonly number[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  return useQueries({
    queries: sequences.map((sequence) => ({
      queryKey: ["overview-growth", instanceId, sequence],
      staleTime: Infinity,
      queryFn: async (): Promise<GrowthPoint> => {
        const head = unwrap(
          await client.GET("/api/v1/{instance_id}/head", {
            params: { path: { instance_id: instanceId }, query: headQuery(String(sequence)) },
          }),
        );
        const orient = (coordinate: AcceptedCoordinate, extra: { kind?: string; limit?: number }) =>
          client
            .GET("/api/v1/{instance_id}/orient", {
              params: { path: { instance_id: instanceId }, query: orientQuery({ coordinate, ...extra }) },
            })
            .then(unwrap);
        const first = await orient(head.coordinate, { limit: ORIENT_PAGE });
        const held = (first.kinds ?? []).filter((k) => k.subjects > 0 && !isCoreIdentity(k.kind));
        const details = await Promise.all(held.map((k) => orient(head.coordinate, { kind: k.kind })));
        const byKind = new Map<string, number>();
        details.forEach((result, i) => byKind.set(held[i]!.kind, liveClaims(result.kind_detail?.predicates ?? [])));
        return { sequence, acceptedAt: first.accepted_at, byKind };
      },
    })),
    combine: (results) => ({
      pending: results.some((r) => r.isPending),
      points: results.map((r) => r.data ?? null),
      failed: results.filter((r) => r.error).length,
    }),
  });
}
