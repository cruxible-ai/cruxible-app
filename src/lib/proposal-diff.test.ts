import { describe, expect, it } from "vitest";
import type { Schemas } from "@/api/schemas";
import { BELIEF_MEMBERS, CAPTURE_A, CAPTURE_B, PROCEDURE_MEMBER } from "@/fixtures/authored/proposal-diff";
import {
  beliefDiff,
  citedCaptures,
  claimEvidence,
  columnLabels,
  definitionFields,
  fieldName,
  groupDiff,
  hasReason,
  proposalEgress,
  recordKeyText,
  reviewReason,
  valueText,
} from "./proposal-diff";

const V1 = "security.vulnerability/cve-2024-0001";
const V2 = "security.vulnerability/cve-2024-0002";
const NEW = "security.vulnerability/cve-2026-0009";
const KEV = "security.vulnerability.kev_listed";
const EPSS = "security.vulnerability.epss_score";
const RELATED = "security.vulnerability.related";
const CARDINALITY = new Map([
  [KEV, "one"],
  [EPSS, "one"],
  [RELATED, "many"],
  ["security.vulnerability.cve_id", "one"],
]);

const literal = (value: unknown) => ({ kind: "literal", value });

describe("beliefDiff", () => {
  const diff = beliefDiff(BELIEF_MEMBERS, CARDINALITY);

  it("reads one row per Subject and one column per ClaimType", () => {
    expect(diff.rows.map((r) => r.subject)).toEqual([V1, V2, NEW]);
    expect(diff.claimTypes).toEqual(["security.vulnerability.cve_id", EPSS, KEV, RELATED]);
    expect(diff.definitions).toEqual([]);
    expect(diff.unreadable).toEqual([]);
  });

  it("pairs a one-valued slot's retire + create as old -> new", () => {
    const cell = diff.rows[0]!.cells[KEV]!;
    expect(cell.changes).toHaveLength(1);
    expect(cell.changes[0]).toMatchObject({ kind: "revised", before: literal(false), after: literal(true) });
    expect(cell.changes[0]!.replaced?.path).toMatch(/CLM-0+2\.json$/);
  });

  it("reads a revision in place, a retirement, many values and an inverse", () => {
    const v2 = diff.rows[1]!.cells;
    expect(v2[EPSS]!.changes[0]).toMatchObject({ kind: "revised", before: literal("0.1"), after: literal("0.97") });
    expect(v2[KEV]!.changes[0]).toMatchObject({ kind: "retired", before: literal(true), after: undefined });
    expect(v2[RELATED]!.changes.map((c) => c.kind)).toEqual(["new", "new"]);
    expect(v2[RELATED]!.changes.map((c) => valueText(c.after))).toEqual([V1, `none of ${NEW}`]);
  });

  it("marks a created Subject and counts changes by kind", () => {
    expect(diff.rows[2]!.subjectMember?.disposition).toBe("create");
    expect(diff.counts).toEqual({ new: 3, revised: 2, retired: 1 });
    expect(diff.subjectCounts.new).toBe(1);
  });

  it("keeps a many-valued slot's retire and create apart", () => {
    const many = beliefDiff(BELIEF_MEMBERS, new Map([...CARDINALITY, [KEV, "many"]]));
    expect(many.rows[0]!.cells[KEV]!.changes.map((c) => c.kind)).toEqual(["new", "retired"]);
  });

  it("without cardinality, pairs only one retire beside one create", () => {
    expect(beliefDiff(BELIEF_MEMBERS).rows[0]!.cells[KEV]!.changes.map((c) => c.kind)).toEqual(["revised"]);
  });

  it("reads definitions beside beliefs in a mixed proposal", () => {
    const mixed = beliefDiff([PROCEDURE_MEMBER, BELIEF_MEMBERS[0]!, BELIEF_MEMBERS[1]!]);
    expect(mixed.definitions).toHaveLength(1);
    expect(mixed.definitions[0]).toMatchObject({ kind: "revised", type: "Procedure", name: "security.kev-triage", ref: "Procedure:security.kev-triage" });
    expect(mixed.rows.map((r) => r.subject)).toEqual([NEW]);
  });

  it("drops the shared Subject kind from column labels unless two would collide", () => {
    const labels = columnLabels(diff.claimTypes, diff.rows);
    expect(labels.get(EPSS)).toBe("epss_score");
    const clash = columnLabels(["a.x.name", "b.y.name"], [
      { subject: "a.x/1", subjectMember: null, cells: { "a.x.name": { subject: "a.x/1", claimType: "a.x.name", changes: [] } } },
      { subject: "b.y/1", subjectMember: null, cells: { "b.y.name": { subject: "b.y/1", claimType: "b.y.name", changes: [] } } },
    ]);
    expect(clash.get("a.x.name")).toBe("a.x.name");
  });
});

