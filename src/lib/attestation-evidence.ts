import type { GetAttestationEvidence } from "../api/schemas.ts";

/**
 * What one attestation cites (D-R42): the same evidence a write takes
 * (because, a section in its own words, a file passage, a Capture, a
 * contract's newest Capture), made into Captures before it is signed. The
 * evidence read names whether an attestation counts; the Captures it cites
 * are on `get <claim> detail=why` (`attestation_accounts[].cited_capture_digests`),
 * which the contract types as an open object, so it is read defensively here.
 */
export interface AttestationAccount {
  record: string | null;
  event: string | null;
  attestation: string | null;
  principal: string | null;
  at: string | null;
  stance: string | null;
  validUntil: string | null;
  cited: string[];
}

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
const str = (value: unknown): string | null => (typeof value === "string" && value !== "" ? value : null);

/** The attestation accounts of a `detail=why` read; [] when it serves none. */
export function attestationAccounts(why: unknown): AttestationAccount[] {
  const accounts = record(why)?.attestation_accounts;
  if (!Array.isArray(accounts)) return [];
  return accounts.flatMap((raw) => {
    const a = record(raw);
    if (!a) return [];
    const cited = Array.isArray(a.cited_capture_digests) ? a.cited_capture_digests.filter((d): d is string => typeof d === "string") : [];
    return [
      {
        record: str(a.record),
        event: str(a.event_digest),
        attestation: str(a.attestation_digest),
        principal: str(a.principal),
        at: str(a.attested_at),
        stance: str(a.stance),
        validUntil: str(a.valid_until),
        cited,
      },
    ];
  });
}

/** The account of one attestation the evidence read lists: by its event digest, else by who, when and stance. */
export function accountOf(attestation: GetAttestationEvidence, accounts: readonly AttestationAccount[]): AttestationAccount | undefined {
  if (attestation.event) {
    const byEvent = accounts.find((a) => a.event === attestation.event);
    if (byEvent) return byEvent;
  }
  return accounts.find((a) => a.principal === attestation.principal && a.at === attestation.at && a.stance === attestation.stance && a.record === attestation.record);
}

/** How one cited Capture reads, from its envelope (get detail=proof): own words, a section, a passage, or evidence. */
export type Citation =
  | { kind: "own_words" }
  | { kind: "section"; source: string; path: string[] }
  | { kind: "passage"; source: string; anchor: string | null }
  | { kind: "evidence" };

/** A cited Capture's citation, read off its envelope; evidence when it is neither authored words nor a workspace selection. */
export function citationOf(proof: unknown): Citation {
  const envelope = record(record(proof)?.envelope);
  const source = record(envelope?.source);
  const selection = record(record(source?.selector)?.working_selection);
  const identity = str(source?.source_identity);
  // A workspace selection first: the writer who observed it is its producer too.
  if (selection && identity) {
    const section = record(selection.section);
    const path = Array.isArray(section?.path) ? section.path.filter((p): p is string => typeof p === "string") : [];
    if (path.length > 0) return { kind: "section", source: identity, path };
    return { kind: "passage", source: identity, anchor: str(selection.anchor) };
  }
  if (record(envelope?.producer)?.kind === "Principal") return { kind: "own_words" };
  return { kind: "evidence" };
}

/** A citation in words, as the write evidence table says it. */
export function citationWords(citation: Citation, publicName: (name: string) => string): string {
  switch (citation.kind) {
    case "own_words":
      return "Own words";
    case "section":
      return `Section ${citation.path.join(" › ")} of ${publicName(citation.source)}`;
    case "passage":
      return `Passage of ${publicName(citation.source)}`;
    case "evidence":
      return "Evidence";
  }
}
