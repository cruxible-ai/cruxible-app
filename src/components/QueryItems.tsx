import { Chip } from "./Chip";
import { EntityLink } from "./EntityLink";
import { EntityTable } from "./EntityTable";
import {
  isEntityRef,
  isPathItem,
  isValuesItem,
  prop,
  type EntityRef,
  type ValuesItem,
} from "@/api/items";
import type { QueryToolResult } from "@/api/data-source";

/**
 * Renders the items of a QueryToolResult according to its result_shape:
 * entity-shaped results as a dense table, path-shaped results as
 * entry → context groups (the shape of the *_context queries). Queries with a
 * `select:` block return flat values rows under either shape — those render
 * as a projected-values table.
 */
export function QueryItems({
  result,
  linkType,
}: {
  result: QueryToolResult;
  /** Entity type of the query's `returns` — makes values rows link to entities. */
  linkType?: string | undefined;
}) {
  if (result.result_shape === "entity") {
    const refs = result.items.filter(isEntityRef);
    if (refs.length > 0) return <EntityTable entities={refs} />;
    const values = result.items.filter(isValuesItem);
    if (values.length > 0) return <ValuesTable rows={values} linkType={linkType} />;
    return <EntityTable entities={[]} />;
  }
  const paths = result.items.filter(isPathItem);
  if (paths.length === 0) {
    const values = result.items.filter(isValuesItem);
    if (values.length > 0) return <ValuesTable rows={values} linkType={linkType} />;
    return <div className="py-3 text-[13px] text-zinc-600">No items.</div>;
  }
  return (
    <div className="space-y-2">
      {paths.map((p, i) => (
        <div key={i} className="rounded border border-zinc-800/80 bg-zinc-900/30 px-3 py-2">
          <div className="flex flex-wrap items-center gap-2 text-[13px]">
            <EntityRow e={p.entry} />
            <span className="text-zinc-600">→</span>
            <EntityRow e={p.result} />
          </div>
          {p.entities.length > 2 && (
            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-zinc-500">
              {p.entities.map((e) => (
                <EntityLink
                  key={`${e.entity_type}:${e.entity_id}`}
                  entityType={e.entity_type}
                  entityId={e.entity_id}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Dense table for select-projected values rows. Columns come from the first
 * row's keys (selects are uniform); long text truncates, counts stay narrow.
 */
function ValuesTable({ rows, linkType }: { rows: ValuesItem[]; linkType?: string | undefined }) {
  const columns = Object.keys(rows[0]?.values ?? {});
  // Column carrying the returned entity's id: the kit convention pk
  // (WorkItem -> work_item_id), else the first *_id column.
  const snake = linkType?.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
  const idColumn = linkType
    ? (columns.includes(`${snake}_id`) ? `${snake}_id` : columns.find((c) => c.endsWith("_id")))
    : undefined;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
            {columns.map((c) => (
              <th key={c} className="py-1 pr-3 font-medium">
                {c.replaceAll("_", " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-zinc-900 align-top">
              {columns.map((c) => {
                const v = row.values[c];
                const text = v == null ? "—" : String(v);
                const isStatus = c === "status" && typeof v === "string";
                const isLink = linkType && c === idColumn && typeof v === "string";
                return (
                  <td key={c} className="max-w-[28rem] truncate py-1 pr-3 text-zinc-300">
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

function EntityRow({ e }: { e: EntityRef }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-[11px] text-zinc-600">{e.entity_type}</span>
      <EntityLink entityType={e.entity_type} entityId={e.entity_id}>
        <span className="text-zinc-200">{prop(e, "title") ?? e.entity_id}</span>
      </EntityLink>
      {prop(e, "status") && <Chip value={prop(e, "status")!} />}
    </span>
  );
}
