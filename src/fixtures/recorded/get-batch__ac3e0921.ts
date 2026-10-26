// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 72f942c6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:156e9c3e95494753f355938dde3a90a889528219356110331a1e3f278d176a87"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:156e9c3e95494753f355938dde3a90a889528219356110331a1e3f278d176a87",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:156e9c3e95494753f355938dde3a90a889528219356110331a1e3f278d176a87",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T17:42:08.544760Z",
          "changes": [
            {
              "path": "provider-interfaces/security.epss-daily/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.osv-ecosystems/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.osv-query/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.pypi-release/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.release-asset/v1.json",
              "change": "create"
            },
            {
              "path": "provider-interfaces/security.repo-snapshot/v1.json",
              "change": "create"
            },
            {
              "path": "providers/security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3.json",
              "change": "create"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "f3765015f78f",
          "generation": 12
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "evaluation_time": "2026-10-26T19:05:11.465346Z"
      }
    ]
  }
});
