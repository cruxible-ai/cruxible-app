import type { Schemas } from "../api/schemas.ts";
import { objectKinds, valueTypeWords } from "./type-graph.ts";

/**
 * A QueryDefinition card read for people: the kinds it walks (one box each),
 * the links it follows between them, the filters on each box, what each
 * returned field is filled from, its parameters and its row Contract.
 *
 * The card serves the authored form (`QuerySpecInput`: `from`, `hops`,
 * `where`, `fields` as text in binding names) when the definition can be
 * said that way, else the typed `QueryDefinition` (`entry`, `traversal`,
 * `projection`). Both read into one view; a typed filter tree reads as
 * "filtered" with its JSON on hover (the raw definition has it whole).
 */

type QueryCard = Schemas["GetQueryCard"];

/** A piece of a sentence in words: plain text, a field (its ClaimType linked), or a parameter; pieces read joined by spaces. */
export type Part =
  | { text: string }
  | { field: string; claimType: string | null; title: string }
  | { param: string };

/** A pair hop's key part or fact: the ClaimType's full name and its field name. */
export interface PairField {
  claimType: string;
  field: string;
}

/**
 * A pair hop's box (`KIND{part: binding, ...}[!] [with FACT]`): the key parts
 * bound to earlier boxes other than the one its arrow comes from, and the
 * fact every pair it binds holds.
 */
export interface PairBox {
  also: (PairField & { binding: string })[];
  fact: PairField | null;
}

export interface QueryBox {
  /** The binding name the definition uses (shown on hover only). */
  binding: string;
  /** The Subject kinds this binding ranges over; [] when the card does not say. */
  kinds: string[];
  /** The entry is one Subject, named by this parameter. */
  entryParam: string | null;
  /** Filters on this box, each in words. */
  filters: Part[][];
  /** Set when the box is bound by a pair hop. */
  pair?: PairBox;
}

export interface QueryLink {
  from: string;
  to: string;
  /** The ClaimType's full name (link target) and its field name (shown). */
  claimType: string;
  field: string;
  reverse: boolean;
  required: boolean;
}

export interface QueryReturn {
  name: string;
  /** What fills it, in words. */
  from: Part[];
  /** The expression as authored (hover). */
  expression: string;
}

export interface QueryParam {
  name: string;
  type: string;
  required: boolean;
  /** The declared default; undefined when none. */
  default?: unknown;
}

export interface QueryView {
  name: string;
  description: string | null;
  /** The entry binding first, then each hop's in order. */
  boxes: QueryBox[];
  links: QueryLink[];
  /** Filters that name more than one box, in words. */
  filters: Part[][];
  /** The same filters as clause trees (one per filter), for reading line by line. */
  whereTrees: FilterNode[];
  returns: QueryReturn[];
  params: QueryParam[];
  /** The row Contract as `name@N`. */
  row: string | null;
  /** True when rows are paths (the query hops), false when one row per entry Subject. */
  paths: boolean;
  /** Result budgets as the definition states them; null when it states none. */
  budgets: QueryBudgets | null;
}

export interface QueryBudgets {
  limit: number | null;
  pathsPerResult: number | null;
  maxResults: number | null;
  maxPathsPerResult: number | null;
}

/** A ClaimType as the ontology lists it, enough to resolve a hop's kinds. */
export interface ClaimTypeShape {
  predicate?: string | null;
  name?: string;
  type?: string | null;
  subject_kinds?: string[] | null;
}

const rec = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const str = (value: unknown): string | null => (typeof value === "string" ? value : null);
const one = (value: unknown): [string, string] | null => {
  const entry = Object.entries(rec(value) ?? {})[0];
  return entry && typeof entry[1] === "string" ? [entry[0], entry[1]] : null;
};

/** A kind's name in words: its last segment ("security.vulnerability" -> "vulnerability"). */
export function kindWord(kind: string): string {
  return (kind.split(".").at(-1) ?? kind).replaceAll("_", " ").replaceAll("-", " ");
}


/** A kind's name as written, its last segment ("security.app_exposure" -> "app_exposure"): field references read `app_exposure.verdict`. */
export function kindName(kind: string): string {
  return kind.split(".").at(-1) ?? kind;
}

