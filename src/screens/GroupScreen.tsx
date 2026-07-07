import { Link, useParams } from "react-router-dom";
import { useGroup, useInstanceId } from "@/api/hooks";
import { Chip } from "@/components/Chip";
import { EntityLink } from "@/components/EntityLink";
import { MonoId } from "@/components/MonoId";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Prose } from "@/components/Prose";
import { formatDateTime, humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

interface MemberSignal {
  signal_source?: string;
  signal?: string;
  evidence?: string | null;
}

interface GroupMember {
  relationship_type: string;
  from_type: string;
  from_id: string;
  to_type: string;
  to_id: string;
  properties?: Record<string, unknown>;
  metadata?: { assertion?: { review?: { status?: string } } };
  signals?: MemberSignal[];
}

interface GroupDetail {
  group: {
    group_id: string;
    relationship_type: string;
    status: string;
    group_kind?: string;
    thesis_text?: string | null;
    member_count?: number;
    proposed_by?: string | null;
    pending_version?: number;
    review_priority?: string | null;
    source_workflow_name?: string | null;
    source_workflow_receipt_id?: string | null;
    source_query_receipt_ids?: string[];
    resolution_id?: string | null;
    proposed_actor_context?: { actor_id?: string; actor_type?: string } | null;
    created_at?: string | null;
    thesis_facts?: {
      origin?: {
        kind?: string;
        evidence_mode?: string;
        workflow_name?: string;
        step_id?: string;
        proposal_logic_digest?: string;
      };
      relationship?: { type?: string; from_type?: string; to_type?: string };
      policy?: { auto_resolve_when?: string; proposal_identity?: string };
      signals?: { used?: string[]; required?: string[]; blocking?: string[] };
    };
  };
  members: GroupMember[];
}

/**
 * One candidate group: the thesis, the policy, and every proposed member edge
 * with its signals and evidence — the full review surface, read-only. The
 * resolve action stays on the CLI/MCP; this page shows the command.
 */
export function GroupScreen() {
  const { groupId = "" } = useParams();
  usePageTitle(groupId);
  const instanceId = useInstanceId();
  const detail = useGroup(groupId);

  if (detail.isPending) return <LoadState />;
  if (detail.error) return <LoadState error={detail.error} />;
  const data = detail.data as unknown as GroupDetail | undefined;
  if (!data?.group) return <EmptyState>Group not found.</EmptyState>;
  const { group, members } = data;
  const signals = group.thesis_facts?.signals;
  const origin = group.thesis_facts?.origin;
  const resolved = group.status !== "pending_review";

  return (
    <div className="space-y-3">
      <header>
        <div className="flex items-center gap-3 text-[12px]">
          <Link to={`/i/${instanceId}/groups`} className="text-zinc-500 hover:text-zinc-300">
            Review groups
          </Link>
          <span className="text-zinc-700">/</span>
          <MonoId id={group.group_id} />
        </div>
        <h1 className="mt-1 text-[17px] font-semibold text-zinc-100">
          {humanize(group.relationship_type)}
        </h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-zinc-500">
          <Chip value={group.status} />
          {group.group_kind && <span>kind {group.group_kind}</span>}
          <span>
            <span className="font-mono">{group.member_count ?? members.length}</span> proposed{" "}
            {(group.member_count ?? members.length) === 1 ? "edge" : "edges"}
          </span>
          {group.created_at && (
            <span title={group.created_at}>{formatDateTime(group.created_at)}</span>
          )}
        </div>
        {group.thesis_text && (
          <div className="mt-2">
            <Prose text={group.thesis_text} />
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="min-w-0 space-y-3">
          <Panel
            title="Proposed edges"
            meta={
              resolved ? (
                <span className="text-zinc-500">
                  Proposal-time snapshot — the resolution wrote the live edges
                </span>
              ) : undefined
            }
          >
            <div className="space-y-2">
              {members.map((m, i) => (
                <div key={i} className="rounded border border-zinc-800/60 bg-zinc-900/30 px-2.5 py-2">
                  <div className="flex flex-wrap items-center gap-2 text-[13px]">
                    <span className="text-[11px] text-zinc-600">{m.from_type}</span>
                    <EntityLink entityType={m.from_type} entityId={m.from_id} />
                    <span className="text-zinc-600">→</span>
                    <span className="text-[11px] text-zinc-600">{m.to_type}</span>
                    <EntityLink entityType={m.to_type} entityId={m.to_id} />
                    {/* Members are the immutable as-proposed record; showing
                        their frozen review stamp on a resolved group reads as
                        current state, which it is not. */}
                    {!resolved && m.metadata?.assertion?.review?.status && (
                      <span className="ml-auto">
                        <Chip value={m.metadata.assertion.review.status} />
                      </span>
                    )}
                  </div>
                  {Object.entries(m.properties ?? {}).map(([k, v]) => (
                    <div key={k} className="mt-1 text-[12px] leading-4 text-zinc-500">
                      <span className="text-zinc-600">{humanize(k)}: </span>
                      {String(v)}
                    </div>
                  ))}
                  {(m.signals ?? []).length > 0 && (
                    <div className="mt-1.5 space-y-1 border-t border-zinc-800/50 pt-1.5">
                      {(m.signals ?? []).map((s, si) => (
                        <div key={si} className="flex items-start gap-2 text-[12px]">
                          {s.signal && <Chip value={s.signal} />}
                          <span className="text-zinc-500">
                            <span className="font-mono text-[11px] text-zinc-600">
                              {s.signal_source}
                            </span>
                            {s.evidence && <> — {s.evidence}</>}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {members.length === 0 && <EmptyState>No members recorded.</EmptyState>}
            </div>
          </Panel>

          {group.status === "pending_review" && (
            <div className="rounded border border-zinc-800/60 bg-zinc-900/30 px-3 py-2 text-[12px] text-zinc-500">
              Resolve from the CLI:{" "}
              <code className="font-mono text-[11px] text-zinc-300">
                cruxible group resolve --group {group.group_id} --action approve
                --expected-pending-version {group.pending_version ?? 1} --rationale "…"
              </code>
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-3">
          <Panel title="Provenance">
            <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[12px]">
              {group.source_workflow_name && (
                <div className="contents">
                  <dt className="text-zinc-500">Workflow</dt>
                  <dd className="font-mono text-[11px] text-zinc-300 break-all">
                    {group.source_workflow_name}
                  </dd>
                </div>
              )}
              {group.proposed_actor_context?.actor_id && (
                <div className="contents">
                  <dt className="text-zinc-500">Proposed by</dt>
                  <dd className="font-mono text-[11px] text-zinc-300">
                    {group.proposed_actor_context.actor_id}
                  </dd>
                </div>
              )}
              {group.source_workflow_receipt_id && (
                <div className="contents">
                  <dt className="text-zinc-500">Receipt</dt>
                  <dd>
                    <Link
                      to={`/i/${instanceId}/receipts/${group.source_workflow_receipt_id}`}
                      className="font-mono text-[11px] text-zinc-300 hover:underline"
                    >
                      {group.source_workflow_receipt_id}
                    </Link>
                  </dd>
                </div>
              )}
              {(group.source_query_receipt_ids ?? []).length > 0 && (
                <div className="contents">
                  <dt className="text-zinc-500">Read receipts</dt>
                  <dd className="space-y-0.5">
                    {(group.source_query_receipt_ids ?? []).map((rid) => (
                      <Link
                        key={rid}
                        to={`/i/${instanceId}/receipts/${rid}`}
                        className="block font-mono text-[11px] text-zinc-300 hover:underline"
                      >
                        {rid}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </Panel>

          {origin && (
            <Panel title="Thesis facts">
              <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[12px]">
                {origin.kind && (
                  <div className="contents">
                    <dt className="text-zinc-500">Origin</dt>
                    <dd className="text-zinc-300">{humanize(origin.kind)}</dd>
                  </div>
                )}
                {origin.workflow_name && (
                  <div className="contents">
                    <dt className="text-zinc-500">Workflow</dt>
                    <dd className="font-mono text-[11px] text-zinc-300 break-all">
                      {origin.workflow_name}
                      {origin.step_id && ` · ${origin.step_id}`}
                    </dd>
                  </div>
                )}
                {origin.evidence_mode && (
                  <div className="contents">
                    <dt className="text-zinc-500">Evidence mode</dt>
                    <dd className="text-zinc-300">{humanize(origin.evidence_mode)}</dd>
                  </div>
                )}
                {origin.proposal_logic_digest && (
                  <div className="contents">
                    <dt className="text-zinc-500">Logic digest</dt>
                    <dd
                      className="truncate font-mono text-[10px] text-zinc-400"
                      title={origin.proposal_logic_digest}
                    >
                      {origin.proposal_logic_digest}
                    </dd>
                  </div>
                )}
                {group.thesis_facts?.relationship?.from_type && (
                  <div className="contents">
                    <dt className="text-zinc-500">Proposes</dt>
                    <dd className="text-zinc-300">
                      {group.thesis_facts.relationship.from_type} →{" "}
                      {group.thesis_facts.relationship.to_type}
                    </dd>
                  </div>
                )}
              </dl>
            </Panel>
          )}

          {(signals || group.thesis_facts?.policy) && (
            <Panel title="Policy">
              <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[12px]">
                {group.thesis_facts?.policy?.auto_resolve_when && (
                  <div className="contents">
                    <dt className="text-zinc-500">Auto-resolve</dt>
                    <dd className="text-zinc-300">
                      {humanize(group.thesis_facts.policy.auto_resolve_when)}
                    </dd>
                  </div>
                )}
                {(signals?.required ?? []).length > 0 && (
                  <div className="contents">
                    <dt className="text-zinc-500">Required</dt>
                    <dd className="font-mono text-[11px] text-zinc-300">
                      {(signals?.required ?? []).join(", ")}
                    </dd>
                  </div>
                )}
                {(signals?.used ?? []).length > 0 && (
                  <div className="contents">
                    <dt className="text-zinc-500">Signals used</dt>
                    <dd className="font-mono text-[11px] text-zinc-300">
                      {(signals?.used ?? []).join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}
