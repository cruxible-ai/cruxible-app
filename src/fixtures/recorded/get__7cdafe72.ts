// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get f702f488
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Line:security.epss-triage",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "limit": 1
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "Line:security.epss-triage",
    "kind": "line",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 8,
          "git_oid": "31a55f177018",
          "accepted": "2026-11-03T00:58:40.256215Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "digest": "sha256:f23593640075",
          "reason": {
            "kind": "change_set",
            "text": "Adopt the KEV and EPSS Lines: web.fetch from cisa.gov and api.first.org.",
            "proposal": "sha256:fd953fdd490da9b5b6034a2bff1ec7826891887adf6ffa9d98cb1731fb551a70"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "evaluation_time": "2026-11-03T02:20:50.125477Z"
  }
});
