/** How a `next` row's detail fields and repair read (the Next table's cells and group lines). */
import type { NextItem } from "@/api/schemas";
import { RefLink } from "@/components/RefLink";
import { parseRef } from "@/lib/cruxible-ref";
import { captureHandle, type FieldSpec } from "@/lib/next-reasons";
import { formatDateTime, formatWhen } from "@/lib/text";

export function FieldValue({ spec, value }: { spec: FieldSpec; value: unknown }) {
  if (spec.kind === "time" && typeof value === "string") {
    return <span title={formatDateTime(value)}>{formatWhen(value)}</span>;
  }
  if (spec.kind === "capture" && typeof value === "string") return <RefLink value={captureHandle(value)} />;
  if (spec.kind === "cause" && typeof value === "object" && value !== null && !Array.isArray(value)) {
    // A failed run's cause: what the Provider said (code, error kind, message) at the node that failed.
    const cause = value as { node_id?: unknown; provider_code?: unknown; kind?: unknown; message?: unknown };
    return (
      <span>
        {typeof cause.node_id === "string" && <span className="font-mono text-zinc-500">{cause.node_id}: </span>}
        {typeof cause.provider_code === "string" && <span className="font-mono">{cause.provider_code}</span>}
        {typeof cause.kind === "string" && <span className="text-zinc-500"> ({cause.kind})</span>}
        {typeof cause.message === "string" && cause.message && <span> {cause.message}</span>}
      </span>
    );
  }
  if ((spec.kind === "claim" || spec.kind === "ref" || spec.kind === "run") && typeof value === "string") {
    return parseRef(value) ? <RefLink value={value} short /> : <span className="font-mono">{value}</span>;
  }
  if (spec.kind === "digest" && typeof value === "string") {
    return (
      <span className="font-mono text-zinc-500" title={value}>
        {value.slice(0, 19)}…
      </span>
    );
  }
  if (spec.kind === "count" && typeof value === "number") return <span className="font-mono">{value}</span>;
  if (spec.kind === "words" && typeof value === "string") return <span>{value.replaceAll("_", " ")}</span>;
  if (Array.isArray(value)) {
    return (
      <span className="inline-flex flex-wrap gap-x-2">
        {value.slice(0, 8).map((item, i) => (
          <span key={i}>
            {typeof item === "object" && item !== null && typeof (item as { capture_digest?: unknown }).capture_digest === "string" ? (
              <span>
                <RefLink value={captureHandle((item as { capture_digest: string }).capture_digest)} />
                {typeof (item as { expires_at?: unknown }).expires_at === "string" && (
                  <span className="text-zinc-500"> expires {formatWhen((item as { expires_at: string }).expires_at)}</span>
                )}
              </span>
            ) : typeof item === "string" ? (
              spec.key.includes("capture") ? <RefLink value={captureHandle(item)} /> : parseRef(item) ? <RefLink value={item} short /> : <span className="font-mono">{item}</span>
            ) : (
              <code className="font-mono text-[11px] text-zinc-500">{JSON.stringify(item)}</code>
            )}
          </span>
        ))}
        {value.length > 8 && <span className="text-zinc-500">+{value.length - 8}</span>}
      </span>
    );
  }
  if (typeof value === "object" && value !== null) {
    return <code className="font-mono text-[11px] text-zinc-500">{JSON.stringify(value)}</code>;
  }
  return <span>{String(value)}</span>;
}

/** The repair as text: what to change, and the CLI command when there is one. */
export function RepairText({ item }: { item: NextItem }) {
  if (!item.repair && !item.repair_requires) return null;
  return (
    <div className="t-meta">
      {item.repair && (
        <>
          <span className="font-mono text-zinc-400">{item.repair.operation}</span> {item.repair.required_change}
          {item.repair.command && (
            <code className="ml-2 font-mono text-[11px] text-zinc-400" title="Run from the CLI; the console is read-only">
              {item.repair.command}
            </code>
          )}
        </>
      )}
      {item.repair_requires && (
        <span className={item.repair ? "ml-2" : undefined}>
          Repair needs {item.repair_requires.tier} ({item.repair_requires.because.join(", ")})
        </span>
      )}
    </div>
  );
}

export const repairKey = (item: NextItem) =>
  JSON.stringify([item.repair?.operation, item.repair?.required_change, item.repair?.command, item.repair_requires]);

