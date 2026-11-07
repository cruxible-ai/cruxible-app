// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c7182a82
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Mandate:security.epss-triage-settle"
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
        "ref": "Mandate:security.epss-triage-settle",
        "kind": "mandate",
        "detail": "summary",
        "card": {
          "mandate": "ProcedureMandate:security.epss-triage-settle",
          "line": "Line:security.epss-triage@sha256:dff66cdcfae4daeb94703b92f790bd99683e6b3b3f9e87e7f3df53b2b87505c0",
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
              "claim_type": "ClaimType:security.vulnerability.epss_percentile",
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
              "claim_type": "ClaimType:security.vulnerability.epss_score",
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
              "claim_type": "ClaimType:security.vulnerability.epss_score_date",
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
            }
          ],
          "subjects": "expected",
          "next": [
            "cx.get(\"Line:security.epss-triage\")",
            "cx.get(\"ProcedureMandate:security.epss-triage-settle\", detail=\"history\")"
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
        "evaluation_time": "2026-11-07T22:23:00.620130Z"
      }
    ]
  }
});
