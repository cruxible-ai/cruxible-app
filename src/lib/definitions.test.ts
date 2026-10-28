import { describe, expect, it } from "vitest";
import {
  arrivalWords,
  gist,
  interfaceBase,
  lineGist,
  logicalSources,
  procedureSlots,
  readLineEnvelope,
  urlWords,
  retainedByWords,
  retentions,
  slotInterfaceRef,
  sourceSteps,
  stepView,
  type ProcedureSpec,
} from "./definitions";

// Shapes as cruxible-core fa36518ad serves them (security kit 1.3.0).
const FETCH: ProcedureSpec = {
  procedure: "sec.fetch-observed",
  input: { logical_source: { type: "string" }, url: { type: "string" } },
  slots: { fetch: "web.fetch@3" },
  steps: [
    { id: "fetch", source: "fetch", contract: "sec.fetched-v1", interface: "web.fetch/v3", provider: "fetch", request: { logical_source: "$input.logical_source", url: "$input.url" } },
    { id: "step_2", emit: "sec.observation-output-v1", input: "$summary", result: "$summary" },
  ],
};
const TRIAGE: ProcedureSpec = {
  procedure: "sec.kev-triage",
  input: {},
  slots: { parse: "sec.kev-catalog@2", catalog: "web.fetch@3" },
  steps: [
    { id: "catalog", source: "catalog", contract: "sec.fetched-v1", interface: "web.fetch/v3", provider: "catalog", request: { logical_source: "cisa.kev.catalog" } },
    { id: "watched", tap: "watched", query: "sec.watched_vulnerabilities" },
    { id: "parse", call: "parse", interface: "sec.kev-catalog/v2", provider: "parse", input: {} },
    { id: "changed", guard: "parse.changed > 0", refusal_code: "no_change", else: "halt(no_change)" },
    { id: "settle", settle: "$parse.items", result: "$summary" },
  ],
};
const SBOM: ProcedureSpec = {
  procedure: "sec.sbom-acquire",
  input: { relative_path: { type: "string" } },
  slots: { sbom: "workspace.file" },
  steps: [{ id: "sbom", source: "sbom", contract: "sec.file-v1", interface: "workspace.file", provider: "sbom", request: { logical_source: "cyclonedx.sbom" } }],
};
const EPSS: ProcedureSpec = {
  procedure: "sec.epss-acquire",
  input: {},
  steps: [{ id: "epss", source: "epss", contract: "sec.fetched-v1", interface: "sec.epss-daily/v1", request: {} }],
};

const envelope = (name: string, procedure: string, extra: Record<string, unknown> = {}) => ({
  path: `lines/${name}.json`,
  envelope: {
    artifact_format: "cruxible-line-v7",
    identity: { kind: "Line", name },
    occurrence_epoch: 1,
    procedure: { target: { kind: "Procedure", name: procedure } },
    parameters: {},
    acquisition_policy: null,
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
      bindings: { parse: { target: { kind: "Provider", name: "sec-analysis/abc" } } },
    }),
  )!,
];

