// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 2c88ea8f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Runbook:security.start-reversed"
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
        "ref": "Runbook:security.start-reversed",
        "kind": "runbook",
        "detail": "summary",
        "card": {
          "runbook": "Runbook:security.start-reversed",
          "description": "The start Lines in reverse order.",
          "lifecycle": "live",
          "steps": [
            {
              "step": 1,
              "target": "Line:security.epss-triage",
              "availability": "available"
            },
            {
              "step": 2,
              "target": "Line:security.kev-triage",
              "availability": "available"
            },
            {
              "step": 3,
              "target": "Line:security.osv-query",
              "availability": "available"
            },
            {
              "step": 4,
              "target": "Line:security.sbom-import.app",
              "availability": "available"
            }
          ],
          "triggers": [],
          "triggers_total": 0,
          "recent_runs": [],
          "runs_more": false,
          "next": [
            "cx.get(\"Line:security.epss-triage\")",
            "cx.get(\"Line:security.kev-triage\")",
            "cx.get(\"Line:security.osv-query\")",
            "cx.get(\"Line:security.sbom-import.app\")",
            "cx.get(\"Runbook:security.start-reversed\", detail=\"history\")"
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
        "evaluation_time": "2026-11-07T22:22:59.989941Z"
      }
    ]
  }
});
