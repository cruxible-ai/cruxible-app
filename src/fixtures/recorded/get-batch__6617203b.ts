// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 4e6cc30e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:1022543041f93285a4b827879ac6135eb5388779c245496016a22cc0f1a56183"
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
        "ref": "Proposal:sha256:1022543041f93285a4b827879ac6135eb5388779c245496016a22cc0f1a56183",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:1022543041f93285a4b827879ac6135eb5388779c245496016a22cc0f1a56183",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:29:22.785778Z",
          "rationale": "Instantiate the security Blueprints.",
          "changes": [
            {
              "path": "procedures/security.asset-fetch.json",
              "change": "create"
            },
            {
              "path": "procedures/security.cve-record-acquire.json",
              "change": "create"
            },
            {
              "path": "procedures/security.epss-acquire.json",
              "change": "create"
            },
            {
              "path": "procedures/security.history-acquire.json",
              "change": "create"
            },
            {
              "path": "procedures/security.kev-acquire.json",
              "change": "create"
            },
            {
              "path": "procedures/security.osv-applicability.json",
              "change": "create"
            },
            {
              "path": "procedures/security.registry-acquire.json",
              "change": "create"
            },
            {
              "path": "procedures/security.release-acquire.json",
              "change": "create"
            },
            {
              "path": "procedures/security.repo-acquire.json",
              "change": "create"
            }
          ],
          "next": []
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
        "evaluation_time": "2026-10-21T19:49:25.840762Z"
      }
    ]
  }
});
