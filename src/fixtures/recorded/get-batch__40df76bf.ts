// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c61aed2c
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
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
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
              "run": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
              "procedure": "Procedure:security.epss-triage",
              "status": "succeeded",
              "started_at": "2026-11-07T18:00:00Z",
              "line": "Line:security.epss-triage",
              "nodes_done": 5
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.epss-triage\")",
            "cx.get(\"Trigger:security.epss-daily\")",
            "cx.get(\"ProcedureRun:RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165\")",
            "cx.get(\"Line:security.epss-triage\", detail=\"history\")"
          ]
        },
        "coordinate": {
          "git_oid": "30e90cc6ad34",
          "generation": 22
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "30e90cc6ad34",
            "generation": 22
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
        "evaluation_time": "2026-11-07T22:23:00.541403Z"
      }
    ]
  }
});
