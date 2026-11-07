// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query 6da87a8f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "security.exposure",
    "select": [
      "security.exposure.component",
      "security.exposure.vulnerability",
      "security.exposure.justification"
    ],
    "claims": true,
    "limit": 100,
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    }
  },
  "response": {
    "tag": "playbill-query-page-v1",
    "kind": "security.exposure",
    "columns": [
      {
        "name": "component",
        "predicate": "security.exposure.component",
        "type": "subject<security.component>",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "vulnerability",
        "predicate": "security.exposure.vulnerability",
        "type": "subject<security.vulnerability>",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "justification",
        "predicate": "security.exposure.justification",
        "type": "enum",
        "members": [
          "vulnerable_code_not_present"
        ],
        "cardinality": "one"
      }
    ],
    "rows": [
      {
        "subject": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
        "subject_id": "pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
        "component": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
        "vulnerability": "security.vulnerability/cve-2021-44228",
        "justification": "vulnerable_code_not_present",
        "flags": [],
        "claims": {
          "component": [
            {
              "claim": "CLM-2b351352867e7803c2da8e754369dfbe",
              "value": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "vulnerability": [
            {
              "claim": "CLM-31a877b93a71cb6ab36ad21553ba2337",
              "value": "security.vulnerability/cve-2021-44228",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "justification": [
            {
              "claim": "CLM-e23f7cd216e8b6e96ff16a3a7daac160",
              "value": "vulnerable_code_not_present",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ]
        }
      }
    ],
    "truncated": false,
    "next_cursor": null,
    "remaining": 0,
    "capped": [],
    "notes": [],
    "receipt": {
      "mode": "inline",
      "spec_digest": "sha256:54758db21f9b7596d71004dd068ad0c6bfbbe49c5069a6f638b60c07fae60bb6",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "evaluation_time": "2026-11-07T22:22:54.273308Z"
    }
  }
});
