/**
 * Categorical per-entity-type palette for graph surfaces. Assignment is
 * alphabetical over the instance's full type vocabulary so a type keeps its
 * color across filters, hide-cold, and focus views. Hues are picked to read
 * on the dark canvas and to stay distinct from the governance edge strokes
 * (emerald/amber/red carry review state — dots are shapes, not lines, so the
 * unavoidable overlaps stay legible).
 */

export const TYPE_PALETTE = [
  "#38bdf8", // sky
  "#fbbf24", // amber
  "#34d399", // emerald
  "#fb7185", // rose
  "#a78bfa", // violet
  "#fb923c", // orange
  "#2dd4bf", // teal
  "#e879f9", // fuchsia
  "#a3e635", // lime
  "#818cf8", // indigo
  "#f472b6", // pink
  "#22d3ee", // cyan
] as const;

const FALLBACK = "#a1a1aa"; // zinc-400 — types outside the known vocabulary

/** Stable type→color mapping over the given vocabulary (order-insensitive). */
export function buildTypeColors(types: string[]): (entityType: string) => string {
  const sorted = [...new Set(types)].sort();
  const map = new Map(sorted.map((t, i) => [t, TYPE_PALETTE[i % TYPE_PALETTE.length]!]));
  return (entityType: string) => map.get(entityType) ?? FALLBACK;
}
