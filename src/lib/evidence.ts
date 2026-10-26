import type { CaptureAdmissionAccount, GetAttestationEvidence, GetCaptureEvidence } from "@/api/schemas";

/**
 * How a Claim's evidence reads, in the words `cruxible get --detail evidence`
 * prints (cruxible-core a725d8320): each cited Capture is labelled by what it
 * is (the Claim's own words, a passage of a file, or evidence) and says
 * whether the verdict reads it; each attestation of the Claim version says
 * whether it counts toward the verdict and why.
 */

/**
 * A stored `playbill`-prefixed identity as its Cruxible display name. Stored
 * and served names keep their spelling (digests cover them); display text
 * says Cruxible. Render-time only: never feed the result back to the API.
 */
export function publicName(name: string): string {
  const qualifier = "CaptureContract:";
  if (name.startsWith(qualifier)) return qualifier + publicName(name.slice(qualifier.length));
  if (name.startsWith("playbill.")) return `cruxible.${name.slice("playbill.".length)}`;
  return name;
}

/** What a cited Capture is: the Claim's own words, a passage of its source, or its role. */
export function citationLabel(capture: Pick<GetCaptureEvidence, "origin" | "role" | "source">): string {
  if (capture.origin === "self_source") return "own words";
  if (capture.role === "copy") return `passage of ${publicName(capture.source)}`;
  return capture.role;
}

/**
 * Admission over a set of citations: how many the verdict reads, of those
 * offered as evidence, and the copies that are not evidence at all.
 */
export function admissionTally(accounts: readonly Pick<CaptureAdmissionAccount, "status">[]) {
  const admitted = accounts.filter((a) => a.status === "admitted").length;
  const notEvidence = accounts.filter((a) => a.status === "not_evidence").length;
  return { admitted, offered: accounts.length - notEvidence, notEvidence };
}

type CountsReason = GetAttestationEvidence["counts_reason"];

const COUNTS_WORDS: Record<CountsReason, string> = {
  cites_admitted_capture: "cites Captures this Claim admits",
  consequence_policy: "consequence policy rule",
  cites_no_capture: "cites no Capture",
  capture_not_admitted: "cites a Capture this Claim does not admit",
  not_accepted: "recorded, not accepted: the verdict reads accepted attestations",
  not_current: "not current",
};

/** Why an attestation counts toward the verdict, or why not, in words. */
export function countsReasonText(attestation: Pick<GetAttestationEvidence, "counts_reason" | "rule">): string {
  const words = COUNTS_WORDS[attestation.counts_reason];
  return attestation.counts_reason === "consequence_policy" && attestation.rule ? `${words} ${attestation.rule}` : words;
}

/** "accepted" (an accepted attestation artifact) or "recorded" (an event `claim attest` recorded). */
export function recordLabel(record: GetAttestationEvidence["record"]): string {
  return record === "accepted" ? "accepted" : "recorded";
}

/** The attestation's basis, in words. */
export function basisLabel(basis: GetAttestationEvidence["basis"]): string {
  return basis.replaceAll("_", " ");
}
