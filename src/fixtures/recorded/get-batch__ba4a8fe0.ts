// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch f12ba3c8
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:dbb590e201d200fa506dca388612e00be4dc681a7bdab4ca4e1e64cdc7a031ed"
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
        "ref": "Proposal:sha256:dbb590e201d200fa506dca388612e00be4dc681a7bdab4ca4e1e64cdc7a031ed",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "originating_line": {
            "identity": {
              "kind": "Line",
              "name": "security.sbom-import.app"
            },
            "artifact_digest": "sha256:b616bff7e90c5dab6cc528caf2a940620e2acb2b795feb919c56d426ad0956e9"
          },
          "proposal": "sha256:dbb590e201d200fa506dca388612e00be4dc681a7bdab4ca4e1e64cdc7a031ed",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "owner",
          "admitted_at": "2026-11-07T18:00:00.000000Z",
          "rationale": "Proposed by Procedure security.sbom-import run RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5 terminal write\n\n10 items; each item's reason is recorded with the Claim or Subject it explains.",
          "generation": 16,
          "changes": [
            {
              "path": "claims/08/CLM-082b9629ce4f8617014132248bf464c2.json",
              "change": "create"
            },
            {
              "path": "claims/08/CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf.json",
              "change": "create"
            },
            {
              "path": "claims/0e/CLM-0edce0aae1b86e5820bf4796a93904fd.json",
              "change": "create"
            },
            {
              "path": "claims/16/CLM-166eec02c1a8488e6d50e1887a93c8a2.json",
              "change": "create"
            },
            {
              "path": "claims/19/CLM-192c7c7acdf45706da7f6166755eb680.json",
              "change": "create"
            },
            {
              "path": "claims/26/CLM-26a8f13c7043a67741f93284b0207957.json",
              "change": "create"
            },
            {
              "path": "claims/2b/CLM-2bbe4f9217105bdd4ebd3beb25fe3e29.json",
              "change": "create"
            },
            {
              "path": "claims/4f/CLM-4fced8fc4b88a529fe10693cf071bcf8.json",
              "change": "create"
            },
            {
              "path": "claims/8a/CLM-8a2aa0b007172937744ad435748008d3.json",
              "change": "create"
            },
            {
              "path": "claims/8c/CLM-8cb485b714e115292d9f48f2dbc178f9.json",
              "change": "create"
            },
            {
              "path": "claims/e0/CLM-e01bb45e424baa71f145284d2e53288b.json",
              "change": "create"
            },
            {
              "path": "claims/ef/CLM-ef31d541ed4121c834f9a78861197043.json",
              "change": "create"
            },
            {
              "path": "claims/f3/CLM-f37229fc9fc2cda5714cd728b89a6e57.json",
              "change": "create"
            },
            {
              "path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
              "change": "create"
            },
            {
              "path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "change": "create"
            },
            {
              "path": "subjects/security.component/pkg-maven-org.slf4j-slf4j-api-1.7.32.json",
              "change": "create"
            },
            {
              "path": "subjects/security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0.json",
              "change": "create"
            },
            {
              "path": "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
              "change": "create"
            },
            {
              "path": "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
              "change": "create"
            },
            {
              "path": "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32.json",
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
        "evaluation_time": "2026-11-07T22:23:00.146919Z"
      }
    ]
  }
});
