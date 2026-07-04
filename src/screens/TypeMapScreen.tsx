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
import { useInstanceId, useInstanceSchema, useStats } from "@/api/hooks";
import { LoadState } from "@/components/Panel";

type TypeNodeData = {
  typeName: string;
  count: number;
  [key: string]: unknown;
};

interface SchemaRelationship {
  name?: string;
  from_entity?: string;
  to_entity?: string;
  description?: string | null;
}

interface SchemaForMap {
  entity_types?: Record<string, unknown>;
  // The live daemon serves relationships as a list of named specs; older
  // payloads used a name-keyed dict. Normalize both.
  relationships?: SchemaRelationship[] | Record<string, SchemaRelationship>;
}

function relationshipList(schema: SchemaForMap): Array<Required<Pick<SchemaRelationship, "name" | "from_entity" | "to_entity">>> {
  const raw = schema.relationships ?? [];
  const entries = Array.isArray(raw)
    ? raw.map((r) => [r.name ?? "", r] as const)
    : Object.entries(raw).map(([name, r]) => [r.name ?? name, r] as const);
  return entries
    .filter(([name, r]) => name !== "" && !!r.from_entity && !!r.to_entity)
    .map(([name, r]) => ({ name, from_entity: r.from_entity!, to_entity: r.to_entity! }));
}

function TypeNode({ data }: NodeProps<Node<TypeNodeData>>) {
  const empty = data.count === 0;
  return (
    <div
      className={`rounded border px-2.5 py-1.5 text-center ${
        empty
          ? "border-dashed border-zinc-800 bg-zinc-950"
          : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-zinc-600" />
      <div className={`text-[12px] leading-4 ${empty ? "text-zinc-600" : "text-zinc-200"}`}>
        {data.typeName}
      </div>
      <div className={`font-mono text-[10px] ${empty ? "text-zinc-700" : "text-zinc-500"}`}>
        {data.count}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-zinc-600" />
    </div>
  );
}

const nodeTypes = { typeNode: TypeNode };

/**
 * Greedy adjacency ordering for the circular layout: start from the
 * highest-degree type, then repeatedly place the unplaced type most connected
 * to what's already placed. Keeps related types in contiguous arcs so seam
 * edges don't all cross the circle's center.
 */
function orderByAdjacency(types: string[], pairs: Array<[string, string]>): string[] {
  const degree = new Map<string, number>(types.map((t) => [t, 0]));
  const adj = new Map<string, Map<string, number>>(types.map((t) => [t, new Map()]));
  for (const [a, b] of pairs) {
    if (!degree.has(a) || !degree.has(b) || a === b) continue;
    degree.set(a, (degree.get(a) ?? 0) + 1);
    degree.set(b, (degree.get(b) ?? 0) + 1);
    adj.get(a)!.set(b, (adj.get(a)!.get(b) ?? 0) + 1);
    adj.get(b)!.set(a, (adj.get(b)!.get(a) ?? 0) + 1);
  }
  const placed: string[] = [];
  const remaining = new Set(types);
  while (remaining.size > 0) {
    let best: string | null = null;
    let bestScore = -1;
    for (const t of remaining) {
      const connectivity = [...(adj.get(t) ?? new Map()).entries()]
        .filter(([n]) => placed.includes(n))
        .reduce((sum, [, w]) => sum + w, 0);
      const score = placed.length === 0 ? (degree.get(t) ?? 0) : connectivity;
      if (score > bestScore || (score === bestScore && best !== null && t < best)) {
        best = t;
        bestScore = score;
      }
    }
    placed.push(best!);
    remaining.delete(best!);
  }
  return placed;
}

/**
 * Type-level instance map: entity types as nodes with live counts,
 * relationship types as labeled edges with edge counts. The orientation view
 * for an unfamiliar instance — click a type to browse its rows. Types with
 * zero rows render dashed/dim so the populated shape of the state stands out
 * against the declared ontology.
 */
export function TypeMapScreen() {
  const instanceId = useInstanceId();
  const navigate = useNavigate();
  const schema = useInstanceSchema();
  const stats = useStats();

  const { nodes, edges } = useMemo(() => {
    const s = schema.data as SchemaForMap | undefined;
    const st = stats.data as
      | { entity_counts?: Record<string, number>; relationship_counts?: Record<string, number> }
      | undefined;
    if (!s?.entity_types) return { nodes: [] as Node<TypeNodeData>[], edges: [] as Edge[] };

    const typeNames = Object.keys(s.entity_types);
    const rels = relationshipList(s);
    const ordered = orderByAdjacency(
      typeNames,
      rels.map((r) => [r.from_entity, r.to_entity] as [string, string]),
    );

    const n = ordered.length;
    // Radius grows with type count so labels keep breathing room on big ontologies.
    const radius = Math.max(300, n * 32);
    const nodes: Node<TypeNodeData>[] = ordered.map((typeName, i) => {
      const angle = (2 * Math.PI * i) / Math.max(n, 1) - Math.PI / 2;
      return {
        id: typeName,
        type: "typeNode",
        position: { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
        data: { typeName, count: st?.entity_counts?.[typeName] ?? 0 },
      };
    });

    const edges: Edge[] = rels.map((r) => {
        const relName = r.name;
        const count = st?.relationship_counts?.[relName] ?? 0;
        // Empty relationships stay as unlabeled dashed strokes: the declared
        // shape reads without 52 labels of noise on a dense ontology.
        return {
          id: relName,
          source: r.from_entity,
          target: r.to_entity,
          ...(count > 0
            ? {
                label: `${relName.replaceAll("_", " ")} · ${count}`,
                labelStyle: { fill: "#d4d4d8", fontSize: 10 },
                labelBgStyle: { fill: "#09090b", fillOpacity: 0.85 },
              }
            : {}),
          style: {
            stroke: count > 0 ? "#6b7280" : "#27272a",
            strokeWidth: count > 0 ? 1.5 : 1,
            ...(count === 0 ? { strokeDasharray: "4 3" } : {}),
          },
          animated: false,
        };
      });

    return { nodes, edges };
  }, [schema.data, stats.data]);

  if (schema.isPending || stats.isPending) return <LoadState />;
  if (schema.error) return <LoadState error={schema.error} />;
  if (stats.error) return <LoadState error={stats.error} />;

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Type map</h1>
        <span className="text-[11px] text-zinc-600">
          {nodes.length} types · {edges.length} relationship types · dashed = declared but empty ·
          click a type to browse
        </span>
      </header>
      <div className="min-h-0 flex-1 rounded-md border border-zinc-800">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
        fitViewOptions={{ maxZoom: 1.1, padding: 0.1 }}
          colorMode="dark"
          nodesDraggable
          nodesConnectable={false}
          edgesFocusable={false}
          proOptions={{ hideAttribution: true }}
          onNodeClick={(_, node) => {
            navigate(`/i/${instanceId}/browse/${(node.data as TypeNodeData).typeName}`);
          }}
        >
          <Background color="#27272a" gap={24} />
        </ReactFlow>
      </div>
    </div>
  );
}
