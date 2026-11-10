import type { Schemas } from "../api/schemas.ts";
import type { QueryArgs } from "../api/requests.ts";
import { paramRun } from "./query-params.ts";
import { columnField, type QueryView } from "./query-view.ts";

/**
 * An inbox item's current row: the posting Line's own Query, read once per
 * Line for the page, joined to each item by the fields the posting step
 * copies from the row. Everything comes from what the daemon serves: the
 * Procedure's steps (which read step feeds the post, its params, which
 * payload fields copy which row fields), the Line's parameters, the Query's
 * returns, order and row Contract. Nothing here names a kit's fields.
 */

type ProcedureSpec = Schemas["ProcedureSpec"];
type ContractField = Schemas["GetContractField"];
type QueryPage = Schemas["QueryResultRecord"];

/** Rows one worklist read asks for (the query route's maximum). */
export const WORKLIST_LIMIT = 500;

const rec = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

export interface WorklistPlan {
  /** The Query the posting step's fan-out reads (bare name). */
  query: string;
  /** Each param the read step passes, as text (a literal, or the Line parameter it names). */
  given: Record<string, string>;
  /** Params the read step passes that served data cannot resolve (an `$input` value, a Line parameter not served). */
  unresolved: string[];
  /** payload field <- row field: the post step's `$item.<field>` templates. */
  join: { payload: string; row: string }[];
}

const scalar = (value: unknown): value is string | number | boolean => typeof value === "string" || typeof value === "number" || typeof value === "boolean";

/**
 * How a posting step's items join their Query's rows; null when the step does
 * not fan out over a read step's rows (or copies no row field to join by).
 */
export function worklistPlan(spec: ProcedureSpec | null | undefined, nodeId: string, lineParameters: Record<string, unknown> | null): WorklistPlan | null {
  const steps = (spec?.steps ?? []) as unknown as Record<string, unknown>[];
  const post = steps.find((step) => "inbox" in step && step.id === nodeId);
  const over = rec(post?.for_each);
  const path = over?.path;
  if (!post || over?.$ref !== "step" || typeof over.step !== "string" || !Array.isArray(path) || path.length !== 1 || path[0] !== "rows") return null;
  const read = steps.find((step) => step.read === over.step && typeof step.query === "string");
  if (!read) return null;
  const join: WorklistPlan["join"] = [];
  for (const [payload, template] of Object.entries(rec(post.fields) ?? {})) {
    const ref = rec(template);
    const segments = ref?.path;
    if (ref?.$ref === "item" && Array.isArray(segments) && segments.length === 1 && typeof segments[0] === "string") join.push({ payload, row: segments[0] });
  }
  if (join.length === 0) return null;
  const given: Record<string, string> = {};
  const unresolved: string[] = [];
  for (const [name, value] of Object.entries(rec(read.params) ?? {})) {
    if (scalar(value)) {
      given[name] = String(value);
      continue;
    }
    const ref = rec(value);
    const segments = ref?.path;
    const param = ref?.$ref === "param" && Array.isArray(segments) && segments.length === 1 && typeof segments[0] === "string" ? segments[0] : null;
    const served = param !== null && lineParameters ? lineParameters[param] : undefined;
    if (scalar(served)) given[name] = String(served);
    else unresolved.push(name);
  }
  return { query: String(read.query).replace(/^(?:query|QueryDefinition):/, ""), given, unresolved, join };
}

/** The read for a plan, or the parameters that keep it from running (never a guessed value). */
export function worklistArgs(plan: WorklistPlan, view: QueryView): { args: QueryArgs } | { blocked: string[] } {
  if (plan.unresolved.length > 0) return { blocked: plan.unresolved };
  const run = paramRun(view.params, plan.given);
  const blocked = [...run.missing, ...run.invalid].map((param) => param.name);
  if (blocked.length > 0) return { blocked };
  return { args: { name: plan.query, limit: WORKLIST_LIMIT, ...(run.params ? { params: run.params } : {}) } };
}

