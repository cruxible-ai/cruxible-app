import { useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBatch, useInboxItem, useStateQueries, useSubjectKinds } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import type { QueryArgs } from "@/api/requests";
import { SignalDot, toggleChipClass } from "@/components/Chip";
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
import { readLineEnvelope } from "@/lib/definitions";
import { lineName, shortRunId } from "@/lib/lines";
import {
  columnDecimals,
  isDateType,
  isNumberType,
  joinRows,
  orderFields,
  pageRows,
  worklistArgs,
  worklistColumns,
  worklistPlan,
  type WorklistColumn,
  type WorklistPlan,
} from "@/lib/worklist";
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
type ProcedureSpec = Schemas["ProcedureSpec"];
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
  /** Each posting Procedure's spec, by ref. */
  specOf: ReadonlyMap<string, ProcedureSpec | null>;
  /** Each Query a posting step's fan-out reads, by bare name: its view and its definition as served. */
  queryOf: ReadonlyMap<string, { view: QueryView; definition: unknown }>;
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
    const queryOf = new Map<string, { view: QueryView; definition: unknown }>();
    queryRefs.forEach((ref, i) => {
      const card = cardOf(queries.results[i], "query");
      const view = card ? readQueryView(card) : null;
      if (view && card) {
        views.set(ref.slice("query:".length), view);
        queryOf.set(ref.slice("query:".length), { view, definition: card.definition });
      }
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
      specOf,
      queryOf,
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

// -- the item's current row ----------------------------------------------------

/** One posting step's worklist: its Query read for the page, joined to its items. */
interface WorklistPart {
  line: string;
  query: string;
  /** Parameters the read cannot resolve from served data; the part then reads nothing. */
  blocked: string[];
  /** The read answered only part of the Query (capped, truncated or paged): a missing row says nothing. */
  partial: boolean;
  /** The read has answered. */
  landed: boolean;
  /** Rows in the Query's order, keyed by its return names. */
  rows: Record<string, unknown>[];
}

/** The page's worklists: what each item's row is, the added columns, and what the header says about them. */
export interface Worklist {
  columns: WorklistColumn[];
  /** The item's current row; null when its Query no longer lists it; undefined when nothing can be said. */
  rowOf: (entry: Entry) => Record<string, unknown> | null | undefined;
  /** The Query an item's row comes from (for the "No longer in" tag). */
  queryOf: (entry: Entry) => string | null;
  /** The item's place in its Query's order; undefined when it has none. */
  rankOf: (entry: Entry) => number | undefined;
  parts: WorklistPart[];
  /** Decimals per numeric column, over the joined rows. */
  decimals: ReadonlyMap<string, number>;
}

const NO_WORKLIST: Worklist = { columns: [], rowOf: () => undefined, queryOf: () => null, rankOf: () => undefined, parts: [], decimals: new Map() };
const stepKey = (envelope: Envelope) => `${lineName(envelope.line)}\u0000${envelope.procedure}\u0000${envelope.node_id}`;

/**
 * Each item's current row from the Query its Line's posting step reads: the
 * page's Lines' definitions in one batch (their parameters), then one Query
 * read per posting step on the page (never per row), at the page's
 * coordinate, with the parameters the read step passes. Items join their
 * row by every field the post step copies from it; the row's other fields
 * become columns (types and descriptions from the row Contract).
 */
function useWorklist(entries: readonly Entry[], definitions: ItemDefinitions): Worklist {
  const steps = useMemo(() => {
    const out = new Map<string, Envelope>();
    for (const entry of entries) if (!out.has(stepKey(entry.item))) out.set(stepKey(entry.item), entry.item);
    return [...out.entries()];
  }, [entries]);
  const lineRefs = useMemo(() => [...new Set(steps.map(([, envelope]) => `Line:${lineName(envelope.line)}`))], [steps]);
  const proofs = useGetBatch(lineRefs, "proof");
  const parametersOf = useMemo(() => {
    const out = new Map<string, Record<string, unknown>>();
    for (const result of proofs.results) {
      const line = readLineEnvelope(result.proof);
      if (line) out.set(line.line.replace(/^Line:/, ""), line.parameters);
    }
    return out;
  }, [proofs.results]);
  const plans = useMemo(
    () =>
      steps.flatMap(([key, envelope]) => {
        const plan = worklistPlan(definitions.specOf.get(envelope.procedure), envelope.node_id, parametersOf.get(lineName(envelope.line)) ?? null);
        const query = plan ? definitions.queryOf.get(plan.query) : undefined;
        // the Line's parameters are not in yet: wait rather than call a parameter unresolved
        if (!plan || !query || (proofs.isPending && plan.unresolved.length > 0)) return [];
        return [{ key, line: lineName(envelope.line), plan, query, run: worklistArgs(plan, query.view) }];
      }),
    [steps, definitions.specOf, definitions.queryOf, parametersOf, proofs.isPending],
  );
  const args = useMemo(() => plans.flatMap((part) => ("args" in part.run ? [part.run.args] : [])), [plans]);
  const reads = useStateQueries(args);
  const rowContracts = useMemo(() => [...new Set(plans.flatMap((part) => (part.query.view.row ? [`Contract:${part.query.view.row}`] : [])))], [plans]);
  const contracts = useGetBatch(rowContracts);
  return useMemo(() => {
    if (plans.length === 0) return NO_WORKLIST;
    const contractFields = new Map(rowContracts.map((ref, i) => [ref, cardOf(contracts.results[i], "contract")?.fields ?? null]));
    const byKey = new Map<string, { part: WorklistPart; join: WorklistPlan["join"] }>();
    const columns = new Map<string, WorklistColumn>();
    let read = 0;
    for (const { key, line, plan, query, run } of plans) {
      const page = "args" in run ? reads.results[read++] : undefined;
      const rows = page ? pageRows(page) : [];
      const part: WorklistPart = {
        line,
        query: plan.query,
        blocked: "blocked" in run ? run.blocked : [],
        partial: page ? page.truncated || Boolean(page.next_cursor) || (page.capped?.length ?? 0) > 0 : false,
        landed: page !== undefined,
        rows,
      };
      byKey.set(key, { part, join: plan.join });
      if (!page) continue;
      const mine = entries.filter((entry) => stepKey(entry.item) === key);
      const at = joinRows(mine.map((entry) => payloadObject(entry.payload_preview)), rows, plan.join);
      const joined = at.flatMap((i) => (typeof i === "number" ? [rows[i]!] : []));
      const carried = new Set([...plan.join.map((pair) => pair.row), ...mine.flatMap((entry) => Object.keys(payloadObject(entry.payload_preview) ?? {}))]);
      const fields = query.view.row ? contractFields.get(`Contract:${query.view.row}`) ?? null : null;
      for (const column of worklistColumns(query.view, orderFields(query.definition, query.view), fields, joined, carried)) {
        const prior = columns.get(column.name);
        columns.set(column.name, prior ? { ...prior, shown: prior.shown || column.shown } : column);
      }
    }
    const rowIndex = new Map<string, number | null | undefined>();
    for (const [key, { part, join }] of byKey) {
      const mine = entries.filter((entry) => stepKey(entry.item) === key);
      if (!part.landed) continue;
      joinRows(mine.map((entry) => payloadObject(entry.payload_preview)), part.rows, join).forEach((i, n) => {
        // a missing row in a partial answer says nothing: the row may be past the read
        rowIndex.set(mine[n]!.item.item_id, i === null && part.partial ? undefined : i);
      });
    }
    const list = [...columns.values()];
    const decimals = new Map<string, number>();
    for (const column of list) {
      if (!isNumberType(column.type)) continue;
      decimals.set(column.name, columnDecimals([...byKey.values()].flatMap(({ part }) => part.rows.map((row) => row[column.name]))));
    }
    const partOf = (entry: Entry) => byKey.get(stepKey(entry.item))?.part;
    return {
      columns: list,
      rowOf: (entry) => {
        const i = rowIndex.get(entry.item.item_id);
        return typeof i === "number" ? partOf(entry)!.rows[i] : i;
      },
      queryOf: (entry) => partOf(entry)?.query ?? null,
      rankOf: (entry) => {
        const i = rowIndex.get(entry.item.item_id);
        return typeof i === "number" ? i : undefined;
      },
      parts: [...byKey.values()].map(({ part }) => part),
      decimals,
    };
  }, [plans, reads.results, rowContracts, contracts.results, entries]);
}

/** A numeric text with `decimals` places (padded, never rounded through a float). */
function fixed(text: string, decimals: number): string {
  if (!/^-?\d+(\.\d+)?$/.test(text)) return text;
  const [whole, part = ""] = text.split(".");
  return decimals === 0 ? whole! : `${whole}.${part.padEnd(decimals, "0")}`;
}

/** One row field's value, by its row Contract type: numbers aligned to the column's decimals, dates as dates, the rest as served. */
function RowValue({ value, column, decimals }: { value: unknown; column: WorklistColumn; decimals: number }) {
  if (value === null || value === undefined || value === "") return <span className="text-zinc-600">—</span>;
  if (isNumberType(column.type) && (typeof value === "string" || typeof value === "number")) return <span>{fixed(String(value), decimals)}</span>;
  if (isDateType(column.type) && typeof value === "string") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? <span>{value}</span> : <span title={value}>{date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" })}</span>;
  }
  return <ShownValue value={value} />;
}

/** The row fields an item does not carry, as columns; an item its Query no longer lists says so in the first shown one. */
function worklistColumnsFor(worklist: Worklist): Column<Entry>[] {
  const first = worklist.columns.find((column) => column.shown)?.name ?? worklist.columns[0]?.name;
  return worklist.columns.map((column) => ({
    id: `row.${column.name}`,
    header: <span className="font-mono text-[11.5px] font-normal">{column.name}</span>,
    label: column.name,
    title: [column.description, `${column.name}${column.type ? ` · ${column.type}` : ""} · from the Line's Query, as it reads now`].filter(Boolean).join("\n"),
    numeric: isNumberType(column.type),
    defaultHidden: !column.shown,
    className: "whitespace-nowrap text-[12px]",
    cell: (entry) => {
      const row = worklist.rowOf(entry);
      if (row === null)
        return column.name === first ? (
          <span className="text-[11px] text-zinc-500" title="The Line's Query no longer lists this item: judged since, or no longer over the Line's threshold">
            No longer in <span className="font-mono">{worklist.queryOf(entry)}</span>
          </span>
        ) : null;
      if (row === undefined) return null;
      return <RowValue value={row[column.name]} column={column} decimals={worklist.decimals.get(column.name) ?? 0} />;
    },
  }));
}

/** What the header says about the worklist: parameters it could not resolve, an answer that is partial. */
function WorklistNotes({ worklist }: { worklist: Worklist }) {
  const notes = worklist.parts.flatMap((part) => {
    if (part.blocked.length > 0)
      return [
        <span key={`${part.line}-blocked`} title={`The Query's parameters the Line does not serve: ${part.blocked.join(", ")}`}>
          No current fields for <span className="font-mono">{part.line}</span>: its Query needs <span className="font-mono">{part.blocked.join(", ")}</span>
        </span>,
      ];
    if (part.partial)
      return [
        <span key={`${part.line}-partial`} title="The Query answered more rows than one read returns; items past them show no current fields">
          <span className="font-mono">{part.query}</span> read in part ({part.rows.length} rows)
        </span>,
      ];
    return [];
  });
  if (notes.length === 0) return null;
  return <span className="inline-flex flex-wrap items-baseline gap-x-3 text-zinc-500">{notes}</span>;
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
  /** How many of `lead` name Subjects (the worklist's columns follow them). */
  subjects: number;
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
    subjects: kept.filter((column) => named(column.name)).length,
    constant,
    line: lines.size === 1 ? [...lines][0]! : null,
    decided: entries.some((entry) => entry.item.disposition),
    anyNonObject: payloads.some((payload) => payload === null),
    long,
  };
}

function inboxColumns(
  shape: PageShape,
  linePrefix: string,
  fieldsOf: (envelope: Envelope) => ReadonlyMap<string, SubjectField>,
  found: ReadonlyMap<string, string>,
  worklist: Worklist,
): Column<Entry>[] {
  const payloadColumn = (column: PayloadColumn): Column<Entry> => {
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
  };
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
    // what the item is about, then its current row from the Line's Query, then the item's other fields
    ...shape.lead.slice(0, shape.subjects).map(payloadColumn),
    ...worklistColumnsFor(worklist),
    ...shape.lead.slice(shape.subjects).map(payloadColumn),
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
  complete = false,
  urlKey = "inbox",
  label = "Inbox",
}: {
  entries: readonly Entry[];
  line?: string | undefined;
  linePrefix?: string;
  count?: ReactNode;
  /** The page holds every item the filter matches (no other daemon page): only then may the worklist order it. */
  complete?: boolean;
  urlKey?: string;
  label?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [params, setParams] = useSearchParams();
  const definitions = useItemDefinitions(entries);
  const worklist = useWorklist(entries, definitions);
  const lookups = useMemo(
    () => keyLookups(entries.map((entry) => ({ payload: payloadObject(entry.payload_preview), fields: definitions.subjectFieldsOf(entry.item) }))),
    [entries, definitions],
  );
  const found = useKeySubjects(lookups);
  const shape = useMemo(() => pageShape(entries, definitions.columns, definitions.subjectFieldsOf), [entries, definitions]);
  const columns = useMemo(() => inboxColumns(shape, linePrefix, definitions.subjectFieldsOf, found, worklist), [shape, linePrefix, definitions, found, worklist]);
  // The Query's order is offered for one Line whose items are all on this page; across daemon pages the daemon's order stands.
  const orderable = line !== undefined && complete && worklist.parts.length === 1 && worklist.parts[0]!.landed && worklist.parts[0]!.blocked.length === 0;
  const orderKey = `${urlKey ? `${urlKey}.` : ""}order`;
  const byWorklist = orderable && params.get(orderKey) !== "posted";
  const rows = useMemo(() => {
    if (!byWorklist) return entries;
    const rank = (entry: Entry) => worklist.rankOf(entry) ?? Number.POSITIVE_INFINITY;
    // items the Query no longer lists keep the daemon's order, after the listed ones
    return [...entries].sort((a, b) => rank(a) - rank(b));
  }, [byWorklist, entries, worklist]);
  const setOrder = (worklistOrder: boolean) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (worklistOrder) next.delete(orderKey);
        else next.set(orderKey, "posted");
        return next;
      },
      { replace: true },
    );
  const query = worklist.parts[0]?.query;
  return (
    <>
      <DataTable
        rows={rows}
        columns={columns}
        rowKey={(entry) => entry.item.item_id}
        rowLabel={(entry) => entry.item.item_id}
        rowClassName={(entry) => (entry.item.status === "unread" ? "text-zinc-100" : "text-zinc-500")}
        urlKey={urlKey}
        apply="external"
        label={label}
        maxHeight="none"
        count={count}
        note={
          <span className="inline-flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {orderable ? (
              <span className="inline-flex items-center gap-1.5" role="group" aria-label="Order">
                <button className={toggleChipClass(byWorklist)} aria-pressed={byWorklist} onClick={() => setOrder(true)} title={`The order of ${query}, as its author set it`}>
                  In worklist order
                </button>
                <button className={toggleChipClass(!byWorklist)} aria-pressed={!byWorklist} onClick={() => setOrder(false)} title="The daemon's order: by when each item was last posted">
                  Newest posted first
                </button>
              </span>
            ) : (
              <span className="text-zinc-500" title={worklist.parts.length > 0 && line !== undefined && !complete ? "Worklist order needs every item on one page; across daemon pages the daemon's order stands" : "The daemon's order: by when each item was last posted"}>
                Newest posted first
              </span>
            )}
            <Shared shape={shape} filtered={line !== undefined} />
            <WorklistNotes worklist={worklist} />
          </span>
        }
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
