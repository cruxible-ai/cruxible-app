import { useMemo, useState } from "react";
import { Chip } from "./Chip";
import { EntityLink } from "./EntityLink";
import { prop, type EntityRef } from "@/api/items";
import { compareCells, nextSort, type SortState } from "@/lib/sort";

const COLUMNS = [
  { key: "id", label: "Id" },
  { key: "title", label: "Title" },
  { key: "status", label: "Status" },
  { key: "priority", label: "Priority" },
] as const;

/**
 * Dense row table for entity-shaped query items. Click a header to sort;
 * priority sorts by rank and is the default order (high first) when the
 * rows carry it. Every cell is verbatim API data.
 */
export function EntityTable({ entities }: { entities: EntityRef[] }) {
  const hasPriority = entities.some((e) => prop(e, "priority"));
  const [sort, setSort] = useState<SortState>(
    hasPriority ? { column: "priority", dir: -1 } : null,
  );

  const rows = useMemo(() => {
    if (!sort) return entities;
    const cell = (e: EntityRef) =>
      sort.column === "id" ? e.entity_id : (prop(e, sort.column) ?? "");
    return [...entities].sort((a, b) => sort.dir * compareCells(sort.column, cell(a), cell(b)));
  }, [entities, sort]);

  if (entities.length === 0) {
    return <div className="py-3 text-[13px] text-zinc-600">No items.</div>;
  }
  return (
    <table className="w-full text-left text-[13px]">
      <thead>
        <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
          {COLUMNS.map((c) => (
            <th key={c.key} className={`py-1 pr-3 font-medium ${c.key === "id" ? "w-64" : ""}`}>
              <button
                onClick={() => setSort(nextSort(sort, c.key))}
                className="hover:text-zinc-300"
              >
                {c.label}
                {sort?.column === c.key && (sort.dir === -1 ? " \u2193" : " \u2191")}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((e) => (
          <tr
            key={`${e.entity_type}:${e.entity_id}`}
            className="border-t border-zinc-800/60 align-top hover:bg-zinc-900/40"
          >
            <td className="max-w-64 truncate py-1.5 pr-3">
              <EntityLink entityType={e.entity_type} entityId={e.entity_id} />
            </td>
            <td className="py-1.5 pr-3 text-zinc-300">{prop(e, "title") ?? prop(e, "name") ?? "\u2014"}</td>
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
