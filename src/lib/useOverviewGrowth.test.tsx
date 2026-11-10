import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { act, cleanup, render, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createLimit, GROWTH_REQUESTS_IN_FLIGHT, useGrowthPoints } from "./useOverviewGrowth";
import { growthSequences } from "./overview";

/**
 * The growth hook against a scripted client. The one guarantee under test: at
 * most GROWTH_REQUESTS_IN_FLIGHT growth requests (head, kind list, kind detail)
 * are in flight at any time, across consumers, mounts, retries and windows
 * sharing a query client. Besides it: history comes from measured per-kind
 * figures, a continuation is followed or the point is not shown, a generation
 * is read once per cache, and a failure is reported only after every request
 * the generation started has settled.
 */
const state = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("@/api/hooks", () => ({ useInstanceId: () => "inst_review" }));
vi.mock("@/api/DataSourceContext", () => ({ useApiClient: () => ({ GET: state.get }) }));
afterEach(() => {
  cleanup();
  state.get.mockReset();
});

const ok = (data: unknown) => Promise.resolve({ data, response: new Response("{}") });
const coordinate = (sequence: number) => ({ git_oid: sequence.toString(16).padStart(40, "0"), semantic_root: "s", generation_root: "g", compiler_digest: "c" });
type Query = { at?: string; kind?: string; cursor?: string; git_oid?: string };
const LIMIT = GROWTH_REQUESTS_IN_FLIGHT;

/** One query cache per test, kept across rerenders and mounts (the request limit lives with the cache). */
function cache(options: { retry?: number | boolean; retryDelay?: number } = {}) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, ...options } } });
  const Wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  return { client, Wrapper };
}

/**
 * A daemon with six populated kinds a generation. Kind reads wait until
 * released (`held`), or for `delay` ms; the first kind read can fail at once,
 * a generation's head can fail (once, or always). It tracks every request in
 * flight and its peak, head reads, all requests per generation and settled
 * kind reads per generation.
 */
function daemon({ held = true, delay = 0, failFirstKind = false, failHead = null as number | null, failHeadOnce = false } = {}) {
  const track = {
    active: 0,
    peak: 0,
    activeKinds: 0,
    heads: new Map<number, number>(),
    calls: new Map<number, number>(),
    completed: new Map<number, number>(),
    order: [] as number[],
    release: () => {},
  };
  let holding = held;
  const waiting: (() => void)[] = [];
  track.release = () => {
    holding = false;
    waiting.splice(0).forEach((resolve) => resolve());
  };
  state.get.mockImplementation(async (path: string, { params: { query } }: { params: { query: Query } }) => {
    track.active += 1;
    track.peak = Math.max(track.peak, track.active);
    try {
      if (path.endsWith("/head")) {
        const seq = Number(query.at);
        const count = (track.heads.get(seq) ?? 0) + 1;
        track.heads.set(seq, count);
        track.calls.set(seq, (track.calls.get(seq) ?? 0) + 1);
        track.order.push(seq);
        if (seq === failHead && (!failHeadOnce || count === 1)) throw new Error("injected head failure");
        return await ok({ coordinate: coordinate(seq) });
      }
      const seq = parseInt(query.git_oid ?? "0", 16);
      track.calls.set(seq, (track.calls.get(seq) ?? 0) + 1);
      if (query.kind) {
        try {
          if (failFirstKind && query.kind === "kind0") throw new Error("injected kind failure");
          track.activeKinds += 1;
          try {
            if (holding) await new Promise<void>((resolve) => waiting.push(resolve));
            else if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
          } finally {
            track.activeKinds -= 1;
          }
          return await ok({ kind_detail: { predicates: [{ predicate: "demo.score", live_claims: 1 }] } });
        } finally {
          track.completed.set(seq, (track.completed.get(seq) ?? 0) + 1);
        }
      }
      return await ok({ accepted_at: "2026-11-10T00:00:00Z", kinds: Array.from({ length: 6 }, (_, i) => ({ kind: `kind${i}`, subjects: 1 })), next_cursor: null });
    } finally {
      track.active -= 1;
    }
  });
  return track;
}

