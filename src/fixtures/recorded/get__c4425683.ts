// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get a8d8fde8
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-9e4f8791743a16db325166310248d6d2",
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
    "ref": "CLM-9e4f8791743a16db325166310248d6d2",
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
          "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
          "digest": "sha256:43137acabb74",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "The component pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1 brings CVE-2021-44228 in. OSV lists CVE-2021-44228 as affecting pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1 (GHSA-jfh8-c2jp-5v3q, fixed in 2.12.2, 2.15.0, 2.3.1).",
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
    "evaluation_time": "2026-10-26T19:05:03.474267Z"
  }
});
