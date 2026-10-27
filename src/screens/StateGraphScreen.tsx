import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGraphFirstPage, useInstanceId, useWholeGraph, type GraphProgress } from "@/api/hooks";
import { toggleChipClass } from "@/components/Chip";
import { LoadState } from "@/components/Panel";
import { RefLink } from "@/components/RefLink";
import { CosmosDots, type GlDotEdge, type GlDotNode } from "@/components/graph/CosmosDots";
import { PanelHeading } from "@/components/graph/PanelBits";
import { FocusChip, useClearOnEscape } from "@/components/graph/FocusChip";
import { useAtLink } from "@/lib/at";
import { buildTypeColors } from "@/lib/type-colors";
import { usePageTitle } from "@/lib/usePageTitle";

/** Subjects above which the console declines to draw the whole graph. */
export const GRAPH_SUBJECT_CAP = 5_000;
/** Edges after which paging stops (the read serves no edge total to check first). */
export const GRAPH_EDGE_CAP = 60_000;

const EDGE_RGBA: GlDotEdge["rgba"] = [140, 136, 122, 0.55];

function idOf(subject: string, kind: string): string {
  return subject.startsWith(`${kind}/`) ? subject.slice(kind.length + 1) : subject;
}

/**
 * The whole state as a graph: every live Subject a dot colored by kind,
 * every Subject-valued Claim a line. Loads only when opened, through orient
 * section=graph alone: the first page's Subject total decides whether to
 * draw (at most 5,000), then pages of 500 follow the pinned cursor with
 * progress shown. Clicking a dot opens its Subject page; hovering a line
 * shows its predicate.
 */
