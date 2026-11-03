import { describe, expect, it } from "vitest";
import type { Schemas } from "@/api/schemas";
import type { ProcedureSlot, ProcedureSpec } from "./definitions";
import { bytesWords, flowWords, nameWords, phraseText, pointerText, queryShape, runChangedWords, stepPurpose, summaryWords, type RunSummary } from "./step-words";

const FETCH_SLOT: ProcedureSlot = { in: { name: "web.fetch.request", version: 1 }, out: { name: "web.fetch.result", version: 1 }, effect: "external_read" };
const param = (name: string) => ({ $ref: "param" as const, path: [name] });
const step = (name: string, ...path: string[]) => ({ $ref: "step" as const, step: name, path });
const item = (...path: string[]) => ({ $ref: "item" as const, path });

/** security.kev-triage as the pilot daemon serves it. */
const KEV: ProcedureSpec = {
  procedure: "security.kev-triage",
  slots: { fetch: FETCH_SLOT },
  steps: [
    {
      call: "catalog",
      slot: "fetch",
      input: { expected_format: "json", logical_source: param("logical_source"), max_bytes: param("max_bytes"), url: param("url") },
      captures: { capture: "security.kev-catalog" },
    },
    { read: "watched", query: "security.watched_vulnerabilities" },
    {
      extract: "entries",
      capture: step("catalog", "capture"),
      records: "/vulnerabilities/*",
      row: "security.kev-record@1",
      fields: {
        date_added: { at: "dateAdded", parse: "date" },
        due_date: { at: "dueDate", parse: "date", presence: "optional" },
        listed_from: { at: "dateAdded", project: "utc_start_of_day", parse: "date" },
        ransomware_use: { at: "knownRansomwareCampaignUse", canonicalize: "claim_type", presence: "optional" },
      },
      key: { cve_id: { at: "cveID", type: "key_part<security.vulnerability:cve_id>" } },
      header: { catalog_version: { at: "/catalogVersion", presence: "required" } },
      complete_when: { count_at: "/count" },
    },
    {
      id: "write",
      claims: [
        { type: "security.vulnerability.listed_in", value: { key: { catalog_id: "cisa-kev" }, kind: "security.catalog" }, when_absent: "inverse" },
        { type: "security.vulnerability.kev_date_added", value: item("fields", "date_added"), when_absent: "mirror" },
        { type: "security.vulnerability.kev_due_date", value: item("fields", "due_date"), when_absent: "mirror" },
        { type: "security.vulnerability.kev_ransomware_use", value: item("fields", "ransomware_use") },
      ],
      for_each: step("entries", "records"),
      subject: { kind: "security.vulnerability", key: { cve_id: item("key", "cve_id") }, within: step("watched", "rows") },
      expect: step("watched", "rows"),
    },
  ],
} as ProcedureSpec;

const PARAMETERS = {
  logical_source: "cisa.kev.catalog",
  max_bytes: 4194304,
  url: "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
};

const QUERY = {
  query: "security.watched_vulnerabilities",
  description: "Every vulnerability this instance tracks, with its CVE id.",
  definition: {
    query: "security.watched_vulnerabilities",
    row: "security.watched-vulnerability@1",
    from: { v: "security.vulnerability" },
    fields: [{ cve_id: "v.security.vulnerability.cve_id" }, { subject_id: "v" }, { subject_kind: "v.subject_kind" }],
  },
} as unknown as Schemas["GetQueryCard"];
const ROW = {
  contract: "Contract:security.watched-vulnerability@1",
  version: 1,
  fields: [
    { name: "cve_id", type: "string" },
    { name: "subject_id", type: "string" },
    { name: "subject_kind", type: "string" },
  ],
} as unknown as Schemas["GetContractCard"];

const words = (index: number, ctx: Parameters<typeof stepPurpose>[2] = {}) => stepPurpose(KEV, index, ctx)!;

