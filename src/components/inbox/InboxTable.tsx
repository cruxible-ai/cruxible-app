import { useMemo, useState, type ReactNode } from "react";
import { useGetBatch, useInboxItem, useStateQueries, useSubjectKinds } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import type { QueryArgs } from "@/api/requests";
import { SignalDot } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList, type FieldItem } from "@/components/FieldList";
import { InfoButton } from "@/components/InfoButton";
import { Disclosure, LoadState } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { SubjectHover } from "@/components/SubjectHover";
import {
  contractSubjectField,
  foldedFields,
  inboxContract,
  keyLookups,
  lineageQuery,
  lineageSubjectFields,
  lookupKey,
  payloadColumns,
  payloadObject,
  subjectRefOf,
  type PayloadColumn,
  type SubjectField,
} from "@/lib/inbox";
import { lineName, shortRunId } from "@/lib/lines";
import { readQueryView, type QueryView } from "@/lib/query-view";
import { keyPredicates } from "@/lib/subject";
import { formatDateTime, formatWhen } from "@/lib/text";
import { term } from "@/lib/vocabulary";

/**
 * Inbox items as rows: the Inbox page and a Line page's Inbox panel render
 * them here, one way. A row leads with the payload fields that name Subjects
 * (linked, their current fields on hover), then the other fields that tell
 * items apart; a field with one value on every row, or one built from other
 * fields, is said once or left to the opened item.
 */

type Entry = Schemas["InboxListEntry"];
type Envelope = Schemas["InboxItemEnvelope"];
type Disposition = NonNullable<Envelope["disposition"]>;

/** Concept definitions behind the inbox's ⓘ buttons (docs/lines-and-automation.md and the CLI reference). */
export const INBOX_TERMS = {
  inbox:
    "What Lines post for an agent to judge: findings a run selected but could not state as a belief (propose when automation can state the belief, post when it cannot). The inbox is never accepted state, and posting changes none.",
  status:
    "Unread: no decision yet. Acknowledged: seen, owed nothing further. Dismissed: judged to need nothing, with a reason. Linked: tied to the proposal or Subject where its judgment lives. Decisions are an agent's (cruxible inbox ack, dismiss, link), never automatic.",
  seen: "How many runs posted the item. Posting it again creates nothing new: the item counts the sighting and keeps its status and decision.",
  sinceDecision: "Runs that posted the item again after its latest decision.",
  cap: "A page reads up to 100 items, newest posted first; older pages follow. A posting step posts at most its max_items per run (100 unless the step says otherwise, at most 1,000).",
} as const;

const itemKey = (envelope: Envelope) => `${envelope.procedure}\u0000${envelope.node_id}`;
const lineRef = (line: string) => (line.startsWith("Line:") ? line : `Line:${line}`);

/** The page's item definitions: each posting step's Contract (its fields, their types, its description) and the Subject each payload field names. */
interface ItemDefinitions {
  columns: PayloadColumn[];
  contractOf: (envelope: Envelope) => { ref: string; description: string | null } | null;
  subjectFieldsOf: (envelope: Envelope) => ReadonlyMap<string, SubjectField>;
  error: Error | null;
}

const NO_FIELDS: ReadonlyMap<string, SubjectField> = new Map();

/**
 * Reads what the posting steps declare, a batch per definition family: the
 * posting Procedures' specs, then their item Contracts, then the Queries their
 * fan-outs read (for a payload field's lineage). Orient's subject kinds name
 * each kind's key. Nothing here grows with the page's rows.
 */
