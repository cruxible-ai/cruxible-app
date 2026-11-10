import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBatch, useInbox, useInboxItem, useLines, useNext, useStateQueries, useSubjectKinds } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { NEXT_PAGE, type QueryArgs } from "@/api/requests";
import { SignalDot, toggleChipClass } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { FieldList, type FieldItem } from "@/components/FieldList";
import { InfoButton } from "@/components/InfoButton";
import { Page, PageHeader } from "@/components/Page";
import { Disclosure, EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { SubjectHover } from "@/components/SubjectHover";
import { Pager } from "@/screens/ProposalsScreen";
import {
  contractSubjectField,
  foldedFields,
  INBOX_LIST_PAGE,
  INBOX_STATUSES,
  inboxContract,
  keyLookups,
  lineageQuery,
  lineageSubjectFields,
  lookupKey,
  payloadColumns,
  payloadObject,
  subjectRefOf,
  totalUnread,
  type InboxFilterStatus,
  type PayloadColumn,
  type SubjectField,
} from "@/lib/inbox";
import { sharedPrefix } from "@/lib/evidence-flow";
import { lineName, shortRunId } from "@/lib/lines";
import { readQueryView, type QueryView } from "@/lib/query-view";
import { keyPredicates } from "@/lib/subject";
import { formatDateTime } from "@/lib/text";
import { term } from "@/lib/vocabulary";
import { usePageTitle } from "@/lib/usePageTitle";

type Entry = Schemas["InboxListEntry"];
type Envelope = Schemas["InboxItemEnvelope"];
type Disposition = NonNullable<Envelope["disposition"]>;

/** Concept definitions behind the page's ⓘ buttons (docs/lines-and-automation.md and the CLI reference). */
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
        return last ? <span title={last.posted_at}>{formatDateTime(last.posted_at)}</span> : <span className="text-zinc-600">—</span>;
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

const EMPTY: Record<InboxFilterStatus | "all", string> = {
  all: "No items",
  unread: "No unread items",
  acknowledged: "No acknowledged items",
  dismissed: "No dismissed items",
  linked: "No linked items",
};

/**
 * Every Line's inbox items, a daemon page at a time, filtered by Line and
 * status on the daemon. A row leads with the payload fields that name
 * Subjects (linked, their current fields on hover), then the other fields
 * that tell items apart; a field with one value on every row, or one built
 * from other fields, is said once or left to the opened item. Items are in
 * the order the daemon serves them (most recently posted first).
 */
export function InboxScreen() {
  usePageTitle("Inbox");
  const [params, setParams] = useSearchParams();
  const line = params.get("line") || undefined;
  const rawStatus = params.get("status");
  const status = (INBOX_STATUSES as readonly string[]).includes(rawStatus ?? "") ? (rawStatus as InboxFilterStatus) : undefined;
  const filterKey = `${line ?? ""}|${status ?? ""}`;
  // each page read so far: its cursor and the items before it
  const [paging, setPaging] = useState<{ key: string; pages: { cursor: string; offset: number }[] }>({ key: filterKey, pages: [] });
  const pages = paging.key === filterKey ? paging.pages : [];
  const inbox = useInbox(line, status, INBOX_LIST_PAGE, pages[pages.length - 1]?.cursor);
  const lines = useLines();
  // the nav's unread count (next's line_inbox_unread rows): the same read, cached
  const unread = totalUnread(useNext({ limit: NEXT_PAGE }).data?.items);
  const [open, setOpen] = useState<string | null>(null);
  const lineNames = useMemo(() => (lines.data?.rows ?? []).map((row) => lineName(row.line)).sort(), [lines.data]);
  const linePrefix = sharedPrefix(lineNames);

  const entries = useMemo(() => inbox.data?.entries ?? [], [inbox.data]);
  const definitions = useItemDefinitions(entries);
  const lookups = useMemo(
    () => keyLookups(entries.map((entry) => ({ payload: payloadObject(entry.payload_preview), fields: definitions.subjectFieldsOf(entry.item) }))),
    [entries, definitions],
  );
  const found = useKeySubjects(lookups);
  const shape = useMemo(() => pageShape(entries, definitions.columns, definitions.subjectFieldsOf), [entries, definitions]);
  const columns = useMemo(() => inboxColumns(shape, linePrefix, definitions.subjectFieldsOf, found), [shape, linePrefix, definitions, found]);

  const setFilter = (key: "line" | "status", value: string | undefined) => {
    setOpen(null);
    setParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set(key, value);
      else next.delete(key);
      return next;
    });
  };
  const index = pages.length;
  const first = pages[pages.length - 1]?.offset ?? 0;
  const nextCursor = inbox.data?.next_cursor ?? null;

  return (
    <Page>
      <PageHeader
        title={
          <span className="inline-flex items-baseline gap-2">
            Inbox <InfoButton label="What the inbox is">{INBOX_TERMS.inbox}</InfoButton>
          </span>
        }
        description="Items Lines posted for an agent to judge, from every Line. Deciding on an item stays on the CLI and MCP."
        actions={
          index > 0 || nextCursor ? (
            <Pager
              index={index}
              newer={index > 0 ? () => setPaging({ key: filterKey, pages: pages.slice(0, -1) }) : null}
              older={nextCursor ? () => setPaging({ key: filterKey, pages: [...pages, { cursor: nextCursor, offset: first + entries.length }] }) : null}
            />
          ) : undefined
        }
      >
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center gap-1.5" role="group" aria-label="Status">
            <button onClick={() => setFilter("status", undefined)} className={toggleChipClass(status === undefined)} aria-pressed={status === undefined}>
              All
            </button>
            {INBOX_STATUSES.map((name) => (
              <button key={name} onClick={() => setFilter("status", name)} className={toggleChipClass(status === name)} aria-pressed={status === name}>
                {term("inbox", name).word}
                {name === "unread" && unread !== null && <span className="ml-1.5 tabular-nums text-amber-300/90">{unread}</span>}
              </button>
            ))}
            <InfoButton label="What the statuses mean">{INBOX_TERMS.status}</InfoButton>
          </div>
          <label className="flex items-center gap-2 text-[12px] text-zinc-500">
            Line
            <select
              aria-label="Line"
              value={line ?? ""}
              onChange={(event) => setFilter("line", event.target.value || undefined)}
              className="max-w-[22rem] border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 font-mono text-[12px] text-zinc-300"
            >
              <option value="">All Lines</option>
              {line && !lineNames.includes(line) && <option value={line}>{line}</option>}
              {lineNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </PageHeader>
      {inbox.isPending && <LoadState />}
      {inbox.error && <LoadState error={inbox.error} />}
      {inbox.data && (
        <Panel
          title={
            <span className="inline-flex items-baseline gap-1.5">
              Items <InfoButton label="How items are paged">{INBOX_TERMS.cap}</InfoButton>
            </span>
          }
          meta={<span title="The daemon's order: by when each item was last posted">Newest posted first</span>}
        >
          {entries.length === 0 ? (
            <EmptyState>{EMPTY[status ?? "all"]}</EmptyState>
          ) : (
            <DataTable
              rows={entries}
              columns={columns}
              rowKey={(entry) => entry.item.item_id}
              rowLabel={(entry) => entry.item.item_id}
              rowClassName={(entry) => (entry.item.status === "unread" ? "text-zinc-100" : "text-zinc-500")}
              urlKey="inbox"
              apply="external"
              label="Inbox"
              maxHeight="none"
              count={`Items ${first + 1}–${first + entries.length}${nextCursor ? "" : ` of ${first + entries.length}`}`}
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
          )}
          {definitions.error && <LoadState error={definitions.error} />}
        </Panel>
      )}
    </Page>
  );
}
