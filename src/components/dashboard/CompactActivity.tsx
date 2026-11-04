import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useActivity, useInstanceId } from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import type { OrientActivity } from "@/api/schemas";
import { SignalDot } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { FAMILY, formatDuration, shortRun, type ActivityFamily, type ActivityLink, type ActivityRow } from "@/lib/activity";
import { useAtLink, withAt } from "@/lib/at";
import { compactRows, shortCapture, type RunRow } from "@/lib/dashboard-activity";
import { formatDateTime, formatRelative, sentence } from "@/lib/text";
import { term } from "@/lib/vocabulary";

/** Rows shown at first, and added by each "Show older". */
export const ACTIVITY_ROWS = 12;

interface Loaded {
  events: OrientActivity[];
  next: string | null;
}

/**
 * What happened, newest first, one row per Line run (its start, the Captures
 * it landed and the generation it was accepted as, folded) and one per other
 * event. Shows ACTIVITY_ROWS at a time; older rows come from the pages
 * already read, then from the next activity page.
 */
export function CompactActivity({ label }: { label: (line: string) => string }) {
  const [cursors, setCursors] = useState<(string | undefined)[]>([undefined]);
  const [pages, setPages] = useState<Record<string, Loaded>>({});
  const [shown, setShown] = useState(ACTIVITY_ROWS);
  const onLoaded = useCallback((key: string, loaded: Loaded) => setPages((prev) => (prev[key] === loaded ? prev : { ...prev, [key]: loaded })), []);

  const loaded = cursors.map((cursor) => pages[cursor ?? ""]);
  const events = useMemo(() => cursors.flatMap((cursor) => pages[cursor ?? ""]?.events ?? []), [cursors, pages]);
  const rows = useMemo(() => compactRows(events, label), [events, label]);
  const last = loaded[loaded.length - 1];
  const loading = last === undefined;
  const more = shown < rows.length || (last?.next ?? null) !== null;

  // Paging past the rows already read asks for the next page.
  const older = () => {
    const next = shown + ACTIVITY_ROWS;
    setShown(next);
    if (next > rows.length && last?.next && !cursors.includes(last.next)) setCursors((list) => [...list, last.next!]);
  };

  const visible = rows.slice(0, shown);
  const families = [...new Set(visible.map((row) => (row.kind === "run" ? "run" : row.row.family)))];
  const now = new Date();
  return (
    <Panel title="Activity" description="Each Line run on one row: how it ended, what it changed, the generation and the Capture it landed.">
      {cursors.map((cursor) => (
        <PageLoader key={cursor ?? "first"} cursor={cursor} onLoaded={onLoaded} first={cursor === undefined} />
      ))}
      <FamilyLegend seen={families} />
      <div aria-label="Activity" role="feed">
        {pages[""] && rows.length === 0 && <EmptyState>None</EmptyState>}
        <ol className="divide-y divide-zinc-800/60">
          {visible.map((row, i) => {
            const at = row.kind === "run" ? row.at : row.row.at;
            const before = i > 0 ? visible[i - 1]! : null;
            const beforeAt = before ? (before.kind === "run" ? before.at : before.row.at) : null;
            return (
              <li key={row.key}>
                {(beforeAt === null || dayOf(at) !== dayOf(beforeAt)) && <DayMark at={at} now={now} />}
                {row.kind === "run" ? <RunLine row={row} label={label} now={now} /> : <EventLine row={row.row} now={now} />}
              </li>
            );
          })}
        </ol>
        {loading && cursors.length > 1 && <LoadState />}
        {more && !loading && (
          <button type="button" onClick={older} className="mt-2 text-[12px] text-zinc-400 hover:text-zinc-200">
            Show older activity
          </button>
        )}
      </div>
    </Panel>
  );
}

