// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 6f241317
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.component.affected_by",
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
    "ref": "ClaimType:security.component.affected_by",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.component.affected_by",
      "subject_kinds": [
        "security.component"
      ],
      "object": "subject<security.vulnerability>",
      "cardinality": "many",
      "description": "A vulnerability OSV lists for the component's exact purl@version (OSV's own version matching). None of V is an agent's package-level not_affected judgment (normative, own words), which OSV cannot override.",
      "roles": [
        "normative",
        "observation"
      ],
      "default_role": "observation",
      "evidence_requirement": "self",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:playbill.coordinator-self-source-v1",
        "CaptureContract:security.osv-matches"
      ],
      "evidence_rules": [
        {
          "rule_id": "osv",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.osv-matches"
          ],
          "admission": "direct"
        },
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
        "selector": "all",
        "on_conflict": "unresolved"
      },
      "format": 11,
      "revision": 1,
      "path": "claim-types/security.component/affected_by.json",
      "live_claims": 9,
      "subjects_with_value": 2,
      "next": [
        "cx.get(\"ClaimType:security.component.affected_by\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:48:00.443634Z"
  }
});
