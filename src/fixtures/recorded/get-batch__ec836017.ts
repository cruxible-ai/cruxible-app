// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 11e9791d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.kev-triage"
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
        "ref": "Line:security.kev-triage",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.kev-triage",
          "identity_digest": "sha256:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
          "lifecycle": "live",
          "procedure": "Procedure:security.kev-triage",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-landed",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from cisa.kev.catalog lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "f286ab36ba9c4c269a48b399ecc028d8",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:51.568609Z",
              "line_artifact_digest": "sha256:088eb15c8e07f681bf97db3edeb31a184495535fc94ba1e7b75ae37f77e02b3d",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed",
                  "artifact_digest": "sha256:c4232c07e01b4d75e52f17970a8925e2da682927f933012f51db74ef2635c6e9"
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
              "run": "RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d",
              "procedure": "Procedure:security.kev-triage",
              "status": "succeeded",
              "started_at": "2026-10-26T17:45:00.485705Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            },
            {
              "run": "RUN-61c63a47a47da7b01898a97644035315560f9dc596e53bcb6ba46925c8bfefb8",
              "procedure": "Procedure:security.kev-triage",
              "status": "halted",
              "started_at": "2026-10-26T17:43:16.664239Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.kev-triage\")",
            "cx.get(\"Trigger:security.kev-landed\")",
            "cx.get(\"ProcedureRun:RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d\")",
            "cx.get(\"Line:security.kev-triage\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:13.842680Z"
      }
    ]
  }
});
