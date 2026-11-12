import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Handle, Position, type Edge, type Node, type NodeProps } from "@xyflow/react";
import { ArrowRightLeft, ArrowUpDown, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useCaptureContracts, useGetBatch, useInstanceId } from "@/api/hooks";
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
import { layoutLayered, type Point, type TypeLayout } from "@/lib/type-layout";
import { term, type Signal } from "@/lib/vocabulary";
import { ROLE_COLOR, STAGE_COLOR } from "@/lib/palette";
import { contractName } from "@/lib/ontology";
import { listFields, stageOf, type ListField, type ListMember, type Stage } from "@/lib/template";
import { MemberStatus, memberHover } from "@/components/ListMembers";
import { DataTable, type Column } from "@/components/DataTable";
import { RefLink } from "@/components/RefLink";
import { captureHandle } from "@/lib/next-reasons";
import { sentence } from "@/lib/text";
import type { LineDependency } from "@/lib/line-dependencies";
import { useLineDependencies } from "@/lib/useLineDependencies";
import { DependencyPopover, producerName, type PopoverAt } from "@/components/DependencyPopover";

/**
 * A Procedure as a graph of slot nodes: one node per step, all one width, laid
 * out in layers (top to bottom by default, left to right on the toggle). Each
 * node is a frame: a header strip with the step's kind word (the only color,
 * its meaning on hover) and name, then rows of what the step reads, calls or
 * writes (step-words.ts), named things linked, all of it on hover. Every edge
 * leaves a step at its out port and enters the next at its in port, routed at
 * right angles, captioned with what it carries (a `{$ref: step}` reference's
 * path when short; a guard's then/else). The Procedure's input and a Line's
 * parameters are configuration, not steps: each shows as a row inside the step
 * that reads it, with the Line's value. On a Line page the graph also shows
 * its Triggers (first) and a run's marks when one is picked: what happened at
 * each step, in counts where the run card's node summary gives them ("1,766
 * records · complete"), and the count flowing along an edge. Clicking a step
 * focuses everything upstream and downstream of it (the focus chip and Esc
 * clear it) and tells the page which step it is. On a Line page, a band above
 * the graph names the Lines (or Entered directly) that produce what its read
 * steps' Queries read, and a band below names the Lines whose Queries read
 * what it writes: each a link to the Line, with a toggle that opens which
 * Query reads what.
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

interface NodeLine {
  text: string;
  title?: string | undefined;
  /** An in-app route the line links to. */
  to?: string | null | undefined;
  tone?: "dim" | "plain";
  /** The text is a name (a field, URL, reference): mono. */
  code?: boolean;
  /** A parameter or input row: the parameter's name, shown before its value. */
  param?: string;
  signal?: Signal | undefined;
}

interface NodeDisplay {
  role: StepRole;
  /** The step's template stage (D-R37); null for a step outside it (and the Trigger nodes). */
  stage: Stage | null;
  kindWord: string;
  kindMeaning: string;
  name: string | null;
  /** Where the name links (a Trigger's page). */
  nameTo?: string | null;
  /** The step's key fields, one line (`cisa.gov · JSON`); named things linked, all of it on hover. */
  brief: { parts: Part[]; routes: (string | null)[]; title: string } | null;
  lines: NodeLine[];
  mark: StepMark | null;
  /** The mark's words: the run's counts for the node when its summary gives them. */
  markWords: { text: string; title: string } | null;
}

type StepNodeData = NodeDisplay & { vertical?: boolean; hasIn?: boolean; hasOut?: boolean; [key: string]: unknown };

/** Every node is one width, so the steps line up in columns. */
export const NODE_WIDTH = 260;
const HEAD_HEIGHT = 26;
const ROW_HEIGHT = 16;
const BODY_PAD = 10;
const MARK_HEIGHT = 25;
const BORDER = 2;

const EDGE_STROKE = "#6b6857";
const EDGE_LABEL = "bg-zinc-950 px-1 text-[10.5px] leading-[14px] text-zinc-400";

