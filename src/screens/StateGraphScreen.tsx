import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
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
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

/** Above this many visible nodes the canvas asks for a narrower type set. */
const MAX_NODES = 600;
const EDGE_FETCH_LIMIT = 8000;

type StateNodeData = {
  entityType: string;
  entityId: string;
  title: string;
  status: string | undefined;
  layer: KitLayer | null;
  properties: Record<string, unknown>;
  [key: string]: unknown;
};

function StateNode({ data }: NodeProps<Node<StateNodeData>>) {
  const accent = data.layer ? LAYER_META[data.layer] : null;
  return (
    <div
      className={`max-w-44 rounded border px-2 py-1 text-left ${
        accent
          ? `${accent.border} ${accent.borderHover} bg-zinc-900`
          : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      <div className="flex items-center gap-1 text-[8px] uppercase tracking-wide text-zinc-500">
        {accent && (
          <span title={accent.label} className={`h-1 w-1 shrink-0 rounded-full ${accent.dot}`} />
        )}
        {data.entityType}
      </div>
      <div className="flex items-center gap-1.5">
        {data.status && (
          <span
            title={humanize(data.status)}
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${SEGMENT_FILLS[toneFor(data.status)]}`}
          />
        )}
        <span className="truncate text-[10px] leading-4 text-zinc-200">{data.title}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

const nodeTypes = { stateNode: StateNode };

interface EdgeRow {
  from_type: string;
  from_id: string;
  to_type: string;
  to_id: string;
  relationship_type: string;
  edge_key: number;
  metadata?: { assertion?: { review?: { status?: string } } };
}

/**
 * Cluster-by-type layout: each type's rows form a near-square grid, and the
 * cluster blocks pack left-to-right into rows of a roughly square overall
 * canvas — dense like a treemap, not a sparse ring, so edges stay short and
 * fit-view zoom keeps labels legible. Deterministic: the same state always
 * draws the same picture.
 */
function layoutClusters(
  byType: Map<string, Array<{ id: string; data: StateNodeData }>>,
): Node<StateNodeData>[] {
  const COL_W = 180;
  const ROW_H = 46;
  const GAP_X = 140;
  const GAP_Y = 120;

  const clusters = [...byType.entries()]
    .filter(([, rows]) => rows.length > 0)
    .map(([type, rows]) => {
      const cols = Math.ceil(Math.sqrt(rows.length));
      return {
        type,
        rows,
        cols,
        width: cols * COL_W,
        height: Math.ceil(rows.length / cols) * ROW_H,
      };
    })
    .sort((a, b) => b.rows.length - a.rows.length);

  const totalArea = clusters.reduce((s, c) => s + (c.width + GAP_X) * (c.height + GAP_Y), 0);
  const targetRowWidth = Math.max(Math.sqrt(totalArea) * 1.3, ...clusters.map((c) => c.width));

  const nodes: Node<StateNodeData>[] = [];
  let x = 0;
  let y = 0;
  let rowHeight = 0;
  for (const cluster of clusters) {
    if (x > 0 && x + cluster.width > targetRowWidth) {
      x = 0;
      y += rowHeight + GAP_Y;
      rowHeight = 0;
    }
    cluster.rows.forEach((row, i) => {
      nodes.push({
        id: row.id,
        type: "stateNode",
        position: {
          x: x + (i % cluster.cols) * COL_W,
          y: y + Math.floor(i / cluster.cols) * ROW_H,
        },
        data: row.data,
      });
    });
    x += cluster.width + GAP_X;
    rowHeight = Math.max(rowHeight, cluster.height);
  }
  return nodes;
}

/**
 * The complete state graph: every live entity and edge in the instance on one
 * canvas, clustered by type, with the shared GraphCanvas selection model —
 * same context panel, same hop-the-selection philosophy as the type map and
 * the per-entity graph. Hide-cold applies (this is an inspection surface, not
 * a receipted read). Beyond the node budget the screen asks for a narrower
 * type selection instead of drawing soup.
 */
