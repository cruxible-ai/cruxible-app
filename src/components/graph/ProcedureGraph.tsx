import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { ArrowRightLeft, ArrowUpDown, Clock, Cpu, CornerDownRight, Database, Flag, Funnel, Shuffle, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { useGetBatch, useInstanceId } from "@/api/hooks";
import { cardOf } from "@/api/schemas";
import { SignalDot } from "@/components/Chip";
import { LoadState } from "@/components/Panel";
import { CONTROL_CLASS, GraphCanvas, type GraphSelection } from "@/components/graph/GraphCanvas";
import type { RoutedEdgeData } from "@/components/graph/RoutedEdge";
import { useAtLink } from "@/lib/at";
import { parseRef, refRoute } from "@/lib/cruxible-ref";
import { type LineDefinition, type ProcedureSpec, type StepView } from "@/lib/definitions";
import { buildProcedureGraph, edgeLabel, INPUT_NODE, lineage, type StepRole } from "@/lib/procedure-graph";
import type { RunMarks, StepMark } from "@/lib/run-marks";
import { flowWords, partsText, queryShape, stepBrief, stepSections, summaryWords, type DetailSection, type Part, type QueryShape } from "@/lib/step-words";
import { FieldList } from "@/components/FieldList";
import { PanelGroup, PanelHeading } from "@/components/graph/PanelBits";
import { InfoButton } from "@/components/InfoButton";
import { Parts } from "@/components/Parts";
import { layoutLayered, monoWidth, type TypeLayout } from "@/lib/type-layout";
import { term, type Signal } from "@/lib/vocabulary";
import { ROLE_COLOR } from "@/lib/palette";
import { sentence } from "@/lib/text";

/**
 * A Procedure as a left-to-right graph: one node per step, typed by its role
 * with one visual per role (an icon and a border), edges wherever a step
 * names another (a `{$ref: step}` reference, labelled with its path when
 * short; a guard's then/else as a dashed edge). Each node shows its kind and
 * name and what the step is for in plain words (step-words.ts), with the
 * named things linked and the internal names on hover. On a Line page the
 * graph is wrapped by the Line: its Triggers and parameters on the left, and
 * a run's marks when one is picked: what happened at each step, in counts
 * where the run card's node summary gives them ("1,766 records · complete"),
 * and the count flowing along an edge. Clicking a step focuses everything
 * upstream and downstream of it (the focus chip and Esc clear it) and tells
 * the page which step it is.
 */

/** A Line's Trigger as the graph shows it: its schedule in words, and whether its landing feeds the trigger input. */
export interface GraphTrigger {
  name: string;
  words: string;
  landing: boolean;
}

export interface LineGraphContext {
  definition: LineDefinition | null;
  triggers: GraphTrigger[];
}

const ROLE_ICON: Record<StepRole, LucideIcon> = {
  input: SlidersHorizontal,
  trigger: Clock,
  read: Database,
  call: Cpu,
  invoke: CornerDownRight,
  guard: Funnel,
  shape: Shuffle,
  terminal: Flag,
};

/** One border treatment per role; the role's color (palette.ts) is the accent on the left edge and icon. */
const ROLE_BOX: Record<StepRole, string> = {
  input: "border-dashed border-zinc-700 bg-zinc-950",
  trigger: "border-dashed border-zinc-700 bg-zinc-950",
  read: "border-zinc-700 bg-zinc-900",
  call: "border-zinc-500 bg-zinc-900",
  invoke: "border-zinc-500 border-double border-[3px] bg-zinc-900",
  guard: "border-dashed border-zinc-500 bg-zinc-900",
  shape: "border-dotted border-zinc-600 bg-zinc-900",
  terminal: "border-zinc-600 border-r-[3px] border-r-zinc-400 bg-zinc-900",
};

interface NodeLine {
  text: string;
  title?: string | undefined;
  /** An in-app route the line links to. */
  to?: string | null | undefined;
  tone?: "name" | "dim" | "plain";
  signal?: Signal | undefined;
}

interface NodeDisplay {
  role: StepRole;
  kindWord: string;
  kindMeaning: string;
  name: string | null;
  /** The step's key fields, one line (`cisa.gov · JSON`); named things linked, all of it on hover. */
  brief: { parts: Part[]; routes: (string | null)[]; title: string } | null;
  lines: NodeLine[];
  mark: StepMark | null;
  /** The mark's words: the run's counts for the node when its summary gives them. */
  markWords: { text: string; title: string } | null;
}

type StepNodeData = NodeDisplay & { vertical?: boolean; [key: string]: unknown };

const LINE_HEIGHT = 15;
const HEAD_HEIGHT = 20;
const PAD = 12;
const MIN_WIDTH = 130;
const MAX_WIDTH = 240;

function StepNode({ data }: NodeProps<Node<StepNodeData>>) {
  const Icon = ROLE_ICON[data.role];
  return (
    <div
      className={`h-full w-full overflow-hidden border px-2 py-1.5 ${ROLE_BOX[data.role]}`}
      style={{ borderLeftColor: ROLE_COLOR[data.role].color, borderLeftWidth: 3 }}
      title={data.kindMeaning}
    >
      <Handle type="target" position={data.vertical ? Position.Top : Position.Left} className="!pointer-events-none !opacity-0" />
      <div className="flex h-4 items-center gap-1.5 text-[11px] leading-4">
        <Icon className="h-3 w-3 shrink-0" style={{ color: ROLE_COLOR[data.role].color }} aria-hidden />
        <span style={{ color: ROLE_COLOR[data.role].color }}>{data.kindWord}</span>
        {data.name && <span className="truncate font-mono text-[12px] text-zinc-100">{data.name}</span>}
      </div>
      {data.brief && <BriefLine brief={data.brief} />}
      {data.lines.map((line, i) => (
        <NodeText key={i} line={line} />
      ))}
      {data.mark && <MarkLine mark={data.mark} words={data.markWords} />}
      <Handle type="source" position={data.vertical ? Position.Bottom : Position.Right} className="!pointer-events-none !opacity-0" />
    </div>
  );
}

function NodeText({ line }: { line: NodeLine }) {
  const tone = line.tone === "dim" ? "text-zinc-500" : line.tone === "plain" ? "font-sans text-zinc-400" : "text-zinc-300";
  const body = line.to ? (
    <Link to={line.to} className="nodrag nopan hover:text-white hover:underline" onClick={(e) => e.stopPropagation()}>
      {line.text}
    </Link>
  ) : (
    line.text
  );
  return (
    <div className={`flex h-[15px] items-center gap-1.5 truncate font-mono text-[11px] leading-[15px] ${tone}`} title={line.title ?? line.text}>
      {line.signal && <SignalDot signal={line.signal} title={line.title ?? line.text} />}
      <span className="truncate">{body}</span>
    </div>
  );
}

/** A step's key fields on one line: payload and definition names as code, named things linked, all of it on hover. */
function BriefLine({ brief }: { brief: NonNullable<NodeDisplay["brief"]> }) {
  return (
    <div className="truncate text-[11px] leading-[15px] text-zinc-300" title={brief.title}>
      {brief.parts.map((part, i) => {
        const text = part.code ? <code className="font-mono text-[10.5px] text-zinc-200">{part.text}</code> : part.text;
        const to = brief.routes[i];
        return to ? (
          <Link key={i} to={to} title={part.title} className="nodrag nopan text-zinc-100 hover:text-white hover:underline" onClick={(e) => e.stopPropagation()}>
            {text}
          </Link>
        ) : (
          <span key={i} title={part.title}>
            {text}
          </span>
        );
      })}
    </div>
  );
}

/** The mark's text: the run's counts for the node when its summary gives them (a signal word still leads), else what happened. */
function markText(mark: StepMark, words: NodeDisplay["markWords"]): string {
  // The counts say it all; the verdict, the egress and the Captures read stay on hover.
  if (words && !mark.term.signal) return words.text;
  return [mark.term.word, ...(words ? [words.text] : []), ...mark.notes].join(" · ");
}

function MarkLine({ mark, words }: { mark: StepMark; words: NodeDisplay["markWords"] }) {
  const text = markText(mark, words);
  return (
    <div
      className="mt-0.5 flex h-[15px] items-center gap-1.5 border-t border-zinc-800 pt-0.5 text-[11px] leading-[15px] text-zinc-300"
      title={[mark.term.meaning, ...(words ? [words.title] : []), ...mark.notes, ...mark.hints].join("\n")}
    >
      {mark.term.signal && <SignalDot signal={mark.term.signal} title={mark.term.meaning} />}
      <span className="truncate">{text}</span>
    </div>
  );
}

const nodeTypes = { step: StepNode };

/**
 * The node box: the widest line (11px mono, the header 12px) between the
 * bounds; longer lines truncate, all of them on hover.
 */
function boxOf(d: NodeDisplay) {
  const inner = PAD + 6;
  const head = monoWidth(d.name ?? "", 12) + monoWidth(d.kindWord, 11) + 56;
  const body = Math.max(0, ...d.lines.map((l) => monoWidth(l.text, 11) + (l.signal ? 12 : 0)));
  const markWidth = d.mark ? monoWidth(markText(d.mark, d.markWords), 11) + 12 : 0;
  const brief = d.brief ? Math.ceil(monoWidth(partsText(d.brief.parts), 11) * 0.92) : 0;
  const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, head, body + inner, markWidth + PAD, brief + inner));
  const height = HEAD_HEIGHT + ((d.brief ? 1 : 0) + d.lines.length) * LINE_HEIGHT + (d.mark ? LINE_HEIGHT + 3 : 0) + PAD;
  return { width, height };
}

