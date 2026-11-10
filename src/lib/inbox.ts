import type { NextItem, Schemas } from "../api/schemas.ts";
import { parseRef } from "./cruxible-ref.ts";
import { nextRowsByLine, unreadOf } from "./lines.ts";
import { claimTypeOf, type QueryView } from "./query-view.ts";

/**
 * The Inbox page's reading of inbox items: which Contract a posting node
 * declares for its items, each item's payload fields (from the bounded
 * preview the list serves), which of them name Subjects, which a row need
 * not repeat, and the columns a page of items needs.
 */

type ProcedureSpec = Schemas["ProcedureSpec"];
type ContractField = Schemas["GetContractField"];

/** Rows one Inbox page reads (the route's maximum is 200). */
export const INBOX_LIST_PAGE = 100;

/** The inbox statuses the list filters by, in the order the page offers them. */
export const INBOX_STATUSES = ["unread", "acknowledged", "dismissed", "linked"] as const;
export type InboxFilterStatus = (typeof INBOX_STATUSES)[number];

/** The item Contract (`name@N`) a Procedure's posting step declares; null when the spec has no such step. */
export function inboxContract(spec: ProcedureSpec | null | undefined, nodeId: string): string | null {
  for (const step of spec?.steps ?? []) {
    if ("inbox" in step && step.id === nodeId) return step.inbox;
  }
  return null;
}

/** The payload's fields when its preview is an object (`ShownObject`); null for a cut or non-object payload. */
export function payloadObject(preview: unknown): Record<string, unknown> | null {
  if (typeof preview !== "object" || preview === null || Array.isArray(preview)) return null;
  const object = (preview as { object?: unknown }).object;
  return typeof object === "object" && object !== null && !Array.isArray(object) ? (object as Record<string, unknown>) : null;
}

export interface PayloadColumn {
  name: string;
  /** The type its Contract declares; null when no Contract on the page names the field. */
  type: string | null;
  /** The field's description as its Contract declares it; null when it has none. */
  description?: string | null;
}

/**
 * The payload columns a page needs: each Contract's fields in declared order
 * (Contracts in the order the page first meets them), then any field a
 * payload carries that no Contract declares.
 */
export function payloadColumns(contracts: readonly (readonly ContractField[])[], payloads: readonly (Record<string, unknown> | null)[]): PayloadColumn[] {
  const out = new Map<string, PayloadColumn>();
  for (const fields of contracts)
    for (const field of fields) if (!out.has(field.name)) out.set(field.name, { name: field.name, type: field.type, description: field.description ?? null });
  for (const payload of payloads) for (const name of Object.keys(payload ?? {})) if (!out.has(name)) out.set(name, { name, type: null });
  return [...out.values()];
}

/** A Contract field type that names a Subject by its ref (`subject<K>`; an older card's `subject` / `subject_reference`). */
export function isSubjectType(type: string | null): boolean {
  const text = type?.trim() ?? "";
  return /^subject<[^>]+>$/.test(text) || text === "subject" || text === "subject_reference";
}

// -- payload fields that name Subjects -----------------------------------------

/**
 * How a payload field names a Subject: its value is the Subject's ref, its id
 * under `kind`, or the value of `kind`'s one key ClaimType (`key`), which the
 * page looks up. `from` says what said so: the item Contract's field type, or
 * the posting step's lineage (the field copies a read step's row field, which
 * the Query fills from a box's Subject or its key).
 */
export type SubjectField =
  | { by: "ref"; kind: null; from: "contract" }
  | { by: "id"; kind: string; from: "contract" | "lineage" }
  | { by: "key"; kind: string; key: string; from: "contract" | "lineage" };

/** Each keyed kind's key ClaimTypes (orient's subject kinds). */
export type KindKeys = ReadonlyMap<string, ReadonlySet<string>>;

const oneKey = (keys: KindKeys, kind: string): string | null => {
  const set = keys.get(kind);
  return set && set.size === 1 ? [...set][0]! : null;
};

/**
 * What a Contract field type says about the Subject its value names:
 * `subject<K>` (one kind: the value is the id or the ref; several: the ref),
 * `key<K>` (the value of K's one key), `key_part<K:part>` (the same, when that
 * part is K's whole key). Null for any other type.
 */
