/**
 * A Subject kind as a table: one row per live Subject, one column per field
 * (ClaimType of the kind), each cell the slot's answer from one compact
 * `query` page with `claims: true` (each cell's Claims: id, value, verdict,
 * status). Pure: the request, the cell rules and the push-down of the
 * table's sort and filters to the daemon.
 */
import type { QueryArgs } from "../api/requests.ts";
export { KIND_PAGE, kindQuery, SELECT_MAX, selectFields } from "../api/requests.ts";
import { term, type Signal } from "./vocabulary.ts";
import type { TableState } from "./table-state.ts";

/** The daemon stops a compact answer here (`capped: max_results=5000`). */
export const ANSWER_CAP = 5000;
/** Columns shown before the rest go behind the Columns picker. */
export const DEFAULT_VISIBLE_FIELDS = 8;

export const SUBJECT_ID = "subject_id";

export type ReadFlag = "stale" | "contested" | "contradicted" | "uncovered" | "unsure_hold";
const FLAG_ORDER: readonly ReadFlag[] = ["stale", "contested", "contradicted", "uncovered", "unsure_hold"];

/** One Claim behind a cell (`rows[i].claims[column]`). */
export interface CellClaim {
  claim: string;
  value: unknown;
  verdict: string;
  status: string;
  role?: string;
}

/** One served column, as the table needs it. */
export interface KindColumn {
  /** The row key the daemon serves the values under (the column's name). */
  key: string;
  /** What `where` and `order_by` name: the full predicate, or subject_id. */
  field: string;
  /** Short name for the header. */
  name: string;
  /** Base value type: string, enum, integer, decimal, boolean, timestamp, date, subject, json, exact_content. */
  type: string;
  /** Kinds a Subject-valued field points at. */
  targets: string[];
  members: string[] | null;
  cardinality: "one" | "many";
}

/** A served QueryColumn as a KindColumn. */
export function kindColumn(column: {
  name: string;
  predicate?: string | null | undefined;
  type: string;
  members?: string[] | null | undefined;
  cardinality?: "one" | "many" | undefined;
}): KindColumn {
  const [base = column.type, rest = ""] = column.type.split(":", 2);
  return {
    key: column.name,
    field: column.predicate ?? column.name,
    name: column.name,
    type: base,
    targets: rest ? rest.split("|") : [],
    members: column.members ?? null,
    cardinality: column.cardinality ?? "one",
  };
}

// -- cells --------------------------------------------------------------------

export type CellDisplay = "empty" | "none" | "value" | "values" | "count";

export interface KindCell {
  /** The distinct values the slot shows. */
  values: unknown[];
  /** Each shown value with the Claim that states it (null when the read named none). */
  entries: { value: unknown; claim: string | null }[];
  /** The Claims behind an explicit none, when the slot holds one and no value. */
  nones: string[];
  flags: ReadFlag[];
  /** The dot: red when a flag means wrong, else amber when one means waiting. */
  signal: Signal | null;
  /**
   * How it reads: `empty` (no value), `none` (a stated none), `value` (one),
   * `values` (a contested one-valued slot: every rival shows), `count` (a
   * many-valued field with two or more: a count that expands).
   */
  display: CellDisplay;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/** The Claims a row lists for a column (`claims: true`). */
export function cellClaims(row: Record<string, unknown>, key: string): CellClaim[] {
  const claims = row.claims;
  if (!isRecord(claims)) return [];
  const list = claims[key];
  if (!Array.isArray(list)) return [];
  return list.filter(
    (item): item is CellClaim => isRecord(item) && typeof item.claim === "string" && typeof item.verdict === "string" && typeof item.status === "string",
  );
}

function cellNones(row: Record<string, unknown>, key: string): { claim: string; verdict: string; status: string; flags?: string[] }[] {
  const nones = row.nones;
  if (!isRecord(nones) || !Array.isArray(nones[key])) return [];
  return (nones[key] as unknown[]).filter(
    (item): item is { claim: string; verdict: string; status: string; flags?: string[] } => isRecord(item) && typeof item.claim === "string",
  );
}

/**
 * One Claim's flags, by the rule core's read flags use (read_flags.verdict_flags):
 * stale for a stale verdict, contested for an unresolved verdict or a
 * conflicted slot, contradicted, uncovered. Holds (unsure_hold) are decided
 * by `next` and served only per row.
 */
export function claimFlags(claim: { verdict: string; status: string }): ReadFlag[] {
  const flags = new Set<ReadFlag>();
  if (claim.verdict === "stale" || claim.verdict === "stale_evidence") flags.add("stale");
  if (claim.verdict === "unresolved" || claim.status === "conflicted") flags.add("contested");
  if (claim.verdict === "contradicted") flags.add("contradicted");
  if (claim.verdict === "uncovered") flags.add("uncovered");
  return FLAG_ORDER.filter((flag) => flags.has(flag));
}

/** The dot a set of flags earns under the two-signal rule (glossary terms). */
export function flagSignal(flags: readonly string[]): Signal | null {
  const signals = flags.map((flag) => term("claim", flag).signal);
  if (signals.includes("wrong")) return "wrong";
  if (signals.includes("waiting")) return "waiting";
  return null;
}

/** The cell rules: values, the Claim behind each, flags, the dot and how it reads. */
export function kindCell(row: Record<string, unknown>, column: KindColumn): KindCell {
  const raw = row[column.key];
  const values = raw === null || raw === undefined ? [] : Array.isArray(raw) ? raw : [raw];
  const claims = cellClaims(row, column.key);
  const live = claims.filter((claim) => claim.status === "accepted" || claim.status === "conflicted");
  const entries = values.map((value) => ({ value, claim: (live.find((c) => same(c.value, value)) ?? claims.find((c) => same(c.value, value)))?.claim ?? null }));
  const nones = cellNones(row, column.key);
  const flags = new Set<ReadFlag>();
  for (const claim of live) for (const flag of claimFlags(claim)) flags.add(flag);
  for (const none of nones) for (const flag of none.flags ?? []) if ((FLAG_ORDER as readonly string[]).includes(flag)) flags.add(flag as ReadFlag);
  // a one-valued answer that shows more than one distinct value is contested (read_flags.answer_flags)
  if (column.cardinality === "one" && values.length > 1) flags.add("contested");
  const ordered = FLAG_ORDER.filter((flag) => flags.has(flag));
  const display: CellDisplay =
    values.length === 0
      ? nones.length > 0
        ? "none"
        : "empty"
      : column.cardinality === "many"
        ? values.length === 1
          ? "value"
          : "count"
        : values.length === 1
          ? "value"
          : "values";
  return {
    values,
    entries,
    nones: nones.map((none) => none.claim),
    flags: ordered,
    signal: flagSignal(ordered),
    display,
  };
}

/** A value as plain text (sorting, filtering, hover). */
export function valueText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") return String(value);
  if (isRecord(value)) {
    if (typeof value.preview === "string") return value.preview;
    if (typeof value.content_digest === "string") return value.content_digest;
    if (isRecord(value.object)) return JSON.stringify(value.object);
  }
  return JSON.stringify(value);
}

