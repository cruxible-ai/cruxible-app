import { describe, expect, it } from "vitest";
import { KEV_EXPOSURE_CARD, RELEASE_EXPOSURE_CARD } from "@/fixtures/authored/queries";
import { KEV_TRIAGE_SPEC } from "@/fixtures/authored/definitions";
import type { Schemas } from "@/api/schemas";
import {
  columnField,
  expressionWords,
  filterWords,
  missingParams,
  needsOntology,
  partsText,
  previewParams,
  queryReaders,
  readQueryView,
  rowWords,
  typeWords,
  wholeKindTable,
} from "./query-view";

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
    expect(missingParams(view).map((param) => param.name)).toEqual(["release"]);
    expect(previewParams(view)).toBeUndefined();
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
    expect(missingParams(view)).toEqual([]);
    expect(previewParams(view)).toEqual({ status: "affected" });
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
