// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import type { Schemas } from "../api/schemas.ts";
import { stepAlias, templateRef, type ProcedureSpec, type ProcedureStep } from "./definitions.ts";
import { collectRefs } from "./procedure-graph.ts";

/**
 * The Procedure template (D-R37): `read → fetch → derive* → extract →
 * claims`, plus filter/dedupe narrowing and inbox egress, in whatever order
 * the data dependencies give (repeated fetches, late reads and derive chains
 * are all valid). Each step's stage is read off its authored form:
 *
 * - a `read` is READ, an `extract` EXTRACT, `claims` CLAIMS, an `inbox` INBOX;
 * - a `transform` of kind filter or dedupe is FILTER;
 * - a `call` is a DERIVE when its input takes a Capture (a reference to a
 *   capture field of another call) and the CaptureKind it commits is graded
 *   `derived` (or, with the grades unread, its slot declares `effect: pure`);
 *   any other call is a FETCH.
 *
 * Any other kind (guard, select, invoke, emit, halt, project, other
 * transforms: refused at authoring since D-R37 h1, still in older runs and
 * definitions) has no stage and renders generically.
 */

export type Stage = "read" | "fetch" | "derive" | "extract" | "claims" | "filter" | "inbox";

export const STAGES: readonly Stage[] = ["read", "fetch", "derive", "extract", "claims", "filter", "inbox"];

/** CaptureKind name -> its epistemic grade (orient section=capture_contracts). */
export type Grades = ReadonlyMap<string, string>;

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

type CallStep = Extract<ProcedureStep, { call: string }>;

/** One Capture a call's input takes: the call that fetched or derived it, and the capture field (`catalog.capture`). */
export interface CaptureInput {
  /** The upstream call's output name. */
  step: string;
  /** Its capture field (a key of its `captures` map). */
  field: string;
  /** The CaptureKind that field is committed as. */
  kind: string | null;
  /** Where in the input (`source`, `pages[0]`). */
  at: string;
}

/** Each call's output name -> its captures map (capture field -> CaptureKind). */
function callCaptures(spec: ProcedureSpec): Map<string, Record<string, string>> {
  const out = new Map<string, Record<string, string>>();
  spec.steps.forEach((step, index) => {
    if ("call" in step) out.set(stepAlias(step, index), step.captures ?? {});
  });
  return out;
}

/** The Captures a call's input takes: references to another call's capture fields, in authored order. */
export function captureInputs(spec: ProcedureSpec, index: number): CaptureInput[] {
  const step = spec.steps[index];
  if (!step || !("call" in step)) return [];
  const calls = callCaptures(spec);
  const out: CaptureInput[] = [];
  for (const ref of collectRefs(step.input, "")) {
    const captures = calls.get(ref.name);
    const field = ref.field?.split(/[.[]/)[0];
    if (!captures || !field || !(field in captures)) continue;
    if (out.some((c) => c.step === ref.name && c.field === field)) continue;
    out.push({ step: ref.name, field, kind: captures[field] ?? null, at: ref.at });
  }
  return out;
}

/** The read steps a call's input names (`$steps.watched.rows`): a derive's state reads. */
export function stateReads(spec: ProcedureSpec, index: number): { step: string; query: string | null }[] {
  const step = spec.steps[index];
  if (!step) return [];
  const reads = new Map<string, string | null>();
  spec.steps.forEach((s, i) => {
    if ("read" in s) reads.set(stepAlias(s, i), s.query ?? s.claim_type ?? null);
  });
  const out: { step: string; query: string | null }[] = [];
  for (const ref of collectRefs("call" in step ? step.input : null, "")) {
    if (!reads.has(ref.name) || out.some((r) => r.step === ref.name)) continue;
    out.push({ step: ref.name, query: reads.get(ref.name) ?? null });
  }
  return out;
}

/** Whether a call is a derive: it takes a Capture and commits a derived CaptureKind (its slot's purity when grades are unread). */
export function isDerive(spec: ProcedureSpec, index: number, grades?: Grades | null): boolean {
  const step = spec.steps[index];
  if (!step || !("call" in step)) return false;
  if (captureInputs(spec, index).length === 0) return false;
  const kinds = Object.values(step.captures ?? {});
  if (grades && kinds.some((kind) => grades.has(kind))) return kinds.some((kind) => grades.get(kind) === "derived");
  return spec.slots?.[step.slot]?.effect === "pure";
}

/** A step's template stage; null for a kind outside the template (rendered generically). */
export function stageOf(spec: ProcedureSpec, index: number, grades?: Grades | null): Stage | null {
  const step = spec.steps[index];
  if (!step) return null;
  if ("read" in step) return "read";
  if ("call" in step) return isDerive(spec, index, grades) ? "derive" : "fetch";
  if ("extract" in step) return "extract";
  if ("claims" in step) return "claims";
  if ("inbox" in step) return "inbox";
  if ("transform" in step && (step.kind === "filter" || step.kind === "dedupe")) return "filter";
  return null;
}

/** A call's operation: what its Line binds the slot to (`build#operation`), else the slot. */
export interface Operation {
  slot: string;
  /** The operation the Line's binding names (`sbom.components`); null without a Line. */
  name: string | null;
  /** The Provider build the Line binds. */
  build: string | null;
  signature: string | null;
  effect: string | null;
}

export function operationOf(
  spec: ProcedureSpec,
  step: CallStep,
  line?: { bindings?: Record<string, string> | undefined; operations?: Record<string, string> | undefined } | null,
): Operation {
  const slot = spec.slots?.[step.slot];
  return {
    slot: step.slot,
    name: line?.operations?.[step.slot] ?? null,
    build: line?.bindings?.[step.slot] ?? null,
    signature: slot ? `${slot.in.name}@${slot.in.version} → ${slot.out.name}@${slot.out.version}` : null,
    effect: slot?.effect ?? null,
  };
}

// -- list captures (D-R37 a) ---------------------------------------------------

/** A `list<capture<*>>{max_items: N}` field of a slot's out Contract: its name and cap. */
export interface ListField {
  field: string;
  maxItems: number | null;
}

const LIST_CAPTURE = /^list<\s*capture<[^>]*>\s*>(?:\s*\{([^}]*)\})?/;

