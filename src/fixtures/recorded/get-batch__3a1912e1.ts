// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 5fbba68e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7"
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
        "ref": "Proposal:sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T17:43:01.517331Z",
          "rationale": "Proposed by Procedure security.sbom-import run RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1 terminal propose\n\n8 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/02/CLM-026f0ff9aa151a74d05a5a21013218b3.json",
              "change": "create"
            },
            {
              "path": "claims/3c/CLM-3c7114565fccbe38877d8f3857f865e6.json",
              "change": "create"
            },
            {
              "path": "claims/3f/CLM-3f8bcf4c88a0f6bc38dca19085124fbf.json",
              "change": "create"
            },
            {
              "path": "claims/45/CLM-4590484ab70197dc0a758aaf360beeda.json",
              "change": "create"
            },
            {
              "path": "claims/63/CLM-63717d756e5ffebd62beae615b040327.json",
              "change": "create"
            },
            {
              "path": "claims/67/CLM-67780731f7941176d4fc282295b10d75.json",
              "change": "create"
            },
            {
              "path": "claims/9a/CLM-9a189516792f7c42a2b4e25a2ce6ba1b.json",
              "change": "create"
            },
            {
              "path": "claims/af/CLM-af8c77e54da26f349d472526336e70d1.json",
              "change": "create"
            },
            {
              "path": "claims/d2/CLM-d24dc11c9022ce848f5f3492d43ce457.json",
              "change": "create"
            },
            {
              "path": "subjects/security.product/gate-app.json",
              "change": "create"
            },
            {
              "path": "subjects/security.release/gate-app--1.0.0.json",
              "change": "create"
            },
            {
              "path": "subjects/security.supplier/gate-example.json",
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
        "evaluation_time": "2026-10-26T19:05:11.528926Z"
      }
    ]
  }
});
