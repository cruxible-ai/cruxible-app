import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { ChangeAuthor } from "@/components/ChangeAuthor";
import { HeaderDot as Dot, HeaderLabel } from "@/components/ChangeLog";
import { RefLink } from "@/components/RefLink";
import { LongText } from "@/components/LongText";
import { useAtLink, withAt } from "@/lib/at";
import { proposalRun, proposalWords } from "@/lib/change-sets";
import { runId } from "@/lib/lines";

/**
 * The cells an accepted generation reads as in a table: the Ledger's rows and
 * the Dashboard's Activity share them (each with its own author cell).
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

/**
 * Who authored the generation (a run's Line, a direct run's Procedure, or the
 * proposer) and approved it. Reads the run's card and its Line's latest
 * revision (one each, kept once read): the Ledger's cell, not for a surface
 * that must not read per row.
 */
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

/**
 * Who authored the generation from the row's own fields, with no read: the
 * Procedure and run core's proposal text names, otherwise the proposer; then
 * the approvers. The Dashboard's cell (its reads stay bounded by its panels,
 * never by rows).
 */
export function GenerationAuthorFromRow({ row }: { row: Generation }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const source = proposalRun(row.because);
  const id = source ? runId(source.run) : null;
  const author = source ? null : (row.proposer ?? null);
  const approved = (row.approvals ?? []).filter((principal) => principal !== author);
  if (!source && !author && approved.length === 0) return <span className="text-zinc-600">—</span>;
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-zinc-400 [&_.font-mono]:whitespace-nowrap">
      {source && id && (
        <>
          <HeaderLabel>Procedure</HeaderLabel>
          <RefLink value={source.procedure} className="font-mono text-[12px] text-zinc-200">
            {source.procedure.replace(/^Procedure:/, "")}
          </RefLink>
          <Dot />
          <HeaderLabel>Run</HeaderLabel>
          <Link to={link(`/i/${instanceId}/runs/${encodeURIComponent(id)}`)} className="font-mono text-[12px] text-zinc-500 hover:text-zinc-200 hover:underline" title={id}>
            {/^RUN-[0-9a-f]{7,}$/.test(id) ? `${id.slice(4, 10)}…` : id}
          </Link>
        </>
      )}
      {author && <span className="font-mono text-zinc-300">{author}</span>}
      {approved.length > 0 && (
        <>
          <Dot />
          <HeaderLabel>Approved by</HeaderLabel>
          <span className="text-zinc-300">{approved.join(", ")}</span>
        </>
      )}
    </span>
  );
}

/** The proposal's own words, as written (core's "Proposed by …" header left out). */
export function GenerationDescription({ text, truncated, lines = 2 }: { text: string | null | undefined; truncated: boolean; lines?: number }) {
  const words = proposalWords(text, truncated);
  return words ? <LongText text={words} lines={lines} className="text-zinc-200" /> : <span className="text-zinc-600">—</span>;
}
