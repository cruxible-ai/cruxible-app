import { useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import {
  useCard,
  useClaimTypes,
  useInstanceId,
  useLines,
  useMandateProofs,
  useMandates,
  useOrientKinds,
  useSubjectKinds,
} from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { ClaimTypeTable } from "@/components/ontology/ClaimTypeTable";
import { Pending } from "@/components/ontology/Pending";
import { useAtLink } from "@/lib/at";
import { readMandateProof, type MandateProof } from "@/lib/lines";
import { claimTypesOfKind, claimTypesPointingAt, contractName, settleMandates, settlersFor } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";

/**
 * One Subject kind as the ontology defines it: identity (keys, uniqueness or
 * minted), owning kit, what points at it, and every ClaimType on it with
 * value type or target kind, cardinality, role, evidence contracts and
 * whether a Capture is required, freshness, kit and who may settle it.
 * Reads are ontology-sized only: the subject_kinds and claim_types sections,
 * the SubjectKind card, Lines and Mandates, and the proofs of live settle
 * Mandates; nothing per Claim or Capture.
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
  const kinds = useOrientKinds();
  const card = useCard(`SubjectKind:${kind}`);
  const kindCard = cardOf(card.data, "subject_kind");
  const lines = useLines();
  const mandates = useMandates();
  const settling = useMemo(
    () => settleMandates(mandates.data?.rows ?? []).map((m) => m.mandate.replace(/^[A-Za-z]+:/, "")),
    [mandates.data],
  );
  const proofs = useMandateProofs(settling);

  const rule = (subjectKinds.data?.rows ?? []).find((row) => row.kind === kind);
  const rows = useMemo(() => claimTypesOfKind(claimTypes.data?.rows ?? [], kind), [claimTypes.data, kind]);
  const pointing = useMemo(() => claimTypesPointingAt(claimTypes.data?.rows ?? [], kind), [claimTypes.data, kind]);
  const evidence = useMemo(
    () => [...new Set(rows.flatMap((row) => row.evidence ?? []))].sort(),
    [rows],
  );
  const subjects = kindCard?.live_subjects ?? kinds.data?.kinds.find((k) => k.kind === kind)?.subjects;

  const scopes = useMemo(() => {
    const out = new Map<string, MandateProof | null>();
    for (const mandate of mandates.data?.rows ?? []) {
      const name = mandate.mandate.replace(/^[A-Za-z]+:/, "");
      const proof = proofs.proofs.get(name);
      out.set(mandate.mandate, proof ? readMandateProof(proof) : null);
    }
    return out;
  }, [mandates.data, proofs.proofs]);
  const ready = lines.data !== undefined && mandates.data !== undefined && !proofs.isPending;

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
        meta={<span>live counts <Pending gap="K1" /> · contention and version <Pending gap="K5" /></span>}
      >
        {rows.length === 0 ? (
          <EmptyState>No ClaimTypes on this kind.</EmptyState>
        ) : (
          <ClaimTypeTable
            kind={kind}
            rows={rows}
            open={open}
            onToggle={toggle}
            settlers={(predicate) => (ready ? settlersFor(predicate, mandates.data!.rows, lines.data!.rows, scopes) : null)}
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
