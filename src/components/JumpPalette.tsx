import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import {
  useCard,
  useClaimTypes,
  useInstanceId,
  useLines,
  useOrientKind,
  useOrientKinds,
} from "@/api/hooks";
import { ApiError } from "@/api/data-source";
import { useAtLink } from "@/lib/at";
import { formatRef, parseRef, refKindLabel, refRoute } from "@/lib/cruxible-ref";

const MAX_RESULTS = 20;
const RESOLVE_DELAY_MS = 250;

interface Candidate {
  /** What Enter does: open a route, or complete the input. */
  action: { route: string } | { complete: string };
  label: string;
  hint: string;
}

/** `kind/partial-id` -> the kind, when the text has that shape. */
function kindPrefix(text: string): { kind: string; partial: string } | null {
  const slash = text.indexOf("/");
  if (slash <= 0 || text.includes(":")) return null;
  return { kind: text.slice(0, slash), partial: text.slice(slash + 1) };
}

/**
 * Cmd-K jump to any reference. Typing a ref resolves it through one get-batch
 * read (suggestions off, so a miss costs an index probe, not a ranking of
 * every Subject). Completions come from what orient already serves: Subject
 * kinds, a kind's sample ids, ClaimTypes after `ClaimType:`, Lines after
 * `Line:`. It navigates; it never searches values (no query scan).
 */
export function JumpPalette() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [settled, setSettled] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const instanceId = useInstanceId();
  const link = useAtLink();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setText("");
        setCursor(0);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    function onOpenEvent() {
      setOpen(true);
      setText("");
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

  // Resolve only once typing pauses: one read per settled ref, not per key.
  useEffect(() => {
    const timer = window.setTimeout(() => setSettled(text.trim()), RESOLVE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [text]);

  const query = text.trim();
  const parsed = open ? parseRef(settled) : null;
  const resolved = useCard(parsed && parsed.kind !== "inbox" ? formatRef(parsed) : null);
  const kinds = useOrientKinds();
  const prefix = open ? kindPrefix(query) : null;
  const knownKind = prefix && (kinds.data?.kinds ?? []).some((k) => k.kind === prefix.kind) ? prefix.kind : null;
  const kindDetail = useOrientKind(knownKind);
  const claimTypes = useClaimTypes(open && query.startsWith("ClaimType:"));
  const lines = useLines(open && query.startsWith("Line:"));

  const candidates = useMemo((): Candidate[] => {
    if (!query) return [];
    const out: Candidate[] = [];
    const lower = query.toLowerCase();
    if (!query.includes("/") && !query.includes(":")) {
      for (const kind of kinds.data?.kinds ?? []) {
        if (!kind.kind.toLowerCase().includes(lower)) continue;
        out.push({ action: { complete: `${kind.kind}/` }, label: `${kind.kind}/`, hint: `${kind.subjects} Subjects · Tab` });
        out.push({
          action: { route: `/i/${instanceId}/kinds/${encodeURIComponent(kind.kind)}` },
          label: kind.kind,
          hint: "kind page",
        });
      }
    }
    if (knownKind && prefix) {
      for (const id of kindDetail.data?.kind_detail?.sample_subject_ids ?? []) {
        if (!id.startsWith(prefix.partial)) continue;
        const ref = parseRef(`${knownKind}/${id}`);
        const route = ref ? refRoute(instanceId, ref) : null;
        if (route) out.push({ action: { route }, label: `${knownKind}/${id}`, hint: "sample Subject" });
      }
    }
    if (query.startsWith("ClaimType:")) {
      const partial = query.slice("ClaimType:".length);
      for (const row of claimTypes.data?.rows ?? []) {
        if (!row.predicate.includes(partial)) continue;
        out.push({
          action: { route: `/i/${instanceId}/claim-types/${encodeURIComponent(row.predicate)}` },
          label: `ClaimType:${row.predicate}`,
          hint: `${row.cardinality} · ${row.type}`,
        });
      }
    }
    if (query.startsWith("Line:")) {
      const partial = query.slice("Line:".length);
      for (const row of lines.data?.rows ?? []) {
        if (!row.line.includes(partial)) continue;
        out.push({ action: { route: `/i/${instanceId}/ref/${encodeURIComponent(`Line:${row.line}`)}` }, label: `Line:${row.line}`, hint: `${row.authority} · ${row.procedure}` });
      }
    }
    return out.slice(0, MAX_RESULTS);
  }, [query, kinds.data, knownKind, prefix, kindDetail.data, claimTypes.data, lines.data, instanceId]);

  const exact = parsed && settled === query ? parsed : null;
  const exactRoute = exact ? refRoute(instanceId, exact) : null;
  const items: Candidate[] = [
    ...(exact && exactRoute && resolved.data
      ? [{ action: { route: exactRoute }, label: formatRef(exact), hint: `${refKindLabel(exact)} · resolved` }]
      : []),
    ...candidates.filter((c) => !(exact && c.label === formatRef(exact))),
  ];

  function choose(item: Candidate) {
    if ("complete" in item.action) {
      setText(item.action.complete);
      setCursor(0);
      inputRef.current?.focus();
      return;
    }
    setOpen(false);
    navigate(link(item.action.route));
  }

  if (!open) return null;
  const refusal =
    exact && resolved.error
      ? resolved.error instanceof ApiError && resolved.error.errorCode === "cruxible.get.ref_not_found"
        ? `No accepted ${exact.kind === "subject" ? "Subject" : refKindLabel(exact)} ${formatRef(exact)} at this generation.`
        : resolved.error.message
      : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/60 pt-[18vh]"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-label="Jump to reference"
        className="w-[36rem] max-w-[90vw] overflow-hidden border border-zinc-700 bg-zinc-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-zinc-500" />
          <input
            ref={inputRef}
            value={text}
            aria-label="Reference"
            onChange={(e) => {
              setText(e.target.value);
              setCursor(0);
            }}
            onKeyDown={(e) => {
              const item = items[cursor];
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(c + 1, items.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(c - 1, 0));
              } else if (e.key === "Tab" && item && "complete" in item.action) {
                e.preventDefault();
                choose(item);
              } else if (e.key === "Enter" && item) {
                choose(item);
              }
            }}
            placeholder="kind/id, CLM-…, CAP-…, Line:…, ClaimType:…"
            className="w-full bg-transparent font-mono text-[14px] text-zinc-100 placeholder-zinc-600 outline-none"
          />
          <kbd className="border border-zinc-700 px-1 text-[10px] text-zinc-500">esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {exact && resolved.isPending && settled !== "" && (
            <div className="px-3 py-2 text-[13px] text-zinc-500">Resolving {formatRef(exact)}…</div>
          )}
          {refusal && <div className="px-3 py-2 text-[13px] text-amber-400/90">{refusal}</div>}
          {query !== "" && items.length === 0 && !refusal && !(exact && resolved.isPending) && (
            <div className="px-3 py-2 text-[13px] text-zinc-500">No matching kind or reference.</div>
          )}
          {items.map((item, i) => (
            <button
              key={`${item.label}\n${item.hint}`}
              onClick={() => choose(item)}
              onMouseEnter={() => setCursor(i)}
              className={`flex w-full items-baseline gap-2 px-3 py-1.5 text-left ${i === cursor ? "bg-zinc-800" : ""}`}
            >
              <span className="truncate font-mono text-[13px] text-zinc-200">{item.label}</span>
              <span className="ml-auto shrink-0 text-[12px] text-zinc-500">{item.hint}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
