/**
 * The shared table's state: which column sorts (ascending, descending or
 * none), the per-column filters (text contains, or a set of picked values
 * for an enum column) and which columns are hidden, read from and written to
 * the URL so a view can be linked. Pure: no React, no DOM.
 *
 * URL keys, under an optional table prefix (`runs.` for a second table on a
 * page): `sort=col` ascending, `sort=-col` descending; `f.col=text` for a text
 * filter, `f.col=a&f.col=b` for picked enum values; `hide=a,b` for default
 * columns hidden and `show=c` for columns hidden by default that are shown.
 */

export type SortDir = "asc" | "desc";
export interface SortSpec {
  column: string;
  dir: SortDir;
}
export type FilterSpec = { kind: "text"; text: string } | { kind: "enum"; values: string[] };
export interface TableState {
  sort: SortSpec | null;
  filters: Readonly<Record<string, FilterSpec>>;
  /** Columns not shown (hideable columns only). */
  hidden: readonly string[];
}

export type SortValue = string | number | boolean | null | undefined;

export type ColumnFilter<T> =
  | { kind: "text"; text: (row: T) => string }
  | { kind: "enum"; values: (row: T) => readonly string[] };

/** What the state logic needs of a column; the component's columns extend it. */
export interface ColumnSpec<T> {
  id: string;
  /** The sort key; absent = the column does not sort. */
  sortValue?: ((row: T) => SortValue) | undefined;
  filter?: ColumnFilter<T> | undefined;
  defaultHidden?: boolean | undefined;
  /** False keeps the column always shown (a row's name). Default true. */
  hideable?: boolean | undefined;
}

export const EMPTY_STATE: TableState = { sort: null, filters: {}, hidden: [] };

/** Header clicks cycle a column ascending, then descending, then unsorted. */
export function cycleSort(current: SortSpec | null, column: string): SortSpec | null {
  if (current?.column !== column) return { column, dir: "asc" };
  if (current.dir === "asc") return { column, dir: "desc" };
  return null;
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });

function isEmpty(value: SortValue): boolean {
  return value === null || value === undefined || value === "";
}

/** Two present sort values: numbers numerically, booleans false first, text by natural order. */
export function compareValues(a: SortValue, b: SortValue): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (typeof a === "boolean" && typeof b === "boolean") return Number(a) - Number(b);
  return collator.compare(String(a), String(b));
}

/**
 * Rows sorted by one column, stable; empty values last in either direction
 * (as the daemon's `order_by` puts nulls last).
 */
export function sortRows<T>(rows: readonly T[], column: ColumnSpec<T> | undefined, dir: SortDir): T[] {
  const key = column?.sortValue;
  if (!key) return [...rows];
  const keyed = rows.map((row, index) => ({ row, index, value: key(row) }));
  keyed.sort((x, y) => {
    const xe = isEmpty(x.value);
    const ye = isEmpty(y.value);
    if (xe || ye) return xe === ye ? x.index - y.index : xe ? 1 : -1;
    const order = compareValues(x.value, y.value);
    return order !== 0 ? (dir === "asc" ? order : -order) : x.index - y.index;
  });
  return keyed.map((item) => item.row);
}

/** True when the filter narrows nothing (empty text, no picked values). */
export function isBlankFilter(filter: FilterSpec | undefined): boolean {
  if (!filter) return true;
  return filter.kind === "text" ? filter.text.trim() === "" : filter.values.length === 0;
}

/** Does one row pass one column's filter? Text: case-insensitive contains; enum: any value picked. */
export function passes<T>(row: T, column: ColumnSpec<T>, filter: FilterSpec): boolean {
  if (isBlankFilter(filter) || !column.filter) return true;
  if (filter.kind === "text") {
    const haystack =
      column.filter.kind === "text" ? column.filter.text(row) : column.filter.values(row).join(" ");
    return haystack.toLowerCase().includes(filter.text.trim().toLowerCase());
  }
  if (column.filter.kind !== "enum") return true;
  const values = column.filter.values(row);
  return values.some((value) => filter.values.includes(value));
}

export function filterRows<T>(rows: readonly T[], columns: readonly ColumnSpec<T>[], filters: TableState["filters"]): T[] {
  const active = columns.filter((column) => !isBlankFilter(filters[column.id]));
  if (active.length === 0) return [...rows];
  return rows.filter((row) => active.every((column) => passes(row, column, filters[column.id]!)));
}

/** Filter, then sort: what the table shows of `rows`. */
export function applyTable<T>(rows: readonly T[], columns: readonly ColumnSpec<T>[], state: TableState): T[] {
  const kept = filterRows(rows, columns, state.filters);
  if (!state.sort) return kept;
  const column = columns.find((c) => c.id === state.sort!.column);
  return sortRows(kept, column, state.sort.dir);
}

