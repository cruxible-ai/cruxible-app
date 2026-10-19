// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch bdc8c4ff
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Line:security.cve-applicability",
      "Line:security.epss-daily",
      "Line:security.epss-triage",
      "Line:security.harden",
      "Line:security.kev-attention",
      "Line:security.kev-daily",
      "Line:security.kev-triage",
      "Line:security.osv-applicability",
      "Line:security.registry-parse.cruxible",
      "Line:security.registry-parse.cruxible-client",
      "Line:security.registry-pull.cruxible",
      "Line:security.registry-pull.cruxible-client",
      "Line:security.repo-parse.cruxible-ci",
      "Line:security.repo-parse.cruxible-released",
      "Line:security.repo-parse.cruxible-v0.3.2-manifest",
      "Line:security.repo-pull.cruxible-ci",
      "Line:security.sbom-import"
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
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
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
        "evaluation_time": "2026-10-19T22:16:33.346063Z"
      },
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
        "evaluation_time": "2026-10-19T22:16:33.359469Z"
      },
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
        "evaluation_time": "2026-10-19T22:16:33.377868Z"
      },
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
        "evaluation_time": "2026-10-19T22:16:33.401811Z"
      },
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
        "evaluation_time": "2026-10-19T22:16:33.438785Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.kev-daily",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.kev-daily",
          "identity_digest": "sha256:c63120b67657fb95a7398ef08bbc3527b2340d0d795518c4b4c83461cc69d8db",
          "lifecycle": "live",
          "procedure": "Procedure:security.kev-acquire",
          "authority": "observe",
          "trigger": "cadence+cron",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-daily",
              "version": 1,
              "fires": "on cron 17 14 * * * (UTC)"
            },
            {
              "trigger": "Trigger:security.kev-gate-cadence",
              "version": 1,
              "fires": "every 30s"
            }
          ],
          "triggers_total": 2,
          "triggers_inactive": "not enabled",
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "77948173a55842b1a3565d52c3ef0e45",
              "state": "disabled",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:33:57.335780Z",
              "line_artifact_digest": "sha256:f5fda076bbfb31a028c2b601796d437b76cd78086d9a848706705fb084b7d62a",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-daily",
                  "artifact_digest": "sha256:3b3778be898867812e3745ba1060d6d91a508e12340d6d9e64461a1f1834a2ad"
                },
                {
                  "trigger": "Trigger:security.kev-gate-cadence",
                  "artifact_digest": "sha256:ac5c5fdefdbdd48c49c43f37c50e297e7f7902da20f614b58feffd6d56cedab7"
                }
              ],
              "evaluated_until": "2026-10-19T21:35:35.925718Z",
              "stopped_at": "2026-10-19T21:35:35.925718Z",
              "stop_reason": "disabled",
              "detail": "Disabled.",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "d639559fc4f546d9804b5ecc04f27efc",
              "state": "disabled",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:33:01.558913Z",
              "line_artifact_digest": "sha256:f5fda076bbfb31a028c2b601796d437b76cd78086d9a848706705fb084b7d62a",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-daily",
                  "artifact_digest": "sha256:3b3778be898867812e3745ba1060d6d91a508e12340d6d9e64461a1f1834a2ad"
                },
                {
                  "trigger": "Trigger:security.kev-gate-cadence",
                  "artifact_digest": "sha256:ac5c5fdefdbdd48c49c43f37c50e297e7f7902da20f614b58feffd6d56cedab7"
                }
              ],
              "evaluated_until": "2026-10-19T21:33:33.997154Z",
              "stopped_at": "2026-10-19T21:33:33.997154Z",
              "stop_reason": "disabled",
              "detail": "Disabled.",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "528c042067a9428e8064e3b6eaf2ceb0",
              "state": "disabled",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:32:06.099173Z",
              "line_artifact_digest": "sha256:f5fda076bbfb31a028c2b601796d437b76cd78086d9a848706705fb084b7d62a",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-daily",
                  "artifact_digest": "sha256:3b3778be898867812e3745ba1060d6d91a508e12340d6d9e64461a1f1834a2ad"
                },
                {
                  "trigger": "Trigger:security.kev-gate-cadence",
                  "artifact_digest": "sha256:ac5c5fdefdbdd48c49c43f37c50e297e7f7902da20f614b58feffd6d56cedab7"
                }
              ],
              "evaluated_until": "2026-10-19T21:32:34.882502Z",
              "stopped_at": "2026-10-19T21:32:34.882502Z",
              "stop_reason": "disabled",
              "detail": "Disabled.",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 3,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-8538b6573e629b6a8c358285f45ef61d605f3164ffb33eab6b8f0c1a12bea10e",
              "procedure": "Procedure:security.kev-acquire",
              "status": "succeeded",
              "started_at": "2026-10-19T21:40:14.568694Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            },
            {
              "run": "RUN-05e9248dbecf64bda41d7b8ff2ea5704f4f49e9a21d570f078f1374c3e277473",
              "procedure": "Procedure:security.kev-acquire",
              "status": "succeeded",
              "started_at": "2026-10-19T21:39:53.820664Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            },
            {
              "run": "RUN-096a2f14dd2be5d1af4d2396d8b8218b366d01a7548ca7efeabab81ad78ca98d",
              "procedure": "Procedure:security.kev-acquire",
              "status": "succeeded",
              "started_at": "2026-10-19T21:36:17.191272Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            },
            {
              "run": "RUN-e7eeb82801224537dc991ff3c5d5052455cfd416a75559e75275c0e56548260c",
              "procedure": "Procedure:security.kev-acquire",
              "status": "succeeded",
              "started_at": "2026-10-19T21:35:33.247290Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            },
            {
              "run": "RUN-fafb26f4db97c637f6d823637071eb1c24000ec17d7b608a7001f9391d06f1d5",
              "procedure": "Procedure:security.kev-acquire",
              "status": "succeeded",
              "started_at": "2026-10-19T21:35:27.863127Z",
              "line": "Line:security.kev-daily",
              "nodes_done": 3
            }
          ],
          "runs_total": 9,
          "next": [
            "cx.get(\"Procedure:security.kev-acquire\")",
            "cx.get(\"Trigger:security.kev-daily\")",
            "cx.get(\"Trigger:security.kev-gate-cadence\")",
            "cx.get(\"ProcedureRun:RUN-8538b6573e629b6a8c358285f45ef61d605f3164ffb33eab6b8f0c1a12bea10e\")",
            "cx.get(\"Line:security.kev-daily\", detail=\"runs\")",
            "cx.get(\"Line:security.kev-daily\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.469226Z"
      },
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
          "authority": "settle",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.kev-landed",
              "version": 1,
              "fires": "when CaptureContract:security.kev-http-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "2bb35406d9d34e1fa304b32b1b9203de",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:38.118775Z",
              "line_artifact_digest": "sha256:9db983cf7b6f73c1f19395c011a1f446fc9dd95e748ffc5ac3850da44187296f",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed",
                  "artifact_digest": "sha256:c1f77f6596acc17a1e15a3b40e3eb4182c4f28275f1986ef65da89e382990d1f"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "604baa30f6ac4bc5b0ec4f474204085e",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:36:02.404672Z",
              "line_artifact_digest": "sha256:b2f6c403df77ae79e3392aff28eeac795339d34628d2b2ff998aabee964dc4d0",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed",
                  "artifact_digest": "sha256:c1f77f6596acc17a1e15a3b40e3eb4182c4f28275f1986ef65da89e382990d1f"
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
              "enablement": "450d71deb6234eea99f079ed4701adc3",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:41.574587Z",
              "line_artifact_digest": "sha256:40bc4f6e6399786c02e32a2c7baf044091caa6eb17efb3cf429a26e94214a0ea",
              "triggers": [
                {
                  "trigger": "Trigger:security.kev-landed",
                  "artifact_digest": "sha256:c1f77f6596acc17a1e15a3b40e3eb4182c4f28275f1986ef65da89e382990d1f"
                }
              ],
              "evaluated_until": "2026-10-19T21:35:35.925718Z",
              "stopped_at": "2026-10-19T21:35:35.925718Z",
              "stop_reason": "line_changed",
              "detail": "The Line changed; enable it again to run its new version automatically.",
              "pending_automatic": 0,
              "pending_explicit": 0
            }
          ],
          "enablements_total": 3,
          "due": 0,
          "waiting": 0,
          "occurrences": [],
          "recent_runs": [
            {
              "run": "RUN-8d834321eb0ff9d3c6a9e152dd53b3cd821d63b22ba72181188d01c93201a97a",
              "procedure": "Procedure:security.kev-triage",
              "status": "succeeded",
              "started_at": "2026-10-19T21:40:15.617945Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            },
            {
              "run": "RUN-dfcc82cbf1e0322fa626ce5004e660b351ffb392ca9d6b181afbd689509de9ff",
              "procedure": "Procedure:security.kev-triage",
              "status": "succeeded",
              "started_at": "2026-10-19T21:39:55.631224Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            },
            {
              "run": "RUN-f2d6ddcd37361cc6605a7a4fafc839d162253141d97fc4fb245f88852e23351f",
              "procedure": "Procedure:security.kev-triage",
              "status": "succeeded",
              "started_at": "2026-10-19T21:36:18.946893Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            },
            {
              "run": "RUN-27dd9a6bde7ecd95d2690c84730b26d60f75784320c0fb1d26d3a61e7d75ac45",
              "procedure": "Procedure:security.kev-triage",
              "status": "halted",
              "started_at": "2026-10-19T21:35:34.886932Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            },
            {
              "run": "RUN-9fb8cafa532edd38d46ff460eb610f20da5b07d30ae4d52aea76ae629a8c5b46",
              "procedure": "Procedure:security.kev-triage",
              "status": "halted",
              "started_at": "2026-10-19T21:35:32.256390Z",
              "line": "Line:security.kev-triage",
              "nodes_done": 6
            }
          ],
          "runs_total": 9,
          "next": [
            "cx.get(\"Procedure:security.kev-triage\")",
            "cx.get(\"Trigger:security.kev-landed\")",
            "cx.get(\"ProcedureRun:RUN-8d834321eb0ff9d3c6a9e152dd53b3cd821d63b22ba72181188d01c93201a97a\")",
            "cx.get(\"Line:security.kev-triage\", detail=\"runs\")",
            "cx.get(\"Line:security.kev-triage\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.494376Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.osv-applicability",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.osv-applicability",
          "identity_digest": "sha256:4b3e9d71b33f4edc5a709bd8dd53f89a44dcf9c93f893799bae9cc9e6f39941e",
          "lifecycle": "live",
          "procedure": "Procedure:security.osv-applicability",
          "authority": "propose",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.osv-daily",
              "version": 1,
              "fires": "on cron 30 15 * * * (UTC)"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "d370090b3143439990b18c9307815ee3",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:39.682795Z",
              "line_artifact_digest": "sha256:880814d995117aa5ef50af93da1232a534bf7381615cb0a3df8d90d6d8379c6d",
              "triggers": [
                {
                  "trigger": "Trigger:security.osv-daily",
                  "artifact_digest": "sha256:2a9ea290d7d1d411ffc8f5513a240c528247ead05bc5126d058eb2c6cc761bc1"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:24.632253Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "5190d5dadf314d618eacb529a729afa2",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:49.465736Z",
              "line_artifact_digest": "sha256:84828d9160abf9c50756929dcf6d5facd21d6f704e8ea0b35748be009c91d74a",
              "triggers": [
                {
                  "trigger": "Trigger:security.osv-daily",
                  "artifact_digest": "sha256:2a9ea290d7d1d411ffc8f5513a240c528247ead05bc5126d058eb2c6cc761bc1"
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
              "run": "RUN-b1de4d22eb457253cbb65a8000c3328baf113847ee5e54fe0271c68abf0d2531",
              "procedure": "Procedure:security.osv-applicability",
              "status": "succeeded",
              "started_at": "2026-10-19T21:41:14.317003Z",
              "line": "Line:security.osv-applicability",
              "nodes_done": 8
            },
            {
              "run": "RUN-62d561ca54392667d61e11aa95a9bcdaf900f0717d259a7652b9cea4b6ecd96d",
              "procedure": "Procedure:security.osv-applicability",
              "status": "halted",
              "started_at": "2026-10-19T21:31:16.321957Z",
              "line": "Line:security.osv-applicability",
              "nodes_done": 8
            },
            {
              "run": "RUN-cf6344cb3227499d4636d2b59946bb1218953c462a92304337452a60e738295d",
              "procedure": "Procedure:security.osv-applicability",
              "status": "halted",
              "started_at": "2026-10-19T21:30:58.282407Z",
              "line": "Line:security.osv-applicability",
              "nodes_done": 8
            },
            {
              "run": "RUN-52cd4c23ef6f01fcbb49f610ffb586b671a3b714ace71194400fdbda3f239fcb",
              "procedure": "Procedure:security.osv-applicability",
              "status": "succeeded",
              "started_at": "2026-10-19T21:30:42.107298Z",
              "line": "Line:security.osv-applicability",
              "nodes_done": 8
            }
          ],
          "runs_total": 4,
          "next": [
            "cx.get(\"Procedure:security.osv-applicability\")",
            "cx.get(\"Trigger:security.osv-daily\")",
            "cx.get(\"ProcedureRun:RUN-b1de4d22eb457253cbb65a8000c3328baf113847ee5e54fe0271c68abf0d2531\")",
            "cx.get(\"Line:security.osv-applicability\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.522604Z"
      },
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
              "fires": "when CaptureContract:security.pypi-release-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "7764bb2d6ac54b959bcf7db43d733fe0",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:41.223122Z",
              "line_artifact_digest": "sha256:b7c6633ac16fd57ff44f40b21a98993fc6448bd852dc457e602461ef6120e561",
              "triggers": [
                {
                  "trigger": "Trigger:security.registry-landed.cruxible",
                  "artifact_digest": "sha256:ad428bcd542bc550bae00b558a28bed406ae6e12f702bc2f7bee42c1ef216b72"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "72847f390b3441af87df9ba5d9488650",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:54.233251Z",
              "line_artifact_digest": "sha256:b873178d919b568c3ce59bd763086e60b71fd3eb58a0358cd0d5eac99bd7d1c1",
              "triggers": [
                {
                  "trigger": "Trigger:security.registry-landed.cruxible",
                  "artifact_digest": "sha256:ad428bcd542bc550bae00b558a28bed406ae6e12f702bc2f7bee42c1ef216b72"
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
              "run": "RUN-b1a0303ece4a0ebad7fa749cbebdda9b1b65c1f288ca9aeeb675ff4b0b45b2c0",
              "procedure": "Procedure:security.registry-parse",
              "status": "halted",
              "started_at": "2026-10-19T21:44:14.724234Z",
              "line": "Line:security.registry-parse.cruxible",
              "nodes_done": 3
            },
            {
              "run": "RUN-eaa68a6eec5a67a64105ad675371bc8ae41a531bba03d9499d82f315a14b7cbf",
              "procedure": "Procedure:security.registry-parse",
              "status": "succeeded",
              "started_at": "2026-10-19T21:43:58.363337Z",
              "line": "Line:security.registry-parse.cruxible",
              "nodes_done": 7
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.registry-parse\")",
            "cx.get(\"Trigger:security.registry-landed.cruxible\")",
            "cx.get(\"ProcedureRun:RUN-b1a0303ece4a0ebad7fa749cbebdda9b1b65c1f288ca9aeeb675ff4b0b45b2c0\")",
            "cx.get(\"Line:security.registry-parse.cruxible\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.552769Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-parse.cruxible-client",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-parse.cruxible-client",
          "identity_digest": "sha256:86e1fd12c4683a2dd9392792ca0b973be8bce70e2d0361a503e78860df6e2b7a",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-landed.cruxible-client",
              "version": 1,
              "fires": "when CaptureContract:security.pypi-release-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "cc7329ec169a4cf0afee0caede9d85f3",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:43.637567Z",
              "line_artifact_digest": "sha256:1e95a12846ee3776fb5e87d91f1ed85372efb9987b1297b97b678f03fcd69d29",
              "triggers": [
                {
                  "trigger": "Trigger:security.registry-landed.cruxible-client",
                  "artifact_digest": "sha256:e9ed70b118ffc51dde6a9becfe9fbf64741e7407155cc60a92b1aceb21d977f9"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "c85c2859cb6b4fc7aa7321b31f3955af",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:55.855446Z",
              "line_artifact_digest": "sha256:8e7d483eb1182f04c65e43300154664c2f6e5a7aa3b2587a2bf258a0e7301d6b",
              "triggers": [
                {
                  "trigger": "Trigger:security.registry-landed.cruxible-client",
                  "artifact_digest": "sha256:e9ed70b118ffc51dde6a9becfe9fbf64741e7407155cc60a92b1aceb21d977f9"
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
              "run": "RUN-b71612ab5ebdffbb612f1bb8677d51b22e928786bbffabf329fbbc87d08b146b",
              "procedure": "Procedure:security.registry-parse",
              "status": "succeeded",
              "started_at": "2026-10-19T21:44:13.315942Z",
              "line": "Line:security.registry-parse.cruxible-client",
              "nodes_done": 7
            },
            {
              "run": "RUN-74d8895d2385bbda46a2462b29f79ac97e5feb52132393b9353465bf4dd7e0c7",
              "procedure": "Procedure:security.registry-parse",
              "status": "halted",
              "started_at": "2026-10-19T21:43:59.528383Z",
              "line": "Line:security.registry-parse.cruxible-client",
              "nodes_done": 3
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.registry-parse\")",
            "cx.get(\"Trigger:security.registry-landed.cruxible-client\")",
            "cx.get(\"ProcedureRun:RUN-b71612ab5ebdffbb612f1bb8677d51b22e928786bbffabf329fbbc87d08b146b\")",
            "cx.get(\"Line:security.registry-parse.cruxible-client\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.574282Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-pull.cruxible",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-pull.cruxible",
          "identity_digest": "sha256:9326934d523db3025df623266076d2279d41e45d3481896083bf71263c9c19f9",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-pull.cruxible",
              "version": 1,
              "fires": "on cron 20 6 * * * (UTC)"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.registry-acquire\")",
            "cx.get(\"Trigger:security.registry-pull.cruxible\")",
            "cx.get(\"Line:security.registry-pull.cruxible\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.593794Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.registry-pull.cruxible-client",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.registry-pull.cruxible-client",
          "identity_digest": "sha256:542eed13a0c775e99955442a4d2a9c5c327e4674b7de57ff63083440e9b86bbf",
          "lifecycle": "live",
          "procedure": "Procedure:security.registry-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.registry-pull.cruxible-client",
              "version": 1,
              "fires": "on cron 25 6 * * * (UTC)"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.registry-acquire\")",
            "cx.get(\"Trigger:security.registry-pull.cruxible-client\")",
            "cx.get(\"Line:security.registry-pull.cruxible-client\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.604309Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.repo-parse.cruxible-ci",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.repo-parse.cruxible-ci",
          "identity_digest": "sha256:caba99083d262c808697cf95abfea2e8fac5032aff3a9b23da6d09a05b11df18",
          "lifecycle": "live",
          "procedure": "Procedure:security.repo-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.repo-landed.cruxible-ci",
              "version": 1,
              "fires": "when CaptureContract:security.repo-snapshot-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "8c18e82d38014b1a81b65c5e796d70f2",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:45.624622Z",
              "line_artifact_digest": "sha256:1b33c41e43adc83e97603354a3970fae6217b2f5e4ebdcfbad294b3b3e6c303f",
              "triggers": [
                {
                  "trigger": "Trigger:security.repo-landed.cruxible-ci",
                  "artifact_digest": "sha256:689a9518bcca1f19e5bece4f9ba7a6b98ae972db8d89411d278332552257372b"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "d094deb36efe407a9080cab0f942d844",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:52.663230Z",
              "line_artifact_digest": "sha256:d31ba47eedd4b381a6805d2f1b774af61a427a53765488659e46c44ac84d9204",
              "triggers": [
                {
                  "trigger": "Trigger:security.repo-landed.cruxible-ci",
                  "artifact_digest": "sha256:689a9518bcca1f19e5bece4f9ba7a6b98ae972db8d89411d278332552257372b"
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
              "run": "RUN-1fa76ed3d3ab7e9bfbd6c6a24cd69a1e786b67396e49c5e8c09fa765cb71f9ec",
              "procedure": "Procedure:security.repo-parse",
              "status": "halted",
              "started_at": "2026-10-19T21:47:42.132577Z",
              "line": "Line:security.repo-parse.cruxible-ci",
              "nodes_done": 3
            },
            {
              "run": "RUN-f409c5aabf241c1631ef5c4e7caa27deb6b800875d585508efa735c41a1f3a5d",
              "procedure": "Procedure:security.repo-parse",
              "status": "halted",
              "started_at": "2026-10-19T21:47:02.528332Z",
              "line": "Line:security.repo-parse.cruxible-ci",
              "nodes_done": 3
            },
            {
              "run": "RUN-640593fbd694d9ccadf8c69fcd6b0723002f2859da47698598b46961f05f0326",
              "procedure": "Procedure:security.repo-parse",
              "status": "succeeded",
              "started_at": "2026-10-19T21:45:42.923122Z",
              "line": "Line:security.repo-parse.cruxible-ci",
              "nodes_done": 9
            },
            {
              "run": "RUN-47b085009af5fe7eba77f484e8f76897feda7b27635453fb3303cc13c82c9a04",
              "procedure": "Procedure:security.repo-parse",
              "status": "succeeded",
              "started_at": "2026-10-19T21:45:24.569920Z",
              "line": "Line:security.repo-parse.cruxible-ci",
              "nodes_done": 9
            },
            {
              "run": "RUN-61180aba6ed2b48f0393946239c2c0f0a387d9b1b72233d4635ea5fee82f4601",
              "procedure": "Procedure:security.repo-parse",
              "status": "succeeded",
              "started_at": "2026-10-19T21:44:27.682472Z",
              "line": "Line:security.repo-parse.cruxible-ci",
              "nodes_done": 9
            }
          ],
          "runs_total": 5,
          "next": [
            "cx.get(\"Procedure:security.repo-parse\")",
            "cx.get(\"Trigger:security.repo-landed.cruxible-ci\")",
            "cx.get(\"ProcedureRun:RUN-1fa76ed3d3ab7e9bfbd6c6a24cd69a1e786b67396e49c5e8c09fa765cb71f9ec\")",
            "cx.get(\"Line:security.repo-parse.cruxible-ci\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.615131Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.repo-parse.cruxible-released",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.repo-parse.cruxible-released",
          "identity_digest": "sha256:fc811d46a87944b3bc71d7ee63045b674b0f656fcfd98edfae7ff1b0697bee83",
          "lifecycle": "live",
          "procedure": "Procedure:security.repo-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.repo-landed.cruxible-released",
              "version": 1,
              "fires": "when CaptureContract:security.repo-snapshot-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "bd2251c8ea224a19b71e552e9ebc6edb",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:46:30.604228Z",
              "line_artifact_digest": "sha256:5d909476f6c2a4549f13c15b0735d78e37433f5a5ec4de488ffb9265e3c6ba82",
              "triggers": [
                {
                  "trigger": "Trigger:security.repo-landed.cruxible-released",
                  "artifact_digest": "sha256:4e61534915bc98a87a5aa4c2b37ca057d861edd2e2328b74aa71bfff5b643bb9"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
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
              "run": "RUN-cb44fa08669b1533e1f2f52d513c17fe895eba20cb3647bafe33d32aaccb8163",
              "procedure": "Procedure:security.repo-parse",
              "status": "halted",
              "started_at": "2026-10-19T21:47:43.319477Z",
              "line": "Line:security.repo-parse.cruxible-released",
              "nodes_done": 3
            },
            {
              "run": "RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c",
              "procedure": "Procedure:security.repo-parse",
              "status": "succeeded",
              "started_at": "2026-10-19T21:47:00.552880Z",
              "line": "Line:security.repo-parse.cruxible-released",
              "nodes_done": 9
            }
          ],
          "runs_total": 2,
          "next": [
            "cx.get(\"Procedure:security.repo-parse\")",
            "cx.get(\"Trigger:security.repo-landed.cruxible-released\")",
            "cx.get(\"ProcedureRun:RUN-cb44fa08669b1533e1f2f52d513c17fe895eba20cb3647bafe33d32aaccb8163\")",
            "cx.get(\"Line:security.repo-parse.cruxible-released\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.651317Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.repo-parse.cruxible-v0.3.2-manifest",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.repo-parse.cruxible-v0.3.2-manifest",
          "identity_digest": "sha256:34255ed39c2e9fab743f7473998095aee24f05bbfa9359a46afd8c97afaf8d00",
          "lifecycle": "live",
          "procedure": "Procedure:security.repo-parse",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.repo-landed.cruxible-v0.3.2-manifest",
              "version": 1,
              "fires": "when CaptureContract:security.repo-snapshot-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "ff521474207347e8aa4487f574af1b03",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:47:37.049970Z",
              "line_artifact_digest": "sha256:4b79785c9e25ba1076071e20b5c6ca0c6642aec6bd15f57b25721d37e9510eff",
              "triggers": [
                {
                  "trigger": "Trigger:security.repo-landed.cruxible-v0.3.2-manifest",
                  "artifact_digest": "sha256:1fd0a2946ceb150a8bc93e5eb5c481ae9793580f6da45be96fbb84283788fd59"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
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
              "run": "RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6",
              "procedure": "Procedure:security.repo-parse",
              "status": "succeeded",
              "started_at": "2026-10-19T21:47:45.436923Z",
              "line": "Line:security.repo-parse.cruxible-v0.3.2-manifest",
              "nodes_done": 9
            }
          ],
          "runs_total": 1,
          "next": [
            "cx.get(\"Procedure:security.repo-parse\")",
            "cx.get(\"Trigger:security.repo-landed.cruxible-v0.3.2-manifest\")",
            "cx.get(\"ProcedureRun:RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6\")",
            "cx.get(\"Line:security.repo-parse.cruxible-v0.3.2-manifest\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.669241Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.repo-pull.cruxible-ci",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.repo-pull.cruxible-ci",
          "identity_digest": "sha256:af6b8cc03795d4d21499fabdd0c64f783338dbf0ce5f0d02adb19ead87654a3c",
          "lifecycle": "live",
          "procedure": "Procedure:security.repo-acquire",
          "authority": "observe",
          "trigger": "cron",
          "triggers": [
            {
              "trigger": "Trigger:security.repo-pull.cruxible-ci",
              "version": 1,
              "fires": "on cron 5 */6 * * * (UTC)"
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
          "recent_runs": [],
          "runs_total": 0,
          "next": [
            "cx.get(\"Procedure:security.repo-acquire\")",
            "cx.get(\"Trigger:security.repo-pull.cruxible-ci\")",
            "cx.get(\"Line:security.repo-pull.cruxible-ci\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.681177Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "Line:security.sbom-import",
        "kind": "line",
        "detail": "summary",
        "card": {
          "line": "Line:security.sbom-import",
          "identity_digest": "sha256:4a7eb19ffccd074be6ff2e6bffe701d397872ac11c239d8baaa953442acaad27",
          "lifecycle": "live",
          "procedure": "Procedure:security.sbom-import",
          "authority": "propose",
          "trigger": "capture_landing",
          "triggers": [
            {
              "trigger": "Trigger:security.sbom-landed",
              "version": 1,
              "fires": "when CaptureContract:security.cyclonedx-sbom-v1 lands"
            }
          ],
          "triggers_total": 1,
          "occurrence_epoch": 1,
          "enablements": [
            {
              "enablement": "5252a9d22e4746d0bd04dc055e2f6e77",
              "state": "running",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:39:47.256761Z",
              "line_artifact_digest": "sha256:7b1cba07007c936bed0eb103a9b924855144ae4e382cf807e16bd43d31b3167c",
              "triggers": [
                {
                  "trigger": "Trigger:security.sbom-landed",
                  "artifact_digest": "sha256:6d481737fb1ba6a6b113349431d8bfafba780d50cedd6451bd8aebbe982a4d56"
                }
              ],
              "evaluated_until": "2026-10-19T22:16:23.436465Z",
              "pending_automatic": 0,
              "pending_explicit": 0
            },
            {
              "enablement": "3a2b69c513d14d86b8c0423ccb038b5c",
              "state": "stopped",
              "principal_kind": "principal_claim",
              "enabled_by": "gate-owner",
              "enabled_at": "2026-10-19T21:29:47.902280Z",
              "line_artifact_digest": "sha256:32324ea470e8a0f18435c5d78dd60df5bd7dd733dffddf5a306ae459b7db73e2",
              "triggers": [
                {
                  "trigger": "Trigger:security.sbom-landed",
                  "artifact_digest": "sha256:6d481737fb1ba6a6b113349431d8bfafba780d50cedd6451bd8aebbe982a4d56"
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
              "run": "RUN-9a28529f7d1e161b4ed134cc8e738b05ce27d1ff68281d6aff3d63556ff4c73f",
              "procedure": "Procedure:security.sbom-import",
              "status": "succeeded",
              "started_at": "2026-10-19T21:41:06.624703Z",
              "line": "Line:security.sbom-import",
              "nodes_done": 6
            },
            {
              "run": "RUN-4c0f83b0dedc69e2c9b5bbde6bdd222338d81a50e55508fd9ae2c089be06d992",
              "procedure": "Procedure:security.sbom-import",
              "status": "succeeded",
              "started_at": "2026-10-19T21:40:58.505900Z",
              "line": "Line:security.sbom-import",
              "nodes_done": 6
            },
            {
              "run": "RUN-fbc32372a451305ccd67bd61194adbe6ae54c59f02b5fbd802850b52a986bce3",
              "procedure": "Procedure:security.sbom-import",
              "status": "halted",
              "started_at": "2026-10-19T21:30:17.912990Z",
              "line": "Line:security.sbom-import",
              "nodes_done": 6
            },
            {
              "run": "RUN-31e98a0f9f7722295eee192787015a28c06424f403038284a7938eac0eb291be",
              "procedure": "Procedure:security.sbom-import",
              "status": "succeeded",
              "started_at": "2026-10-19T21:30:01.414185Z",
              "line": "Line:security.sbom-import",
              "nodes_done": 6
            }
          ],
          "runs_total": 4,
          "next": [
            "cx.get(\"Procedure:security.sbom-import\")",
            "cx.get(\"Trigger:security.sbom-landed\")",
            "cx.get(\"ProcedureRun:RUN-9a28529f7d1e161b4ed134cc8e738b05ce27d1ff68281d6aff3d63556ff4c73f\")",
            "cx.get(\"Line:security.sbom-import\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:33.691714Z"
      }
    ]
  }
});