export function StateGraphScreen() {
  const instanceId = useInstanceId();
  usePageTitle("State graph");
  const stats = useStats();
  const { settings } = useSettings();
  const layerColoring = useLayerColoring();
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = useMemo(() => {
    const raw = searchParams.get("types");
    return raw ? new Set(raw.split(",")) : null;
  }, [searchParams]);

  const statusCounts = (stats.data?.status_counts ?? {}) as Record<string, Record<string, number>>;
  // Visible-row estimate per type: total minus cold buckets when hiding cold.
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
  // the budget is spent, so every instance draws SOMETHING immediately —
  // the biggest types drop out rather than the whole canvas refusing. An
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
  // Auto-fit always draws (the per-type fetch cap bounds the pathological
  // one-giant-type case); only an explicit selection can refuse.
  const withinBudget =
    projectedNodes > 0 && (projectedNodes <= MAX_NODES || !typeFilter);

  const entityResults = useEntitiesForTypes(includedTypes, MAX_NODES, withinBudget);
  const edgeList = useEdgeList(EDGE_FETCH_LIMIT, withinBudget);

  function toggleType(type: string) {
    // Toggling starts from what is actually drawn, so turning one chip on or
    // off never silently resurrects the auto-excluded giants.
    const next = new Set(typeFilter ?? includedTypes);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    const sp = new URLSearchParams(searchParams);
    if (next.size === typeCounts.length) sp.delete("types");
    else sp.set("types", [...next].sort().join(","));
    setSearchParams(sp);
  }

  const { nodes, edges, droppedEdges } = useMemo(() => {
    const byType = new Map<string, Array<{ id: string; data: StateNodeData }>>();
    for (let i = 0; i < includedTypes.length; i++) {
      const type = includedTypes[i]!;
      const items = ((entityResults[i]?.data as { items?: unknown[] } | undefined)?.items ?? [])
        .filter(isEntityRef)
        .filter((e) => !settings.hideCold || !isColdEntity(e));
      byType.set(
        type,
        items.map((e) => ({
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
        })),
      );
    }
    const nodes = layoutClusters(byType);
    const present = new Set(nodes.map((n) => n.id));

    const rows = ((edgeList.data as { items?: EdgeRow[] } | undefined)?.items ?? []);
    let dropped = 0;
    const edges: Edge[] = [];
    for (const row of rows) {
      const source = `${row.from_type}:${row.from_id}`;
      const target = `${row.to_type}:${row.to_id}`;
      if (!present.has(source) || !present.has(target)) {
        dropped++;
        continue;
      }
      const reviewStatus = row.metadata?.assertion?.review?.status;
      const stroke = reviewStatus === "unreviewed" ? "#3f3f46" : "#10b981";
      edges.push({
        id: `e${row.edge_key}`,
        source,
        target,
        data: {
          relationshipType: row.relationship_type,
          reviewStatus: reviewStatus ?? null,
        },
        markerEnd: { type: MarkerType.ArrowClosed, width: 10, height: 10, color: stroke },
        style: { stroke, strokeWidth: 1 },
        animated: false,
      });
    }
    return { nodes, edges, droppedEdges: dropped };
  }, [entityResults, edgeList.data, includedTypes, settings.hideCold, layerColoring]);

  if (stats.isPending) return <LoadState />;
  if (stats.error) return <LoadState error={stats.error} />;

  const loading =
    withinBudget && (edgeList.isPending || entityResults.some((r) => r.isPending));

  const labelFor = (id: string) =>
    (nodes.find((n) => n.id === id)?.data as StateNodeData | undefined)?.title ?? id;

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    if (selection.kind === "node") {
      const node = nodes.find((n) => n.id === selection.id);
      if (!node) return null;
      const d = node.data as StateNodeData;
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
            <Link
              to={`/i/${instanceId}/g/${d.entityType}/${d.entityId}`}
              className={actionChipClass}
            >
              Focus neighborhood →
            </Link>
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
            ? `${nodes.length} entities · ${edges.length} edges · grey edge = unreviewed, green = accepted`
            : "The whole instance state on one canvas"}
          {droppedEdges > 0 && ` · ${droppedEdges} edges to excluded or hidden entities not drawn`}
        </span>
      </header>
      {typeCounts.length > 1 && (
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
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          renderPanel={renderPanel}
          className="min-h-0 flex-1"
          overlay={layerColoring.enabled ? <LayerLegend /> : undefined}
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
