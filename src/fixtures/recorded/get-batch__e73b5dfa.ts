// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch a2e113d3
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:4add9d2cb594b38dde43d5b59e1feea01e032d37b8adaee126f4d3339f3a271f"
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
        "ref": "Proposal:sha256:4add9d2cb594b38dde43d5b59e1feea01e032d37b8adaee126f4d3339f3a271f",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:4add9d2cb594b38dde43d5b59e1feea01e032d37b8adaee126f4d3339f3a271f",
          "status": "open",
          "verdict": "candidate",
          "actor": "robertmalone",
          "admitted_at": "2026-10-26T17:45:39.755641Z",
          "rationale": "Proposed by Procedure security.epss-triage run RUN-eb4bb9536167f2f537efb359f50cac888bd843b69f452c30e2d6149cb2d564cc terminal settle\n\n28 items; each item's reason is recorded with the Claim or Subject it explains.",
          "changes": [
            {
              "path": "claims/01/CLM-01eda3ae953ca97a1353e5710aa4781b.json",
              "change": "create"
            },
            {
              "path": "claims/04/CLM-0498114c9f3378452dc4869da05bc98d.json",
              "change": "create"
            },
            {
              "path": "claims/0c/CLM-0c3f3d11fb345e2eb37ca527179c2e89.json",
              "change": "create"
            },
            {
              "path": "claims/0e/CLM-0eabb383136e471206959833b2fc5f4f.json",
              "change": "create"
            },
            {
              "path": "claims/17/CLM-17ad3bd118f01070eb4f5045db3d3a04.json",
              "change": "create"
            },
            {
              "path": "claims/22/CLM-22467ab42f408ac2a86248fe24df444a.json",
              "change": "create"
            },
            {
              "path": "claims/3a/CLM-3a858c91ec89fde06920944234774296.json",
              "change": "create"
            },
            {
              "path": "claims/4e/CLM-4e836fcb98d85df45c0d2f8d6af8a38f.json",
              "change": "create"
            },
            {
              "path": "claims/4f/CLM-4f8d14b5a01b4c5c391cc1ea094a790a.json",
              "change": "create"
            },
            {
              "path": "claims/5c/CLM-5c6dac9e31fbd0653ddbb6b003a5079c.json",
              "change": "create"
            },
            {
              "path": "claims/60/CLM-60b1d5963311ff7058dd5eb720d88d28.json",
              "change": "create"
            },
            {
              "path": "claims/69/CLM-696dc5cec2e4d1db306b6f5ee2af4c8b.json",
              "change": "create"
            },
            {
              "path": "claims/87/CLM-872fecf7dfdd2a2c60d59806fdacdd0b.json",
              "change": "create"
            },
            {
              "path": "claims/87/CLM-875207aee13860526700037a0ea348ce.json",
              "change": "create"
            },
            {
              "path": "claims/8f/CLM-8fd8e903c7e6f08956cdfca831b8181e.json",
              "change": "create"
            },
            {
              "path": "claims/a3/CLM-a392c6d67d380633dee26f6f895b8745.json",
              "change": "create"
            },
            {
              "path": "claims/a4/CLM-a494d572fc5dfc09ef3d21ea07f84e37.json",
              "change": "create"
            },
            {
              "path": "claims/b5/CLM-b5af59f21bcacfb689313e877e2b3f7e.json",
              "change": "create"
            },
            {
              "path": "claims/b7/CLM-b7d4d2e33aa9a77b72cc6d791c4b7758.json",
              "change": "create"
            },
            {
              "path": "claims/c7/CLM-c79f27ead4f587175062fd6fed88b827.json",
              "change": "create"
            },
            {
              "path": "claims/c9/CLM-c95416a9c13ad524fe4b584fede1f6e6.json",
              "change": "create"
            },
            {
              "path": "claims/d4/CLM-d46a66fec3d8e1e3c3746d25f17da9b3.json",
              "change": "create"
            },
            {
              "path": "claims/d6/CLM-d62ae968cd7a42ab80e19a1d97605267.json",
              "change": "create"
            },
            {
              "path": "claims/dc/CLM-dc4ebe771c90feba0e75d52c1422fc4e.json",
              "change": "create"
            },
            {
              "path": "claims/e2/CLM-e20e40ab1494ff34b8a53b490111bd19.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "3 more; see detail=proof"
            }
          ],
          "next": [
            "cx.proposal(\"sha256:4add9d2cb594b38dde43d5b59e1feea01e032d37b8adaee126f4d3339f3a271f\").review()"
          ]
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
        "evaluation_time": "2026-10-26T19:05:11.147169Z"
      }
    ]
  }
});
