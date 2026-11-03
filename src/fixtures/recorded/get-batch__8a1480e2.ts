// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch a2dd09ff
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
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Mandate:security.kev-triage-settle",
        "kind": "mandate",
        "detail": "summary",
        "card": {
          "mandate": "ProcedureMandate:security.kev-triage-settle",
          "line": "Line:security.kev-triage@sha256:2bef163bc5ded6fe191485c209e6415e496f5feb5ddc778ea40ebe1a8f05220d",
          "grants": "settle",
          "lifecycle": "live",
          "state": "active",
          "valid_from": "2026-11-02T00:58:21Z",
          "expires_at": "2027-02-01T00:58:21Z",
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
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "evaluation_time": "2026-11-03T02:20:51.654299Z"
      }
    ]
  }
});
