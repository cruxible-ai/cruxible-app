/**
 * A Document's own links (D-R17): `about` a Subject, `guides` a ClaimType or
 * Procedure, any other relation a label. Served on `get Document:<name>
 * detail=proof` as the `cruxible.document.references` fact (`declared`), which
 * the contract types as an open object: read defensively.
 */
export interface DocumentLink {
  relation: string;
  target: string;
}

const record = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : null;

export function documentLinks(proof: unknown): DocumentLink[] {
  const facts = record(proof)?.facts;
  if (!Array.isArray(facts)) return [];
  const out: DocumentLink[] = [];
  for (const raw of facts) {
    const fact = record(raw);
    if (fact?.schema_id !== "cruxible.document.references") continue;
    const links = record(fact.value)?.links;
    for (const item of Array.isArray(links) ? links : []) {
      const link = record(item);
      if (typeof link?.relation === "string" && typeof link.target_identity === "string") out.push({ relation: link.relation, target: link.target_identity });
    }
  }
  return out;
}
