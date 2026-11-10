import { describe, expect, it } from "vitest";
import type { Schemas } from "../api/schemas.ts";
import type { QueryView } from "./query-view.ts";
import { columnDecimals, joinRows, orderFields, pageRows, worklistArgs, worklistColumns, worklistPlan } from "./worklist.ts";

const spec = (readParams: Record<string, unknown> = {}) =>
  ({
    procedure: "p",
    steps: [
      { read: "rows", query: "query:q.over", params: readParams },
      {
        id: "post",
        inbox: "c@1",
        fields: { item_a: { $ref: "item", path: ["a"] }, b: { $ref: "item", path: ["b"] }, state: "open" },
        for_each: { $ref: "step", step: "rows", path: ["rows"] },
      },
    ],
  }) as unknown as Schemas["ProcedureSpec"];

const view = (params: QueryView["params"] = []): QueryView =>
  ({
    name: "q.over",
    returns: [
      { name: "a", expression: "x.a", from: [] },
      { name: "b", expression: "x.b", from: [] },
      { name: "score", expression: "v.score", from: [] },
      { name: "listed", expression: "v.listed", from: [] },
      { name: "note", expression: "v.note", from: [] },
      { name: "w", expression: "v.w", from: [] },
      { name: "z", expression: "v.z", from: [] },
      { name: "y", expression: "v.y", from: [] },
    ],
    params,
  }) as unknown as QueryView;

describe("the inbox's worklist join", () => {
  it("joins by every field the post step copies from the row; literal fields join nothing", () => {
    const plan = worklistPlan(spec(), "post", {})!;
    expect(plan.query).toBe("q.over");
    expect(plan.join).toEqual([
      { payload: "item_a", row: "a" },
      { payload: "b", row: "b" },
    ]);
    const rows = [
      { a: "1", b: "x" },
      { a: "2", b: "y" },
    ];
    // both fields must match; a payload missing a joined field says nothing
    expect(joinRows([{ item_a: "2", b: "y" }, { item_a: "2", b: "x" }, { item_a: "1" }, null], rows, plan.join)).toEqual([1, null, undefined, undefined]);
    // no fan-out over a read step: no plan
    expect(worklistPlan({ procedure: "p", steps: [{ id: "post", inbox: "c@1", fields: {} }] } as unknown as Schemas["ProcedureSpec"], "post", {})).toBeNull();
  });

  it("passes the read step's params from the Line's own parameters, and never guesses one it cannot resolve", () => {
    const params = [{ name: "min", type: "decimal", required: true }] as QueryView["params"];
    const read = spec({ min: { $ref: "param", path: ["min_score"] } });
    // each Line its own parameters: one read each, with its own value
    expect(worklistArgs(worklistPlan(read, "post", { min_score: "0.1" })!, view(params))).toEqual({ args: { name: "q.over", limit: 500, params: { min: "0.1" } } });
    expect(worklistArgs(worklistPlan(read, "post", { min_score: 0.5 })!, view(params))).toEqual({ args: { name: "q.over", limit: 500, params: { min: "0.5" } } });
    // the Line does not serve it, or the step passes an input: blocked, named
    expect(worklistArgs(worklistPlan(read, "post", {})!, view(params))).toEqual({ blocked: ["min"] });
    expect(worklistArgs(worklistPlan(spec({ min: { $ref: "input", path: ["min"] } }), "post", { min: "1" })!, view(params))).toEqual({ blocked: ["min"] });
    // a literal passes as written
    expect(worklistArgs(worklistPlan(spec({ min: 0.2 }), "post", null)!, view(params))).toEqual({ args: { name: "q.over", limit: 500, params: { min: "0.2" } } });
  });

  it("adds the row's other fields: the Query's order keys first, at most four shown, never an all-empty one", () => {
    const v = view();
    const order = orderFields({ order: [{ field: "-v.listed" }, { field: "-v.score" }] }, v);
    expect(order).toEqual(["listed", "score"]);
    const joined = [{ a: "1", b: "x", score: "0.5", listed: null, note: "n", w: "w", z: "z", y: null }];
    const columns = worklistColumns(v, order, [{ name: "score", type: "decimal{0..1}", description: "The score." }] as Schemas["GetContractField"][], joined, new Set(["a", "b"]));
    expect(columns.map((c) => c.name)).toEqual(["listed", "score", "note", "w", "z", "y"]);
    // listed is empty on every joined row: hidden; four shown after it; the rest in the Columns menu
    expect(columns.filter((c) => c.shown).map((c) => c.name)).toEqual(["score", "note", "w", "z"]);
    expect(columns.find((c) => c.name === "score")).toMatchObject({ type: "decimal{0..1}", description: "The score." });
  });

  it("reads a query page's rows by return name, and gives a numeric column one decimals count", () => {
    const page = { columns: [{ name: "a" }, { name: "value.subject" }], rows: [{ a: "1", "value.subject": "s" }] } as unknown as Schemas["QueryResultRecord"];
    expect(pageRows(page)).toEqual([{ a: "1", subject: "s" }]);
    expect(columnDecimals(["0.5", "0.12345", null, "3"])).toBe(5);
  });
});
