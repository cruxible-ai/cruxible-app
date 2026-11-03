// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 60eaa0ff
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:38e0aa3c58df7e96d70fcc2849e0cca6cd381757fe417cb7feb7d8298f16e1ed"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:38e0aa3c58df7e96d70fcc2849e0cca6cd381757fe417cb7feb7d8298f16e1ed",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:38e0aa3c58df7e96d70fcc2849e0cca6cd381757fe417cb7feb7d8298f16e1ed",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "pilot-owner",
          "admitted_at": "2026-11-03T00:58:38.787504Z",
          "rationale": "Watch the pilot's CVEs.",
          "changes": [
            {
              "path": "claims/02/CLM-0271b9294403b969583fbb4b96bb8aaa.json",
              "change": "create"
            },
            {
              "path": "claims/0b/CLM-0bfe93095b8b5556a4ae0b110a3a886b.json",
              "change": "create"
            },
            {
              "path": "claims/0d/CLM-0de2f307a5be2bad2be482b4a841d9e6.json",
              "change": "create"
            },
            {
              "path": "claims/10/CLM-1096bb2f883d4f839654cba4d9d99d74.json",
              "change": "create"
            },
            {
              "path": "claims/3c/CLM-3cb1f5c6e1c57c89d4b35183a3840167.json",
              "change": "create"
            },
            {
              "path": "claims/40/CLM-401958558f2c68bbf7de5ff9d57c755d.json",
              "change": "create"
            },
            {
              "path": "claims/67/CLM-671cda403929b9199d624791a43b7a3b.json",
              "change": "create"
            },
            {
              "path": "claims/6e/CLM-6e10fbb4d3da24812ddc9e95133d1c99.json",
              "change": "create"
            },
            {
              "path": "claims/8f/CLM-8f15a1e289dd4e69bf7a665177cc1143.json",
              "change": "create"
            },
            {
              "path": "claims/a4/CLM-a405b2a08fbc949bac5794292efc9d27.json",
              "change": "create"
            },
            {
              "path": "claims/ae/CLM-aefb09a9e4ae7b803d11a7a4765707ff.json",
              "change": "create"
            },
            {
              "path": "subjects/security.catalog/cisa-kev.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2014-0160.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2017-0144.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2019-0708.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2021-26855.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2021-44228.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2022-22965.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2023-38545.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2023-44487.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2023-4863.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2024-3094.json",
              "change": "create"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "evaluation_time": "2026-11-03T02:20:51.315664Z"
      }
    ]
  }
});
