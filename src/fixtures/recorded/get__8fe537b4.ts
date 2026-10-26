// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get b32f1dfc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.repo-parse.cruxible-ci",
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
    "ref": "Line:security.repo-parse.cruxible-ci",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.repo-parse.cruxible-ci",
      "runs": [
        {
          "run": "RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc",
          "procedure": "Procedure:security.repo-parse",
          "status": "succeeded",
          "started_at": "2026-10-26T18:55:53.263624Z",
          "line": "Line:security.repo-parse.cruxible-ci",
          "nodes_done": 9
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
    "evaluation_time": "2026-10-26T19:05:15.812240Z"
  }
});
