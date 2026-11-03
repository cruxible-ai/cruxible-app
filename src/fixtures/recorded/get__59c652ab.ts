// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get cfa807eb
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-671cda403929b9199d624791a43b7a3b",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-671cda403929b9199d624791a43b7a3b",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 7,
          "git_oid": "bd4d2aaab78a",
          "accepted": "2026-11-03T00:58:38.787504Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "CVE-2014-0160",
          "digest": "sha256:779e6ef226ad",
          "change": "stated",
          "reason": {
            "kind": "change_set",
            "text": "Watch the pilot's CVEs.",
            "proposal": "sha256:38e0aa3c58df7e96d70fcc2849e0cca6cd381757fe417cb7feb7d8298f16e1ed"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "evaluation_time": "2026-11-03T02:20:48.681611Z"
  }
});
