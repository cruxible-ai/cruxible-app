import { Check, TriangleAlert, X } from "lucide-react";

/** Attestation counts for one Claim version (filled from GetEvidence.attestations by the Subject page). */
export interface CorroborationSummary {
  /** Current attestations by stance: accepted ones and the events `claim attest` recorded. */
  support_count?: number;
  contradict_count?: number;
  unsure_count?: number;
  distinct_actor_count?: number;
  /** How many of them count toward the verdict. */
  counting_count?: number;
  /** A contradiction that counts toward the verdict. */
  open_contradiction?: boolean;
  /** Attestations no longer current (superseded, outside their window, or against earlier content). */
  not_current_count?: number;
}

/**
 * Corroboration badges for one Claim version: how many current attestations
 * support it, contradict it or are unsure, how many distinct principals
 * attested, and how many of them count toward the verdict.
 *
 * These are COUNTS, not a score: nothing in the engine weights corroboration
 * by actor diversity, and this must not imply that it does. A recorded
 * attestation is shown and resurfaced in `next` but counts only when the
 * verdict law or a consequence policy reads it, so "Contradicted" marks only
 * a contradiction that counts. Nothing renders when the Claim version was
 * never attested.
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
  const notCurrent = summary.not_current_count ?? 0;
  const total = support + contradict + unsure;
  if (total === 0 && notCurrent === 0) return null;
  const counting = summary.counting_count;
  const contradicted = summary.open_contradiction ?? contradict > 0;

  return (
    <span
      className={`inline-flex flex-wrap items-center gap-1.5 text-[12px] leading-4 ${className}`}
      title={
        `${support} supporting, ${contradict} contradicting, ${unsure} unsure` +
        ` · ${actors} distinct actor${actors === 1 ? "" : "s"}` +
        (counting !== undefined ? ` · ${counting} of ${total} count toward the verdict` : "") +
        (notCurrent > 0 ? ` · ${notCurrent} no longer current` : "")
      }
    >
      {support > 0 && (
        <span className="inline-flex items-center gap-1 text-emerald-400">
          <Check className="h-3 w-3" />
          {support}
        </span>
      )}
      {contradict > 0 && (
        <span className="inline-flex items-center gap-1 text-red-400">
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
      {actors > 0 && <span className="text-zinc-500">{actors} actor{actors === 1 ? "" : "s"}</span>}
      {counting !== undefined && total > 0 && (
        <span className="text-zinc-500">
          {counting} of {total} count{total === 1 ? "s" : ""} toward the verdict
        </span>
      )}
      {contradicted && <span className="border border-red-900 bg-red-950/60 px-1 text-red-400">Contradicted</span>}
      {notCurrent > 0 && (
        <span className="text-zinc-500" title="Attestations no longer current: superseded, outside their window, or against earlier content">
          {notCurrent} not current
        </span>
      )}
    </span>
  );
}
