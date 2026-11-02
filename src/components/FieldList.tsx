import { createContext, useContext, type ReactNode, type Ref } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * One thing's fields (a record): a fixed label column, the value, and a
 * trailing status (a `key` mark, evidence, flags), rows divided by a hairline
 * with generous spacing. Under a value, an optional quiet provenance line
 * (since when, by whom, why). A row may expand into detail below it.
 *
 * The shape for detail panels. A collection of like rows is a DataTable; a
 * history of changes is a ChangeLog.
 *
 *   <FieldList fields={[{ key: "grade", label: "grade", value: "Observed" }]} />
 *
 * or, for rows that hold their own state, `FieldRow` children:
 *
 *   <FieldList expandable>{rows.map((r) => <FieldRow key=… label=… value=… toggle=… detail=… />)}</FieldList>
 */

/** How wide the label column is; `compact` suits a narrow side panel. */
export type FieldListDensity = "regular" | "compact";

interface ListShape {
  expandable: boolean;
  density: FieldListDensity;
}

const ListContext = createContext<ListShape>({ expandable: false, density: "regular" });

/** A field as data, for the simple case (`fields`). */
export interface FieldItem {
  key: string;
  label: ReactNode;
  /** The label links here (a field's definition). */
  labelHref?: string | undefined;
  /** Hover text on the label (the field's full name, its type). */
  labelTitle?: string | undefined;
  value: ReactNode;
  /** Quiet line(s) under the value: where it came from. */
  provenance?: ReactNode;
  /** Trailing marks: `key`, evidence, flags. */
  status?: ReactNode;
}

export function FieldList({
  fields,
  children,
  expandable = false,
  density = "regular",
  className = "",
  label,
}: {
  fields?: readonly FieldItem[];
  children?: ReactNode;
  /** Rows carry a leading disclosure column (each row's `toggle`). */
  expandable?: boolean;
  density?: FieldListDensity;
  className?: string;
  /** The list's name for assistive tech. */
  label?: string;
}) {
  return (
    <ListContext.Provider value={{ expandable, density }}>
      <div className={`divide-y divide-zinc-800/70 ${className}`} role="list" aria-label={label}>
        {fields?.map(({ key, ...field }) => (
          <FieldRow key={key} {...field} />
        ))}
        {children}
      </div>
    </ListContext.Provider>
  );
}

const GRID: Record<FieldListDensity, { plain: string; expandable: string; text: string; row: string }> = {
  regular: {
    plain: "grid-cols-[minmax(9rem,15rem)_minmax(0,1fr)_minmax(0,max-content)]",
    expandable: "grid-cols-[1rem_minmax(9rem,15rem)_minmax(0,1fr)_minmax(0,max-content)]",
    text: "text-[13px]",
    row: "py-2",
  },
  compact: {
    plain: "grid-cols-[minmax(5rem,8rem)_minmax(0,1fr)_minmax(0,max-content)]",
    expandable: "grid-cols-[1rem_minmax(5rem,8rem)_minmax(0,1fr)_minmax(0,max-content)]",
    text: "text-[12px]",
    row: "py-1.5",
  },
};

/** One field: label, value (with its provenance), status; its detail below when open. */
export function FieldRow({
  label,
  labelHref,
  labelTitle,
  value,
  provenance,
  status,
  toggle,
  detail,
  highlighted = false,
  ref,
}: Omit<FieldItem, "key"> & {
  /** The row's disclosure (an `expandable` list): open state, the toggle, and the field's name for its aria label. */
  toggle?: { open: boolean; onToggle: () => void; name: string } | undefined;
  /** Shown under the row while `toggle.open`. */
  detail?: ReactNode;
  /** A row the URL points at reads as selected. */
  highlighted?: boolean;
  ref?: Ref<HTMLDivElement>;
}) {
  const { expandable, density } = useContext(ListContext);
  const grid = GRID[density];
  const labelClass = "truncate font-mono text-[12px] text-zinc-400";
  return (
    <div ref={ref} role="listitem" className={`${grid.row} first:pt-0 last:pb-0 ${highlighted ? "bg-zinc-900/40" : ""}`}>
      <div className={`grid ${expandable ? grid.expandable : grid.plain} items-baseline gap-x-4 ${grid.text}`}>
        {expandable &&
          (toggle ? (
            <button
              onClick={toggle.onToggle}
              aria-label={`${toggle.open ? "Collapse" : "Expand"} ${toggle.name}`}
              aria-expanded={toggle.open}
              className="relative top-[2px] text-zinc-500 hover:text-zinc-200"
            >
              {toggle.open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          ) : (
            <span />
          ))}
        {labelHref ? (
          <Link to={labelHref} className={`${labelClass} hover:text-zinc-200 hover:underline`} title={labelTitle}>
            {label}
          </Link>
        ) : (
          <span className={labelClass} title={labelTitle}>
            {label}
          </span>
        )}
        <div className="min-w-0">
          {value}
          {provenance && <div className="mt-0.5 space-y-0.5 text-[12px] text-zinc-500">{provenance}</div>}
        </div>
        <div className="flex flex-wrap items-baseline justify-end gap-x-3 gap-y-0.5">{status}</div>
      </div>
      {toggle?.open && detail && <div className="ml-8 mt-2 space-y-2">{detail}</div>}
    </div>
  );
}

/** The `key` mark: a field that is part of its kind's key (the id spells it; no evidence asked). */
export function KeyMark({ kind }: { kind: string | null }) {
  return (
    <span
      className="border border-zinc-800 px-1 font-mono text-[11px] leading-4 text-zinc-500"
      title={`Part of the ${kind ?? "Subject's"} key: it names the Subject, so no evidence is asked of it`}
    >
      key
    </span>
  );
}
