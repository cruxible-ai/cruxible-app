import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChangeMark } from "@/components/Chip";
import { LongText } from "@/components/LongText";
import { ShownValue } from "@/components/ShownValue";
import { withAt } from "@/lib/at";
import { parseRef } from "@/lib/cruxible-ref";

/**
 * Changes over time (an event log): one entry per change, each a labelled
 * header line (GENERATION g9 · when · LINE x ↗ · RUN … · APPROVED BY …), the
 * change's own words once under it, then the fields it changed, one line per
 * field — not columns. Under a value, its reason, muted. A field changed
 * many times in one entry folds to "× N" with the first values and "show
 * all"; reasons that are one sentence around each value read once.
 *
 * The shape for histories and activity. A collection of like rows is a
 * DataTable; one thing's fields are a FieldList.
 *
 *   <ChangeLog>
 *     <ChangeEntry
 *       header={<><HeaderLabel>Generation</HeaderLabel><GenerationLink sequence={9} /><HeaderDot />…</>}
 *       notes={["Vendor advisory says …"]}
 *       changes={[{ id, field: "status", change: "changed", value: "affected", reason: "…" }]}
 *     />
 *   </ChangeLog>
 */
export function ChangeLog({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className="divide-y divide-zinc-800/70" aria-label={label}>
      {children}
    </div>
  );
}

/** One field change in an entry. */
export interface ChangeItem {
  /** Unique within the entry (a Claim id, an index). */
  id: string;
  field: string;
  /** stated / changed / reobserved / retired / …: the mark before the field (ChangeMark). */
  change: string;
  /** The value, as data: folded lists show it, and a shared reason elides it. */
  value: unknown;
  /** The change's own reason, if it has one. */
  reason?: string | null | undefined;
  /** The value as a single change shows it (default: the value, one line). */
  render?: ReactNode;
  /** A trailing mark on a single value (`key`). */
  mark?: ReactNode;
}

