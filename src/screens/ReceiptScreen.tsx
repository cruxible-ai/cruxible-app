import { useParams } from "react-router-dom";
import { useReceipt } from "@/api/hooks";
import { Panel, LoadState } from "@/components/Panel";
import { formatDateTime } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

interface ReceiptNode {
  node_id: string;
  node_type: string;
  entity_type?: string | null;
  entity_id?: string | null;
  detail?: Record<string, unknown>;
  timestamp?: string;
}

/**
 * Receipt detail: the trust artifact behind a query or mutation. Shows the
 * operation, parameters, node trail, and the raw envelope — receipts are the
 * product differentiator, so this view is deliberately complete.
 */
export function ReceiptScreen() {
  const { receiptId = "" } = useParams();
  const receipt = useReceipt(receiptId);
  usePageTitle(`Receipt ${receiptId}`);

  if (receipt.isPending) return <LoadState />;
  if (receipt.error) return <LoadState error={receipt.error} />;

  const data = receipt.data as Record<string, unknown>;
  const nodes = (data.nodes ?? []) as ReceiptNode[];
  const summary: [string, unknown][] = [
    ["receipt_id", data.receipt_id],
    ["operation_type", data.operation_type],
    ["query_name", data.query_name],
    ["head_snapshot_id", data.head_snapshot_id],
    ["created_at", data.created_at],
    ["duration_ms", data.duration_ms],
    ["committed", data.committed],
  ].filter(([, v]) => v !== undefined && v !== null) as [string, unknown][];

  return (
    <div className="space-y-3">
      <header>
        <div className="text-[13px] text-zinc-400">Receipt</div>
        <h1 className="font-mono text-[17px] font-semibold text-zinc-100">{receiptId}</h1>
      </header>

      <Panel title="Summary">
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1 text-[14px]">
          {summary.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-zinc-500">{k}</dt>
              <dd className="font-mono text-[13px] text-zinc-300">{String(v)}</dd>
            </div>
          ))}
          {data.parameters != null && (
            <div className="contents">
              <dt className="text-zinc-500">parameters</dt>
              <dd className="font-mono text-[13px] text-zinc-300">
                {JSON.stringify(data.parameters)}
              </dd>
            </div>
          )}
        </dl>
      </Panel>

      {nodes.length > 0 && (
        <Panel title="Trail" meta={<span className="font-mono">{nodes.length} nodes</span>}>
          <div className="space-y-1">
            {nodes.map((n) => (
              <div
                key={n.node_id}
                className="flex flex-wrap items-baseline gap-x-3 rounded border border-zinc-800/60 px-2.5 py-1.5 text-[13px]"
              >
                <span className="font-mono text-zinc-600">{n.node_id}</span>
                <span className="text-zinc-300">{n.node_type}</span>
                {n.entity_id && (
                  <span className="font-mono text-zinc-400">
                    {n.entity_type}/{n.entity_id}
                  </span>
                )}
                {n.timestamp && (
                  <span className="ml-auto text-zinc-600" title={n.timestamp}>
                    {formatDateTime(n.timestamp)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Panel>
      )}

      <Panel title="Raw envelope">
        <pre className="max-h-[32rem] overflow-auto rounded bg-zinc-950 p-3 font-mono text-[12px] leading-4 text-zinc-400">
          {JSON.stringify(data, null, 2)}
        </pre>
      </Panel>
    </div>
  );
}
