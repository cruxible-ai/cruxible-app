import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Crosshair } from "lucide-react";
import { FocusChip, useClearOnEscape } from "@/components/graph/FocusChip";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { useInstanceId, useOntologyKinds, useSubjectKinds } from "@/api/hooks";
import type { OrientPredicate, OrientSubjectKind } from "@/api/schemas";
import { actionChipClass } from "@/components/Chip";
import { LoadState } from "@/components/Panel";
import { GraphCanvas, type GraphPanelApi, type GraphSelection } from "@/components/graph/GraphCanvas";
import { PanelActions, PanelHeading, PanelSection } from "@/components/graph/PanelBits";
import { LayerLegend } from "@/components/graph/LayerLegend";
import { useLayerColoring, type TypeOwner } from "@/lib/kit-layer";
import {
  buildTypeGraph,
  edgeForPredicate,
  type TypeGraphEdge,
} from "@/lib/type-graph";
import { usePageTitle } from "@/lib/usePageTitle";
import { layoutTypeGraph, monoWidth, type TypeLayout } from "@/lib/type-layout";
import type { RoutedEdgeData } from "@/components/graph/RoutedEdge";
import { useAtLink } from "@/lib/at";
import { contractName } from "@/lib/ontology";

type TypeNodeData = {
  kind: string;
  subjects: number;
  referencedOnly: boolean;
  /** Layer accent color; null when layer coloring is off. */
  color: string | null;
  [key: string]: unknown;
};

