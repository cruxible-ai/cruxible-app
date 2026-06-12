import { Chip } from "./Chip";
import { EntityLink } from "./EntityLink";
import { EntityTable } from "./EntityTable";
import { isEntityRef, isPathItem, prop, type EntityRef } from "@/api/items";
import type { QueryToolResult } from "@/api/data-source";

/**
 * Renders the items of a QueryToolResult according to its result_shape:
 * entity-shaped results as a dense table, path-shaped results as
 * entry → context groups (the shape of the *_context queries).
 */
export function QueryItems({ result }: { result: QueryToolResult }) {
  if (result.result_shape === "entity") {
    return <EntityTable entities={result.items.filter(isEntityRef)} />;
  }
  const paths = result.items.filter(isPathItem);
  if (paths.length === 0) {
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
