// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 467289e3
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "ClaimType:security.audit.log_source",
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
    "ref": "ClaimType:security.audit.log_source",
    "kind": "claim_type",
    "detail": "summary",
    "card": {
      "predicate": "security.audit.log_source",
      "subject_kinds": [
        "security.audit"
      ],
      "object": "string",
      "cardinality": "many",
      "description": "A log source this incident's audit reads in full over the window (storefront/nginx-access). Stating it is what asks the question. Start from the service's service.log_source list (the respond Line names it): a source the service lists and the audit does not state leaves the answer unknown.",
      "roles": [
        "normative"
      ],
      "default_role": "normative",
      "evidence_requirement": "none",
      "revision_evidence": "replace",
      "evidence": [],
      "evidence_rules": [],
      "contention": {
        "selector": "all",
        "on_conflict": "unresolved"
      },
      "format": 8,
      "revision": 1,
      "path": "claim-types/security.audit/log_source.json",
      "live_claims": 0,
      "subjects_with_value": 0,
      "kit": "security",
      "next": [
        "cx.get(\"ClaimType:security.audit.log_source\", detail=\"proof\")"
      ]
    },
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:10.645476Z"
  }
});
