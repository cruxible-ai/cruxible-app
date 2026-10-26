// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch fafab9bf
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.repo-parse.cruxible-ci"
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
        "ref": "Line:security.repo-parse.cruxible-ci",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.repo-parse.cruxible-ci",
          "identity_digest": "sha256:caba99083d262c808697cf95abfea2e8fac5032aff3a9b23da6d09a05b11df18",
          "lifecycle": "live",
          "procedure": "Procedure:security.repo-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.repo-landed.cruxible-ci",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from github.repo.snapshot lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "55d248f4624d4a9a8a3dbce2389f53d9",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:44.963262Z",
              "line_artifact_digest": "sha256:56cfb04fe41988ab455ea5b6717ea6f7f2ccedc6f7db4399aa8d1c9d2dc5a0a7",
              "triggers": [
                {
                  "trigger": "Trigger:security.repo-landed.cruxible-ci",
                  "artifact_digest": "sha256:3dbdbc991f6f254f4d1c2fd2dd36c344725d34cf1e6dfabb4b7a9e9cc9d79f8a"
                }
              ],
              "evaluated_until": "2026-10-26T19:04:25.454444Z",
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
              "run": "RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc",
              "procedure": "Procedure:security.repo-parse",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:53.263624Z",
              "line": "Line:security.repo-parse.cruxible-ci",
              "nodes_done": 9
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.repo-parse\")",
            "cx.get(\"Trigger:security.repo-landed.cruxible-ci\")",
            "cx.get(\"ProcedureRun:RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc\")",
            "cx.get(\"Line:security.repo-parse.cruxible-ci\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:15.705873Z"
      }
    ]
  }
});
