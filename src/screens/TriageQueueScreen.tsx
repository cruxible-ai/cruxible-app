import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useEntityList, useInstanceId, useOutcomeContracts } from "@/api/hooks";
import type { ContractListItem } from "@/api/governance-types";
import type { EntityRef } from "@/api/items";
import { Chip, toggleChipClass } from "@/components/Chip";
import { isAcceptanceBlocked, OutcomeBadge } from "@/components/OutcomeContract";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { humanize, matchesText } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

export const DECISION_TYPE = "TriageDecision";
const STATUSES = ["proposed", "accepted", "rejected"] as const;

/**
 * The triage queue: every remediation call on the board, with the thing that
 * decides whether it can settle.
 *
 * A decision that declares `outcome_tracking: required` cannot be accepted
 * until a resolution contract states, in advance, what result would count as
 * success — the engine refuses the write otherwise. So the contract column is
 * not decoration: for a proposed tracked decision with no contract it is the
 * reason the row is stuck, and it says so.
 */
export function TriageQueueScreen() {
  usePageTitle("Triage queue");
  const instanceId = useInstanceId();
  const [status, setStatus] = useState<string | null>("proposed");
  const [text, setText] = useState("");

  const decisions = useEntityList(DECISION_TYPE, 200);
  const services = useEntityList("BusinessService", 200);
  // No batch "which of these have contracts" surface exists, so the whole
  // contract set for the type comes back and is joined here on entity_id.
  const contracts = useOutcomeContracts(DECISION_TYPE);

  const contractsByEntity = useMemo(() => {
    const map = new Map<string, ContractListItem>();
    for (const item of contracts.data?.items ?? []) {
      const existing = map.get(item.contract.entity_id);
      // Newest contract wins: re-opening after a subject edit is the normal path.
      if (!existing || (item.contract.opened_at ?? "") > (existing.contract.opened_at ?? "")) {
        map.set(item.contract.entity_id, item);
      }
    }
    return map;
  }, [contracts.data]);

  const serviceById = useMemo(() => {
    const map = new Map<string, EntityRef>();
    for (const s of (services.data as { items?: EntityRef[] } | undefined)?.items ?? []) {
      map.set(s.entity_id, s);
    }
    return map;
  }, [services.data]);

  const allRows = ((decisions.data as { items?: EntityRef[] } | undefined)?.items ?? []).map(
    (entity) => ({ entity, contract: contractsByEntity.get(entity.entity_id) }),
  );

  const statusCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const { entity } of allRows) {
      const s = String(entity.properties.status ?? "");
      counts.set(s, (counts.get(s) ?? 0) + 1);
    }
    return counts;
  }, [allRows]);

  const blockedCount = allRows.filter(
    ({ entity, contract }) =>
      entity.properties.status === "proposed" &&
      isAcceptanceBlocked(entity.properties.outcome_tracking, contract),
  ).length;

  const rows = allRows
    .filter(({ entity }) => (status ? entity.properties.status === status : true))
    .filter(({ entity }) =>
      matchesText(
        [entity.entity_id, ...Object.values(entity.properties).filter((v) => v !== null)],
        text,
      ),
    )
    .sort((a, b) => String(a.entity.properties.cve_id ?? "").localeCompare(
      String(b.entity.properties.cve_id ?? ""),
    ));

  const pending = decisions.isPending || contracts.isPending;

  return (
    <div className="space-y-3">
      <header>
        <h1 className="text-[17px] font-semibold text-zinc-100">Triage queue</h1>
        <p className="mt-1 max-w-[72ch] text-[13px] text-zinc-500">
          Remediation calls awaiting review. A decision that tracks its outcome cannot be accepted
          until a resolution contract commits to what would count as success — until then the
          engine refuses the acceptance, and the row below says why.
        </p>
        {blockedCount > 0 && (
          <p className="mt-2 inline-flex items-center gap-2 border border-red-900 bg-red-950/40 px-2 py-1 text-[13px] text-red-300">
            <span className="font-mono">{blockedCount}</span>
            proposed {blockedCount === 1 ? "decision claims" : "decisions claim"} a measurable result
            but {blockedCount === 1 ? "has" : "have"} no outcome contract —{" "}
            {blockedCount === 1 ? "it cannot" : "they cannot"} be accepted.
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <button onClick={() => setStatus(null)} className={toggleChipClass(status === null)}>
            All <span className="font-mono text-[11px] text-zinc-500">{allRows.length}</span>
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s === status ? null : s)}
              className={toggleChipClass(status === s)}
            >
              {humanize(s)}{" "}
              <span className="font-mono text-[11px] text-zinc-500">{statusCounts.get(s) ?? 0}</span>
            </button>
          ))}
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Filter…"
            className="ml-auto w-48 border border-zinc-800 bg-transparent px-2 py-0.5 text-[13px] text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
        </div>
      </header>

      <Panel
        title="Decisions"
        meta={
          <span>
            <span className="font-mono">{rows.length}</span> shown
            {contracts.data === null && <> · contract surface unavailable on this daemon</>}
          </span>
        }
      >
        {pending && <LoadState />}
        {decisions.error && <LoadState error={decisions.error} />}
        {!pending && rows.length === 0 && <EmptyState>No decisions in this bucket.</EmptyState>}
        {rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead>
                <tr className="border-b border-zinc-800 text-[12px] text-zinc-500">
                  <th className="py-1 pr-3 font-medium">Decision</th>
                  <th className="py-1 pr-3 font-medium">CVE</th>
                  <th className="py-1 pr-3 font-medium">Service</th>
                  <th className="py-1 pr-3 font-medium">Criticality</th>
                  <th className="py-1 pr-3 font-medium">Remediation</th>
                  <th className="py-1 pr-3 font-medium">Status</th>
                  <th className="py-1 pr-3 font-medium">Outcome contract</th>
                  <th className="py-1 pr-3 font-medium">Decided by</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ entity, contract }) => {
                  const p = entity.properties;
                  const blocked =
                    p.status === "proposed" && isAcceptanceBlocked(p.outcome_tracking, contract);
                  const service = serviceById.get(String(p.service_id ?? ""));
                  const criticality = service?.properties.criticality;
                  return (
                    <tr
                      key={entity.entity_id}
                      className={`border-t align-top hover:bg-zinc-900/40 ${
                        blocked
                          ? "border-t-red-900/50 bg-red-950/15"
                          : "border-t-zinc-800/60"
                      }`}
                    >
                      <td className="max-w-[26rem] py-1.5 pr-3">
                        <Link
                          to={`/i/${instanceId}/triage/${encodeURIComponent(entity.entity_id)}`}
                          className="text-zinc-200 decoration-zinc-600 underline-offset-2 hover:text-white hover:underline"
                        >
                          {String(p.title ?? entity.entity_id)}
                        </Link>
                        <div className="font-mono text-[12px] text-zinc-600">{entity.entity_id}</div>
                      </td>
                      <td className="py-1.5 pr-3 font-mono text-[13px] text-zinc-400">
                        {String(p.cve_id ?? "—")}
                      </td>
                      <td className="py-1.5 pr-3 text-zinc-400">
                        {service
                          ? String(service.properties.name ?? service.entity_id)
                          : String(p.service_id ?? "—")}
                      </td>
                      <td className="py-1.5 pr-3">
                        {typeof criticality === "string" ? (
                          <Chip value={criticality} />
                        ) : (
                          <span className="text-zinc-700">—</span>
                        )}
                      </td>
                      <td className="py-1.5 pr-3 text-zinc-400">
                        {p.remediation_type ? humanize(String(p.remediation_type)) : "—"}
                      </td>
                      <td className="py-1.5 pr-3">
                        <Chip value={String(p.status ?? "")} />
                      </td>
                      <td className="py-1.5 pr-3">
                        <OutcomeBadge contract={contract} outcomeTracking={p.outcome_tracking} />
                      </td>
                      <td className="py-1.5 pr-3 text-[13px] text-zinc-500">
                        {String(p.decided_by ?? "—")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
