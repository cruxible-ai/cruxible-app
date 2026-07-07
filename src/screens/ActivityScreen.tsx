import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useInstanceId, useReceiptList } from "@/api/hooks";
import { toggleChipClass } from "@/components/Chip";
import { EmptyState, LoadState, Panel } from "@/components/Panel";
import { formatDateTime, humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

const FETCH_LIMIT = 500;

interface ReceiptSummary {
  receipt_id: string;
  query_name?: string | null;
  operation_type?: string | null;
  created_at?: string | null;
  duration_ms?: number | null;
}

/**
 * The instance's audit feed: every receipted operation (query runs, workflow
 * applies, group proposals/resolutions, direct writes) newest first. Each row
 * links to the full receipt. Read-only by construction — receipts are the
 * record, not a control surface.
 */
export function ActivityScreen() {
  usePageTitle("Activity");
  const instanceId = useInstanceId();
  const [searchParams, setSearchParams] = useSearchParams();
  const opFilter = searchParams.get("op") ?? undefined;
  const receipts = useReceiptList(FETCH_LIMIT);

  const allItems = ((receipts.data as { items?: ReceiptSummary[] } | undefined)?.items ?? []);
  const total = (receipts.data as { total?: number } | undefined)?.total ?? 0;

  const { items, opTypes } = useMemo(() => {
    const sorted = [...allItems].sort((a, b) =>
      (b.created_at ?? "").localeCompare(a.created_at ?? ""),
    );
    const counts = new Map<string, number>();
    for (const r of sorted) {
      const op = r.operation_type || "query";
      counts.set(op, (counts.get(op) ?? 0) + 1);
    }
    return {
      items: opFilter ? sorted.filter((r) => (r.operation_type || "query") === opFilter) : sorted,
      opTypes: [...counts.entries()].sort((a, b) => b[1] - a[1]),
    };
  }, [allItems, opFilter]);

  function setOp(next: string | undefined) {
    const sp = new URLSearchParams(searchParams);
    if (next) sp.set("op", next);
    else sp.delete("op");
    setSearchParams(sp);
  }

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-[17px] font-semibold text-zinc-100">Activity</h1>
        <p className="mt-1 text-[12px] text-zinc-500">
          Every receipted operation on this instance, newest first. A receipt is the audit
          record of one read or write — click through for its full context.
        </p>
        {opTypes.length > 1 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <button onClick={() => setOp(undefined)} className={toggleChipClass(!opFilter)}>
              All
            </button>
            {opTypes.map(([op, count]) => (
              <button
                key={op}
                onClick={() => setOp(op === opFilter ? undefined : op)}
                className={toggleChipClass(op === opFilter)}
              >
                {humanize(op)} <span className="font-mono text-[10px] text-zinc-500">{count}</span>
              </button>
            ))}
          </div>
        )}
      </header>
      <Panel
        title="Receipts"
        meta={
          <span>
            <span className="font-mono">{total}</span> total
            {total > FETCH_LIMIT && <> · newest {FETCH_LIMIT} shown</>}
          </span>
        }
      >
        {receipts.isPending && <LoadState />}
        {receipts.error && <LoadState error={receipts.error} />}
        {receipts.data && items.length === 0 && <EmptyState>No receipts.</EmptyState>}
        {items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
                  <th className="py-1 pr-3 font-medium">When</th>
                  <th className="py-1 pr-3 font-medium">Operation</th>
                  <th className="py-1 pr-3 font-medium">Name</th>
                  <th className="py-1 pr-3 font-medium">Duration</th>
                  <th className="py-1 pr-3 font-medium">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr
                    key={r.receipt_id}
                    className="border-t border-zinc-800/60 align-top hover:bg-zinc-900/40"
                  >
                    <td
                      className="whitespace-nowrap py-1.5 pr-3 text-zinc-400"
                      title={r.created_at ?? undefined}
                    >
                      {r.created_at ? formatDateTime(r.created_at) : "—"}
                    </td>
                    <td className="whitespace-nowrap py-1.5 pr-3 text-zinc-300">
                      {humanize(r.operation_type || "query")}
                    </td>
                    <td className="max-w-[24rem] truncate py-1.5 pr-3 font-mono text-[12px] text-zinc-400">
                      {r.query_name || "—"}
                    </td>
                    <td className="whitespace-nowrap py-1.5 pr-3 font-mono text-[12px] text-zinc-500">
                      {typeof r.duration_ms === "number" ? `${Math.round(r.duration_ms)} ms` : "—"}
                    </td>
                    <td className="whitespace-nowrap py-1.5 pr-3">
                      <Link
                        to={`/i/${instanceId}/receipts/${r.receipt_id}`}
                        className="font-mono text-[12px] text-zinc-300 hover:underline"
                      >
                        {r.receipt_id}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}
