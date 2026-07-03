/** Ordinal rank for the priority vocabulary; unknown values sort last. */
const PRIORITY_RANK: Record<string, number> = { critical: 3, high: 2, medium: 1, low: 0 };

export function priorityRank(v: unknown): number {
  return typeof v === "string" ? (PRIORITY_RANK[v] ?? -1) : -1;
}

/** Generic cell comparison: priority by rank, numbers numerically, else text. */
export function compareCells(column: string, a: unknown, b: unknown): number {
  if (column === "priority") return priorityRank(a) - priorityRank(b);
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a ?? "").localeCompare(String(b ?? ""));
}

export type SortState = { column: string; dir: 1 | -1 } | null;

export function nextSort(current: SortState, column: string): SortState {
  if (current?.column !== column) return { column, dir: -1 };
  if (current.dir === -1) return { column, dir: 1 };
  return null;
}
