import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { ChangeAuthor } from "@/components/ChangeAuthor";
import { LongText } from "@/components/LongText";
import { withAt } from "@/lib/at";
import { proposalRun, proposalWords } from "@/lib/change-sets";

/**
 * The cells an accepted generation reads as in a table: the Ledger's rows and
 * the Dashboard's Activity share them.
 */

type Generation = Schemas["OrientGeneration"];

/** The generation's number, opening the instance pinned there. */
export function GenerationCell({ sequence }: { sequence: number }) {
  const instanceId = useInstanceId();
  return (
    <Link to={withAt(`/i/${instanceId}`, String(sequence))} className="font-mono text-zinc-200 hover:underline" title="Open the instance pinned at this generation">
      g{sequence}
    </Link>
  );
}

/** Who authored the generation (a run's Line, a direct run's Procedure, or the proposer) and approved it. */
export function GenerationAuthor({ row }: { row: Generation }) {
  const source = proposalRun(row.because);
  if (!source && !row.proposer && (row.approvals ?? []).length === 0) return <span className="text-zinc-600">—</span>;
  return (
    // a name never breaks at its hyphens
    <span className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-zinc-400 [&_.font-mono]:whitespace-nowrap">
      <ChangeAuthor source={source} sequence={row.sequence} actor={row.proposer ?? null} approvers={row.approvals ?? []} authorLabel={false} />
    </span>
  );
}

/** The proposal's own words, as written (core's "Proposed by …" header left out). */
export function GenerationDescription({ text, truncated, lines = 2 }: { text: string | null | undefined; truncated: boolean; lines?: number }) {
  const words = proposalWords(text, truncated);
  return words ? <LongText text={words} lines={lines} className="text-zinc-200" /> : <span className="text-zinc-600">—</span>;
}
