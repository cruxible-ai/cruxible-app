// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 8a88c50d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.app_exposure.justification",
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
    "ref": "ClaimType:security.app_exposure.justification",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.app_exposure.justification",
      "subject_kinds": [
        "security.app_exposure"
      ],
      "object": "enum[\"component_not_present\", \"vulnerable_code_not_in_execute_path\", \"vulnerable_code_cannot_be_controlled_by_adversary\", \"inline_mitigations_already_exist\"]",
      "cardinality": "one",
      "members": [
        "component_not_present",
        "vulnerable_code_not_in_execute_path",
        "vulnerable_code_cannot_be_controlled_by_adversary",
        "inline_mitigations_already_exist"
      ],
      "description": "The VEX justification of an agent's app-level not_affected judgment: why this inventory's use of the component is not affected. It silences this occurrence only and never states the global none.",
      "roles": [
        "normative"
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
            "normative"
          ],
          "contracts": [
            "CaptureContract:playbill.coordinator-self-source-v1"
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
      "path": "claim-types/security.app_exposure/justification.json",
      "live_claims": 2,
      "subjects_with_value": 1,
      "next": [
        "cx.get(\"ClaimType:security.app_exposure.justification\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:59.499782Z"
  }
});
