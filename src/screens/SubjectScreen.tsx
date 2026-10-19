import { useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Waypoints } from "lucide-react";
import {
  useAdmissionAccounts,
  useCard,
  useClaimEvidence,
  useClaimRevisions,
  useGetBatch,
  useInstanceId,
  useOrientKinds,
  useSubjectHistory,
} from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import {
  cardOf,
  type CaptureAdmissionAccount,
  type GetClaimCard,
  type GetRevision,
  type GetSubjectCard,
  type OrientPredicate,
  type SubjectHistoryEvent,
} from "@/api/schemas";
import { actionChipClass, Chip } from "@/components/Chip";
import { Corroboration, type CorroborationSummary } from "@/components/Corroboration";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { IncomingList } from "@/components/IncomingList";
import { useAtLink, withAt } from "@/lib/at";
import { formatRef, parseRef } from "@/lib/cruxible-ref";
import { predicateIndex } from "@/lib/neighborhood";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

type SubjectClaim = GetSubjectCard["claims"][number];

function claimIds(entry: SubjectClaim): string[] {
  return Array.isArray(entry.claim) ? entry.claim : [entry.claim];
}

/**
 * One Subject at the pinned generation: its card (every slot's answer with
 * read flags), each Claim's verdict and contenders, admission accounts, and,
 * per Claim on expand, its evidence (Captures, attestations, rationale) and
 * revisions; then the Subject's field history, paged. Every read is this
 * Subject's own: the card, ⌈Claims/64⌉ get-batch calls for verdicts,
 * ⌈Claims/256⌉ read-batch calls for admission, and one read per expansion.
 */
export function SubjectScreen() {
  const { ref: raw = "" } = useParams();
  const instanceId = useInstanceId();
  const link = useAtLink();
  const parsed = parseRef(raw);
  const ref = parsed?.kind === "subject" ? formatRef(parsed) : null;
  const card = useCard(ref);
  const subject = cardOf(card.data, "subject");
  const kinds = useOrientKinds();
  const predicates = useMemo(() => predicateIndex(kinds.data?.kinds ?? []), [kinds.data]);
  const ids = useMemo(() => (subject?.claims ?? []).flatMap(claimIds), [subject]);
  const verdicts = useGetBatch(ids);
  const admission = useAdmissionAccounts(ids);
  const claimCards = useMemo(() => {
    const byId = new Map<string, GetClaimCard>();
    for (const result of verdicts.results) {
      const claim = cardOf(result, "claim");
      if (claim) byId.set(claim.claim, claim);
    }
    return byId;
  }, [verdicts.results]);
  usePageTitle(ref ?? raw);

  if (!ref) {
    return (
      <div className="text-[14px] text-zinc-400">
        <code className="font-mono text-zinc-300">{raw}</code> is not a Subject reference (kind/id).
      </div>
    );
  }
  if (card.isPending) return <LoadState />;
  if (card.error) {
    const missing = card.error instanceof ApiError && card.error.errorCode === "cruxible.get.ref_not_found";
    return <LoadState error={missing ? new Error(`No accepted Subject ${ref} at this generation.`) : card.error} />;
  }
  if (!subject) return <LoadState error={new Error(`${ref} did not resolve to a Subject card`)} />;
  const [kind, id] = [subject.kind, subject.subject.slice(subject.kind.length + 1)];

  return (
    <div className="max-w-6xl space-y-3">
      <header>
        <div className="flex flex-wrap items-center gap-3 text-[13px]">
          <Link
            to={link(`/i/${instanceId}/map?kind=${encodeURIComponent(kind)}`)}
            className="font-mono text-[12px] text-zinc-400 hover:underline"
          >
            {kind}
          </Link>
          <Chip value={subject.lifecycle} />
          <span className="text-zinc-500" title="Subject-valued Claims pointing at this Subject">
            ← <span className="font-mono text-zinc-300">{subject.incoming_count}</span> incoming
          </span>
          <span className="text-zinc-600">
            generation <span className="font-mono">{card.data!.coordinate.generation}</span>
          </span>
          <Link
            to={link(`/i/${instanceId}/s/${encodeURIComponent(subject.subject)}/graph`)}
            className={`ml-auto inline-flex items-center gap-1.5 ${actionChipClass}`}
          >
            <Waypoints className="h-3 w-3" />
            Neighborhood
          </Link>
        </div>
        <h1 className="mt-1 break-all font-mono text-[17px] font-semibold text-zinc-100">{id}</h1>
      </header>

      <Panel
        title="Claims"
        meta={
          <span>
            {subject.claims.length} fields · {ids.length} Claims
            {verdicts.isPending && " · reading verdicts…"}
          </span>
        }
      >
        {subject.claims.length === 0 && <EmptyState>No live Claims.</EmptyState>}
        {verdicts.error && <LoadState error={verdicts.error} />}
        {admission.error && <LoadState error={admission.error} />}
        <div className="divide-y divide-zinc-800/60">
          {subject.claims.map((entry) => (
            <ClaimRow
              key={`${entry.predicate}\n${entry.qualifier ?? ""}`}
              kind={kind}
              entry={entry}
              descriptor={predicates.get(`${kind}\n${entry.predicate}`)}
              cards={claimCards}
              accounts={admission.byClaim}
            />
          ))}
        </div>
      </Panel>

      {subject.incoming_count > 0 && (
        <Panel title="Pointed at by" meta={<span>{subject.incoming_count}</span>}>
          <IncomingList subject={subject.subject} total={subject.incoming_count} />
        </Panel>
      )}

      <HistoryPanel subjectRef={subject.subject} />
    </div>
  );
}

