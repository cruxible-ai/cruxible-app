// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch f29776da
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8"
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
        "ref": "Proposal:sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:18511759d6d1276ae4e0d7e028af21a68aa6a744893384261ee91a8048c613b8",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T17:45:00.485705Z",
          "rationale": "Proposed by Procedure security.kev-triage run RUN-4726c71b11264ad8fc067a43f81e7a9a1fc19e17f7653db14cb7bd7789c34a3d terminal settle\n\n20 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/01/CLM-011c7c86bec451feada08e3fc91a5a35.json",
              "change": "create"
            },
            {
              "path": "claims/0b/CLM-0ba682d76516d92976ce066cae115b97.json",
              "change": "create"
            },
            {
              "path": "claims/41/CLM-41c9e0ee191ce91fa9731005c20da68a.json",
              "change": "create"
            },
            {
              "path": "claims/44/CLM-44cb3a0c507c55a83dfa87271df743eb.json",
              "change": "create"
            },
            {
              "path": "claims/48/CLM-48d4bc20d4cce34d8e983b91887fc393.json",
              "change": "create"
            },
            {
              "path": "claims/4b/CLM-4b5486f4511b007407713633b70a2498.json",
              "change": "create"
            },
            {
              "path": "claims/4c/CLM-4c740f542205fd08336df797e00b487b.json",
              "change": "create"
            },
            {
              "path": "claims/50/CLM-500563d37a4b986f40c40bb387bf00ae.json",
              "change": "create"
            },
            {
              "path": "claims/56/CLM-56af3d99166b3e3173e577090f940d28.json",
              "change": "create"
            },
            {
              "path": "claims/89/CLM-89f7cfb21f1f04019960beecae869a62.json",
              "change": "create"
            },
            {
              "path": "claims/94/CLM-941d1107ba1bcc203c86e398936fa55e.json",
              "change": "create"
            },
            {
              "path": "claims/97/CLM-97d12aa5aa7c38661446df1637c891d4.json",
              "change": "create"
            },
            {
              "path": "claims/9b/CLM-9b23d4cf21dbb1736979d8f32938ba84.json",
              "change": "create"
            },
            {
              "path": "claims/a1/CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c.json",
              "change": "create"
            },
            {
              "path": "claims/a9/CLM-a9ad02f9ee0cb3fed192e995e09ec82f.json",
              "change": "create"
            },
            {
              "path": "claims/ac/CLM-ac3f3a34a3a8008e1bba7634dcea6f09.json",
              "change": "create"
            },
            {
              "path": "claims/ad/CLM-ad818c602c4681136561255547e06b39.json",
              "change": "create"
            },
            {
              "path": "claims/c0/CLM-c038e7aa40940bfdc28bc98dea107fc0.json",
              "change": "create"
            },
            {
              "path": "claims/d9/CLM-d9abf9a99b9126f3d91e41223daba103.json",
              "change": "create"
            },
            {
              "path": "claims/e1/CLM-e16516a616965fd3b6178189ce9a0957.json",
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
        "evaluation_time": "2026-10-26T19:05:11.561038Z"
      }
    ]
  }
});
