// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 87da7fba
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.epss-daily"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.epss-daily",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.epss-daily",
          "identity_digest": "sha256:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
          "lifecycle": "live",
          "procedure": "Procedure:security.epss-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.epss-daily",
              "version": 1,
              "fires": "on cron 45 13 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "f47c17c5b8ce4729a34365b63f14bc3c",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:44.759789Z",
              "line_artifact_digest": "sha256:063766dfe463e33a1ce881bc2d796ca171796981ed5b844440560956534b1026",
              "triggers": [
                {
                  "trigger": "Trigger:security.epss-daily",
                  "artifact_digest": "sha256:1627e9f7924ddd7dbdbe224fced04de2e29cec32982f115cd61d1629dec0f561"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:24.632253Z",
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
              "run": "RUN-3ca462badd11b767fa3181307f914922de90898148099580448cd62b6df64464",
              "procedure": "Procedure:security.epss-acquire",
              "status": "succeeded",
              "started_at": "2026-10-19T21:40:32.053647Z",
              "line": "Line:security.epss-daily",
              "nodes_done": 3
            },
            {
              "run": "RUN-3b2159fd41a9d4ccfc9f03341d0e89a3bb3a577544db65da00c40800f8f3f61e",
              "procedure": "Procedure:security.epss-acquire",
              "status": "succeeded",
              "started_at": "2026-10-19T21:36:28.819906Z",
              "line": "Line:security.epss-daily",
              "nodes_done": 3
            },
            {
              "run": "RUN-6ace3e1d5d8024585b4af23d93b10f0e57d1ac4cf3cb8dcbb3a914283f70f81d",
              "procedure": "Procedure:security.epss-acquire",
              "status": "succeeded",
              "started_at": "2026-10-19T21:33:46.070370Z",
              "line": "Line:security.epss-daily",
              "nodes_done": 3
            }
          ],
          "runs_total": 3,
          "next": [
            "cx.get(\"Procedure:security.epss-acquire\")",
            "cx.get(\"Trigger:security.epss-daily\")",
            "cx.get(\"ProcedureRun:RUN-3ca462badd11b767fa3181307f914922de90898148099580448cd62b6df64464\")",
            "cx.get(\"Line:security.epss-daily\", detail=\"history\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "97040dbfdd1e",
            "generation": 58
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
        "evaluation_time": "2026-10-19T22:16:33.810169Z"
      }
    ]
  }
});
