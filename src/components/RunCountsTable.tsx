import { useMemo } from "react";
import { SignalDot } from "@/components/Chip";
import { DataTable, type Column } from "@/components/DataTable";
import { ATTENTION_MEANING, countColumns, countOf, type RunCounts } from "@/lib/run-counts";

/** The needs-attention flag: an amber dot and the word; what it means on hover. */
export function AttentionMark({ title = ATTENTION_MEANING }: { title?: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap text-[12px] text-zinc-300" title={title}>
      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
      needs attention
    </span>
  );
}

/** The amber dot alone, for a table row the flag marks. */
export function AttentionDot() {
  return <SignalDot signal="waiting" title={ATTENTION_MEANING} />;
}

const dash = <span className="text-zinc-600">—</span>;

/**
 * Rows with their counts as columns: the caller's leading columns (step,
 * target, status), then one column per count the rows serve (known counts in
 * reading order, any later field by name), then complete and the top
 * refusals. A row without counts reads dashes; an unknown inbox count reads ?.
 * Pass `lead` and `counts` stable (module-level or memoized).
 */
export function RunCountsTable<T>({
  rows,
  counts,
  lead,
  rowKey,
  label,
}: {
  rows: readonly T[];
  counts: (row: T) => RunCounts | null | undefined;
  lead: Column<T>[];
  rowKey: (row: T) => string;
  label: string;
}) {
  const served = rows.map(counts);
  const shape = countColumns(served)
    .map((c) => c.key)
    .join("\n");
  const columns = useMemo<Column<T>[]>(() => {
    const countCols = countColumns(rows.map(counts)).map(
      (column): Column<T> => ({
        id: `count-${column.key}`,
        header: column.word,
        title: column.meaning,
        numeric: true,
        className: "font-mono text-[12px] text-zinc-300",
        cell: (row) => {
          const n = countOf(counts(row), column.key);
          if (n === undefined) return dash;
          if (n === null)
            return (
              <span className="text-zinc-300" title="Unknown: the inbox could not be read and the journal proves no count">
                ?
              </span>
            );
          return <span className={n === 0 ? "text-zinc-600" : undefined}>{n}</span>;
        },
      }),
    );
    return [
      ...lead,
      ...countCols,
      {
        id: "complete",
        header: "Complete",
        title: "Whether the run saw everything it expected to read",
        className: "whitespace-nowrap text-[12px]",
        cell: (row) => {
          const c = counts(row);
          if (!c) return dash;
          if (c.complete) return <span className="text-zinc-600">Yes</span>;
          const reasons = (c.incomplete_reasons ?? []).map((r) => `${r.node} · ${r.kind}`).join("\n");
          return (
            <span className="text-zinc-200" title={reasons || undefined}>
              No
            </span>
          );
        },
      },
      {
        id: "refusals",
        header: "Top refusals",
        className: "text-[12px]",
        cell: (row) => {
          const top = counts(row)?.top_refusals ?? [];
          if (top.length === 0) return dash;
          return (
            <span className="flex flex-col">
              {top.map((r) => (
                <span key={r.code} className="whitespace-nowrap">
                  <span className="font-mono text-zinc-300">{r.code}</span> <span className="text-zinc-500">{r.count}</span>
                </span>
              ))}
            </span>
          );
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by the count fields served
  }, [lead, counts, shape]);
  return <DataTable rows={rows} columns={columns} rowKey={rowKey} label={label} toolbar={false} maxHeight="none" />;
}
