import { useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import {
  useCard,
  useClaimTypes,
  useInstanceId,
  useKits,
  useLines,
  useMandates,
  useOrientKind,
  useSubjectKinds,
} from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { ClaimTypeTable } from "@/components/ontology/ClaimTypeTable";
import { useAtLink } from "@/lib/at";
import { claimTypesOfKind, claimTypesPointingAt, contractName, kindCounts, settlersFor } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";

/**
 * One Subject kind as the ontology defines it: identity (keys, uniqueness or
 * minted), owning kit, what points at it, and every ClaimType on it with
 * value type or target kind, cardinality, role, evidence contracts and
 * whether a Capture is required, freshness, kit, contention, format and
 * revision, who may settle it, and its live Claims and share of Subjects
 * with a value. Reads: the subject_kinds and claim_types sections, the
 * SubjectKind card, orient(kind=K) for the counts (maintained counters, one
 * prefix seek), the lines and mandates sections (typed Mandate scope) and
 * the kits; nothing scans the kind's Claims or Subjects.
 */
export function KindScreen() {
  const { kind = "" } = useParams();
  const [params] = useSearchParams();
  // ?claim_type= opens a row; toggling is local (no history entry per row).
  const [open, setOpen] = useState<string | null>(params.get("claim_type"));
  const instanceId = useInstanceId();
  const link = useAtLink();
  usePageTitle(kind);

  const subjectKinds = useSubjectKinds();
  const claimTypes = useClaimTypes();
  const detail = useOrientKind(kind);
  const card = useCard(`SubjectKind:${kind}`);
  const kindCard = cardOf(card.data, "subject_kind");
  const lines = useLines();
  const mandates = useMandates();
  const kits = useKits();

  const rule = (subjectKinds.data?.rows ?? []).find((row) => row.kind === kind);
  const rows = useMemo(() => claimTypesOfKind(claimTypes.data?.rows ?? [], kind), [claimTypes.data, kind]);
  const pointing = useMemo(() => claimTypesPointingAt(claimTypes.data?.rows ?? [], kind), [claimTypes.data, kind]);
  const evidence = useMemo(
    () => [...new Set(rows.flatMap((row) => row.evidence ?? []))].sort(),
    [rows],
  );
  const subjects = detail.data?.kind_detail?.subjects ?? kindCard?.live_subjects;
  const counts = useMemo(
    () => (detail.data ? kindCounts(detail.data.kind_detail) : detail.error ? undefined : null),
    [detail.data, detail.error],
  );
  const ready = lines.data !== undefined && mandates.data !== undefined;

  function toggle(predicate: string) {
    setOpen((current) => (current === predicate ? null : predicate));
  }

  if (claimTypes.isPending || subjectKinds.isPending) return <LoadState />;
  if (claimTypes.error) return <LoadState error={claimTypes.error} />;
  const known = rule !== undefined || rows.length > 0;
  if (!known) return <EmptyState>No Subject kind {kind} at this generation.</EmptyState>;

  return (
    <div className="max-w-7xl space-y-3">
      <header>
        <div className="text-[10px] uppercase tracking-wide text-zinc-500">Subject kind</div>
        <h1 className="font-mono text-[17px] font-semibold text-zinc-100">{kind}</h1>
        {kindCard?.description && <p className="mt-1 max-w-3xl text-[13px] text-zinc-400">{kindCard.description}</p>}
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-zinc-500">
          {subjects !== undefined && (
            <span>
              <span className="font-mono text-zinc-200">{subjects}</span> live Subjects
            </span>
          )}
          {kindCard && <Chip value={kindCard.lifecycle} />}
          <span>
            {rule?.rule === "minted" ? (
              "minted ids"
            ) : rule ? (
              <>
                keyed by{" "}
                {(rule.keys ?? []).map((key) => (
                  <span key={key} className="mr-1.5 font-mono text-zinc-300">
                    {key.startsWith(`${kind}.`) ? key.slice(kind.length + 1) : key}
                  </span>
                ))}
                {rule.uniqueness && <span className="text-zinc-600">({rule.uniqueness})</span>}
              </>
            ) : (
              "identity undeclared"
            )}
          </span>
          <span>{rule?.kit ? <>kit <span className="font-mono text-zinc-300">{rule.kit}</span></> : "authored in this instance"}</span>
          <Link to={link(`/i/${instanceId}/map?kind=${encodeURIComponent(kind)}`)} className="text-zinc-400 hover:text-zinc-200">
            on the type map →
          </Link>
        </div>
      </header>

      <Panel
        title={`ClaimTypes (${rows.length})`}
        meta={
          <span title="Contested and stale counts per ClaimType wait on a post-v1 core read">
            {detail.error ? <span className="text-red-400/80">live counts: {detail.error.message}</span> : "contested and stale: post-v1"}
          </span>
        }
      >
        {rows.length === 0 ? (
          <EmptyState>No ClaimTypes on this kind.</EmptyState>
        ) : (
          <ClaimTypeTable
            kind={kind}
            rows={rows}
            open={open}
            onToggle={toggle}
            counts={counts}
            liveSubjects={subjects}
            kits={kits.data?.kits}
            settlers={(predicate) => (ready ? settlersFor(predicate, mandates.data!.rows, lines.data!.rows) : null)}
          />
        )}
      </Panel>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <Panel title="Pointed at by" meta={<span>{pointing.length}</span>}>
          {pointing.length === 0 && <EmptyState>No ClaimType points at this kind.</EmptyState>}
          <div className="space-y-0.5 text-[12px]">
            {pointing.map((row) => {
              const from = (row.subject_kinds ?? [])[0] ?? "";
              return (
                <div key={row.predicate} className="flex flex-wrap items-baseline gap-x-2">
                  <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(from)}?claim_type=${encodeURIComponent(row.predicate)}`)} className="font-mono text-zinc-300 hover:underline">
                    {row.predicate}
                  </Link>
                  <span className="text-zinc-600">{row.cardinality}</span>
                </div>
              );
            })}
          </div>
        </Panel>
        <Panel title="Evidence contracts" meta={<span>{evidence.length}</span>}>
          {evidence.length === 0 && <EmptyState>No ClaimType on this kind admits Captures.</EmptyState>}
          <div className="space-y-0.5 text-[12px]">
            {evidence.map((contract) => {
              const admitting = rows.filter((row) => (row.evidence ?? []).includes(contract));
              return (
                <div key={contract} className="flex flex-wrap items-baseline gap-x-2">
                  <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(contract))}`)} className="font-mono text-zinc-300 hover:underline">
                    {contractName(contract)}
                  </Link>
                  <span className="text-zinc-500">
                    admitted by {admitting.length}, required by {admitting.filter((row) => row.evidence_requirement === "captured").length}
                  </span>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </div>
  );
}

/** A ClaimType ref lands on its first Subject kind's page with the row open (design Q2). */
export function ClaimTypeRedirect() {
  const { predicate = "" } = useParams();
  const instanceId = useInstanceId();
  const link = useAtLink();
  const claimTypes = useClaimTypes();
  if (claimTypes.isPending) return <LoadState />;
  if (claimTypes.error) return <LoadState error={claimTypes.error} />;
  const row = (claimTypes.data?.rows ?? []).find((r) => r.predicate === predicate);
  const kind = [...(row?.subject_kinds ?? [])].sort()[0];
  if (!kind) return <EmptyState>No ClaimType {predicate} at this generation.</EmptyState>;
  return <Navigate replace to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(predicate)}`)} />;
}
