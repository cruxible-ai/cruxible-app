import { Chip } from "./Chip";
import { EntityLink } from "./EntityLink";
import { EntityTable } from "./EntityTable";
import {
  isEntityRef,
  isPathItem,
  isValuesItem,
  type EntityRef,
  type ValuesItem,
} from "@/api/items";
import type { QueryToolResult } from "@/api/data-source";
import { formatDateTime, humanize, looksLikeDateTime } from "@/lib/text";

/**
 * Renders the items of a QueryToolResult according to its result_shape:
 * entity-shaped results as a dense table, and path-shaped results as the SAME
 * dense table over the result entities (grouped by type when a context query
 * returns several) — a work queue reads exactly like the work-item browse
 * view, with the graph toggle carrying the topology. Queries with a `select:`
 * block return flat values rows under either shape — those render as a
 * projected-values table.
 */
export function QueryItems({
  result,
  linkType,
  compact = false,
}: {
  result: QueryToolResult;
  /** Entity type of the query's `returns` — makes values rows link to entities. */
  linkType?: string | undefined;
  /** Card-preview mode: only identity/status columns, no horizontal scroll. */
  compact?: boolean;
}) {
  if (result.result_shape === "entity") {
    const refs = result.items.filter(isEntityRef);
    if (refs.length > 0) return <EntityTable entities={refs} compact={compact} />;
    const values = result.items.filter(isValuesItem);
    if (values.length > 0) return <ValuesTable rows={values} linkType={linkType} compact={compact} />;
    return <EntityTable entities={[]} />;
  }
  const paths = result.items.filter(isPathItem);
  if (paths.length === 0) {
    const values = result.items.filter(isValuesItem);
    if (values.length > 0) return <ValuesTable rows={values} linkType={linkType} compact={compact} />;
    return <div className="py-3 text-[13px] text-zinc-600">No items.</div>;
  }
  const byType = new Map<string, EntityRef[]>();
  const seen = new Set<string>();
  for (const p of paths) {
    const key = `${p.result.entity_type}:${p.result.entity_id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    if (!byType.has(p.result.entity_type)) byType.set(p.result.entity_type, []);
    byType.get(p.result.entity_type)!.push(p.result);
  }
  return (
    <div className="space-y-3">
      {[...byType.entries()].map(([type, ents]) => (
        <div key={type}>
          {byType.size > 1 && (
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
              {humanize(type)}
            </div>
          )}
          <EntityTable entities={ents} compact={compact} />
        </div>
      ))}
    </div>
  );
}

/**
 * Dense table for select-projected values rows. Columns come from the first
 * row's keys (selects are uniform); long text truncates, counts stay narrow.
 */
const COMPACT_COLUMNS = ["title", "name", "kind", "status", "priority", "type"];

function ValuesTable({
  rows,
  linkType,
  compact = false,
}: {
  rows: ValuesItem[];
  linkType?: string | undefined;
  compact?: boolean;
}) {
  const allColumns = Object.keys(rows[0]?.values ?? {});
  // Column carrying the returned entity's id: the kit convention pk
  // (WorkItem -> work_item_id), else the first *_id column.
  const snake = linkType?.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
  const idColumn = linkType
    ? (allColumns.includes(`${snake}_id`) ? `${snake}_id` : allColumns.find((c) => c.endsWith("_id")))
    : undefined;
  // Card previews keep identity and state; prose columns belong to the full view.
  const columns = compact
    ? allColumns.filter((c) => c === idColumn || COMPACT_COLUMNS.includes(c))
    : allColumns;
  return (
    <div className={compact ? "" : "overflow-x-auto"}>
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
            {columns.map((c) => (
              <th key={c} className="py-1 pr-3 font-medium">
                {humanize(c)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-zinc-900 align-top">
              {columns.map((c) => {
                const v = row.values[c];
                const text = v == null ? "—" : looksLikeDateTime(v) ? formatDateTime(v) : String(v);
                const isStatus = c === "status" && typeof v === "string";
                const isLink = linkType && c === idColumn && typeof v === "string";
                return (
                  <td
                    key={c}
                    title={looksLikeDateTime(v) ? String(v) : undefined}
                    className="max-w-[28rem] truncate py-1 pr-3 text-zinc-300"
                  >
                    {isLink ? (
                      <EntityLink entityType={linkType} entityId={v as string} />
                    ) : isStatus ? (
                      <Chip value={v as string} />
                    ) : (
                      text
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
