import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProposals } from "@/api/hooks";
import type { ProposalStatus } from "@/api/schemas";
import { toggleChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { ProposalList } from "@/components/ProposalList";
import { usePageTitle } from "@/lib/usePageTitle";

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
      <span>page {index + 1}</span>
      {older && (
        <button onClick={older} className="hover:text-zinc-200">
          Next page →
        </button>
      )}
    </span>
  );
}

const STATUSES: ProposalStatus[] = ["open", "incomplete", "settled"];

/** Proposals by status, a page at a time. */
export function ProposalsScreen() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("status");
  const status: ProposalStatus = STATUSES.includes(raw as ProposalStatus) ? (raw as ProposalStatus) : "open";
  const { list, index, older, newer, reset } = usePagedProposals(status);
  usePageTitle("Proposals");
  return (
    <div className="max-w-6xl space-y-3">
      <header className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Proposals</h1>
        <span className="flex gap-1.5">
          {STATUSES.map((name) => (
            <button
              key={name}
              onClick={() => {
                reset();
                const updated = new URLSearchParams(params);
                updated.set("status", name);
                setParams(updated);
              }}
              className={toggleChipClass(name === status)}
            >
              {name}
            </button>
          ))}
        </span>
        <span className="ml-auto">
          <Pager index={index} older={older} newer={newer} />
        </span>
      </header>
      {list.isPending && <LoadState />}
      {list.error && <LoadState error={list.error} />}
      {list.data && (
        <Panel title={status} meta={<span>{list.data.entries.length} on this page</span>}>
          {list.data.entries.length === 0 && <EmptyState>No {status} proposals.</EmptyState>}
          <ProposalList entries={list.data.entries} />
        </Panel>
      )}
    </div>
  );
}
