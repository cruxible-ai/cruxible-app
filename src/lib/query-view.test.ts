import { describe, expect, it } from "vitest";
import { KEV_EXPOSURE_CARD, RELEASE_EXPOSURE_CARD, URGENT_EXPOSURES_CARD } from "@/fixtures/authored/queries";
import { KEV_TRIAGE_SPEC } from "@/fixtures/authored/definitions";
import type { Schemas } from "@/api/schemas";
import {
  columnField,
  expressionWords,
  filterLines,
  filterTree,
  filterWords,
  needsOntology,
  partsText,
  queryReaders,
  readQueryView,
  rowWords,
  typeWords,
  wholeKindTable,
} from "./query-view";
import { paramRun } from "./query-params";

const WATCHED: Schemas["GetQueryCard"] = {
  query: "security.watched_vulnerabilities",
  description: "Every vulnerability this instance tracks, with its CVE id.",
  params: [],
  definition: {
    query: "security.watched_vulnerabilities",
    row: "security.watched-vulnerability@1",
    from: { v: "security.vulnerability" },
    where: null,
    hops: [],
    fields: [{ cve_id: "v.security.vulnerability.cve_id" }, { subject_id: "v" }, { subject_kind: "v.subject_kind" }],
  },
};

describe("readQueryView", () => {
  it("reads a query with no hops as one box, one row per entry Subject, its fields in words", () => {
    const view = readQueryView(WATCHED)!;
    expect(view.boxes).toEqual([{ binding: "v", kinds: ["security.vulnerability"], entryParam: null, filters: [] }]);
    expect(view.links).toEqual([]);
    expect(rowWords(view)).toBe("1 row / vulnerability");
    expect(view.returns.map((item) => [item.name, partsText(item.from)])).toEqual([
      ["cve_id", "vulnerability.cve_id"],
      ["subject_id", "vulnerability.subject_id"],
      ["subject_kind", "vulnerability.subject_kind"],
    ]);
    expect(view.returns[0]!.from[0]).toMatchObject({ claimType: "security.vulnerability.cve_id" });
    expect(view.row).toBe("security.watched-vulnerability@1");
    // its whole answer is the kind table
    expect(wholeKindTable(view)).toBe("security.vulnerability");
  });

  it("reads hops as links between boxes, a reverse hop by the ClaimType the new box carries, filters on their box", () => {
    const view = readQueryView(KEV_EXPOSURE_CARD)!;
    expect(view.boxes.map((box) => [box.binding, box.kinds])).toEqual([
      ["v", ["security.vulnerability"]],
      ["a", ["security.assessment"]],
      ["r", ["security.release"]],
    ]);
    expect(view.links).toEqual([
      { from: "v", to: "a", claimType: "security.assessment.vulnerability", field: "vulnerability", reverse: true, required: false },
      { from: "a", to: "r", claimType: "security.assessment.release", field: "release", reverse: false, required: false },
    ]);
    // the top-level where names only v: it is written on v's box; the hop's on the assessment's
    expect(view.boxes[0]!.filters.map(partsText)).toEqual(["kev_listed is true"]);
    expect(view.boxes[1]!.filters.map(partsText)).toEqual(["status is affected"]);
    expect(view.filters).toEqual([]);
    expect(rowWords(view)).toBe("1 row / path vulnerability → assessment → release");
    expect(view.returns.map((item) => [item.name, partsText(item.from)])).toEqual([
      ["cve_id", "vulnerability.cve_id"],
      ["release", "release.subject_id"],
      ["status", "assessment.status"],
    ]);
    expect(wholeKindTable(view)).toBeNull();
  });

  it("names an entry parameter on its box and asks for it before a preview", () => {
    const view = readQueryView(RELEASE_EXPOSURE_CARD)!;
    expect(view.boxes[0]).toMatchObject({ kinds: ["security.release"], entryParam: "release" });
    const run = paramRun(view.params, {});
    expect(run.missing.map((param) => param.name)).toEqual(["release"]);
    expect(run.params).toBeUndefined();
    expect(wholeKindTable(view)).toBeNull();
  });

  it("runs the preview with declared defaults, and a defaulted parameter is not missing", () => {
    const card: Schemas["GetQueryCard"] = {
      query: "q",
      params: [{ name: "status", type: "string", required: true }],
      definition: {
        artifact_format: "cruxible-query-definition-v3",
        identity: { kind: "QueryDefinition", name: "q" },
        entry: { binding: "a", subject_kinds: ["security.assessment"] },
        result_binding: "a",
        parameters: [{ name: "status", value_type: "string", required: true, default: "affected" }],
        projection: { fields: [{ name: "status", value: { kind: "claim_value", binding: "a", predicate: "security.assessment.status" } }] },
      } as unknown as NonNullable<Schemas["GetQueryCard"]["definition"]>,
    };
    const view = readQueryView(card)!;
    expect(view.boxes[0]!.kinds).toEqual(["security.assessment"]);
    expect(view.returns.map((item) => partsText(item.from))).toEqual(["assessment.status"]);
    expect(paramRun(view.params, {})).toEqual({ params: { status: "affected" }, missing: [], invalid: [] });
    // a given value replaces the default
    expect(paramRun(view.params, { status: "fixed" }).params).toEqual({ status: "fixed" });
  });

  it("resolves a hop's target kind from the ontology when the hop does not state it", () => {
    const card: Schemas["GetQueryCard"] = {
      query: "q",
      definition: { query: "q", from: { a: "security.assessment" }, hops: [{ r: "a.release" }], fields: ["r"] },
    };
    const bare = readQueryView(card)!;
    expect(needsOntology(bare)).toBe(true);
    const view = readQueryView(card, [{ predicate: "security.assessment.release", type: "subject:security.release", subject_kinds: ["security.assessment"] }])!;
    expect(needsOntology(view)).toBe(false);
    expect(view.boxes[1]!.kinds).toEqual(["security.release"]);
    expect(view.links[0]).toMatchObject({ claimType: "security.assessment.release", field: "release" });
    // a bare binding field is named after the binding
    expect(view.returns[0]!.name).toBe("r");
  });

  it("is null for a card without a definition", () => {
    expect(readQueryView({ query: "q" })).toBeNull();
  });
});

