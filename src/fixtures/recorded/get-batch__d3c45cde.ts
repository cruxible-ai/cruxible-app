// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch e1792fa9
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Mandate:security.osv-query-settle"
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
        "ref": "Mandate:security.osv-query-settle",
        "kind": "mandate",
        "detail": "summary",
        "card": {
          "mandate": "ProcedureMandate:security.osv-query-settle",
          "line": "Line:security.osv-query@sha256:9414d065664fd6253f5e65d224da37a34024bb09e45287a7c20f07951bfddb47",
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
              "claim_type": "ClaimType:security.component.affected_by",
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
            }
          ],
          "subject_creation": [
            "security.vulnerability"
          ],
          "next": [
            "cx.get(\"Line:security.osv-query\")",
            "cx.get(\"ProcedureMandate:security.osv-query-settle\", detail=\"history\")"
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
        "evaluation_time": "2026-11-08T19:48:01.840663Z"
      }
    ]
  }
});
