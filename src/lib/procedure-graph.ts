// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import { stepKind, stepView, type ProcedureSpec, type ProcedureStep, type StepKind, type StepView } from "./definitions.ts";

/**
 * A Procedure as a graph, read straight off its authored form: one node per
 * step, and an edge wherever a step names another. Nothing is inferred:
 *
 * - a `$step.field` reference anywhere in a step (its request, input, params,
 *   fields, what it proposes or settles, nested to any depth) is a data edge
 *   from the step it names, labelled with the field;
 * - `$input` and `$input.field` come from the Procedure's input (a Line's
 *   parameters, on a Line page);
 * - a guard's (or a repeat's `until`) condition names steps as `step.field`
 *   (`parse.changed > 0`): those are data edges too;
 * - a select step's `sources` name steps by alias;
 * - a guard's `then` and `else` (a step it hands over to, or `halt(code)`
 *   under its `else_id`) and a step's `next` are control edges;
 * - `returns` is its own node (the run's summary, id `summary` unless the
 *   Procedure names another), fed by the fields it returns.
 *
 * The authored step order is not drawn as edges: it only keeps the layout
 * stable. A reference to a name no step declares stays on the step, listed,
 * with no edge.
 */

export type StepRole = "input" | "trigger" | "source" | "tap" | "call" | "invoke" | "guard" | "shape" | "terminal";

/** The role each step kind plays, one visual per role. */
export function roleOf(kind: StepKind | "returns"): StepRole {
  switch (kind) {
    case "source":
      return "source";
    case "tap":
    case "claim":
      return "tap";
    case "call":
      return "call";
    case "invoke":
      return "invoke";
    case "guard":
      return "guard";
    case "project":
    case "transform":
    case "select":
    case "repeat":
    case "explicit":
      return "shape";
    default:
      // propose, settle, emit, inbox, halt, returns
      return "terminal";
  }
}

/** One `$name.field` reference as authored, and where in the step it sits. */
export interface StepRef {
  /** The name referenced: a step id or alias, `input`, or the returns id. */
  name: string;
  /** The field path after the name (`retrieved.body_base64`); null for the whole value. */
  field: string | null;
  /** Where in the step: `input.catalog_base64`, `guard`, `sources[0]`. */
  at: string;
}

const REF = /^\$([A-Za-z_][A-Za-z0-9_]*)((?:\.[^.\s]+)*)$/;

/** Every `$name.field` string in a value, at any depth, with the key path it sits at. */
export function collectRefs(value: unknown, at = ""): StepRef[] {
  if (typeof value === "string") {
    const match = REF.exec(value);
    return match ? [{ name: match[1]!, field: match[2] ? match[2].slice(1) : null, at }] : [];
  }
  if (Array.isArray(value)) return value.flatMap((item, i) => collectRefs(item, `${at}[${i}]`));
  if (typeof value === "object" && value !== null) {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, item]) => collectRefs(item, at ? `${at}.${key}` : key));
  }
  return [];
}

/** `name.field` mentions in a condition (`parse.changed > 0`), for the names given. */
export function conditionRefs(expression: string, names: ReadonlySet<string>, at: string): StepRef[] {
  const out: StepRef[] = [];
  const seen = new Set<string>();
  // Strip string literals so a quoted "a.b" is not read as a reference.
  const bare = expression.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, '""');
  for (const match of bare.matchAll(/(?<![\w.$])([a-z_][a-z0-9_]*)\.([A-Za-z_][\w]*(?:\.[A-Za-z_][\w]*)*)/g)) {
    const [, name, field] = match;
    if (!names.has(name!) || seen.has(`${name}.${field}`)) continue;
    seen.add(`${name}.${field}`);
    out.push({ name: name!, field: field!, at });
  }
  return out;
}

const str = (value: unknown): string | null => (typeof value === "string" && value !== "" ? value : null);

/** The step's own name (source/tap/call/… alias, invoke's `as`), which references may use instead of its id. */
function aliasOf(step: ProcedureStep): string | null {
  const s = step as Record<string, unknown>;
  const kind = stepKind(step);
  if (kind === "invoke") return str(s.as);
  if (["source", "tap", "call", "claim", "project", "transform", "select", "repeat"].includes(kind)) return str(s[kind]);
  return null;
}

