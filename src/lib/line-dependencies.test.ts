import { describe, expect, it } from "vitest";
import type { LineDefinition, ProcedureSpec } from "./definitions";
import { lineDependencies, queriesRead, queryReads } from "./line-dependencies";

const step = (name: string, ...path: string[]) => ({ $ref: "step" as const, step: name, path });
const item = (...path: string[]) => ({ $ref: "item" as const, path });

const line = (name: string, procedure: string, maxAuthority = "settle"): LineDefinition => ({
  line: name,
  procedure,
  parameters: {},
  triggerInput: null,
  triggerContract: null,
  bindings: {},
  maxAuthority,
  occurrenceEpoch: 1,
});

// The pilot's Query: every watched vulnerability with its CVE id.
const WATCHED = {
  query: "sec.watched",
  row: "sec.watched@1",
  from: { v: "sec.vulnerability" },
  fields: [{ cve_id: "v.sec.vulnerability.cve_id" }, { subject_id: "v" }, { subject_kind: "v.subject_kind" }],
};
// Walks from a KEV-listed vulnerability back to the assessments judging it affected, then to their releases.
const EXPOSURE = {
  query: "sec.exposure",
  from: { v: "sec.vulnerability" },
  where: "v.sec.vulnerability.kev_listed = true",
  hops: [{ a: '<v.sec.assessment.vulnerability: sec.assessment where a.sec.assessment.status = "affected"' }, { r: "a.sec.assessment.release: sec.release" }],
  fields: [{ cve_id: "v.sec.vulnerability.cve_id" }, { release: "r" }, { status: "a.sec.assessment.status" }],
};
const KEYS = new Map([
  ["sec.vulnerability.cve_id", "sec.vulnerability"],
  ["sec.assessment.cve_id", "sec.assessment"],
]);

const reader = (procedure: string, query: string, claims: string[] = ["sec.vulnerability.kev_listed"], create?: "if_absent"): ProcedureSpec => ({
  procedure,
  steps: [
    { read: "watched", query },
    {
      id: "settle",
      claims: claims.map((type) => ({ type, value: item("v") })),
      for_each: step("watched", "rows"),
      subject: { kind: "sec.vulnerability", key: { cve_id: item("cve_id") }, ...(create ? { create } : {}) },
    },
  ],
});

describe("queryReads", () => {
  it("names the ClaimTypes a Query's fields, filters and hops read, and the kinds it walks", () => {
    expect(queryReads(EXPOSURE, KEYS)).toEqual({
      claimTypes: ["sec.assessment.release", "sec.assessment.status", "sec.assessment.vulnerability", "sec.vulnerability.kev_listed"],
      keys: ["sec.vulnerability.cve_id"],
      kinds: ["sec.assessment", "sec.release", "sec.vulnerability"],
    });
  });

  it("reads an identity key as the kind's, skips Subject columns, quoted text and unknown aliases", () => {
    expect(queryReads(WATCHED, KEYS)).toEqual({ claimTypes: [], keys: ["sec.vulnerability.cve_id"], kinds: ["sec.vulnerability"] });
    expect(
      queryReads({ from: { r: "sec.release = $release" }, where: 'r.sec.release.note = "x.sec.release.hidden" and q.sec.other.p = 1', fields: ["r.sec.release.version"] }),
    ).toEqual({ claimTypes: ["sec.release.note", "sec.release.version"], keys: [], kinds: ["sec.release"] });
  });

  it("is null for what isn't an authored definition", () => {
    expect(queryReads(null)).toBeNull();
    expect(queryReads({ identity: { kind: "QueryDefinition", name: "x" }, traversal: [] })).toBeNull();
  });
});

