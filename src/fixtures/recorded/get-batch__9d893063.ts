// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 5b060a09
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
        "ref": "Line:security.epss-triage",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.epss-triage",
          "identity_digest": "sha256:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
          "lifecycle": "live",
          "procedure": "Procedure:security.epss-triage",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.epss-landed",
              "version": 1,
              "fires": "when CaptureContract:security.epss-daily-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "aa552caa1de14412926c740df3603954",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:41:37.764102Z",
              "line_artifact_digest": "sha256:497b17fca4cc8417f387950272ff875f6a2ed539abafc7642370da1c90a18de8",
              "triggers": [
                {
                  "trigger": "Trigger:security.epss-landed",
                  "artifact_digest": "sha256:c91316aaa87c937e24e5722510dbb12fd8607be2f56bec0ddb07b7a3236321d1"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "bb147a2b43f947d18d09370ef75d1e15",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:33.518489Z",
              "line_artifact_digest": "sha256:9036510138146f05ac71f0fa1a879170c882604e9cb56e8f28fdb4469492b3d6",
              "triggers": [
                {
                  "trigger": "Trigger:security.epss-landed",
                  "artifact_digest": "sha256:c91316aaa87c937e24e5722510dbb12fd8607be2f56bec0ddb07b7a3236321d1"
                }
              ],
              "evaluated_until": "2026-10-19T21:41:17.561710Z",
              "stopped_at": "2026-10-19T21:41:17.561710Z",
              "stop_reason": "line_changed",
              "detail": "The Line changed; enable it again to run its new version automatically.",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "16397d3a23374245847077695050018f",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:36:08.791691Z",
              "line_artifact_digest": "sha256:eed2aa0a25b598e38d624aa382b7f09cb3342fac9ec2e91b075c486d8c3cb07d",
              "triggers": [
                {
                  "trigger": "Trigger:security.epss-landed",
                  "artifact_digest": "sha256:c91316aaa87c937e24e5722510dbb12fd8607be2f56bec0ddb07b7a3236321d1"
                }
              ],
              "evaluated_until": "2026-10-19T21:37:32.110192Z",
              "stopped_at": "2026-10-19T21:37:32.110192Z",
              "stop_reason": "line_changed",
              "detail": "The Line changed; enable it again to run its new version automatically.",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "347c9046efb14032b575fca2f8d03139",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:46.323248Z",
              "line_artifact_digest": "sha256:41df027e1aac579ac698067f31a522a3388c3c3707da33cb854cac76bb2a6092",
              "triggers": [
                {
                  "trigger": "Trigger:security.epss-landed",
                  "artifact_digest": "sha256:c91316aaa87c937e24e5722510dbb12fd8607be2f56bec0ddb07b7a3236321d1"
                }
              ],
              "evaluated_until": "2026-10-19T21:35:37.171469Z",
              "stopped_at": "2026-10-19T21:35:37.171469Z",
              "stop_reason": "line_changed",
              "detail": "The Line changed; enable it again to run its new version automatically.",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 4,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-fd36335269ed1aa8234a5b4cae933b3ad75f022c740941dbec80ae49e5ef4b22",
              "procedure": "Procedure:security.epss-triage",
              "status": "succeeded",
              "started_at": "2026-10-19T21:40:33.667031Z",
              "line": "Line:security.epss-triage",
              "nodes_done": 6
            },
            {
              "run": "RUN-c9024e78e0511f51c457f9b82629a7fd1ce158da249b7565ebd274724a3af851",
              "procedure": "Procedure:security.epss-triage",
              "status": "succeeded",
              "started_at": "2026-10-19T21:36:30.340245Z",
              "line": "Line:security.epss-triage",
              "nodes_done": 6
            },
            {
              "run": "RUN-653d9fa615a373030e0a97874792e49b969ae901a2da6ca9386f30858e881fb8",
              "procedure": "Procedure:security.epss-triage",
              "status": "succeeded",
              "started_at": "2026-10-19T21:33:46.882866Z",
              "line": "Line:security.epss-triage",
              "nodes_done": 6
            }
          ],
          "runs_total": 3,
          "next": [
            "cx.get(\"Procedure:security.epss-triage\")",
            "cx.get(\"Trigger:security.epss-landed\")",
            "cx.get(\"ProcedureRun:RUN-fd36335269ed1aa8234a5b4cae933b3ad75f022c740941dbec80ae49e5ef4b22\")",
            "cx.get(\"Line:security.epss-triage\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.865080Z"
      }
    ]
  }
});
