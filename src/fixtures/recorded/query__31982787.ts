// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query f752c3f2
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "security.inventory",
    "select": [
      "security.inventory.inventory_id"
    ],
    "claims": true,
    "limit": 100,
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    }
  },
  "response": {
    "tag": "playbill-query-page-v1",
    "kind": "security.inventory",
    "columns": [
      {
        "name": "inventory_id",
        "predicate": "security.inventory.inventory_id",
        "type": "string",
        "members": null,
        "cardinality": "one"
      }
    ],
    "rows": [
      {
        "subject": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
        "subject_id": "pkg-maven-com.example-log4j-demo-app-1.0.0",
        "inventory_id": "pkg:maven/com.example/log4j-demo-app@1.0.0",
        "flags": [],
        "claims": {
          "inventory_id": [
            {
              "claim": "CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf",
              "value": "pkg:maven/com.example/log4j-demo-app@1.0.0",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        }
      }
    ],
    "truncated": false,
    "next_cursor": null,
    "remaining": 0,
    "capped": [],
    "notes": [],
    "receipt": {
      "mode": "inline",
      "spec_digest": "sha256:cce0a37d7e081b78e93aeb6c5821076edfe6364533dcbd7622453b0b6b560386",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "evaluation_time": "2026-11-07T22:22:54.328687Z"
    }
  }
});
