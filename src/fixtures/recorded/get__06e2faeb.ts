// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 515725fe
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.sbom-import",
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
    "ref": "Line:security.sbom-import",
    "kind": "line",
    "detail": "runs",
    "runs": {
      "kind": "line_runs",
      "line": "Line:security.sbom-import",
      "runs": [
        {
          "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
          "procedure": "Procedure:security.sbom-import",
          "status": "succeeded",
          "started_at": "2026-10-26T17:43:01.517331Z",
          "line": "Line:security.sbom-import",
          "nodes_done": 6
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
    "evaluation_time": "2026-10-26T19:05:17.124477Z"
  }
});
