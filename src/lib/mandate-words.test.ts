import { describe, expect, it } from "vitest";
import type { ProcedureSpec } from "./definitions";
import { mandateContext, mandateTable, type MandateCard } from "./mandate-words";
import { lastSegment, partsText } from "./step-words";

const step = (name: string, ...path: string[]) => ({ $ref: "step" as const, step: name, path });
const item = (...path: string[]) => ({ $ref: "item" as const, path });

const SPEC = {
  procedure: "security.kev-triage",
  steps: [
    { call: "catalog", slot: "fetch", input: {}, captures: { capture: "security.kev-catalog" } },
    { read: "watched", query: "security.watched_vulnerabilities" },
    {
      id: "write",
      claims: [
        { type: "security.vulnerability.listed_in", value: {} },
        { type: "security.vulnerability.kev_date_added", value: item("fields", "date_added") },
      ],
      for_each: step("entries", "records"),
      subject: { kind: "security.vulnerability", key: {} },
      expect: step("watched", "rows"),
    },
  ],
} as unknown as ProcedureSpec;

const card = (extra: Partial<MandateCard>): MandateCard => ({
  mandate: "ProcedureMandate:security.kev-triage-settle",
  line: "Line:security.kev-triage",
  grants: "settle",
  lifecycle: "live",
  state: "active",
  valid_from: "2026-11-02T00:58:21Z",
  expires_at: "2027-02-01T00:58:21Z",
  namespace: ["claims"],
  ...extra,
});

const SETTLE = card({
  scope: [
    { claim_type: "ClaimType:security.vulnerability.kev_date_added", changes: { create: { basis: ["extracted"] }, revise: { basis: ["extracted"] }, retire: { basis: ["absence"] } }, binds: "subject" },
    { claim_type: "ClaimType:security.vulnerability.kev_due_date", changes: { create: { basis: ["extracted"] }, revise: { basis: ["extracted"] }, retire: { basis: ["absence"] } }, binds: "subject" },
    { claim_type: "ClaimType:security.vulnerability.kev_ransomware_use", changes: { create: { basis: ["extracted"] }, revise: { basis: ["extracted"] } }, binds: "subject" },
    { claim_type: "ClaimType:security.vulnerability.listed_in", changes: { create: { basis: ["extracted", "absence"] }, revise: { basis: ["extracted", "absence"] } }, binds: "subject" },
  ],
  subjects: "expected",
});

describe("Mandates as tables", () => {
  const ctx = mandateContext(SPEC);

  it("a settle Mandate: per ClaimType what it settles, what it does on removal, and its bases; Subjects by the expected Query", () => {
    const table = mandateTable(SETTLE, ctx);
    expect(table.rows.map((r) => [lastSegment(r.claimType), r.settles, r.onRemoval, r.basis.join(", ")])).toEqual([
      ["kev_date_added", "new, changed", "retires", "extracted, absence"],
      ["kev_due_date", "new, changed", "retires", "extracted, absence"],
      ["kev_ransomware_use", "new, changed", "—", "extracted"],
      ["listed_in", "new, changed", "records absent", "extracted, absence"],
    ]);
    expect(table.subjects).toEqual([expect.objectContaining({ text: "watched_vulnerabilities", ref: "QueryDefinition:security.watched_vulnerabilities" })]);
    expect(table.condition).toBeNull();
  });

  it("expected Subjects fall back to the Query the claims step writes within when it expects none", () => {
    const within = {
      ...SPEC,
      steps: SPEC.steps.map((st) => ("claims" in st ? { ...st, expect: null, subject: { ...st.subject, within: step("watched", "rows") } } : st)),
    } as ProcedureSpec;
    expect(mandateContext(within)).toEqual({ expectedQuery: "security.watched_vulnerabilities" });
  });

  it("a Mandate with no scope has no rows (the page notes it covers everything)", () => {
    expect(mandateTable(card({ grants: "propose", scope: [] }), ctx).rows).toEqual([]);
  });

  it("other bases, value conditions, a condition Query, Subjects by ref, creation", () => {
    const table = mandateTable(
      card({
        scope: [
          { claim_type: "ClaimType:security.assessment.status", changes: { create: { basis: ["derived"] } }, value: { to: ["affected"] }, binds: "subject" },
          { claim_type: "ClaimType:security.vulnerability.epss_score", changes: { revise: { basis: ["measured"] } }, binds: "subject" },
        ],
        subject_scope: ["security.vulnerability/cve-2024-3094"],
        condition: { query: "QueryDefinition:security.kev_exposure", binding_parameter: "assessment", required_fields: ["shipped"], fallback: "propose" },
        subject_creation: ["security.assessment"],
      }),
      mandateContext(null),
    );
    expect(table.rows.map((r) => [r.claimType, r.settles, r.onRemoval, r.basis])).toEqual([
      ["security.assessment.status", "new (to affected)", "—", ["derived"]],
      ["security.vulnerability.epss_score", "changed", "—", ["measured"]],
    ]);
    expect(partsText(table.subjects!)).toBe("security.vulnerability/cve-2024-3094");
    expect(partsText(table.condition!)).toBe("kev_exposure · else review");
    expect(partsText(table.creates)).toBe("assessment");
  });
});
