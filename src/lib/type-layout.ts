import type { ElkExtendedEdge, ElkNode } from "elkjs/lib/elk-api";

/**
 * Left-to-right layout of the type map: Subject-valued ClaimType edges point
 * from the holding kind to the named kind, so a layered layout (ELK
 * `layered`, direction RIGHT, which breaks cycles itself) puts judgments and
 * work on the left, the systems they concern in the middle, and what
 * everything is about on the right. Kinds with no links to another kind sit
 * in one column to the left of the layers. ELK (~1.5 MB) loads on first use,
 * so it never weighs on the other screens.
 */

export interface LayoutNodeIn {
  id: string;
  width: number;
  height: number;
}

export interface LayoutEdgeIn {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface TypeLayout {
  positions: Map<string, Point>;
  /** Routed edges: the polyline ELK chose and where its label sits. */
  routes: Map<string, { points: Point[]; label: Point | null }>;
}

/** Monospace 12px label width estimate (the node and label fonts). */
export const monoWidth = (text: string, px = 12) => Math.ceil(text.length * px * 0.6);

const COLUMN_GAP = 120;
const ROW_GAP = 14;

let elkPromise: Promise<{ layout: (graph: ElkNode) => Promise<ElkNode> }> | null = null;

function loadElk() {
  elkPromise ??= import("elkjs/lib/elk.bundled.js").then(({ default: ELK }) => new ELK());
  return elkPromise;
}

export type LayoutEngine = "elk" | "dagre";

export async function layoutTypeGraph(
  nodes: LayoutNodeIn[],
  edges: LayoutEdgeIn[],
  engine: LayoutEngine = "elk",
): Promise<TypeLayout> {
  const linked = new Set<string>();
  for (const e of edges) {
    if (e.source === e.target) continue;
    linked.add(e.source);
    linked.add(e.target);
  }
  const layered = nodes.filter((n) => linked.has(n.id));
  const loose = nodes.filter((n) => !linked.has(n.id)).sort((a, b) => a.id.localeCompare(b.id));
  // Self-references stay out of the layering; the canvas draws them as loops.
  const crossing = edges.filter((e) => e.source !== e.target && linked.has(e.source) && linked.has(e.target));

  const positions = new Map<string, Point>();
  const routes: TypeLayout["routes"] = new Map();
  let minX = 0;
  let minY = 0;

  if (layered.length > 0 && engine === "dagre") {
    const { default: dagre } = await import("@dagrejs/dagre");
    const g = new dagre.graphlib.Graph({ multigraph: true });
    g.setGraph({ rankdir: "LR", ranksep: 80, nodesep: 36, edgesep: 10, ranker: "network-simplex" });
    g.setDefaultEdgeLabel(() => ({}));
    for (const n of layered) g.setNode(n.id, { width: n.width, height: n.height });
    for (const e of crossing) g.setEdge(e.source, e.target, {}, e.id);
    dagre.layout(g);
    for (const n of layered) {
      const placed = g.node(n.id);
      // dagre places node centres; the canvas wants top-left corners.
      positions.set(n.id, { x: placed.x - n.width / 2, y: placed.y - n.height / 2 });
    }
    for (const e of crossing) {
      const placed = g.edge({ v: e.source, w: e.target, name: e.id }) as { points?: Point[] } | undefined;
      if (placed?.points?.length) routes.set(e.id, { points: placed.points, label: null });
    }
  } else if (layered.length > 0) {
    const elk = await loadElk();
    const graph: ElkNode = {
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.edgeRouting": "SPLINES",
        "elk.layered.spacing.nodeNodeBetweenLayers": "80",
        "elk.layered.spacing.edgeNodeBetweenLayers": "18",
        "elk.layered.spacing.edgeEdgeBetweenLayers": "8",
        "elk.spacing.nodeNode": "36",
        "elk.spacing.edgeNode": "14",
        "elk.spacing.edgeEdge": "8",
        "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
        "elk.layered.crossingMinimization.greedySwitch.type": "TWO_SIDED",
        "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
        "elk.layered.cycleBreaking.strategy": "GREEDY",
        "elk.layered.mergeEdges": "false",
      },
      children: layered.map((n) => ({ id: n.id, width: n.width, height: n.height })),
      edges: crossing.map(
        (e): ElkExtendedEdge => ({
          id: e.id,
          sources: [e.source],
          targets: [e.target],
        }),
      ),
    };
    const out = await elk.layout(graph);
    for (const child of out.children ?? []) positions.set(child.id, { x: child.x ?? 0, y: child.y ?? 0 });
    for (const edge of out.edges ?? []) {
      const section = edge.sections?.[0];
      if (!section) continue;
      const label = edge.labels?.[0];
      routes.set(edge.id, {
        points: [section.startPoint, ...(section.bendPoints ?? []), section.endPoint],
        label:
          label && label.x !== undefined && label.y !== undefined
            ? { x: label.x + (label.width ?? 0) / 2, y: label.y + (label.height ?? 0) / 2 }
            : null,
      });
    }
  }

  // Unlinked kinds: one column left of the layers, in name order.
  if (loose.length > 0) {
    const width = Math.max(...loose.map((n) => n.width));
    const x = (positions.size > 0 ? Math.min(...[...positions.values()].map((p) => p.x)) : 0) - COLUMN_GAP - width;
    let y = 0;
    for (const n of loose) {
      positions.set(n.id, { x: x + (width - n.width), y });
      y += n.height + ROW_GAP;
    }
    minX = x;
  }
  minY = Math.min(0, ...[...positions.values()].map((p) => p.y));
  if (minX !== 0 || minY !== 0) {
    // Keep coordinates non-negative; routes move with their nodes.
    for (const [id, p] of positions) positions.set(id, { x: p.x - minX, y: p.y - minY });
    for (const [id, r] of routes) {
      routes.set(id, {
        points: r.points.map((p) => ({ x: p.x - minX, y: p.y - minY })),
        label: r.label && { x: r.label.x - minX, y: r.label.y - minY },
      });
    }
  }
  return { positions, routes };
}
