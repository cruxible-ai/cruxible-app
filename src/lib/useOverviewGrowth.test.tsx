import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GROWTH_CONCURRENCY, KIND_READS_IN_FLIGHT, pooled, Semaphore, useGrowthPoints } from "./useOverviewGrowth";
import { growthSequences } from "./overview";

/**
 * The growth hook against a scripted client: each generation's head, its
 * kinds (possibly over continuation pages) and one kind detail per kind.
 * Regressions from review: history comes from measured per-kind figures
 * (never a ClaimType's instance-wide count spread over every kind it
 * permits), a continuation is followed or the point is not shown, and reads
 * stay bounded.
 */
const state = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("@/api/hooks", () => ({ useInstanceId: () => "inst_review" }));
vi.mock("@/api/DataSourceContext", () => ({ useApiClient: () => ({ GET: state.get }) }));
afterEach(() => {
  cleanup();
  state.get.mockReset();
});

const ok = (data: unknown) => Promise.resolve({ data, response: new Response("{}") });
const coordinate = (sequence: number) => ({ git_oid: String(sequence).repeat(40).slice(0, 40), semantic_root: "s", generation_root: "g", compiler_digest: "c" });

/** One query cache per test, kept across rerenders (the generation budget lives with the cache). */
function cache() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
  };
}

type Query = { at?: string; kind?: string; cursor?: string; git_oid?: string };

describe("Overview growth: earlier generations", () => {
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
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper: cache() });
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
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper: cache() });
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect([...result.current.points[0]!.byKind.keys()]).toEqual(["early", "late"]);
  });

  it("does not show a generation from its first page when its kinds never end within the budget", async () => {
    state.get.mockImplementation((path: string, { params: { query } }: { params: { query: Query } }) => {
      if (path.endsWith("/head")) return ok({ coordinate: coordinate(1), generation: 1 });
      if (query.kind) return ok({ kind_detail: { kind: query.kind, predicates: [] } });
      return ok({ accepted_at: "2026-11-10T00:00:00Z", kinds: [{ kind: "k", subjects: 1 }], next_cursor: "again" });
    });
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper: cache() });
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect(result.current.points[0]).toBeNull();
    expect(result.current.failed).toBe(1);
  });

  it("reads newest first, two generations and three kind reads at a time", async () => {
    let inFlightKinds = 0;
    let peakKinds = 0;
    const generationsStarted: number[] = [];
    let generationsOpen = 0;
    let peakGenerations = 0;
    state.get.mockImplementation(async (path: string, { params: { query } }: { params: { query: Query } }) => {
      if (path.endsWith("/head")) {
        generationsStarted.push(Number(query.at));
        generationsOpen += 1;
        peakGenerations = Math.max(peakGenerations, generationsOpen);
        return ok({ coordinate: coordinate(Number(query.at)), generation: Number(query.at) });
      }
      if (query.kind) {
        inFlightKinds += 1;
        peakKinds = Math.max(peakKinds, inFlightKinds);
        await new Promise((resolve) => setTimeout(resolve, 5));
        inFlightKinds -= 1;
        // the last kind read of a generation closes it
        if (query.kind === "k6") generationsOpen -= 1;
        return ok({ kind_detail: { kind: query.kind, predicates: [{ predicate: `${query.kind}.x`, live_claims: 1 }] } });
      }
      return ok({ accepted_at: "2026-11-10T00:00:00Z", kinds: Array.from({ length: 7 }, (_, i) => ({ kind: `k${i}`, subjects: 1 })), next_cursor: null });
    });
    const { result } = renderHook(() => useGrowthPoints([1, 2, 3, 4, 5]), { wrapper: cache() });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 4000 });
    expect(generationsStarted.slice(0, 2)).toEqual([5, 4]);
    expect(peakGenerations).toBeLessThanOrEqual(GROWTH_CONCURRENCY);
    expect(peakKinds).toBeLessThanOrEqual(GROWTH_CONCURRENCY * KIND_READS_IN_FLIGHT);
    expect(result.current.points.map((p) => p?.sequence)).toEqual([1, 2, 3, 4, 5]);
  });
});

/**
 * A scripted daemon for the head-move cases: six populated kinds per
 * generation, each kind read delayed; it tracks generations open (head read
 * to last kind read) and kind reads in flight, and every request per
 * generation.
 */
function daemon(delay = 10) {
  const track = { activeGenerations: 0, peakGenerations: 0, activeKinds: 0, peakKinds: 0, completed: new Map<number, number>(), counts: new Map<number, number>() };
  state.get.mockImplementation(async (path: string, { params: { query } }: { params: { query: Query } }) => {
    if (path.endsWith("/head")) {
      const seq = Number(query.at);
      track.counts.set(seq, (track.counts.get(seq) ?? 0) + 1);
      track.activeGenerations += 1;
      track.peakGenerations = Math.max(track.peakGenerations, track.activeGenerations);
      return ok({ coordinate: { ...coordinate(seq), git_oid: seq.toString(16).padStart(40, "0") } });
    }
    const seq = parseInt(query.git_oid ?? "0", 16);
    track.counts.set(seq, (track.counts.get(seq) ?? 0) + 1);
    if (query.kind) {
      track.activeKinds += 1;
      track.peakKinds = Math.max(track.peakKinds, track.activeKinds);
      await new Promise((resolve) => setTimeout(resolve, delay));
      track.activeKinds -= 1;
      const done = (track.completed.get(seq) ?? 0) + 1;
      track.completed.set(seq, done);
      if (done === 6) track.activeGenerations -= 1;
      return ok({ kind_detail: { predicates: [{ predicate: "demo.score", live_claims: 1 }] } });
    }
    return ok({ accepted_at: "2026-11-10T00:00:00Z", kinds: Array.from({ length: 6 }, (_, i) => ({ kind: `kind${i}`, subjects: 1 })), next_cursor: null });
  });
  return track;
}