/** A kind word's color: its stage's, the Trigger's; none (neutral text) for a step outside the template. */
function kindColor(d: Pick<NodeDisplay, "role" | "stage">): string | null {
  if (d.stage) return STAGE_COLOR[d.stage].color;
  return d.role === "trigger" ? ROLE_COLOR.trigger.color : null;
}

/** A name that truncates from its start, so the end that tells names apart shows; all of it on hover. */
function EndFirst({ text, title, className = "" }: { text: string; title?: string; className?: string }) {
  return (
    <span className={`block min-w-0 overflow-hidden text-ellipsis whitespace-nowrap ${className}`} style={{ direction: "rtl", textAlign: "left" }} title={title ?? text}>
      <bdi dir="ltr">{text}</bdi>
    </span>
  );
}

/** A port: a dot at the centre of the side edges enter (in) or leave (out) by; hidden where no edge attaches. */
function Port({ type, vertical, shown }: { type: "source" | "target"; vertical: boolean; shown: boolean }) {
  const position = type === "target" ? (vertical ? Position.Top : Position.Left) : vertical ? Position.Bottom : Position.Right;
  return (
    <Handle
      type={type}
      position={position}
      isConnectable={false}
      className={`!pointer-events-none !h-[7px] !min-h-0 !w-[7px] !min-w-0 !rounded-full !border !border-zinc-500 !bg-zinc-900 ${shown ? "" : "!opacity-0"}`}
    />
  );
}

function StepNode({ data }: NodeProps<Node<StepNodeData>>) {
  const color = kindColor(data);
  const word = data.stage ? STAGE_COLOR[data.stage].tag : data.kindWord;
  const meaning = data.stage ? `${STAGE_COLOR[data.stage].legend}\n${data.kindWord}: ${data.kindMeaning}` : `${data.kindWord}: ${data.kindMeaning}`;
  const body = data.brief !== null || data.lines.length > 0 || data.mark !== null;
  const vertical = data.vertical === true;
  return (
    <div className="flex h-full w-full flex-col border border-zinc-700 bg-zinc-900" data-stage={data.stage ?? undefined}>
      <Port type="target" vertical={vertical} shown={data.hasIn === true} />
      <div className={`flex h-[26px] shrink-0 items-center gap-2 bg-zinc-800/50 px-2.5 ${body ? "border-b border-zinc-800" : ""}`}>
        <span
          className={`shrink-0 text-[10px] font-semibold uppercase leading-4 tracking-wider ${color ? "" : "text-zinc-400"}`}
          style={color ? { color } : undefined}
          title={meaning}
        >
          {word}
        </span>
        {data.name &&
          (data.nameTo ? (
            <Link to={data.nameTo} className="nodrag nopan min-w-0 font-mono text-[12px] text-zinc-100 hover:text-white hover:underline" onClick={(e) => e.stopPropagation()}>
              <EndFirst text={data.name} />
            </Link>
          ) : (
            <EndFirst text={data.name} className="font-mono text-[12px] text-zinc-100" />
          ))}
      </div>
      {body && (
        <div className="flex min-h-0 flex-col px-2.5 py-[5px]">
          {data.brief && <BriefLine brief={data.brief} />}
          {data.lines.map((line, i) => (
            <NodeText key={i} line={line} />
          ))}
          {data.mark && <MarkLine mark={data.mark} words={data.markWords} />}
        </div>
      )}
      <Port type="source" vertical={vertical} shown={data.hasOut === true} />
    </div>
  );
}

function NodeText({ line }: { line: NodeLine }) {
  const tone = line.tone === "dim" ? "text-zinc-500" : line.tone === "plain" ? "text-zinc-400" : "text-zinc-300";
  const body = line.to ? (
    <Link to={line.to} className="nodrag nopan hover:text-white hover:underline" onClick={(e) => e.stopPropagation()}>
      {line.text}
    </Link>
  ) : (
    line.text
  );
  const title = line.title ?? (line.param !== undefined ? (line.text ? `${line.param} = ${line.text}` : line.param) : line.text);
  return (
    <div className={`flex h-4 min-w-0 items-center gap-1.5 text-[11px] leading-4 ${tone}`} title={title}>
      {line.signal && <SignalDot signal={line.signal} title={title} />}
      {line.param !== undefined && (
        <>
          <SlidersHorizontal className="h-2.5 w-2.5 shrink-0 text-zinc-600" aria-hidden />
          <code className="max-w-[45%] shrink-0 truncate font-mono text-[10.5px] text-zinc-500">{line.param}</code>
        </>
      )}
      {line.text && <span className={`min-w-0 truncate ${line.code ? "font-mono text-[10.5px]" : ""}`}>{body}</span>}
    </div>
  );
}

