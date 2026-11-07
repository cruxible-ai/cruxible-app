// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 7fe017e3
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.occurrence.scope",
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
    "ref": "ClaimType:security.occurrence.scope",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.occurrence.scope",
      "subject_kinds": [
        "security.occurrence"
      ],
      "object": "enum[\"required\", \"optional\", \"excluded\"]",
      "cardinality": "one",
      "members": [
        "required",
        "optional",
        "excluded"
      ],
      "description": "The component's CycloneDX scope in this inventory's SBOM (required when the SBOM states none). The membership fact: live while the SBOM lists the component, retired when it no longer does.",
      "roles": [
        "observation"
      ],
      "default_role": "observation",
      "evidence_requirement": "captured",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:security.sbom-components"
      ],
      "evidence_rules": [
        {
          "rule_id": "sbom",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.sbom-components"
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
      "path": "claim-types/security.occurrence/scope.json",
      "live_claims": 3,
      "subjects_with_value": 3,
      "next": [
        "cx.get(\"ClaimType:security.occurrence.scope\", detail=\"proof\")",
        "cx.get(\"CaptureContract:security.sbom-components\")"
      ]
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:59.715504Z"
  }
});
