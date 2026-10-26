// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 4dbd5dde
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.kev-daily"
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
        "ref": "Line:security.kev-daily",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.kev-daily",
          "identity_digest": "sha256:c63120b67657fb95a7398ef08bbc3527b2340d0d795518c4b4c83461cc69d8db",
          "lifecycle": "live",
          "procedure": "Procedure:security.fetch-observed",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-daily",
              "version": 1,
              "fires": "on cron 17 14 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "888862d06b804729984064ec901128fc",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:50.168791Z",
              "line_artifact_digest": "sha256:77c0486751f41f1101f358f45c3827f80bd20cdd7253901a3c0a436bf38126c0",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-daily",
                  "artifact_digest": "sha256:0fe6682d943d02e536d1a394c1e4d2c13219e7350b4670d502c3a0d2f825b737"
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
              "run": "RUN-c01771a062a728f414c8aa1ffdccba6f8baa1c7d478da86a946af2eeb3758bfe",
              "procedure": "Procedure:security.fetch-observed",
              "status": "succeeded",
              "started_at": "2026-10-26T17:44:58.871169Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            },
            {
              "run": "RUN-8174176bf9323d503a6ac8a2b0bde114fc9e21c0fe0d73e8f7d4bc004769c7f6",
              "procedure": "Procedure:security.fetch-observed",
              "status": "succeeded",
              "started_at": "2026-10-26T17:43:14.047494Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.fetch-observed\")",
            "cx.get(\"Trigger:security.kev-daily\")",
            "cx.get(\"ProcedureRun:RUN-c01771a062a728f414c8aa1ffdccba6f8baa1c7d478da86a946af2eeb3758bfe\")",
            "cx.get(\"Line:security.kev-daily\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:13.447359Z"
      }
    ]
  }
});
