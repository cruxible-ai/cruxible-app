import { describe, expect, it } from "vitest";
import type { Schemas } from "@/api/schemas";
import type { ProcedureSlot, ProcedureSpec } from "./definitions";
import { bytesWords, flowWords, partsText, pointerText, queryShape, runChangedWords, shortName, stepBrief, stepSections, summaryWords, type RunSummary } from "./step-words";

const FETCH_SLOT: ProcedureSlot = { capability: { name: "web.fetch", version: 1 } };
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
      records: "vulnerabilities",
      key: { cve_id: { type: "key_part<security.vulnerability:cve_id>" } },
      header: ["catalog_version"],
    },
    {
      id: "write",
      claims: [
        { type: "security.vulnerability.listed_in", value: { key: { catalog_id: "cisa-kev" }, kind: "security.catalog" }, effective_from: { $ref: "item", path: ["fields", "listed_from"] }, when_absent: "inverse" },
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

/** The capability the fetch slot names, as get serves it. */
const CAPABILITIES = new Map([
  ["fetch", { capability: "web.fetch", version: 1, description: "Fetch one URL.", effect: "external_read", in: "web.fetch.request@1", out: "web.fetch.result@1" }],
]);
const brief = (index: number, ctx: Parameters<typeof stepBrief>[2] = {}) => partsText(stepBrief(KEV, index, ctx));
const QUERIES = new Map([["security.watched_vulnerabilities", queryShape(QUERY, ROW)!]]);

describe("step labels", () => {
  it("a node shows a step's key fields, terse: host and format, Query, records and key, ClaimTypes and kind", () => {
    expect(brief(0, { parameters: PARAMETERS })).toBe("cisa.gov · JSON");
    expect(stepBrief(KEV, 0, { parameters: PARAMETERS })[0]!.title).toBe(PARAMETERS.url);
    expect(brief(0)).toBe("fetch · JSON"); // no Line: the slot
    expect(brief(0, { triggerInput: "catalog" })).toBe("landing · JSON");
    expect(brief(1)).toBe("watched_vulnerabilities");
    expect(stepBrief(KEV, 1)[0]!.ref).toBe("QueryDefinition:security.watched_vulnerabilities");
    expect(brief(2)).toBe("vulnerabilities · key cve_id");
    expect(brief(3)).toBe("4 ClaimTypes → vulnerability");
    expect(stepBrief(KEV, 3).at(-1)!.ref).toBe("SubjectKind:security.vulnerability");
  });


  it("the side panel: every field of a step in titled groups", () => {
    const sections = (i: number) =>
      stepSections(KEV, i, { parameters: PARAMETERS, queries: QUERIES, bindings: { fetch: "cruxible-provider-web/abc" }, capabilities: CAPABILITIES }).map((s) => [
        s.title,
        s.rows.map((r) => `${r.label}: ${partsText(r.value)}`),
      ]);
    // a value a Line parameter fills is under Parameters (the node's rows), by its name; Fetches has what the step carries itself
    expect(sections(0)).toEqual([
      ["Fetches", ["Source: cisa.gov", "Format: JSON"]],
      ["Returns", ["CaptureKind: security.kev-catalog"]],
      ["Provider", ["Slot: fetch", "Capability: web.fetch@1", "Effect: external read", "Request: web.fetch.request@1", "Result: web.fetch.result@1", "Build: cruxible-provider-web"]],
    ]);
    const provider = stepSections(KEV, 0, { capabilities: CAPABILITIES }).find((s) => s.title === "Provider")!;
    expect(provider.rows.find((r) => r.label === "Capability")!.value[0]!.ref).toBe("Capability:web.fetch@1");
    expect(provider.rows.find((r) => r.label === "Request")!.value[0]!.ref).toBe("Contract:web.fetch.request@1");
    // the capability unread: the slot and the capability it names, no Contracts or effect
    expect(stepSections(KEV, 0).find((s) => s.title === "Provider")!.rows.map((r) => r.label)).toEqual(["Slot", "Capability"]);
    expect(sections(1)).toEqual([
      ["Reads", ["Query: watched_vulnerabilities", "From: vulnerability", "Row: watched-vulnerability"]],
      ["Fields", ["cve_id: string"]],
    ]);
    expect(sections(2)).toEqual([
      ["Records", ["From: catalog.capture", "Record set: vulnerabilities", "Key: cve_id", "Header: catalog_version"]],
    ]);
    expect(sections(3)).toEqual([
      ["Writes on", ["Subject: vulnerability", "For each: entries.records", "Within: watched.rows", "Expect: watched.rows"]],
      ["ClaimTypes", ["listed_in: cisa-kev (fixed)", "kev_date_added: date_added", "kev_due_date: due_date", "kev_ransomware_use: ransomware_use"]],
    ]);
  });

  it("a derive: its node names the operation alone; its panel the effect, full Contract names and versions, and the kinds it reads and commits", () => {
    const spec = {
      procedure: "p",
      slots: { fetch: FETCH_SLOT, narrow: { capability: { name: "sbom.components", version: 1 } } },
      steps: [
        { call: "sbom", slot: "fetch", input: {}, captures: { capture: "security.cyclonedx-sbom" } },
        { call: "derived", slot: "narrow", input: { source: step("sbom", "capture") }, captures: { document: "security.sbom-components" } },
      ],
    } as unknown as ProcedureSpec;
    const ctx = {
      operations: { narrow: "sbom.components" },
      capabilities: new Map([
        ["narrow", { capability: "sbom.components", version: 1, description: "", effect: "pure", in: "sbom.components.request@1", out: "sbom.components.result@1" }],
      ]),
    };
    expect(partsText(stepBrief(spec, 1, ctx))).toBe("sbom.components");
    const rows = stepSections(spec, 1, ctx).map((s) => [s.title, s.rows.map((r) => `${r.label}: ${partsText(r.value)}`)]);
    expect(rows).toEqual([
      ["Derive", ["Operation: sbom.components", "Effect: pure", "Slot: narrow", "Capability: sbom.components@1", "Request: sbom.components.request@1", "Result: sbom.components.result@1"]],
      ["Inputs", ["CaptureKinds: security.cyclonedx-sbom", "Captures: sbom.capture"]],
      ["Output", ["CaptureKind: security.sbom-components", "Grade: derived"]],
    ]);
    const inputs = stepSections(spec, 1, ctx).find((s) => s.title === "Inputs")!;
    expect(inputs.rows[0]!.value[0]!.ref).toBe("CaptureContract:security.cyclonedx-sbom");
  });

  it("the claims panel names the record field each ClaimType takes and says what happens when it goes missing", () => {
    const index = KEV.steps.findIndex((step) => "claims" in step);
    const claims = stepSections(KEV, index, { parameters: PARAMETERS, queries: QUERIES }).find((section) => section.title === "ClaimTypes")!;
    expect(claims.columns?.map((c) => c.header)).toEqual(["From", "If missing"]);
    const cells = claims.cells!.map((row) => row.map((cell) => cell.map((part) => part.text).join("")));
    expect(cells[0]).toEqual(["cisa-kev (fixed) · since listed_from", 'record "not listed"']);
    expect(cells[1]).toEqual(["date_added", "retire"]);
    expect(cells[3]).toEqual(["ransomware_use", "flag for review"]);
  });

  it("the other kinds: one short label", () => {
    const spec = {
      procedure: "p",
      steps: [
        { transform: "keys", kind: "shape", spec: { input: step("watched", "rows"), fields: { cve_id: { from: item("fields", "cve_id") } } } },
        { id: "go", guard: { op: "present", of: step("keys", "rows") }, else: { halt: "no_change" } },
        { invoke: "security.child", input: {} },
        { emit: "security.out", input: {}, result: {} },
      ],
    } as unknown as ProcedureSpec;
    expect([0, 1, 2, 3].map((i) => partsText(stepBrief(spec, i)))).toEqual(["shape · cve_id", "else halt", "child", "out"]);
  });

  it("names and sizes", () => {
    expect(shortName("security.watched_vulnerabilities")).toBe("watched_vulnerabilities");
    expect(shortName("security.kev-record@1")).toBe("kev-record");
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

  it("says each node's counts tersely, the detail on hover", () => {
    expect(summaryWords({ kind: "call", captures: 1 }).text).toBe("1 Capture");
    expect(summaryWords({ kind: "read", rows: 10 }).text).toBe("10 rows");
    expect(summaryWords({ kind: "read", rows: 1 }).text).toBe("1 row");
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
    expect(extract.title).toContain("/count: expected 1766, read 1766");
    expect(summaryWords({ kind: "extract", records: 5, invalid_records: 2, duplicates: 1, invalid_fields: 0, complete: false }).text).toBe(
      "5 records · incomplete · 2 invalid · 1 duplicate",
    );
    expect(summaryWords(claims({ re_observed: 34 })).text).toBe("34 re-observed · 0 written");
    expect(summaryWords(claims({ written: 32, inverse_written: 2, delivery: "settled" })).text).toBe("32 written · 2 absent · settled");
    expect(summaryWords({ kind: "transform", transform_kind: "shape", rows_in: 10, rows_out: 10 }).text).toBe("10 → 10 rows");
    expect(summaryWords({ kind: "guard", branch: "else" }).text).toBe("else");
    expect(summaryWords({ kind: "post_inbox", emitted: 3, unposted: 1 }).text).toBe("3 posted · 1 cut");
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
    expect(runChangedWords([node(claims({ re_observed: 34 }))])).toBe("no change");
    expect(runChangedWords([node(claims({ written: 32, inverse_written: 2, delivery: "settled" }))])).toBe("32 written · 2 absent");
    expect(runChangedWords([node(claims({ written: 3, delivery: "proposed" }))])).toBe("proposed 3");
    expect(runChangedWords([node({ kind: "read", rows: 3 }), node()])).toBeNull();
    expect(runChangedWords(undefined)).toBeNull();
  });
});

describe("side panel: transforms and unchecked absence", () => {
  const EPSS = {
    steps: [
      { read: "watched", query: "security.watched_vulnerabilities" },
      { transform: "watch_keys", kind: "shape", spec: { input: { $ref: "step", step: "watched", path: ["rows"] }, fields: { cve_id: { from: { $ref: "item", path: ["fields", "cve_id"] } } } } },
      {
        id: "write",
        claims: [{ type: "security.vulnerability.epss_score", value: { $ref: "item", path: ["fields", "score"] } }],
        for_each: { $ref: "step", step: "scores", path: ["records"] },
        subject: { kind: "security.vulnerability", key: { cve_id: { $ref: "item", path: ["key", "cve_id"] } } },
      },
    ],
  } as unknown as Parameters<typeof stepSections>[0];
  it("a shape transform lists its input and the fields it makes, each with its source", () => {
    const sections = stepSections(EPSS, 1);
    const flat = sections.map((s) => [s.title, s.rows.map((r) => `${r.label}: ${r.value.map((p) => p.text).join("")}`)]);
    expect(flat).toEqual([
      ["Transform", ["Kind: shape", "Input: watched.rows"]],
      ["Fields", ["cve_id: cve_id"]],
    ]);
  });
  it("a claims step with no expected Subjects says absence is not checked", () => {
    const claims = stepSections(EPSS, 2).find((s) => s.title === "ClaimTypes")!;
    expect(claims.cells![0]!.map((cell) => cell.map((p) => p.text).join(""))).toEqual(["score", "not checked"]);
  });
});
