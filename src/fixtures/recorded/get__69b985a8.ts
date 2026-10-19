// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get d30ae114
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "lifecycle": "live",
          "digest": "sha256:50bcb07e74ec",
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ at 4e9b5db950bc: .github/workflows/ci.yml job docker-image-test is declared.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c",
            "terminal": "propose"
          }
        }
      ],
      "events": [
        {
          "field": "uses",
          "predicate": "security.job.uses",
          "claim": "CLM-2c86cc92e24a453d7a4cd456d3599346",
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ at 4e9b5db950bc: .github/workflows/ci.yml job docker-image-test holds uses values as declared.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c",
            "terminal": "propose"
          },
          "value": "pkg:githubactions/astral-sh/setup-uv@v4",
          "change": "stated"
        },
        {
          "field": "environment",
          "predicate": "security.job.environment",
          "claim": "CLM-44e6b964d199142e6b4862cb4c18d465",
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ at 4e9b5db950bc: .github/workflows/ci.yml job docker-image-test runs in environment none.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c",
            "terminal": "propose"
          },
          "value": "none",
          "change": "stated"
        },
        {
          "field": "workflow_ref",
          "predicate": "security.job.workflow_ref",
          "claim": "CLM-4c2631bbaddeb2277e7d6a94e575a0c3",
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.repo-parse run RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c terminal propose\n\n137 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633"
          },
          "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ci.yml",
          "change": "stated"
        },
        {
          "field": "permission",
          "predicate": "security.job.permission",
          "claim": "CLM-710aca859fb647641f77cd51f4a94f61",
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ at 4e9b5db950bc: .github/workflows/ci.yml job docker-image-test holds permission values as declared.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c",
            "terminal": "propose"
          },
          "value": "token:repository-default",
          "change": "stated"
        },
        {
          "field": "workflow",
          "predicate": "security.job.workflow",
          "claim": "CLM-9d767fcc25f7f544bb7abe2beca7a275",
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ at 4e9b5db950bc: .github/workflows/ci.yml job docker-image-test is in .github/workflows/ci.yml.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c",
            "terminal": "propose"
          },
          "value": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
          "change": "stated"
        },
        {
          "field": "uses",
          "predicate": "security.job.uses",
          "claim": "CLM-c3e6789b20fe99255f75a87b762f71ab",
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ at 4e9b5db950bc: .github/workflows/ci.yml job docker-image-test holds uses values as declared.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c",
            "terminal": "propose"
          },
          "value": "pkg:githubactions/actions/checkout@v4",
          "change": "stated"
        },
        {
          "field": "job_key",
          "predicate": "security.job.job_key",
          "claim": "CLM-f9d88825c8c21434b7291591df255b88",
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.repo-parse run RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c terminal propose\n\n137 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633"
          },
          "value": "docker-image-test",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:16:29.712161Z"
  }
});
