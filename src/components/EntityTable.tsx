import { Chip } from "./Chip";
import { EntityLink } from "./EntityLink";
import { prop, type EntityRef } from "@/api/items";

/**
 * Dense row table for entity-shaped query items. Columns are the common
 * project-state vocabulary: id, title, status, priority, type. Every cell is
 * verbatim API data.
 */
export function EntityTable({ entities }: { entities: EntityRef[] }) {
  if (entities.length === 0) {
    return <div className="py-3 text-[13px] text-zinc-600">No items.</div>;
  }
  return (
    <table className="w-full text-left text-[13px]">
      <thead>
        <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
          <th className="w-64 py-1 pr-3 font-medium">Id</th>
          <th className="py-1 pr-3 font-medium">Title</th>
          <th className="py-1 pr-3 font-medium">Status</th>
          <th className="py-1 pr-0 font-medium">Priority</th>
        </tr>
      </thead>
      <tbody>
        {entities.map((e) => (
          <tr
            key={`${e.entity_type}:${e.entity_id}`}
            className="border-t border-zinc-800/60 align-top hover:bg-zinc-900/40"
          >
            <td className="max-w-64 truncate py-1.5 pr-3">
              <EntityLink entityType={e.entity_type} entityId={e.entity_id} />
            </td>
            <td className="py-1.5 pr-3 text-zinc-300">{prop(e, "title") ?? prop(e, "name") ?? "—"}</td>
            <td className="py-1.5 pr-3">
              {prop(e, "status") ? <Chip value={prop(e, "status")!} /> : null}
            </td>
            <td className="py-1.5 pr-0">
              {prop(e, "priority") ? <Chip value={prop(e, "priority")!} /> : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
