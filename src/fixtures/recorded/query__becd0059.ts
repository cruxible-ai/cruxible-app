// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query c207ba43
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "security.catalog",
    "select": [
      "security.catalog.catalog_id"
    ],
    "claims": true,
    "limit": 100,
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    }
  },
  "response": {
    "tag": "playbill-query-page-v1",
    "kind": "security.catalog",
    "columns": [
      {
        "name": "catalog_id",
        "predicate": "security.catalog.catalog_id",
        "type": "string",
        "members": null,
        "cardinality": "one"
      }
    ],
    "rows": [
      {
        "subject": "security.catalog/cisa-kev",
        "subject_id": "cisa-kev",
        "catalog_id": "cisa-kev",
        "flags": [],
        "claims": {
          "catalog_id": [
            {
              "claim": "CLM-a405b2a08fbc949bac5794292efc9d27",
              "value": "cisa-kev",
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
      "spec_digest": "sha256:53503c3cb1c8a36da3d373abd11e8dd5cf01860acd8158e86d09e859d0a0d086",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
        "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
        "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
        "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
      },
      "evaluation_time": "2026-11-03T02:20:47.623879Z"
    }
  }
});
