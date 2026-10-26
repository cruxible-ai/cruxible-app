// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 10513558
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9"
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
        "ref": "Proposal:sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T17:44:38.124878Z",
          "rationale": "Proposed by Procedure security.osv-applicability run RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8 terminal propose\n\n106 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/03/CLM-03a56a6c4387bbefba236ca953511fa9.json",
              "change": "create"
            },
            {
              "path": "claims/05/CLM-0561b974c2a1c883474ee73892b05737.json",
              "change": "create"
            },
            {
              "path": "claims/05/CLM-0578d8724b2df538b23171e109ff3d37.json",
              "change": "create"
            },
            {
              "path": "claims/09/CLM-0993d5c462e4cb3fcfa796ac81daffaf.json",
              "change": "create"
            },
            {
              "path": "claims/0c/CLM-0c0a1aad3b822d706618bbc863259d7c.json",
              "change": "create"
            },
            {
              "path": "claims/0c/CLM-0c0cfd1dd4e36ad6aab1593f26883065.json",
              "change": "create"
            },
            {
              "path": "claims/0f/CLM-0fbcf163f6553ed1224d7ef24b0ba87b.json",
              "change": "create"
            },
            {
              "path": "claims/0f/CLM-0fcadd4c99ec5c53767fb797d130d492.json",
              "change": "create"
            },
            {
              "path": "claims/10/CLM-101b24fb8d34e6ff99b1de2ff17d685f.json",
              "change": "create"
            },
            {
              "path": "claims/11/CLM-113f3b4e882e2044535320909da563b6.json",
              "change": "create"
            },
            {
              "path": "claims/16/CLM-16013c72172426a1750164f772f94f81.json",
              "change": "create"
            },
            {
              "path": "claims/1a/CLM-1a2c312cc29fc0087c37f1f56d9b71ad.json",
              "change": "create"
            },
            {
              "path": "claims/1d/CLM-1d531bb260a31b2d9b1fffcff8234d93.json",
              "change": "create"
            },
            {
              "path": "claims/20/CLM-20b19437f6df3aa83522e25691e26e65.json",
              "change": "create"
            },
            {
              "path": "claims/21/CLM-21f26c2241a321129da9500c1f536891.json",
              "change": "create"
            },
            {
              "path": "claims/24/CLM-241ebf7694772d4b0d8d02c3ca9f72f9.json",
              "change": "create"
            },
            {
              "path": "claims/2b/CLM-2b513fc434017984a91c9f55c6429062.json",
              "change": "create"
            },
            {
              "path": "claims/2e/CLM-2e199b2e3fd5b048311a37cfb4cda75d.json",
              "change": "create"
            },
            {
              "path": "claims/34/CLM-34d648447dc0d4e0bf0e3545548f9f35.json",
              "change": "create"
            },
            {
              "path": "claims/37/CLM-3774571bad96bee2400a20f30661dbff.json",
              "change": "create"
            },
            {
              "path": "claims/40/CLM-40eaf84ec507878cf8bf96ef60469512.json",
              "change": "create"
            },
            {
              "path": "claims/41/CLM-4188cd82d2e96bcdf1ae15cdb99cc6d2.json",
              "change": "create"
            },
            {
              "path": "claims/42/CLM-4285037ca8e65050fb6cb84bd2a9b131.json",
              "change": "create"
            },
            {
              "path": "claims/44/CLM-4491ffcb60cef497d786dc6fe5316ab3.json",
              "change": "create"
            },
            {
              "path": "claims/46/CLM-4642cf991ae7141668e684f415235edd.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "123 more; see detail=proof"
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
        "evaluation_time": "2026-10-26T19:05:11.545114Z"
      }
    ]
  }
});
