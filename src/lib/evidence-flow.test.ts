import { describe, expect, it } from "vitest";
import type { OrientPredicate } from "@/api/schemas";
import {
  buildFlow,
  COLUMNS,
  edgeKey,
  focusFlow,
  linkPath,
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
    { id: "cisa.kev", contracts: ["fetched-v1"], host: "cisa.gov", arrives: "HTTP fetch", when: "Daily at 6:00 AM", fetchedBy: "Fetched by Line kev-triage" },
    { id: "first.epss", contracts: ["fetched-v1"], host: "api.first.org" },
    { id: "evidence.file", contracts: ["file-v1"], arrives: "Workspace file", when: "When an agent runs it" },
  ],
  lines: [
    { name: "kev-triage", authority: "settle", enablement: "running", reads: ["cisa.kev"], lands: ["cisa.kev"], writes: ["sec.vuln.kev_listed"] },
    { name: "epss-triage", authority: "propose", enablement: null, reads: ["first.epss"], lands: ["first.epss"], writes: ["sec.vuln.epss", "sec.vuln.kev_listed"] },
    // reads a source the definitions don't otherwise retain
    { name: "repo-parse", authority: "propose", reads: ["github.repo"], writes: ["sec.job.uses"] },
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
    ["sec.assess.status", [{ contract: "file-v1", sources: [] }, { contract: SELF, sources: [] }]],
    ["sec.service.criticality", [{ contract: SELF, sources: [] }]],
  ]),
};

describe("evidence flow model: source -> the Line that fetches it -> the ClaimTypes it writes", () => {
  const model = buildFlow(INPUTS);
  const edge = (from: string, to: string) => model.edges.find((e) => e.from === from && e.to === to);
  const node = (id: string) => model.nodes.find((n) => n.id === id);

  it("links a source to the Lines whose calls name it, marking the ones that fetch it", () => {
    expect(edge(nodeId.source("cisa.kev"), nodeId.line("kev-triage"))).toMatchObject({ lands: true });
    expect(edge(nodeId.source("cisa.kev"), nodeId.line("epss-triage"))).toBeUndefined();
    // a source only a Line's calls name still gets its card
    expect(node(nodeId.source("github.repo"))).toMatchObject({ kind: "source", label: "github.repo" });
    expect(edge(nodeId.source("github.repo"), nodeId.line("repo-parse"))?.lands).toBeUndefined();
  });

  it("says where a source comes from in plain words, and when it is fetched", () => {
    expect(node(nodeId.source("cisa.kev"))).toMatchObject({ host: "cisa.gov", arrives: "HTTP fetch", when: "Daily at 6:00 AM", detail: "Fetched by Line kev-triage" });
  });

  it("carries each Line's authority and state", () => {
    expect(node(nodeId.line("kev-triage"))).toMatchObject({ kind: "line", authority: "settle", enablement: "running" });
    expect(node(nodeId.line("epss-triage"))).toMatchObject({ authority: "propose", enablement: null });
  });

  it("links a Line to the ClaimTypes its claims steps name, tinting each by the strongest writer", () => {
    expect(edge(nodeId.line("kev-triage"), nodeId.claimType("sec.vuln.kev_listed"))).toMatchObject({ authority: "settle", required: true });
    expect(edge(nodeId.line("kev-triage"), nodeId.claimType("sec.vuln.epss"))).toBeUndefined();
    expect(node(nodeId.claimType("sec.vuln.kev_listed"))!.authority).toBe("settle");
    expect(node(nodeId.claimType("sec.vuln.epss"))!.authority).toBe("propose");
    // written whatever its evidence rules say: no rules were read for sec.job.uses
    expect(edge(nodeId.line("repo-parse"), nodeId.claimType("sec.job.uses"))).toBeDefined();
    // one the listing lacks is named by its predicate, under the kind it names
    const more = buildFlow({ ...INPUTS, lines: [{ name: "x", authority: "propose", reads: [], writes: ["sec.vuln.cvss"] }] });
    expect(more.nodes.find((n) => n.id === nodeId.claimType("sec.vuln.cvss"))).toMatchObject({ label: "cvss", group: "sec.vuln", authority: "propose" });
  });

  it("sends own-word statements, and a source to a ClaimType no Line writes, straight to the ClaimTypes that accept them", () => {
    expect(edge(OWN_WORD, nodeId.claimType("sec.service.criticality"))).toMatchObject({ direct: true });
    expect(edge(OWN_WORD, nodeId.claimType("sec.assess.status"))).toMatchObject({ direct: true });
    expect(edge(nodeId.source("evidence.file"), nodeId.claimType("sec.assess.status"))).toMatchObject({ direct: true });
    // neutral: no Line writes them
    expect(node(nodeId.claimType("sec.assess.status"))!.authority).toBeUndefined();
    // a source a Line writes from does not also skip the Line
    expect(edge(nodeId.source("cisa.kev"), nodeId.claimType("sec.vuln.kev_listed"))).toBeUndefined();
    // a ClaimType nothing reaches stays off the flow
    expect(node(nodeId.claimType("sec.job.name"))).toBeUndefined();
  });

  it("draws no ClaimType edges from a Line capped at observe", () => {
    const capped = buildFlow({ ...INPUTS, lines: INPUTS.lines.map((l) => (l.name === "kev-triage" ? { ...l, authority: "observe" } : l)) });
    expect(capped.edges.some((e) => e.from === nodeId.line("kev-triage") && e.to.startsWith("claim_type:"))).toBe(false);
    expect(capped.edges.some((e) => e.to === nodeId.line("kev-triage"))).toBe(true);
    // epss-triage still writes kev_listed: proposes is now its strongest writer
    expect(capped.nodes.find((n) => n.id === nodeId.claimType("sec.vuln.kev_listed"))!.authority).toBe("propose");
  });

  it("focus from a source keeps its Line and what that Line writes; focus on a ClaimType keeps its upstream", () => {
    const kept = related(model, nodeId.source("cisa.kev"));
    expect(kept.has(nodeId.line("kev-triage"))).toBe(true);
    expect(kept.has(nodeId.claimType("sec.vuln.kev_listed"))).toBe(true);
    expect(kept.has(nodeId.claimType("sec.vuln.epss"))).toBe(false);
    expect(kept.has(nodeId.line("epss-triage"))).toBe(false);
    const upstream = related(model, nodeId.claimType("sec.vuln.epss"));
    expect([...upstream].sort()).toEqual([nodeId.claimType("sec.vuln.epss"), nodeId.line("epss-triage"), nodeId.source("first.epss")].sort());
    const sub = focusFlow(model, nodeId.claimType("sec.service.criticality"));
    expect(sub.nodes.map((n) => n.id).sort()).toEqual([OWN_WORD, nodeId.claimType("sec.service.criticality")].sort());
  });
});

