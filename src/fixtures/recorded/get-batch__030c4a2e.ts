// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 61233a0f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:6a9456d2888de9a07bcaa61ec504ca24476f0e47492d45f2ae95d7e08a32fd7f"
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
        "ref": "Proposal:sha256:6a9456d2888de9a07bcaa61ec504ca24476f0e47492d45f2ae95d7e08a32fd7f",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:6a9456d2888de9a07bcaa61ec504ca24476f0e47492d45f2ae95d7e08a32fd7f",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "owner",
          "admitted_at": "2026-10-09T11:59:00.000000Z",
          "generation": 13,
          "changes": [
            {
              "path": "lines/security.epss-triage.json",
              "change": "create"
            },
            {
              "path": "lines/security.kev-triage.json",
              "change": "create"
            },
            {
              "path": "lines/security.osv-query.json",
              "change": "create"
            },
            {
              "path": "lines/security.sbom-import.app.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.epss-triage-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.epss-triage-settle.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.kev-triage-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.kev-triage-settle.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.osv-query-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.osv-query-settle.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.sbom-import.app-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.sbom-import.app-settle.json",
              "change": "create"
            },
            {
              "path": "runbooks/security.start.json",
              "change": "create"
            },
            {
              "path": "triggers/security.epss-daily.json",
              "change": "create"
            },
            {
              "path": "triggers/security.kev-daily.json",
              "change": "create"
            },
            {
              "path": "triggers/security.osv-daily.json",
              "change": "create"
            }
          ],
          "next": []
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
        "evaluation_time": "2026-11-07T22:23:00.370225Z"
      }
    ]
  }
});
