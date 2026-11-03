import { useId, useState, type ReactNode } from "react";

/**
 * A small ⓘ that explains a Cruxible concept or a note in words, on hover or
 * click, so labels and tables stay terse. The text is the only prose a row
 * or a node carries, and it stays out of the way until asked for.
 */
export function InfoButton({ children, label = "What this means" }: { children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className="relative inline-flex align-baseline" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={(event) => {
          event.stopPropagation();
          setOpen((v) => !v);
        }}
        className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-zinc-600 text-[9px] leading-none text-zinc-400 hover:border-zinc-400 hover:text-zinc-200"
      >
        i
      </button>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute left-0 top-5 z-50 w-72 border border-zinc-700 bg-zinc-900 px-2.5 py-2 text-[12px] font-normal normal-case leading-5 tracking-normal text-zinc-300 shadow-lg"
        >
          {children}
        </span>
      )}
    </span>
  );
}
