// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 8bd113b5
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-1817b5bf41dbacad208487b99a2a275d",
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
    "ref": "CLM-1817b5bf41dbacad208487b99a2a275d",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 19,
          "git_oid": "2d033ee7b7af",
          "accepted": "2026-11-07T18:00:00.000000Z",
          "actor": "owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "1",
          "digest": "sha256:906caf13d887",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "FIRST EPSS on 2026-11-02: percentile 1.",
            "proposal": "sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96",
            "procedure": "Procedure:security.epss-triage",
            "run": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
            "terminal": "write"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-08T19:47:56.357900Z"
  }
});
