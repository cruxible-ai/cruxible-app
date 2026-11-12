/**
 * The authored world with two more Lines that run kev-triage's Procedure, so
 * cve-applicability's writes are read by three Lines, two of them with long
 * names that differ only at the end (`security.exposure-attention.contested`,
 * `security.exposure-attention.unjudged`): the step graph's Read by band for
 * long, similar names. Served over the authored world (later fixtures win);
 * only the source model changes (the lines section and the Lines' envelopes).
 */
import { defineFixture, type RecordedFixture } from "./fixture";
import { AUTHORED } from "./handlers";
import { COORDINATE } from "./authored/world";
import { getBatchBody, orientQuery } from "@/api/requests";
import type { GetResult, Schemas } from "@/api/schemas";

export const READERS = ["security.exposure-attention.contested", "security.exposure-attention.unjudged"];
const AUTHORED_LINES = ["cve-applicability", "kev-triage"];
/** The console's orient page size (hooks.ts ORIENT_PAGE), as the authored fixtures state it. */
const ORIENT_PAGE = 500;

/** The authored fixture answering the same request as `probe`. */
function authored(probe: RecordedFixture): RecordedFixture {
  const base = AUTHORED.find((f) => f.key === probe.key);
  if (!base) throw new Error(`readers world: no authored fixture for ${probe.key}`);
  return base;
}

const linesProbe = defineFixture({
  method: "get",
  path: "/api/v1/{instance_id}/orient",
  query: orientQuery({ coordinate: COORDINATE, section: "lines", limit: ORIENT_PAGE }),
  response: {} as Schemas["OrientResult"],
});
const linesSection = authored(linesProbe).response as Schemas["OrientResult"];
const kevRow = (linesSection.lines ?? []).find((row) => row.line === "Line:kev-triage")!;

const proofsProbe = defineFixture({
  method: "post",
  path: "/api/v1/{instance_id}/get-batch",
  body: getBatchBody(AUTHORED_LINES.map((l) => `Line:${l}`), COORDINATE, "proof"),
  response: {} as never,
});
const proofs = (authored(proofsProbe).response as { results: GetResult[] }).results;
const kevProof = proofs.find((r) => r.ref === "Line:kev-triage")!;

/** kev-triage's envelope under another Line's name. */
function readerProof(name: string): GetResult {
  const proof = structuredClone(kevProof) as GetResult & { proof: { envelope: { identity: { name: string } } } };
  proof.ref = `Line:${name}`;
  proof.proof.envelope.identity.name = name;
  return proof;
}

const ALL_LINES = [...AUTHORED_LINES, ...READERS];

export const READERS_WORLD: RecordedFixture[] = [
  ...AUTHORED,
  { ...authored(linesProbe), response: { ...linesSection, lines: [...(linesSection.lines ?? []), ...READERS.map((name) => ({ ...kevRow, line: `Line:${name}` }))] } },
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(ALL_LINES.map((l) => `Line:${l}`), COORDINATE, "proof"),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [...proofs, ...READERS.map(readerProof)] },
  }),
];
