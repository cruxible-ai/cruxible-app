// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch b7f9faf4
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.osv-applicability"
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
        "ref": "Line:security.osv-applicability",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.osv-applicability",
          "identity_digest": "sha256:4b3e9d71b33f4edc5a709bd8dd53f89a44dcf9c93f893799bae9cc9e6f39941e",
          "lifecycle": "live",
          "procedure": "Procedure:security.osv-applicability",
          "authority": "propose",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.osv-daily",
              "version": 1,
              "fires": "on cron 30 15 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "f3690c05a1e44564b0b1181bf320d9b3",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:58.484946Z",
              "line_artifact_digest": "sha256:eb856a6793aa03acc8699459abfc9d97ea066a7f11e66111e59a328ac52b281d",
              "triggers": [
                {
                  "trigger": "Trigger:security.osv-daily",
                  "artifact_digest": "sha256:c20629bba48c5c2545b71579083ac216a7ddd57ae37c6ccc0cb933768749a4ae"
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
              "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
              "procedure": "Procedure:security.osv-applicability",
              "status": "succeeded",
              "started_at": "2026-10-26T17:44:38.124878Z",
              "line": "Line:security.osv-applicability",
              "nodes_done": 9
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.osv-applicability\")",
            "cx.get(\"Trigger:security.osv-daily\")",
            "cx.get(\"ProcedureRun:RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8\")",
            "cx.get(\"Line:security.osv-applicability\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:14.515833Z"
      }
    ]
  }
});
