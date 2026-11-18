// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 5d8d949f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-3da109f05a7fad21f8831270af0299db",
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
    "ref": "CLM-3da109f05a7fad21f8831270af0299db",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 21,
          "git_oid": "9403bd46ead4",
          "proposed_at": "2026-11-07T22:22:25.229631Z",
          "actor": "owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "vulnerable_code_not_in_execute_path",
          "digest": "sha256:598b23d1f82b",
          "change": "stated",
          "reason": {
            "kind": "change_set",
            "text": "The demo app never logs attacker-controlled input through log4j-api.",
            "proposal": "sha256:92a7feb20ef2e183138845db4b641919c3bb447bd314169e1986c918d61aa51f"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:58.460677Z"
  }
});
