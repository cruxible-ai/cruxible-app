import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, History, TriangleAlert } from "lucide-react";
import { HELD_HEAD_KEY, useHead, useInstanceId, useOrient, usePin, useRecentGenerations, useRetention } from "@/api/hooks";
import type { Schemas } from "@/api/schemas";
import { SignalDot } from "@/components/Chip";
import { readProposalOrigin } from "@/components/ProposalChanges";
import { AT_PARAM, isOutsideRetention, parseAt, useAtLink, useRawAtParam } from "@/lib/at";
import { useSettings } from "@/lib/settings";
import { formatWhen } from "@/lib/text";
import { term } from "@/lib/vocabulary";

const HEAD_MEANING =
  "The head is the newest accepted generation. It moves only when a proposal is accepted; a proposal waiting for review does not move it.";

/** Rows the generation list shows (newest first). */
const RECENT = 12;

/**
 * Which accepted generation the console reads. By default every screen
 * follows the head: when a generation is accepted, reads move to it without
 * a reload. An explicit pin (?at=, from the list or a typed number) stops
 * that until "Back to head"; turning "Follow the head" off in Settings holds
 * an unpinned page on the head it first read and offers the newer one.
 * Beside the head, what is waiting to be accepted, so a reader knows why it
 * has not moved.
 */
export function AtPicker() {
  const [params, setParams] = useSearchParams();
  const raw = useRawAtParam();
  const pin = usePin();
  const latest = useHead(null);
  const { settings } = useSettings();
  const queryClient = useQueryClient();
  const instanceId = useInstanceId();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  const headGeneration = latest.data?.generation;
  const retention = useRetention();
  const pinned = pin.at !== null;
  const held = !pinned && !settings.followHead;
  const behind = held && pin.generation !== undefined && headGeneration !== undefined && headGeneration > pin.generation;
  const outside =
    pinned && pin.generation !== undefined && headGeneration !== undefined
      ? isOutsideRetention(pin.generation, headGeneration, retention)
      : false;

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (box.current && !box.current.contains(target) && !list.current?.contains(target)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function setAt(value: string | null) {
    const next = new URLSearchParams(params);
    if (value === null) next.delete(AT_PARAM);
    else next.set(AT_PARAM, value);
    setParams(next);
    setOpen(false);
  }

  /** Pin a generation, asking first when it is older than the retained window. */
  function pinGeneration(value: string) {
    const parsed = parseAt(value);
    if (
      parsed?.kind === "generation" &&
      headGeneration !== undefined &&
      isOutsideRetention(parsed.generation, headGeneration, retention) &&
      !window.confirm(
        `Generation ${parsed.generation} is older than the last ${retention} the daemon ` +
          "keeps ready; binding it rebuilds that generation's projection (slow). Continue?",
      )
    ) {
      return;
    }
    setAt(value);
  }

  const showHead = () => {
    if (pinned) setAt(null);
    else void queryClient.invalidateQueries({ queryKey: [...HELD_HEAD_KEY, instanceId] });
  };

  return (
    <div ref={box} className="relative mb-3 border border-zinc-800 px-2 py-1.5 text-[12px]" aria-label="Generation">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 text-left text-zinc-400 hover:text-zinc-200"
        title={HEAD_MEANING}
      >
        <History className="h-3.5 w-3.5 shrink-0" />
        {pin.head.error ? (
          <span className="text-red-400">At {pin.at} refused</span>
        ) : pin.generation === undefined ? (
          <span className="animate-pulse text-zinc-600">Resolving…</span>
        ) : (
          <span className="min-w-0 flex-1">
            Generation <span className="font-mono text-zinc-200">{pin.generation}</span>
            <span className="text-zinc-500"> · {pinned ? "pinned" : held ? "held" : "head"}</span>
          </span>
        )}
        <ChevronDown className="h-3.5 w-3.5 shrink-0" />
      </button>
      {pin.coordinate && (
        <div className="mt-0.5 truncate font-mono text-[11px] text-zinc-600" title={pin.coordinate.git_oid}>
          {pin.coordinate.git_oid.slice(0, 12)}
        </div>
      )}

      {(pinned || behind) && headGeneration !== undefined && (
        <div className="mt-1 flex items-baseline justify-between gap-2 text-zinc-400" title={HEAD_MEANING}>
          <span>{pinned ? `Head is ${headGeneration}` : `Generation ${headGeneration} accepted`}</span>
          <button type="button" onClick={showHead} className="border border-zinc-700 px-1.5 text-zinc-200 hover:border-zinc-500">
            {pinned ? "Back to head" : "Show it"}
          </button>
        </div>
      )}
      <PendingActivity />

      {pin.head.error && <div className="mt-1 text-red-400/80">{pin.head.error.message}</div>}
      {raw !== null && parseAt(raw) === null && <div className="mt-1 text-red-400/80">Ignoring malformed at={raw}</div>}
      {outside && (
        <div className="mt-1 flex items-start gap-1 text-zinc-400">
          <TriangleAlert className="mt-px h-3 w-3 shrink-0" />
          Older than the {retention} retained generations: reads rebuild its projection.
        </div>
      )}

      {open && (
        <GenerationList
          anchor={box}
          listRef={list}
          current={pinned ? (pin.generation ?? null) : null}
          head={headGeneration}
          onHead={() => (pinned ? setAt(null) : (showHead(), setOpen(false)))}
          onPin={pinGeneration}
        />
      )}
    </div>
  );
}

/** What is waiting to be accepted: why the head has not moved. */
function PendingActivity() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const orient = useOrient().data;
  const waiting = orient?.attention?.open_proposals ?? 0;
  const running = orient?.artifacts?.running ?? 0;
  if (waiting === 0 && running === 0) return null;
  return (
    <div className="mt-1 space-y-0.5 text-zinc-400">
      {waiting > 0 && (
        <Link
          to={link(`/i/${instanceId}/proposals?status=open`)}
          className="flex items-baseline gap-1.5 hover:text-zinc-200"
          title={`${term("proposal", "open").meaning}. The head moves when it is accepted.`}
        >
          <SignalDot signal="waiting" title={term("proposal", "open").meaning} />
          {waiting} {waiting === 1 ? "proposal" : "proposals"} {term("proposal", "open").word.toLowerCase()}
        </Link>
      )}
      {running > 0 && (
        <div title="Runs not finished yet; a run that proposes adds a proposal waiting for review">
          {running} {running === 1 ? "run" : "runs"} still {term("run", "running").word.toLowerCase()}
        </div>
      )}
    </div>
  );
}