/** A predicate named on a binding of `kinds`: its full ClaimType name and its field name. */
export function claimTypeOf(predicate: string, kinds: readonly string[]): { claimType: string; field: string } {
  const owner = kinds.find((kind) => predicate.startsWith(`${kind}.`));
  if (owner) return { claimType: predicate, field: predicate.slice(owner.length + 1) };
  if (!predicate.includes(".") && kinds.length === 1) return { claimType: `${kinds[0]}.${predicate}`, field: predicate };
  return { claimType: predicate, field: predicate.split(".").at(-1) ?? predicate };
}

/** A parameter or Contract field type in words: `string` reads "text", a Subject "a Subject". */
export function typeWords(type: string): string {
  if (type === "subject" || type === "subject_reference") return "a Subject";
  if (type === "integer") return "whole number";
  if (type === "decimal") return "decimal number";
  if (type === "boolean") return "yes or no";
  if (type === "timestamp") return "date and time";
  return valueTypeWords(type);
}

/** A default as a cell reads it; "none" when there is none. */
export function defaultWords(param: QueryParam): string {
  if (param.default === undefined || param.default === null) return "none";
  return typeof param.default === "string" ? param.default : JSON.stringify(param.default);
}

// -- filters in words ---------------------------------------------------------

const TOKEN = /\s*(?:("(?:[^"\\]|\\.)*")|(-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?)|(\$?[a-zA-Z_][a-zA-Z0-9_.]*)|(==|!=|<=|>=|[=<>~(),]))/y;
const OPERATOR_WORDS: Record<string, string> = {
  "=": "is",
  "==": "is",
  "!=": "is not",
  "<": "is less than",
  "<=": "is at most",
  ">": "is more than",
  ">=": "is at least",
  "~": "contains",
  in: "is one of",
};

function tokens(text: string): string[] {
  const out: string[] = [];
  TOKEN.lastIndex = 0;
  let index = 0;
  while (index < text.trimEnd().length) {
    TOKEN.lastIndex = index;
    const match = TOKEN.exec(text);
    if (!match) return [text]; // not the grammar: read as written
    out.push(match.slice(1).find((group) => group !== undefined)!);
    index = TOKEN.lastIndex;
  }
  return out;
}

/** The bindings a filter expression names (`v.x`, `v`). */
export function filterBindings(text: string, bindings: ReadonlyMap<string, string[]>): string[] {
  const named = new Set<string>();
  for (const token of tokens(text)) {
    const head = token.split(".")[0]!;
    if (bindings.has(head)) named.add(head);
  }
  return [...named];
}

/** A binding's field reference, named directly: the box's own field (`status`), or another box's (`assessment.status`). */
function refWords(binding: string, rest: string, bindings: ReadonlyMap<string, string[]>, own: string | null): Part[] {
  const kinds = bindings.get(binding) ?? [];
  const kind = kindName(kinds[0] ?? binding);
  const whose = binding === own ? "" : `${kind}.`;
  if (rest === "") return [{ text: binding === own ? "it" : kind }];
  if (rest === "subject_kind" || rest === "subject_id") return [{ field: `${whose}${rest}`, claimType: null, title: `${binding}.${rest}` }];
  const { claimType, field } = claimTypeOf(rest, kinds);
  return [{ field: `${whose}${field}`, claimType, title: `${binding}.${rest}` }];
}

/** A filter expression in words, `own` being the box it is written on. */
export function filterWords(text: string, bindings: ReadonlyMap<string, string[]>, own: string | null): Part[] {
  return tokenWords(tokens(text), bindings, own);
}

/** The closing parenthesis matching the one at `open`; -1 when unbalanced. */
function closing(list: readonly string[], open: number): number {
  let depth = 0;
  for (let i = open; i < list.length; i += 1) {
    if (list[i] === "(") depth += 1;
    else if (list[i] === ")" && --depth === 0) return i;
  }
  return -1;
}

const literalText = (token: string) => (token.startsWith('"') ? token.slice(1, -1) : token);

