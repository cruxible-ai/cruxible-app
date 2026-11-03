import { describe, expect, it } from "vitest";
import type { ProcedureSlot, ProcedureSpec } from "./definitions";
import { buildProcedureGraph, collectRefs, cronWords, edgeLabel, INPUT_NODE, lineage } from "./procedure-graph";

const edgesOf = (spec: ProcedureSpec) =>
  buildProcedureGraph(spec)
    .edges.map((e) => `${e.kind} ${e.source}->${e.target} ${e.fields.join(",")}`.trim())
    .sort();

const FETCH_SLOT: ProcedureSlot = { in: { name: "web.fetch.request", version: 1 }, out: { name: "web.fetch.result", version: 1 }, effect: "external_read" };
const param = (name: string) => ({ $ref: "param" as const, path: [name] });
const input = (...path: string[]) => ({ $ref: "input" as const, path });
const step = (name: string, ...path: string[]) => ({ $ref: "step" as const, step: name, path });
const item = (...path: string[]) => ({ $ref: "item" as const, path });

/** security.kev-triage as the kit authors it. */
const KEV_TRIAGE: ProcedureSpec = {
  procedure: "security.kev-triage",
  returns: { fields: { listed: step("entries", "records"), version: step("entries", "header", "catalog_version") } },
  slots: { fetch: FETCH_SLOT },
  steps: [
    {
      call: "catalog",
      slot: "fetch",
      input: { logical_source: param("logical_source"), url: param("url"), expected_format: "json" },
      captures: { capture: "security.kev-catalog" },
    },
    { read: "watched", query: "security.watched_vulnerabilities" },
    {
      extract: "entries",
      capture: step("catalog", "capture"),
      records: "/vulnerabilities/*",
      row: "security.kev-record@1",
      fields: { date_added: { at: "dateAdded", parse: "date" } },
      key: { cve_id: { at: "cveID" } },
      header: { catalog_version: { at: "/catalogVersion" } },
    },
    { id: "listed", guard: { op: "present", of: step("entries", "records") }, else: { halt: "no_change", id: "nochange" } },
    {
      id: "write",
      claims: [
        {
          type: "security.vulnerability.kev_date_added",
          value: item("fields", "date_added"),
          rationale: "CISA KEV catalog {$steps.entries.header.catalog_version}: dateAdded {$item.fields.date_added}.",
        },
      ],
      for_each: step("entries", "records"),
      subject: { kind: "security.vulnerability", key: { cve_id: item("key", "cve_id") }, within: step("watched", "rows") },
    },
  ],
};

describe("references", () => {
  it("collects typed step, input and parameter refs, $steps strings and {$steps…} interpolations at any depth, with where they sit", () => {
    expect(
      collectRefs({
        input: { a: step("parse", "items"), nested: { truncated: [step("audits", "truncated"), "plain", input()] } },
        p: param("url"),
        each: item("key"),
        legacy: "$steps.fetch.capture",
        rationale: "Version {$steps.entries.header.catalog_version} of {$item.key.cve_id}",
        n: 3,
      }),
    ).toEqual([
      { name: "parse", field: "items", at: "input.a" },
      { name: "audits", field: "truncated", at: "input.nested.truncated[0]" },
      { name: "input", field: null, at: "input.nested.truncated[2]" },
      { name: "input", field: "url", at: "p" },
      { name: "fetch", field: "capture", at: "legacy" },
      { name: "entries", field: "header.catalog_version", at: "rationale" },
    ]);
  });
});

