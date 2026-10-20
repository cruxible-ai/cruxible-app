// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get c37d1269
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.assessment.justification",
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "ClaimType:security.assessment.justification",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.assessment.justification",
      "subject_kinds": [
        "security.assessment"
      ],
      "object": "string",
      "cardinality": "one",
      "members": [
        "component_not_present",
        "inline_mitigations_already_exist",
        "vulnerable_code_cannot_be_controlled_by_adversary",
        "vulnerable_code_not_in_execute_path",
        "vulnerable_code_not_present"
      ],
      "description": "Why a not_affected release is not affected (the VEX/CSAF justification): an observation from a source, or (normative) an analyst's judgment. Required in practice with every not_affected status; core cannot require it.",
      "member_descriptions": [
        {
          "member": "component_not_present",
          "description": "The vulnerable component is not in the release."
        },
        {
          "member": "inline_mitigations_already_exist",
          "description": "Built-in protections prevent exploitation."
        },
        {
          "member": "vulnerable_code_cannot_be_controlled_by_adversary",
          "description": "The vulnerable code cannot be reached with adversary-controlled input."
        },
        {
          "member": "vulnerable_code_not_in_execute_path",
          "description": "The vulnerable code is present but never runs."
        },
        {
          "member": "vulnerable_code_not_present",
          "description": "The component is present but not the vulnerable code (for example, a fixed version)."
        }
      ],
      "roles": [
        "normative",
        "observation"
      ],
      "default_role": "normative",
      "evidence_requirement": "self",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:playbill.coordinator-self-source-v1",
        "CaptureContract:security.cve-record-http-v1",
        "CaptureContract:security.observation-output-v1",
        "CaptureContract:security.osv-query-v1",
        "CaptureContract:security.workspace-evidence-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "analyst-judgment",
          "roles": [
            "normative"
          ],
          "contracts": [
            "CaptureContract:playbill.coordinator-self-source-v1",
            "CaptureContract:security.workspace-evidence-v1"
          ],
          "admission": "direct"
        },
        {
          "rule_id": "source-verdict",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.cve-record-http-v1",
            "CaptureContract:security.observation-output-v1",
            "CaptureContract:security.osv-query-v1"
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
      "path": "claim-types/security.assessment/justification.json",
      "live_claims": 17,
      "subjects_with_value": 17,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.assessment.justification\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-20T21:42:29.958981Z"
  }
});
