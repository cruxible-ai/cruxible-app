/**
 * The authored world with two more Lines that run kev-triage's Procedure, so
 * cve-applicability's writes are read by three Lines, two of them with long
 * names that differ only at the end (`security.exposure-attention.contested`,
 * `security.exposure-attention.unjudged`): the step graph's Read by band for
 * long, similar names. cve-applicability also gains a landing Trigger
 * (`security.assessments-landed`) whose Capture feeds its `record` step: the
 * Runs on band's landing marker. Served over the authored world (later
 * fixtures win).
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

export const LANDING_TRIGGER = "security.assessments-landed";
const cardBatch = (refs: string[]) =>
  defineFixture({ method: "post", path: "/api/v1/{instance_id}/get-batch", body: getBatchBody(refs, COORDINATE), response: {} as never });
/** An authored Line-card batch with cve-applicability's card naming the landing Trigger. */
function withLandingTrigger(refs: string[]): RecordedFixture {
  const base = authored(cardBatch(refs));
  const response = structuredClone(base.response) as { results: GetResult[] };
  for (const result of response.results) {
    if (result.ref !== "Line:cve-applicability" || !result.card) continue;
    (result.card as Schemas["GetLineCard"]).triggers = [{ trigger: `Trigger:${LANDING_TRIGGER}`, version: 1, fires: "when CaptureContract:security.assessment-record lands" }];
  }
  return { ...base, response };
}
const triggerCard: GetResult = {
  ...kevProof,
  ref: `Trigger:${LANDING_TRIGGER}`,
  kind: "trigger",
  detail: "summary",
  proof: null,
  card: {
    trigger: `Trigger:${LANDING_TRIGGER}`,
    lifecycle: "live",
    schedule: { kind: "capture_landing", event: { capture_contract_identity: { kind: "CaptureContract", name: "security.assessment-record" }, logical_sources: ["assessments.inbox"] } },
    target: "Line:cve-applicability",
  } satisfies Schemas["GetTriggerCard"],
} as GetResult;

export const READERS_WORLD: RecordedFixture[] = [
  ...AUTHORED,
  { ...authored(linesProbe), response: { ...linesSection, lines: [...(linesSection.lines ?? []), ...READERS.map((name) => ({ ...kevRow, line: `Line:${name}` }))] } },
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody(ALL_LINES.map((l) => `Line:${l}`), COORDINATE, "proof"),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [...proofs, ...READERS.map(readerProof)] },
  }),
  withLandingTrigger(["Line:cve-applicability", "Line:kev-triage"]),
  withLandingTrigger(["Line:cve-applicability"]),
  defineFixture({
    method: "post",
    path: "/api/v1/{instance_id}/get-batch",
    body: getBatchBody([`Trigger:${LANDING_TRIGGER}`], COORDINATE),
    response: { tag: "playbill-get-batch-result-v1", coordinate: COORDINATE, results: [triggerCard] },
  }),
];
