// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 1542d87c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.work.finding",
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
    "ref": "ClaimType:security.work.finding",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.work.finding",
      "subject_kinds": [
        "security.control",
        "security.exception",
        "security.remediation"
      ],
      "object": "subject:security.finding",
      "cardinality": "one",
      "description": "The finding this work item answers (a remediation fixes it; an approved exception accepts its risk).",
      "roles": [
        "normative"
      ],
      "default_role": "normative",
      "evidence_requirement": "none",
      "revision_evidence": "replace",
      "evidence": [],
      "evidence_rules": [],
      "contention": {
        "selector": "only_contender",
        "on_conflict": "unresolved"
      },
      "format": 7,
      "revision": 1,
      "path": "claim-types/security.work/finding.json",
      "live_claims": 0,
      "subjects_with_value": 0,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.work.finding\", detail=\"proof\")"
      ]
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:00.392401Z"
  }
});
