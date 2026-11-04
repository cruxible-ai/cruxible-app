import { claimCaptures, claimObject, readProposalOrigin } from "@/components/ProposalChanges";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCard, useInstanceId, useReview } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { ChangeMark, SignalDot } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { InfoButton } from "@/components/InfoButton";
import { ProposalStateChip } from "@/components/ProposalList";
import { LongText } from "@/components/LongText";
import { Fact, Page, PageHeader } from "@/components/Page";
import { LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShortId, shortId } from "@/components/ShortId";
import { ShownValue } from "@/components/ShownValue";
import { withAt } from "@/lib/at";
import { parseRef } from "@/lib/cruxible-ref";
import { captureHandle } from "@/lib/next-reasons";
import { groupDeltas, memberSummary, readAttestations, readGovernance, readProvenance, type MemberSummary } from "@/lib/review";
import { lineName } from "@/lib/lines";
import { useAtLink } from "@/lib/at";
import { formatDateTime, formatWhen } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { artifactNoun, changeMark } from "@/lib/vocabulary";

type Member = Schemas["ReviewedMember"];
type Review = Schemas["ProposalReview"];
type ProposalCard = Schemas["GetProposalCard"];

/**
 * One proposal, read-only: its card (status, verdict, who, when, why, the
 * change set) through get, and its review (members with field-level deltas
 * and prior refusals, governance, approvals recorded, item reasons paged).
 * A proposal page is for the decision: what would change (one row per
 * change, the stored record's fields behind a row's disclosure), who must
 * approve it and what happened to it. The Ledger is the history of what was
 * accepted; it links here for the decision behind a generation. Approving, activating,
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
  // The proposal's own words (never its terminal reason, which the Status shows).
  const words = proposal?.rationale ?? null;
  const origin = readProposalOrigin(words);
  const only = review.data?.members.length === 1 ? memberSummary(review.data.members[0]!) : null;
  // Titled by the Procedure that proposed it, else its short words, else its one change.
  const headline = origin
    ? origin.procedure.replace(/^Procedure:/, "")
    : words !== null && words.length <= 160 && !words.includes("\n")
      ? words
      : only?.name
        ? `${only.kind ?? "Change"} ${only.name}`
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
        facts={<ProposalFacts proposal={proposal} review={review.data} origin={origin} />}
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
      {review.data && (
        <>
          <ChangesPanel review={review.data} />
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

/** "+34 Claims, +2 Subjects": the changes by mark and artifact kind, in first-seen order. */
function changeCounts(proposal: ProposalCard, review: Review | undefined): string {
  const counts = new Map<string, Map<string, number>>();
  for (const member of review?.members ?? []) {
    const mark = changeMark(member.disposition).mark;
    const byKind = counts.get(mark) ?? new Map<string, number>();
    byKind.set(member.artifact_kind, (byKind.get(member.artifact_kind) ?? 0) + 1);
    counts.set(mark, byKind);
  }
  const parts = [...counts.entries()].flatMap(([mark, byKind]) => [...byKind.entries()].map(([kind, count]) => `${mark}${artifactNoun(kind, count)}`));
  return parts.length > 0 ? parts.join(", ") : String(review?.members.length ?? proposal.changes?.length ?? 0);
}

