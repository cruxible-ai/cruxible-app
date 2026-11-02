import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Waypoints } from "lucide-react";
import {
  useAdmissionAccounts,
  useCard,
  useClaimEvidence,
  useClaimRevisions,
  useGetBatch,
  useInstanceId,
  useOntologyKinds,
  useRunAuthor,
  useSubjectHistory,
  useSubjectKinds,
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
import { ChangeAuthor } from "@/components/ChangeAuthor";
import {
  ChangeEntry,
  ChangeLog,
  ChangeValue,
  GenerationLink,
  HeaderDot as Dot,
  HeaderLabel,
  sharedReason,
  sharedReasonText,
  type ChangeItem,
} from "@/components/ChangeLog";
import { FieldList, FieldRow, KeyMark } from "@/components/FieldList";
import { ConnectionsPanel } from "@/components/ConnectionsPanel";
import { IncomingList } from "@/components/IncomingList";
import { useAtLink, withAt } from "@/lib/at";
import { formatRef, parseRef } from "@/lib/cruxible-ref";
import { lineName } from "@/lib/lines";
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
import { changeSetRun, changeSets, reasonWords } from "@/lib/change-sets";
import { claimStates, evidenceNeed, isKeyField, keyPredicates, type EvidenceNeed } from "@/lib/subject";
import { formatWhen, sentence } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { term, type Term } from "@/lib/vocabulary";

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
 * ⌈Claims/256⌉ read-batch calls for admission, and one read per expansion;
 * the history adds one run read per change set a run produced (kept once
 * read) and one revision read per Line; the incoming list one get-batch per
 * page. The ClaimTypes and SubjectKinds are the ontology reads every page
 * shares.
 *
 * Layout: the header says how healthy the card is (the Claims and their
 * states, evidence admitted where a ClaimType requires it); the field list
 * shows each value once, quiet when supported, key parts marked `key`;
 * history reads one change set per entry, authored by its Line, run or
 * principal, one line per field it changed.
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
  const subjectKinds = useSubjectKinds();
  const keysByKind = useMemo(() => keyPredicates(subjectKinds.data?.rows), [subjectKinds.data]);
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
  // The newest change to each Claim (the history's first page): where a field's value came from.
  const firstHistory = useSubjectHistory(ref);
  const provenance = useMemo(() => {
    const out = new Map<string, SubjectHistoryEvent>();
    const h = firstHistory.data?.history;
    for (const event of h?.kind === "subject" ? h.events : []) if (!out.has(event.claim)) out.set(event.claim, event);
    return out;
  }, [firstHistory.data]);
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
  const keys = keysByKind.get(kind);
  const descriptorOf = (entry: SubjectClaim) => predicates.get(`${kind}\n${entry.predicate}`);
  const isKey = (entry: SubjectClaim) => isKeyField(keys, entry.predicate, descriptorOf(entry));

  // The header counts evidence only for fields whose ClaimType requires it.
  const requiring = subject.claims.filter((entry) => !isKey(entry) && evidenceNeed(descriptorOf(entry)) === "required");
  const evidence = admissionTally(requiring.flatMap((entry) => claimIds(entry).flatMap((claim) => admission.byClaim.get(claim) ?? [])));

  return (
    <Page>
      <PageHeader
        kind={kind}
        kindHref={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}`)}
        title={id}
        mono
        actions={
          <Link
            to={link(`/i/${instanceId}/graph?focus=${encodeURIComponent(subject.subject)}`)}
            className={`inline-flex items-center gap-1.5 ${actionChipClass}`}
          >
            <Waypoints className="h-3 w-3" />
            State graph
          </Link>
        }
        summary={
          ids.length === 0 ? (
            <span>No live Claims.</span>
          ) : verdicts.isPending ? (
            <span className="t-meta animate-pulse">Reading verdicts…</span>
          ) : (
            <ClaimsTally cards={[...claimCards.values()]} />
          )
        }
        facts={
          <>
            <Fact label="State">
              <Chip concept="lifecycle" value={subject.lifecycle} />
            </Fact>
            <Fact
              label="Evidence admitted"
              title="For the fields whose ClaimType requires captured evidence: citations offered as evidence that the rule admits, so the verdict reads them; a copy the rule does not admit is not evidence"
            >
              {kinds.isPending ? (
                <span className="t-meta animate-pulse">…</span>
              ) : requiring.length === 0 ? (
                <span className="text-zinc-500">None required</span>
              ) : evidence.offered === 0 ? (
                <span className="text-zinc-500">{evidence.notEvidence === 0 ? "No evidence citations" : "None"}</span>
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
            <Panel title="Pointed at by">
              <IncomingList subject={subject.subject} total={subject.incoming_count} summaries />
            </Panel>
          ) : null
        }
      >
        <Panel
          title="Fields"
        >
          {subject.claims.length === 0 && <EmptyState>No live Claims.</EmptyState>}
          {verdicts.error && <LoadState error={verdicts.error} />}
          {admission.error && <LoadState error={admission.error} />}
          <FieldList expandable label="Fields">
            {subject.claims.map((entry) => (
              <ClaimRow
                key={`${entry.predicate}\n${entry.qualifier ?? ""}`}
                kind={kind}
                entry={entry}
                descriptor={descriptorOf(entry)}
                isKey={isKey(entry)}
                cards={claimCards}
                accounts={admission.byClaim}
                focus={focusClaim}
                provenance={provenance}
              />
            ))}
          </FieldList>
        </Panel>

        <ConnectionsPanel subject={subject} />
        <HistoryPanel subjectRef={subject.subject} keys={keys} />
      </WithRail>
    </Page>
  );
}

/**
 * "4 Claims · all supported", or the count in each state that is not the
 * normal one ("4 Claims · 2 contested · 1 stale"), each with its signal.
 */
function ClaimsTally({ cards }: { cards: GetClaimCard[] }) {
  const { total, states } = claimStates(cards);
  const noun = `${total} ${total === 1 ? "Claim" : "Claims"}`;
  return (
    <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1 text-[13px]">
      <span className="text-zinc-200">{noun}</span>
      {states.size === 0 ? (
        <span className="inline-flex items-baseline gap-1.5">
          <span className="text-zinc-400">·</span>
          <Chip term={{ ...term("claim", "supported"), word: total === 1 ? "Supported" : "All supported" }} />
        </span>
      ) : (
        [...states.entries()].map(([state, count]) => {
          const word = term("claim", state);
          return (
            <span key={state} className="inline-flex items-baseline gap-1.5">
              <span className="text-zinc-400">·</span>
              <span className="font-mono text-zinc-200">{count}</span>
              <Chip term={{ ...word, word: word.word.toLowerCase() }} />
            </span>
          );
        })
      )}
    </span>
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
          Preview of {String(length)} characters
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
  isKey,
  cards,
  accounts,
  focus,
  provenance,
}: {
  kind: string;
  entry: SubjectClaim;
  descriptor: OrientPredicate | undefined;
  isKey: boolean;
  cards: Map<string, GetClaimCard>;
  accounts: Map<string, CaptureAdmissionAccount[]>;
  focus: string | null;
  provenance: Map<string, SubjectHistoryEvent>;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const ids = claimIds(entry);
  const origins = ids.map((id) => provenance.get(id)).filter((e): e is SubjectHistoryEvent => e !== undefined);
  const origin = origins[0];
  const focused = focus !== null && ids.includes(focus);
  const [open, setOpen] = useState(focused);
  const rowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (focused) rowRef.current?.scrollIntoView?.({ block: "center" });
  }, [focused]);
  const flags: readonly string[] = entry.flags ?? [];
  const predicate = descriptor?.predicate ?? entry.predicate;
  const need: EvidenceNeed = isKey ? "none" : evidenceNeed(descriptor);
  return (
    <FieldRow
      ref={rowRef}
      highlighted={focused}
      toggle={{ open, onToggle: () => setOpen((v) => !v), name: entry.predicate }}
      labelHref={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(predicate)}`)}
      labelTitle={`${predicate}${descriptor ? ` · ${descriptor.cardinality} · ${descriptor.type}` : ""}${need === "none" ? " · no evidence required" : ""}`}
      label={
        <>
          {entry.predicate}
          {entry.qualifier && <span className="text-zinc-500">[{entry.qualifier}]</span>}
        </>
      }
      value={<FieldValue value={entry.value} />}
      provenance={origin && <FieldProvenance event={origin} siblings={origins} isKey={isKey} />}
      status={
        <>
          {flags.map((flag) => (
            <Chip key={flag} concept="claim" value={flag} />
          ))}
          {/* Each verdict once per field; one a flag already names is not repeated. */}
          {[...new Set(ids.map((id) => cards.get(id)?.verdict))].filter((v): v is string => !!v && !QUIET_VERDICTS.has(v) && !flags.includes(v)).map((verdict) => (
            <Chip key={verdict} concept="claim" value={verdict} />
          ))}
          {isKey ? <KeyMark kind={kind} /> : <AdmissionSummary need={need} accounts={ids.flatMap((id) => accounts.get(id) ?? [])} />}
        </>
      }
      detail={ids.map((id) => (
        <ClaimDetail key={id} claimId={id} card={cards.get(id)} accounts={accounts.get(id)} need={need} isKey={isKey} />
      ))}
    />
  );
}

