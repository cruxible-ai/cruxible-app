import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useClaimTypes, useInstanceId } from "@/api/hooks";
import { DataTable, type Column } from "@/components/DataTable";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { useAtLink } from "@/lib/at";
import { evidenceByKind, staleByKind, type EvidenceCounts, type KindEvidence, type KindStale } from "@/lib/dashboard";
import { isCoreIdentity } from "@/lib/ontology";

/**
 * Stale beliefs and evidence coverage per kind, from counts core serves on
 * each ClaimType row of the claim_types section (planned fields
 * `stale_count` and `evidence_counts`). One section read; never a Claim.
 * While the daemon does not serve a field, its panel says so.
 */

const keep = (kind: string) => !isCoreIdentity(kind);

export function StaleBeliefsPanel() {
  const claimTypes = useClaimTypes();
  const instanceId = useInstanceId();
  const link = useAtLink();
  const rows = useMemo(() => (claimTypes.data ? staleByKind(claimTypes.data.rows, keep) : undefined), [claimTypes.data]);
  const total = rows?.reduce((sum, row) => sum + row.stale, 0) ?? 0;
  const columns = useMemo<Column<KindStale>[]>(
    () => [
      {
        id: "kind",
        header: "Kind",
        sortValue: (row) => row.kind,
        cell: (row) => (
          <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(row.kind)}?view=claim-types`)} className="font-mono text-[12px] text-zinc-100 hover:underline">
            {row.kind}
          </Link>
        ),
      },
      {
        id: "stale",
        header: "Stale",
        title: "Live Claims past their ClaimType's stale_after",
        numeric: true,
        sortValue: (row) => row.stale,
        cell: (row) =>
          row.stale ? (
            <Link to={link(`/i/${instanceId}/next?preset=beliefs&f.family=stale`)} className="text-amber-300 hover:underline" title="Open stale beliefs in Next">
              {row.stale.toLocaleString()}
            </Link>
          ) : (
            <span className="text-zinc-500">0</span>
          ),
      },
      {
        id: "claim_types",
        header: "ClaimTypes",
        title: "The kind's ClaimTypes that go stale, with stale_after and each one's count",
        cell: (row) => (
          <span className="flex flex-wrap gap-x-3 text-[12px]">
            {row.claimTypes.map((ct) => (
              <Link
                key={ct.predicate}
                to={link(`/i/${instanceId}/kinds/${encodeURIComponent(row.kind)}?claim_type=${encodeURIComponent(ct.predicate)}`)}
                className="text-zinc-400 hover:text-zinc-200 hover:underline"
                title={`${ct.predicate} · stale_after ${ct.staleAfter}`}
              >
                <span className="font-mono">{ct.name}</span> <span className="text-zinc-500">{ct.staleAfter}</span>
                {ct.stale ? <span className="text-zinc-300"> · {ct.stale}</span> : null}
              </Link>
            ))}
          </span>
        ),
      },
    ],
    [instanceId, link],
  );
  // A daemon that does not serve stale counts gets no card.
  if (rows === null) return null;
  return (
    <Panel
      title="Stale beliefs"
      description="Live Claims past their ClaimType's stale_after, per kind."
      meta={rows ? <span>{total.toLocaleString()} stale</span> : undefined}
    >
      {claimTypes.isPending && <LoadState />}
      {claimTypes.error && <LoadState error={claimTypes.error} />}
      {rows && rows.length === 0 && <EmptyState>No ClaimType sets stale_after</EmptyState>}
      {rows && rows.length > 0 && (
        <DataTable rows={rows} columns={columns} rowKey={(row) => row.kind} label="Stale beliefs" urlKey="stale" toolbar={false} maxHeight="none" />
      )}
    </Panel>
  );
}

const SEGMENTS: { key: keyof EvidenceCounts; word: string; meaning: string; className: string }[] = [
  { key: "admitted", word: "Admitted evidence", meaning: "Live Claims citing evidence their ClaimType admits", className: "bg-sky-400" },
  { key: "own_word", word: "Own words", meaning: "Live Claims standing on their author's word, where the ClaimType allows it", className: "bg-zinc-500" },
  { key: "unmet", word: "Required, not admitted", meaning: "Live Claims whose ClaimType requires admitted evidence they do not have", className: "bg-red-500" },
];

export function EvidenceCoveragePanel() {
  const claimTypes = useClaimTypes();
  const rows = useMemo(() => (claimTypes.data ? evidenceByKind(claimTypes.data.rows, keep) : undefined), [claimTypes.data]);
  const unmet = rows?.reduce((sum, row) => sum + row.unmet, 0) ?? 0;
  if (rows === null) return null;
  return (
    <Panel
      title="Evidence coverage"
      description="Per kind, the live Claims citing admitted evidence, standing on their own words, or missing evidence their ClaimType requires."
      meta={rows ? <span>{unmet ? `${unmet.toLocaleString()} not admitted` : "all met"}</span> : undefined}
    >
      {claimTypes.isPending && <LoadState />}
      {claimTypes.error && <LoadState error={claimTypes.error} />}
      {rows && rows.length === 0 && <EmptyState>No live Claims</EmptyState>}
      {rows && rows.length > 0 && (
        <>
          <div className="mb-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-zinc-500">
            {SEGMENTS.map((s) => (
              <span key={s.key} className="inline-flex items-center gap-1 whitespace-nowrap" title={s.meaning}>
                <span aria-hidden className={`h-2 w-2 rounded-[2px] ${s.className}`} />
                {s.word}
              </span>
            ))}
          </div>
          <ul aria-label="Evidence coverage" className="space-y-2">
            {rows.map((row) => (
              <EvidenceRow key={row.kind} row={row} />
            ))}
          </ul>
        </>
      )}
    </Panel>
  );
}

function EvidenceRow({ row }: { row: KindEvidence }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const total = row.admitted + row.own_word + row.unmet;
  const target = (key: keyof EvidenceCounts) =>
    key === "unmet" ? link(`/i/${instanceId}/next?preset=beliefs&f.family=stale`) : link(`/i/${instanceId}/kinds/${encodeURIComponent(row.kind)}?view=claim-types`);
  return (
    <li className="text-[12px]">
      <div className="flex items-baseline gap-3">
        <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(row.kind)}?view=claim-types`)} className="min-w-0 truncate font-mono text-zinc-100 hover:underline" title={row.kind}>
          {row.kind}
        </Link>
        <span className="ml-auto whitespace-nowrap font-mono text-zinc-400" title="Admitted · own words · required, not admitted">
          {row.admitted}
          <span className="text-zinc-600"> · </span>
          {row.own_word}
          <span className="text-zinc-600"> · </span>
          <span className={row.unmet ? "text-red-400" : undefined}>{row.unmet}</span>
        </span>
      </div>
      <div className="mt-1 flex h-2 overflow-hidden bg-zinc-800" role="group" aria-label={`${row.kind} evidence`}>
        {SEGMENTS.map((s) =>
          row[s.key] > 0 ? (
            <Link
              key={s.key}
              to={target(s.key)}
              className={`${s.className} h-full hover:opacity-80`}
              style={{ width: `${(row[s.key] / total) * 100}%` }}
              aria-label={`${s.word}: ${row[s.key]}`}
              title={`${s.word}: ${row[s.key].toLocaleString()} of ${total.toLocaleString()}`}
            />
          ) : null,
        )}
      </div>
    </li>
  );
}
