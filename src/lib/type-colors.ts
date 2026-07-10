/**
 * Categorical per-entity-type palette for graph surfaces. Assignment is
 * alphabetical over the instance's full type vocabulary so a type keeps its
 * color across filters, hide-cold, and focus views. Hues are picked to read
 * on the dark canvas and to stay distinct from the governance edge strokes
 * (emerald/amber/red carry review state — dots are shapes, not lines, so the
 * unavoidable overlaps stay legible).
 */

export const TYPE_PALETTE = [
  "#00a9ff", // sky
  "#ffc400", // amber
  "#00e28c", // spring green
  "#ff5c77", // rose
  "#a06bff", // violet
  "#ff8b26", // orange
  "#00d6c4", // teal
  "#ee55f5", // fuchsia
  "#bce327", // lime
  "#7c89ff", // indigo
  "#ff66c4", // pink
  "#48e5ff", // cyan
] as const;

const FALLBACK = "#a1a1aa"; // zinc-400 — types outside the known vocabulary

/** Stable type→color mapping over the given vocabulary (order-insensitive). */
export function buildTypeColors(types: string[]): (entityType: string) => string {
  const sorted = [...new Set(types)].sort();
  const map = new Map(sorted.map((t, i) => [t, TYPE_PALETTE[i % TYPE_PALETTE.length]!]));
  return (entityType: string) => map.get(entityType) ?? FALLBACK;
}