/** Tokens in words: operators, presence, parameters, fields; an `in` list reads `(a, b)`. */
function tokenWords(list: readonly string[], bindings: ReadonlyMap<string, string[]>, own: string | null): Part[] {
  const out: Part[] = [];
  for (let i = 0; i < list.length; i += 1) {
    const token = list[i]!;
    if (token === "in" && list[i + 1] === "(") {
      const end = closing(list, i + 1);
      const items = end > 0 ? list.slice(i + 2, end).filter((item) => item !== ",") : [];
      if (end > 0 && items.every((item) => !item.startsWith("$") && item !== "(" && item !== ")")) {
        out.push({ text: OPERATOR_WORDS.in! }, { text: `(${items.map(literalText).join(", ")})` });
        i = end;
        continue;
      }
    }
    if (token === "not" && list[i + 1] === "exists") {
      out.push({ text: "has no" });
      i += 1;
    } else if (token === "exists") out.push({ text: "has" });
    else if (token in OPERATOR_WORDS) out.push({ text: OPERATOR_WORDS[token]! });
    else if (token.startsWith("$")) out.push({ param: token.slice(1) });
    else if (/^[a-zA-Z_]/.test(token) && bindings.has(token.split(".")[0]!)) {
      const [binding, ...rest] = token.split(".");
      out.push(...refWords(binding!, rest.join("."), bindings, own));
    } else out.push({ text: literalText(token) });
  }
  return merged(out);
}

// -- filters as clause trees --------------------------------------------------

/** A filter as clauses: a comparison or presence in words, or `and` / `or` / `not` over clauses. */
export type FilterNode =
  | { op: "clause"; parts: Part[] }
  | { op: "and" | "or"; children: FilterNode[] }
  | { op: "not"; child: FilterNode };

/**
 * A filter expression as a clause tree, by the grammar's precedence (`not`,
 * then `and`, then `or`; parentheses group): same-operator runs flatten, a
 * parenthesised single clause is that clause. Text outside the grammar is
 * one clause read as written.
 */
export function filterTree(text: string, bindings: ReadonlyMap<string, string[]>, own: string | null): FilterNode {
  const list = tokens(text);
  let index = 0;
  const peek = () => list[index];
  const fail = { op: "clause", parts: filterWords(text, bindings, own) } as const;
  const join = (op: "and" | "or", items: FilterNode[]): FilterNode =>
    items.length === 1 ? items[0]! : { op, children: items.flatMap((item) => (item.op === op ? item.children : [item])) };
  function or(): FilterNode | null {
    const items = [and()];
    while (peek() === "or") {
      index += 1;
      items.push(and());
    }
    return items.some((item) => item === null) ? null : join("or", items as FilterNode[]);
  }
  function and(): FilterNode | null {
    const items = [not()];
    while (peek() === "and") {
      index += 1;
      items.push(not());
    }
    return items.some((item) => item === null) ? null : join("and", items as FilterNode[]);
  }
  function not(): FilterNode | null {
    if (peek() === "not" && list[index + 1] !== "exists") {
      index += 1;
      const child = not();
      return child && { op: "not", child };
    }
    return primary();
  }
  function primary(): FilterNode | null {
    if (peek() === "(") {
      index += 1;
      const inner = or();
      if (peek() !== ")") return null;
      index += 1;
      return inner;
    }
    const start = index;
    while (index < list.length && !["and", "or", ")"].includes(list[index]!)) {
      if (list[index] === "in" && list[index + 1] === "(") {
        const end = closing(list, index + 1);
        if (end < 0) return null;
        index = end + 1;
      } else if (list[index] === "(") return null;
      else index += 1;
    }
    return index > start ? { op: "clause", parts: tokenWords(list.slice(start, index), bindings, own) } : null;
  }
  // a single unparsed token means the text is outside the grammar
  if (list.length === 1 && list[0] === text) return fail;
  const tree = or();
  return tree && index === list.length ? tree : fail;
}

/** One line of a filter read clause by clause: its depth, the connective words before it, the clause (null: a group follows, indented). */
export interface FilterLine {
  depth: number;
  lead: string[];
  parts: Part[] | null;
}

/** A clause tree as lines: one clause per line, a nested group indented under its connective. */
export function filterLines(node: FilterNode, depth = 0, lead: string[] = []): FilterLine[] {
  if (node.op === "clause") return [{ depth, lead, parts: node.parts }];
  if (node.op === "not") {
    if (node.child.op === "and" || node.child.op === "or") return [{ depth, lead: [...lead, "not"], parts: null }, ...filterLines(node.child, depth + 1)];
    return filterLines(node.child, depth, [...lead, "not"]);
  }
  return node.children.flatMap((child, i) => {
    const words = i === 0 ? lead : [node.op];
    if (child.op === "and" || child.op === "or") {
      return words.length > 0 ? [{ depth, lead: words, parts: null }, ...filterLines(child, depth + 1)] : filterLines(child, depth + 1);
    }
    return filterLines(child, depth, words);
  });
}

