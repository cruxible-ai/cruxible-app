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
import { isEntityRef } from "@/api/items";
import { entityPath } from "@/components/EntityLink";
import { MonoId } from "@/components/MonoId";
import { EmptyState, LoadState } from "@/components/Panel";
import {
  actionChipClass,
  Chip,
  SEGMENT_FILLS,
  toggleChipClass,
  toneFor,
} from "@/components/Chip";
import { GraphCanvas, type GraphPanelApi, type GraphSelection } from "@/components/graph/GraphCanvas";
import { LayerLegend } from "@/components/graph/LayerLegend";
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

/** Dot nodes are cheap: the budget is an order of magnitude past the cards'. */
const MAX_NODES = 3000;
const EDGE_FETCH_LIMIT = 20000;
/** Below this many drawn nodes every dot carries its label; above, labels
 * appear on hover, selection, and search matches. */
const LABELS_ALWAYS_BELOW = 250;

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
  // Status is the primary signal; entities without one (reference rows,
  // assessments) take their kit layer's hue so composed instances read as
  // strata rather than a single undifferentiated cloud.
  const accent = data.layer ? LAYER_META[data.layer] : null;
  const fill = data.status
    ? SEGMENT_FILLS[toneFor(data.status)]
    : (accent?.dot ?? "bg-zinc-500");
  return (
    <div className="group relative">
      {/* ReactFlow drops edges from handle-less nodes; FloatingEdge ignores
          handle positions, so these exist purely to register the node. */}
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      <div
        title={`${data.entityType} · ${data.title}`}
        className={`h-3 w-3 rounded-full ${fill} ${
          data.matched ? "ring-2 ring-zinc-100" : ""
        }`}
      />
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
      <div
        className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-zinc-950/85 px-1 text-[9px] leading-3 text-zinc-300 ${
          data.showLabel || data.matched ? "" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {data.title}
      </div>
    </div>
  );
}

const nodeTypes = { dot: DotNode };

