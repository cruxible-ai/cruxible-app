import { Check, TriangleAlert, X } from "lucide-react";

/** Attestation counts for one Claim (filled from GetEvidence.attestations by the Subject page). */
export interface CorroborationSummary {
  support_count?: number;
  contradict_count?: number;
  unsure_count?: number;
  distinct_actor_count?: number;
  open_contradiction?: boolean;
  stale_content?: { support_count?: number; contradict_count?: number; unsure_count?: number };
}

/**
 * Corroboration badges for one claim: how many independent observations back
 * it, how many contradict it, and how many distinct actors looked.
 *
 * These are COUNTS, not a score — nothing in the engine weights corroboration
 * by actor diversity, and this must not imply that it does. The summary key is
 * absent entirely when a claim has never been attested, which renders as
 * nothing rather than as a zero.
 */
export function Corroboration({
  summary,
  className = "",
}: {
  summary: CorroborationSummary | null | undefined;
  className?: string;
}) {
  if (!summary) return null;
  const support = summary.support_count ?? 0;
  const contradict = summary.contradict_count ?? 0;
  const unsure = summary.unsure_count ?? 0;
  const actors = summary.distinct_actor_count ?? 0;
  if (support === 0 && contradict === 0 && unsure === 0) return null;

  const contradicted = summary.open_contradiction === true || contradict > 0;
  const staleTotal =
    (summary.stale_content?.support_count ?? 0) +
    (summary.stale_content?.contradict_count ?? 0) +
    (summary.stale_content?.unsure_count ?? 0);

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-1.5 text-[12px] leading-4 ${className}`}
      title={
        `${support} supporting, ${contradict} contradicting, ${unsure} unsure` +
        ` · ${actors} distinct actor${actors === 1 ? "" : "s"}` +
        (staleTotal > 0 ? ` · ${staleTotal} against earlier claim content` : "")
      }
    >
      {support > 0 && (
        <span className="inline-flex items-center gap-1 text-emerald-400">
          <Check className="h-3 w-3" />
          {support}
        </span>
      )}
      {contradict > 0 && (
        <span className="inline-flex items-center gap-1 border border-red-900 bg-red-950/60 px-1 text-red-400">
          <X className="h-3 w-3" />
          {contradict}
        </span>
      )}
      {unsure > 0 && (
        <span className="inline-flex items-center gap-1 text-amber-400">
          <TriangleAlert className="h-3 w-3" />
          {unsure}
        </span>
      )}
      {actors > 0 && <span className="text-zinc-600">{actors} actor{actors === 1 ? "" : "s"}</span>}
      {contradicted && (
        <span className="border border-red-900 bg-red-950/60 px-1 text-red-400">Contradicted</span>
      )}
      {staleTotal > 0 && (
        <span className="text-zinc-600" title="Observations recorded against earlier claim content">
          {staleTotal} stale
        </span>
      )}
    </span>
  );
}

/** True when a claim carries an unresolved contradiction — callers use this to
 *  restyle the whole row, not just the badge. */
export function isContradicted(summary: CorroborationSummary | null | undefined): boolean {
  if (!summary) return false;
  return summary.open_contradiction === true || (summary.contradict_count ?? 0) > 0;
}
