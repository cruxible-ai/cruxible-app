import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGenerations, useInstanceId, useSince } from "@/api/hooks";
import { ChangeMark } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { useAtLink, withAt } from "@/lib/at";
import { readSeen, sinceSummary, sinceWindow, writeSeen, type BeliefCounts, type Seen } from "@/lib/dashboard";
import { formatDateTime } from "@/lib/text";

type KindCounts = BeliefCounts & { kind: string };

/**
 * Beliefs new, revised and retired since the viewer last marked this instance
 * seen (a generation kept in this browser, per instance). One since read over
 * the generations after that mark, sized the way the Overview sizes its window
 * (the newest generations whose members fit one read); a mark older than that
 * window reads from the window's start, and the Ledger has the rest.
 *
 * The mark moves only on "Mark seen": leaving the page to read a change must
 * not clear the list, and a head that moves while the tab sits open has not
 * been looked at. A first visit records the head as the starting mark.
 */
export function SinceLastLooked({ head, pinned }: { head: number; pinned: boolean }) {
  const instanceId = useInstanceId();
  const [seen, setSeen] = useState<Seen | null>(() => readSeen(instanceId));
  // A mark past the head (unpinned) means the instance was rebuilt: start over, as on a first visit.
  const mark = seen && (seen.generation <= head || pinned) ? seen : null;
  useEffect(() => {
    if (!pinned && mark === null) writeSeen(instanceId, { generation: head, at: new Date().toISOString() });
    // Only the first render's mark: a first visit (or a rebuilt instance) records the head once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const behind = mark !== null && mark.generation < head;
  const generations = useGenerations();
  const lower = behind && generations.data ? sinceWindow(generations.data.generations ?? [], head, mark.generation) : null;
  const since = useSince(lower);
  const summary = useMemo(() => (since.data ? sinceSummary(since.data.rows) : null), [since.data]);

  const markSeen = () => {
    const next = { generation: head, at: new Date().toISOString() };
    writeSeen(instanceId, next);
    setSeen(next);
  };

  return (
    <Panel
      title="Since you last looked"
      description="Beliefs new, revised or retired since you last marked this instance seen, in this browser."
      meta={
        mark ? (
          <span className="inline-flex items-baseline gap-2">
            <span title={formatDateTime(mark.at)}>
              Seen <SeenLink generation={mark.generation} /> · {formatDateTime(mark.at)}
            </span>
            {!pinned && behind && (
              <button type="button" onClick={markSeen} className="border border-zinc-700 px-1.5 py-px text-[12px] text-zinc-300 hover:bg-zinc-800 hover:text-white">
                Mark seen
              </button>
            )}
          </span>
        ) : undefined
      }
    >
      {mark === null && <EmptyState>First visit</EmptyState>}
      {mark !== null && !behind && <EmptyState>Nothing new since g{mark.generation}</EmptyState>}
      {behind && (generations.isPending || since.isPending) && !(generations.error ?? since.error) && <LoadState />}
      {behind && (generations.error ?? since.error) && <LoadState error={generations.error ?? since.error} />}
      {behind && summary && lower !== null && (
        <Changes summary={summary} from={lower} seen={mark.generation} head={head} truncated={since.data?.truncated ?? false} />
      )}
    </Panel>
  );
}

function SeenLink({ generation }: { generation: number }) {
  const instanceId = useInstanceId();
  return (
    <Link to={withAt(`/i/${instanceId}`, String(generation))} className="font-mono text-zinc-300 hover:underline" title="Open the instance as it stood when you last looked">
      g{generation}
    </Link>
  );
}

function Changes({
  summary,
  from,
  seen,
  head,
  truncated,
}: {
  summary: ReturnType<typeof sinceSummary>;
  from: number;
  seen: number;
  head: number;
  truncated: boolean;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const ledger = link(`/i/${instanceId}/ledger`);
  const columns = useMemo<Column<KindCounts>[]>(
    () => [
      {
        id: "kind",
        header: "Kind",
        sortValue: (row) => row.kind,
        cell: (row) =>
          row.kind ? (
            <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(row.kind)}`)} className="font-mono text-[12px] text-zinc-100 hover:underline">
              {row.kind}
            </Link>
          ) : (
            <span className="text-zinc-500">—</span>
          ),
      },
      { id: "created", header: "New", numeric: true, sortValue: (row) => row.created, cell: (row) => count(row.created) },
      { id: "revised", header: "Revised", numeric: true, sortValue: (row) => row.revised, cell: (row) => count(row.revised) },
      { id: "retired", header: "Retired", numeric: true, sortValue: (row) => row.retired, cell: (row) => count(row.retired) },
    ],
    [instanceId, link],
  );
  const none = summary.created + summary.revised + summary.retired === 0;
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 text-[13px]">
        <Total change="create" word="New" value={summary.created} to={ledger} />
        <Total change="revise" word="Revised" value={summary.revised} to={ledger} />
        <Total change="retire" word="Retired" value={summary.retired} to={ledger} />
        <span className="t-meta">
          g{from + 1}
          {from + 1 < head && `–g${head}`}
          {from > seen && " (window start)"} · {truncated && "first rows only · "}
          <Link to={ledger} className="hover:text-zinc-200 hover:underline">
            Ledger
          </Link>
        </span>
      </div>
      {none ? (
        <EmptyState>No Claim changes</EmptyState>
      ) : (
        <DataTable rows={summary.byKind} columns={columns} rowKey={(row) => row.kind || "-"} label="Changes by kind" urlKey="since" toolbar={false} maxHeight="none" />
      )}
    </div>
  );
}

const count = (n: number) => (n ? n.toLocaleString() : <span className="text-zinc-600">0</span>);

function Total({ change, word, value, to }: { change: string; word: string; value: number; to: string }) {
  return (
    <Link to={to} className="inline-flex items-baseline gap-1.5 hover:underline" title={`${word} Claims: open the Ledger`}>
      <ChangeMark change={change} />
      <span className={`font-mono text-[18px] leading-none ${value ? "text-zinc-100" : "text-zinc-500"}`}>{value}</span>
      <span className="text-zinc-400">{word}</span>
    </Link>
  );
}
