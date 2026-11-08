// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 22914821
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:semantic.distinct_from",
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
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
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:48:00.802515Z"
  }
});
