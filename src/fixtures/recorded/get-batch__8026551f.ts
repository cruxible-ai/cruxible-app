// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 7c43ea17
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:8fb2aec8a8111f892dccac4fb703328c73547d5999a3fb7ce78fb6ff8081a60a"
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
        "ref": "Proposal:sha256:8fb2aec8a8111f892dccac4fb703328c73547d5999a3fb7ce78fb6ff8081a60a",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:8fb2aec8a8111f892dccac4fb703328c73547d5999a3fb7ce78fb6ff8081a60a",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "gate-owner",
          "admitted_at": "2026-10-19T21:28:48.618417Z",
          "changes": [
            {
              "path": "provider-interfaces/security.cve-applicability/fa65ba8a159a3fedd4114b3cfe0d61f02e950f71dc7cd22f54d9139fc0b6b7ab.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.cyclonedx-components/c711c19cc83515ce9bf5f2b3c2f6bb649fee93af71aea655438dd82474ea638e.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.epss-scores/449662d06f51954b811871dd37b9bb4494d017388f75bfd257edc672088b660b.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.harden/4c1c3e516a05da470950d1ac86de580ab36e9b22cb5efaa00cc25f2c426c09b3.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.kev-attention/d08d48a4915284f7ddc3c5be4693ec15a439563d56610c93a1145090be15d0fa.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.kev-catalog/dcccdc811dca2b383a9c3a32c7d5ba107db7c8703deb461925b942c67eb4b4ac.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.osv-applicability/cd02d7da5e83f085dd2b337c570b2bc0fda31c708d0021e5e9af3ac897b5fa75.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.registry-facts/f6b4c74b65bc775bccd87d205e0f391f76c1c5a74d085b79062f27f2dc3f5238.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.workflow-facts/e3200100ece5ebb6c4278201a00b17df146ac15504be8745cbc472bc526f558f.json",
              "change": "create"
            },
            {
              "path": "providers/security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167.json",
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
        "evaluation_time": "2026-10-19T22:16:33.183320Z"
      }
    ]
  }
});
