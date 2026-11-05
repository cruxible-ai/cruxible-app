import type { Schemas } from "@/api/schemas";
import { changeKindOf, claimIdOfPath, memberClaim, subjectOfPath, type ChangeKind } from "./proposal-diff";

/**
 * A run's per-item changes (D-R37 g, CD3): every claims item its terminals
 * record with a change, as a row: the change kind, the Subject, the ClaimType
 * and the value. The run serves each item's change kind, stable identity and
 * change digest (never the change body), and the artifact path it landed at;
 * the Subject, ClaimType and value are read from the proposal the terminal
 * delivered (its review's members, by path), and a re-observation (no member:
 * nothing changed) from the stored Claim (claims/read-batch). Never one read
 * per item.
 */

type Egress = Schemas["ProcedureTerminalEgress"];
type Child = Schemas["ProcedureTerminalEgressChild"];
type Member = Schemas["ReviewedMember"];
type Statement = Schemas["ClaimStatementCard"];

export type ItemChange = NonNullable<Child["change_kind"]>;

export interface ChangeRow {
  key: string;
  node: string;
  index: number;
  change: ItemChange;
  /** A claim change's kind in the proposal: new, revised or retired. */
  disposition: ChangeKind | null;
  path: string | null;
  claim: string | null;
  subject: string | null;
  claimType: string | null;
  /** The value now (a retirement's: the value retired), a typed Claim object. */
  value: unknown;
  /** A revision's value before. */
  before: unknown;
  identity: string | null;
  digest: string | null;
}

/** The items with a recorded change, over every claims terminal, in node then child order. */
export function changedItems(egress: readonly Egress[] | null | undefined): { egress: Egress; child: Child }[] {
  return (egress ?? [])
    .filter((e) => e.kind === "claims")
    .flatMap((e) => (e.children ?? []).filter((c) => c.change_kind).map((child) => ({ egress: e, child })))
    .sort((a, b) => (a.egress.node_id < b.egress.node_id ? -1 : a.egress.node_id > b.egress.node_id ? 1 : a.child.child_index - b.child.child_index));
}

/** The Claim ids the rows need read from state: claim paths no member covers (re-observations). */
export function unreviewedClaims(items: ReturnType<typeof changedItems>, members: readonly Member[] | null | undefined): string[] {
  const covered = new Set((members ?? []).map((m) => m.path));
  return [...new Set(items.flatMap(({ child }) => (child.path && !covered.has(child.path) ? [claimIdOfPath(child.path) ?? ""] : [])).filter(Boolean))].sort();
}

/**
 * The same Claims, grouped by the coordinate the run recorded for them: a
 * claims terminal's accepted git oid where its items landed, else null (the
 * run's bound coordinate, what it read). A re-observation's value is the
 * stored Claim there, never at the page's coordinate or the head: a later
 * generation may have revised it. One pass over the items, each visited
 * once: ids accumulate straight into their group.
 */
export function unreviewedClaimsAt(
  items: ReturnType<typeof changedItems>,
  members: readonly Member[] | null | undefined,
): { accepted: string | null; ids: string[] }[] {
  const covered = new Set((members ?? []).map((m) => m.path));
  const groups = new Map<string | null, Set<string>>();
  for (const { egress, child } of items) {
    const claim = child.path && !covered.has(child.path) ? claimIdOfPath(child.path) : null;
    if (!claim) continue;
    const key = egress.accepted_git_oid ?? null;
    let ids = groups.get(key);
    if (!ids) groups.set(key, (ids = new Set()));
    ids.add(claim);
  }
  return [...groups].map(([accepted, ids]) => ({ accepted, ids: [...ids].sort() }));
}

export function changeRows(
  items: ReturnType<typeof changedItems>,
  members: readonly Member[] | null | undefined,
  statements: ReadonlyMap<string, Statement>,
): ChangeRow[] {
  const byPath = new Map((members ?? []).map((m) => [m.path, m] as const));
  return items.map(({ egress, child }) => {
    const path = child.path ?? null;
    const member = path ? byPath.get(path) : undefined;
    const claim = path ? claimIdOfPath(path) : null;
    const row: ChangeRow = {
      key: `${egress.node_id}\n${child.child_index}`,
      node: egress.node_id,
      index: child.child_index,
      change: child.change_kind!,
      disposition: null,
      path,
      claim,
      subject: null,
      claimType: null,
      value: undefined,
      before: undefined,
      identity: child.item_identity_digest ?? null,
      digest: child.change_digest ?? null,
    };
    if (child.change_kind === "subject") {
      row.subject = subjectOfPath(path);
      return row;
    }
    const read = member ? memberClaim(member) : null;
    if (member && read) {
      const kind = changeKindOf(member.disposition);
      row.disposition = kind;
      row.subject = read.subject;
      row.claimType = read.claimType;
      row.value = kind === "retired" ? (read.baseObject ?? read.object) : read.object;
      row.before = kind === "revised" ? read.baseObject : undefined;
      return row;
    }
    const statement = claim ? statements.get(claim) : undefined;
    if (statement) {
      row.subject = subjectOfPath(statement.subject.artifact_path);
      row.claimType = statement.predicate;
      row.value = statement.object;
    }
    return row;
  });
}

/** Rows by change kind, for the panel's counts. */
export function changeCounts(rows: readonly ChangeRow[]): Record<ItemChange, number> {
  const out: Record<ItemChange, number> = { claim: 0, subject: 0, reobservation: 0, retirement: 0 };
  for (const row of rows) out[row.change] += 1;
  return out;
}
