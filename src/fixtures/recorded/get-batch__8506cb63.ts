// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 820c2f91
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:b55585cd7ec743b6a55e6deda7815222f69faf9a5bcc27f62b52f7b4153657bc"
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
        "ref": "Proposal:sha256:b55585cd7ec743b6a55e6deda7815222f69faf9a5bcc27f62b52f7b4153657bc",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:b55585cd7ec743b6a55e6deda7815222f69faf9a5bcc27f62b52f7b4153657bc",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:30:20.456927Z",
          "rationale": "The gate's inventory.",
          "changes": [
            {
              "path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "change": "create"
            },
            {
              "path": "claims/08/CLM-08f481f248522f51a0fe52647e0a8c69.json",
              "change": "create"
            },
            {
              "path": "claims/0c/CLM-0cccb29ecb30327ce9427fccca3aef5e.json",
              "change": "create"
            },
            {
              "path": "claims/0d/CLM-0da879100c53230db37675f809185810.json",
              "change": "create"
            },
            {
              "path": "claims/17/CLM-17ffa8ce2dbeef92e02e6b3957fdebf3.json",
              "change": "create"
            },
            {
              "path": "claims/1c/CLM-1cd01464524b5d784d4d054539c7f888.json",
              "change": "create"
            },
            {
              "path": "claims/29/CLM-29555ccf065fb44fefed86f945b97771.json",
              "change": "create"
            },
            {
              "path": "claims/31/CLM-31433b52ef9b331e9f76bb1a266adab3.json",
              "change": "create"
            },
            {
              "path": "claims/31/CLM-314b16d24f09a9505d6c85ec3aa65b74.json",
              "change": "create"
            },
            {
              "path": "claims/31/CLM-319ca1c867216f4cf03a0d0afc95ef0c.json",
              "change": "create"
            },
            {
              "path": "claims/38/CLM-38873218c201e6d03f1a7477d0b0b5f4.json",
              "change": "create"
            },
            {
              "path": "claims/52/CLM-529553bf44ffc599838d2ee157dbe246.json",
              "change": "create"
            },
            {
              "path": "claims/58/CLM-5837e18e85c85d052060f32fd3d12319.json",
              "change": "create"
            },
            {
              "path": "claims/6b/CLM-6b344004ceab44b7202af5d8b8675821.json",
              "change": "create"
            },
            {
              "path": "claims/79/CLM-79235364cd1f3d0d3bd6ca1928d143c1.json",
              "change": "create"
            },
            {
              "path": "claims/83/CLM-83a74666a26cd4c474b2466e9b834269.json",
              "change": "create"
            },
            {
              "path": "claims/91/CLM-91bc782181cfc41d338a79bb1c8043a3.json",
              "change": "create"
            },
            {
              "path": "claims/97/CLM-97322808a67c80c385afa7fbb462fa70.json",
              "change": "create"
            },
            {
              "path": "claims/9f/CLM-9f61102f3165c2b404fc15701061dfbc.json",
              "change": "create"
            },
            {
              "path": "claims/ab/CLM-ab4cc7d2bb7b42f8e28549944f7cb078.json",
              "change": "create"
            },
            {
              "path": "claims/b6/CLM-b6e80e32c787706a347c7fb27383a302.json",
              "change": "create"
            },
            {
              "path": "claims/b7/CLM-b77f7fc53341f10339b80954b3add768.json",
              "change": "create"
            },
            {
              "path": "claims/b9/CLM-b9517b7f14c587e19261e83cf1d53a10.json",
              "change": "create"
            },
            {
              "path": "claims/c5/CLM-c52acb2239136ada50f61c5d2aca7d3c.json",
              "change": "create"
            },
            {
              "path": "claims/c6/CLM-c61c2a15f65cca11bf426233c204e9fa.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "20 more; see detail=proof"
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
        "evaluation_time": "2026-10-20T21:38:28.943427Z"
      }
    ]
  }
});
