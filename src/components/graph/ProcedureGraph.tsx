import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Handle, MarkerType, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { Clock, Cpu, CornerDownRight, Database, Download, Flag, Funnel, Shuffle, SlidersHorizontal, type LucideIcon } from "lucide-react";
import { useInstanceId, useInterfaces } from "@/api/hooks";
import { SignalDot } from "@/components/Chip";
import { LoadState } from "@/components/Panel";
import { GraphCanvas, type GraphSelection } from "@/components/graph/GraphCanvas";
import type { RoutedEdgeData } from "@/components/graph/RoutedEdge";
import { useAtLink } from "@/lib/at";
import { parseRef, refRoute } from "@/lib/cruxible-ref";
import { slotBinding, slotInterfaceRef, type LineDefinition, type ProcedureSpec } from "@/lib/definitions";
import { providerName } from "@/lib/ontology";
import { buildProcedureGraph, edgeLabel, INPUT_NODE, lineage, type StepRole } from "@/lib/procedure-graph";
import type { RunMarks, StepMark } from "@/lib/run-marks";
import { layoutLayered, monoWidth, type TypeLayout } from "@/lib/type-layout";
import { term, type Signal } from "@/lib/vocabulary";

/**
 * A Procedure as a left-to-right graph: one node per step, typed by its role
 * with one visual per role (an icon and a border), edges wherever a step
 * names another (`$step.field`, labelled with the field when short; a
 * guard's else as a dashed edge). On a Line page the graph is wrapped by the
 * Line: its Triggers and parameters on the left, its max authority on the
 * terminals, and a run's marks (what happened at each step) when one is
 * picked. Clicking a step focuses everything upstream and downstream of it
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
  maxAuthority: string;
  triggers: GraphTrigger[];
}

const ROLE_ICON: Record<StepRole, LucideIcon> = {
  input: SlidersHorizontal,
  trigger: Clock,
  source: Download,
  tap: Database,
  call: Cpu,
  invoke: CornerDownRight,
  guard: Funnel,
  shape: Shuffle,
  terminal: Flag,
};

/** One border treatment per role; zinc only (color is for the two signals). */
const ROLE_BOX: Record<StepRole, string> = {
  input: "border-dashed border-zinc-700 bg-zinc-950",
  trigger: "border-dashed border-zinc-700 bg-zinc-950",
  source: "border-zinc-600 border-l-[3px] border-l-zinc-400 bg-zinc-900",
  tap: "border-zinc-700 bg-zinc-900",
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

type StepNodeData = NodeDisplay & { [key: string]: unknown };

const LINE_HEIGHT = 15;
const HEAD_HEIGHT = 20;
const PAD = 12;
const MIN_WIDTH = 130;
const MAX_WIDTH = 210;

function StepNode({ data }: NodeProps<Node<StepNodeData>>) {
  const Icon = ROLE_ICON[data.role];
  return (
    <div className={`h-full w-full overflow-hidden border px-2 py-1.5 ${ROLE_BOX[data.role]}`} title={data.kindMeaning}>
      <Handle type="target" position={Position.Left} className="!pointer-events-none !opacity-0" />
      <div className="flex h-4 items-center gap-1.5 text-[11px] leading-4">
        <Icon className="h-3 w-3 shrink-0 text-zinc-400" aria-hidden />
        <span className="text-zinc-500">{data.kindWord}</span>
        {data.name && <span className="truncate font-mono text-[12px] text-zinc-100">{data.name}</span>}
      </div>
      {data.lines.map((line, i) => (
        <NodeText key={i} line={line} />
      ))}
      {data.mark && <MarkLine mark={data.mark} />}
      <Handle type="source" position={Position.Right} className="!pointer-events-none !opacity-0" />
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
  const interfaces = useInterfaces();
  const builds = useMemo(
    () => new Map((interfaces.data?.rows ?? []).map((row) => [row.name, (row.providers ?? []).map((p) => p.provider)] as const)),
    [interfaces.data],
  );
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

  // Every node's words, from the definition (and the Line, and the run).
  const display = useMemo(() => {
    const out = new Map<string, NodeDisplay>();
    const bindingLine = (slot: string | null, step: string, mark: StepMark | null): NodeLine[] => {
      if (!slot) return [];
      const iface = spec.slots?.[slot] ?? null;
      const lines: NodeLine[] = [
        {
          // The slot is usually named after its step: then only the interface it takes.
          text: slot === step ? `via ${iface ?? "?"}` : `slot ${slot} → ${iface ?? "?"}`,
          title: iface ? `slot ${slot} takes ${iface}` : `slot ${slot} (no interface declared)`,
          to: iface ? routeOf(slotInterfaceRef(iface)) : null,
        },
      ];
      if (mark?.provider) {
        lines.push({ text: `bound ${providerName(mark.provider)}`, title: `This run's receipt pins ${mark.provider}`, tone: "plain" });
        return lines;
      }
      const binding = slotBinding(iface, definition?.bindings[slot], builds);
      if (binding.kind === "line") lines.push({ text: `Line binds ${providerName(binding.provider)}`, title: binding.provider, to: routeOf(`Provider:${binding.provider}`), tone: "plain" });
      else if (binding.kind === "fit") lines.push({ text: `by fit: ${providerName(binding.provider)}`, title: `No explicit binding: binds by fit to the one installed build, ${binding.provider}`, to: routeOf(`Provider:${binding.provider}`), tone: "plain" });
      else if (binding.kind === "fit_many") lines.push({ text: `by fit: one of ${binding.providers.length} builds`, title: binding.providers.join("\n"), tone: "plain" });
      else if (!interfaces.isPending) lines.push({ text: "no installed build", title: "No installed build fits this slot: install a Provider for its interface", tone: "plain", signal: "wrong" });
      return lines;
    };
    const authority = (kind: string): NodeLine[] =>
      line && ["propose", "settle", "emit", "inbox"].includes(kind)
        ? [{ text: `max authority ${term("authority", line.maxAuthority).word}`, title: term("authority", line.maxAuthority).meaning, tone: "plain" }]
        : [];

    for (const node of model.nodes) {
      const mark = run?.marks.get(node.id) ?? null;
      const lines: NodeLine[] = [];
      let kind: string = node.kind;
      let name: string | null = node.unnamed ? null : node.id;
      const v = node.view;
      if (node.kind === "input") {
        const parameters = Object.entries(definition?.parameters ?? {});
        if (line && parameters.length > 0) {
          kind = "parameters";
          name = null;
          for (const [key, value] of parameters) lines.push({ text: `${key} = ${typeof value === "string" ? value : JSON.stringify(value)}` });
        } else {
          name = null;
          for (const field of node.detail) lines.push({ text: field, tone: "dim" });
          if (node.detail.length === 0) lines.push({ text: "given at run", tone: "plain" });
        }
      } else if (v && node.kind === "source") {
        if (v.contract) lines.push({ text: v.contract, title: `retains a Capture under ${v.contract}`, to: contractRoute(v.contract) });
        if (definition?.triggerInput && definition.triggerInput === v.name) {
          lines.push({ text: "reads the landing", title: "This Line's trigger input: the step reads the Capture whose landing started the run", tone: "plain" });
        } else if (v.logicalSource && "literal" in v.logicalSource) {
          lines.push({ text: `from ${v.logicalSource.literal}`, title: `logical source ${v.logicalSource.literal}` });
        } else if (v.logicalSource) {
          const given = definition?.parameters[v.logicalSource.input];
          lines.push(
            typeof given === "string"
              ? { text: `from ${given}`, title: `logical source $input.${v.logicalSource.input} = ${given}` }
              : { text: `from $input.${v.logicalSource.input}`, title: "logical source given at run", tone: "dim" },
          );
        } else {
          lines.push({ text: "source its Provider names", title: "No logical_source in the request: the Provider names the logical source", tone: "plain" });
        }
        lines.push(...bindingLine(v.slot, node.id, mark));
      } else if (v && node.kind === "tap") {
        if (v.query) lines.push({ text: v.query, title: `query ${v.query}`, to: routeOf(`QueryDefinition:${v.query}`) });
      } else if (v && node.kind === "claim") {
        if (v.claimType) lines.push({ text: v.claimType, to: routeOf(`ClaimType:${v.claimType}`) });
      } else if (v && node.kind === "call") {
        lines.push(...bindingLine(v.slot, node.id, mark));
      } else if (v && node.kind === "invoke") {
        if (v.procedure) lines.push({ text: v.procedure, title: `runs Procedure ${v.procedure}`, to: routeOf(`Procedure:${v.procedure}`) });
        if (v.name) lines.push({ text: `as ${v.name}`, tone: "dim" });
      } else if (v && node.kind === "guard" && node.index !== null) {
        const step = spec.steps[node.index] as Record<string, unknown>;
        const condition = typeof step.guard === "string" ? step.guard : "";
        lines.push({ text: condition, title: condition });
        const otherwise = typeof step.else === "string" ? step.else : null;
        const refusal = typeof step.refusal_code === "string" ? step.refusal_code : null;
        const handsTo = model.edges.find((e) => e.kind === "control" && e.source === node.id && e.fields.includes("else"));
        if (handsTo) {
          const target = model.nodes.find((n) => n.id === handsTo.target);
          lines.push({ text: target?.kind === "halt" ? `else halt ${target.detail[0] ?? ""}` : `else ${handsTo.target}`, tone: "plain" });
        } else if (otherwise?.startsWith("abort") || refusal) {
          lines.push({ text: `else refuses ${refusal ?? "guard_refused"}`, tone: "plain" });
        }
      } else if (v && (node.kind === "propose" || node.kind === "settle")) {
        if (v.detail) lines.push({ text: v.detail, title: `${node.kind === "settle" ? "settles" : "proposes"} ${v.detail}` });
        lines.push(...authority(node.kind));
      } else if (v && node.kind === "emit") {
        if (v.contract) lines.push({ text: v.contract, title: `retains the output under ${v.contract}`, to: contractRoute(v.contract) });
        lines.push(...authority(node.kind));
      } else if (v && node.kind === "inbox" && node.index !== null) {
        const max = (spec.steps[node.index] as { max_items?: unknown }).max_items;
        if (typeof max === "number") lines.push({ text: `at most ${max} items`, tone: "plain" });
        lines.push(...authority(node.kind));
      } else if (node.kind === "halt") {
        lines.push({ text: node.detail[0] ?? "", title: `halts with ${node.detail[0] ?? "a code"}` });
      } else if (node.kind === "returns") {
        lines.push({ text: `${node.detail.length} ${node.detail.length === 1 ? "field" : "fields"}`, title: node.detail.join(", "), tone: "plain" });
      } else if (v && (node.kind === "project" || node.kind === "transform" || node.kind === "select" || node.kind === "repeat")) {
        if (v.contract) lines.push({ text: v.contract, title: `contract ${v.contract}` });
      }
      if (node.unresolved.length > 0) {
        const names = [...new Set(node.unresolved.map((r) => `$${r.name}`))];
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
          { text: trigger.words, tone: "plain" },
        ],
        mark: null,
      });
    }
    return out;
  }, [model, spec, line, definition, run, builds, interfaces.isPending, routeOf, contractRoute]);

  // The edges: the definition's, plus a landing Trigger into the step that reads the landing.
  const edges = useMemo(() => {
    const out = model.edges.map((e) => ({ id: e.id, source: e.source, target: e.target, control: e.kind === "control", label: e.kind === "control" ? e.fields.join(", ") : edgeLabel(e) }));
    const inputStep = definition?.triggerInput ? model.nodes.find((n) => n.view?.kind === "source" && n.view.name === definition.triggerInput) : undefined;
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
  const layoutKey = useMemo(() => JSON.stringify(layoutInput), [layoutInput]);
  const [layout, setLayout] = useState<{ key: string; result: TypeLayout | null } | null>(null);
  useEffect(() => {
    let live = true;
    const { nodes, edges } = JSON.parse(layoutKey) as typeof layoutInput;
    layoutLayered(nodes, edges, { looseColumn: false, edgeLabels: true, modelOrder: true, layerGap: 28 })
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
      data: { ...display.get(n.id)! },
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
  }, [laidOut, layoutInput, display, edges]);

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
  // As tall as the graph is at the zoom the canvas width allows, within the page.
  const zoom = canvasWidth > 0 && width > 0 ? Math.min(FIT_MAX_ZOOM, canvasWidth / (width * (1 + 2 * FIT_PADDING))) : 1;
  const canvasHeight = Math.min(640, Math.max(180, Math.ceil(height * zoom * (1 + 2 * FIT_PADDING)) + 64));
  return (
    <div ref={measure} style={{ height: canvasHeight }} data-testid="procedure-graph">
      <GraphCanvas
        nodes={nodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        renderPanel={() => null}
        className="h-full"
        neighborhood={neighborhood}
        onSelectionChange={onSelectionChange}
        recenter={false}
        nodeName={nodeName}
        fitPadding={FIT_PADDING}
      />
    </div>
  );
}
