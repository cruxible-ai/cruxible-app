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
import { formatDateTime } from "@/lib/text";
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
    <div className="py-1.5 text-[13px]">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        {row.proposal ? (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={`${open ? "Collapse" : "Expand"} generation ${row.sequence}`}
            className="text-zinc-500 hover:text-zinc-200"
          >
            {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <span className="w-3.5" />
        )}
        <Link
          to={withAt(`/i/${instanceId}`, String(row.sequence))}
          className="w-12 font-mono text-zinc-200 hover:underline"
          title="Open the instance pinned at this generation"
        >
          g{row.sequence}
        </Link>
        <span className="font-mono text-[12px] text-zinc-500" title={row.git_oid}>
          {row.git_oid.slice(0, 12)}
        </span>
        <span className="w-36 text-zinc-500" title={row.accepted_at}>
          {formatDateTime(row.accepted_at)}
        </span>
        {row.proposer && <span className="font-mono text-[12px] text-zinc-300">{row.proposer}</span>}
        {(row.approvals?.length ?? 0) > 0 && (
          <span className="text-[12px] text-zinc-500">approved by {row.approvals!.join(", ")}</span>
        )}
        <span className="ml-auto text-[12px] text-zinc-500">
          {row.members ?? 0} member{row.members === 1 ? "" : "s"}
        </span>
      </div>
      {row.because && (
        <div className="ml-[5.25rem] whitespace-pre-wrap text-[12px] text-zinc-400">
          {row.because}
          {row.because_truncated && "…"}
        </div>
      )}
      {row.proposal && (
        <div className="ml-[5.25rem] text-[12px]">
          <RefLink value={row.proposal}>
            <span className="font-mono text-[11px] text-zinc-500">{row.proposal.slice(0, 23)}…</span>
          </RefLink>
        </div>
      )}
      {open && row.proposal && <ProposalPeek id={row.proposal} />}
    </div>
  );
}