describe("Overview growth: what a generation's point holds", () => {
  it("takes each kind's live Claims from that kind's own detail, never one ClaimType's count spread over its kinds", async () => {
    // one ClaimType (demo.score) permits alpha and beta: 7 of its Claims are on alpha, 3 on beta
    state.get.mockImplementation((path: string, { params: { query } }: { params: { query: Query } }) => {
      if (path.endsWith("/head")) return ok({ coordinate: coordinate(1), generation: 1 });
      if (query.kind) {
        const live = query.kind === "alpha" ? 7 : 3;
        return ok({ kind_detail: { kind: query.kind, predicates: [{ predicate: "demo.score", subject_kinds: ["alpha", "beta"], live_claims: live }] } });
      }
      return ok({ accepted_at: "2026-11-10T00:00:00Z", kinds: [{ kind: "alpha", subjects: 2 }, { kind: "beta", subjects: 1 }], next_cursor: null });
    });
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper: cache().Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect([...result.current.points[0]!.byKind]).toEqual([
      ["alpha", 7],
      ["beta", 3],
    ]);
  });

  it("follows the kinds' continuation pages within a generation", async () => {
    state.get.mockImplementation((path: string, { params: { query } }: { params: { query: Query } }) => {
      if (path.endsWith("/head")) return ok({ coordinate: coordinate(1), generation: 1 });
      if (query.kind) return ok({ kind_detail: { kind: query.kind, predicates: [{ predicate: `${query.kind}.x`, live_claims: 1 }] } });
      if (query.cursor === "more") return ok({ kinds: [{ kind: "late", subjects: 1 }], next_cursor: null });
      return ok({ accepted_at: "2026-11-10T00:00:00Z", kinds: [{ kind: "early", subjects: 1 }], next_cursor: "more" });
    });
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper: cache().Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect([...result.current.points[0]!.byKind.keys()]).toEqual(["early", "late"]);
  });

  it("does not show a generation from its first page when its kinds never end within the budget", async () => {
    state.get.mockImplementation((path: string, { params: { query } }: { params: { query: Query } }) => {
      if (path.endsWith("/head")) return ok({ coordinate: coordinate(1), generation: 1 });
      if (query.kind) return ok({ kind_detail: { kind: query.kind, predicates: [] } });
      return ok({ accepted_at: "2026-11-10T00:00:00Z", kinds: [{ kind: "k", subjects: 1 }], next_cursor: "again" });
    });
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper: cache().Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect(result.current.points[0]).toBeNull();
    expect(result.current.failed).toBe(1);
  });
});

