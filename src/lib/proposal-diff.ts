import type { Schemas } from "@/api/schemas";
import { claimValueText, noneOf } from "./claim-value";
import { formatRef, parseRef } from "./cruxible-ref";

/**
 * A proposal's review read as a belief diff: one row per Subject, one column
 * per ClaimType the proposal touches, each cell the change to what is
 * believed there (new, old -> new, retired). Definitions (Contracts,
 * Procedures, Lines, ClaimTypes, …) read as their own rows. Pure reads of the
 * review payload, the run card (why the proposal is in review) and nothing
 * else: no request per Claim.
 */

type Member = Schemas["ReviewedMember"];
type Egress = Schemas["ProcedureTerminalEgress"];
type ScopeGap = Schemas["SettleScopeGap"];

export type ChangeKind = "new" | "revised" | "retired";
export const CHANGE_KINDS: readonly ChangeKind[] = ["new", "revised", "retired"];

const rec = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const str = (value: unknown): string | null => (typeof value === "string" ? value : null);

/** Core spells dispositions as verbs (create, replace, retire, delete); fixtures as past tense. */
export function changeKindOf(disposition: string): ChangeKind {
  if (/^(create|created|stated)$/.test(disposition)) return "new";
  if (/^(retire|retired|delete|deleted)$/.test(disposition)) return "retired";
  return "revised";
}

/** "subjects/security.vulnerability/cve-1.json" -> "security.vulnerability/cve-1" (null for any other path). */
export function subjectOfPath(path: string | null | undefined): string | null {
  if (!path) return null;
  const ref = parseRef(path);
  if (ref?.kind === "subject") return formatRef(ref);
  return /^subjects\/(.+)\.json$/.exec(path)?.[1] ?? null;
}

/** "claims/06/CLM-….json" -> "CLM-…". */
export function claimIdOfPath(path: string): string | null {
  return /(CLM-[0-9a-f]+)\.json$/.exec(path)?.[1] ?? null;
}

/** One change to what is believed in a cell. `before`/`after` are typed Claim objects (ShownValue reads them). */
export interface BeliefChange {
  kind: ChangeKind;
  before: unknown;
  after: unknown;
  /** The member carrying the new value (the retired one for a retirement). */
  member: Member;
  /** A retired Claim this change replaces (a one-valued slot's retire + create). */
  replaced: Member | null;
}

export interface BeliefCell {
  subject: string;
  claimType: string;
  changes: BeliefChange[];
}

export interface SubjectRow {
  subject: string;
  /** The Subject's own change in this proposal (created, retired), when it has one. */
  subjectMember: Member | null;
  cells: Record<string, BeliefCell>;
}

export interface DefinitionChange {
  member: Member;
  kind: ChangeKind;
  /** identity.kind ("CaptureContract", "Procedure", …), else the artifact kind. */
  type: string;
  name: string | null;
  /** `<Kind>:<name>` when the console can link it. */
  ref: string | null;
}

export interface BeliefDiff {
  rows: SubjectRow[];
  /** Every ClaimType a cell holds, in column order. */
  claimTypes: string[];
  definitions: DefinitionChange[];
  /** Members this read cannot place (artifacts withheld or not served): listed by path. */
  unreadable: Member[];
  counts: Record<ChangeKind, number>;
  subjectCounts: Record<ChangeKind, number>;
}

export interface ClaimRead {
  subject: string;
  claimType: string;
  object: unknown;
  baseObject: unknown;
}

/**
 * A definition member (anything not a Subject or Claim) by its artifact's
 * typed identity: kind (`identity.kind`, else the artifact kind) and name,
 * linked when the ref grammar knows the kind. `name` is null when neither
 * side's artifact is served.
 */
export function readDefinition(member: Member): DefinitionChange {
  const artifact = rec(member.candidate_semantic_artifact) ?? rec(member.base_semantic_artifact);
  const identity = rec(artifact?.identity);
  const type = str(identity?.kind) ?? member.artifact_kind;
  const name = str(identity?.name);
  const ref = name && parseRef(`${type}:${name}`) ? `${type}:${name}` : null;
  return { member, kind: changeKindOf(member.disposition), type, name, ref };
}

/** A Claim member's Subject, ClaimType and value (new, and before), from its stored artifacts; null for anything else. */
export function memberClaim(member: Member): ClaimRead | null {
  return readClaim(member);
}

