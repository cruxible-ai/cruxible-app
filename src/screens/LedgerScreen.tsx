import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGenerations, useInstanceId } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { Page, PageHeader } from "@/components/Page";
import { LoadState, Panel } from "@/components/Panel";
import { DataTable, type Column } from "@/components/DataTable";
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
 * (orient section=generations, a page of 50 at a time), in the shared table.
 * Each row is one accepted change set: its sequence (opens the instance
 * pinned there) and when, the reason, the proposer and approvals, how many
 * changes, the oid and the proposal; a row expands to the proposal's change
 * set. The daemon orders the ledger by sequence only, so a sort or filter
 * covers the page in hand and says so.
 */
export function LedgerScreen() {
  const [cursors, setCursors] = useState<string[]>([]);
  const page = useGenerations(cursors[cursors.length - 1]);
  const instanceId = useInstanceId();
  usePageTitle("Ledger");
  const rows = page.data?.generations ?? [];
  const more = Boolean(page.data?.next_cursor) || cursors.length > 0;
  const columns = useMemo<Column<Generation>[]>(
    () => [
      {
        id: "generation",
        header: "Generation",
        title: "Its sequence (opens the instance pinned there) and when it was accepted",
        hideable: false,
        numeric: false,
        sortValue: (row) => row.sequence,
        cell: (row) => (
          <>
            <Link
              to={withAt(`/i/${instanceId}`, String(row.sequence))}
              className="font-mono text-zinc-100 hover:underline"
              title="Open the instance pinned at this generation"
            >
              g{row.sequence}
            </Link>
            <div className="t-meta whitespace-nowrap" title={row.accepted_at}>
              {formatWhen(row.accepted_at)}
            </div>
          </>
        ),
      },
      {
        id: "reason",
        header: "Reason",
        sortValue: (row) => row.because ?? null,
        filter: { kind: "text", text: (row) => row.because ?? "" },
        className: "min-w-[16rem]",
        cell: (row) =>
          row.because ? (
            <LongText text={`${row.because}${row.because_truncated ? "…" : ""}`} lines={2} className="text-zinc-200" />
          ) : (
            <span className="text-zinc-500">No reason recorded.</span>
          ),
      },
      {
        id: "proposer",
        header: "Proposer",
        sortValue: (row) => row.proposer ?? null,
        filter: { kind: "enum", values: (row) => (row.proposer ? [row.proposer] : []) },
        className: "font-mono text-[12px] text-zinc-400",
        cell: (row) => row.proposer ?? <span className="font-sans text-zinc-600">—</span>,
      },
      {
        id: "approvals",
        header: "Approved by",
        sortValue: (row) => (row.approvals ?? []).join(", ") || null,
        filter: { kind: "enum", values: (row) => row.approvals ?? [] },
        className: "text-[12px] text-zinc-400",
        cell: (row) => ((row.approvals?.length ?? 0) > 0 ? row.approvals!.join(", ") : <span className="text-zinc-600">—</span>),
      },
      {
        id: "changes",
        header: "Changes",
        numeric: true,
        sortValue: (row) => row.members ?? 0,
        className: "whitespace-nowrap text-[12px] text-zinc-400",
        cell: (row) => `${row.members ?? 0} change${row.members === 1 ? "" : "s"}`,
      },
      {
        id: "commit",
        header: "Commit",
        sortValue: (row) => row.git_oid,
        filter: { kind: "text", text: (row) => row.git_oid },
        className: "font-mono text-[12px] text-zinc-500",
        cell: (row) => <span title={row.git_oid}>{row.git_oid.slice(0, 12)}</span>,
      },
      {
        id: "proposal",
        header: "Proposal",
        sortValue: (row) => row.proposal ?? null,
        className: "whitespace-nowrap",
        cell: (row) => (row.proposal ? <RefLink value={row.proposal} short className="text-[12px]" /> : <span className="text-zinc-600">—</span>),
      },
    ],
    [instanceId],
  );
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
          <DataTable
            rows={rows}
            columns={columns}
            rowKey={(row) => String(row.sequence)}
            rowLabel={(row) => `generation ${row.sequence}`}
            label="Generations"
            partial={more ? (cursors.length === 0 ? `the newest ${rows.length} generations` : `this page of ${rows.length} generations`) : null}
            canExpand={(row) => Boolean(row.proposal)}
            expanded={(row) => (row.proposal ? <ProposalPeek id={row.proposal} indent="ml-0" skipWords={row.because} /> : null)}
            empty="No accepted generations."
          />
        </Panel>
      )}
    </Page>
  );
}