describe("lineDependencies", () => {
  it("links a Line to the Line that writes what its Query reads, and the rest to entered directly", () => {
    const specs = new Map<string, ProcedureSpec>([
      ["p.kev", reader("p.kev", "sec.exposure", ["sec.vulnerability.kev_date_added"])],
      [
        "p.assess",
        {
          procedure: "p.assess",
          steps: [
            { read: "watched", query: "sec.watched" },
            {
              id: "propose",
              claims: [
                { type: "sec.assessment.status", value: item("status") },
                { type: "sec.assessment.vulnerability", value: item("v") },
              ],
              for_each: step("watched", "rows"),
              subject: { kind: "sec.assessment", key: { cve_id: item("cve_id") }, create: "if_absent" },
            },
          ],
        },
      ],
    ]);
    const lines = [line("kev", "p.kev"), line("assess", "p.assess", "propose")];
    const queries = new Map<string, unknown>([
      ["sec.exposure", EXPOSURE],
      ["sec.watched", WATCHED],
    ]);
    expect(queriesRead(specs, lines)).toEqual(["sec.exposure", "sec.watched"]);
    expect(lineDependencies({ specs, lines, queries, keys: KEYS })).toEqual([
      // assess reads watched vulnerabilities: no Line creates them
      { producer: null, reader: "assess", step: "watched", query: "sec.watched", claimTypes: ["sec.vulnerability.cve_id"], kinds: ["sec.vulnerability"], writes: [] },
      // kev's Query reads what assess writes (status, vulnerability) and creates (assessments)
      {
        producer: "assess",
        reader: "kev",
        step: "watched",
        query: "sec.exposure",
        claimTypes: ["sec.assessment.status", "sec.assessment.vulnerability"],
        kinds: ["sec.assessment"],
        writes: ["propose"],
      },
      {
        producer: null,
        reader: "kev",
        step: "watched",
        query: "sec.exposure",
        claimTypes: ["sec.assessment.release", "sec.vulnerability.cve_id", "sec.vulnerability.kev_listed"],
        kinds: ["sec.release", "sec.vulnerability"],
        writes: [],
      },
    ]);
  });

  it("the pilot: both Lines read watched vulnerabilities created by no Line (create: never), so entered directly feeds both", () => {
    const specs = new Map([
      ["p.kev", reader("p.kev", "sec.watched", ["sec.vulnerability.kev_listed"])],
      ["p.epss", reader("p.epss", "sec.watched", ["sec.vulnerability.epss"])],
    ]);
    const deps = lineDependencies({ specs, lines: [line("kev", "p.kev"), line("epss", "p.epss")], queries: new Map([["sec.watched", WATCHED]]), keys: KEYS });
    expect(deps.map((d) => [d.producer, d.reader])).toEqual([
      [null, "epss"],
      [null, "kev"],
    ]);
  });

  it("a Line that creates the Subjects another reads is its producer; self-production and observe Lines are not", () => {
    const specs = new Map([
      ["p.seed", reader("p.seed", "sec.watched", ["sec.vulnerability.kev_listed"], "if_absent")],
      ["p.kev", reader("p.kev", "sec.watched")],
      ["p.watch", reader("p.watch", "sec.watched", ["sec.vulnerability.epss"], "if_absent")],
    ]);
    const lines = [line("seed", "p.seed"), line("kev", "p.kev"), line("watch", "p.watch", "observe")];
    const deps = lineDependencies({ specs, lines, queries: new Map([["sec.watched", WATCHED]]), keys: KEYS });
    expect(deps.map((d) => [d.producer, d.reader, d.kinds.join(), d.writes.join()])).toEqual([
      ["seed", "kev", "sec.vulnerability", "settle"],
      // seed creates what its own Query reads: no dependency; watch is capped at observe: it creates nothing
      ["seed", "watch", "sec.vulnerability", "settle"],
    ]);
  });

  it("leaves out a read whose Query wasn't read", () => {
    const specs = new Map([["p.kev", reader("p.kev", "sec.watched")]]);
    expect(lineDependencies({ specs, lines: [line("kev", "p.kev")], queries: new Map() })).toEqual([]);
  });
});
