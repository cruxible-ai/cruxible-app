// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 6d8c0937
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Mandate:security.kev-triage-settle"
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
        "ref": "Mandate:security.kev-triage-settle",
        "kind": "mandate",
        "detail": "summary",
        "card": {
          "mandate": "ProcedureMandate:security.kev-triage-settle",
          "line": "Line:security.kev-triage@sha256:bfd95a272507803b77568b19c1278f51d9ad9748ae566aeb0205f6001a6d1593",
          "grants": "settle",
          "lifecycle": "live",
          "state": "active",
          "valid_from": "2026-11-06T00:00:00Z",
          "expires_at": "2027-02-05T00:00:00Z",
          "namespace": [
            "claims"
          ],
          "scope": [
            {
              "claim_type": "ClaimType:security.vulnerability.kev_date_added",
              "changes": {
                "create": {
                  "basis": [
                    "extracted"
                  ]
                },
                "revise": {
                  "basis": [
                    "extracted"
                  ]
                },
                "retire": {
                  "basis": [
                    "absence"
                  ]
                }
              },
              "binds": "subject"
            },
            {
              "claim_type": "ClaimType:security.vulnerability.kev_due_date",
              "changes": {
                "create": {
                  "basis": [
                    "extracted"
                  ]
                },
                "revise": {
                  "basis": [
                    "extracted"
                  ]
                },
                "retire": {
                  "basis": [
                    "absence"
                  ]
                }
              },
              "binds": "subject"
            },
            {
              "claim_type": "ClaimType:security.vulnerability.kev_ransomware_use",
              "changes": {
                "create": {
                  "basis": [
                    "extracted"
                  ]
                },
                "revise": {
                  "basis": [
                    "extracted"
                  ]
                }
              },
              "binds": "subject"
            },
            {
              "claim_type": "ClaimType:security.vulnerability.listed_in",
              "changes": {
                "create": {
                  "basis": [
                    "extracted",
                    "absence"
                  ]
                },
                "revise": {
                  "basis": [
                    "extracted",
                    "absence"
                  ]
                }
              },
              "binds": "subject"
            }
          ],
          "subjects": "expected",
          "next": [
            "cx.get(\"Line:security.kev-triage\")",
            "cx.get(\"ProcedureMandate:security.kev-triage-settle\", detail=\"history\")"
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
        "evaluation_time": "2026-11-08T19:48:01.730199Z"
      }
    ]
  }
});
