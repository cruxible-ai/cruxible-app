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
