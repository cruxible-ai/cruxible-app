// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch a5f11614
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
              "fires": "when CaptureContract:security.kev-http-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "7ade5bc189bd404fbd09800e7c88381a",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:36.575580Z",
              "line_artifact_digest": "sha256:c8a5d8445c8bfe1f11ef82d7a8d1ecffd39fe10ae40ee99015d98e95c0419ac6",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed-attention",
                  "artifact_digest": "sha256:0be21dbeeaf3aec5175a04bf82f28e1fb456e40906e954c1ae88cdde0804411b"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "80637bbfe3b94a0aa9ab9bfd1aeb9d86",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:43.153847Z",
              "line_artifact_digest": "sha256:e8f9bcc1cc2111bddf0e44504edbde5122d08328c970bf42cab66566441f695e",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed-attention",
                  "artifact_digest": "sha256:0be21dbeeaf3aec5175a04bf82f28e1fb456e40906e954c1ae88cdde0804411b"
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
              "run": "RUN-b877060acac171eb745a75fbd02deb58c858083b00f802df3b28c7a964cbb192",
              "procedure": "Procedure:security.kev-attention",
              "status": "succeeded",
              "started_at": "2026-10-19T21:40:15.617899Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            },
            {
              "run": "RUN-2838d0925f769bcd3052f4dff6fe08e9faf99edfd5bdf5598072f2d0049884c7",
              "procedure": "Procedure:security.kev-attention",
              "status": "succeeded",
              "started_at": "2026-10-19T21:39:55.631284Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            },
            {
              "run": "RUN-3ef16fb914d4d6b4717069e93da171862463ff2aa86cd7bdaa36d8911ed2aaf7",
              "procedure": "Procedure:security.kev-attention",
              "status": "succeeded",
              "started_at": "2026-10-19T21:36:18.947005Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            },
            {
              "run": "RUN-066ba44a43e32f3fd454ff4d4645c181294e6ed80f8206d1fcd7f05b1ab3d54e",
              "procedure": "Procedure:security.kev-attention",
              "status": "succeeded",
              "started_at": "2026-10-19T21:35:34.886966Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            },
            {
              "run": "RUN-489b8d4cb1113b30da4af760f893ab64b7afdeb53ee3828588c9f2daba24686e",
              "procedure": "Procedure:security.kev-attention",
              "status": "succeeded",
              "started_at": "2026-10-19T21:35:32.256411Z",
              "line": "Line:security.kev-attention",
              "nodes_done": 8
            }
          ],
          "runs_total": 9,
          "next": [
            "cx.get(\"Procedure:security.kev-attention\")",
            "cx.get(\"Trigger:security.kev-landed-attention\")",
            "cx.get(\"ProcedureRun:RUN-b877060acac171eb745a75fbd02deb58c858083b00f802df3b28c7a964cbb192\")",
            "cx.get(\"Line:security.kev-attention\", detail=\"runs\")",
            "cx.get(\"Line:security.kev-attention\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:34.093178Z"
      }
    ]
  }
});
