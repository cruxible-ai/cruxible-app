import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCard, useClaimTypes, useGetBatch, useInstanceId, useReview } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { BeliefDiffView, PriorRefusals, type DiffContext } from "@/components/BeliefDiff";
import { ChangeMark } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { DefinitionChanges } from "@/components/DefinitionChanges";
import { readProposalOrigin } from "@/components/ProposalChanges";
import { ProposalStateChip } from "@/components/ProposalList";
import { LongText } from "@/components/LongText";
import { Fact, Page, PageHeader } from "@/components/Page";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShortId, shortId } from "@/components/ShortId";
import { DeltaTable } from "@/components/StoredFields";
import { withAt } from "@/lib/at";
import { parseRef } from "@/lib/cruxible-ref";
import { memberSummary, readAttestations, readGovernance, readProvenance } from "@/lib/review";
import { lineName } from "@/lib/lines";
import {
  beliefDiff,
  citedCaptures,
  claimIdOfPath,
  hasReason,
  proposalEgress,
  reviewReason,
  subjectOfPath,
  type ReviewReason,
} from "@/lib/proposal-diff";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

type Member = Schemas["ReviewedMember"];
type Review = Schemas["ProposalReview"];
type ProposalCard = Schemas["GetProposalCard"];
type CaptureCard = Schemas["GetCaptureCard"];

/**
 * One proposal, read-only, for deciding it: the header answers the review
 * questions (status, who and which run, when, why it is in review, who must
 * approve, refused before), then what it changes. Beliefs read as a diff
 * grid (one row per Subject, one column per ClaimType; a cell opens the
 * change, its evidence and rationale in a side panel); definitions as their
 * own rows, each opening to a readable before/after. The Ledger is the
 * history of what was accepted and links here. Approving, activating,
 * rejecting and withdrawing stay on the CLI/MCP: the console has no route for
 * them (READ_ROUTES).
 *
 * Reads per load: the card, the review, the origin run's card (why in
 * review), the ClaimTypes section (cardinality, cached), and one get-batch per
 * 64 distinct cited Captures. Never a read per Claim.
 */
