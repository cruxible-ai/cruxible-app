// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch d66026da
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Runbook:security.start"
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
        "ref": "Runbook:security.start",
        "kind": "runbook",
        "detail": "summary",
        "card": {
          "runbook": "Runbook:security.start",
          "description": "Seed a fresh instance: import the SBOM, ask OSV what affects it, then read KEV and EPSS for what it found.",
          "lifecycle": "live",
          "steps": [
            {
              "step": 1,
              "target": "Line:security.sbom-import.app",
              "availability": "available"
            },
            {
              "step": 2,
              "target": "Line:security.osv-query",
              "availability": "available"
            },
            {
              "step": 3,
              "target": "Line:security.kev-triage",
              "availability": "available"
            },
            {
              "step": 4,
              "target": "Line:security.epss-triage",
              "availability": "available"
            }
          ],
          "triggers": [
            {
              "trigger": "Trigger:security.start-weekly",
              "version": 1,
              "fires": "on cron 0 5 * * 1 (UTC)"
            }
          ],
          "triggers_total": 1,
          "recent_runs": [
            {
              "tag": "cruxible-runbook-run-v1",
              "run_id": "RBR-ef72ad7141d8478891996e71c993450b",
              "runbook": "security.start",
              "runbook_artifact_digest": "sha256:bae11638b7cff95f703fd8dfa7c9d0d57221803296c567cf2359a02325b47b8b",
              "mode": "manual",
              "started_at": "2026-11-07T18:00:00Z",
              "finished_at": "2026-11-07T18:00:00Z",
              "status": "completed",
              "steps": [
                {
                  "tag": "cruxible-runbook-step-outcome-v1",
                  "step": 1,
                  "target": {
                    "kind": "line",
                    "line": {
                      "target": {
                        "kind": "Line",
                        "name": "security.sbom-import.app"
                      }
                    }
                  },
                  "status": "succeeded",
                  "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
                  "run_status": "succeeded"
                },
                {
                  "tag": "cruxible-runbook-step-outcome-v1",
                  "step": 2,
                  "target": {
                    "kind": "line",
                    "line": {
                      "target": {
                        "kind": "Line",
                        "name": "security.osv-query"
                      }
                    }
                  },
                  "status": "succeeded",
                  "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                  "run_status": "succeeded"
                },
                {
                  "tag": "cruxible-runbook-step-outcome-v1",
                  "step": 3,
                  "target": {
                    "kind": "line",
                    "line": {
                      "target": {
                        "kind": "Line",
                        "name": "security.kev-triage"
                      }
                    }
                  },
                  "status": "succeeded",
                  "run_id": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
                  "run_status": "succeeded"
                },
                {
                  "tag": "cruxible-runbook-step-outcome-v1",
                  "step": 4,
                  "target": {
                    "kind": "line",
                    "line": {
                      "target": {
                        "kind": "Line",
                        "name": "security.epss-triage"
                      }
                    }
                  },
                  "status": "succeeded",
                  "run_id": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
                  "run_status": "succeeded"
                }
              ]
            }
          ],
          "runs_more": false,
          "next": [
            "cx.get(\"Line:security.sbom-import.app\")",
            "cx.get(\"Line:security.osv-query\")",
            "cx.get(\"Line:security.kev-triage\")",
            "cx.get(\"Line:security.epss-triage\")",
            "cx.get(\"Trigger:security.start-weekly\")",
            "cx.get(\"ProcedureRun:RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5\")",
            "cx.get(\"Runbook:security.start\", detail=\"history\")"
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
            "recent_runs",
            "runs_more"
          ]
        },
        "evaluation_time": "2026-11-07T22:22:59.968573Z"
      }
    ]
  }
});
