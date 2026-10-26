// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 71bdb595
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-026f0ff9aa151a74d05a5a21013218b3",
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
    "ref": "CLM-026f0ff9aa151a74d05a5a21013218b3",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 6,
          "git_oid": "a021b33e7af8",
          "accepted": "2026-10-26T17:43:01.517331Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "lifecycle": "live",
          "value": "security.product/gate-app",
          "digest": "sha256:5a945a4217f1",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "CycloneDX SBOM for gate-app 1.0.0: the release is a version of gate-app.",
            "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
            "procedure": "Procedure:security.sbom-import",
            "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
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
    "evaluation_time": "2026-10-26T19:05:08.591647Z"
  }
});
