// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 166b48b0
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "kind": "security.product"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-20T21:42:29.125369Z",
    "kind_detail": {
      "kind": "security.product",
      "subjects": 4,
      "identity": "keys: security.product.name (hint)",
      "predicates": [
        {
          "name": "name",
          "predicate": "security.product.name",
          "cardinality": "one",
          "type": "string",
          "description": "The product's name; its key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.product"
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
          "path": "claim-types/security.product/name.json",
          "live_claims": 4,
          "subjects_with_value": 4
        },
        {
          "name": "supplied_by",
          "predicate": "security.product.supplied_by",
          "cardinality": "one",
          "type": "subject:security.supplier",
          "description": "The supplier of the product.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.cyclonedx-sbom-v1"
          ],
          "subject_kinds": [
            "security.product"
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
          "path": "claim-types/security.product/supplied_by.json",
          "live_claims": 3,
          "subjects_with_value": 3
        }
      ],
      "incoming": [
        "security.release.product"
      ],
      "sample_subject_ids": [
        "apache-log4j",
        "apache-log4j2",
        "gate-app",
        "zammad"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.product\", select=[\"name\", \"supplied_by\"], limit=10)",
      "cx.query(kind=\"security.product\", follow=[{\"field\": \"security.release.product\", \"as\": \"release\", \"direction\": \"reverse\"}], select=[\"release\"], limit=10)",
      "cx.get(\"security.product/apache-log4j\")"
    ]
  }
});
