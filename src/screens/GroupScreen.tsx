import { Link, useParams } from "react-router-dom";
import { useGroup, useGroupStatus, useInstanceId, useInstanceSchema } from "@/api/hooks";
import { Chip, defChipClass } from "@/components/Chip";
import { EntityLink } from "@/components/EntityLink";
import { MonoId } from "@/components/MonoId";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Prose } from "@/components/Prose";
import { formatDateTime, humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { providersOf, signalWiring, workflowsOf } from "@/lib/workflow-info";

/** Property definitions for one relationship type out of the composed schema. */
interface SchemaPropertyDef {
  enum?: string[] | null;
  enum_ref?: string | null;
}

function relationshipPropertyDefs(
  schemaData: unknown,
  relationshipType: string | undefined,
): Record<string, SchemaPropertyDef> {
  if (!relationshipType) return {};
  const raw = (schemaData as { relationships?: unknown } | undefined)?.relationships;
  const list = Array.isArray(raw) ? raw : raw ? Object.values(raw) : [];
  const rel = (list as Array<{ name?: string; properties?: Record<string, SchemaPropertyDef> }>).find(
    (r) => r.name === relationshipType,
  );
  return rel?.properties ?? {};
}

/** "geography" + its enum def → tooltip "supplier_match_basis: direct | geography". */
function enumTooltip(
  def: SchemaPropertyDef | undefined,
  enums: Record<string, string[]> | undefined,
): string | undefined {
  if (!def) return undefined;
  const values = def.enum ?? (def.enum_ref ? enums?.[def.enum_ref] : undefined);
  if (!values?.length) return undefined;
  return `${def.enum_ref ?? "one of"}: ${values.join(" | ")}`;
}

const SIGNAL_VERDICTS = ["support", "unsure", "contradict"] as const;

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
  const status = useGroupStatus(groupId);
  const schema = useInstanceSchema();

  if (detail.isPending) return <LoadState />;
  if (detail.error) return <LoadState error={detail.error} />;
  const data = detail.data as unknown as GroupDetail | undefined;
  if (!data?.group) return <EmptyState>Group not found.</EmptyState>;
  const { group, members } = data;
  const signals = group.thesis_facts?.signals;
  const origin = group.thesis_facts?.origin;
  const resolved = group.status !== "pending_review";

  const propDefs = relationshipPropertyDefs(schema.data, group.relationship_type);
  const schemaEnums = (schema.data as { enums?: Record<string, string[]> } | undefined)?.enums;

  // The proposing workflow's config declares how each signal is produced:
  // which provider feeds it and which output field carries the verdict.
  const workflowName = origin?.workflow_name ?? group.source_workflow_name;
  const wiring = new Map(
    signalWiring(workflowName ? workflowsOf(schema.data)[workflowName] : undefined).map((w) => [
      w.source,
      w,
    ]),
  );
  const providerDefs = providersOf(schema.data);

  // Signals are the group's evidence structure: aggregate each source's
  // verdicts across members so the review question ("what supports this,
  // what's unsure, what contradicts") reads at a glance.
  const signalMatrix = new Map<string, { support: number; unsure: number; contradict: number }>();
  for (const m of members) {
    for (const s of m.signals ?? []) {
      const source = s.signal_source ?? "unknown";
      const row = signalMatrix.get(source) ?? { support: 0, unsure: 0, contradict: 0 };
      const verdict = (s.signal ?? "") as (typeof SIGNAL_VERDICTS)[number];
      if (SIGNAL_VERDICTS.includes(verdict)) row[verdict]++;
      signalMatrix.set(source, row);
    }
  }

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
          {signalMatrix.size > 0 && (
            <Panel title="Signals">
              <table className="w-full text-left text-[12px]">
                <thead>
                  <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
                    <th className="py-1 pr-3 font-medium">Source</th>
                    <th className="py-1 pr-3 font-medium">Support</th>
                    <th className="py-1 pr-3 font-medium">Unsure</th>
                    <th className="py-1 pr-3 font-medium">Contradict</th>
                    <th className="py-1 pr-3 font-medium">Produced by</th>
                    <th className="py-1 pr-3 font-medium">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {[...signalMatrix.entries()].map(([source, counts]) => {
                    const w = wiring.get(source);
                    const provider = w?.providerName ? providerDefs[w.providerName] : undefined;
                    return (
                      <tr key={source} className="border-t border-zinc-800/60 align-top">
                        <td className="py-1.5 pr-3 font-mono text-[11px] text-zinc-300">{source}</td>
                        <td className={`py-1.5 pr-3 font-mono ${counts.support ? "text-emerald-400" : "text-zinc-600"}`}>
                          {counts.support}
                        </td>
                        <td className={`py-1.5 pr-3 font-mono ${counts.unsure ? "text-amber-400" : "text-zinc-600"}`}>
                          {counts.unsure}
                        </td>
                        <td className={`py-1.5 pr-3 font-mono ${counts.contradict ? "text-red-400" : "text-zinc-600"}`}>
                          {counts.contradict}
                        </td>
                        <td className="py-1.5 pr-3">
                          {w?.providerName ? (
                            <span
                              className="inline-flex items-center gap-1.5"
                              title={provider?.description ?? undefined}
                            >
                              <span className="font-mono text-[11px] text-zinc-400">
                                {w.providerName}
                              </span>
                              {provider && (
                                <span
                                  title={provider.deterministic ? "Deterministic" : "Non-deterministic"}
                                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                                    provider.deterministic ? "bg-emerald-500" : "bg-amber-400"
                                  }`}
                                />
                              )}
                              {w.verdictPath && (
                                <span
                                  className="font-mono text-[10px] text-zinc-600"
                                  title={w.verdictRule}
                                >
                                  .{w.verdictPath}
                                </span>
                              )}
                            </span>
                          ) : (
                            <span className="text-zinc-600">—</span>
                          )}
                        </td>
                        <td className="py-1.5 pr-3 text-[11px] text-zinc-500">
                          {(signals?.required ?? []).includes(source) && "required"}
                          {(signals?.blocking ?? []).includes(source) && " · blocking"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {group.thesis_facts?.policy?.auto_resolve_when && (
                <div className="mt-2 text-[11px] text-zinc-500">
                  Auto-resolves on {humanize(group.thesis_facts.policy.auto_resolve_when).toLowerCase()}
                  {" — "}first-run groups still require operator review.
                </div>
              )}
            </Panel>
          )}

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
                  {typeof m.properties?.rationale === "string" && (
                    <p className="mt-1 text-[12px] leading-4 text-zinc-400">
                      {m.properties.rationale}
                    </p>
                  )}
                  {(() => {
                    // Signal evidence rows already show basis text verbatim —
                    // a property chip repeating the same string is noise.
                    const evidenceTexts = new Set(
                      (m.signals ?? []).map((s) => s.evidence).filter(Boolean),
                    );
                    const chips = Object.entries(m.properties ?? {}).filter(
                      ([k, v]) => k !== "rationale" && !evidenceTexts.has(String(v)),
                    );
                    if (chips.length === 0) return null;
                    return (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {chips.map(([k, v]) => (
                          <span
                            key={k}
                            className={`${defChipClass} text-[10px]`}
                            title={enumTooltip(propDefs[k], schemaEnums)}
                          >
                            <span className="text-zinc-500">{humanize(k)}</span>
                            <span className="text-zinc-200">{humanize(String(v))}</span>
                          </span>
                        ))}
                      </div>
                    );
                  })()}
                  {(m.signals ?? []).length > 0 && (
                    <div className="mt-1.5 space-y-1 border-t border-zinc-800/50 pt-1.5">
                      <div className="text-[9px] font-semibold uppercase tracking-wider text-zinc-600">
                        Signals
                      </div>
                      {(m.signals ?? []).map((s, si) => (
                        <div
                          key={si}
                          className="grid grid-cols-[6rem_max-content_1fr] items-baseline gap-x-2 text-[12px]"
                        >
                          <span className="truncate font-mono text-[10px] text-zinc-500" title={s.signal_source}>
                            {s.signal_source}
                          </span>
                          {s.signal ? <Chip value={s.signal} /> : <span />}
                          <span className="text-zinc-500">{s.evidence}</span>
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
          {(() => {
            const st = status.data as
              | {
                  latest_trust_status?: string | null;
                  approved_history?: Array<{
                    resolution_id?: string;
                    action?: string;
                    trust_status?: string;
                    confirmed?: boolean;
                    resolved_at?: string;
                    tuple_count?: number;
                  }>;
                }
              | undefined;
            const history = st?.approved_history ?? [];
            if (history.length === 0) return null;
            return (
              <Panel title="Resolution">
                <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[12px]">
                  {st?.latest_trust_status && (
                    <div className="contents">
                      <dt className="text-zinc-500">Rule trust</dt>
                      <dd>
                        <Chip value={st.latest_trust_status} />
                      </dd>
                    </div>
                  )}
                  {history.map((r) => (
                    <div key={r.resolution_id} className="contents">
                      <dt className="text-zinc-500">{humanize(r.action ?? "resolved")}</dt>
                      <dd className="text-zinc-300">
                        <span className="font-mono text-[11px]">{r.resolution_id}</span>
                        <span className="block text-[11px] text-zinc-500">
                          {r.resolved_at && (
                            <span title={r.resolved_at}>{formatDateTime(r.resolved_at)}</span>
                          )}
                          {typeof r.tuple_count === "number" && <> · {r.tuple_count} edges</>}
                          {r.confirmed === false && " · unconfirmed"}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-2 text-[10px] leading-3 text-zinc-600">
                  Resolver identity and rationale aren't on the read surface yet
                  (wi-resolution-read-surface).
                </div>
              </Panel>
            );
          })()}

          <Panel title="Provenance">
            <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[12px]">
              {group.source_workflow_name && (
                <div className="contents">
                  <dt className="text-zinc-500">Workflow</dt>
                  <dd className="font-mono text-[11px] text-zinc-300 break-all">
                    <Link
                      to={`/i/${instanceId}/workflows/${group.source_workflow_name}`}
                      className="hover:underline"
                    >
                      {group.source_workflow_name}
                    </Link>
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
                      <Link
                        to={`/i/${instanceId}/workflows/${origin.workflow_name}`}
                        className="hover:underline"
                      >
                        {origin.workflow_name}
                      </Link>
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

          {group.thesis_facts?.policy && (
            <Panel title="Policy">
              <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[12px]">
                {group.thesis_facts.policy.auto_resolve_when && (
                  <div className="contents">
                    <dt className="text-zinc-500">Auto-resolve</dt>
                    <dd className="text-zinc-300">
                      {humanize(group.thesis_facts.policy.auto_resolve_when)}
                    </dd>
                  </div>
                )}
                {group.thesis_facts.policy.proposal_identity && (
                  <div className="contents">
                    <dt className="text-zinc-500">Identity</dt>
                    <dd className="text-zinc-300">
                      {humanize(group.thesis_facts.policy.proposal_identity)}
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
