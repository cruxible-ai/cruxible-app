// Recorded from cruxible-core 4b93ac12afc3d8bb8477e96c2062e91b073076e9 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 6a12db2f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Mandate:security.epss-triage-settle",
    "detail": "proof",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "Mandate:security.epss-triage-settle",
    "kind": "mandate",
    "detail": "proof",
    "proof": {
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
        "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
        "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
        "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
      },
      "path": "procedure-mandates/security.epss-triage-settle.json",
      "artifact_digest": "sha256:9bfa0f953f86bb528597764a252d39e6748ba117deccaa824d47f01e734bff33",
      "envelope": {
        "artifact_format": "playbill-procedure-mandate-v2",
        "identity": {
          "kind": "ProcedureMandate",
          "name": "security.epss-triage-settle"
        },
        "procedure": {
          "role": "procedure",
          "target": {
            "kind": "Procedure",
            "name": "security.epss-triage"
          },
          "artifact_digest": "sha256:1dafa4576ed87a6c8765c92f9a20bfaad8597f7a04a973d7528dc940641086b4"
        },
        "grants": "settle",
        "resource_ceiling": {
          "tag": "playbill-procedure-hard-caps-v1",
          "max_wall_clock": {
            "tag": "playbill-duration-v1",
            "microseconds": 300000000
          },
          "max_provider_calls": 2,
          "max_capture_bytes": 33554432,
          "max_items": 5000,
          "max_repeat_attempts": 1
        },
        "namespace": [
          "claims"
        ],
        "valid_from": "2026-10-19T21:40:03+00:00",
        "expires_at": "2027-01-17T21:40:03+00:00",
        "scope": [
          {
            "tag": "playbill-mandate-claim-scope-v1",
            "claim_type": {
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.vulnerability.epss_percentile"
              },
              "artifact_digest": "sha256:675416196623443fab7368f0324dd0b7091385940c62bcdaf04394923176c054"
            },
            "change_kinds": [
              "create",
              "revise"
            ],
            "binding_subject_role": "subject"
          },
          {
            "tag": "playbill-mandate-claim-scope-v1",
            "claim_type": {
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.vulnerability.epss_score"
              },
              "artifact_digest": "sha256:f247297a4958490cf976a06f8ce1bb40081a9e15c57acf1a8eb8759bf35a0d40"
            },
            "change_kinds": [
              "create",
              "revise"
            ],
            "binding_subject_role": "subject"
          }
        ],
        "subject_scope": null,
        "condition": {
          "tag": "playbill-mandate-condition-v1",
          "query": {
            "role": "condition-query",
            "target": {
              "kind": "QueryDefinition",
              "name": "security.settle_condition"
            },
            "artifact_digest": "sha256:5c6e717c80a043e5d23c341d5495bca4db43ad764a5dd9089a6545e2c4947032"
          },
          "binding_parameter": "vulnerability_id",
          "fixed_parameters": {},
          "required_fields": [
            "cve_id"
          ],
          "fallback": "propose"
        },
        "suspended": false,
        "lifecycle": {
          "state": "live",
          "predecessor_digest": "sha256:2712ac3dbe83a30c60e80e2a8ddad0fda3bbaad36523b70947b013e59200dda6"
        }
      }
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
    "evaluation_time": "2026-10-20T21:15:29.923977Z"
  }
});
