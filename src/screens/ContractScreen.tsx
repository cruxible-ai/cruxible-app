import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useCaptureContracts, useCard, useClaimTypes, useInstanceId, useLandingTriggers, useLines } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { Pending } from "@/components/ontology/Pending";
import { useAtLink } from "@/lib/at";
import { lineName } from "@/lib/lines";
import { contractName, contractProducers, readContractDefinition, sourceKindLabel } from "@/lib/ontology";
import { usePageTitle } from "@/lib/usePageTitle";

const cellText = (value: unknown) => (typeof value === "string" ? value : "");

/**
 * One CaptureContract: what it captures (sources, source kinds, evidence
 * kinds, grade), the Triggers that fire on its landings and the Lines they
 * start, and the ClaimTypes that admit or require it. Producers wait on the
 * reverse-pin read (K3); landing and citation numbers are post-v1 (K4).
 * Reads: the contract card, the claim_types section, the capture-landing
 * Trigger listing and the lines section, all ontology-sized.
 */
export function ContractScreen() {
  const { name = "" } = useParams();
  const instanceId = useInstanceId();
  const link = useAtLink();
  usePageTitle(name);
  const card = useCard(`CaptureContract:${name}`);
  const contract = cardOf(card.data, "capture_contract");
  const claimTypes = useClaimTypes();
  const triggers = useLandingTriggers();
  const lines = useLines();

  const definition = contract ? readContractDefinition(contract.captures) : null;
  const admitting = useMemo(() => {
    const byPredicate = new Map((claimTypes.data?.rows ?? []).map((row) => [row.predicate, row]));
    return (contract?.admitted_by ?? []).map((predicate) => ({ predicate, row: byPredicate.get(predicate) }));
  }, [contract, claimTypes.data]);
  const firing = (triggers.data?.rows ?? []).filter((row) => contractName(cellText(row.capture_contract)) === name);
  const lineByName = new Map((lines.data?.rows ?? []).map((row) => [lineName(row.line), row]));
  const producers = contractProducers(name);

  if (card.isPending) return <LoadState />;
  if (card.error) return <LoadState error={card.error} />;
  if (!contract || !definition) return <LoadState error={new Error(`CaptureContract:${name} did not resolve to a contract`)} />;
  const required = admitting.filter((a) => a.row?.evidence_requirement === "captured");

  return (
    <div className="max-w-6xl space-y-3">
      <header>
        <div className="text-[10px] uppercase tracking-wide text-zinc-500">Capture contract</div>
        <h1 className="font-mono text-[17px] font-semibold text-zinc-100">{name}</h1>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-[13px] text-zinc-500">
          <span>version {contract.version}</span>
          <Chip value={contract.lifecycle} />
          {definition.grade && <span>grade {definition.grade}</span>}
          <span>
            admitted by {admitting.length} ClaimTypes, required by {required.length}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-3 xl:grid-cols-2">
        <Panel title="What it captures">
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[13px]">
            <dt className="text-zinc-500">Sources</dt>
            <dd className="font-mono text-zinc-200">{definition.sources.join(", ") || "—"}</dd>
            <dt className="text-zinc-500">Source kinds</dt>
            <dd className="text-zinc-300">{definition.sourceKinds.map(sourceKindLabel).join(", ") || "—"}</dd>
            <dt className="text-zinc-500">Evidence kinds</dt>
            <dd className="font-mono text-zinc-300">{definition.evidenceKinds.join(", ") || "—"}</dd>
            <dt className="text-zinc-500">Grade</dt>
            <dd className="text-zinc-300">{definition.grade ?? "—"}</dd>
          </dl>
        </Panel>
        <Panel title="Produced by">
          {producers === null ? (
            <div className="text-[12px] text-zinc-500">
              Which Procedures, Blueprints and Providers emit Captures under this contract comes from their pins{" "}
              <Pending gap="K3" />.
            </div>
          ) : (
            producers.map((p) => (
              <div key={p.source} className="text-[12px]">
                <span className="font-mono text-zinc-300">{p.source}</span> <span className="text-zinc-500">{p.role}</span>
              </div>
            ))
          )}
          <div className="mt-2 text-[12px] text-zinc-500">
            Landings, cited Captures and citing Claims <Pending gap="K4" />
          </div>
        </Panel>
      </div>

      <Panel title="Triggers on its landings" meta={<span>{firing.length}</span>}>
        {triggers.isPending && <LoadState />}
        {triggers.error && <LoadState error={triggers.error} />}
        {triggers.data && firing.length === 0 && <EmptyState>No Trigger fires when a Capture under this contract lands.</EmptyState>}
        <div className="space-y-0.5 text-[12px]">
          {firing.map((row) => {
            const target = cellText(row.target);
            const line = target.startsWith("Line:") ? lineByName.get(lineName(target)) : undefined;
            return (
              <div key={cellText(row.name)} className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-zinc-300">{cellText(row.name)}</span>
                <span className="text-zinc-600">→</span>
                {target.startsWith("Line:") ? (
                  <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(lineName(target))}`)} className="font-mono text-zinc-200 hover:underline">
                    {lineName(target)}
                  </Link>
                ) : (
                  <span className="font-mono text-zinc-400">{target}</span>
                )}
                {line && (
                  <span className="text-zinc-500">
                    {line.procedure.replace(/^Procedure:/, "")} · max {line.authority}
                    {line.enablement ? ` · ${line.enablement}` : " · not enabled"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {(triggers.data?.capped?.length ?? 0) > 0 && (
          <div className="mt-1 text-[12px] text-amber-400/90">The Trigger listing stopped at its cap.</div>
        )}
      </Panel>

      <Panel title="ClaimTypes that admit it" meta={<span>{admitting.length}</span>}>
        {admitting.length === 0 && <EmptyState>No ClaimType admits Captures under this contract.</EmptyState>}
        <table className="w-full text-left text-[12px]">
          <thead className="text-zinc-500">
            <tr>
              <th className="py-1 pr-3 font-medium">ClaimType</th>
              <th className="py-1 pr-3 font-medium">evidence</th>
              <th className="py-1 pr-3 font-medium">role</th>
              <th className="py-1 pr-3 font-medium">fresh</th>
              <th className="py-1 font-medium">kit</th>
            </tr>
          </thead>
          <tbody>
            {admitting.map(({ predicate, row }) => {
              const kind = row?.subject_kinds?.[0];
              return (
                <tr key={predicate} className="border-t border-zinc-900">
                  <td className="py-1 pr-3">
                    {kind ? (
                      <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(predicate)}`)} className="font-mono text-zinc-200 hover:underline">
                        {predicate}
                      </Link>
                    ) : (
                      <span className="font-mono text-zinc-300">{predicate}</span>
                    )}
                  </td>
                  <td className={`py-1 pr-3 ${row?.evidence_requirement === "captured" ? "text-amber-400/90" : "text-zinc-500"}`}>
                    {row?.evidence_requirement === "captured" ? "required" : "admitted"}
                  </td>
                  <td className="py-1 pr-3 text-zinc-400">{row?.default_role ?? "—"}</td>
                  <td className="py-1 pr-3 font-mono text-zinc-400">{row?.stale_after ?? "—"}</td>
                  <td className="py-1 font-mono text-zinc-400">{row?.kit ?? "here"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}

/** Every CaptureContract (orient capture_contracts section). */
export function ContractsScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const contracts = useCaptureContracts();
  usePageTitle("Contracts");
  return (
    <div className="max-w-4xl space-y-3">
      <h1 className="text-[17px] font-semibold text-zinc-100">Capture contracts</h1>
      {contracts.isPending && <LoadState />}
      {contracts.error && <LoadState error={contracts.error} />}
      {contracts.data && (
        <Panel title="Contracts" meta={<span>{contracts.data.rows.length}</span>}>
          <table className="w-full text-left text-[12px]">
            <thead className="text-zinc-500">
              <tr>
                <th className="py-1 pr-3 font-medium">contract</th>
                <th className="py-1 pr-3 font-medium">version</th>
                <th className="py-1 pr-3 font-medium">grade</th>
                <th className="py-1 font-medium">admitted by</th>
              </tr>
            </thead>
            <tbody>
              {contracts.data.rows.map((row) => (
                <tr key={row.contract} className="border-t border-zinc-900">
                  <td className="py-1 pr-3">
                    <Link to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(row.contract))}`)} className="font-mono text-zinc-200 hover:underline">
                      {contractName(row.contract)}
                    </Link>
                  </td>
                  <td className="py-1 pr-3 font-mono text-zinc-400">v{row.version}</td>
                  <td className="py-1 pr-3 text-zinc-400">{row.grade}</td>
                  <td className="py-1 font-mono text-zinc-400">{row.admitted_by} ClaimTypes</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}
    </div>
  );
}