/**
 * Citations offered as evidence that the rule admits; copies that are not
 * evidence are left out. Red only where the ClaimType requires captured
 * evidence and a citation is refused; a field that requires none shows
 * nothing.
 */
function AdmissionSummary({ need, accounts }: { need: EvidenceNeed; accounts: CaptureAdmissionAccount[] }) {
  const { admitted, offered } = admissionTally(accounts);
  if (offered === 0 || need === "none") return null;
  return (
    <span
      className="inline-flex items-baseline gap-1.5 whitespace-nowrap text-[12px] text-zinc-500"
      title={
        need === "own-words"
          ? "Citations offered as evidence that the ClaimType's evidence rule admits; the author's own words may stand without them"
          : "Citations offered as evidence that the ClaimType's evidence rule admits"
      }
    >
      {need === "required" && admitted < offered && <SignalDot signal="wrong" title={term("evidence", "not_admitted").meaning} />}
      {admitted}/{offered} admitted
    </span>
  );
}

/** A citation's evidence status; refused reads as wrong only where the ClaimType requires captured evidence. */
function evidenceTerm(status: string, need: EvidenceNeed): Term {
  const word = term("evidence", status);
  if (need === "required" || !word.signal) return word;
  const { signal: _signal, ...quiet } = word;
  return quiet;
}

