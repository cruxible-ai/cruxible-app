// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get a7c9bf8c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.kev-triage",
    "detail": "runs",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
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
          "run": "RUN-381d6f6c567a25233e8307245a6d17097984b85a4ebc8f6f17f827cc342ea360",
          "procedure": "Procedure:security.kev-triage",
          "status": "succeeded",
          "started_at": "2026-11-03T00:58:57.324133Z",
          "line": "Line:security.kev-triage",
          "nodes_done": 4
        },
        {
          "run": "RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
          "procedure": "Procedure:security.kev-triage",
          "status": "succeeded",
          "started_at": "2026-11-03T00:58:48.471271Z",
          "line": "Line:security.kev-triage",
          "nodes_done": 4
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "7f513078c490",
        "generation": 10
      },
      "fields": [
        "runs"
      ]
    },
    "evaluation_time": "2026-11-03T02:20:51.573813Z"
  }
});
