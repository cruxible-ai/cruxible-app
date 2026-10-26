// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient a17387ac
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "kind": "security.supplier"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:04:58.733058Z",
    "kind_detail": {
      "kind": "security.supplier",
      "subjects": 1,
      "identity": "keys: security.supplier.name (hint)",
      "predicates": [
        {
          "name": "name",
          "predicate": "security.supplier.name",
          "cardinality": "one",
          "type": "string",
          "description": "The supplier's name; its key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.supplier"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.supplier/name.json",
          "live_claims": 1,
          "subjects_with_value": 1
        }
      ],
      "incoming": [
        "security.product.supplied_by"
      ],
      "sample_subject_ids": [
        "gate-example"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.supplier\", select=[\"name\"], limit=10)",
      "cx.query(kind=\"security.supplier\", follow=[{\"field\": \"security.product.supplied_by\", \"as\": \"product\", \"direction\": \"reverse\"}], select=[\"product\"], limit=10)",
      "cx.get(\"security.supplier/gate-example\")"
    ]
  }
});
