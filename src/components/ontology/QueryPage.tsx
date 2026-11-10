import { Fragment, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useCard, useClaimTypes, useInstanceId, useOrientKinds, useSourceModel, useStateQuery } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { actionChipClass, SignalDot } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { Disclosure, EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { Pager } from "@/screens/ProposalsScreen";
import { useAtLink } from "@/lib/at";
import { decimalPlaces, fixedText, isNumericType } from "@/lib/numbers";
import { defaultText, paramInput, paramKey, paramRun, QUERY_PAGE } from "@/lib/query-params";
import { term } from "@/lib/vocabulary";
import {
  columnField,
  defaultWords,
  kindWord,
  needsOntology,
  queryReaders,
  readQueryView,
  rowWords,
  typeWords,
  wholeKindTable,
  type Part,
  type QueryBox,
  type QueryParam,
  type QueryReader,
  type QueryView,
} from "@/lib/query-view";

/**
 * A QueryDefinition's page body: its results at the page coordinate first
 * (read-only, paged by the daemon, parameters given on the page), then what
 * it asks (the kinds it walks, the links it follows, its filters, what it
 * returns), the row Contract each row satisfies, its parameters, the
 * Procedures that read it and the Lines running them, and the definition as
 * served behind a disclosure. The header (name and description) is the
 * reference page's.
 */
export function QueryPage({ card }: { card: Schemas["GetQueryCard"] }) {
  const bare = useMemo(() => readQueryView(card), [card]);
  const claimTypes = useClaimTypes(bare !== null && needsOntology(bare));
  const view = useMemo(() => (claimTypes.data ? readQueryView(card, claimTypes.data.rows) : bare), [card, bare, claimTypes.data]);
  const raw = <RawDefinition definition={card.definition} />;
  if (!view) {
    return (
      <Panel title="Definition">
        <EmptyState>As served</EmptyState>
        {raw}
      </Panel>
    );
  }
  return (
    <>
      <Results view={view} />
      <Panel title="Asks">
        <QueryPath view={view} />
      </Panel>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Returns view={view} />
        <Parameters params={view.params} />
      </div>
      <UsedBy query={view.name} />
      {raw}
    </>
  );
}

// -- words with links ---------------------------------------------------------

/** Parts read joined by spaces; a field links to its ClaimType, a parameter reads "the given <name>". */
export function Words({ parts }: { parts: readonly Part[] }) {
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          {"text" in part ? (
            part.text
          ) : "field" in part ? (
            <span title={part.title}>
              {part.claimType ? (
                <RefLink value={`ClaimType:${part.claimType}`}>
                  <span>{part.field}</span>
                </RefLink>
              ) : (
                part.field
              )}
            </span>
          ) : (
            <span title={`The parameter ${part.param}, given when the query runs`}>
              the given <span className="font-mono text-zinc-200">{part.param}</span>
            </span>
          )}
        </Fragment>
      ))}
    </>
  );
}

// -- Asks: the path it walks --------------------------------------------------

/** Live Subjects per kind (orient's map), for the boxes' count line. */
type Counts = ReadonlyMap<string, number>;

/** One kind the query walks, in the type map's box style: its name, how many there are, its filters. */
function KindBox({ box, counts }: { box: QueryBox; counts: Counts }) {
  const kinds = box.kinds;
  const known = kinds.filter((kind) => counts.has(kind));
  const subjects = known.reduce((sum, kind) => sum + counts.get(kind)!, 0);
  return (
    <div
      title={`${kinds.join(" | ") || "any kind"} · bound as ${box.binding}`}
      className="max-w-[20rem] shrink-0 border border-zinc-500 bg-zinc-900 px-2.5 py-1.5 text-center hover:border-zinc-300"
    >
      <div className="font-mono text-[13px] leading-4 text-zinc-50">
        {kinds.length === 0
          ? "any kind"
          : kinds.map((kind, i) => (
              <Fragment key={kind}>
                {i > 0 && <span className="text-zinc-500"> or </span>}
                <RefLink value={`SubjectKind:${kind}`}>
                  <span title={kind}>{kindWord(kind)}</span>
                </RefLink>
              </Fragment>
            ))}
      </div>
      {!box.entryParam && known.length > 0 && (
        <div className="text-[11px] leading-4 text-zinc-400">{subjects === 1 ? "1 Subject" : `${subjects} Subjects`}</div>
      )}
      {box.entryParam && (
        <div className="mt-0.5 text-[11px] leading-4 text-zinc-400">
          the one named by <span className="font-mono text-zinc-200">{box.entryParam}</span>
        </div>
      )}
      {box.filters.map((filter, i) => (
        <div key={i} className="mt-0.5 text-[11px] leading-4 text-zinc-400">
          where <Words parts={filter} />
        </div>
      ))}
    </div>
  );
}

