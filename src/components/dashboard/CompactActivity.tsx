import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useActivity, useInstanceId } from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import type { OrientActivity } from "@/api/schemas";
import { SignalDot } from "@/components/Chip";
import { HeaderLabel } from "@/components/ChangeLog";
import { DataTable, type Column } from "@/components/DataTable";
import { GenerationAuthor, GenerationCell, GenerationDescription } from "@/components/GenerationCells";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { FAMILY, formatDuration, shortRun, type ActivityFamily, type ActivityLink, type ActivityRow } from "@/lib/activity";
import { useAtLink, withAt } from "@/lib/at";
import { compactRows, shortCapture, type CompactRow, type RunRow } from "@/lib/dashboard-activity";
import { formatDateTime, formatRelative, sentence } from "@/lib/text";
import { term } from "@/lib/vocabulary";

/** Rows shown at first, and added by each "Show older". */
export const ACTIVITY_ROWS = 12;

interface Loaded {
  events: OrientActivity[];
  next: string | null;
}

const familyOf = (row: CompactRow): ActivityFamily => (row.kind === "run" ? "run" : row.kind === "generation" ? "generation" : row.row.family);
const atOf = (row: CompactRow) => (row.kind === "event" ? row.row.at : row.at);
const sequenceOf = (row: CompactRow) => (row.kind === "generation" ? row.generation.sequence : row.kind === "run" ? (row.generation?.sequence ?? null) : null);
const membersOf = (row: CompactRow) => (row.kind === "generation" ? (row.generation.members ?? 0) : row.kind === "run" ? (row.generation?.members ?? null) : null);
const dash = <span className="text-zinc-600">—</span>;

/**
 * What happened, newest first, in the Ledger's columns (generation, when,
 * author, description as written, changes): one row per Line run (its start,
 * the Captures it landed and the generation it was accepted as, folded), one
 * per generation no loaded run produced, one per other event. Shows
 * ACTIVITY_ROWS at a time; older rows come from the pages already read, then
 * from the next activity page.
 */
export function CompactActivity({ label }: { label: (line: string) => string }) {
  const [cursors, setCursors] = useState<(string | undefined)[]>([undefined]);
  const [pages, setPages] = useState<Record<string, Loaded>>({});
  const [failed, setFailed] = useState(false);
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
  const families = [...new Set(visible.map(familyOf))];
  const columns = useMemo<Column<CompactRow>[]>(
    () => [
      { id: "family", header: "", label: "Kind", className: "w-2 pr-0", cell: (row) => <Square family={familyOf(row)} /> },
      {
        id: "generation",
        header: "Generation",
        className: "whitespace-nowrap",
        cell: (row) => {
          const sequence = sequenceOf(row);
          return sequence === null ? dash : <GenerationCell sequence={sequence} />;
        },
      },
      { id: "when", header: "When", className: "whitespace-nowrap", cell: (row) => <Time at={atOf(row)} /> },
      { id: "author", header: "Author", title: "A run's Line, a direct run's Procedure, or the proposer; then the approvers", cell: (row) => <Author row={row} label={label} /> },
      { id: "description", header: "Description", title: "The proposal's own words, or what happened", cell: (row) => <Description row={row} /> },
      {
        id: "changes",
        header: "Changes",
        numeric: true,
        className: "text-zinc-300",
        cell: (row) => membersOf(row) ?? dash,
      },
    ],
    [label],
  );
  return (
    <Panel title="Activity" description="Newest first. A Line run's landings and accepted generation share its row.">
      {cursors.map((cursor) => (
        <PageLoader key={cursor ?? "first"} cursor={cursor} onLoaded={onLoaded} onFailed={cursor === undefined ? setFailed : undefined} first={cursor === undefined} />
      ))}
      {/* the colors say what kind of thing happened; with one kind on screen there is nothing to tell apart */}
      {families.length > 1 && <FamilyLegend seen={families} />}
      {pages[""] && rows.length === 0 && !failed && <EmptyState>None</EmptyState>}
      {visible.length > 0 && <DataTable rows={visible} columns={columns} rowKey={(row) => row.key} label="Activity" urlKey="activity" toolbar={false} maxHeight="none" />}
      {loading && cursors.length > 1 && <LoadState />}
      {more && !loading && (
        <button type="button" onClick={older} className="mt-2 text-[12px] text-zinc-400 hover:text-zinc-200">
          Show older activity
        </button>
      )}
    </Panel>
  );
}

