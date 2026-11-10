import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GROWTH_CONCURRENCY, KIND_READS_IN_FLIGHT, pooled, useGrowthPoints } from "./useOverviewGrowth";

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

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
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
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper });
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
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false));
    expect([...result.current.points[0]!.byKind.keys()]).toEqual(["early", "late"]);
  });

  it("does not show a generation from its first page when its kinds never end within the budget", async () => {
    state.get.mockImplementation((path: string, { params: { query } }: { params: { query: Query } }) => {
      if (path.endsWith("/head")) return ok({ coordinate: coordinate(1), generation: 1 });
      if (query.kind) return ok({ kind_detail: { kind: query.kind, predicates: [] } });
      return ok({ accepted_at: "2026-11-10T00:00:00Z", kinds: [{ kind: "k", subjects: 1 }], next_cursor: "again" });
    });
    const { result } = renderHook(() => useGrowthPoints([1]), { wrapper });
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
    const { result } = renderHook(() => useGrowthPoints([1, 2, 3, 4, 5]), { wrapper });
    await waitFor(() => expect(result.current.pending).toBe(false), { timeout: 4000 });
    expect(generationsStarted.slice(0, 2)).toEqual([5, 4]);
    expect(peakGenerations).toBeLessThanOrEqual(GROWTH_CONCURRENCY);
    expect(peakKinds).toBeLessThanOrEqual(GROWTH_CONCURRENCY * KIND_READS_IN_FLIGHT);
    expect(result.current.points.map((p) => p?.sequence)).toEqual([1, 2, 3, 4, 5]);
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
