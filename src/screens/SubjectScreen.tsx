import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronRight, Waypoints } from "lucide-react";
import {
  useAdmissionAccounts,
  useCard,
  useClaimEvidence,
  useClaimRevisions,
  useGetBatch,
  useInstanceId,
  useOntologyKinds,
  useSubjectHistory,
} from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import {
  cardOf,
  type CaptureAdmissionAccount,
  type GetAttestationEvidence,
  type GetClaimCard,
  type GetRevision,
  type GetSubjectCard,
  type OrientPredicate,
  type SubjectHistoryEvent,
} from "@/api/schemas";
import { actionChipClass, ChangeMark, Chip, SignalDot } from "@/components/Chip";
import { Corroboration, type CorroborationSummary } from "@/components/Corroboration";
import { CountsMark } from "@/components/CountsMark";
import { LongText } from "@/components/LongText";
import { Fact, Page, PageHeader, WithRail } from "@/components/Page";
import { Disclosure, EmptyState, LoadState, Panel, SubSection } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { Table, Td, Th, trClass } from "@/components/Table";
import { IncomingList } from "@/components/IncomingList";
import { useAtLink, withAt } from "@/lib/at";
import { formatRef, parseRef } from "@/lib/cruxible-ref";
import { contractName } from "@/lib/ontology";
import {
  admissionTally,
  basisLabel,
  citationLabel,
  countsReasonText,
  publicName,
  recordLabel,
} from "@/lib/evidence";
import { predicateIndex } from "@/lib/neighborhood";
import { formatWhen } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term } from "@/lib/vocabulary";

type SubjectClaim = GetSubjectCard["claims"][number];

function claimIds(entry: SubjectClaim): string[] {
  return Array.isArray(entry.claim) ? entry.claim : [entry.claim];
}

/** Verdicts that need no attention are named once, in the header tally; field rows leave them out. */
const QUIET_VERDICTS = new Set(["supported"]);

/**
 * One Subject at the pinned generation: its card (every slot's answer with
 * read flags), each Claim's verdict and contenders, admission accounts, and,
 * per Claim on expand, its evidence (each cited Capture labelled and with its
 * state, each attestation with whether it counts toward the verdict, the
 * rationale) and revisions; then the Subject's field history, paged. Every read is this
 * Subject's own: the card, ⌈Claims/64⌉ get-batch calls for verdicts,
 * ⌈Claims/256⌉ read-batch calls for admission, and one read per expansion.
 *
 * Layout: the header says how healthy the card is (verdict tally, evidence
 * admitted); the field list shows each value once, quiet when supported;
 * history groups one change set's events under one line.
 */
