import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { useInstanceId, useInstanceSchema, useStats } from "@/api/hooks";
import { LoadState } from "@/components/Panel";
import { actionChipClass } from "@/components/Chip";
import { GraphCanvas, type GraphPanelApi, type GraphSelection } from "@/components/graph/GraphCanvas";
import {
  ConnectionList,
  PanelActions,
  PanelHeading,
  PanelSection,
} from "@/components/graph/PanelBits";
import { LayerLegend } from "@/components/graph/LayerLegend";
import { LAYER_META, useLayerColoring, type KitLayer } from "@/lib/kit-layer";
import { humanize } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

type TypeNodeData = {
  typeName: string;
  count: number;
  /** Owning kit layer; null when layer coloring is off. */
  layer: KitLayer | null;
  [key: string]: unknown;
};

interface SchemaRelationship {
  name?: string;
  from_entity?: string;
  to_entity?: string;
  description?: string | null;
}

interface SchemaPropertyDef {
  type?: string;
  primary_key?: boolean;
  optional?: boolean;
  enum_ref?: string | null;
  enum?: string[] | null;
}

interface SchemaForMap {
  entity_types?: Record<string, { properties?: Record<string, SchemaPropertyDef> }>;
  // The live daemon serves relationships as a list of named specs; older
  // payloads used a name-keyed dict. Normalize both.
  relationships?: SchemaRelationship[] | Record<string, SchemaRelationship>;
}

function relationshipList(schema: SchemaForMap): Array<{
  name: string;
  from_entity: string;
  to_entity: string;
  description?: string | null;
}> {
  const raw = schema.relationships ?? [];
  const entries = Array.isArray(raw)
    ? raw.map((r) => [r.name ?? "", r] as const)
    : Object.entries(raw).map(([name, r]) => [r.name ?? name, r] as const);
  return entries
    .filter(([name, r]) => name !== "" && !!r.from_entity && !!r.to_entity)
    .map(([name, r]) => ({
      name,
      from_entity: r.from_entity!,
      to_entity: r.to_entity!,
      description: r.description ?? null,
    }));
}

