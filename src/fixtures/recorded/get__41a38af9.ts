// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 897fc8dc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 20,
          "git_oid": "2419b8847316",
          "accepted": "2026-11-07T22:22:24.799862Z",
          "actor": "owner",
          "approved_by": [],
          "lifecycle": "live",
          "digest": "sha256:d53588265525",
          "reason": {
            "kind": "change_set",
            "text": "log4j-core 2.14.1 as shipped here has no JndiLookup class.",
            "proposal": "sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915"
          }
        }
      ],
      "events": [
        {
          "field": "component",
          "predicate": "security.exposure.component",
          "claim": "CLM-2b351352867e7803c2da8e754369dfbe",
          "sequence": 20,
          "git_oid": "2419b8847316",
          "accepted": "2026-11-07T22:22:24.799862Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "log4j-core 2.14.1 as shipped here has no JndiLookup class.",
            "proposal": "sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915"
          },
          "value": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "change": "stated"
        },
        {
          "field": "vulnerability",
          "predicate": "security.exposure.vulnerability",
          "claim": "CLM-31a877b93a71cb6ab36ad21553ba2337",
          "sequence": 20,
          "git_oid": "2419b8847316",
          "accepted": "2026-11-07T22:22:24.799862Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "log4j-core 2.14.1 as shipped here has no JndiLookup class.",
            "proposal": "sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915"
          },
          "value": "security.vulnerability/cve-2021-44228",
          "change": "stated"
        },
        {
          "field": "justification",
          "predicate": "security.exposure.justification",
          "claim": "CLM-e23f7cd216e8b6e96ff16a3a7daac160",
          "sequence": 20,
          "git_oid": "2419b8847316",
          "accepted": "2026-11-07T22:22:24.799862Z",
          "actor": "owner",
          "approved_by": [],
          "reason": {
            "kind": "change_set",
            "text": "log4j-core 2.14.1 as shipped here has no JndiLookup class.",
            "proposal": "sha256:4eab9d98c4306344800c68dbea1b589f684c549cea1e25d89eab0fe4f598f915"
          },
          "value": "vulnerable_code_not_present",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:58.395636Z"
  }
});
