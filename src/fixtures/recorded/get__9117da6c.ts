// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 6b3d98fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-2305c382d9122e1cd851a2b4d377a1d6",
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
    "ref": "CLM-2305c382d9122e1cd851a2b4d377a1d6",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 42,
          "git_oid": "2dcd31013e4c",
          "accepted": "2026-10-19T21:43:44.788859Z",
          "actor": "gate-owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "github.com",
          "digest": "sha256:ba04e79e5506",
          "change": "stated",
          "reason": {
            "kind": "change_set",
            "text": "Ask the hardening questions.",
            "proposal": "sha256:662094f301f3004bba4230407311d10d9ac84e503253a51e0072b108409f1caa"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-21T19:49:24.181273Z"
  }
});
