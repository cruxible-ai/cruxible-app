// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 228e9399
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:semantic.distinct_from",
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
    "ref": "ClaimType:semantic.distinct_from",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "semantic.distinct_from",
      "subject_kinds": [
        "semantic.subject"
      ],
      "object": "subject<semantic.subject>",
      "cardinality": "many",
      "description": "The object Subject is a different thing from this one, whatever names or keys they share: the duplicates audit never groups the pair.",
      "roles": [
        "normative",
        "observation"
      ],
      "default_role": "normative",
      "evidence_requirement": "self",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:playbill.coordinator-self-source-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "self",
          "roles": [
            "normative",
            "observation"
          ],
          "contracts": [
            "CaptureContract:playbill.coordinator-self-source-v1"
          ],
          "admission": "direct"
        }
      ],
      "contention": {
        "selector": "all",
        "on_conflict": "unresolved"
      },
      "format": 11,
      "revision": 1,
      "path": "claim-types/semantic/distinct_from.json",
      "live_claims": 0,
      "subjects_with_value": 0,
      "next": [
        "cx.get(\"ClaimType:semantic.distinct_from\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "evaluation_time": "2026-11-03T02:20:50.988098Z"
  }
});
