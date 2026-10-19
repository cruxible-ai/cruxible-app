import { describe, expect, it } from "vitest";
import type { OrientKind } from "@/api/schemas";
import { buildTypeGraph, edgeForPredicate, objectKinds } from "./type-graph";

const kinds: OrientKind[] = [
  {
    kind: "a.assessment",
    subjects: 2,
    predicates: [
      { name: "release", predicate: "a.assessment.release", cardinality: "one", type: "subject:a.release" },
      { name: "vuln", predicate: "a.assessment.vuln", cardinality: "one", type: "subject:a.vuln" },
      { name: "also", predicate: "a.assessment.also", cardinality: "many", type: "subject:a.release" },
      { name: "status", predicate: "a.assessment.status", cardinality: "one", type: "enum" },
      { name: "about", predicate: "a.assessment.about", cardinality: "one", type: "subject" },
    ],
  },
  { kind: "a.release", subjects: 1, predicates: [] },
  {
    kind: "a.vuln",
    subjects: 3,
    predicates: [{ name: "rel", predicate: "a.vuln.rel", cardinality: "many", type: "subject:a.vuln,b.ext" }],
  },
];

describe("type graph", () => {
  it("parses Subject-valued types", () => {
    expect(objectKinds("subject:a.b,c.d")).toEqual(["a.b", "c.d"]);
    expect(objectKinds("subject")).toEqual([]);
    expect(objectKinds("enum")).toEqual([]);
  });

  it("draws one edge per kind pair, with self-loops and referenced-only kinds", () => {
    const graph = buildTypeGraph(kinds);
    expect(graph.nodes.map((n) => [n.kind, n.referencedOnly])).toEqual([
      ["a.assessment", false],
      ["a.release", false],
      ["a.vuln", false],
      ["b.ext", true],
    ]);
    const pair = graph.edges.find((e) => e.id === "a.assessment->a.release")!;
    expect(pair.predicates.map((p) => p.name)).toEqual(["release", "also"]);
    expect(graph.edges.map((e) => e.id).sort()).toEqual([
      "a.assessment->a.release",
      "a.assessment->a.vuln",
      "a.vuln->a.vuln",
      "a.vuln->b.ext",
    ]);
    expect(edgeForPredicate(graph.edges, "a.assessment.vuln")?.target).toBe("a.vuln");
    expect(edgeForPredicate(graph.edges, "a.assessment.status")).toBeUndefined();
  });
});