/** Adjacent text pieces as one. */
function merged(parts: readonly Part[]): Part[] {
  return parts.reduce<Part[]>((acc, part) => {
    const last = acc.at(-1);
    if (last && "text" in last && "text" in part) acc[acc.length - 1] = { text: `${last.text} ${part.text}` };
    else acc.push(part);
    return acc;
  }, []);
}

/** A returned field's source, named directly (`v.security.vulnerability.cve_id` -> `vulnerability.cve_id`). */
export function expressionWords(text: string, bindings: ReadonlyMap<string, string[]>): Part[] {
  const fn = /^(role|verdict)\((.*)\)$/.exec(text.trim());
  if (fn) return merged([{ text: `${fn[1]} of` }, ...expressionWords(fn[2]!, bindings)]);
  const [binding, ...rest] = text.trim().split(".");
  if (!bindings.has(binding!)) return [{ text }];
  const kinds = bindings.get(binding!) ?? [];
  const kind = kindName(kinds[0] ?? binding!);
  const tail = rest.join(".");
  if (tail === "" || tail === "subject_id") return [{ field: `${kind}.subject_id`, claimType: null, title: text }];
  if (tail === "subject_kind") return [{ field: `${kind}.subject_kind`, claimType: null, title: text }];
  const { claimType, field } = claimTypeOf(tail, kinds);
  return [{ field: `${kind}.${field}`, claimType, title: text }];
}

/** Parts as plain text (tests, titles). */
export function partsText(parts: readonly Part[]): string {
  return parts.map((part) => ("text" in part ? part.text : "field" in part ? part.field : `‹${part.param}›`)).join(" ");
}

// -- reading the card ---------------------------------------------------------

/** A hop's ClaimType: the kinds that carry it and the kinds it points at, from the ontology when given. */
function resolver(claimTypes: readonly ClaimTypeShape[]) {
  const byName = new Map<string, ClaimTypeShape>();
  for (const item of claimTypes) {
    const name = item.predicate ?? item.name;
    if (name) byName.set(name, item);
  }
  return (claimType: string) => {
    const found = byName.get(claimType);
    return found ? { owners: found.subject_kinds ?? [], targets: objectKinds(found.type ?? "") } : null;
  };
}

/** The kind a qualified ClaimType name is declared on (`security.assessment.vulnerability` -> `security.assessment`). */
const ownerOf = (claimType: string) => (claimType.split(".").length > 2 ? claimType.split(".").slice(0, -1).join(".") : null);

/** ``KIND{parts}`` with an optional ``!`` (required) and ``with FACT`` (core's authored pair hop). */
const PAIR_HOP = /^\s*([a-z][a-z0-9_.]*)\s*\{([^{}]*)\}\s*(!?)\s*(?:with\s+([a-z][a-z0-9_.]*))?\s*$/;

/**
 * A pair hop as a box and the arrow into it: the arrow comes from the part
 * bound latest (the deepest box it joins), followed backwards (the pair
 * carries the part and names that box); the other parts are listed on the box.
 */
function pairStep(
  target: string,
  kind: string,
  parts: readonly (PairField & { binding: string })[],
  fact: PairField | null,
  required: boolean,
  order: readonly string[],
): { box: QueryBox; link: QueryLink } | null {
  if (parts.length === 0) return null;
  const from = [...parts].sort((a, b) => order.indexOf(b.binding) - order.indexOf(a.binding))[0]!;
  return {
    box: { binding: target, kinds: [kind], entryParam: null, filters: [], pair: { also: parts.filter((part) => part !== from), fact } },
    link: { from: from.binding, to: target, claimType: from.claimType, field: from.field, reverse: true, required },
  };
}

/** The result budgets a definition states (what a read gets unless it asks, and the most it may ask); null when none. */
function readBudgets(definition: Record<string, unknown>): QueryBudgets | null {
  const num = (value: unknown) => (typeof value === "number" ? value : null);
  // authored: limit, paths_per_result, max; typed: default_budgets, maximum_budgets
  const max = rec(definition.max);
  const given = rec(definition.default_budgets);
  const most = rec(definition.maximum_budgets);
  const budgets = {
    limit: num(definition.limit) ?? num(given?.max_results),
    pathsPerResult: num(definition.paths_per_result) ?? num(given?.max_paths_per_result),
    maxResults: num(max?.results) ?? num(most?.max_results),
    maxPathsPerResult: num(max?.paths_per_result) ?? num(most?.max_paths_per_result),
  };
  return Object.values(budgets).some((value) => value !== null) ? budgets : null;
}

