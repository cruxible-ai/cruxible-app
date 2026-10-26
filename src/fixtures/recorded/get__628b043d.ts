// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 54e6e148
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-d8674016342604fe9cf0b887fdb4ade5",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "CLM-d8674016342604fe9cf0b887fdb4ade5",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 12,
          "git_oid": "f3765015f78f",
          "accepted": "2026-10-26T19:00:09.706610Z",
          "actor": "robertmalone",
          "approved_by": [],
          "lifecycle": "live",
          "value": "not_affected",
          "digest": "sha256:7d31070eca11",
          "change": "stated",
          "reason": {
            "kind": "change_set",
            "text": "The maintainer reads the launcher flag as a mitigation; OSV says affected.",
            "proposal": "sha256:082cdfbfea18fc362afba30963c4f516a62adecd8c372abe14dcb536405f4db0"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:03.960505Z"
  }
});
