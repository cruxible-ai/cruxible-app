// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 6b656161
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda"
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
        "ref": "Proposal:sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:90ee0b99418a473425c83dc4f2306ea809c934c4c4db4ee17ed5069f16301bda",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:47:45.436923Z",
          "rationale": "Proposed by Procedure security.repo-parse run RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6 terminal propose\n\n24 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/05/CLM-05391c28e089396bdf373de0b2e85d19.json",
              "change": "create"
            },
            {
              "path": "claims/08/CLM-087bb1c51df700813140497ee531b908.json",
              "change": "create"
            },
            {
              "path": "claims/09/CLM-091ae7da5940fd85d4b8d852f407029e.json",
              "change": "create"
            },
            {
              "path": "claims/10/CLM-101f30bf11587e2ccf791fe27f376bbe.json",
              "change": "create"
            },
            {
              "path": "claims/2e/CLM-2e8074681156ab7ed7034382803a1e4b.json",
              "change": "create"
            },
            {
              "path": "claims/48/CLM-4894f0e8c3bbb3e941897221e61597b6.json",
              "change": "create"
            },
            {
              "path": "claims/5f/CLM-5f353a65caad3601f6d08e0f97b6a1ff.json",
              "change": "create"
            },
            {
              "path": "claims/61/CLM-615470fafc83a9da3e6d12cd1f3d60ac.json",
              "change": "create"
            },
            {
              "path": "claims/69/CLM-696aad8a2df2597e5729cc6ac6c6756d.json",
              "change": "create"
            },
            {
              "path": "claims/7a/CLM-7a0b0093898d4ab3959952c7a93af693.json",
              "change": "create"
            },
            {
              "path": "claims/7e/CLM-7e32ef833eaa8dfa620755280d1ed818.json",
              "change": "create"
            },
            {
              "path": "claims/85/CLM-8535bf9214bc303f5c01763e0a47b2e9.json",
              "change": "create"
            },
            {
              "path": "claims/89/CLM-89fb4b770c021916048900b607695aa5.json",
              "change": "create"
            },
            {
              "path": "claims/8e/CLM-8eb5426bb7f19bf446e08690fb08162c.json",
              "change": "create"
            },
            {
              "path": "claims/92/CLM-92d552d36719072cc59cb34f7f4aa520.json",
              "change": "create"
            },
            {
              "path": "claims/93/CLM-9332aadf7c999a40535f4b5af238278b.json",
              "change": "create"
            },
            {
              "path": "claims/9c/CLM-9cbfe326495d1292ed6fe1b983faa2ad.json",
              "change": "create"
            },
            {
              "path": "claims/9e/CLM-9e66b6a536c55251f7adc74f1bcd4ad8.json",
              "change": "create"
            },
            {
              "path": "claims/ad/CLM-ad75d69a42bf81bbd0a155237b73504c.json",
              "change": "create"
            },
            {
              "path": "claims/ae/CLM-ae7d60e55eacbc58afebc538859abb24.json",
              "change": "create"
            },
            {
              "path": "claims/b0/CLM-b01afaa7c56208ff1d7265159b576e12.json",
              "change": "create"
            },
            {
              "path": "claims/b2/CLM-b2a7493c624d41b477116c2ba565a97f.json",
              "change": "create"
            },
            {
              "path": "claims/b7/CLM-b7637bafb8cb30f3f3cbcf0ffb3a4d2b.json",
              "change": "create"
            },
            {
              "path": "claims/bc/CLM-bc183f7073e0078ef7c5c463432ab8bb.json",
              "change": "create"
            },
            {
              "path": "claims/c1/CLM-c1e9d378c7b06da31caca4096e16bef5.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "15 more; see detail=proof"
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
        "evaluation_time": "2026-10-20T21:38:28.515419Z"
      }
    ]
  }
});
