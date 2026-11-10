import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useCard } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { RefLink } from "./RefLink";
import { ShownSlot } from "./ShownValue";

const WIDTH = 320; // px
const GAP = 6;
const OPEN_DELAY_MS = 250;
/** The most fields the card lists; the Subject's page has the rest. */
const FIELDS = 12;

/**
 * A Subject link that shows the Subject's current fields on hover (or
 * keyboard focus): its card is read when the hover opens, never when the
 * link renders, so a page of links costs no reads until one is looked at.
 */
export function SubjectHover({ subject, children }: { subject: string; children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLSpanElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const show = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return (
    <span ref={anchor} className="inline-flex min-w-0" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <RefLink value={subject}>{children}</RefLink>
      {open && anchor.current && <SubjectCard subject={subject} anchor={anchor.current} />}
    </span>
  );
}

function SubjectCard({ subject, anchor }: { subject: string; anchor: HTMLElement }) {
  const read = useCard(subject);
  const card = cardOf(read.data, "subject");
  const [at, setAt] = useState<{ top: number; left: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const r = anchor.getBoundingClientRect();
    const height = box.current?.offsetHeight ?? 0;
    const left = Math.max(8, Math.min(r.left, window.innerWidth - WIDTH - 8));
    const below = r.bottom + GAP;
    const top = below + height > window.innerHeight - 8 ? Math.max(8, r.top - GAP - height) : below;
    setAt({ top, left });
  }, [anchor, card]);
  const claims = card?.claims ?? [];
  return createPortal(
    <div
      ref={box}
      role="tooltip"
      style={{ position: "fixed", top: at?.top ?? -9999, left: at?.left ?? 0, width: WIDTH }}
      className="pointer-events-none z-[1000] border border-zinc-700 bg-zinc-900 px-2.5 py-2 text-left text-[12px] leading-5 text-zinc-300 shadow-lg"
    >
      <div className="mb-1 truncate font-mono text-[12px] text-zinc-100" title={subject}>
        {card?.subject ?? subject}
      </div>
      {read.isPending && <div className="animate-pulse text-zinc-600">Reading…</div>}
      {read.error && <div className="text-red-400/80">{read.error.message}</div>}
      {card && claims.length === 0 && <div className="text-zinc-500">No fields</div>}
      {claims.length > 0 && (
        <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3 gap-y-0.5">
          {claims.slice(0, FIELDS).map((claim) => (
            <div key={`${claim.predicate}:${claim.qualifier ?? ""}`} className="contents">
              <dt className="font-mono text-[11px] text-zinc-500">{claim.predicate.split(".").at(-1)}</dt>
              <dd className="min-w-0 break-words">
                <ShownSlot value={claim.value} nones={claim.nones ?? undefined} subject="id" />
              </dd>
            </div>
          ))}
        </dl>
      )}
      {claims.length > FIELDS && <div className="mt-1 text-zinc-500">+{claims.length - FIELDS} more</div>}
    </div>,
    document.body,
  );
}