describe("step purposes", () => {
  it("a call says the host it fetches (the URL on hover) and the CaptureKind it returns, linked", () => {
    const p = words(0, { parameters: PARAMETERS });
    expect(phraseText(p)).toBe("Fetches cisa.gov, returns JSON (the kev catalog)");
    expect(p.parts.find((x) => x.text === "cisa.gov")!.title).toBe(PARAMETERS.url);
    expect(p.parts.find((x) => x.text === "the kev catalog")!.ref).toBe("CaptureContract:security.kev-catalog");
    // with no Line, the URL is unknown here: it names the slot
    expect(phraseText(words(0))).toBe("Asks its fetch Provider, returns JSON (the kev catalog)");
    // a Line whose landing feeds the call
    expect(phraseText(words(0, { triggerInput: "catalog" }))).toBe("Reads the Capture that landed, returns JSON (the kev catalog)");
  });

  it("a read says what its Query returns: one row per kind, with the row Contract's fields (the Subject columns left out)", () => {
    expect(phraseText(words(1))).toBe("Reads the watched vulnerabilities");
    const queries = new Map([["security.watched_vulnerabilities", queryShape(QUERY, ROW)!]]);
    const p = words(1, { queries });
    expect(phraseText(p)).toBe("Reads the watched vulnerabilities — one row per vulnerability with cve_id");
    expect(p.parts[1]).toMatchObject({ ref: "QueryDefinition:security.watched_vulnerabilities" });
    expect(p.title).toContain("Rows typed by security.watched-vulnerability@1");
    // without the row Contract, the definition's own fields
    expect(queryShape(QUERY, null)!.fields).toEqual(["cve_id"]);
  });

  it("an extract states the payload a provider must deliver: records, count, key and fields; the rest on hover", () => {
    const p = words(2);
    expect(phraseText(p)).toBe("One record per /vulnerabilities/*, as many as /count says, keyed by cveID, with dateAdded, dueDate, knownRansomwareCampaignUse");
    expect(p.parts.filter((x) => x.code).map((x) => x.text)).toEqual(["/vulnerabilities/*", "/count", "cveID", "dateAdded", "dueDate", "knownRansomwareCampaignUse"]);
    expect(p.title).toContain("dueDate (optional)");
    expect(p.title).toContain("Once per payload: /catalogVersion.");
    expect(p.title).toContain("Records typed by security.kev-record@1.");
  });

  it("a claims step names the ClaimTypes and kind it writes (linked) and that it watches the expected rows for removal", () => {
    const p = words(3);
    expect(phraseText(p)).toBe(
      "Writes listed_in, kev_date_added, kev_due_date, kev_ransomware_use → vulnerability; watches the watched vulnerabilities for removal",
    );
    expect(p.parts.find((x) => x.text === "kev_due_date")!.ref).toBe("ClaimType:security.vulnerability.kev_due_date");
    expect(p.parts.find((x) => x.text === "vulnerability")!.ref).toBe("SubjectKind:security.vulnerability");
    expect(p.title).toContain("Only for the watched vulnerabilities.");
    expect(p.title).toContain("listed_in recorded absent; kev_date_added, kev_due_date retired; kev_ransomware_use flagged for review");
    // with a run, the expected count
    const summaries = new Map<string, RunSummary>([["watched", { kind: "read", rows: 10 }]]);
    expect(phraseText(words(3, { summaries }))).toMatch(/; watches 10 for removal$/);
  });

  it("the other kinds read as one short phrase", () => {
    const spec = {
      procedure: "p",
      steps: [
        { transform: "keys", kind: "shape", spec: { input: step("watched", "rows"), fields: { cve_id: { from: item("fields", "cve_id") } } } },
        { transform: "kept", kind: "filter", spec: {} },
        { id: "go", guard: { op: "present", of: step("keys", "rows") }, else: { halt: "no_change" } },
        { invoke: "security.child", input: {} },
        { emit: "security.out", input: {}, result: {} },
      ],
    } as unknown as ProcedureSpec;
    expect([0, 1, 2, 3, 4].map((i) => phraseText(stepPurpose(spec, i)!))).toEqual([
      "Keeps cve_id of each row",
      "Keeps only the rows that match",
      "Goes on only if its condition holds; else stops",
      "Runs security.child",
      "Keeps the run's output as the out",
    ]);
  });

  it("names and sizes in words", () => {
    expect(nameWords("security.watched_vulnerabilities")).toBe("watched vulnerabilities");
    expect(nameWords("security.kev-record@1")).toBe("kev record");
    expect(pointerText("/data/results/items/*/scores/*")).toBe("…/scores/*");
    expect(bytesWords(4194304)).toBe("4 MB");
    expect(bytesWords(1536)).toBe("1.5 KB");
    expect(bytesWords(12)).toBe("12 bytes");
  });
});

