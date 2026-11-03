import { describe, expect, it } from "vitest";
import type { ProcedureSpec } from "./definitions";
import { mandateContext, mandateWords, type MandateCard } from "./mandate-words";
import { phraseText } from "./step-words";

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

describe("Mandates in words", () => {
  const ctx = mandateContext(SPEC);

  it("a settle Mandate: what it settles from the source, what happens when a Subject leaves it, for whom, and the rest to review", () => {
    const words = mandateWords(SETTLE, ctx, true);
    expect(words.heading).toBe("May settle without review");
    expect(words.sentences.map(phraseText)).toEqual([
      "New and changed values extracted from the kev catalog for kev_date_added, kev_due_date, kev_ransomware_use, and listed_in.",
      "When a vulnerability leaves the kev catalog: retire its kev_date_added and kev_due_date; record the absence in listed_in.",
      "Only for the watched vulnerabilities.",
      "Everything else goes to review.",
    ]);
    // named things linked, raw names on hover only
    const first = words.sentences[0]!;
    expect(first.parts.find((p) => p.text === "listed_in")!.ref).toBe("ClaimType:security.vulnerability.listed_in");
    expect(first.parts.find((p) => p.text === "the kev catalog")!.ref).toBe("CaptureContract:security.kev-catalog");
    expect(first.title).toContain("ClaimType:security.vulnerability.listed_in (binds subject)");
    expect(first.title).toContain("Namespace claims");
    expect(mandateWords(SETTLE, ctx, false).sentences.map(phraseText)).not.toContain("Everything else goes to review.");
  });

  it("a propose Mandate with no scope covers anything the Line writes", () => {
    const words = mandateWords(card({ grants: "propose", scope: [] }), ctx, true);
    expect(words).toEqual({ heading: "Anything this Line writes may be proposed for review", sentences: [] });
  });

  it("other bases, value conditions, a condition Query and Subjects by ref", () => {
    const words = mandateWords(
      card({
        scope: [
          { claim_type: "ClaimType:security.assessment.status", changes: { create: { basis: ["derived"] } }, value: { to: ["affected"] }, binds: "subject" },
          { claim_type: "ClaimType:security.vulnerability.epss_score", changes: { revise: { basis: ["measured"] } }, binds: "subject" },
        ],
        subject_scope: ["security.vulnerability/cve-2024-3094"],
        condition: { query: "QueryDefinition:security.kev_exposure", binding_parameter: "assessment", required_fields: ["shipped"], fallback: "propose" },
      }),
      mandateContext(null),
    );
    expect(words.sentences.map(phraseText)).toEqual([
      "Changed values measured for epss_score; new values derived from other Claims for status.",
      "Only when status changes to affected.",
      "Only for security.vulnerability/cve-2024-3094.",
      "Only while the kev exposure allow it; otherwise it goes to review.",
    ]);
  });
});
