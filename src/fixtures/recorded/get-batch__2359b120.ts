// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 3bd56be7
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.cve-applicability"
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
        "ref": "Line:security.cve-applicability",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.cve-applicability",
          "identity_digest": "sha256:f9880a610fa060e85512a2557a96454c13fb0d72b2467f03fc19cbc9cda98e58",
          "lifecycle": "live",
          "procedure": "Procedure:security.cve-applicability",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.cve-landed",
              "version": 1,
              "fires": "when CaptureContract:security.cve-record-http-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "aab3ae2717174ed2ba692d1ec8f6d621",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:31.980284Z",
              "line_artifact_digest": "sha256:ef20cef76446e3bc6049e4d0114edfe7159d3c8102c08b8ce1eb0095d9cff44d",
              "triggers": [
                {
                  "trigger": "Trigger:security.cve-landed",
                  "artifact_digest": "sha256:f053b6f702affdf225328b8fc07363898abf7ffedb617211116882e2dadc9a80"
                }
              ],
              "evaluated_until": "2026-10-21T19:48:49.146376Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "a84224fdf92640a79139cd64d3ec745e",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:51.055794Z",
              "line_artifact_digest": "sha256:ffe3c6f336c771c8ad2d13855e74af033cf2f735d22a1268de501ee7b9eae154",
              "triggers": [
                {
                  "trigger": "Trigger:security.cve-landed",
                  "artifact_digest": "sha256:f053b6f702affdf225328b8fc07363898abf7ffedb617211116882e2dadc9a80"
                }
              ],
              "evaluated_until": "2026-10-19T21:37:32.110192Z",
              "stopped_at": "2026-10-19T21:37:32.110192Z",
              "stop_reason": "line_changed",
              "detail": "The Line changed; enable it again to run its new version automatically.",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 2,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
              "procedure": "Procedure:security.cve-applicability",
              "status": "succeeded",
              "started_at": "2026-10-19T21:31:46.272392Z",
              "line": "Line:security.cve-applicability",
              "nodes_done": 8
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.cve-applicability\")",
            "cx.get(\"Trigger:security.cve-landed\")",
            "cx.get(\"ProcedureRun:RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d\")",
            "cx.get(\"Line:security.cve-applicability\", detail=\"history\")"
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
        "evaluation_time": "2026-10-21T19:49:26.308089Z"
      }
    ]
  }
});