/** Reads one activity page and hands it up; renders only its loading or refusal state. */
function PageLoader({ cursor, first, onLoaded }: { cursor: string | undefined; first: boolean; onLoaded: (key: string, loaded: Loaded) => void }) {
  const page = useActivity(cursor);
  const data = page.data;
  useEffect(() => {
    if (data) onLoaded(cursor ?? "", { events: data.activity ?? [], next: data.next_cursor ?? null });
  }, [data, cursor, onLoaded]);
  if (first && page.isPending) return <LoadState />;
  if (page.error) {
    // A daemon older than the feed refuses the section as an invalid request: say so plainly.
    if (page.error instanceof ApiError && page.error.errorCode === "request.invalid" && JSON.stringify(page.error.envelope).includes("query.section"))
      return <EmptyState>Needs core 0.5</EmptyState>;
    return <LoadState error={page.error} />;
  }
  return null;
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

const hover = "hover:text-white hover:underline underline-offset-2";
const Sep = () => <span className="text-zinc-600">·</span>;

/** `epss-triage · succeeded · 30 changes · g10 · CAP-9bdf…`, each part linked. */
function RunLine({ row, label, now }: { row: RunRow; label: (line: string) => string; now: Date }) {
  const instanceId = useInstanceId();
  const at = useAtLink();
  const status = row.status === "running" ? null : term("run", row.status);
  const capture = row.captures[0];
  return (
    <div className="flex items-baseline gap-2.5 py-1.5 text-[13px]">
      <Square family="run" />
      <div className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-1.5">
        {status?.signal && <SignalDot signal={status.signal} title={status.meaning} />}
        {row.line ? (
          <Link to={at(`/i/${instanceId}/lines/${encodeURIComponent(row.line)}`)} className={`font-mono text-[12px] text-zinc-100 ${hover}`} title={row.line}>
            {label(row.line)}
          </Link>
        ) : row.procedure ? (
          <RefLink value={row.procedure} className="font-mono text-[12px] text-zinc-100">
            {row.procedure.replace(/^Procedure:/, "")}
          </RefLink>
        ) : null}
        <Sep />
        <Link
          to={at(`/i/${instanceId}/runs/${encodeURIComponent(row.run)}`)}
          className={`text-zinc-300 ${hover}`}
          title={`${shortRun(row.run)}${status ? ` · ${status.meaning}` : ""}${row.elapsedUs != null ? ` · ${formatDuration(row.elapsedUs)}` : ""}`}
        >
          {status ? status.word.toLowerCase() : "running"}
        </Link>
        {row.generation && (
          <>
            <Sep />
            <span className="text-zinc-400">
              {row.generation.members} {row.generation.members === 1 ? "change" : "changes"}
            </span>
            <Sep />
            <Link to={withAt(`/i/${instanceId}`, String(row.generation.sequence))} className={`font-mono text-[12px] text-zinc-300 ${hover}`} title="Open the instance at this generation">
              g{row.generation.sequence}
            </Link>
          </>
        )}
        {capture && (
          <>
            <Sep />
            {capture.ref ? (
              <RefLink value={capture.ref} className="font-mono text-[12px] text-zinc-400">
                <span title={`${capture.capture ?? capture.ref}${capture.source ? ` from ${capture.source}` : ""}`}>{shortCapture(capture.capture ?? "Capture")}</span>
              </RefLink>
            ) : (
              <span className="font-mono text-[12px] text-zinc-400">{shortCapture(capture.capture ?? "Capture")}</span>
            )}
            {row.captures.length > 1 && <span className="text-[12px] text-zinc-500">+{row.captures.length - 1}</span>}
          </>
        )}
        {row.unavailable && <span className="text-[12px] text-zinc-500">(record unavailable)</span>}
      </div>
      <Time at={row.at} now={now} />
    </div>
  );
}

function EventLine({ row, now }: { row: ActivityRow; now: Date }) {
  return (
    <div className="flex items-baseline gap-2.5 py-1.5 text-[13px]">
      <Square family={row.family} />
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
        {row.detail && (
          <div className="truncate text-[12px] text-zinc-500" title={row.detail}>
            {row.detail}
          </div>
        )}
      </div>
      <Time at={row.at} now={now} />
    </div>
  );
}

function Time({ at, now }: { at: string; now: Date }) {
  return (
    <time dateTime={at} title={formatDateTime(at)} className="shrink-0 text-[12px] text-zinc-500">
      {formatRelative(at, now)}
    </time>
  );
}

function Square({ family }: { family: ActivityFamily }) {
  return <span className="relative top-[1px] h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: FAMILY[family].color }} title={FAMILY[family].legend} aria-hidden />;
}

function Target({ link, className, children }: { link: ActivityLink; className: string; children: ReactNode }) {
  const instanceId = useInstanceId();
  const at = useAtLink();
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
        <Link to={withAt(`/i/${instanceId}`, String(link.sequence))} className={`${className} ${hover}`} title="Open the instance pinned at this generation">
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
function FamilyLegend({ seen }: { seen: ActivityFamily[] }) {
  const order: ActivityFamily[] = ["generation", "run", "capture", "inbox", "occurrence", "line", "erasure", "gap"];
  const shown = order.filter((f) => seen.includes(f));
  if (shown.length === 0) return null;
  return (
    <div className="-mt-1 mb-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-zinc-500">
      {shown.map((f) => (
        <span key={f} className="inline-flex items-center gap-1 whitespace-nowrap">
          <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: FAMILY[f].color }} aria-hidden />
          {FAMILY[f].legend}
        </span>
      ))}
    </div>
  );
}
