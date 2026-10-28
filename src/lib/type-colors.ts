/**
 * Categorical per-entity-type palette for graph surfaces. Assignment is
 * alphabetical over the instance's full type vocabulary so a type keeps its
 * color across filters, hide-cold, and focus views. Hues read on the dark
 * canvas and stay clear of the colors that already mean something in the
 * console: amber/orange (waiting), red/rose (wrong), green (healthy), teal
 * (Cruxible, proposes) and fuchsia (settles).
 */

export const TYPE_PALETTE = [
  "#00a9ff", // sky
  "#a06bff", // violet
  "#48e5ff", // cyan
  "#ff66c4", // pink
  "#bce327", // lime
  "#7c89ff", // indigo
  "#d6b98c", // sand
  "#9fb3c8", // steel
] as const;

const FALLBACK = "#a1a1aa"; // zinc-400 — types outside the known vocabulary

/** Stable type→color mapping over the given vocabulary (order-insensitive). */
export function buildTypeColors(types: string[]): (entityType: string) => string {
  const sorted = [...new Set(types)].sort();
  const map = new Map(sorted.map((t, i) => [t, TYPE_PALETTE[i % TYPE_PALETTE.length]!]));
  return (entityType: string) => map.get(entityType) ?? FALLBACK;
}