function useItemDefinitions(entries: readonly Entry[]): ItemDefinitions {
  const procedures = useMemo(() => [...new Set(entries.map((entry) => entry.item.procedure))], [entries]);
  const specs = useGetBatch(procedures);
  const specOf = useMemo(
    () => new Map(procedures.map((ref, i) => [ref, cardOf(specs.results[i], "procedure")?.authored ?? null])),
    [procedures, specs.results],
  );
  const steps = useMemo(() => {
    const out = new Map<string, { contract: string | null; query: string | null; envelope: Envelope }>();
    for (const entry of entries) {
      const key = itemKey(entry.item);
      if (out.has(key)) continue;
      const spec = specOf.get(entry.item.procedure);
      out.set(key, { contract: inboxContract(spec, entry.item.node_id), query: lineageQuery(spec, entry.item.node_id), envelope: entry.item });
    }
    return out;
  }, [entries, specOf]);
  const contractRefs = useMemo(() => [...new Set([...steps.values()].flatMap((step) => (step.contract ? [`Contract:${step.contract}`] : [])))], [steps]);
  const queryRefs = useMemo(() => [...new Set([...steps.values()].flatMap((step) => (step.query ? [`query:${step.query}`] : [])))], [steps]);
  const contracts = useGetBatch(contractRefs);
  const queries = useGetBatch(queryRefs);
  const kinds = useSubjectKinds(queryRefs.length > 0 || contractRefs.length > 0);
  const keys = useMemo(() => keyPredicates(kinds.data?.rows), [kinds.data]);

  return useMemo(() => {
    const contractCards = new Map(contractRefs.map((ref, i) => [ref, cardOf(contracts.results[i], "contract")]));
    const views = new Map<string, QueryView>();
    queryRefs.forEach((ref, i) => {
      const card = cardOf(queries.results[i], "query");
      const view = card ? readQueryView(card) : null;
      if (view) views.set(ref.slice("query:".length), view);
    });
    const fieldsOf = new Map<string, Map<string, SubjectField>>();
    for (const [key, step] of steps) {
      const card = step.contract ? contractCards.get(`Contract:${step.contract}`) : null;
      const spec = specOf.get(step.envelope.procedure);
      // the Contract's types say first; the posting step's lineage fills in what they leave untyped
      const fields = lineageSubjectFields(spec, step.envelope.node_id, views, keys);
      for (const field of card?.fields ?? []) {
        const typed = contractSubjectField(field.type, keys);
        if (typed) fields.set(field.name, typed);
      }
      fieldsOf.set(key, fields);
    }
    const columns = payloadColumns(
      [...contractCards.values()].flatMap((card) => (card ? [card.fields] : [])),
      entries.map((entry) => payloadObject(entry.payload_preview)),
    );
    return {
      columns,
      contractOf: (envelope: Envelope) => {
        const step = steps.get(itemKey(envelope));
        if (!step?.contract) return null;
        return { ref: `Contract:${step.contract}`, description: contractCards.get(`Contract:${step.contract}`)?.description ?? null };
      },
      subjectFieldsOf: (envelope: Envelope) => fieldsOf.get(itemKey(envelope)) ?? NO_FIELDS,
      error: specs.error ?? contracts.error ?? queries.error ?? null,
    };
  }, [contractRefs, contracts.results, contracts.error, queryRefs, queries.results, queries.error, steps, specOf, keys, entries, specs.error]);
}

/**
 * The Subjects a page's key-valued fields name: one query per Subject kind,
 * filtered on the daemon by the kind's key over the page's distinct values
 * (never one read per row). Keyed by `lookupKey(kind, value)`.
 */
function useKeySubjects(lookups: ReturnType<typeof keyLookups>): ReadonlyMap<string, string> {
  const args = useMemo<QueryArgs[]>(
    () => lookups.map((lookup) => ({ kind: lookup.kind, where: [{ field: lookup.key, in: lookup.values }], select: [lookup.key], limit: lookup.values.length })),
    [lookups],
  );
  const read = useStateQueries(args);
  return useMemo(() => {
    const found = new Map<string, string>();
    lookups.forEach((lookup, i) => {
      const page = read.results[i];
      const column = page?.columns.find((item) => item.predicate === lookup.key)?.name;
      if (!page || !column) return;
      for (const row of page.rows as Record<string, unknown>[]) {
        const value = row[column];
        if (typeof value === "string" && typeof row.subject === "string") found.set(lookupKey(lookup.kind, value), row.subject);
      }
    });
    return found;
  }, [lookups, read.results]);
}

