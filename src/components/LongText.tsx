import { useLayoutEffect, useRef, useState } from "react";

/**
 * Prose that may run long (rationale, reasons, text-valued Claims): clamped
 * to `lines` with a "Show all" toggle when it overflows, and kept to a
 * readable measure. Nothing is cut; the toggle shows the whole text.
 */
export function LongText({
  text,
  lines = 3,
  className = "text-zinc-300",
}: {
  text: string;
  lines?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && !open) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [text, lines, open]);
  return (
    <div className="measure">
      <div
        ref={ref}
        className={`whitespace-pre-wrap break-words ${className}`}
        style={open ? undefined : { display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: lines, overflow: "hidden" }}
      >
        {text}
      </div>
      {(overflows || open) && (
        <button onClick={() => setOpen((v) => !v)} className="t-meta mt-0.5 hover:text-zinc-200">
          {open ? "Show less" : "Show all"}
        </button>
      )}
    </div>
  );
}
