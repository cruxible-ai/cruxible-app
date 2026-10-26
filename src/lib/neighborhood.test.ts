import { describe, expect, it } from "vitest";
import type { GetResult } from "@/api/schemas";
import { walkNeighborhood, type CardFetcher } from "./neighborhood";
import type { OntologyKind } from "./type-graph";

const kinds: OntologyKind[] = [
  {
    kind: "a.x",
    subjects: 3,
    evidence: [],
    predicates: [
      { name: "to", predicate: "a.x.to", cardinality: "many", type: "subject:a.x" },
      { name: "label", predicate: "a.x.label", cardinality: "one", type: "string" },
    ],
  },
];

/** A chain/fan world: a.x/n points at the ids in `links[n]`. */
function world(links: Record<string, string[]>, missing: string[] = []) {
  const calls: string[][] = [];
  const card = (ref: string): GetResult => ({
    ref,
    kind: "subject",
    detail: "summary",
    coordinate: { git_oid: "000000000001", generation: 1 },
    evaluation_time: "2026-10-19T00:00:00Z",
    card: {
      subject: ref,
      kind: "a.x",
      lifecycle: "live",
      incoming_count: 1,
      claims: [
        { predicate: "label", claim: "CLM-l", value: ref },
        { predicate: "to", claim: (links[ref] ?? []).map((_, i) => `CLM-${i}`), value: (links[ref] ?? []).map((id) => `a.x/${id}`) },
      ],
    },
  });
  const fetch: CardFetcher = async (refs) => {
    calls.push(refs);
    if (refs.some((ref) => missing.includes(ref))) throw new Error("ref_not_found");
    return refs.map(card);
  };
  return { fetch, calls };
}

describe("neighborhood walk", () => {
  it("follows outgoing Subject-valued Claims only, by ClaimType type, to the requested depth", async () => {
    const { fetch, calls } = world({ "a.x/r": ["b", "c"], "a.x/b": ["d"], "a.x/d": ["e"] });
    const one = await walkNeighborhood("a.x/r", 1, kinds, fetch);
    expect(one.nodes.map((n) => [n.ref, n.depth])).toEqual([["a.x/r", 0], ["a.x/b", 1], ["a.x/c", 1]]);
    expect(one.edges.map((e) => `${e.source}>${e.target}`)).toEqual(["a.x/r>a.x/b", "a.x/r>a.x/c"]);
    // a.x/b names a.x/d beyond depth 1: counted, not drawn.
    expect(one.nodes.find((n) => n.ref === "a.x/b")).toMatchObject({ outgoingTotal: 1, outgoingShown: 0 });
    expect(calls).toEqual([["a.x/r"], ["a.x/b", "a.x/c"]]);

    const two = await walkNeighborhood("a.x/r", 2, kinds, fetch);
    expect(two.nodes.map((n) => n.ref)).toEqual(["a.x/r", "a.x/b", "a.x/c", "a.x/d"]);
    expect(two.calls).toBe(3);
  });

  it("stops at the node cap and says so", async () => {
    const fan = Array.from({ length: 10 }, (_, i) => `n${i}`);
    const { fetch } = world({ "a.x/r": fan });
    const graph = await walkNeighborhood("a.x/r", 1, kinds, fetch, 5);
    expect(graph.nodes).toHaveLength(5);
    expect(graph.capped).toBe(true);
    expect(graph.edges).toHaveLength(4);
  });

  it("isolates a dangling target instead of losing its whole batch", async () => {
    const { fetch, calls } = world({ "a.x/r": ["ok", "gone"] }, ["a.x/gone"]);
    const graph = await walkNeighborhood("a.x/r", 1, kinds, fetch);
    expect(graph.nodes.find((n) => n.ref === "a.x/ok")?.card).not.toBeNull();
    expect(graph.nodes.find((n) => n.ref === "a.x/gone")?.error).toContain("ref_not_found");
    expect(calls).toEqual([["a.x/r"], ["a.x/ok", "a.x/gone"], ["a.x/ok"], ["a.x/gone"]]);
  });

  it("draws one page of the root's incoming links one column to the left", async () => {
    const { fetch } = world({ "a.x/r": ["b"], "a.x/p": ["r"] });
    const graph = await walkNeighborhood("a.x/r", 1, kinds, fetch, 150, async (subject, cursor) => {
      expect([subject, cursor]).toEqual(["a.x/r", null]);
      return { claims: [{ subject: "a.x/p", predicate: "a.x.to", claim: "CLM-p" }], nextCursor: "more" };
    });
    expect(graph.nodes.find((n) => n.ref === "a.x/p")?.depth).toBe(-1);
    expect(graph.edges.map((e) => `${e.source}>${e.target}`)).toContain("a.x/p>a.x/r");
    expect(graph.incomingMore).toBe(true);
  });

  it("batches a hop 64 refs per call", async () => {
    const fan = Array.from({ length: 100 }, (_, i) => `n${i}`);
    const { calls, fetch } = world({ "a.x/r": fan });
    await walkNeighborhood("a.x/r", 1, kinds, fetch);
    expect(calls.map((c) => c.length)).toEqual([1, 64, 36]);
  });
});
