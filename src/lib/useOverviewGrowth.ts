import { useQueries, useQueryClient, type QueryClient } from "@tanstack/react-query";
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

/** A place in a {@link Semaphore}'s line: granted once it holds a slot; cancel leaves the line if it does not hold one yet. */
export interface Ticket {
  granted: Promise<void>;
  /** Leave the line; false when the slot is already held (the holder must release it). */
  cancel(): boolean;
}

/**
 * A counting semaphore: at most `limit` holders, the rest waiting in arrival
 * order. A slot free at entry is held at once (synchronously), so a holder
 * can never be mistaken for a waiter.
 */
export class Semaphore {
  private active = 0;
  private readonly waiting: (() => void)[] = [];

  constructor(private readonly limit: number) {}

  enter(): Ticket {
    if (this.active < this.limit) {
      this.active += 1;
      return { granted: Promise.resolve(), cancel: () => false };
    }
    let grant!: () => void;
    let refuse!: (reason: unknown) => void;
    const granted = new Promise<void>((resolve, reject) => {
      grant = () => {
        this.active += 1;
        resolve();
      };
      refuse = reject;
    });
    this.waiting.push(grant);
    return {
      granted,
      cancel: () => {
        const at = this.waiting.indexOf(grant);
        if (at < 0) return false;
        this.waiting.splice(at, 1);
        refuse(new Error("left the line"));
        return true;
      },
    };
  }

  release(): void {
    this.active -= 1;
    this.waiting.shift()?.();
  }
}

/**
 * The generation budget and the reads under way, one per query cache: shared
 * by every mount and every sampled window, so a head that moves (a whole new
 * window of generations) waits for the generations still being read instead
 * of starting beside them, and a query cancelled and asked again (a remount)
 * joins the read already running instead of reading the generation twice.
 */
interface GrowthRead {
  read: Promise<GrowthPoint>;
  ticket: Ticket;
  /** Queries waiting on this read; when the last one leaves before it holds a slot, it is dropped unread. */
  askers: number;
}
interface GrowthReads {
  budget: Semaphore;
  running: Map<string, GrowthRead>;
}
const reads = new WeakMap<QueryClient, GrowthReads>();
function growthReads(cache: QueryClient): GrowthReads {
  let held = reads.get(cache);
  if (!held) reads.set(cache, (held = { budget: new Semaphore(GROWTH_CONCURRENCY), running: new Map() }));
  return held;
}

/**
 * Live Claims per kind at earlier generations, for the Overview's growth
 * chart, from the same measured per-kind figures as the head point: per
 * generation, GET /head?at=N (its coordinate), orient's kinds there (every
 * continuation page followed), and one orient(kind=K) for each kind holding
 * Subjects then, its predicates' live Claims summed. At most
 * {@link GROWTH_CONCURRENCY} generations are read at a time across every window
 * this cache has asked for (a generation holds its slot until all its reads
 * end; one still waiting for a slot when its window is replaced never reads),
 * newest first, with at most {@link KIND_READS_IN_FLIGHT} kind reads in flight
 * within each, so the chart draws as points land and a screen opened next is
 * not queued behind it. A
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
  const { budget, running } = growthReads(useQueryClient());
  const results = useQueries({
    queries: order.map((sequence) => ({
      queryKey: ["overview-growth", instanceId, sequence],
      staleTime: Infinity,
      queryFn: async ({ signal }: { signal: AbortSignal }): Promise<GrowthPoint> => {
        const key = `${instanceId}\n${sequence}`;
        // one read per generation, registered before anything awaits: a query cancelled and asked
        // again (a remount) joins it instead of starting a second
        let entry = running.get(key);
        if (!entry) {
          // a place in the budget's line, taken synchronously (held at once when a slot is free)
          const ticket = budget.enter();
          const read = (async () => {
            // once the slot is held, the reads run to their end and the slot is given back
            await ticket.granted;
            try {
              return await readGeneration(sequence);
            } finally {
              budget.release();
            }
          })();
          const fresh: GrowthRead = { read, ticket, askers: 0 };
          void read.then(
            () => running.get(key) === fresh && running.delete(key),
            () => running.get(key) === fresh && running.delete(key),
          );
          running.set(key, fresh);
          entry = fresh;
        }
        const held = entry;
        held.askers += 1;
        const leave = () => {
          held.askers -= 1;
          // the window moved on before this generation got a slot: leave the line, never read it
          if (held.askers === 0 && held.ticket.cancel() && running.get(key) === held) running.delete(key);
        };
        signal.addEventListener("abort", leave, { once: true });
        try {
          return await held.read;
        } finally {
          signal.removeEventListener("abort", leave);
          if (!signal.aborted) held.askers -= 1;
        }
      },
    })),
  });
  async function readGeneration(sequence: number): Promise<GrowthPoint> {
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
  }
  const settled = results.filter((r) => r.isSuccess || r.isError).length;
  const bySequence = new Map(order.map((sequence, i) => [sequence, results[i]!] as const));
  return {
    pending: settled < order.length,
    // in the order asked (oldest first), null until read
    points: sequences.map((sequence) => bySequence.get(sequence)?.data ?? null),
    failed: results.filter((r) => r.error).length,
  };
}
