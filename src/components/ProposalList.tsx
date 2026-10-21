import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useCard, useInstanceId } from "@/api/hooks";
import { cardOf, type Schemas } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { RefLink } from "@/components/RefLink";
import { useAtLink } from "@/lib/at";
import { formatDateTime } from "@/lib/text";

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
        <Link
          to={link(`/i/${instanceId}/p/${encodeURIComponent(entry.proposal_id)}`)}
          className="font-mono text-[12px] text-zinc-200 hover:underline"
          title={entry.proposal_id}
        >
          {entry.proposal_id.slice(0, 19)}…
        </Link>
        <span className="font-mono text-[12px] text-zinc-400">{entry.actor_id ?? "—"}</span>
        {entry.target_ref && <span className="text-[12px] text-zinc-500">{entry.target_ref}</span>}
        <span className="ml-auto flex gap-2">
          <Chip value={entry.terminal_reason ?? entry.status} />
          {entry.verdict && <Chip value={entry.verdict} />}
          {(entry.incomplete_reasons ?? []).map((reason) => (
            <Chip key={reason} value={reason} tone="amber" />
          ))}
        </span>
      </div>
      {open && <ProposalPeek id={entry.proposal_id} />}
    </div>
  );
}

/** A proposal's change set and reason, from one get (expanded rows). */
export function ProposalPeek({ id, indent = "ml-6", skipWords }: { id: string; indent?: string; skipWords?: string | null | undefined }) {
  const read = useCard(id);
  const card = cardOf(read.data, "proposal");
  if (read.isPending) return <div className={`${indent} animate-pulse text-[12px] text-zinc-500`}>Reading…</div>;
  if (read.error) return <div className={`${indent} text-[12px] text-red-400/80`}>{read.error.message}</div>;
  if (!card) return null;
  const changes = card.changes ?? [];
  const words = card.rationale ?? card.reason;
  return (
    <div className={`${indent} mt-1.5 space-y-0.5 border-l border-zinc-800 pl-3 text-[12px]`}>
      {words && words !== skipWords && <div className="whitespace-pre-wrap text-zinc-300">{words}</div>}
      {changes.slice(0, 12).map((change) => (
        <div key={change.path} className="grid grid-cols-[4rem_minmax(0,1fr)] items-baseline gap-x-2">
          <span className="text-zinc-500">{change.change}</span>
          <span className="min-w-0 break-all">
            <RefLink value={change.path} />
          </span>
        </div>
      ))}
      {changes.length > 12 && <div className="text-zinc-500">+{changes.length - 12} more on the proposal page</div>}
    </div>
  );
}

