// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c0cc99c6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.target/github-release--cruxible-ai-cruxible"
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
        "ref": "security.target/github-release--cruxible-ai-cruxible",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.target/github-release--cruxible-ai-cruxible",
          "kind": "security.target",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "name",
              "claim": "CLM-9d1b8ba377912f137531f150d257dca5",
              "value": "cruxible-ai/cruxible",
              "flags": []
            },
            {
              "predicate": "publish_gate",
              "claim": [
                "CLM-09e6d952b611db4c127fe6b765a5630e"
              ],
              "value": [
                "push:tags:v*"
              ],
              "flags": []
            },
            {
              "predicate": "registry",
              "claim": "CLM-50dbe3b69c9eea8fd8c5139e07827118",
              "value": "github_release",
              "flags": []
            },
            {
              "predicate": "source_repo",
              "claim": "CLM-558301a773cdcf69eb98318a8b5e7bf2",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            }
          ],
          "incoming_count": 9,
          "next": [
            "cx.get(\"security.target/github-release--cruxible-ai-cruxible\", detail=\"history\")",
            "cx.get(\"security.target/github-release--cruxible-ai-cruxible\", detail=\"incoming\")"
          ]
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
        "evaluation_time": "2026-10-20T21:38:25.958980Z"
      }
    ]
  }
});