/** One Claim, expanded: verdict and contenders, evidence, admission, revisions. */
function ClaimDetail({
  claimId,
  card,
  accounts,
  need,
  isKey,
}: {
  claimId: string;
  card: GetClaimCard | undefined;
  accounts: CaptureAdmissionAccount[] | undefined;
  need: EvidenceNeed;
  isKey: boolean;
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
              Verdict <Chip concept="claim" value={card.verdict} />
            </span>
            {card.status !== "accepted" && (
              <span className="text-zinc-500">
                Status <Chip concept="claim" value={card.status} />
              </span>
            )}
            <span className="text-zinc-500">
              Revision <span className="font-mono text-zinc-300">{card.revision}</span>
            </span>
          </>
        )}
        {need === "none" && <span className="text-zinc-500">{isKey ? "Key: no evidence required" : "No evidence required"}</span>}
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
                        <Chip term={evidenceTerm(capture.status, need)} />
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
                    <Chip term={evidenceTerm(account.status, need)} />
                  </Td>
                  <Td className="text-zinc-500">
                    {account.decision ? (
                      <div>
                        {sentence(account.decision.status.replaceAll("_", " "))}
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

type Reason = SubjectHistoryEvent["reason"] | GetRevision["reason"];

function ReasonSource({ reason }: { reason: Reason }) {
  if (!reason || reason.kind !== "procedure_item") return null;
  return (
    <span className="t-meta">
      {reason.procedure} <RefLink value={`ProcedureRun:${reason.run}`} short />
    </span>
  );
}

function RevisionLine({ revision }: { revision: GetRevision }) {
  const text = reasonWords(revision.reason);
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
 * Where a field's current value came from, under the value: since which
 * generation, by which Line (as of then), and the item's own reason when it
 * has one. The full change is in Changes below.
 */
function FieldProvenance({ event, siblings, isKey }: { event: SubjectHistoryEvent; siblings: SubjectHistoryEvent[]; isKey: boolean }) {
  const instanceId = useInstanceId();
  const source = changeSetRun([event]);
  const run = useRunAuthor(source?.run ?? null);
  const line = run.data?.line ?? null;
  // A many-valued field's values share one reason sentence: say it once (see sharedReason).
  const reason = isKey ? null : sharedReasonText(sharedReason(siblings.map(changeItem)));
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        <span>since</span>
        <GenerationLink sequence={event.sequence} />
        <span title={event.accepted}>· {formatWhen(event.accepted)}</span>
        {line ? (
          <>
            <span>·</span>
            <Link
              to={withAt(`/i/${instanceId}/lines/${encodeURIComponent(lineName(line))}`, String(event.sequence))}
              className="font-mono text-zinc-400 hover:text-zinc-200 hover:underline"
            >
              {lineName(line)}
            </Link>
          </>
        ) : (
          event.actor && <span>· {event.actor}</span>
        )}
      </div>
      {reason && <LongText text={reason} lines={1} className="text-zinc-500" />}
    </>
  );
}

/** The Subject's field history, newest first, a page at a time (O(page)). */
function HistoryPanel({ subjectRef, keys }: { subjectRef: string; keys: ReadonlySet<string> | undefined }) {
  const [cursors, setCursors] = useState<string[]>([]);
  const cursor = cursors[cursors.length - 1];
  const read = useSubjectHistory(subjectRef, cursor);
  const history = read.data?.history;
  const events: SubjectHistoryEvent[] = history?.kind === "subject" ? history.events : [];
  const groups = changeSets(events);
  // Opened by default only when a field was revised or retired: then the history is the story.
  const eventful = events.some((e) => e.change === "changed" || e.change === "retired" || e.change === "rebound");
  const [expanded, setExpanded] = useState<boolean | null>(null);
  const open = expanded ?? eventful;
  return (
    <Panel
      title="Changes"
      meta={
        <span className="flex gap-3">
          {cursors.length > 0 && (
            <button onClick={() => setCursors((c) => c.slice(0, -1))} className="hover:text-zinc-200">
              ← Newer
            </button>
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
      {groups.length > 0 && (
        <button onClick={() => setExpanded(!open)} className="mb-2 text-[12px] text-zinc-500 hover:text-zinc-200">
          {open ? "Show as a list" : "Show each change's fields"}
        </button>
      )}
      {open ? (
        <ChangeLog label="Changes">
          {groups.map((group) => (
            <ChangeSet key={`${group[0]!.sequence}\n${group[0]!.claim}`} events={group} keys={keys} />
          ))}
        </ChangeLog>
      ) : (
        <div className="space-y-1 text-[13px]">
          {groups.map((group) => (
            <ChangeSummary key={`${group[0]!.sequence}\n${group[0]!.claim}`} events={group} />
          ))}
        </div>
      )}
    </Panel>
  );
}

/** One change set as one line: generation, when, its Line (or author), and how many fields it touched. */
function ChangeSummary({ events }: { events: SubjectHistoryEvent[] }) {
  const instanceId = useInstanceId();
  const head = events[0]!;
  const source = changeSetRun(events);
  const run = useRunAuthor(source?.run ?? null);
  const line = run.data?.line ?? null;
  const fields = new Set(events.map((e) => e.field)).size;
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 text-zinc-400">
      <GenerationLink sequence={head.sequence} />
      <Dot />
      <span className="text-zinc-500" title={head.accepted}>
        {formatWhen(head.accepted)}
      </span>
      <Dot />
      {line ? (
        <Link
          to={withAt(`/i/${instanceId}/lines/${encodeURIComponent(lineName(line))}`, String(head.sequence))}
          className="font-mono text-zinc-300 hover:underline"
        >
          {lineName(line)}
        </Link>
      ) : (
        <span className="font-mono text-zinc-300">{head.actor ?? "—"}</span>
      )}
      <Dot />
      <span className="text-zinc-500">
        {events.length} {events.length === 1 ? "change" : "changes"} to {fields} {fields === 1 ? "field" : "fields"}
      </span>
    </div>
  );
}

/**
 * One change set: its generation, when, who authored it and who approved it
 * on one line, then one line per field it changed. A proposal's own words
 * show once under the line; core's "Proposed by Procedure … run …" text only
 * restates the run, which the author link already names.
 */
function ChangeSet({ events, keys }: { events: SubjectHistoryEvent[]; keys: ReadonlySet<string> | undefined }) {
  const head = events[0]!;
  const source = changeSetRun(events);
  const notes = [
    ...new Set(events.flatMap((event) => (event.reason?.kind === "change_set" ? [reasonWords(event.reason)] : [])).filter((text): text is string => !!text)),
  ];
  return (
    <ChangeEntry
      header={
        <>
          <HeaderLabel>Generation</HeaderLabel>
          <GenerationLink sequence={head.sequence} />
          <Dot />
          <span className="text-zinc-500" title={head.accepted}>
            {formatWhen(head.accepted)}
          </span>
          <Dot />
          <ChangeAuthor source={source} sequence={head.sequence} actor={head.actor ?? null} approvers={head.approved_by ?? []} />
        </>
      }
      notes={notes}
      changes={events.map((event) => ({
        ...changeItem(event),
        render: <EventValue event={event} />,
        mark: isKeyField(keys, event.predicate) ? <KeyMark kind={null} /> : undefined,
      }))}
    />
  );
}

/** A field event as a ChangeLog item: its item reason (a proposal's words show once, as the entry's note). */
function changeItem(event: SubjectHistoryEvent): ChangeItem {
  return {
    id: event.claim,
    field: event.field,
    change: event.change ?? "stated",
    value: event.value,
    reason: event.reason?.kind === "procedure_item" ? reasonWords(event.reason) : null,
  };
}

function EventValue({ event }: { event: SubjectHistoryEvent }) {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-3">
        {event.value !== undefined && (
          <span className="min-w-0 flex-1">
            <ChangeValue value={event.value} />
          </span>
        )}
        {event.change === "retired" && event.retirement && <span className="text-zinc-500">{event.retirement}</span>}
        {"contended" in event && event.contended && <Chip concept="claim" value="contested" />}
      </div>
      {event.change === "changed" && event.before !== undefined && (
        <Disclosure label="Previous value" className="mt-0.5">
          <span className="text-zinc-500">
            <ChangeValue value={event.before} muted />
          </span>
        </Disclosure>
      )}
    </div>
  );
}