function readAuthored(definition: Record<string, unknown>, claimTypes: readonly ClaimTypeShape[]): Omit<QueryView, "params" | "name" | "description" | "budgets"> | null {
  const entry = one(definition.from);
  if (!entry) return null;
  const resolve = resolver(claimTypes);
  const bindings = new Map<string, string[]>();
  const [entryBinding, entryText] = entry;
  const entryMatch = /^\s*([^=\s]+)\s*(?:=\s*\$(\w+))?\s*$/.exec(entryText);
  bindings.set(entryBinding, [entryMatch?.[1] ?? entryText.trim()]);
  const boxes: QueryBox[] = [{ binding: entryBinding, kinds: bindings.get(entryBinding)!, entryParam: entryMatch?.[2] ?? null, filters: [] }];
  const links: QueryLink[] = [];
  const hopFilters: [string, string][] = [];
  const hops = Array.isArray(definition.hops) ? definition.hops : [];
  for (const hop of hops) {
    const pair = one(hop);
    if (!pair) continue;
    const [target, expression] = pair;
    const [head, condition] = expression.split(/\s+where(?:\s+|$)/, 2) as [string, string | undefined];
    if (head.includes("{")) {
      const matched = PAIR_HOP.exec(head);
      if (!matched) continue;
      const [, kind, body, bang, factName] = matched as unknown as [string, string, string, string, string | undefined];
      const parts = body.split(",").flatMap((item) => {
        const [part, binding] = item.split(":").map((piece) => piece.trim()) as [string, string | undefined];
        return part && binding && bindings.has(binding) ? [{ ...claimTypeOf(part, [kind]), binding }] : [];
      });
      const step = pairStep(target, kind, parts, factName ? claimTypeOf(factName, [kind]) : null, bang === "!", [...bindings.keys()]);
      if (!step) continue;
      bindings.set(target, [kind]);
      boxes.push(step.box);
      links.push(step.link);
      if (condition) hopFilters.push([target, condition]);
      continue;
    }
    const [relation, targetText] = head.trim().split(/\s*:\s*/, 2) as [string, string | undefined];
    const reverse = relation.startsWith("<");
    const required = relation.endsWith("!");
    const bare = relation.replace(/^</, "").replace(/!$/, "");
    const dot = bare.indexOf(".");
    let source = dot > 0 ? bare.slice(0, dot) : bare;
    let predicate = dot > 0 ? bare.slice(dot + 1) : "";
    if (!bindings.has(source)) {
      // `<kind.predicate`: the source is the binding the ClaimType points at (else the last one bound)
      predicate = bare;
      const targets = resolve(bare)?.targets ?? [];
      source = [...bindings].reverse().find(([, kinds]) => kinds.some((kind) => targets.includes(kind)))?.[0] ?? [...bindings.keys()].at(-1)!;
    }
    const sourceKinds = bindings.get(source) ?? [];
    let kinds = targetText ? targetText.split("|").map((kind) => kind.trim()) : [];
    let named: { claimType: string; field: string };
    if (reverse) {
      // the ClaimType is carried by the new box and points back at the source
      const claimType = predicate.includes(".") ? predicate : kinds.length === 1 ? `${kinds[0]}.${predicate}` : predicate;
      if (kinds.length === 0) kinds = resolve(claimType)?.owners ?? (ownerOf(claimType) ? [ownerOf(claimType)!] : []);
      named = claimTypeOf(claimType, kinds);
    } else {
      named = claimTypeOf(predicate, sourceKinds);
      if (kinds.length === 0) kinds = resolve(named.claimType)?.targets ?? [];
    }
    bindings.set(target, kinds);
    boxes.push({ binding: target, kinds, entryParam: null, filters: [] });
    links.push({ from: source, to: target, ...named, reverse, required });
    if (condition) hopFilters.push([target, condition]);
  }
  const boxOf = new Map(boxes.map((box) => [box.binding, box]));
  for (const [target, condition] of hopFilters) boxOf.get(target)!.filters.push(filterWords(condition, bindings, target));
  const filters: Part[][] = [];
  const whereTrees: FilterNode[] = [];
  const where = str(definition.where);
  if (where) {
    const named = filterBindings(where, bindings);
    if (named.length === 1) boxOf.get(named[0]!)!.filters.push(filterWords(where, bindings, named[0]!));
    else {
      filters.push(filterWords(where, bindings, null));
      whereTrees.push(filterTree(where, bindings, null));
    }
  }
  const fields = Array.isArray(definition.fields) ? definition.fields : [];
  const returns = fields.flatMap((item): QueryReturn[] => {
    if (typeof item === "string") {
      const bare = /^(?:role|verdict)\((.*)\)$/.exec(item)?.[1] ?? item;
      const name = bindings.has(item) ? item : (bare.split(".").at(-1) ?? bare);
      return [{ name, from: expressionWords(item, bindings), expression: item }];
    }
    const pair = one(item);
    return pair ? [{ name: pair[0], from: expressionWords(pair[1], bindings), expression: pair[1] }] : [];
  });
  return { boxes, links, filters, whereTrees, returns, row: str(definition.row), paths: links.length > 0 };
}

