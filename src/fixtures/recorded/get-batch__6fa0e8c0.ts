// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch b70ad226
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915"
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
        "ref": "Proposal:sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "owner",
          "admitted_at": "2026-11-07T22:22:24.799862Z",
          "rationale": "log4j-core 2.14.1 as shipped here has no JndiLookup class.",
          "generation": 20,
          "changes": [
            {
              "path": "capture-contracts/playbill.foreign-source.triage.notes.json",
              "change": "create"
            },
            {
              "path": "claims/24/CLM-24f212930d41b0d8eb16330e48648629.json",
              "change": "retire"
            },
            {
              "path": "claims/2b/CLM-2b351352867e7803c2da8e754369dfbe.json",
              "change": "create"
            },
            {
              "path": "claims/31/CLM-31a877b93a71cb6ab36ad21553ba2337.json",
              "change": "create"
            },
            {
              "path": "claims/e2/CLM-e23f7cd216e8b6e96ff16a3a7daac160.json",
              "change": "create"
            },
            {
              "path": "claims/e4/CLM-e494006e42c7d0101744f5d3561721f8.json",
              "change": "create"
            },
            {
              "path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228.json",
              "change": "create"
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
        "evaluation_time": "2026-11-07T22:23:00.075660Z"
      }
    ]
  }
});
