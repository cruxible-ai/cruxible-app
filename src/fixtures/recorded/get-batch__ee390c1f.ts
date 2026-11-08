// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 104127ff
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:6e24aedca9ef02c43a3b4d186ecb3869d7c7b71731ef988e662528ab5f839b73"
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
        "ref": "Proposal:sha256:6e24aedca9ef02c43a3b4d186ecb3869d7c7b71731ef988e662528ab5f839b73",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:6e24aedca9ef02c43a3b4d186ecb3869d7c7b71731ef988e662528ab5f839b73",
          "status": "open",
          "verdict": "candidate",
          "actor": "owner",
          "admitted_at": "2026-11-07T22:22:26.126484Z",
          "rationale": "JDBC appender not configured.",
          "changes": [
            {
              "path": "claims/85/CLM-855697c90bdb9ebe184a35ec451c879b.json",
              "change": "create"
            },
            {
              "path": "claims/9c/CLM-9c9b10a978593f401d38b503968eada5.json",
              "change": "retire"
            },
            {
              "path": "claims/e3/CLM-e3847133e0eac95fcc91d1bccd479825.json",
              "change": "create"
            },
            {
              "path": "claims/f0/CLM-f0cb46d873e7e3acb4fd1ca670d5b7d2.json",
              "change": "create"
            },
            {
              "path": "claims/fa/CLM-fa610c3042e1130b317c2bd2878f6020.json",
              "change": "create"
            },
            {
              "path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44832.json",
              "change": "create"
            }
          ],
          "next": [
            "cx.proposal(\"sha256:6e24aedca9ef02c43a3b4d186ecb3869d7c7b71731ef988e662528ab5f839b73\").review()"
          ]
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
        "evaluation_time": "2026-11-08T19:48:01.173110Z"
      }
    ]
  }
});
