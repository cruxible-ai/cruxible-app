// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import type { Schemas } from "../api/schemas.ts";
import { stepAlias, templateRef, type ProcedureSpec } from "./definitions.ts";
import { claimTypeShort, nameWords, type Part, type Phrase } from "./step-words.ts";

/**
 * What a Line's Mandates let it do, in plain words: what it may settle
 * without review (each ClaimType by change kind and basis: extracted,
 * measured, derived, or a Subject's absence from a complete source), under
 * which value conditions and for which Subjects, and that the rest goes to
 * review when a propose Mandate covers it. Raw names (the ClaimType ref, the
 * namespace, what a scope binds) are on hover only.
 */

export type MandateCard = Schemas["GetMandateCard"];
type Basis = "extracted" | "measured" | "derived" | "absence";
type Change = "create" | "revise" | "retire";

/** What the Line's Procedure says about the things a Mandate names. */
export interface MandateContext {
  /** The source its values are extracted from, linked ("the kev catalog"); null when it reads several or none. */
  source: Part | null;
  /** A ClaimType's Subject kind, from the Procedure's claims steps. */
  subjectOf: (predicate: string) => string | null;
  /** What a claims step expects, in words ("the watched vulnerabilities"), for an `expected` Subjects rule. */
  expected: string | null;
}

/** The context from a Line's Procedure: its captured source, the kind each ClaimType is written on, what it expects. */
export function mandateContext(spec: ProcedureSpec | null | undefined): MandateContext {
  const contracts = new Set<string>();
  const kinds = new Map<string, string>();
  let expected: string | null = null;
  for (const step of spec?.steps ?? []) {
    if ("call" in step) for (const c of Object.values(step.captures ?? {})) contracts.add(c);
    if ("claims" in step) {
      for (const claim of step.claims) kinds.set(claim.type, step.subject.kind);
      const ref = templateRef(step.expect);
      if (ref?.$ref === "step" && ref.step) {
        const index = spec!.steps.findIndex((s, i) => stepAlias(s, i) === ref.step);
        const read = spec!.steps[index];
        if (read && "read" in read && read.query) expected = `the ${nameWords(read.query)}`;
      }
    }
  }
  const [only] = contracts;
  return {
    source: contracts.size === 1 && only ? { text: `the ${nameWords(only)}`, ref: `CaptureContract:${only}`, title: `CaptureKind ${only}` } : null,
    subjectOf: (predicate) => kinds.get(predicate.replace(/^ClaimType:/, "")) ?? null,
    expected,
  };
}

const CHANGE_WORD: Record<Change, string> = { create: "new", revise: "changed", retire: "retired" };

/** ["create", "revise"] -> "new and changed values". */
function changeWords(changes: Change[]): string {
  const words = changes.map((c) => CHANGE_WORD[c]);
  const list = words.length <= 1 ? words.join("") : `${words.slice(0, -1).join(", ")} and ${words.at(-1)}`;
  return `${list} values`;
}

const joinParts = (items: Part[]): Part[] =>
  items.flatMap((item, i) => (i === 0 ? [item] : [{ text: i === items.length - 1 ? (items.length > 2 ? ", and " : " and ") : ", " }, item]));

const typePart = (predicate: string): Part => ({ text: claimTypeShort(predicate), ref: predicate.startsWith("ClaimType:") ? predicate : `ClaimType:${predicate}`, title: predicate.replace(/^ClaimType:/, "ClaimType ") });

const text = (parts: Part[]) => parts.map((p) => p.text).join("");

export interface MandateWords {
  /** What it grants, as a heading ("May settle without review"). */
  heading: string;
  /** One sentence each: what it covers, when a Subject leaves the source, which Subjects, under which condition. */
  sentences: Phrase[];
}

/**
 * One Mandate in words. `restToReview` (a propose Mandate covers everything
 * else) closes a settle Mandate with "Everything else goes to review."
 */