function readClaim(member: Member): ClaimRead | null {
  const after = rec(member.candidate_semantic_artifact);
  const before = rec(member.base_semantic_artifact);
  const statement = rec((after ?? before)?.statement);
  if (!statement) return null;
  const subject = subjectOfPath(str(rec(statement.subject)?.artifact_path));
  const claimType = str(statement.predicate) ?? str(rec(statement.claim_type)?.name);
  if (!subject || !claimType) return null;
  return {
    subject,
    claimType,
    object: rec(rec(after?.statement)?.object) ?? rec(statement.object),
    baseObject: before ? rec(rec(before.statement)?.object) : undefined,
  };
}

function claimChange(member: Member, read: ClaimRead): BeliefChange {
  const kind = changeKindOf(member.disposition);
  if (kind === "new") return { kind, before: undefined, after: read.object, member, replaced: null };
  if (kind === "retired") return { kind, before: read.baseObject ?? read.object, after: undefined, member, replaced: null };
  return { kind, before: read.baseObject, after: read.object, member, replaced: null };
}

/**
 * In a one-valued slot, a retired Claim beside a new one is a revision: old
 * -> new, in that order. Many-valued slots (or an unknown cardinality with
 * more than one of either) keep their values apart.
 */
function pairRevisions(changes: BeliefChange[], many: boolean | undefined): BeliefChange[] {
  const created = changes.filter((c) => c.kind === "new");
  const retired = changes.filter((c) => c.kind === "retired");
  if (many === true || created.length === 0 || retired.length === 0) return changes;
  if (many === undefined && (created.length > 1 || retired.length > 1)) return changes;
  const pairs = Math.min(created.length, retired.length);
  const out: BeliefChange[] = changes.filter((c) => c.kind === "revised");
  for (let i = 0; i < pairs; i += 1) {
    out.push({ kind: "revised", before: retired[i]!.before, after: created[i]!.after, member: created[i]!.member, replaced: retired[i]!.member });
  }
  out.push(...created.slice(pairs), ...retired.slice(pairs));
  return out;
}

const ORDER: Record<ChangeKind, number> = { revised: 0, new: 1, retired: 2 };
/** Inverses ("none of X") read after a cell's values. */
const isNone = (object: unknown) => noneOf(object) !== null;

/**
 * The review's members as a belief diff. `cardinality` (ClaimType -> "one" |
 * "many", from the ClaimTypes section) decides whether a retire beside a
 * create in one cell is a revision; without it, only one of each pairs.
 */
export function beliefDiff(members: readonly Member[], cardinality?: ReadonlyMap<string, string>): BeliefDiff {
  const rows = new Map<string, SubjectRow>();
  const row = (subject: string) => {
    let r = rows.get(subject);
    if (!r) {
      r = { subject, subjectMember: null, cells: {} };
      rows.set(subject, r);
    }
    return r;
  };
  const definitions: DefinitionChange[] = [];
  const unreadable: Member[] = [];
  const subjectCounts: Record<ChangeKind, number> = { new: 0, revised: 0, retired: 0 };
  for (const member of members) {
    const artifact = rec(member.candidate_semantic_artifact) ?? rec(member.base_semantic_artifact);
    if (member.artifact_kind === "claim") {
      const read = readClaim(member);
      if (!read) {
        unreadable.push(member);
        continue;
      }
      const r = row(read.subject);
      const cell = (r.cells[read.claimType] ??= { subject: read.subject, claimType: read.claimType, changes: [] });
      cell.changes.push(claimChange(member, read));
      continue;
    }
    if (member.artifact_kind === "subject") {
      const name = str(rec(artifact?.identity)?.name) ?? subjectOfPath(member.path);
      if (!name) {
        unreadable.push(member);
        continue;
      }
      row(name).subjectMember = member;
      subjectCounts[changeKindOf(member.disposition)] += 1;
      continue;
    }
    if (!artifact && member.semantic_delta.length === 0) {
      unreadable.push(member);
      continue;
    }
    definitions.push(readDefinition(member));
  }
  const counts: Record<ChangeKind, number> = { new: 0, revised: 0, retired: 0 };
  const claimTypes = new Set<string>();
  for (const r of rows.values()) {
    for (const cell of Object.values(r.cells)) {
      const c = cardinality?.get(cell.claimType);
      cell.changes = pairRevisions(cell.changes, c === undefined ? undefined : c === "many").sort(
        (a, b) =>
          ORDER[a.kind] - ORDER[b.kind] ||
          Number(isNone(a.after ?? a.before)) - Number(isNone(b.after ?? b.before)) ||
          valueText(a.after ?? a.before).localeCompare(valueText(b.after ?? b.before), undefined, { numeric: true }),
      );
      for (const change of cell.changes) counts[change.kind] += 1;
      claimTypes.add(cell.claimType);
    }
  }
  return {
    rows: [...rows.values()].sort((a, b) => a.subject.localeCompare(b.subject, undefined, { numeric: true })),
    claimTypes: [...claimTypes].sort(),
    definitions: definitions.sort((a, b) => a.type.localeCompare(b.type) || (a.name ?? "").localeCompare(b.name ?? "")),
    unreadable,
    counts,
    subjectCounts,
  };
}

