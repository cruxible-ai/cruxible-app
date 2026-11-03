// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 4eefddba
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.vulnerability.epss_score",
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "ClaimType:security.vulnerability.epss_score",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.vulnerability.epss_score",
      "subject_kinds": [
        "security.vulnerability"
      ],
      "object": "decimal{0..1}",
      "cardinality": "one",
      "description": "FIRST's EPSS probability of exploitation in the next 30 days (epss).",
      "roles": [
        "observation"
      ],
      "default_role": "observation",
      "evidence_requirement": "captured",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:security.epss-scores"
      ],
      "evidence_rules": [
        {
          "rule_id": "epss-api",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.epss-scores"
          ],
          "admission": "direct"
        }
      ],
      "contention": {
        "selector": "only_contender",
        "on_conflict": "unresolved"
      },
      "format": 11,
      "revision": 1,
      "path": "claim-types/security.vulnerability/epss_score.json",
      "live_claims": 10,
      "subjects_with_value": 10,
      "next": [
        "cx.get(\"ClaimType:security.vulnerability.epss_score\", detail=\"proof\")",
        "cx.get(\"CaptureContract:security.epss-scores\")"
      ]
    },
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "evaluation_time": "2026-11-03T02:20:50.907452Z"
  }
});
