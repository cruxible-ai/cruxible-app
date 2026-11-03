// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient a99ce3ed
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
    "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
    "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
    "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07",
    "surface": "sdk",
    "kind": "security.catalog"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_d8e6dcb48e6a4d0d",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "generation": 10,
    "accepted_at": "2026-11-03T00:58:54.573196Z",
    "evaluation_time": "2026-11-03T02:20:48.246142Z",
    "kind_detail": {
      "kind": "security.catalog",
      "subjects": 1,
      "identity": "keys: security.catalog.catalog_id (unique)",
      "evidence": [
        "playbill.coordinator-self-source-v1"
      ],
      "predicates": [
        {
          "name": "catalog_id",
          "predicate": "security.catalog.catalog_id",
          "cardinality": "one",
          "type": "string{pattern: \"^[a-z][a-z0-9-]{0,63}$\", max_len: 64}",
          "description": "The catalog's short id, e.g. cisa-kev; the catalog's key.",
          "subject_kinds": [
            "security.catalog"
          ],
          "roles": [
            "normative"
          ],
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 11,
          "revision": 1,
          "path": "claim-types/security.catalog/catalog_id.json",
          "live_claims": 1,
          "subjects_with_value": 1
        }
      ],
      "incoming": [
        "security.vulnerability.listed_in"
      ],
      "sample_subject_ids": [
        "cisa-kev"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.catalog\", select=[\"catalog_id\"], limit=10)",
      "cx.query(kind=\"security.catalog\", follow=[{\"field\": \"security.vulnerability.listed_in\", \"as\": \"vulnerability\", \"direction\": \"reverse\"}], select=[\"vulnerability\"], limit=10)",
      "cx.get(\"security.catalog/cisa-kev\")"
    ]
  }
});
