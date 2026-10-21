import type { Schemas } from "../api/schemas.ts";

/**
 * Typed readers for the proposal review's loose fields. The contract serves
 * `governance`, `provenance` and `attestation_coverage` as untyped objects
 * (core builds them as dicts in service/proposals/review.py); these read the
 * keys core writes there, with runtime checks, so the screen renders typed
 * values and ignores anything else.
 */

type Review = Schemas["ProposalReview"];

const str = (value: unknown): string | null => (typeof value === "string" ? value : null);
const records = (value: unknown): Record<string, unknown>[] =>
  Array.isArray(value) ? value.filter((v): v is Record<string, unknown> => typeof v === "object" && v !== null) : [];

export interface ApprovalRequirement {
  role: string;
  minimumDistinctSigners: number;
}

export interface ReviewGovernance {
  activationPolicy: string | null;
  requiredTier: string | null;
  approvalRequirements: ApprovalRequirement[];
}

export function readGovernance(review: Review): ReviewGovernance {
  const g = review.governance;
  return {
    activationPolicy: str(g.activation_policy),
    requiredTier: str(g.required_tier),
    approvalRequirements: records(g.approval_requirements).flatMap((item) => {
      const role = str(item.role);
      const minimum = typeof item.minimum_distinct_signers === "number" ? item.minimum_distinct_signers : 1;
      return role ? [{ role, minimumDistinctSigners: minimum }] : [];
    }),
  };
}

export interface ReviewProvenance {
  actorId: string | null;
  sourceCompilationDigest: string | null;
}

export function readProvenance(review: Review): ReviewProvenance {
  return {
    actorId: str(review.provenance.actor_id),
    sourceCompilationDigest: str(review.provenance.source_compilation_digest),
  };
}

export interface ReviewAttestation {
  signerId: string;
  submittedBy: string | null;
  attestationDigest: string | null;
}

/** Recorded approvals over the candidate (who signed, who submitted). */
export function readAttestations(review: Review): ReviewAttestation[] {
  return records(review.attestation_coverage.attestations).flatMap((item) => {
    const signerId = str(item.signer_id);
    return signerId
      ? [{ signerId, submittedBy: str(item.submitted_by), attestationDigest: str(item.attestation_digest) }]
      : [];
  });
}

type Member = Schemas["ReviewedMember"];

const rec = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

/** The value at a JSON-pointer-ish field path in a member's delta (after, else before). */
function deltaValue(member: Member, path: string, side: "before" | "after"): unknown {
  const delta = member.semantic_delta.find((d) => d.field_path === path);
  if (!delta) return undefined;
  const v = delta[side];
  return v.state === "present" ? v.value : undefined;
}

function pick(artifact: Record<string, unknown> | null, path: string[]): unknown {
  let at: unknown = artifact;
  for (const key of path) {
    const r = rec(at);
    if (!r) return undefined;
    at = r[key];
  }
  return at;
}

/** A Claim's object as display: a literal value or the Subject it points at. */
function objectOf(artifact: Record<string, unknown> | null): unknown {
  const object = rec(pick(artifact, ["statement", "object"]));
  if (!object) return undefined;
  if (object.kind === "subject") return pick(object, ["address", "artifact_path"]);
  return object.value;
}

export interface MemberSummary {
  /** identity.kind ("Claim", "Subject", "Provider", …) when the artifact names it. */
  kind: string | null;
  /** identity.name. */
  name: string | null;
  /** Claims: the ClaimType, the Subject it is about, and its value before and after. */
  claim: {
    predicate: string | null;
    subject: string | null;
    qualifier: string | null;
    before: unknown;
    after: unknown;
  } | null;
}

/**
 * What a reviewed member is, in words, from its semantic artifacts (the
 * candidate, else the base) or, when the review carries no artifacts, its
 * field deltas. Read-only display over the review payload; anything absent
 * stays null and the screen falls back to the field list.
 */
export function memberSummary(member: Member): MemberSummary {
  const after = rec(member.candidate_semantic_artifact);
  const before = rec(member.base_semantic_artifact);
  const either = after ?? before;
  const str2 = (v: unknown) => (typeof v === "string" ? v : null);
  const kind = str2(pick(either, ["identity", "kind"])) ?? str2(deltaValue(member, "/identity/kind", "after"));
  const name = str2(pick(either, ["identity", "name"])) ?? str2(deltaValue(member, "/identity/name", "after"));
  const isClaim = member.artifact_kind === "claim" || kind === "Claim";
  if (!isClaim) return { kind, name, claim: null };
  const field = (path: string[], delta: string) =>
    str2(pick(either, path)) ?? str2(deltaValue(member, delta, "after")) ?? str2(deltaValue(member, delta, "before"));
  const predicate = field(["statement", "predicate"], "/statement/predicate");
  const subject = field(["statement", "subject", "artifact_path"], "/statement/subject/artifact_path");
  const qualifier = field(["statement", "qualifier"], "/statement/qualifier");
  const objectAfter = after ? objectOf(after) : (deltaValue(member, "/statement/object/value", "after") ?? deltaValue(member, "/statement/object/address/artifact_path", "after"));
  const objectBefore = before ? objectOf(before) : (deltaValue(member, "/statement/object/value", "before") ?? deltaValue(member, "/statement/object/address/artifact_path", "before"));
  if (!predicate && !subject && objectAfter === undefined && objectBefore === undefined) return { kind, name, claim: null };
  return { kind, name, claim: { predicate, subject, qualifier, before: objectBefore, after: objectAfter } };
}

/** Field deltas grouped by their first path segment ("statement", "backing", …), in first-seen order. */
export function groupDeltas(member: Member): { group: string; deltas: Member["semantic_delta"] }[] {
  const groups = new Map<string, Member["semantic_delta"]>();
  for (const delta of member.semantic_delta) {
    const segment = delta.field_path.replace(/^\//, "").split(/[/.]/)[0] || "fields";
    groups.set(segment, [...(groups.get(segment) ?? []), delta]);
  }
  const order = ["statement", "lifecycle", "identity"];
  return [...groups.entries()]
    .sort(([a], [b]) => {
      const ia = order.indexOf(a), ib = order.indexOf(b);
      return (ia === -1 ? order.length : ia) - (ib === -1 ? order.length : ib);
    })
    .map(([group, deltas]) => ({ group, deltas }));
}
