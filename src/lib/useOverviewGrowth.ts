import { useQueries, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/api/DataSourceContext";
import { unwrap, type ApiClient } from "@/api/data-source";
import { useInstanceId } from "@/api/hooks";
import { headQuery, orientQuery } from "@/api/requests";
import { isCoreIdentity } from "@/lib/ontology";
import { liveClaims, type GrowthPoint } from "@/lib/overview";

/** Largest orient page (the route's cap): one page holds every kind of a kit-sized instance. */
const ORIENT_PAGE = 500;

/** Growth requests in flight at once, across every consumer of one query cache: the daemon stays free for the next screen. */
export const GROWTH_REQUESTS_IN_FLIGHT = 6;

/** Continuation pages of a generation's kinds followed before the point is given up as unreadable. */
const MAX_KIND_PAGES = 20;

export type Limit = <T>(task: () => Promise<T>) => Promise<T>;

/**
 * A promise queue that runs at most `n` tasks at once, the rest in arrival
 * order. A task takes its slot synchronously when one is free and gives it back
 * when it settles, resolved or rejected.
 */
export function createLimit(n: number): Limit {
  let active = 0;
  const queue: (() => void)[] = [];
  const next = () => {
    while (active < n && queue.length > 0) {
      active += 1;
      queue.shift()!();
    }
  };
  return <T,>(task: () => Promise<T>) =>
    new Promise<T>((resolve, reject) => {
      queue.push(() => {
        let run: Promise<T>;
        try {
          run = task();
        } catch (error) {
          run = Promise.reject(error);
        }
        run.then(resolve, reject).finally(() => {
          active -= 1;
          next();
        });
      });
      next();
    });
}

/** One limit per query cache: every mount, window and retry sharing the cache shares it (and tests stay apart). */
const limits = new WeakMap<QueryClient, Limit>();
function growthLimit(cache: QueryClient): Limit {
  let limit = limits.get(cache);
  if (!limit) limits.set(cache, (limit = createLimit(GROWTH_REQUESTS_IN_FLIGHT)));
  return limit;
}

const growthKey = (instanceId: string, sequence: number) => ["overview-growth", instanceId, sequence] as const;

/**
 * Live Claims per kind at earlier generations, for the Overview's growth
 * chart, from the same measured per-kind figures as the head point: per
 * generation, GET /head?at=N (its coordinate), orient's kinds there (every
 * continuation page followed), and one orient(kind=K) for each kind holding
 * Subjects then, its predicates' live Claims summed. A generation whose kinds
 * outrun the page budget fails, never shown from its first page; one whose
 * kind read fails reports it once every one of its kind reads has settled.
 *
 * One query per generation, kept for good (an accepted generation never
 * changes); its read never takes the abort signal, so a read that ends after
 * the page is left lands in the cache and a return reuses it. Every request
 * passes through one limit per query cache: at most
 * {@link GROWTH_REQUESTS_IN_FLIGHT} growth requests are in flight at any time,
 * whatever the consumers, mounts, retries or windows. Generations are asked
 * newest first, so the queue serves the right of the chart first. When the head
 * moves, requests already queued for the old window still run (bounded) and
 * their results are cached. Requests grow with the generations sampled and the
 * kinds, never with Subjects or Claims; the page's own generation is not read
 * here (the page holds it).
 */
export function useGrowthPoints(sequences: readonly number[]) {
  const client = useApiClient();
  const instanceId = useInstanceId();
  const limit = growthLimit(useQueryClient());
  // newest first: the right of the chart, beside the head, is queued first
  const order = [...sequences].sort((a, b) => b - a);
  const results = useQueries({
    queries: order.map((sequence) => ({
      queryKey: growthKey(instanceId, sequence),
      staleTime: Infinity,
      // no signal taken: the read runs to its end and is cached even if no one is watching any more
      queryFn: () => readGeneration(client, instanceId, sequence, limit),
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

async function readGeneration(client: ApiClient, instanceId: string, sequence: number, limit: Limit): Promise<GrowthPoint> {
  const head = unwrap(
    await limit(() =>
      client.GET("/api/v1/{instance_id}/head", {
        params: { path: { instance_id: instanceId }, query: headQuery(String(sequence)) },
      }),
    ),
  );
  const orient = (extra: { kind?: string; limit?: number; cursor?: string }) =>
    limit(() =>
      client.GET("/api/v1/{instance_id}/orient", {
        params: { path: { instance_id: instanceId }, query: orientQuery({ coordinate: head.coordinate, ...extra }) },
      }),
    ).then(unwrap);
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
  // every kind read is queued at once (the limit bounds them); the generation settles only after all of them do
  const details = await Promise.allSettled(held.map((k) => orient({ kind: k.kind })));
  const failure = details.find((d): d is PromiseRejectedResult => d.status === "rejected");
  if (failure) throw failure.reason;
  const byKind = new Map<string, number>();
  details.forEach((d, i) => {
    if (d.status === "fulfilled") byKind.set(held[i]!.kind, liveClaims(d.value.kind_detail?.predicates ?? []));
  });
  return { sequence, acceptedAt: first.accepted_at, byKind };
}
