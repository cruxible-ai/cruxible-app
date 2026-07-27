import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Ban, Clock, Target } from "lucide-react";
import { useEntity, useInstanceId, useOutcomeContracts, useView } from "@/api/hooks";
import type { ContractListItem, CorroborationSummary } from "@/api/governance-types";
import { outcomeState } from "@/api/governance-types";
import type { PathItem, PathSegment as GeneratedSegment } from "@/api/items";

/**
 * Path segments as 0.3 actually serves them. The generated schema predates
 * `claim_id` (stable claim identity, survives pulls where `edge_key` does not)
 * and `corroboration`; both are on the wire today. Drop this when
 * `pnpm gen:api` catches up.
 */
type PathSegment = GeneratedSegment & {
  claim_id?: string | null;
  corroboration?: CorroborationSummary | null;
};
import { Chip } from "@/components/Chip";
import { Corroboration, isContradicted } from "@/components/Corroboration";
import { EntityLink } from "@/components/EntityLink";
import { EvidenceRef, type EvidenceRefData } from "@/components/EvidenceRef";
import { MonoId } from "@/components/MonoId";
import {
  checkClock,
  isAcceptanceBlocked,
  measurementSummary,
  OutcomeBadge,
} from "@/components/OutcomeContract";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Prose } from "@/components/Prose";
import { formatDateTime, humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";
import { DECISION_TYPE } from "./TriageQueueScreen";

/** The exposure claim behind a decision, with its evidence and corroboration. */
interface ClaimRow {
  segment: PathSegment;
  serviceName: string | null;
}

/**
 * One triage decision, whole.
 *
 * Three things make a decision auditable and all three are on this page: what
 * was decided, what was promised (the outcome contract — the declared success
 * condition, the clock, and where it stands), and what it rests on (the
 * exposure claims and their pinned source evidence). Evidence pinned at a
 * revision the artifact has since moved past is called out rather than
 * silently re-resolved: the claim still reads the bytes it cited, but the
 * world it cited has changed.
 */
export function DecisionScreen() {
  const { decisionId = "" } = useParams();
  const instanceId = useInstanceId();
  const decision = useEntity(DECISION_TYPE, decisionId);
  const contracts = useOutcomeContracts(DECISION_TYPE, decisionId);

  const properties = decision.data?.properties ?? {};
  const title = typeof properties.title === "string" ? properties.title : decisionId;
  usePageTitle(title);

  const cveId = typeof properties.cve_id === "string" ? properties.cve_id : "";
  // The kit's own exposure view is the honest source for "what does this call
  // rest on": the paths from the CVE to the services it puts at risk, with the
  // posture claims and their evidence attached.
  const exposure = useView("exposed_services", { cve_id: cveId, limit: 25 }, cveId !== "");

  const contract = useMemo((): ContractListItem | undefined => {
    const items = contracts.data?.items ?? [];
    return [...items].sort((a, b) =>
      (b.contract.opened_at ?? "").localeCompare(a.contract.opened_at ?? ""),
    )[0];
  }, [contracts.data]);

  const claims = useMemo((): ClaimRow[] => {
    const rows: ClaimRow[] = [];
    const seen = new Set<string>();
    for (const item of (exposure.data?.items ?? []) as PathItem[]) {
      const serviceName =
        typeof item.result?.properties?.name === "string" ? item.result.properties.name : null;
      const posture = item.includes?.exposure?.items ?? [];
      for (const inc of posture) {
        const segment = inc.edge as PathSegment;
        const key = `${segment.from_id}→${segment.to_id}:${segment.claim_id ?? segment.edge_key}`;
        if (seen.has(key)) continue;
        seen.add(key);
        rows.push({ segment, serviceName });
      }
    }
    return rows;
  }, [exposure.data]);

  if (decision.isPending) return <LoadState />;
  if (decision.error) return <LoadState error={decision.error} />;
  if (!decision.data?.found) return <EmptyState>Decision not found.</EmptyState>;

  const blocked =
    properties.status === "proposed" &&
    isAcceptanceBlocked(properties.outcome_tracking, contract);
  const rationale = typeof properties.rationale === "string" ? properties.rationale : null;
  const scalarProps = Object.entries(properties).filter(
    ([k, v]) =>
      !["title", "rationale", "status"].includes(k) &&
      v !== null &&
      v !== undefined &&
      typeof v !== "object",
  );

  return (
    <div className="space-y-3">
      <header>
        <div className="flex items-center gap-3 text-[13px]">
          <span className="text-zinc-400">Triage decision</span>
          <MonoId id={decisionId} />
          <Link
            to={`/i/${instanceId}/triage`}
            className="ml-auto text-[12px] text-zinc-500 hover:text-zinc-300"
          >
            ← Triage queue
          </Link>
        </div>
        <h1 className="mt-1 text-[17px] font-semibold text-zinc-100">{title}</h1>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          <Chip value={String(properties.status ?? "")} />
          <OutcomeBadge contract={contract} outcomeTracking={properties.outcome_tracking} />
        </div>
      </header>

      {blocked && (
        <div className="border border-red-900 border-l-2 border-l-red-500 bg-red-950/25 px-3 py-2">
          <div className="flex items-center gap-2 text-[14px] font-semibold text-red-400">
            <Ban className="h-4 w-4" />
            This decision cannot be accepted yet
          </div>
          <p className="mt-1 max-w-[76ch] text-[13px] leading-5 text-red-200/80">
            It declares <span className="font-mono">outcome_tracking: required</span>, so it claims a
            measurable result — and no resolution contract has been opened against it. A write that
            set this decision to <span className="font-mono">accepted</span> would be refused by the
            engine and the refusal recorded as a receipt. Open a contract naming what would count as
            success first, or downgrade the call to{" "}
            <span className="font-mono">not_applicable</span> and say why in the rationale.
          </p>
        </div>
      )}

      <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
        <Panel title="Record">
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[14px]">
            {scalarProps.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-zinc-500">{humanize(k)}</dt>
                <dd className="text-zinc-300">
                  {k.endsWith("_id") ? (
                    <span className="font-mono text-[13px]">{String(v)}</span>
                  ) : typeof v === "string" && ["outcome_tracking", "remediation_type"].includes(k) ? (
                    <Chip value={v} />
                  ) : (
                    String(v)
                  )}
                </dd>
              </div>
            ))}
          </dl>
          {rationale && (
            <div className="mt-2 border-t border-zinc-800/60 pt-2">
              <div className="mb-1 text-[12px] uppercase tracking-wide text-zinc-600">Rationale</div>
              <Prose text={rationale} />
            </div>
          )}
        </Panel>

        <ContractPanel contract={contract} outcomeTracking={properties.outcome_tracking} />
      </div>

      <Panel
        title="What this rests on"
        meta={
          cveId ? (
            <Link
              to={`/i/${instanceId}/views/exposed_services?cve_id=${encodeURIComponent(cveId)}`}
              className="hover:text-zinc-300 hover:underline"
            >
              exposed services for <span className="font-mono">{cveId}</span>
            </Link>
          ) : null
        }
      >
        {!cveId && <EmptyState>This decision names no CVE.</EmptyState>}
        {cveId && exposure.isPending && <LoadState />}
        {cveId && exposure.error && <LoadState error={exposure.error} />}
        {cveId && exposure.data && claims.length === 0 && (
          <EmptyState>No accepted exposure claims stand behind this CVE.</EmptyState>
        )}
        <div className="space-y-2">
          {claims.map(({ segment, serviceName }) => (
            <ClaimCard key={`${segment.from_id}:${segment.to_id}:${segment.edge_key}`} segment={segment} serviceName={serviceName} />
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ContractPanel({
  contract,
  outcomeTracking,
}: {
  contract: ContractListItem | undefined;
  outcomeTracking: unknown;
}) {
  if (!contract) {
    return (
      <Panel title="Outcome contract">
        <EmptyState>
          {outcomeTracking === "not_applicable"
            ? "This call has no honest measurable result, and says so — a reviewed choice, not an omission."
            : "Nothing has been promised against this decision."}
        </EmptyState>
      </Panel>
    );
  }

  const declaration = contract.contract.declaration;
  const state = outcomeState(contract);
  const clock = checkClock(declaration.check_at);
  const overdue = clock?.includes("overdue") ?? false;
  const resolution = contract.latest_resolution;

  return (
    <Panel
      title="Outcome contract"
      meta={<MonoId id={contract.contract.contract_id} className="text-[12px]" />}
    >
      <div className="space-y-2 text-[14px]">
        <div>
          <div className="mb-1 flex items-center gap-1.5 text-[12px] uppercase tracking-wide text-zinc-600">
            <Target className="h-3 w-3" />
            Declared success condition
          </div>
          <p className="leading-5 text-zinc-200">{declaration.description}</p>
        </div>

        <div className="border-t border-zinc-800/60 pt-2">
          <div className="mb-1 text-[12px] uppercase tracking-wide text-zinc-600">
            How it will be measured
          </div>
          <p className="font-mono text-[12px] leading-4 text-zinc-400">
            {measurementSummary(contract)}
          </p>
        </div>

        <div className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 border-t border-zinc-800/60 pt-2 text-[13px]">
          <span className="text-zinc-500">Status</span>
          <span>
            <OutcomeBadge contract={contract} outcomeTracking={outcomeTracking} />
          </span>
          <span className="text-zinc-500">Check at</span>
          <span className={overdue ? "text-red-400" : "text-zinc-300"}>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-zinc-600" />
              {formatDateTime(declaration.check_at)}
              {clock && <span className={overdue ? "text-red-400" : "text-zinc-500"}>· {clock}</span>}
            </span>
          </span>
          <span className="text-zinc-500">Expires</span>
          <span className="text-zinc-300">{formatDateTime(declaration.expires_at)}</span>
          {contract.activation?.activated_at && (
            <>
              <span className="text-zinc-500">Activated</span>
              <span className="text-zinc-300">
                {formatDateTime(contract.activation.activated_at)}
              </span>
            </>
          )}
          {contract.subject_content_drifted && (
            <>
              <span className="text-zinc-500">Subject</span>
              <span className="text-amber-400">
                edited since the contract was opened — a new contract is required
              </span>
            </>
          )}
        </div>

        {resolution && (
          <div className="border-t border-zinc-800/60 pt-2">
            <div className="mb-1 text-[12px] uppercase tracking-wide text-zinc-600">
              What reality said
            </div>
            <div className="flex flex-wrap items-center gap-2 text-[13px]">
              <Chip value={resolution.verdict} />
              {resolution.observed_at && (
                <span className="text-zinc-500">
                  observed {formatDateTime(resolution.observed_at)}
                </span>
              )}
              {resolution.actor_context?.actor_id && (
                <span className="text-zinc-500">by {resolution.actor_context.actor_id}</span>
              )}
            </div>
            {resolution.note && (
              <p className="mt-1 text-[13px] italic text-zinc-500">{resolution.note}</p>
            )}
          </div>
        )}
        {state === "open" && !resolution && (
          <p className="border-t border-zinc-800/60 pt-2 text-[13px] text-zinc-500">
            Promised and not yet checked. Nothing has been claimed about the result.
          </p>
        )}
      </div>
    </Panel>
  );
}

function ClaimCard({ segment, serviceName }: { segment: PathSegment; serviceName: string | null }) {
  const metadata = segment.metadata as
    | {
        assertion?: { review?: { status?: string } };
        evidence?: { evidence_refs?: EvidenceRefData[]; rationale?: string };
        provenance?: { source_ref?: string; source?: string };
      }
    | undefined;
  const corroboration = segment.corroboration as CorroborationSummary | undefined;
  const contradicted = isContradicted(corroboration);
  const evidence = metadata?.evidence;
  const review = metadata?.assertion?.review?.status;
  const properties = segment.properties ?? {};

  return (
    <article
      className={`border border-l-2 px-2.5 py-2 ${
        contradicted
          ? "border-red-900/70 border-l-red-500 bg-red-950/20"
          : "border-zinc-800/60 border-l-zinc-700 bg-zinc-900/30"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px]">
        <span className="text-[12px] text-zinc-600">
          {segment.relationship_type.replaceAll("_", " ")}
        </span>
        <EntityLink entityType={segment.from_type} entityId={segment.from_id} />
        <span className="text-zinc-600">→</span>
        <EntityLink entityType={segment.to_type} entityId={segment.to_id} />
        {serviceName && <span className="text-zinc-500">serves {serviceName}</span>}
        <span className="ml-auto flex items-center gap-2">
          {typeof properties.status === "string" && <Chip value={properties.status} />}
          {typeof properties.priority === "string" && <Chip value={properties.priority} />}
          {review && <Chip value={review} />}
        </span>
      </div>
      {corroboration && (
        <div className="mt-1">
          <Corroboration summary={corroboration} />
        </div>
      )}
      {typeof properties.exposure_basis === "string" && (
        <p className="mt-1 text-[13px] italic leading-5 text-zinc-500">
          {properties.exposure_basis}
        </p>
      )}
      {(evidence?.evidence_refs ?? []).length > 0 && (
        <div className="mt-1.5 border-t border-zinc-800/50 pt-1.5">
          <div className="mb-0.5 text-[12px] uppercase tracking-wide text-zinc-600">Evidence</div>
          {(evidence?.evidence_refs ?? []).map((ref, i) =>
            ref.artifact_id ? (
              <EvidenceRef key={i} refData={ref} />
            ) : (
              <div key={i} className="mt-0.5 font-mono text-[12px] text-zinc-500">
                {ref.source}
                <span className="ml-2 text-zinc-600">{ref.source_record_id}</span>
                {ref.label && <span className="ml-2 font-sans italic">“{ref.label}”</span>}
              </div>
            ),
          )}
        </div>
      )}
    </article>
  );
}
