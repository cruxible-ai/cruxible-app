import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProposals } from "@/api/hooks";
import type { ProposalStatus } from "@/api/schemas";
import { toggleChipClass } from "@/components/Chip";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { ProposalList } from "@/components/ProposalList";
import { usePageTitle } from "@/lib/usePageTitle";
import { PROPOSAL_TABS, term } from "@/lib/vocabulary";

const PAGE = 50;

/**
 * Proposals by status, a page at a time. The daemon builds the whole
 * proposal inventory to serve each page (service/proposals/proposals.py);
 * the console reads one page per load.
 */
function usePagedProposals(status: ProposalStatus) {
  const [cursors, setCursors] = useState<string[]>([]);
  const list = useProposals(status, PAGE, cursors[cursors.length - 1]);
  return {
    list,
    index: cursors.length,
    reset: () => setCursors([]),
    older: list.data?.next_cursor ? () => setCursors((c) => [...c, list.data!.next_cursor!]) : null,
    newer: cursors.length ? () => setCursors((c) => c.slice(0, -1)) : null,
  };
}

export function Pager({ index, older, newer }: { index: number; older: (() => void) | null; newer: (() => void) | null }) {
  return (
    <span className="flex gap-2 text-[12px] text-zinc-500">
      {newer && (
        <button onClick={newer} className="hover:text-zinc-200">
          ← Previous page
        </button>
      )}
      <span>Page {index + 1}</span>
      {older && (
        <button onClick={older} className="hover:text-zinc-200">
          Next page →
        </button>
      )}
    </span>
  );
}

const STATUSES: readonly ProposalStatus[] = PROPOSAL_TABS;

/** Proposals by status, a page at a time. */
export function ProposalsScreen() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("status");
  const status: ProposalStatus = STATUSES.includes(raw as ProposalStatus) ? (raw as ProposalStatus) : "open";
  const { list, index, older, newer, reset } = usePagedProposals(status);
  usePageTitle("Proposals");
  return (
    <Page>
      <PageHeader
        title="Proposals"
        description="Changes submitted for acceptance, by status. Approving, activating and rejecting stay on the CLI and MCP."
        actions={<Pager index={index} older={older} newer={newer} />}
      >
        <div className="mt-3 flex gap-1.5">
          {STATUSES.map((name) => (
            <button
              key={name}
              onClick={() => {
                reset();
                // a tab is another list: its table starts unsorted and unfiltered
                const updated = new URLSearchParams();
                const at = params.get("at");
                if (at !== null) updated.set("at", at);
                updated.set("status", name);
                setParams(updated);
              }}
              className={toggleChipClass(name === status)}
            >
              {term("proposal", name).word}
            </button>
          ))}
        </div>
      </PageHeader>
      {list.isPending && <LoadState />}
      {list.error && <LoadState error={list.error} />}
      {list.data && (
        <Panel title={term("proposal", status).word} meta={<span>{list.data.entries.length} on this page</span>}>
          {list.data.entries.length === 0 ? (
            <EmptyState>None {status === "settled" ? "settled" : status === "open" ? "waiting for review" : "incomplete"}</EmptyState>
          ) : (
            <ProposalList
              entries={list.data.entries}
              partial={
                list.data.next_cursor || index > 0
                  ? `${index === 0 ? "the first" : "this page of"} ${list.data.entries.length} ${term("proposal", status).word.toLowerCase()}`
                  : null
              }
            />
          )}
        </Panel>
      )}
    </Page>
  );
}
