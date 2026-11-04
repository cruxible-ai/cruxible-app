import { describe, expect, it } from "vitest";
import type { Schemas } from "@/api/schemas";
import type { LineDefinition, ProcedureSpec } from "./definitions";
import { beliefChanges, kindFeeds, latestByKind, sinceLower } from "./overview";

type SinceRow = Schemas["SinceRow"];

const row = (generation: number, path: string, disposition: SinceRow["disposition"], statement?: SinceRow["statement"], kind = "claim"): SinceRow => ({
  generation,
  changeset_digest: "sha256:" + "c".repeat(64),
  candidate_digest: "sha256:" + "d".repeat(64),
  member_path: path,
  artifact_kind: kind,
  disposition,
  artifact_digest: "sha256:" + "a".repeat(64),
  predecessor_artifact_digest: null,
  ...(statement ? { statement } : {}),
});

describe("sinceLower", () => {
  const generations = [
    { sequence: 10, members: 30 },
    { sequence: 9, members: 34 },
    { sequence: 8, members: 8 },
    { sequence: 7, members: 400 },
    { sequence: 6, members: 8 },
  ];

  it("takes the newest generations whose members fit the budget", () => {
    expect(sinceLower(generations, 10, 100)).toBe(7);
    expect(sinceLower(generations, 10, 1000)).toBe(5);
  });

  it("always takes the newest generation, however large", () => {
    expect(sinceLower([{ sequence: 4, members: 5000 }, { sequence: 3, members: 1 }], 4, 300)).toBe(3);
  });

  it("stops at a gap in the page and at genesis", () => {
    expect(sinceLower([{ sequence: 42, members: 1 }, { sequence: 41, members: 14 }, { sequence: 0, members: 0 }], 42)).toBe(40);
    expect(sinceLower([{ sequence: 1, members: 3 }, { sequence: 0, members: 0 }], 1)).toBe(0);
    expect(sinceLower([], 5)).toBe(5);
  });
});

describe("beliefChanges", () => {
  const rows = [
    row(8, "lines/x.json", "create", undefined, "line"),
    row(9, "claims/02/CLM-02.json", "create", { claim: "CLM-02", subject: "security.vulnerability/cve-1", field: "epss_score", value: 0.1 }),
    row(9, "claims/03/CLM-03.json", "create", { claim: "CLM-03", subject: "security.catalog/cisa-kev", field: "catalog_id", value: "cisa-kev" }),
    row(10, "claims/02/CLM-02.json", "replace", { claim: "CLM-02", subject: "security.vulnerability/cve-1", field: "epss_score", value: 0.4 }),
    row(10, "claims/04/CLM-04.json", "replace", { claim: "CLM-04", subject: "security.vulnerability/cve-2", field: "epss_score", value: 0.2 }),
    row(10, "claims/05/CLM-05.json", "retire"),
  ];

  it("lists Claim members newest first, with the value before when the read holds it", () => {
    const changes = beliefChanges(rows);
    expect(changes.map((c) => [c.generation, c.claim, c.change])).toEqual([
      [10, "CLM-05", "retired"],
      [10, "CLM-04", "changed"],
      [10, "CLM-02", "changed"],
      [9, "CLM-03", "stated"],
      [9, "CLM-02", "stated"],
    ]);
    const revised = changes.find((c) => c.claim === "CLM-02" && c.generation === 10)!;
    expect(revised).toMatchObject({ kind: "security.vulnerability", field: "epss_score", value: 0.4, from: { value: 0.1 } });
    // a revision whose earlier value is outside the read has no "from"
    expect(changes.find((c) => c.claim === "CLM-04")!.from).toBeNull();
    // a member without a statement still names its Claim, from its path
    expect(changes[0]).toMatchObject({ claim: "CLM-05", subject: null, kind: null });
  });

  it("finds each kind's newest change", () => {
    expect(latestByKind(beliefChanges(rows))).toEqual(
      new Map([
        ["security.vulnerability", 10],
        ["security.catalog", 9],
      ]),
    );
  });
});

describe("kindFeeds", () => {
  const spec = (procedure: string, kind: string, types: string[], create: "never" | "if_absent" = "never") =>
    ({
      procedure,
      steps: [{ claims: types.map((type) => ({ type })), for_each: { $ref: "x" }, subject: { kind, key: {}, create } }],
    }) as unknown as ProcedureSpec;
  const line = (name: string, procedure: string, maxAuthority = "settle"): LineDefinition => ({
    line: name,
    procedure,
    parameters: {},
    triggerInput: null,
    triggerContract: null,
    bindings: {},
    maxAuthority,
    occurrenceEpoch: null,
  });
  const V = "security.vulnerability";
  const A = "security.assessment";
  const specs = new Map([
    ["kev", spec("kev", V, [`${V}.listed_in`])],
    ["epss", spec("epss", V, [`${V}.epss_score`])],
    ["assess", spec("assess", A, [`${A}.status`], "if_absent")],
    ["watch", spec("watch", A, [`${A}.note`])],
  ]);
  const claimTypes = [
    { predicate: `${V}.cve_id`, subject_kinds: [V] },
    { predicate: `${V}.listed_in`, subject_kinds: [V] },
    { predicate: `${V}.epss_score`, subject_kinds: [V] },
    { predicate: `${A}.status`, subject_kinds: [A] },
    { predicate: "security.catalog.catalog_id", subject_kinds: ["security.catalog"] },
  ];
  const kinds = [
    { kind: V, keys: [`${V}.cve_id`] },
    { kind: A, keys: [] },
    { kind: "security.catalog", keys: ["security.catalog.catalog_id"] },
  ];

  it("names the Lines writing about each kind, and whether some of it is entered directly", () => {
    const feeds = kindFeeds({
      specs,
      lines: [line("epss-triage", "epss"), line("kev-triage", "kev"), line("applicability", "assess"), line("watcher", "watch", "observe")],
      kinds,
      claimTypes,
    });
    // no Line creates vulnerabilities: they are entered directly, their facts come from Lines
    expect(feeds.get(V)).toEqual({ lines: ["epss-triage", "kev-triage"], direct: true });
    // a Line creates assessments and writes every ClaimType; an observe Line writes nothing
    expect(feeds.get(A)).toEqual({ lines: ["applicability"], direct: false });
    expect(feeds.get("security.catalog")).toEqual({ lines: [], direct: true });
  });
});
