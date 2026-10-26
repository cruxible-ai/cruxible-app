// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 269e859e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.kev-attention",
    "detail": "runs",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "Line:security.kev-attention",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.kev-attention",
      "runs": [
        {
          "run": "RUN-bbd28aacaabf3f368a57f6b656dcb3a3dd33617646ae0a3ef48b678d382ac193",
          "procedure": "Procedure:security.kev-attention",
          "status": "halted",
          "started_at": "2026-10-26T17:45:00.485914Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        },
        {
          "run": "RUN-06f7454fec93c61e4360c6c5765cbd79d19774a8c2446b2b465ba3dafcecc3a2",
          "procedure": "Procedure:security.kev-attention",
          "status": "halted",
          "started_at": "2026-10-26T17:43:16.664200Z",
          "line": "Line:security.kev-attention",
          "nodes_done": 8
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "f3765015f78f",
        "generation": 12
      },
      "fields": [
        "runs"
      ]
    },
    "evaluation_time": "2026-10-26T19:05:13.113021Z"
  }
});
