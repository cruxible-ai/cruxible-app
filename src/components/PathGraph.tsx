import { Link } from "react-router-dom";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { useInstanceId } from "@/api/hooks";
import { prop, type EntityRef, type PathItem, type PathSegment } from "@/api/items";
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
import { actionChipClass, Chip } from "@/components/Chip";
import { MonoId } from "@/components/MonoId";
import { EmptyState } from "@/components/Panel";

export type PathNodeData = {
  entityType: string;
  entityId: string;
  title: string;
  role: "entry" | "result" | "hop";
  /** Owning kit layer; null when layer coloring is off. */
  layer?: KitLayer | null;
  properties: Record<string, unknown>;
  [key: string]: unknown;
};

const ROLE_CLASS: Record<PathNodeData["role"], string> = {
  entry: "border-sky-600 bg-zinc-900",
  result: "border-emerald-700 bg-zinc-900",
  hop: "border-zinc-700 bg-zinc-900",
};

function PathNode({ data }: NodeProps<Node<PathNodeData>>) {
  // Role borders (entry/result) outrank layer tint; hop nodes take the layer
  // border, and the kicker dot carries the layer on every node.
  const accent = data.layer ? LAYER_META[data.layer] : null;
  const borderClass =
    data.role === "hop" && accent ? `${accent.border} bg-zinc-900` : ROLE_CLASS[data.role];
  return (
    <div
      className={`max-w-52 rounded border px-2 py-1 text-left hover:border-zinc-400 ${borderClass}`}
    >
      <Handle type="target" position={Position.Left} className="!pointer-events-none !opacity-0" />
      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wide text-zinc-500">
        {accent && (
          <span
            title={accent.label}
            className={`h-1 w-1 shrink-0 rounded-full ${accent.dot}`}
          />
        )}
        {data.entityType}
      </div>
      <div className="truncate text-[11px] leading-4 text-zinc-200">{data.title}</div>
      <Handle type="source" position={Position.Right} className="!pointer-events-none !opacity-0" />
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
export function buildPathGraph(
  items: PathItem[],
  layerFor?: ((entityType: string) => KitLayer) | null,
): {
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
            layer: layerFor ? layerFor(e.entity_type) : null,
            properties: e.properties ?? {},
          },
        });
      });
    }

    const edges: Edge[] = [...edgeById.entries()].map(([id, agg]) => {
      const stroke = agg.reviewStatus === "unreviewed" ? "#3f3f46" : "#10b981";
      return {
        id,
        source: agg.source,
        target: agg.target,
        label: agg.relationship_type.replaceAll("_", " "),
        data: { labelClass: "text-zinc-500", reviewStatus: agg.reviewStatus ?? null },
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: stroke },
        style: { stroke, strokeWidth: 1.25 },
        animated: false,
      };
    });

    return { nodes, edges };
}

const ROLE_LABEL: Record<PathNodeData["role"], string> = {
  entry: "entry",
  result: "result",
  hop: "via",
};

export function PathGraph({ items }: { items: PathItem[] }) {
  const instanceId = useInstanceId();
  const layerColoring = useLayerColoring();
  const { nodes, edges } = buildPathGraph(items, layerColoring.enabled ? layerColoring.layerFor : null);

  if (nodes.length === 0) {
    return (
      <EmptyState>No path segments to draw — this query's results carry no hop data.</EmptyState>
    );
  }

  const labelFor = (id: string) =>
    (nodes.find((n) => n.id === id)?.data as PathNodeData | undefined)?.title ?? id;

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    if (selection.kind === "node") {
      const node = nodes.find((n) => n.id === selection.id);
      if (!node) return null;
      const d = node.data as PathNodeData;
      return (
        <div>
          <PanelHeading kicker={`${d.entityType} · ${ROLE_LABEL[d.role]}`} title={d.title} />
          <div className="break-all">
            <MonoId id={d.entityId} />
          </div>
          <PanelActions>
            <Link
              to={`/i/${instanceId}/e/${d.entityType}/${d.entityId}`}
              className={actionChipClass}
            >
              Open entity →
            </Link>
            <Link
              to={`/i/${instanceId}/g/${d.entityType}/${d.entityId}`}
              className={actionChipClass}
            >
              Entity graph →
            </Link>
          </PanelActions>
          <PanelSection title="Properties">
            <PropertyList properties={d.properties} omit={["title", "status"]} />
          </PanelSection>
          <PanelSection title="Connections here">
            <ConnectionList nodeId={selection.id} edges={edges} api={api} labelFor={labelFor} />
          </PanelSection>
        </div>
      );
    }
    const edge = edges.find((e) => e.id === selection.id);
    if (!edge) return null;
    const reviewStatus = (edge.data as { reviewStatus?: string | null } | undefined)?.reviewStatus;
    return (
      <div>
        <PanelHeading
          kicker="Relationship"
          title={String(edge.label ?? edge.id).replaceAll("_", " ")}
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
          <Chip value={reviewStatus ?? "live"} />
        </PanelSection>
      </div>
    );
  }

  return (
    <GraphCanvas
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      renderPanel={renderPanel}
      className="h-[70vh]"
      overlay={layerColoring.enabled ? <LayerLegend /> : undefined}
    />
  );
}
