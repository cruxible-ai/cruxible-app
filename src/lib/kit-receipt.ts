/**
 * A kit receipt Document body (`playbill-kit-receipt-v1`, core's KitReceipt,
 * carried as a Document of kind `kit_receipt`): the paths the kit owns and
 * the paths it carries, each with the release's digest, the digest this
 * instance holds and the content digest. A Document body is not a response
 * shape in the pinned contract, so it is read with runtime checks; anything
 * else is not a receipt and reads as JSON.
 */

export interface ReceiptArtifact {
  path: string;
  releaseDigest: string;
  installedDigest: string;
  contentDigest: string | null;
}

export interface KitReceipt {
  kitId: string;
  version: string;
  /** Definitions the kit owns: it may replace and retire these. */
  owned: ReceiptArtifact[];
  /** Definitions it pins but does not own. */
  carried: ReceiptArtifact[];
}

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && !Array.isArray(value);

function artifacts(value: unknown): ReceiptArtifact[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return null;
  const out: ReceiptArtifact[] = [];
  for (const item of value) {
    if (!isRecord(item) || typeof item.path !== "string" || typeof item.release_digest !== "string" || typeof item.installed_digest !== "string") return null;
    out.push({
      path: item.path,
      releaseDigest: item.release_digest,
      installedDigest: item.installed_digest,
      contentDigest: typeof item.content_digest === "string" ? item.content_digest : null,
    });
  }
  return out;
}

/** The receipt a Document body holds; null when the body is not one. */
export function readKitReceipt(json: unknown): KitReceipt | null {
  if (!isRecord(json) || json.tag !== "playbill-kit-receipt-v1" || typeof json.kit_id !== "string" || typeof json.version !== "string") return null;
  const owned = artifacts(json.artifacts);
  const carried = artifacts(json.carried);
  if (!owned || !carried) return null;
  return { kitId: json.kit_id, version: json.version, owned, carried };
}
