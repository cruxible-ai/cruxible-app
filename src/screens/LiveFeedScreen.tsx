import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Ban, CircleCheck, Eye, Pause, Play } from "lucide-react";
import { useInstanceId, useReceiptDetails, useReceiptFeed } from "@/api/hooks";
import {
  receiptOutcome,
  receiptSubject,
  refusalReason,
  type ReceiptDetail,
  type ReceiptOutcome,
  type ReceiptSummary,
} from "@/api/governance-types";
import { toggleChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { formatDateTime, humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

const FEED_LIMIT = 60;
const POLL_MS = 2500;
/** How long a freshly-arrived row keeps its entry treatment. */
const FLASH_MS = 1400;

type Filter = "all" | "writes" | "refusals";

/**
 * Live activity: the governed state reacting, in real time, to whatever the
 * agents are doing.
 *
 * This is the panel that sits beside the terminal. Agents act; every read and
 * every write leaves a receipt; refusals leave one too. A refused write is the
 * load-bearing case — the engine said no, durably and on the record — so it is
 * the loudest thing on the screen rather than a silent absence.
 */
export function LiveFeedScreen() {
  usePageTitle("Live activity");
  const instanceId = useInstanceId();
  const [live, setLive] = useState(true);
  const [filter, setFilter] = useState<Filter>("all");

  const feed = useReceiptFeed(FEED_LIMIT, POLL_MS, live);
  const summaries = useMemo(() => feed.data?.items ?? [], [feed.data]);
  const ids = useMemo(() => summaries.map((r) => r.receipt_id), [summaries]);
  const { byId, pending } = useReceiptDetails(ids);

  const flashing = useArrivals(ids);

  const rows = useMemo(
    () =>
      summaries.map((summary) => {
        const detail = byId.get(summary.receipt_id);
        return { summary, detail, outcome: receiptOutcome(detail) };
      }),
    [summaries, byId],
  );

  const counts = useMemo(() => {
    const acc = { committed: 0, refused: 0, read: 0 };
    for (const r of rows) {
      if (r.outcome === "committed") acc.committed += 1;
      else if (r.outcome === "refused") acc.refused += 1;
      else if (r.outcome === "read") acc.read += 1;
    }
    return acc;
  }, [rows]);

  const visible = rows.filter((r) => {
    if (filter === "refusals") return r.outcome === "refused";
    if (filter === "writes") return r.outcome === "refused" || r.outcome === "committed";
    return true;
  });

  return (
    <div className="space-y-3">
      <header>
        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="text-[17px] font-semibold text-zinc-100">Live activity</h1>
          <button
            onClick={() => setLive(!live)}
            className={`inline-flex items-center gap-1.5 ${toggleChipClass(live)}`}
            title={live ? "Pause polling" : "Resume polling"}
          >
            {live ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {live ? "Live" : "Paused"}
            {live && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />}
          </button>
          {feed.isFetching && <span className="text-[12px] text-zinc-600">refreshing…</span>}
        </div>
        <p className="mt-1 max-w-[68ch] text-[13px] text-zinc-500">
          Every operation agents run against this instance, newest first, polled every{" "}
          {POLL_MS / 1000}s. A receipt is written whether the engine accepted the work or refused
          it — refusals are the ones worth watching.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label="Committed" value={counts.committed} tone="text-emerald-400" Icon={CircleCheck} />
        <Stat
          label="Refused"
          value={counts.refused}
          tone={counts.refused > 0 ? "text-red-400" : "text-zinc-500"}
          Icon={Ban}
        />
        <Stat label="Reads" value={counts.read} tone="text-zinc-300" Icon={Eye} />
        <Stat label="Receipts total" value={feed.data?.total ?? 0} tone="text-zinc-300" />
      </div>

      <Panel
        title="Stream"
        meta={
          <div className="flex items-center gap-1.5">
            {(["all", "writes", "refusals"] as Filter[]).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={toggleChipClass(filter === f)}>
                {humanize(f)}
              </button>
            ))}
          </div>
        }
      >
        {feed.isPending && <LoadState />}
        {feed.error && <LoadState error={feed.error} />}
        {feed.data && visible.length === 0 && (
          <EmptyState>
            {filter === "refusals" ? "Nothing refused. The engine is saying yes." : "No activity."}
          </EmptyState>
        )}
        <div className="space-y-1">
          {visible.map(({ summary, detail, outcome }) => (
            <FeedRow
              key={summary.receipt_id}
              summary={summary}
              detail={detail}
              outcome={outcome}
              instanceId={instanceId}
              fresh={flashing.has(summary.receipt_id)}
            />
          ))}
        </div>
        {pending && visible.length > 0 && (
          <div className="pt-2 text-[12px] text-zinc-600">
            resolving actor and outcome for new receipts…
          </div>
        )}
      </Panel>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  Icon,
}: {
  label: string;
  value: number;
  tone: string;
  Icon?: typeof CircleCheck;
}) {
  return (
    <div className="border border-zinc-800 bg-zinc-900/20 px-3 py-2">
      <div className="flex items-center gap-1.5 text-[12px] text-zinc-500">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </div>
      <div className={`font-mono text-[20px] leading-7 ${tone}`}>{value}</div>
    </div>
  );
}

const OUTCOME_STYLE: Record<ReceiptOutcome, { row: string; label: string; badge: string }> = {
  refused: {
    row: "border-red-900/70 bg-red-950/25",
    label: "Refused",
    badge: "border-red-900 bg-red-950/70 text-red-400",
  },
  committed: {
    row: "border-zinc-800/60 bg-zinc-900/30",
    label: "Committed",
    badge: "border-emerald-900 bg-emerald-950/60 text-emerald-400",
  },
  read: {
    row: "border-zinc-800/40",
    label: "Read",
    badge: "border-zinc-800 text-zinc-500",
  },
  pending: {
    row: "border-zinc-800/40",
    label: "…",
    badge: "border-zinc-800 text-zinc-600",
  },
};

function FeedRow({
  summary,
  detail,
  outcome,
  instanceId,
  fresh,
}: {
  summary: ReceiptSummary;
  detail: ReceiptDetail | undefined;
  outcome: ReceiptOutcome;
  instanceId: string;
  fresh: boolean;
}) {
  const style = OUTCOME_STYLE[outcome];
  const refused = outcome === "refused";
  const actor = detail?.actor_context?.actor_id;
  const actorType = detail?.actor_context?.actor_type;
  const subject = receiptSubject(detail);
  const reason = refused ? refusalReason(detail) : undefined;
  const operation = summary.operation_type || "query";

  return (
    <article
      className={`border-l-2 border px-2.5 py-1.5 ${style.row} ${
        refused ? "border-l-red-500" : "border-l-transparent"
      } ${fresh ? "receipt-enter" : ""}`}
    >
      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-[13px]">
        <span
          className="w-[3.5rem] shrink-0 font-mono text-[12px] text-zinc-500"
          title={summary.created_at ?? undefined}
        >
          {clockTime(summary.created_at)}
        </span>
        <span
          className={`shrink-0 border px-1 text-[11px] leading-4 uppercase tracking-wide ${style.badge}`}
        >
          {style.label}
        </span>
        <span className="text-zinc-200">{humanize(operation)}</span>
        {summary.query_name && (
          <span className="font-mono text-[12px] text-zinc-400">{summary.query_name}</span>
        )}
        {subject && (
          <Link
            to={`/i/${instanceId}/e/${encodeURIComponent(subject.entity_type)}/${encodeURIComponent(
              subject.entity_id,
            )}`}
            className="font-mono text-[12px] text-zinc-300 hover:underline"
          >
            {subject.entity_type}/{subject.entity_id}
          </Link>
        )}
        <span className="ml-auto flex items-center gap-2.5 text-[12px]">
          {actor ? (
            <span
              className="inline-flex items-center gap-1 text-zinc-400"
              title={`${actorType ?? "actor"} · ${detail?.actor_context?.org_id ?? ""}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  actorType === "human_user" ? "bg-sky-500" : "bg-violet-400"
                }`}
              />
              {actor}
            </span>
          ) : (
            <span className="text-zinc-700">—</span>
          )}
          <Link
            to={`/i/${instanceId}/receipts/${summary.receipt_id}`}
            className="font-mono text-zinc-500 hover:text-zinc-300 hover:underline"
          >
            {summary.receipt_id}
          </Link>
        </span>
      </div>
      {reason && (
        <p className="mt-1 border-t border-red-900/40 pt-1 text-[13px] leading-5 text-red-300/90">
          {reason}
        </p>
      )}
    </article>
  );
}

/** "15:42:07" in the viewer's zone; the feed reads as a clock, not a log file. */
function clockTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return formatDateTime(iso);
  return d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

/**
 * Ids that appeared since the last poll. The first page is primed silently —
 * a page load is not sixty things happening at once.
 */
function useArrivals(ids: string[]): Set<string> {
  const seen = useRef(new Set<string>());
  const primed = useRef(false);
  const [fresh, setFresh] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!primed.current) {
      if (ids.length === 0) return;
      ids.forEach((id) => seen.current.add(id));
      primed.current = true;
      return;
    }
    const arrived = ids.filter((id) => !seen.current.has(id));
    if (arrived.length === 0) return;
    arrived.forEach((id) => seen.current.add(id));
    setFresh(new Set(arrived));
    const timer = setTimeout(() => setFresh(new Set()), FLASH_MS);
    return () => clearTimeout(timer);
  }, [ids]);

  return fresh;
}
