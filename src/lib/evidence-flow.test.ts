import { describe, expect, it } from "vitest";
import type { OrientPredicate } from "@/api/schemas";
import {
  buildFlow,
  COLUMNS,
  focusFlow,
  layoutFlow,
  nodeId,
  OWN_WORD,
  readClaimTypeAccepts,
  related,
  sharedPrefix,
  type FlowInputs,
} from "./evidence-flow";

const ct = (predicate: string, evidence: string[], captured = false): OrientPredicate => ({
  name: predicate.split(".").at(-1)!,
  predicate,
  cardinality: "one",
  type: "string",
  evidence,
  ...(captured ? { evidence_requirement: "captured" as const } : {}),
  subject_kinds: [predicate.split(".").slice(0, 2).join(".")],
});

const SELF = "playbill.coordinator-self-source-v1";

const INPUTS: FlowInputs = {
  sources: [
    { id: "cisa.kev", contracts: ["fetched-v1"], retainedBy: "retained by Line kev-daily" },
    { id: "first.epss", contracts: ["fetched-v1"] },
    { id: "github.repo", contracts: ["fetched-v1"] },
    { id: "evidence.file", contracts: ["file-v1"], retainedBy: "retained by a direct evidence-acquire run" },
  ],
  claimTypes: [
    ct("sec.vuln.kev_listed", ["fetched-v1"], true),
    ct("sec.vuln.epss", ["fetched-v1"], true),
    ct("sec.job.uses", ["fetched-v1"], true),
    ct("sec.assess.status", ["file-v1", SELF]),
    ct("sec.service.criticality", [SELF]),
    ct("sec.job.name", []),
  ],
  accepts: new Map([
    ["sec.vuln.kev_listed", [{ contract: "fetched-v1", sources: ["cisa.kev"] }]],
    ["sec.vuln.epss", [{ contract: "fetched-v1", sources: ["first.epss"] }]],
    ["sec.job.uses", [{ contract: "fetched-v1", sources: ["github.repo"] }]],
    ["sec.assess.status", [{ contract: "file-v1", sources: [] }, { contract: SELF, sources: [] }]],
    ["sec.service.criticality", [{ contract: SELF, sources: [] }]],
  ]),
  triggers: [
    { name: "kev-landed", contract: "CaptureContract:fetched-v1", target: "Line:kev-triage", logicalSources: ["cisa.kev"] },
    { name: "epss-landed", contract: "CaptureContract:fetched-v1", target: "Line:epss-triage", logicalSources: ["first.epss"] },
    { name: "repo-landed", contract: "CaptureContract:fetched-v1", target: "Line:repo-parse", logicalSources: ["github.repo"] },
  ],
  lineAuthority: new Map([["kev-triage", "settle"]]),
};

describe("evidence flow model: sources -> Lines -> ClaimTypes", () => {
  const model = buildFlow(INPUTS);
  const edge = (from: string, to: string) => model.edges.find((e) => e.from === from && e.to === to);

  it("links a source to the Lines whose Triggers select it, and nothing else", () => {
    expect(edge(nodeId.source("cisa.kev"), nodeId.line("kev-triage"))).toBeDefined();
    expect(edge(nodeId.source("cisa.kev"), nodeId.line("epss-triage"))).toBeUndefined();
    expect(model.nodes.find((n) => n.id === nodeId.line("kev-triage"))).toMatchObject({
      authority: "settle",
      detail: "When cisa.kev lands",
      triggers: ["kev-landed"],
    });
  });

  it("links a Line only to the ClaimTypes that accept a source it reads", () => {
    expect(edge(nodeId.line("kev-triage"), nodeId.claimType("sec.vuln.kev_listed"))).toMatchObject({ sources: ["cisa.kev"], required: true });
    // same contract, different source: no edge
    expect(edge(nodeId.line("kev-triage"), nodeId.claimType("sec.vuln.epss"))).toBeUndefined();
    expect(edge(nodeId.line("repo-parse"), nodeId.claimType("sec.job.uses"))).toBeDefined();
  });

  it("sends a source no Line reads, and own-word statements, straight to the ClaimTypes that accept them", () => {
    expect(edge(nodeId.source("evidence.file"), nodeId.claimType("sec.assess.status"))).toMatchObject({ direct: true });
    expect(edge(OWN_WORD, nodeId.claimType("sec.service.criticality"))).toMatchObject({ direct: true });
    expect(edge(OWN_WORD, nodeId.claimType("sec.assess.status"))).toMatchObject({ direct: true });
    // a source a Line reads does not also skip the Line
    expect(edge(nodeId.source("cisa.kev"), nodeId.claimType("sec.vuln.kev_listed"))).toBeUndefined();
    // a ClaimType that takes no evidence stays off the flow
    expect(model.nodes.some((n) => n.id === nodeId.claimType("sec.job.name"))).toBe(false);
  });

  it("draws no ClaimType edges from a Line capped at observe", () => {
    const capped = buildFlow({ ...INPUTS, lineAuthority: new Map([["kev-triage", "observe"]]) });
    expect(capped.edges.some((e) => e.from === nodeId.line("kev-triage") && e.to.startsWith("claim_type:"))).toBe(false);
    expect(capped.edges.some((e) => e.to === nodeId.line("kev-triage"))).toBe(true);
  });

  it("falls back to any source under a ClaimType's contracts when its rules weren't read", () => {
    const loose = buildFlow({ ...INPUTS, accepts: new Map() });
    expect(loose.edges.find((e) => e.from === nodeId.line("kev-triage") && e.to === nodeId.claimType("sec.vuln.epss"))).toBeDefined();
  });

  it("focus from a source keeps only its own path; focus on a ClaimType keeps its upstream", () => {
    const kept = related(model, nodeId.source("cisa.kev"));
    expect(kept.has(nodeId.claimType("sec.vuln.kev_listed"))).toBe(true);
    expect(kept.has(nodeId.claimType("sec.vuln.epss"))).toBe(false);
    const sub = focusFlow(model, nodeId.claimType("sec.service.criticality"));
    expect(sub.nodes.map((n) => n.id).sort()).toEqual([OWN_WORD, nodeId.claimType("sec.service.criticality")].sort());
  });
});