export function StateGraphScreen() {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const navigate = useNavigate();
  usePageTitle("State graph");
  const first = useGraphFirstPage(true);
  const subjects = first.data?.page.graph?.totals.subjects;
  const tooMany = subjects !== undefined && subjects > GRAPH_SUBJECT_CAP;
  const [progress, setProgress] = useState<GraphProgress | null>(null);
  const graph = useWholeGraph(first.data, subjects !== undefined && !tooMany, GRAPH_EDGE_CAP, setProgress);
  const [hiddenKinds, setHiddenKinds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [jump, setJump] = useState<{ id: string; nonce: number } | null>(null);

  const kinds = useMemo(() => {
    const counts = new Map<string, number>();
    for (const node of graph.data?.nodes ?? []) counts.set(node.kind, (counts.get(node.kind) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [graph.data]);
  const colorOf = useMemo(() => buildTypeColors(kinds.map(([kind]) => kind)), [kinds]);

  const drawn = useMemo(() => {
    const nodes: GlDotNode[] = [];
    const colors: string[] = [];
    const shown = new Set<string>();
    for (const node of graph.data?.nodes ?? []) {
      if (hiddenKinds.has(node.kind)) continue;
      // Labels show the id alone; the dot's color carries the kind.
      nodes.push({ id: node.subject, title: idOf(node.subject, node.kind) });
      colors.push(colorOf(node.kind));
      shown.add(node.subject);
    }
    const edges: GlDotEdge[] = (graph.data?.edges ?? [])
      .filter((edge) => shown.has(edge.source) && shown.has(edge.target))
      .map((edge) => ({
        id: edge.claim,
        source: edge.source,
        target: edge.target,
        rgba: EDGE_RGBA,
        label: edge.qualifier ? `${edge.predicate} [${edge.qualifier}]` : edge.predicate,
      }));
    return { nodes, colors, edges };
  }, [graph.data, hiddenKinds, colorOf]);

  const matched = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (q.length < 2) return null;
    return new Set(drawn.nodes.filter((node) => node.id.toLowerCase().includes(q)).map((node) => node.id));
  }, [search, drawn.nodes]);

  const edgeById = useMemo(() => new Map((graph.data?.edges ?? []).map((edge) => [edge.claim, edge])), [graph.data]);

  const showAllKinds = useCallback(() => setHiddenKinds(new Set()), []);
  useClearOnEscape(hiddenKinds.size > 0, showAllKinds);

  function toggleKind(kind: string) {
    setHiddenKinds((current) => {
      const next = new Set(current);
      if (next.has(kind)) next.delete(kind);
      else next.add(kind);
      return next;
    });
  }

  return (
    <div className="flex h-full min-h-[85vh] flex-col">
      <header className="mb-2 flex flex-wrap items-baseline gap-3">
        <h1 className="t-title">State graph</h1>
        {graph.data && (
          <span className="text-[12px] text-zinc-500">
            {graph.data.nodes.length} Subjects · {graph.data.edges.length} Subject-valued Claims · {graph.data.pages}{" "}
            {graph.data.pages === 1 ? "page" : "pages"} in{" "}
            {graph.data.elapsedMs < 1000
              ? `${Math.round(graph.data.elapsedMs)} ms`
              : `${(graph.data.elapsedMs / 1000).toFixed(1)} s`}
            {graph.data.edgesCapped && (
              <span> · stopped at {GRAPH_EDGE_CAP.toLocaleString()} edges</span>
            )}
          </span>
        )}
        {graph.data && (
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              const hit = matched ? [...matched][0] : undefined;
              if (e.key === "Enter" && hit) setJump({ id: hit, nonce: Date.now() });
            }}
            placeholder="Search by id…"
            aria-label="Search Subjects by id"
            className="ml-auto w-64 border border-zinc-800 bg-zinc-950 px-2 py-0.5 font-mono text-[12px] text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none"
          />
        )}
        {matched && <span className="text-[12px] text-zinc-500">{matched.size} match{matched.size === 1 ? "" : "es"}</span>}
      </header>

      {first.isPending && <LoadState />}
      {first.error && <LoadState error={first.error} />}
      {tooMany && (
        <div className="max-w-2xl border border-zinc-800 bg-zinc-900/30 p-4 text-[13px] text-zinc-400">
          <div className="text-zinc-200">
            This instance holds <span className="font-mono">{subjects!.toLocaleString()}</span> live Subjects, more than
            the {GRAPH_SUBJECT_CAP.toLocaleString()} the console draws at once.
          </div>
          <p className="mt-2">
            Use the{" "}
            <Link to={link(`/i/${instanceId}/map`)} className="text-zinc-200 underline decoration-zinc-600">
              type map
            </Link>{" "}
            for the shape of the ontology, and a Subject's neighborhood (open any Subject, then Neighborhood, or jump
            to one with ⌘K) for its links.
          </p>
        </div>
      )}
      {!tooMany && subjects !== undefined && graph.isPending && (
        <div className="py-3 text-[13px] text-zinc-500">
          Loading {subjects.toLocaleString()} Subjects
          {progress && (
            <>
              : page {progress.pages}, {progress.nodes.toLocaleString()} Subjects and {progress.edges.toLocaleString()} links
              read
            </>
          )}
          …
          <div className="mt-1 h-1 w-64 bg-zinc-800">
            <div
              className="h-1 bg-zinc-400"
              style={{ width: `${progress ? Math.min(100, (progress.nodes / Math.max(1, subjects)) * 100) : 0}%` }}
            />
          </div>
        </div>
      )}
      {graph.error && <LoadState error={graph.error} />}

      {graph.data && (
        <>
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            {hiddenKinds.size > 0 && (
              <FocusChip
                prefix="Hiding"
                label={`${hiddenKinds.size} ${hiddenKinds.size === 1 ? "kind" : "kinds"}`}
                onClear={showAllKinds}
              />
            )}
            {kinds.map(([kind, count]) => (
              <button
                key={kind}
                onClick={() => toggleKind(kind)}
                className={`${toggleChipClass(!hiddenKinds.has(kind))} inline-flex items-center gap-1.5`}
                title={hiddenKinds.has(kind) ? "Show this kind" : "Hide this kind"}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colorOf(kind), opacity: hiddenKinds.has(kind) ? 0.3 : 1 }} />
                <span className="font-mono">{kind}</span>
                <span className="text-zinc-600">{count}</span>
              </button>
            ))}
          </div>
          <CosmosDots
            nodes={drawn.nodes}
            edges={drawn.edges}
            nodeColors={drawn.colors}
            matchedIds={matched}
            selectRequest={jump}
            className="min-h-[70vh] flex-1"
            onNodeClick={(subject) => navigate(link(`/i/${instanceId}/s/${encodeURIComponent(subject)}`))}
            renderPanel={(selection) => {
              if (selection.kind !== "edge") return null;
              const edge = edgeById.get(selection.id);
              if (!edge) return null;
              const sourceKind = edge.source.split("/", 1)[0]!;
              const targetKind = edge.target.split("/", 1)[0]!;
              return (
                <div className="text-[12px]">
                  <PanelHeading kicker="Subject-valued Claim" title={edge.predicate} />
                  {edge.qualifier && <div className="text-zinc-500">Qualifier {edge.qualifier}</div>}
                  <div className="mt-2 space-y-1">
                    <div>
                      <span className="text-zinc-600">from </span>
                      <RefLink value={edge.source}>
                        <span className="break-all font-mono">{idOf(edge.source, sourceKind)}</span>
                      </RefLink>
                    </div>
                    <div>
                      <span className="text-zinc-600">to </span>
                      <RefLink value={edge.target}>
                        <span className="break-all font-mono">{idOf(edge.target, targetKind)}</span>
                      </RefLink>
                    </div>
                    <div>
                      <RefLink value={edge.claim} />
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </>
      )}
    </div>
  );
}
