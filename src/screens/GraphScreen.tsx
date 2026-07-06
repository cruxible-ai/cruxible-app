import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
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
import { useInspectEntity, useInstanceId } from "@/api/hooks";
import { entityPath } from "@/components/EntityLink";
import { MonoId } from "@/components/MonoId";
import { LoadState } from "@/components/Panel";
import { PanelRight } from "lucide-react";
import { isEntityRef } from "@/api/items";
import {
  actionChipClass,
  Chip,
  SEGMENT_FILLS,
  toggleChipClass,
  toneFor,
} from "@/components/Chip";
import { GraphCanvas, type GraphPanelApi, type GraphSelection } from "@/components/graph/GraphCanvas";
import { LayerLegend } from "@/components/graph/LayerLegend";
import { LAYER_META, useLayerColoring, type KitLayer } from "@/lib/kit-layer";
import {
  ConnectionList,
  PanelActions,
  PanelHeading,
  PanelSection,
  PropertyList,
} from "@/components/graph/PanelBits";
import { usePageTitle } from "@/lib/usePageTitle";

interface NeighborForGraph {
  direction: "incoming" | "outgoing";
  relationship_type: string;
  edge_key: number;
  metadata: { assertion?: { review?: { status?: string } } };
  entity: unknown;
}

type EntityNodeData = {
  entityType: string;
  entityId: string;
  title: string;
  status: string | undefined;
  isCenter: boolean;
  /** Owning kit layer; null when layer coloring is off. */
  layer: KitLayer | null;
  properties: Record<string, unknown>;
  [key: string]: unknown;
};

function EntityNode({ data }: NodeProps<Node<EntityNodeData>>) {
  // The center node keeps its emphasis border; layer accents carry via the
  // kicker dot there and via border tint on neighbors.
  const accent = data.layer ? LAYER_META[data.layer] : null;
  return (
    <div
      className={`max-w-52 rounded border px-2 py-1 text-left ${
        data.isCenter
          ? "border-zinc-400 bg-zinc-800"
          : accent
            ? `${accent.border} ${accent.borderHover} bg-zinc-900`
            : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-zinc-500">
        {accent && (
          <span
            title={accent.label}
            className={`h-1 w-1 shrink-0 rounded-full ${accent.dot}`}
          />
        )}
        {data.entityType}
      </div>
      <div className="flex items-center gap-1.5">
        {data.status && (
          <span
            title={data.status}
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${SEGMENT_FILLS[toneFor(data.status)]}`}
          />
        )}
        <span className="truncate text-[11px] leading-4 text-zinc-200">{data.title}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

const nodeTypes = { entity: EntityNode };

/**
 * Focused 1-hop neighborhood around one entity, radially laid out with
 * neighbors clustered by relationship type. Selection follows the shared
 * GraphCanvas model: click highlights and opens the context panel; moving the
 * graph's center to another entity is an explicit panel action, so the URL
 * stays the coarse selection. Deliberately not a whole-graph view —
 * legibility over analytics, per the work item.
 */
