import { useInstanceSchema } from "@/api/hooks";
import type { ViewParams } from "@/api/hooks";
import { defChipClass } from "@/components/Chip";
import { humanize } from "@/lib/text";

interface TraversalStep {
  relationship?: string;
  direction?: string;
  where?: Record<string, unknown> | null;
  max_depth?: number;
  alias?: string | null;
}

interface QueryDef {
  entry_point?: string | null;
  traversal?: TraversalStep[];
  returns?: string;
  where?: Record<string, unknown> | null;
  relationship_state?: string;
  order_by?: Array<{ field?: string; direction?: string }> | null;
  limit?: number | null;
  required_params?: string[];
}

/** "candidate.properties.status" / "$result.properties.priority" → "status"/"priority". */
function shortField(key: string): string {
  return key.replace(/^\$?(candidate|result|entry|edge|source|target)\.properties\./, "");
}

function summarizeWhere(where: Record<string, unknown> | null | undefined): string[] {
  if (!where) return [];
  return Object.entries(where).map(([field, cond]) => {
    if (cond !== null && typeof cond === "object" && !Array.isArray(cond)) {
      const [op, value] = Object.entries(cond as Record<string, unknown>)[0] ?? ["", ""];
      const rendered = Array.isArray(value) ? value.join(", ") : String(value);
      return `${shortField(field)} ${op.replaceAll("_", " ")} ${rendered}`;
    }
    return `${shortField(field)} = ${String(cond)}`;
  });
}

/**
 * How this view is computed, always visible: the entry point with the live
 * param values, each traversal hop with its direction and filters, the
 * returned type, and the read policy (edge state, ordering, limit). Exists so
 * a queue is never a mystery table — you can see exactly which rows qualify
 * without leaving the screen.
 */
export function QueryDefinition({
  queryName,
  params,
}: {
  queryName: string;
  params: ViewParams;
}) {
  const schema = useInstanceSchema();
  const def = (
    schema.data as { named_queries?: Record<string, QueryDef> } | undefined
  )?.named_queries?.[queryName];
  if (!def) return null;

  const paramText = (def.required_params ?? [])
    .map((p) => `${p}=${String(params[p] ?? "?")}`)
    .join(", ");
  const rootFilters = summarizeWhere(def.where);
  const policy = [
    def.relationship_state && def.relationship_state !== "live"
      ? `${def.relationship_state} edges`
      : null,
    (def.order_by ?? []).length > 0
      ? `sort ${(def.order_by ?? [])
          .map((o) => `${shortField(o.field ?? "")}${o.direction === "desc" ? " ↓" : ""}`)
          .join(", ")}`
      : null,
    def.limit != null ? `limit ${def.limit}` : null,
  ].filter(Boolean);

  return (
    <div className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-zinc-500">
      <span className={defChipClass}>
        <span className="text-zinc-300">{humanize(def.entry_point ?? "?")}</span>
        {paramText && <span className="font-mono text-[10px] text-zinc-500">{paramText}</span>}
      </span>
      {(def.traversal ?? []).map((step, i) => {
        const filters = summarizeWhere(step.where);
        return (
          <span key={i} className="inline-flex items-center gap-1.5">
            <span className="font-mono text-zinc-600">
              {step.direction === "incoming" ? "←" : "→"}
            </span>
            <span className={defChipClass}>
              <span>{(step.relationship ?? "?").replaceAll("_", " ")}</span>
              {(step.max_depth ?? 1) > 1 && (
                <span className="font-mono text-[10px] text-zinc-600">×{step.max_depth}</span>
              )}
              {filters.length > 0 && (
                <span className="text-[10px] text-zinc-600">[{filters.join("; ")}]</span>
              )}
            </span>
          </span>
        );
      })}
      <span className="font-mono text-zinc-600">⇒</span>
      <span className={defChipClass}>
        <span className="text-zinc-300">{humanize(def.returns ?? "?")}</span>
        {rootFilters.length > 0 && (
          <span className="text-[10px] text-zinc-600">[{rootFilters.join("; ")}]</span>
        )}
      </span>
      {policy.length > 0 && <span className="text-zinc-600">· {policy.join(" · ")}</span>}
    </div>
  );
}
