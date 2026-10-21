// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get f9890ccb
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-f9d88825c8c21434b7291591df255b88",
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
    "ref": "CLM-f9d88825c8c21434b7291591df255b88",
    "kind": "claim",
    "detail": "evidence",
    "evidence": {
      "value": "docker-image-test",
      "captures": [
        {
          "capture": "CAP-c5384e30af3d",
          "contract": "CaptureContract:security.repo-snapshot-v1",
          "version": 1,
          "source": "github.repo.snapshot",
          "observed_at": "2026-10-19T21:47:00.303570Z",
          "role": "evidence",
          "origin": "independent",
          "status": "not_admitted"
        }
      ],
      "attestations": [],
      "rationale": "Proposed by Procedure security.repo-parse run RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c terminal propose\n\n137 items; each item's reason is recorded with the Claim or Subject it explains."
    },
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-21T19:49:23.195149Z"
  }
});
