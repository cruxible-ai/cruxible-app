import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useActivity, useInstanceId } from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import { SignalDot } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { activityRows, FAMILY, type ActivityFamily, type ActivityLink, type ActivityRow } from "@/lib/activity";
import { useAtLink, withAt } from "@/lib/at";
import { formatDateTime, formatRelative, sentence } from "@/lib/text";

/**
 * What happened, newest first: one page of the daemon's activity feed at a
 * time, with older pages appended on request. Days are marked; each row has
 * its family's color, the actor, what happened, where to read more, and when.
 */
export function ActivityFeed({ label }: { label: (line: string) => string }) {
  const [cursors, setCursors] = useState<(string | undefined)[]>([undefined]);
  const [families, setFamilies] = useState<Set<ActivityFamily>>(new Set());
  const addFamilies = useMemo(
    () => (seen: ActivityFamily[]) =>
      setFamilies((prev) => (seen.every((f) => prev.has(f)) ? prev : new Set([...prev, ...seen]))),
    [],
  );
  return (
    <Panel title="Activity" meta={<FamilyLegend seen={families} />}>
      <div aria-label="Activity" role="feed">
        {cursors.map((cursor, i) => (
          <ActivityPage
            key={cursor ?? "first"}
            cursor={cursor}
            label={label}
            last={i === cursors.length - 1}
            onMore={(next) => setCursors((list) => [...list, next])}
            onFamilies={addFamilies}
          />
        ))}
      </div>
    </Panel>
  );
}

function ActivityPage({
  cursor,
  label,
  last,
  onMore,
  onFamilies,
}: {
  cursor: string | undefined;
  label: (line: string) => string;
  last: boolean;
  onMore: (cursor: string) => void;
  onFamilies: (families: ActivityFamily[]) => void;
}) {
  const page = useActivity(cursor);
  const rows = useMemo(() => activityRows(page.data?.activity ?? [], label), [page.data, label]);
  const familyKey = [...new Set(rows.map((r) => r.family))].sort().join(",");
  useEffect(() => {
    if (familyKey) onFamilies(familyKey.split(",") as ActivityFamily[]);
  }, [familyKey, onFamilies]);
  if (page.isPending) return <LoadState />;
  if (page.error) {
    // A daemon older than the feed refuses the section as an invalid request: say so plainly.
    if (page.error instanceof ApiError && page.error.errorCode === "request.invalid" && JSON.stringify(page.error.envelope).includes("query.section"))
      return <EmptyState>This daemon predates the activity feed. It arrives with core 0.5.</EmptyState>;
    return <LoadState error={page.error} />;
  }
  const now = new Date();
  return (
    <>
      {rows.length === 0 && cursor === undefined && <EmptyState>Nothing has happened yet.</EmptyState>}
      <ol className="divide-y divide-zinc-800/60">
        {rows.map((row, i) => (
          <li key={row.key}>
            {(i === 0 || dayOf(row.at) !== dayOf(rows[i - 1]!.at)) && <DayMark at={row.at} now={now} />}
            <Row row={row} now={now} />
          </li>
        ))}
      </ol>
      {last && page.data.next_cursor && (
        <button
          type="button"
          onClick={() => onMore(page.data.next_cursor!)}
          className="mt-2 text-[12px] text-zinc-400 hover:text-zinc-200"
        >
          Show older activity
        </button>
      )}
    </>
  );
}

const dayOf = (iso: string) => new Date(iso).toDateString();

function DayMark({ at, now }: { at: string; now: Date }) {
  const day = new Date(at);
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const text =
    day.toDateString() === now.toDateString()
      ? "Today"
      : day.toDateString() === yesterday.toDateString()
        ? "Yesterday"
        : day.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  return <div className="t-meta pb-0.5 pt-2">{text}</div>;
}

function Row({ row, now }: { row: ActivityRow; now: Date }) {
  const family = FAMILY[row.family];
  return (
    <div className="flex items-baseline gap-2.5 py-1.5 text-[13px]">
      <span
        className="relative top-[1px] h-2 w-2 shrink-0 rounded-[2px]"
        style={{ backgroundColor: family.color }}
        title={family.legend}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-1.5">
          {row.signal && <SignalDot signal={row.signal} title={row.signal === "wrong" ? "Wrong or blocked" : "Waiting on you"} />}
          {row.who && (
            <Target link={row.who.link} className="font-mono text-[12px] text-zinc-100">
              {row.who.text}
            </Target>
          )}
          <span className="text-zinc-300">{row.who ? row.what : sentence(row.what)}</span>
          {row.object && (
            <Target link={row.object.link} className="font-mono text-[12px] text-zinc-400">
              {row.object.text}
            </Target>
          )}
          {row.unavailable && <span className="text-[12px] text-zinc-500">(record unavailable)</span>}
        </div>
        {row.detail && <div className="truncate text-[12px] text-zinc-500" title={row.detail}>{row.detail}</div>}
      </div>
      <time dateTime={row.at} title={formatDateTime(row.at)} className="shrink-0 text-[12px] text-zinc-500">
        {formatRelative(row.at, now)}
      </time>
    </div>
  );
}

function Target({ link, className, children }: { link: ActivityLink; className: string; children: ReactNode }) {
  const instanceId = useInstanceId();
  const at = useAtLink();
  const hover = "hover:text-white hover:underline underline-offset-2";
  switch (link.kind) {
    case "line":
      return (
        <Link to={at(`/i/${instanceId}/lines/${encodeURIComponent(link.name)}`)} className={`${className} ${hover}`} title={link.name}>
          {children}
        </Link>
      );
    case "run":
      return (
        <Link to={at(`/i/${instanceId}/runs/${encodeURIComponent(link.id)}`)} className={`${className} ${hover}`} title={link.id}>
          {children}
        </Link>
      );
    case "proposal":
      return (
        <Link to={at(`/i/${instanceId}/p/${encodeURIComponent(link.id)}`)} className={`${className} ${hover}`} title={link.id}>
          {children}
        </Link>
      );
    case "generation":
      return (
        <Link
          to={withAt(`/i/${instanceId}`, String(link.sequence))}
          className={`${className} ${hover}`}
          title="Open the instance pinned at this generation"
        >
          {children}
        </Link>
      );
    case "ref":
      return (
        <RefLink value={link.ref} className={className}>
          {children}
        </RefLink>
      );
  }
}

/** The colors of the families on screen, so a reader can tell a run from evidence from a generation. */
function FamilyLegend({ seen }: { seen: Set<ActivityFamily> }) {
  const order: ActivityFamily[] = ["generation", "run", "capture", "inbox", "occurrence", "line", "erasure", "gap"];
  const shown = order.filter((f) => seen.has(f));
  if (shown.length === 0) return null;
  return (
    <span className="flex flex-wrap items-center justify-end gap-x-2.5 gap-y-0.5">
      {shown.map((f) => (
        <span key={f} className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: FAMILY[f].color }} aria-hidden />
          {FAMILY[f].legend}
        </span>
      ))}
    </span>
  );
}
