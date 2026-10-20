// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 08a9b55c
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
        "ref": "Mandate:security.kev-triage-settle",
        "kind": "mandate",
        "detail": "summary",
        "card": {
          "mandate": "ProcedureMandate:security.kev-triage-settle",
          "procedure": "Procedure:security.kev-triage",
          "grants": "settle",
          "lifecycle": "live",
          "state": "active",
          "valid_from": "2026-10-19T21:40:03Z",
          "expires_at": "2027-01-17T21:40:03Z",
          "namespace": [
            "claims"
          ],
          "scope": [
            {
              "claim_type": "ClaimType:security.vulnerability.kev_date_added",
              "change_kinds": [
                "create",
                "revise"
              ],
              "binds": "subject"
            },
            {
              "claim_type": "ClaimType:security.vulnerability.kev_due_date",
              "change_kinds": [
                "create",
                "revise"
              ],
              "binds": "subject"
            },
            {
              "claim_type": "ClaimType:security.vulnerability.kev_listed",
              "change_kinds": [
                "create",
                "revise"
              ],
              "binds": "subject"
            },
            {
              "claim_type": "ClaimType:security.vulnerability.kev_ransomware_use",
              "change_kinds": [
                "create",
                "revise"
              ],
              "binds": "subject"
            }
          ],
          "condition": {
            "query": "QueryDefinition:security.settle_condition",
            "binding_parameter": "vulnerability_id",
            "required_fields": [
              "cve_id"
            ],
            "fallback": "propose"
          },
          "next": [
            "cx.get(\"Procedure:security.kev-triage\")",
            "cx.get(\"ProcedureMandate:security.kev-triage-settle\", detail=\"history\")"
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
        "evaluation_time": "2026-10-20T21:42:31.297658Z"
      }
    ]
  }
});