export function SubjectScreen() {
  const { ref: raw = "" } = useParams();
  // ?claim=CLM-… opens that Claim's field with its evidence (the kind table's cells link here)
  const [params] = useSearchParams();
  const focusClaim = params.get("claim");
  const instanceId = useInstanceId();
  const link = useAtLink();
  const parsed = parseRef(raw);
  const ref = parsed?.kind === "subject" ? formatRef(parsed) : null;
  const card = useCard(ref);
  const subject = cardOf(card.data, "subject");
  const kinds = useOntologyKinds();
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

  const tally = new Map<string, number>();
  for (const claim of claimCards.values()) tally.set(claim.verdict, (tally.get(claim.verdict) ?? 0) + 1);
  const evidence = admissionTally([...admission.byClaim.values()].flat());

  return (
    <Page>
      <PageHeader
        kind={kind}
        kindHref={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}`)}
        title={id}
        mono
        actions={
          <Link
            to={link(`/i/${instanceId}/s/${encodeURIComponent(subject.subject)}/graph`)}
            className={`inline-flex items-center gap-1.5 ${actionChipClass}`}
          >
            <Waypoints className="h-3 w-3" />
            Neighborhood
          </Link>
        }
        summary={
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {ids.length === 0 && <span>No live Claims.</span>}
            {verdicts.isPending && ids.length > 0 && <span className="t-meta animate-pulse">reading verdicts…</span>}
            {[...tally.entries()]
              .sort(([a], [b]) => (QUIET_VERDICTS.has(a) ? 1 : 0) - (QUIET_VERDICTS.has(b) ? 1 : 0))
              .map(([verdict, count]) => (
                <span key={verdict} className="inline-flex items-baseline gap-1.5 text-[13px]">
                  <Chip concept="claim" value={verdict} />
                  <span className="font-mono text-zinc-200">{count}</span>
                </span>
              ))}
          </span>
        }
        facts={
          <>
            <Fact label="State">
              <Chip concept="lifecycle" value={subject.lifecycle} />
            </Fact>
            <Fact
              label="Evidence admitted"
              title="Citations offered as evidence that their ClaimTypes' rules admit, so the verdict reads them; a copy the rule does not admit is not evidence"
            >
              {evidence.offered === 0 ? (
                <span className="text-zinc-500">{evidence.notEvidence === 0 ? "no evidence citations" : "none"}</span>
              ) : (
                <span className="inline-flex items-baseline gap-1.5">
                  {evidence.admitted < evidence.offered && (
                    <SignalDot signal="wrong" title={term("evidence", "not_admitted").meaning} />
                  )}
                  {evidence.admitted} of {evidence.offered}
                </span>
              )}
              {evidence.notEvidence > 0 && <span className="text-zinc-500"> · {evidence.notEvidence} not evidence</span>}
            </Fact>
            <Fact label="Incoming links" title="Subject-valued Claims pointing at this Subject">
              <span className="font-mono">{subject.incoming_count}</span>
            </Fact>
            <Fact label="Generation">
              <span className="font-mono">{card.data!.coordinate.generation}</span>
            </Fact>
          </>
        }
      />

      <WithRail
        rail={
          subject.incoming_count > 0 ? (
            <Panel title="Pointed at by" meta={<span>{subject.incoming_count}</span>}>
              <IncomingList subject={subject.subject} total={subject.incoming_count} />
            </Panel>
          ) : null
        }
      >
        <Panel
          title="Fields"
          meta={
            <span>
              {subject.claims.length} fields · {ids.length} Claims
            </span>
          }
        >
          {subject.claims.length === 0 && <EmptyState>No live Claims.</EmptyState>}
          {verdicts.error && <LoadState error={verdicts.error} />}
          {admission.error && <LoadState error={admission.error} />}
          <div className="divide-y divide-zinc-800/70">
            {subject.claims.map((entry) => (
              <ClaimRow
                key={`${entry.predicate}\n${entry.qualifier ?? ""}`}
                kind={kind}
                entry={entry}
                descriptor={predicates.get(`${kind}\n${entry.predicate}`)}
                cards={claimCards}
                accounts={admission.byClaim}
                focus={focusClaim}
              />
            ))}
          </div>
        </Panel>

        <HistoryPanel subjectRef={subject.subject} />
      </WithRail>
    </Page>
  );
}

/** A slot's answer: text clamps to two lines; refs, numbers and structured values as get shows them. */
function FieldValue({ value }: { value: unknown }) {
  if (typeof value === "string" && !parseRef(value)) return <LongText text={value} lines={2} className="text-zinc-100" />;
  if (
    typeof value === "object" &&
    value !== null &&
    (value as { truncated?: unknown }).truncated === true &&
    typeof (value as { preview?: unknown }).preview === "string"
  ) {
    const { preview, length } = value as { preview: string; length?: unknown };
    return (
      <div className="measure">
        <LongText text={`${preview}…`} lines={2} className="text-zinc-100" />
        <span className="t-meta" title="get serves a preview; the whole text is in the Claim's evidence read">
          preview of {String(length)} characters
        </span>
      </div>
    );
  }
  return (
    <span className="text-zinc-100">
      <ShownValue value={value} />
    </span>
  );
}

function ClaimRow({
  kind,
  entry,
  descriptor,
  cards,
  accounts,
  focus,
}: {
  kind: string;
  entry: SubjectClaim;
  descriptor: OrientPredicate | undefined;
  cards: Map<string, GetClaimCard>;
  accounts: Map<string, CaptureAdmissionAccount[]>;
  focus: string | null;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const ids = claimIds(entry);
  const focused = focus !== null && ids.includes(focus);
  const [open, setOpen] = useState(focused);
  const rowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focused) rowRef.current?.scrollIntoView?.({ block: "center" });
  }, [focused]);
  const flags: readonly string[] = entry.flags ?? [];
  const predicate = descriptor?.predicate ?? entry.predicate;
  return (
    <div ref={rowRef} className={`py-2 first:pt-0 last:pb-0 ${focused ? "bg-zinc-900/40" : ""}`}>
      <div className="grid grid-cols-[1rem_minmax(9rem,15rem)_minmax(0,1fr)_minmax(0,max-content)] items-baseline gap-x-4 text-[13px]">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={`${open ? "Collapse" : "Expand"} ${entry.predicate}`}
          aria-expanded={open}
          className="relative top-[2px] text-zinc-500 hover:text-zinc-200"
        >
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
        <Link
          to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(predicate)}`)}
          className="truncate font-mono text-[12px] text-zinc-400 hover:text-zinc-200 hover:underline"
          title={`${predicate}${descriptor ? ` · ${descriptor.cardinality} · ${descriptor.type}` : ""}`}
        >
          {entry.predicate}
          {entry.qualifier && <span className="text-zinc-500">[{entry.qualifier}]</span>}
        </Link>
        <div className="min-w-0">
          <FieldValue value={entry.value} />
        </div>
        <div className="flex flex-wrap items-baseline justify-end gap-x-3 gap-y-0.5">
          {flags.map((flag) => (
            <Chip key={flag} concept="claim" value={flag} />
          ))}
          {/* Each verdict once per field; one a flag already names is not repeated. */}
          {[...new Set(ids.map((id) => cards.get(id)?.verdict))].filter((v): v is string => !!v && !QUIET_VERDICTS.has(v) && !flags.includes(v)).map((verdict) => (
            <Chip key={verdict} concept="claim" value={verdict} />
          ))}
          <AdmissionSummary accounts={ids.flatMap((id) => accounts.get(id) ?? [])} />
        </div>
      </div>
      {open && (
        <div className="ml-8 mt-2 space-y-2">
          {ids.map((id) => (
            <ClaimDetail key={id} claimId={id} card={cards.get(id)} accounts={accounts.get(id)} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Citations offered as evidence that the rule admits; copies that are not evidence are left out. */
function AdmissionSummary({ accounts }: { accounts: CaptureAdmissionAccount[] }) {
  const { admitted, offered } = admissionTally(accounts);
  if (offered === 0) return null;
  return (
    <span
      className="inline-flex items-baseline gap-1.5 whitespace-nowrap text-[12px] text-zinc-500"
      title="Citations offered as evidence that the ClaimType's evidence rule admits"
    >
      {admitted < offered && <SignalDot signal="wrong" title={term("evidence", "not_admitted").meaning} />}
      {admitted}/{offered} admitted
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
  const instanceId = useInstanceId();
  const link = useAtLink();
  const evidence = useClaimEvidence(claimId);
  const revisions = useClaimRevisions(claimId);
  const ev = evidence.data?.evidence ?? null;
  const history = revisions.data?.history;
  const revisionRows: GetRevision[] = history?.kind === "revisions" ? history.revisions : [];
  return (
    <div className="border border-zinc-800 bg-zinc-900/40 px-3 py-2.5 text-[12px]">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
        <RefLink value={claimId} short />
        {card && (
          <>
            <span className="text-zinc-500">
              verdict <Chip concept="claim" value={card.verdict} />
            </span>
            {card.status !== "accepted" && (
              <span className="text-zinc-500">
                status <Chip concept="claim" value={card.status} />
              </span>
            )}
            <span className="text-zinc-500">
              revision <span className="font-mono text-zinc-300">{card.revision}</span>
            </span>
          </>
        )}
        {ev && <Corroboration summary={corroboration(ev.attestations)} />}
      </div>

      {(card?.contenders?.length ?? 0) > 0 && (
        <SubSection title="Contenders">
          {card!.contenders!.map((contender) => (
            <div key={contender.claim} className="flex flex-wrap items-baseline gap-x-3">
              <RefLink value={contender.claim} short />
              <ShownValue value={contender.value} />
              <Chip concept="claim" value={contender.verdict} />
            </div>
          ))}
        </SubSection>
      )}

      {evidence.isPending && <div className="mt-2 animate-pulse text-zinc-500">Reading evidence…</div>}
      {evidence.error && <div className="mt-2 text-red-400/80">{evidence.error.message}</div>}
      {ev && (
        <>
          {ev.rationale && (
            <SubSection title="Rationale">
              <LongText text={ev.rationale} lines={4} className="text-[13px] text-zinc-200" />
            </SubSection>
          )}
          <SubSection title="Captures" meta={ev.captures.length}>
            {ev.captures.length === 0 && <div className="text-zinc-500">No cited Captures.</div>}
            {ev.captures.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <Th>Capture</Th>
                    <Th title="What the citation is: evidence, the Claim's own words, or a passage of a file">Cited as</Th>
                    <Th title="Whether the verdict reads it">Status</Th>
                    <Th>Source</Th>
                    <Th>Contract</Th>
                    <Th>Observed</Th>
                  </tr>
                </thead>
                <tbody>
                  {ev.captures.map((capture) => (
                    <tr key={`${capture.capture}\n${capture.role}`} className={trClass}>
                      <Td className="whitespace-nowrap">
                        <RefLink value={capture.capture} />
                      </Td>
                      <Td className="max-w-[20rem] truncate text-zinc-300" title={citationLabel(capture)}>
                        {citationLabel(capture)}
                      </Td>
                      <Td className="whitespace-nowrap">
                        <Chip concept="evidence" value={capture.status} />
                      </Td>
                      <Td className="max-w-[18rem] truncate text-zinc-400" title={capture.source}>
                        {publicName(capture.source)}
                      </Td>
                      <Td className="font-mono text-[12px]">
                        <Link
                          to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(capture.contract))}`)}
                          className="text-zinc-400 hover:text-zinc-200 hover:underline"
                        >
                          {contractName(capture.contract)} v{capture.version}
                        </Link>
                      </Td>
                      <Td className="whitespace-nowrap text-zinc-400" title={capture.observed_at}>
                        {formatWhen(capture.observed_at)}
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </SubSection>
          {ev.attestations.length > 0 && <AttestationList attestations={ev.attestations} />}
        </>
      )}

      {accounts && accounts.length > 0 && (
        <Disclosure className="mt-3" label="Admission accounts">
          <Table>
            <thead>
              <tr>
                <Th>Capture</Th>
                <Th>Contract</Th>
                <Th>Role</Th>
                <Th>Origin</Th>
                <Th>Status</Th>
                <Th>Rule</Th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.citation_id} className={trClass}>
                  <Td className="whitespace-nowrap">
                    <RefLink value={`CAP-${account.capture_digest.replace(/^sha256:/, "").slice(0, 12)}`} />
                  </Td>
                  <Td className="font-mono text-[12px] text-zinc-400">{account.capture_contract_identity}</Td>
                  <Td className="text-zinc-400">{account.citation_role}</Td>
                  <Td className="text-zinc-400">{account.citation_origin}</Td>
                  <Td>
                    <Chip concept="evidence" value={account.status} />
                  </Td>
                  <Td className="text-zinc-500">
                    {account.decision ? (
                      <div>
                        {account.decision.status.replaceAll("_", " ")}
                        {account.decision.admission && <span> ({account.decision.admission.replaceAll("_", " ")})</span>}
                        {account.decision.rule_id && <span className="font-mono"> {account.decision.rule_id}</span>}
                        {account.decision.refusal_code && <span className="font-mono text-zinc-400"> {account.decision.refusal_code}</span>}
                        {account.decision.closest_rule_id && (
                          <span className="font-mono"> closest {account.decision.closest_rule_id}</span>
                        )}
                      </div>
                    ) : (
                      <span title="Not evidence: no rule was consulted">-</span>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Disclosure>
      )}

      {revisionRows.length > 0 && (
        <Disclosure className="mt-2" label={`Revisions (${revisionRows.length})`} defaultOpen={revisionRows.length <= 3}>
          <div className="space-y-1">
            {revisionRows.map((revision) => (
              <RevisionLine key={`${revision.revision}\n${revision.sequence}`} revision={revision} />
            ))}
          </div>
        </Disclosure>
      )}
    </div>
  );
}

/**
 * A Claim version's attestations, accepted and recorded, each with whether it
 * counts toward the verdict and why. Ones no longer current are dimmed.
 */
function AttestationList({ attestations }: { attestations: GetAttestationEvidence[] }) {
  return (
    <SubSection title="Attestations" meta={attestations.length}>
      <Table>
        <thead>
          <tr>
            <Th>Stance</Th>
            <Th>By</Th>
            <Th>At</Th>
            <Th title="Accepted: an accepted attestation, which the verdict reads. Recorded: an event claim attest recorded, shown and resurfaced in next">
              Record
            </Th>
            <Th>Counts toward the verdict</Th>
          </tr>
        </thead>
        <tbody>
          {attestations.map((attestation, i) => (
            <tr key={`${attestation.event ?? attestation.principal}\n${attestation.at}\n${i}`} className={`${trClass} ${attestation.current ? "" : "opacity-60"}`}>
              <Td>
                <Chip concept="stance" value={attestation.stance} />
              </Td>
              <Td className="font-mono text-[12px] text-zinc-300">{attestation.principal}</Td>
              <Td className="whitespace-nowrap text-zinc-400" title={attestation.at}>
                {formatWhen(attestation.at)}
              </Td>
              <Td className="whitespace-nowrap text-zinc-400" title={attestation.event ?? undefined}>
                {recordLabel(attestation.record)}
                <span className="t-meta"> · {basisLabel(attestation.basis)}</span>
              </Td>
              <Td>
                <CountsMark counts={attestation.counts} reason={countsReasonText(attestation)} />
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </SubSection>
  );
}

/** Attestation counts: current attestations by stance, distinct principals, and how many count. */
function corroboration(attestations: GetAttestationEvidence[]): CorroborationSummary {
  const current = attestations.filter((a) => a.current);
  const count = (stance: string) => current.filter((a) => a.stance === stance).length;
  return {
    support_count: count("support"),
    contradict_count: count("contradict"),
    unsure_count: count("unsure"),
    distinct_actor_count: new Set(current.map((a) => a.principal)).size,
    counting_count: current.filter((a) => a.counts).length,
    open_contradiction: current.some((a) => a.counts && a.stance === "contradict"),
    not_current_count: attestations.length - current.length,
  };
}

/** "view state then": the generation link keeps the current path. */
function GenerationLink({ sequence }: { sequence: number }) {
  const { pathname } = useLocation();
  return (
    <Link to={withAt(pathname, String(sequence))} className="font-mono text-zinc-200 hover:underline" title="View state at this generation">
      g{sequence}
    </Link>
  );
}

type Reason = SubjectHistoryEvent["reason"] | GetRevision["reason"];

function reasonText(reason: Reason): string | null {
  if (!reason) return null;
  return `${reason.kind === "change_set" ? reason.text : reason.reason}${reason.truncated ? "…" : ""}`;
}

function ReasonSource({ reason }: { reason: Reason }) {
  if (!reason || reason.kind !== "procedure_item") return null;
  return (
    <span className="t-meta">
      {reason.procedure} <RefLink value={`ProcedureRun:${reason.run}`} short />
    </span>
  );
}

function RevisionLine({ revision }: { revision: GetRevision }) {
  const text = reasonText(revision.reason);
  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3">
        <span className="font-mono text-zinc-500">r{revision.revision}</span>
        <GenerationLink sequence={revision.sequence} />
        {revision.change && <ChangeMark change={revision.change} />}
        {revision.value !== undefined && <ShownValue value={revision.value} />}
        {revision.actor && <span className="font-mono text-zinc-400">{revision.actor}</span>}
        {(revision.approved_by?.length ?? 0) > 0 && <span className="text-zinc-500">approved by {revision.approved_by!.join(", ")}</span>}
        <span className="text-zinc-500" title={revision.accepted}>
          {formatWhen(revision.accepted)}
        </span>
        <ReasonSource reason={revision.reason} />
      </div>
      {text && <LongText text={text} lines={2} className="text-zinc-400" />}
    </div>
  );
}

/**
 * Consecutive events of one accepted change (same generation, actor and
 * approvers) read as one entry; inside it, events are grouped under their
 * reason so a reason shared by several fields shows once.
 */
function groupEvents(events: SubjectHistoryEvent[]): SubjectHistoryEvent[][] {
  const key = (e: SubjectHistoryEvent) => `${e.sequence}\n${e.actor ?? ""}\n${(e.approved_by ?? []).join(",")}`;
  const groups: SubjectHistoryEvent[][] = [];
  for (const event of events) {
    const last = groups[groups.length - 1];
    if (last && key(last[0]!) === key(event)) last.push(event);
    else groups.push([event]);
  }
  return groups;
}

function byReason(events: SubjectHistoryEvent[]): { text: string | null; reason: Reason; events: SubjectHistoryEvent[] }[] {
  const out = new Map<string, { text: string | null; reason: Reason; events: SubjectHistoryEvent[] }>();
  for (const event of events) {
    const text = reasonText(event.reason);
    const k = text ?? "";
    const entry = out.get(k) ?? { text, reason: event.reason, events: [] };
    entry.events.push(event);
    out.set(k, entry);
  }
  return [...out.values()];
}

/** The Subject's field history, newest first, a page at a time (O(page)). */
function HistoryPanel({ subjectRef }: { subjectRef: string }) {
  const [cursors, setCursors] = useState<string[]>([]);
  const cursor = cursors[cursors.length - 1];
  const read = useSubjectHistory(subjectRef, cursor);
  const history = read.data?.history;
  const events: SubjectHistoryEvent[] = history?.kind === "subject" ? history.events : [];
  const groups = groupEvents(events);
  return (
    <Panel
      title="Field history"
      meta={
        <span className="flex gap-3">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Newer
            </button>
          )}
          {read.data && (
            <span>
              {events.length} events in {groups.length} {groups.length === 1 ? "change" : "changes"}
            </span>
          )}
          {read.data?.next_cursor && (
            <button onClick={() => setCursors((c) => [...c, read.data!.next_cursor!])} className="hover:text-zinc-200">
              Older →
            </button>
          )}
        </span>
      }
    >
      {read.isPending && <LoadState />}
      {read.error && <LoadState error={read.error} />}
      {read.data && events.length === 0 && <EmptyState>No field events.</EmptyState>}
      <div className="divide-y divide-zinc-800/70">
        {groups.map((group) => (
          <HistoryGroup key={`${group[0]!.sequence}\n${group[0]!.claim}`} events={group} />
        ))}
      </div>
    </Panel>
  );
}

function HistoryGroup({ events }: { events: SubjectHistoryEvent[] }) {
  const head = events[0]!;
  return (
    <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 py-2.5 text-[13px] first:pt-0 last:pb-0">
      <div className="pt-px">
        <GenerationLink sequence={head.sequence} />
        <div className="t-meta" title={head.accepted}>
          {formatWhen(head.accepted)}
        </div>
      </div>
      <div className="min-w-0 space-y-2">
        <div className="t-meta flex flex-wrap items-baseline gap-x-2">
          {head.actor && <span className="font-mono text-zinc-400">{head.actor}</span>}
          {(head.approved_by?.length ?? 0) > 0 && <span>approved by {head.approved_by!.join(", ")}</span>}
        </div>
        {byReason(events).map(({ text, reason, events: fields }) => (
          <div key={text ?? ""} className="space-y-1">
            {(text || reason) && (
              <div className="flex flex-wrap items-baseline gap-x-3">
                {text && (
                  <span className="min-w-0 flex-1">
                    <LongText text={text} lines={2} className="text-zinc-200" />
                  </span>
                )}
                <ReasonSource reason={reason} />
              </div>
            )}
            <dl className="grid grid-cols-[minmax(7rem,max-content)_minmax(0,1fr)] gap-x-4 gap-y-1">
              {fields.map((event, i) => (
                <Fragment key={`${event.claim}\n${i}`}>
                  <dt className="flex items-baseline gap-2 whitespace-nowrap">
                    <ChangeMark change={event.change ?? "stated"} />
                    <span className="font-mono text-[12px] text-zinc-400">{event.field}</span>
                  </dt>
                  <dd className="min-w-0">
                    <EventValue event={event} />
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventValue({ event }: { event: SubjectHistoryEvent }) {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-3">
        {event.value !== undefined && (
          <span className="min-w-0 flex-1">
            <HistoryValue value={event.value} />
          </span>
        )}
        {event.change === "retired" && event.retirement && <span className="text-zinc-500">{event.retirement}</span>}
        {"contended" in event && event.contended && <Chip concept="claim" value="contested" />}
      </div>
      {event.change === "changed" && event.before !== undefined && (
        <Disclosure label="previous value" className="mt-0.5">
          <span className="text-zinc-500">
            <HistoryValue value={event.before} muted />
          </span>
        </Disclosure>
      )}
    </div>
  );
}

function HistoryValue({ value, muted = false }: { value: unknown; muted?: boolean }) {
  const tone = muted ? "text-zinc-500" : "text-zinc-300";
  if (typeof value === "string" && !parseRef(value)) return <LongText text={value} lines={1} className={tone} />;
  if (
    typeof value === "object" &&
    value !== null &&
    (value as { truncated?: unknown }).truncated === true &&
    typeof (value as { preview?: unknown }).preview === "string"
  ) {
    return <LongText text={`${(value as { preview: string }).preview}…`} lines={1} className={tone} />;
  }
  return (
    <span className={tone}>
      <ShownValue value={value} />
    </span>
  );
}
