import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { useApiClient } from "@/api/DataSourceContext";
import { unwrap } from "@/api/data-source";
import { useInstanceId } from "@/api/hooks";
import { headQuery, orientQuery } from "@/api/requests";
import { isCoreIdentity } from "@/lib/ontology";
import { liveClaims, type GrowthPoint } from "@/lib/overview";

/** Largest orient page (the route's cap): one page holds every kind of a kit-sized instance. */
const ORIENT_PAGE = 500;

/** Generations read at once: the chart fills in as they land, and the daemon stays free for the next screen. */
export const GROWTH_CONCURRENCY = 2;

/** Kind reads in flight per generation: with two generations at once, at most six such reads queue at the daemon. */
export const KIND_READS_IN_FLIGHT = 3;

/** Continuation pages of a generation's kinds followed before the point is given up as unreadable. */
const MAX_KIND_PAGES = 20;

/** `work` over `items`, at most `limit` at a time, results in the items' order. */
export async function pooled<T, R>(items: readonly T[], limit: number, work: (item: T) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(items.length);
  let next = 0;
  const lane = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await work(items[i]!);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, lane));
  return out;
}

/**
 * Live Claims per kind at earlier generations, for the Overview's growth
 * chart, from the same measured per-kind figures as the head point: per
 * generation, GET /head?at=N (its coordinate), orient's kinds there (every
 * continuation page followed), and one orient(kind=K) for each kind holding
 * Subjects then, its predicates' live Claims summed. {@link GROWTH_CONCURRENCY}
 * generations at a time, newest first, and at most
 * {@link KIND_READS_IN_FLIGHT} kind reads in flight within each, so the chart
 * draws as points land and a screen opened next is not queued behind it. A
 * generation whose kinds do not fit the page budget is not read (counted as
 * failed), never shown from its first page alone. Requests grow with the
 * generations sampled and the kinds, never with Subjects or Claims; a
 * generation's reads never change, so they are cached for good. The page's own
 * generation is not read here (the page already holds it).
 */
export function useGrowthPoints(sequences: readonly number[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  // newest first: the right of the chart, beside the head, fills first
  const order = [...sequences].sort((a, b) => b - a);
  const [admitted, setAdmitted] = useState(GROWTH_CONCURRENCY);
  const results = useQueries({
    queries: order.map((sequence, i) => ({
      queryKey: ["overview-growth", instanceId, sequence],
      staleTime: Infinity,
      enabled: i < admitted,
      queryFn: async (): Promise<GrowthPoint> => {
        const head = unwrap(
          await client.GET("/api/v1/{instance_id}/head", {
            params: { path: { instance_id: instanceId }, query: headQuery(String(sequence)) },
          }),
        );
        const orient = (extra: { kind?: string; limit?: number; cursor?: string }) =>
          client
            .GET("/api/v1/{instance_id}/orient", {
              params: { path: { instance_id: instanceId }, query: orientQuery({ coordinate: head.coordinate, ...extra }) },
            })
            .then(unwrap);
        const first = await orient({ limit: ORIENT_PAGE });
        const kinds = [...(first.kinds ?? [])];
        let cursor = first.next_cursor ?? null;
        for (let page = 0; cursor !== null && page < MAX_KIND_PAGES; page += 1) {
          const more = await orient({ limit: ORIENT_PAGE, cursor });
          kinds.push(...(more.kinds ?? []));
          cursor = more.next_cursor ?? null;
        }
        if (cursor !== null) throw new Error(`generation ${sequence}: more kinds than the console reads`);
        const held = kinds.filter((k) => k.subjects > 0 && !isCoreIdentity(k.kind));
        const details = await pooled(held, KIND_READS_IN_FLIGHT, (k) => orient({ kind: k.kind }));
        const byKind = new Map<string, number>();
        details.forEach((result, i) => byKind.set(held[i]!.kind, liveClaims(result.kind_detail?.predicates ?? [])));
        return { sequence, acceptedAt: first.accepted_at, byKind };
      },
    })),
  });
  // admit the next generation as each one settles (read or failed)
  const settled = results.filter((r) => r.isSuccess || r.isError).length;
  useEffect(() => {
    setAdmitted((current) => Math.max(current, settled + GROWTH_CONCURRENCY));
  }, [settled]);
  const bySequence = new Map(order.map((sequence, i) => [sequence, results[i]!] as const));
  return {
    pending: settled < order.length,
    // in the order asked (oldest first), null until read
    points: sequences.map((sequence) => bySequence.get(sequence)?.data ?? null),
    failed: results.filter((r) => r.error).length,
  };
}
