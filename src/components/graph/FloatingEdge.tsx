import { BaseEdge, EdgeLabelRenderer, useInternalNode, type EdgeProps } from "@xyflow/react";
import type { InternalNode } from "@xyflow/react";

function nodeCenter(node: InternalNode): { x: number; y: number } {
  const { width = 0, height = 0 } = node.measured ?? {};
  return {
    x: node.internals.positionAbsolute.x + width / 2,
    y: node.internals.positionAbsolute.y + height / 2,
  };
}

/** Point where the segment from this node's center toward `toward` exits the node's rect. */
function borderPoint(node: InternalNode, toward: { x: number; y: number }) {
  const c = nodeCenter(node);
  const { width = 0, height = 0 } = node.measured ?? {};
  const dx = toward.x - c.x;
  const dy = toward.y - c.y;
  if (dx === 0 && dy === 0) return c;
  const tx = dx !== 0 ? width / 2 / Math.abs(dx) : Number.POSITIVE_INFINITY;
  const ty = dy !== 0 ? height / 2 / Math.abs(dy) : Number.POSITIVE_INFINITY;
  const t = Math.min(tx, ty);
  return { x: c.x + dx * t, y: c.y + dy * t };
}

/**
 * Straight edge anchored at the node-border points facing each other, instead
 * of fixed top/bottom handles — kills the looping detours on radial layouts.
 * Self-references render as a small loop at the node's top-right corner.
 * `data.labelClass` overrides the label's text styling (e.g. dimmed counts).
 */
export function FloatingEdge({
  id,
  source,
  target,
  style,
  label,
  markerEnd,
  data,
}: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  if (!sourceNode || !targetNode) return null;

  let path: string;
  let labelX: number;
  let labelY: number;
  if (source === target) {
    const { width = 0 } = sourceNode.measured ?? {};
    const x = sourceNode.internals.positionAbsolute.x + width;
    const y = sourceNode.internals.positionAbsolute.y;
    path = `M ${x - 8} ${y} C ${x + 30} ${y - 30}, ${x + 30} ${y + 26}, ${x - 4} ${y + 10}`;
    labelX = x + 26;
    labelY = y - 2;
  } else {
    const s = borderPoint(sourceNode, nodeCenter(targetNode));
    const t = borderPoint(targetNode, nodeCenter(sourceNode));
    path = `M ${s.x} ${s.y} L ${t.x} ${t.y}`;
    labelX = (s.x + t.x) / 2;
    labelY = (s.y + t.y) / 2;
  }

  const labelClass =
    typeof (data as { labelClass?: unknown } | undefined)?.labelClass === "string"
      ? ((data as { labelClass: string }).labelClass)
      : "text-zinc-400";

  return (
    <>
      <BaseEdge id={id} path={path} style={style} {...(markerEnd ? { markerEnd } : {})} />
      {label != null && label !== "" && (
        <EdgeLabelRenderer>
          <div
            style={{ transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)` }}
            className={`nodrag nopan pointer-events-none absolute rounded bg-zinc-950/85 px-1 text-[9px] ${labelClass}`}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
