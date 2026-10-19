import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCard, useInstanceId, useReview } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { withAt } from "@/lib/at";
import { parseRef } from "@/lib/cruxible-ref";
import { readAttestations, readGovernance, readProvenance } from "@/lib/review";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

type Member = Schemas["ReviewedMember"];

/**
 * One proposal, read-only: its card (status, verdict, who, when, why, the
 * change set) through get, and its review (members with field-level deltas
 * and prior refusals, governance, approvals recorded, item reasons paged).
 * Approving, activating, rejecting and withdrawing stay on the CLI/MCP; the
 * console has no route for them (READ_ROUTES).
 */
export function ProposalScreen() {
  const { id = "" } = useParams();
  const card = useCard(id);
  const proposal = cardOf(card.data, "proposal");
  const [reasonCursors, setReasonCursors] = useState<string[]>([]);
  const review = useReview(id === "" ? null : id, reasonCursors[reasonCursors.length - 1]);
  usePageTitle(`Proposal ${id.slice(0, 19)}`);

  return (
    <div className="max-w-6xl space-y-3">
      <header>
        <div className="text-[10px] uppercase tracking-wide text-zinc-500">Proposal</div>
        <h1 className="break-all font-mono text-[15px] font-semibold text-zinc-100">{id}</h1>
        {proposal && (
          <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-zinc-500">
            <Chip value={proposal.status} />
            {proposal.verdict && <Chip value={proposal.verdict} />}
            {proposal.actor && (
              <span>
                by <span className="font-mono text-zinc-300">{proposal.actor}</span>
              </span>
            )}
            {proposal.admitted_at && <span title={proposal.admitted_at}>admitted {formatDateTime(proposal.admitted_at)}</span>}
            {(proposal.incomplete?.length ?? 0) > 0 && (
              <span className="text-amber-400/90">incomplete: {proposal.incomplete!.join(", ")}</span>
            )}
          </div>
        )}
      </header>
      {card.isPending && <LoadState />}
      {card.error && <LoadState error={card.error} />}
      {proposal && (
        <Panel title="Change set" meta={<span>{proposal.changes?.length ?? 0} changes</span>}>
          {(proposal.rationale || proposal.reason) && (
            <div className="mb-2 whitespace-pre-wrap text-[13px] text-zinc-300">{proposal.rationale ?? proposal.reason}</div>
          )}
          {(proposal.refusal?.length ?? 0) > 0 && (
            <div className="mb-2 space-y-0.5 text-[12px] text-red-400/90">
              {proposal.refusal!.map((refusal) => (
                <div key={refusal.code}>
                  <span className="font-mono">{refusal.code}</span> {refusal.message}
                </div>
              ))}
            </div>
          )}
          <div className="space-y-0.5 text-[12px]">
            {(proposal.changes ?? []).map((change) => (
              <div key={change.path} className="flex items-baseline gap-3">
                <Chip value={change.change} />
                <PathLink path={change.path} />
              </div>
            ))}
          </div>
        </Panel>
      )}
      {review.isPending && <LoadState />}
      {review.error && (
        <Panel title="Review">
          <LoadState error={review.error} />
        </Panel>
      )}
      {review.data && (
        <ReviewPanels
          review={review.data}
          reasonsPage={reasonCursors.length}
          olderReasons={
            review.data.item_reasons_next_cursor
              ? () => setReasonCursors((c) => [...c, review.data!.item_reasons_next_cursor!])
              : null
          }
          newerReasons={reasonCursors.length ? () => setReasonCursors((c) => c.slice(0, -1)) : null}
        />
      )}
    </div>
  );
}

/** A member or change path as a link when it names a Subject or Claim. */
function PathLink({ path }: { path: string }) {
  return parseRef(path) ? <RefLink value={path} /> : <span className="break-all font-mono text-zinc-400">{path}</span>;
}