describe("Overview growth: when the head moves", () => {
  // the Overview samples the newest 50 generations and reads all but the head
  const first = growthSequences(100, 149).slice(0, -1);
  const second = growthSequences(101, 150).slice(0, -1);

  it("keeps two generations and six kind reads in flight after the sampled window is replaced", async () => {
    const track = daemon();
    const { result, rerender } = renderHook(({ sequences }) => useGrowthPoints(sequences), { initialProps: { sequences: first }, wrapper: cache() });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    expect(track.peakGenerations).toBe(GROWTH_CONCURRENCY);
    expect(track.peakKinds).toBe(GROWTH_CONCURRENCY * KIND_READS_IN_FLIGHT);
    track.peakGenerations = 0;
    track.peakKinds = 0;
    rerender({ sequences: second });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    expect(track.peakGenerations).toBeLessThanOrEqual(GROWTH_CONCURRENCY);
    expect(track.peakKinds).toBeLessThanOrEqual(GROWTH_CONCURRENCY * KIND_READS_IN_FLIGHT);
    // every generation still costs one head, one kinds page and six kind reads
    expect([...track.counts.values()].every((count) => count === 8)).toBe(true);
    expect(result.current.points.every((point) => point !== null)).toBe(true);
  }, 20000);

  it("counts generations still being read from the old window against the budget", async () => {
    const track = daemon(25);
    const { result, rerender } = renderHook(({ sequences }) => useGrowthPoints(sequences), { initialProps: { sequences: first }, wrapper: cache() });
    // the first window is mid-read: some generations open, the rest waiting
    await waitFor(() => expect(track.activeKinds).toBeGreaterThan(0));
    rerender({ sequences: second });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    expect(track.peakGenerations).toBeLessThanOrEqual(GROWTH_CONCURRENCY);
    expect(track.peakKinds).toBeLessThanOrEqual(GROWTH_CONCURRENCY * KIND_READS_IN_FLIGHT);
    // a started generation runs to its end (never half-read); one still waiting when its window went is never read
    for (const [sequence, count] of track.counts) expect([8], `generation ${sequence}`).toContain(count);
    expect(second.every((sequence) => track.counts.get(sequence) === 8)).toBe(true);
    expect(first.filter((sequence) => !second.includes(sequence)).some((sequence) => !track.counts.has(sequence))).toBe(true);
  }, 20000);
});

describe("Overview growth: a remount mid-read", () => {
  it("joins the read already running instead of reading the generation again", async () => {
    const track = daemon(25);
    const Wrapper = cache();
    const sequences = [1, 2, 3];
    const firstMount = renderHook(() => useGrowthPoints(sequences), { wrapper: Wrapper });
    await waitFor(() => expect(track.activeKinds).toBeGreaterThan(0));
    firstMount.unmount();
    const { result } = renderHook(() => useGrowthPoints(sequences), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    expect(result.current.points.every((point) => point !== null)).toBe(true);
    expect(sequences.map((sequence) => track.counts.get(sequence))).toEqual([8, 8, 8]);
    expect(track.peakGenerations).toBeLessThanOrEqual(GROWTH_CONCURRENCY);
  }, 20000);
});

describe("Overview growth: an immediate remount (React's development double mount)", () => {
  it("reads each generation once when the first mount is dropped before any read awaits", async () => {
    const track = daemon(10);
    const Wrapper = cache();
    const sequences = [1, 2, 3, 4];
    renderHook(() => useGrowthPoints(sequences), { wrapper: Wrapper }).unmount();
    const { result } = renderHook(() => useGrowthPoints(sequences), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 8000 });
    expect(result.current.points.every((point) => point !== null)).toBe(true);
    expect(sequences.map((sequence) => track.counts.get(sequence))).toEqual([8, 8, 8, 8]);
    expect(track.peakGenerations).toBeLessThanOrEqual(GROWTH_CONCURRENCY);
  }, 20000);
});

describe("Semaphore", () => {
  it("holds a free slot at once, grants waiters in arrival order, and lets a waiter leave the line", async () => {
    const gate = new Semaphore(1);
    const first = gate.enter();
    // a slot held at entry cannot be left: the holder releases it
    expect(first.cancel()).toBe(false);
    const leaving = gate.enter();
    const next = gate.enter();
    const order: string[] = [];
    void leaving.granted.then(() => order.push("leaving"), () => order.push("left"));
    void next.granted.then(() => order.push("next"));
    expect(leaving.cancel()).toBe(true);
    gate.release();
    await next.granted;
    await Promise.resolve();
    expect(order).toEqual(["left", "next"]);
    expect(next.cancel()).toBe(false);
  });
});

describe("pooled", () => {
  it("keeps the items' order and never runs more than the limit at once", async () => {
    let open = 0;
    let peak = 0;
    const out = await pooled([5, 1, 4, 2, 3], 2, async (n) => {
      open += 1;
      peak = Math.max(peak, open);
      await new Promise((resolve) => setTimeout(resolve, n));
      open -= 1;
      return n * 10;
    });
    expect(out).toEqual([50, 10, 40, 20, 30]);
    expect(peak).toBe(2);
  });
});
