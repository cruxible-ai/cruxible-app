import { Link } from "react-router-dom";
import { ReceiptText } from "lucide-react";
import { useInstanceId } from "@/api/hooks";
import type { QueryToolResult } from "@/api/data-source";

/**
 * Trust footer rendered under every query-backed surface: which receipt
 * produced this data, against which snapshot, and whether it was truncated.
 * Receipts are first-class — this links to the full receipt view.
 */
export function ReceiptBar({ result }: { result: QueryToolResult }) {
  const instanceId = useInstanceId();
  const receipt = result.receipt as { head_snapshot_id?: string; duration_ms?: number } | null;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-zinc-800/80 pt-2 mt-3 text-[11px] text-zinc-500">
      {result.receipt_id ? (
        <span className="inline-flex items-center gap-1">
          <ReceiptText className="h-3 w-3" />
          receipt{" "}
          <Link
            to={`/i/${instanceId}/receipts/${result.receipt_id}`}
            className="font-mono text-zinc-400 hover:text-zinc-200 hover:underline"
          >
            {result.receipt_id}
          </Link>
        </span>
      ) : (
        <span>no receipt</span>
      )}
      {receipt?.head_snapshot_id && (
        <span>
          snapshot <span className="font-mono">{receipt.head_snapshot_id}</span>
        </span>
      )}
      <span>
        {result.items.length} of {result.total} · {result.relationship_state} edges
      </span>
      {typeof receipt?.duration_ms === "number" && <span>{receipt.duration_ms.toFixed(1)} ms</span>}
    </div>
  );
}
