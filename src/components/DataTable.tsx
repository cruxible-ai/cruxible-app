import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Columns3, ListFilter, X } from "lucide-react";
import { InfoButton } from "@/components/InfoButton";
import {
  applyTable,
  cycleSort,
  enumOptions,
  isActive,
  isBlankFilter,
  partialNote,
  readTableState,
  visibleColumns,
  writeTableState,
  type ColumnSpec,
  type FilterSpec,
  type TableState,
} from "@/lib/table-state";

/**
 * One column of the shared table: how it reads (header, cell) and how it
 * sorts and filters (ColumnSpec). A column without `sortValue` does not sort;
 * one without `filter` has no filter; `noSort` / `noFilter` say why on hover
 * when a reason exists (the daemon cannot order by a many-valued field).
 */
export interface Column<T> extends ColumnSpec<T> {
  header: ReactNode;
  /** The column's name in words (the Columns picker, aria labels); defaults to a string header. */
  label?: string | undefined;
  /** What the column means (header hover). */
  title?: string | undefined;
  /** A concept definition for the header's ⓘ, beside the header (never inside its sort button). */
  info?: ReactNode;
  cell: (row: T) => ReactNode;
  numeric?: boolean | undefined;
  className?: string | undefined;
  /** Extra classes on the header cell (a long header that may wrap). */
  headerClassName?: string | undefined;
  /** Fixed enum values (in this order) instead of the values found in the rows. */
  options?: readonly string[] | undefined;
  /** The word an enum value shows as (glossary words). */
  optionLabel?: ((value: string) => string) | undefined;
  noSort?: string | undefined;
  noFilter?: string | undefined;
}

export interface RowGroup<T> {
  key: (row: T) => string;
  /** The group's header line, given the group's shown rows. */
  header: (rows: T[]) => ReactNode;
}

/** The table's state for `columns` under `urlKey`, from the URL, and its setter (replaces history). */
export function useTableState<T>(columns: readonly ColumnSpec<T>[], urlKey = "") {
  const [params, setParams] = useSearchParams();
  const state = useMemo(() => readTableState(params, urlKey, columns), [params, urlKey, columns]);
  const setState = useCallback(
    (next: TableState) => setParams((current) => writeTableState(current, urlKey, next, columns), { replace: true }),
    [setParams, urlKey, columns],
  );
  return [state, setState] as const;
}

const TEXT_DEBOUNCE_MS = 300;

/**
 * The one table for every list: click a header to sort (ascending,
 * descending, none), filter per column (text contains; an enum column picks
 * values), choose columns, sticky header. Sort, filters and hidden columns
 * live in the URL (`urlKey` prefixes them when a page has two tables), so a
 * view can be linked.
 *
 * `apply="client"` sorts and filters `rows` here. When `rows` are not the
 * whole list (a page of a paged read), pass `partial` ("the 50 on this
 * page"): a narrowed table then says "Sorted within the 50 on this page" —
 * a partial sort is never presented as complete. `apply="external"` leaves
 * `rows` as given: the caller pushed the state to the daemon and says what
 * it did in `note`.
 */
