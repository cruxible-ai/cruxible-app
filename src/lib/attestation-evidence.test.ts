import { describe, expect, it } from "vitest";
import type { NextItem } from "@/api/schemas";
import { nextAttestationAccounts, nextAttestationClaim } from "./attestation-evidence";

const item: NextItem = {
  item_id: "finding", reason: "claim_new_evidence_unreviewed", severity: "warning", subject_identity: "Claim:CLM-one", repair: null,
  detail: { attestation_event_digest: "event-one", attesting_principal: "owner", attested_at: "2026-11-07T18:40:00+00:00", stance: "unsure" },
};
const account = {
  event_digest: "event-one", attestation_digest: "envelope-one", principal: "owner", attested_at: "2026-11-07T18:40:00Z", stance: "unsure",
  cited_capture_digests: ["sha256:cited"],
};
const why = { attestation_accounts: [{ ...account, event_digest: "event-other", attestation_digest: "envelope-other" }, account] };

describe("Next attestation evidence", () => {
  it("selects the exact event when the principal, time and stance have multiple accounts", () => {
    expect(nextAttestationAccounts(item, why).map((a) => a.event)).toEqual(["event-one"]);
    expect(nextAttestationAccounts({ ...item, detail: { attestation_event_digest: "missing" } }, why)).toEqual([]);
  });

  it("matches older responses by envelope or equivalent timestamps without guessing", () => {
    expect(nextAttestationAccounts({ ...item, detail: { attestation_envelope_digest: "envelope-one" } }, why).map((a) => a.event)).toEqual(["event-one"]);
    const legacy = { ...item, detail: { attesting_principal: "owner", attested_at: "2026-11-07T18:40:00+00:00", stance: "unsure" } };
    expect(nextAttestationAccounts(legacy, { attestation_accounts: [account] })).toHaveLength(1);
    expect(nextAttestationAccounts({ ...legacy, detail: {} }, why)).toEqual([]);
    expect(nextAttestationAccounts(item, null)).toEqual([]);
  });

  it("opens only attestation findings with a Claim reference", () => {
    expect(nextAttestationClaim(item)).toBe("CLM-one");
    expect(nextAttestationClaim({ ...item, detail: { claim_id: "CLM-two" } })).toBe("CLM-two");
    expect(nextAttestationClaim({ ...item, reason: "claim_conflicted" })).toBeNull();
    expect(nextAttestationClaim({ ...item, subject_identity: "kind/subject" })).toBeNull();
  });
});
