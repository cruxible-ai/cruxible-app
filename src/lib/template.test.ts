import { describe, expect, it } from "vitest";
import type { ProcedureSpec } from "./definitions";
import { callOutputs, captureInputs, createdKinds, isDerive, kindProducers, listFields, listOutcome, stageOf, stateReads } from "./template";
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
      members: [
        { field: "pages", index: 0, capture: "sha256:a", request: "sha256:r0", status: "selected" },
        { field: "pages", index: 1, capture: null, request: "sha256:r1", status: "omitted", reason: "oversized" },
      ],
      members_truncated: true,
      incomplete_captures: ["pages"],
    });
    expect(outcome).toMatchObject({ kept: 1, dropped: 1, truncated: true, providerIncomplete: ["pages"] });
    expect(outcome!.members[1]).toMatchObject({ field: "pages", status: "omitted", reason: "oversized", request: "sha256:r1", capture: null });
    // an old run's node serves neither
    expect(listOutcome({})).toBeNull();
  });

  it("calls a call's other Captures list members only when membership is known", () => {
    const call = (digests: string[], members?: unknown[]) =>
      ({ summary: { kind: "call" as const, captures: digests.length, capture_digests: digests }, ...(members ? { members } : {}) }) as never;
    // served members: index known
    expect(
      callOutputs(call(["a", "b"], [{ field: "pages", index: 0, capture: "a", status: "selected" }, { field: "pages", index: 1, capture: "b", status: "selected" }]), "b", null),
    ).toMatchObject({ kind: "members", members: [{ index: 0 }, { index: 1 }] });
    // one Capture field, list-typed: members without pages
    expect(callOutputs(call(["a", "b"]), "a", { captures: ["pages"], lists: ["pages"] })).toEqual({ kind: "field", field: "pages", digests: ["a", "b"] });
    // two scalar Capture fields: unclassified
    expect(callOutputs(call(["a", "b"]), "a", { captures: ["body", "headers"], lists: [] })).toEqual({ kind: "unclassified", digests: ["a", "b"] });
    // a list field beside a scalar one, or fields unread: unclassified
    expect(callOutputs(call(["a", "b", "c"]), "c", { captures: ["pages", "headers"], lists: ["pages"] })?.kind).toBe("unclassified");
    expect(callOutputs(call(["a", "b"]), "a", null)?.kind).toBe("unclassified");
    // returned alone
    expect(callOutputs(call(["a"]), "a", null)).toBeNull();
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

  it("groups by coordinate in one pass: item visits grow linearly (N = 10, 100, 1000)", () => {
    // A visit: an array iteration yielding an item (a loop or a copy of a list holding it), or a read of its egress or child.
    const visitsAt = (n: number) => {
      let visits = 0;
      const egress = { node_id: "write", kind: "claims", accepted_git_oid: null };
      const items = Array.from({ length: n }, (_, i) => {
        const child = { child_index: i, path: `claims/7d/CLM-${i.toString(16).padStart(32, "0")}.json`, change_kind: "reobservation" };
        const item = {};
        Object.defineProperty(item, "egress", { enumerable: true, get: () => (visits++, egress) });
        Object.defineProperty(item, "child", { enumerable: true, get: () => (visits++, child) });
        return item;
      });
      const tracked = new Set<unknown>(items);
      const proto = Array.prototype as unknown as { [Symbol.iterator]: (this: unknown[]) => Iterator<unknown> };
      const iterate = proto[Symbol.iterator];
      proto[Symbol.iterator] = function (this: unknown[]) {
        const inner = iterate.call(this);
        return {
          next: () => {
            const step = inner.next();
            if (!step.done && tracked.has(step.value)) visits++;
            return step;
          },
          [Symbol.iterator]() {
            return this;
          },
        } as Iterator<unknown>;
      };
      let groups: ReturnType<typeof unreviewedClaimsAt>;
      try {
        groups = unreviewedClaimsAt(items as never, []);
      } finally {
        proto[Symbol.iterator] = iterate;
      }
      expect(groups).toEqual([{ accepted: null, ids: expect.any(Array) }]);
      expect(groups[0]!.ids).toHaveLength(n);
      return visits;
    };
    for (const n of [10, 100, 1000]) expect(visitsAt(n)).toBeLessThanOrEqual(3 * n);
  });
});
