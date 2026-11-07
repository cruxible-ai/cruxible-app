// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query f9a0ab7d
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
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
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
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "evaluation_time": "2026-11-07T22:22:54.842688Z"
    }
  }
});