describe("run words", () => {
  const claims = (extra: Partial<Extract<RunSummary, { kind: "claims" }>>): RunSummary => ({
    kind: "claims",
    written: 0,
    revised: 0,
    inverse_written: 0,
    subjects_created: 0,
    re_observed: 0,
    no_op: 0,
    retired: 0,
    surfaced: 0,
    downgraded: 0,
    delivery: "unchanged",
    ...extra,
  });

  it("says each node's counts in words, the detail on hover", () => {
    expect(summaryWords({ kind: "call", captures: 1 }).text).toBe("1 Capture");
    expect(summaryWords({ kind: "read", rows: 10 }, "watched vulnerabilities").text).toBe("10 watched vulnerabilities");
    expect(summaryWords({ kind: "read", rows: 1 }, "watched vulnerabilities").text).toBe("1 row");
    const extract = summaryWords({
      kind: "extract",
      records: 1766,
      invalid_records: 0,
      duplicates: 0,
      invalid_fields: 0,
      complete: true,
      complete_when: { count_at: "/count", expected: 1766, observed: 1766, held: true },
    });
    expect(extract.text).toBe("1,766 records · complete");
    expect(extract.title).toContain("The count at /count said 1766; 1766 read: it held.");
    expect(summaryWords({ kind: "extract", records: 5, invalid_records: 2, duplicates: 1, invalid_fields: 0, complete: false }).text).toBe(
      "5 records · incomplete · 2 invalid · 1 duplicate",
    );
    expect(summaryWords(claims({ re_observed: 34 })).text).toBe("34 re-observed · 0 written · nothing changed");
    expect(summaryWords(claims({ written: 32, inverse_written: 2, delivery: "settled" })).text).toBe("32 written · 2 recorded absent · settled");
    expect(summaryWords({ kind: "transform", transform_kind: "shape", rows_in: 10, rows_out: 10 }).text).toBe("10 in → 10 out");
    expect(summaryWords({ kind: "guard", branch: "else" }).text).toBe("condition did not hold");
    expect(summaryWords({ kind: "post_inbox", emitted: 3, unposted: 1 }).text).toBe("3 posted · 1 left out");
  });

  it("an edge carries a count only when it carries the counted output", () => {
    const extract: RunSummary = { kind: "extract", records: 1766, invalid_records: 0, duplicates: 0, invalid_fields: 0, complete: true };
    expect(flowWords(extract, ["records"])).toBe("1,766 records");
    expect(flowWords(extract, ["records", "header.catalog_version"])).toBe("1,766 records");
    expect(flowWords(extract, ["header.catalog_version"])).toBeNull();
    expect(flowWords({ kind: "read", rows: 10 }, ["rows"])).toBe("10 rows");
    expect(flowWords(null, ["rows"])).toBeNull();
  });

  it("what a run changed, from its nodes' summaries; nothing for a run that kept none", () => {
    const node = (summary?: RunSummary): Schemas["GetRunNode"] => ({ node: "write", sequence: 1, ...(summary ? { summary } : {}) });
    expect(runChangedWords([node(claims({ written: 32 }))])).toBe("32 written");
    expect(runChangedWords([node(claims({ re_observed: 34 }))])).toBe("nothing changed");
    expect(runChangedWords([node(claims({ written: 3, delivery: "proposed" }))])).toBe("proposed 3");
    expect(runChangedWords([node({ kind: "read", rows: 3 }), node()])).toBeNull();
    expect(runChangedWords(undefined)).toBeNull();
  });
});
