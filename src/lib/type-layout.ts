import type { ElkExtendedEdge, ElkNode } from "elkjs/lib/elk-api";

/**
 * Left-to-right layered layout (ELK `layered`, direction RIGHT, which breaks
 * cycles itself), shared by the graphs that read as a flow:
 *
 * - the type map: Subject-valued ClaimType edges point from the holding kind
 *   to the named kind, so judgments and work sit on the left, the systems
 *   they concern in the middle, and what everything is about on the right;
 *   kinds with no links sit in one column to the left of the layers;
 * - a Procedure (and a Line around it): steps along the references between
 *   them, edge labels placed by ELK, the authored step order kept where the
 *   references leave it free, and a Line's Triggers and parameters pinned to
 *   the first layer.
 *
 * ELK (~1.5 MB) loads on first use, so it never weighs on the other screens.
 */

export interface LayoutNodeIn {
  id: string;
  width: number;
  height: number;
  /** Pin the node to the first (leftmost) layer. */
  first?: boolean;
}

export interface LayoutEdgeIn {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface LayeredOptions {
  /** Nodes with no links to another node sit in one column left of the layers (else ELK places them). */
  looseColumn: boolean;
  /** Reserve room for each edge's label (12px mono, one line) and place it. */
  edgeLabels: boolean;
  /** Keep the input order of nodes where the edges leave it free. */
  modelOrder: boolean;
  /** Space between layers (default 80). */
  layerGap?: number;
}

const TYPE_MAP: LayeredOptions = { looseColumn: true, edgeLabels: false, modelOrder: false };

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

/** The type map's layout: unlinked kinds in their own column, labels shown by the canvas on selection. */
export function layoutTypeGraph(nodes: LayoutNodeIn[], edges: LayoutEdgeIn[]): Promise<TypeLayout> {
  return layoutLayered(nodes, edges, TYPE_MAP);
}

export async function layoutLayered(nodes: LayoutNodeIn[], edges: LayoutEdgeIn[], options: LayeredOptions): Promise<TypeLayout> {
  const linked = new Set<string>();
  for (const e of edges) {
    if (e.source === e.target) continue;
    linked.add(e.source);
    linked.add(e.target);
  }
  const inLayers = (id: string) => !options.looseColumn || linked.has(id);
  const layered = nodes.filter((n) => inLayers(n.id));
  const loose = nodes.filter((n) => !inLayers(n.id)).sort((a, b) => a.id.localeCompare(b.id));
  const known = new Set(layered.map((n) => n.id));
  // Self-references stay out of the layering; the canvas draws them as loops.
  const crossing = edges.filter((e) => e.source !== e.target && known.has(e.source) && known.has(e.target));

  const positions = new Map<string, Point>();
  const routes: TypeLayout["routes"] = new Map();
  let minX = 0;
  let minY = 0;

  if (layered.length > 0) {
    const elk = await loadElk();
    const graph: ElkNode = {
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.edgeRouting": "SPLINES",
        "elk.layered.spacing.nodeNodeBetweenLayers": String(options.layerGap ?? 80),
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
        ...(options.edgeLabels ? { "elk.edgeLabels.placement": "CENTER", "elk.spacing.edgeLabel": "2" } : {}),
        ...(options.modelOrder ? { "elk.layered.considerModelOrder.strategy": "NODES_AND_EDGES" } : {}),
        // Without the loose column, every node stays in one layering (a first-layer pin holds for an unlinked node too).
        ...(options.looseColumn ? {} : { "elk.separateConnectedComponents": "false" }),
      },
      children: layered.map((n) => ({
        id: n.id,
        width: n.width,
        height: n.height,
        ...(n.first ? { layoutOptions: { "elk.layered.layering.layerConstraint": "FIRST" } } : {}),
      })),
      edges: crossing.map(
        (e): ElkExtendedEdge => ({
          id: e.id,
          sources: [e.source],
          targets: [e.target],
          ...(options.edgeLabels && e.label
            ? { labels: [{ id: `${e.id}:label`, text: e.label, width: monoWidth(e.label, 11) + 8, height: 14 }] }
            : {}),
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
