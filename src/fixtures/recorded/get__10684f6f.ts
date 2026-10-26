// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 4e47fae0
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.assessment.justification",
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
      "description": "Why a not_affected release is not affected (the VEX/CSAF justification): an observation from a source, or (normative) an analyst's judgment citing their own words or a workspace file (security.file-v1). Required in practice with every not_affected status; core cannot require it.",
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
        "CaptureContract:security.fetched-v1",
        "CaptureContract:security.file-v1",
        "CaptureContract:security.observation-output-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "analyst-judgment",
          "roles": [
            "normative"
          ],
          "contracts": [
            "CaptureContract:playbill.coordinator-self-source-v1",
            "CaptureContract:security.file-v1"
          ],
          "admission": "direct"
        },
        {
          "rule_id": "source-verdict",
          "roles": [
            "observation"
          ],
          "contracts": [
            "CaptureContract:security.fetched-v1",
            "CaptureContract:security.observation-output-v1"
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
      "live_claims": 1,
      "subjects_with_value": 1,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.assessment.justification\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:10.288390Z"
  }
});