/** A step's key fields on one line: payload and definition names as code, named things linked, all of it on hover. */
function BriefLine({ brief }: { brief: NonNullable<NodeDisplay["brief"]> }) {
  return (
    <div className="truncate text-[11px] leading-4 text-zinc-300" title={brief.title}>
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
      className="mt-1 flex h-4 items-center gap-1.5 border-t border-zinc-800 pt-1 text-[11px] leading-4 text-zinc-300"
      style={{ boxSizing: "content-box" }}
      title={[mark.term.meaning, ...(words ? [words.title] : []), ...mark.notes, ...mark.hints].join("\n")}
    >
      {mark.term.signal && <SignalDot signal={mark.term.signal} title={mark.term.meaning} />}
      <span className="truncate">{text}</span>
    </div>
  );
}

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

const overlaps = (a: Box, b: Box) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
/** A caption's box (10.5px sans, padded) centred on a point. */
const captionBox = (text: string, at: Point): Box => {
  const width = text.length * 6 + 10;
  return { x: at.x - width / 2, y: at.y - 8, width, height: 16 };
};

/**
 * Where an edge's caption sits, on the line: along its longer segments first
 * (the middle, then nearer either end), the first spot that covers no node and
 * no caption already placed; the middle of the longest segment when none is free.
 */
function captionOn(text: string, points: readonly Point[], taken: Box[]): Point | null {
  const segments = points.slice(1).map((b, i) => ({ a: points[i]!, b, length: Math.hypot(b.x - points[i]!.x, b.y - points[i]!.y) }));
  segments.sort((x, y) => y.length - x.length);
  const along = (s: (typeof segments)[number], t: number): Point => ({ x: s.a.x + (s.b.x - s.a.x) * t, y: s.a.y + (s.b.y - s.a.y) * t });
  for (const segment of segments) {
    for (const t of [0.5, 0.3, 0.7, 0.15, 0.85]) {
      const at = along(segment, t);
      if (!taken.some((box) => overlaps(box, captionBox(text, at)))) return at;
    }
  }
  return segments[0] ? along(segments[0], 0.5) : null;
}

/** A node's height: the header, then one row per line (the brief, parameters, lines) and the mark. */
function heightOf(d: NodeDisplay): number {
  const rows = (d.brief ? 1 : 0) + d.lines.length;
  const body = rows > 0 || d.mark ? BODY_PAD + rows * ROW_HEIGHT + (d.mark ? MARK_HEIGHT : 0) : 0;
  return HEAD_HEIGHT + body + BORDER;
}

/** A Line upstream of this one's reads (or Entered directly), or downstream of its writes, with what the link carries. */
interface Chip {
  id: string;
  /** The Line it names; null: entered directly. */
  line: string | null;
  from: string | null;
  to: string;
  /** This Line's steps it connects to: the reads it feeds, or the claims steps whose writes it reads. */
  steps: string[];
  dependencies: LineDependency[];
}

/**
 * The Lines around a Line's steps: upstream, one per producer of what its read
 * steps' Queries read (Lines by name, then Entered directly); downstream, one
 * per Line whose Query reads what its claims steps write or create.
 */
