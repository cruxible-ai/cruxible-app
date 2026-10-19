// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 48c94047
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml"
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
        "ref": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
          "kind": "security.workflow",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "coverage",
              "claim": "CLM-9787b90be1245b153d4915b351601c53",
              "value": "security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
              "flags": []
            },
            {
              "predicate": "path",
              "claim": "CLM-7e3474185d0cfc9c791099247c035ec7",
              "value": ".github/workflows/ci.yml",
              "flags": []
            },
            {
              "predicate": "repo",
              "claim": "CLM-f248063c5a6ed11a12c486f7587a2b2c",
              "value": "security.repo/github.com--cruxible-ai-cruxible",
              "flags": []
            },
            {
              "predicate": "source",
              "claim": "CLM-4093956e4ef3726a66b5e24235f718b4",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8",
              "flags": []
            },
            {
              "predicate": "trigger",
              "claim": [
                "CLM-2bccdfbdf9ea4dcc89a3deec26606c3f",
                "CLM-6bef538dff2ade00cac7314c15f6364b"
              ],
              "value": [
                "pull_request:branches:main",
                "push:branches:main"
              ],
              "flags": []
            }
          ],
          "incoming_count": 4,
          "next": [
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml\", detail=\"history\")",
            "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml\", detail=\"incoming\")"
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
        "evaluation_time": "2026-10-19T22:16:30.500616Z"
      }
    ]
  }
});
