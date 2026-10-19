// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 27a78d27
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-f9d88825c8c21434b7291591df255b88",
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
    "ref": "CLM-f9d88825c8c21434b7291591df255b88",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 48,
          "git_oid": "e06a4466b5d0",
          "accepted": "2026-10-19T21:47:00.552880Z",
          "actor": "gate-owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "docker-image-test",
          "digest": "sha256:3079ea6ff81b",
          "change": "stated",
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.repo-parse run RUN-58baed2aaafa2b011e3d5772db0fb7a8b8df68892da11bedcb92e580a5108a6c terminal propose\n\n137 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:f8abae9b70aae32045fa14de39badda1381a4a58f672fe880cf9a4ea0860a633"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-19T22:13:01.959830Z"
  }
});
