// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 369acafd
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.harden"
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
        "ref": "Line:security.harden",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.harden",
          "identity_digest": "sha256:24678f9be989053275627387cff7ac3590db5842a3399180fce2a690fcadaed6",
          "lifecycle": "live",
          "procedure": "Procedure:security.harden",
          "authority": "observe",
          "trigger": "capture_landing+cron",
          "triggers": [
            {
              "trigger": "Trigger:security.harden-daily",
              "version": 1,
              "fires": "on cron 40 7 * * * (UTC)"
            },
            {
              "trigger": "Trigger:security.harden-on-registry",
              "version": 1,
              "fires": "when CaptureContract:security.pypi-release-v1 lands"
            },
            {
              "trigger": "Trigger:security.harden-on-snapshot",
              "version": 1,
              "fires": "when CaptureContract:security.repo-snapshot-v1 lands"
            }
          ],
          "triggers_total": 3,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "58b7eb44a1084b8986088b04afe1d8fa",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:35.039729Z",
              "line_artifact_digest": "sha256:4b682fc19420e48ded976f7be0558d64f7e28f8ad110a133a9224bad317c85df",
              "triggers": [
                {
                  "trigger": "Trigger:security.harden-daily",
                  "artifact_digest": "sha256:0c88e2830f4404d3dd71ecfb2381b87bff8c7d6fef8a2d25fe4c1112365621c6"
                },
                {
                  "trigger": "Trigger:security.harden-on-registry",
                  "artifact_digest": "sha256:605566f3a89f464f6b1d1294223ade0701d0432a2cb18adc9ac132ce4ff6709b"
                },
                {
                  "trigger": "Trigger:security.harden-on-snapshot",
                  "artifact_digest": "sha256:133ac26bc706947759c74c02c0407e4a5a3f3634cad6edb8376e8ec9e303e3a9"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:24.632253Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "90567d97b0254fc99bfe65699c111d7f",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:57.443237Z",
              "line_artifact_digest": "sha256:2ef400e30067bb36ee38f7266ec7139fbc1b42a7c63a6a6cca50bb628c683dfb",
              "triggers": [
                {
                  "trigger": "Trigger:security.harden-daily",
                  "artifact_digest": "sha256:0c88e2830f4404d3dd71ecfb2381b87bff8c7d6fef8a2d25fe4c1112365621c6"
                },
                {
                  "trigger": "Trigger:security.harden-on-registry",
                  "artifact_digest": "sha256:605566f3a89f464f6b1d1294223ade0701d0432a2cb18adc9ac132ce4ff6709b"
                },
                {
                  "trigger": "Trigger:security.harden-on-snapshot",
                  "artifact_digest": "sha256:133ac26bc706947759c74c02c0407e4a5a3f3634cad6edb8376e8ec9e303e3a9"
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
              "run": "RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d",
              "procedure": "Procedure:security.harden",
              "status": "succeeded",
              "started_at": "2026-10-19T21:48:00.649051Z",
              "line": "Line:security.harden",
              "nodes_done": 9
            },
            {
              "run": "RUN-3dd954f263f43b5b6d16cf38c8e0c2eca5c04bab5eb9dac070a638e56060ceb6",
              "procedure": "Procedure:security.harden",
              "status": "succeeded",
              "started_at": "2026-10-19T21:47:42.132628Z",
              "line": "Line:security.harden",
              "nodes_done": 9
            },
            {
              "run": "RUN-9ad01d38bae08d506822b602e3e13377f5592ee1b900ad6afbe3906ca1aae25f",
              "procedure": "Procedure:security.harden",
              "status": "succeeded",
              "started_at": "2026-10-19T21:47:28.514152Z",
              "line": "Line:security.harden",
              "nodes_done": 9
            },
            {
              "run": "RUN-44a856e6d3bfc3ca3d474f12cce232448fd85c3ca2bacf23a55a78d92f476bc4",
              "procedure": "Procedure:security.harden",
              "status": "succeeded",
              "started_at": "2026-10-19T21:47:13.595706Z",
              "line": "Line:security.harden",
              "nodes_done": 9
            },
            {
              "run": "RUN-101442bd9a7994a6ca70b30e507d9392a6a1b20658ad43ca240d4c7de84201ec",
              "procedure": "Procedure:security.harden",
              "status": "succeeded",
              "started_at": "2026-10-19T21:47:03.668443Z",
              "line": "Line:security.harden",
              "nodes_done": 9
            }
          ],
          "runs_total": 13,
          "next": [
            "cx.get(\"Procedure:security.harden\")",
            "cx.get(\"Trigger:security.harden-daily\")",
            "cx.get(\"Trigger:security.harden-on-registry\")",
            "cx.get(\"Trigger:security.harden-on-snapshot\")",
            "cx.get(\"ProcedureRun:RUN-a912f5342d047ab6122b92d0375db47c13566e240f2eab45ef216a701775167d\")",
            "cx.get(\"Line:security.harden\", detail=\"runs\")",
            "cx.get(\"Line:security.harden\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.949988Z"
      }
    ]
  }
});
