/**
 * The cruxible:// reference grammar for agent briefings. A ref is DATA — an
 * address into governed state, never behavior. Parsing extracts coordinates
 * for in-app routes and the existing read hooks, nothing else; anything the
 * grammar doesn't recognize parses to null and renders as inert code text.
 *
 * Supported forms:
 *   cruxible://entity/<EntityType>/<entity_id>
 *   cruxible://query/<query_name>
 *   cruxible://receipt/<receipt_id>
 */

export const CRUXIBLE_SCHEME = "cruxible://";

export type CruxibleRef =
  | { kind: "entity"; entityType: string; entityId: string }
  | { kind: "query"; queryName: string }
  | { kind: "receipt"; receiptId: string };

export function parseCruxibleRef(url: string): CruxibleRef | null {
  if (!url.startsWith(CRUXIBLE_SCHEME)) return null;
  const raw = url.slice(CRUXIBLE_SCHEME.length).split("/");
  let parts: string[];
  try {
    parts = raw.map(decodeURIComponent);
  } catch {
    return null; // malformed percent-encoding
  }
  if (parts.some((p) => p === "")) return null;
  if (parts[0] === "entity" && parts.length === 3) {
    return { kind: "entity", entityType: parts[1]!, entityId: parts[2]! };
  }
  if (parts[0] === "query" && parts.length === 2) {
    return { kind: "query", queryName: parts[1]! };
  }
  if (parts[0] === "receipt" && parts.length === 2) {
    return { kind: "receipt", receiptId: parts[1]! };
  }
  return null;
}

/**
 * Bare-ref matcher for prose text nodes. Excludes whitespace, quote/bracket
 * delimiters, and angle brackets; sentence punctuation the match swallows is
 * trimmed by trimTrailingPunctuation so "…cruxible://receipt/R-1." refs work.
 */
export const CRUXIBLE_REF_RE = /cruxible:\/\/[^\s<>"'()[\]]+/g;

export function trimTrailingPunctuation(match: string): string {
  return match.replace(/[.,;:!?]+$/, "");
}
