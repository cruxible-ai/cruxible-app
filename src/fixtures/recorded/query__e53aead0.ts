// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query c8e93c95
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "Trigger",
    "where": [
      {
        "field": "schedule",
        "eq": "capture_landing"
      }
    ],
    "select": [
      "name",
      "schedule",
      "target",
      "capture_contract",
      "logical_sources"
    ],
    "limit": 500,
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
    "kind": "Trigger",
    "columns": [
      {
        "name": "name",
        "predicate": null,
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "schedule",
        "predicate": null,
        "type": "enum",
        "members": [
          "cadence",
          "capture_landing",
          "cron",
          "generation_accepted",
          "window_close"
        ],
        "cardinality": "one"
      },
      {
        "name": "target",
        "predicate": null,
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "capture_contract",
        "predicate": null,
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "logical_sources",
        "predicate": null,
        "type": "string",
        "members": null,
        "cardinality": "many"
      }
    ],
    "rows": [],
    "truncated": false,
    "next_cursor": null,
    "remaining": 0,
    "capped": [],
    "notes": [],
    "receipt": {
      "mode": "inline",
      "spec_digest": "sha256:01b482e209ee3955579cb9842edb9e36af371ed1343474714244e13ed0cfdc19",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
        "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
        "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
        "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
      },
      "evaluation_time": "2026-11-03T02:20:47.952732Z"
    }
  }
});