export function GraphScreen() {
  const { entityType = "", entityId = "" } = useParams();
  const instanceId = useInstanceId();
  const [searchParams, setSearchParams] = useSearchParams();
  const inspect = useInspectEntity(entityType, entityId);
  usePageTitle(`Graph — ${entityId}`);
  const layerColoring = useLayerColoring();

  // Relationship-type filter lives in the URL (?rel=a,b) so a filtered
  // neighborhood is a shareable view.
  const relFilter = useMemo(() => {
    const raw = searchParams.get("rel");
    return raw ? new Set(raw.split(",")) : null;
  }, [searchParams]);

  const relCounts = useMemo(() => {
    const data = inspect.data as { neighbors?: NeighborForGraph[] } | undefined;
    const counts = new Map<string, number>();
    for (const nb of data?.neighbors ?? []) {
      counts.set(nb.relationship_type, (counts.get(nb.relationship_type) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [inspect.data]);

  function toggleRel(rel: string) {
    const next = new Set(relFilter ?? []);
    if (next.has(rel)) next.delete(rel);
    else next.add(rel);
    const sp = new URLSearchParams(searchParams);
    if (next.size === 0) sp.delete("rel");
    else sp.set("rel", [...next].sort().join(","));
    setSearchParams(sp);
  }

  const { nodes, edges } = useMemo(() => {
    const data = inspect.data as
      | {
          found: boolean;
          properties: Record<string, unknown>;
          neighbors: NeighborForGraph[];
        }
      | undefined;
    if (!data?.found) return { nodes: [] as Node<EntityNodeData>[], edges: [] as Edge[] };

    const center: Node<EntityNodeData> = {
      id: `${entityType}:${entityId}`,
      type: "entity",
      position: { x: 0, y: 0 },
      data: {
        entityType,
        entityId,
        title: typeof data.properties.title === "string" ? data.properties.title : entityId,
        status: typeof data.properties.status === "string" ? data.properties.status : undefined,
        isCenter: true,
        layer: layerColoring.enabled ? layerColoring.layerFor(entityType) : null,
        properties: data.properties,
      },
    };

    // Cluster neighbors into contiguous angular sectors per relationship type
    // so edge labels read as grouped spokes rather than spaghetti.
    const visible = relFilter
      ? data.neighbors.filter((nb) => relFilter.has(nb.relationship_type))
      : data.neighbors;
    const sorted = [...visible].sort((a, b) =>
      `${a.relationship_type}${a.direction}`.localeCompare(`${b.relationship_type}${b.direction}`),
    );
    const n = sorted.length;
    const nodes: Node<EntityNodeData>[] = [center];
    const edges: Edge[] = [];
    const seen = new Set<string>([center.id]);

    sorted.forEach((nb, i) => {
      if (!isEntityRef(nb.entity)) return;
      const e = nb.entity;
      const nodeId = `${e.entity_type}:${e.entity_id}`;
      const angle = (2 * Math.PI * i) / Math.max(n, 1) - Math.PI / 2;
      // Ring tightens for small neighborhoods so sparse graphs don't read as
      // three nodes lost on an empty canvas; alternate two radii on dense
      // rings so adjacent labels don't collide.
      const baseRadius = Math.min(330, 150 + n * 30);
      const radius = n > 14 && i % 2 === 1 ? baseRadius + 140 : baseRadius;
      if (!seen.has(nodeId)) {
        seen.add(nodeId);
        nodes.push({
          id: nodeId,
          type: "entity",
          position: { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
          data: {
            entityType: e.entity_type,
            entityId: e.entity_id,
            title: typeof e.properties.title === "string" ? e.properties.title : e.entity_id,
            status:
              typeof e.properties.status === "string" ? e.properties.status : undefined,
            isCenter: false,
            layer: layerColoring.enabled ? layerColoring.layerFor(e.entity_type) : null,
            properties: e.properties,
          },
        });
      }
      const reviewStatus = nb.metadata.assertion?.review?.status;
      const stroke = reviewStatus === "unreviewed" ? "#3f3f46" : "#10b981";
      edges.push({
        id: `e${nb.edge_key}`,
        source: nb.direction === "outgoing" ? center.id : nodeId,
        target: nb.direction === "outgoing" ? nodeId : center.id,
        // On dense rings the repeated labels turn to noise; the relationship
        // filter chips above the canvas already name every edge type.
        label: n > 12 ? undefined : nb.relationship_type.replaceAll("_", " "),
        data: {
          labelClass: "text-zinc-500",
          relationshipType: nb.relationship_type,
          reviewStatus: reviewStatus ?? null,
        },
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: stroke },
        style: { stroke, strokeWidth: 1.25 },
        animated: false,
      });
    });
    return { nodes, edges };
  }, [inspect.data, entityType, entityId, relFilter, layerColoring]);

  if (inspect.isPending) return <LoadState />;
  if (inspect.error) return <LoadState error={inspect.error} />;

  const labelFor = (id: string) =>
    (nodes.find((n) => n.id === id)?.data as EntityNodeData | undefined)?.title ?? id;

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    if (selection.kind === "node") {
      const node = nodes.find((n) => n.id === selection.id);
      if (!node) return null;
      const d = node.data as EntityNodeData;
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
            <Link
              to={entityPath(instanceId, d.entityType, d.entityId)}
              className={actionChipClass}
            >
              Open entity →
            </Link>
            {!d.isCenter && (
              <Link
                to={`/i/${instanceId}/g/${d.entityType}/${d.entityId}`}
                className={actionChipClass}
              >
                Center graph here →
              </Link>
            )}
          </PanelActions>
          <PanelSection title="Properties">
            <PropertyList properties={d.properties} omit={["title", "status"]} />
          </PanelSection>
          <PanelSection title="Connections in view">
            <ConnectionList
              nodeId={selection.id}
              edges={edges.map((e) => ({
                ...e,
                label:
                  e.label ??
                  (e.data as { relationshipType?: string } | undefined)?.relationshipType,
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
    const data = edge.data as
      | { relationshipType?: string; reviewStatus?: string | null }
      | undefined;
    return (
      <div>
        <PanelHeading
          kicker="Relationship"
          title={(data?.relationshipType ?? String(edge.label ?? "")).replaceAll("_", " ")}
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
          <Chip value={data?.reviewStatus ?? "live"} />
        </PanelSection>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex items-center gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Graph</h1>
        <MonoId id={`${entityType}/${entityId}`} />
        <span className="ml-auto text-[11px] text-zinc-600">
          1-hop neighborhood · {edges.length} edges · grey edge = unreviewed, green = accepted
        </span>
        <Link
          to={entityPath(instanceId, entityType, entityId)}
          className={`inline-flex items-center gap-1.5 ${actionChipClass}`}
        >
          <PanelRight className="h-3 w-3" />
          Context panel
        </Link>
      </header>
      {relCounts.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {relCounts.map(([rel, count]) => {
            const active = relFilter?.has(rel) ?? false;
            return (
              <button
                key={rel}
                onClick={() => toggleRel(rel)}
                className={toggleChipClass(active)}
              >
                {rel.replaceAll("_", " ")}{" "}
                <span className="font-mono text-[10px] text-zinc-500">{count}</span>
              </button>
            );
          })}
        </div>
      )}
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        renderPanel={renderPanel}
        className="min-h-0 flex-1"
        overlay={layerColoring.enabled ? <LayerLegend /> : undefined}
      >
        <Controls showInteractive={false} className="!shadow-none" />
        {nodes.length > 9 && (
          <MiniMap
            pannable
            zoomable
            className="!h-24 !w-36"
            bgColor="#09090b"
            maskColor="rgba(24,24,27,0.7)"
            nodeColor="#3f3f46"
          />
        )}
      </GraphCanvas>
    </div>
  );
}
