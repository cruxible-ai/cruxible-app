import { groupChanges, ProposalChanges, readProposalOrigin, unreadableChanges } from "@/components/ProposalChanges";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCard, useInstanceId, useReview } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { ChangeMark, SignalDot } from "@/components/Chip";
import { ProposalStateChip } from "@/components/ProposalList";
import { LongText } from "@/components/LongText";
import { Fact, Page, PageHeader } from "@/components/Page";
import { Disclosure, EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShortId, shortId } from "@/components/ShortId";
import { ShownValue } from "@/components/ShownValue";
import { withAt } from "@/lib/at";
import { parseRef } from "@/lib/cruxible-ref";
import { groupDeltas, memberSummary, readAttestations, readGovernance, readProvenance } from "@/lib/review";
import { formatDateTime, formatWhen, sentence } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { artifactNoun, changeMark, term } from "@/lib/vocabulary";

type Member = Schemas["ReviewedMember"];
type Review = Schemas["ProposalReview"];
type ProposalCard = Schemas["GetProposalCard"];

/** Members with at most this many field changes show them open. */
const OPEN_FIELDS = 8;

/**
 * One proposal, read-only: its card (status, verdict, who, when, why, the
 * change set) through get, and its review (members with field-level deltas
 * and prior refusals, governance, approvals recorded, item reasons paged).
 * The page leads with the proposal's own words and what it changes; each
 * member's raw field deltas sit behind a disclosure. Approving, activating,
 * rejecting and withdrawing stay on the CLI/MCP; the console has no route
 * for them (READ_ROUTES).
 */
