// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 27963013
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:97b013f25a672edf9cd5d8fe4c1a0641d4df2b3a7d89974835efa5305016eaa9"
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
        "ref": "Proposal:sha256:97b013f25a672edf9cd5d8fe4c1a0641d4df2b3a7d89974835efa5305016eaa9",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:97b013f25a672edf9cd5d8fe4c1a0641d4df2b3a7d89974835efa5305016eaa9",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T18:55:53.263624Z",
          "rationale": "Proposed by Procedure security.repo-parse run RUN-298f446ec6e0a6a2a857e80179c95a0850155cf6c9c2b64c90c07b84d18c30dc terminal propose\n\n132 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/00/CLM-0005fc7e24e185fb706f1f057fda071f.json",
              "change": "create"
            },
            {
              "path": "claims/00/CLM-003d31d2f2e06ddcd8785837d7fa719d.json",
              "change": "create"
            },
            {
              "path": "claims/00/CLM-00963a2a46274b4eb262713bafc4e038.json",
              "change": "create"
            },
            {
              "path": "claims/01/CLM-011a62d69a9e44856e0e7ff11ae803e2.json",
              "change": "create"
            },
            {
              "path": "claims/01/CLM-01698b09dfbb41d383e207fc282acd1d.json",
              "change": "create"
            },
            {
              "path": "claims/02/CLM-0254c33a72ca70f02a0e05368563e2f1.json",
              "change": "create"
            },
            {
              "path": "claims/06/CLM-0630ad58bee7dffdaeba92a00c37322f.json",
              "change": "create"
            },
            {
              "path": "claims/07/CLM-077424808fa18418235f5fb43b846d07.json",
              "change": "create"
            },
            {
              "path": "claims/07/CLM-07c7531276f766e2037233981044dc91.json",
              "change": "create"
            },
            {
              "path": "claims/09/CLM-098255f6703e41729d5a6c5a4c292160.json",
              "change": "create"
            },
            {
              "path": "claims/0e/CLM-0e31d37bf5d1e2e020279f6f14cced65.json",
              "change": "create"
            },
            {
              "path": "claims/0e/CLM-0ed15f5bca6bcbc0f373d3bb42c3cb9b.json",
              "change": "create"
            },
            {
              "path": "claims/10/CLM-1016863d93ec3a199368f18267a1be80.json",
              "change": "create"
            },
            {
              "path": "claims/11/CLM-11b6bd808d1c76e5aad4c927e30bbf18.json",
              "change": "create"
            },
            {
              "path": "claims/12/CLM-12cf3bc7fb7254eecb3c9698c2594057.json",
              "change": "create"
            },
            {
              "path": "claims/13/CLM-137a9c6c1b1158ba973b213f420b0a6a.json",
              "change": "create"
            },
            {
              "path": "claims/14/CLM-14b6b2ef44f518600dbb76fe6e9b9b46.json",
              "change": "create"
            },
            {
              "path": "claims/17/CLM-17c699bd559f38c8877c59ec2d3cecb8.json",
              "change": "create"
            },
            {
              "path": "claims/18/CLM-18143c250645f33ee24c77994e1a2767.json",
              "change": "create"
            },
            {
              "path": "claims/1c/CLM-1cffd2b8f9a41eb8079febf52c976cbd.json",
              "change": "create"
            },
            {
              "path": "claims/1e/CLM-1e63fbe808f29f420331dfe979cb2ea3.json",
              "change": "create"
            },
            {
              "path": "claims/1e/CLM-1e7d93f56d958c7c1cea07ec737347fc.json",
              "change": "create"
            },
            {
              "path": "claims/1e/CLM-1edf5a09b5b9e919eca405e9847a19f5.json",
              "change": "create"
            },
            {
              "path": "claims/20/CLM-20f1877164742d5e95891ff9c525f0e8.json",
              "change": "create"
            },
            {
              "path": "claims/24/CLM-24347cfe86672cf44ab8070e8353c2c1.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "147 more; see detail=proof"
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
        "evaluation_time": "2026-10-26T19:05:11.573433Z"
      }
    ]
  }
});
