import type { ReactNode } from "react";

/**
 * The graph pages' header rows, one format across them: a find box, then
 * counts as white mono numbers with grey labels, and a legend row under it.
 */

export function Stat({ n, label }: { n: number | string; label: ReactNode }) {
  return (
    <span>
      <span className="font-mono text-zinc-200">{typeof n === "number" ? n.toLocaleString() : n}</span> {label}
    </span>
  );
}

export function StatsRow({ children, search }: { children: ReactNode; search?: ReactNode }) {
  return (
    <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1.5 text-[13px] text-zinc-500">
      {/* Left-aligned like everything else on the page: the find box leads the row. */}
      {search && <span className="flex items-baseline gap-2">{search}</span>}
      {children}
    </div>
  );
}

export function LegendRow({ children }: { children: ReactNode }) {
  return <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-zinc-400">{children}</div>;
}

/** A search box: Enter takes the first match; the match count sits beside it. */
export function SearchBox({
  value,
  onChange,
  onEnter,
  placeholder,
  label,
  matches,
}: {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder: string;
  label: string;
  /** Matches for the current query (null: no query yet). */
  matches: number | null;
}) {
  return (
    <>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onEnter?.();
          if (e.key === "Escape") onChange("");
        }}
        placeholder={placeholder}
        aria-label={label}
        className="w-56 border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[12px] text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
      />
      {matches !== null && (
        <span className="text-[12px] text-zinc-500">
          {matches} match{matches === 1 ? "" : "es"}
        </span>
      )}
    </>
  );
}
