import { describe, expect, it } from "vitest";
import {
  applyTable,
  cycleSort,
  enumOptions,
  partialNote,
  readTableState,
  sortRows,
  writeTableState,
  type ColumnSpec,
  type TableState,
} from "./table-state";

interface Row {
  name: string;
  count: number | null;
  status: string;
  tags: string[];
}

const ROWS: Row[] = [
  { name: "beta", count: 10, status: "running", tags: ["b"] },
  { name: "alpha", count: 2, status: "stalled", tags: ["a", "b"] },
  { name: "Gamma", count: null, status: "running", tags: [] },
  { name: "delta", count: 2, status: "stopped", tags: ["c"] },
];

const COLUMNS: ColumnSpec<Row>[] = [
  { id: "name", sortValue: (r) => r.name, filter: { kind: "text", text: (r) => r.name }, hideable: false },
  { id: "count", sortValue: (r) => r.count },
  { id: "status", sortValue: (r) => r.status, filter: { kind: "enum", values: (r) => [r.status] } },
  { id: "tags", filter: { kind: "enum", values: (r) => r.tags }, defaultHidden: true },
];

const names = (rows: Row[]) => rows.map((r) => r.name);
const state = (partial: Partial<TableState>): TableState => ({ sort: null, filters: {}, hidden: [], ...partial });

describe("sort", () => {
  it("cycles a header ascending, descending, then none; another column starts ascending", () => {
    expect(cycleSort(null, "name")).toEqual({ column: "name", dir: "asc" });
    expect(cycleSort({ column: "name", dir: "asc" }, "name")).toEqual({ column: "name", dir: "desc" });
    expect(cycleSort({ column: "name", dir: "desc" }, "name")).toBeNull();
    expect(cycleSort({ column: "name", dir: "desc" }, "count")).toEqual({ column: "count", dir: "asc" });
  });

  it("sorts text case-insensitively and numbers numerically, empty values last both ways, stable on ties", () => {
    expect(names(sortRows(ROWS, COLUMNS[0], "asc"))).toEqual(["alpha", "beta", "delta", "Gamma"]);
    expect(names(sortRows(ROWS, COLUMNS[1], "asc"))).toEqual(["alpha", "delta", "beta", "Gamma"]);
    expect(names(sortRows(ROWS, COLUMNS[1], "desc"))).toEqual(["beta", "alpha", "delta", "Gamma"]);
  });

  it("sorts ids with numbers in natural order", () => {
    const rows = ["g10", "g9", "g100"].map((name) => ({ name, count: 0, status: "", tags: [] }));
    expect(names(sortRows(rows, COLUMNS[0], "asc"))).toEqual(["g9", "g10", "g100"]);
  });

  it("leaves rows in place for a column that does not sort", () => {
    expect(names(sortRows(ROWS, COLUMNS[3], "asc"))).toEqual(names(ROWS));
  });
});

describe("filter", () => {
  it("text filters are case-insensitive contains", () => {
    expect(names(applyTable(ROWS, COLUMNS, state({ filters: { name: { kind: "text", text: "TA" } } })))).toEqual(["beta", "delta"]);
  });

  it("enum filters keep rows carrying any picked value, many-valued rows included", () => {
    expect(names(applyTable(ROWS, COLUMNS, state({ filters: { status: { kind: "enum", values: ["running"] } } })))).toEqual(["beta", "Gamma"]);
    expect(names(applyTable(ROWS, COLUMNS, state({ filters: { tags: { kind: "enum", values: ["b"] } } })))).toEqual(["beta", "alpha"]);
  });

  it("filters combine as all-of, then the sort applies", () => {
    const shown = applyTable(
      ROWS,
      COLUMNS,
      state({
        filters: { status: { kind: "enum", values: ["running", "stalled"] }, name: { kind: "text", text: "a" } },
        sort: { column: "name", dir: "desc" },
      }),
    );
    expect(names(shown)).toEqual(["Gamma", "beta", "alpha"]);
  });

  it("blank filters narrow nothing", () => {
    expect(applyTable(ROWS, COLUMNS, state({ filters: { name: { kind: "text", text: "  " }, status: { kind: "enum", values: [] } } }))).toHaveLength(4);
  });

  it("enum options are the distinct values with their row counts", () => {
    expect(enumOptions(ROWS, COLUMNS[2]!)).toEqual([
      { value: "running", count: 2 },
      { value: "stalled", count: 1 },
      { value: "stopped", count: 1 },
    ]);
  });
});

describe("URL state", () => {
  it("round-trips sort, text and enum filters and column visibility under a prefix", () => {
    const s = state({
      sort: { column: "count", dir: "desc" },
      filters: { name: { kind: "text", text: "al" }, status: { kind: "enum", values: ["running", "stopped"] } },
      hidden: ["count"],
    });
    const params = writeTableState(new URLSearchParams("at=5&family=lines"), "runs", s, COLUMNS);
    expect(params.get("at")).toBe("5");
    expect(params.get("family")).toBe("lines");
    expect(params.get("runs.sort")).toBe("-count");
    expect(params.get("runs.f.name")).toBe("al");
    expect(params.getAll("runs.f.status")).toEqual(["running", "stopped"]);
    expect(params.get("runs.hide")).toBe("count");
    expect(readTableState(params, "runs", COLUMNS)).toEqual(s);
    // another table's keys are not this one's
    expect(readTableState(params, "", COLUMNS)).toEqual(state({ hidden: ["tags"] }));
  });

  it("writes nothing for the default state and replaces the table's old keys", () => {
    const params = writeTableState(new URLSearchParams("sort=name&f.name=x&hide=count&keep=1"), "", state({ hidden: ["tags"] }), COLUMNS);
    expect(params.toString()).toBe("keep=1");
  });

  it("shows a column hidden by default with show=, and never hides an unhideable one", () => {
    expect(readTableState(new URLSearchParams("show=tags"), "", COLUMNS).hidden).toEqual([]);
    expect(writeTableState(new URLSearchParams(), "", state({ hidden: [] }), COLUMNS).get("show")).toBe("tags");
    expect(readTableState(new URLSearchParams("hide=name,count"), "", COLUMNS).hidden).toEqual(["count", "tags"]);
  });

  it("ignores unknown columns, a sort on a column that does not sort, and filters on unfiltered columns", () => {
    const parsed = readTableState(new URLSearchParams("sort=-tags&f.count=3&f.nope=x&sort2=1"), "", COLUMNS);
    expect(parsed).toEqual(state({ hidden: ["tags"] }));
  });
});

describe("partial note", () => {
  it("says a narrowed partial list is sorted or filtered within what is loaded", () => {
    expect(partialNote(state({ sort: { column: "name", dir: "asc" } }), "the first 50")).toBe("Sorted within the first 50");
    expect(partialNote(state({ filters: { name: { kind: "text", text: "a" } } }), "this page of 20")).toBe("Filtered within this page of 20");
    expect(
      partialNote(state({ sort: { column: "name", dir: "asc" }, filters: { name: { kind: "text", text: "a" } } }), "the first 50"),
    ).toBe("Sorted and filtered within the first 50");
  });

  it("says nothing for a complete list, or when nothing is narrowed", () => {
    expect(partialNote(state({ sort: { column: "name", dir: "asc" } }), null)).toBeNull();
    expect(partialNote(state({}), "the first 50")).toBeNull();
  });
});