/** A typed Claim object as plain text (sort keys, titles). */
export function valueText(object: unknown): string {
  return object === undefined ? "" : claimValueText(object);
}

/**
 * Column headers: each ClaimType without its Subject kind's prefix
 * (`security.vulnerability.epss_score` -> `epss_score`), unless two columns
 * would then read the same.
 */
export function columnLabels(claimTypes: readonly string[], rows: readonly SubjectRow[]): Map<string, string> {
  const kindOf = new Map<string, string>();
  for (const r of rows) for (const ct of Object.keys(r.cells)) if (!kindOf.has(ct)) kindOf.set(ct, r.subject.split("/")[0] ?? "");
  const short = (ct: string) => {
    const kind = kindOf.get(ct) ?? "";
    return kind && ct.startsWith(`${kind}.`) ? ct.slice(kind.length + 1) : ct;
  };
  const seen = new Map<string, number>();
  for (const ct of claimTypes) seen.set(short(ct), (seen.get(short(ct)) ?? 0) + 1);
  return new Map(claimTypes.map((ct) => [ct, (seen.get(short(ct)) ?? 0) > 1 ? ct : short(ct)]));
}

// -- evidence -------------------------------------------------------------------

export interface ClaimEvidence {
  /** Cited Captures, in citation order (digest, role, origin). */
  citations: { digest: string; role: string | null; origin: string | null }[];
  basis: string | null;
  /** The Capture the value was read from (procedure evidence), else the first citation's. */
  capture: string | null;
  /** The extract field read (a JSON pointer, `/data/0/percentile`). */
  fieldPath: string | null;
  /** The record key's values (`CVE-2014-0160`), its fields and locator on hover. */
  recordKey: Record<string, unknown> | null;
  recordLocator: string | null;
  /** When the referent was observed (the Claim's own context; the Capture's observed time is preferred). */
  observedAt: string | null;
  /** An absence's witness: the enumeration's Capture and, over a list of Captures, every member in order (D-R37 a6). */
  absence: { capture: string; members: string[] } | null;
}

export function claimEvidence(member: Member): ClaimEvidence {
  return artifactEvidence(rec(member.candidate_semantic_artifact) ?? rec(member.base_semantic_artifact));
}

/** The evidence a stored Claim artifact records (its backing): citations, the value's Capture, record, field, absence witness. */
export function artifactEvidence(artifact: Record<string, unknown> | null): ClaimEvidence {
  const backing = rec(artifact?.backing);
  const citations = (Array.isArray(backing?.citations) ? backing.citations : [])
    .map(rec)
    .flatMap((c) => (c && str(c.capture_digest) ? [{ digest: str(c.capture_digest)!, role: str(c.role), origin: str(c.origin) }] : []));
  // Older Claims cite by digest alone.
  if (citations.length === 0 && Array.isArray(backing?.capture_digests)) {
    for (const d of backing.capture_digests) if (typeof d === "string") citations.push({ digest: d, role: null, origin: null });
  }
  const receipt = rec(backing?.procedure_evidence);
  const value = rec(receipt?.value);
  const witness = rec(receipt?.absence);
  const witnessCapture = str(witness?.capture);
  const members = Array.isArray(witness?.members) ? witness.members.filter((m): m is string => typeof m === "string") : [];
  return {
    citations,
    basis: str(value?.basis),
    capture: str(value?.capture_digest) ?? citations[0]?.digest ?? null,
    fieldPath: str(value?.field_path),
    recordKey: rec(value?.record_key),
    recordLocator: str(value?.record_locator),
    observedAt: str(rec(backing?.referent_context)?.observed_at),
    absence: witnessCapture ? { capture: witnessCapture, members: members.length ? members : [witnessCapture] } : null,
  };
}