export function mandateWords(card: MandateCard, ctx: MandateContext, restToReview = false): MandateWords {
  const scope = card.scope ?? [];
  const settle = card.grants === "settle";
  if (scope.length === 0) {
    return {
      heading: settle ? "May settle anything this Line writes without review" : "Anything this Line writes may be proposed for review",
      sentences: [],
    };
  }
  const sentences: Phrase[] = [];
  const raw = (predicate: string) => {
    const s = scope.find((x) => x.claim_type === predicate);
    return s ? `${s.claim_type} (binds ${s.binds})` : predicate;
  };

  // Values from a source, by basis: the change kinds each ClaimType has under that basis, grouped.
  const sourced: Part[][] = [];
  for (const basis of ["extracted", "measured", "derived"] as Basis[]) {
    const groups = new Map<string, string[]>();
    for (const s of scope) {
      const changes = (["create", "revise", "retire"] as Change[]).filter((c) => s.changes[c]?.basis.includes(basis));
      if (changes.length) groups.set(changes.join(","), [...(groups.get(changes.join(",")) ?? []), s.claim_type]);
    }
    for (const [key, types] of groups) {
      const how: Part[] =
        basis === "extracted"
          ? [{ text: "extracted from " }, ctx.source ?? { text: "its source" }]
          : [{ text: basis === "measured" ? "measured" : "derived from other Claims" }];
      sourced.push([{ text: `${changeWords(key.split(",") as Change[])} ` }, ...how, { text: " for " }, ...joinParts(types.sort().map(typePart))]);
    }
  }
  if (sourced.length) {
    const parts = sourced.flatMap((p, i) => (i === 0 ? p : [{ text: "; " }, ...p]));
    parts[0] = { ...parts[0]!, text: parts[0]!.text.replace(/^./, (c) => c.toUpperCase()) };
    parts.push({ text: "." });
    sentences.push({ parts, title: `${text(parts)}\nNamespace ${(card.namespace ?? []).join(", ")}\n${scope.map((s) => raw(s.claim_type)).join("\n")}` });
  }

  // A Subject that leaves a complete source.
  const retire = scope.filter((s) => s.changes.retire?.basis.includes("absence")).map((s) => s.claim_type).sort();
  const record = scope.filter((s) => s.changes.create?.basis.includes("absence") || s.changes.revise?.basis.includes("absence")).map((s) => s.claim_type).sort();
  if (retire.length || record.length) {
    const kinds = [...new Set([...retire, ...record].map((t) => ctx.subjectOf(t)).filter((k): k is string => k !== null))];
    const subject = kinds.length === 1 ? nameWords(kinds[0]!) : "Subject";
    const parts: Part[] = [{ text: `When ${/^[aeiou]/i.test(subject) ? "an" : "a"} ${subject} leaves ` }, ctx.source ?? { text: "its source" }, { text: ": " }];
    if (retire.length) parts.push({ text: "retire its " }, ...joinParts(retire.map(typePart)));
    if (retire.length && record.length) parts.push({ text: "; " });
    if (record.length) parts.push({ text: "record the absence in " }, ...joinParts(record.map(typePart)));
    parts.push({ text: "." });
    sentences.push({ parts, title: `${text(parts)}\nOnly on a complete read of the source (basis: absence).` });
  }

  // Value conditions.
  for (const s of scope) {
    const from = s.value?.from ?? null;
    const to = s.value?.to ?? null;
    if (!from && !to) continue;
    const parts: Part[] = [{ text: "Only when " }, typePart(s.claim_type), { text: " changes" }];
    if (from) parts.push({ text: ` from ${from.map(String).join(" or ")}` });
    if (to) parts.push({ text: ` to ${to.map(String).join(" or ")}` });
    parts.push({ text: "." });
    sentences.push({ parts, title: text(parts) });
  }

  // Which Subjects, and under which condition.
  if (card.subjects === "expected") {
    const parts: Part[] = [{ text: `Only for ${ctx.expected ?? "the Subjects the run expects"}.` }];
    sentences.push({ parts, title: `${text(parts)}\nSubjects: the run's expected Subjects` });
  } else if (card.subject_scope && card.subject_scope.length > 0) {
    const parts: Part[] = [{ text: "Only for " }, ...joinParts(card.subject_scope.map((ref) => ({ text: ref, ref }))), { text: "." }];
    sentences.push({ parts, title: text(parts) });
  }
  if (card.condition) {
    const query = card.condition.query.replace(/^(QueryDefinition|query):/, "");
    const parts: Part[] = [
      { text: "Only while " },
      { text: `the ${nameWords(query)}`, ref: `QueryDefinition:${query}`, title: `Query ${query}` },
      { text: ` allow it; otherwise it ${card.condition.fallback === "propose" ? "goes to review" : "is refused"}.` },
    ];
    sentences.push({
      parts,
      title: `${text(parts)}\nBinds ${card.condition.binding_parameter}; requires ${card.condition.required_fields.join(", ")}`,
    });
  }
  if ((card.subject_creation ?? []).length > 0) {
    const parts: Part[] = [{ text: "May create new " }, ...joinParts(card.subject_creation!.map((k) => ({ text: nameWords(k), ref: `SubjectKind:${k}`, title: `Subject kind ${k}` }))), { text: "." }];
    sentences.push({ parts, title: text(parts) });
  }
  if (settle && restToReview) sentences.push({ parts: [{ text: "Everything else goes to review." }], title: "A propose Mandate covers everything this Line writes." });
  return { heading: settle ? "May settle without review" : "May propose for review", sentences };
}