function TypeNode({ data }: NodeProps<Node<TypeNodeData>>) {
  const empty = data.count === 0;
  const accent = data.layer ? LAYER_META[data.layer] : null;
  return (
    <div
      className={`rounded border px-2.5 py-1.5 text-center ${
        empty
          ? "border-dashed border-zinc-800 bg-zinc-950"
          : accent
            ? `${accent.border} ${accent.borderHover} bg-zinc-900`
            : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
      }`}
    >
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
      <div className="flex items-center justify-center gap-1.5">
        {accent && (
          <span
            title={accent.label}
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot} ${empty ? "opacity-40" : ""}`}
          />
        )}
        <span className={`text-[13px] leading-4 ${empty ? "text-zinc-600" : "text-zinc-200"}`}>
          {data.typeName}
        </span>
      </div>
      <div className={`font-mono text-[10px] ${empty ? "text-zinc-700" : "text-zinc-500"}`}>
        {data.count}
      </div>
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
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
 * for an unfamiliar instance. Types with zero rows render dashed/dim so the
 * populated shape of the state stands out against the declared ontology.
 * Selection follows the shared GraphCanvas model; browsing happens from the
 * context panel.
 */
export function TypeMapScreen() {
  const instanceId = useInstanceId();
  const schema = useInstanceSchema();
  const stats = useStats();
  usePageTitle("Type map");
  const layerColoring = useLayerColoring();

  const { nodes, edges, counts } = useMemo(() => {
    const s = schema.data as SchemaForMap | undefined;
    const st = stats.data as
      | { entity_counts?: Record<string, number>; relationship_counts?: Record<string, number> }
      | undefined;
    if (!s?.entity_types)
      return {
        nodes: [] as Node<TypeNodeData>[],
        edges: [] as Edge[],
        counts: {} as Record<string, number>,
      };

    const typeNames = Object.keys(s.entity_types);
    const rels = relationshipList(s);
    const ordered = orderByAdjacency(
      typeNames,
      rels.map((r) => [r.from_entity, r.to_entity] as [string, string]),
    );

    // Two concentric rings instead of one sparse circle: the best-connected
    // types (up to a third) sit on a small inner ring, the rest on an outer
    // ring kept tight enough that edges stay readable at fit-view zoom.
    const degree = new Map<string, number>();
    for (const r of rels) {
      degree.set(r.from_entity, (degree.get(r.from_entity) ?? 0) + 1);
      degree.set(r.to_entity, (degree.get(r.to_entity) ?? 0) + 1);
    }
    const byDegree = [...ordered].sort(
      (a, b) => (degree.get(b) ?? 0) - (degree.get(a) ?? 0),
    );
    const innerCount =
      ordered.length >= 6 ? Math.min(Math.floor(ordered.length / 3), 5) : 0;
    const inner = new Set(byDegree.slice(0, innerCount).filter((t) => (degree.get(t) ?? 0) >= 3));
    const innerOrdered = ordered.filter((t) => inner.has(t));
    const outerOrdered = ordered.filter((t) => !inner.has(t));
    const outerRadius = Math.max(320, outerOrdered.length * 34);
    const innerRadius = Math.max(140, outerRadius * 0.42);

    const place = (
      names: string[],
      radius: number,
      angleOffset: number,
    ): Node<TypeNodeData>[] =>
      names.map((typeName, i) => {
        const angle = (2 * Math.PI * i) / Math.max(names.length, 1) - Math.PI / 2 + angleOffset;
        return {
          id: typeName,
          type: "typeNode",
          position: { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
          data: {
            typeName,
            count: st?.entity_counts?.[typeName] ?? 0,
            layer: layerColoring.enabled ? layerColoring.layerFor(typeName) : null,
          },
        };
      });

    const nodes: Node<TypeNodeData>[] = [
      ...place(innerOrdered, innerRadius, Math.PI / 6),
      ...place(outerOrdered, outerRadius, 0),
    ];

    // Empty relationships stay as unlabeled dashed strokes: the declared
    // shape reads without dozens of labels of noise on a dense ontology.
    const edges: Edge[] = rels.map((r) => {
      const count = st?.relationship_counts?.[r.name] ?? 0;
      const stroke = count > 0 ? "#6b7280" : "#27272a";
      return {
        id: r.name,
        source: r.from_entity,
        target: r.to_entity,
        ...(count > 0 ? { label: `${r.name.replaceAll("_", " ")} · ${count}` } : {}),
        data: { labelClass: "text-zinc-300", count, description: r.description ?? null },
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: stroke },
        style: {
          stroke,
          strokeWidth: count > 0 ? 1.5 : 1,
          ...(count === 0 ? { strokeDasharray: "4 3" } : {}),
        },
        animated: false,
      };
    });

    return { nodes, edges, counts: st?.entity_counts ?? {} };
  }, [schema.data, stats.data, layerColoring]);

  if (schema.isPending || stats.isPending) return <LoadState />;
  if (schema.error) return <LoadState error={schema.error} />;
  if (stats.error) return <LoadState error={stats.error} />;

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    if (selection.kind === "node") {
      const count = counts[selection.id] ?? 0;
      const propDefs = Object.entries(
        (schema.data as SchemaForMap | undefined)?.entity_types?.[selection.id]?.properties ?? {},
      );
      return (
        <div>
          <PanelHeading kicker="Entity type" title={humanize(selection.id)} />
          <div className="text-[13px] text-zinc-400">
            <span className="font-mono text-zinc-200">{count}</span> live{" "}
            {count === 1 ? "row" : "rows"}
          </div>
          {layerColoring.enabled && (
            <div className="mt-0.5 flex items-center gap-1.5 text-[12px] text-zinc-500">
              <span
                className={`h-1.5 w-1.5 rounded-full ${LAYER_META[layerColoring.layerFor(selection.id)].dot}`}
              />
              {LAYER_META[layerColoring.layerFor(selection.id)].label}
            </div>
          )}
          <PanelActions>
            <Link to={`/i/${instanceId}/browse/${selection.id}`} className={actionChipClass}>
              Browse rows →
            </Link>
          </PanelActions>
          {propDefs.length > 0 && (
            <PanelSection title="Properties">
              <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 text-[12px]">
                {propDefs.map(([name, def]) => (
                  <div key={name} className="contents">
                    <dt className="font-mono text-zinc-400">{name}</dt>
                    <dd className="text-zinc-600">
                      {def.enum_ref ?? (def.enum ? "enum" : (def.type ?? "string"))}
                      {def.primary_key ? " · pk" : def.optional === false ? " · required" : ""}
                    </dd>
                  </div>
                ))}
              </dl>
            </PanelSection>
          )}
          <PanelSection title="Relationships">
            <ConnectionList nodeId={selection.id} edges={edges} api={api} labelFor={humanize} />
          </PanelSection>
        </div>
      );
    }
    const edge = edges.find((e) => e.id === selection.id);
    if (!edge) return null;
    const data = edge.data as { count?: number; description?: string | null } | undefined;
    return (
      <div>
        <PanelHeading kicker="Relationship type" title={selection.id.replaceAll("_", " ")} />
        <div className="flex items-baseline gap-1.5 text-[13px]">
          <button onClick={() => api.select(edge.source)} className="text-zinc-300 hover:underline">
            {humanize(edge.source)}
          </button>
          <span className="text-zinc-600">→</span>
          <button onClick={() => api.select(edge.target)} className="text-zinc-300 hover:underline">
            {humanize(edge.target)}
          </button>
        </div>
        <div className="mt-1 text-[13px] text-zinc-400">
          {(data?.count ?? 0) > 0 ? (
            <>
              <span className="font-mono text-zinc-200">{data?.count}</span> live{" "}
              {data?.count === 1 ? "edge" : "edges"}
            </>
          ) : (
            "Declared but empty."
          )}
        </div>
        {data?.description && (
          <PanelSection title="Description">
            <div className="text-[13px] leading-4 text-zinc-400">{data.description}</div>
          </PanelSection>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Type map</h1>
        <span className="text-[12px] text-zinc-600">
          {nodes.length} types · {edges.length} relationship types · dashed = declared but empty ·
          click anything for context
        </span>
      </header>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        renderPanel={renderPanel}
        className="min-h-0 flex-1"
        overlay={layerColoring.enabled ? <LayerLegend /> : undefined}
      />
    </div>
  );
}
