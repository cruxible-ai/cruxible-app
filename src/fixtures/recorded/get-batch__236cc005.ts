// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 8ed4d9af
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.registry-parse.cruxible"
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
        "ref": "Line:security.registry-parse.cruxible",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-parse.cruxible",
          "identity_digest": "sha256:e07e178926fbb86ab50ce200046795b155f0002ed10ad58252f335b475196bed",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-landed.cruxible",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from pypi.release lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "23b29cce56af464f9af3b6c05f2c3f85",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T18:55:48.087373Z",
              "line_artifact_digest": "sha256:a2a20db169057947b59d542bd8f7863a214756b0e309836f43517a2dbafe177e",
              "triggers": [
                {
                  "trigger": "Trigger:security.registry-landed.cruxible",
                  "artifact_digest": "sha256:7fdef53535c5cbadadfac2709c1d9706cfad8f90da3f3e54754f6d32b092d61e"
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
              "run": "RUN-3ad7fb91dc2ab48cb491b6db76afecac4e83926713c4c80e161c9824fa98364a",
              "procedure": "Procedure:security.registry-parse",
              "status": "succeeded",
              "started_at": "2026-10-26T18:55:55.268912Z",
              "line": "Line:security.registry-parse.cruxible",
              "nodes_done": 7
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.registry-parse\")",
            "cx.get(\"Trigger:security.registry-landed.cruxible\")",
            "cx.get(\"ProcedureRun:RUN-3ad7fb91dc2ab48cb491b6db76afecac4e83926713c4c80e161c9824fa98364a\")",
            "cx.get(\"Line:security.registry-parse.cruxible\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:14.788395Z"
      }
    ]
  }
});