/** True when the state narrows or reorders anything. */
export function isActive(state: TableState): boolean {
  return state.sort !== null || Object.values(state.filters).some((filter) => !isBlankFilter(filter));
}

/** Columns shown, in column order. */
export function visibleColumns<T extends { id: string }>(columns: readonly T[], state: TableState): T[] {
  return columns.filter((column) => !state.hidden.includes(column.id));
}

/** The distinct values of an enum column over `rows`, with how many rows carry each, in first-seen order. */
export function enumOptions<T>(rows: readonly T[], column: ColumnSpec<T>): { value: string; count: number }[] {
  if (column.filter?.kind !== "enum") return [];
  const counts = new Map<string, number>();
  for (const row of rows) {
    for (const value of new Set(column.filter.values(row))) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].map(([value, count]) => ({ value, count }));
}

// -- URL ----------------------------------------------------------------------

function key(prefix: string, name: string): string {
  return prefix ? `${prefix}.${name}` : name;
}

function splitList(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

/** The state a URL names for a table; unknown columns and malformed values are ignored. */
export function readTableState<T>(params: URLSearchParams, prefix: string, columns: readonly ColumnSpec<T>[]): TableState {
  const byId = new Map(columns.map((column) => [column.id, column]));
  let sort: SortSpec | null = null;
  const rawSort = params.get(key(prefix, "sort"));
  if (rawSort) {
    const dir: SortDir = rawSort.startsWith("-") ? "desc" : "asc";
    const column = rawSort.replace(/^[-+]/, "");
    if (byId.get(column)?.sortValue) sort = { column, dir };
  }
  const filters: Record<string, FilterSpec> = {};
  const filterPrefix = key(prefix, "f.");
  for (const name of new Set(params.keys())) {
    if (!name.startsWith(filterPrefix)) continue;
    const column = byId.get(name.slice(filterPrefix.length));
    if (!column?.filter) continue;
    const values = params.getAll(name).filter((value) => value !== "");
    if (values.length === 0) continue;
    filters[column.id] = column.filter.kind === "enum" ? { kind: "enum", values } : { kind: "text", text: values[0]! };
  }
  const hideable = (column: ColumnSpec<T> | undefined) => column !== undefined && column.hideable !== false;
  const hiddenByUrl = new Set(splitList(params.get(key(prefix, "hide"))).filter((id) => hideable(byId.get(id))));
  const shownByUrl = new Set(splitList(params.get(key(prefix, "show"))));
  const hidden = columns
    .filter((column) => hideable(column) && (hiddenByUrl.has(column.id) || (column.defaultHidden && !shownByUrl.has(column.id))))
    .map((column) => column.id);
  return { sort, filters, hidden };
}

/** `params` with this table's keys replaced by `state` (defaults leave no key). */
export function writeTableState<T>(
  params: URLSearchParams,
  prefix: string,
  state: TableState,
  columns: readonly ColumnSpec<T>[],
): URLSearchParams {
  const out = new URLSearchParams(params);
  const filterPrefix = key(prefix, "f.");
  for (const name of [...new Set(out.keys())]) {
    if (name.startsWith(filterPrefix) || name === key(prefix, "sort") || name === key(prefix, "hide") || name === key(prefix, "show")) {
      out.delete(name);
    }
  }
  if (state.sort) out.set(key(prefix, "sort"), `${state.sort.dir === "desc" ? "-" : ""}${state.sort.column}`);
  for (const column of columns) {
    const filter = state.filters[column.id];
    if (isBlankFilter(filter)) continue;
    if (filter!.kind === "text") out.set(`${filterPrefix}${column.id}`, filter!.text);
    else for (const value of filter!.values) out.append(`${filterPrefix}${column.id}`, value);
  }
  const hide = columns.filter((column) => !column.defaultHidden && state.hidden.includes(column.id)).map((column) => column.id);
  const show = columns.filter((column) => column.defaultHidden && !state.hidden.includes(column.id)).map((column) => column.id);
  if (hide.length > 0) out.set(key(prefix, "hide"), hide.join(","));
  if (show.length > 0) out.set(key(prefix, "show"), show.join(","));
  return out;
}

/**
 * The scope note a narrowed table owes its reader when the rows in hand are
 * not the whole list: "Sorted within the first 50" — never a partial sort
 * presented as complete. Null when the rows are complete or nothing is
 * narrowed.
 */
export function partialNote(state: TableState, scope: string | null): string | null {
  if (scope === null) return null;
  const sorted = state.sort !== null;
  const filtered = Object.values(state.filters).some((filter) => !isBlankFilter(filter));
  if (!sorted && !filtered) return null;
  const verb = sorted && filtered ? "Sorted and filtered" : sorted ? "Sorted" : "Filtered";
  return `${verb} within ${scope}`;
}
