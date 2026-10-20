// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch f6f7b39d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
      "security.repo/github.com--cruxible-ai-cruxible"
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
        "ref": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
          "kind": "security.coverage",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "of",
              "claim": "CLM-c6a33287e6650f89e21c0e723de601ec",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "revision",
              "claim": "CLM-7052ca2a7c9a819389901f9dfa41993b",
              "value": "4e9b5db950bc66145fc72252be82b40a7826077c",
              "flags": [
                "stale"
              ]
            },
            {
              "predicate": "scope",
              "claim": "CLM-9f999f8ccb020644d586b2362b419f41",
              "value": "ci.workflows",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-2059f0285621559df7b8cb5c5cae6ac0",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/",
              "flags": []
            }
          ],
          "incoming_count": 5,
          "next": [
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows\", detail=\"why\")",
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows\", detail=\"history\")",
            "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows\", detail=\"incoming\")"
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
        "evaluation_time": "2026-10-20T21:38:25.290490Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.repo/github.com--cruxible-ai-cruxible",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.repo/github.com--cruxible-ai-cruxible",
          "kind": "security.repo",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "forge_host",
              "claim": "CLM-2305c382d9122e1cd851a2b4d377a1d6",
              "value": "github.com",
              "flags": []
            },
            {
              "predicate": "full_name",
              "claim": "CLM-ed9a04bee32a5d93af355e3646dc68bf",
              "value": "cruxible-ai/cruxible",
              "flags": []
            }
          ],
          "incoming_count": 17,
          "next": [
            "cx.get(\"security.repo/github.com--cruxible-ai-cruxible\", detail=\"history\")",
            "cx.get(\"security.repo/github.com--cruxible-ai-cruxible\", detail=\"incoming\")"
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
        "evaluation_time": "2026-10-20T21:38:25.316323Z"
      }
    ]
  }
});
