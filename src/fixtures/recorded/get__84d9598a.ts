// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 58e1bf84
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.audit.result",
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
    "ref": "ClaimType:security.audit.result",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.audit.result",
      "subject_kinds": [
        "security.audit"
      ],
      "object": "string",
      "cardinality": "one",
      "members": [
        "exploited",
        "inconclusive",
        "not_exploited"
      ],
      "description": "The auditor's judgment: exploited, not_exploited or inconclusive, citing the decisive log read (security.file-erasable-v1) or a workspace file (security.file-v1); own words are refused. Reasoning goes in a section of the incident's note. A disagreeing auditor contends (set --contend): while the slot reads conflict the answer is unknown. Never settled by a Mandate.",
      "member_descriptions": [
        {
          "member": "exploited",
          "description": "The window's logs show exploitation: cite the decisive read."
        },
        {
          "member": "inconclusive",
          "description": "The logs cannot decide it (a gap, a missing source, ambiguous matches)."
        },
        {
          "member": "not_exploited",
          "description": "Every stated log source (the audit's, which must include every source the service lists) was read in full over the window and shows no exploitation; counts as none only when the reads cover [window_start, window_end]."
        }
      ],
      "roles": [
        "normative"
      ],
      "default_role": "normative",
      "evidence_requirement": "captured",
      "revision_evidence": "replace",
      "evidence": [
        "CaptureContract:security.file-erasable-v1",
        "CaptureContract:security.file-v1"
      ],
      "evidence_rules": [
        {
          "rule_id": "retained-security-evidence",
          "roles": [
            "normative"
          ],
          "contracts": [
            "CaptureContract:security.file-erasable-v1",
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
      "path": "claim-types/security.audit/result.json",
      "live_claims": 0,
      "subjects_with_value": 0,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.audit.result\", detail=\"proof\")",
        "cx.get(\"CaptureContract:security.file-erasable-v1\")"
      ]
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:10.691912Z"
  }
});
