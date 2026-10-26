import { describe, expect, it } from "vitest";
import type { OrientPredicate } from "@/api/schemas";
import { buildFlow, COLUMNS, focusFlow, layoutFlow, nodeId, related, type FlowInputs } from "./evidence-flow";

const ct = (predicate: string, evidence: string[], captured = false): OrientPredicate => ({
  name: predicate.split(".").at(-1)!,
  predicate,
  cardinality: "one",
  type: "string",
  evidence,
  ...(captured ? { evidence_requirement: "captured" as const } : {}),
  subject_kinds: [predicate.split(".").slice(0, 2).join(".")],
});

const INPUTS: FlowInputs = {
  contracts: [
    { name: "kev-v1", grade: "observed" },
    { name: "repo-v1", grade: "observed" },
    { name: "lonely-v1", grade: "observed" },
  ],
  // Logical sources, from the steps that retain them and the Triggers that select them.
  sources: [
    { id: "cisa.kev", contracts: ["kev-v1"], retainedBy: "retained by Line kev-daily" },
    { id: "github.repo", contracts: ["repo-v1"] },
    { id: "github.api", contracts: ["repo-v1"] },
    { id: "doc", contracts: ["lonely-v1"] },
  ],
  claimTypes: [
    ct("sec.vuln.kev_listed", ["kev-v1"], true),
    ct("sec.vuln.title", ["kev-v1", "repo-v1"]),
    ct("sec.job.uses", ["repo-v1"], true),
    ct("sec.job.name", []),
    ct("sec.job.ghost", ["unlisted-v1"]),
  ],
  triggers: [
    { name: "kev-landed", contract: "CaptureContract:kev-v1", target: "Line:kev-triage", logicalSources: ["cisa.kev"] },
    { name: "repo-landed", contract: "CaptureContract:repo-v1", target: "Line:repo-parse" },
    { name: "api-landed", contract: "CaptureContract:repo-v1", target: "Line:api-parse", logicalSources: ["github.api"] },
  ],
  lineAuthority: new Map([["kev-triage", "settle"]]),
  producers: new Map([["kev-v1", ["Procedure:kev-acquire"]]]),
};

describe("evidence flow model", () => {
  const model = buildFlow(INPUTS);

  it("draws sources -> contracts -> Triggers and evidence-taking ClaimTypes", () => {
    const ids = model.nodes.map((n) => n.id);
    expect(ids).toContain(nodeId.source("github.api"));
    expect(ids).toContain(nodeId.trigger("kev-landed"));
    expect(ids).not.toContain(nodeId.claimType("sec.job.name")); // takes no Captures
    // a contract a ClaimType names but the section omits still appears, without a grade
    const ghost = model.nodes.find((n) => n.id === nodeId.contract("unlisted-v1"))!;
    expect(ghost.detail).toBeUndefined();
    expect(model.edges).toContainEqual({ from: nodeId.contract("kev-v1"), to: nodeId.claimType("sec.vuln.kev_listed"), required: true });
    expect(model.edges).toContainEqual({ from: nodeId.contract("repo-v1"), to: nodeId.claimType("sec.vuln.title") });
    expect(model.nodes.find((n) => n.id === nodeId.trigger("kev-landed"))).toMatchObject({ detail: "Line:kev-triage", authority: "settle" });
    expect(model.nodes.find((n) => n.id === nodeId.contract("kev-v1"))?.producers).toEqual(["Procedure:kev-acquire"]);
  });

  it("draws a source node per logical source, with who retains it, and Trigger edges carrying their selection", () => {
    expect(model.nodes.find((n) => n.id === nodeId.source("cisa.kev"))).toMatchObject({ kind: "source", detail: "retained by Line kev-daily" });
    expect(model.edges).toContainEqual({ from: nodeId.source("github.api"), to: nodeId.contract("repo-v1") });
    expect(model.edges).toContainEqual({ from: nodeId.contract("repo-v1"), to: nodeId.trigger("api-landed"), sources: ["github.api"] });
    expect(model.edges).toContainEqual({ from: nodeId.contract("repo-v1"), to: nodeId.trigger("repo-landed") });
    expect(model.nodes.find((n) => n.id === nodeId.trigger("api-landed"))?.sources).toEqual(["github.api"]);
  });

  it("traces a source only into the Triggers that select it, and a selecting Trigger only back to its sources", () => {
    const repo = related(model, nodeId.source("github.repo"));
    expect(repo.has(nodeId.trigger("repo-landed"))).toBe(true); // selects any landing
    expect(repo.has(nodeId.trigger("api-landed"))).toBe(false); // selects github.api only
    expect(repo.has(nodeId.claimType("sec.job.uses"))).toBe(true);
    const api = related(model, nodeId.trigger("api-landed"));
    expect(api.has(nodeId.source("github.api"))).toBe(true);
    expect(api.has(nodeId.source("github.repo"))).toBe(false);
    // a contract still traces to every source and Trigger it carries
    const contract = related(model, nodeId.contract("repo-v1"));
    for (const id of [nodeId.source("github.repo"), nodeId.source("github.api"), nodeId.trigger("api-landed"), nodeId.trigger("repo-landed")]) {
      expect(contract.has(id)).toBe(true);
    }
  });

  it("a focus keeps upstream and downstream, never siblings", () => {
    const keep = related(model, nodeId.claimType("sec.job.uses"));
    expect([...keep].sort()).toEqual(
      [nodeId.claimType("sec.job.uses"), nodeId.contract("repo-v1"), nodeId.source("github.repo"), nodeId.source("github.api")].sort(),
    );
    const kind = focusFlow(model, nodeId.kind("sec.vuln"));
    expect(kind.nodes.map((n) => n.id)).not.toContain(nodeId.claimType("sec.job.uses"));
    expect(kind.nodes.map((n) => n.id)).toContain(nodeId.source("cisa.kev"));
    expect(kind.nodes.map((n) => n.id)).not.toContain(nodeId.trigger("kev-landed"));
    expect(focusFlow(model, "contract:nothing")).toBe(model);
  });

  it("lays out deterministically: columns left to right, rows never overlapping", () => {
    const a = layoutFlow(model);
    const b = layoutFlow(buildFlow(INPUTS));
    expect(a.placed).toEqual(b.placed);
    for (const edge of a.edges) {
      const from = a.byId.get(edge.from)!;
      const to = a.byId.get(edge.to)!;
      expect(from.x + from.w).toBeLessThan(to.x);
    }
    for (const column of COLUMNS) {
      const rows = a.placed.filter((p) => p.x === column.x).sort((p, q) => p.y - q.y);
      for (let i = 1; i < rows.length; i += 1) expect(rows[i]!.y).toBeGreaterThanOrEqual(rows[i - 1]!.y + rows[i - 1]!.h);
    }
    // Triggers first, then ClaimTypes under their kind's row
    const right = a.placed.filter((p) => p.x === COLUMNS[2].x).map((p) => p.id);
    expect(right.indexOf(nodeId.trigger("repo-landed"))).toBeLessThan(right.indexOf("heading:beliefs"));
    expect(right.indexOf(nodeId.kind("sec.job"))).toBeLessThan(right.indexOf(nodeId.claimType("sec.job.uses")));
    // the contract that feeds nothing sits below the others
    const lonely = a.byId.get(nodeId.contract("lonely-v1"))!;
    for (const c of a.placed.filter((p) => p.kind === "contract" && p.id !== lonely.id)) expect(lonely.y).toBeGreaterThan(c.y);
  });
});
