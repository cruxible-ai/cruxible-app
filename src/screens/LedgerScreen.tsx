import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useGenerations, useInstanceId } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { ChangeAuthor } from "@/components/ChangeAuthor";
import { ChangeEntry, ChangeLog, HeaderDot as Dot, HeaderLabel } from "@/components/ChangeLog";
import { Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { ProposalPeek } from "@/components/ProposalList";
import { RefLink } from "@/components/RefLink";
import { withAt } from "@/lib/at";
import { proposalRun, proposalWords } from "@/lib/change-sets";
import { formatWhen } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { Pager } from "./ProposalsScreen";

type Generation = Schemas["OrientGeneration"];

/**
 * The ledger: accepted generations newest first from the pinned generation
 * (orient section=generations, a page of 50 at a time), as a change log.
 * Each entry is one accepted change set: its sequence (opens the instance
 * pinned there) and when, who authored it (a run's Line, a direct run's
 * Procedure, or the proposer) and approved it, its commit and proposal; the
 * proposal's own words under that; its change count opens the change set
 * (one proposal read, on open). One run read per generation a run produced
 * (kept once read), one revision read per Line.
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
        info="Accepted generations, newest first. Open a generation to read the instance as it stood there."
        infoLabel="About the ledger"
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
          {rows.length === 0 && <EmptyState>None</EmptyState>}
          <ChangeLog label="Generations">
            {rows.map((row) => (
              <GenerationEntry key={row.sequence} row={row} />
            ))}
          </ChangeLog>
        </Panel>
      )}
    </Page>
  );
}

/** One accepted generation as a ChangeLog entry; its change count opens the proposal's change set. */
function GenerationEntry({ row }: { row: Generation }) {
  const instanceId = useInstanceId();
  const [open, setOpen] = useState(false);
  const source = proposalRun(row.because);
  const words = proposalWords(row.because, row.because_truncated ?? false);
  const members = row.members ?? 0;
  const count = `${members} change${members === 1 ? "" : "s"}`;
  return (
    <ChangeEntry
      header={
        <>
          <HeaderLabel>Generation</HeaderLabel>
          <Link
            to={withAt(`/i/${instanceId}`, String(row.sequence))}
            className="font-mono text-zinc-200 hover:underline"
            title="Open the instance pinned at this generation"
          >
            g{row.sequence}
          </Link>
          <Dot />
          <span className="text-zinc-500" title={row.accepted_at}>
            {formatWhen(row.accepted_at)}
          </span>
          {(source || row.proposer) && (
            <>
              <Dot />
              <ChangeAuthor source={source} sequence={row.sequence} actor={row.proposer ?? null} approvers={row.approvals ?? []} />
            </>
          )}
          <Dot />
          {row.proposal ? (
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={`${open ? "Collapse" : "Expand"} generation ${row.sequence}`}
              className="inline-flex items-baseline gap-0.5 text-zinc-400 hover:text-zinc-200"
              title="Show the change set"
            >
              {open ? (
                <ChevronDown className="relative top-[2px] h-3 w-3 self-start" aria-hidden />
              ) : (
                <ChevronRight className="relative top-[2px] h-3 w-3 self-start" aria-hidden />
              )}
              {count}
            </button>
          ) : (
            <span className="text-zinc-500">{count}</span>
          )}
          <Dot />
          {/* a label wraps with its value */}
          <span className="inline-flex items-baseline gap-x-3 whitespace-nowrap">
            <HeaderLabel>Commit</HeaderLabel>
            <span className="font-mono text-[12px] text-zinc-500" title={row.git_oid}>
              {row.git_oid.slice(0, 12)}
            </span>
          </span>
          {row.proposal && (
            <>
              <Dot />
              <span className="inline-flex items-baseline gap-x-3 whitespace-nowrap">
                <HeaderLabel>Proposal</HeaderLabel>
                <RefLink value={row.proposal} short className="text-[12px]" />
              </span>
            </>
          )}
        </>
      }
      notes={words ? [words] : []}
    >
      {open && row.proposal && <ProposalPeek id={row.proposal} indent="ml-0" skipWords={row.because} origin={false} />}
    </ChangeEntry>
  );
}
