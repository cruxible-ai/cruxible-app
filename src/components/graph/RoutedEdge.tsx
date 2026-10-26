import { BaseEdge, EdgeLabelRenderer, useInternalNode, type EdgeProps } from "@xyflow/react";
import type { Point } from "@/lib/type-layout";
import { FloatingEdge } from "./FloatingEdge";

export interface RoutedEdgeData {
  /** The polyline the layout routed, in canvas coordinates. */
  points: Point[];
  /** Where the layout put the label (its center). */
  labelAt: Point | null;
  /** The label (the ClaimType field names): shown while the edge is in the selected neighborhood. */
  text: string;
  /** The route is a cubic spline: start, then control points in threes. */
  curve?: boolean;
  /** Source and target positions the route was computed for. */
  sourceAt: Point;
  targetAt: Point;
  /** Stamped by GraphCanvas: the edge is in the selected neighborhood. */
  lit?: boolean;
  [key: string]: unknown;
}

/** Cubic spline through ELK's control points (start, then c1 c2 end per segment). */
function splinePath(points: Point[]): string {
  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i + 2 < points.length; i += 3) {
    const [a, b, c] = [points[i]!, points[i + 1]!, points[i + 2]!];
    d += ` C ${a.x} ${a.y}, ${b.x} ${b.y}, ${c.x} ${c.y}`;
  }
  return d;
}

/** The point halfway along a spline's middle segment, or a polyline's longest one. */
function midpoint(points: Point[], curve: boolean): Point {
  if (curve) {
    const segments = (points.length - 1) / 3;
    const i = Math.floor((segments - 1) / 2) * 3;
    const [p0, p1, p2, p3] = [points[i]!, points[i + 1]!, points[i + 2]!, points[i + 3]!];
    const at = (k: "x" | "y") => (p0[k] + 3 * p1[k] + 3 * p2[k] + p3[k]) / 8;
    return segments % 2 === 1 ? { x: at("x"), y: at("y") } : p0;
  }
  let best = 0;
  let mid = points[0]!;
  for (let i = 1; i < points.length; i++) {
    const [a, b] = [points[i - 1]!, points[i]!];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    if (length > best) {
      best = length;
      mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    }
  }
  return mid;
}

/** An orthogonal polyline with rounded corners (radius capped by the segment lengths). */
function roundedPath(points: Point[], radius = 6): string {
  if (points.length < 2) return "";
  let d = `M ${points[0]!.x} ${points[0]!.y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [a, b, c] = [points[i - 1]!, points[i]!, points[i + 1]!];
    const r = Math.min(radius, Math.hypot(b.x - a.x, b.y - a.y) / 2, Math.hypot(c.x - b.x, c.y - b.y) / 2);
    const inX = b.x - Math.sign(b.x - a.x) * r;
    const inY = b.y - Math.sign(b.y - a.y) * r;
    const outX = b.x + Math.sign(c.x - b.x) * r;
    const outY = b.y + Math.sign(c.y - b.y) * r;
    d += ` L ${inX} ${inY} Q ${b.x} ${b.y} ${outX} ${outY}`;
  }
  const last = points[points.length - 1]!;
  return `${d} L ${last.x} ${last.y}`;
}

const moved = (actual: { x: number; y: number }, planned: Point) =>
  Math.abs(actual.x - planned.x) > 0.5 || Math.abs(actual.y - planned.y) > 0.5;

/**
 * An edge drawn along the route the layout computed, with its label where the
 * layout left room for it. Once either end is dragged off its laid-out spot,
 * the route no longer fits and the edge falls back to a straight floating line.
 */
export function RoutedEdge(props: EdgeProps) {
  const { id, source, target, style, markerEnd } = props;
  const data = props.data as RoutedEdgeData | undefined;
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  if (!sourceNode || !targetNode) return null;
  if (
    !data ||
    data.points.length < 2 ||
    moved(sourceNode.internals.positionAbsolute, data.sourceAt) ||
    moved(targetNode.internals.positionAbsolute, data.targetAt)
  ) {
    return <FloatingEdge {...props} data={{ ...props.data, revealLabel: data?.text, labelClass: "text-zinc-300" }} />;
  }
  const curve = data.curve === true && (data.points.length - 1) % 3 === 0;
  const label = data.labelAt ?? midpoint(data.points, curve);
  return (
    <>
      <BaseEdge id={id} path={curve ? splinePath(data.points) : roundedPath(data.points)} style={style} {...(markerEnd ? { markerEnd } : {})} />
      {data.text && data.lit && (
        <EdgeLabelRenderer>
          <div
            style={{ transform: `translate(-50%, -50%) translate(${label.x}px, ${label.y}px)` }}
            className="nodrag nopan pointer-events-none absolute bg-zinc-950/90 px-1 font-mono text-[11px] leading-[14px] text-zinc-200"
          >
            {data.text}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