const TRIGGER_PREFIX = "trigger:";
const FIT_PADDING = 0.05;
const FIT_MAX_ZOOM = 1.15;
/** Below this the step text is too small to read: a wider graph pans sideways instead. */
const FIT_MIN_ZOOM = 0.8;

export function ProcedureGraph({
  spec,
  line,
  run,
  onSelectStep,
}: {
  spec: ProcedureSpec;
  line?: LineGraphContext | null | undefined;
  run?: RunMarks | null | undefined;
  /** Told the authored step id a click selects (null: cleared). */
  onSelectStep?: ((step: string | null) => void) | undefined;
}) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const model = useMemo(() => buildProcedureGraph(spec), [spec]);
  const definition = line?.definition ?? null;

  const routeOf = useCallback(
    (ref: string) => {
      const parsed = parseRef(ref);
      const route = parsed ? refRoute(instanceId, parsed) : null;
      return route ? link(route) : null;
    },
    [instanceId, link],
  );
  const contractRoute = useCallback(
    (name: string) => link(`/i/${instanceId}/contracts/${encodeURIComponent(name.replace(/^CaptureContract:/, ""))}`),
    [instanceId, link],
  );

  const queries = useQueryShapes(spec);

  // Every node's kind and name, its key fields, and the run's marks and counts when one is picked.
  const ctx = useMemo(() => ({ parameters: definition?.parameters, triggerInput: definition?.triggerInput, queries, bindings: definition?.bindings }), [definition, queries]);
  const display = useMemo(() => {
    const out = new Map<string, NodeDisplay>();
    const partRoute = (ref: string | undefined) => (ref ? (ref.startsWith("CaptureContract:") ? contractRoute(ref) : routeOf(ref)) : null);

    for (const node of model.nodes) {
      const mark = run?.marks.get(node.id) ?? null;
      const lines: NodeLine[] = [];
      let kind: string = node.kind;
      let name: string | null = node.unnamed ? null : node.id;
      let brief: NodeDisplay["brief"] = null;
      const v = node.view;
      if (node.kind === "input") {
        const parameters = Object.entries(definition?.parameters ?? {});
        name = null;
        if (line && parameters.length > 0) {
          kind = "parameters";
          for (const [key, value] of parameters) lines.push({ text: `${key} = ${typeof value === "string" ? value : JSON.stringify(value)}` });
        } else {
          for (const field of node.detail) lines.push({ text: field, tone: "dim" });
          if (node.detail.length === 0) lines.push({ text: "Given at run", tone: "plain" });
        }
      } else if (v && node.index !== null) {
        const parts = stepBrief(spec, node.index, ctx);
        if (parts.length) {
          // A call's Provider is on hover: the run's pinned build, else the Line's binding.
          const provider = v.slot ? (mark?.provider ?? definition?.bindings[v.slot] ?? null) : null;
          const via = provider ? `\nslot ${v.slot} → ${provider}${mark?.provider ? " (pinned by this run)" : ""}` : "";
          brief = { parts, title: `${partsText(parts)}${via}`, routes: parts.map((p) => partRoute(p.ref)) };
        }
      } else if (node.kind === "halt") {
        if (node.detail[0]) brief = { parts: [{ text: node.detail[0], code: true }], title: `halt ${node.detail[0]}`, routes: [null] };
      } else if (node.kind === "returns") {
        lines.push({ text: `${node.detail.length} ${node.detail.length === 1 ? "field" : "fields"}`, title: node.detail.join(", "), tone: "plain" });
      }
      if (node.unresolved.length > 0) {
        const names = [...new Set(node.unresolved.map((r) => r.name))];
        lines.push({ text: `names ${names.join(", ")}`, title: `${names.join(", ")}: no step of this Procedure declares ${names.length === 1 ? "it" : "them"}`, tone: "dim" });
      }
      const markWords = mark?.summary ? summaryWords(mark.summary) : null;
      const word = term("stepKind", kind);
      out.set(node.id, { role: node.role, kindWord: word.word, kindMeaning: word.meaning, name, brief, lines, mark, markWords });
    }
    for (const trigger of line?.triggers ?? []) {
      const word = term("stepKind", "trigger");
      out.set(`${TRIGGER_PREFIX}${trigger.name}`, {
        role: "trigger",
        kindWord: word.word,
        kindMeaning: word.meaning,
        name: null,
        brief: null,
        lines: [
          { text: trigger.name, to: routeOf(`Trigger:${trigger.name}`), title: `Trigger:${trigger.name}` },
          { text: sentence(trigger.words), tone: "plain" },
        ],
        mark: null,
        markWords: null,
      });
    }
    return out;
  }, [model, spec, line, definition, run, routeOf, contractRoute, ctx]);

  // The edges: the definition's, plus a landing Trigger into the step that reads the landing.
  const edges = useMemo(() => {
    // A data edge carries the run's count of what flows along it when the source's summary gives one.
    const out = model.edges.map((e) => {
      const flow = e.kind === "data" ? flowWords(run?.marks.get(e.source)?.summary, e.fields) : null;
      return { id: e.id, source: e.source, target: e.target, control: e.kind === "control", label: e.kind === "control" ? e.fields.join(", ") : (flow ?? edgeLabel(e)) };
    });
    const inputStep = definition?.triggerInput
      ? model.nodes.find((n) => n.view?.kind === "call" && (n.view.name ?? n.view.id) === definition.triggerInput)
      : undefined;
    for (const trigger of line?.triggers ?? []) {
      if (trigger.landing && inputStep) {
        out.push({ id: `landing:${trigger.name}`, source: `${TRIGGER_PREFIX}${trigger.name}`, target: inputStep.id, control: false, label: "lands" });
      }
    }
    return out;
  }, [model, definition, line, run]);

  const layoutInput = useMemo(() => {
    const ids = [...(line?.triggers ?? []).map((t) => `${TRIGGER_PREFIX}${t.name}`), ...model.nodes.map((n) => n.id)];
    return {
      nodes: ids.map((id) => {
        const d = display.get(id)!;
        const box = boxOf(d);
        return { id, ...box, first: id.startsWith(TRIGGER_PREFIX) || id === INPUT_NODE };
      }),
      edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target, label: e.label })),
    };
  }, [model, display, edges, line]);
  // Which way the steps run: left to right (default) or top to bottom, a wide Procedure's better fit; remembered per browser.
  const [vertical, setVertical] = useState(() => {
    try {
      return window.localStorage.getItem("cruxible.steps.vertical") === "1";
    } catch {
      return false;
    }
  });
  const toggleVertical = useCallback(() => {
    setVertical((v) => {
      try {
        window.localStorage.setItem("cruxible.steps.vertical", v ? "0" : "1");
      } catch {
        // not remembered; the toggle still works on this page
      }
      return !v;
    });
  }, []);
  const layoutKey = useMemo(() => JSON.stringify({ ...layoutInput, vertical }), [layoutInput, vertical]);
  const [layout, setLayout] = useState<{ key: string; result: TypeLayout | null } | null>(null);
  useEffect(() => {
    let live = true;
    const { nodes, edges } = JSON.parse(layoutKey) as typeof layoutInput;
    layoutLayered(nodes, edges, { looseColumn: false, edgeLabels: true, modelOrder: true, layerGap: 28, direction: vertical ? "DOWN" : "RIGHT" })
      .then((result) => live && setLayout({ key: layoutKey, result }))
      .catch(() => live && setLayout({ key: layoutKey, result: null }));
    return () => {
      live = false;
    };
  }, [layoutKey]);
  const laidOut = layout?.key === layoutKey ? layout : null;

  // The canvas width, so its height can follow the zoom fitView will pick.
  const [canvasWidth, setCanvasWidth] = useState(0);
  const observer = useRef<ResizeObserver | null>(null);
  const measure = useCallback((el: HTMLDivElement | null) => {
    observer.current?.disconnect();
    observer.current = null;
    if (!el) return;
    setCanvasWidth(el.clientWidth);
    if (typeof ResizeObserver === "undefined") return;
    observer.current = new ResizeObserver(([entry]) => entry && setCanvasWidth(entry.contentRect.width));
    observer.current.observe(el);
  }, []);

  const { nodes, flowEdges, width, height } = useMemo(() => {
    if (!laidOut) return { nodes: [] as Node<StepNodeData>[], flowEdges: [] as Edge[], width: 0, height: 0 };
    const sizes = new Map(layoutInput.nodes.map((n) => [n.id, n]));
    const at = (id: string, i: number) => laidOut.result?.positions.get(id) ?? { x: i * (MAX_WIDTH + 60), y: 0 };
    const nodes: Node<StepNodeData>[] = layoutInput.nodes.map((n, i) => ({
      id: n.id,
      type: "step",
      position: at(n.id, i),
      style: { width: n.width, height: n.height },
      data: { ...display.get(n.id)!, vertical },
    }));
    const positions = new Map(nodes.map((n) => [n.id, n.position]));
    const flowEdges: Edge[] = edges.map((e) => {
      const stroke = "#726f63";
      const route = laidOut.result?.routes.get(e.id);
      const base = {
        id: e.id,
        source: e.source,
        target: e.target,
        markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12, color: stroke },
        style: { stroke, strokeWidth: 1.25, ...(e.control ? { strokeDasharray: "4 3" } : {}) },
      };
      return route
        ? {
            ...base,
            type: "routed",
            data: { points: route.points, labelAt: route.label, text: e.label, curve: true, always: true, sourceAt: positions.get(e.source)!, targetAt: positions.get(e.target)! } satisfies RoutedEdgeData,
          }
        : { ...base, label: e.label };
    });
    const bottom = Math.max(0, ...nodes.map((n) => n.position.y + (sizes.get(n.id)?.height ?? 0)));
    const right = Math.max(0, ...nodes.map((n) => n.position.x + (sizes.get(n.id)?.width ?? 0)));
    return { nodes, flowEdges, width: right, height: bottom };
  }, [laidOut, layoutInput, display, edges, vertical]);

  const neighborhood = useCallback((nodeId: string, all: Edge[]) => lineage(nodeId, all), []);
  const stepIds = useMemo(() => new Set(model.nodes.filter((n) => n.index !== null).map((n) => n.id)), [model]);
  const onSelectionChange = useCallback(
    (selection: GraphSelection | null) => onSelectStep?.(selection?.kind === "node" && stepIds.has(selection.id) ? selection.id : null),
    [onSelectStep, stepIds],
  );
  const nodeName = useCallback(
    (id: string) => (id === INPUT_NODE ? display.get(id)?.kindWord.toLowerCase() ?? "input" : id.startsWith(TRIGGER_PREFIX) ? id.slice(TRIGGER_PREFIX.length) : id),
    [display],
  );

  if (!laidOut) return <LoadState />;
  // As tall as the graph is at the zoom it will be shown at (the width's fit, but never below a readable zoom),
  // up to most of the window. The canvas owns its height, so expanding it pushes the page down.
  const fitZoom = canvasWidth > 0 && width > 0 ? Math.min(FIT_MAX_ZOOM, canvasWidth / (width * (1 + 2 * FIT_PADDING))) : 1;
  const zoom = Math.max(FIT_MIN_ZOOM, fitZoom);
  const most = typeof window !== "undefined" ? Math.round(window.innerHeight * 0.8) : 800;
  const canvasHeight = Math.min(most, Math.max(220, Math.ceil(height * zoom * (1 + 2 * FIT_PADDING)) + 64));
  return (
    <div ref={measure} data-testid="procedure-graph">
      <GraphCanvas
        nodes={nodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        renderPanel={(selection) => {
          if (selection.kind !== "node") return null;
          const view = model.nodes.find((n) => n.id === selection.id)?.view;
          const index = model.nodes.find((n) => n.id === selection.id)?.index;
          return view && index != null ? <StepPanel view={view} sections={stepSections(spec, index, ctx)} mark={run?.marks.get(selection.id) ?? null} /> : null;
        }}
        className=""
        height={canvasHeight}
        fitMinZoom={FIT_MIN_ZOOM}
        neighborhood={neighborhood}
        onSelectionChange={onSelectionChange}
        recenter={false}
        nodeName={nodeName}
        fitPadding={FIT_PADDING}
        overlay={<RoleLegend roles={nodes.map((n) => n.data.role)} />}
        controls={
          <button
            onClick={toggleVertical}
            title={vertical ? "Lay the steps out left to right" : "Lay the steps out top to bottom"}
            aria-label={vertical ? "Lay the steps out left to right" : "Lay the steps out top to bottom"}
            className={CONTROL_CLASS}
          >
            {vertical ? <ArrowRightLeft className="h-3.5 w-3.5" /> : <ArrowUpDown className="h-3.5 w-3.5" />}
          </button>
        }
      />
    </div>
  );
}