/** The list-of-Captures fields of a Contract card (a slot's out Contract). */
export function listFields(card: Pick<Schemas["GetContractCard"], "fields"> | null | undefined): ListField[] {
  const out: ListField[] = [];
  for (const field of card?.fields ?? []) {
    const match = LIST_CAPTURE.exec(field.type.trim());
    if (!match) continue;
    const max = /max_items\s*:\s*(\d+)/.exec(match[1] ?? "");
    out.push({ field: field.name, maxItems: max ? Number(max[1]) : null });
  }
  return out;
}

/**
 * One member of a list fetch on a run (the run card's call node: `members`,
 * `members_truncated`, `incomplete_captures`; D-R37 a). `selected` is a member
 * core committed as a Capture; `omitted`, `defaulted` or `refused` is one it
 * did not keep, and makes the list incomplete. `request` is the member's
 * identity (the request digest its coordinate carries).
 */
export interface ListMember {
  field: string;
  index: number;
  capture: string | null;
  request: string | null;
  status: Schemas["GetRunListMember"]["status"];
  reason: string | null;
}

export interface ListOutcome {
  members: ListMember[];
  kept: number;
  dropped: number;
  /** The node served at most its bound of members: more were journaled. */
  truncated: boolean;
  /** The list fields the provider itself said are missing members (its result's `incomplete_captures`). */
  providerIncomplete: string[];
}

type RunNode = Pick<Schemas["GetRunNode"], "members" | "members_truncated" | "incomplete_captures">;

/** A call node's list outcome; null when the node serves no members and no provider word. */
export function listOutcome(node: RunNode | null | undefined): ListOutcome | null {
  if (!node) return null;
  const members: ListMember[] = (node.members ?? []).map((m) => ({
    field: m.field,
    index: m.index,
    capture: m.capture ?? null,
    request: m.request ?? null,
    status: m.status,
    reason: m.reason ?? null,
  }));
  const providerIncomplete = node.incomplete_captures ?? [];
  if (members.length === 0 && providerIncomplete.length === 0) return null;
  const kept = members.filter((m) => m.status === "selected").length;
  return { members, kept, dropped: members.length - kept, truncated: node.members_truncated === true, providerIncomplete };
}

