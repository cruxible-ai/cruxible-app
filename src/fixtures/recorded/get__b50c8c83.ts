// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get a1b7c2ae
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-58325fbdd5bff786556a30110917b174",
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
    "ref": "CLM-58325fbdd5bff786556a30110917b174",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 10,
          "git_oid": "7f513078c490",
          "accepted": "2026-11-03T00:58:54.573196Z",
          "actor": "pilot-owner",
          "approved_by": [],
          "lifecycle": "live",
          "value": "2026-11-02",
          "digest": "sha256:8255bb4ce229",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "FIRST EPSS scored this CVE on 2026-11-02.",
            "proposal": "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
            "procedure": "Procedure:security.epss-triage",
            "run": "RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4",
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
    "evaluation_time": "2026-11-03T02:20:48.834613Z"
  }
});