function dependencyChips(line: string, dependencies: readonly LineDependency[], steps: ReadonlySet<string>): { up: Chip[]; down: Chip[] } {
  const up = new Map<string, Chip>();
  const down = new Map<string, Chip>();
  const add = (chips: Map<string, Chip>, id: string, named: string | null, from: string | null, to: string, connects: string[], d: LineDependency) => {
    let chip = chips.get(id);
    if (!chip) chips.set(id, (chip = { id, line: named, from, to, steps: [], dependencies: [] }));
    for (const step of connects) if (!chip.steps.includes(step)) chip.steps.push(step);
    chip.dependencies.push(d);
  };
  for (const d of dependencies) {
    if (d.reader === line && steps.has(d.step)) add(up, `up:${d.producer ?? ""}`, d.producer, d.producer, line, [d.step], d);
    if (d.producer === line) {
      const writes = d.writes.filter((w) => steps.has(w));
      if (writes.length > 0) add(down, `down:${d.reader}`, d.reader, line, d.reader, writes, d);
    }
  }
  const order = (a: Chip, b: Chip) => (a.line === null ? 1 : b.line === null ? -1 : a.line < b.line ? -1 : a.line > b.line ? 1 : 0);
  return { up: [...up.values()].sort(order), down: [...down.values()].sort(order) };
}

/** A band of Lines beside the graph, under its heading: above for what feeds the reads, below for who reads the writes. */
function DependencyBand({ heading, place, children }: { heading: string; place: "above" | "below"; children: ReactNode }) {
  return (
    <div
      role="group"
      aria-label={heading}
      className={`flex flex-wrap items-center gap-x-2 gap-y-1.5 border-x border-zinc-800 bg-zinc-950/60 px-3 py-2 ${place === "above" ? "border-t" : "border-b"}`}
    >
      <span className="mr-1 text-[11px] font-medium text-zinc-500">{heading}</span>
      {children}
    </div>
  );
}

/** One Line in a band: its name links to it (shortened from the start, all of it on hover); the toggle opens what the link carries. */
function DependencyChip({ chip, to, dim, onOpen }: { chip: Chip; to: string | null; dim: boolean; onOpen: (chip: string, event: ReactMouseEvent) => void }) {
  const label = `${producerName(chip.from)} → ${chip.to}`;
  return (
    <span
      data-chip={chip.id}
      className={`inline-flex h-6 max-w-[20rem] items-stretch border border-zinc-700 bg-zinc-900 text-[12px] transition-opacity ${dim ? "opacity-30" : ""}`}
    >
      {chip.line !== null && to ? (
        <Link to={to} className="flex min-w-0 items-center px-2 font-mono text-zinc-200 hover:text-white hover:underline">
          <EndFirst text={chip.line} title={`Line ${chip.line}`} />
        </Link>
      ) : (
        <span className="flex items-center px-2 text-zinc-400" title="Entered directly by people or agents">
          {producerName(chip.line)}
        </span>
      )}
      <button
        type="button"
        onClick={(event) => onOpen(chip.id, event)}
        aria-label={label}
        aria-haspopup="dialog"
        title={label}
        className="flex items-center border-l border-zinc-700 px-1 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
      >
        <ChevronDown className="h-3 w-3" aria-hidden />
      </button>
    </span>
  );
}

const nodeTypes = { step: StepNode };