// -- cells --------------------------------------------------------------------

/** The item's status as a quiet marker: an amber dot while unread, the decision's word once decided. */
function StatusMark({ status }: { status: Envelope["status"] }) {
  const word = term("inbox", status);
  if (status === "unread") return <SignalDot signal="waiting" title={word.meaning} />;
  return (
    <span className="text-[11px] text-zinc-500" title={word.meaning}>
      {word.word}
    </span>
  );
}

/** Payload text longer than this, on any row of the page, is cut in its column (whole on hover). */
const LONG_VALUE = 40;

/** One payload value: a field that names a Subject links to it (its current fields on hover); other text reads as written. */
function FieldValue({ value, subject, clip = false }: { value: unknown; subject: string | null; clip?: boolean }) {
  if (value === null || value === undefined || value === "") return <span className="text-zinc-600">—</span>;
  if (typeof value === "string") {
    const text = clip ? (
      <span className="block max-w-[18rem] truncate" title={value}>
        {value}
      </span>
    ) : (
      <span className="break-words">{value}</span>
    );
    return subject ? <SubjectHover subject={subject}>{text}</SubjectHover> : text;
  }
  return <ShownValue value={value} />;
}

/** The latest decision on an item: why it was dismissed, or where it is linked, then who and when. */
function DecisionCell({ disposition }: { disposition: Disposition | null | undefined }) {
  if (!disposition) return <span className="text-zinc-600">—</span>;
  return (
    <span className="flex flex-col gap-0.5">
      {disposition.disposition === "acknowledged" && <span>{term("inbox", "acknowledged").word}</span>}
      {disposition.disposition === "dismissed" && <span className="text-zinc-300">{disposition.reason}</span>}
      {disposition.disposition === "linked" &&
        (disposition.target.kind === "subject" ? (
          <RefLink value={disposition.target.subject} />
        ) : (
          <RefLink value={disposition.target.proposal_id} short />
        ))}
      <span className="text-[11px] text-zinc-500" title={disposition.decided_at}>
        <span className="font-mono">{disposition.actor_id}</span> · {formatDateTime(disposition.decided_at)}
      </span>
    </span>
  );
}

/**
 * A payload field's header: its name as the Contract declares it, in the
 * mono face every field name on the console reads in (console labels are
 * sentence case words; a kit's field names are names, shown as written).
 * Its Contract description and type are on hover.
 */
function fieldHeader(column: PayloadColumn): { header: ReactNode; title: string } {
  return {
    header: <span className="font-mono text-[11.5px] font-normal">{column.name}</span>,
    title: [column.description, column.type ? `${column.name} · ${column.type}` : `${column.name} · not in the item Contract`].filter(Boolean).join("\n"),
  };
}

interface PageShape {
  /** Payload fields shown as columns, Subject fields first. */
  lead: PayloadColumn[];
  /** Fields with one value on every row: said once above the table. */
  constant: Map<string, unknown>;
  /** The Line every row shares; null when the page spans Lines. */
  line: string | null;
  decided: boolean;
  anyNonObject: boolean;
  long: Set<string>;
}

