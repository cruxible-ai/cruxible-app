import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";

/**
 * The one table style: 13px body, 12px muted headings, rows divided by a
 * hairline, numbers right-aligned in tabular figures, cells top-aligned.
 * Long values truncate in their cell with the full value on hover.
 */
export function Table({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse text-left text-[13px] leading-5 ${className}`}>{children}</table>
    </div>
  );
}

export function Th({ numeric = false, className = "", ...rest }: ThHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <th
      {...rest}
      className={`whitespace-nowrap border-b border-zinc-800 py-1.5 pr-4 text-[12px] font-medium text-zinc-500 last:pr-0 ${numeric ? "text-right" : ""} ${className}`}
    />
  );
}

export function Td({ numeric = false, className = "", ...rest }: TdHTMLAttributes<HTMLTableCellElement> & { numeric?: boolean }) {
  return (
    <td
      {...rest}
      className={`py-1.5 pr-4 align-top last:pr-0 ${numeric ? "text-right font-mono tabular-nums" : ""} ${className}`}
    />
  );
}

/** Row divider shared by every table body row. */
export const trClass = "border-t border-zinc-800/70 first:border-t-0";