export function contractSubjectField(type: string | null, keys: KindKeys): SubjectField | null {
  const text = type?.trim() ?? "";
  if (text === "subject" || text === "subject_reference") return { by: "ref", kind: null, from: "contract" };
  const subject = /^subject<([^>]+)>$/.exec(text);
  if (subject) {
    const kinds = subject[1]!.split("|").map((kind) => kind.trim());
    return kinds.length === 1 ? { by: "id", kind: kinds[0]!, from: "contract" } : { by: "ref", kind: null, from: "contract" };
  }
  const key = /^key<([^>]+)>$/.exec(text);
  if (key) {
    const kind = key[1]!.trim();
    const only = oneKey(keys, kind);
    return only ? { by: "key", kind, key: only, from: "contract" } : null;
  }
  const part = /^key_part<([^:>]+):([^>]+)>$/.exec(text);
  if (part) {
    const kind = part[1]!.trim();
    const only = oneKey(keys, kind);
    const named = claimTypeOf(part[2]!.trim(), [kind]).claimType;
    return only && only === named ? { by: "key", kind, key: only, from: "contract" } : null;
  }
  return null;
}

const rec = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

/** A `{$ref: "item", path: [name]}` template's one path segment; null for anything else. */
function itemField(template: unknown): string | null {
  const ref = rec(template);
  const path = ref?.path;
  return ref?.$ref === "item" && Array.isArray(path) && path.length === 1 && typeof path[0] === "string" ? path[0] : null;
}

/** A posting step and the read step whose rows it fans out over; null when it fans out over anything else. */
function postingRead(spec: ProcedureSpec | null | undefined, nodeId: string): { post: Record<string, unknown>; query: string } | null {
  const steps = (spec?.steps ?? []) as unknown as Record<string, unknown>[];
  const post = steps.find((step) => "inbox" in step && step.id === nodeId);
  const over = rec(post?.for_each);
  const path = over?.path;
  if (!post || over?.$ref !== "step" || typeof over.step !== "string" || !Array.isArray(path) || path.length !== 1 || path[0] !== "rows") return null;
  const read = steps.find((step) => step.read === over.step && typeof step.query === "string");
  return read ? { post, query: String(read.query).replace(/^(?:query|QueryDefinition):/, "") } : null;
}

/** The Query a posting step's lineage reads (its fan-out's read step); null when there is none. */
export function lineageQuery(spec: ProcedureSpec | null | undefined, nodeId: string): string | null {
  return postingRead(spec, nodeId)?.query ?? null;
}

/**
 * The Subject each payload field of one posting step names, read from the
 * step's lineage: a field whose template is `$item.<name>`, where the step
 * fans out over a read step's rows, copies that row field; the Query fills it
 * from a box (`binding` or `binding.subject_id`: the box's Subject id) or
 * from the box's one key ClaimType (the key's value). Any other source says
 * nothing.
 */
export function lineageSubjectFields(
  spec: ProcedureSpec | null | undefined,
  nodeId: string,
  queries: ReadonlyMap<string, QueryView>,
  keys: KindKeys,
): Map<string, SubjectField> {
  const out = new Map<string, SubjectField>();
  const found = postingRead(spec, nodeId);
  const view = found ? queries.get(found.query) : undefined;
  if (!found || !view) return out;
  for (const [name, template] of Object.entries(rec(found.post.fields) ?? {})) {
    const source = itemField(template);
    const filled = source === null ? undefined : view.returns.find((item) => item.name === source);
    if (!filled) continue;
    const [binding, ...rest] = filled.expression.trim().split(".");
    const kinds = view.boxes.find((box) => box.binding === binding)?.kinds ?? [];
    if (kinds.length !== 1) continue;
    const kind = kinds[0]!;
    const tail = rest.join(".");
    if (tail === "" || tail === "subject_id") {
      out.set(name, { by: "id", kind, from: "lineage" });
      continue;
    }
    const only = oneKey(keys, kind);
    if (only && claimTypeOf(tail, [kind]).claimType === only) out.set(name, { by: "key", kind, key: only, from: "lineage" });
  }
  return out;
}

/** The key a looked-up Subject is filed under. */
export const lookupKey = (kind: string, value: string) => `${kind}\u0000${value}`;