describe("evidence flow layout", () => {
  const layout = layoutFlow(buildFlow(INPUTS));
  it("puts sources, Lines and ClaimTypes in three columns, each packed from the top, without overlap", () => {
    const at = (kind: string) => layout.placed.filter((p) => p.kind === kind);
    expect(new Set(at("source").map((p) => p.x))).toEqual(new Set([COLUMNS[0].x]));
    expect(new Set(at("line").map((p) => p.x))).toEqual(new Set([COLUMNS[1].x]));
    expect(new Set(at("claim_type").map((p) => p.x))).toEqual(new Set([COLUMNS[2].x]));
    expect(at("heading").map((p) => p.label)).toEqual(["Source", "Line", "What it produces"]);
    const top = Math.min(...at("source").map((p) => p.y));
    expect(Math.min(...at("line").map((p) => p.y))).toBe(top);
    for (const column of [at("source"), at("line"), [...at("claim_type"), ...at("kind")]]) {
      const sorted = [...column].sort((a, b) => a.y - b.y);
      for (let i = 1; i < sorted.length; i += 1) expect(sorted[i]!.y).toBeGreaterThanOrEqual(sorted[i - 1]!.y + sorted[i - 1]!.h);
    }
    // your statements sit last in the source column
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

describe("the inbox", () => {
  it("heads the last column, and the Lines whose Procedure posts items link to it", () => {
    const model = buildFlow({ ...INPUTS, lines: INPUTS.lines.map((l) => (l.name === "kev-triage" ? { ...l, postsInbox: true } : l)) });
    expect(model.nodes.find((n) => n.id === nodeId.inbox)).toMatchObject({ kind: "inbox", label: "Inbox" });
    expect(model.edges.filter((e) => e.to === nodeId.inbox)).toEqual([{ from: nodeId.line("kev-triage"), to: nodeId.inbox, inbox: true }]);
    const layout = layoutFlow(model);
    const inbox = layout.byId.get(nodeId.inbox)!;
    expect(inbox.x).toBe(COLUMNS[2].x);
    expect(Math.min(...layout.placed.filter((p) => p.kind === "kind").map((p) => p.y))).toBeGreaterThan(inbox.y);
  });

  it("is left off when no Line posts", () => {
    expect(buildFlow(INPUTS).nodes.some((n) => n.kind === "inbox")).toBe(false);
  });
});

describe("short names", () => {
  it("drop the namespace most names share, and keep the full name outside it or where it would clash", async () => {
    const { shortNames } = await import("./evidence-flow");
    const names = ["security.release", "security.job", "security.asset", "semantic.subject", "job"];
    const { prefix, label } = shortNames(names);
    expect(prefix).toBe("security.");
    expect(label("security.release")).toBe("release");
    expect(label("semantic.subject")).toBe("semantic.subject");
    // "security.job" would read as the unprefixed "job": both keep their full names
    expect(label("security.job")).toBe("security.job");
    expect(label("job")).toBe("job");
    expect(shortNames(["a.x", "b.y"]).prefix).toBe("");
  });
});

describe("evidence flow: links between Lines", () => {
  const dep = (producer: string | null, reader: string, query = "sec.watched") => ({
    producer,
    reader,
    step: "watched",
    query,
    claimTypes: producer ? ["sec.vuln.kev_listed"] : ["sec.vuln.cve_id"],
    kinds: producer ? [] : ["sec.vuln"],
    writes: producer ? ["settle"] : [],
  });
  // epss-triage reads what kev-triage writes (and what is entered directly); repo-parse's Query is fed only by direct entry.
  const model = buildFlow({
    ...INPUTS,
    dependencies: [dep("kev-triage", "epss-triage"), dep(null, "epss-triage"), dep(null, "repo-parse", "sec.jobs")],
  });
  const link = (from: string, to: string) => model.edges.find((e) => e.from === from && e.to === to && e.dependencies);

  it("links the producer Line to the reader, carrying what its Query reads from it", () => {
    expect(link(nodeId.line("kev-triage"), nodeId.line("epss-triage"))?.dependencies?.map((d) => d.query)).toEqual(["sec.watched"]);
    // a Line feeds that Query: no link from Entered directly as well
    expect(link(OWN_WORD, nodeId.line("epss-triage"))).toBeUndefined();
    // only direct entry feeds repo-parse's Query: the dashed card links to it
    expect(link(OWN_WORD, nodeId.line("repo-parse"))?.dependencies?.[0]?.kinds).toEqual(["sec.vuln"]);
  });

  it("creates Entered directly when only a link needs it", () => {
    const bare = buildFlow({ ...INPUTS, accepts: new Map(), claimTypes: INPUTS.claimTypes.filter((c) => !c.evidence?.includes(SELF)), dependencies: [dep(null, "repo-parse")] });
    expect(bare.nodes.find((n) => n.id === OWN_WORD)?.ownWord).toBe(true);
    expect(bare.edges.filter((e) => e.from === OWN_WORD).map((e) => e.to)).toEqual([nodeId.line("repo-parse")]);
  });

  it("hover tracing walks the links: a producer's trace reaches the Line that reads from it", () => {
    expect(related(model, nodeId.source("cisa.kev")).has(nodeId.line("epss-triage"))).toBe(true);
    expect(related(model, nodeId.line("epss-triage")).has(nodeId.line("kev-triage"))).toBe(true);
  });

  it("lays the producer out above the reader, the link in a lane left of the Line column", () => {
    // epss-triage alone would sit first (its rows come first); reading from kev-triage, it goes below it
    const plain = layoutFlow(buildFlow(INPUTS));
    expect(plain.byId.get(nodeId.line("epss-triage"))!.y).toBeLessThan(plain.byId.get(nodeId.line("kev-triage"))!.y);
    const layout = layoutFlow(model);
    const from = layout.byId.get(nodeId.line("kev-triage"))!;
    const to = layout.byId.get(nodeId.line("epss-triage"))!;
    expect(from.y).toBeLessThan(to.y);
    const key = edgeKey({ from: from.id, to: to.id });
    expect(layout.lanes.get(key)).toBe(0);
    // out of the producer's left edge near its bottom, down the lane, into the reader's left edge near its top
    const d = linkPath(from, to, 0);
    expect(d.startsWith(`M${COLUMNS[1].x},${from.y + from.h - 18}`)).toBe(true);
    expect(d).toContain(`V`);
    expect(d.endsWith(`,${to.y + 18} H${COLUMNS[1].x}`)).toBe(true);
    expect(Math.min(...[...d.matchAll(/[HQ ](\d+)/g)].map((m) => Number(m[1])))).toBeGreaterThan(COLUMNS[0].x + COLUMNS[0].w);
  });
});
