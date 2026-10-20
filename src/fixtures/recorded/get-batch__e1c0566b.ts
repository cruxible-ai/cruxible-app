// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch a497c03d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-44e6b964d199142e6b4862cb4c18d465",
      "CLM-f9d88825c8c21434b7291591df255b88",
      "CLM-710aca859fb647641f77cd51f4a94f61",
      "CLM-2c86cc92e24a453d7a4cd456d3599346",
      "CLM-c3e6789b20fe99255f75a87b762f71ab",
      "CLM-9d767fcc25f7f544bb7abe2beca7a275",
      "CLM-4c2631bbaddeb2277e7d6a94e575a0c3"
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
        "ref": "CLM-44e6b964d199142e6b4862cb4c18d465",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-44e6b964d199142e6b4862cb4c18d465",
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "predicate": "environment",
          "predicate_full": "security.job.environment",
          "value": "none",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:00.552880Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-44e6b964d199142e6b4862cb4c18d465\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-20T21:38:24.783304Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-f9d88825c8c21434b7291591df255b88",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-f9d88825c8c21434b7291591df255b88",
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "predicate": "job_key",
          "predicate_full": "security.job.job_key",
          "value": "docker-image-test",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:00.552880Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-f9d88825c8c21434b7291591df255b88\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-20T21:38:24.805367Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-710aca859fb647641f77cd51f4a94f61",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-710aca859fb647641f77cd51f4a94f61",
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "predicate": "permission",
          "predicate_full": "security.job.permission",
          "value": "token:repository-default",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:00.552880Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-710aca859fb647641f77cd51f4a94f61\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-20T21:38:24.823106Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-2c86cc92e24a453d7a4cd456d3599346",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-2c86cc92e24a453d7a4cd456d3599346",
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "predicate": "uses",
          "predicate_full": "security.job.uses",
          "value": "pkg:githubactions/astral-sh/setup-uv@v4",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:00.552880Z",
          "contenders": [
            {
              "claim": "CLM-c3e6789b20fe99255f75a87b762f71ab",
              "value": "pkg:githubactions/actions/checkout@v4",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-2c86cc92e24a453d7a4cd456d3599346\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-20T21:38:24.841836Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-c3e6789b20fe99255f75a87b762f71ab",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-c3e6789b20fe99255f75a87b762f71ab",
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "predicate": "uses",
          "predicate_full": "security.job.uses",
          "value": "pkg:githubactions/actions/checkout@v4",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:00.552880Z",
          "contenders": [
            {
              "claim": "CLM-2c86cc92e24a453d7a4cd456d3599346",
              "value": "pkg:githubactions/astral-sh/setup-uv@v4",
              "verdict": "supported"
            }
          ],
          "flags": [],
          "next": [
            "cx.get(\"CLM-c3e6789b20fe99255f75a87b762f71ab\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-20T21:38:24.861013Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-9d767fcc25f7f544bb7abe2beca7a275",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-9d767fcc25f7f544bb7abe2beca7a275",
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "predicate": "workflow",
          "predicate_full": "security.job.workflow",
          "value": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:00.552880Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-9d767fcc25f7f544bb7abe2beca7a275\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-20T21:38:24.877474Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-4c2631bbaddeb2277e7d6a94e575a0c3",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-4c2631bbaddeb2277e7d6a94e575a0c3",
          "subject": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
          "predicate": "workflow_ref",
          "predicate_full": "security.job.workflow_ref",
          "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ci.yml",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-10-19T21:47:00.552880Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-4c2631bbaddeb2277e7d6a94e575a0c3\", detail=\"evidence\")",
            "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\")"
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
        "evaluation_time": "2026-10-20T21:38:24.896314Z"
      }
    ]
  }
});
