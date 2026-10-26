import { useState } from "react";
import type { NextItem } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { CountsMark } from "@/components/CountsMark";
import { RefLink } from "@/components/RefLink";
import { parseRef } from "@/lib/cruxible-ref";
import { captureHandle, detailRecord, reasonMeta, splitDetail, type FieldSpec } from "@/lib/next-reasons";
import { formatDateTime, formatWhen } from "@/lib/text";

function FieldValue({ spec, value }: { spec: FieldSpec; value: unknown }) {
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
function RepairText({ item }: { item: NextItem }) {
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
          repair needs {item.repair_requires.tier} ({item.repair_requires.because.join(", ")})
        </span>
      )}
    </div>
  );
}

const repairKey = (item: NextItem) =>
  JSON.stringify([item.repair?.operation, item.repair?.required_change, item.repair?.command, item.repair_requires]);

/**
 * One `next` row: the Subject (or Claim, Line, proposal) it is about, the
 * reason's named detail fields inline, and the repair as text. Inside a
 * reason group the label and a repair shared by the whole group are on the
 * group line, so a row carries only what is its own. The console never runs
 * a repair; the CLI/MCP does.
 */
export function NextItemRow({
  item,
  grouped = false,
  sharedRepair = false,
  sharedFields = new Set<string>(),
}: {
  item: NextItem;
  grouped?: boolean;
  sharedRepair?: boolean;
  /** Detail keys the group line already shows. */
  sharedFields?: ReadonlySet<string>;
}) {
  const [raw, setRaw] = useState(false);
  const meta = reasonMeta(item.reason);
  const split = splitDetail(item.reason, item.detail);
  // A Claim field naming the row's own subject is already the row's link.
  const fields = split.fields.filter(
    ({ spec, value }) => !sharedFields.has(spec.key) && !(spec.kind === "claim" && `Claim:${String(value)}` === item.subject_identity),
  );
  const rest = split.rest;
  const related = item.related_identities ?? [];
  const record = detailRecord(item.detail);
  const counts = record && meta.counts ? meta.counts(record) : null;
  return (
    <div className="py-2 text-[13px] first:pt-0 last:pb-0">
      <div className={grouped ? "grid grid-cols-[minmax(10rem,max-content)_minmax(0,1fr)_auto] items-baseline gap-x-5" : "flex flex-wrap items-baseline gap-x-5 gap-y-1"}>
        {!grouped && (
          <>
            <Chip concept="severity" value={item.severity} />
            <span className="text-zinc-100" title={item.reason}>
              {meta.label}
            </span>
          </>
        )}
        <span className="min-w-0 max-w-[22rem] break-all">
          <RefLink value={item.subject_identity} short />
        </span>
        <span className="flex min-w-0 flex-wrap items-baseline gap-x-5 gap-y-1">
        {related.length > 0 && (
          <span className="min-w-0 break-all">
            <span className="t-meta">about </span>
            {related.map((ref, i) => (
              <span key={ref}>
                {i > 0 && ", "}
                <RefLink value={ref.startsWith("Capture:sha256:") ? captureHandle(ref.slice(8)) : ref} short />
              </span>
            ))}
          </span>
        )}
        {fields.map(({ spec, value }) => (
          <span key={spec.key} className="inline-flex items-baseline gap-1.5 text-[12px]">
            {spec.label && <span className="text-zinc-500">{spec.label}</span>}
            <span className="text-zinc-300">
              <FieldValue spec={spec} value={value} />
            </span>
          </span>
        ))}
        {counts && (
          <span className="text-[12px]">
            <CountsMark counts={counts.counts} reason={counts.reason} />
          </span>
        )}
        </span>
        {rest !== null ? (
          <button onClick={() => setRaw((v) => !v)} className="ml-auto whitespace-nowrap text-[12px] text-zinc-500 hover:text-zinc-200" aria-expanded={raw}>
            {raw ? "hide detail" : "more detail"}
          </button>
        ) : (
          <span />
        )}
      </div>
      {!sharedRepair && (
        <div className="mt-0.5">
          <RepairText item={item} />
        </div>
      )}
      {(item.findings?.length ?? 0) > 0 && (
        <div className="t-meta">also: {item.findings!.map((finding) => reasonMeta(finding.reason).label).join("; ")}</div>
      )}
      {raw && rest !== null && (
        <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap border-l border-zinc-800 pl-3 text-[11px] text-zinc-400">
          {JSON.stringify(rest, null, 2)}
        </pre>
      )}
    </div>
  );
}

/**
 * A list of `next` rows grouped by reason, in first-seen order: one line per
 * reason (label, count, and the repair when every row shares it), then the
 * rows with only what is their own.
 */
export function NextGroups({ items }: { items: NextItem[] }) {
  const groups = new Map<string, NextItem[]>();
  for (const item of items) groups.set(item.reason, [...(groups.get(item.reason) ?? []), item]);
  return (
    <div className="space-y-4">
      {[...groups.entries()].map(([reason, rows]) => {
        const shared = rows.every((row) => repairKey(row) === repairKey(rows[0]!));
        // detail fields with one value across the whole group go on the group line
        const first = splitDetail(rows[0]!.reason, rows[0]!.detail).fields;
        const common =
          rows.length > 1
            ? first.filter(({ spec, value }) =>
                rows.every((row) => {
                  const other = splitDetail(row.reason, row.detail).fields.find((f) => f.spec.key === spec.key);
                  return other !== undefined && JSON.stringify(other.value) === JSON.stringify(value);
                }),
              )
            : [];
        const commonKeys = new Set(common.map(({ spec }) => spec.key));
        return (
          <div key={reason}>
            <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 border-b border-zinc-800/70 pb-1">
              <span className="text-[13px] font-semibold text-zinc-100" title={reason}>
                {reasonMeta(reason as NextItem["reason"]).label}
              </span>
              <span className="font-mono text-[12px] text-zinc-500">{rows.length}</span>
              {common.map(({ spec, value }) => (
                <span key={spec.key} className="inline-flex items-baseline gap-1.5 text-[12px]">
                  {spec.label && <span className="text-zinc-500">{spec.label}</span>}
                  <span className="text-zinc-300">
                    <FieldValue spec={spec} value={value} />
                  </span>
                </span>
              ))}
              {shared && <RepairText item={rows[0]!} />}
            </div>
            <div className="divide-y divide-zinc-800/50 pl-3">
              {rows.map((item) => (
                <NextItemRow key={item.item_id} item={item} grouped sharedRepair={shared} sharedFields={commonKeys} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