describe("groupDiff", () => {
  const diff = beliefDiff(BELIEF_MEMBERS, CARDINALITY);

  it("by Capture: one section per cited Capture, then the changes citing none", () => {
    const sections = groupDiff(diff, "capture");
    expect(sections.map((s) => [s.key, s.count])).toEqual([
      [CAPTURE_A, 2],
      [CAPTURE_B, 1],
      ["", 3],
    ]);
    expect(sections[0]!.rows.map((r) => r.subject)).toEqual([V1, V2]);
    expect(sections[0]!.claimTypes).toEqual([KEV]);
  });

  it("by change kind and by ClaimType", () => {
    expect(groupDiff(diff, "change").map((s) => [s.key, s.count])).toEqual([
      ["new", 3],
      ["revised", 2],
      ["retired", 1],
    ]);
    // the created Subject sits with the new changes
    expect(groupDiff(diff, "change")[0]!.rows.map((r) => r.subject)).toContain(NEW);
    expect(groupDiff(diff, "claim-type").map((s) => s.key)).toEqual(diff.claimTypes);
    expect(groupDiff(diff, "subject")).toHaveLength(1);
  });
});

describe("evidence", () => {
  it("reads the Capture, record and field read from the candidate's backing", () => {
    const evidence = claimEvidence(BELIEF_MEMBERS[4]!);
    expect(evidence).toMatchObject({ basis: "extracted", capture: CAPTURE_B, fieldPath: "/data/0/epss", recordLocator: "/data/0" });
    expect(recordKeyText(evidence.recordKey!)).toBe("CVE-2024-0002");
    expect(fieldName("/data/0/percentile")).toBe("percentile");
  });

  it("collects each cited Capture once", () => {
    expect(citedCaptures(BELIEF_MEMBERS)).toEqual([CAPTURE_A, CAPTURE_B]);
  });
});

describe("why in review", () => {
  const egress = (extra: Partial<Schemas["ProcedureTerminalEgress"]>): Schemas["ProcedureTerminalEgress"] => ({
    node_id: "write",
    kind: "claims",
    verdict: "delivered",
    required_authority: "settle",
    effective_authority: "settle",
    limiting_term: "procedure_terminal_capability",
    proposal_id: "sha256:" + "b1".repeat(32),
    settle_outcome: "proposed",
    ...extra,
  });

  it("finds the run's claims egress for this proposal and reads its scope gaps", () => {
    const found = proposalEgress(
      [egress({ proposal_id: "sha256:" + "0".repeat(64) }), egress({ outside_scope: [{ claim_type: "security.vulnerability.epss_score", change: "revise", basis: "extracted", term: "basis" }], capped_by: "mandate_grant" })],
      "sha256:" + "b1".repeat(32),
    );
    const reason = reviewReason(found);
    expect(reason?.gaps).toHaveLength(1);
    expect(reason?.cappedBy).toBe("mandate_grant");
    // the limiting term limited nothing: effective authority met the required one
    expect(reason?.limitingTerm).toBeNull();
    expect(hasReason(reason)).toBe(true);
  });

  it("names the limiting term when it lowered the authority, and nothing when the egress settled", () => {
    expect(reviewReason(egress({ effective_authority: "propose", limiting_term: "line_max_authority" }))?.limitingTerm).toBe("line_max_authority");
    expect(hasReason(reviewReason(egress({ settle_outcome: "settled", outside_scope: [] })))).toBe(false);
    expect(proposalEgress([egress({})], "sha256:" + "f".repeat(64))).toBeNull();
  });
});

describe("definitionFields", () => {
  it("groups by top-level field and reads a {kind, name} pair as one ref", () => {
    const groups = definitionFields(PROCEDURE_MEMBER);
    expect(groups.map((g) => g.group)).toEqual(["description", "budget", "contract"]);
    expect(groups[1]!.fields[0]).toMatchObject({ field: "max_steps", before: 8, after: 12 });
    expect(groups[2]!.fields).toEqual([
      expect.objectContaining({ field: "", ref: { before: "Contract:http-response-v0", after: "Contract:http-response-v1" } }),
    ]);
  });
});