describe("procedure graph", () => {
  it("draws kev-triage from its references: the call feeds the extract, the extract feeds the guard, the Claims and returns, the read scopes the Claims", () => {
    const graph = buildProcedureGraph(KEV_TRIAGE);
    expect(graph.nodes.map((n) => `${n.id}:${n.kind}:${n.role}`)).toEqual([
      `${INPUT_NODE}:input:input`,
      "catalog:call:call",
      "watched:read:read",
      "entries:extract:read",
      "listed:guard:guard",
      "write:claims:terminal",
      "summary:returns:terminal",
      "nochange:halt:terminal",
    ]);
    expect(edgesOf(KEV_TRIAGE)).toEqual([
      "control listed->nochange else",
      `data ${INPUT_NODE}->catalog logical_source,url`,
      "data catalog->entries capture",
      "data entries->listed records",
      "data entries->summary records,header.catalog_version",
      "data entries->write header.catalog_version,records",
      "data watched->write rows",
    ]);
    expect(graph.nodes.find((n) => n.id === "nochange")).toMatchObject({ kind: "halt", detail: ["no_change"] });
    expect(graph.nodes.find((n) => n.id === "summary")).toMatchObject({ kind: "returns", detail: ["listed", "version"] });
  });

  it("reads nested inputs and the whole input: one edge per step pair, every field on it", () => {
    const spec: ProcedureSpec = {
      procedure: "security.respond",
      input: { incident: { type: { kind: "string" } }, log_pull: { type: { kind: "string" } } },
      steps: [
        { read: "exposure", query: "q.exposure", params: { incident: input("incident") } },
        { read: "audits", query: "q.audits" },
        {
          project: "classify",
          fields: {
            audits: step("audits", "rows"),
            exposure: step("exposure", "rows"),
            params: input(),
            truncated: { audits: step("audits", "truncated"), exposure: step("exposure", "truncated") },
          },
        },
        { inbox: "post", fields: { items: step("classify", "items") } },
      ],
    };
    const graph = buildProcedureGraph(spec);
    expect(graph.nodes[0]).toMatchObject({ id: INPUT_NODE, role: "input", detail: ["incident", "log_pull"] });
    expect(edgesOf(spec)).toEqual([
      `data ${INPUT_NODE}->classify`,
      `data ${INPUT_NODE}->exposure incident`,
      "data audits->classify rows,truncated",
      "data classify->step_4 items",
      "data exposure->classify rows,truncated",
    ]);
  });

  it("feeds a call's parameter refs (a logical source a Line gives) and a guard's predicate refs", () => {
    const spec: ProcedureSpec = {
      procedure: "security.registry-parse",
      params: { project: { type: { kind: "string" } }, source: { type: { kind: "string" } } },
      slots: { registry: FETCH_SLOT },
      steps: [
        { call: "registry", slot: "registry", input: { project: param("project"), logical_source: param("source") }, captures: { capture: "security.fetched-v1" } },
        { id: "mine", guard: { op: "eq", left: step("registry", "project"), right: param("project") }, else: { halt: "other_source", id: "other" } },
        { project: "parse", fields: { release: step("registry") } },
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
      input: { release: { type: { kind: "string" } } },
      slots: { fetch: FETCH_SLOT },
      steps: [
        { call: "fetch", slot: "fetch", input: { url: input("release") }, captures: { capture: "c-v1" } },
        { id: "child_step", invoke: "security.child", as: "judged", input: { body: step("fetch", "capture"), release: input("release") } },
        { inbox: "post", fields: { items: step("judged", "items") } },
      ],
    };
    const graph = buildProcedureGraph(spec);
    expect(graph.nodes.find((n) => n.id === "child_step")).toMatchObject({ role: "invoke", view: { procedure: "security.child" } });
    expect(edgesOf(spec)).toEqual([
      `data ${INPUT_NODE}->child_step release`,
      `data ${INPUT_NODE}->fetch release`,
      "data child_step->step_3 items",
      "data fetch->child_step capture",
    ]);
  });

  it("draws a guard's goto to a step, select sources, and keeps unknown names on the step", () => {
    const spec: ProcedureSpec = {
      procedure: "p",
      steps: [
        { read: "a", query: "q.a" },
        { read: "b", query: "q.b" },
        { select: "pick", sources: ["a", "b"] },
        { id: "allowed", guard: { op: "eq", left: step("pick", "posted"), right: { literal: 0 } }, then: { goto: "write" }, else: { goto: "post" } },
        { id: "write", inbox: "proposed", fields: { items: step("pick", "items"), result: step("nowhere", "x") } },
        { id: "post", inbox: "posted", fields: { items: step("pick", "inbox") } },
      ],
    };
    const graph = buildProcedureGraph(spec);
    expect(edgesOf(spec)).toEqual([
      "control allowed->post else",
      "control allowed->write then",
      "data a->pick",
      "data b->pick",
      "data pick->allowed posted",
      "data pick->post inbox",
      "data pick->write items",
    ]);
    expect(graph.nodes.find((n) => n.id === "write")!.unresolved).toEqual([{ name: "nowhere", field: "x", at: "fields.result" }]);
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
    const focus = lineage("entries", edges);
    expect([...focus.nodes].sort()).toEqual([INPUT_NODE, "catalog", "entries", "listed", "nochange", "summary", "write"].sort());
    expect(focus.edges.has("data:watched->write")).toBe(false);
    expect(focus.edges.has("data:catalog->entries")).toBe(true);
    const up = lineage("listed", edges);
    expect([...up.nodes].sort()).toEqual([INPUT_NODE, "catalog", "entries", "listed", "nochange"].sort());
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
