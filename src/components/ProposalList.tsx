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

function ProposalPeek({ id }: { id: string }) {
  const read = useCard(id);
  const card = cardOf(read.data, "proposal");
  if (read.isPending) return <div className="ml-6 animate-pulse text-[12px] text-zinc-600">Reading…</div>;
  if (read.error) return <div className="ml-6 text-[12px] text-red-400/80">{read.error.message}</div>;
  if (!card) return null;
  const changes = card.changes ?? [];
  return (
    <div className="ml-6 mt-1 space-y-0.5 text-[12px]">
      {(card.rationale ?? card.reason) && <div className="whitespace-pre-wrap text-zinc-300">{card.rationale ?? card.reason}</div>}
      {changes.slice(0, 12).map((change) => (
        <div key={change.path} className="flex gap-2">
          <span className="text-zinc-500">{change.change}</span>
          <RefLink value={change.path} />
        </div>
      ))}
      {changes.length > 12 && <div className="text-zinc-600">+{changes.length - 12} more on the proposal page</div>}
    </div>
  );
}