/** One change: its header line, its own words, its field changes, then anything more (a disclosure). */
export function ChangeEntry({
  header,
  notes = [],
  changes = [],
  children,
}: {
  header: ReactNode;
  notes?: readonly string[];
  changes?: readonly ChangeItem[];
  children?: ReactNode;
}) {
  return (
    <div className="py-4 text-[13px] first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-zinc-400">{header}</div>
      {notes.map((text) => (
        <div key={text} className="mt-1">
          <LongText text={text} lines={2} className="text-zinc-200" />
        </div>
      ))}
      {changes.length > 0 && (
        <div className="mt-2.5 grid grid-cols-[minmax(9rem,max-content)_minmax(0,1fr)] items-baseline gap-x-5 gap-y-3">
          {fieldGroups(changes).map((group) => (
            <FieldChangeGroup key={`${group.field}\n${group.change}`} group={group} />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

/** A quiet label naming the value after it in a change's header (Line, Run, Approved by …). */
export function HeaderLabel({ children }: { children: string }) {
  return <span className="-mr-1.5 ml-2 text-[10.5px] uppercase tracking-wider text-zinc-600 first:ml-0">{children}</span>;
}

/** The separator between a header's parts. */
export const HeaderDot = () => <span className="text-zinc-600">·</span>;

/** A generation, linked to the current page as it stood there ("view state then"). */
export function GenerationLink({ sequence }: { sequence: number }) {
  const { pathname } = useLocation();
  return (
    <Link to={withAt(pathname, String(sequence))} className="font-mono text-zinc-200 hover:underline" title="View state at this generation">
      g{sequence}
    </Link>
  );
}

interface FieldGroup {
  field: string;
  change: string;
  items: ChangeItem[];
}

/** An entry's field changes, one group per (field, change), in first-seen order. */
function fieldGroups(changes: readonly ChangeItem[]): FieldGroup[] {
  const out = new Map<string, FieldGroup>();
  for (const item of changes) {
    const key = `${item.field}\n${item.change}`;
    let group = out.get(key);
    if (!group) out.set(key, (group = { field: item.field, change: item.change, items: [] }));
    group.items.push(item);
  }
  return [...out.values()];
}

/** The text a value reads as, to find it inside a reason. */
function valueText(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return null;
}

/**
 * The reasons of a group of changes, said once: when every reason is the same
 * sentence around its own value, the sentence with the value elided;
 * otherwise the first reason and how many more there are.
 */
export function sharedReason(items: readonly { value: unknown; reason?: string | null | undefined }[]): { text: string; more: number } | null {
  const reasons = items.map((item) => item.reason ?? null);
  if (reasons.every((r) => !r)) return null;
  if (items.length === 1) return reasons[0] ? { text: reasons[0], more: 0 } : null;
  const patterns = items.map((item, i) => {
    const reason = reasons[i];
    const value = valueText(item.value);
    return reason && value ? reason.split(value).join("…").replace(/…\.$/, "…") : reason;
  });
  if (patterns.every((p) => p === patterns[0])) return { text: patterns[0]!, more: 0 };
  const first = reasons.find((r) => !!r)!;
  return { text: first, more: reasons.filter((r) => !!r).length - 1 };
}

/** A shared reason as one line of text ("… (+2 more reasons)"). */
export function sharedReasonText(said: { text: string; more: number } | null): string | null {
  if (!said) return null;
  return said.more > 0 ? `${said.text} (+${said.more} more reasons)` : said.text;
}

/** How many values a repeated field shows before "show all". */
const GROUP_PREVIEW = 3;

function FieldChangeGroup({ group }: { group: FieldGroup }) {
  const [all, setAll] = useState(false);
  const count = group.items.length;
  const shown = all ? group.items : group.items.slice(0, GROUP_PREVIEW);
  const reason = sharedReasonText(sharedReason(group.items));
  const single = group.items[0]!;
  return (
    <>
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <ChangeMark change={group.change} />
        <span className="font-mono text-[12px] text-zinc-400">{group.field}</span>
        {count > 1 && <span className="text-[12px] text-zinc-600">× {count}</span>}
      </div>
      <div className="min-w-0 space-y-0.5">
        {count === 1 ? (
          <div className="flex flex-wrap items-baseline gap-x-3">
            <span className="min-w-0">{single.render ?? <ChangeValue value={single.value} />}</span>
            {single.mark}
          </div>
        ) : (
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            {shown.map((item, i) => (
              <span key={`${item.id}\n${i}`} className="whitespace-nowrap text-zinc-300">
                {valueText(item.value) ?? <ShownValue value={item.value} />}
                {i < shown.length - 1 && <span className="text-zinc-600">,</span>}
              </span>
            ))}
            {count > GROUP_PREVIEW && (
              <button onClick={() => setAll((v) => !v)} className="ml-1 text-[12px] text-zinc-500 hover:text-zinc-200">
                {all ? "show fewer" : `… show all ${count}`}
              </button>
            )}
          </div>
        )}
        {reason && <LongText text={reason} lines={1} className="text-[12px] text-zinc-500" />}
      </div>
    </>
  );
}

/** A changed value on one line: text clamps; a served preview reads with an ellipsis; refs and structures as ShownValue. */
export function ChangeValue({ value, muted = false }: { value: unknown; muted?: boolean }) {
  const tone = muted ? "text-zinc-500" : "text-zinc-300";
  if (typeof value === "string" && !parseRef(value)) return <LongText text={value} lines={1} className={tone} />;
  if (
    typeof value === "object" &&
    value !== null &&
    (value as { truncated?: unknown }).truncated === true &&
    typeof (value as { preview?: unknown }).preview === "string"
  ) {
    return <LongText text={`${(value as { preview: string }).preview}…`} lines={1} className={tone} />;
  }
  return (
    <span className={tone}>
      <ShownValue value={value} />
    </span>
  );
}