export interface GraphNode {
  id: string;
  role: StepRole;
  /** The step kind, or `returns`, `halt` (a guard's else), `input`. */
  kind: StepKind | "returns" | "input";
  /** The authored step, with what it names; null for returns, a guard's halt and the input. */
  view: StepView | null;
  /** The authored step's index in `steps`; null for the nodes this graph adds. */
  index: number | null;
  /** References to names nothing here declares (kept on the step, with no edge). */
  unresolved: StepRef[];
  /** halt: its code; returns: its field names; input: its field names. */
  detail: string[];
  /** The id is the graph's own (a guard's halt with no else_id), not a name the definition gives. */
  unnamed?: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  kind: "data" | "control";
  /** data: the fields referenced; control: `then`, `else` or `next`. */
  fields: string[];
}

export interface ProcedureGraphModel {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

/** The id the input node takes (a step may not be named `$input`). */
export const INPUT_NODE = "$input";

const HALT_CALL = /^halt\(\s*([A-Za-z0-9_.-]+)\s*\)$/;

export function buildProcedureGraph(spec: ProcedureSpec): ProcedureGraphModel {
  const nodes: GraphNode[] = [];
  const byName = new Map<string, string>();
  spec.steps.forEach((step, index) => {
    const view = stepView(step, index);
    nodes.push({ id: view.id, role: roleOf(view.kind), kind: view.kind, view, index, unresolved: [], detail: [] });
  });
  // Ids win over aliases; an alias only names a step no id already claims.
  for (const node of nodes) byName.set(node.id, node.id);
  spec.steps.forEach((step, index) => {
    const alias = aliasOf(step);
    if (alias && !byName.has(alias)) byName.set(alias, nodes[index]!.id);
  });

  const returns = spec.returns;
  const returnsId =
    returns && typeof returns === "object" && typeof (returns as { id?: unknown }).id === "string"
      ? (returns as { id: string }).id
      : "summary";
  if (returns !== null && returns !== undefined && !byName.has(returnsId)) {
    const fields =
      typeof returns === "string"
        ? []
        : "fields" in returns
          ? Object.keys(returns.fields ?? {})
          : [];
    nodes.push({ id: returnsId, role: "terminal", kind: "returns", view: null, index: null, unresolved: [], detail: fields });
    byName.set(returnsId, returnsId);
  }

  const edges = new Map<string, GraphEdge>();
  const addEdge = (source: string, target: string, kind: GraphEdge["kind"], field: string | null) => {
    if (source === target) return;
    const id = `${kind}:${source}->${target}`;
    let edge = edges.get(id);
    if (!edge) {
      edge = { id, source, target, kind, fields: [] };
      edges.set(id, edge);
    }
    if (field !== null && !edge.fields.includes(field)) edge.fields.push(field);
  };
  let inputRead = false;
  const conditionNames = () => new Set([...byName.keys(), "input"]);
  const halts: GraphNode[] = [];

  const resolve = (node: GraphNode, refs: StepRef[]) => {
    for (const ref of refs) {
      if (ref.name === "input") {
        inputRead = true;
        addEdge(INPUT_NODE, node.id, "data", ref.field);
        continue;
      }
      const target = byName.get(ref.name);
      if (target) addEdge(target, node.id, "data", ref.field);
      else node.unresolved.push(ref);
    }
  };

  spec.steps.forEach((step, index) => {
    const node = nodes[index]!;
    const s = step as Record<string, unknown>;
    const CONTROL_KEYS = ["id", "next", "then", "else", "else_id"];
    resolve(node, collectRefs(Object.fromEntries(Object.entries(s).filter(([key]) => !CONTROL_KEYS.includes(key)))));
    const { next, then, else: elseValue, else_id: elseId } = s;
    const kind = node.kind;
    if (kind === "guard" && typeof s.guard === "string") resolve(node, conditionRefs(s.guard, conditionNames(), "guard"));
    if (kind === "repeat" && typeof s.until === "string") resolve(node, conditionRefs(s.until, conditionNames(), "until"));
    if (kind === "select" && Array.isArray(s.sources)) {
      resolve(
        node,
        s.sources.filter((x): x is string => typeof x === "string").map((name, i) => ({ name, field: null, at: `sources[${i}]` })),
      );
    }
    const control = (value: unknown, word: string) => {
      const name = str(value);
      const target = name ? byName.get(name) : undefined;
      if (target) addEdge(node.id, target, "control", word);
    };
    control(next, "next");
    if (kind === "guard") {
      control(then, "then");
      const otherwise = str(elseValue);
      const halt = otherwise ? HALT_CALL.exec(otherwise) : null;
      if (halt) {
        const haltId = str(elseId) ?? `${node.id}.else`;
        if (!byName.has(haltId)) {
          const haltNode: GraphNode = { id: haltId, role: "terminal", kind: "halt", view: null, index: null, unresolved: [], detail: [halt[1]!], ...(str(elseId) ? {} : { unnamed: true }) };
          halts.push(haltNode);
          byName.set(haltId, haltId);
        }
        addEdge(node.id, byName.get(haltId)!, "control", "else");
      } else {
        control(elseValue, "else");
      }
    }
  });
  nodes.push(...halts);

  const returnsNode = nodes.find((n) => n.kind === "returns");
  if (returnsNode && returns) {
    if (typeof returns === "string") resolve(returnsNode, [{ name: returns, field: null, at: "returns" }]);
    else if ("from" in returns) resolve(returnsNode, [{ name: returns.from, field: null, at: "returns.from" }]);
    else resolve(returnsNode, collectRefs(returns.fields ?? {}, "returns"));
  }

  if (inputRead) {
    const fields = Object.keys(spec.input ?? {}).sort();
    nodes.unshift({ id: INPUT_NODE, role: "input", kind: "input", view: null, index: null, unresolved: [], detail: fields });
  }
  return { nodes, edges: [...edges.values()] };
}

/** An edge's label: its fields when they read at a glance (else the last name of one long field, or how many); control edges say `else`, `then` or `next`. */
export function edgeLabel(edge: GraphEdge, max = 22): string {
  if (edge.fields.length === 0) return "";
  const text = edge.fields.join(", ");
  if (text.length <= max) return text;
  if (edge.fields.length === 1) {
    const last = edge.fields[0]!.split(".").at(-1)!;
    return last.length <= max ? last : "";
  }
  return `${edge.fields.length} fields`;
}

/** Every node upstream and downstream of one (following edges both ways, transitively), and the edges between them. */
export function lineage(nodeId: string, edges: readonly { id: string; source: string; target: string }[]) {
  const nodes = new Set([nodeId]);
  const walk = (from: "source" | "target", to: "source" | "target") => {
    const queue = [nodeId];
    const seen = new Set([nodeId]);
    while (queue.length) {
      const at = queue.shift()!;
      for (const e of edges) {
        if (e[from] !== at || seen.has(e[to])) continue;
        seen.add(e[to]);
        nodes.add(e[to]);
        queue.push(e[to]);
      }
    }
    return seen;
  };
  const down = walk("source", "target");
  const up = walk("target", "source");
  const lit = new Set(
    edges.filter((e) => (down.has(e.source) && down.has(e.target)) || (up.has(e.source) && up.has(e.target))).map((e) => e.id),
  );
  return { nodes, edges: lit };
}

// -- cron in words ------------------------------------------------------------

const pad = (n: string) => n.padStart(2, "0");
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * A five-field cron expression in words, for the common shapes (daily at,
 * every N hours at, weekly on, every N minutes); anything else reads as
 * `cron <expression>`.
 */
export function cronWords(expression: string): string {
  const fields = expression.trim().split(/\s+/);
  if (fields.length !== 5) return `cron ${expression}`;
  const [minute, hour, dom, month, dow] = fields as [string, string, string, string, string];
  const num = /^\d+$/;
  if (dom !== "*" || month !== "*") return `cron ${expression}`;
  if (num.test(minute) && num.test(hour)) {
    const at = `${pad(hour)}:${pad(minute)}`;
    if (dow === "*") return `daily at ${at}`;
    if (num.test(dow) && Number(dow) < 7) return `every ${DAYS[Number(dow)]} at ${at}`;
    return `cron ${expression}`;
  }
  if (dow !== "*") return `cron ${expression}`;
  const step = /^\*\/(\d+)$/;
  if (num.test(minute) && step.test(hour)) return `every ${step.exec(hour)![1]} hours at :${pad(minute)}`;
  if (num.test(minute) && hour === "*") return `hourly at :${pad(minute)}`;
  if (step.test(minute) && hour === "*") return `every ${step.exec(minute)![1]} minutes`;
  return `cron ${expression}`;
}