/** The client-side sort key of a cell: a one-valued field its value, a many-valued one its count. */
export function cellSortValue(row: Record<string, unknown>, column: KindColumn): string | number | boolean | null {
  const raw = row[column.key];
  const values = raw === null || raw === undefined ? [] : Array.isArray(raw) ? raw : [raw];
  if (column.cardinality === "many") return values.length;
  if (values.length === 0) return null;
  const first = values[0];
  if (typeof first === "number" || typeof first === "boolean") return first;
  return valueText(first);
}

// -- what the daemon can do with a column --------------------------------------

const ORDERABLE = new Set(["string", "integer", "decimal", "timestamp", "date", "boolean", "enum", "subject"]);
const CONTAINS = new Set(["string", "enum", "subject"]);

/** The daemon orders by subject_id and one-valued scalar fields (`order_by`). */
export function serverSortable(column: KindColumn): boolean {
  return column.field === SUBJECT_ID || (column.cardinality === "one" && ORDERABLE.has(column.type));
}

/** How a column filters: enum and boolean pick values (`in`); text contains (`contains`) where the daemon serves it. */
export function filterKind(column: KindColumn): "enum" | "text" {
  return column.type === "enum" || column.type === "boolean" ? "enum" : "text";
}

/** The daemon filters this column the way the table does (`in` for picked values, `contains` for text). */
export function serverFilterable(column: KindColumn): boolean {
  if (column.field === SUBJECT_ID) return true;
  return filterKind(column) === "enum" ? true : CONTAINS.has(column.type);
}

/** The picker's values for an enum column. */
export function enumMembers(column: KindColumn): string[] | null {
  if (column.type === "boolean") return ["true", "false"];
  return column.members;
}

type Where = NonNullable<QueryArgs["where"]>;

/**
 * The table's sort and filters as the daemon's `where` and `order_by`. Only
 * what the daemon serves is pushed (a column it cannot order or filter has no
 * header sort or filter in this mode, so nothing is dropped silently).
 */
export function pushDown(state: TableState, columns: readonly KindColumn[]): { where: Where; orderBy: string[] } {
  const byKey = new Map(columns.map((column) => [column.key, column]));
  const where: Where = [];
  for (const [key, filter] of Object.entries(state.filters)) {
    const column = byKey.get(key);
    if (!column || !serverFilterable(column)) continue;
    if (filter.kind === "text" && filter.text.trim()) where.push({ field: column.field, contains: filter.text.trim() });
    if (filter.kind === "enum" && filter.values.length > 0) {
      where.push({
        field: column.field,
        in: column.type === "boolean" ? filter.values.map((value) => value === "true") : [...filter.values],
      });
    }
  }
  const sorted = state.sort ? byKey.get(state.sort.column) : undefined;
  const orderBy = sorted && serverSortable(sorted) ? [`${state.sort!.dir === "desc" ? "-" : ""}${sorted.field}`] : [];
  return { where, orderBy };
}

/** A query page is the kind's whole answer: no further page, nothing remaining, nothing capped. */
export function isWholeAnswer(page: { next_cursor?: string | null; remaining?: number; capped?: string[]; truncated?: boolean }): boolean {
  return !page.next_cursor && (page.remaining ?? 0) === 0 && (page.capped?.length ?? 0) === 0 && page.truncated !== true;
}
