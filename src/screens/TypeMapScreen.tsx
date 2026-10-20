import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { useInstanceId, useOrientKinds, useSubjectKinds } from "@/api/hooks";
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
      <Handle type="target" position={Position.Top} className="!pointer-events-none !opacity-0" />
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
      <Handle type="source" position={Position.Bottom} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

const nodeTypes = { typeNode: TypeNode };

/**
 * Greedy adjacency ordering for the circular layout: start from the
 * highest-degree kind, then repeatedly place the unplaced kind most connected
 * to what's already placed. Keeps related kinds in contiguous arcs so seam
 * edges don't all cross the circle's center.
 */
function orderByAdjacency(kinds: string[], pairs: Array<[string, string]>): string[] {
  const degree = new Map<string, number>(kinds.map((t) => [t, 0]));
  const adj = new Map<string, Map<string, number>>(kinds.map((t) => [t, new Map()]));
  for (const [a, b] of pairs) {
    if (!degree.has(a) || !degree.has(b) || a === b) continue;
    degree.set(a, (degree.get(a) ?? 0) + 1);
    degree.set(b, (degree.get(b) ?? 0) + 1);
    adj.get(a)!.set(b, (adj.get(a)!.get(b) ?? 0) + 1);
    adj.get(b)!.set(a, (adj.get(b)!.get(a) ?? 0) + 1);
  }
  const placed: string[] = [];
  const remaining = new Set(kinds);
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
  const kinds = useOrientKinds();
  const subjectKinds = useSubjectKinds();
  const [params] = useSearchParams();
  usePageTitle("Type map");

  const graph = useMemo(() => buildTypeGraph(kinds.data?.kinds ?? []), [kinds.data]);
  const coloring = useLayerColoring(graph.nodes.map((n) => n.kind));
  const rulesByKind = useMemo(
    () => new Map((subjectKinds.data?.rows ?? []).map((row) => [row.kind, row])),
    [subjectKinds.data],
  );

  const { nodes, edges } = useMemo(() => {
    const ordered = orderByAdjacency(
      graph.nodes.map((n) => n.kind),
      graph.edges.map((e) => [e.source, e.target] as [string, string]),
    );
    // Two concentric rings: the best-connected kinds (up to a third) on a
    // small inner ring, the rest outside, tight enough to read at fit zoom.
    const degree = new Map<string, number>();
    for (const e of graph.edges) {
      degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
      degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
    }
    const byDegree = [...ordered].sort((a, b) => (degree.get(b) ?? 0) - (degree.get(a) ?? 0));
    const innerCount = ordered.length >= 6 ? Math.min(Math.floor(ordered.length / 3), 5) : 0;
    const inner = new Set(byDegree.slice(0, innerCount).filter((t) => (degree.get(t) ?? 0) >= 3));
    const innerOrdered = ordered.filter((t) => inner.has(t));
    const outerOrdered = ordered.filter((t) => !inner.has(t));
    const outerRadius = Math.max(320, outerOrdered.length * 38);
    const innerRadius = Math.max(140, outerRadius * 0.42);
    const byKind = new Map(graph.nodes.map((n) => [n.kind, n]));

    const place = (names: string[], radius: number, offset: number): Node<TypeNodeData>[] =>
      names.map((kind, i) => {
        const angle = (2 * Math.PI * i) / Math.max(names.length, 1) - Math.PI / 2 + offset;
        const node = byKind.get(kind)!;
        return {
          id: kind,
          type: "typeNode",
          position: { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
          data: {
            kind,
            subjects: node.subjects,
            referencedOnly: node.referencedOnly,
            color: coloring.enabled ? coloring.colorOf(coloring.ownerOfKind(kind).layer) : null,
          },
        };
      });

    const nodes = [...place(innerOrdered, innerRadius, Math.PI / 6), ...place(outerOrdered, outerRadius, 0)];
    const edges: Edge[] = graph.edges.map((e) => {
      const stroke = "#726f63";
      return {
        id: e.id,
        source: e.source,
        target: e.target,
        data: {
          labelClass: "text-zinc-300",
          revealLabel: e.predicates.map((p) => `${p.name} ${cardinalityMark(p.cardinality)}`).join(" · "),
        },
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: stroke },
        style: { stroke, strokeWidth: 1.25 },
      };
    });
    return { nodes, edges };
  }, [graph, coloring]);

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
        />
      );
    }
    const edge = graph.edges.find((e) => e.id === selection.id);
    return edge ? <EdgePanel edge={edge} api={api} /> : null;
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3 flex flex-wrap items-baseline gap-3">
        <h1 className="text-[17px] font-semibold text-zinc-100">Type map</h1>
        <span className="text-[12px] text-zinc-600">
          {graph.nodes.length} Subject kinds · {graph.edges.length} kind links · dashed = no Subjects ·
          click anything for its ClaimTypes
        </span>
      </header>
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        renderPanel={renderPanel}
        selectRequest={selectRequest}
        className="min-h-0 flex-1"
        overlay={coloring.enabled ? <LayerLegend layers={coloring.layers} /> : undefined}
      />
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
}: {
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
