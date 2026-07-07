import { useMemo, useState } from "react";
import { Chip } from "./Chip";
import { EntityLink } from "./EntityLink";
import { EmptyState } from "./Panel";
import { prop, type EntityRef } from "@/api/items";
import { compareCells, nextSort, type SortState } from "@/lib/sort";
import { formatDateTime, humanize, looksLikeDateTime } from "@/lib/text";

/** Long prose belongs to the entity page, not a table cell. */
const PROSE_KEYS = ["summary", "description", "body", "rationale"];
const PROSE_CUTOFF = 120;

/**
 * Columns are derived from the rows: every scalar property any row carries,
 * in first-seen order, with status/priority pulled forward. Compact mode
 * (card previews) keeps the identity set only.
 */
function deriveColumns(entities: EntityRef[], compact: boolean): string[] {
  if (compact) return ["status", "priority"];
  const seen: string[] = [];
  for (const e of entities) {
    for (const [k, v] of Object.entries(e.properties ?? {})) {
      if (k === "title" || k === "name" || PROSE_KEYS.includes(k)) continue;
      if (v === null || v === undefined || typeof v === "object") continue;
      if (typeof v === "string" && v.length >= PROSE_CUTOFF && !looksLikeDateTime(v)) continue;
      if (v === e.entity_id) continue;
      if (!seen.includes(k)) seen.push(k);
    }
  }
  const lead = ["status", "priority"].filter((k) => seen.includes(k));
  return [...lead, ...seen.filter((k) => !lead.includes(k))];
}

export function isChipKey(key: string): boolean {
  return key === "status" || key === "priority" || key.endsWith("_status");
}

export function Cell({ value, column }: { value: unknown; column: string }) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-zinc-700">—</span>;
  }
  if (isChipKey(column) && typeof value === "string") return <Chip value={value} />;
  if (looksLikeDateTime(value)) {
    return (
      <span title={String(value)} className="whitespace-nowrap">
        {formatDateTime(value)}
      </span>
    );
  }
  return <>{String(value)}</>;
}

/**
 * Dense row table for entity-shaped query items, showing the FULL scalar
 * property set of the rows (wide tables scroll horizontally). Click a header
 * to sort; priority sorts by rank and is the default order (high first) when
 * the rows carry it. Every cell is verbatim API data.
 */
export function EntityTable({
  entities,
  compact = false,
}: {
  entities: EntityRef[];
  compact?: boolean;
}) {
  const hasPriority = entities.some((e) => prop(e, "priority"));
  const [sort, setSort] = useState<SortState>(
    hasPriority ? { column: "priority", dir: -1 } : null,
  );

  const propColumns = useMemo(() => deriveColumns(entities, compact), [entities, compact]);
  const columns = ["id", "title", ...propColumns];

  const rows = useMemo(() => {
    if (!sort) return entities;
    const cell = (e: EntityRef) =>
      sort.column === "id"
        ? e.entity_id
        : sort.column === "title"
          ? (prop(e, "title") ?? prop(e, "name") ?? "")
          : String(e.properties?.[sort.column] ?? "");
    return [...entities].sort((a, b) => sort.dir * compareCells(sort.column, cell(a), cell(b)));
  }, [entities, sort]);

  if (entities.length === 0) {
    return <EmptyState>No items.</EmptyState>;
  }
  return (
    <div className={compact ? "overflow-hidden" : "overflow-x-auto"}>
      <table className={`w-full text-left text-[13px] ${compact ? "table-fixed" : ""}`}>
        <thead>
          <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
            {columns.map((c) => (
              <th key={c} className={`py-1 pr-3 font-medium ${c === "id" ? (compact ? "w-[38%]" : "w-64") : ""}`}>
                <button onClick={() => setSort(nextSort(sort, c))} className="hover:text-zinc-300">
                  {c === "id" ? "Id" : humanize(c)}
                  {sort?.column === c && (sort.dir === -1 ? " ↓" : " ↑")}
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
              <td className={`py-1.5 pr-3 text-zinc-300 ${compact ? "truncate whitespace-nowrap" : "min-w-48"}`}>
                {prop(e, "title") ?? prop(e, "name") ?? "—"}
              </td>
              {propColumns.map((c) => (
                <td key={c} className="max-w-[18rem] truncate py-1.5 pr-3 text-zinc-400">
                  <Cell value={e.properties?.[c]} column={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