/** Distinct Capture digests every Claim member cites (one Capture read each, never one per Claim). */
export function citedCaptures(members: readonly Member[]): string[] {
  const out = new Set<string>();
  for (const m of members) if (m.artifact_kind === "claim") for (const c of claimEvidence(m).citations) out.add(c.digest);
  return [...out].sort();
}

/** `/data/0/percentile` -> `percentile`. */
export function fieldName(pointer: string): string {
  const parts = pointer.split("/").filter((p) => p !== "" && !/^\d+$/.test(p));
  return parts[parts.length - 1] ?? pointer;
}

/** A record key's values, `CVE-2014-0160` (several joined by ` · `). */
export function recordKeyText(key: Record<string, unknown>): string {
  return Object.values(key)
    .map((v) => (typeof v === "string" ? v : JSON.stringify(v)))
    .join(" · ");
}

// -- grouping -------------------------------------------------------------------

export type GroupBy = "subject" | "capture" | "claim-type" | "change";
export const GROUP_BY: readonly GroupBy[] = ["subject", "capture", "claim-type", "change"];

export interface DiffSection {
  /** "" for the one ungrouped section. */
  key: string;
  by: GroupBy;
  rows: SubjectRow[];
  claimTypes: string[];
  /** Belief changes in the section. */
  count: number;
}

function narrow(rows: readonly SubjectRow[], keep: (cell: BeliefCell, change: BeliefChange) => boolean, keepSubject: (r: SubjectRow) => boolean): SubjectRow[] {
  const out: SubjectRow[] = [];
  for (const r of rows) {
    const cells: Record<string, BeliefCell> = {};
    for (const [ct, cell] of Object.entries(r.cells)) {
      const changes = cell.changes.filter((change) => keep(cell, change));
      if (changes.length > 0) cells[ct] = { ...cell, changes };
    }
    if (Object.keys(cells).length > 0 || keepSubject(r)) out.push({ ...r, cells });
  }
  return out;
}

function section(key: string, by: GroupBy, rows: SubjectRow[]): DiffSection {
  const claimTypes = new Set<string>();
  let count = 0;
  for (const r of rows) {
    for (const cell of Object.values(r.cells)) {
      claimTypes.add(cell.claimType);
      count += cell.changes.length;
    }
  }
  return { key, by, rows, claimTypes: [...claimTypes].sort(), count };
}

const changeCaptures = (change: BeliefChange) => claimEvidence(change.member).citations.map((c) => c.digest);

/**
 * The diff in sections: one (the whole grid) by Subject; one per cited
 * Capture (a change citing two sits in both; changes citing none last, key
 * ""); one per ClaimType; one per change kind (new, revised, retired).
 */
export function groupDiff(diff: BeliefDiff, by: GroupBy): DiffSection[] {
  if (by === "subject") return [section("", by, diff.rows)];
  if (by === "claim-type") {
    return diff.claimTypes.map((ct) => section(ct, by, narrow(diff.rows, (cell) => cell.claimType === ct, () => false)));
  }
  if (by === "change") {
    return CHANGE_KINDS.map((kind) =>
      section(kind, by, narrow(diff.rows, (_, change) => change.kind === kind, (r) => r.subjectMember !== null && changeKindOf(r.subjectMember.disposition) === kind)),
    ).filter((s) => s.rows.length > 0);
  }
  const digests = new Set<string>();
  for (const r of diff.rows) for (const cell of Object.values(r.cells)) for (const change of cell.changes) for (const d of changeCaptures(change)) digests.add(d);
  const out = [...digests].sort().map((digest) => section(digest, by, narrow(diff.rows, (_, change) => changeCaptures(change).includes(digest), () => false)));
  const uncited = narrow(diff.rows, (_, change) => changeCaptures(change).length === 0, () => false);
  if (uncited.length > 0) out.push(section("", by, uncited));
  return out;
}

// -- why in review --------------------------------------------------------------

