// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import { stepId, type LineDefinition, type ProcedureSpec } from "./definitions.ts";
import { createdKinds } from "./template.ts";

/**
 * Dependencies between Lines, from definitions only: Line A writes the
 * ClaimTypes (or creates the Subjects) that a Query Line B's Procedure reads
 * names.
 *
 *   B's read step `read: <alias>, query: Q`
 *   Q's definition: `from` {alias: kind}, `hops` [{alias: "<?a.predicate: kind where …"}],
 *   `where`, `fields` [{name: "alias.predicate"}], `order`
 *     -> the ClaimTypes it names (alias.predicate) and the Subject kinds it walks (from + hop targets)
 *   A ClaimType's producers: the Lines whose claims steps write it.
 *   A kind's (and its identity keys') producers: the Lines whose claims steps
 *   may create Subjects of it (`subject.create: if_absent`).
 *   Nothing produces it: entered directly (people and agents; an installer's Subjects).
 *
 * A Line capped at observe writes no Claims and produces nothing. A Line that
 * produces only for its own Query is not a dependency.
 */

/** What a Query's definition names: ClaimTypes (identity keys among them) and Subject kinds. */
export interface QueryReads {
  /** ClaimTypes its fields, filters, hops and order name (identity keys excluded). */
  claimTypes: string[];
  /** Identity-key ClaimTypes it names (a Subject's id), with their kind. */
  keys: string[];
  /** Subject kinds it starts from or hops to. */
  kinds: string[];
}

/** One producer of what one read step's Query reads. */
export interface LineDependency {
  /** The producing Line; null: entered directly (no Line produces it). */
  producer: string | null;
  /** The Line whose read step reads it. */
  reader: string;
  /** The reader's read step (its node id). */
  step: string;
  query: string;
  /** The ClaimTypes it connects (written by the producer, or by no Line). */
  claimTypes: string[];
  /** The Subject kinds it connects (created by the producer, or by no Line). */
  kinds: string[];
  /** The producer's claims steps that write or create them ([] for entered directly). */
  writes: string[];
}

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const byText = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
const sorted = (values: Iterable<string>) => [...new Set(values)].sort(byText);

const NAME = /^\s*([A-Za-z_][\w.-]*)/;
const HOP = /^\s*<?\s*([A-Za-z_]\w*)\.([A-Za-z_][\w-]*(?:\.[A-Za-z_][\w-]*)+)\s*:\s*([A-Za-z_][\w.-]*)([\s\S]*)$/;
/** `alias.kind.name` paths in an expression; the alias is checked against the Query's own. */
const PATH = /(?<![\w.$])([A-Za-z_]\w*)\.([A-Za-z_][\w-]*(?:\.[A-Za-z_][\w-]*)+)/g;
const QUOTED = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g;

/**
 * What a Query definition (a Query card's `definition`, as authored) names.
 * Null when it isn't an authored definition (no `from`). `keys` maps an
 * identity-key ClaimType to its kind.
 */
export function queryReads(definition: unknown, keys: ReadonlyMap<string, string> = new Map()): QueryReads | null {
  const d = record(definition);
  const from = record(d?.from);
  if (!d || !from) return null;
  const aliases = new Set<string>();
  const kinds = new Set<string>();
  const predicates = new Set<string>();
  const expressions: string[] = [];
  for (const [alias, value] of Object.entries(from)) {
    aliases.add(alias);
    const kind = typeof value === "string" ? NAME.exec(value)?.[1] : undefined;
    if (kind) kinds.add(kind);
    if (typeof value === "string") expressions.push(value.slice(kind?.length ?? 0));
  }
  for (const hop of Array.isArray(d.hops) ? d.hops : []) {
    for (const [alias, value] of Object.entries(record(hop) ?? {})) {
      aliases.add(alias);
      if (typeof value !== "string") continue;
      const m = HOP.exec(value);
      if (!m) {
        expressions.push(value);
        continue;
      }
      predicates.add(m[2]!);
      kinds.add(m[3]!);
      expressions.push(m[4]!);
    }
  }
  if (typeof d.where === "string") expressions.push(d.where);
  const fields = d.fields;
  const values = (list: unknown): unknown[] =>
    Array.isArray(list) ? list.flatMap((f) => (typeof f === "string" ? [f] : Object.values(record(f) ?? {}))) : Object.values(record(list) ?? {});
  for (const value of [...values(fields), ...values(d.order)]) if (typeof value === "string") expressions.push(value);
  for (const text of expressions) {
    for (const m of text.replace(QUOTED, '""').matchAll(PATH)) if (aliases.has(m[1]!)) predicates.add(m[2]!);
  }
  const keyed = [...predicates].filter((p) => keys.has(p));
  for (const key of keyed) kinds.add(keys.get(key)!);
  return { claimTypes: sorted([...predicates].filter((p) => !keys.has(p))), keys: sorted(keyed), kinds: sorted(kinds) };
}

