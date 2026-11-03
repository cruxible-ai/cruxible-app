import { useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const WIDTH = 288; // px, the tooltip's width
const GAP = 6;

/**
 * A small ⓘ that explains a Cruxible concept or a note in words, on hover or
 * click, so labels and tables stay terse. The tooltip renders in a portal at
 * a fixed position, so a table cell, a scrolling container or a no-wrap
 * header around the button never clips, widens or reflows.
 */
export function InfoButton({ children, label = "What this means" }: { children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);
  const [at, setAt] = useState<{ top: number; left: number } | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();
  useLayoutEffect(() => {
    if (!open || !button.current) return;
    const place = () => {
      const r = button.current!.getBoundingClientRect();
      const left = Math.max(8, Math.min(r.left, window.innerWidth - WIDTH - 8));
      setAt({ top: r.bottom + GAP, left });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open]);
  return (
    <span className="inline-flex align-baseline" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        ref={button}
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
      {open &&
        at &&
        createPortal(
          <span
            id={id}
            role="tooltip"
            style={{ position: "fixed", top: at.top, left: at.left, width: WIDTH }}
            className="pointer-events-none z-[1000] whitespace-normal border border-zinc-700 bg-zinc-900 px-2.5 py-2 text-left text-[12px] font-normal normal-case leading-5 tracking-normal text-zinc-300 shadow-lg"
          >
            {children}
          </span>,
          document.body,
        )}
    </span>
  );
}