export function DataTable<T>({
  rows,
  columns,
  rowKey,
  rowLabel,
  urlKey = "",
  apply = "client",
  partial = null,
  note,
  count,
  expanded,
  canExpand,
  open,
  onToggle,
  group,
  empty = "None",
  rowClassName,
  label,
  maxHeight = "calc(100vh - 9rem)",
  toolbar = true,
  actions,
}: {
  rows: readonly T[];
  columns: readonly Column<T>[];
  rowKey: (row: T) => string;
  /** The row's name for its disclosure toggle ("Expand status"); defaults to the key. */
  rowLabel?: (row: T) => string;
  urlKey?: string;
  apply?: "client" | "external";
  partial?: string | null;
  note?: ReactNode;
  /** The count line's override ("14 Subjects"); default "N rows" / "N of M". */
  count?: ReactNode;
  /** A row's expanded detail; rows then carry a disclosure toggle. */
  expanded?: (row: T) => ReactNode;
  /** Rows that have a detail (default: every row). */
  canExpand?: (row: T) => boolean;
  /** Controlled open row (one at a time); without it, rows open independently. */
  open?: string | null;
  onToggle?: (key: string) => void;
  /** Rows grouped under header lines while no sort is set. */
  group?: RowGroup<T>;
  empty?: ReactNode;
  rowClassName?: (row: T) => string;
  label?: string;
  maxHeight?: string;
  toolbar?: boolean;
  /** Controls at the toolbar's end, before Filter and Columns (a pager). */
  actions?: ReactNode;
}) {
  const [state, setState] = useTableState(columns, urlKey);
  const [showFilters, setShowFilters] = useState(false);
  const [openRows, setOpenRows] = useState<ReadonlySet<string>>(new Set());
  const shown = useMemo(() => (apply === "client" ? applyTable(rows, columns, state) : [...rows]), [apply, rows, columns, state]);
  const cols = visibleColumns(columns, state);
  const active = isActive(state);
  const filtering = showFilters || Object.values(state.filters).some((f) => !isBlankFilter(f));
  const scope = apply === "client" ? partialNote(state, partial) : null;
  const filterable = columns.some((column) => column.filter);
  const hideable = columns.filter((column) => column.hideable !== false);

  const isOpen = (key: string) => (open !== undefined ? open === key : openRows.has(key));
  const toggle = (key: string) => {
    if (onToggle) onToggle(key);
    else setOpenRows((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const setFilter = (id: string, filter: FilterSpec | null) => {
    const filters = { ...state.filters };
    if (filter === null || isBlankFilter(filter)) delete filters[id];
    else filters[id] = filter;
    setState({ ...state, filters });
  };

  const groups = useMemo(() => {
    if (!group || state.sort) return null;
    const out = new Map<string, T[]>();
    for (const row of shown) {
      const key = group.key(row);
      out.set(key, [...(out.get(key) ?? []), row]);
    }
    return [...out.entries()];
  }, [group, state.sort, shown]);

  const span = cols.length + (expanded ? 1 : 0);
  const renderRow = (row: T) => {
    const key = rowKey(row);
    const opened = expanded ? isOpen(key) : false;
    return (
      <Fragment key={key}>
        <tr className={`border-t border-zinc-800/70 align-top ${opened ? "bg-zinc-900/40" : ""} ${rowClassName?.(row) ?? ""}`}>
          {expanded && (
            <td className="w-5 py-1.5 pr-1">
              {(canExpand?.(row) ?? true) && (
              <button
                onClick={() => toggle(key)}
                aria-label={`${opened ? "Collapse" : "Expand"} ${rowLabel?.(row) ?? key}`}
                aria-expanded={opened}
                className="relative top-[2px] text-zinc-500 hover:text-zinc-200"
              >
                {opened ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
              )}
            </td>
          )}
          {cols.map((column) => (
            <td
              key={column.id}
              className={`py-1.5 pr-4 align-top last:pr-0 ${column.numeric ? "text-right font-mono tabular-nums" : ""} ${column.className ?? ""}`}
            >
              {column.cell(row)}
            </td>
          ))}
        </tr>
        {opened && (
          <tr className="bg-zinc-900/40">
            <td />
            <td colSpan={span - 1} className="pb-2 pr-3">
              {/* the detail fills the row's width and never widens the table */}
              <div className="[contain:inline-size]">{expanded!(row)}</div>
            </td>
          </tr>
        )}
      </Fragment>
    );
  };

  return (
    <div>
      {toolbar && (
        <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[12px] text-zinc-500">
          <span>
            {count ??
              (shown.length === rows.length || apply === "external"
                ? `${rows.length} ${rows.length === 1 ? "row" : "rows"}`
                : `${shown.length} of ${rows.length}`)}
          </span>
          {scope && <span className="text-zinc-400">{scope}.</span>}
          {note && <span className="text-zinc-400">{note}</span>}
          <span className="ml-auto flex items-center gap-1.5">
            {actions}
            {active && (
              <button
                onClick={() => setState({ ...state, sort: null, filters: {} })}
                className="inline-flex items-center gap-1 px-1 hover:text-zinc-200"
                title="Clear the sort and every filter"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
            {filterable && (
              <button
                onClick={() => setShowFilters((v) => !v)}
                aria-pressed={filtering}
                className={`inline-flex items-center gap-1 px-1 ${filtering ? "text-zinc-200" : "hover:text-zinc-200"}`}
              >
                <ListFilter className="h-3 w-3" />
                Filter
              </button>
            )}
            {hideable.length > 1 && (
              <ColumnPicker
                columns={hideable}
                hidden={state.hidden}
                total={columns.length}
                onChange={(hidden) => setState({ ...state, hidden })}
              />
            )}
          </span>
        </div>
      )}
      <div className="overflow-auto" style={{ maxHeight }}>
        <table className="w-full border-collapse text-left text-[13px] leading-5" aria-label={label}>
          <thead>
            <tr>
              {expanded && <th className="sticky top-0 z-10 w-5 border-b border-zinc-800 bg-zinc-950" />}
              {cols.map((column) => (
                <HeaderCell
                  key={column.id}
                  column={column}
                  sort={state.sort?.column === column.id ? state.sort.dir : null}
                  onSort={() => setState({ ...state, sort: cycleSort(state.sort, column.id) })}
                />
              ))}
            </tr>
            {filtering && (
              <tr>
                {expanded && <th className="sticky top-[29px] z-10 bg-zinc-950" />}
                {cols.map((column) => (
                  <th key={column.id} className="sticky top-[29px] z-10 bg-zinc-950 py-1 pr-3 align-top font-normal last:pr-0">
                    <FilterCell
                      column={column}
                      filter={state.filters[column.id]}
                      rows={rows}
                      onChange={(filter) => setFilter(column.id, filter)}
                    />
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {groups
              ? groups.map(([key, members]) => (
                  <Fragment key={`group:${key}`}>
                    <tr className="border-t border-zinc-800">
                      <td colSpan={span} className="pb-1 pt-3">
                        {group!.header(members)}
                      </td>
                    </tr>
                    {members.map(renderRow)}
                  </Fragment>
                ))
              : shown.map(renderRow)}
          </tbody>
        </table>
        {shown.length === 0 && (
          <div className="py-2 text-[13px] text-zinc-500">{rows.length === 0 || apply === "external" ? empty : "No match"}</div>
        )}
      </div>
    </div>
  );
}

function HeaderCell<T>({ column, sort, onSort }: { column: Column<T>; sort: "asc" | "desc" | null; onSort: () => void }) {
  const base = `sticky top-0 z-10 whitespace-nowrap border-b border-zinc-800 bg-zinc-950 py-1.5 pr-4 align-bottom text-[12px] font-medium text-zinc-500 last:pr-0 ${column.numeric ? "text-right" : ""} ${column.headerClassName ?? ""}`;
  const ariaSort = sort === "asc" ? "ascending" : sort === "desc" ? "descending" : "none";
  const info = column.info ? (
    <span className="ml-1.5 inline-flex align-middle">
      <InfoButton label={`What ${columnLabel(column).toLowerCase()} means`}>{column.info}</InfoButton>
    </span>
  ) : null;
  if (!column.sortValue) {
    const title = [column.title, column.noSort].filter(Boolean).join("\n") || undefined;
    return (
      <th className={base} title={title}>
        {column.header}
        {info}
      </th>
    );
  }
  return (
    <th className={base} aria-sort={ariaSort} title={column.title}>
      <button
        onClick={onSort}
        className={`inline-flex items-center gap-1 hover:text-zinc-200 ${sort ? "text-zinc-200" : ""}`}
        aria-label={`Sort by ${columnLabel(column)}`}
      >
        {column.header}
        {sort === "asc" && <ArrowUp className="h-3 w-3" aria-hidden />}
        {sort === "desc" && <ArrowDown className="h-3 w-3" aria-hidden />}
      </button>
      {info}
    </th>
  );
}

function columnLabel<T>(column: Column<T>): string {
  return column.label ?? (typeof column.header === "string" ? column.header : column.id);
}

const inputClass =
  "w-full min-w-[5rem] border border-zinc-800 bg-zinc-950 px-1.5 py-px text-[12px] text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none";

function FilterCell<T>({
  column,
  filter,
  rows,
  onChange,
}: {
  column: Column<T>;
  filter: FilterSpec | undefined;
  rows: readonly T[];
  onChange: (filter: FilterSpec | null) => void;
}) {
  if (!column.filter) {
    return column.noFilter ? (
      <span className="text-[11px] text-zinc-600" title={column.noFilter}>
        —
      </span>
    ) : null;
  }
  if (column.filter.kind === "enum") {
    const found = enumOptions(rows, column);
    const options = column.options
      ? column.options.map((value) => ({ value, count: found.find((o) => o.value === value)?.count ?? null }))
      : found.map((o) => ({ value: o.value, count: o.count as number | null }));
    return (
      <EnumPicker
        label={columnLabel(column)}
        options={options}
        picked={filter?.kind === "enum" ? filter.values : []}
        word={column.optionLabel ?? ((value) => value)}
        onChange={(values) => onChange(values.length ? { kind: "enum", values } : null)}
      />
    );
  }
  return <TextFilter label={columnLabel(column)} value={filter?.kind === "text" ? filter.text : ""} onChange={onChange} />;
}

/** A contains filter; the URL takes it after a short pause in typing. */
function TextFilter({ label, value, onChange }: { label: string; value: string; onChange: (filter: FilterSpec | null) => void }) {
  const [draft, setDraft] = useState(value);
  const committed = useRef(value);
  useEffect(() => {
    // an outside change (Clear, a link) replaces the draft
    if (value !== committed.current) {
      committed.current = value;
      setDraft(value);
    }
  }, [value]);
  useEffect(() => {
    if (draft === committed.current) return;
    const timer = setTimeout(() => {
      committed.current = draft;
      onChange(draft.trim() ? { kind: "text", text: draft } : null);
    }, TEXT_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [draft, onChange]);
  return (
    <input
      type="search"
      value={draft}
      onChange={(event) => setDraft(event.target.value)}
      placeholder="Contains"
      aria-label={`Filter ${label}`}
      className={inputClass}
    />
  );
}

/** A small popover: closes on outside click and Esc. */
function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return { open, setOpen, ref };
}

const popoverClass = "absolute z-20 mt-1 max-h-72 min-w-[11rem] overflow-auto border border-zinc-700 bg-zinc-950 p-1.5 text-left shadow-lg";

function EnumPicker({
  label,
  options,
  picked,
  word,
  onChange,
}: {
  label: string;
  options: { value: string; count: number | null }[];
  picked: readonly string[];
  word: (value: string) => string;
  onChange: (values: string[]) => void;
}) {
  const { open, setOpen, ref } = usePopover();
  const id = useId();
  const summary = picked.length === 0 ? "Any" : picked.length === 1 ? word(picked[0]!) : `${picked.length} picked`;
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        aria-label={`Filter ${label}: ${summary}`}
        className={`${inputClass} inline-flex items-center justify-between gap-1 text-left ${picked.length ? "" : "text-zinc-500"}`}
      >
        <span className="truncate">{summary}</span>
        <ChevronDown className="h-3 w-3 shrink-0 text-zinc-500" />
      </button>
      {open && (
        <div id={id} role="group" aria-label={`${label} values`} className={popoverClass}>
          {options.length === 0 && <div className="px-1 text-[12px] text-zinc-500">None</div>}
          {options.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-baseline gap-2 px-1 py-0.5 text-[12px] font-normal text-zinc-300 hover:bg-zinc-900">
              <input
                type="checkbox"
                checked={picked.includes(option.value)}
                onChange={(event) =>
                  onChange(event.target.checked ? [...picked, option.value] : picked.filter((value) => value !== option.value))
                }
                className="relative top-[1px] accent-zinc-400"
              />
              <span className="flex-1">{word(option.value)}</span>
              {option.count !== null && <span className="font-mono text-[11px] text-zinc-500">{option.count}</span>}
            </label>
          ))}
          {picked.length > 0 && (
            <button onClick={() => onChange([])} className="mt-1 w-full px-1 text-left text-[12px] text-zinc-500 hover:text-zinc-200">
              Any value
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ColumnPicker<T>({
  columns,
  hidden,
  total,
  onChange,
}: {
  columns: readonly Column<T>[];
  hidden: readonly string[];
  total: number;
  onChange: (hidden: string[]) => void;
}) {
  const { open, setOpen, ref } = usePopover();
  const id = useId();
  const shownCount = total - hidden.length;
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="inline-flex items-center gap-1 px-1 hover:text-zinc-200"
      >
        <Columns3 className="h-3 w-3" />
        Columns{hidden.length > 0 && ` (${shownCount} of ${total})`}
      </button>
      {open && (
        <div id={id} role="group" aria-label="Columns shown" className={`${popoverClass} right-0`}>
          {columns.map((column) => (
            <label key={column.id} className="flex cursor-pointer items-baseline gap-2 px-1 py-0.5 text-[12px] text-zinc-300 hover:bg-zinc-900">
              <input
                type="checkbox"
                checked={!hidden.includes(column.id)}
                onChange={(event) =>
                  onChange(event.target.checked ? hidden.filter((h) => h !== column.id) : [...hidden, column.id])
                }
                className="relative top-[1px] accent-zinc-400"
              />
              <span>{columnLabel(column)}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