export function ProposalScreen() {
  const { id = "" } = useParams();
  const card = useCard(id);
  const proposal = cardOf(card.data, "proposal");
  const [reasonCursors, setReasonCursors] = useState<string[]>([]);
  const review = useReview(id === "" ? null : id, reasonCursors[reasonCursors.length - 1]);
  usePageTitle(`Proposal ${id.slice(0, 19)}`);
  const words = proposal?.rationale ?? proposal?.reason ?? null;
  const origin = readProposalOrigin(words);
  // A Procedure's proposal is titled by the Procedure; short words are the title;
  // longer ones read as the opening paragraph.
  const headline = origin
    ? `${origin.procedure} proposal`
    : words !== null && words.length <= 160 && !words.includes("\n")
      ? words
      : null;

  return (
    <Page>
      <PageHeader
        kind="Proposal"
        title={
          headline ? (
            headline
          ) : (
            <span className="font-mono" title={id}>
              {shortId(id, 16)}
            </span>
          )
        }
        id={headline ? <ShortId value={id} className="text-zinc-500" /> : undefined}
        summary={proposal ? <ProposalSummary proposal={proposal} review={review.data} /> : undefined}
        facts={<ProposalFacts proposal={proposal} review={review.data} />}
      >
        {origin && (
          <div className="mt-2 text-[13px] text-zinc-400">
            Proposed by <RefLink value={`Procedure:${origin.procedure}`} /> in run <RefLink value={origin.run} short />
          </div>
        )}
        {words && !headline && (
          <div className="mt-2">
            <LongText text={words} lines={4} className="t-lede" />
          </div>
        )}
        {review.data && <ReviewNotes review={review.data} />}
      </PageHeader>

      {card.isPending && <LoadState />}
      {card.error && <LoadState error={card.error} />}
      {(proposal?.refusal?.length ?? 0) > 0 && (
        <Panel title="Refused">
          <div className="space-y-1 text-[13px] text-red-400/90">
            {proposal!.refusal!.map((refusal) => (
              <div key={refusal.code}>
                <span className="font-mono">{refusal.code}</span> {refusal.message}
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
      {/* Without a review, the card's change set is all there is. */}
      {proposal && !review.data && !review.isPending && <ChangeSetPanel proposal={proposal} />}
      {review.data && (
        <>
          {/* Claims and Subjects read as facts; a proposal of other artifacts has only the panel below. */}
          {(groupChanges(review.data.members).length > 0 || unreadableChanges(review.data.members).length > 0) && (
            <Panel title="What it changes">
              <ProposalChanges review={review.data} />
            </Panel>
          )}
          <MembersPanel review={review.data} />
          {(review.data.item_reason_count ?? 0) > 0 && (
            <ItemReasonsPanel
              review={review.data}
              page={reasonCursors.length}
              older={
                review.data.item_reasons_next_cursor
                  ? () => setReasonCursors((c) => [...c, review.data!.item_reasons_next_cursor!])
                  : null
              }
              newer={reasonCursors.length ? () => setReasonCursors((c) => c.slice(0, -1)) : null}
            />
          )}
        </>
      )}
    </Page>
  );
}

/** "Waiting for review. 40 changes: +38 Claims, +2 Subjects." */
function ProposalSummary({ proposal, review }: { proposal: ProposalCard; review: Review | undefined }) {
  // change mark -> artifact kind -> count, in first-seen order
  const counts = new Map<string, Map<string, number>>();
  for (const member of review?.members ?? []) {
    const mark = changeMark(member.disposition).mark;
    const byKind = counts.get(mark) ?? new Map<string, number>();
    byKind.set(member.artifact_kind, (byKind.get(member.artifact_kind) ?? 0) + 1);
    counts.set(mark, byKind);
  }
  const n = review?.members.length ?? proposal.changes?.length ?? 0;
  const parts = [...counts.entries()].flatMap(([mark, byKind]) => [...byKind.entries()].map(([kind, count]) => `${mark}${artifactNoun(kind, count)}`));
  const ending = proposal.status === "settled" && proposal.reason ? term("proposalOutcome", proposal.reason).word.toLowerCase() : null;
  return (
    <>
      <span className="text-zinc-100">{term("proposal", proposal.status).word}</span>
      {ending && <>, {ending}</>}. {n} {n === 1 ? "change" : "changes"}
      {parts.length > 0 && <>: {parts.join(", ")}</>}.
    </>
  );
}

function ProposalFacts({ proposal, review }: { proposal: ProposalCard | null; review: Review | undefined }) {
  const instanceId = useInstanceId();
  const governance = review ? readGovernance(review) : null;
  const provenance = review ? readProvenance(review) : null;
  const approvals = review ? readAttestations(review) : [];
  const base = review?.settlement_base.git_oid.slice(0, 12);
  const proposer = proposal?.actor ?? provenance?.actorId ?? null;
  return (
    <>
      {proposal && (
        <Fact label="Status">
          <ProposalStateChip status={proposal.status} verdict={proposal.verdict} outcome={proposal.reason} incomplete={proposal.incomplete} />
        </Fact>
      )}
      {proposer && (
        <Fact label="Proposed by">
          <span className="font-mono">{proposer}</span>
        </Fact>
      )}
      {proposal?.admitted_at && (
        <Fact label="Admitted" title={proposal.admitted_at}>
          {formatDateTime(proposal.admitted_at)}
        </Fact>
      )}
      {governance && (
        <>
          <Fact label="Activation">{governance.activationPolicy ?? "—"}</Fact>
          <Fact label="Required tier">{governance.requiredTier ?? "—"}</Fact>
          <Fact label="Approvals">
            {governance.approvalRequirements.length === 0
              ? "None required"
              : governance.approvalRequirements.map((r) => `${r.role} ×${r.minimumDistinctSigners}`).join(", ")}
            {", "}
            {approvals.length === 0 ? (
              "none recorded"
            ) : (
              <>
                recorded by{" "}
                {approvals.map((a, i) => (
                  <span key={a.attestationDigest ?? a.signerId}>
                    {i > 0 && ", "}
                    <span className="font-mono">{a.signerId}</span>
                    {a.submittedBy && a.submittedBy !== a.signerId && <span className="text-zinc-500"> (submitted by {a.submittedBy})</span>}
                  </span>
                ))}
              </>
            )}
          </Fact>
        </>
      )}
      {base && (
        <Fact label="Settlement base">
          <Link to={withAt(`/i/${instanceId}`, base)} className="font-mono hover:underline" title="View accepted state at the base this proposal was evaluated on">
            {base}
          </Link>
        </Fact>
      )}
    </>
  );
}

function ReviewNotes({ review }: { review: Review }) {
  if (review.redactions.length === 0 && !review.projection_advisory) return null;
  return (
    <div className="mt-3 space-y-0.5 text-[12px]">
      {review.redactions.length > 0 && (
        <div className="text-zinc-500">Withheld from this credential: {review.redactions.join(", ")} (needs a body-reading credential).</div>
      )}
      {review.projection_advisory && <div className="text-zinc-400">{review.projection_advisory.message}</div>}
    </div>
  );
}

/** A member or change path as a link when it names a Subject or Claim. */
function PathLink({ path, short = false }: { path: string; short?: boolean }) {
  return parseRef(path) ? (
    <RefLink value={path} short={short} />
  ) : (
    <span className="break-all font-mono text-[12px] text-zinc-400" title={path}>
      {short ? shortId(path) : path}
    </span>
  );
}

function ChangeSetPanel({ proposal }: { proposal: ProposalCard }) {
  return (
    <Panel title="Change set" meta={<span>{proposal.changes?.length ?? 0} changes</span>}>
      <div className="space-y-1 text-[13px]">
        {(proposal.changes ?? []).map((change) => (
          <div key={change.path} className="flex items-baseline gap-3">
            <ChangeMark change={change.change} />
            <PathLink path={change.path} />
          </div>
        ))}
      </div>
    </Panel>
  );
}

function MembersPanel({ review }: { review: Review }) {
  return (
    <Panel title="Each change, field by field" meta={<span>{review.members.length} {review.members.length === 1 ? "change" : "changes"}</span>}>
      {review.members.length === 0 && <EmptyState>No changes.</EmptyState>}
      <div className="divide-y divide-zinc-800/70">
        {review.members.map((member) => (
          <MemberRow key={member.path} member={member} />
        ))}
      </div>
      {review.prior_refusal_coverage && (
        <div className="t-meta mt-3">
          Prior refusals indexed through generation {review.prior_refusal_coverage.indexed_through_generation} of{" "}
          {review.prior_refusal_coverage.accepted_generation}.
        </div>
      )}
    </Panel>
  );
}

const INDENT = "pl-7";

function MemberRow({ member }: { member: Member }) {
  const summary = memberSummary(member);
  const claim = summary.claim;
  const changed =
    claim !== null && claim.before !== undefined && claim.after !== undefined && JSON.stringify(claim.before) !== JSON.stringify(claim.after);
  const value = claim ? (claim.after !== undefined ? claim.after : claim.before) : undefined;
  return (
    <div className="py-3 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[13px]">
        <ChangeMark change={member.disposition} className="w-4 shrink-0" />
        {claim ? (
          <span className="min-w-0 text-zinc-300">
            <span className="font-mono text-zinc-100">{claim.predicate ?? "Claim"}</span>
            {claim.qualifier && <span className="font-mono text-zinc-500">[{claim.qualifier}]</span>}
            {claim.subject && (
              <>
                <span className="text-zinc-500"> on </span>
                <RefLink value={claim.subject} />
              </>
            )}
          </span>
        ) : (
          <span className="min-w-0 text-zinc-300">
            <span className="text-zinc-500">{summary.kind ?? member.artifact_kind} </span>
            <PathLink path={summary.kind === "Subject" && summary.name ? summary.name : member.path} />
          </span>
        )}
        <span className="ml-auto flex items-baseline gap-3">
          {member.closure_role !== "authored" && <span className="t-meta">{sentence(member.closure_role.replaceAll("_", " "))}</span>}
          {claim && <PathLink path={member.path} short />}
        </span>
      </div>
      {claim && value !== undefined && (
        <div className={`mt-1.5 text-[13px] ${INDENT}`}>
          {changed ? (
            <div className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-3 gap-y-1">
              <span className="t-meta">Before</span>
              <ValueText value={claim.before} muted />
              <span className="t-meta">After</span>
              <ValueText value={claim.after} />
            </div>
          ) : (
            <ValueText value={value} />
          )}
        </div>
      )}
      {(member.prior_refusals?.length ?? 0) > 0 && (
        <div className={`mt-1.5 space-y-0.5 text-[12px] text-zinc-300 ${INDENT}`}>
          {member.prior_refusals!.map((refusal) => (
            <div key={`${refusal.claim_id}\n${refusal.decided_at}`} className="flex flex-wrap items-baseline gap-x-1.5">
              <SignalDot signal="wrong" title="Refused before: read why before approving it again" />
              Earlier {refusal.kind.replaceAll("_", " ")} of <RefLink value={refusal.claim_id} short /> by {refusal.decided_by}{" "}
              <span className="text-zinc-500" title={refusal.decided_at}>
                {formatWhen(refusal.decided_at)}
              </span>
              {refusal.rationale && <span className="text-zinc-400">: {refusal.rationale}</span>}
            </div>
          ))}
        </div>
      )}
      {member.semantic_delta.length > 0 && (
        <Disclosure
          className={`mt-1.5 ${INDENT}`}
          label={`${member.semantic_delta.length} field ${member.semantic_delta.length === 1 ? "change" : "changes"}`}
          defaultOpen={member.semantic_delta.length <= OPEN_FIELDS}
        >
          <DeltaTable member={member} />
        </Disclosure>
      )}
    </div>
  );
}

/** A Claim value in the members list: prose clamps, everything else as get shows it. */
function ValueText({ value, muted = false }: { value: unknown; muted?: boolean }) {
  const tone = muted ? "text-zinc-500" : "text-zinc-100";
  if (typeof value === "string" && !parseRef(value)) return <LongText text={value} lines={3} className={tone} />;
  return (
    <span className={tone}>
      <ShownValue value={value} />
    </span>
  );
}

/**
 * The member's field deltas, grouped by top-level field. A created member
 * lists its new values; a revised one shows before → after. Long values
 * (JSON, digests) wrap inside their cell and scroll past a few lines.
 */
function DeltaTable({ member }: { member: Member }) {
  const created = member.semantic_delta.every((d) => d.before.state === "absent");
  return (
    <div className="space-y-2 border-l border-zinc-800 pl-3">
      {groupDeltas(member).map(({ group, deltas }) => (
        <div key={group}>
          {!(deltas.length === 1 && deltas[0]!.field_path.replace(/^\//, "") === group) && <div className="t-meta mb-0.5">{group}</div>}
          <dl className="grid grid-cols-[minmax(10rem,18rem)_minmax(0,1fr)] gap-x-4 gap-y-0.5 text-[12px] leading-5">
            {deltas.map((delta) => (
              <div key={delta.field_path} className="contents">
                <dt className="truncate font-mono text-zinc-500" title={delta.field_path}>
                  {delta.field_path.startsWith(`/${group}/`) ? <span className="pl-3">{delta.field_path.slice(group.length + 2)}</span> : delta.field_path}
                </dt>
                <dd className="min-w-0">
                  {created ? (
                    <DeltaValue side={delta.after} />
                  ) : (
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="min-w-0 text-zinc-500 line-through decoration-zinc-700">
                        <DeltaValue side={delta.before} />
                      </span>
                      <span className="text-zinc-600">→</span>
                      <span className="min-w-0">
                        <DeltaValue side={delta.after} />
                      </span>
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

function DeltaValue({ side }: { side: Schemas["SemanticFieldDelta"]["after"] }) {
  if (side.state !== "present") return <span className="text-zinc-600">Absent</span>;
  const value = side.value;
  if (value !== null && typeof value === "object") {
    return (
      <code className="block max-h-24 overflow-auto break-all font-mono text-[11px] leading-4 text-zinc-400">
        {JSON.stringify(value)}
      </code>
    );
  }
  if (typeof value === "string" && value.length > 160) {
    return <LongText text={value} lines={2} className="text-zinc-300" />;
  }
  return (
    <span className="break-all text-zinc-300">
      <ShownValue value={value} />
    </span>
  );
}

function ItemReasonsPanel({
  review,
  page,
  older,
  newer,
}: {
  review: Review;
  page: number;
  older: (() => void) | null;
  newer: (() => void) | null;
}) {
  return (
    <Panel
      title="Item reasons"
      meta={
        <span className="flex gap-2">
          {newer && (
            <button onClick={newer} className="hover:text-zinc-200">
              ← Previous
            </button>
          )}
          <span>
            Page {page + 1} · {review.item_reason_count} reasons
          </span>
          {older && (
            <button onClick={older} className="hover:text-zinc-200">
              Next →
            </button>
          )}
        </span>
      }
    >
      <div className="divide-y divide-zinc-800/70 text-[13px]">
        {(review.item_reasons ?? []).map((reason) => (
          <div key={`${reason.path}\n${reason.item_key}\n${reason.child_index}`} className="py-2 first:pt-0">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <PathLink path={reason.path} short />
              <span className="text-zinc-500">{reason.operation}</span>
              <span className="t-meta">
                {reason.procedure} · <RefLink value={`ProcedureRun:${reason.run_id}`} short /> · {reason.terminal}
              </span>
            </div>
            <LongText text={`${reason.reason}${reason.truncated ? "…" : ""}`} lines={2} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