/**
 * What a call's other Captures are to one of them (D-R37 a). A call's
 * `capture_digests` hold every Capture it returned, list members and scalar
 * Capture fields alike, so list membership is claimed only where it is known:
 *
 * - `members`: the call node's served members name this Capture (index known);
 * - `field`: the call has exactly one Capture field and its out Contract types
 *   it a list, so every digest is a member (their pages are not served);
 * - `unclassified`: anything else, the call's other outputs, unlabelled.
 *
 * `fields` is the call's Capture fields and its out Contract's list fields,
 * null when they could not be read. Null when the call returned this Capture
 * alone (or not at all).
 */
export type CallOutputs =
  | { kind: "members"; members: ListMember[] }
  | { kind: "field"; field: string; digests: string[] }
  | { kind: "unclassified"; digests: string[] };

export function callOutputs(
  node: (RunNode & { summary?: Schemas["GetRunNode"]["summary"] }) | null | undefined,
  digest: string,
  fields: { captures: readonly string[]; lists: readonly string[] } | null,
): CallOutputs | null {
  const summary = node?.summary?.kind === "call" ? node.summary : null;
  if (!summary) return null;
  const list = listOutcome(node);
  if (list && list.members.some((m) => m.capture === digest)) return { kind: "members", members: list.members };
  const digests = summary.capture_digests ?? [];
  if (digests.length < 2 || !digests.includes(digest)) return null;
  const only = fields?.captures.length === 1 ? fields.captures[0]! : null;
  if (only && fields!.lists.includes(only)) return { kind: "field", field: only, digests };
  return { kind: "unclassified", digests };
}

// -- what a claims step creates (value-side upsert) -------------------------------

/**
 * The Subject kinds a claims step may create: its Subject's kind when
 * `subject.create: if_absent`, and every value target `{kind, key, create:
 * if_absent}` a ClaimType's value names (the upsert slice; read defensively).
 */
export function createdKinds(step: ProcedureStep): string[] {
  if (!("claims" in step)) return [];
  const out: string[] = [];
  if (step.subject.create === "if_absent") out.push(step.subject.kind);
  for (const claim of step.claims) {
    const target = valueTarget(claim.value);
    if (target?.create && !out.includes(target.kind)) out.push(target.kind);
  }
  return out;
}

/** A ClaimType value that names a Subject: `{kind, key, create?}` (a fixed Subject, or one keyed from the record). */
export function valueTarget(value: unknown): { kind: string; key: Record<string, unknown>; create: boolean } | null {
  const v = record(value);
  if (!v || templateRef(v) || typeof v.kind !== "string" || !record(v.key)) return null;
  return { kind: v.kind, key: record(v.key)!, create: v.create === "if_absent" };
}

// -- a derived CaptureKind's producers ---------------------------------------------

/** One derive that commits a CaptureKind: its Procedure and step, the operation each Line binds, the kinds it reads. */
export interface KindProducer {
  procedure: string;
  step: string;
  slot: string;
  signature: string | null;
  /** Per Line running the Procedure: the operation its binding names (null: unbound or not served). */
  lines: { line: string; operation: string | null; build: string | null }[];
  /** The CaptureKinds of the Captures it takes. */
  derivesFrom: string[];
}

/** Every derive, over every Procedure, that commits `kind`. */
export function kindProducers(
  kind: string,
  specs: ReadonlyMap<string, ProcedureSpec>,
  lines: readonly { line: string; procedure: string; bindings?: Record<string, string> | undefined; operations?: Record<string, string> | undefined }[],
  grades?: Grades | null,
): KindProducer[] {
  const out: KindProducer[] = [];
  for (const [procedure, spec] of specs) {
    spec.steps.forEach((step, index) => {
      if (!("call" in step) || !Object.values(step.captures ?? {}).includes(kind) || !isDerive(spec, index, grades)) return;
      const running = lines.filter((l) => l.procedure === procedure).sort((a, b) => (a.line < b.line ? -1 : 1));
      out.push({
        procedure,
        step: stepAlias(step, index),
        slot: step.slot,
        signature: operationOf(spec, step).signature,
        lines: running.map((l) => ({ line: l.line, operation: l.operations?.[step.slot] ?? null, build: l.bindings?.[step.slot] ?? null })),
        derivesFrom: [...new Set(captureInputs(spec, index).flatMap((c) => (c.kind ? [c.kind] : [])))].sort(),
      });
    });
  }
  return out.sort((a, b) => (a.procedure < b.procedure ? -1 : a.procedure > b.procedure ? 1 : a.step < b.step ? -1 : 1));
}
