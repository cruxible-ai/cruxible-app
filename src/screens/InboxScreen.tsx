import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInbox, useLines, useNext } from "@/api/hooks";
import { NEXT_PAGE } from "@/api/requests";
import { toggleChipClass } from "@/components/Chip";
import { InboxTable, INBOX_TERMS } from "@/components/inbox/InboxTable";
import { InfoButton } from "@/components/InfoButton";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Pager } from "@/screens/ProposalsScreen";
import { INBOX_LIST_PAGE, INBOX_STATUSES, totalUnread, type InboxFilterStatus } from "@/lib/inbox";
import { sharedPrefix } from "@/lib/evidence-flow";
import { lineName } from "@/lib/lines";
import { term } from "@/lib/vocabulary";
import { usePageTitle } from "@/lib/usePageTitle";

export { INBOX_TERMS };

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
  const lineNames = useMemo(() => (lines.data?.rows ?? []).map((row) => lineName(row.line)).sort(), [lines.data]);
  const linePrefix = sharedPrefix(lineNames);

  const entries = useMemo(() => inbox.data?.entries ?? [], [inbox.data]);

  const setFilter = (key: "line" | "status", value: string | undefined) => {
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
            <InboxTable
              key={filterKey}
              entries={entries}
              line={line}
              linePrefix={linePrefix}
              count={`Items ${first + 1}–${first + entries.length}${nextCursor ? "" : ` of ${first + entries.length}`}`}
            />
          )}
        </Panel>
      )}
    </Page>
  );
}