const TRIGGER_PREFIX = "trigger:";
const FIT_PADDING = 0.04;
/** Room the canvas keeps around the graph beyond the fit padding (px), so the corner controls clear it. */
const CANVAS_SLACK = 28;
const FIT_MAX_ZOOM = 1;
/** Below this the step text is too small to read: a larger graph grows the canvas or pans sideways instead. */
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
  const grades = useGrades();
  const lists = useSlotLists(spec);
  // On a Line page: the Lines (or direct entry) upstream of its reads, and the Lines downstream of its writes.
  const lineName = definition?.line ?? null;
  const dependencies = useLineDependencies(lineName !== null);
  const chips = useMemo(
    () => (lineName && dependencies ? dependencyChips(lineName, dependencies, new Set(model.nodes.map((n) => n.id))) : { up: [], down: [] }),
    [lineName, dependencies, model],
  );
  const [opened, setOpened] = useState<{ chip: string; at: PopoverAt } | null>(null);
  const closeLink = useCallback(() => setOpened(null), []);
  const openLink = useCallback((chip: string, event: ReactMouseEvent) => {
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setOpened({ chip, at: { x: box.left, y: box.bottom } });
  }, []);

  // Every node's kind and name, its key fields, the parameters it reads, and the run's marks and counts when one is picked.
  const ctx = useMemo(
    () => ({ parameters: definition?.parameters, triggerInput: definition?.triggerInput, queries, bindings: definition?.bindings, operations: definition?.operations, grades, lists }),
    [definition, queries, grades, lists],
  );
  const display = useMemo(() => {
    const out = new Map<string, NodeDisplay>();
    const partRoute = (ref: string | undefined) => (ref ? (ref.startsWith("CaptureContract:") ? contractRoute(ref) : routeOf(ref)) : null);
    // The input and parameters each step reads: rows in the step, with the Line's values on a Line page.
    const inputs = new Map(model.edges.filter((e) => e.source === INPUT_NODE).map((e) => [e.target, e.fields] as const));
    const parameters: Record<string, unknown> = (line && definition?.parameters) || {};

    for (const node of model.nodes) {
      if (node.id === INPUT_NODE) continue;
      const mark = run?.marks.get(node.id) ?? null;
      const lines: NodeLine[] = [];
      const kind: string = node.kind;
      const name: string | null = node.unnamed ? null : node.id;
      let brief: NodeDisplay["brief"] = null;
      const v = node.view;
      const stage = node.index !== null ? stageOf(spec, node.index, grades) : null;
      if (v && node.index !== null) {
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
      const read = inputs.get(node.id);
      if (read) {
        for (const field of read.length > 0 ? read : ["input"]) {
          const value = Object.hasOwn(parameters, field) ? parameters[field] : undefined;
          lines.push({ param: field, text: value === undefined ? "" : typeof value === "string" ? value : JSON.stringify(value), code: true });
        }
      }
      if (node.unresolved.length > 0) {
        const names = [...new Set(node.unresolved.map((r) => r.name))];
        lines.push({ text: `names ${names.join(", ")}`, title: `${names.join(", ")}: no step of this Procedure declares ${names.length === 1 ? "it" : "them"}`, tone: "dim" });
      }
      const markWords = mark?.summary ? summaryWords(mark.summary, mark.list ?? null) : null;
      const word = term("stepKind", kind);
      out.set(node.id, { role: node.role, stage, kindWord: word.word, kindMeaning: word.meaning, name, brief, lines, mark, markWords });
    }
    for (const trigger of line?.triggers ?? []) {
      const word = term("stepKind", "trigger");
      out.set(`${TRIGGER_PREFIX}${trigger.name}`, {
        role: "trigger",
        stage: null,
        kindWord: word.word,
        kindMeaning: word.meaning,
        name: trigger.name,
        nameTo: routeOf(`Trigger:${trigger.name}`),
        brief: null,
        lines: [{ text: sentence(trigger.words), tone: "plain" }],
        mark: null,
        markWords: null,
      });
    }
    return out;
  }, [model, spec, line, definition, run, routeOf, contractRoute, ctx, grades]);

  // The edges: the definition's (the input's are rows in the steps), plus a landing Trigger into the step that reads the landing.
  const edges = useMemo(() => {
    // A data edge carries the run's count of what flows along it when the source's summary gives one.
    const out = model.edges
      .filter((e) => e.source !== INPUT_NODE)
      .map((e) => {
        const flow = e.kind === "data" ? flowWords(run?.marks.get(e.source)?.summary, e.fields) : null;
        return { id: e.id, source: e.source, target: e.target, label: e.kind === "control" ? e.fields.join(", ") : (flow ?? edgeLabel(e)) };
      });
    const inputStep = definition?.triggerInput
      ? model.nodes.find((n) => n.view?.kind === "call" && (n.view.name ?? n.view.id) === definition.triggerInput)
      : undefined;
    for (const trigger of line?.triggers ?? []) {
      if (trigger.landing && inputStep) {
        out.push({ id: `landing:${trigger.name}`, source: `${TRIGGER_PREFIX}${trigger.name}`, target: inputStep.id, label: "lands" });
      }
    }
    return out;
  }, [model, definition, line, run]);

  const layoutInput = useMemo(() => {
    const ids = [...(line?.triggers ?? []).map((t) => `${TRIGGER_PREFIX}${t.name}`), ...model.nodes.filter((n) => n.id !== INPUT_NODE).map((n) => n.id)];
    return {
      nodes: ids.map((id) => ({ id, width: NODE_WIDTH, height: heightOf(display.get(id)!), first: id.startsWith(TRIGGER_PREFIX) })),
      edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target, label: e.label })),
    };
  }, [model, display, edges, line]);
  // Which way the steps run: top to bottom (default) or left to right; remembered per browser.
  const [vertical, setVertical] = useState(() => {
    try {
      return window.localStorage.getItem("cruxible.steps.vertical") !== "0";
    } catch {
      return true;
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
    // Captions sit on the line (captionOn), so the layout reserves no room for them beside it.
    layoutLayered(nodes, edges, { looseColumn: false, edgeLabels: false, modelOrder: true, layerGap: vertical ? 40 : 72, direction: vertical ? "DOWN" : "RIGHT", ports: true })
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
    const at = (id: string, i: number) => laidOut.result?.positions.get(id) ?? { x: i * (NODE_WIDTH + 60), y: 0 };
    const into = new Set(edges.map((e) => e.target));
    const from = new Set(edges.map((e) => e.source));
    const nodes: Node<StepNodeData>[] = layoutInput.nodes.map((n, i) => ({
      id: n.id,
      type: "step",
      position: at(n.id, i),
      style: { width: n.width, height: n.height },
      data: { ...display.get(n.id)!, vertical, hasIn: into.has(n.id), hasOut: from.has(n.id) },
    }));
    const sizes = new Map(layoutInput.nodes.map((n) => [n.id, n]));
    const positions = new Map(nodes.map((n) => [n.id, n.position]));
    // Captions keep clear of the nodes and of each other.
    const taken: Box[] = nodes.map((n) => ({ ...n.position, width: sizes.get(n.id)!.width, height: sizes.get(n.id)!.height }));
    const flowEdges: Edge[] = edges.map((e) => {
      const route = laidOut.result?.routes.get(e.id);
      const caption = route && e.label ? captionOn(e.label, route.points, taken) : null;
      if (caption) taken.push(captionBox(e.label, caption));
      const base = { id: e.id, source: e.source, target: e.target, style: { stroke: EDGE_STROKE, strokeWidth: 1.25 } };
      return route
        ? {
            ...base,
            type: "routed",
            data: {
              points: route.points,
              labelAt: caption,
              text: e.label,
              always: true,
              labelClass: EDGE_LABEL,
              sourceAt: positions.get(e.source)!,
              targetAt: positions.get(e.target)!,
            } satisfies RoutedEdgeData,
          }
        : { ...base, label: e.label };
    });
    const bottom = Math.max(0, ...nodes.map((n) => n.position.y + (sizes.get(n.id)?.height ?? 0)));
    const right = Math.max(0, ...nodes.map((n) => n.position.x + (sizes.get(n.id)?.width ?? 0)));
    return { nodes, flowEdges, width: right, height: bottom };
  }, [laidOut, layoutInput, display, edges, vertical]);

  const neighborhood = useCallback((nodeId: string, all: Edge[]) => lineage(nodeId, all), []);
  const stepIds = useMemo(() => new Set(model.nodes.filter((n) => n.index !== null).map((n) => n.id)), [model]);
  // The focused node: the bands dim the Lines that do not connect to its lineage.
  const [focus, setFocus] = useState<string | null>(null);
  const onSelectionChange = useCallback(
    (selection: GraphSelection | null) => {
      setFocus(selection?.kind === "node" ? selection.id : null);
      onSelectStep?.(selection?.kind === "node" && stepIds.has(selection.id) ? selection.id : null);
    },
    [onSelectStep, stepIds],
  );
  const lit = useMemo(() => (focus ? lineage(focus, edges).nodes : null), [focus, edges]);
  const nodeName = useCallback((id: string) => (id.startsWith(TRIGGER_PREFIX) ? id.slice(TRIGGER_PREFIX.length) : id), []);

  if (!laidOut) return <LoadState />;
  // As tall as the graph is at the zoom it will be shown at: the canvas width's fit, held to most of the window,
  // but never below a readable zoom (a larger graph grows the canvas instead). Expanding it pushes the page down.
  const spread = 1 + 2 * FIT_PADDING;
  const most = typeof window !== "undefined" ? Math.round(window.innerHeight * 0.8) : 800;
  const widthFit = canvasWidth > 0 && width > 0 ? canvasWidth / (width * spread) : FIT_MAX_ZOOM;
  const heightFit = height > 0 ? (most - CANVAS_SLACK) / (height * spread) : FIT_MAX_ZOOM;
  const zoom = Math.max(FIT_MIN_ZOOM, Math.min(FIT_MAX_ZOOM, widthFit, heightFit));
  const canvasHeight = Math.max(140, Math.ceil(height * zoom * spread) + CANVAS_SLACK);
  const lineRoute = (name: string) => link(`/i/${instanceId}/lines/${encodeURIComponent(name)}`);
  const chipOf = (id: string) => chips.up.find((c) => c.id === id) ?? chips.down.find((c) => c.id === id);
  const band = (chip: Chip) => (
    <DependencyChip
      key={chip.id}
      chip={chip}
      to={chip.line ? lineRoute(chip.line) : null}
      dim={lit !== null && !chip.steps.some((s) => lit.has(s))}
      onOpen={openLink}
    />
  );
  return (
    <div ref={measure} data-testid="procedure-graph">
      {chips.up.length > 0 && (
        <DependencyBand heading="Reads from" place="above">
          {chips.up.map(band)}
        </DependencyBand>
      )}
      <GraphCanvas
        nodes={nodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        renderPanel={(selection) => {
          if (selection.kind !== "node") return null;
          const view = model.nodes.find((n) => n.id === selection.id)?.view;
          const index = model.nodes.find((n) => n.id === selection.id)?.index;
          return view && index != null ? (
            <StepPanel view={view} stage={stageOf(spec, index, grades)} sections={stepSections(spec, index, ctx)} mark={run?.marks.get(selection.id) ?? null} />
          ) : null;
        }}
        className=""
        height={canvasHeight}
        fitMinZoom={FIT_MIN_ZOOM}
        neighborhood={neighborhood}
        onSelectionChange={onSelectionChange}
        recenter={false}
        nodeName={nodeName}
        fitPadding={FIT_PADDING}
        draggable={false}
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
      {chips.down.length > 0 && (
        <DependencyBand heading="Read by" place="below">
          {chips.down.map(band)}
        </DependencyBand>
      )}
      {opened &&
        (() => {
          const chip = chipOf(opened.chip);
          if (!chip) return null;
          return <DependencyPopover at={opened.at} from={chip.from} to={chip.to} dependencies={chip.dependencies} onClose={closeLink} />;
        })()}
    </div>
  );
}


/** CaptureKind -> grade, from the capture_contracts section (one ontology-sized read, shared); null while it loads or fails. */
function useGrades(): ReadonlyMap<string, string> | null {
  const contracts = useCaptureContracts();
  return useMemo(
    () => (contracts.data ? new Map(contracts.data.rows.map((row) => [contractName(row.contract), row.grade] as const)) : null),
    [contracts.data],
  );
}

/** Slot -> the list-of-Captures fields of its out Contract: one get-batch of the call slots' out Contracts. */
function useSlotLists(spec: ProcedureSpec): ReadonlyMap<string, readonly ListField[]> {
  const slots = useMemo(() => [...new Set(spec.steps.flatMap((step) => ("call" in step ? [step.slot] : [])))].sort(), [spec]);
  const outs = useMemo(() => {
    const refs = slots.flatMap((slot) => {
      const out = spec.slots?.[slot]?.out;
      return out ? [`Contract:${out.name}@${out.version}`] : [];
    });
    return [...new Set(refs)].sort();
  }, [slots, spec]);
  const reads = useGetBatch(outs);
  const key = JSON.stringify(reads.results.map((r) => cardOf(r, "contract")?.fields ?? null));
  return useMemo(() => {
    const out = new Map<string, ListField[]>();
    for (const slot of slots) {
      const ref = spec.slots?.[slot]?.out;
      const i = ref ? outs.indexOf(`Contract:${ref.name}@${ref.version}`) : -1;
      const fields = i >= 0 ? listFields(cardOf(reads.results[i], "contract")) : [];
      if (fields.length) out.set(slot, fields);
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed by what the reads returned
  }, [slots, outs, key]);
}

/**
 * A clicked step, in the Type map's panel style: kind and id, then its fields
 * in titled groups (compact name | value rows), named things linked, ids on
 * hover; with a run picked, that run's counts for it.
 */
function StepPanel({ view, stage, sections, mark }: { view: StepView; stage: Stage | null; sections: DetailSection[]; mark: StepMark | null }) {
  const instanceId = useInstanceId();
  const link = useAtLink();
  const kind = stage ? { word: sentence(stage) } : term("stepKind", view.kind);
  const members = mark?.list ?? null;
  const route = (ref: string | undefined) => {
    const parsed = ref ? parseRef(ref) : null;
    const to = parsed ? refRoute(instanceId, parsed) : null;
    return to ? link(to) : undefined;
  };
  const words = mark?.summary ? summaryWords(mark.summary, mark.list ?? null) : null;
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
            <table className="w-full table-fixed text-[12px]" aria-label={section.title}>
              <colgroup>
                <col />
                {section.columns.slice(1).map((column) => (
                  <col key={column.header} className="w-[7.5rem]" />
                ))}
              </colgroup>
              <thead>
                <tr className="text-left text-[11px] text-zinc-500">
                  <th className="py-1 pr-2 font-normal">
                    ClaimType <span className="text-zinc-600">· {section.columns[0]?.header.toLowerCase()}</span>
                  </th>
                  {section.columns.slice(1).map((column) => (
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
                  <tr key={`${row.label}:${i}`} className="border-t border-zinc-800 align-top">
                    {/* the name, and what fills it beneath: two columns fit the panel */}
                    <td className="min-w-0 py-1.5 pr-2">
                      <div className="break-all font-mono text-zinc-200" title={row.title}>
                        {route(row.ref) ? (
                          <Link to={route(row.ref)!} className="hover:underline">
                            {row.label}
                          </Link>
                        ) : (
                          row.label
                        )}
                      </div>
                      <div className="break-all text-[11px] text-zinc-500">
                        <Parts parts={section.cells![i]?.[0] ?? []} />
                      </div>
                    </td>
                    {(section.cells![i] ?? []).slice(1).map((cell, j) => (
                      <td key={j} className="whitespace-nowrap py-1.5 text-zinc-300">
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
      {members && members.members.length > 0 && (
        <PanelGroup title="Members">
          <ListMembers members={members.members} />
          {members.truncated && <div className="mt-1 text-[12px] text-zinc-400">More members than the run card lists</div>}
          {members.providerIncomplete.length > 0 && (
            <div className="mt-1 text-[12px] text-zinc-400" title="The provider's result named these list fields in incomplete_captures">
              Incomplete (provider): <span className="font-mono">{members.providerIncomplete.join(", ")}</span>
            </div>
          )}
        </PanelGroup>
      )}
    </div>
  );
}

type Member = ListMember;

/** The panel is narrow: a member's request digest is on hover of its index and Capture. */
const MEMBER_COLUMNS: Column<Member>[] = [
  { id: "index", header: "#", numeric: true, className: "font-mono text-zinc-500", cell: (m) => <span title={memberHover(m)}>{m.index}</span> },
  {
    id: "capture",
    header: "Capture",
    className: "whitespace-nowrap",
    cell: (m) => (
      <span title={memberHover(m)}>{m.capture ? <RefLink value={captureHandle(m.capture)} /> : <span className="text-zinc-600">—</span>}</span>
    ),
  },
  { id: "status", header: "Status", className: "whitespace-nowrap", cell: (m) => <MemberStatus member={m} /> },
];

/** A list fetch's members on a run: index, Capture (kept), status; the field and request digest on hover. */
function ListMembers({ members }: { members: Member[] }) {
  return <DataTable rows={members} columns={MEMBER_COLUMNS} rowKey={(m) => `${m.field}\n${m.index}`} label="Members" toolbar={false} maxHeight="none" />;
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

