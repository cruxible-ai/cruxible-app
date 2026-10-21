// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get c5f8b64a
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-8e3979a108f833d3d026632499e534e0",
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
    "ref": "CLM-8e3979a108f833d3d026632499e534e0",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 21,
          "git_oid": "02cb71eab326",
          "accepted": "2026-10-19T21:31:46.272392Z",
          "actor": "gate-owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "apache-log4j--1.2.17",
          "digest": "sha256:55739b531e29",
          "change": "stated",
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.cve-applicability run RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d terminal propose\n\n12 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "97040dbfdd1e",
      "generation": 58
    },
    "evaluation_time": "2026-10-21T19:49:22.581065Z"
  }
});
