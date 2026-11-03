// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 3e869b84
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.epss-triage"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.epss-triage",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.epss-triage",
          "identity_digest": "sha256:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
          "lifecycle": "live",
          "procedure": "Procedure:security.epss-triage",
          "authority": "settle",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.epss-daily",
              "version": 1,
              "fires": "on cron 30 14 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "triggers_inactive": "not enabled",
          "occurrence_epoch": 1,
          "enablements": [],
          "enablements_total": 0,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305",
              "procedure": "Procedure:security.epss-triage",
              "status": "succeeded",
              "started_at": "2026-11-03T00:58:59.674323Z",
              "line": "Line:security.epss-triage",
              "nodes_done": 5
            },
            {
              "run": "RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4",
              "procedure": "Procedure:security.epss-triage",
              "status": "succeeded",
              "started_at": "2026-11-03T00:58:54.573196Z",
              "line": "Line:security.epss-triage",
              "nodes_done": 5
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.epss-triage\")",
            "cx.get(\"Trigger:security.epss-daily\")",
            "cx.get(\"ProcedureRun:RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305\")",
            "cx.get(\"Line:security.epss-triage\", detail=\"history\")"
          ]
        },
        "coordinate": {
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "7f513078c490",
            "generation": 10
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
        "evaluation_time": "2026-11-03T02:20:51.444960Z"
      }
    ]
  }
});
