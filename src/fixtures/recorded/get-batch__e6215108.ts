// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 458887e7
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.repo-pull.cruxible-ci"
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
        "ref": "Line:security.repo-pull.cruxible-ci",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.repo-pull.cruxible-ci",
          "identity_digest": "sha256:af6b8cc03795d4d21499fabdd0c64f783338dbf0ce5f0d02adb19ead87654a3c",
          "lifecycle": "live",
          "procedure": "Procedure:security.repo-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.repo-pull.cruxible-ci",
              "version": 1,
              "fires": "on cron 5 */6 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "39435fcd00b24c0fabd21a9e269a8bb8",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:43.421308Z",
              "line_artifact_digest": "sha256:fe8cf5e49faf3dbb6a7722d8dd80c4609f5ea345a18f5fbda9e571aebec39e71",
              "triggers": [
                {
                  "trigger": "Trigger:security.repo-pull.cruxible-ci",
                  "artifact_digest": "sha256:71f0b25651468feaae70058f9ffa4fd95a632de47059eba3efb97512b6b4d2fe"
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
              "run": "RUN-015591a2bef054c81e50241813882b780f6543d52c65b80649bdf1e425ae6caf",
              "procedure": "Procedure:security.repo-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:50.984771Z",
              "line": "Line:security.repo-pull.cruxible-ci",
              "nodes_done": 2
            },
            {
              "run": "RUN-4e9a5a0432d4ba47d37d6fad3666e415dfb9aa22c1f2676f1fc8fbb3d5d85bd9",
              "procedure": "Procedure:security.repo-acquire",
              "status": "succeeded",
              "started_at": "2026-10-26T18:54:59.686181Z",
              "line": "Line:security.repo-pull.cruxible-ci",
              "nodes_done": 2
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.repo-acquire\")",
            "cx.get(\"Trigger:security.repo-pull.cruxible-ci\")",
            "cx.get(\"ProcedureRun:RUN-015591a2bef054c81e50241813882b780f6543d52c65b80649bdf1e425ae6caf\")",
            "cx.get(\"Line:security.repo-pull.cruxible-ci\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:16.052455Z"
      }
    ]
  }
});
