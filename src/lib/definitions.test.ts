import { describe, expect, it } from "vitest";
import {
  arrivalWords,
  gist,
  hostOf,
  lineFlows,
  lineGist,
  logicalSources,
  procedureSlots,
  readLineEnvelope,
  retainedByWords,
  retentions,
  sourceSteps,
  stepView,
  type ProcedureSlot,
  type ProcedureSpec,
} from "./definitions";

// Shapes as cruxible-core d6ed45bc0 serves them (the Claim-authority core).
const slot = (input: string, output: string, effect: ProcedureSlot["effect"]): ProcedureSlot => ({
  in: { name: input, version: 1 },
  out: { name: output, version: 1 },
  effect,
});
const param = (name: string) => ({ $ref: "param" as const, path: [name] });
const step = (name: string, ...path: string[]) => ({ $ref: "step" as const, step: name, path });
const item = (...path: string[]) => ({ $ref: "item" as const, path });

const FETCH: ProcedureSpec = {
  procedure: "sec.fetch-observed",
  slots: { fetch: slot("web.fetch.request", "web.fetch.result", "external_read") },
  steps: [
    { call: "fetch", slot: "fetch", input: { logical_source: param("logical_source"), url: param("url") }, captures: { capture: "sec.fetched-v1" } },
    { emit: "sec.observation-output-v1", input: step("fetch"), result: step("fetch") },
  ],
};
const TRIAGE: ProcedureSpec = {
  procedure: "sec.kev-triage",
  slots: { parse: slot("sec.kev-catalog.request", "sec.kev-catalog.result", "pure"), catalog: slot("web.fetch.request", "web.fetch.result", "external_read") },
  steps: [
    { call: "catalog", slot: "catalog", input: { logical_source: "cisa.kev.catalog" }, captures: { capture: "sec.fetched-v1" } },
    { read: "watched", query: "sec.watched_vulnerabilities" },
    {
      extract: "entries",
      capture: step("catalog", "capture"),
      records: "/vulnerabilities/*",
      row: "sec.kev-record@1",
      fields: { date_added: { at: "dateAdded" } },
      key: { cve_id: { at: "cveID" } },
    },
    { id: "changed", guard: { op: "present", of: step("entries", "records") }, else: { halt: "no_change" } },
    {
      id: "write",
      claims: [
        { type: "sec.vulnerability.kev_date_added", value: item("fields", "date_added") },
        { type: "sec.vulnerability.listed_in", value: { kind: "sec.catalog", key: { catalog_id: "cisa-kev" } } },
      ],
      for_each: step("entries", "records"),
      subject: { kind: "sec.vulnerability", key: { cve_id: item("key", "cve_id") } },
    },
    { halt: "no_change" },
  ],
};
const SBOM: ProcedureSpec = {
  procedure: "sec.sbom-acquire",
  slots: { sbom: slot("workspace.file.request", "workspace.file.result", "external_read") },
  steps: [{ call: "sbom", slot: "sbom", input: { logical_source: "cyclonedx.sbom" }, captures: { capture: "sec.file-v1" } }],
};
const EPSS: ProcedureSpec = {
  procedure: "sec.epss-acquire",
  slots: { epss: slot("sec.epss-daily.request", "sec.epss-daily.result", "external_read") },
  steps: [{ call: "epss", slot: "epss", input: {}, captures: { capture: "sec.fetched-v1" } }],
};

const envelope = (name: string, procedure: string, extra: Record<string, unknown> = {}) => ({
  path: `lines/${name}.json`,
  envelope: {
    artifact_format: "cruxible-line-v8",
    identity: { kind: "Line", name },
    occurrence_epoch: 1,
    procedure: { target: { kind: "Procedure", name: procedure } },
    parameters: {},
    max_authority: "observe",
    trigger_input: null,
    ...extra,
  },
});

const LINES = [
  readLineEnvelope(envelope("kev-daily", "sec.fetch-observed", { parameters: { logical_source: "cisa.kev.catalog", url: "https://x" } }))!,
  readLineEnvelope(
    envelope("kev-triage", "sec.kev-triage", {
      trigger_input: "catalog",
      max_authority: "propose",
      trigger_event: { capture_contract_identity: { kind: "CaptureContract", name: "sec.fetched-v1" } },
      bindings: { parse: { build: { role: "provider", target: { kind: "Provider", name: "sec-analysis/abc" } }, operation: "sec.kev-catalog" } },
    }),
  )!,
];

