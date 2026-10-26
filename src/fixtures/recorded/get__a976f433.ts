// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 345018dc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.release.osv_coverage",
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "ClaimType:security.release.osv_coverage",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.release.osv_coverage",
      "subject_kinds": [
        "security.release"
      ],
      "object": "string",
      "cardinality": "one",
      "description": "Whether OSV answered for every component of the release, as the OSV query Capture shows: complete (N of N components answered), or partial with how many it answered, the purl types it does not index (brew, generic: never asked, since OSV's empty answer there would read as no advisories) and how many went unanswered. What OSV indexes is its own word (its ecosystems.txt, captured beside every query) read through the kit's purl type map. An empty OSV answer is a negative only under complete coverage. It is bound to the exact component set OSV answered for (set: 16 hex of the sha256 of the sorted component purls): another set, even of the same size, is unanswered until OSV answers again. Components the SBOM lists without a purl (unidentified) keep it partial.",
      "roles": [
        "observation"
      ],
      "default_role": "observation",
      "evidence_requirement": "captured",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:security.fetched-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "retained-security-evidence",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.fetched-v1"
          ],
          "admission": "direct"
        }
      ],
      "contention": {
        "selector": "only_contender",
        "on_conflict": "unresolved"
      },
      "format": 8,
      "revision": 1,
      "path": "claim-types/security.release/osv_coverage.json",
      "live_claims": 1,
      "subjects_with_value": 1,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.release.osv_coverage\", detail=\"proof\")",
        "cx.get(\"CaptureContract:security.fetched-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:04:59.966709Z"
  }
});
