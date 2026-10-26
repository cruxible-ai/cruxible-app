// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch fa8acbbb
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.sbom-import"
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
        "ref": "Line:security.sbom-import",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.sbom-import",
          "identity_digest": "sha256:4a7eb19ffccd074be6ff2e6bffe701d397872ac11c239d8baaa953442acaad27",
          "lifecycle": "live",
          "procedure": "Procedure:security.sbom-import",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.sbom-landed",
              "version": 1,
              "fires": "when CaptureContract:security.file-v1 from cyclonedx.sbom lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "48f270d1317b4fbcbb7b8b9b076fa451",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:57.082820Z",
              "line_artifact_digest": "sha256:899eaacadaf6f56021bcfdaa8955836df493456cac34c06da1da7d65f3e69392",
              "triggers": [
                {
                  "trigger": "Trigger:security.sbom-landed",
                  "artifact_digest": "sha256:1e2c1c393021f2d267f02da632ff25a7fdbffc0ad91072d4a082287d509a2852"
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
              "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
              "procedure": "Procedure:security.sbom-import",
              "status": "succeeded",
              "started_at": "2026-10-26T17:43:01.517331Z",
              "line": "Line:security.sbom-import",
              "nodes_done": 6
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.sbom-import\")",
            "cx.get(\"Trigger:security.sbom-landed\")",
            "cx.get(\"ProcedureRun:RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1\")",
            "cx.get(\"Line:security.sbom-import\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:17.068657Z"
      }
    ]
  }
});