describe("definitions", () => {
  it("reads a Line envelope: parameters, trigger input, its contract and the build each slot binds", () => {
    expect(LINES[0]).toMatchObject({ line: "kev-daily", procedure: "sec.fetch-observed", triggerInput: null, bindings: {} });
    expect(LINES[1]).toMatchObject({
      triggerInput: "catalog",
      triggerContract: "sec.fetched-v1",
      maxAuthority: "propose",
      bindings: { parse: "sec-analysis/abc" },
    });
    expect(readLineEnvelope({ envelope: { identity: { name: "x" } } })).toBeNull();
    expect(readLineEnvelope(null)).toBeNull();
  });

  it("names each step's id and kind and the definitions it references by name", () => {
    const views = TRIAGE.steps.map(stepView);
    expect(views.map((v) => [v.id, v.kind])).toEqual([
      ["catalog", "call"],
      ["watched", "read"],
      ["entries", "extract"],
      ["changed", "guard"],
      ["write", "claims"],
      ["step_6", "halt"],
    ]);
    expect(views[0]).toMatchObject({ contracts: ["sec.fetched-v1"], slot: "catalog", logicalSource: { literal: "cisa.kev.catalog" } });
    expect(views[1]).toMatchObject({ query: "sec.watched_vulnerabilities" });
    expect(views[4]!.claimTypes).toEqual(["sec.vulnerability.kev_date_added", "sec.vulnerability.listed_in"]);
    expect(views[5]!.detail).toBe("no_change");
    expect(stepView(FETCH.steps[0]!, 0).logicalSource).toEqual({ param: "logical_source" });
    expect(stepView(FETCH.steps[1]!, 1)).toMatchObject({ id: "step_2", kind: "emit", contracts: ["sec.observation-output-v1"] });
  });

  it("lists slots by name with the Contracts each takes and gives", () => {
    expect(procedureSlots(TRIAGE).map((s) => [s.slot, s.in.name, s.out.name, s.effect])).toEqual([
      ["catalog", "web.fetch.request", "web.fetch.result", "external_read"],
      ["parse", "sec.kev-catalog.request", "sec.kev-catalog.result", "pure"],
    ]);
  });

  it("retains through Lines (resolving a param logical source by parameters), skips a Line's trigger input, keeps direct runs", () => {
    const steps = [FETCH, TRIAGE, SBOM, EPSS].flatMap((spec) => sourceSteps(spec.procedure, spec));
    const all = retentions(steps, LINES);
    expect(all.map(({ slotIn: _, url: __, maxBytes: ___, provider: ____, ...rest }) => rest)).toEqual([
      { contract: "sec.fetched-v1", source: "cisa.kev.catalog", procedure: "sec.fetch-observed", line: "kev-daily", emitted: false, given: null },
      { contract: "sec.observation-output-v1", source: null, procedure: "sec.fetch-observed", line: "kev-daily", emitted: true, given: null },
      // kev-triage reads its catalog from the landing: no retention
      { contract: "sec.file-v1", source: "cyclonedx.sbom", procedure: "sec.sbom-acquire", line: null, emitted: false, given: null },
      // the call names no logical source: none here
      { contract: "sec.fetched-v1", source: null, procedure: "sec.epss-acquire", line: null, emitted: false, given: null },
    ]);
    expect(all[0]!.slotIn).toBe("web.fetch.request");
    // the URL it fetches, resolved through the Line's parameters
    expect(all[0]!.url).toBe("https://x");
    // A Procedure no Line runs is given its logical source at the direct run.
    expect(retentions(sourceSteps(FETCH.procedure, FETCH), []).find((r) => !r.emitted)).toMatchObject({ source: null, given: "logical_source", line: null });
  });

  it("joins retentions and landing Triggers into logical sources", () => {
    const steps = [FETCH, TRIAGE, SBOM].flatMap((spec) => sourceSteps(spec.procedure, spec));
    const sources = logicalSources(retentions(steps, LINES), [
      { name: "kev-landed", contract: "sec.fetched-v1", target: "Line:kev-triage", logicalSources: ["cisa.kev.catalog"] },
      { name: "sbom-landed", contract: "sec.file-v1", target: "Line:sbom-import", logicalSources: ["cyclonedx.sbom"] },
      { name: "cve-landed", contract: "sec.fetched-v1", target: "Line:cve", logicalSources: ["cve.record"] },
      { name: "any-landed", contract: "sec.fetched-v1", target: "Line:any", logicalSources: [] },
    ]);
    expect(sources.map((s) => [s.id, s.contracts, s.retainedBy.length, s.selectedBy.map((t) => t.name)])).toEqual([
      ["cisa.kev.catalog", ["sec.fetched-v1"], 1, ["kev-landed"]],
      ["cve.record", ["sec.fetched-v1"], 0, ["cve-landed"]],
      ["cyclonedx.sbom", ["sec.file-v1"], 1, ["sbom-landed"]],
    ]);
    expect(retainedByWords(sources[0]!.retainedBy)).toBe("Line kev-daily");
    expect(retainedByWords(sources[2]!.retainedBy)).toBe("a direct sec.sbom-acquire run");
  });
});

