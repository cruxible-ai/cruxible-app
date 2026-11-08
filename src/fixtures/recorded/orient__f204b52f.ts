// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 49c70608
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
    "kind": "security.inventory"
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
    "evaluation_time": "2026-11-08T19:47:55.386933Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "kind_detail": {
      "kind": "security.inventory",
      "subjects": 1,
      "identity": "keys: security.inventory.inventory_id (unique)",
      "evidence": [
        "playbill.coordinator-self-source-v1"
      ],
      "predicates": [
        {
          "name": "inventory_id",
          "predicate": "security.inventory.inventory_id",
          "cardinality": "one",
          "type": "string{max_len: 256}",
          "description": "What one SBOM describes, named by its metadata.component purl (or, without one, by the SBOM's workspace path); the inventory's key.",
          "subject_kinds": [
            "security.inventory"
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
          "path": "claim-types/security.inventory/inventory_id.json",
          "live_claims": 1,
          "subjects_with_value": 1,
          "evidence_counts": {
            "admitted": 1,
            "own_word": 0,
            "unmet": 0
          }
        }
      ],
      "incoming": [
        "security.occurrence.inventory"
      ],
      "sample_subject_ids": [
        "pkg-maven-com.example-log4j-demo-app-1.0.0"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.inventory\", select=[\"inventory_id\"], limit=10)",
      "cx.query(kind=\"security.inventory\", follow=[{\"field\": \"security.occurrence.inventory\", \"as\": \"occurrence\", \"direction\": \"reverse\"}], select=[\"occurrence\"], limit=10)",
      "cx.get(\"security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0\")"
    ]
  }
});
