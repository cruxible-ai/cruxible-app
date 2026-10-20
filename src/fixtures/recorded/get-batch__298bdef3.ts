// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 972f48a4
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:7ec7db339a3728f0739f37424d5d61faf993ab96fd65eb0405d041c080574e72"
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
        "ref": "Proposal:sha256:7ec7db339a3728f0739f37424d5d61faf993ab96fd65eb0405d041c080574e72",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:7ec7db339a3728f0739f37424d5d61faf993ab96fd65eb0405d041c080574e72",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:30:01.414185Z",
          "rationale": "Proposed by Procedure security.sbom-import run RUN-31e98a0f9f7722295eee192787015a28c06424f403038284a7938eac0eb291be terminal propose\n\n8 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/00/CLM-0068db213f245e5bf2b68c101cff908f.json",
              "change": "create"
            },
            {
              "path": "claims/0c/CLM-0c7e7f4ef3ecccc7957c7b88cc8b2967.json",
              "change": "create"
            },
            {
              "path": "claims/37/CLM-37575b1f9fe54be60948d8e783ff7694.json",
              "change": "create"
            },
            {
              "path": "claims/53/CLM-53ed59dc14c27665bf86d5161de732ff.json",
              "change": "create"
            },
            {
              "path": "claims/5f/CLM-5f9c1e251c0f3dcfa98f60aba10663f9.json",
              "change": "create"
            },
            {
              "path": "claims/88/CLM-88d0f2399501903eb2ef74712bfef7c2.json",
              "change": "create"
            },
            {
              "path": "claims/b9/CLM-b97da0472f2e66a822040c9ba6c0e085.json",
              "change": "create"
            },
            {
              "path": "claims/c6/CLM-c64cfb0d41b039d86fd95d73cfb668ca.json",
              "change": "create"
            },
            {
              "path": "claims/e1/CLM-e15a6e4e85deb505df49ef54a31a74bc.json",
              "change": "create"
            },
            {
              "path": "subjects/security.product/gate-app.json",
              "change": "create"
            },
            {
              "path": "subjects/security.release/gate-app--1.0.0.json",
              "change": "create"
            },
            {
              "path": "subjects/security.supplier/gate-example.json",
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
        "evaluation_time": "2026-10-20T21:38:28.928315Z"
      }
    ]
  }
});
