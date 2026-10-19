// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c2360da9
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test"
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
        "ref": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "kind": "security.job",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "environment",
              "claim": "CLM-44e6b964d199142e6b4862cb4c18d465",
              "value": "none",
              "flags": []
            },
            {
              "predicate": "job_key",
              "claim": "CLM-f9d88825c8c21434b7291591df255b88",
              "value": "docker-image-test",
              "flags": []
            },
            {
              "predicate": "permission",
              "claim": [
                "CLM-710aca859fb647641f77cd51f4a94f61"
              ],
              "value": [
                "token:repository-default"
              ],
              "flags": []
            },
            {
              "predicate": "uses",
              "claim": [
                "CLM-2c86cc92e24a453d7a4cd456d3599346",
                "CLM-c3e6789b20fe99255f75a87b762f71ab"
              ],
              "value": [
                "pkg:githubactions/astral-sh/setup-uv@v4",
                "pkg:githubactions/actions/checkout@v4"
              ],
              "flags": []
            },
            {
              "predicate": "workflow",
              "claim": "CLM-9d767fcc25f7f544bb7abe2beca7a275",
              "value": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
              "flags": []
            },
            {
              "predicate": "workflow_ref",
              "claim": "CLM-4c2631bbaddeb2277e7d6a94e575a0c3",
              "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ci.yml",
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\", detail=\"history\")"
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
        "evaluation_time": "2026-10-19T22:16:30.475160Z"
      }
    ]
  }
});
