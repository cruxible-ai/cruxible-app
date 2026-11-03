// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 83bf4338
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-3f6b80fb033f0d7166cec0884675bed1",
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
    "ref": "CLM-3f6b80fb033f0d7166cec0884675bed1",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 9,
          "git_oid": "677ae9bd9620",
          "accepted": "2026-11-03T00:58:48.471271Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "2022-05-04",
          "digest": "sha256:4017542f809a",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.30: dateAdded 2022-05-04.",
            "proposal": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
            "terminal": "write"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "7f513078c490",
      "generation": 10
    },
    "evaluation_time": "2026-11-03T02:20:48.906077Z"
  }
});
