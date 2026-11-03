import { Fragment, useMemo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useCard, useClaimTypes, useInstanceId, useOrientKinds, useSourceModel, useStateQuery } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { actionChipClass } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { Disclosure, EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { useAtLink } from "@/lib/at";
import {
  columnField,
  defaultWords,
  kindWord,
  missingParams,
  needsOntology,
  previewParams,
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

/** Rows the preview reads. */
export const PREVIEW_ROWS = 10;

/**
 * A QueryDefinition's page body: what it asks (the kinds it walks, the links
 * it follows, its filters, what it returns), the row Contract each row
 * satisfies, its parameters, a live preview of its first rows at the page
 * coordinate (read-only), the Procedures that read it and the Lines running
 * them, and the definition as served behind a disclosure. The header (name
 * and description) is the reference page's.
 */
export function QueryPage({ card }: { card: Schemas["GetQueryCard"] }) {
  const bare = useMemo(() => readQueryView(card), [card]);
  const claimTypes = useClaimTypes(bare !== null && needsOntology(bare));
  const view = useMemo(() => (claimTypes.data ? readQueryView(card, claimTypes.data.rows) : bare), [card, bare, claimTypes.data]);
  const raw = <RawDefinition definition={card.definition} />;
  if (!view) {
    return (
      <Panel title="Definition">
        <EmptyState>This card's definition is not one this page reads; it is shown as served.</EmptyState>
        {raw}
      </Panel>
    );
  }
  return (
    <>
      <Panel title="Asks">
        <QueryPath view={view} />
      </Panel>
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Returns view={view} />
        <Parameters params={view.params} />
      </div>
      <Preview view={view} />
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

// -- Preview ------------------------------------------------------------------

type ResultRow = Record<string, unknown>;

function Preview({ view }: { view: QueryView }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const missing = missingParams(view);
  const params = previewParams(view);
  const result = useStateQuery(missing.length > 0 ? null : { name: view.name, limit: PREVIEW_ROWS, ...(params ? { params } : {}) });
  const page = result.data;
  const columns = useMemo<Column<ResultRow>[]>(
    () =>
      (page?.columns ?? []).map((column) => {
        const field = columnField(column.name);
        return {
          id: column.name,
          header: <span className="font-mono">{field}</span>,
          label: field,
          title: column.predicate ?? undefined,
          className: "text-[12px]",
          cell: (row) => {
            const value = row[column.name];
            // the Subject's id links to its page
            if (field === "subject_id" && typeof row.subject === "string" && typeof value === "string") {
              return <RefLink value={row.subject}>{value}</RefLink>;
            }
            if (field === "subject_kind" && typeof value === "string") {
              return (
                <RefLink value={`SubjectKind:${value}`}>
                  <span title={value}>{kindWord(value)}</span>
                </RefLink>
              );
            }
            return <ShownValue value={value} />;
          },
        };
      }),
    [page],
  );
  const shown = page?.rows.length ?? 0;
  const capped = (page?.capped?.length ?? 0) > 0;
  const total = page ? shown + (page.remaining ?? 0) : null;
  const kind = wholeKindTable(view);
  const meta =
    page && total !== null ? (
      <span className="flex items-baseline gap-3">
        <span>
          {shown < total ? `First ${shown} of ${total}${capped ? "+" : ""}` : `${total} ${total === 1 ? "row" : "rows"}`}
        </span>
        {kind && (
          <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}`)} className={actionChipClass}>
            Open all in the {kindWord(kind)} table
          </Link>
        )}
      </span>
    ) : undefined;
  return (
    <Panel title="Preview" meta={meta}>
      {missing.length > 0 ? (
        <EmptyState>
          <span title="These parameters have no default, so the preview cannot run">
            needs{" "}
            {missing.map((param, i) => (
              <Fragment key={param.name}>
                {i > 0 && ", "}
                <span className="font-mono text-zinc-300">{param.name}</span>
              </Fragment>
            ))}
          </span>
        </EmptyState>
      ) : result.error ? (
        <LoadState error={result.error} />
      ) : !page ? (
        <LoadState />
      ) : (
        <>
          <div className="mb-2 text-[12px] text-zinc-500" title="Run live at this generation; nothing is written">
            live · read-only{params ? " · defaults" : ""}
          </div>
          <DataTable
            rows={page.rows}
            columns={columns}
            rowKey={(row) => JSON.stringify(row)}
            urlKey="preview"
            label="Preview rows"
            toolbar={false}
            maxHeight="none"
            empty="No rows"
          />
          {(page.notes ?? []).map((note) => (
            <div key={note} className="mt-1.5 text-[12px] text-zinc-500">
              {note}
            </div>
          ))}
        </>
      )}
    </Panel>
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
  else if (readers.length === 0) body = <EmptyState>No Procedure reads it</EmptyState>;
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
