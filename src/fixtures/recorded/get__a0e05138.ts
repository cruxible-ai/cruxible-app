// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 4283d7da
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Mandate:security.kev-triage-settle",
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
    "ref": "Mandate:security.kev-triage-settle",
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
      "path": "procedure-mandates/security.kev-triage-settle.json",
      "artifact_digest": "sha256:213d18702b33cde63c62d0a2e0a000e55f4d0eca1b942ed5f2786428125c7379",
      "envelope": {
        "artifact_format": "playbill-procedure-mandate-v2",
        "identity": {
          "kind": "ProcedureMandate",
          "name": "security.kev-triage-settle"
        },
        "procedure": {
          "role": "procedure",
          "target": {
            "kind": "Procedure",
            "name": "security.kev-triage"
          },
          "artifact_digest": "sha256:1b704307b138045dd8f7e8c7fd8f6e237493795bf978732a27f955b1c55db153"
        },
        "grants": "settle",
        "resource_ceiling": {
          "tag": "playbill-procedure-hard-caps-v1",
          "max_wall_clock": {
            "tag": "playbill-duration-v1",
            "microseconds": 300000000
          },
          "max_provider_calls": 2,
          "max_capture_bytes": 16777216,
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
                "name": "security.vulnerability.kev_date_added"
              },
              "artifact_digest": "sha256:4d7063ebe228e51f59707c89315683e4c814a904fb154d17ac9ec938b8dbb8c4"
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
                "name": "security.vulnerability.kev_due_date"
              },
              "artifact_digest": "sha256:7b7f1fa9a3325314b526e3fdbb8f665b57c56e2d2d5b4f3c19d4d73f9c5e5d67"
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
                "name": "security.vulnerability.kev_listed"
              },
              "artifact_digest": "sha256:c66e54c640a4702b326e907f4686499ef792bd3785c53974441785d825e853d3"
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
                "name": "security.vulnerability.kev_ransomware_use"
              },
              "artifact_digest": "sha256:1a865ab32f408e30aba6e6919a3fffceaf36620dcbedee139ea830b810feab79"
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
          "predecessor_digest": "sha256:6a2a91a140bca2b86f9b02d30cff0580a452f54324ca110a120a00160f6a7be8"
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
    "evaluation_time": "2026-10-20T21:38:23.378506Z"
  }
});