/** A typed value ref (`claim_value`, `subject_field`, …) as authored text. */
function refText(value: unknown): string {
  const ref = rec(value);
  if (!ref) return JSON.stringify(value);
  const binding = str(ref.binding) ?? "";
  if (ref.kind === "subject_field") return ref.field === "subject_id" ? binding : `${binding}.${String(ref.field)}`;
  if (ref.kind === "claim_value") return `${binding}.${String(ref.predicate)}`;
  if (ref.kind === "claim_field") return `${String(ref.field)}(${binding}.${String(ref.predicate)})`;
  return JSON.stringify(value);
}

function readTyped(definition: Record<string, unknown>): Omit<QueryView, "params" | "name" | "description" | "budgets"> | null {
  const entry = rec(definition.entry);
  const entryBinding = str(entry?.binding);
  if (!entry || !entryBinding) return null;
  const bindings = new Map<string, string[]>();
  const kindsOf = (value: unknown) => (Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []);
  bindings.set(entryBinding, kindsOf(entry.subject_kinds));
  const typedFilter = (): Part[] => [{ text: "filtered (see the raw definition)" }];
  const boxes: QueryBox[] = [
    { binding: entryBinding, kinds: bindings.get(entryBinding)!, entryParam: str(rec(entry.subject_id)?.parameter), filters: [] },
  ];
  const links: QueryLink[] = [];
  for (const step of Array.isArray(definition.traversal) ? definition.traversal : []) {
    const s = rec(step);
    const binding = str(s?.binding);
    const kind = str(s?.subject_kind);
    if (s && binding && kind && Array.isArray(s.parts)) {
      // a pair step: the pair of `subject_kind` whose key parts name earlier bindings
      const parts = s.parts.flatMap((item) => {
        const part = rec(item);
        const name = str(part?.part);
        const bound = str(part?.binding);
        return name && bound && bindings.has(bound) ? [{ ...claimTypeOf(name, [kind]), binding: bound }] : [];
      });
      const fact = str(s.fact);
      const made = pairStep(binding, kind, parts, fact ? claimTypeOf(fact, [kind]) : null, s.required !== false, [...bindings.keys()]);
      if (!made) continue;
      bindings.set(binding, [kind]);
      boxes.push({ ...made.box, filters: s.where ? [typedFilter()] : [] });
      links.push(made.link);
      continue;
    }
    const source = str(s?.from_binding);
    const predicate = str(s?.predicate);
    if (!s || !binding || !source || !predicate) continue;
    const kinds = kindsOf(s.target_subject_kinds);
    bindings.set(binding, kinds);
    const reverse = s.direction === "reverse";
    boxes.push({ binding, kinds, entryParam: null, filters: s.where ? [typedFilter()] : [] });
    links.push({ from: source, to: binding, ...claimTypeOf(predicate, reverse ? kinds : (bindings.get(source) ?? [])), reverse, required: s.required === true });
  }
  const projection = Array.isArray(rec(definition.projection)?.fields) ? (rec(definition.projection)!.fields as unknown[]) : [];
  const returns = projection.flatMap((item): QueryReturn[] => {
    const field = rec(item);
    const name = str(field?.name);
    if (!field || !name) return [];
    const expression = refText(field.value);
    return [{ name, from: expressionWords(expression, bindings), expression }];
  });
  const contract = rec(definition.row_contract);
  return {
    boxes,
    links,
    filters: definition.where ? [typedFilter()] : [],
    whereTrees: definition.where ? [{ op: "clause", parts: typedFilter() }] : [],
    returns,
    row: contract ? `${String(contract.name)}@${String(contract.version)}` : null,
    paths: links.length > 0,
  };
}

