import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Crosshair } from "lucide-react";
import { FocusChip, useClearOnEscape } from "@/components/graph/FocusChip";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { useInstanceId, useOntologyKinds, useSourceModel, useSubjectKinds } from "@/api/hooks";
import type { OrientPredicate, OrientSubjectKind } from "@/api/schemas";
import { actionChipClass } from "@/components/Chip";
import { LoadState } from "@/components/Panel";
import { FieldList } from "@/components/FieldList";
import { GraphCanvas, type GraphPanelApi, type GraphSelection } from "@/components/graph/GraphCanvas";
import { PanelActions, PanelHeading, PanelSection } from "@/components/graph/PanelBits";
import { LayerLegend } from "@/components/graph/LayerLegend";
import { useLayerColoring, type TypeOwner } from "@/lib/kit-layer";
import {
  buildTypeGraph,
  edgeForPredicate,
  type TypeGraphEdge,
  valueTypeWords,
} from "@/lib/type-graph";
import { usePageTitle } from "@/lib/usePageTitle";
import { layoutTypeGraph, monoWidth, type TypeLayout } from "@/lib/type-layout";
import type { RoutedEdgeData } from "@/components/graph/RoutedEdge";
import { useAtLink } from "@/lib/at";
import { claimTypeWriters, type ClaimTypeWriter } from "@/lib/definitions";
import { shortNames } from "@/lib/evidence-flow";
import { placeLabels } from "@/lib/route";
import { LegendRow, SearchBox, Stat, StatsRow } from "@/components/StatsRow";

