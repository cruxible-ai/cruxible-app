// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import type { Schemas } from "../api/schemas.ts";
import { stepAlias, templateRef, type ProcedureSpec } from "./definitions.ts";
import { lastSegment, shortName, type Part } from "./step-words.ts";

/**
 * A Line's Mandate as a table, one row per ClaimType in its scope: what it
 * settles without review (new, changed values), what it does when a Subject
 * leaves a complete source (retires, records absent), and the bases it
 * accepts; plus which Subjects and under which condition Query. Labels only;
 * the concepts are explained by the page's ⓘ.
 */

export type MandateCard = Schemas["GetMandateCard"];
type Change = "create" | "revise" | "retire";

/** What the Line's Procedure says about a Mandate's `expected` Subjects: the Query its claims step expects (else writes within). */
export interface MandateContext {
  expectedQuery: string | null;
}

export function mandateContext(spec: ProcedureSpec | null | undefined): MandateContext {
  const queryOf = (value: unknown) => {
    const ref = templateRef(value);
    if (ref?.$ref !== "step" || !ref.step) return null;
    const read = spec!.steps.find((s, i) => stepAlias(s, i) === ref.step);
    return read && "read" in read && read.query ? read.query : null;
  };
  for (const step of spec?.steps ?? []) {
    if (!("claims" in step)) continue;
    const query = queryOf(step.expect) ?? queryOf(step.subject.within);
    if (query) return { expectedQuery: query };
  }
  return { expectedQuery: null };
}

export interface MandateRow {
  claimType: string;
  /** The changes it settles from a source (`new, changed`), or `review`. */
  settles: string;
  /** When a Subject leaves a complete source: `retires`, `records absent`, or `—`. */
  onRemoval: string;
  basis: string[];
}

export interface MandateTable {
  rows: MandateRow[];
  /** Which Subjects: the expected Query, or Subject refs; null for any. */
  subjects: Part[] | null;
  /** The condition Query and what happens otherwise. */
  condition: Part[] | null;
  /** Kinds it may create Subjects of. */
  creates: Part[];
}

const BASIS_ORDER = ["extracted", "measured", "derived", "absence"] as const;

const SETTLE_WORD: Record<Change, string> = { create: "new", revise: "changed", retire: "retired" };

export function mandateTable(card: MandateCard, ctx: MandateContext): MandateTable {
  const rows = (card.scope ?? [])
    .map((s): MandateRow => {
      const sourced = (["create", "revise", "retire"] as Change[]).filter((c) => s.changes[c]?.basis.some((b) => b !== "absence"));
      const value = [s.value?.from ? `from ${s.value.from.join("|")}` : null, s.value?.to ? `to ${s.value.to.join("|")}` : null].filter(Boolean).join(" ");
      const removal = [
        s.changes.retire?.basis.includes("absence") ? "retires" : null,
        s.changes.create?.basis.includes("absence") || s.changes.revise?.basis.includes("absence") ? "records absent" : null,
      ].filter((x): x is string => x !== null);
      const used = new Set((["create", "revise", "retire"] as Change[]).flatMap((c) => s.changes[c]?.basis ?? []));
      const basis = BASIS_ORDER.filter((b) => used.has(b));
      return {
        claimType: s.claim_type.replace(/^ClaimType:/, ""),
        settles: sourced.length ? `${sourced.map((c) => SETTLE_WORD[c]).join(", ")}${value ? ` (${value})` : ""}` : "review",
        onRemoval: removal.join(", ") || "—",
        basis,
      };
    })
    .sort((a, b) => (a.claimType < b.claimType ? -1 : 1));
  const subjects: Part[] | null =
    card.subjects === "expected"
      ? ctx.expectedQuery
        ? [{ text: shortName(ctx.expectedQuery), ref: `QueryDefinition:${ctx.expectedQuery}`, title: "The run's expected Subjects" }]
        : [{ text: "expected", title: "The run's expected Subjects" }]
      : card.subject_scope?.length
        ? card.subject_scope.flatMap((ref, i): Part[] => [...(i ? [{ text: ", " }] : []), { text: ref, ref }])
        : null;
  const query = card.condition?.query.replace(/^(QueryDefinition|query):/, "");
  const condition: Part[] | null =
    card.condition && query
      ? [
          { text: shortName(query), ref: `QueryDefinition:${query}`, title: `Binds ${card.condition.binding_parameter}; requires ${card.condition.required_fields.join(", ")}` },
          { text: ` · else ${card.condition.fallback === "propose" ? "review" : "refused"}` },
        ]
      : null;
  const creates = (card.subject_creation ?? []).flatMap((k, i): Part[] => [...(i ? [{ text: ", " }] : []), { text: lastSegment(k), ref: `SubjectKind:${k}`, title: k }]);
  return { rows, subjects, condition, creates };
}