function pageShape(entries: readonly Entry[], columns: readonly PayloadColumn[], fieldsOf: (envelope: Envelope) => ReadonlyMap<string, SubjectField>): PageShape {
  const payloads = entries.map((entry) => payloadObject(entry.payload_preview));
  const names = columns.map((column) => column.name);
  const named = (name: string) => entries.some((entry) => fieldsOf(entry.item).has(name));
  const { constant, composite } = foldedFields(names, payloads, new Set(names.filter(named)));
  const kept = columns.filter((column) => !constant.has(column.name) && !composite.has(column.name));
  const lead = [...kept.filter((column) => named(column.name)), ...kept.filter((column) => !named(column.name))];
  const lines = new Set(entries.map((entry) => lineName(entry.item.line)));
  const long = new Set(
    kept
      .filter((column) => !named(column.name) && payloads.some((payload) => typeof payload?.[column.name] === "string" && String(payload[column.name]).length > LONG_VALUE))
      .map((column) => column.name),
  );
  return {
    lead,
    constant,
    line: lines.size === 1 ? [...lines][0]! : null,
    decided: entries.some((entry) => entry.item.disposition),
    anyNonObject: payloads.some((payload) => payload === null),
    long,
  };
}

function inboxColumns(shape: PageShape, linePrefix: string, fieldsOf: (envelope: Envelope) => ReadonlyMap<string, SubjectField>, found: ReadonlyMap<string, string>): Column<Entry>[] {
  const columns: (Column<Entry> | null)[] = [
    {
      id: "status",
      header: <span className="sr-only">Status</span>,
      label: "Status",
      title: "The item's inbox status",
      hideable: false,
      className: "w-4 whitespace-nowrap",
      cell: (entry) => <StatusMark status={entry.item.status} />,
    },
    ...shape.lead.map((column): Column<Entry> => {
      const { header, title } = fieldHeader(column);
      return {
        id: `payload.${column.name}`,
        header,
        label: column.name,
        title,
        className: "whitespace-nowrap",
        cell: (entry) => {
          const field = fieldsOf(entry.item).get(column.name);
          const value = payloadObject(entry.payload_preview)?.[column.name];
          return <FieldValue value={value} subject={field ? subjectRefOf(field, value, found) : null} clip={shape.long.has(column.name)} />;
        },
      };
    }),
    // a payload that is not an object of fields (text, or one cut to a preview) reads as served
    shape.anyNonObject
      ? {
          id: "payload",
          header: "Payload",
          title: "The payload when it is not an object of fields; open the row for the whole item",
          className: "max-w-[28rem] text-[12px]",
          cell: (entry) => (payloadObject(entry.payload_preview) ? null : <ShownValue value={entry.payload_preview} />),
        }
      : null,
    shape.line === null
      ? {
          id: "line",
          header: "Line",
          className: "whitespace-nowrap",
          cell: (entry) => (
            <RefLink value={lineRef(entry.item.line)}>
              {/* the namespace every Line shares is said once, by the filter's names; the full name on hover */}
              <span className="font-mono text-[12px]" title={lineName(entry.item.line)}>
                {lineName(entry.item.line).startsWith(linePrefix) ? lineName(entry.item.line).slice(linePrefix.length) : lineName(entry.item.line)}
              </span>
            </RefLink>
          ),
        }
      : null,
    {
      id: "decision",
      header: "Decision",
      title: "The agent's latest decision on the item",
      defaultHidden: !shape.decided,
      className: "min-w-[10rem] max-w-[24rem] text-[12px]",
      cell: (entry) => <DecisionCell disposition={entry.item.disposition} />,
    },
    {
      id: "seen",
      header: "Seen",
      title: INBOX_TERMS.seen,
      numeric: true,
      defaultHidden: true,
      className: "text-[12px]",
      cell: (entry) => entry.item.occurrences,
    },
    {
      id: "last",
      header: "Last posted",
      className: "whitespace-nowrap text-[12px] text-zinc-500",
      cell: (entry) => {
        const last = entry.item.recent_sightings[0];
        // the year only when it is not this one, so the column stays narrow beside the payload fields
        return last ? <span title={formatDateTime(last.posted_at)}>{formatWhen(last.posted_at)}</span> : <span className="text-zinc-600">—</span>;
      },
    },
  ];
  return columns.filter((column): column is Column<Entry> => column !== null);
}

// -- the opened item ------------------------------------------------------------

