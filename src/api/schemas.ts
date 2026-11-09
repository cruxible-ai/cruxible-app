import type { components } from "./generated/schema";

/** Every schema of the pinned contract (api/openapi.json). */
export type Schemas = components["schemas"];

export type AcceptedCoordinate = Schemas["AcceptedCoordinate"];
export type Head = Schemas["Head"];
export type OrientResult = Schemas["OrientResult"];
export type OrientKindSummary = Schemas["OrientKindSummary"];
export type OrientPredicate = Schemas["OrientPredicate"];
export type OrientSubjectKind = Schemas["OrientSubjectKind"];
export type OrientSection = NonNullable<OrientResult["section"]>;
export type OrientActivity = NonNullable<OrientResult["activity"]>[number];
export type InstalledKit = Schemas["InstalledKit"];
export type NextResult = Schemas["NextResult"];
export type NextItem = Schemas["NextItem"];
export type NextReason = NextItem["reason"];
export type NextSeverity = NextItem["severity"];
export type NextRepair = Schemas["NextRepair"];
export type NextHealth = Schemas["NextHealth"];
export type GetResult = Schemas["GetResult"];
export type ClaimViewRecord = Schemas["ClaimViewRecord"];
export type GetSubjectCard = Schemas["GetSubjectCard"];
export type GetClaimCard = Schemas["GetClaimCard"];
export type GetEvidence = Schemas["GetEvidence"];
export type GetCaptureEvidence = Schemas["GetCaptureEvidence"];
export type GetAttestationEvidence = Schemas["GetAttestationEvidence"];
export type GetRevision = Schemas["GetRevision"];
export type GetSubjectHistory = Schemas["GetSubjectHistory"];
export type SubjectHistoryEvent = GetSubjectHistory["events"][number];
export type CaptureAdmissionAccount = Schemas["CaptureAdmissionAccount"];
export type GetRefKind = GetResult["kind"];
export type GetDetail = GetResult["detail"];
export type ProposalStatus = Schemas["ProposalListEntry"]["status"];
export type InboxStatus = NonNullable<Schemas["InboxList"]["status_filter"]>;

type AssertEveryKind<T extends Record<GetRefKind, unknown>> = T;

/**
 * The card each get kind carries. The contract types `GetResult.card` as an
 * undiscriminated union (no tag field), but the server pairs one card model
 * with each `kind`; this table is that pairing, and the type fails to compile
 * if the contract gains a kind the table does not name.
 */
export type CardByKind = AssertEveryKind<{
  claim: Schemas["GetClaimCard"];
  subject: Schemas["GetSubjectCard"];
  claim_type: Schemas["GetClaimTypeCard"];
  document: Schemas["GetDocumentCard"];
  procedure: Schemas["GetProcedureCard"];
  query: Schemas["GetQueryCard"];
  capture_contract: Schemas["GetCaptureContractCard"];
  trigger: Schemas["GetTriggerCard"];
  subject_kind: Schemas["GetSubjectKindCard"];
  proposal: Schemas["GetProposalCard"];
  line: Schemas["GetLineCard"];
  capture: Schemas["GetCaptureCard"];
  resolution_contract: Schemas["GetResolutionContractCard"];
  mandate: Schemas["GetMandateCard"];
  procedure_run: Schemas["GetProcedureRunCard"];
  principal: Schemas["GetPrincipalCard"];
  approval_policy: Schemas["GetApprovalPolicyCard"];
  procedure_runtime_policy: Schemas["GetProcedureRuntimePolicyCard"];
  provider: Schemas["GetProviderCard"];
  contract: Schemas["GetContractCard"];
  runbook: Schemas["GetRunbookCard"];
}>;

/** The typed card of a get result when it is of `kind`; null otherwise. */
export function cardOf<K extends GetRefKind>(
  result: GetResult | undefined,
  kind: K,
): CardByKind[K] | null {
  if (!result || result.kind !== kind || result.card == null) return null;
  return result.card as CardByKind[K];
}