/**
 * The Subject ref a field's value names, or null: a ref as served, `kind/id`
 * for an id, the looked-up Subject for a key's value (`found` maps
 * `lookupKey(kind, value)` to the Subject the lookup returned; absent until it
 * lands, or when no live Subject holds that key).
 */
export function subjectRefOf(field: SubjectField, value: unknown, found: ReadonlyMap<string, string>): string | null {
  if (typeof value !== "string" || value === "") return null;
  if (field.by === "ref") return parseRef(value)?.kind === "subject" ? value : null;
  if (field.by === "id") {
    const ref = value.startsWith(`${field.kind}/`) ? value : `${field.kind}/${value}`;
    return parseRef(ref)?.kind === "subject" ? ref : null;
  }
  return found.get(lookupKey(field.kind, value)) ?? null;
}

/** The key lookups a page needs: per kind, its key ClaimType and the distinct values the page's payloads give it. */
export function keyLookups(
  rows: readonly { payload: Record<string, unknown> | null; fields: ReadonlyMap<string, SubjectField> }[],
): { kind: string; key: string; values: string[] }[] {
  const byKind = new Map<string, { kind: string; key: string; values: Set<string> }>();
  for (const row of rows) {
    for (const [name, field] of row.fields) {
      const value = row.payload?.[name];
      if (field.by !== "key" || typeof value !== "string" || value === "") continue;
      const entry = byKind.get(field.kind) ?? { kind: field.kind, key: field.key, values: new Set<string>() };
      entry.values.add(value);
      byKind.set(field.kind, entry);
    }
  }
  return [...byKind.values()]
    .sort((a, b) => a.kind.localeCompare(b.kind))
    .map((entry) => ({ kind: entry.kind, key: entry.key, values: [...entry.values].sort() }));
}

// -- fields a row need not repeat ---------------------------------------------

const words = (value: string) => value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

/**
 * The payload fields a page's rows need not show as columns, each still read
 * in the opened item: `constant` holds a field with one value on every row
 * of a page of two or more (said once above the table), except the fields
 * in `subjects` (what an item is about stays on its row); `composite` a text
 * field whose words are, on every row, all words of two or more of the row's
 * other fields (an id built from them, such as `<inventory>--<component>`).
 */
export function foldedFields(
  names: readonly string[],
  payloads: readonly (Record<string, unknown> | null)[],
  subjects: ReadonlySet<string> = new Set(),
): { constant: Map<string, unknown>; composite: Set<string> } {
  const constant = new Map<string, unknown>();
  const composite = new Set<string>();
  const rows = payloads.filter((payload): payload is Record<string, unknown> => payload !== null);
  if (rows.length === 0) return { constant, composite };
  for (const name of names) {
    const values = rows.map((row) => row[name]);
    const first = values[0];
    const scalar = typeof first === "string" || typeof first === "number" || typeof first === "boolean";
    if (rows.length >= 2 && scalar && !subjects.has(name) && values.every((value) => value === first)) constant.set(name, first);
  }
  for (const name of names) {
    if (constant.has(name)) continue;
    const folds = rows.every((row) => {
      const value = row[name];
      if (typeof value !== "string") return value === undefined || value === null;
      const own = words(value);
      if (own.length < 2) return false;
      const covering = names.filter((other) => {
        const text = row[other];
        if (other === name || constant.has(other) || typeof text !== "string") return false;
        const theirs = words(text);
        return theirs.length > 0 && theirs.every((token) => own.includes(token));
      });
      if (covering.length < 2) return false;
      const covered = new Set(covering.flatMap((other) => words(String(row[other]))));
      return own.every((token) => covered.has(token));
    });
    if (folds && rows.some((row) => typeof row[name] === "string")) composite.add(name);
  }
  return { constant, composite };
}

/** Unread items across every Line, as `next`'s `line_inbox_unread` rows count them; null when no row says. */
export function totalUnread(items: readonly NextItem[] | undefined): number | null {
  if (!items) return null;
  let total: number | null = null;
  for (const rows of nextRowsByLine(items).values()) {
    const unread = unreadOf(rows);
    if (unread !== null) total = (total ?? 0) + unread;
  }
  return total;
}
