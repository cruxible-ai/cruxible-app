// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 7029eb9d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:d5c4bb5260675f158282506e3a49594a658c31f69a496189c583c6dee63fc8d3"
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
        "ref": "Proposal:sha256:d5c4bb5260675f158282506e3a49594a658c31f69a496189c583c6dee63fc8d3",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:d5c4bb5260675f158282506e3a49594a658c31f69a496189c583c6dee63fc8d3",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:48:47.230260Z",
          "rationale": "HQ5: the served agent-release asset does not match the v0.3.2 manifest.",
          "changes": [
            {
              "path": "capture-contracts/playbill.foreign-source.doc-investigations-84e283f0451cc97a.md.json",
              "change": "create"
            },
            {
              "path": "claims/05/CLM-051d06604ea7d6cc6f4736b102de3432.json",
              "change": "create"
            },
            {
              "path": "claims/56/CLM-56fab6da3d80a0d904546c323c55e48b.json",
              "change": "create"
            },
            {
              "path": "claims/e9/CLM-e9585947f0500b021cfa3cae38048e65.json",
              "change": "create"
            },
            {
              "path": "subjects/security.signal/security.hq5--sha256-84e283f0451cc97a96323fe6c78724eab8bfcde34ff6e2f18c8785a4fbafdc6f.json",
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
        "evaluation_time": "2026-10-20T21:38:28.441857Z"
      }
    ]
  }
});
