/** How a `next` row's detail fields and repair read (the Next table's cells and group lines). */
import type { NextItem } from "@/api/schemas";
import { InfoButton } from "@/components/InfoButton";
import { RefLink } from "@/components/RefLink";
import { parseRef } from "@/lib/cruxible-ref";
import { captureHandle, type FieldSpec } from "@/lib/next-reasons";
import { REPAIR_DOORS, isSdkCode } from "@/lib/repair-tools";
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
  if (spec.kind === "source" && typeof value === "object" && value !== null && typeof (value as { identity?: unknown }).identity === "string") {
    return <span className="font-mono">{(value as { identity: string }).identity}</span>;
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

/**
 * The repair as text: the CLI command when the queue served one, else the CLI
 * command path; the MCP tool beside it. A withheld repair names the door and
 * what running it needs. SDK code (an older daemon) is never shown as a command.
 */
export function RepairText({ item }: { item: NextItem }) {
  if (!item.repair && !item.repair_requires) return null;
  const operation = item.repair?.operation ?? item.repair_requires!.operation;
  const door = REPAIR_DOORS[operation];
  const served = item.repair?.command && !isSdkCode(item.repair.command) ? item.repair.command : null;
  // a withheld Line repair still names its Line: the row is about it
  const line = operation.startsWith("cruxible.line.") && item.subject_identity.startsWith("Line:") ? ` ${item.subject_identity.slice(5)}` : "";
  const cli = served ?? (door ? `cruxible ${door.cli}${line}` : null);
  const mcp = item.repair_requires?.tool ?? door?.mcp ?? null;
  return (
    <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[12px]">
      {cli ? (
        <code className="font-mono text-[11px] text-zinc-300" title={served ? "CLI command; run it from a terminal (the console is read-only)" : "CLI command path; the arguments are the row's"}>
          {cli}
        </code>
      ) : (
        item.repair && <span className="text-zinc-400">Edit by hand</span>
      )}
      {mcp && (
        <span className="text-zinc-500" title="The MCP tool that performs it">
          · MCP <code className="font-mono text-[11px] text-zinc-400">{mcp}</code>
        </span>
      )}
      {item.repair?.required_change && <InfoButton label="What the repair changes">{item.repair.required_change.replaceAll("_", " ")}</InfoButton>}
      {item.repair_requires && (
        <>
          <span className="text-zinc-500">needs {item.repair_requires.tier}</span>
          <InfoButton label="Why the repair is not shown">
            Running it needs {item.repair_requires.because.map((gate) => GATE_WORDS[gate](item.repair_requires!)).join(" and ")}. The console reads without write access, so the queue withholds the full command.
          </InfoButton>
        </>
      )}
    </span>
  );
}

const GATE_WORDS: Record<NonNullable<NextItem["repair_requires"]>["because"][number], (r: NonNullable<NextItem["repair_requires"]>) => string> = {
  tier: (r) => `${r.tier} access`,
  profile: (r) => `the ${r.profile ?? "full"} MCP tool profile`,
  authoring: () => "a principal that can author",
  author: () => "the proposal's author",
};

export const repairKey = (item: NextItem) =>
  JSON.stringify([item.repair?.operation, item.repair?.required_change, item.repair?.command, item.repair_requires]);

