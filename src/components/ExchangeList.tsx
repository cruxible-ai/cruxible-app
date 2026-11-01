import { useMemo } from "react";
import { DataTable, type Column } from "@/components/DataTable";
import { BodyView } from "@/components/BodyView";
import { formatSize, type Exchange } from "@/lib/capture-body";
import { bodyFormat } from "@/lib/body-format";

/**
 * A request bundle's exchanges in the shared table (method, path, status,
 * size), each row opening to what was sent and the decoded response; the
 * bundle's other fields follow, base64 fields decoded.
 */
export function ExchangeList({
  exchanges,
  context,
  title,
}: {
  exchanges: readonly Exchange[];
  context: Record<string, unknown> | undefined;
  title: string;
}) {
  const columns = useMemo<Column<Exchange>[]>(
    () => [
      {
        id: "n",
        header: "#",
        numeric: true,
        hideable: false,
        sortValue: (e) => e.index,
        cell: (e) => <span className="text-zinc-500">{e.index + 1}</span>,
      },
      {
        id: "method",
        header: "Method",
        sortValue: (e) => e.method,
        filter: { kind: "enum", values: (e) => (e.method ? [e.method] : []) },
        cell: (e) => <span className="font-mono text-zinc-400">{e.method ?? "—"}</span>,
      },
      {
        id: "path",
        header: "Request",
        hideable: false,
        sortValue: (e) => e.path,
        filter: { kind: "text", text: (e) => `${e.path ?? ""} ${requestSummary(e.request)}` },
        cell: (e) => (
          <span className="min-w-0">
            <span className="font-mono text-zinc-200">{e.path ?? "—"}</span>
            {requestSummary(e.request) && <span className="ml-2 text-zinc-500">{requestSummary(e.request)}</span>}
          </span>
        ),
      },
      {
        id: "status",
        header: "Status",
        numeric: true,
        sortValue: (e) => e.status,
        filter: { kind: "enum", values: (e) => (e.status !== null ? [String(e.status)] : []) },
        cell: (e) => <span className={statusClass(e.status)}>{e.status ?? "—"}</span>,
      },
      {
        id: "size",
        header: "Response",
        numeric: true,
        sortValue: (e) => e.bytes.length,
        cell: (e) => <span className="text-zinc-400">{formatSize(e.bytes.length)}</span>,
      },
    ],
    [],
  );
  const entries = context ? Object.entries(context) : [];
  return (
    <div className="space-y-4">
      <DataTable
        rows={exchanges}
        columns={columns}
        rowKey={(e) => String(e.index)}
        rowLabel={(e) => `${e.method ?? ""} ${e.path ?? `request ${e.index + 1}`}`.trim()}
        urlKey="ex"
        label="Requests"
        count={`${exchanges.length} ${exchanges.length === 1 ? "request" : "requests"}`}
        maxHeight="70vh"
        expanded={(e) => <ExchangeDetail exchange={e} title={`${title}, request ${e.index + 1}`} />}
      />
      {entries.length > 0 && (
        <section aria-label="Bundle fields" className="space-y-1">
          <h3 className="text-[12px] font-semibold text-zinc-400">Recorded with the requests</h3>
          <dl className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1.5 text-[12px]">
            {entries.map(([key, value]) => (
              <div key={key} className="contents">
                <dt className="text-zinc-500">{key.replace(/_/g, " ")}</dt>
                <dd className="min-w-0">
                  <ContextValue value={value} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}
    </div>
  );
}

function ExchangeDetail({ exchange, title }: { exchange: Exchange; title: string }) {
  const format = bodyFormat(exchange, { contentType: null, name: exchange.path });
  return (
    <div className="space-y-3 py-2">
      {exchange.request !== null && exchange.request !== undefined && (
        <div className="space-y-1">
          <div className="text-[12px] text-zinc-500">Sent</div>
          <pre className="max-h-48 overflow-auto whitespace-pre-wrap break-all bg-zinc-950 p-2 font-mono text-[12px] text-zinc-300">
            {JSON.stringify(exchange.request, null, 2)}
          </pre>
        </div>
      )}
      <div className="space-y-1">
        <div className="text-[12px] text-zinc-500">Response</div>
        <BodyView format={format} text={exchange.text} json={exchange.json} size={exchange.bytes.length} title={title} />
      </div>
    </div>
  );
}

/** A one-line gist of what was sent: a list's length, or a short scalar. */
function requestSummary(request: unknown): string {
  if (request === null || request === undefined) return "";
  if (typeof request === "object" && !Array.isArray(request)) {
    const parts = Object.entries(request as Record<string, unknown>).map(([key, value]) =>
      Array.isArray(value) ? `${value.length} ${key}` : typeof value === "object" ? key : `${key}=${String(value)}`,
    );
    const line = parts.join(", ");
    return line.length > 80 ? `${line.slice(0, 79)}…` : line;
  }
  return Array.isArray(request) ? `${request.length} items` : String(request).slice(0, 80);
}

function statusClass(status: number | null): string {
  if (status === null) return "text-zinc-500";
  return status >= 400 ? "text-red-400" : status >= 300 ? "text-amber-300" : "text-zinc-300";
}

function ContextValue({ value }: { value: unknown }) {
  if (value === null || typeof value !== "object") {
    return <span className="break-all font-mono text-zinc-300">{value === null ? "—" : String(value)}</span>;
  }
  if (Array.isArray(value) && value.every((item) => typeof item !== "object" || item === null)) {
    return value.length === 0 ? (
      <span className="text-zinc-500">none</span>
    ) : (
      <span className="break-words text-zinc-300">{value.map(String).join(", ")}</span>
    );
  }
  return (
    <details>
      <summary className="cursor-pointer text-zinc-400 hover:text-zinc-200">
        {Array.isArray(value) ? `${value.length} items` : `${Object.keys(value).length} fields`}
      </summary>
      <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap break-all bg-zinc-950 p-2 font-mono text-[12px] text-zinc-300">
        {JSON.stringify(value, null, 2)}
      </pre>
    </details>
  );
}
