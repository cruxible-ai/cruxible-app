import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCard, useInstanceId, useReview } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { type Schemas } from "@/api/schemas";
import { ProposalChanges, proposalTitle, readProposalOrigin } from "@/components/ProposalChanges";
import { Chip } from "@/components/Chip";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { formatDateTime } from "@/lib/text";
import { term } from "@/lib/vocabulary";

type Entry = Schemas["ProposalListEntry"];

/** Proposal rows; a row expands to its card (one get), the page opens the review. */
export function ProposalList({ entries }: { entries: Entry[] }) {
  return (
    <div className="divide-y divide-zinc-800/60">
      {entries.map((entry) => (
        <ProposalRow key={entry.proposal_id} entry={entry} />
      ))}
    </div>
  );
}

function ProposalRow({ entry }: { entry: Entry }) {
  const [open, setOpen] = useState(false);
  const instanceId = useInstanceId();
  const link = useAtLink();
  return (
    <div className="py-1.5 text-[13px]">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={`${open ? "Collapse" : "Expand"} ${entry.proposal_id}`}
          className="text-zinc-500 hover:text-zinc-200"
        >
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        </button>
        <span className="w-36 shrink-0 text-zinc-500" title={entry.admitted_at ?? undefined}>
          {entry.admitted_at ? formatDateTime(entry.admitted_at) : "—"}
        </span>
        <ProposalTitleLink entry={entry} to={link(`/i/${instanceId}/p/${encodeURIComponent(entry.proposal_id)}`)} />
        <span className="text-[12px] text-zinc-500">by <span className="font-mono text-zinc-400">{entry.actor_id ?? "—"}</span></span>
        <CopyableId id={entry.proposal_id} />
        <span className="ml-auto">
          <ProposalStateChip status={entry.status} verdict={entry.verdict} outcome={entry.terminal_reason} incomplete={entry.incomplete_reasons} />
        </span>
      </div>
      {open && <ProposalPeek id={entry.proposal_id} />}
    </div>
  );
}

/**
 * A proposal's state as one chip, in the word its Proposals tab uses
 * ("Waiting for review", "Incomplete", "Settled"); a settled proposal adds how
 * it ended, an open one only a refusal. The evaluation's "candidate" verdict
 * is the normal case and says nothing to a reader, so it has no chip.
 */
export function ProposalStateChip({
  status,
  verdict,
  outcome,
  incomplete,
}: {
  status: string;
  verdict?: string | null | undefined;
  outcome?: string | null | undefined;
  incomplete?: readonly string[] | null | undefined;
}) {
  const state = term("proposal", status);
  const missing = (incomplete ?? []).map((reason) => reason.replace(/^missing_/, "").replaceAll("_", " "));
  const shown = missing.length > 0 ? { ...state, meaning: `${state.meaning} (missing: ${missing.join(", ")})` } : state;
  const ending = status === "settled" && outcome ? term("proposalOutcome", outcome) : verdict === "refused" ? term("proposalOutcome", "refused") : null;
  return (
    <span className="inline-flex items-baseline gap-2">
      <Chip term={shown} />
      {ending && <Chip term={{ ...ending, word: ending.word.toLowerCase() }} />}
    </span>
  );
}

/** The row's link: what the proposal is and how many changes, from its card (one cached get). */
function ProposalTitleLink({ entry, to }: { entry: Entry; to: string }) {
  const card = cardOf(useCard(entry.proposal_id).data, "proposal");
  const words = card?.rationale ?? card?.reason ?? null;
  const n = card?.changes?.length;
  return (
    <Link to={to} className="text-zinc-100 hover:underline">
      {card ? proposalTitle(words, entry.target_ref) : "Proposal"}
      {n !== undefined && <span className="text-zinc-500"> · {n} {n === 1 ? "change" : "changes"}</span>}
    </Link>
  );
}

/** The digest, short, for the CLI: click copies the whole id (commands accept a unique prefix). */
function CopyableId({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const short = id.slice(0, 15);
  return (
    <button
      type="button"
      title={`${id}\nClick to copy. Commands accept this short prefix too.`}
      onClick={() => {
        try {
          void navigator.clipboard.writeText(id).then(() => setCopied(true));
        } catch {
          /* clipboard unavailable: the title still shows the id */
        }
      }}
      className="font-mono text-[11px] text-zinc-600 hover:text-zinc-300"
    >
      {copied ? "copied" : short}
    </button>
  );
}

/** A proposal's origin and its changes as facts, from its review (expanded rows). */
export function ProposalPeek({ id, indent = "ml-6", skipWords }: { id: string; indent?: string; skipWords?: string | null | undefined }) {
  const review = useReview(id);
  if (review.isPending) return <div className={`${indent} animate-pulse text-[12px] text-zinc-500`}>Reading…</div>;
  if (review.error) return <div className={`${indent} text-[12px] text-red-400/80`}>{review.error.message}</div>;
  if (!review.data) return null;
  const words = review.data.rationale ?? null;
  const origin = readProposalOrigin(words);
  return (
    <div className={`${indent} mt-2 space-y-2 border-l border-zinc-800 pl-3`}>
      {origin ? (
        <div className="text-[12px] text-zinc-400">
          Proposed by <RefLink value={`Procedure:${origin.procedure}`} /> in run <RefLink value={origin.run} short />
        </div>
      ) : (
        words && words !== skipWords && <div className="whitespace-pre-wrap text-[12px] text-zinc-300">{words}</div>
      )}
      <ProposalChanges review={review.data} limit={12} />
    </div>
  );
}
