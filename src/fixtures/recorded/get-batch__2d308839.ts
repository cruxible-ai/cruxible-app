// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch b434cfd1
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.registry-pull.cruxible"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-pull.cruxible",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-pull.cruxible",
          "identity_digest": "sha256:9326934d523db3025df623266076d2279d41e45d3481896083bf71263c9c19f9",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-pull.cruxible",
              "version": 1,
              "fires": "on cron 20 6 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "a976417c73b14b8793d856f0f856012e",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:46.471151Z",
              "line_artifact_digest": "sha256:380bd4f80b28b1a7ba73e1dfa1469d8fcb94b2471d2ca78d784c91d627d85375",
              "triggers": [
                {
                  "trigger": "Trigger:security.registry-pull.cruxible",
                  "artifact_digest": "sha256:760ba5a2b346b8ed09967a0de0f8cd5a16a8fbd0b2d5961ab220c572c569deb2"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:26.912790Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 1,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-da3a69b8af4e686e90b46090f761e0667ee23e9556667a489366e3f51c8f0842",
              "procedure": "Procedure:security.registry-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:53.778567Z",
              "line": "Line:security.registry-pull.cruxible",
              "nodes_done": 2
            },
            {
              "run": "RUN-8230ce4b96cdcbdc1e56fad27c222672c1fb2e50705047904b266c45bbe47f00",
              "procedure": "Procedure:security.registry-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:03.130184Z",
              "line": "Line:security.registry-pull.cruxible",
              "nodes_done": 2
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.registry-acquire\")",
            "cx.get(\"Trigger:security.registry-pull.cruxible\")",
            "cx.get(\"ProcedureRun:RUN-da3a69b8af4e686e90b46090f761e0667ee23e9556667a489366e3f51c8f0842\")",
            "cx.get(\"Line:security.registry-pull.cruxible\", detail=\"history\")"
          ]
        },
        "coordinate": {
          "git_oid": "f3765015f78f",
          "generation": 12
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "f3765015f78f",
            "generation": 12
          },
          "fields": [
            "triggers_inactive",
            "enablements",
            "enablements_total",
            "due",
            "waiting",
            "occurrences",
            "recent_runs",
            "runs_total"
          ]
        },
        "evaluation_time": "2026-10-26T19:05:15.252617Z"
      }
    ]
  }
});
