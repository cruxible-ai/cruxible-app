// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 4e0279e2
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:2f2c743357d9e5eb9c0cc22cb0cbd358eb601d820509b532fe565198759fee64"
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
        "ref": "Proposal:sha256:2f2c743357d9e5eb9c0cc22cb0cbd358eb601d820509b532fe565198759fee64",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:2f2c743357d9e5eb9c0cc22cb0cbd358eb601d820509b532fe565198759fee64",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:28:49.855769Z",
          "changes": [
            {
              "path": "provider-interfaces/security.epss-daily/5f7b04d392fc9a1264721b96a0f609f8e5a7c8846f9c9673b1dca8766377a9b8.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.osv-query/942851e225e944306cf5f223754a26f4fd6c84acbc26cc34ef118382ef3e9312.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.pypi-release/ec5ddc209b8f1dd632230bd2c45a7f51ca87c5085154d6c6164981d2b808c009.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.release-asset/fdcda711577e95b772d90ae005197baf6dbb396afac97e0dd2adda06fe459798.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.repo-snapshot/dbcd6c261d8edb31cd3850fc457a02cf88f1d48607eace54a2b63e441b8dcaf0.json",
              "change": "create"
            },
            {
              "path": "providers/security-sources-provider/13f44e81a4ae125b6334934d1068d55577add9b3009f498647433e0fea0b5a25.json",
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
        "evaluation_time": "2026-10-21T19:49:25.816587Z"
      }
    ]
  }
});
