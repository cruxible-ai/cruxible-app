import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Background,
  Handle,
  Position,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useInstanceId } from "@/api/hooks";
import { prop, type EntityRef, type PathItem, type PathSegment } from "@/api/items";

export type PathNodeData = {
  entityType: string;
  entityId: string;
  title: string;
  role: "entry" | "result" | "hop";
  [key: string]: unknown;
};

const ROLE_CLASS: Record<PathNodeData["role"], string> = {
  entry: "border-sky-600 bg-zinc-900",
  result: "border-emerald-700 bg-zinc-900",
  hop: "border-zinc-700 bg-zinc-900",
};

function PathNode({ data }: NodeProps<Node<PathNodeData>>) {
  return (
    <div
      className={`max-w-52 rounded border px-2 py-1 text-left hover:border-zinc-400 ${ROLE_CLASS[data.role]}`}
    >
      <Handle type="target" position={Position.Left} className="!bg-zinc-600" />
      <div className="text-[9px] uppercase tracking-wide text-zinc-500">{data.entityType}</div>
      <div className="truncate text-[11px] leading-4 text-zinc-200">{data.title}</div>
      <Handle type="source" position={Position.Right} className="!bg-zinc-600" />
    </div>
  );
}

const nodeTypes = { pathNode: PathNode };

/** Review status off the loosely-typed segment metadata, defensively. */
function segmentReviewStatus(seg: PathSegment): string | undefined {
  const meta = seg.metadata as { assertion?: { review?: { status?: string } } } | undefined;
  return meta?.assertion?.review?.status;
}

/**
 * Union subgraph over all path-shaped result items: one merged graph instead
 * of per-row entry → result lines. Nodes column-ranked by hop distance from
 * the entry entities, so a blast-radius query reads left (cause) to right
 * (exposure). Edge color carries review status (green accepted, grey
 * unreviewed) — same vocabulary as the entity graph screen.
 */
export function buildPathGraph(items: PathItem[]): {
  nodes: Node<PathNodeData>[];
  edges: Edge[];
} {
    const entityById = new Map<string, EntityRef>();
    const roleById = new Map<string, PathNodeData["role"]>();
    type EdgeAgg = {
      source: string;
      target: string;
      relationship_type: string;
      reviewStatus: string | undefined;
    };
    const edgeById = new Map<string, EdgeAgg>();
    const adjacency = new Map<string, Set<string>>();

    for (const item of items) {
      for (const e of item.entities) {
        entityById.set(`${e.entity_type}:${e.entity_id}`, e);
      }
      // Entry wins over result wins over hop when an entity plays several roles.
      const resultId = `${item.result.entity_type}:${item.result.entity_id}`;
      if (roleById.get(resultId) !== "entry") roleById.set(resultId, "result");
      const entryId = `${item.entry.entity_type}:${item.entry.entity_id}`;
      roleById.set(entryId, "entry");
      for (const seg of item.path ?? []) {
        const source = `${seg.from_type}:${seg.from_id}`;
        const target = `${seg.to_type}:${seg.to_id}`;
        const id = `${seg.relationship_type}|${source}|${target}`;
        if (!edgeById.has(id)) {
          edgeById.set(id, {
            source,
            target,
            relationship_type: seg.relationship_type,
            reviewStatus: segmentReviewStatus(seg),
          });
        }
        for (const [a, b] of [
          [source, target],
          [target, source],
        ] as const) {
          if (!adjacency.has(a)) adjacency.set(a, new Set());
          adjacency.get(a)!.add(b);
        }
      }
    }

    // Column rank = BFS depth from the entry set over the undirected union.
    const depth = new Map<string, number>();
    const queue: string[] = [];
    for (const [id, role] of roleById) {
      if (role === "entry") {
        depth.set(id, 0);
        queue.push(id);
      }
    }
    while (queue.length > 0) {
      const cur = queue.shift()!;
      for (const nb of adjacency.get(cur) ?? []) {
        if (!depth.has(nb)) {
          depth.set(nb, (depth.get(cur) ?? 0) + 1);
          queue.push(nb);
        }
      }
    }

    const byColumn = new Map<number, string[]>();
    for (const id of entityById.keys()) {
      const col = depth.get(id) ?? 0;
      if (!byColumn.has(col)) byColumn.set(col, []);
      byColumn.get(col)!.push(id);
    }

    const nodes: Node<PathNodeData>[] = [];
    for (const [col, ids] of [...byColumn.entries()].sort((a, b) => a[0] - b[0])) {
      ids.sort();
      ids.forEach((id, row) => {
        const e = entityById.get(id)!;
        nodes.push({
          id,
          type: "pathNode",
          position: { x: col * 300, y: row * 74 - (ids.length * 74) / 2 },
          data: {
            entityType: e.entity_type,
            entityId: e.entity_id,
            title: prop(e, "title") ?? prop(e, "name") ?? e.entity_id,
            role: roleById.get(id) ?? "hop",
          },
        });
      });
    }

    const edges: Edge[] = [...edgeById.entries()].map(([id, agg]) => ({
      id,
      source: agg.source,
      target: agg.target,
      label: agg.relationship_type.replaceAll("_", " "),
      labelStyle: { fill: "#71717a", fontSize: 9 },
      labelBgStyle: { fill: "#09090b", fillOpacity: 0.85 },
      style: {
        stroke: agg.reviewStatus === "unreviewed" ? "#3f3f46" : "#10b981",
        strokeWidth: 1,
      },
      animated: false,
    }));

    return { nodes, edges };
}

export function PathGraph({ items }: { items: PathItem[] }) {
  const instanceId = useInstanceId();
  const navigate = useNavigate();
  const { nodes, edges } = useMemo(() => buildPathGraph(items), [items]);

  if (nodes.length === 0) {
    return (
      <div className="py-3 text-[13px] text-zinc-600">
        No path segments to draw — this query's results carry no hop data.
      </div>
    );
  }

  return (
    <div className="h-[70vh] rounded-md border border-zinc-800">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ maxZoom: 1.2, padding: 0.15 }}
        colorMode="dark"
        nodesDraggable
        nodesConnectable={false}
        edgesFocusable={false}
        proOptions={{ hideAttribution: true }}
        onNodeClick={(_, node) => {
          const d = node.data as PathNodeData;
          navigate(`/i/${instanceId}/g/${d.entityType}/${d.entityId}`);
        }}
      >
        <Background color="#27272a" gap={24} />
      </ReactFlow>
    </div>
  );
}
