// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 76f72944
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.kev-triage",
    "detail": "runs",
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
    "ref": "Line:security.kev-triage",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.kev-triage",
      "runs": [
        {
          "run": "RUN-867726d010ecc009ddce0306bfe1d2c23e4162fd9f5ea31ad9862327cfd11cd8",
          "procedure": "Procedure:security.kev-triage",
          "status": "succeeded",
          "started_at": "2026-11-07T18:05:00Z",
          "line": "Line:security.kev-triage",
          "nodes_done": 4
        },
        {
          "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
          "procedure": "Procedure:security.kev-triage",
          "status": "succeeded",
          "started_at": "2026-11-07T18:00:00Z",
          "line": "Line:security.kev-triage",
          "nodes_done": 4
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "30e90cc6ad34",
        "generation": 22
      },
      "fields": [
        "runs"
      ]
    },
    "evaluation_time": "2026-11-08T19:48:01.658897Z"
  }
});
