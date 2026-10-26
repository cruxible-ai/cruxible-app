// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch e0c85fcf
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.kev-attention"
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
        "ref": "Line:security.kev-attention",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.kev-attention",
          "identity_digest": "sha256:3c7df3aece8e44880fd6ea9eb462d871b67f4d5bee0ebf066d240e723d939731",
          "lifecycle": "live",
          "procedure": "Procedure:security.kev-attention",
          "authority": "observe",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-landed-attention",
              "version": 1,
              "fires": "when CaptureContract:security.fetched-v1 from cisa.kev.catalog lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "5b1e43df4b54418994ee872c00506a58",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "robertmalone",
              "enabled_at": "2026-10-26T17:42:52.979851Z",
              "line_artifact_digest": "sha256:ecd27ef4b7f50c5477c4583195f26c7e25b059f7e33b3c45b002f5e0025c89b8",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed-attention",
                  "artifact_digest": "sha256:aa8026cb0086b6ea8731c440ebcaabcbfafab6a9d90f3c064a65968e4bdd768d"
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
              "run": "RUN-bbd28aacaabf3f368a57f6b656dcb3a3dd33617646ae0a3ef48b678d382ac193",
              "procedure": "Procedure:security.kev-attention",
              "status": "halted",
              "started_at": "2026-10-26T17:45:00.485914Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            },
            {
              "run": "RUN-06f7454fec93c61e4360c6c5765cbd79d19774a8c2446b2b465ba3dafcecc3a2",
              "procedure": "Procedure:security.kev-attention",
              "status": "halted",
              "started_at": "2026-10-26T17:43:16.664200Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.kev-attention\")",
            "cx.get(\"Trigger:security.kev-landed-attention\")",
            "cx.get(\"ProcedureRun:RUN-bbd28aacaabf3f368a57f6b656dcb3a3dd33617646ae0a3ef48b678d382ac193\")",
            "cx.get(\"Line:security.kev-attention\", detail=\"history\")"
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
        "evaluation_time": "2026-10-26T19:05:13.079757Z"
      }
    ]
  }
});