function TypeNode({ data }: NodeProps<Node<TypeNodeData>>) {
  const empty = data.subjects === 0;
  return (
    <div
      className={`border px-2.5 py-1.5 text-center ${
        data.referencedOnly
          ? "border-dashed border-zinc-800 bg-zinc-950"
          : empty
            ? "border-dashed border-zinc-700 bg-zinc-950"
            : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
      }`}
      style={data.color && !data.referencedOnly ? { borderColor: data.color } : undefined}
    >
      <Handle type="target" position={Position.Left} className="!pointer-events-none !opacity-0" />
      <div className="flex items-center justify-center gap-1.5">
        {data.color && (
          <span
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${empty ? "opacity-40" : ""}`}
            style={{ backgroundColor: data.color }}
          />
        )}
        <span className={`font-mono text-[12px] leading-4 ${empty ? "text-zinc-600" : "text-zinc-200"}`}>
          {data.kind}
        </span>
      </div>
      <div className={`font-mono text-[11px] ${empty ? "text-zinc-700" : "text-zinc-500"}`}>
        {data.referencedOnly ? "not declared" : data.subjects}
      </div>
      <Handle type="source" position={Position.Right} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

const nodeTypes = { typeNode: TypeNode };

/** Node box: the kind name in 12px mono plus padding, two lines tall. */
const NODE_HEIGHT = 40;
const nodeWidth = (kind: string) => monoWidth(kind) + 26;

/** An edge's label: its ClaimTypes' field names with cardinality ("component *"). */
function edgeLabel(edge: TypeGraphEdge): string {
  return edge.predicates.map((p) => `${p.name}${p.cardinality === "many" ? " *" : ""}`).join(" · ");
}

function cardinalityMark(cardinality: string): string {
  return cardinality === "many" ? "*" : "1";
}

/**
 * The ontology at the pinned generation: SubjectKinds with their Subject
 * counts, Subject-valued ClaimTypes as kind-to-kind edges, and per kind its
 * identity rule and every ClaimType with cardinality, value type, evidence
 * requirement and staleness. Evidence rules load per ClaimType on demand.
 * `?kind=` and `?claim_type=` open the map on that kind or edge.
 */
export function TypeMapScreen() {
  const kinds = useOntologyKinds();
  const subjectKinds = useSubjectKinds();
  const [params, setParams] = useSearchParams();
  usePageTitle("Type map");

  const fullGraph = useMemo(() => buildTypeGraph(kinds.data?.kinds ?? []), [kinds.data]);
  // ?focus=<kind> keeps that kind and the kinds one link away (either direction).
  const focus = params.get("focus");
  const graph = useMemo(() => {
    if (!focus || !fullGraph.nodes.some((n) => n.kind === focus)) return fullGraph;
    const keep = new Set([focus]);
    for (const e of fullGraph.edges) {
      if (e.source === focus) keep.add(e.target);
      if (e.target === focus) keep.add(e.source);
    }
    return {
      ...fullGraph,
      nodes: fullGraph.nodes.filter((n) => keep.has(n.kind)),
      edges: fullGraph.edges.filter((e) => keep.has(e.source) && keep.has(e.target)),
    };
  }, [fullGraph, focus]);
  const setParam = useCallback(
    (name: string, value: string | null) => {
      const next = new URLSearchParams(params);
      if (value === null) next.delete(name);
      else next.set(name, value);
      setParams(next);
    },
    [params, setParams],
  );
  const clearFocus = useCallback(() => setParam("focus", null), [setParam]);
  useClearOnEscape(focus !== null, clearFocus);
  const coloring = useLayerColoring(graph.nodes.map((n) => n.kind));
  const rulesByKind = useMemo(
    () => new Map((subjectKinds.data?.rows ?? []).map((row) => [row.kind, row])),
    [subjectKinds.data],
  );

  // Layered left-to-right layout (ELK, loaded on first use); recomputed only when the graph changes.
  const layoutInput = useMemo(
    () => ({
      nodes: graph.nodes.map((n) => ({ id: n.kind, width: nodeWidth(n.kind), height: NODE_HEIGHT })),
      edges: graph.edges.map((e) => ({ id: e.id, source: e.source, target: e.target, label: edgeLabel(e) })),
    }),
    [graph],
  );
  // The ontology read can hand back a new object on every render; key the layout by content.
  const layoutKey = useMemo(() => JSON.stringify(layoutInput), [layoutInput]);
  const [layout, setLayout] = useState<{ key: string; result: TypeLayout | null } | null>(null);
  useEffect(() => {
    let live = true;
    const { nodes, edges } = JSON.parse(layoutKey) as typeof layoutInput;
    layoutTypeGraph(nodes, edges)
      .then((result) => live && setLayout({ key: layoutKey, result }))
      // A layout failure still shows every kind, in a plain grid.
      .catch(() => live && setLayout({ key: layoutKey, result: null }));
    return () => {
      live = false;
    };
  }, [layoutKey]);
  const laidOut = layout?.key === layoutKey ? layout : null;

  const { nodes, edges } = useMemo(() => {
    if (!laidOut) return { nodes: [] as Node<TypeNodeData>[], edges: [] as Edge[] };
    const byKind = new Map(graph.nodes.map((n) => [n.kind, n]));
    const at = (kind: string, i: number) =>
      laidOut.result?.positions.get(kind) ?? { x: (i % 5) * 260, y: Math.floor(i / 5) * (NODE_HEIGHT + 40) };
    const nodes: Node<TypeNodeData>[] = graph.nodes.map((n, i) => ({
      id: n.kind,
      type: "typeNode",
      position: at(n.kind, i),
      style: { width: nodeWidth(n.kind) },
      data: {
        kind: n.kind,
        subjects: byKind.get(n.kind)!.subjects,
        referencedOnly: n.referencedOnly,
        color: coloring.enabled ? coloring.colorOf(coloring.ownerOfKind(n.kind).layer) : null,
      },
    }));
    const positions = new Map(nodes.map((n) => [n.id, n.position]));
    const edges: Edge[] = graph.edges.map((e) => {
      const stroke = "#726f63";
      const route = laidOut.result?.routes.get(e.id);
      const base = {
        id: e.id,
        source: e.source,
        target: e.target,
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: stroke },
        style: { stroke, strokeWidth: 1.25 },
      };
      return route
        ? {
            ...base,
            type: "routed",
            data: {
              points: route.points,
              labelAt: route.label,
              text: edgeLabel(e),
              curve: true,
              sourceAt: positions.get(e.source)!,
              targetAt: positions.get(e.target)!,
            } satisfies RoutedEdgeData,
          }
        : {
            ...base,
            data: { labelClass: "text-zinc-300", revealLabel: edgeLabel(e) },
          };
    });
    return { nodes, edges };
  }, [graph, coloring, laidOut]);

  const kindParam = params.get("kind");
  const claimTypeParam = params.get("claim_type");
  const [nonce] = useState(() => Date.now());
  const selectRequest = useMemo(() => {
    if (claimTypeParam) {
      const edge = edgeForPredicate(graph.edges, claimTypeParam);
      if (edge) return { id: edge.id, kind: "edge" as const, nonce };
      const owner = (kinds.data?.kinds ?? []).find((k) =>
        k.predicates.some((p) => p.predicate === claimTypeParam),
      );
      if (owner) return { id: owner.kind, nonce };
    }
    if (kindParam && graph.nodes.some((n) => n.kind === kindParam)) return { id: kindParam, nonce };
    return null;
  }, [kindParam, claimTypeParam, graph, kinds.data, nonce]);

  if (kinds.isPending) return <LoadState />;
  if (kinds.error) return <LoadState error={kinds.error} />;

  function renderPanel(selection: GraphSelection, api: GraphPanelApi) {
    if (selection.kind === "node") {
      const kind = (kinds.data?.kinds ?? []).find((k) => k.kind === selection.id);
      return (
        <KindPanel
          kind={selection.id}
          subjects={kind?.subjects ?? 0}
          predicates={kind?.predicates ?? []}
          evidence={kind?.evidence ?? []}
          rule={rulesByKind.get(selection.id)}
          owner={coloring.ownerOfKind(selection.id)}
          edges={graph.edges}
          api={api}
          onFocus={focus === selection.id ? undefined : () => setParam("focus", selection.id)}
        />
      );
    }
    const edge = graph.edges.find((e) => e.id === selection.id);
    return edge ? <EdgePanel edge={edge} api={api} /> : null;
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex flex-wrap items-baseline gap-3">
        <h1 className="t-title">Type map</h1>
        <span className="t-meta">
          {graph.nodes.length} Subject kinds · {graph.edges.length} kind links · arrows point from a kind to the kind
          its field names (* = many) · unlinked kinds in the left column · dashed = no Subjects · click anything for
          its ClaimTypes
        </span>
      </header>
      {focus && (
        <div className="mb-2">
          <FocusChip label={focus} onClear={clearFocus} />
        </div>
      )}
      {!laidOut ? (
        <LoadState />
      ) : (
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        renderPanel={renderPanel}
        selectRequest={selectRequest}
        className="min-h-0 flex-1"
        overlay={coloring.enabled ? <LayerLegend layers={coloring.layers} /> : undefined}
      />
      )}
    </div>
  );
}

function KindPanel({
  kind,
  subjects,
  predicates,
  evidence,
  rule,
  owner,
  edges,
  api,
  onFocus,
}: {
  onFocus?: (() => void) | undefined;
  kind: string;
  subjects: number;
  predicates: OrientPredicate[];
  evidence: string[];
  rule: OrientSubjectKind | undefined;
  owner: TypeOwner;
  edges: TypeGraphEdge[];
  api: GraphPanelApi;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const incoming = edges.filter((e) => e.target === kind && e.source !== kind);
  return (
    <div>
      <PanelHeading kicker="Subject kind" title={kind} />
      <div className="text-[13px] text-zinc-400">
        <span className="font-mono text-zinc-200">{subjects}</span> {subjects === 1 ? "Subject" : "Subjects"}
      </div>
      <div className="mt-0.5 text-[12px] text-zinc-500">
        {owner.source === "kit" ? (
          <>
            kit <span className="font-mono">{owner.layer}</span>
          </>
        ) : (
          "authored in this instance"
        )}
      </div>
      <PanelActions>
        <Link to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}`)} className={actionChipClass}>
          Open kind page →
        </Link>
        {onFocus && (
          <button type="button" onClick={onFocus} className={`inline-flex items-center gap-1 ${actionChipClass}`} title="Keep only this kind and the kinds one link away">
            <Crosshair className="h-3 w-3" /> Focus on this kind
          </button>
        )}
      </PanelActions>
      {rule && (
        <PanelSection title="Identity">
          <div className="text-[12px] text-zinc-400">
            {rule.rule === "minted" ? "minted ids" : "keyed by"}{" "}
            {(rule.keys ?? []).map((key) => (
              <span key={key} className="mr-1.5 break-all font-mono text-zinc-300">
                {key}
              </span>
            ))}
            {rule.uniqueness && <span className="text-zinc-600">({rule.uniqueness})</span>}
          </div>
        </PanelSection>
      )}
      {evidence.length > 0 && (
        <PanelSection title="Evidence contracts">
          <div className="flex flex-wrap gap-x-2 font-mono text-[12px]">
            {evidence.map((contract) => (
              <Link key={contract} to={link(`/i/${instanceId}/contracts/${encodeURIComponent(contractName(contract))}`)} className="text-zinc-300 hover:underline">
                {contractName(contract)}
              </Link>
            ))}
          </div>
        </PanelSection>
      )}
      <PanelSection title={`ClaimTypes (${predicates.length})`}>
        <ClaimTypeLinks predicates={predicates} kind={kind} />
      </PanelSection>
      {incoming.length > 0 && (
        <PanelSection title="Pointed at by">
          {incoming.map((edge) => (
            <button
              key={edge.id}
              onClick={() => api.select(edge.source)}
              className="block w-full px-1 py-0.5 text-left text-[12px] hover:bg-zinc-900"
            >
              <span className="font-mono text-zinc-300">{edge.source}</span>{" "}
              <span className="text-zinc-500">{edge.predicates.map((p) => p.name).join(", ")}</span>
            </button>
          ))}
        </PanelSection>
      )}
    </div>
  );
}

