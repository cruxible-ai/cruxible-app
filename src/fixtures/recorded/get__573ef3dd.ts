// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 92d3525d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 16,
          "git_oid": "278ed5bcdbdf",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "lifecycle": "live",
          "digest": "sha256:5d117090f46b",
          "reason": {
            "kind": "procedure_item",
            "reason": "The SBOM at sbom.cdx.json lists pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1 with scope required (inventory pkg:maven/com.example/log4j-demo-app@1.0.0, named by metadata_component).",
            "proposal": "sha256:dbb590e201d200fa506dca388612e00be4dc681a7bdab4ca4e1e64cdc7a031ed",
            "procedure": "Procedure:security.sbom-import",
            "run": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
            "terminal": "write"
          }
        }
      ],
      "events": [
        {
          "field": "inventory_id",
          "predicate": "security.inventory.inventory_id",
          "claim": "CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf",
          "sequence": 16,
          "git_oid": "278ed5bcdbdf",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.sbom-import run RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5 terminal write\n\n10 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:dbb590e201d200fa506dca388612e00be4dc681a7bdab4ca4e1e64cdc7a031ed"
          },
          "value": "pkg:maven/com.example/log4j-demo-app@1.0.0",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:59.294371Z"
  }
});