describe("gists", () => {
  it("keep a description's first clause, without parentheticals", () => {
    expect(gist("Read one GitHub release asset (input.url); retain the bytes under x.")).toBe("Read one GitHub release asset");
    expect(gist("Read one SARIF 2.1.0 scan log from the attached workspace (input.relative_path) and retain it under security.file-v1; the Line reads it.")).toBe(
      "Read one SARIF 2.1.0 scan log from the attached workspace",
    );
    expect(gist("Propose what changed: each asset by key; a full scan retires runs.")).toBe("Propose what changed: each asset by key");
    expect(gist("Ask the six hardening questions (HQ1-HQ6) about every gated target and answer each in three states: found")).toBe(
      "Ask the six hardening questions about every gated target and answer each in three states",
    );
    expect(gist(null)).toBeNull();
    expect(gist("word ".repeat(80))!.endsWith("…")).toBe(true);
  });

  it("start a Line's gist at what it does, past what triggered it", () => {
    expect(
      lineGist(
        "Read the KEV catalog Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle one observation Claim per KEV field that changed (kev_listed) under a settle mandate.",
      ),
    ).toBe("Settle one observation Claim per KEV field that changed under a settle mandate");
    expect(lineGist("Read the SARIF log Capture that triggered the Line for the Line's repository (parameter repo_ref) and post one inbox item per location gap: one per tool")).toBe(
      "Post one inbox item per location gap",
    );
    expect(lineGist("Ask one incident's five questions (parameter incident) and answer each.")).toBe("Ask one incident's five questions and answer each");
  });

  it("say how a source arrives and from where", () => {
    expect(arrivalWords({ slotIn: "web.fetch.request", emitted: false })).toBe("HTTP fetch");
    expect(arrivalWords({ slotIn: "workspace.file.request", emitted: false })).toBe("Workspace file");
    expect(arrivalWords({ slotIn: "security.release-asset.request", emitted: false })).toBe("release-asset");
    expect(arrivalWords({ slotIn: null, emitted: true })).toBe("Run output");
    expect(hostOf("https://www.cisa.gov/sites/default/files/feeds/kev.json")).toBe("cisa.gov");
    expect(hostOf("api.first.org/data")).toBeNull();
    expect(hostOf(undefined)).toBeNull();
  });
});

describe("Procedures that run only as Lines", () => {
  it("retain nothing until a Line runs them", () => {
    const call = { procedure: "log-import", alias: "log", contract: "file-v1", slotIn: "workspace.file.request", logicalSource: { literal: "log-read" }, url: null, maxBytes: null, emitted: false };
    expect(retentions([call], [], (procedure) => procedure !== "log-import")).toEqual([]);
    expect(retentions([call], [], () => true)).toHaveLength(1);
  });

  it("resolve a call's byte cap through the Line's parameters", () => {
    const call = { procedure: "p", alias: "c", contract: "k", slotIn: null, logicalSource: { literal: "s" }, url: null, maxBytes: param("max_bytes"), emitted: false };
    const line = { line: "l", procedure: "p", parameters: { max_bytes: 4194304 }, triggerInput: null, triggerContract: null, bindings: {}, maxAuthority: null, occurrenceEpoch: null };
    expect(retentions([call], [line])[0]!.maxBytes).toBe(4194304);
    expect(retentions([{ ...call, maxBytes: 1024 }], [])[0]!.maxBytes).toBe(1024);
    expect(retentions([{ ...call, maxBytes: "big" }], [])[0]!.maxBytes).toBeNull();
  });
});

describe("what a Line's run does", () => {
  it("reads the sources its calls name (through its parameters), writes the ClaimTypes its claims steps name", () => {
    const specs = new Map([FETCH, TRIAGE].map((spec) => [spec.procedure, spec] as const));
    expect(lineFlows(specs, LINES)).toEqual([
      { line: "kev-daily", sources: ["cisa.kev.catalog"], hosts: ["x"], writes: [], inbox: false },
      {
        line: "kev-triage",
        sources: ["cisa.kev.catalog"],
        hosts: [],
        writes: ["sec.vulnerability.kev_date_added", "sec.vulnerability.listed_in"],
        inbox: false,
      },
    ]);
    // a Line whose Procedure isn't served is left out
    expect(lineFlows(new Map(), LINES)).toEqual([]);
  });
});