/**
 * An arrow for a link the query follows, labelled with the field over the
 * line as the type map labels its edges. The arrowhead points the way the
 * Claim does (from the kind that carries the field to the kind it names):
 * a hop that follows a field backwards points back at where it came from.
 */
function Arrow({ view, link }: { view: QueryView; link: QueryView["links"][number] }) {
  const source = kindWord(view.boxes.find((box) => box.binding === link.from)?.kinds[0] ?? link.from);
  const target = kindWord(view.boxes.find((box) => box.binding === link.to)?.kinds[0] ?? link.to);
  const field = link.field.replaceAll("_", " ");
  const title = link.reverse
    ? `From each ${source}, the ${target}s whose ${field} it is (${link.claimType}, followed backwards)`
    : `From each ${source}, its ${field} (${link.claimType})`;
  return (
    <div className="flex min-w-[7rem] shrink-0 flex-col items-stretch px-1.5" title={title}>
      <span className="whitespace-nowrap px-1 pb-0.5 text-center text-[11px] leading-4 text-zinc-400">
        <RefLink value={`ClaimType:${link.claimType}`}>
          <span>{field}</span>
        </RefLink>
        {link.required && <span className="text-zinc-600"> · required</span>}
      </span>
      <span className="relative h-px bg-zinc-500" aria-hidden>
        {link.reverse ? (
          <span className="absolute -left-px -top-[4px] border-y-[4.5px] border-r-[7px] border-y-transparent border-r-zinc-500" />
        ) : (
          <span className="absolute -right-px -top-[4px] border-y-[4.5px] border-l-[7px] border-y-transparent border-l-zinc-500" />
        )}
      </span>
    </div>
  );
}