describe("pair hops (the served security.urgent_exposures)", () => {
  const view = readQueryView(URGENT_EXPOSURES_CARD)!;

  it("names each box by the kind its hop binds: a pair hop binds its pair kind", () => {
    expect(view.boxes.map((box) => [box.binding, box.kinds])).toEqual([
      ["v", ["security.vulnerability"]],
      ["c", ["security.component"]],
      ["o", ["security.occurrence"]],
      ["i", ["security.inventory"]],
      ["e", ["security.exposure"]],
      ["ae", ["security.app_exposure"]],
    ]);
    expect(rowWords(view)).toBe("1 row / path vulnerability → component → occurrence → inventory → exposure → app exposure");
  });

  it("draws a pair hop's arrow from the part bound latest, backwards along that key part; the other parts and its fact sit on the box", () => {
    expect(view.links).toEqual([
      { from: "v", to: "c", claimType: "security.component.affected_by", field: "affected_by", reverse: true, required: true },
      { from: "c", to: "o", claimType: "security.occurrence.component", field: "component", reverse: true, required: true },
      { from: "o", to: "i", claimType: "security.occurrence.inventory", field: "inventory", reverse: false, required: true },
      { from: "c", to: "e", claimType: "security.exposure.component", field: "component", reverse: true, required: false },
      { from: "o", to: "ae", claimType: "security.app_exposure.occurrence", field: "occurrence", reverse: true, required: false },
    ]);
    const box = (binding: string) => view.boxes.find((item) => item.binding === binding)!;
    expect(box("o").pair).toEqual({ also: [], fact: { claimType: "security.occurrence.scope", field: "scope" } });
    expect(box("e").pair).toEqual({ also: [{ claimType: "security.exposure.vulnerability", field: "vulnerability", binding: "v" }], fact: null });
    expect(box("ae").pair?.also.map((part) => part.field)).toEqual(["vulnerability"]);
  });

  it("names a where clause's fields by their own box's kind, and a bare binding by its Subject id", () => {
    const text = partsText(view.filters[0]!);
    expect(text).toContain("exposure.justification is one of (vulnerable_code_not_present)");
    expect(text).toContain("has no app_exposure.justification and app_exposure.verdict is affected");
    expect(text).not.toContain("vulnerability.justification");
    expect(text).not.toContain("vulnerability.verdict");
    expect(view.returns.find((item) => item.name === "occurrence")!.from).toEqual([{ field: "occurrence.subject_id", claimType: null, title: "o" }]);
    expect(view.returns.find((item) => item.name === "scope")!.from[0]).toMatchObject({ field: "occurrence.scope", claimType: "security.occurrence.scope" });
  });

  it("reads the where clause line by line, each nested group indented under its connective", () => {
    const lines = filterLines(view.whereTrees[0]!).map((line) => `${"  ".repeat(line.depth)}${[...line.lead, line.parts ? partsText(line.parts) : ""].join(" ").trim()}`);
    expect(lines).toEqual([
      "not exposure.justification is one of (vulnerable_code_not_present)",
      "and not",
      "  has no app_exposure.justification",
      "  and app_exposure.verdict is affected",
      "and not",
      "    has no app_exposure.verdict",
      "    or app_exposure.verdict is not_affected",
      "  and app_exposure.justification is one of (component_not_present, inline_mitigations_already_exist, vulnerable_code_cannot_be_controlled_by_adversary, vulnerable_code_not_in_execute_path)",
    ]);
  });

  it("states the result budgets the definition declares", () => {
    expect(view.budgets).toEqual({ limit: 200, pathsPerResult: 100, maxResults: 2000, maxPathsPerResult: 1000 });
  });

  it("reads a typed pair step the same way", () => {
    const card: Schemas["GetQueryCard"] = {
      query: "q",
      definition: {
        entry: { binding: "c", subject_kinds: ["security.component"] },
        traversal: [
          {
            tag: "playbill-query-pair-step-v1",
            binding: "o",
            subject_kind: "security.occurrence",
            parts: [{ part: "security.occurrence.component", binding: "c" }],
            fact: "security.occurrence.scope",
            required: true,
          },
        ],
        projection: { fields: [{ name: "occurrence", value: { kind: "subject_field", binding: "o", field: "subject_id" } }] },
        default_budgets: { max_results: 50 },
      } as unknown as NonNullable<Schemas["GetQueryCard"]["definition"]>,
    };
    const typed = readQueryView(card)!;
    expect(typed.boxes[1]).toMatchObject({ binding: "o", kinds: ["security.occurrence"], pair: { also: [], fact: { field: "scope" } } });
    expect(typed.links[0]).toMatchObject({ from: "c", to: "o", field: "component", reverse: true, required: true });
    expect(typed.budgets).toEqual({ limit: 50, pathsPerResult: null, maxResults: null, maxPathsPerResult: null });
  });
});

