import type { Point } from "./type-layout.ts";

/**
 * Points along a routed edge: a cubic spline (start, then control points in
 * threes) is sampled, a polyline walked as is. Edge labels sit at a fraction
 * of the drawn length, and slide along their own edge when one would cover
 * another.
 */

export function samplePath(points: readonly Point[], curve: boolean): Point[] {
  if (!curve) return [...points];
  const samples: Point[] = [];
  for (let i = 0; i + 3 < points.length; i += 3) {
    const [p0, p1, p2, p3] = [points[i]!, points[i + 1]!, points[i + 2]!, points[i + 3]!];
    for (let step = i === 0 ? 0 : 1; step <= 16; step++) {
      const t = step / 16;
      const u = 1 - t;
      const at = (k: "x" | "y") => u * u * u * p0[k] + 3 * u * u * t * p1[k] + 3 * u * t * t * p2[k] + t * t * t * p3[k];
      samples.push({ x: at("x"), y: at("y") });
    }
  }
  return samples;
}

/** The point a fraction of the way along the drawn path, by length. */
export function pointAlong(points: readonly Point[], curve: boolean, fraction: number): Point {
  const samples = samplePath(points, curve);
  if (samples.length < 2) return points[0]!;
  const lengths = [0];
  for (let i = 1; i < samples.length; i++) {
    lengths.push(lengths[i - 1]! + Math.hypot(samples[i]!.x - samples[i - 1]!.x, samples[i]!.y - samples[i - 1]!.y));
  }
  const target = lengths[lengths.length - 1]! * fraction;
  const i = Math.max(1, lengths.findIndex((l) => l >= target));
  const [a, b] = [samples[i - 1]!, samples[i]!];
  const span = lengths[i]! - lengths[i - 1]! || 1;
  const k = (target - lengths[i - 1]!) / span;
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k };
}

export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

const overlaps = (a: Box, b: Box, gap = 2) =>
  a.x < b.x + b.width + gap && b.x < a.x + a.width + gap && a.y < b.y + b.height + gap && b.y < a.y + a.height + gap;

const overlapArea = (a: Box, b: Box) =>
  Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
  Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));

/** Where along its edge each label is tried: the middle first, then outward. */
const FRACTIONS = [0.5, 0.42, 0.58, 0.34, 0.66, 0.26, 0.74, 0.18, 0.82];

/**
 * A center for each label near its own edge, covering no other label and no
 * node: on the edge where a free spot exists, else just above or below it;
 * where nowhere is free, the spot that covers least. Longer labels are placed
 * first; the result is deterministic for the same input.
 */
export function placeLabels(
  edges: readonly { id: string; points: readonly Point[]; curve: boolean; width: number; height: number }[],
  obstacles: readonly Box[],
): Map<string, Point> {
  const placed: Box[] = [];
  const out = new Map<string, Point>();
  const order = [...edges].sort((a, b) => b.width - a.width || (a.id < b.id ? -1 : 1));
  for (const edge of order) {
    if (edge.points.length < 2) continue;
    const box = (p: Point): Box => ({ x: p.x - edge.width / 2, y: p.y - edge.height / 2, width: edge.width, height: edge.height });
    const along = FRACTIONS.map((f) => pointAlong(edge.points, edge.curve, f));
    const offset = edge.height * 0.8;
    // on the edge first, then nudged off it, nearest the middle first
    const candidates = [
      ...along,
      ...along.flatMap((p) => [
        { x: p.x, y: p.y - offset },
        { x: p.x, y: p.y + offset },
      ]),
    ];
    let best: { at: Point; cost: number } | null = null;
    for (const p of candidates) {
      const b = box(p);
      const cost =
        placed.reduce((sum, other) => sum + (overlaps(b, other) ? overlapArea(b, other) + 1 : 0), 0) +
        obstacles.reduce((sum, o) => sum + (overlaps(b, o, 0) ? overlapArea(b, o) + 1 : 0), 0);
      if (cost === 0) {
        best = { at: p, cost };
        break;
      }
      if (!best || cost < best.cost) best = { at: p, cost };
    }
    const chosen = best!.at;
    placed.push(box(chosen));
    out.set(edge.id, chosen);
  }
  return out;
}