/** A box and the links out of it, each to its own subtree; a chain reads left to right, a branch stacks. */
function Subtree({ view, binding, counts }: { view: QueryView; binding: string; counts: Counts }) {
  const box = view.boxes.find((item) => item.binding === binding);
  const out = view.links.filter((link) => link.from === binding);
  if (!box) return null;
  return (
    <div className="flex items-center">
      <KindBox box={box} counts={counts} />
      {out.length > 0 && (
        <div className="flex flex-col gap-3">
          {out.map((link) => (
            <div key={link.to} className="flex items-center">
              <Arrow view={view} link={link} />
              <Subtree view={view} binding={link.to} counts={counts} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** The path diagram, then the filters across boxes and what it returns, each in words. */
export function QueryPath({ view }: { view: QueryView }) {
  const root = view.boxes[0];
  const orient = useOrientKinds();
  const counts = useMemo<Counts>(() => new Map((orient.data?.kinds ?? []).map((kind) => [kind.kind, kind.subjects])), [orient.data]);
  return (
    <div>
      <div className="overflow-x-auto pb-1">{root && <Subtree view={view} binding={root.binding} counts={counts} />}</div>
      {view.filters.map((filter, i) => (
        <div key={i} className="mt-2 text-[13px] text-zinc-300">
          <span className="t-meta mr-2">Where</span>
          <Words parts={filter} />
        </div>
      ))}
    </div>
  );
}

// -- Returns ------------------------------------------------------------------

interface ReturnRow {
  name: string;
  type: string | null;
  optional: boolean;
  from: Part[] | null;
  expression: string | null;
}

const RETURN_COLUMNS: Column<ReturnRow>[] = [
  { id: "field", header: "Field", cell: (row) => <span className="font-mono text-zinc-100">{row.name}</span> },
  {
    id: "type",
    header: "Type",
    cell: (row) =>
      row.type === null ? (
        <span className="text-zinc-600">not stated</span>
      ) : (
        <span className="text-zinc-300" title={row.type}>
          {typeWords(row.type)}
          {row.optional && <span className="text-zinc-500"> · optional</span>}
        </span>
      ),
  },
  {
    id: "from",
    header: "Filled from",
    cell: (row) =>
      row.from ? (
        <span className="font-mono text-[12px] text-zinc-300" title={row.expression ?? undefined}>
          <Words parts={row.from} />
        </span>
      ) : (
        <span className="text-zinc-600">not projected</span>
      ),
  },
];

type ContractField = { name: string; type: string; optional?: boolean };

function Returns({ view }: { view: QueryView }) {
  const contract = useCard(view.row ? `Contract:${view.row}` : null);
  const card = contract.data?.card as { fields?: ContractField[]; description?: string | null } | null | undefined;
  const rows = useMemo<ReturnRow[]>(() => {
    const projected = new Map(view.returns.map((item) => [item.name, item]));
    const fields = card?.fields ?? [];
    const declared = fields.map((field) => ({
      name: field.name,
      type: field.type,
      optional: field.optional === true,
      from: projected.get(field.name)?.from ?? null,
      expression: projected.get(field.name)?.expression ?? null,
    }));
    const extra = view.returns
      .filter((item) => !fields.some((field) => field.name === item.name))
      .map((item) => ({ name: item.name, type: null, optional: false, from: item.from, expression: item.expression }));
    return [...declared, ...extra];
  }, [card, view.returns]);
  return (
    <Panel
      title="Returns"
      meta={
        <span className="flex flex-wrap items-baseline gap-x-2">
          <span>{rowWords(view)}</span>
          {view.row && (
            <span title={[`Contract:${view.row}`, card?.description].filter(Boolean).join("\n")}>
              row{" "}
              <RefLink value={`Contract:${view.row}`}>
                <span className="font-mono text-[12px]">{view.row.split("@")[0]}</span>
              </RefLink>
            </span>
          )}
        </span>
      }
    >
      {view.row && contract.isPending ? (
        <LoadState />
      ) : (
        <DataTable rows={rows} columns={RETURN_COLUMNS} rowKey={(row) => row.name} urlKey="returns" label="Returned fields" toolbar={false} maxHeight="none" empty="No fields" />
      )}
    </Panel>
  );
}

// -- Parameters ---------------------------------------------------------------

const PARAM_COLUMNS: Column<QueryParam>[] = [
  { id: "name", header: "Name", cell: (row) => <span className="font-mono text-zinc-100">{row.name}</span> },
  { id: "type", header: "Type", cell: (row) => <span title={row.type}>{typeWords(row.type)}</span> },
  {
    id: "default",
    header: "Default",
    cell: (row) => {
      const given = defaultWords(row);
      return given === "none" ? (
        <span className="text-zinc-500">none{row.required && " · must be given"}</span>
      ) : (
        <span className="font-mono">{given}</span>
      );
    },
  },
];

function Parameters({ params }: { params: QueryParam[] }) {
  return (
    <Panel title="Parameters">
      {params.length === 0 ? (
        <EmptyState>None</EmptyState>
      ) : (
        <DataTable rows={params} columns={PARAM_COLUMNS} rowKey={(row) => row.name} urlKey="params" label="Parameters" toolbar={false} maxHeight="none" />
      )}
    </Panel>
  );
}

// -- Results ------------------------------------------------------------------

type ResultRow = Record<string, unknown>;

/** A query page's rows, each keyed by its place in the page (rows may repeat). */
function useRowKeys(rows: readonly ResultRow[]) {
  return useMemo(() => {
    const keys = new Map<ResultRow, string>();
    rows.forEach((row, i) => keys.set(row, String(i)));
    return (row: ResultRow) => keys.get(row) ?? "";
  }, [rows]);
}

/** The page's given parameter values, read from (and written to) the URL as `p.<name>`. */
function useGivenParams(params: readonly QueryParam[]) {
  const [search, setSearch] = useSearchParams();
  const given = useMemo(() => Object.fromEntries(params.map((param) => [param.name, search.get(paramKey(param.name)) ?? ""])), [params, search]);
  const setGiven = (values: Record<string, string>) =>
    setSearch((current) => {
      const next = new URLSearchParams(current);
      for (const param of params) {
        const value = (values[param.name] ?? "").trim();
        if (value === "") next.delete(paramKey(param.name));
        else next.set(paramKey(param.name), value);
      }
      return next;
    });
  return [given, setGiven] as const;
}

/**
 * The Query's answer at the page coordinate, a daemon page at a time, in the
 * definition's own order (no header sorts or filters: they would reorder one
 * page only). A Query with parameters shows an input per parameter, typed by
 * its declared type; one with a required parameter that has no value and no
 * default shows the inputs and no rows. Server caps and the daemon's notes
 * are shown as served.
 */
function Results({ view }: { view: QueryView }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const [given, setGiven] = useGivenParams(view.params);
  const run = paramRun(view.params, given);
  const runKey = JSON.stringify(run.params ?? null);
  // each page read so far: its cursor and the rows before it
  const [paging, setPaging] = useState<{ key: string; pages: { cursor: string; offset: number }[] }>({ key: runKey, pages: [] });
  const pages = paging.key === runKey ? paging.pages : [];
  const cursor = pages[pages.length - 1]?.cursor;
  const blocked = run.missing.length > 0 || run.invalid.length > 0;
  const result = useStateQuery(
    blocked ? null : { name: view.name, limit: QUERY_PAGE, ...(run.params ? { params: run.params } : {}), ...(cursor !== undefined ? { cursor } : {}) },
  );
  const page = result.data;
  const rows = (page?.rows ?? []) as ResultRow[];
  const rowKey = useRowKeys(rows);
  const columns = useMemo(() => resultColumns(page, rows), [page, rows]);
  const first = pages[pages.length - 1]?.offset ?? 0;
  const capped = page?.capped ?? [];
  const total = page ? first + rows.length + (page.remaining ?? 0) : null;
  const kind = wholeKindTable(view);
  const count = page && rows.length > 0 ? `Rows ${first + 1}–${first + rows.length}${total !== null ? ` of ${total}${capped.length > 0 ? "+" : ""}` : ""}` : "No rows";
  return (
    <Panel
      title="Results"
      meta={
        kind ? (
          <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}`)} className={actionChipClass}>
            Open in the {kindWord(kind)} table
          </Link>
        ) : undefined
      }
    >
      {view.params.length > 0 && <ParamForm params={view.params} given={given} onSubmit={setGiven} />}
      {run.missing.length > 0 ? (
        <EmptyState>
          <span title="These parameters have no default: give a value to see rows">
            needs{" "}
            {run.missing.map((param, i) => (
              <Fragment key={param.name}>
                {i > 0 && ", "}
                <span className="font-mono text-zinc-300">{param.name}</span>
              </Fragment>
            ))}
          </span>
        </EmptyState>
      ) : run.invalid.length > 0 ? (
        <EmptyState>
          {run.invalid.map((param, i) => (
            <Fragment key={param.name}>
              {i > 0 && "; "}
              <span className="font-mono text-zinc-300">{param.name}</span>: expected {typeWords(param.type)}
            </Fragment>
          ))}
        </EmptyState>
      ) : result.error ? (
        <LoadState error={result.error} />
      ) : !page ? (
        <LoadState />
      ) : rows.length === 0 && pages.length === 0 ? (
        <EmptyState>No rows</EmptyState>
      ) : (
        <>
          {capped.length > 0 && (
            <div className="mb-1.5 text-[12px] text-amber-300/90" title="The daemon stopped the answer at a server cap; rows past it are not listed">
              Capped: <span className="font-mono">{capped.join(", ")}</span>
            </div>
          )}
          {(page.notes ?? []).map((note) => (
            <div key={note} className="t-meta mb-1.5">
              {note}
            </div>
          ))}
          <DataTable
            rows={rows}
            columns={columns}
            rowKey={rowKey}
            urlKey="results"
            apply="external"
            label="Results"
            count={count}
            maxHeight="none"
            empty="No rows"
            actions={
              pages.length > 0 || page.next_cursor ? (
                <span className="mr-2">
                  <Pager
                    index={pages.length}
                    newer={pages.length > 0 ? () => setPaging({ key: runKey, pages: pages.slice(0, -1) }) : null}
                    older={page.next_cursor ? () => setPaging({ key: runKey, pages: [...pages, { cursor: page.next_cursor!, offset: first + rows.length }] }) : null}
                  />
                </span>
              ) : undefined
            }
          />
        </>
      )}
    </Panel>
  );
}

/** A Subject the row is about: linked by its id, with a dot when the row carries a Claim signal. */
function RowSubject({ row }: { row: ResultRow }) {
  const subject = typeof row.subject === "string" ? row.subject : null;
  const id = typeof row.subject_id === "string" ? row.subject_id : null;
  const flags = Array.isArray(row.flags) ? row.flags.filter((flag): flag is string => typeof flag === "string") : [];
  const signals = flags.map((flag) => term("claim", flag));
  const signal = signals.some((t) => t.signal === "wrong") ? "wrong" : signals.some((t) => t.signal === "waiting") ? "waiting" : null;
  if (!subject) return <span className="text-zinc-600">—</span>;
  return (
    <span className="inline-flex items-baseline gap-1.5">
      {signal && <SignalDot signal={signal} title={signals.map((t) => t.meaning).join("\n")} />}
      <RefLink value={subject}>
        <span className="font-mono text-[12px]" title={subject}>
          {id ?? subject}
        </span>
      </RefLink>
    </span>
  );
}

/** The served columns, led by the row's Subject when the rows carry one the columns do not name. */
function resultColumns(page: Schemas["QueryResultRecord"] | undefined, rows: readonly ResultRow[]): Column<ResultRow>[] {
  if (!page) return [];
  const served = page.columns.map((column) => ({ column, field: columnField(column.name) }));
  const leadSubject = !served.some(({ field }) => field === "subject_id") && rows.some((row) => typeof row.subject === "string");
  const lead: Column<ResultRow>[] = leadSubject
    ? [{ id: "subject", header: "Subject", title: "The Subject the row is about", hideable: false, className: "whitespace-nowrap", cell: (row) => <RowSubject row={row} /> }]
    : [];
  return [
    ...lead,
    ...served.map(({ column, field }): Column<ResultRow> => {
      const values = rows.map((row) => row[column.name]);
      const numeric = column.cardinality !== "many" && isNumericType(column.type);
      const places = numeric ? decimalPlaces(values) : 0;
      const subject = column.type.split(":", 1)[0] === "subject";
      // short values stay on one line; a column holding long text wraps in a bounded width
      const long = values.some((value) => typeof value === "string" && value.length > 60);
      return {
        id: column.name,
        header: <span className="font-mono">{field}</span>,
        label: field,
        title: column.predicate ?? undefined,
        numeric,
        // a column empty on every row of the page starts hidden (the Columns picker still has it)
        defaultHidden: rows.length > 0 && values.every((value) => value === null || value === undefined),
        className: `text-[12px] ${long ? "min-w-[16rem] max-w-[28rem]" : "whitespace-nowrap"}`,
        cell: (row) => {
          const value = row[column.name];
          if (value === null || value === undefined) return <span className="text-zinc-600">—</span>;
          // the Subject's id links to its page
          if (field === "subject_id") return <RowSubject row={row} />;
          if (field === "subject_kind" && typeof value === "string") {
            return (
              <RefLink value={`SubjectKind:${value}`}>
                <span title={value}>{kindWord(value)}</span>
              </RefLink>
            );
          }
          if (numeric && (typeof value === "string" || typeof value === "number")) return fixedText(value, places);
          // only a Subject-typed column links; text that happens to read kind/id stays text
          if (typeof value === "string" && !subject) return value;
          return <ShownValue value={value} />;
        },
      };
    }),
  ];
}

/** One input per parameter, typed by its declared type; values apply on submit (into the URL). */
function ParamForm({
  params,
  given,
  onSubmit,
}: {
  params: readonly QueryParam[];
  given: Readonly<Record<string, string>>;
  onSubmit: (values: Record<string, string>) => void;
}) {
  const initial = useMemo(() => Object.fromEntries(params.map((param) => [param.name, given[param.name] || defaultText(param)])), [params, given]);
  const [values, setValues] = useState<Record<string, string>>(initial);
  useEffect(() => setValues(initial), [initial]);
  const field = "border border-zinc-700 bg-zinc-950 px-2 py-1 font-mono text-[12px] text-zinc-100 focus:border-zinc-400 focus:outline-none";
  return (
    <form
      className="mb-3 flex flex-wrap items-end gap-x-4 gap-y-2"
      aria-label="Parameters"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(values);
      }}
    >
      {params.map((param) => {
        const input = paramInput(param.type);
        const id = `param-${param.name}`;
        const set = (value: string) => setValues((current) => ({ ...current, [param.name]: value }));
        const value = values[param.name] ?? "";
        return (
          <label key={param.name} htmlFor={id} className="flex flex-col gap-0.5">
            <span className="text-[12px] text-zinc-400" title={param.type}>
              <span className="font-mono text-zinc-200">{param.name}</span> · {typeWords(param.type)}
              {param.required && param.default == null && <span className="text-zinc-500"> · required</span>}
            </span>
            {input.kind === "enum" || input.kind === "boolean" ? (
              <select id={id} value={value} onChange={(event) => set(event.target.value)} className={field}>
                <option value="">—</option>
                {(input.kind === "enum" ? input.members : ["true", "false"]).map((member) => (
                  <option key={member} value={member}>
                    {input.kind === "boolean" ? (member === "true" ? "yes" : "no") : member}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                value={value}
                onChange={(event) => set(event.target.value)}
                type={input.kind === "integer" ? "number" : "text"}
                step={input.kind === "integer" ? 1 : undefined}
                inputMode={input.kind === "decimal" ? "decimal" : undefined}
                placeholder={input.kind === "subject" ? "kind/id" : undefined}
                className={`${field} w-64`}
              />
            )}
          </label>
        );
      })}
      <button type="submit" className={actionChipClass}>
        Show rows
      </button>
    </form>
  );
}

// -- Used by ------------------------------------------------------------------

const READER_COLUMNS: Column<QueryReader>[] = [
  {
    id: "procedure",
    header: "Procedure",
    cell: (row) => (
      <RefLink value={`Procedure:${row.procedure}`}>
        <span className="font-mono text-[13px]" title={`Procedure:${row.procedure}`}>
          {row.procedure}
        </span>
      </RefLink>
    ),
  },
  {
    id: "step",
    header: "Reads it as",
    cell: (row) => (
      <span className="font-mono text-zinc-300" title="The read step's name; later steps use its rows under it">
        {row.steps.join(", ")}
      </span>
    ),
  },
  {
    id: "lines",
    header: "Run by Lines",
    cell: (row) =>
      row.lines.length === 0 ? (
        <span className="text-zinc-500">none (run directly)</span>
      ) : (
        <span className="flex flex-wrap gap-x-3">
          {row.lines.map((line) => (
            <RefLink key={line} value={`Line:${line}`}>
              <span className="font-mono text-[13px]" title={`Line:${line}`}>
                {line}
              </span>
            </RefLink>
          ))}
        </span>
      ),
  },
];

function UsedBy({ query }: { query: string }) {
  const model = useSourceModel();
  const readers = useMemo(() => (model.data ? queryReaders(query, model.data.specs, model.data.lines) : []), [model.data, query]);
  let body: ReactNode;
  if (model.error) body = <LoadState error={model.error} />;
  else if (!model.data) body = <LoadState />;
  else if (readers.length === 0) body = <EmptyState>None</EmptyState>;
  else
    body = (
      <DataTable rows={readers} columns={READER_COLUMNS} rowKey={(row) => row.procedure} urlKey="readers" label="Procedures that read it" toolbar={false} maxHeight="none" />
    );
  return (
    <Panel title="Used by" meta={model.data?.truncated ? "Some Procedures or Lines were not read" : undefined}>
      {body}
    </Panel>
  );
}

// -- the definition as served -------------------------------------------------

function RawDefinition({ definition }: { definition: unknown }) {
  return (
    <Disclosure label="Definition (raw)">
      <pre className="overflow-x-auto border border-zinc-800 bg-zinc-950 p-3 font-mono text-[12px] leading-5 text-zinc-300">
        {JSON.stringify(definition, null, 2)}
      </pre>
    </Disclosure>
  );
}
