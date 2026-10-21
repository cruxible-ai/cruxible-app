import { useId, useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * The one card style: a bordered block with a heading, an optional meta line
 * (counts, paging) on the right, and its body. `collapsible` turns the
 * heading into a disclosure; `summary` is what shows on the heading line
 * while it is closed, so a collapsed card still says what it holds.
 */
export function Panel({
  title,
  meta,
  children,
  collapsible = false,
  defaultOpen = true,
  summary,
}: {
  title: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  summary?: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  const shown = !collapsible || open;
  return (
    <section className="border border-zinc-800 bg-zinc-900/25 px-4 py-3">
      <header className={`flex items-baseline justify-between gap-3 ${shown ? "mb-2.5" : ""}`}>
        {collapsible ? (
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={bodyId}
            className="group flex min-w-0 items-baseline gap-1.5 text-left"
          >
            <span className="relative top-[2px] text-zinc-500 group-hover:text-zinc-200">
              {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </span>
            <h2 className="t-section">{title}</h2>
            {!open && summary && <span className="t-meta ml-2 truncate">{summary}</span>}
          </button>
        ) : (
          <h2 className="t-section">{title}</h2>
        )}
        {meta && <div className="t-meta shrink-0">{meta}</div>}
      </header>
      {shown && <div id={bodyId}>{children}</div>}
    </section>
  );
}

/**
 * Inline progressive disclosure inside a card: a quiet toggle line, then the
 * detail. Used for raw payloads, revisions, admission accounts and the like.
 */
export function Disclosure({
  label,
  children,
  defaultOpen = false,
  className = "",
}: {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  return (
    <div className={className}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="t-meta inline-flex items-center gap-1 hover:text-zinc-200"
      >
        {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
        {label}
      </button>
      {open && (
        <div id={bodyId} className="mt-1.5">
          {children}
        </div>
      )}
    </div>
  );
}

/** A labelled group inside a card (replaces all-caps micro headings). */
export function SubSection({ title, meta, children }: { title: ReactNode; meta?: ReactNode; children: ReactNode }) {
  return (
    <div className="mt-3 first:mt-0">
      <div className="mb-1 flex items-baseline gap-2">
        <h3 className="text-[12px] font-semibold text-zinc-300">{title}</h3>
        {meta && <span className="t-meta">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

/**
 * Standard empty-state line for content surfaces ("No items.",
 * "No relationships."). One phrasing style, one treatment.
 */
export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="py-2 text-[13px] text-zinc-500">{children}</div>;
}

export function LoadState({ error }: { error?: unknown }) {
  if (error) {
    const message = error instanceof Error ? error.message : String(error);
    return <div className="py-3 text-[14px] text-red-400">{message}</div>;
  }
  return <div className="py-3 text-[14px] text-zinc-500 animate-pulse">Loading…</div>;
}
