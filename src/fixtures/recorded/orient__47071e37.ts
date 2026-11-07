// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 97045f79
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
    "surface": "sdk",
    "kind": "security.catalog"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_console05",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "generation": 22,
    "accepted_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-07T22:22:55.392491Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
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
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 0,
            "own_word": 1,
            "unmet": 0
          }
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
