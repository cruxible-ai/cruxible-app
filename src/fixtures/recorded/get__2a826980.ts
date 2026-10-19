// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 54c13074
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Mandate:security.epss-triage-propose",
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
    "ref": "Mandate:security.epss-triage-propose",
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
      "path": "procedure-mandates/security.epss-triage-propose.json",
      "artifact_digest": "sha256:5d0f8bf4cbb50c359857559e4923e9ea57466cc751e96556aa05528e7d78122c",
      "envelope": {
        "artifact_format": "playbill-procedure-mandate-v2",
        "identity": {
          "kind": "ProcedureMandate",
          "name": "security.epss-triage-propose"
        },
        "procedure": {
          "role": "procedure",
          "target": {
            "kind": "Procedure",
            "name": "security.epss-triage"
          },
          "artifact_digest": "sha256:1dafa4576ed87a6c8765c92f9a20bfaad8597f7a04a973d7528dc940641086b4"
        },
        "grants": "propose",
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
        "valid_from": "2026-10-19T21:29:34+00:00",
        "expires_at": "2027-01-17T21:29:34+00:00",
        "scope": [],
        "subject_scope": null,
        "condition": null,
        "suspended": false,
        "lifecycle": {
          "state": "live",
          "predecessor_digest": "sha256:bbb9745d42cbe32d332a89127ad89c5ee12d6a8a7e2693e63057642f5ad5521a"
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
    "evaluation_time": "2026-10-19T22:13:04.120667Z"
  }
});
