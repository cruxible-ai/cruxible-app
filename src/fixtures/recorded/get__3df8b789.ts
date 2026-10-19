// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 07a7a55f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-92d552d36719072cc59cb34f7f4aa520",
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
    "ref": "CLM-92d552d36719072cc59cb34f7f4aa520",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "v0.3.2/agent-operation-0.3.2.tar.gz",
      "captures": [
        {
          "capture": "CAP-8a5a91ecdacb",
          "contract": "CaptureContract:security.repo-snapshot-v1",
          "version": 1,
          "source": "github.repo.snapshot",
          "observed_at": "2026-10-19T21:47:40.693802Z",
          "role": "evidence",
          "admitted": false
        }
      ],
      "attestations": [],
      "rationale": "Proposed by Procedure security.repo-parse run RUN-d82b43765315dec06d33ddce95c7fd9aff5aff2c7bf69c7cb79be3e65cf946d6 terminal propose\n\n24 items; each item's reason is recorded with the Claim or Subject it explains."
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:16:30.754465Z"
  }
});