function ProposalFacts({
  proposal,
  review,
  origin,
}: {
  proposal: ProposalCard | null;
  review: Review | undefined;
  origin: { procedure: string; run: string } | null;
}) {
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
      {proposal?.originating_line ? (
        <Fact label="Line">
          <Link
            to={withAt(`/i/${instanceId}/lines/${encodeURIComponent(lineName(proposal.originating_line.identity.name))}`, null)}
            className="font-mono hover:underline"
          >
            {lineName(proposal.originating_line.identity.name)}
          </Link>
        </Fact>
      ) : (
        origin && (
          <Fact label="Procedure">
            <RefLink value={`Procedure:${origin.procedure.replace(/^Procedure:/, "")}`} />
          </Fact>
        )
      )}
      {origin && (
        <Fact label="Run">
          <RefLink value={origin.run} short />
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
      {proposal && <Fact label="Changes">{changeCounts(proposal, review)}</Fact>}
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

/** One change, read for the table: what it is about, its value before and after, what it cites. */
interface ChangeRow {
  member: Member;
  summary: MemberSummary;
  subject: string | null;
  what: string;
  before: { text: string; ref: string | null } | null;
  after: { text: string; ref: string | null } | null;
  captures: string[];
  /** The Subject is created by this proposal: its own creation is folded into this row. */
  newSubject: Member | null;
}

/** "subjects/security.vulnerability/cve-1.json" -> "security.vulnerability/cve-1" */
function subjectOfPath(path: string | null): string | null {
  return path ? (/^subjects\/(.+)\.json$/.exec(path)?.[1] ?? path) : null;
}

function changeRow(member: Member): ChangeRow {
  const summary = memberSummary(member);
  const claim = summary.claim;
  if (claim) {
    const subject = subjectOfPath(claim.subject);
    const kind = subject?.split("/")[0] ?? "";
    const predicate = claim.predicate ?? "Claim";
    return {
      member,
      summary,
      subject,
      what: predicate.startsWith(`${kind}.`) ? predicate.slice(kind.length + 1) : predicate,
      before: claimObject(member.base_semantic_artifact),
      after: claimObject(member.candidate_semantic_artifact),
      captures: claimCaptures(member.candidate_semantic_artifact ?? member.base_semantic_artifact),
      newSubject: null,
    };
  }
  if (summary.kind === "Subject" && summary.name) {
    return { member, summary, subject: summary.name, what: "Subject", before: null, after: null, captures: [], newSubject: null };
  }
  return { member, summary, subject: null, what: summary.kind ?? member.artifact_kind, before: null, after: null, captures: [], newSubject: null };
}

/**
 * One row per change, except that a created Subject folds into its Claims'
 * rows (marked new) instead of a row of its own; a Subject created with no
 * Claim in this proposal keeps its row.
 */
export function changeRows(members: Member[]): ChangeRow[] {
  const all = members.map(changeRow);
  const created = new Map(all.filter((r) => r.what === "Subject" && r.subject !== null).map((r) => [r.subject!, r.member]));
  const withClaims = new Set(all.filter((r) => r.summary.claim && r.subject !== null && created.has(r.subject)).map((r) => r.subject!));
  // The Subject's creation rides on its first Claim row (the key Claim sorts with the rest).
  const folded = new Set<string>();
  return all
    .filter((r) => !(r.what === "Subject" && r.subject !== null && withClaims.has(r.subject)))
    .sort((a, b) => (a.subject ?? "").localeCompare(b.subject ?? "") || a.what.localeCompare(b.what))
    .map((r) => {
      if (!r.summary.claim || r.subject === null || !withClaims.has(r.subject) || folded.has(r.subject)) return r;
      folded.add(r.subject);
      return { ...r, newSubject: created.get(r.subject) ?? null };
    });
}

function ShownChange({ value, muted = false }: { value: { text: string; ref: string | null }; muted?: boolean }) {
  if (value.ref) return <RefLink value={value.ref} />;
  return <span className={`break-words ${muted ? "text-zinc-500" : "text-zinc-100"}`}>{value.text}</span>;
}

/**
 * The proposal's changes, one row each: the change, the Subject it is about,
 * the ClaimType (or definition), the value (before -> after when revised), the
 * Captures it cites and whether it was refused before. A row opens to the
 * stored record's fields as the review diffs them, and any prior refusals.
 */
function ChangesPanel({ review }: { review: Review }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  // By Subject, then ClaimType, so one Subject's changes read together.
  const rows = useMemo(() => changeRows(review.members), [review.members]);
  const columns = useMemo<Column<ChangeRow>[]>(
    () => [
      {
        id: "change",
        header: "",
        label: "Change",
        className: "w-4",
        sortValue: (r) => changeMark(r.member.disposition).mark,
        cell: (r) => <ChangeMark change={r.member.disposition} />,
      },
      {
        id: "subject",
        header: "Subject",
        sortValue: (r) => r.subject ?? "",
        className: "whitespace-nowrap",
        cell: (r) =>
          r.subject ? (
            <span className="inline-flex items-baseline gap-2">
              <RefLink value={r.subject} />
              {r.newSubject && (
                <span className="t-meta" title="This proposal creates the Subject">
                  new
                </span>
              )}
            </span>
          ) : (
            <span className="text-zinc-600">—</span>
          ),
      },
      {
        id: "what",
        header: "ClaimType or definition",
        sortValue: (r) => r.what,
        className: "whitespace-nowrap",
        cell: (r) => {
          const predicate = r.summary.claim?.predicate;
          if (predicate) {
            const kind = r.subject?.split("/")[0] ?? "";
            return (
              <Link
                to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(predicate)}`)}
                className="font-mono text-[12.5px] text-zinc-300 hover:text-zinc-100 hover:underline"
                title={predicate}
              >
                {r.what}
              </Link>
            );
          }
          const ref = r.summary.kind && r.summary.name && r.summary.kind !== "Subject" ? `${r.summary.kind}:${r.summary.name}` : null;
          if (ref && parseRef(ref)) return <RefLink value={ref} />;
          return (
            <span className="text-zinc-300" title={r.member.path}>
              {r.what}
              {r.summary.kind !== "Subject" && r.summary.name && <span className="ml-1.5 font-mono text-[12px] text-zinc-400">{r.summary.name}</span>}
            </span>
          );
        },
      },
      {
        id: "value",
        header: "Value",
        className: "min-w-[12rem]",
        cell: (r) =>
          r.before && r.after && r.before.text !== r.after.text ? (
            <span className="flex flex-wrap items-baseline gap-x-2">
              <span className="line-through decoration-zinc-700">
                <ShownChange value={r.before} muted />
              </span>
              <span className="text-zinc-600">→</span>
              <ShownChange value={r.after} />
            </span>
          ) : r.after || r.before ? (
            <ShownChange value={(r.after ?? r.before)!} muted={!r.after} />
          ) : null,
      },
      {
        id: "evidence",
        header: "Evidence",
        className: "whitespace-nowrap",
        cell: (r) =>
          r.captures.length === 0 ? null : (
            <span className="flex flex-wrap gap-x-2">
              {r.captures.map((digest) => (
                <RefLink key={digest} value={captureHandle(digest)} />
              ))}
            </span>
          ),
      },
      {
        id: "refused",
        header: "Refused before",
        title: "An earlier decision refused this Claim: read why before approving it again",
        sortValue: (r) => r.member.prior_refusals?.length ?? 0,
        cell: (r) =>
          (r.member.prior_refusals?.length ?? 0) > 0 ? (
            <span className="inline-flex items-baseline gap-1.5 text-zinc-300">
              <SignalDot signal="wrong" title="Refused before" />
              {r.member.prior_refusals!.length}
            </span>
          ) : null,
      },
    ],
    [instanceId, link],
  );
  // A column no row fills (a definitions-only proposal has no Subjects, values or evidence) is left out.
  const filled: Record<string, (r: ChangeRow) => boolean> = {
    subject: (r) => r.subject !== null,
    value: (r) => r.before !== null || r.after !== null,
    evidence: (r) => r.captures.length > 0,
    refused: (r) => (r.member.prior_refusals?.length ?? 0) > 0,
  };
  const shown = columns.filter((c) => !filled[c.id] || rows.some(filled[c.id]!));
  return (
    <Panel
      title={
        <span className="inline-flex items-center gap-1.5">
          Changes
          <InfoButton label="About changes">
            One row per change this proposal makes. Open a row for the stored record's fields as the review compares them, and any earlier refusals.
          </InfoButton>
        </span>
      }
    >
      <DataTable
        rows={rows}
        columns={shown}
        rowKey={(r) => r.member.path}
        label="Changes"
        urlKey="changes"
        expanded={(r) => (
          <>
            <ChangeDetail member={r.member} />
            {r.newSubject && <ChangeDetail member={r.newSubject} />}
          </>
        )}
        canExpand={(r) => r.member.semantic_delta.length > 0 || (r.member.prior_refusals?.length ?? 0) > 0 || r.newSubject !== null}
      />
      {review.prior_refusal_coverage && (
        <div className="t-meta mt-3" title="How far the refusal index has read; refusals after this are not yet shown">
          Refusals indexed to g{review.prior_refusal_coverage.indexed_through_generation} of g{review.prior_refusal_coverage.accepted_generation}
        </div>
      )}
    </Panel>
  );
}

/** A change, opened: earlier refusals of it, then the stored record's fields. */
function ChangeDetail({ member }: { member: Member }) {
  return (
    <div className="space-y-2 py-1 text-[12px]">
      {(member.prior_refusals?.length ?? 0) > 0 && (
        <div className="space-y-0.5 text-zinc-300">
          {member.prior_refusals!.map((refusal) => (
            <div key={`${refusal.claim_id}\n${refusal.decided_at}`} className="flex flex-wrap items-baseline gap-x-1.5">
              <SignalDot signal="wrong" title="Refused before" />
              <span className="text-zinc-500">{refusal.kind.replaceAll("_", " ")}</span>
              <RefLink value={refusal.claim_id} short />
              <span className="font-mono text-zinc-400">{refusal.decided_by}</span>
              <span className="text-zinc-500" title={refusal.decided_at}>
                {formatWhen(refusal.decided_at)}
              </span>
              {refusal.rationale && <span className="text-zinc-400">{refusal.rationale}</span>}
            </div>
          ))}
        </div>
      )}
      {member.semantic_delta.length > 0 && <DeltaTable member={member} />}
    </div>
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