function ClaimRow({
  kind,
  entry,
  descriptor,
  cards,
  accounts,
}: {
  kind: string;
  entry: SubjectClaim;
  descriptor: OrientPredicate | undefined;
  cards: Map<string, GetClaimCard>;
  accounts: Map<string, CaptureAdmissionAccount[]>;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const [open, setOpen] = useState(false);
  const ids = claimIds(entry);
  const predicate = descriptor?.predicate ?? entry.predicate;
  return (
    <div className="py-1.5">
      <div className="grid grid-cols-[1.25rem_minmax(8rem,14rem)_minmax(0,1fr)_minmax(0,16rem)] items-baseline gap-x-3 text-[13px]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={`${open ? "Collapse" : "Expand"} ${entry.predicate}`}
          className="text-zinc-500 hover:text-zinc-200"
        >
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
        <Link
          to={link(`/i/${instanceId}/map?kind=${encodeURIComponent(kind)}&claim_type=${encodeURIComponent(predicate)}`)}
          className="truncate font-mono text-[12px] text-zinc-400 hover:underline"
          title={`${predicate}${descriptor ? ` · ${descriptor.cardinality} · ${descriptor.type}` : ""}`}
        >
          {entry.predicate}
          {entry.qualifier && <span className="text-zinc-600">[{entry.qualifier}]</span>}
        </Link>
        <div className="min-w-0 text-zinc-200">
          <ShownValue value={entry.value} />
        </div>
        <div className="flex flex-wrap justify-end gap-x-2 gap-y-0.5">
          {(entry.flags ?? []).map((flag) => (
            <Chip key={flag} value={flag} />
          ))}
          {ids.map((id) => {
            const claim = cards.get(id);
            return claim ? <Chip key={id} value={claim.verdict} /> : null;
          })}
          <AdmissionSummary accounts={ids.flatMap((id) => accounts.get(id) ?? [])} />
        </div>
      </div>
      {open && (
        <div className="ml-8 mt-1.5 space-y-2">
          {ids.map((id) => (
            <ClaimDetail key={id} claimId={id} card={cards.get(id)} accounts={accounts.get(id)} />
          ))}
        </div>
      )}
    </div>
  );
}

function AdmissionSummary({ accounts }: { accounts: CaptureAdmissionAccount[] }) {
  const evidence = accounts.filter((a) => a.citation_role === "evidence");
  if (evidence.length === 0) return null;
  const admitted = evidence.filter((a) => a.status === "admitted").length;
  return (
    <span
      className={`text-[12px] ${admitted < evidence.length ? "text-amber-400/90" : "text-zinc-500"}`}
      title="Evidence citations admitted by the ClaimType's evidence rules"
    >
      {admitted}/{evidence.length} admitted
    </span>
  );
}

/** One Claim, expanded: verdict and contenders, evidence, admission, revisions. */
function ClaimDetail({
  claimId,
  card,
  accounts,
}: {
  claimId: string;
  card: GetClaimCard | undefined;
  accounts: CaptureAdmissionAccount[] | undefined;
}) {
  const evidence = useClaimEvidence(claimId);
  const revisions = useClaimRevisions(claimId);
  const ev = evidence.data?.evidence ?? null;
  const history = revisions.data?.history;
  const revisionRows: GetRevision[] = history?.kind === "revisions" ? history.revisions : [];
  return (
    <div className="border border-zinc-800 bg-zinc-900/30 p-2 text-[12px]">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <RefLink value={claimId} />
        {card && (
          <>
            <span className="text-zinc-500">
              verdict <Chip value={card.verdict} />
            </span>
            <span className="text-zinc-500">
              status <Chip value={card.status} />
            </span>
            <span className="text-zinc-500">
              revision <span className="font-mono text-zinc-300">{card.revision}</span>
            </span>
          </>
        )}
        {ev && <Corroboration summary={corroboration(ev.attestations)} />}
      </div>

      {(card?.contenders?.length ?? 0) > 0 && (
        <Section title="Contenders">
          {card!.contenders!.map((contender) => (
            <div key={contender.claim} className="flex flex-wrap items-baseline gap-x-3">
              <RefLink value={contender.claim} />
              <ShownValue value={contender.value} />
              <Chip value={contender.verdict} />
            </div>
          ))}
        </Section>
      )}

      {evidence.isPending && <div className="mt-1 animate-pulse text-zinc-600">Reading evidence…</div>}
      {evidence.error && <div className="mt-1 text-red-400/80">{evidence.error.message}</div>}
      {ev && (
        <>
          {ev.rationale && (
            <Section title="Rationale">
              <div className="whitespace-pre-wrap text-zinc-300">{ev.rationale}</div>
            </Section>
          )}
          <Section title={`Captures (${ev.captures.length})`}>
            {ev.captures.length === 0 && <div className="text-zinc-600">No cited Captures.</div>}
            {ev.captures.map((capture) => (
              <div key={`${capture.capture}\n${capture.role}`} className="flex flex-wrap items-baseline gap-x-3">
                <RefLink value={capture.capture} />
                <span className="font-mono text-zinc-400">
                  {capture.contract} v{capture.version}
                </span>
                <span className="text-zinc-500">{capture.role}</span>
                <span className="text-zinc-500" title={capture.observed_at}>
                  observed {formatDateTime(capture.observed_at)}
                </span>
                <span className="min-w-0 truncate text-zinc-500" title={capture.source}>
                  {capture.source}
                </span>
                <Chip value={capture.admitted ? "admitted" : "not_admitted"} />
              </div>
            ))}
          </Section>
          {ev.attestations.length > 0 && (
            <Section title={`Attestations (${ev.attestations.length})`}>
              {ev.attestations.map((attestation, i) => (
                <div key={i} className={`flex flex-wrap gap-x-3 ${attestation.current ? "" : "opacity-60"}`}>
                  <Chip value={attestation.stance} />
                  <span className="font-mono text-zinc-400">{attestation.principal}</span>
                  <span className="text-zinc-500" title={attestation.at}>
                    {formatDateTime(attestation.at)}
                  </span>
                  {!attestation.current && <span className="text-zinc-600">against earlier content</span>}
                </div>
              ))}
            </Section>
          )}
        </>
      )}

      {accounts && accounts.length > 0 && (
        <Section title="Admission accounts">
          <table className="w-full text-left">
            <thead className="text-zinc-600">
              <tr>
                <th className="pr-3 font-medium">Capture</th>
                <th className="pr-3 font-medium">Contract</th>
                <th className="pr-3 font-medium">Role</th>
                <th className="pr-3 font-medium">Origin</th>
                <th className="pr-3 font-medium">Status</th>
                <th className="font-medium">Rules</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.citation_id} className="border-t border-zinc-900 align-top">
                  <td className="pr-3">
                    <RefLink value={`CAP-${account.capture_digest.replace(/^sha256:/, "").slice(0, 12)}`} />
                  </td>
                  <td className="pr-3 font-mono text-zinc-400">{account.capture_contract_identity}</td>
                  <td className="pr-3 text-zinc-400">{account.citation_role}</td>
                  <td className="pr-3 text-zinc-400">{account.citation_origin}</td>
                  <td className="pr-3">
                    <Chip value={account.status} />
                  </td>
                  <td className="text-zinc-500">
                    {account.decisions
                      .map(
                        (decision) =>
                          `${decision.evidence_kind}: ${decision.status}` +
                          (decision.rule_id ? ` (${decision.rule_id})` : "") +
                          (decision.refusal_code ? ` ${decision.refusal_code}` : ""),
                      )
                      .join("; ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      )}

      {revisionRows.length > 0 && (
        <Section title="Revisions">
          {revisionRows.map((revision) => (
            <RevisionLine key={`${revision.revision}\n${revision.sequence}`} revision={revision} />
          ))}
        </Section>
      )}
    </div>
  );
}

/** Attestation counts: current attestations by stance, and distinct principals. */
function corroboration(attestations: { stance: string; principal: string; current: boolean }[]): CorroborationSummary {
  const current = attestations.filter((a) => a.current);
  const count = (stance: string) => current.filter((a) => a.stance === stance).length;
  const stale = attestations.filter((a) => !a.current);
  return {
    support_count: count("support"),
    contradict_count: count("contradict"),
    unsure_count: count("unsure"),
    distinct_actor_count: new Set(current.map((a) => a.principal)).size,
    stale_content: {
      support_count: stale.filter((a) => a.stance === "support").length,
      contradict_count: stale.filter((a) => a.stance === "contradict").length,
      unsure_count: stale.filter((a) => a.stance === "unsure").length,
    },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-2">
      <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">{title}</div>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

/** "view state then": the generation link keeps the current path. */
function GenerationLink({ sequence }: { sequence: number }) {
  const { pathname } = useLocation();
  return (
    <Link to={withAt(pathname, String(sequence))} className="font-mono text-zinc-300 hover:underline" title="View state at this generation">
      g{sequence}
    </Link>
  );
}

function ReasonText({ reason }: { reason: SubjectHistoryEvent["reason"] | GetRevision["reason"] }) {
  if (!reason) return null;
  return (
    <span className="text-zinc-400">
      {reason.kind === "change_set" ? reason.text : reason.reason}
      {reason.truncated && "…"}
      {reason.kind === "procedure_item" && (
        <span className="text-zinc-600">
          {" "}
          · {reason.procedure} <RefLink value={`ProcedureRun:${reason.run}`} />
        </span>
      )}
    </span>
  );
}

function RevisionLine({ revision }: { revision: GetRevision }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3">
      <span className="font-mono text-zinc-500">r{revision.revision}</span>
      <GenerationLink sequence={revision.sequence} />
      {revision.change && <Chip value={revision.change} />}
      {revision.value !== undefined && <ShownValue value={revision.value} />}
      {revision.actor && <span className="font-mono text-zinc-400">{revision.actor}</span>}
      {(revision.approved_by?.length ?? 0) > 0 && (
        <span className="text-zinc-500">approved by {revision.approved_by!.join(", ")}</span>
      )}
      <span className="text-zinc-600" title={revision.accepted}>
        {formatDateTime(revision.accepted)}
      </span>
      <ReasonText reason={revision.reason} />
    </div>
  );
}

/** The Subject's field history, newest first, a page at a time (O(page)). */
function HistoryPanel({ subjectRef }: { subjectRef: string }) {
  const [cursors, setCursors] = useState<string[]>([]);
  const cursor = cursors[cursors.length - 1];
  const read = useSubjectHistory(subjectRef, cursor);
  const history = read.data?.history;
  const events: SubjectHistoryEvent[] = history?.kind === "subject" ? history.events : [];
  return (
    <Panel
      title="Field history"
      meta={
        <span className="flex gap-2">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Newer
            </button>
          )}
          {read.data?.next_cursor && (
            <button
              onClick={() => setCursors((c) => [...c, read.data!.next_cursor!])}
              className="hover:text-zinc-200"
            >
              Older →
            </button>
          )}
        </span>
      }
    >
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {read.data && events.length === 0 && <EmptyState>No field events.</EmptyState>}
      <div className="divide-y divide-zinc-800/60">
        {events.map((event, i) => (
          <div key={`${event.claim}\n${event.sequence}\n${i}`} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-1 text-[12px]">
            <GenerationLink sequence={event.sequence} />
            <Chip value={event.change ?? "stated"} />
            <span className="font-mono text-zinc-400">{event.field}</span>
            {event.change === "changed" && event.before !== undefined && (
              <>
                <span className="text-zinc-500 line-through decoration-zinc-700">
                  <ShownValue value={event.before} />
                </span>
                <span className="text-zinc-600">→</span>
              </>
            )}
            {event.value !== undefined && (
              <span className="text-zinc-200">
                <ShownValue value={event.value} />
              </span>
            )}
            {event.change === "retired" && event.retirement && (
              <span className="text-zinc-500">{event.retirement}</span>
            )}
            {"contended" in event && event.contended && <Chip value="contested" />}
            {event.actor && <span className="font-mono text-zinc-500">{event.actor}</span>}
            {(event.approved_by?.length ?? 0) > 0 && (
              <span className="text-zinc-500">approved by {event.approved_by!.join(", ")}</span>
            )}
            <span className="text-zinc-600" title={event.accepted}>
              {formatDateTime(event.accepted)}
            </span>
            <ReasonText reason={event.reason} />
          </div>
        ))}
      </div>
    </Panel>
  );
}
