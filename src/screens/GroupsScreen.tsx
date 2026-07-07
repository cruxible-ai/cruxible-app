import { Link, useSearchParams } from "react-router-dom";
import { GROUP_STATUSES, useGroups, useInstanceId, type GroupStatus } from "@/api/hooks";
import { Chip, toggleChipClass } from "@/components/Chip";
import { MonoId } from "@/components/MonoId";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { formatDateTime, humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

export interface GroupSummary {
  group_id: string;
  relationship_type: string;
  status: string;
  group_kind?: string;
  thesis_text?: string | null;
  member_count?: number;
  proposed_by?: string | null;
  source_workflow_name?: string | null;
  created_at?: string | null;
}

const STATUSES = GROUP_STATUSES;

/**
 * Candidate groups — the governance queue. Workflows propose governed edges
 * in groups; nothing becomes accepted state until a reviewer resolves the
 * group. This surface is read-only: resolution happens through
 * `cruxible group resolve` (or MCP), never a GET.
 */
export function GroupsScreen() {
  usePageTitle("Review groups");
  const instanceId = useInstanceId();
  const [searchParams, setSearchParams] = useSearchParams();
  const raw = searchParams.get("status");
  const status = GROUP_STATUSES.includes(raw as GroupStatus)
    ? (raw as GroupStatus)
    : undefined;
  const groups = useGroups(status);

  function setStatus(next: string | undefined) {
    const sp = new URLSearchParams(searchParams);
    if (next) sp.set("status", next);
    else sp.delete("status");
    setSearchParams(sp);
  }

  const items = ((groups.data as { items?: GroupSummary[] } | undefined)?.items ?? []);
  const total = (groups.data as { total?: number } | undefined)?.total ?? 0;

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Review groups</h1>
        <p className="mt-1 text-[12px] text-zinc-500">
          Proposed governed edges awaiting review. Nothing here is accepted state until a
          reviewer resolves the group — resolution happens on the CLI or MCP surface.
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <button onClick={() => setStatus(undefined)} className={toggleChipClass(!status)}>
            All
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s === status ? undefined : s)}
              className={toggleChipClass(s === status)}
            >
              {humanize(s)}
            </button>
          ))}
        </div>
      </header>
      <Panel title="Groups" meta={<span className="font-mono">{total} total</span>}>
        {groups.isPending && <LoadState />}
        {groups.error && <LoadState error={groups.error} />}
        {groups.data && items.length === 0 && (
          <EmptyState>
            {status ? `No ${humanize(status).toLowerCase()} groups.` : "No candidate groups."}
          </EmptyState>
        )}
        {items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
                  <th className="py-1 pr-3 font-medium">Group</th>
                  <th className="py-1 pr-3 font-medium">Relationship</th>
                  <th className="py-1 pr-3 font-medium">Status</th>
                  <th className="py-1 pr-3 font-medium">Members</th>
                  <th className="py-1 pr-3 font-medium">Proposed by</th>
                  <th className="py-1 pr-3 font-medium">Thesis</th>
                  <th className="py-1 pr-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {items.map((g) => (
                  <tr
                    key={g.group_id}
                    className="border-t border-zinc-800/60 align-top hover:bg-zinc-900/40"
                  >
                    <td className="whitespace-nowrap py-1.5 pr-3">
                      <Link
                        to={`/i/${instanceId}/groups/${g.group_id}`}
                        className="font-mono text-[12px] text-zinc-200 hover:underline"
                      >
                        {g.group_id}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap py-1.5 pr-3 text-zinc-300">
                      {g.relationship_type.replaceAll("_", " ")}
                    </td>
                    <td className="whitespace-nowrap py-1.5 pr-3">
                      <Chip value={g.status} />
                    </td>
                    <td className="py-1.5 pr-3 font-mono text-[12px] text-zinc-400">
                      {g.member_count ?? "—"}
                    </td>
                    <td className="whitespace-nowrap py-1.5 pr-3 text-zinc-400">
                      {g.source_workflow_name ? (
                        <MonoId id={g.source_workflow_name} />
                      ) : (
                        (g.proposed_by ?? "—")
                      )}
                    </td>
                    <td className="max-w-[24rem] truncate py-1.5 pr-3 text-zinc-400">
                      {g.thesis_text ?? "—"}
                    </td>
                    <td
                      className="whitespace-nowrap py-1.5 pr-3 text-zinc-500"
                      title={g.created_at ?? undefined}
                    >
                      {g.created_at ? formatDateTime(g.created_at) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
