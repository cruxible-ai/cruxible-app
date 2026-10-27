import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCard, useCards, useInstanceId, useReview } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { type Schemas } from "@/api/schemas";
import { ProposalChanges, proposalTitle, readProposalOrigin } from "@/components/ProposalChanges";
import { Chip } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { formatDateTime } from "@/lib/text";
import { term } from "@/lib/vocabulary";

type Entry = Schemas["ProposalListEntry"];

/** The state words a proposal row reads as (the State column's filter): its tab word, and how it ended. */
function stateWords(entry: Entry): string[] {
  const words = [term("proposal", entry.status).word];
  if (entry.status === "settled" && entry.terminal_reason) words.push(term("proposalOutcome", entry.terminal_reason).word);
  else if (entry.verdict === "refused") words.push(term("proposalOutcome", "refused").word);
  return words;
}

/**
 * Proposal rows in the shared table: when admitted, what the proposal is
 * (from its card, one cached read per row), who proposed it, its id (a copy
 * chip) and its state; a row expands to its origin and changes. `partial`
 * names what the rows are when the list has more pages: the daemon does not
 * order proposals, so a sort covers only these.
 */
export function ProposalList({ entries, partial = null }: { entries: Entry[]; partial?: string | null }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const cards = useCards(entries.map((entry) => entry.proposal_id));
  const titles = useMemo(() => {
    const out = new Map<string, string>();
    entries.forEach((entry, i) => {
      const card = cardOf(cards[i], "proposal");
      if (card) out.set(entry.proposal_id, proposalTitle(card.rationale ?? card.reason ?? null, entry.target_ref));
    });
    return out;
  }, [entries, cards]);
  const columns = useMemo<Column<Entry>[]>(
    () => [
      {
        id: "admitted",
        header: "Admitted",
        sortValue: (entry) => entry.admitted_at ?? null,
        className: "w-36 whitespace-nowrap text-zinc-500",
        cell: (entry) => <span title={entry.admitted_at ?? undefined}>{entry.admitted_at ? formatDateTime(entry.admitted_at) : "—"}</span>,
      },
      {
        id: "proposal",
        header: "Proposal",
        title: "What the proposal is: the Procedure that proposed it, the kit it installs, or its own words",
        hideable: false,
        sortValue: (entry) => titles.get(entry.proposal_id) ?? null,
        filter: { kind: "text", text: (entry) => titles.get(entry.proposal_id) ?? "" },
        cell: (entry) => <ProposalTitleLink entry={entry} to={link(`/i/${instanceId}/p/${encodeURIComponent(entry.proposal_id)}`)} />,
      },
      {
        id: "by",
        header: "By",
        sortValue: (entry) => entry.actor_id ?? null,
        filter: { kind: "enum", values: (entry) => (entry.actor_id ? [entry.actor_id] : []) },
        className: "whitespace-nowrap font-mono text-[12px] text-zinc-400",
        cell: (entry) => entry.actor_id ?? "—",
      },
      {
        id: "id",
        header: "Id",
        title: "The digest, short: click copies the whole id (commands accept a unique prefix)",
        sortValue: (entry) => entry.proposal_id,
        filter: { kind: "text", text: (entry) => entry.proposal_id },
        cell: (entry) => <CopyableId id={entry.proposal_id} />,
      },
      {
        id: "state",
        header: "State",
        sortValue: (entry) => stateWords(entry).join(" "),
        filter: { kind: "enum", values: stateWords },
        className: "whitespace-nowrap",
        cell: (entry) => (
          <ProposalStateChip status={entry.status} verdict={entry.verdict} outcome={entry.terminal_reason} incomplete={entry.incomplete_reasons} />
        ),
      },
    ],
    [instanceId, link, titles],
  );
  return (
    <DataTable
      rows={entries}
      columns={columns}
      rowKey={(entry) => entry.proposal_id}
      label="Proposals"
      partial={partial}
      expanded={(entry) => <ProposalPeek id={entry.proposal_id} indent="ml-0" />}
      empty="None."
    />
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

/** The row's link: what the proposal is, from its card (one cached get). */
function ProposalTitleLink({ entry, to }: { entry: Entry; to: string }) {
  const card = cardOf(useCard(entry.proposal_id).data, "proposal");
  const words = card?.rationale ?? card?.reason ?? null;
  // No change count here: the card lists a bounded page of changes with no total.
  return (
    <Link to={to} className="text-zinc-100 hover:underline">
      {card ? proposalTitle(words, entry.target_ref) : "Proposal"}
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
      {copied ? "Copied" : short}
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
