import { useMemo } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  Background,
  Controls,
  Handle,
  MiniMap,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useInspectEntity, useInstanceId } from "@/api/hooks";
import { entityPath } from "@/components/EntityLink";
import { LoadState } from "@/components/Panel";
import { isEntityRef } from "@/api/items";

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
  [key: string]: unknown;
};

const STATUS_DOT: Record<string, string> = {
  closed: "bg-emerald-500",
  approved: "bg-emerald-500",
  accepted: "bg-emerald-500",
  active: "bg-amber-400",
  requested: "bg-violet-400",
  planned: "bg-sky-500",
  blocked: "bg-red-500",
  changes_requested: "bg-red-500",
};

function EntityNode({ data }: NodeProps<Node<EntityNodeData>>) {
  return (
    <div
      className={`max-w-52 rounded border px-2 py-1 text-left ${
        data.isCenter
          ? "border-zinc-400 bg-zinc-800"
          : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-zinc-600" />
      <div className="text-[9px] uppercase tracking-wide text-zinc-500">{data.entityType}</div>
      <div className="flex items-center gap-1.5">
        {data.status && (
          <span
            title={data.status}
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${STATUS_DOT[data.status] ?? "bg-zinc-600"}`}
          />
        )}
        <span className="truncate text-[11px] leading-4 text-zinc-200">{data.title}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-zinc-600" />
    </div>
  );
}

const nodeTypes = { entity: EntityNode };

/**
 * Focused 1-hop neighborhood around one entity, radially laid out with
 * neighbors clustered by relationship type. Clicking a neighbor re-centers
 * the graph on it; the URL is the selection. Deliberately not a whole-graph
 * view — legibility over analytics, per the work item.
 */
export function GraphScreen() {
  const { entityType = "", entityId = "" } = useParams();
  const instanceId = useInstanceId();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const inspect = useInspectEntity(entityType, entityId);

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
          },
        });
      }
      const reviewStatus = nb.metadata.assertion?.review?.status;
      edges.push({
        id: `e${nb.edge_key}`,
        source: nb.direction === "outgoing" ? center.id : nodeId,
        target: nb.direction === "outgoing" ? nodeId : center.id,
        label: nb.relationship_type.replaceAll("_", " "),
        labelStyle: { fill: "#71717a", fontSize: 9 },
        labelBgStyle: { fill: "#09090b", fillOpacity: 0.85 },
        style: {
          stroke: reviewStatus === "unreviewed" ? "#3f3f46" : "#10b981",
          strokeWidth: 1,
        },
        animated: false,
      });
    });
    return { nodes, edges };
  }, [inspect.data, entityType, entityId, relFilter]);

  if (inspect.isPending) return <LoadState />;
  if (inspect.error) return <LoadState error={inspect.error} />;

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Graph</h1>
        <span className="font-mono text-[12px] text-zinc-500">
          {entityType}/{entityId}
        </span>
        <Link
          to={entityPath(instanceId, entityType, entityId)}
          className="text-[12px] text-zinc-400 hover:underline"
        >
          context panel →
        </Link>
        <span className="ml-auto text-[11px] text-zinc-600">
          1-hop neighborhood · {edges.length} edges · grey edge = unreviewed, green = accepted
        </span>
      </header>
      {relCounts.length > 1 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {relCounts.map(([rel, count]) => {
            const active = relFilter?.has(rel) ?? false;
            return (
              <button
                key={rel}
                onClick={() => toggleRel(rel)}
                className={`rounded border px-1.5 py-px text-[11px] ${
                  active
                    ? "border-zinc-500 bg-zinc-800 text-zinc-100"
                    : relFilter
                      ? "border-zinc-800 text-zinc-600 hover:text-zinc-400"
                      : "border-zinc-800 text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                {rel.replaceAll("_", " ")}{" "}
                <span className="font-mono text-[10px] text-zinc-500">{count}</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="min-h-0 flex-1 rounded-md border border-zinc-800">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.18, maxZoom: 1.15 }}
          colorMode="dark"
          nodesDraggable
          nodesConnectable={false}
          edgesFocusable={false}
          proOptions={{ hideAttribution: true }}
          onNodeClick={(_, node) => {
            const d = node.data as EntityNodeData;
            if (!d.isCenter) navigate(`/i/${instanceId}/g/${d.entityType}/${d.entityId}`);
          }}
        >
          <Background color="#27272a" gap={24} />
          <Controls showInteractive={false} className="!shadow-none" />
          {nodes.length > 9 && (
            <MiniMap pannable zoomable className="!h-24 !w-36" bgColor="#09090b" maskColor="rgba(24,24,27,0.7)" nodeColor="#3f3f46" />
          )}
        </ReactFlow>
      </div>
    </div>
  );
}