/** The card's parameters: the card's list (name, type, required), with defaults where the typed definition declares them. */
function readParams(card: QueryCard, definition: Record<string, unknown> | null): QueryParam[] {
  const declared = new Map<string, Record<string, unknown>>();
  for (const item of Array.isArray(definition?.parameters) ? definition.parameters : []) {
    const name = str(rec(item)?.name);
    if (name) declared.set(name, rec(item)!);
  }
  const listed = card.params ?? [];
  if (listed.length > 0) {
    return listed.map((param) => {
      const typed = declared.get(param.name);
      return { name: param.name, type: param.type, required: param.required, ...(typed && "default" in typed ? { default: typed.default } : {}) };
    });
  }
  const authored = rec(definition?.params);
  if (authored) return Object.entries(authored).map(([name, type]) => ({ name, type: String(type), required: true }));
  return [...declared.values()].map((typed) => ({
    name: String(typed.name),
    type: String(typed.value_type ?? ""),
    required: typed.required !== false,
    ...("default" in typed ? { default: typed.default } : {}),
  }));
}

/** A Query card as the page reads it; null when the card has no definition the page can read. */
export function readQueryView(card: QueryCard, claimTypes: readonly ClaimTypeShape[] = []): QueryView | null {
  const definition = rec(card.definition);
  if (!definition) return null;
  const body = definition.from !== undefined ? readAuthored(definition, claimTypes) : readTyped(definition);
  if (!body) return null;
  return {
    name: card.query.replace(/^(?:query|QueryDefinition):/, ""),
    description: card.description ?? str(definition.description),
    params: readParams(card, definition),
    budgets: readBudgets(definition),
    ...body,
  };
}

/** Whether the hops need the ontology to name a box's kinds (a hop with no stated target the name does not give). */
export function needsOntology(view: QueryView): boolean {
  return view.boxes.some((box) => box.kinds.length === 0);
}

/** "1 row / vulnerability" / "1 row / path vulnerability → assessment → release". */
export function rowWords(view: QueryView): string {
  const word = (box: QueryBox | undefined) => (box && box.kinds.length > 0 ? box.kinds.map(kindWord).join("|") : "result");
  if (!view.paths) return `1 row / ${word(view.boxes[0])}`;
  return `1 row / path ${view.boxes.map(word).join(" → ")}`;
}

/** The kind table holds exactly the query's answer: one entry kind, no hops, no filters, no entry parameter. */
export function wholeKindTable(view: QueryView): string | null {
  const [entry, ...rest] = view.boxes;
  if (!entry || rest.length > 0 || entry.kinds.length !== 1 || entry.entryParam || entry.filters.length > 0 || view.filters.length > 0) return null;
  return entry.kinds[0]!;
}

// -- the preview's columns ----------------------------------------------------

/** Row keys a column takes `value.<name>` instead of (core compact_query ROW_METADATA). */
const ROW_METADATA = new Set(["subject", "subject_id", "flags", "claims", "lifecycle", "nones"]);

/** A result column's field name: a field named like row metadata is served as `value.<name>`. */
export function columnField(column: string): string {
  const rest = column.startsWith("value.") ? column.slice("value.".length) : null;
  return rest !== null && ROW_METADATA.has(rest) ? rest : column;
}

// -- who reads it -------------------------------------------------------------

export interface QueryReader {
  procedure: string;
  /** The read steps' output names. */
  steps: string[];
  /** The Lines that run this Procedure. */
  lines: string[];
}

/** The Procedures whose read steps name `query`, with the Lines running each. */
export function queryReaders(
  query: string,
  specs: ReadonlyMap<string, Schemas["ProcedureSpec"]>,
  lines: readonly { line: string; procedure: string }[],
): QueryReader[] {
  const out: QueryReader[] = [];
  for (const [procedure, spec] of specs) {
    const steps = (spec.steps ?? []).flatMap((step) => {
      const s = step as Record<string, unknown>;
      return typeof s.read === "string" && s.query === query ? [s.read] : [];
    });
    if (steps.length === 0) continue;
    out.push({
      procedure,
      steps,
      lines: lines.filter((line) => line.procedure === procedure).map((line) => line.line).sort(),
    });
  }
  return out.sort((a, b) => a.procedure.localeCompare(b.procedure));
}
