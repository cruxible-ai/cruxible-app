// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 5cb24bc1
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.harden",
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
    "ref": "Line:security.harden",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.harden",
      "runs": [
        {
          "run": "RUN-1306b1ca79c33c1a4d038be97d06f580b3a3017b0716ef8108296081def0bbb5",
          "procedure": "Procedure:security.harden",
          "status": "halted",
          "started_at": "2026-10-26T18:57:16.511427Z",
          "line": "Line:security.harden",
          "nodes_done": 10
        },
        {
          "run": "RUN-5d3534afeb45e572418f799e105df573959b8a29dc19ae4fc253bd5614f858f0",
          "procedure": "Procedure:security.harden",
          "status": "halted",
          "started_at": "2026-10-26T18:56:41.565904Z",
          "line": "Line:security.harden",
          "nodes_done": 10
        },
        {
          "run": "RUN-b31e8911976b988ce1828ad81e2e7b750600845faca6dcd40c68d9f92af91cf7",
          "procedure": "Procedure:security.harden",
          "status": "halted",
          "started_at": "2026-10-26T18:55:56.601192Z",
          "line": "Line:security.harden",
          "nodes_done": 10
        },
        {
          "run": "RUN-1e3a43f6cea942d856a1ca86fe98abd96b6be59d033100560b18a33f54187530",
          "procedure": "Procedure:security.harden",
          "status": "halted",
          "started_at": "2026-10-26T18:55:53.263693Z",
          "line": "Line:security.harden",
          "nodes_done": 10
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
    "evaluation_time": "2026-10-26T19:05:12.828858Z"
  }
});