describe(`Overview growth: never more than ${LIMIT} growth requests in flight`, () => {
  it("asks for the newest generations first", async () => {
    const track = daemon({ held: false, delay: 5 });
    const { result } = renderHook(() => useGrowthPoints([1, 2, 3, 4, 5]), { wrapper: cache().Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 4000 });
    expect(track.order).toEqual([5, 4, 3, 2, 1]);
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
    expect(result.current.points.map((p) => p?.sequence)).toEqual([1, 2, 3, 4, 5]);
  });

  it("holds when the sampled window is replaced (the head moved)", async () => {
    const track = daemon({ held: false, delay: 10 });
    const first = growthSequences(100, 149).slice(0, -1);
    const second = growthSequences(101, 150).slice(0, -1);
    const { result, rerender } = renderHook(({ sequences }) => useGrowthPoints(sequences), { initialProps: { sequences: first }, wrapper: cache().Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    rerender({ sequences: second });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
    // every generation still costs one head, one kinds page and six kind reads
    expect([...track.calls.values()].every((count) => count === 8)).toBe(true);
    expect(result.current.points.every((point) => point !== null)).toBe(true);
  }, 20000);

  it("holds when the head moves mid-read; the old window's queued reads still finish, whole", async () => {
    const track = daemon();
    const { result, rerender } = renderHook(({ sequences }) => useGrowthPoints(sequences), { initialProps: { sequences: [1, 2, 3, 4] }, wrapper: cache().Wrapper });
    await waitFor(() => expect(track.activeKinds).toBe(LIMIT));
    rerender({ sequences: [5, 6, 7, 8] });
    rerender({ sequences: [9, 10, 11, 12] });
    expect(track.active).toBe(LIMIT);
    await act(async () => track.release());
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
    expect([...track.calls.values()].every((count) => count === 8)).toBe(true);
    expect([9, 10, 11, 12].every((sequence) => track.calls.get(sequence) === 8)).toBe(true);
  });

  it("holds across two consumers mounted in one React commit", async () => {
    const track = daemon();
    const { Wrapper } = cache();
    const latest: Record<string, ReturnType<typeof useGrowthPoints>> = {};
    function Consumer({ name, sequences }: { name: string; sequences: number[] }) {
      latest[name] = useGrowthPoints(sequences);
      return null;
    }
    render(
      <Wrapper>
        <Consumer name="first" sequences={[1, 2]} />
        <Consumer name="second" sequences={[3, 4]} />
      </Wrapper>,
    );
    await waitFor(() => expect(track.active).toBe(LIMIT));
    expect(track.peak).toBe(LIMIT);
    await act(async () => track.release());
    await waitFor(() => expect(latest.first!.pending || latest.second!.pending).toBe(false));
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
    expect([...track.heads.values()]).toEqual([1, 1, 1, 1]);
  });

  it("holds when a remount retries a cached failure while the slots are busy", async () => {
    const track = daemon({ failHead: 3, failHeadOnce: true });
    const { Wrapper } = cache();
    const first = renderHook(() => useGrowthPoints([1, 2, 3]), { wrapper: Wrapper });
    await waitFor(() => expect(first.result.current.failed).toBe(1));
    await waitFor(() => expect(track.active).toBe(LIMIT));
    first.unmount();
    const second = renderHook(() => useGrowthPoints([1, 2, 3]), { wrapper: Wrapper });
    // the retry queues behind the reads in flight
    expect(track.active).toBe(LIMIT);
    await act(async () => track.release());
    await waitFor(() => expect(second.result.current.pending).toBe(false));
    expect(track.heads.get(3)).toBe(2);
    expect(second.result.current.failed).toBe(0);
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
  });

  it("holds across sequential mounts with overlapping generations, each read once", async () => {
    const track = daemon();
    const { Wrapper } = cache();
    const first = renderHook(() => useGrowthPoints([1, 2, 3, 4]), { wrapper: Wrapper });
    const second = renderHook(() => useGrowthPoints([3, 4, 5, 6]), { wrapper: Wrapper });
    await waitFor(() => expect(track.active).toBe(LIMIT));
    first.unmount();
    const again = renderHook(() => useGrowthPoints([1, 2, 3, 4]), { wrapper: Wrapper });
    await act(async () => track.release());
    await waitFor(() => expect(again.result.current.pending || second.result.current.pending).toBe(false));
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
    expect([...track.heads.values()]).toEqual([1, 1, 1, 1, 1, 1]);
    expect([...track.calls.values()].every((count) => count === 8)).toBe(true);
  });

  it("frees a request's slot when it fails, and fails a generation only after all its started requests settle", async () => {
    const track = daemon({ failFirstKind: true });
    const { result } = renderHook(() => useGrowthPoints([1, 2, 3, 4]), { wrapper: cache().Wrapper });
    // kind0 of each generation fails at once and frees its slot; the slots fill with other kind reads
    await waitFor(() => expect(track.activeKinds).toBe(LIMIT));
    expect(result.current.failed).toBe(0);
    await act(async () => track.release());
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect(result.current.failed).toBe(4);
    expect(track.active).toBe(0);
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
    // every kind read a generation asked for settled before it reported the failure
    expect([...track.completed.values()]).toEqual([6, 6, 6, 6]);
  });

  it("frees a failed head read's slot so the following generations finish", async () => {
    const track = daemon({ failHead: 4 });
    const { result } = renderHook(() => useGrowthPoints([1, 2, 3, 4]), { wrapper: cache().Wrapper });
    await waitFor(() => expect(track.activeKinds).toBe(LIMIT));
    await act(async () => track.release());
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect(result.current.failed).toBe(1);
    expect(result.current.points.filter(Boolean)).toHaveLength(3);
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
  });
});

describe("Overview growth: a generation is read once per cache", () => {
  it("keeps a read that ends after the page is left, so a return reads nothing again", async () => {
    const track = daemon();
    const { client, Wrapper } = cache();
    const first = renderHook(() => useGrowthPoints([1]), { wrapper: Wrapper });
    await waitFor(() => expect(track.activeKinds).toBe(LIMIT));
    first.unmount();
    await act(async () => track.release());
    await waitFor(() => expect(client.getQueryData(["overview-growth", "inst_review", 1])).toBeDefined());
    const second = renderHook(() => useGrowthPoints([1]), { wrapper: Wrapper });
    await waitFor(() => expect(second.result.current.pending).toBe(false));
    expect(second.result.current.points[0]).not.toBeNull();
    expect(track.calls.get(1)).toBe(8);
  });

  it("joins the read already running on a remount mid-read", async () => {
    const track = daemon({ held: false, delay: 25 });
    const { Wrapper } = cache();
    const sequences = [1, 2, 3];
    const firstMount = renderHook(() => useGrowthPoints(sequences), { wrapper: Wrapper });
    await waitFor(() => expect(track.activeKinds).toBeGreaterThan(0));
    firstMount.unmount();
    const { result } = renderHook(() => useGrowthPoints(sequences), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    expect(result.current.points.every((point) => point !== null)).toBe(true);
    expect(sequences.map((sequence) => track.calls.get(sequence))).toEqual([8, 8, 8]);
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
  }, 20000);

  it("reads each generation once through an immediate remount (React's development double mount)", async () => {
    const track = daemon({ held: false, delay: 10 });
    const { Wrapper } = cache();
    const sequences = [1, 2, 3, 4];
    renderHook(() => useGrowthPoints(sequences), { wrapper: Wrapper }).unmount();
    const { result } = renderHook(() => useGrowthPoints(sequences), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    expect(result.current.points.every((point) => point !== null)).toBe(true);
    expect(sequences.map((sequence) => track.calls.get(sequence))).toEqual([8, 8, 8, 8]);
    expect(track.peak).toBeLessThanOrEqual(LIMIT);
  }, 20000);
});

describe("createLimit", () => {
  it("runs tasks in arrival order", async () => {
    const limit = createLimit(1);
    const order: number[] = [];
    await Promise.all([1, 2, 3, 4].map((n) => limit(async () => void order.push(n))));
    expect(order).toEqual([1, 2, 3, 4]);
  });

  it("frees the slot when a task rejects or throws synchronously", async () => {
    const limit = createLimit(1);
    await expect(limit(() => Promise.reject(new Error("no")))).rejects.toThrow("no");
    await expect(
      limit(() => {
        throw new Error("sync");
      }),
    ).rejects.toThrow("sync");
    await expect(limit(async () => "still runs")).resolves.toBe("still runs");
  });

  it("never runs more than its limit under a burst of a hundred", async () => {
    const limit = createLimit(6);
    let open = 0;
    let peak = 0;
    const results = await Promise.all(
      Array.from({ length: 100 }, (_, i) =>
        limit(async () => {
          open += 1;
          peak = Math.max(peak, open);
          try {
            await new Promise((resolve) => setTimeout(resolve, i % 3));
            if (i % 10 === 0) throw new Error(`task ${i}`);
            return i;
          } finally {
            open -= 1;
          }
        }).catch((error: Error) => error.message),
      ),
    );
    expect(peak).toBe(6);
    expect(results[0]).toBe("task 0");
    expect(results[1]).toBe(1);
    expect(open).toBe(0);
  });
});
