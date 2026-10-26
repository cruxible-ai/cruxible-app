import { describe, expect, it } from "vitest";
import type { ProcedureSpec } from "./definitions";
import { buildProcedureGraph, collectRefs, conditionRefs, cronWords, edgeLabel, INPUT_NODE, lineage } from "./procedure-graph";

const edgesOf = (spec: ProcedureSpec) =>
  buildProcedureGraph(spec)
    .edges.map((e) => `${e.kind} ${e.source}->${e.target} ${e.fields.join(",")}`.trim())
    .sort();

/** security.kev-triage as the kit authors it. */
const KEV_TRIAGE: ProcedureSpec = {
  procedure: "security.kev-triage",
  input: {},
  returns: { fields: { changed: "$parse.changed", listed: "$parse.listed" } },
  slots: { catalog: "web.fetch@3", parse: "security.kev-catalog@2" },
  steps: [
    {
      id: "catalog",
      source: "catalog",
      contract: "security.fetched-v1",
      interface: "web.fetch/v3",
      provider: "catalog",
      request: { logical_source: "cisa.kev.catalog", url: "https://example.invalid/kev.json" },
    },
    { id: "watched", tap: "watched", query: "security.watched_vulnerabilities" },
    {
      id: "parse",
      call: "parse",
      interface: "security.kev-catalog/v2",
      provider: "parse",
      input: { catalog_base64: "$catalog.retrieved.body_base64", watched: "$watched.result.rows" },
    },
    { id: "changed", guard: "parse.changed > 0", refusal_code: "no_change", else_id: "nochange", else: "halt(no_change)" },
    { id: "settle", settle: "$parse.items", result: "$summary" },
  ],
};

describe("references", () => {
  it("collects $name.field strings at any depth, with where they sit", () => {
    expect(
      collectRefs({ input: { a: "$parse.items", nested: { truncated: ["$audits.truncated", "plain", "$input"] } }, n: 3 }),
    ).toEqual([
      { name: "parse", field: "items", at: "input.a" },
      { name: "audits", field: "truncated", at: "input.nested.truncated[0]" },
      { name: "input", field: null, at: "input.nested.truncated[2]" },
    ]);
  });

  it("reads step.field mentions in a condition, skipping names no step declares and quoted text", () => {
    const names = new Set(["parse", "registry", "input"]);
    expect(conditionRefs('registry.project == input.project && other.x > 0 && note == "parse.items"', names, "guard")).toEqual([
      { name: "registry", field: "project", at: "guard" },
      { name: "input", field: "project", at: "guard" },
    ]);
    expect(conditionRefs("parse.changed > 0", names, "guard")).toEqual([{ name: "parse", field: "changed", at: "guard" }]);
  });
});

