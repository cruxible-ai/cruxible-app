import { parseRef } from "@/lib/cruxible-ref";
import { RefLink } from "./RefLink";


function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * A Claim value as get shows it: scalars, a Subject (linked), a truncated
 * text preview, an exact-content digest, a structured object, or a list of
 * those (a many-cardinality slot, or a contested one).
 */
export function ShownValue({ value }: { value: unknown }) {
  if (value === null || value === undefined) return <span className="text-zinc-600">null</span>;
  if (typeof value === "string") {
    return parseRef(value)?.kind === "subject" ? (
      <RefLink value={value} />
    ) : (
      <span className="break-words">{value}</span>
    );
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return <span className="font-mono">{String(value)}</span>;
  }
  if (Array.isArray(value)) {
    return (
      <span className="flex flex-wrap gap-x-2 gap-y-0.5">
        {value.map((item, i) => (
          <span key={i}>
            <ShownValue value={item} />
          </span>
        ))}
      </span>
    );
  }
  if (isRecord(value)) {
    if (value.truncated === true && typeof value.preview === "string") {
      return (
        <span className="break-words" title={`${String(value.length)} characters; the evidence read shows it whole`}>
          {value.preview}
          <span className="text-zinc-600">… ({String(value.length)} chars)</span>
        </span>
      );
    }
    if (typeof value.exact_content === "string" && typeof value.content_digest === "string") {
      return (
        <span className="font-mono text-[12px] text-zinc-400" title={value.content_digest}>
          {value.exact_content} content {value.content_digest.slice(0, 19)}…
        </span>
      );
    }
    if (isRecord(value.object)) {
      return <code className="font-mono text-[12px] text-zinc-400">{JSON.stringify(value.object)}</code>;
    }
  }
  return <code className="font-mono text-[12px] text-zinc-400">{JSON.stringify(value)}</code>;
}
