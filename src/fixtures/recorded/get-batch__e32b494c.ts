// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch dd2f4644
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.harden"
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
        "ref": "Line:security.harden",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.harden",
          "identity_digest": "sha256:24678f9be989053275627387cff7ac3590db5842a3399180fce2a690fcadaed6",
          "lifecycle": "live",
          "procedure": "Procedure:security.harden",
          "authority": "observe",
          "trigger": "capture_landing+cron",
          "triggers": [
            {
              "trigger": "Trigger:security.harden-daily",
              "version": 1,
              "fires": "on cron 40 7 * * * (UTC)"
            },
            {
              "trigger": "Trigger:security.harden-on-registry",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from pypi.release lands"
            },
            {
              "trigger": "Trigger:security.harden-on-snapshot",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from github.repo.snapshot lands"
            }
          ],
          "triggers_total": 3,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "485512c620e64750a6b7d4930cbcc65e",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:49.534529Z",
              "line_artifact_digest": "sha256:b07e004fe3e424bd0469806307d2ef1b5d172a6180fbafd05003e19492e0ae8f",
              "triggers": [
                {
                  "trigger": "Trigger:security.harden-daily",
                  "artifact_digest": "sha256:1ee5316b4f982de5aeeb89ac360e7888a1f04825d4fc178a53e63a47a7c79f50"
                },
                {
                  "trigger": "Trigger:security.harden-on-registry",
                  "artifact_digest": "sha256:38e72aa0ad52d85e3b57cbd08071454e6548dafe5cf08f698641c9d63e5b722d"
                },
                {
                  "trigger": "Trigger:security.harden-on-snapshot",
                  "artifact_digest": "sha256:4fa25697d0e25db6f3aa8077613f88316a00c4162d6af617b4df21f3de261eb1"
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
          ],
          "runs_total": 4,
          "next": [
            "cx.get(\"Procedure:security.harden\")",
            "cx.get(\"Trigger:security.harden-daily\")",
            "cx.get(\"Trigger:security.harden-on-registry\")",
            "cx.get(\"Trigger:security.harden-on-snapshot\")",
            "cx.get(\"ProcedureRun:RUN-1306b1ca79c33c1a4d038be97d06f580b3a3017b0716ef8108296081def0bbb5\")",
            "cx.get(\"Line:security.harden\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:12.783099Z"
      }
    ]
  }
});
