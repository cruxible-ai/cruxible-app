import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { History, TriangleAlert } from "lucide-react";
import { useHead, usePin } from "@/api/hooks";
import { AT_PARAM, isOutsideRetention, parseAt, RETAINED_GENERATIONS, useRawAtParam } from "@/lib/at";

/**
 * Which accepted generation the console reads. Unpinned, every read follows
 * the head (polled); pinned with ?at=, every read on every page carries that
 * generation's coordinate until "Back to head".
 */
export function AtPicker() {
  const [params, setParams] = useSearchParams();
  const raw = useRawAtParam();
  const pin = usePin();
  const head = useHead(null);
  const [draft, setDraft] = useState("");
  const [draftError, setDraftError] = useState<string | null>(null);

  const headGeneration = head.data?.generation;
  const pinned = pin.at !== null;
  const outside =
    pinned && pin.generation !== undefined && headGeneration !== undefined
      ? isOutsideRetention(pin.generation, headGeneration)
      : false;

  function setAt(value: string | null) {
    const next = new URLSearchParams(params);
    if (value === null) next.delete(AT_PARAM);
    else next.set(AT_PARAM, value);
    setParams(next);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = parseAt(draft);
    if (!value) {
      setDraftError("A generation number, or 12+ hex of a git oid");
      return;
    }
    if (
      value.kind === "generation" &&
      headGeneration !== undefined &&
      isOutsideRetention(value.generation, headGeneration) &&
      !window.confirm(
        `Generation ${value.generation} is older than the last ${RETAINED_GENERATIONS} the daemon ` +
          "keeps ready; binding it rebuilds that generation's projection (slow). Continue?",
      )
    ) {
      return;
    }
    setDraftError(null);
    setDraft("");
    setAt(value.raw);
  }

  return (
    <div className="mb-3 border border-zinc-800 px-2 py-1.5 text-[12px]" aria-label="Generation">
      <div className="flex items-center gap-1.5 text-zinc-400">
        <History className="h-3.5 w-3.5 shrink-0" />
        {pin.head.error ? (
          <span className="text-red-400">at {pin.at} refused</span>
        ) : pin.generation === undefined ? (
          <span className="animate-pulse text-zinc-600">Resolving…</span>
        ) : (
          <span>
            Generation <span className="font-mono text-zinc-200">{pin.generation}</span>
            {pinned ? (
              headGeneration !== undefined && (
                <span className="text-amber-400/90"> · pinned (head {headGeneration})</span>
              )
            ) : (
              <span className="text-zinc-600"> · head</span>
            )}
          </span>
        )}
      </div>
      {pin.coordinate && (
        <div className="mt-0.5 truncate font-mono text-[11px] text-zinc-600" title={pin.coordinate.git_oid}>
          {pin.coordinate.git_oid.slice(0, 12)}
        </div>
      )}
      {pin.head.error && <div className="mt-1 text-red-400/80">{pin.head.error.message}</div>}
      {raw !== null && parseAt(raw) === null && (
        <div className="mt-1 text-amber-400/90">Ignoring malformed at={raw}</div>
      )}
      {outside && (
        <div className="mt-1 flex items-start gap-1 text-amber-400/90">
          <TriangleAlert className="mt-px h-3 w-3 shrink-0" />
          Older than the {RETAINED_GENERATIONS} retained generations: reads rebuild its projection.
        </div>
      )}
      <form onSubmit={submit} className="mt-1.5 flex gap-1">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="at generation…"
          aria-label="Pin generation"
          className="min-w-0 flex-1 border border-zinc-800 bg-zinc-950 px-1.5 py-0.5 font-mono text-[12px] text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
        />
        {pinned && (
          <button
            type="button"
            onClick={() => setAt(null)}
            className="border border-zinc-800 px-1.5 text-zinc-300 hover:border-zinc-600"
          >
            Back to head
          </button>
        )}
      </form>
      {draftError && <div className="mt-1 text-red-400/80">{draftError}</div>}
    </div>
  );
}
