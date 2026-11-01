import { describe, expect, it } from "vitest";
import type { GetSubjectCard, OrientPredicate, SubjectHistoryEvent } from "@/api/schemas";
import { term } from "./vocabulary";
import { changeSetRun, changeSets, reasonWords } from "./change-sets";
import { claimStates, evidenceNeed, isKeyField, keyPredicates, literalSummary } from "./subject";

const RUN = `RUN-${"a0".repeat(32)}`;
const BOILERPLATE = `Proposed by Procedure security.osv-applicability run ${RUN} terminal propose\n\n428 items; each item's reason is recorded with the Claim or Subject it explains.`;

const descriptor = (name: string, type = "string", extra: Partial<OrientPredicate> = {}): OrientPredicate => ({
  name,
  predicate: `k.${name}`,
  cardinality: "one",
  type,
  ...extra,
});

const event = (field: string, reason: NonNullable<SubjectHistoryEvent["reason"]>, sequence = 9): SubjectHistoryEvent => ({
  change: "stated",
  field,
  predicate: `k.${field}`,
  claim: `CLM-${field}`,
  sequence,
  git_oid: "0".repeat(12),
  accepted: "2026-10-31T15:30:00Z",
  actor: "robertmalone",
  approved_by: ["robertmalone"],
  reason,
});

describe("Subject page helpers", () => {
  it("reads a ClaimType's evidence need, unknown until the ClaimTypes are read", () => {
    expect(evidenceNeed(descriptor("a", "string", { evidence_requirement: "captured" }))).toBe("required");
    expect(evidenceNeed(descriptor("a", "string", { evidence_requirement: "none" }))).toBe("none");
    // orient omits `self`
    expect(evidenceNeed(descriptor("a"))).toBe("own-words");
    expect(evidenceNeed(undefined)).toBe("unknown");
  });

  it("reads key parts from the SubjectKinds; minted kinds have none", () => {
    const keys = keyPredicates([
      { kind: "k", rule: "keys", keys: ["k.id"] },
      { kind: "m", rule: "minted" },
    ]);
    expect(isKeyField(keys.get("k"), "id", descriptor("id"))).toBe(true);
    expect(isKeyField(keys.get("k"), "k.id")).toBe(true);
    expect(isKeyField(keys.get("k"), "name", descriptor("name"))).toBe(false);
    expect(isKeyField(keys.get("m"), "id", descriptor("id"))).toBe(false);
  });

  it("tallies the Claims in each state that is not supported", () => {
    expect(claimStates([{ verdict: "supported" }, { verdict: "supported", flags: [] }]).states.size).toBe(0);
    const { total, states } = claimStates([
      { verdict: "supported", flags: ["contested"] },
      { verdict: "supported", flags: ["contested", "stale"] },
      { verdict: "contradicted" },
    ]);
    expect(total).toBe(3);
    expect(Object.fromEntries(states)).toEqual({ contested: 2, stale: 1, contradicted: 1 });
  });

  it("hides core's proposal boilerplate and finds the run in it", () => {
    expect(reasonWords({ kind: "change_set", text: BOILERPLATE, proposal: "p" })).toBeNull();
    expect(reasonWords({ kind: "change_set", text: "Vendor says no.", proposal: "p", truncated: true })).toBe("Vendor says no.…");
    expect(reasonWords({ kind: "change_set", text: `${BOILERPLATE}\n\nChecked by hand too.`, proposal: "p" })).toBe("Checked by hand too.");
    expect(changeSetRun([event("cve_id", { kind: "change_set", text: BOILERPLATE, proposal: "p" })])).toEqual({
      run: RUN,
      procedure: "Procedure:security.osv-applicability",
    });
    // an item's reason names the run outright
    expect(
      changeSetRun([
        event("cve_id", { kind: "change_set", text: "Hand-written.", proposal: "p" }),
        event("package", { kind: "procedure_item", reason: "OSV", proposal: "p", procedure: "Procedure:x", run: "RUN-1", terminal: "propose" }),
      ]),
    ).toEqual({ run: "RUN-1", procedure: "Procedure:x" });
    expect(changeSetRun([event("a", { kind: "change_set", text: "Hand-written.", proposal: "p" })])).toBeNull();
  });

  it("groups one change set's events, split by generation and proposal", () => {
    const a = { kind: "change_set" as const, text: "a", proposal: "p1" };
    const b = { kind: "change_set" as const, text: "b", proposal: "p2" };
    expect(changeSets([event("x", a), event("y", a), event("z", b), event("w", b, 8)]).map((g) => g.length)).toEqual([2, 1, 1]);
  });

  it("summarizes a Subject by its literal fields: single-valued first, no keys, no Subject links", () => {
    const predicates = new Map<string, OrientPredicate>([
      ["k\ncomponent", descriptor("component", "string", { cardinality: "many" })],
      ["k\nid", descriptor("id")],
      ["k\nrelease", descriptor("release", "subject:r")],
      ["k\nstatus", descriptor("status", "enum")],
      ["k\nnotes", descriptor("notes", "json")],
    ]);
    const card: Pick<GetSubjectCard, "kind" | "claims"> = {
      kind: "k",
      claims: [
        { predicate: "component", claim: "c1", value: ["pkg:pypi/pypdf@6.10.2"] },
        { predicate: "id", claim: "c2", value: "x-1" },
        { predicate: "release", claim: "c3", value: "r/1" },
        { predicate: "status", claim: "c4", value: "affected" },
        { predicate: "notes", claim: "c5", value: { truncated: true, preview: "long", length: 4000 } },
      ],
    };
    expect(literalSummary(card, predicates, new Set(["k.id"]))).toEqual([
      { field: "status", value: "affected" },
      { field: "component", value: "pkg:pypi/pypdf@6.10.2" },
    ]);
  });

  it("reads gone states struck through, attention amber and wrong red", () => {
    expect(term("claim", "retired").gone).toBe(true);
    expect(term("claim", "overturned").gone).toBe(true);
    expect(term("claim", "stale_evidence").signal).toBe("waiting");
    expect(term("claim", "unsure_hold").signal).toBe("waiting");
    expect(term("claim", "refused").signal).toBe("wrong");
    expect(term("claim", "supported").signal).toBeUndefined();
  });
});