function EdgePanel({ edge, api }: { edge: TypeGraphEdge; api: GraphPanelApi }) {
  return (
    <div>
      <PanelHeading kicker="Kind link" title={`${edge.predicates.length} ClaimType${edge.predicates.length === 1 ? "" : "s"}`} />
      <div className="flex flex-wrap items-baseline gap-1.5 text-[12px]">
        <button onClick={() => api.select(edge.source)} className="font-mono text-zinc-300 hover:underline">
          {edge.source}
        </button>
        <span className="text-zinc-600">→</span>
        <button onClick={() => api.select(edge.target)} className="font-mono text-zinc-300 hover:underline">
          {edge.target}
        </button>
      </div>
      <PanelSection title="ClaimTypes">
        <ClaimTypeLinks predicates={edge.predicates} kind={edge.source} />
      </PanelSection>
    </div>
  );
}

/** ClaimType names linking to their rows on the kind page (the ontology view). */
function ClaimTypeLinks({ predicates, kind }: { predicates: OrientPredicate[]; kind: string }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  if (predicates.length === 0) return <div className="text-[12px] text-zinc-600">None.</div>;
  return (
    <div className="space-y-0.5">
      {predicates.map((p) => (
        <Link
          key={p.predicate}
          to={link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(p.predicate)}`)}
          className="flex items-baseline gap-1.5 px-1 py-0.5 text-[12px] hover:bg-zinc-900"
          title={p.predicate}
        >
          <span className="font-mono text-zinc-200">{p.name}</span>
          <span className="font-mono text-zinc-500">{cardinalityMark(p.cardinality)}</span>
          <span className="min-w-0 truncate text-zinc-500">{p.type}</span>
        </Link>
      ))}
    </div>
  );
}