describe("definitions", () => {
  it("reads a Line envelope: parameters, trigger input, its contract and explicit bindings", () => {
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

  it("names each step's kind and the definitions it references by name", () => {
    const views = TRIAGE.steps.map(stepView);
    expect(views.map((v) => v.kind)).toEqual(["source", "tap", "call", "guard", "settle"]);
    expect(views[0]).toMatchObject({ contract: "sec.fetched-v1", interface: "web.fetch/v3", slot: "catalog", logicalSource: { literal: "cisa.kev.catalog" } });
    expect(views[1]).toMatchObject({ query: "sec.watched_vulnerabilities" });
    expect(views[2]).toMatchObject({ interface: "sec.kev-catalog/v2", slot: "parse" });
    expect(views[3]!.detail).toBe("parse.changed > 0 · refuses no_change");
    expect(stepView(FETCH.steps[0]!, 0).logicalSource).toEqual({ input: "logical_source" });
    expect(stepView(FETCH.steps[1]!, 1)).toMatchObject({ kind: "emit", contract: "sec.observation-output-v1" });
  });

  it("lists slots by name and the interface ref each names", () => {
    expect(procedureSlots(TRIAGE)).toEqual([
      { slot: "catalog", interface: "web.fetch@3" },
      { slot: "parse", interface: "sec.kev-catalog@2" },
    ]);
    expect(slotInterfaceRef("web.fetch@3")).toBe("ProviderInterface:web.fetch/v3");
    expect(slotInterfaceRef("workspace.file")).toBe("ProviderInterface:workspace.file");
  });

  it("retains through Lines (resolving $input. by parameters), skips a Line's trigger input, keeps direct runs", () => {
    const steps = [FETCH, TRIAGE, SBOM, EPSS].flatMap((spec) => sourceSteps(spec.procedure, spec));
    const all = retentions(steps, LINES);
    expect(all).toEqual([
      { contract: "sec.fetched-v1", source: "cisa.kev.catalog", procedure: "sec.fetch-observed", line: "kev-daily", emitted: false, given: null },
      { contract: "sec.observation-output-v1", source: null, procedure: "sec.fetch-observed", line: "kev-daily", emitted: true, given: null },
      // kev-triage reads its catalog from the landing: no retention
      { contract: "sec.file-v1", source: "cyclonedx.sbom", procedure: "sec.sbom-acquire", line: null, emitted: false, given: null },
      // the Provider names the EPSS source: not served, so no source
      { contract: "sec.fetched-v1", source: null, procedure: "sec.epss-acquire", line: null, emitted: false, given: null },
    ]);
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
    expect(arrivalWords({ interface: "web.fetch@3", emitted: false })).toBe("HTTP fetch");
    expect(arrivalWords({ interface: "workspace.file", emitted: false })).toBe("Workspace file");
    expect(arrivalWords({ interface: "security.release-asset/v1", emitted: false })).toBe("release-asset");
    expect(arrivalWords({ interface: null, emitted: true })).toBe("Run output");
    expect(urlWords({ url: "https://www.cisa.gov/sites/default/files/feeds/kev.json" })).toBe("From www.cisa.gov");
    expect(urlWords({})).toBeNull();
  });
});

describe("provider-named sources", () => {
  const step = (procedure: string, iface: string | null, logicalSource: { literal: string } | null = null) => ({
    procedure,
    alias: "pull",
    contract: "fetched-v1",
    interface: iface,
    logicalSource,
    emitted: false,
  });
  const line = (name: string, procedure: string) => ({
    line: name,
    procedure,
    parameters: {},
    triggerInput: null,
    triggerContract: null,
    bindings: {},
    acquisitionPolicy: null,
    maxAuthority: null,
    occurrenceEpoch: null,
  });

  it("take the source names a step's interface declares it produces when its request names none", () => {
    const produces = (iface: string) => (iface.startsWith("security.pypi-release") ? ["pypi.release"] : []);
    const out = retentions(
      [step("registry-acquire", "security.pypi-release/v2"), step("fetch", "web.fetch/v3", { literal: "cisa.kev" }), step("asset", "security.other/v1")],
      [line("registry-pull.cruxible", "registry-acquire")],
      produces,
    );
    expect(out.find((r) => r.procedure === "registry-acquire")).toMatchObject({ source: "pypi.release", line: "registry-pull.cruxible" });
    // a request that names its source keeps it; an interface that declares nothing leaves it unnamed
    expect(out.find((r) => r.procedure === "fetch")!.source).toBe("cisa.kev");
    expect(out.find((r) => r.procedure === "asset")!.source).toBeNull();
  });

  it("match interfaces by name across version spellings", () => {
    expect(interfaceBase("web.fetch@3")).toBe("web.fetch");
    expect(interfaceBase("security.pypi-release/v2")).toBe("security.pypi-release");
    expect(interfaceBase("workspace.file")).toBe("workspace.file");
  });
});

describe("Procedures that run only as Lines", () => {
  it("retain nothing until a Line runs them", () => {
    const step = { procedure: "log-import", alias: "log", contract: "file-v1", interface: "workspace.file", logicalSource: { literal: "log-read" }, emitted: false };
    expect(retentions([step], [], () => [], (procedure) => procedure !== "log-import")).toEqual([]);
    expect(retentions([step], [], () => [], () => true)).toHaveLength(1);
  });
});
