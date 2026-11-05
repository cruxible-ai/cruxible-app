import { describe, expect, it } from "vitest";
import type { ProcedureSpec } from "./definitions";
import { captureInputs, createdKinds, isDerive, kindProducers, listFields, listOutcome, stageOf, stateReads } from "./template";
import { changedItems, changeRows, unreviewedClaims, unreviewedClaimsAt } from "./run-changes";
import { G41, REVISED_CLAIM, RUN_T0_CARD, RUN_T1_CARD, TEMPLATE_MEMBERS, TEMPLATE_SPEC, clmT } from "@/fixtures/template";

const spec = TEMPLATE_SPEC as ProcedureSpec;
const grades = new Map([
  ["security.advisory-page", "observed"],
  ["security.advisory-view", "derived"],
  ["security.advisory-fixes", "derived"],
]);

describe("the Procedure template", () => {
  it("reads each step's stage off its authored form: a call taking a Capture into a derived kind is a derive", () => {
    expect(spec.steps.map((_, i) => stageOf(spec, i, grades))).toEqual(["read", "fetch", "derive", "derive", "extract", "claims"]);
    // grades unread: the slot's purity decides
    expect(isDerive(spec, 2, null)).toBe(true);
    // a derived kind it commits but no Capture it takes: a fetch
    expect(isDerive({ ...spec, steps: [{ call: "x", slot: "narrow", input: {}, captures: { capture: "security.advisory-view" } }] }, 0, grades)).toBe(false);
    // a closed kind renders generically
    expect(stageOf({ procedure: "p", steps: [{ guard: { op: "present", of: { $ref: "input", path: ["a"] } } }] } as ProcedureSpec, 0)).toBeNull();
  });

  it("names a derive's inputs: the Captures (with their kinds) and the state reads", () => {
    expect(captureInputs(spec, 2)).toEqual([{ step: "pages", field: "pages", kind: "security.advisory-page", at: "source" }]);
    expect(captureInputs(spec, 3).map((c) => `${c.step}.${c.field}`)).toEqual(["view.capture"]);
    expect(stateReads(spec, 2)).toEqual([{ step: "watched", query: "security.kev_exposure" }]);
  });

  it("finds a list of Captures in a slot's out Contract, and a run's kept, dropped and provider-incomplete members", () => {
    expect(listFields({ fields: [{ name: "pages", type: "list<capture<*>>{max_items: 20}" }, { name: "capture", type: "capture<*>" }] })).toEqual([{ field: "pages", maxItems: 20 }]);
    const outcome = listOutcome({
      kind: "call",
      captures: 2,
      members: [
        { index: 0, capture_digest: "sha256:a", status: "kept" },
        { index: 1, capture_digest: null, status: "dropped", reason: "oversized", request_url: "https://x/?page=2" },
      ],
      incomplete_captures: ["pages"],
    } as never);
    expect(outcome).toMatchObject({ kept: 1, dropped: 1, providerIncomplete: ["pages"] });
    expect(outcome!.members[1]).toMatchObject({ status: "dropped", reason: "oversized", requestUrl: "https://x/?page=2" });
    // an old run's summary serves neither
    expect(listOutcome({ kind: "call", captures: 1 })).toBeNull();
  });

  it("lists the kinds a claims step may create: its Subject's if_absent and value targets that declare create: if_absent", () => {
    expect(createdKinds(spec.steps[5]!)).toEqual(["security.advisory"]);
    expect(createdKinds({ ...(spec.steps[5] as object), subject: { kind: "k", key: {}, create: "if_absent" }, claims: [] } as never)).toEqual(["k"]);
  });

  it("names a derived kind's producers: operation per Line, step, and the kinds it derives from", () => {
    const producers = kindProducers("security.advisory-fixes", new Map([[spec.procedure, spec]]), [
      { line: "advisory-pages", procedure: spec.procedure, operations: { fixes: "advisory.fixes" } },
    ], grades);
    expect(producers).toEqual([
      expect.objectContaining({ step: "fixes", slot: "fixes", lines: [{ line: "advisory-pages", operation: "advisory.fixes", build: null }], derivesFrom: ["security.advisory-view"] }),
    ]);
  });
});

describe("a run's item changes", () => {
  it("rows each changed item: kind, Subject, ClaimType and value from the proposal's members, a re-observation from state", () => {
    const items = changedItems(RUN_T1_CARD.terminal_egress);
    expect(items).toHaveLength(6);
    expect(unreviewedClaims(items, TEMPLATE_MEMBERS)).toEqual([clmT(3)]);
    const statements = new Map([
      [clmT(3), { subject: { artifact_path: "subjects/security.vulnerability/cve-2024-3094.json" }, predicate: "security.vulnerability.advisory", object: { kind: "literal", value: "x" } } as never],
    ]);
    const rows = changeRows(items, TEMPLATE_MEMBERS, statements);
    expect(rows.map((r) => [r.change, r.disposition, r.subject, r.claimType])).toEqual([
      ["claim", "new", "security.vulnerability/cve-2024-3094", "security.vulnerability.fixed_in"],
      ["claim", "revised", "security.vulnerability/cve-2024-6387", "security.vulnerability.fixed_in"],
      ["subject", null, "security.advisory/vsa-2026-7", null],
      ["claim", "new", "security.vulnerability/cve-2024-6387", "security.vulnerability.advisory"],
      ["reobservation", null, "security.vulnerability/cve-2024-3094", "security.vulnerability.advisory"],
      ["retirement", "retired", "security.vulnerability/cve-2023-4863", "security.vulnerability.fixed_in"],
    ]);
    expect(rows[1]!.before).toEqual({ kind: "literal", value: "9.7p1" });
    expect(rows[0]!.digest).toMatch(/^sha256:/);
  });

  it("groups re-observed Claims by the run's own coordinate: where its terminal was accepted, else its bound coordinate (null)", () => {
    expect(unreviewedClaimsAt(changedItems(RUN_T1_CARD.terminal_egress), TEMPLATE_MEMBERS)).toEqual([{ accepted: null, ids: [clmT(3)] }]);
    expect(unreviewedClaimsAt(changedItems(RUN_T0_CARD.terminal_egress), [])).toEqual([{ accepted: G41.git_oid, ids: [REVISED_CLAIM] }]);
  });
});
