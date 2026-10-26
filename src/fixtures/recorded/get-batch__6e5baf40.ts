// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch c9638810
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:4ae73e170d7719f23d69aaa20cc155eff23000a34b09c1e91f514d89ff241dd2"
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
        "ref": "Proposal:sha256:4ae73e170d7719f23d69aaa20cc155eff23000a34b09c1e91f514d89ff241dd2",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:4ae73e170d7719f23d69aaa20cc155eff23000a34b09c1e91f514d89ff241dd2",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T18:55:55.268912Z",
          "rationale": "Proposed by Procedure security.registry-parse run RUN-3ad7fb91dc2ab48cb491b6db76afecac4e83926713c4c80e161c9824fa98364a terminal propose\n\n57 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/01/CLM-0189e6ed70707e18266534b005a36426.json",
              "change": "create"
            },
            {
              "path": "claims/03/CLM-034653957d0d97ea2ebc56da5ecbe2ce.json",
              "change": "create"
            },
            {
              "path": "claims/07/CLM-0745d25da599da83eadc5ef133d00492.json",
              "change": "create"
            },
            {
              "path": "claims/09/CLM-09071762c7b9b8ac09b1f45ba36ae043.json",
              "change": "create"
            },
            {
              "path": "claims/0a/CLM-0aff8dfd1a7e7583ada67710bc394ec8.json",
              "change": "create"
            },
            {
              "path": "claims/0c/CLM-0cb902ba301cb9be3257151c2b95678a.json",
              "change": "create"
            },
            {
              "path": "claims/0e/CLM-0ea266250d1bbc7a84741fe3b2fec849.json",
              "change": "create"
            },
            {
              "path": "claims/10/CLM-10f10f6342ce6a78e540e7d47ce1a2ad.json",
              "change": "create"
            },
            {
              "path": "claims/11/CLM-119bc685f181df7ec6cced3fd7c91154.json",
              "change": "create"
            },
            {
              "path": "claims/11/CLM-11e036f14ee39da1ecc46e1859906d8f.json",
              "change": "create"
            },
            {
              "path": "claims/12/CLM-1278d27c7996058e9b0201a7bd843862.json",
              "change": "create"
            },
            {
              "path": "claims/16/CLM-16d8db3a8473afef66e45dea200f3e2b.json",
              "change": "create"
            },
            {
              "path": "claims/17/CLM-17b2b25beb3d5a203cbfc10d34263873.json",
              "change": "create"
            },
            {
              "path": "claims/19/CLM-19c052a6fd558786f71e28f11de873d7.json",
              "change": "create"
            },
            {
              "path": "claims/1b/CLM-1b8b2c5b79670ea9da1ab8219df46a14.json",
              "change": "create"
            },
            {
              "path": "claims/1f/CLM-1f4789707ed7b02c869dd084de7de9d5.json",
              "change": "create"
            },
            {
              "path": "claims/24/CLM-244ee7dc7e0168dec3c27eddaa96ba1f.json",
              "change": "create"
            },
            {
              "path": "claims/26/CLM-260c9512aab0b80c00d985c8b1838a1e.json",
              "change": "create"
            },
            {
              "path": "claims/31/CLM-31f8eea68b6cf0d7f8a43fe35b224590.json",
              "change": "create"
            },
            {
              "path": "claims/33/CLM-33cd16758f3be8f6c5cb6fec2de161f7.json",
              "change": "create"
            },
            {
              "path": "claims/34/CLM-349b2a23bc14ec9b26e6ca1cb9b82127.json",
              "change": "create"
            },
            {
              "path": "claims/35/CLM-357e366f17c1175774d6247e654565ea.json",
              "change": "create"
            },
            {
              "path": "claims/36/CLM-3682849212082a32be6ffd025495d312.json",
              "change": "create"
            },
            {
              "path": "claims/40/CLM-40bbdac2c4f1fbab11a65ed7abe995d5.json",
              "change": "create"
            },
            {
              "path": "claims/41/CLM-41eb5ff94ae9b06105daafe7f943be81.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "65 more; see detail=proof"
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
        "evaluation_time": "2026-10-26T19:05:11.587673Z"
      }
    ]
  }
});