/** The colors of the roles this graph uses, in reading order. */
function RoleLegend({ roles }: { roles: StepRole[] }) {
  const order: StepRole[] = ["trigger", "input", "read", "call", "invoke", "guard", "shape", "terminal"];
  const present = order.filter((r) => roles.includes(r));
  return (
    <span className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 border border-zinc-800 bg-zinc-950/90 px-2 py-0.5 text-[11px] text-zinc-400">
      {present.map((r) => (
        <span key={r} className="inline-flex items-center gap-1">
          <span className="h-2 w-2 shrink-0" style={{ backgroundColor: ROLE_COLOR[r].color }} aria-hidden />
          {ROLE_COLOR[r].legend}
        </span>
      ))}
    </span>
  );
}

/**
 * A clicked step, in the Type map's panel style: kind and id, then its fields
 * in titled groups (compact name | value rows), named things linked, ids on
 * hover; with a run picked, that run's counts for it.
 */
function StepPanel({ view, sections, mark }: { view: StepView; sections: DetailSection[]; mark: StepMark | null }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const kind = term("stepKind", view.kind);
  const route = (ref: string | undefined) => {
    const parsed = ref ? parseRef(ref) : null;
    const to = parsed ? refRoute(instanceId, parsed) : null;
    return to ? link(to) : undefined;
  };
  const words = mark?.summary ? summaryWords(mark.summary) : null;
  return (
    <div>
      <PanelHeading kicker={kind.word} title={view.id} />
      {mark && (
        <div className="text-[12px] text-zinc-400" title={[mark.term.meaning, words?.title].filter(Boolean).join("\n")}>
          {words && !mark.term.signal ? words.text : [mark.term.word, ...mark.notes].join(" · ")}
        </div>
      )}
      {sections.map((section) =>
        section.columns && section.cells ? (
          <PanelGroup key={section.title} title={section.title}>
            <table className="w-full text-[12px]" aria-label={section.title}>
              <thead>
                <tr className="text-left text-[11px] text-zinc-500">
                  <th className="py-1 pr-3 font-normal">ClaimType</th>
                  {section.columns.map((column) => (
                    <th key={column.header} className="py-1 pr-3 font-normal">
                      <span className="inline-flex items-center gap-1">
                        {column.header}
                        {column.info && <InfoButton label={column.header}>{column.info}</InfoButton>}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.rows.map((row, i) => (
                  <tr key={`${row.label}:${i}`} className="border-t border-zinc-800 align-baseline">
                    <td className="py-1.5 pr-3 font-mono text-zinc-200" title={row.title}>
                      {route(row.ref) ? (
                        <Link to={route(row.ref)!} className="hover:underline">
                          {row.label}
                        </Link>
                      ) : (
                        row.label
                      )}
                    </td>
                    {(section.cells![i] ?? []).map((cell, j) => (
                      <td key={j} className="break-words py-1.5 pr-3 text-zinc-300">
                        <Parts parts={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </PanelGroup>
        ) : (
        <PanelGroup key={section.title} title={section.title}>
          <FieldList
            density="compact"
            labels={section.rows.some((r) => r.name) ? "names" : "words"}
            label={section.title}
            fields={section.rows.map((row, i) => ({
              key: `${row.label}:${i}`,
              label: row.label,
              labelHref: route(row.ref),
              labelTitle: row.title,
              value: (
                <span className="break-words text-zinc-300">
                  <Parts parts={row.value} />
                </span>
              ),
            }))}
          />
        </PanelGroup>
        ),
      )}
    </div>
  );
}

/** The Queries a Procedure's read steps name, read with their row Contracts: what each read returns. */
export function useQueryShapes(spec: ProcedureSpec): ReadonlyMap<string, QueryShape> {
  const queryNames = useMemo(() => [...new Set(spec.steps.flatMap((step) => ("read" in step && step.query ? [step.query] : [])))].sort(), [spec]);
  const queryReads = useGetBatch(queryNames.map((name) => `QueryDefinition:${name}`));
  const queryCards = queryNames.map((_, i) => cardOf(queryReads.results[i], "query"));
  const rowNames = [...new Set(queryCards.flatMap((card) => queryShape(card, null)?.row ?? []))].sort();
  const rowReads = useGetBatch(rowNames.map((row) => `Contract:${row}`));
  const key = JSON.stringify([queryCards, rowReads.results]);
  return useMemo(() => {
    const out = new Map<string, QueryShape>();
    queryNames.forEach((name, i) => {
      const card = queryCards[i];
      const row = queryShape(card, null)?.row;
      const contract = row ? cardOf(rowReads.results[rowNames.indexOf(row)], "contract") : null;
      const shape = queryShape(card, contract);
      if (shape) out.set(name, shape);
    });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by what the reads returned
  }, [key]);
}

