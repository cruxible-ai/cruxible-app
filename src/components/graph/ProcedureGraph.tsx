import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { ArrowRightLeft, ArrowUpDown, Clock, Cpu, CornerDownRight, Database, Flag, Funnel, Shuffle, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { useInstanceId } from "@/api/hooks";
import { SignalDot } from "@/components/Chip";
import { LoadState } from "@/components/Panel";
import { CONTROL_CLASS, GraphCanvas, type GraphSelection } from "@/components/graph/GraphCanvas";
import { RefLink } from "@/components/RefLink";
import type { RoutedEdgeData } from "@/components/graph/RoutedEdge";
import { useAtLink } from "@/lib/at";
import { parseRef, refRoute } from "@/lib/cruxible-ref";
import { type LineDefinition, type ProcedureSpec, type StepView } from "@/lib/definitions";
import { providerName } from "@/lib/ontology";
import { buildProcedureGraph, edgeLabel, INPUT_NODE, lineage, type StepRole } from "@/lib/procedure-graph";
import type { RunMarks, StepMark } from "@/lib/run-marks";
import { layoutLayered, monoWidth, type TypeLayout } from "@/lib/type-layout";
import { term, type Signal } from "@/lib/vocabulary";
import { ROLE_COLOR } from "@/lib/palette";
import { sentence } from "@/lib/text";

/**
 * A Procedure as a left-to-right graph: one node per step, typed by its role
 * with one visual per role (an icon and a border), edges wherever a step
 * names another (a `{$ref: step}` reference, labelled with its path when
 * short; a guard's then/else as a dashed edge). Each node shows its id and
 * kind and the definitions its step names. On a Line page the graph is
 * wrapped by the Line: its Triggers and parameters on the left, and a run's
 * marks (what happened at each step) when one is picked. Clicking a step focuses everything upstream and downstream of it
 * (the focus chip and Esc clear it) and tells the page which step it is.
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
  lines: NodeLine[];
  mark: StepMark | null;
}

type StepNodeData = NodeDisplay & { vertical?: boolean; [key: string]: unknown };

const LINE_HEIGHT = 15;
const HEAD_HEIGHT = 20;
const PAD = 12;
const MIN_WIDTH = 130;
const MAX_WIDTH = 210;

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
      {data.lines.map((line, i) => (
        <NodeText key={i} line={line} />
      ))}
      {data.mark && <MarkLine mark={data.mark} />}
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

function MarkLine({ mark }: { mark: StepMark }) {
  const text = [mark.term.word, ...mark.notes].join(" · ");
  return (
    <div className="mt-0.5 flex h-[15px] items-center gap-1.5 border-t border-zinc-800 pt-0.5 text-[11px] leading-[15px] text-zinc-300" title={[mark.term.meaning, ...mark.notes, ...mark.hints].join("\n")}>
      {mark.term.signal && <SignalDot signal={mark.term.signal} title={mark.term.meaning} />}
      <span className="truncate">{text}</span>
    </div>
  );
}

const nodeTypes = { step: StepNode };

/** The node box: the widest line in 11px mono (the header in 12px) between the bounds. */
function boxOf(name: string | null, kindWord: string, lines: NodeLine[], mark: StepMark | null) {
  const head = monoWidth(name ?? "", 12) + monoWidth(kindWord, 11) + 56;
  const body = Math.max(0, ...lines.map((l) => monoWidth(l.text, 11) + (l.signal ? 12 : 0)));
  const markWidth = mark ? monoWidth([mark.term.word, ...mark.notes].join(" · "), 11) + 12 : 0;
  const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, head, body + PAD + 6, markWidth + PAD));
  const height = HEAD_HEIGHT + lines.length * LINE_HEIGHT + (mark ? LINE_HEIGHT + 3 : 0) + PAD;
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

  // Every node's id and kind, and what its step names (the Line's binding and the run's marks when given).
  const display = useMemo(() => {
    const out = new Map<string, NodeDisplay>();
    const bindingLine = (slot: string, mark: StepMark | null): NodeLine[] => {
      const provider = mark?.provider ?? definition?.bindings[slot] ?? null;
      if (!provider) return [{ text: `slot ${slot}`, tone: "dim" }];
      const pinned = Boolean(mark?.provider);
      return [
        {
          text: `slot ${slot} → ${providerName(provider)}`,
          title: pinned ? `This run's receipt pins ${provider}` : `The Line binds slot ${slot} to ${provider}`,
          to: routeOf(`Provider:${provider}`),
          tone: "plain",
        },
      ];
    };

    for (const node of model.nodes) {
      const mark = run?.marks.get(node.id) ?? null;
      const lines: NodeLine[] = [];
      let kind: string = node.kind;
      let name: string | null = node.unnamed ? null : node.id;
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
      } else if (v) {
        for (const contract of v.contracts) lines.push({ text: contract, title: `CaptureContract ${contract}`, to: contractRoute(contract) });
        if (v.slot) lines.push(...bindingLine(v.slot, mark));
        if (v.query) lines.push({ text: v.query, title: `Query ${v.query}`, to: routeOf(`QueryDefinition:${v.query}`) });
        if (v.procedure) lines.push({ text: v.procedure, title: `Procedure ${v.procedure}`, to: routeOf(`Procedure:${v.procedure}`) });
        if (v.detail) lines.push({ text: v.detail });
        if (definition?.triggerInput && definition.triggerInput === (v.name ?? v.id)) {
          lines.push({ text: "Reads the landing", title: "This Line's trigger input: the step reads the Capture whose landing started the run", tone: "plain" });
        }
      } else if (node.kind === "halt") {
        if (node.detail[0]) lines.push({ text: node.detail[0] });
      } else if (node.kind === "returns") {
        lines.push({ text: `${node.detail.length} ${node.detail.length === 1 ? "field" : "fields"}`, title: node.detail.join(", "), tone: "plain" });
      }
      if (node.unresolved.length > 0) {
        const names = [...new Set(node.unresolved.map((r) => r.name))];
        lines.push({ text: `names ${names.join(", ")}`, title: `${names.join(", ")}: no step of this Procedure declares ${names.length === 1 ? "it" : "them"}`, tone: "dim" });
      }
      const word = term("stepKind", kind);
      out.set(node.id, { role: node.role, kindWord: word.word, kindMeaning: word.meaning, name, lines, mark });
    }
    for (const trigger of line?.triggers ?? []) {
      const word = term("stepKind", "trigger");
      out.set(`${TRIGGER_PREFIX}${trigger.name}`, {
        role: "trigger",
        kindWord: word.word,
        kindMeaning: word.meaning,
        name: null,
        lines: [
          { text: trigger.name, to: routeOf(`Trigger:${trigger.name}`), title: `Trigger:${trigger.name}` },
          { text: sentence(trigger.words), tone: "plain" },
        ],
        mark: null,
      });
    }
    return out;
  }, [model, line, definition, run, routeOf, contractRoute]);

  // The edges: the definition's, plus a landing Trigger into the step that reads the landing.
  const edges = useMemo(() => {
    const out = model.edges.map((e) => ({ id: e.id, source: e.source, target: e.target, control: e.kind === "control", label: e.kind === "control" ? e.fields.join(", ") : edgeLabel(e) }));
    const inputStep = definition?.triggerInput
      ? model.nodes.find((n) => n.view?.kind === "call" && (n.view.name ?? n.view.id) === definition.triggerInput)
      : undefined;
    for (const trigger of line?.triggers ?? []) {
      if (trigger.landing && inputStep) {
        out.push({ id: `landing:${trigger.name}`, source: `${TRIGGER_PREFIX}${trigger.name}`, target: inputStep.id, control: false, label: "lands" });
      }
    }
    return out;
  }, [model, definition, line]);

  const layoutInput = useMemo(() => {
    const ids = [...(line?.triggers ?? []).map((t) => `${TRIGGER_PREFIX}${t.name}`), ...model.nodes.map((n) => n.id)];
    return {
      nodes: ids.map((id) => {
        const d = display.get(id)!;
        const box = boxOf(d.name, d.kindWord, d.lines, d.mark);
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
          return view ? <StepPanel view={view} binding={view.slot ? (definition?.bindings[view.slot] ?? null) : null} /> : null;
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

/** A clicked step: what it is, what it names (linked), and the build the Line binds its slot to. */
function StepPanel({ view, binding }: { view: StepView; binding: string | null }) {
  const row = (label: string, value: ReactNode) => (
    <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-2">
      <dt className="text-zinc-500">{label}</dt>
      <dd className="min-w-0 break-words text-zinc-300">{value}</dd>
    </div>
  );
  return (
    <div className="space-y-2 text-[12px]">
      <div>
        <div className="t-meta">{term("stepKind", view.kind).word}</div>
        <div className="font-mono text-[13px] text-zinc-100">{view.id}</div>
        <div className="mt-0.5 text-zinc-500">{term("stepKind", view.kind).meaning}</div>
      </div>
      <dl className="space-y-1">
        {view.name && view.name !== view.id && row("Name", <span className="font-mono">{view.name}</span>)}
        {view.contracts.map((contract) => (
          <div key={contract}>{row("Contract", <RefLink value={`CaptureContract:${contract}`} />)}</div>
        ))}
        {view.query && row("Query", <RefLink value={`query:${view.query}`} />)}
        {view.claimTypes.map((claimType) => (
          <div key={claimType}>{row("ClaimType", <RefLink value={`ClaimType:${claimType}`} />)}</div>
        ))}
        {view.procedure && row("Procedure", <RefLink value={`Procedure:${view.procedure}`} />)}
        {view.slot && row("Slot", <span className="font-mono">{view.slot}</span>)}
        {binding && row("Binds", <RefLink value={`Provider:${binding}`}>{providerName(binding)}</RefLink>)}
        {view.detail && row("Detail", <span className="font-mono">{view.detail}</span>)}
      </dl>
    </div>
  );
}
