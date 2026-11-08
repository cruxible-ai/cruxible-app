// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch d2c2294f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:32612999e10ee8f8882e49d3cc7d5dccfd8f1ccd32f839161e31587d89435ba9"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:32612999e10ee8f8882e49d3cc7d5dccfd8f1ccd32f839161e31587d89435ba9",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "originating_line": {
            "identity": {
              "kind": "Line",
              "name": "security.osv-query"
            },
            "artifact_digest": "sha256:9414d065664fd6253f5e65d224da37a34024bb09e45287a7c20f07951bfddb47"
          },
          "proposal": "sha256:32612999e10ee8f8882e49d3cc7d5dccfd8f1ccd32f839161e31587d89435ba9",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "owner",
          "admitted_at": "2026-11-07T18:00:00.000000Z",
          "rationale": "Proposed by Procedure security.osv-query run RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051 terminal write\n\n18 items; each item's reason is recorded with the Claim or Subject it explains.",
          "generation": 17,
          "changes": [
            {
              "path": "claims/07/CLM-075404ffec9775e1fb4928ac66596f62.json",
              "change": "create"
            },
            {
              "path": "claims/0e/CLM-0e6c4d9b01892c8050e62029ae961f1d.json",
              "change": "create"
            },
            {
              "path": "claims/24/CLM-24f212930d41b0d8eb16330e48648629.json",
              "change": "create"
            },
            {
              "path": "claims/26/CLM-260724b6a176569d560f4d889ca9e36a.json",
              "change": "create"
            },
            {
              "path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
              "change": "create"
            },
            {
              "path": "claims/42/CLM-420ea3f896570211129c42f3b1dfa5df.json",
              "change": "create"
            },
            {
              "path": "claims/44/CLM-44ef6ae26ec37a36ef086b3cd329b469.json",
              "change": "create"
            },
            {
              "path": "claims/49/CLM-49cde40ee49e69a461b75ed1cf8471c4.json",
              "change": "create"
            },
            {
              "path": "claims/65/CLM-6560384e235d3930b9b35de1d980518e.json",
              "change": "create"
            },
            {
              "path": "claims/68/CLM-68b8ad23bbe030671b6b79a0cff74ff9.json",
              "change": "create"
            },
            {
              "path": "claims/6e/CLM-6e6f9abfeae22de66a67ba1e6a49be8a.json",
              "change": "create"
            },
            {
              "path": "claims/8a/CLM-8a7df48883d0287639a5050cd99023c3.json",
              "change": "create"
            },
            {
              "path": "claims/9c/CLM-9c9b10a978593f401d38b503968eada5.json",
              "change": "create"
            },
            {
              "path": "claims/9e/CLM-9eff1367310e902cdc436efb18e64336.json",
              "change": "create"
            },
            {
              "path": "claims/e5/CLM-e577b61eec8d3ba18cfba0ab124e0e5a.json",
              "change": "create"
            },
            {
              "path": "claims/ee/CLM-ee9fdb042bee8315276c80153e402b49.json",
              "change": "create"
            },
            {
              "path": "claims/f1/CLM-f1a9799dbbfdebf1249a5126d94a8806.json",
              "change": "create"
            },
            {
              "path": "claims/f4/CLM-f4445d82c8e42f3578d2cc7500c83859.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2021-44228.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2021-44832.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2021-45046.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2021-45105.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2025-68161.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2026-34477.json",
              "change": "create"
            },
            {
              "path": "subjects/security.vulnerability/cve-2026-34479.json",
              "change": "create"
            },
            {
              "path": "…",
              "change": "2 more; see detail=proof"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "30e90cc6ad34",
          "generation": 22
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "evaluation_time": "2026-11-08T19:48:01.053693Z"
      }
    ]
  }
});
