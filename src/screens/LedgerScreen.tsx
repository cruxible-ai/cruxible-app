import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGenerations, useInstanceId } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { ChangeAuthor } from "@/components/ChangeAuthor";
import { DataTable, type Column } from "@/components/DataTable";
import { LongText } from "@/components/LongText";
import { Page, PageHeader } from "@/components/Page";
import { LoadState, Panel } from "@/components/Panel";
import { ProposalPeek } from "@/components/ProposalList";
import { RefLink } from "@/components/RefLink";
import { withAt } from "@/lib/at";
import { proposalRun, proposalWords, type Words } from "@/lib/change-sets";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { Pager } from "./ProposalsScreen";
import { useCursorStack } from "@/lib/usePaging";

type Generation = Schemas["OrientGeneration"];

/**
 * The ledger: accepted generations newest first from the pinned generation
 * (orient section=generations, a page of 50 at a time), in the shared table.
 * One row per accepted change set: its sequence (opens the instance pinned
 * there), when, who authored it (a run's Line, a direct run's Procedure, or
 * the proposer) and approved it, the proposal's own words, its change count,
 * commit and proposal; a row expands to the change set (one proposal read,
 * on open). The rows keep the daemon's order: a log has no sort. One run read
 * per generation a run produced (kept once read), one revision read per Line.
 */
export function LedgerScreen() {
  const [cursors, setCursors] = useCursorStack("generations");
  const page = useGenerations(cursors[cursors.length - 1]);
  const instanceId = useInstanceId();
  usePageTitle("Ledger");
  const rows = page.data?.generations ?? [];
  // A row's rationale as its expanded change set read it, when that read carries words past the row's cut:
  // the Description cell shows these, so the rationale reads once.
  const [longer, setLonger] = useState<ReadonlyMap<number, Words>>(new Map());
  const onLongerWords = useCallback(
    (sequence: number) => (words: Words) => setLonger((current) => new Map(current).set(sequence, words)),
    [],
  );
  const columns = useMemo<Column<Generation>[]>(
    () => [
      {
        id: "generation",
        header: "Generation",
        hideable: false,
        className: "whitespace-nowrap",
        cell: (row) => (
          <Link
            to={withAt(`/i/${instanceId}`, String(row.sequence))}
            className="font-mono text-zinc-200 hover:underline"
            title="Open the instance pinned at this generation"
          >
            g{row.sequence}
          </Link>
        ),
      },
      {
        id: "accepted",
        header: "Accepted",
        className: "w-36 whitespace-nowrap text-zinc-500",
        cell: (row) => <span title={row.accepted_at}>{formatDateTime(row.accepted_at)}</span>,
      },
      {
        id: "author",
        header: "Author",
        title: "A run's Line, a direct run's Procedure, or the proposer; then the approvers",
        cell: (row) => <Author row={row} />,
      },
      {
        id: "description",
        header: "Description",
        title: "The proposal's own words",
        cell: (row) => {
          const read = longer.get(row.sequence);
          const words = read ? proposalWords(read.text, read.truncated) : proposalWords(row.because, row.because_truncated ?? false);
          return words ? <LongText text={words} lines={2} className="text-zinc-200" /> : <span className="text-zinc-600">—</span>;
        },
      },
      {
        id: "changes",
        header: "Changes",
        numeric: true,
        className: "text-zinc-300",
        cell: (row) => row.members ?? 0,
      },
      {
        id: "commit",
        header: "Commit",
        className: "whitespace-nowrap",
        cell: (row) => (
          <span className="font-mono text-[12px] text-zinc-500" title={row.git_oid}>
            {row.git_oid.slice(0, 12)}
          </span>
        ),
      },
      {
        id: "proposal",
        header: "Proposal",
        className: "whitespace-nowrap",
        cell: (row) => (row.proposal ? <RefLink value={row.proposal} short className="text-[12px]" /> : <span className="text-zinc-600">—</span>),
      },
    ],
    [instanceId, longer],
  );
  return (
    <Page>
      <PageHeader
        title="Ledger"
        description="Accepted generations, newest first. Open a generation to read the instance as it stood there."
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
          <DataTable
            rows={rows}
            columns={columns}
            rowKey={(row) => String(row.sequence)}
            rowLabel={(row) => `generation ${row.sequence}`}
            label="Generations"
            urlKey="ledger"
            canExpand={(row) => Boolean(row.proposal)}
            expanded={(row) => (row.proposal ? <ProposalPeek
                  id={row.proposal}
                  indent="ml-0"
                  rowWords={row.because ? { text: row.because, truncated: row.because_truncated ?? false } : null}
                  onLongerWords={onLongerWords(row.sequence)}
                  origin={false}
                /> : null)}
            empty="None"
          />
        </Panel>
      )}
    </Page>
  );
}

/** Who authored the generation and approved it. */
function Author({ row }: { row: Generation }) {
  const source = proposalRun(row.because);
  if (!source && !row.proposer && (row.approvals ?? []).length === 0) return <span className="text-zinc-600">—</span>;
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-zinc-400">
      <ChangeAuthor source={source} sequence={row.sequence} actor={row.proposer ?? null} approvers={row.approvals ?? []} authorLabel={false} />
    </span>
  );
}
