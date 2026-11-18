import { useIsFetching, useQueries, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/api/DataSourceContext";
import { unwrap, type ApiClient } from "@/api/data-source";
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

/**
 * `work` over `items`, at most `limit` at a time, results in the items' order.
 * It always drains: after a failure no new item starts, every item already
 * started is waited for, and only then does it throw (the first failure). So
 * a caller holding a budget never gives it back with work still in flight.
 */
export async function pooled<T, R>(items: readonly T[], limit: number, work: (item: T) => Promise<R>): Promise<R[]> {
  const out = new Array<R>(items.length);
  let next = 0;
  let failure: { error: unknown } | null = null;
  const lane = async () => {
    while (failure === null && next < items.length) {
      const i = next++;
      try {
        out[i] = await work(items[i]!);
      } catch (error) {
        failure ??= { error };
      }
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, lane));
  if (failure !== null) throw (failure as { error: unknown }).error;
  return out;
}

const growthKey = (instanceId: string, sequence: number) => ["overview-growth", instanceId, sequence] as const;

/**
 * Live Claims per kind at earlier generations, for the Overview's growth
 * chart, from the same measured per-kind figures as the head point: per
 * generation, GET /head?at=N (its coordinate), orient's kinds there (every
 * continuation page followed), and one orient(kind=K) for each kind holding
 * Subjects then, its predicates' live Claims summed, at most
 * {@link KIND_READS_IN_FLIGHT} at a time. A generation whose kinds outrun the
 * page budget fails, never shown from its first page.
 *
 * One query per generation, kept for good (an accepted generation never
 * changes). Its read never takes the abort signal, so a read that ends after
 * the page is left still lands in the cache and a return reuses it. At most
 * {@link GROWTH_CONCURRENCY} generations are read at once, decided each render
 * from the cache itself: a query runs while it is already fetching, or when it
 * is among the newest unsettled generations that fit the slots every growth
 * read in flight (this window's or an earlier one's) leaves free. Nothing is
 * counted by hand, so a moving head or a remount cannot widen it. Requests
 * grow with the generations sampled and the kinds, never with Subjects or
 * Claims; the page's own generation is not read here (the page holds it).
 */
export function useGrowthPoints(sequences: readonly number[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const cache = useQueryClient();
  // newest first: the right of the chart, beside the head, fills first
  const order = [...sequences].sort((a, b) => b - a);
  const inFlight = useIsFetching({ queryKey: ["overview-growth", instanceId] });
  let free = Math.max(0, GROWTH_CONCURRENCY - inFlight);
  const enabled = order.map((sequence) => {
    const state = cache.getQueryState(growthKey(instanceId, sequence));
    if (state?.status === "success" || state?.status === "error" || state?.fetchStatus === "fetching") return true;
    if (free === 0) return false;
    free -= 1;
    return true;
  });
  const results = useQueries({
    queries: order.map((sequence, i) => ({
      queryKey: growthKey(instanceId, sequence),
      staleTime: Infinity,
      enabled: enabled[i]!,
      // no signal taken: the read runs to its end and is cached even if no one is watching any more
      queryFn: () => readGeneration(client, instanceId, sequence),
    })),
  });
  const settled = results.filter((r) => r.isSuccess || r.isError).length;
  const bySequence = new Map(order.map((sequence, i) => [sequence, results[i]!] as const));
  return {
    pending: settled < order.length,
    // in the order asked (oldest first), null until read
    points: sequences.map((sequence) => bySequence.get(sequence)?.data ?? null),
    failed: results.filter((r) => r.error).length,
  };
}

async function readGeneration(client: ApiClient, instanceId: string, sequence: number): Promise<GrowthPoint> {
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
  return { sequence, acceptedAt: first.proposed_at, byKind };
}
