// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 487ad12a
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
        "ref": "Mandate:security.epss-triage-settle",
        "kind": "mandate",
        "detail": "summary",
        "card": {
          "mandate": "ProcedureMandate:security.epss-triage-settle",
          "line": "Line:security.epss-triage@sha256:f2359364007565e74ba5fee2b404eefa98fd8a321b0412f523fc0663840ab415",
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
        "evaluation_time": "2026-11-03T02:20:51.540467Z"
      }
    ]
  }
});
