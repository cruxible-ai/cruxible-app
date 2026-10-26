import { describe, expect, it } from "vitest";
import type { OrientKindSummary, OrientPredicate } from "@/api/schemas";
import { buildTypeGraph, edgeForPredicate, objectKinds, ontologyKinds, summaryFieldCount } from "./type-graph";

// Orient's default map (counts, first fields) and its claim_types section,
// joined the way the app joins them.
const summaries: OrientKindSummary[] = [
  { kind: "a.assessment", subjects: 2, fields: ["about", "also", "release"], more_fields: 2 },
  { kind: "a.release", subjects: 1 },
  { kind: "a.vuln", subjects: 3, fields: ["rel"] },
];
const ct = (kind: string, name: string, cardinality: "one" | "many", type: string, evidence?: string[]): OrientPredicate => ({
  name,
  predicate: `${kind}.${name}`,
  cardinality,
  type,
  subject_kinds: [kind],
  ...(evidence ? { evidence } : {}),
});
const claimTypes: OrientPredicate[] = [
  ct("a.assessment", "release", "one", "subject:a.release", ["c.osv"]),
  ct("a.assessment", "vuln", "one", "subject:a.vuln", ["c.kev", "c.osv"]),
  ct("a.assessment", "also", "many", "subject:a.release"),
  ct("a.assessment", "status", "one", "enum"),
  ct("a.assessment", "about", "one", "subject"),
  ct("a.vuln", "rel", "many", "subject:a.vuln,b.ext"),
];
const kinds = ontologyKinds(summaries, claimTypes);

describe("ontology kinds", () => {
  it("lists each kind orient names with the ClaimTypes whose subject_kinds name it", () => {
    expect(kinds.map((k) => [k.kind, k.subjects, k.predicates.map((p) => p.name)])).toEqual([
      ["a.assessment", 2, ["release", "vuln", "also", "status", "about"]],
      ["a.release", 1, []],
      ["a.vuln", 3, ["rel"]],
    ]);
    expect(kinds[0]!.evidence).toEqual(["c.kev", "c.osv"]);
  });

  it("lists a ClaimType shared by several kinds under each, and skips kinds orient does not list", () => {
    const shared: OrientPredicate = { ...ct("a.work", "owner", "one", "subject:a.team"), subject_kinds: ["a.release", "a.vuln", "a.unlisted"] };
    const joined = ontologyKinds(summaries, [...claimTypes, shared]);
    expect(joined.map((k) => [k.kind, k.predicates.map((p) => p.predicate)])).toEqual([
      ["a.assessment", ["a.assessment.release", "a.assessment.vuln", "a.assessment.also", "a.assessment.status", "a.assessment.about"]],
      ["a.release", ["a.work.owner"]],
      ["a.vuln", ["a.vuln.rel", "a.work.owner"]],
    ]);
  });

  it("counts a kind summary's ClaimTypes as its first fields plus the rest", () => {
    expect(summaries.map(summaryFieldCount)).toEqual([5, 0, 1]);
  });
});

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
