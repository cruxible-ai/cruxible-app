import type { NextItem, Schemas } from "../api/schemas.ts";
import { nextRowsByLine, unreadOf } from "./lines.ts";

/**
 * The Inbox page's reading of inbox items: which Contract a posting node
 * declares for its items, each item's payload fields (from the bounded
 * preview the list serves), and the columns a page of items needs.
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
}

/**
 * The payload columns a page needs: each Contract's fields in declared order
 * (Contracts in the order the page first meets them), then any field a
 * payload carries that no Contract declares.
 */
export function payloadColumns(contracts: readonly (readonly ContractField[])[], payloads: readonly (Record<string, unknown> | null)[]): PayloadColumn[] {
  const out = new Map<string, PayloadColumn>();
  for (const fields of contracts) for (const field of fields) if (!out.has(field.name)) out.set(field.name, { name: field.name, type: field.type });
  for (const payload of payloads) for (const name of Object.keys(payload ?? {})) if (!out.has(name)) out.set(name, { name, type: null });
  return [...out.values()];
}

/** A Contract field type that names a Subject. */
export function isSubjectType(type: string | null): boolean {
  const base = type?.trim().split(":", 1)[0];
  return base === "subject" || base === "subject_reference";
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
