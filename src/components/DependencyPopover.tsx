import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useInstanceId } from "@/api/hooks";
import { FieldList } from "@/components/FieldList";
import { useAtLink } from "@/lib/at";
import { parseRef, refRoute } from "@/lib/cruxible-ref";
import type { LineDependency } from "@/lib/line-dependencies";
import { shortName } from "@/lib/step-words";

const WIDTH = 300; // px
const GAP = 8;

/** Where a link was clicked (viewport px): the popover opens beside it. */
export interface PopoverAt {
  x: number;
  y: number;
}

/**
 * A small clickable popover in a portal at a fixed position (InfoButton's,
 * but it stays open to follow its links): closes on a click outside, on Esc
 * (before any page Esc handler), or on `onClose`.
 */
export function LinkPopover({ at, label, onClose, children }: { at: PopoverAt; label: string; onClose: () => void; children: ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [place, setPlace] = useState<{ top: number; left: number }>({ top: at.y + GAP, left: at.x + GAP });
  useLayoutEffect(() => {
    const height = box.current?.offsetHeight ?? 0;
    const left = Math.max(8, Math.min(at.x + GAP, window.innerWidth - WIDTH - 8));
    const top = at.y + GAP + height > window.innerHeight - 8 ? Math.max(8, at.y - GAP - height) : at.y + GAP;
    setPlace({ top, left });
  }, [at]);
  useEffect(() => {
    const onDown = (event: PointerEvent | MouseEvent) => {
      if (box.current && event.target instanceof Node && box.current.contains(event.target)) return;
      onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      onClose();
    };
    // Registered after the opening click has finished, so it doesn't close what it opened.
    const timer = window.setTimeout(() => document.addEventListener("pointerdown", onDown, true), 0);
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("keydown", onKey, true);
    };
  }, [onClose]);
  return createPortal(
    <div
      ref={box}
      role="dialog"
      aria-label={label}
      style={{ position: "fixed", top: place.top, left: place.left, width: WIDTH }}
      className="z-[1000] border border-zinc-700 bg-zinc-900 px-2.5 py-2 text-left text-[12px] leading-5 text-zinc-300 shadow-lg"
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </div>,
    document.body,
  );
}

/** A producer's name: its Line, or Entered directly. */
export const producerName = (producer: string | null) => producer ?? "Entered directly";

/**
 * What one dependency link carries, terse: per Query read, the Query (linked)
 * and the ClaimTypes and kinds it connects (linked; full names on hover).
 */
export function DependencyFields({ dependencies }: { dependencies: readonly LineDependency[] }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const route = (ref: string) => {
    const parsed = parseRef(ref);
    const to = parsed ? refRoute(instanceId, parsed) : null;
    return to ? link(to) : null;
  };
  const names = (refs: string[], prefix: string, title: string) => (
    <span className="flex flex-wrap gap-x-2">
      {refs.map((name) => {
        const to = route(`${prefix}:${name}`);
        return to ? (
          <Link key={name} to={to} title={`${title} ${name}`} className="font-mono text-zinc-200 hover:underline">
            {shortName(name)}
          </Link>
        ) : (
          <span key={name} title={`${title} ${name}`} className="font-mono text-zinc-200">
            {shortName(name)}
          </span>
        );
      })}
    </span>
  );
  // One group per Query (a read step may differ, the Query and what it connects read once).
  const groups = new Map<string, { query: string; claimTypes: Set<string>; kinds: Set<string> }>();
  for (const d of dependencies) {
    const group = groups.get(d.query) ?? { query: d.query, claimTypes: new Set<string>(), kinds: new Set<string>() };
    d.claimTypes.forEach((c) => group.claimTypes.add(c));
    d.kinds.forEach((k) => group.kinds.add(k));
    groups.set(d.query, group);
  }
  return (
    <div className="divide-y divide-zinc-800">
      {[...groups.values()].map((group) => {
        const queryTo = route(`QueryDefinition:${group.query}`);
        const claimTypes = [...group.claimTypes].sort();
        const kinds = [...group.kinds].sort();
        return (
          <FieldList
            key={group.query}
            density="compact"
            labels="words"
            label={`Query ${group.query}`}
            className="py-1.5 first:pt-0 last:pb-0"
            fields={[
              {
                key: "query",
                label: "Query",
                value: queryTo ? (
                  <Link to={queryTo} title={`Query ${group.query}`} className="font-mono text-zinc-200 hover:underline">
                    {shortName(group.query)}
                  </Link>
                ) : (
                  <span className="font-mono text-zinc-200">{shortName(group.query)}</span>
                ),
              },
              ...(claimTypes.length ? [{ key: "claim_types", label: "ClaimTypes", value: names(claimTypes, "ClaimType", "ClaimType") }] : []),
              ...(kinds.length ? [{ key: "kinds", label: "Kinds", value: names(kinds, "SubjectKind", "Subject kind") }] : []),
            ]}
          />
        );
      })}
    </div>
  );
}

/** The popover a dependency link opens: from → to, then what it carries. */
export function DependencyPopover({
  at,
  from,
  to,
  dependencies,
  onClose,
}: {
  at: PopoverAt;
  from: string | null;
  to: string;
  dependencies: readonly LineDependency[];
  onClose: () => void;
}) {
  return (
    <LinkPopover at={at} label={`${producerName(from)} → ${to}`} onClose={onClose}>
      <div className="mb-1.5 truncate text-[11px] text-zinc-500" title={`${producerName(from)} → ${to}`}>
        <span className={from ? "font-mono" : ""}>{producerName(from)}</span> → <span className="font-mono">{to}</span>
      </div>
      <DependencyFields dependencies={dependencies} />
    </LinkPopover>
  );
}
