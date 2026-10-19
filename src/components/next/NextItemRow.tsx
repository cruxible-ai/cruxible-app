import { useState } from "react";
import type { NextItem } from "@/api/schemas";
import { Chip } from "@/components/Chip";
import { RefLink } from "@/components/RefLink";
import { parseRef } from "@/lib/cruxible-ref";
import { captureHandle, REASONS, splitDetail, type FieldSpec } from "@/lib/next-reasons";
import { formatDateTime } from "@/lib/text";

export const SEVERITY_TONE = { blocking: "red", repair: "amber", warning: "zinc" } as const;

function FieldValue({ spec, value }: { spec: FieldSpec; value: unknown }) {
  if (spec.kind === "time" && typeof value === "string") {
    return <span title={value}>{formatDateTime(value)}</span>;
  }
  if (spec.kind === "capture" && typeof value === "string") return <RefLink value={captureHandle(value)} />;
  if ((spec.kind === "claim" || spec.kind === "ref") && typeof value === "string") {
    return parseRef(value) ? <RefLink value={value} /> : <span className="font-mono">{value}</span>;
  }
  if (spec.kind === "digest" && typeof value === "string") {
    return (
      <span className="font-mono text-zinc-500" title={value}>
        {value.slice(0, 19)}…
      </span>
    );
  }
  if (spec.kind === "count" && typeof value === "number") return <span className="font-mono">{value}</span>;
  if (Array.isArray(value)) {
    return (
      <span className="flex flex-wrap gap-x-2">
        {value.slice(0, 8).map((item, i) => (
          <span key={i}>
            {typeof item === "string" ? (
              spec.key.includes("capture") ? <RefLink value={captureHandle(item)} /> : parseRef(item) ? <RefLink value={item} /> : <span className="font-mono">{item}</span>
            ) : (
              <code className="font-mono text-[11px] text-zinc-500">{JSON.stringify(item)}</code>
            )}
          </span>
        ))}
        {value.length > 8 && <span className="text-zinc-600">+{value.length - 8}</span>}
      </span>
    );
  }
  if (typeof value === "object" && value !== null) {
    return <code className="font-mono text-[11px] text-zinc-500">{JSON.stringify(value)}</code>;
  }
  return <span>{String(value)}</span>;
}

/**
 * One `next` row: severity, the reason in words, the Subject (or Claim, Line,
 * proposal) it is about, the reason's named detail fields, and the repair as
 * text. The console never runs a repair; the CLI/MCP does.
 */
export function NextItemRow({ item }: { item: NextItem }) {
  const [raw, setRaw] = useState(false);
  const meta = REASONS[item.reason];
  const { fields, rest } = splitDetail(item.reason, item.detail);
  return (
    <div className="py-1.5 text-[13px]">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <Chip value={item.severity} tone={SEVERITY_TONE[item.severity]} />
        <span className="text-zinc-200" title={item.reason}>
          {meta.label}
        </span>
        <RefLink value={item.subject_identity} className="ml-auto" />
      </div>
      {(fields.length > 0 || (item.related_identities?.length ?? 0) > 0) && (
        <dl className="mt-0.5 flex flex-wrap gap-x-4 gap-y-0.5 pl-1 text-[12px]">
          {fields.map(({ spec, value }) => (
            <div key={spec.key} className="flex items-baseline gap-1.5">
              {spec.label && <dt className="text-zinc-600">{spec.label}</dt>}
              <dd className="text-zinc-300">
                <FieldValue spec={spec} value={value} />
              </dd>
            </div>
          ))}
          {(item.related_identities ?? []).length > 0 && (
            <div className="flex items-baseline gap-1.5">
              <dt className="text-zinc-600">related</dt>
              <dd className="flex flex-wrap gap-x-2">
                {item.related_identities!.map((ref) => (
                  <RefLink key={ref} value={ref.startsWith("Capture:sha256:") ? captureHandle(ref.slice(8)) : ref} />
                ))}
              </dd>
            </div>
          )}
        </dl>
      )}
      {item.repair && (
        <div className="mt-0.5 pl-1 text-[12px] text-zinc-500">
          <span className="font-mono text-zinc-400">{item.repair.operation}</span> {item.repair.required_change}
          {item.repair.command && (
            <code className="ml-2 font-mono text-[11px] text-zinc-500" title="Run from the CLI; the console is read-only">
              {item.repair.command}
            </code>
          )}
        </div>
      )}
      {item.repair_requires && (
        <div className="pl-1 text-[12px] text-zinc-600">
          repair needs {item.repair_requires.tier} ({item.repair_requires.because.join(", ")})
        </div>
      )}
      {(item.findings?.length ?? 0) > 0 && (
        <div className="pl-1 text-[12px] text-zinc-600">
          also: {item.findings!.map((finding) => REASONS[finding.reason].label).join("; ")}
        </div>
      )}
      {rest !== null && (
        <div className="pl-1">
          <button onClick={() => setRaw((v) => !v)} className="text-[11px] text-zinc-600 hover:text-zinc-300">
            {raw ? "hide detail" : "more detail"}
          </button>
          {raw && (
            <pre className="mt-0.5 max-h-48 overflow-auto whitespace-pre-wrap text-[11px] text-zinc-500">
              {JSON.stringify(rest, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}