/** A query page's rows as field -> value, keyed by the Query's return names (a metadata-named field is served as `value.<name>`). */
export function pageRows(page: QueryPage): Record<string, unknown>[] {
  const names = page.columns.map((column) => [column.name, columnField(column.name)] as const);
  return (page.rows as Record<string, unknown>[]).map((row) => Object.fromEntries(names.map(([column, field]) => [field, row[column]])));
}

const joinText = (value: unknown): string | null => (scalar(value) ? String(value) : null);

/**
 * Each payload's row: its index in `rows` when every joined field matches,
 * null when none does (the item no longer qualifies), undefined when the
 * payload lacks a joined field (a cut preview: nothing to say).
 */
export function joinRows(payloads: readonly (Record<string, unknown> | null)[], rows: readonly Record<string, unknown>[], join: WorklistPlan["join"]): (number | null | undefined)[] {
  const index = new Map<string, number>();
  rows.forEach((row, i) => {
    const parts = join.map(({ row: field }) => joinText(row[field]));
    if (parts.every((part) => part !== null)) {
      const key = JSON.stringify(parts);
      if (!index.has(key)) index.set(key, i);
    }
  });
  return payloads.map((payload) => {
    const parts = join.map(({ payload: field }) => joinText(payload?.[field]));
    if (parts.some((part) => part === null)) return undefined;
    return index.get(JSON.stringify(parts)) ?? null;
  });
}

/** The Query's order keys as its return names (`-expr` descending), in the author's order. */
export function orderFields(definition: unknown, view: QueryView): string[] {
  const order = rec(definition)?.order;
  if (!Array.isArray(order)) return [];
  const out: string[] = [];
  for (const entry of order) {
    const raw = typeof entry === "string" ? entry : typeof rec(entry)?.field === "string" ? String(rec(entry)!.field) : null;
    if (!raw) continue;
    const expression = raw.replace(/^[-+]/, "").trim();
    const named = view.returns.find((item) => item.expression.trim() === expression || item.name === expression);
    if (named && !out.includes(named.name)) out.push(named.name);
  }
  return out;
}

export interface WorklistColumn {
  /** The row field (the Query's return name). */
  name: string;
  /** Its row Contract type (`decimal{0..1}`, `date`, `enum_of …`); null when the Contract does not say. */
  type: string | null;
  description: string | null;
  /** Shown before the Columns menu is touched. */
  shown: boolean;
}

/** Columns a page shows before the Columns menu is touched. */
export const WORKLIST_SHOWN = 4;

const empty = (value: unknown) => value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0);

/**
 * The row fields an item does not carry, as columns: the Query's order keys
 * first (the author ordered by what matters), then the other returns in
 * order. At most four start shown, never one that is empty on every joined
 * row; the rest wait in the Columns menu.
 */
export function worklistColumns(
  view: QueryView,
  order: readonly string[],
  contract: readonly ContractField[] | null,
  joined: readonly Record<string, unknown>[],
  carried: ReadonlySet<string>,
): WorklistColumn[] {
  const returns = view.returns.map((item) => item.name).filter((name) => !carried.has(name));
  const ranked = [...order.filter((name) => returns.includes(name)), ...returns.filter((name) => !order.includes(name))];
  const typeOf = new Map((contract ?? []).map((field) => [field.name, field]));
  let shown = 0;
  return ranked.map((name) => {
    const filled = joined.some((row) => !empty(row[name]));
    const show = filled && shown < WORKLIST_SHOWN;
    if (show) shown += 1;
    return { name, type: typeOf.get(name)?.type ?? null, description: typeOf.get(name)?.description ?? null, shown: show };
  });
}

/** A decimal or integer type (right-aligned, one decimals count per column). */
export const isNumberType = (type: string | null) => type !== null && /^(decimal|integer|int|float|number)\b/.test(type);
export const isDateType = (type: string | null) => type !== null && /^(date|datetime|timestamp)\b/.test(type);

/** The decimals a numeric column shows: the most any of its values has. */
export function columnDecimals(values: readonly unknown[]): number {
  let most = 0;
  for (const value of values) {
    const text = joinText(value);
    if (text === null || !/^-?\d+(\.\d+)?$/.test(text)) continue;
    most = Math.max(most, text.split(".")[1]?.length ?? 0);
  }
  return most;
}