export interface ReviewReason {
  gaps: ScopeGap[];
  /** The term that limited the terminal's authority, when it did (effective below required). */
  limitingTerm: string | null;
  cappedBy: string | null;
  fallbackReason: string | null;
  /** The terminal only proposes (its required authority is propose). */
  proposesOnly: boolean;
  /** The egress settled the change itself: it was never in review. */
  settled: boolean;
}

const bare = (id: string) => id.replace(/^(Proposal:)?(sha256:)?/, "");

/** The run's claims egress that produced this proposal. */
export function proposalEgress(egress: readonly Egress[] | undefined, proposalId: string): Egress | null {
  return (egress ?? []).find((e) => e.kind === "claims" && e.proposal_id != null && bare(e.proposal_id) === bare(proposalId)) ?? null;
}

const RANK: Record<string, number> = { none: 0, observe: 1, propose: 2, settle: 3 };

/** Why a run's change set is in review, from the terminal egress that produced it. */
export function reviewReason(egress: Egress | null): ReviewReason | null {
  if (!egress) return null;
  const limited = egress.effective_authority != null && (RANK[egress.effective_authority] ?? 0) < (RANK[egress.required_authority] ?? 0);
  return {
    gaps: egress.outside_scope ?? [],
    limitingTerm: limited ? (egress.limiting_term ?? null) : null,
    cappedBy: egress.capped_by ?? null,
    fallbackReason: egress.fallback_reason ?? null,
    proposesOnly: egress.required_authority === "propose",
    settled: egress.settle_outcome === "settled",
  };
}

/** Whether the reason has anything to show. */
export function hasReason(reason: ReviewReason | null): reason is ReviewReason {
  return (
    reason !== null &&
    !reason.settled &&
    (reason.gaps.length > 0 || reason.limitingTerm !== null || reason.cappedBy !== null || reason.fallbackReason !== null || reason.proposesOnly)
  );
}

// -- definitions ----------------------------------------------------------------

export interface DefinitionField {
  /** The field's path inside its group (`limits/decoded_bytes`), or "" for the group's own value. */
  field: string;
  path: string;
  before: unknown;
  after: unknown;
  /** A `{kind, name}` pair read as one linkable ref (`Contract:http-response-v1`). */
  ref: { before: string | null; after: string | null } | null;
}

export interface DefinitionGroup {
  group: string;
  fields: DefinitionField[];
}

const SKIP_GROUPS = new Set(["artifact_format", "identity"]);

const side = (s: Schemas["SemanticFieldDelta"]["before"]) => (s.state === "present" ? s.value : undefined);

/**
 * A definition's field deltas grouped by top-level field (`components`,
 * `decoding`, …), identity and format left out (the row names them), the
 * lifecycle only when it changes on a revision. A `…/kind` + `…/name` pair
 * reads as one ref.
 */
export function definitionFields(member: Member): DefinitionGroup[] {
  const created = changeKindOf(member.disposition) === "new";
  const groups = new Map<string, DefinitionField[]>();
  const deltas = member.semantic_delta;
  const byPath = new Map(deltas.map((d) => [d.field_path, d]));
  const used = new Set<string>();
  for (const delta of deltas) {
    if (used.has(delta.field_path)) continue;
    const parts = delta.field_path.replace(/^\//, "").split("/");
    const group = parts[0] || "fields";
    if (SKIP_GROUPS.has(group) || (group === "lifecycle" && created)) continue;
    let field = parts.slice(1).join("/");
    let before = side(delta.before);
    let after = side(delta.after);
    let ref: DefinitionField["ref"] = null;
    if (parts[parts.length - 1] === "kind") {
      const stem = delta.field_path.slice(0, -"kind".length);
      const name = byPath.get(`${stem}name`);
      if (name) {
        used.add(name.field_path);
        const asRef = (k: unknown, n: unknown) => (typeof k === "string" && typeof n === "string" ? `${k}:${n}` : null);
        ref = { before: asRef(before, side(name.before)), after: asRef(after, side(name.after)) };
        field = parts.slice(1, -1).join("/").replace(/\/target$/, "");
        before = ref.before ?? undefined;
        after = ref.after ?? undefined;
      }
    }
    used.add(delta.field_path);
    groups.set(group, [...(groups.get(group) ?? []), { field, path: delta.field_path, before, after, ref }]);
  }
  return [...groups.entries()].map(([group, fields]) => ({ group, fields }));
}
