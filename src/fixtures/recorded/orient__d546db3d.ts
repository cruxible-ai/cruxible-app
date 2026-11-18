// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 67b41bbc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
    "surface": "sdk",
    "section": "mandates",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_console05",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "generation": 22,
    "proposed_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-08T19:48:01.512719Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "section": "mandates",
    "mandates": [
      {
        "mandate": "ProcedureMandate:security.epss-triage-propose",
        "line": "Line:security.epss-triage",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-02-05T00:00:00Z"
      },
      {
        "mandate": "ProcedureMandate:security.epss-triage-settle",
        "line": "Line:security.epss-triage",
        "grants": "settle",
        "state": "active",
        "expires_at": "2027-02-05T00:00:00Z",
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
        ]
      },
      {
        "mandate": "ProcedureMandate:security.kev-triage-propose",
        "line": "Line:security.kev-triage",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-02-05T00:00:00Z"
      },
      {
        "mandate": "ProcedureMandate:security.kev-triage-settle",
        "line": "Line:security.kev-triage",
        "grants": "settle",
        "state": "active",
        "expires_at": "2027-02-05T00:00:00Z",
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
        ]
      },
      {
        "mandate": "ProcedureMandate:security.osv-query-propose",
        "line": "Line:security.osv-query",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-02-05T00:00:00Z"
      },
      {
        "mandate": "ProcedureMandate:security.osv-query-settle",
        "line": "Line:security.osv-query",
        "grants": "settle",
        "state": "active",
        "expires_at": "2027-02-05T00:00:00Z",
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
        ]
      },
      {
        "mandate": "ProcedureMandate:security.sbom-import.app-propose",
        "line": "Line:security.sbom-import.app",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-02-05T00:00:00Z"
      },
      {
        "mandate": "ProcedureMandate:security.sbom-import.app-settle",
        "line": "Line:security.sbom-import.app",
        "grants": "settle",
        "state": "active",
        "expires_at": "2027-02-05T00:00:00Z",
        "scope": [
          {
            "claim_type": "ClaimType:security.occurrence.scope",
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
          "security.component",
          "security.inventory",
          "security.occurrence"
        ]
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"Mandate:security.epss-triage-propose\")"
    ]
  }
});
