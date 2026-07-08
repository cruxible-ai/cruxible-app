import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useEntitiesForTypes, useInstanceId, useStats } from "@/api/hooks";
import { entityPath } from "@/components/EntityLink";
import { isEntityRef } from "@/api/items";
import { humanize } from "@/lib/text";

const PER_TYPE_LIMIT = 300;
const MAX_RESULTS = 20;

interface Candidate {
  entityType: string;
  entityId: string;
  title: string;
}

/**
 * Cmd-K jump-to-entity. An orientation tool, not a query surface: it matches
 * id and title/name over the per-type list reads (the same unreceipted lists
 * the browse pages use) and navigates — it never answers questions. Fetches
 * lazily on first open; instances larger than the per-type cap still match on
 * whatever the capped lists carry.
 */
export function JumpPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const instanceId = useInstanceId();
  const stats = useStats();

  const types = Object.keys(stats.data?.entity_counts ?? {});
  const results = useEntitiesForTypes(types, PER_TYPE_LIMIT, open);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
        setCursor(0);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpenEvent() {
      setOpen(true);
      setQuery("");
      setCursor(0);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("cruxible:jump", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("cruxible:jump", onOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const candidates = useMemo(() => {
    const all: Candidate[] = [];
    for (const r of results) {
      const items = ((r.data as { items?: unknown[] } | undefined)?.items ?? []).filter(
        isEntityRef,
      );
      for (const e of items) {
        all.push({
          entityType: e.entity_type,
          entityId: e.entity_id,
          title:
            typeof e.properties?.title === "string"
              ? e.properties.title
              : typeof e.properties?.name === "string"
                ? e.properties.name
                : e.entity_id,
        });
      }
    }
    return all;
  }, [results]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const scored = candidates
      .map((c) => {
        const id = c.entityId.toLowerCase();
        const title = c.title.toLowerCase();
        const score = id.startsWith(q)
          ? 0
          : title.startsWith(q)
            ? 1
            : id.includes(q)
              ? 2
              : title.includes(q)
                ? 3
                : -1;
        return { c, score };
      })
      .filter((s) => s.score >= 0)
      .sort((a, b) => a.score - b.score || a.c.entityId.localeCompare(b.c.entityId));
    return scored.slice(0, MAX_RESULTS).map((s) => s.c);
  }, [candidates, query]);

  const loading = open && results.some((r) => r.isPending);

  function go(c: Candidate) {
    setOpen(false);
    navigate(entityPath(instanceId, c.entityType, c.entityId));
  }

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/60 pt-[18vh]"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-[34rem] max-w-[90vw] overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(c + 1, matches.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(c - 1, 0));
              } else if (e.key === "Enter" && matches[cursor]) {
                go(matches[cursor]);
              }
            }}
            placeholder="Jump to entity by id or title…"
            className="w-full bg-transparent text-[14px] text-zinc-100 placeholder-zinc-600 outline-none"
          />
          <kbd className="rounded border border-zinc-700 px-1 text-[10px] text-zinc-500">esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="px-3 py-2 text-[13px] text-zinc-500">Loading entities…</div>
          )}
          {!loading && query.trim() !== "" && matches.length === 0 && (
            <div className="px-3 py-2 text-[13px] text-zinc-500">No matches.</div>
          )}
          {matches.map((c, i) => (
            <button
              key={`${c.entityType}:${c.entityId}`}
              onClick={() => go(c)}
              onMouseEnter={() => setCursor(i)}
              className={`flex w-full items-baseline gap-2 px-3 py-1.5 text-left ${
                i === cursor ? "bg-zinc-800" : ""
              }`}
            >
              <span className="w-24 shrink-0 truncate text-[10px] uppercase tracking-wide text-zinc-500">
                {humanize(c.entityType)}
              </span>
              <span className="truncate text-[14px] text-zinc-200">{c.title}</span>
              <span className="ml-auto shrink-0 font-mono text-[12px] text-zinc-500">
                {c.entityId}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
