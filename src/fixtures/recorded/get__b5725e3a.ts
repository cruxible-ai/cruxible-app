// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 0a18eb3c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
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
    "ref": "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 8,
          "git_oid": "41dc120513a2",
          "accepted": "2026-10-26T17:45:00.485705Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "lifecycle": "live",
          "value": "2021-12-10",
          "digest": "sha256:d77e6f49b95e",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "CISA KEV catalog 2026.10.23 lists CVE-2021-44228 with dateAdded = '2021-12-10'.",
            "proposal": "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
            "procedure": "Procedure:security.kev-triage",
            "run": "RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d",
            "terminal": "settle"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:05.145923Z"
  }
});