describe("procedure graph", () => {
  it("draws kev-triage from its references: sources and taps feed the call, the call feeds the guard, the terminal and returns", () => {
    const graph = buildProcedureGraph(KEV_TRIAGE);
    expect(graph.nodes.map((n) => `${n.id}:${n.role}`)).toEqual([
      "catalog:source",
      "watched:tap",
      "parse:call",
      "changed:guard",
      "settle:terminal",
      "summary:terminal",
      "nochange:terminal",
    ]);
    expect(edgesOf(KEV_TRIAGE)).toEqual([
      "control changed->nochange else",
      "data catalog->parse retrieved.body_base64",
      "data parse->changed changed",
      "data parse->settle items",
      "data parse->summary changed,listed",
      "data summary->settle",
      "data watched->parse result.rows",
    ]);
    expect(graph.nodes.find((n) => n.id === "nochange")).toMatchObject({ kind: "halt", detail: ["no_change"] });
    expect(graph.nodes.find((n) => n.id === "summary")).toMatchObject({ kind: "returns", detail: ["changed", "listed"] });
  });

  it("reads nested inputs and the whole input: one edge per step pair, every field on it", () => {
    const spec: ProcedureSpec = {
      procedure: "security.respond",
      input: { incident: { type: "string" }, log_pull: { type: "string" } },
      steps: [
        { id: "exposure", tap: "exposure", query: "q.exposure", params: { incident: "$input.incident" } },
        { id: "audits", tap: "audits", query: "q.audits" },
        {
          id: "classify",
          call: "classify",
          interface: "security.respond/v1",
          input: {
            audits: "$audits.result.rows",
            exposure: "$exposure.result.rows",
            params: "$input",
            truncated: { audits: "$audits.truncated", exposure: "$exposure.truncated" },
          },
        },
        { id: "post", inbox: { items: "$classify.items" } },
      ],
    };
    const graph = buildProcedureGraph(spec);
    expect(graph.nodes[0]).toMatchObject({ id: INPUT_NODE, role: "input", detail: ["incident", "log_pull"] });
    expect(edgesOf(spec)).toEqual([
      `data ${INPUT_NODE}->classify`,
      `data ${INPUT_NODE}->exposure incident`,
      "data audits->classify result.rows,truncated",
      "data classify->post items",
      "data exposure->classify result.rows,truncated",
    ]);
  });

  it("feeds $input.* in a source request (a logical source a Line gives) and in a condition from the input", () => {
    const spec: ProcedureSpec = {
      procedure: "security.registry-parse",
      input: { project: { type: "string" }, source: { type: "string" } },
      steps: [
        {
          id: "registry",
          source: "registry",
          contract: "security.fetched-v1",
          interface: "security.pypi-release/v1",
          request: { project: "$input.project", logical_source: "$input.source" },
        },
        { id: "mine", guard: "registry.project == input.project", else_id: "other", else: "halt(other_source)" },
        { id: "parse", call: "parse", interface: "x/v1", input: { release: "$registry" } },
      ],
    };
    expect(edgesOf(spec)).toEqual([
      "control mine->other else",
      `data ${INPUT_NODE}->mine project`,
      `data ${INPUT_NODE}->registry project,source`,
      "data registry->mine project",
      "data registry->parse",
    ]);
  });

  it("links an invoke to its child Procedure, feeds it from its input, and resolves later references through its alias", () => {
    const spec: ProcedureSpec = {
      procedure: "parent",
      input: { release: { type: "string" } },
      steps: [
        { id: "fetch", source: "fetch", contract: "c-v1", interface: "web.fetch/v3", request: { url: "$input.release" } },
        { id: "child_step", invoke: "security.child", as: "judged", input: { body: "$fetch.retrieved", release: "$input.release" } },
        { id: "propose", propose: "$judged.items" },
      ],
    };
    const graph = buildProcedureGraph(spec);
    expect(graph.nodes.find((n) => n.id === "child_step")).toMatchObject({ role: "invoke", view: { procedure: "security.child" } });
    expect(edgesOf(spec)).toEqual([
      `data ${INPUT_NODE}->child_step release`,
      `data ${INPUT_NODE}->fetch release`,
      "data child_step->propose items",
      "data fetch->child_step retrieved",
    ]);
  });

  it("draws a guard's else that hands over to a step, select sources, and keeps unknown names on the step", () => {
    const spec: ProcedureSpec = {
      procedure: "p",
      input: {},
      steps: [
        { id: "a", tap: "a", query: "q.a" },
        { id: "b", tap: "b", query: "q.b" },
        { id: "pick", select: "pick", sources: ["a", "b"] },
        { id: "allowed", guard: "pick.posted == 0", else: "post" },
        { id: "propose", propose: "$pick.items", result: "$nowhere.x" },
        { id: "post", inbox: { items: "$pick.inbox" } },
      ],
    };
    const graph = buildProcedureGraph(spec);
    expect(edgesOf(spec)).toEqual([
      "control allowed->post else",
      "data a->pick",
      "data b->pick",
      "data pick->allowed posted",
      "data pick->post inbox",
      "data pick->propose items",
    ]);
    expect(graph.nodes.find((n) => n.id === "propose")!.unresolved).toEqual([{ name: "nowhere", field: "x", at: "result" }]);
  });

  it("labels an edge with its fields while they are short", () => {
    const edge = (fields: string[]) => ({ id: "e", source: "a", target: "b", kind: "data" as const, fields });
    expect(edgeLabel(edge(["result.rows"]))).toBe("result.rows");
    expect(edgeLabel(edge(["retrieved.body_base64"]))).toBe("retrieved.body_base64");
    expect(edgeLabel(edge(["retrieved.content.body_text"]))).toBe("body_text");
    expect(edgeLabel(edge(["changed", "listed"]))).toBe("changed, listed");
    expect(edgeLabel(edge(["retrieved.a_very_long_field_name_indeed"]))).toBe("");
    expect(edgeLabel(edge(["result.rows", "truncated", "more.fields", "and.more"]))).toBe("4 fields");
    expect(edgeLabel(edge(["result.rows", "truncated"]))).toBe("result.rows, truncated");
    expect(edgeLabel(edge(["result.rows", "truncated", "x"]))).toBe("3 fields");
    expect(edgeLabel(edge([]))).toBe("");
  });

  it("focuses a step's whole lineage: everything upstream and downstream, not its siblings' other branches", () => {
    const { edges } = buildProcedureGraph(KEV_TRIAGE);
    const focus = lineage("watched", edges);
    expect([...focus.nodes].sort()).toEqual(["changed", "nochange", "parse", "settle", "summary", "watched"]);
    expect(focus.edges.has("data:catalog->parse")).toBe(false);
    expect(focus.edges.has("data:watched->parse")).toBe(true);
    const up = lineage("changed", edges);
    expect([...up.nodes].sort()).toEqual(["catalog", "changed", "nochange", "parse", "watched"]);
  });
});

describe("cron in words", () => {
  it("says the common schedules in words and leaves the rest as cron", () => {
    expect(cronWords("30 15 * * *")).toBe("daily at 15:30");
    expect(cronWords("5 */6 * * *")).toBe("every 6 hours at :05");
    expect(cronWords("0 6 * * 1")).toBe("every Monday at 06:00");
    expect(cronWords("15 * * * *")).toBe("hourly at :15");
    expect(cronWords("*/10 * * * *")).toBe("every 10 minutes");
    expect(cronWords("0 6 1 * *")).toBe("cron 0 6 1 * *");
  });
});
