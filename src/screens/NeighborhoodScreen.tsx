import { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { useInstanceId, useNeighborhood } from "@/api/hooks";
import { actionChipClass, SignalDot, toggleChipClass } from "@/components/Chip";
import { LoadState } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { ShownValue } from "@/components/ShownValue";
import { IncomingList } from "@/components/IncomingList";
import { GraphCanvas, type GraphPanelApi, type GraphSelection } from "@/components/graph/GraphCanvas";
import { ConnectionList, PanelActions, PanelHeading, PanelSection } from "@/components/graph/PanelBits";
import { LayerLegend } from "@/components/graph/LayerLegend";
import { useAtLink } from "@/lib/at";
import { formatRef, parseRef } from "@/lib/cruxible-ref";
import { useLayerColoring } from "@/lib/kit-layer";
import {
  NEIGHBORHOOD_MAX_DEPTH,
  NEIGHBORHOOD_NODE_CAP,
  type Neighborhood,
  type NeighborhoodNode,
} from "@/lib/neighborhood";
import { sentence } from "@/lib/text";
import { usePageTitle } from "@/lib/usePageTitle";

type SubjectNodeData = {
  node: NeighborhoodNode;
  root: boolean;
  color: string | null;
  [key: string]: unknown;
};

function idOf(ref: string, kind: string): string {
  return ref.startsWith(`${kind}/`) ? ref.slice(kind.length + 1) : ref;
}

function SubjectNode({ data }: NodeProps<Node<SubjectNodeData>>) {
  const { node, root, color } = data;
  const hidden = node.outgoingTotal - node.outgoingShown;
  return (
    <div
      className={`max-w-56 border px-2 py-1 text-left ${
        node.error
          ? "border-dashed border-zinc-700 bg-zinc-950"
          : root
            ? "border-zinc-400 bg-zinc-900"
            : "border-zinc-700 bg-zinc-900 hover:border-zinc-400"
      }`}
    >
      <Handle type="target" position={Position.Left} className="!pointer-events-none !opacity-0" />
      <div className="flex items-center gap-1 text-[10px] tracking-wide text-zinc-500">
        {color && <span className="h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: color }} />}
        <span className="truncate font-mono">{node.kind}</span>
      </div>
      <div className="truncate font-mono text-[12px] leading-4 text-zinc-200">{idOf(node.ref, node.kind)}</div>
      <div className="flex gap-2 font-mono text-[10px] text-zinc-500">
        {node.incomingCount != null && node.incomingCount > 0 && (
          <span title="Subject-valued Claims pointing here (counted, not walked)">←{node.incomingCount}</span>
        )}
        {hidden > 0 && <span title="Outgoing links beyond this depth or the node cap">+{hidden}→</span>}
        {node.error && (
          <span className="inline-flex items-center gap-1 text-zinc-400">
            <SignalDot signal="wrong" title={`Could not read this Subject: ${node.error}`} />
            Couldn't read
          </span>
        )}
      </div>
      <Handle type="source" position={Position.Right} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

const nodeTypes = { subjectNode: SubjectNode };

/** Columns by hop distance from the root (cause on the left, what it names to the right). */
function layout(graph: Neighborhood, colorOf: ((kind: string) => string) | null) {
  const columns = new Map<number, NeighborhoodNode[]>();
  for (const node of graph.nodes) columns.set(node.depth, [...(columns.get(node.depth) ?? []), node]);
  const nodes: Node<SubjectNodeData>[] = [];
  for (const [depth, members] of [...columns.entries()].sort((a, b) => a[0] - b[0])) {
    members.sort((a, b) => a.ref.localeCompare(b.ref));
    members.forEach((node, row) => {
      nodes.push({
        id: node.ref,
        type: "subjectNode",
        position: { x: depth * 320, y: row * 70 - (members.length * 70) / 2 },
        data: { node, root: node.ref === graph.root, color: colorOf ? colorOf(node.kind) : null },
      });
    });
  }
  const stroke = "#726f63";
  const edges: Edge[] = graph.edges.map((edge) => ({
    id: edge.id,
    source: edge.source,
    target: edge.target,
    data: { labelClass: "text-zinc-300", revealLabel: edge.field, edge },
    markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: stroke },
    style: { stroke, strokeWidth: 1.25 },
  }));
  return { nodes, edges };
}

/**
 * A Subject's outgoing neighborhood: depth 1 by default, 2 on request, at
 * most 150 Subjects, read hop by hop with get-batch at the page coordinate,
 * plus the first page of the root's incoming links in the column to its left.
 * Every node carries its incoming count; its panel pages the full list.
 */
export function NeighborhoodScreen() {
  const { ref: raw = "" } = useParams();
  const [params, setParams] = useSearchParams();
  const instanceId = useInstanceId();
  const link = useAtLink();
  const parsed = parseRef(raw);
  const ref = parsed?.kind === "subject" ? formatRef(parsed) : null;
  const depth = params.get("depth") === "2" ? 2 : 1;
  const graph = useNeighborhood(ref, depth);
  const kinds = useMemo(() => [...new Set((graph.data?.nodes ?? []).map((n) => n.kind))], [graph.data]);
  const coloring = useLayerColoring(kinds);
  usePageTitle(ref ? `Neighborhood ${ref}` : "Neighborhood");

  const drawn = useMemo(
    () =>
      graph.data
        ? layout(
            graph.data,
            coloring.enabled ? (kind) => coloring.colorOf(coloring.ownerOfKind(kind).layer) : null,
          )
        : { nodes: [], edges: [] },
    [graph.data, coloring],
  );

  if (!ref) {
    return <div className="text-[14px] text-zinc-400">{raw} is not a Subject reference (kind/id).</div>;
  }

  function setDepth(next: number) {
    const updated = new URLSearchParams(params);
    if (next === 1) updated.delete("depth");
    else updated.set("depth", String(next));
    setParams(updated);
  }

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    const data = graph.data!;
    if (selection.kind === "edge") {
      const edge = data.edges.find((e) => e.id === selection.id);
      if (!edge) return null;
      return (
        <div>
          <PanelHeading kicker="Claim" title={edge.field} />
          <div className="break-all font-mono text-[11px] text-zinc-500">{edge.predicate}</div>
          <div className="mt-1 flex flex-wrap items-baseline gap-1.5 text-[12px]">
            <button onClick={() => api.select(edge.source)} className="font-mono text-zinc-300 hover:underline">
              {edge.source}
            </button>
            <span className="text-zinc-600">→</span>
            <button onClick={() => api.select(edge.target)} className="font-mono text-zinc-300 hover:underline">
              {edge.target}
            </button>
          </div>
          <div className="mt-1 text-[12px] text-zinc-500">Cardinality {edge.cardinality}</div>
          <PanelActions>
            <RefLink value={edge.claim} />
          </PanelActions>
        </div>
      );
    }
    const node = data.nodes.find((n) => n.ref === selection.id);
    if (!node) return null;
    const literals = (node.card?.claims ?? []).filter(
      (entry) => !(typeof entry.value === "string" && parseRef(entry.value)?.kind === "subject"),
    );
    return (
      <div>
        <PanelHeading kicker={node.kind} title={idOf(node.ref, node.kind)} />
        <PanelActions>
          <Link to={link(`/i/${instanceId}/s/${encodeURIComponent(node.ref)}`)} className={actionChipClass}>
            Open Subject →
          </Link>
          {node.ref !== data.root && (
            <Link
              to={link(`/i/${instanceId}/s/${encodeURIComponent(node.ref)}/graph${depth === 2 ? "?depth=2" : ""}`)}
              className={actionChipClass}
            >
              Center here
            </Link>
          )}
        </PanelActions>
        {node.error && <div className="mt-2 text-[12px] text-red-400/80">{sentence(node.error)}</div>}
        <PanelSection title="Links">
          <ConnectionList
            nodeId={node.ref}
            edges={drawn.edges.map((e) => ({ ...e, label: (e.data as { revealLabel: string }).revealLabel }))}
            api={api}
            labelFor={(id) => id}
          />
          {node.outgoingTotal > node.outgoingShown && (
            <div className="mt-1 text-[12px] text-zinc-600">
              {node.outgoingTotal - node.outgoingShown} more outgoing beyond this view
            </div>
          )}
        </PanelSection>
        <PanelSection title={`Incoming (${node.incomingCount ?? "?"})`}>
          <IncomingList subject={node.ref} total={node.incomingCount} />
        </PanelSection>
        {literals.length > 0 && (
          <PanelSection title="Fields">
            <dl className="grid grid-cols-[max-content_1fr] gap-x-3 gap-y-0.5 text-[12px]">
              {literals.slice(0, 12).map((entry) => (
                <div key={`${entry.predicate}\n${entry.qualifier ?? ""}`} className="contents">
                  <dt className="font-mono text-zinc-500">{entry.predicate}</dt>
                  <dd className="min-w-0 break-words text-zinc-300">
                    <ShownValue value={entry.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </PanelSection>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex flex-wrap items-baseline gap-3">
        <h1 className="t-title">Neighborhood</h1>
        <RefLink value={ref} />
        <span className="flex gap-1">
          {Array.from({ length: NEIGHBORHOOD_MAX_DEPTH }, (_, i) => i + 1).map((d) => (
            <button key={d} onClick={() => setDepth(d)} className={toggleChipClass(d === depth)}>
              Depth {d}
            </button>
          ))}
        </span>
        {graph.data && (
          <span className="text-[12px] text-zinc-600">
            {graph.data.nodes.length} Subjects · {graph.data.edges.length} links · {graph.data.calls} reads ·
            ←n = incoming count{graph.data.incomingMore && " · more incoming than drawn"}
          </span>
        )}
        {graph.data?.capped && (
          <span className="text-[12px] text-zinc-500">Capped at {NEIGHBORHOOD_NODE_CAP} Subjects</span>
        )}
      </header>
      {graph.isPending && <LoadState />}
      {graph.error && <LoadState error={graph.error} />}
      {graph.data && (
        <GraphCanvas
          nodes={drawn.nodes}
          edges={drawn.edges}
          nodeTypes={nodeTypes}
          renderPanel={renderPanel}
          className="min-h-0 flex-1"
          overlay={coloring.enabled ? <LayerLegend layers={coloring.layers} /> : undefined}
        />
      )}
    </div>
  );
}
