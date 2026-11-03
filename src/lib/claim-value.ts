/**
 * Claim values as the daemon serves them, read one way everywhere.
 *
 * A Subject card serves each slot's answer as `value` (a list when the slot is
 * many-valued, a Subject as its ref) and its live inverse Claims as `nones`
 * (`of` the unit held absent, as a ref or literal; no `of` for a whole
 * one-valued slot). A Claim card, a Subject's history and a proposal serve one
 * Claim's object instead: an inverse as `{object: {kind: "none", of?}}`, `of` a
 * Subject object (`{kind: "subject", address: {artifact_path:
 * "subjects/<kind>/<id>.json"}}`) or a literal (`{kind: "literal", value}`).
 */
import { formatRef, parseRef } from "./cruxible-ref";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** A Subject object's ref (`<kind>/<id>`), from its artifact address; null for anything else. */
export function subjectOfObject(object: unknown): string | null {
  if (!isRecord(object) || object.kind !== "subject") return null;
  const address = object.address;
  const path = isRecord(address) ? address.artifact_path : undefined;
  if (typeof path !== "string") return null;
  const ref = parseRef(path);
  return ref?.kind === "subject" ? formatRef(ref) : null;
}

/** A typed Claim object as the value it names: a Subject object as its ref, a literal as its value; anything else as is. */
export function claimObjectValue(object: unknown): unknown {
  if (!isRecord(object)) return object;
  const subject = subjectOfObject(object);
  if (subject !== null) return subject;
  if (object.kind === "literal" && "value" in object) return object.value;
  return object;
}

/**
 * The none an inverse Claim's object states, or null for any other value:
 * `of` is the unit held absent (a Subject ref or a literal), null for a whole
 * one-valued slot. Takes the served object bare or wrapped (`{object: …}`).
 */
export function noneOf(value: unknown): { of: unknown } | null {
  const object = isRecord(value) && isRecord(value.object) ? value.object : value;
  if (!isRecord(object) || object.kind !== "none") return null;
  return { of: object.of == null ? null : claimObjectValue(object.of) };
}

/** Whether a served value is a typed Claim object (a none, a Subject by address, a literal), bare or wrapped as `{object: …}`. */
export function isClaimObject(value: unknown): boolean {
  if (noneOf(value)) return true;
  const object = isRecord(value) && isRecord(value.object) ? value.object : value;
  return isRecord(object) && claimObjectValue(object) !== object;
}

/** One part of a slot's answer: a value it holds, or a unit a none says it does not hold. */
export type SlotPart = { kind: "value"; value: unknown } | { kind: "none"; of: unknown };

/**
 * A Subject card slot's answer as parts: each value it holds (a list read
 * item by item), then each live none. Empty when the slot holds nothing and
 * no none says so.
 */
export function slotParts(value: unknown, nones: readonly { of?: unknown }[] = []): SlotPart[] {
  const values = Array.isArray(value) ? value : value === null || value === undefined ? [] : [value];
  return [
    ...values.map((item): SlotPart => ({ kind: "value", value: item })),
    ...nones.map((none): SlotPart => ({ kind: "none", of: none.of == null ? null : claimObjectValue(none.of) })),
  ];
}

/** A Claim value or none as plain text (sorting, filtering, titles): a none reads `none of <of>`. */
export function claimValueText(value: unknown): string {
  const none = noneOf(value);
  if (none) return none.of === null ? "none" : `none of ${claimValueText(none.of)}`;
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(claimValueText).join(", ");
  const object = claimObjectValue(value);
  return object === value ? JSON.stringify(value) : claimValueText(object);
}
