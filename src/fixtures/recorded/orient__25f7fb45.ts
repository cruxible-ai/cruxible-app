// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 3e415085
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "section": "capture_contracts",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:05:00.612927Z",
    "section": "capture_contracts",
    "capture_contracts": [
      {
        "contract": "CaptureContract:playbill.coordinator-self-source-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 22
      },
      {
        "contract": "CaptureContract:security.fetched-large-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 3
      },
      {
        "contract": "CaptureContract:security.fetched-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 42
      },
      {
        "contract": "CaptureContract:security.file-erasable-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 14
      },
      {
        "contract": "CaptureContract:security.file-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 18
      },
      {
        "contract": "CaptureContract:security.observation-output-v1",
        "version": 1,
        "lifecycle": "live",
        "grade": "observed",
        "admitted_by": 8
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")"
    ]
  }
});
