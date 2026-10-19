// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get b2e453a3
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-9d767fcc25f7f544bb7abe2beca7a275",
    "detail": "evidence",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-9d767fcc25f7f544bb7abe2beca7a275",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
      "captures": [
        {
          "capture": "CAP-c5384e30af3d",
          "contract": "CaptureContract:security.repo-snapshot-v1",
          "version": 1,
          "source": "github.repo.snapshot",
          "observed_at": "2026-10-19T21:47:00.303570Z",
          "role": "evidence",
          "admitted": true
        }
      ],
      "attestations": [],
      "rationale": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ at 4e9b5db950bc: .github/workflows/ci.yml job docker-image-test is in .github/workflows/ci.yml."
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:16:30.373490Z"
  }
});
