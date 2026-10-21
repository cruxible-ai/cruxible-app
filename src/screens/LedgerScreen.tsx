import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useGenerations, useInstanceId } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { ProposalPeek } from "@/components/ProposalList";
import { RefLink } from "@/components/RefLink";
import { withAt } from "@/lib/at";
import { formatWhen } from "@/lib/text";
import { LongText } from "@/components/LongText";
import { usePageTitle } from "@/lib/usePageTitle";
import { Pager } from "./ProposalsScreen";

type Generation = Schemas["OrientGeneration"];

/**
 * The ledger: accepted generations newest first from the pinned generation
 * (orient section=generations, a page of 50 at a time). Each row is one
 * accepted change set: its sequence (opens the instance pinned there), oid,
 * when, the proposal and proposer, approvals, the reason, and how many
 * members it changed; a row expands to the proposal's change set.
 */
export function LedgerScreen() {
  const [cursors, setCursors] = useState<string[]>([]);
  const page = useGenerations(cursors[cursors.length - 1]);
  usePageTitle("Ledger");
  const rows = page.data?.generations ?? [];
  return (
    <Page>
      <PageHeader
        title="Ledger"
        summary="Accepted generations, newest first. Open a generation to read the instance as it stood there."
        actions={
          <Pager
            index={cursors.length}
            newer={cursors.length ? () => setCursors((c) => c.slice(0, -1)) : null}
            older={page.data?.next_cursor ? () => setCursors((c) => [...c, page.data!.next_cursor!]) : null}
          />
        }
      />
      {page.isPending && <LoadState />}
      {page.error && <LoadState error={page.error} />}
      {page.data && (
        <Panel title="Generations" meta={<span>{rows.length} on this page</span>}>
          {rows.length === 0 && <EmptyState>No accepted generations.</EmptyState>}
          <div className="divide-y divide-zinc-800/60">
            {rows.map((row) => (
              <GenerationRow key={row.sequence} row={row} />
            ))}
          </div>
        </Panel>
      )}
    </Page>
  );
}

function GenerationRow({ row }: { row: Generation }) {
  const [open, setOpen] = useState(false);
  const instanceId = useInstanceId();
  return (
    <div className="py-2 text-[13px] first:pt-0 last:pb-0">
      <div className="grid grid-cols-[1rem_6.5rem_minmax(0,1fr)_minmax(10rem,max-content)] items-baseline gap-x-4">
        {row.proposal ? (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={`${open ? "Collapse" : "Expand"} generation ${row.sequence}`}
            aria-expanded={open}
            className="relative top-[2px] text-zinc-500 hover:text-zinc-200"
          >
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span />
        )}
        <div>
          <Link
            to={withAt(`/i/${instanceId}`, String(row.sequence))}
            className="font-mono text-zinc-100 hover:underline"
            title="Open the instance pinned at this generation"
          >
            g{row.sequence}
          </Link>
          <div className="t-meta" title={row.accepted_at}>
            {formatWhen(row.accepted_at)}
          </div>
        </div>
        <div className="min-w-0">
          {row.because ? (
            <LongText text={`${row.because}${row.because_truncated ? "…" : ""}`} lines={2} className="text-zinc-200" />
          ) : (
            <span className="text-zinc-500">No reason recorded.</span>
          )}
          <div className="t-meta mt-0.5 flex flex-wrap gap-x-3">
            {row.proposer && <span className="font-mono text-zinc-400">{row.proposer}</span>}
            {(row.approvals?.length ?? 0) > 0 && <span>approved by {row.approvals!.join(", ")}</span>}
          </div>
        </div>
        <div className="text-right text-[12px]">
          <div className="text-zinc-400">
            {row.members ?? 0} member{row.members === 1 ? "" : "s"}
          </div>
          <div className="flex justify-end gap-2">
            <span className="font-mono text-zinc-500" title={row.git_oid}>
              {row.git_oid.slice(0, 12)}
            </span>
            {row.proposal && <RefLink value={row.proposal} short className="text-[12px]" />}
          </div>
        </div>
      </div>
      {open && row.proposal && <ProposalPeek id={row.proposal} indent="ml-[9.5rem]" skipWords={row.because} />}
    </div>
  );
}
