// Relative .ts imports, like definitions.ts: pure, so tests and Node can load it.
import type { Schemas } from "../api/schemas.ts";
import { SINCE_ROWS } from "../api/requests.ts";
import type { LineDefinition, ProcedureSpec } from "./definitions.ts";

/**
 * The Overview's derivations from list reads: which generations one since
 * read covers, the belief changes in it, and which Lines feed each kind.
 */

type SinceRow = Schemas["SinceRow"];

/**
 * The lower bound (exclusive) of the newest generations whose ChangeSet
 * members fit `budget`, walking the generations page newest first from the
 * page's generation; at least the newest one. `head` when the page is empty.
 */
export function sinceLower(
  generations: readonly { sequence: number; members?: number | undefined }[],
  head: number,
  budget: number = SINCE_ROWS,
): number {
  let lower = head;
  let total = 0;
  for (const generation of generations) {
    if (generation.sequence !== lower || generation.sequence === 0) break;
    const members = generation.members ?? 0;
    if (total > 0 && total + members > budget) break;
    total += members;
    lower = generation.sequence - 1;
  }
  return lower;
}

/** One Claim member of a ChangeSet, as the Overview's recent changes list it. */
export interface BeliefChange {
  generation: number;
  claim: string;
  /** `kind/id`; null when the row carries no statement. */
  subject: string | null;
  kind: string | null;
  /** The short field name the statement prints. */
  field: string | null;
  qualifier: string | null;
  /** stated / changed / retired (ChangeMark words), else the disposition as served. */
  change: string;
  value: unknown;
  /** The value before, when an earlier row of the same read holds it. */
  from: { value: unknown } | null;
  memberPath: string;
}

const CHANGE: Record<string, string> = {
  create: "stated",
  replace: "changed",
  retire: "retired",
  delete: "retired",
};

const CLAIM_ID = /CLM-[0-9a-f]+/;

/**
 * The Claim members of one since read, newest first (generation, then the
 * read's member order reversed). A revision's earlier value comes from an
 * earlier row of the same read for the same member, when there is one.
 */
export function beliefChanges(rows: readonly SinceRow[]): BeliefChange[] {
  const last = new Map<string, unknown>();
  const out: BeliefChange[] = [];
  for (const row of rows) {
    if (row.artifact_kind !== "claim") continue;
    const statement = row.statement ?? null;
    const claim = statement?.claim ?? CLAIM_ID.exec(row.member_path)?.[0] ?? row.member_path;
    const subject = statement?.subject ?? null;
    const earlier = last.has(row.member_path) ? { value: last.get(row.member_path) } : null;
    out.push({
      generation: row.generation,
      claim,
      subject,
      kind: subject ? subject.slice(0, Math.max(0, subject.indexOf("/"))) || null : null,
      field: statement?.field ?? null,
      qualifier: statement?.qualifier ?? null,
      change: CHANGE[row.disposition] ?? row.disposition,
      value: statement?.value ?? null,
      from: row.disposition === "create" ? null : earlier,
      memberPath: row.member_path,
    });
    if (statement) last.set(row.member_path, statement.value);
  }
  return out.reverse();
}

/** Each kind's newest generation among the changes. */
export function latestByKind(changes: readonly BeliefChange[]): Map<string, number> {
  const out = new Map<string, number>();
  for (const change of changes) {
    if (change.kind && change.generation > (out.get(change.kind) ?? -1)) out.set(change.kind, change.generation);
  }
  return out;
}

/** What feeds a kind: the Lines whose claims steps write about its Subjects, and whether people or agents enter some of it. */
export interface KindFeed {
  lines: string[];
  /** Some of it has no Line writing it: its Subjects (no Line creates them) or a ClaimType no Line writes. */
  direct: boolean;
}

/**
 * Who feeds each kind, from definitions only. A Line feeds a kind when one of
 * its claims steps writes Claims about Subjects of it; a Line capped at
 * observe writes nothing. A kind is (also) entered directly when no Line may
 * create its Subjects, or one of its ClaimTypes (identity keys aside) has no
 * Line writing it.
 */
export function kindFeeds({
  specs,
  lines,
  kinds,
  claimTypes,
}: {
  specs: ReadonlyMap<string, ProcedureSpec>;
  lines: readonly LineDefinition[];
  kinds: readonly { kind: string; keys?: readonly string[] | undefined }[];
  claimTypes: readonly { predicate: string; subject_kinds?: readonly string[] | null | undefined }[];
}): Map<string, KindFeed> {
  const feeding = new Map<string, Set<string>>();
  const creators = new Set<string>();
  const written = new Set<string>();
  for (const line of lines) {
    if (line.maxAuthority === "observe") continue;
    for (const step of specs.get(line.procedure)?.steps ?? []) {
      if (!("claims" in step)) continue;
      const kind = step.subject.kind;
      if (step.claims.length > 0) {
        let set = feeding.get(kind);
        if (!set) feeding.set(kind, (set = new Set()));
        set.add(line.line);
      }
      if (step.subject.create === "if_absent") creators.add(kind);
      for (const claim of step.claims) written.add(claim.type);
    }
  }
  const out = new Map<string, KindFeed>();
  for (const { kind, keys = [] } of kinds) {
    const own = claimTypes.filter((row) => (row.subject_kinds ?? []).includes(kind) && !keys.includes(row.predicate));
    out.set(kind, {
      lines: [...(feeding.get(kind) ?? [])].sort(),
      direct: !creators.has(kind) || own.some((row) => !written.has(row.predicate)),
    });
  }
  return out;
}
