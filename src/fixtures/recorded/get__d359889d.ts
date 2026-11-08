// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 29c91897
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-e23f7cd216e8b6e96ff16a3a7daac160",
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
    "ref": "CLM-e23f7cd216e8b6e96ff16a3a7daac160",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 20,
          "git_oid": "2419b8847316",
          "accepted": "2026-11-07T22:22:24.799862Z",
          "actor": "owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "vulnerable_code_not_present",
          "digest": "sha256:3659c267b961",
          "change": "stated",
          "reason": {
            "kind": "change_set",
            "text": "log4j-core 2.14.1 as shipped here has no JndiLookup class.",
            "proposal": "sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:59.144995Z"
  }
});