function ReviewPanels({
  review,
  reasonsPage,
  olderReasons,
  newerReasons,
}: {
  review: Schemas["ProposalReview"];
  reasonsPage: number;
  olderReasons: (() => void) | null;
  newerReasons: (() => void) | null;
}) {
  const instanceId = useInstanceId();
  const governance = readGovernance(review);
  const provenance = readProvenance(review);
  const approvals = readAttestations(review);
  const base = review.settlement_base.git_oid.slice(0, 12);
  return (
    <>
      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <Panel title="Governance">
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
            <dt className="text-zinc-500">Activation</dt>
            <dd className="text-zinc-300">{governance.activationPolicy ?? "—"}</dd>
            <dt className="text-zinc-500">Required tier</dt>
            <dd className="text-zinc-300">{governance.requiredTier ?? "—"}</dd>
            <dt className="text-zinc-500">Approvals required</dt>
            <dd className="text-zinc-300">
              {governance.approvalRequirements.length === 0
                ? "none"
                : governance.approvalRequirements.map((r) => `${r.role} ×${r.minimumDistinctSigners}`).join(", ")}
            </dd>
            <dt className="text-zinc-500">Approvals recorded</dt>
            <dd className="text-zinc-300">
              {approvals.length === 0
                ? "none"
                : approvals.map((a) => (
                    <div key={a.attestationDigest ?? a.signerId}>
                      <span className="font-mono">{a.signerId}</span>
                      {a.submittedBy && a.submittedBy !== a.signerId && (
                        <span className="text-zinc-500"> submitted by {a.submittedBy}</span>
                      )}
                    </div>
                  ))}
            </dd>
          </dl>
        </Panel>
        <Panel title="Provenance">
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
            <dt className="text-zinc-500">Proposed by</dt>
            <dd className="font-mono text-zinc-300">{provenance.actorId ?? "—"}</dd>
            <dt className="text-zinc-500">Settlement base</dt>
            <dd>
              <Link to={withAt(`/i/${instanceId}`, base)} className="font-mono text-zinc-300 hover:underline" title="View accepted state at the base this proposal was evaluated on">
                {base}
              </Link>
            </dd>
            <dt className="text-zinc-500">Candidate</dt>
            <dd className="break-all font-mono text-[12px] text-zinc-500">{review.candidate_digest}</dd>
            {review.redactions.length > 0 && (
              <>
                <dt className="text-zinc-500">Withheld</dt>
                <dd className="text-zinc-500">{review.redactions.join(", ")} (needs a body-reading credential)</dd>
              </>
            )}
          </dl>
          {review.projection_advisory && (
            <div className="mt-2 text-[12px] text-amber-400/90">{review.projection_advisory.message}</div>
          )}
        </Panel>
      </div>

      <Panel title="Members" meta={<span>{review.members.length}</span>}>
        {review.members.length === 0 && <EmptyState>No members.</EmptyState>}
        <div className="divide-y divide-zinc-800/60">
          {review.members.map((member) => (
            <MemberRow key={member.path} member={member} />
          ))}
        </div>
        {review.prior_refusal_coverage && (
          <div className="mt-2 text-[12px] text-zinc-600">
            Prior refusals indexed through generation {review.prior_refusal_coverage.indexed_through_generation} of{" "}
            {review.prior_refusal_coverage.accepted_generation}.
          </div>
        )}
      </Panel>

      {(review.item_reason_count ?? 0) > 0 && (
        <Panel
          title="Item reasons"
          meta={
            <span className="flex gap-2">
              {newerReasons && (
                <button onClick={newerReasons} className="hover:text-zinc-200">
                  ← Previous
                </button>
              )}
              <span>
                page {reasonsPage + 1} · {review.item_reason_count} reasons
              </span>
              {olderReasons && (
                <button onClick={olderReasons} className="hover:text-zinc-200">
                  Next →
                </button>
              )}
            </span>
          }
        >
          <div className="divide-y divide-zinc-800/60 text-[12px]">
            {(review.item_reasons ?? []).map((reason) => (
              <div key={`${reason.path}\n${reason.item_key}\n${reason.child_index}`} className="py-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <PathLink path={reason.path} />
                  <span className="text-zinc-500">{reason.operation}</span>
                  <span className="text-zinc-600">
                    {reason.procedure} · <RefLink value={`ProcedureRun:${reason.run_id}`} /> · {reason.terminal}
                  </span>
                </div>
                <div className="whitespace-pre-wrap text-zinc-300">
                  {reason.reason}
                  {reason.truncated && "…"}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </>
  );
}

function MemberRow({ member }: { member: Member }) {
  return (
    <div className="py-1.5 text-[12px]">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <Chip value={member.disposition} />
        <span className="text-zinc-500">{member.artifact_kind}</span>
        <PathLink path={member.path} />
        {member.closure_role !== "authored" && <span className="text-zinc-600">{member.closure_role.replaceAll("_", " ")}</span>}
      </div>
      {member.semantic_delta.length > 0 && (
        <dl className="mt-0.5 grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 pl-2">
          {member.semantic_delta.map((delta) => (
            <div key={delta.field_path} className="contents">
              <dt className="font-mono text-zinc-500">{delta.field_path}</dt>
              <dd className="flex flex-wrap items-baseline gap-2">
                {delta.before.state === "present" ? (
                  <span className="text-zinc-500 line-through decoration-zinc-700">
                    <ShownValue value={delta.before.value} />
                  </span>
                ) : (
                  <span className="text-zinc-600">absent</span>
                )}
                <span className="text-zinc-600">→</span>
                {delta.after.state === "present" ? (
                  <span className="text-zinc-200">
                    <ShownValue value={delta.after.value} />
                  </span>
                ) : (
                  <span className="text-zinc-600">absent</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {(member.prior_refusals?.length ?? 0) > 0 && (
        <div className="mt-0.5 space-y-0.5 pl-2 text-amber-400/90">
          {member.prior_refusals!.map((refusal) => (
            <div key={`${refusal.claim_id}\n${refusal.decided_at}`}>
              earlier {refusal.kind.replaceAll("_", " ")} of <RefLink value={refusal.claim_id} /> by {refusal.decided_by}{" "}
              <span className="text-zinc-500" title={refusal.decided_at}>
                {formatDateTime(refusal.decided_at)}
              </span>
              {refusal.rationale && <span className="text-zinc-400">: {refusal.rationale}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
