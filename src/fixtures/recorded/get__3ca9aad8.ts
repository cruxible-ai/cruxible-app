// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 58df0e18
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "CLM-43d7d3d84f4e701b4c03352351de26a9",
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
    "ref": "CLM-43d7d3d84f4e701b4c03352351de26a9",
    "kind": "claim",
    "detail": "history",
    "history": {
      "kind": "revisions",
      "revisions": [
        {
          "revision": 1,
          "sequence": 9,
          "git_oid": "8ea9f5e27c78",
          "accepted": "2026-10-26T18:55:53.263624Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "lifecycle": "live",
          "value": "pkg:githubactions/astral-sh/setup-uv@v4",
          "digest": "sha256:880e0cdf6bab",
          "change": "stated",
          "reason": {
            "kind": "procedure_item",
            "reason": "github.com/cruxible-ai/cruxible@main:.github/workflows/ at 4e9b5db950bc: .github/workflows/ci.yml job docker-image-test holds uses values as declared.",
            "proposal": "sha256:97b013f25a672edf9cd5d8fe4c1a0641d4df2b3a7d89974835efa5305016eaa9",
            "procedure": "Procedure:security.repo-parse",
            "run": "RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc",
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
    "evaluation_time": "2026-10-26T19:05:07.240789Z"
  }
});
