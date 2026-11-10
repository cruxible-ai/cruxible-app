import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetBatch, useInbox, useInboxItem, useLines } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip, toggleChipClass } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { Pager } from "@/screens/ProposalsScreen";
import {
  INBOX_LIST_PAGE,
  INBOX_STATUSES,
  inboxContract,
  isSubjectType,
  payloadColumns,
  payloadObject,
  type InboxFilterStatus,
  type PayloadColumn,
} from "@/lib/inbox";
import { lineName, shortRunId } from "@/lib/lines";
import { formatDateTime } from "@/lib/text";
import { term } from "@/lib/vocabulary";
import { usePageTitle } from "@/lib/usePageTitle";

type Entry = Schemas["InboxListEntry"];
type Disposition = NonNullable<Schemas["InboxItemEnvelope"]["disposition"]>;

/** One payload value: a Subject-typed field links to the Subject; other text stays text. */
function PayloadValue({ value, column }: { value: unknown; column: PayloadColumn }) {
  if (value === null || value === undefined) return <span className="text-zinc-600">—</span>;
  if (typeof value === "string") {
    return isSubjectType(column.type) ? <RefLink value={value} /> : <span>{value}</span>;
  }
  return <ShownValue value={value} />;
}

/** The latest decision on an item: why it was dismissed, or where it is linked, then who and when. */
function DecisionCell({ disposition }: { disposition: Disposition | null | undefined }) {
  if (!disposition) return <span className="text-zinc-600">—</span>;
  return (
    <span className="flex flex-col gap-0.5">
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

function inboxColumns(payload: readonly PayloadColumn[], showLine: boolean): Column<Entry>[] {
  const columns: (Column<Entry> | null)[] = [
    {
      id: "status",
      header: "State",
      className: "whitespace-nowrap",
      cell: (entry) => <Chip concept="inbox" value={entry.item.status} />,
    },
    showLine
      ? {
          id: "line",
          header: "Line",
          className: "whitespace-nowrap",
          cell: (entry) => (
            <RefLink value={entry.item.line.startsWith("Line:") ? entry.item.line : `Line:${entry.item.line}`}>
              <span className="font-mono text-[12px]">{lineName(entry.item.line)}</span>
            </RefLink>
          ),
        }
      : null,
    ...payload.map(
      (column): Column<Entry> => ({
        id: `payload.${column.name}`,
        header: <span className="font-mono">{column.name}</span>,
        label: column.name,
        title: column.type ? `${column.name} · ${column.type}` : `${column.name} · not in the item Contract`,
        className: "whitespace-nowrap text-[12px]",
        cell: (entry) => <PayloadValue value={payloadObject(entry.payload_preview)?.[column.name]} column={column} />,
      }),
    ),
    // a payload that is not an object (or was cut to a preview) reads whole here
    {
      id: "payload",
      header: "Payload",
      title: "The payload when it is not an object of fields; open the row for the whole payload",
      defaultHidden: payload.length > 0,
      className: "max-w-[28rem] text-[12px]",
      cell: (entry) => (payloadObject(entry.payload_preview) ? null : <ShownValue value={entry.payload_preview} />),
    },
    {
      id: "decision",
      header: "Decision",
      title: "The agent's latest decision on the item",
      className: "min-w-[10rem] max-w-[24rem] text-[12px]",
      cell: (entry) => <DecisionCell disposition={entry.item.disposition} />,
    },
    {
      id: "seen",
      header: "Seen",
      title: "Runs that posted it",
      numeric: true,
      className: "text-[12px] text-zinc-400",
      cell: (entry) => entry.item.occurrences,
    },
    {
      id: "last",
      header: "Last posted",
      className: "whitespace-nowrap text-[12px] text-zinc-500",
      cell: (entry) => {
        const last = entry.item.recent_sightings[0];
        return last ? (
          <span title={last.posted_at}>
            {formatDateTime(last.posted_at)} ·{" "}
            <RefLink value={`ProcedureRun:${last.run_id}`}>
              <span className="font-mono" title={last.run_id}>
                {shortRunId(last.run_id)}
              </span>
            </RefLink>
          </span>
        ) : (
          <span className="text-zinc-600">—</span>
        );
      },
    },
    {
      id: "item",
      header: "Item id",
      defaultHidden: true,
      className: "font-mono text-[11px] text-zinc-500",
      cell: (entry) => <span title={entry.item.item_id}>{entry.item.item_id.slice(0, 16)}…</span>,
    },
  ];
  return columns.filter((column): column is Column<Entry> => column !== null);
}

/** An opened item: its whole payload (one read by id). */
function ItemDetail({ itemId }: { itemId: string }) {
  const item = useInboxItem(itemId);
  return (
    <div className="border border-zinc-800 bg-zinc-900/40 p-1.5 text-[12px]">
      {item.isPending && <LoadState />}
      {item.error && <LoadState error={item.error} />}
      {item.data && <pre className="max-h-64 overflow-auto whitespace-pre-wrap font-mono text-[11px] text-zinc-400">{JSON.stringify(item.data.payload, null, 2)}</pre>}
    </div>
  );
}

/**
 * Every Line's inbox items, a daemon page at a time, filtered by Line and
 * status on the daemon. Each item's payload fields are columns, named by the
 * item Contract its posting node declares; a Subject-typed field links to
 * the Subject. Items are in the order the daemon serves them (most recently
 * posted first); the page never reorders them.
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
  const [open, setOpen] = useState<string | null>(null);

  const entries = useMemo(() => inbox.data?.entries ?? [], [inbox.data]);
  // the posting Procedures' specs name each node's item Contract; their cards name its fields
  const procedures = useMemo(() => [...new Set(entries.map((entry) => entry.item.procedure))], [entries]);
  const specs = useGetBatch(procedures);
  const contractRefs = useMemo(() => {
    const refs = new Set<string>();
    // get-batch keeps the order of the refs asked
    const specOf = new Map(procedures.map((ref, i) => [ref, cardOf(specs.results[i], "procedure")?.authored]));
    for (const entry of entries) {
      const spec = specOf.get(entry.item.procedure);
      const contract = inboxContract(spec, entry.item.node_id);
      if (contract) refs.add(`Contract:${contract}`);
    }
    return [...refs];
  }, [entries, procedures, specs.results]);
  const contracts = useGetBatch(contractRefs);
  const columns = useMemo(() => {
    const fields = contracts.results.flatMap((result) => {
      const card = cardOf(result, "contract");
      return card ? [card.fields] : [];
    });
    return inboxColumns(payloadColumns(fields, entries.map((entry) => payloadObject(entry.payload_preview))), line === undefined);
  }, [contracts.results, entries, line]);

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
  const lineNames = (lines.data?.rows ?? []).map((row) => lineName(row.line)).sort();

  return (
    <Page>
      <PageHeader
        title="Inbox"
        description="Items Lines posted for an agent to read, from every Line. Deciding on an item stays on the CLI and MCP."
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
          <label className="flex items-center gap-2 text-[12px] text-zinc-500">
            Line
            <select
              aria-label="Line"
              value={line ?? ""}
              onChange={(event) => setFilter("line", event.target.value || undefined)}
              className="border border-zinc-700 bg-zinc-950 px-2 py-1 font-mono text-[12px] text-zinc-100"
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
          <div className="flex gap-1.5" role="group" aria-label="Status">
            <button onClick={() => setFilter("status", undefined)} className={toggleChipClass(status === undefined)} aria-pressed={status === undefined}>
              All
            </button>
            {INBOX_STATUSES.map((name) => (
              <button key={name} onClick={() => setFilter("status", name)} className={toggleChipClass(status === name)} aria-pressed={status === name}>
                {term("inbox", name).word}
              </button>
            ))}
          </div>
        </div>
      </PageHeader>
      {inbox.isPending && <LoadState />}
      {inbox.error && <LoadState error={inbox.error} />}
      {inbox.data && (
        <Panel title="Items" meta={<span title="The daemon's order: by when each item was last posted">Newest posted first</span>}>
          {entries.length === 0 ? (
            <EmptyState>None</EmptyState>
          ) : (
            <DataTable
              rows={entries}
              columns={columns}
              rowKey={(entry) => entry.item.item_id}
              rowLabel={(entry) => entry.item.item_id}
              urlKey="inbox"
              apply="external"
              label="Inbox"
              maxHeight="none"
              count={`Items ${first + 1}–${first + entries.length}${nextCursor ? "" : ` of ${first + entries.length}`}`}
              open={open}
              onToggle={(id) => setOpen(open === id ? null : id)}
              expanded={(entry) => <ItemDetail itemId={entry.item.item_id} />}
            />
          )}
          {(specs.error || contracts.error) && <LoadState error={specs.error ?? contracts.error} />}
        </Panel>
      )}
    </Page>
  );
}
