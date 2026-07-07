import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Controls,
  Handle,
  MiniMap,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { useEdgeList, useEntitiesForTypes, useInstanceId, useStats } from "@/api/hooks";
import {
  EdgeGovernancePanel,
  edgeStroke,
  useGovernedRelationshipTypes,
  type EdgeMetadata,
} from "@/components/graph/EdgeGovernance";
import { isEntityRef } from "@/api/items";
import { entityPath } from "@/components/EntityLink";
import { MonoId } from "@/components/MonoId";
import { EmptyState, LoadState } from "@/components/Panel";
import { actionChipClass, toggleChipClass } from "@/components/Chip";
import { GraphCanvas, type GraphPanelApi, type GraphSelection } from "@/components/graph/GraphCanvas";
import {
  ConnectionList,
  PanelActions,
  PanelHeading,
  PanelSection,
  PropertyList,
} from "@/components/graph/PanelBits";
import { isColdEntity, isColdStatus } from "@/lib/cold";
import { LAYER_META, useLayerColoring, type KitLayer } from "@/lib/kit-layer";
import { useSettings } from "@/lib/settings";
import { humanize, matchesText } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

/** Dot nodes are cheap; cards carry text and need an order of magnitude less. */
const MAX_NODES_DOTS = 3000;
const MAX_NODES_CARDS = 600;
/** Card mode shows each type's best-connected members and folds the rest
 * into one overflow card — reading titles is the mode's whole point, so it
 * shows the members most worth reading. */
const CARDS_PER_TYPE = 40;
const EDGE_FETCH_LIMIT = 20000;

interface DotNodeCore {
  entityType: string;
  entityId: string;
  title: string;
  status: string | undefined;
  layer: KitLayer | null;
  properties: Record<string, unknown>;
}

type DotNodeData = DotNodeCore & {
  showLabel: boolean;
  matched: boolean;
  [key: string]: unknown;
};

