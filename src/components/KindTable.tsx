import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollText } from "lucide-react";
import { useInstanceId, useStateQuery } from "@/api/hooks";
import { SignalDot } from "@/components/Chip";
import { DataTable, useTableState, type Column } from "@/components/DataTable";
import { LoadState } from "@/components/Panel";
import { Pager } from "@/screens/ProposalsScreen";
import { useAtLink } from "@/lib/at";
import {
  ANSWER_CAP,
  DEFAULT_VISIBLE_FIELDS,
  enumMembers,
  filterKind,
  isWholeAnswer,
  KIND_PAGE,
  kindCell,
  kindColumn,
  kindQuery,
  pushDown,
  selectFields,
  serverFilterable,
  serverSortable,
  SUBJECT_ID,
  valueText,
  cellSortValue,
  type KindColumn,
} from "@/lib/kind-table";
import { decimalPlaces, fixedText } from "@/lib/numbers";
import { isActive } from "@/lib/table-state";
import { term } from "@/lib/vocabulary";
import { usePagingScope } from "@/lib/usePaging";

type Row = Record<string, unknown>;

const SUBJECT_COLUMN: KindColumn = {
  key: SUBJECT_ID,
  field: SUBJECT_ID,
  name: "Subject",
  type: "string",
  targets: [],
  members: null,
  cardinality: "one",
};

const subjectOf = (row: Row) => (typeof row.subject === "string" ? row.subject : "");
const subjectIdOf = (row: Row) => (typeof row.subject_id === "string" ? row.subject_id : subjectOf(row));

/**
 * One Subject kind as a table: a row per live Subject, a column per field,
 * each cell the slot's answer linking to its Claim and evidence (the Subject
 * page with that Claim open); a many-valued field shows a count that
 * expands; a Subject-valued cell links to the Subject; a contested value
 * carries the amber dot (the glossary's other Claim signals too).
 *
 * Reads one compact `query` page (100 Subjects, `claims: true`). When that
 * page is the kind's whole answer, sorting and filtering happen here and are
 * complete. Past one page, the sort and filters go to the daemon as
 * `order_by` and `where`, and the table says so; a column the daemon cannot
 * order or filter that way has no sort or filter in that mode.
 */
