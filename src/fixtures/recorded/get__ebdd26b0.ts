// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 3b5dfc02
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Mandate:security.cve-applicability-propose",
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
    "ref": "Mandate:security.cve-applicability-propose",
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
      "path": "procedure-mandates/security.cve-applicability-propose.json",
      "artifact_digest": "sha256:7cd6ffc6b9246c060e1bd19da33573f12d89448ad4226964a7c6c5f7f5546426",
      "envelope": {
        "artifact_format": "playbill-procedure-mandate-v2",
        "identity": {
          "kind": "ProcedureMandate",
          "name": "security.cve-applicability-propose"
        },
        "procedure": {
          "role": "procedure",
          "target": {
            "kind": "Procedure",
            "name": "security.cve-applicability"
          },
          "artifact_digest": "sha256:96d5e33dd1ca384bb4079624daa7695a54331684c0aded465482789e88c43222"
        },
        "grants": "propose",
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
          "claims",
          "subjects/security.assessment",
          "subjects/security.vulnerability"
        ],
        "valid_from": "2026-10-19T21:29:34+00:00",
        "expires_at": "2027-01-17T21:29:34+00:00",
        "scope": [],
        "subject_scope": null,
        "condition": null,
        "suspended": false,
        "lifecycle": {
          "state": "live",
          "predecessor_digest": "sha256:0dc4a28e240905958c534d854f3cbe3bb4b17aac1ebb1e8393101260c491f25c"
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
    "evaluation_time": "2026-10-19T22:16:33.799840Z"
  }
});
