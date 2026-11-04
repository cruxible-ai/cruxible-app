import { useCallback, useLayoutEffect, useRef, useState, type FocusEvent, type MouseEvent, type ReactNode } from "react";
import { useHref, useLinkClickHandler } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import { useAtLink } from "@/lib/at";

/**
 * Shared parts of the Overview's charts: the container's measured width (so
 * one SVG unit is one pixel and text keeps its size), links inside SVG, and
 * the hover card every mark shows on hover and on keyboard focus.
 */

/** A container's width, measured; `fallback` until the first measure (and in tests). */
export function useWidth<T extends HTMLElement>(fallback = 960) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.clientWidth;
      if (w > 0) setWidth(Math.round(w));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/** An in-app path under the instance, keeping the page's `?at=`. */
export function useInstancePath(): (path: string) => string {
  const instanceId = useInstanceId();
  const link = useAtLink();
  return useCallback((path: string) => link(`/i/${instanceId}${path}`), [instanceId, link]);
}

/** One row of a hover card: a label and its value. */
export type TipRow = [label: string, value: ReactNode];

export interface TipContent {
  /** What the mark is ("Kind", "Source"), a quiet uppercase label. */
  kicker: string;
  title: ReactNode;
  rows: TipRow[];
}

interface Shown {
  x: number;
  y: number;
  content: TipContent;
}

/** Hover-card state for one chart; `bind` wires a mark to it (mouse and keyboard focus alike). */
export function useTip() {
  const [shown, setShown] = useState<Shown | null>(null);
  const hide = useCallback(() => setShown(null), []);
  const bind = useCallback(
    (content: TipContent, at: { x: number; y: number }) => ({
      onMouseEnter: (_: MouseEvent) => setShown({ ...at, content }),
      onMouseLeave: hide,
      onFocus: (_: FocusEvent) => setShown({ ...at, content }),
      onBlur: hide,
    }),
    [hide],
  );
  return { shown, bind };
}

const TIP_WIDTH = 248;

/** The hover card, placed beside (x, y) in the chart's own pixels, flipped to stay inside `width`. */
export function Tip({ shown, width }: { shown: Shown | null; width: number }) {
  if (!shown) return null;
  const left = shown.x + 14 + TIP_WIDTH > width ? Math.max(0, shown.x - 14 - TIP_WIDTH) : shown.x + 14;
  return (
    <div
      role="tooltip"
      className="pointer-events-none absolute z-20 border border-zinc-700 bg-zinc-900/95 px-3 py-2 shadow-lg shadow-black/40 backdrop-blur-sm"
      style={{ left, top: Math.max(0, shown.y - 12), width: TIP_WIDTH }}
    >
      <div className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-zinc-500">{shown.content.kicker}</div>
      <div className="mt-0.5 whitespace-pre-line break-words font-mono text-[13px] text-zinc-50">{shown.content.title}</div>
      {shown.content.rows.length > 0 && (
        <dl className="mt-1.5 grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-0.5 text-[12px] leading-[18px]">
          {shown.content.rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-zinc-500">{label}</dt>
              <dd className="min-w-0 break-words text-right font-mono text-zinc-200">{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

/** A link inside an SVG: a real anchor (keyboard, middle-click, copy link) routed in-app. */
export function SvgLink({
  to,
  label,
  children,
  className,
  ...events
}: {
  to: string;
  label: string;
  children: ReactNode;
  className?: string;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: () => void;
  onFocus?: (e: FocusEvent) => void;
  onBlur?: () => void;
}) {
  const href = useHref(to);
  const onClick = useLinkClickHandler<HTMLAnchorElement>(to);
  return (
    <a href={href} onClick={onClick} aria-label={label} className={`outline-none [&:focus-visible_.mark]:stroke-zinc-50 [&:focus-visible_.mark]:[stroke-width:2px] ${className ?? ""}`} {...events}>
      {children}
    </a>
  );
}

/** A legend swatch and its words. */
export function Swatch({ color, children, shape = "square", dashed = false }: { color: string; children: ReactNode; shape?: "square" | "dot" | "line"; dashed?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className={`inline-block ${shape === "dot" ? "h-2 w-2 rounded-full" : shape === "line" ? "h-0.5 w-3" : "h-2.5 w-2.5"} ${dashed ? "border border-dashed" : ""}`}
        style={dashed ? { borderColor: color } : { backgroundColor: color }}
      />
      {children}
    </span>
  );
}

/** The chart's legend row, under the chart. */
export function Legend({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-zinc-400">
      {label && <span className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-zinc-500">{label}</span>}
      {children}
    </div>
  );
}

/** A count with its noun, singular for one ("1 Claim", "3 Claims"). */
export const counted = (n: number | string, noun: string) => `${n} ${n === 1 || n === "1" ? noun : `${noun}s`}`;