describe("evidence flow layout", () => {
  const layout = layoutFlow(buildFlow(INPUTS));
  it("puts sources, Lines and ClaimTypes in three columns, each packed from the top, without overlap", () => {
    const at = (kind: string) => layout.placed.filter((p) => p.kind === kind);
    expect(new Set(at("source").map((p) => p.x))).toEqual(new Set([COLUMNS[1].x]));
    expect(new Set(at("line").map((p) => p.x))).toEqual(new Set([COLUMNS[2].x]));
    expect(new Set(at("claim_type").map((p) => p.x))).toEqual(new Set([COLUMNS[3].x]));
    const top = Math.min(...at("source").map((p) => p.y));
    expect(Math.min(...at("line").map((p) => p.y))).toBe(top);
    for (const column of [at("source"), at("line"), [...at("claim_type"), ...at("kind")]]) {
      const sorted = [...column].sort((a, b) => a.y - b.y);
      for (let i = 1; i < sorted.length; i += 1) expect(sorted[i]!.y).toBeGreaterThanOrEqual(sorted[i - 1]!.y + sorted[i - 1]!.h);
    }
    // own-word statements sit last in the source column
    const sources = [...at("source")].sort((a, b) => a.y - b.y);
    expect(sources.at(-1)?.id).toBe(OWN_WORD);
  });
});

describe("helpers", () => {
  it("drops a shared namespace only when every name has it", () => {
    expect(sharedPrefix(["security.kev-triage", "security.release"])).toBe("security.");
    expect(sharedPrefix(["security.kev-triage", "caselaw.decision"])).toBe("");
  });
  it("reads what a ClaimType accepts from its proof", () => {
    const proof = {
      envelope: {
        identity: { kind: "ClaimType", name: "sec.vuln.kev_listed" },
        evidence_admission_policy: {
          rules: [{ capture_contracts: [{ target: { kind: "CaptureContract", name: "fetched-v1" }, logical_sources: ["cisa.kev"] }] }],
        },
      },
    };
    expect(readClaimTypeAccepts(proof)).toEqual({ predicate: "sec.vuln.kev_listed", accepts: [{ contract: "fetched-v1", sources: ["cisa.kev"] }] });
    expect(readClaimTypeAccepts({})).toBeNull();
  });
});

describe("where sources come from", () => {
  const model = buildFlow({
    ...INPUTS,
    acquirers: [
      { name: "kev-daily", runs: "line", about: "From www.cisa.gov", when: "Daily at 06:00 UTC", sources: ["cisa.kev"] },
      { name: "evidence-acquire", runs: "direct", about: "Read one workspace file", when: "When an agent runs it", sources: ["evidence.file"] },
      { name: "orphan-pull", runs: "line", sources: ["nothing.here"] },
    ],
  });
  const node = (id: string) => model.nodes.find((n) => n.id === id);

  it("links each fetching Line and direct run to the sources it retains, and marks those sources", () => {
    const kevDaily = nodeId.acquirer("line", "kev-daily");
    expect(node(kevDaily)).toMatchObject({ kind: "acquirer", runs: "line", about: "From www.cisa.gov", when: "Daily at 06:00 UTC" });
    expect(model.edges.some((e) => e.from === kevDaily && e.to === nodeId.source("cisa.kev"))).toBe(true);
    expect(node(nodeId.source("cisa.kev"))!.acquired).toBe(true);
    expect(node(nodeId.source("first.epss"))!.acquired).toBeUndefined();
    expect(node(nodeId.acquirer("direct", "evidence-acquire"))!.runs).toBe("direct");
    // an acquirer of a source not on the flow is left off
    expect(node(nodeId.acquirer("line", "orphan-pull"))).toBeUndefined();
  });

  it("puts them in the first column, and a focus on a ClaimType keeps its acquirer", () => {
    const layout = layoutFlow(model);
    const placed = layout.byId.get(nodeId.acquirer("line", "kev-daily"))!;
    expect(placed.x).toBe(COLUMNS[0].x);
    expect(related(model, nodeId.claimType("sec.vuln.kev_listed")).has(nodeId.acquirer("line", "kev-daily"))).toBe(true);
    expect(related(model, nodeId.claimType("sec.vuln.epss")).has(nodeId.acquirer("line", "kev-daily"))).toBe(false);
  });
});

describe("the inbox", () => {
  it("heads the last column, and the Lines whose Procedure posts items link to it", () => {
    const model = buildFlow({ ...INPUTS, postsInbox: new Set(["kev-triage", "not-on-the-flow"]) });
    expect(model.nodes.find((n) => n.id === nodeId.inbox)).toMatchObject({ kind: "inbox", label: "Inbox" });
    expect(model.edges.filter((e) => e.to === nodeId.inbox)).toEqual([{ from: nodeId.line("kev-triage"), to: nodeId.inbox, inbox: true }]);
    const layout = layoutFlow(model);
    const inbox = layout.byId.get(nodeId.inbox)!;
    expect(inbox.x).toBe(COLUMNS[3].x);
    expect(Math.min(...layout.placed.filter((p) => p.kind === "kind").map((p) => p.y))).toBeGreaterThan(inbox.y);
  });

  it("is left off when no Line posts", () => {
    expect(buildFlow(INPUTS).nodes.some((n) => n.kind === "inbox")).toBe(false);
  });
});