function Sighting({ sighting }: { sighting: Envelope["first_sighting"] }) {
  return (
    <span title={sighting.posted_at}>
      {formatDateTime(sighting.posted_at)} ·{" "}
      <RefLink value={`ProcedureRun:${sighting.run_id}`}>
        <span className="font-mono text-[12px]" title={sighting.run_id}>
          {shortRunId(sighting.run_id)}
        </span>
      </RefLink>
    </span>
  );
}

const withInfo = (label: string, info: string) => (
  <span className="inline-flex items-baseline gap-1.5">
    {label} <InfoButton label={`What ${label.toLowerCase()} means`}>{info}</InfoButton>
  </span>
);

/**
 * An opened item: its payload as a field table (the whole payload, one read
 * by id; Subject fields linked), the item's facts (who posted it, when, how
 * often, the latest decision), the item Contract's description as authored,
 * and the payload's JSON behind a disclosure.
 */
function ItemDetail({
  entry,
  columns,
  fields,
  found,
  contract,
}: {
  entry: Entry;
  columns: readonly PayloadColumn[];
  fields: ReadonlyMap<string, SubjectField>;
  found: ReadonlyMap<string, string>;
  contract: { ref: string; description: string | null } | null;
}) {
  const read = useInboxItem(entry.item.item_id);
  const envelope = read.data?.item ?? entry.item;
  const whole = read.data?.payload;
  const payload = (typeof whole === "object" && whole !== null && !Array.isArray(whole) ? (whole as Record<string, unknown>) : null) ?? payloadObject(entry.payload_preview);
  const typeOf = new Map(columns.map((column) => [column.name, column]));
  const fieldItems: FieldItem[] = payload
    ? Object.entries(payload).map(([name, value]) => {
        const field = fields.get(name);
        const column = typeOf.get(name);
        return {
          key: name,
          label: name,
          labelTitle: [column?.description, column?.type ? `${name} · ${column.type}` : null].filter(Boolean).join("\n") || undefined,
          value: <FieldValue value={value} subject={field ? subjectRefOf(field, value, found) : null} />,
        };
      })
    : [];
  const disposition = envelope.disposition;
  const facts: FieldItem[] = [
    {
      key: "line",
      label: "Posted by",
      value: (
        <span className="flex flex-wrap items-baseline gap-x-2">
          <RefLink value={lineRef(envelope.line)}>
            <span className="font-mono text-[12px]">{lineName(envelope.line)}</span>
          </RefLink>
          <span className="text-zinc-500" title={`${envelope.procedure} · step ${envelope.node_id}`}>
            step <span className="font-mono text-[12px]">{envelope.node_id}</span>
          </span>
        </span>
      ),
    },
    { key: "first", label: "First posted", value: <Sighting sighting={envelope.first_sighting} /> },
    ...(envelope.recent_sightings[0] && envelope.occurrences > 1
      ? [{ key: "last", label: "Last posted", value: <Sighting sighting={envelope.recent_sightings[0]} /> }]
      : []),
    { key: "seen", label: withInfo("Seen", INBOX_TERMS.seen), value: <span className="tabular-nums">{envelope.occurrences === 1 ? "once" : `${envelope.occurrences} times`}</span> },
    {
      key: "status",
      label: withInfo("Status", INBOX_TERMS.status),
      value: disposition ? <DecisionCell disposition={disposition} /> : <span>{term("inbox", envelope.status).word}</span>,
    },
    ...(disposition && envelope.recurred_since_disposition
      ? [{ key: "since", label: withInfo("Since decision", INBOX_TERMS.sinceDecision), value: <span className="tabular-nums">{envelope.recurred_since_disposition}</span> }]
      : []),
    ...(contract
      ? [
          {
            key: "contract",
            label: "Item Contract",
            value: (
              <span className="flex flex-col gap-0.5">
                <RefLink value={contract.ref}>
                  <span className="font-mono text-[12px]">{contract.ref.replace(/^Contract:/, "")}</span>
                </RefLink>
                {contract.description && <span className="text-zinc-400">{contract.description}</span>}
              </span>
            ),
          },
        ]
      : []),
  ];
  return (
    <div className="space-y-3 border border-zinc-800 bg-zinc-950/60 px-3 py-2.5">
      <div className="grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2">
        <div className="min-w-0">
          {payload ? (
            <FieldList fields={fieldItems} density="compact" label="Payload fields" />
          ) : (
            <div className="text-[12px] text-zinc-300">
              <ShownValue value={whole ?? entry.payload_preview} />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <FieldList fields={facts} density="compact" labels="words" label="Item" />
        </div>
      </div>
      {read.error && <LoadState error={read.error} />}
      {read.data && (
        <Disclosure label="Payload JSON">
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap border border-zinc-800 bg-zinc-950 p-2 font-mono text-[11px] text-zinc-400">
            {JSON.stringify(read.data.payload, null, 2)}
          </pre>
        </Disclosure>
      )}
    </div>
  );
}

/** What the page's rows share (the Line, a field's one value), said once instead of in a column. */
function Shared({ shape, filtered }: { shape: PageShape; filtered: boolean }) {
  const parts: ReactNode[] = [];
  if (shape.line && !filtered)
    parts.push(
      <span key="line">
        Line{" "}
        <RefLink value={lineRef(shape.line)}>
          <span className="font-mono text-[12px] text-zinc-300">{shape.line}</span>
        </RefLink>
      </span>,
    );
  for (const [name, value] of shape.constant)
    parts.push(
      <span key={name}>
        <span className="font-mono">{name}</span> <span className="text-zinc-300">{String(value)}</span>
      </span>,
    );
  if (parts.length === 0) return null;
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-3" title="The same on every item on this page">
      <span className="text-zinc-600">Every row</span>
      {parts}
    </span>
  );
}

/**
 * One page of inbox items in the shared table. `line` is the Line the page is
 * filtered to (the Line column and the "every row" Line note then hide);
 * `linePrefix` is the namespace every Line shares, said once by the caller.
 * The caller pages and filters on the daemon and says which items these are
 * in `count`.
 */
export function InboxTable({
  entries,
  line,
  linePrefix = "",
  count,
  urlKey = "inbox",
  label = "Inbox",
}: {
  entries: readonly Entry[];
  line?: string | undefined;
  linePrefix?: string;
  count?: ReactNode;
  urlKey?: string;
  label?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const definitions = useItemDefinitions(entries);
  const lookups = useMemo(
    () => keyLookups(entries.map((entry) => ({ payload: payloadObject(entry.payload_preview), fields: definitions.subjectFieldsOf(entry.item) }))),
    [entries, definitions],
  );
  const found = useKeySubjects(lookups);
  const shape = useMemo(() => pageShape(entries, definitions.columns, definitions.subjectFieldsOf), [entries, definitions]);
  const columns = useMemo(() => inboxColumns(shape, linePrefix, definitions.subjectFieldsOf, found), [shape, linePrefix, definitions, found]);
  return (
    <>
      <DataTable
        rows={entries}
        columns={columns}
        rowKey={(entry) => entry.item.item_id}
        rowLabel={(entry) => entry.item.item_id}
        rowClassName={(entry) => (entry.item.status === "unread" ? "text-zinc-100" : "text-zinc-500")}
        urlKey={urlKey}
        apply="external"
        label={label}
        maxHeight="none"
        count={count}
        note={<Shared shape={shape} filtered={line !== undefined} />}
        open={open}
        onToggle={(id) => setOpen(open === id ? null : id)}
        expanded={(entry) => (
          <ItemDetail
            entry={entry}
            columns={definitions.columns}
            fields={definitions.subjectFieldsOf(entry.item)}
            found={found}
            contract={definitions.contractOf(entry.item)}
          />
        )}
      />
      {definitions.error && <LoadState error={definitions.error} />}
    </>
  );
}
