// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import { stepAlias, stepView, templateRef, type ProcedureSpec, type StepKind, type StepView } from "./definitions.ts";

/**
 * A Procedure as a graph, read straight off its authored form: one node per
 * step, and an edge wherever a step names another. Nothing is inferred:
 *
 * - a `{$ref: step, step, path}` reference anywhere in a step (its input,
 *   fields, claims, guard predicate, nested to any depth), a `$steps.<name>.…`
 *   string, or a `{$steps.<name>.…}` interpolation in a rationale is a data
 *   edge from the step it names, labelled with the path;
 * - `{$ref: input}` and `{$ref: param}` come from the Procedure's input and
 *   parameters (a Line's parameters, on a Line page);
 * - a select step's `sources` name steps by output name;
 * - a guard's `then`/`else` (`goto` a step, or `halt` under the action's id)
 *   and a step's `next` are control edges;
 * - `returns` is its own node (the run's summary, id `summary` unless the
 *   Procedure names another), fed by the fields it returns.
 *
 * The authored step order is not drawn as edges: it only keeps the layout
 * stable. A reference to a name no step declares stays on the step, listed,
 * with no edge.
 */

export type StepRole = "input" | "trigger" | "call" | "read" | "invoke" | "guard" | "shape" | "terminal";

/** The role each step kind plays, one visual per role. */
export function roleOf(kind: StepKind | "returns"): StepRole {
  switch (kind) {
    case "call":
      return "call";
    case "read":
    case "extract":
      return "read";
    case "invoke":
      return "invoke";
    case "guard":
      return "guard";
    case "project":
    case "transform":
    case "select":
    case "repeat":
      return "shape";
    default:
      // claims, emit, inbox, halt, returns
      return "terminal";
  }
}

/** One step reference as authored, and where in the step it sits. */
export interface StepRef {
  /** The name referenced: a step's output name, `input` (run input or Line parameters), or the returns id. */
  name: string;
  /** The member path after the name (`capture`, `header.catalog_version`); null for the whole value. */
  field: string | null;
  /** Where in the step: `input.url`, `claims[0].value`, `sources[0]`. */
  at: string;
}

const STEPS_STRING = /^\$steps\.([A-Za-z_][A-Za-z0-9_]*)((?:\.[^.\s]+)*)$/;
const INTERPOLATION = /\{\$(steps|input|params)\.([^}\s]+)\}/g;

function joinPath(path: readonly string[] | undefined): string | null {
  return path && path.length > 0 ? path.join(".") : null;
}

/** Every step, input and parameter reference in a value, at any depth, with the key path it sits at. */
export function collectRefs(value: unknown, at = ""): StepRef[] {
  if (typeof value === "string") {
    const whole = STEPS_STRING.exec(value);
    if (whole) return [{ name: whole[1]!, field: whole[2] ? whole[2].slice(1) : null, at }];
    const out: StepRef[] = [];
    for (const match of value.matchAll(INTERPOLATION)) {
      const [, root, rest] = match;
      if (root === "steps") {
        const [name, ...path] = rest!.split(".");
        out.push({ name: name!, field: path.length ? path.join(".") : null, at });
      } else {
        out.push({ name: "input", field: rest!, at });
      }
    }
    return out;
  }
  if (Array.isArray(value)) return value.flatMap((item, i) => collectRefs(item, `${at}[${i}]`));
  const ref = templateRef(value);
  if (ref) {
    if (ref.$ref === "step" && ref.step) return [{ name: ref.step, field: joinPath(ref.path), at }];
    if (ref.$ref === "input" || ref.$ref === "param") return [{ name: "input", field: joinPath(ref.path), at }];
    return [];
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(value as Record<string, unknown>).flatMap(([key, item]) => collectRefs(item, at ? `${at}.${key}` : key));
  }
  return [];
}

export interface GraphNode {
  id: string;
  role: StepRole;
  /** The step kind, or `returns`, `halt` (a guard's halt action), `input`. */
  kind: StepKind | "returns" | "input";
  /** The authored step, with what it names; null for returns, a guard's halt and the input. */
  view: StepView | null;
  /** The authored step's index in `steps`; null for the nodes this graph adds. */
  index: number | null;
  /** References to names nothing here declares (kept on the step, with no edge). */
  unresolved: StepRef[];
  /** halt: its code; returns: its field names; input: its field names. */
  detail: string[];
  /** The id is the graph's own (a guard's halt with no id), not a name the definition gives. */
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

const CONTROL_KEYS = ["id", "next", "then", "else"];

export function buildProcedureGraph(spec: ProcedureSpec): ProcedureGraphModel {
  const nodes: GraphNode[] = [];
  const byName = new Map<string, string>();
  spec.steps.forEach((step, index) => {
    const view = stepView(step, index);
    nodes.push({ id: view.id, role: roleOf(view.kind), kind: view.kind, view, index, unresolved: [], detail: [] });
  });
  // Ids win over output names; a name only names a step no id already claims.
  for (const node of nodes) byName.set(node.id, node.id);
  spec.steps.forEach((step, index) => {
    const alias = stepAlias(step, index);
    if (!byName.has(alias)) byName.set(alias, nodes[index]!.id);
  });

  const returns = spec.returns;
  const returnsId = returns && typeof returns === "object" ? (returns.id ?? "summary") : "summary";
  if (returns !== null && returns !== undefined && !byName.has(returnsId)) {
    const fields = typeof returns === "object" && "fields" in returns ? Object.keys(returns.fields ?? {}) : [];
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
    resolve(node, collectRefs(Object.fromEntries(Object.entries(s).filter(([key]) => !CONTROL_KEYS.includes(key)))));
    if ("select" in step) {
      resolve(node, step.sources.map((name, i) => ({ name, field: null, at: `sources[${i}]` })));
    }
    const control = (name: string | null | undefined, word: string) => {
      const target = name ? byName.get(name) : undefined;
      if (target) addEdge(node.id, target, "control", word);
    };
    control(step.next, "next");
    if ("guard" in step) {
      for (const [word, action] of [
        ["then", step.then],
        ["else", step.else],
      ] as const) {
        if (!action) continue;
        if ("goto" in action) control(action.goto, word);
        else if ("halt" in action) {
          const haltId = action.id ?? `${node.id}.${word}`;
          if (!byName.has(haltId)) {
            const haltNode: GraphNode = {
              id: haltId,
              role: "terminal",
              kind: "halt",
              view: null,
              index: null,
              unresolved: [],
              detail: action.halt ? [action.halt] : [],
              ...(action.id ? {} : { unnamed: true }),
            };
            halts.push(haltNode);
            byName.set(haltId, haltId);
          }
          addEdge(node.id, byName.get(haltId)!, "control", word);
        }
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
    const fields = [...Object.keys(spec.input ?? {}), ...Object.keys(spec.params ?? {})].sort();
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