export function ProposalScreen() {
  const { id = "" } = useParams();
  const card = useCard(id);
  const proposal = cardOf(card.data, "proposal");
  const [reasonCursors, setReasonCursors] = useState<string[]>([]);
  const review = useReview(id === "" ? null : id, reasonCursors[reasonCursors.length - 1]);
  usePageTitle(`Proposal ${id.slice(0, 19)}`);
  // The proposal's own words (never its terminal reason, which the Status shows).
  const words = proposal?.rationale ?? review.data?.rationale ?? null;
  const origin = readProposalOrigin(words);
  const runId = origin?.run ?? review.data?.item_reasons?.[0]?.run_id ?? null;
  const run = cardOf(useCard(runId ? `ProcedureRun:${runId}` : null).data, "procedure_run");
  const reason = useMemo(() => reviewReason(proposalEgress(run?.terminal_egress, id)), [run, id]);

  const members = review.data?.members;
  const hasClaims = members?.some((m) => m.artifact_kind === "claim") ?? false;
  const claimTypes = useClaimTypes(hasClaims);
  const cardinality = useMemo(
    () => (claimTypes.data ? new Map(claimTypes.data.rows.map((p) => [p.predicate, p.cardinality])) : undefined),
    [claimTypes.data],
  );
  const diff = useMemo(() => (members ? beliefDiff(members, cardinality) : null), [members, cardinality]);
  const captureRefs = useMemo(() => (members ? citedCaptures(members).map((d) => `Capture:${d}`) : []), [members]);
  const captureReads = useGetBatch(captureRefs);
  const captures = useMemo(() => {
    const out = new Map<string, CaptureCard>();
    for (const result of captureReads.results) {
      const capture = cardOf(result, "capture");
      if (capture) out.set(capture.digest, capture);
    }
    return out;
  }, [captureReads.results]);
  const reasons = useMemo(() => new Map((review.data?.item_reasons ?? []).map((r) => [r.path, r])), [review.data]);
  const context = useMemo<DiffContext>(
    () => ({ captures, reasons, accepted: proposal?.status === "settled" && proposal.reason === "accepted" }),
    [captures, reasons, proposal],
  );

  const only = review.data?.members.length === 1 ? memberSummary(review.data.members[0]!) : null;
  // Titled by the Procedure that proposed it, else its short words, else its one change.
  const headline = origin
    ? origin.procedure.replace(/^Procedure:/, "")
    : words !== null && words.length <= 160 && !words.includes("\n")
      ? words
      : only?.name
        ? `${only.kind ?? "Change"} ${only.name}`
        : null;
  // Item reasons read in the side panel; the list stays only when they page past what is loaded.
  const paged = (review.data?.item_reason_count ?? 0) > (review.data?.item_reasons?.length ?? 0) || reasonCursors.length > 0;
  const beliefs = diff !== null && diff.rows.length > 0;

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
        facts={<ProposalFacts proposal={proposal} review={review.data} origin={origin} runId={runId} reason={reason} />}
      >
        {words && !headline && !origin && (
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
      {review.data && diff && (
        <>
          {diff.definitions.length > 0 && (
            <Panel title="Definitions" meta={<span>{diff.definitions.length}</span>}>
              <DefinitionChanges definitions={diff.definitions} />
            </Panel>
          )}
          {beliefs && (
            <Panel title="Changes">
              <BeliefDiffView diff={diff} context={context} />
              {review.data.prior_refusal_coverage && (
                <div className="t-meta mt-3" title="How far the refusal index has read; refusals after this are not yet shown">
                  Refusals indexed to g{review.data.prior_refusal_coverage.indexed_through_generation} of g
                  {review.data.prior_refusal_coverage.accepted_generation}
                </div>
              )}
            </Panel>
          )}
          {review.isSuccess && review.data.members.length === 0 && (
            <Panel title="Changes">
              <EmptyState>None</EmptyState>
            </Panel>
          )}
          {diff.unreadable.length > 0 && <WithheldPanel members={diff.unreadable} reasons={reasons} />}
          {paged && (
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

const SCOPE_TERM: Record<string, string> = {
  claim_type: "ClaimType",
  change_kind: "change kind",
  basis: "basis",
  value: "value",
  subject: "Subject",
};

/** Why in review: each change the settle grant's scope left out (`epss_score · revise · extracted`), then what capped the terminal. */
function WhyInReview({ reason }: { reason: ReviewReason }) {
  const short = (claimType: string) => claimType.split(".").slice(-1)[0] ?? claimType;
  return (
    <span className="flex flex-col gap-1">
      {reason.gaps.length > 0 && (
        <span className="flex flex-wrap gap-1">
          {reason.gaps.map((gap, i) => (
            <span
              key={`${gap.claim_type}-${gap.change}-${gap.basis ?? ""}-${gap.term}-${i}`}
              className="border border-zinc-700 px-1.5 py-px font-mono text-[12px] text-zinc-200"
              title={`${gap.claim_type} · outside the grant's ${SCOPE_TERM[gap.term] ?? gap.term}`}
            >
              {[short(gap.claim_type), gap.change, gap.basis].filter(Boolean).join(" · ")}
            </span>
          ))}
        </span>
      )}
      {reason.proposesOnly && reason.gaps.length === 0 && (
        <span>
          <span className="t-meta">Terminal</span> <span className="font-mono">propose</span>
        </span>
      )}
      {reason.limitingTerm && (
        <span>
          <span className="t-meta">Limited by</span> <span className="font-mono">{reason.limitingTerm}</span>
        </span>
      )}
      {reason.cappedBy && (
        <span>
          <span className="t-meta">Capped by</span> <span className="font-mono">{reason.cappedBy}</span>
        </span>
      )}
      {reason.fallbackReason && <span className="text-zinc-300">{reason.fallbackReason}</span>}
    </span>
  );
}

function ProposalFacts({
  proposal,
  review,
  origin,
  runId,
  reason,
}: {
  proposal: ProposalCard | null;
  review: Review | undefined;
  origin: { procedure: string; run: string } | null;
  runId: string | null;
  reason: ReviewReason | null;
}) {
  const instanceId = useInstanceId();
  const governance = review ? readGovernance(review) : null;
  const provenance = review ? readProvenance(review) : null;
  const approvals = review ? readAttestations(review) : [];
  const base = review?.settlement_base.git_oid.slice(0, 12);
  const proposer = proposal?.actor ?? provenance?.actorId ?? null;
  const line = proposal?.originating_line ?? review?.originating_line ?? null;
  const refused = review ? review.members.filter((m) => (m.prior_refusals?.length ?? 0) > 0).length : null;
  return (
    <>
      {proposal && (
        <Fact label="Status">
          <ProposalStateChip status={proposal.status} verdict={proposal.verdict} outcome={proposal.reason} incomplete={proposal.incomplete} />
        </Fact>
      )}
      {line ? (
        <Fact label="Line">
          <Link
            to={withAt(`/i/${instanceId}/lines/${encodeURIComponent(lineName(line.identity.name))}`, null)}
            className="font-mono hover:underline"
          >
            {lineName(line.identity.name)}
          </Link>
        </Fact>
      ) : (
        origin && (
          <Fact label="Procedure">
            <RefLink value={`Procedure:${origin.procedure.replace(/^Procedure:/, "")}`} />
          </Fact>
        )
      )}
      {runId && (
        <Fact label="Run">
          <RefLink value={runId} short />
        </Fact>
      )}
      {proposer && (
        <Fact label="Proposer">
          <span className="font-mono">{proposer}</span>
        </Fact>
      )}
      {proposal?.admitted_at && (
        <Fact label="Proposed" title={proposal.admitted_at}>
          {formatDateTime(proposal.admitted_at)}
        </Fact>
      )}
      {hasReason(reason) && (
        <Fact label="Why in review">
          <WhyInReview reason={reason} />
        </Fact>
      )}
      {governance && (
        <>
          <Fact label="Approvals needed">
            {governance.approvalRequirements.length === 0
              ? "None"
              : governance.approvalRequirements.map((r) => `${r.role} ×${r.minimumDistinctSigners}`).join(", ")}
          </Fact>
          <Fact label="Approved by">
            {approvals.length === 0 ? (
              "—"
            ) : (
              <>
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
      {refused !== null && (
        <Fact label="Refused before" title="Changes an earlier decision refused: read why before approving them again">
          {refused === 0 ? "None" : <span className="font-mono">{refused}</span>}
        </Fact>
      )}
      {governance && (
        <Fact label="Write tier" title={`Activation: ${governance.activationPolicy ?? "—"}`}>
          {governance.requiredTier ?? "—"}
        </Fact>
      )}
      {base && (
        <Fact label="Evaluated against">
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
        <div className="text-zinc-500" title={`Needs a body-reading credential: ${review.redactions.join(", ")}`}>
          Some stored fields are withheld
        </div>
      )}
      {review.projection_advisory && <div className="text-zinc-400">{review.projection_advisory.message}</div>}
    </div>
  );
}

/** A member or change path as a link when it names a Subject or Claim. */
function PathLink({ path, short = false }: { path: string; short?: boolean }) {
  const ref = claimIdOfPath(path) ?? subjectOfPath(path) ?? path;
  return parseRef(ref) ? (
    <RefLink value={ref} short={short} />
  ) : (
    <span className="break-all font-mono text-[12px] text-zinc-400" title={path}>
      {short ? shortId(path) : path}
    </span>
  );
}

function ChangeSetPanel({ proposal }: { proposal: ProposalCard }) {
  return (
    <Panel title="Changes" meta={<span>{proposal.changes?.length ?? 0}</span>}>
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

/**
 * Members this read cannot place in the grid (their artifacts are withheld
 * or not served): one row each, by path, with its rationale; a row opens to
 * the stored fields the review does carry and any prior refusals.
 */
function WithheldPanel({ members, reasons }: { members: Member[]; reasons: ReadonlyMap<string, Schemas["ProposalItemReason"]> }) {
  const columns: Column<Member>[] = [
    { id: "change", header: "", label: "Change", className: "w-4", cell: (m) => <ChangeMark change={m.disposition} /> },
    { id: "path", header: "Change", hideable: false, className: "whitespace-nowrap", cell: (m) => <PathLink path={m.path} /> },
    {
      id: "reason",
      header: "Rationale",
      cell: (m) => {
        const reason = reasons.get(m.path);
        return reason ? <LongText text={`${reason.reason}${reason.truncated ? "…" : ""}`} lines={2} /> : null;
      },
    },
  ];
  return (
    <Panel title="Withheld" description="Changes whose stored records this read does not carry.">
      <DataTable
        rows={members}
        columns={columns}
        rowKey={(m) => m.path}
        label="Withheld changes"
        urlKey="withheld"
        toolbar={false}
        maxHeight="none"
        expanded={(m) => (
          <div className="space-y-2 py-1">
            {(m.prior_refusals?.length ?? 0) > 0 && <PriorRefusals refusals={m.prior_refusals!} />}
            <DeltaTable member={m} />
          </div>
        )}
        canExpand={(m) => m.semantic_delta.length > 0 || (m.prior_refusals?.length ?? 0) > 0}
      />
    </Panel>
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