interface EdgeRow {
  from_type: string;
  from_id: string;
  to_type: string;
  to_id: string;
  relationship_type: string;
  edge_key: number;
  metadata?: { assertion?: { review?: { status?: string } } };
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
  const ticks = ids.length > 1200 ? 120 : 250;
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectRequest, setSelectRequest] = useState<{ id: string; nonce: number } | null>(null);

  const typeFilter = useMemo(() => {
    const raw = searchParams.get("types");
    return raw ? new Set(raw.split(",")) : null;
  }, [searchParams]);
  const focus = searchParams.get("focus");
  const hops = Number(searchParams.get("hops") ?? 1) === 2 ? 2 : 1;

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
      if (included.length > 0 && used + count > MAX_NODES) continue;
      included.push(type);
      used += count;
    }
    const order = typeCounts.map(([t]) => t);
    return {
      includedTypes: order.filter((t) => included.includes(t)),
      autoExcluded: order.filter((t) => !included.includes(t)),
    };
  }, [typeCounts, typeFilter]);

  const projectedNodes = typeCounts
    .filter(([type]) => includedTypes.includes(type))
    .reduce((s, [, n]) => s + n, 0);
  const withinBudget =
    projectedNodes > 0 && (projectedNodes <= MAX_NODES || !typeFilter);

  const entityResults = useEntitiesForTypes(includedTypes, MAX_NODES, withinBudget);
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
  // layout, decorate. All pure derivation from fetch results + URL state.
  const { nodes, edges, droppedEdges, matchCount } = useMemo(() => {
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
    const drawnRows = rows.filter((r) => present.has(r.id));

    const positions = forceLayout(
      drawnRows.map((r) => r.id),
      links.map((l) => ({ source: l.source, target: l.target })),
    );

    const showLabels = drawnRows.length <= LABELS_ALWAYS_BELOW;
    let matches = 0;
    const nodes: Node<DotNodeData>[] = drawnRows.map((r) => {
      const matched =
        search.trim() !== "" && matchesText([r.data.entityId, r.data.title], search);
      if (matched) matches++;
      return {
        id: r.id,
        type: "dot",
        position: positions.get(r.id) ?? { x: 0, y: 0 },
        data: { ...r.data, showLabel: showLabels, matched },
      };
    });

    // No arrowheads at dot density — direction lives in the context panel.
    const edges: Edge[] = links.map(({ row, source, target }) => {
      const reviewStatus = row.metadata?.assertion?.review?.status;
      // Softness lives in the stroke alpha: GraphCanvas owns style.opacity
      // for its selection dimming and would clobber a base opacity here.
      const stroke =
        reviewStatus === "unreviewed" ? "rgba(140,140,152,0.45)" : "rgba(16,185,129,0.55)";
      return {
        id: `e${row.edge_key}`,
        source,
        target,
        data: {
          relationshipType: row.relationship_type,
          reviewStatus: reviewStatus ?? null,
        },
        style: { stroke, strokeWidth: 1.2 },
        animated: false,
      };
    });
    return { nodes, edges, droppedEdges: dropped, matchCount: matches };
  }, [entityResults, edgeList.data, includedTypes, settings.hideCold, layerColoring, focus, hops, search]);

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
      if (!node) return null;
      const d = node.data as DotNodeData;
      return (
        <div>
          <PanelHeading kicker={d.entityType} title={d.title} />
          <div className="break-all">
            <MonoId id={d.entityId} />
          </div>
          {d.status && (
            <div className="mt-1">
              <Chip value={d.status} />
            </div>
          )}
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
            <PropertyList properties={d.properties} omit={["title", "status"]} />
          </PanelSection>
          <PanelSection title="Connections">
            <ConnectionList
              nodeId={selection.id}
              edges={edges.map((e) => ({
                ...e,
                label: (e.data as { relationshipType?: string } | undefined)?.relationshipType,
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
    const data = edge.data as { relationshipType?: string; reviewStatus?: string | null };
    return (
      <div>
        <PanelHeading
          kicker="Relationship"
          title={(data.relationshipType ?? "").replaceAll("_", " ")}
        />
        <div className="flex flex-col gap-0.5 text-[12px]">
          <button
            onClick={() => api.select(edge.source)}
            className="text-left text-zinc-300 hover:underline"
          >
            {labelFor(edge.source)}
          </button>
          <span className="text-zinc-600">↓</span>
          <button
            onClick={() => api.select(edge.target)}
            className="text-left text-zinc-300 hover:underline"
          >
            {labelFor(edge.target)}
          </button>
        </div>
        <PanelSection title="Review status">
          <Chip value={data.reviewStatus ?? "live"} />
        </PanelSection>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">State graph</h1>
        <span className="text-[11px] text-zinc-600">
          {withinBudget
            ? `${nodes.length} entities · ${edges.length} edges · dot = status · grey edge = unreviewed, green = accepted`
            : "The whole instance state on one canvas"}
          {droppedEdges > 0 && !focus && ` · ${droppedEdges} edges to excluded or hidden entities not drawn`}
        </span>
        <span className="ml-auto flex items-center gap-2">
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
              {autoExcluded.map(humanize).join(", ")} left out to fit the {MAX_NODES}-node budget —
              toggle chips to trade
            </span>
          )}
        </div>
      )}
      {!withinBudget && projectedNodes > 0 && (
        <EmptyState>
          {projectedNodes.toLocaleString()} entities selected — the canvas draws up to {MAX_NODES}.
          Narrow the type chips above (or hide cold entities in Settings) to bring the selection
          under budget.
        </EmptyState>
      )}
      {projectedNodes === 0 && <EmptyState>No live entities in the selected types.</EmptyState>}
      {loading && <LoadState />}
      {withinBudget && !loading && (
        <GraphCanvas
          // Remount on graph-identity change so fit-view reframes the new shape
          // (focus in/out, hop change, type trades).
          key={`${focus ?? "all"}:${hops}:${includedTypes.join("|")}`}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          renderPanel={renderPanel}
          className="min-h-0 flex-1"
          overlay={layerColoring.enabled ? <LayerLegend /> : undefined}
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