type Generation = Schemas["OrientGeneration"];

/** The newest generations as of the head, the head first; typing a number or oid is the fallback. */
function GenerationList({
  anchor,
  listRef,
  current,
  head,
  onHead,
  onPin,
}: {
  anchor: RefObject<HTMLDivElement | null>;
  listRef: RefObject<HTMLDivElement | null>;
  current: number | null;
  head: number | undefined;
  onHead: () => void;
  onPin: (value: string) => void;
}) {
  const recent = useRecentGenerations(true);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState<string | null>(null);
  const rows = (recent.data?.generations ?? []).slice(0, RECENT);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = parseAt(draft);
    if (!value) {
      setError("A generation number, or 12+ hex of a git oid");
      return;
    }
    setError(null);
    onPin(value.raw);
  }

  // Rendered above every view (a portal), placed under the generation box, so the
  // sidebar's bounds and the active view never clip it.
  const [place, setPlace] = useState<{ top: number; left: number } | null>(null);
  useLayoutEffect(() => {
    const update = () => {
      const rect = anchor.current?.getBoundingClientRect();
      if (rect) setPlace({ top: rect.bottom + 4, left: rect.left });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [anchor]);

  return createPortal(
    <div
      ref={listRef}
      role="listbox"
      aria-label="Generations"
      style={place ? { top: place.top, left: place.left } : { visibility: "hidden" }}
      className="fixed z-50 w-[26rem] max-w-[calc(100vw-1rem)] border border-zinc-700 bg-zinc-950 shadow-2xl"
    >
      <button
        type="button"
        role="option"
        aria-selected={current === null}
        onClick={onHead}
        className="block w-full border-b border-zinc-800 px-2.5 py-1.5 text-left hover:bg-zinc-900"
        title={HEAD_MEANING}
      >
        <span className="text-zinc-100">Head</span>
        {head !== undefined && <span className="font-mono text-zinc-400"> · generation {head}</span>}
        <div className="text-[11px] text-zinc-500">Follows new generations</div>
      </button>
      <div className="max-h-80 overflow-y-auto">
        {recent.isPending && <div className="animate-pulse px-2.5 py-1.5 text-zinc-500">Reading the ledger…</div>}
        {recent.error && <div className="px-2.5 py-1.5 text-red-400/80">{recent.error.message}</div>}
        {rows.map((row) => (
          <GenerationOption key={row.sequence} row={row} selected={current === row.sequence} onPick={() => onPin(String(row.sequence))} />
        ))}
      </div>
      <form onSubmit={submit} className="flex gap-1 border-t border-zinc-800 p-1.5">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Older: generation or git oid"
          aria-label="Pin generation"
          className="min-w-0 flex-1 border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 font-mono text-[12px] text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
        />
        <button type="submit" className="border border-zinc-800 px-1.5 text-zinc-300 hover:border-zinc-600">
          Pin
        </button>
      </form>
      {error && <div className="px-2.5 pb-1.5 text-red-400/80">{error}</div>}
    </div>,
    document.body,
  );
}

function GenerationOption({ row, selected, onPick }: { row: Generation; selected: boolean; onPick: () => void }) {
  const origin = readProposalOrigin(row.because);
  const who = origin ? origin.procedure : (row.proposer ?? "—");
  const why = origin ? null : row.because;
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onPick}
      className={`block w-full px-2.5 py-1.5 text-left hover:bg-zinc-900 ${selected ? "bg-zinc-900" : ""}`}
    >
      <div className="flex items-baseline gap-2">
        <span className="w-10 shrink-0 font-mono text-zinc-100">g{row.sequence}</span>
        <span className="text-zinc-500" title={row.accepted_at}>
          {formatWhen(row.accepted_at)}
        </span>
        <span className="ml-auto text-zinc-500">
          {row.members} {row.members === 1 ? "change" : "changes"}
        </span>
      </div>
      <div className="truncate pl-12 text-zinc-400" title={row.because ?? undefined}>
        <span className="font-mono text-zinc-300">{who}</span>
        {why && <span> · {why}</span>}
      </div>
    </button>
  );
}
