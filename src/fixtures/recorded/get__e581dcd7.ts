// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 2c448942
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
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
    "ref": "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "lifecycle": "live",
          "value": "pkg:maven/org.apache.logging.log4j/log4j-core",
          "digest": "sha256:fe9044f65592",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV's GHSA-jfh8-c2jp-5v3q name pkg:maven/org.apache.logging.log4j/log4j-core as affected by CVE-2021-44228.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          }
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:05.780095Z"
  }
});
