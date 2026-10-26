// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 4f26d721
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.finding.justification",
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
    "ref": "ClaimType:security.finding.justification",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.finding.justification",
      "subject_kinds": [
        "security.finding"
      ],
      "object": "string",
      "cardinality": "one",
      "members": [
        "not_attacker_controlled",
        "not_reachable",
        "rule_misfire",
        "sanitized",
        "test_or_dead_code"
      ],
      "description": "Why a finding is not_exploitable or a false_positive: an analyst's judgment (normative), or a scan's stated suppression.",
      "member_descriptions": [
        {
          "member": "not_attacker_controlled",
          "description": "The input reaching the sink is not attacker-controlled."
        },
        {
          "member": "not_reachable",
          "description": "No path from an entry point reaches the code."
        },
        {
          "member": "rule_misfire",
          "description": "The rule matched code that is not the pattern it describes."
        },
        {
          "member": "sanitized",
          "description": "The input is sanitized or validated before the sink."
        },
        {
          "member": "test_or_dead_code",
          "description": "The code is a test, an example or never shipped."
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
        "CaptureContract:security.file-v1"
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
            "CaptureContract:security.file-v1"
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
      "path": "claim-types/security.finding/justification.json",
      "live_claims": 0,
      "subjects_with_value": 0,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.finding.justification\", detail=\"proof\")",
        "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:04:59.681629Z"
  }
});