describe("filterTree", () => {
  const bindings = new Map([["v", ["security.vulnerability"]]]);
  it("keeps text outside the grammar as one clause read as written", () => {
    expect(filterTree("v.x ==", bindings, null)).toMatchObject({ op: "clause" });
    expect(filterTree("(v.cvss > 7", bindings, null)).toMatchObject({ op: "clause" });
  });
  it("flattens same-operator runs and drops parentheses around one clause", () => {
    const tree = filterTree("(v.a == 1) and (v.b == 2 and v.c == 3)", bindings, null);
    expect(tree.op === "and" && tree.children.map((child) => child.op)).toEqual(["clause", "clause", "clause"]);
  });
});

describe("words", () => {
  const bindings = new Map([
    ["v", ["security.vulnerability"]],
    ["a", ["security.assessment"]],
  ]);

  it("reads operators, presence, parameters and another box's fields", () => {
    expect(partsText(filterWords("not exists v.security.vulnerability.kev_listed", bindings, "v"))).toBe("has no kev_listed");
    expect(partsText(filterWords("a.status != $wanted and v.cve_id ~ \"2024\"", bindings, "v"))).toBe(
      "assessment.status is not ‹wanted› and cve_id contains 2024",
    );
    expect(filterWords("v.cvss >= 7", bindings, "v")).toEqual([
      { field: "cvss", claimType: "security.vulnerability.cvss", title: "v.cvss" },
      { text: "is at least 7" },
    ]);
  });

  it("reads role() and verdict() over a field", () => {
    expect(partsText(expressionWords("verdict(a.security.assessment.status)", bindings))).toBe("verdict of assessment.status");
  });

  it("names Contract types in words", () => {
    expect(typeWords("string")).toBe("text");
    expect(typeWords("subject_reference")).toBe("a Subject");
    expect(typeWords("integer")).toBe("whole number");
  });

  it("reads a column served as value.<name> by its field name", () => {
    expect(columnField("value.subject_id")).toBe("subject_id");
    expect(columnField("value.other")).toBe("value.other");
    expect(columnField("cve_id")).toBe("cve_id");
  });
});

describe("queryReaders", () => {
  it("finds the Procedures whose read steps name the query, with the Lines that run them", () => {
    const specs = new Map([["security.kev-triage", KEV_TRIAGE_SPEC]]);
    const lines = [
      { line: "kev-triage", procedure: "security.kev-triage" },
      { line: "cve-applicability", procedure: "security.cve-applicability" },
    ];
    expect(queryReaders("security.kev_exposure", specs, lines)).toEqual([
      { procedure: "security.kev-triage", steps: ["watched"], lines: ["kev-triage"] },
    ]);
    expect(queryReaders("security.other", specs, lines)).toEqual([]);
  });
});