/** Reads one activity page and hands it up; renders only its loading or refusal state. */
function PageLoader({
  cursor,
  first,
  onLoaded,
  onFailed,
}: {
  cursor: string | undefined;
  first: boolean;
  onLoaded: (key: string, loaded: Loaded) => void;
  /** Told whether the read's latest attempt failed, so a failed refresh never shows the empty state. */
  onFailed?: ((failed: boolean) => void) | undefined;
}) {
  const page = useActivity(cursor);
  const data = page.data;
  useEffect(() => {
    if (data) onLoaded(cursor ?? "", { events: data.activity ?? [], next: data.next_cursor ?? null });
  }, [data, cursor, onLoaded]);
  const failed = page.error !== null;
  useEffect(() => onFailed?.(failed), [failed, onFailed]);
  if (first && page.isPending) return <LoadState />;
  if (page.error) {
    // A daemon older than the feed refuses the section as an invalid request: say so plainly.
    if (page.error instanceof ApiError && page.error.errorCode === "request.invalid" && JSON.stringify(page.error.envelope).includes("query.section"))
      return <EmptyState>Needs core 0.5</EmptyState>;
    return <LoadState error={page.error} />;
  }
  return null;
}

const hover = "hover:text-white hover:underline underline-offset-2";

function Time({ at }: { at: string }) {
  return (
    <time dateTime={at} title={formatDateTime(at)} className="text-[12px] text-zinc-500">
      {formatRelative(at)}
    </time>
  );
}

/**
 * A run's Line (or a direct run's Procedure), as the Ledger's Author column
 * names it (the run itself opens from its outcome); an event's Line; a
 * generation's author.
 */
function Author({ row, label }: { row: CompactRow; label: (line: string) => string }) {
  const instanceId = useInstanceId();
  const at = useAtLink();
  if (row.kind === "generation") return <GenerationAuthor row={row.generation} />;
  if (row.kind === "event") {
    const who = row.row.who;
    if (!who) return dash;
    return (
      <span className="inline-flex flex-wrap items-baseline gap-x-3 text-zinc-400">
        {who.link.kind === "line" && <HeaderLabel>Line</HeaderLabel>}
        <Target link={who.link} className="whitespace-nowrap font-mono text-[12px] text-zinc-200">
          {who.text}
        </Target>
      </span>
    );
  }
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-3 text-zinc-400">
      {row.line ? (
        <>
          <HeaderLabel>Line</HeaderLabel>
          <Link to={at(`/i/${instanceId}/lines/${encodeURIComponent(row.line)}`)} className={`whitespace-nowrap font-mono text-[12px] text-zinc-200 ${hover}`} title={row.line}>
            {label(row.line)}
          </Link>
        </>
      ) : row.procedure ? (
        <>
          <HeaderLabel>Procedure</HeaderLabel>
          <RefLink value={row.procedure} className="whitespace-nowrap font-mono text-[12px] text-zinc-200">
            {row.procedure.replace(/^Procedure:/, "")}
          </RefLink>
        </>
      ) : null}
    </span>
  );
}

/** A generation's own words; a run's outcome and the Capture it landed; an event's phrase and detail. */
function Description({ row }: { row: CompactRow }) {
  if (row.kind === "generation") return <GenerationDescription text={row.generation.because} truncated={row.generation.because_truncated ?? false} />;
  if (row.kind === "run") return <RunOutcome row={row} />;
  return <EventWords row={row.row} />;
}

function RunOutcome({ row }: { row: RunRow }) {
  const instanceId = useInstanceId();
  const at = useAtLink();
  const status = row.status === "running" ? null : term("run", row.status);
  const capture = row.captures[0];
  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-1.5 text-[13px]">
      {status?.signal && <SignalDot signal={status.signal} title={status.meaning} />}
      <Link
        to={at(`/i/${instanceId}/runs/${encodeURIComponent(row.run)}`)}
        className={`text-zinc-200 ${hover}`}
        title={`${shortRun(row.run)}${status ? ` · ${status.meaning}` : ""}${row.elapsedUs != null ? ` · ${formatDuration(row.elapsedUs)}` : ""}`}
      >
        {status ? status.word : "Running"}
      </Link>
      {capture && (
        <>
          <span className="text-zinc-600">·</span>
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
    </span>
  );
}

function EventWords({ row }: { row: ActivityRow }) {
  return (
    <div className="min-w-0 text-[13px]">
      <div className="flex flex-wrap items-baseline gap-x-1.5">
        {row.signal && <SignalDot signal={row.signal} title={row.signal === "wrong" ? "Wrong or blocked" : "Waiting on you"} />}
        <span className="text-zinc-300">{sentence(row.what)}</span>
        {row.object && (
          <Target link={row.object.link} className="font-mono text-[12px] text-zinc-400">
            <span className="inline-block max-w-[8rem] truncate align-bottom" title={row.object.text}>
              {row.object.text}
            </span>
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
  );
}

function Square({ family }: { family: ActivityFamily }) {
  return <span className="relative top-[1px] inline-block h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: FAMILY[family].color }} title={FAMILY[family].legend} aria-hidden />;
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