/** The Queries the Lines' Procedures read (their read steps' `query`), distinct, sorted: what to batch-read. */
export function queriesRead(specs: ReadonlyMap<string, ProcedureSpec>, lines: readonly LineDefinition[]): string[] {
  return sorted(
    lines.flatMap((line) => (specs.get(line.procedure)?.steps ?? []).flatMap((step) => ("read" in step && step.query ? [step.query] : []))),
  );
}

export interface DependencyInputs {
  specs: ReadonlyMap<string, ProcedureSpec>;
  lines: readonly LineDefinition[];
  /** Query name -> its definition as authored (a Query card's `definition`); a Query missing here is unread. */
  queries: ReadonlyMap<string, unknown>;
  /** Identity-key ClaimType -> its Subject kind. */
  keys?: ReadonlyMap<string, string>;
}

interface Producing {
  line: string;
  step: string;
}

/**
 * Every Line dependency: per reading Line, per read step naming a Query, one
 * row per producer (Lines in name order, then entered directly), each with
 * the ClaimTypes and kinds it connects.
 */
export function lineDependencies({ specs, lines, queries, keys = new Map() }: DependencyInputs): LineDependency[] {
  const ordered = [...lines].sort((a, b) => byText(a.line, b.line));
  // Who writes each ClaimType, and who may create Subjects of each kind.
  const writers = new Map<string, Producing[]>();
  const creators = new Map<string, Producing[]>();
  const push = (map: Map<string, Producing[]>, key: string, value: Producing) => map.set(key, [...(map.get(key) ?? []), value]);
  for (const line of ordered) {
    if (line.maxAuthority === "observe") continue;
    (specs.get(line.procedure)?.steps ?? []).forEach((step, index) => {
      if (!("claims" in step)) return;
      const at = { line: line.line, step: stepId(step, index) };
      for (const type of new Set(step.claims.map((claim) => claim.type))) push(writers, type, at);
      for (const kind of createdKinds(step)) push(creators, kind, at);
    });
  }

  const out: LineDependency[] = [];
  for (const line of ordered) {
    (specs.get(line.procedure)?.steps ?? []).forEach((step, index) => {
      if (!("read" in step) || !step.query || !queries.has(step.query)) return;
      const reads = queryReads(queries.get(step.query), keys);
      if (!reads) return;
      const by = new Map<string | null, { claimTypes: Set<string>; kinds: Set<string>; writes: Set<string> }>();
      const credit = (producers: Producing[] | undefined, add: (entry: { claimTypes: Set<string>; kinds: Set<string> }) => void) => {
        const all = producers ?? [];
        const others = all.filter((p) => p.line !== line.line);
        if (all.length > 0 && others.length === 0) return; // only this Line produces it: not a dependency
        for (const target of others.length ? others : [null]) {
          const key = target ? target.line : null;
          let entry = by.get(key);
          if (!entry) by.set(key, (entry = { claimTypes: new Set(), kinds: new Set(), writes: new Set() }));
          add(entry);
          if (target) entry.writes.add(target.step);
        }
      };
      for (const type of reads.claimTypes) credit(writers.get(type), (e) => e.claimTypes.add(type));
      for (const key of reads.keys) credit(creators.get(keys.get(key)!), (e) => e.claimTypes.add(key));
      for (const kind of reads.kinds) credit(creators.get(kind), (e) => e.kinds.add(kind));
      const producers = [...by.keys()].sort((a, b) => (a === null ? 1 : b === null ? -1 : byText(a, b)));
      for (const producer of producers) {
        const entry = by.get(producer)!;
        out.push({
          producer,
          reader: line.line,
          step: stepId(step, index),
          query: step.query,
          claimTypes: sorted(entry.claimTypes),
          kinds: sorted(entry.kinds),
          writes: sorted(entry.writes),
        });
      }
    });
  }
  return out;
}