function DotNode({ data }: NodeProps<Node<DotNodeData>>) {
  // No always-on text at dot density — identity comes from the legend, the
  // hover label, search rings, and the context panel. Entity hue is kit
  // layer only: status coloring is deliberately absent from the graph until
  // enum presentation semantics are config-owned (oq-enum-presentation-
  // semantics) — edge review state is the governance signal here.
  const accent = data.layer ? LAYER_META[data.layer] : null;
  const fill = accent?.dot ?? "bg-zinc-400";
  return (
    // Padded wrapper = a finger-sized click/drag target around a 12px dot.
    <div className="group relative p-1.5" title={`${data.entityType} · ${data.title}`}>
      {/* ReactFlow drops edges from handle-less nodes; FloatingEdge ignores
          handle positions, so these exist purely to register the node. */}
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      <div
        className={`h-3 w-3 rounded-full ${fill} ${
          data.matched ? "ring-2 ring-zinc-100" : ""
        }`}
      />
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
      <div
        className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-zinc-950/85 px-1 text-[9px] leading-3 text-zinc-300 ${
          data.matched ? "" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {data.title}
      </div>
    </div>
  );
}

function CardNode({ data }: NodeProps<Node<DotNodeData>>) {
  const accent = data.layer ? LAYER_META[data.layer] : null;
  return (
    <div
      className={`max-w-44 rounded border px-2 py-1 text-left ${
        accent
          ? `${accent.border} ${accent.borderHover} bg-zinc-900`
          : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
      } ${data.matched ? "ring-2 ring-zinc-100" : ""}`}
    >
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      <div className="flex items-center gap-1 text-[8px] uppercase tracking-wide text-zinc-500">
        {accent && (
          <span title={accent.label} className={`h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
        )}
        {data.entityType}
      </div>
      <div className="flex items-center gap-1.5">
        <span className="truncate text-[10px] leading-4 text-zinc-200">{data.title}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

function ClusterLabelNode({ data }: NodeProps<Node<{ label: string; count: number; [key: string]: unknown }>>) {
  return (
    <div className="pointer-events-none text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
      {data.label} <span className="font-mono normal-case text-zinc-600">{data.count}</span>
    </div>
  );
}

function OverflowNode({ data }: NodeProps<Node<{ entityType: string; count: number; [key: string]: unknown }>>) {
  const instanceId = useInstanceId();
  return (
    <Link
      to={`/i/${instanceId}/browse/${data.entityType}`}
      className="block max-w-44 rounded border border-dashed border-zinc-700 px-2 py-1 text-[10px] leading-4 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300"
    >
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      +{data.count} more · browse →
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
    </Link>
  );
}

const nodeTypes = {
  dot: DotNode,
  card: CardNode,
  clusterLabel: ClusterLabelNode,
  overflowCard: OverflowNode,
};

/**
 * Card-mode layout: each type is a labeled near-square grid of cards packed
 * left-to-right into rows of a roughly square canvas, with the type's
 * overflow card (when capped) as the grid's last cell.
 */
function layoutCardClusters(
  rows: Array<{ id: string; data: DotNodeCore }>,
  overflow: Map<string, number>,
  decorate: (row: { id: string; data: DotNodeCore }) => boolean,
): Node[] {
  const COL_W = 190;
  const ROW_H = 48;
  const GAP_X = 200;
  const GAP_Y = 170;
  const LABEL_H = 30;

  const byType = new Map<string, typeof rows>();
  for (const r of rows) {
    byType.set(r.data.entityType, [...(byType.get(r.data.entityType) ?? []), r]);
  }
  const clusters = [...byType.entries()]
    .map(([type, members]) => {
      const cells = members.length + (overflow.has(type) ? 1 : 0);
      const cols = Math.ceil(Math.sqrt(cells));
      return {
        type,
        members,
        cols,
        width: cols * COL_W,
        height: Math.ceil(cells / cols) * ROW_H + LABEL_H,
      };
    })
    .sort((a, b) => b.members.length - a.members.length);

  const totalArea = clusters.reduce((s, c) => s + (c.width + GAP_X) * (c.height + GAP_Y), 0);
  const targetRowWidth = Math.max(Math.sqrt(totalArea) * 1.35, ...clusters.map((c) => c.width));

  const nodes: Node[] = [];
  let x = 0;
  let y = 0;
  let rowHeight = 0;
  for (const cluster of clusters) {
    if (x > 0 && x + cluster.width > targetRowWidth) {
      x = 0;
      y += rowHeight + GAP_Y;
      rowHeight = 0;
    }
    nodes.push({
      id: `__label:${cluster.type}`,
      type: "clusterLabel",
      position: { x, y },
      selectable: false,
      draggable: false,
      data: {
        label: humanize(cluster.type),
        count: cluster.members.length + (overflow.get(cluster.type) ?? 0),
      },
    });
    cluster.members.forEach((row, i) => {
      nodes.push({
        id: row.id,
        type: "card",
        position: {
          x: x + (i % cluster.cols) * COL_W,
          y: y + LABEL_H + Math.floor(i / cluster.cols) * ROW_H,
        },
        data: { ...row.data, showLabel: true, matched: decorate(row) },
      });
    });
    if (overflow.has(cluster.type)) {
      const i = cluster.members.length;
      nodes.push({
        id: `__more:${cluster.type}`,
        type: "overflowCard",
        position: {
          x: x + (i % cluster.cols) * COL_W,
          y: y + LABEL_H + Math.floor(i / cluster.cols) * ROW_H,
        },
        selectable: false,
        data: { entityType: cluster.type, count: overflow.get(cluster.type)! },
      });
    }
    x += cluster.width + GAP_X;
    rowHeight = Math.max(rowHeight, cluster.height);
  }
  return nodes;
}

/**
 * Governance-first legend: edge review state is the signal this graph
 * exists to show; entity hue is kit layer only. Entity status coloring is
 * deliberately absent until enum presentation semantics are config-owned
 * (oq-enum-presentation-semantics).
 */
function GraphLegend({ layersOn }: { layersOn: boolean }) {
  const section = "text-[9px] font-semibold uppercase tracking-wider text-zinc-600";
  const row = "inline-flex items-center gap-1.5";
  return (
    <div className="flex flex-col gap-1 rounded border border-zinc-800 bg-zinc-950/90 px-2 py-1.5 text-[10px] text-zinc-400">
      <span className={section}>Governed edges — review state</span>
      <span className={row}>
        <span className="h-px w-3 bg-emerald-500" /> Approved
      </span>
      <span className={row}>
        <span className="h-px w-3 bg-amber-400" /> Unreviewed / pending
      </span>
      <span className={row}>
        <span className="h-px w-3 bg-red-500" /> Rejected
      </span>
      <span className={`${section} mt-1`}>Deterministic edges</span>
      <span className={row}>
        <span className="h-px w-3 bg-zinc-500" /> Direct write · review n/a
      </span>
      <span className={row}>
        <span
          className="w-3 border-t border-dashed border-zinc-500"
          style={{ height: 0 }}
        />{" "}
        Inactive lifecycle
      </span>
      <span className={`${section} mt-1`}>Entities — kit layer</span>
      {layersOn ? (
        <>
          <span className={row}>
            <span className={`h-1.5 w-1.5 rounded-full ${LAYER_META.base.dot}`} /> {LAYER_META.base.label}
          </span>
          <span className={row}>
            <span className={`h-1.5 w-1.5 rounded-full ${LAYER_META.domain.dot}`} /> {LAYER_META.domain.label}
          </span>
        </>
      ) : (
        <span className={row}>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" /> Entity
        </span>
      )}
    </div>
  );
}

interface EdgeRow {
  from_type: string;
  from_id: string;
  to_type: string;
  to_id: string;
  relationship_type: string;
  edge_key: number;
  properties?: Record<string, unknown> | null;
  metadata?: EdgeMetadata | null;
}

interface SimNode extends SimulationNodeDatum {
  id: string;
}

/**
 * Static force layout: d3-force's deterministic phyllotaxis seeding plus a
 * fixed tick budget, run synchronously at build time — organic clusters
 * without physics running in the render loop, and the same state always
 * draws the same picture.
 */
function forceLayout(
  ids: string[],
  links: Array<{ source: string; target: string }>,
): Map<string, { x: number; y: number }> {
  const simNodes: SimNode[] = ids.map((id) => ({ id }));
  const simLinks: Array<SimulationLinkDatum<SimNode>> = links.map((l) => ({ ...l }));
  const sim = forceSimulation(simNodes)
    .force("charge", forceManyBody().strength(-45).distanceMax(600))
    .force(
      "link",
      forceLink<SimNode, SimulationLinkDatum<SimNode>>(simLinks)
        .id((d) => d.id)
        .distance(55)
        .strength(0.4),
    )
    .force("x", forceX(0).strength(0.06))
    .force("y", forceY(0).strength(0.06))
    .force("collide", forceCollide(10))
    .stop();
  const ticks = ids.length > 800 ? 90 : 160;
  for (let i = 0; i < ticks; i++) sim.tick();
  return new Map(simNodes.map((n) => [n.id, { x: n.x ?? 0, y: n.y ?? 0 }]));
}

/** Node ids within `hops` of `rootId` over the drawn edges. */
function neighborhood(
  rootId: string,
  edges: Array<{ source: string; target: string }>,
  hops: number,
): Set<string> {
  const adjacency = new Map<string, string[]>();
  for (const e of edges) {
    adjacency.set(e.source, [...(adjacency.get(e.source) ?? []), e.target]);
    adjacency.set(e.target, [...(adjacency.get(e.target) ?? []), e.source]);
  }
  const seen = new Set([rootId]);
  let frontier = [rootId];
  for (let hop = 0; hop < hops; hop++) {
    const next: string[] = [];
    for (const id of frontier) {
      for (const nb of adjacency.get(id) ?? []) {
        if (!seen.has(nb)) {
          seen.add(nb);
          next.push(nb);
        }
      }
    }
    frontier = next;
  }
  return seen;
}

/**
 * The complete state graph: every live entity and edge on one canvas as
 * status-colored dots under a static force layout, with the shared
 * GraphCanvas selection model. Search highlights and jumps; "Isolate
 * neighborhood" (URL state) cuts the canvas down to k hops around one
 * entity. Hide-cold applies; auto-fit drops the biggest types when an
 * instance exceeds the node budget.
 */
export function StateGraphScreen() {
  const instanceId = useInstanceId();
  usePageTitle("State graph");
  const stats = useStats();
  const { settings } = useSettings();
  const layerColoring = useLayerColoring();
  const governedTypes = useGovernedRelationshipTypes();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectRequest, setSelectRequest] = useState<{ id: string; nonce: number } | null>(null);

  const typeFilter = useMemo(() => {
    const raw = searchParams.get("types");
    return raw ? new Set(raw.split(",")) : null;
  }, [searchParams]);
  const focus = searchParams.get("focus");
  const hops = Number(searchParams.get("hops") ?? 1) === 2 ? 2 : 1;
  // Two explicit renderings of the same graph: text-free dots for the whole
  // instance, constrained cards when titles should read at a glance.
  const mode: "dots" | "cards" = searchParams.get("view") === "cards" ? "cards" : "dots";
  const maxNodes = mode === "cards" ? MAX_NODES_CARDS : MAX_NODES_DOTS;

  function setMode(next: "dots" | "cards") {
    const sp = new URLSearchParams(searchParams);
    if (next === "cards") sp.set("view", "cards");
    else sp.delete("view");
    setSearchParams(sp);
  }

  const statusCounts = (stats.data?.status_counts ?? {}) as Record<string, Record<string, number>>;
  const typeCounts = useMemo(
    () =>
      Object.entries(stats.data?.entity_counts ?? {})
        .map(([type, count]): [string, number] => {
          if (!settings.hideCold) return [type, count];
          const cold = Object.entries(statusCounts[type] ?? {})
            .filter(([status]) => isColdStatus(status))
            .reduce((s, [, n]) => s + n, 0);
          return [type, Math.max(0, count - cold)];
        })
        .filter(([, count]) => count > 0),
    [stats.data, settings.hideCold, statusCounts],
  );

  // With no explicit selection, auto-fit: include types smallest-first until
  // the budget is spent, so every instance draws SOMETHING immediately. An
  // explicit over-budget selection still gets the refusal message.
  const { includedTypes, autoExcluded } = useMemo(() => {
    if (typeFilter) {
      return {
        includedTypes: typeCounts.filter(([t]) => typeFilter.has(t)).map(([t]) => t),
        autoExcluded: [] as string[],
      };
    }
    const ascending = [...typeCounts].sort((a, b) => a[1] - b[1]);
    const included: string[] = [];
    let used = 0;
    for (const [type, count] of ascending) {
      // Card mode's per-type cap means a giant type only costs its cap.
      const cost = mode === "cards" ? Math.min(count, CARDS_PER_TYPE) : count;
      if (included.length > 0 && used + cost > maxNodes) continue;
      included.push(type);
      used += cost;
    }
    const order = typeCounts.map(([t]) => t);
    return {
      includedTypes: order.filter((t) => included.includes(t)),
      autoExcluded: order.filter((t) => !included.includes(t)),
    };
  }, [typeCounts, typeFilter, mode, maxNodes]);

  const projectedNodes = typeCounts
    .filter(([type]) => includedTypes.includes(type))
    .reduce(
      (s, [, n]) => s + (mode === "cards" ? Math.min(n, CARDS_PER_TYPE) : n),
      0,
    );
  const withinBudget =
    projectedNodes > 0 && (projectedNodes <= maxNodes || !typeFilter);

  const entityResults = useEntitiesForTypes(includedTypes, MAX_NODES_DOTS, withinBudget);
  const edgeList = useEdgeList(EDGE_FETCH_LIMIT, withinBudget);

  function toggleType(type: string) {
    const next = new Set(typeFilter ?? includedTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    const sp = new URLSearchParams(searchParams);
    if (next.size === typeCounts.length) sp.delete("types");
    else sp.set("types", [...next].sort().join(","));
    setSearchParams(sp);
  }

  function setFocus(nodeId: string | null, nextHops?: number) {
    const sp = new URLSearchParams(searchParams);
    if (nodeId) sp.set("focus", nodeId);
    else sp.delete("focus");
    if (nodeId && (nextHops ?? hops) === 2) sp.set("hops", "2");
    else sp.delete("hops");
    setSearchParams(sp);
  }

  // Entity rows + edge rows → drawn graph, in stages: collect, isolate,
  // layout. All pure derivation from fetch results + URL state.
  const { nodes: baseNodes, edges, droppedEdges } = useMemo(() => {
    const rows: Array<{ id: string; data: DotNodeCore }> = [];
    for (let i = 0; i < includedTypes.length; i++) {
      const items = ((entityResults[i]?.data as { items?: unknown[] } | undefined)?.items ?? [])
        .filter(isEntityRef)
        .filter((e) => !settings.hideCold || !isColdEntity(e));
      for (const e of items) {
        rows.push({
          id: `${e.entity_type}:${e.entity_id}`,
          data: {
            entityType: e.entity_type,
            entityId: e.entity_id,
            title:
              typeof e.properties?.title === "string"
                ? e.properties.title
                : typeof e.properties?.name === "string"
                  ? e.properties.name
                  : e.entity_id,
            status:
              typeof e.properties?.status === "string" ? e.properties.status : undefined,
            layer: layerColoring.enabled ? layerColoring.layerFor(e.entity_type) : null,
            properties: (e.properties ?? {}) as Record<string, unknown>,
          },
        });
      }
    }
    let present = new Set(rows.map((r) => r.id));

    const edgeRows = ((edgeList.data as { items?: EdgeRow[] } | undefined)?.items ?? []);
    let dropped = 0;
    let links: Array<{ row: EdgeRow; source: string; target: string }> = [];
    for (const row of edgeRows) {
      const source = `${row.from_type}:${row.from_id}`;
      const target = `${row.to_type}:${row.to_id}`;
      if (!present.has(source) || !present.has(target)) {
        dropped++;
        continue;
      }
      links.push({ row, source, target });
    }

    // Isolation cuts nodes AND edges to the k-hop neighborhood before layout,
    // so the focused view relaxes into its own shape.
    if (focus && present.has(focus)) {
      const keep = neighborhood(focus, links, hops);
      present = new Set([...present].filter((id) => keep.has(id)));
      links = links.filter((l) => present.has(l.source) && present.has(l.target));
    }
    let drawnRows = rows.filter((r) => present.has(r.id));

    // Card mode constraint: keep each type's best-connected members (degree
    // over the drawn edges), fold the rest into one overflow card per type.
    const overflow = new Map<string, number>();
    if (mode === "cards") {
      const degree = new Map<string, number>();
      for (const l of links) {
        degree.set(l.source, (degree.get(l.source) ?? 0) + 1);
        degree.set(l.target, (degree.get(l.target) ?? 0) + 1);
      }
      const byType = new Map<string, typeof drawnRows>();
      for (const r of drawnRows) {
        byType.set(r.data.entityType, [...(byType.get(r.data.entityType) ?? []), r]);
      }
      const kept: typeof drawnRows = [];
      for (const [type, members] of byType) {
        // Focused views are already small — never fold a neighborhood member.
        if (focus || members.length <= CARDS_PER_TYPE) {
          kept.push(...members);
          continue;
        }
        const sorted = [...members].sort(
          (a, b) =>
            (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0) || a.id.localeCompare(b.id),
        );
        kept.push(...sorted.slice(0, CARDS_PER_TYPE));
        overflow.set(type, members.length - CARDS_PER_TYPE);
      }
      const keptIds = new Set(kept.map((r) => r.id));
      dropped += links.filter(
        (l) => !keptIds.has(l.source) || !keptIds.has(l.target),
      ).length;
      links = links.filter((l) => keptIds.has(l.source) && keptIds.has(l.target));
      drawnRows = kept;
    }

    let nodes: Node[];
    if (mode === "cards") {
      nodes = layoutCardClusters(drawnRows, overflow, () => false);
    } else {
      const positions = forceLayout(
        drawnRows.map((r) => r.id),
        links.map((l) => ({ source: l.source, target: l.target })),
      );
      nodes = drawnRows.map((r) => ({
        id: r.id,
        type: "dot",
        position: positions.get(r.id) ?? { x: 0, y: 0 },
        data: { ...r.data, showLabel: false, matched: false },
      }));
    }

    // No arrowheads at dot density — direction lives in the context panel.
    // Stroke alpha carries softness: GraphCanvas owns style.opacity for its
    // selection dimming and would clobber a base opacity here.
    const edges: Edge[] = links.map(({ row, source, target }) => {
      const governed = governedTypes.has(row.relationship_type);
      return {
        id: `e${row.edge_key}`,
        source,
        target,
        data: { row, governed },
        style: {
          ...edgeStroke(
            governed,
            row.metadata?.assertion?.review?.status,
            row.metadata?.assertion?.lifecycle?.status,
          ),
          strokeWidth: 1.5,
        },
        animated: false,
      };
    });
    return { nodes: nodes, edges, droppedEdges: dropped };
    // search is deliberately NOT a dependency: layout is expensive and match
    // decoration happens in the cheap pass below.
  }, [entityResults, edgeList.data, includedTypes, settings.hideCold, layerColoring, focus, hops, mode, governedTypes]);

  // Cheap per-keystroke pass: stamp search matches onto the laid-out nodes.
  const { nodes, matchCount } = useMemo(() => {
    const q = search.trim();
    if (q === "") return { nodes: baseNodes, matchCount: 0 };
    let matches = 0;
    const nodes = baseNodes.map((n) => {
      const d = n.data as { entityId?: string; title?: string };
      if (typeof d.entityId !== "string") return n;
      const matched = matchesText([d.entityId, d.title], q);
      if (matched) matches++;
      return matched ? { ...n, data: { ...n.data, matched: true } } : n;
    });
    return { nodes, matchCount: matches };
  }, [baseNodes, search]);

  if (stats.isPending) return <LoadState />;
  if (stats.error) return <LoadState error={stats.error} />;

  const loading =
    withinBudget && (edgeList.isPending || entityResults.some((r) => r.isPending));

  const labelFor = (id: string) =>
    (nodes.find((n) => n.id === id)?.data as DotNodeData | undefined)?.title ?? id;

  function jumpToFirstMatch() {
    const first = nodes.find((n) => (n.data as DotNodeData).matched);
    if (first) setSelectRequest({ id: first.id, nonce: Date.now() });
  }

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    if (selection.kind === "node") {
      const node = nodes.find((n) => n.id === selection.id);
      // Synthetic cluster labels / overflow cards carry no entity.
      if (!node || typeof (node.data as { entityId?: unknown }).entityId !== "string")
        return null;
      const d = node.data as DotNodeData;
      return (
        <div>
          <PanelHeading kicker={d.entityType} title={d.title} />
          <div className="break-all">
            <MonoId id={d.entityId} />
          </div>
          <PanelActions>
            <Link to={entityPath(instanceId, d.entityType, d.entityId)} className={actionChipClass}>
              Open entity →
            </Link>
            {focus === selection.id ? (
              <button onClick={() => setFocus(null)} className={actionChipClass}>
                Show whole graph
              </button>
            ) : (
              <button onClick={() => setFocus(selection.id)} className={actionChipClass}>
                Isolate neighborhood
              </button>
            )}
          </PanelActions>
          <PanelSection title="Properties">
            <PropertyList properties={d.properties} omit={["title"]} />
          </PanelSection>
          <PanelSection title="Connections">
            <ConnectionList
              nodeId={selection.id}
              edges={edges.map((e) => ({
                ...e,
                label: (e.data as { row?: EdgeRow } | undefined)?.row?.relationship_type,
              }))}
              api={api}
              labelFor={labelFor}
            />
          </PanelSection>
        </div>
      );
    }
    const edge = edges.find((e) => e.id === selection.id);
    if (!edge) return null;
    const { row, governed } = edge.data as { row: EdgeRow; governed: boolean };
    return (
      <EdgeGovernancePanel
        relationshipType={row.relationship_type}
        governed={governed}
        properties={row.properties ?? null}
        metadata={row.metadata ?? null}
        sourceLabel={labelFor(edge.source)}
        targetLabel={labelFor(edge.target)}
        onSelectSource={() => api.select(edge.source)}
        onSelectTarget={() => api.select(edge.target)}
      />
    );
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">State graph</h1>
        <span className="text-[11px] text-zinc-600">
          {withinBudget
            ? `${nodes.length} entities · ${edges.length} edges`
            : "The whole instance state on one canvas"}
          {droppedEdges > 0 && !focus && ` · ${droppedEdges} edges to excluded or hidden entities not drawn`}
        </span>
        <span className="ml-auto flex items-center gap-2">
          <span className="inline-flex overflow-hidden rounded border border-zinc-800 text-[11px]">
            {(["dots", "cards"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-2 py-px ${
                  mode === m ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {m === "dots" ? "Dots" : "Cards"}
              </button>
            ))}
          </span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") jumpToFirstMatch();
            }}
            placeholder="Find in graph…"
            className="w-44 rounded border border-zinc-800 bg-transparent px-2 py-0.5 text-[12px] text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-600"
          />
          {search.trim() !== "" && (
            <span className="text-[11px] text-zinc-500">
              {matchCount} {matchCount === 1 ? "match" : "matches"}
              {matchCount > 0 && " · Enter jumps"}
            </span>
          )}
        </span>
      </header>
      {focus && (
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] text-zinc-400">
          <span>
            Focused on <span className="text-zinc-200">{labelFor(focus)}</span>
          </span>
          <span className="inline-flex overflow-hidden rounded border border-zinc-800 text-[11px]">
            {[1, 2].map((h) => (
              <button
                key={h}
                onClick={() => setFocus(focus, h)}
                className={`px-2 py-px ${
                  hops === h ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {h} hop{h > 1 ? "s" : ""}
              </button>
            ))}
          </span>
          <button onClick={() => setFocus(null)} className={actionChipClass}>
            Show whole graph
          </button>
        </div>
      )}
      {!focus && typeCounts.length > 1 && (
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          {typeCounts.map(([type, count]) => {
            const active = includedTypes.includes(type);
            return (
              <button key={type} onClick={() => toggleType(type)} className={toggleChipClass(active)}>
                {humanize(type)} <span className="font-mono text-[10px] text-zinc-500">{count}</span>
              </button>
            );
          })}
          {autoExcluded.length > 0 && (
            <span className="text-[11px] text-zinc-600">
              {autoExcluded.map(humanize).join(", ")} left out to fit the {maxNodes}-node budget —
              toggle chips to trade
            </span>
          )}
        </div>
      )}
      {!withinBudget && projectedNodes > 0 && (
        <EmptyState>
          {projectedNodes.toLocaleString()} entities selected — this view draws up to {maxNodes}.
          Narrow the type chips above (or hide cold entities in Settings) to bring the selection
          under budget.
        </EmptyState>
      )}
      {projectedNodes === 0 && <EmptyState>No live entities in the selected types.</EmptyState>}
      {loading && <LoadState />}
      {withinBudget && !loading && (
        <GraphCanvas
          // Remount on graph-identity change so fit-view reframes the new shape
          // (mode switch, focus in/out, hop change, type trades).
          key={`${mode}:${focus ?? "all"}:${hops}:${includedTypes.join("|")}`}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          renderPanel={renderPanel}
          className="min-h-0 flex-1"
          overlay={<GraphLegend layersOn={layerColoring.enabled} />}
          selectRequest={selectRequest}
        >
          <Controls showInteractive={false} className="!shadow-none" />
          <MiniMap
            pannable
            zoomable
            className="!h-24 !w-36"
            bgColor="#09090b"
            maskColor="rgba(24,24,27,0.7)"
            nodeColor="#3f3f46"
          />
        </GraphCanvas>
      )}
    </div>
  );
}
