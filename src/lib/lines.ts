import type { NextItem, Schemas } from "../api/schemas.ts";

/**
 * Line-screen helpers: the per-Line run history seam (design gap G4), the
 * typed reader for a Mandate's proof envelope, and grouping `next` rows by
 * the Line they are about.
 */

type RunRow = Schemas["RunRow"];

/** One page of a Line's runs, newest first. */
export interface LineRunPage {
  runs: RunRow[];
  nextCursor: string | null;
}

/**
 * Core is building a paged per-Line run history over the journal's Line
 * partition (claude/app-read-gaps). Until the pinned contract serves it, a
 * Line shows the five recent runs its card carries and the total; implement
 * this over the new route and the Line page pages through every run.
 */
export type LineRunHistoryReader = (line: string, cursor: string | null) => Promise<LineRunPage>;

/** No per-Line run history is served at the pinned contract. */
export const lineRunHistoryReader: LineRunHistoryReader | null = null;

/** The bare run id a RunRow or ref carries (`ProcedureRun:` stripped). */
export function runId(run: string): string {
  return run.replace(/^ProcedureRun:/, "");
}

/** The bare Line name (`Line:` stripped). */
export function lineName(line: string): string {
  return line.replace(/^Line:/, "");
}

/** `next` rows about each Line, keyed by bare Line name. */
export function nextRowsByLine(items: readonly NextItem[]): Map<string, NextItem[]> {
  const out = new Map<string, NextItem[]>();
  for (const item of items) {
    if (!item.subject_identity.startsWith("Line:")) continue;
    const name = lineName(item.subject_identity);
    out.set(name, [...(out.get(name) ?? []), item]);
  }
  return out;
}

/** Unread inbox count a Line's `line_inbox_unread` row reports, if any. */
export function unreadOf(rows: readonly NextItem[] | undefined): number | null {
  const row = rows?.find((item) => item.reason === "line_inbox_unread");
  const detail = row?.detail as { unread?: unknown } | undefined;
  return typeof detail?.unread === "number" ? detail.unread : null;
}

// -- Mandate proof -------------------------------------------------------------

export interface MandateScope {
  claimType: string;
  changeKinds: string[];
  bindingSubjectRole: string;
}

export interface MandateCondition {
  query: string;
  bindingParameter: string;
  fixedParameters: Record<string, unknown>;
  requiredFields: string[];
  fallback: string;
}

export interface MandateProof {
  namespace: string[];
  scope: MandateScope[];
  subjectScope: string[] | null;
  condition: MandateCondition | null;
  subjectCreation: string[];
  suspended: boolean;
}

const str = (v: unknown): string | null => (typeof v === "string" ? v : null);
const strs = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const rec = (v: unknown): Record<string, unknown> | null =>
  typeof v === "object" && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : null;

/** A pin's target as `Kind:name`. */
function pinTarget(pin: unknown): string | null {
  const target = rec(rec(pin)?.target);
  const kind = str(target?.kind);
  const name = str(target?.name);
  return kind && name ? `${kind}:${name}` : null;
}

/**
 * The ProcedureMandate artifact inside `get Mandate:<m> detail=proof`
 * (`proof.envelope`, an untyped object in the contract), read with checks.
 * Field names follow cruxible_client contracts/procedure_mandates.py.
 */
export function readMandateProof(proof: Record<string, unknown> | null | undefined): MandateProof | null {
  const envelope = rec(proof?.envelope);
  if (!envelope) return null;
  const scope = (Array.isArray(envelope.scope) ? envelope.scope : []).flatMap((item) => {
    const row = rec(item);
    const claimType = pinTarget(row?.claim_type);
    return row && claimType
      ? [{ claimType, changeKinds: strs(row.change_kinds), bindingSubjectRole: str(row.binding_subject_role) ?? "subject" }]
      : [];
  });
  const subjectScope = Array.isArray(envelope.subject_scope)
    ? envelope.subject_scope.flatMap((item) => {
        const path = str(rec(item)?.artifact_path);
        return path ? [path] : [];
      })
    : null;
  const conditionRecord = rec(envelope.condition);
  const conditionQuery = pinTarget(conditionRecord?.query);
  return {
    namespace: strs(envelope.namespace),
    scope,
    subjectScope,
    condition:
      conditionRecord && conditionQuery
        ? {
            query: conditionQuery,
            bindingParameter: str(conditionRecord.binding_parameter) ?? "",
            fixedParameters: rec(conditionRecord.fixed_parameters) ?? {},
            requiredFields: strs(conditionRecord.required_fields),
            fallback: str(conditionRecord.fallback) ?? "refuse",
          }
        : null,
    subjectCreation: strs(envelope.subject_creation),
    suspended: envelope.suspended === true,
  };
}
