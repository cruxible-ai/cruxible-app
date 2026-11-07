import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useInstanceId, usePairs } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { InfoButton } from "@/components/InfoButton";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";

type PairEnd = Schemas["GetPairEnd"];
type EndPairs = Schemas["GetEndPairs"];

const kindOf = (ref: string) => ref.slice(0, ref.indexOf("/"));
const idOf = (ref: string) => ref.slice(ref.indexOf("/") + 1);

const PAIR_INFO =
  "A pair Subject is a relationship with facts of its own, keyed by its ends: one Subject per key part. Its ends never change; a new pair of ends is a new pair.";

/**
 * A pair Subject's ends (D-R43): one row per Subject-valued key part, in key
 * order, the part named and the end linked; the key Claim on hover. A retired
 * pair keeps its ends.
 */
export function PairEndsPanel({ ends }: { ends: PairEnd[] }) {
  const columns = useMemo<Column<PairEnd>[]>(
    () => [
      {
        id: "part",
        header: "Key part",
        className: "whitespace-nowrap font-mono text-[12px] text-zinc-300",
        cell: (end) => <span title={end.claim ?? "No live key Claim"}>{end.part}</span>,
      },
      { id: "kind", header: "Kind", className: "whitespace-nowrap font-mono text-[12px] text-zinc-400", cell: (end) => <RefLink value={`SubjectKind:${kindOf(end.subject)}`}>{kindOf(end.subject)}</RefLink> },
      {
        id: "subject",
        header: "Subject",
        className: "break-all",
        cell: (end) => (
          <RefLink value={end.subject}>
            <span className="font-mono text-[13px]">{idOf(end.subject)}</span>
          </RefLink>
        ),
      },
      {
        id: "flags",
        header: "",
        cell: (end) => (
          <span className="flex flex-wrap gap-1.5">
            {(end.flags ?? []).map((flag) => (
              <Chip key={flag} concept="claim" value={flag} />
            ))}
          </span>
        ),
      },
    ],
    [],
  );
  return (
    <Panel
      title={
        <span className="inline-flex items-center gap-1.5">
          Ends
          <InfoButton label="What a pair Subject is">{PAIR_INFO}</InfoButton>
        </span>
      }
      meta={<span>{ends.length} key parts</span>}
    >
      <DataTable rows={ends} columns={columns} rowKey={(end) => end.part} label="Ends" toolbar={false} maxHeight="none" />
    </Panel>
  );
}

interface PairRow {
  kind: string;
  part: string;
  pair: string;
}

function rowsOf(groups: readonly EndPairs[]): PairRow[] {
  return groups.flatMap((group) => group.pairs.map((pair) => ({ kind: group.kind, part: group.part, pair })));
}

/**
 * The live pairs a Subject is an end of, per pair kind and key part. The card
 * lists the first few of each group; past them, "List every pair" pages
 * through `get detail=pairs` with the served cursor (a group cut between
 * pages continues on the next). Pairs whose facts are all hidden (not yet
 * effective, expired, stale, contradicted) are counted, never listed.
 */
export function EndPairsPanel({ subject, groups }: { subject: string; groups: EndPairs[] }) {
  const [paging, setPaging] = useState(false);
  const [cursors, setCursors] = useState<string[]>([]);
  const page = usePairs(paging ? subject : null, cursors[cursors.length - 1]);
  const more = groups.some((group) => group.more);
  const shown = paging ? (page.data?.pairs?.groups ?? []) : groups;
  const hidden = shown.reduce((sum, group) => sum + (group.hidden ?? 0), 0);
  const next = page.data?.next_cursor ?? null;
  return (
    <Panel
      title={
        <span className="inline-flex items-center gap-1.5">
          Pairs
          <InfoButton label="What a pair Subject is">{PAIR_INFO}</InfoButton>
        </span>
      }
      meta={
        hidden > 0 ? (
          <span title="Pairs whose facts are all hidden here (not yet effective, expired, stale or contradicted): counted, not listed">{hidden} hidden</span>
        ) : undefined
      }
    >
      {paging && page.isPending && <LoadState />}
      {paging && page.error && <LoadState error={page.error} />}
      {shown.length === 0 && !(paging && page.isPending) && <EmptyState>None</EmptyState>}
      <PairGroups groups={shown} />
      <div className="mt-1.5 flex flex-wrap gap-3 text-[12px] text-zinc-500">
        {!paging && more && (
          <button onClick={() => setPaging(true)} className="hover:text-zinc-200">
            List every pair →
          </button>
        )}
        {paging && (
          <>
            {cursors.length > 0 && (
              <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
                ← Previous
              </button>
            )}
            <span>Page {cursors.length + 1}</span>
            {next && (
              <button onClick={() => setCursors((c) => [...c, next])} className="hover:text-zinc-200">
                Next →
              </button>
            )}
          </>
        )}
      </div>
    </Panel>
  );
}

/** Pair groups as one table, grouped by pair kind and the key part this Subject fills; each pair's id linked. */
function PairGroups({ groups }: { groups: readonly EndPairs[] }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const rows = useMemo(() => rowsOf(groups), [groups]);
  const byGroup = useMemo(() => new Map(groups.map((g) => [`${g.kind}\n${g.part}`, g] as const)), [groups]);
  const columns = useMemo<Column<PairRow>[]>(
    () => [
      {
        id: "pair",
        header: "Pair",
        className: "break-all",
        cell: (row) => (
          <RefLink value={row.pair}>
            <span className="font-mono text-[12px]">{idOf(row.pair)}</span>
          </RefLink>
        ),
      },
    ],
    [],
  );
  if (rows.length === 0) return null;
  return (
    <DataTable
      rows={rows}
      columns={columns}
      rowKey={(row) => row.pair + "\n" + row.part}
      label="Pairs"
      toolbar={false}
      maxHeight="28rem"
      group={{
        key: (row) => `${row.kind}\n${row.part}`,
        header: (shownRows) => {
          const first = shownRows[0]!;
          const group = byGroup.get(`${first.kind}\n${first.part}`);
          return (
            <span className="text-[12px] text-zinc-400">
              <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(first.kind)}`)} className="font-mono text-zinc-300 hover:underline">
                {first.kind}
              </Link>{" "}
              by <span className="font-mono">{first.part}</span>
              <span className="text-zinc-600"> · {shownRows.length}{group?.more ? "+" : ""}</span>
            </span>
          );
        },
      }}
    />
  );
}