type TypeNodeData = {
  kind: string;
  /** The name shown: the kind with the namespace every kind shares dropped. */
  label: string;
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
      title={data.kind}
      className={`border px-2.5 py-1.5 text-center ${
        data.referencedOnly
          ? "border-dashed border-zinc-700 bg-zinc-950"
          : empty
            ? "border-zinc-700 bg-zinc-950 hover:border-zinc-500"
            : "border-zinc-500 bg-zinc-900 hover:border-zinc-300"
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
        <span className={`font-mono text-[13px] leading-4 ${data.referencedOnly ? "text-zinc-500" : empty ? "text-zinc-300" : "text-zinc-50"}`}>
          {data.label}
        </span>
      </div>
      <div className={`text-[11px] leading-4 ${empty ? "text-zinc-600" : "text-zinc-400"}`}>
        {data.referencedOnly ? "Not declared" : data.subjects === 1 ? "1 Subject" : `${data.subjects} Subjects`}
      </div>
      <Handle type="source" position={Position.Right} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

const nodeTypes = { typeNode: TypeNode };

/** Node box: the kind name in 13px mono plus padding (at least the count line's width), two lines tall. */
const NODE_HEIGHT = 42;
const nodeWidth = (label: string) => Math.max(monoWidth(label, 13), 72) + 26;

/** A ClaimType's field name: the last segment of its name ("security.work.owner" -> "owner"). */
const fieldName = (p: OrientPredicate) => p.name.split(".").at(-1) ?? p.name;

/**
 * An edge's label: the field names that say something the arrow does not.
 * A field named after the kind it points at ("credential" -> credential) is
 * the arrow itself, so only its many mark stays; "owner" -> team keeps its
 * name. Empty when every field just repeats the target.
 */
function edgeLabel(edge: TypeGraphEdge): string {
  const target = edge.target.split(".").at(-1) ?? edge.target;
  const parts = edge.predicates.flatMap((p) => {
    const name = fieldName(p);
    const many = p.cardinality === "many";
    if (name === target || name === `${target}s`) return many ? ["*"] : [];
    return [`${name}${many ? " *" : ""}`];
  });
  return [...new Set(parts)].join(" · ");
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
  const sourceModel = useSourceModel();
  const writers = useMemo(
    () => (sourceModel.data ? claimTypeWriters(sourceModel.data.specs, sourceModel.data.lines) : undefined),
    [sourceModel.data],
  );
  const [params, setParams] = useSearchParams();
  usePageTitle("Type map");

  const allKinds = useMemo(() => buildTypeGraph(kinds.data?.kinds ?? []), [kinds.data]);
  // ?populated=1 keeps only kinds that hold Subjects (and the links between them);
  // ?populated=0 shows every kind. Unset, it starts on when most declared kinds are
  // empty (a fresh or partly loaded instance), unless the URL opens on a kind or field.
  const populatedParam = params.get("populated");
  const mostlyEmpty = useMemo(() => {
    const all = kinds.data?.kinds ?? [];
    return all.length > 0 && all.filter((k) => k.subjects === 0).length * 2 > all.length;
  }, [kinds.data]);
  // The toggle only means something when some declared kind holds no Subjects.
  const someEmpty = useMemo(() => (kinds.data?.kinds ?? []).some((k) => k.subjects === 0), [kinds.data]);
  const opensOnSomething = params.has("kind") || params.has("focus") || params.has("claim_type");
  const populatedOnly =
    populatedParam === "1" || (populatedParam === null && mostlyEmpty && !opensOnSomething);
  const fullGraph = useMemo(() => {
    if (!populatedOnly) return allKinds;
    const held = new Set((kinds.data?.kinds ?? []).filter((k) => k.subjects > 0).map((k) => k.kind));
    return {
      ...allKinds,
      nodes: allKinds.nodes.filter((n) => held.has(n.kind)),
      edges: allKinds.edges.filter((e) => held.has(e.source) && held.has(e.target)),
    };
  }, [allKinds, populatedOnly, kinds.data]);
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
  // The namespace most kinds share ("security.") is said once and dropped from the boxes; a kind outside it,
  // or one whose short name would clash, keeps its full name. The full name stays in the title and the panel.
  const names = useMemo(() => shortNames(fullGraph.nodes.map((n) => n.kind)), [fullGraph]);
  const labelOf = names.label;
  const rulesByKind = useMemo(
    () => new Map((subjectKinds.data?.rows ?? []).map((row) => [row.kind, row])),
    [subjectKinds.data],
  );

  // Layered left-to-right layout (ELK, loaded on first use); recomputed only when the graph changes.
  const layoutInput = useMemo(
    () => ({
      nodes: graph.nodes.map((n) => ({ id: n.kind, width: nodeWidth(labelOf(n.kind)), height: NODE_HEIGHT })),
      edges: graph.edges.map((e) => ({ id: e.id, source: e.source, target: e.target, label: edgeLabel(e) })),
    }),
    [graph, labelOf],
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
      style: { width: nodeWidth(labelOf(n.kind)) },
      data: {
        kind: n.kind,
        label: labelOf(n.kind),
        subjects: byKind.get(n.kind)!.subjects,
        referencedOnly: n.referencedOnly,
        color: coloring.enabled ? coloring.colorOf(coloring.ownerOfKind(n.kind).layer) : null,
      },
    }));
    const positions = new Map(nodes.map((n) => [n.id, n.position]));
    // Each label on its own edge, sliding off the middle where it would cover another label or a kind.
    const labelAt = placeLabels(
      graph.edges.flatMap((e) => {
        const route = laidOut.result?.routes.get(e.id);
        const text = edgeLabel(e);
        return route && text ? [{ id: e.id, points: route.points, curve: true, width: text.length * 6.7 + 10, height: 16 }] : [];
      }),
      nodes.map((n) => ({ x: n.position.x, y: n.position.y, width: nodeWidth(labelOf(n.id)), height: NODE_HEIGHT })),
    );
    const edges: Edge[] = graph.edges.map((e) => {
      const stroke = "#8a8678";
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
              labelAt: labelAt.get(e.id) ?? route.label,
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
  }, [graph, coloring, laidOut, labelOf]);

  const kindParam = params.get("kind");
  const claimTypeParam = params.get("claim_type");
  const [nonce] = useState(() => Date.now());
  // Find a kind: Enter selects (and centers on) the first match.
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<{ id: string; nonce: number } | null>(null);
  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return graph.nodes.filter((n) => n.kind.toLowerCase().includes(q)).map((n) => n.kind);
  }, [query, graph]);
  const selectRequest = useMemo(() => {
    if (found) return found;
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
  }, [kindParam, claimTypeParam, graph, kinds.data, nonce, found]);

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
          rule={rulesByKind.get(selection.id)}
          writers={writers}
          owner={coloring.ownerOfKind(selection.id)}
          edges={graph.edges}
          api={api}
          onFocus={focus === selection.id ? undefined : () => setParam("focus", selection.id)}
          label={labelOf}
        />
      );
    }
    const edge = graph.edges.find((e) => e.id === selection.id);
    return edge ? <EdgePanel edge={edge} api={api} label={labelOf} /> : null;
  }

  return (
    <div className="flex h-full min-h-[80vh] flex-col">
      <header className="mb-3">
        <h1 className="t-title">Type map</h1>
        <p className="t-lede measure mt-1">
          The kinds of Subject this instance knows about, and how they point at each other: an arrow means a field on one
          kind names a Subject of another. Click a kind or an arrow for its ClaimTypes.
        </p>
        <StatsRow
          search={
            <SearchBox
              value={query}
              onChange={setQuery}
              onEnter={() => matches?.[0] && setFound({ id: matches[0], nonce: Date.now() })}
              placeholder="Find a kind…"
              label="Find a kind on the type map"
              matches={matches ? matches.length : null}
            />
          }
        >
          <Stat
            n={graph.nodes.length}
            label={
              populatedOnly && !focus && allKinds.nodes.length > graph.nodes.length
                ? `of ${allKinds.nodes.length} kinds`
                : graph.nodes.length === 1
                  ? "kind"
                  : "kinds"
            }
          />
          <Stat n={graph.edges.length} label={graph.edges.length === 1 ? "link" : "links"} />
          {names.prefix && (
            <span>
              Names under <span className="font-mono text-zinc-300">{names.prefix}</span>
            </span>
          )}
        </StatsRow>
        <MapLegend undeclared={graph.nodes.some((n) => n.referencedOnly)} />
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
        nodeName={labelOf}
        expandable={false}
        // A focus keeps a kind and its neighbors: few enough to label every link.
        revealAll={focus !== null}
        controls={
          someEmpty ? (
          <button
            type="button"
            aria-pressed={populatedOnly}
            onClick={() => setParam("populated", populatedOnly ? "0" : "1")}
            title="Show only the kinds that hold at least one Subject"
            className={
              populatedOnly
                ? "inline-flex items-center gap-1.5 border border-zinc-500 bg-zinc-800 px-2 py-1 text-[12px] leading-4 text-zinc-100"
                : "inline-flex items-center gap-1.5 border border-zinc-800 bg-zinc-950/90 px-2 py-1 text-[12px] leading-4 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
            }
          >
            <span
              aria-hidden
              className={`h-2 w-2 border ${populatedOnly ? "border-zinc-200 bg-zinc-200" : "border-zinc-500"}`}
            />
            Only kinds with Subjects
          </button>
          ) : undefined
        }
        overlay={coloring.enabled ? <LayerLegend layers={coloring.layers} /> : undefined}
      />
      )}
    </div>
  );
}

/** What the map's marks mean, inside the canvas: boxes, the dashed box, arrows and the many mark. */
function MapLegend({ undeclared }: { undeclared: boolean }) {
  return (
    <LegendRow>
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block h-2.5 w-3.5 border border-zinc-500 bg-zinc-900" aria-hidden />
        Kind
      </span>
      {undeclared && (
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-3.5 border border-dashed border-zinc-600" aria-hidden />
          Not declared
        </span>
      )}
      <span className="inline-flex items-center gap-1.5">
        <svg width="22" height="8" aria-hidden>
          <line x1="0" y1="4" x2="16" y2="4" stroke="#8a8678" strokeWidth="1.25" />
          <path d="M16 1 L21 4 L16 7 Z" fill="#8a8678" />
        </svg>
        Field link (* many)
      </span>
      <span>Unlinked at left</span>
    </LegendRow>
  );
}

function KindPanel({
  kind,
  subjects,
  predicates,
  rule,
  writers,
  owner,
  edges,
  api,
  onFocus,
  label,
}: {
  onFocus?: (() => void) | undefined;
  label: (kind: string) => string;
  kind: string;
  subjects: number;
  predicates: OrientPredicate[];
  rule: OrientSubjectKind | undefined;
  writers: Map<string, ClaimTypeWriter[]> | undefined;
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
        <PanelSection title="Identified by">
          <div className="text-[12px]">
            {rule.rule === "minted" ? (
              <span className="text-zinc-400">an id Cruxible assigns</span>
            ) : (
              (rule.keys ?? []).map((key) => {
                const field = predicates.find((p) => p.predicate === key);
                return (
                  <span key={key} className="mr-2 font-mono text-zinc-200" title={field ? valueTypeWords(field.type, label) : key}>
                    {key.startsWith(`${kind}.`) ? key.slice(kind.length + 1) : key}
                  </span>
                );
              })
            )}
          </div>
        </PanelSection>
      )}
      {groupByWriter(predicates.filter((p) => !(rule?.keys ?? []).includes(p.predicate)), writers).map((group) => (
        <div key={group.title} className="mt-4 border-t border-zinc-800 pt-3">
          {group.line ? (
            <div className="mb-1.5 grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-2 gap-y-0.5 text-[12px]">
              <span className="text-zinc-500">Source</span>
              <span className="text-zinc-100" title={group.sources.length > 0 ? `reads ${group.sources.join(", ")}` : undefined}>
                {group.hosts.length > 0 ? group.hosts.join(", ") : group.sources.join(", ") || "—"}
              </span>
              <span className="text-zinc-500">Line</span>
              <Link to={link(`/i/${instanceId}/lines/${encodeURIComponent(group.line)}`)} className="font-mono text-zinc-300 hover:underline">
                {group.line}
              </Link>
            </div>
          ) : (
            <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">{group.title}</div>
          )}
          <ClaimTypeLinks predicates={group.predicates} kind={kind} label={label} />
        </div>
      ))}
      {incoming.length > 0 && (
        <PanelSection title="Pointed at by">
          {incoming.map((edge) => (
            <button
              key={edge.id}
              onClick={() => api.select(edge.source)}
              className="block w-full px-1 py-0.5 text-left text-[12px] hover:bg-zinc-900"
            >
              <span className="font-mono text-zinc-300">{label(edge.source)}</span>{" "}
              <span className="text-zinc-500">{[...new Set(edge.predicates.map(fieldName))].join(", ")}</span>
            </button>
          ))}
        </PanelSection>
      )}
    </div>
  );
}

function EdgePanel({ edge, api, label }: { edge: TypeGraphEdge; api: GraphPanelApi; label: (kind: string) => string }) {
  return (
    <div>
      <PanelHeading kicker="Kind link" title={`${edge.predicates.length} ClaimType${edge.predicates.length === 1 ? "" : "s"}`} />
      <div className="flex flex-wrap items-baseline gap-1.5 text-[12px]">
        <button onClick={() => api.select(edge.source)} className="font-mono text-zinc-300 hover:underline">
          {label(edge.source)}
        </button>
        <span className="text-zinc-600">→</span>
        <button onClick={() => api.select(edge.target)} className="font-mono text-zinc-300 hover:underline">
          {label(edge.target)}
        </button>
      </div>
      <PanelSection title="ClaimTypes">
        <ClaimTypeLinks predicates={edge.predicates} kind={edge.source} label={label} />
      </PanelSection>
    </div>
  );
}

/** ClaimTypes as a compact field list: the name (linking to its row on the kind page) and its type in words. */
function ClaimTypeLinks({ predicates, kind, label }: { predicates: OrientPredicate[]; kind: string; label: (kind: string) => string }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  if (predicates.length === 0) return <div className="text-[12px] text-zinc-600">None.</div>;
  return (
    <FieldList
      density="compact"
      fields={predicates.map((p) => ({
        key: p.predicate,
        label: fieldName(p),
        labelHref: link(`/i/${instanceId}/kinds/${encodeURIComponent(kind)}?claim_type=${encodeURIComponent(p.predicate)}`),
        labelTitle: p.predicate,
        value: (
          <span className="break-words text-zinc-400">
            {valueTypeWords(p.type, label)}
            {p.cardinality === "many" && <span className="text-zinc-600"> · many</span>}
          </span>
        ),
      }))}
    />
  );
}

/**
 * A kind's ClaimTypes grouped by the Line that writes them (a ClaimType two
 * Lines write sits under the first by name); key fields and ClaimTypes no
 * Line writes come last, under "Other ClaimTypes".
 */
function groupByWriter(
  predicates: readonly OrientPredicate[],
  writers: Map<string, ClaimTypeWriter[]> | undefined,
): { title: string; line: string | null; sources: string[]; hosts: string[]; predicates: OrientPredicate[] }[] {
  const groups = new Map<string, { title: string; line: string | null; sources: string[]; hosts: string[]; predicates: OrientPredicate[] }>();
  const rest: OrientPredicate[] = [];
  for (const p of predicates) {
    const writer = writers?.get(p.predicate)?.[0];
    if (!writer) {
      rest.push(p);
      continue;
    }
    const group = groups.get(writer.line) ?? { title: writer.line, line: writer.line, sources: writer.sources, hosts: writer.hosts, predicates: [] };
    group.predicates.push(p);
    groups.set(writer.line, group);
  }
  const out = [...groups.values()];
  if (rest.length > 0) out.push({ title: out.length > 0 ? "Other ClaimTypes" : "ClaimTypes", line: null, sources: [], hosts: [], predicates: rest });
  return out;
}