export function KindTable({
  kind,
  predicates,
  keys,
}: {
  kind: string;
  predicates: readonly string[];
  keys: readonly string[];
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const { select, left } = useMemo(() => selectFields(predicates, keys), [predicates, keys]);
  const base = useStateQuery(kindQuery({ kind, select }));
  // a kind keyed by one field: that field's column is the Subject's link (the Subject's id would repeat it)
  const served = useMemo(() => {
    if (!base.data) return [];
    const fields = base.data.columns.map(kindColumn);
    return subjectKeyOf(fields, keys) ? fields : [SUBJECT_COLUMN, ...fields];
  }, [base.data, keys]);
  const subjectKey = useMemo(() => subjectKeyOf(served, keys), [served, keys]);
  // fields no Subject of the first page holds (no value, no stated none) start hidden
  const empty = useMemo(() => emptyColumns(served, (base.data?.rows ?? []) as Row[]), [served, base.data]);
  const mode = base.data ? (isWholeAnswer(base.data) ? "client" : "server") : null;
  // the table's URL state (sort, filters, hidden columns) reads the same column specs the table renders
  const probe = useMemo(
    () => (mode ? kindColumns(served, mode, keys, () => null, instanceId, link, { subjectKey, empty }) : []),
    [served, mode, keys, instanceId, link, subjectKey, empty],
  );
  const [state] = useTableState(probe);
  const pushed = mode === "server" ? pushDown(state, served) : null;
  const narrowed = pushed !== null && (pushed.where.length > 0 || pushed.orderBy.length > 0);
  // the read a cursor continues: this kind, its pushed filters and order, and the page coordinate
  const narrowKey = usePagingScope("kind", kind, pushed);
  const [paging, setPaging] = useState<{ key: string; cursors: string[] }>({ key: narrowKey, cursors: [] });
  const cursors = paging.key === narrowKey ? paging.cursors : [];
  useEffect(() => {
    if (paging.key !== narrowKey) setPaging({ key: narrowKey, cursors: [] });
  }, [narrowKey, paging.key]);
  const cursor = cursors[cursors.length - 1];
  const page = useStateQuery(
    mode === "server" ? kindQuery({ kind, select, where: pushed!.where, orderBy: pushed!.orderBy, cursor }) : null,
  );

  const current = mode === "server" ? page.data : base.data;
  const rows = useMemo(() => (current?.rows ?? []) as Row[], [current]);
  // numbers in a column show the same decimals on every row of the page
  const places = useMemo(() => numberPlaces(served, rows), [served, rows]);
  const columns = useMemo(
    () =>
      mode
        ? kindColumns(
            served,
            mode,
            keys,
            (row, column) =>
              column.key === subjectKey ? (
                <SubjectKeyCell row={row} column={column} served={served} instanceId={instanceId} link={link} />
              ) : (
                <Cell row={row} column={column} places={places.get(column.key) ?? null} instanceId={instanceId} link={link} />
              ),
            instanceId,
            link,
            { subjectKey, empty },
          )
        : [],
    [served, mode, keys, instanceId, link, subjectKey, empty, places],
  );
  if (base.isPending) return <LoadState />;
  if (base.error) return <LoadState error={base.error} />;
  if (!base.data) return null;

  const capped = (current?.capped?.length ?? 0) > 0;
  const first = cursors.length * KIND_PAGE;
  const total = current ? first + rows.length + (current.remaining ?? 0) : null;
  const note =
    mode === "client" ? null : (
      <>
        {narrowed
          ? `${pushed!.orderBy.length > 0 ? "Sorted" : ""}${pushed!.orderBy.length > 0 && pushed!.where.length > 0 ? " and filtered" : pushed!.where.length > 0 ? "Filtered" : ""} by the daemon, whole kind`
          : `Over ${KIND_PAGE}: sort and filter by the daemon`}
        {capped && ` · capped at ${ANSWER_CAP} rows`}
      </>
    );

  return (
    <div className="space-y-1.5">
      {left.length > 0 && (
        <div className="t-meta">
          Max {select.length} fields per query; left out: <span className="font-mono">{left.join(", ")}</span>
        </div>
      )}
      {(current?.notes ?? []).map((text) => (
        <div key={text} className="t-meta">
          {text}
        </div>
      ))}
      {mode === "server" && page.isPending && <LoadState />}
      {mode === "server" && page.error && <LoadState error={page.error} />}
      {(mode === "client" || page.data) && (
        <DataTable
          rows={rows}
          columns={columns}
          rowKey={subjectOf}
          apply={mode === "client" ? "client" : "external"}
          label={`${kind} Subjects`}
          note={note}
          actions={
            mode === "server" ? (
              <span className="mr-2">
                <Pager
                  index={cursors.length}
                  newer={cursors.length ? () => setPaging({ key: narrowKey, cursors: cursors.slice(0, -1) }) : null}
                  older={current?.next_cursor ? () => setPaging({ key: narrowKey, cursors: [...cursors, current.next_cursor!] }) : null}
                />
              </span>
            ) : undefined
          }
          count={
            mode === "client"
              ? undefined
              : rows.length === 0
                ? "No Subjects"
                : `Subjects ${first + 1}–${first + rows.length}${total !== null ? ` of ${total}${capped ? "+" : ""}` : ""}`
          }
          empty={mode === "server" && isActive(state) ? "No match" : "None at this generation"}
        />
      )}
    </div>
  );
}

/** The one key field's column when a kind is keyed by a single one-valued scalar field; null otherwise. */
export function subjectKeyOf(served: readonly KindColumn[], keys: readonly string[]): string | null {
  if (keys.length !== 1) return null;
  const column = served.find((c) => c.field === keys[0]);
  return column && column.cardinality === "one" && column.type !== "subject" ? column.key : null;
}

/** Fields no row holds: no value and no stated none. */
export function emptyColumns(served: readonly KindColumn[], rows: readonly Row[]): ReadonlySet<string> {
  if (rows.length === 0) return new Set();
  return new Set(served.filter((c) => c.key !== SUBJECT_ID && rows.every((row) => kindCell(row, c).display === "empty")).map((c) => c.key));
}

/** For each one-valued number column, the decimals its values on these rows share. */
function numberPlaces(served: readonly KindColumn[], rows: readonly Row[]): ReadonlyMap<string, number> {
  const out = new Map<string, number>();
  for (const column of served) {
    if (column.cardinality === "one" && (column.type === "integer" || column.type === "decimal")) {
      out.set(column.key, decimalPlaces(rows.flatMap((row) => kindCell(row, column).values)));
    }
  }
  return out;
}

/**
 * The table's columns for the served fields. In client mode every column
 * sorts and filters here; in server mode only what the daemon serves (and
 * each other header says why on hover). `subjectKey` names the key column
 * that stands for the Subject (no separate Subject column); `empty` the
 * columns that start hidden because no row holds anything in them.
 */
export function kindColumns(
  served: readonly KindColumn[],
  mode: "client" | "server",
  keys: readonly string[],
  cell: (row: Row, column: KindColumn) => React.ReactNode,
  instanceId: string,
  link: (path: string) => string,
  { subjectKey = null, empty = new Set<string>() }: { subjectKey?: string | null; empty?: ReadonlySet<string> } = {},
): Column<Row>[] {
  return served.map((column, index): Column<Row> => {
    const isSubject = column.key === SUBJECT_ID;
    const standsForSubject = column.key === subjectKey;
    const sorts = mode === "client" || serverSortable(column);
    const filters = mode === "client" || serverFilterable(column);
    const kindOfFilter = isSubject ? "text" : filterKind(column);
    const members = isSubject ? null : enumMembers(column);
    const isKey = keys.includes(column.field);
    return {
      id: column.key,
      header: column.name,
      label: column.name,
      title: isSubject
        ? "The Subject's id"
        : `${standsForSubject ? "The Subject's key: opens the Subject\n" : ""}${column.field} · ${column.cardinality === "many" ? "many values" : "one value"} · ${column.targets.length ? `→ ${column.targets.join(" | ")}` : column.type}${column.cardinality === "many" && mode === "client" ? "\nSorts by how many values" : ""}`,
      hideable: !isSubject && !standsForSubject,
      // keys first, then the first fields; the rest, and fields no row holds, behind the Columns picker
      defaultHidden: !isSubject && !isKey && (index > DEFAULT_VISIBLE_FIELDS || empty.has(column.key)),
      sortValue: sorts ? (row) => (isSubject ? subjectIdOf(row) : cellSortValue(row, column)) : undefined,
      noSort: sorts
        ? undefined
        : column.cardinality === "many"
          ? "The daemon orders by one-valued fields only, and this kind has more than one page"
          : `The daemon does not order ${column.type} fields`,
      filter: filters
        ? kindOfFilter === "enum"
          ? { kind: "enum", values: (row) => kindCell(row, column).values.map(valueText) }
          : { kind: "text", text: (row) => (isSubject ? subjectIdOf(row) : kindCell(row, column).values.map(valueText).join(" ")) }
        : undefined,
      noFilter: filters ? undefined : `The daemon filters ${column.type} fields by comparison only; this kind has more than one page`,
      ...(members ? { options: members } : {}),
      numeric: column.cardinality === "one" && (column.type === "integer" || column.type === "decimal"),
      className: isSubject || standsForSubject ? "whitespace-nowrap" : "max-w-[24rem]",
      cell: isSubject
        ? (row) => <SubjectCell row={row} served={served} instanceId={instanceId} link={link} />
        : (row) => cell(row, column),
    };
  });
}

function SubjectCell({ row, served, instanceId, link }: { row: Row; served: readonly KindColumn[]; instanceId: string; link: (path: string) => string }) {
  // flags the row carries that no cell accounts for (an unsure hold is decided per row)
  const cellFlags = new Set(served.filter((c) => c.key !== SUBJECT_ID).flatMap((c) => kindCell(row, c).flags));
  const rowFlags = (Array.isArray(row.flags) ? (row.flags as string[]) : []).filter((flag) => !cellFlags.has(flag as never));
  const signals = rowFlags.map((flag) => term("claim", flag));
  const signal = signals.some((t) => t.signal === "wrong") ? "wrong" : signals.some((t) => t.signal === "waiting") ? "waiting" : null;
  return (
    <span className="inline-flex items-baseline gap-1.5">
      {signal && <SignalDot signal={signal} title={signals.map((t) => t.meaning).join("\n")} />}
      <Link
        to={link(`/i/${instanceId}/s/${encodeURIComponent(subjectOf(row))}`)}
        className="font-mono text-[12px] text-zinc-100 hover:underline"
        title={subjectOf(row)}
      >
        {subjectIdOf(row)}
      </Link>
    </span>
  );
}

/**
 * The key field of a kind keyed by one field, standing for the Subject: its
 * value links to the Subject (the Subject's id when it holds none), its
 * Claim one icon away, with the dot for the row's and the key's signals.
 */
function SubjectKeyCell({
  row,
  column,
  served,
  instanceId,
  link,
}: {
  row: Row;
  column: KindColumn;
  served: readonly KindColumn[];
  instanceId: string;
  link: (path: string) => string;
}) {
  const cell = kindCell(row, column);
  const otherFlags = new Set(served.filter((c) => c.key !== column.key).flatMap((c) => kindCell(row, c).flags));
  const flags = [...cell.flags, ...(Array.isArray(row.flags) ? (row.flags as string[]) : []).filter((flag) => !otherFlags.has(flag as never))];
  const signals = [...new Set(flags)].map((flag) => term("claim", flag));
  const signal = signals.some((t) => t.signal === "wrong") ? "wrong" : signals.some((t) => t.signal === "waiting") ? "waiting" : null;
  const subjectPath = `/i/${instanceId}/s/${encodeURIComponent(subjectOf(row))}`;
  const entry = cell.entries[0];
  return (
    <span className="inline-flex items-baseline gap-1.5">
      {signal && <SignalDot signal={signal} title={signals.map((t) => t.meaning).join("\n")} />}
      <Link to={link(subjectPath)} className="text-zinc-100 hover:underline" title={subjectOf(row)}>
        {entry ? valueText(entry.value) : <span className="font-mono text-[12px]">{subjectIdOf(row)}</span>}
      </Link>
      {entry?.claim && (
        <Link
          to={link(`${subjectPath}?claim=${encodeURIComponent(entry.claim)}`)}
          className="relative top-[2px] shrink-0 text-zinc-600 hover:text-zinc-300"
          title="The Claim and its evidence"
          aria-label={`Claim for ${valueText(entry.value)}`}
        >
          <ScrollText className="h-3 w-3" />
        </Link>
      )}
    </span>
  );
}

function Cell({
  row,
  column,
  places,
  instanceId,
  link,
}: {
  row: Row;
  column: KindColumn;
  /** The decimals a number column shows on every row; null for other columns. */
  places: number | null;
  instanceId: string;
  link: (path: string) => string;
}) {
  const cell = kindCell(row, column);
  const [open, setOpen] = useState(false);
  const subjectPath = `/i/${instanceId}/s/${encodeURIComponent(subjectOf(row))}`;
  const claimHref = (claim: string | null) => link(claim ? `${subjectPath}?claim=${encodeURIComponent(claim)}` : subjectPath);
  const dot = cell.signal ? <SignalDot signal={cell.signal} title={cell.flags.map((flag) => term("claim", flag).meaning).join("\n")} /> : null;
  if (cell.display === "empty") return <span className="text-zinc-600">—</span>;
  if (cell.display === "none") {
    return (
      <span className="inline-flex items-baseline gap-1.5">
        {dot}
        <Link to={claimHref(cell.nones[0] ?? null)} className="text-zinc-500 hover:text-zinc-200 hover:underline" title="A Claim states this field has no value: open it">
          —
        </Link>
      </span>
    );
  }
  if (cell.display === "count") {
    return (
      <div>
        <span className="inline-flex items-baseline gap-1.5">
          {dot}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="whitespace-nowrap text-zinc-300 underline decoration-zinc-600 decoration-dotted underline-offset-2 hover:text-zinc-100"
            title={cell.values.map(valueText).join("\n")}
          >
            {cell.values.length} values
          </button>
        </span>
        {open && (
          <ul className="mt-0.5 space-y-0.5">
            {cell.entries.map((entry, i) => (
              <li key={i} className="min-w-0">
                <Value value={entry.value} column={column} href={claimHref(entry.claim)} instanceId={instanceId} link={link} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  return (
    // a number column's cells sit at the right edge, as its header does
    <span className={`flex min-w-0 flex-wrap items-baseline gap-x-1.5 ${places !== null ? "justify-end" : ""}`}>
      {dot}
      {cell.entries.map((entry, i) => (
        <span key={i} className="inline-flex min-w-0 items-baseline gap-x-1.5">
          {i > 0 && <span className="text-zinc-600">·</span>}
          <Value value={entry.value} column={column} places={places} href={claimHref(entry.claim)} instanceId={instanceId} link={link} />
        </span>
      ))}
    </span>
  );
}

/**
 * One value: a Subject links to that Subject (its Claim and evidence one
 * click away on the icon); anything else links to the Claim and its evidence.
 */
function Value({
  value,
  column,
  places = null,
  href,
  instanceId,
  link,
}: {
  value: unknown;
  column: KindColumn;
  places?: number | null;
  href: string;
  instanceId: string;
  link: (path: string) => string;
}) {
  const text = places !== null && (typeof value === "string" || typeof value === "number") ? fixedText(value, places) : valueText(value);
  if (column.type === "subject" && typeof value === "string" && value.includes("/")) {
    const [targetKind = "", ...rest] = value.split("/");
    const id = rest.join("/");
    return (
      <span className="group inline-flex min-w-0 items-baseline gap-1">
        <Link
          to={link(`/i/${instanceId}/s/${encodeURIComponent(value)}`)}
          className="truncate font-mono text-[12px] text-zinc-200 hover:underline"
          title={value}
        >
          {column.targets.length === 1 && column.targets[0] === targetKind ? id : value}
        </Link>
        <Link to={href} className="relative top-[2px] shrink-0 text-zinc-600 hover:text-zinc-300" title="The Claim and its evidence" aria-label={`Claim for ${value}`}>
          <ScrollText className="h-3 w-3" />
        </Link>
      </span>
    );
  }
  const mono = typeof value === "number" || typeof value === "boolean" || column.type === "integer" || column.type === "decimal";
  return (
    <Link
      to={href}
      className={`block truncate text-zinc-200 decoration-zinc-600 underline-offset-2 hover:text-white hover:underline ${mono ? "font-mono text-[12px]" : ""}`}
      title={`${text}\nThe Claim and its evidence`}
    >
      {typeof value === "object" && value !== null && (value as { truncated?: unknown }).truncated === true ? `${text}…` : text}
    </Link>
  );
}

