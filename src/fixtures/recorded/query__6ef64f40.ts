// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query a7439920
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "security.component",
    "select": [
      "security.component.purl",
      "security.component.affected_by"
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
    "kind": "security.component",
    "columns": [
      {
        "name": "purl",
        "predicate": "security.component.purl",
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "affected_by",
        "predicate": "security.component.affected_by",
        "type": "subject<security.vulnerability>",
        "members": null,
        "cardinality": "many"
      }
    ],
    "rows": [
      {
        "subject": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
        "subject_id": "pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
        "purl": "pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1",
        "affected_by": [
          "security.vulnerability/cve-2026-49844"
        ],
        "flags": [],
        "claims": {
          "purl": [
            {
              "claim": "CLM-8a2aa0b007172937744ad435748008d3",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "affected_by": [
            {
              "claim": "CLM-260724b6a176569d560f4d889ca9e36a",
              "value": "security.vulnerability/cve-2026-49844",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
        "subject_id": "pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
        "purl": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
        "affected_by": [
          "security.vulnerability/cve-2021-44832",
          "security.vulnerability/cve-2021-45046",
          "security.vulnerability/cve-2021-45105",
          "security.vulnerability/cve-2025-68161",
          "security.vulnerability/cve-2026-34477",
          "security.vulnerability/cve-2026-34479",
          "security.vulnerability/cve-2026-34480"
        ],
        "flags": [],
        "claims": {
          "purl": [
            {
              "claim": "CLM-ef31d541ed4121c834f9a78861197043",
              "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "affected_by": [
            {
              "claim": "CLM-37ba310abdd6002b57407a07cbead4dd",
              "value": "security.vulnerability/cve-2021-45046",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            },
            {
              "claim": "CLM-6e6f9abfeae22de66a67ba1e6a49be8a",
              "value": "security.vulnerability/cve-2026-34480",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            },
            {
              "claim": "CLM-8a7df48883d0287639a5050cd99023c3",
              "value": "security.vulnerability/cve-2021-45105",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            },
            {
              "claim": "CLM-9c9b10a978593f401d38b503968eada5",
              "value": "security.vulnerability/cve-2021-44832",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            },
            {
              "claim": "CLM-e577b61eec8d3ba18cfba0ab124e0e5a",
              "value": "security.vulnerability/cve-2026-34479",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            },
            {
              "claim": "CLM-f1a9799dbbfdebf1249a5126d94a8806",
              "value": "security.vulnerability/cve-2026-34477",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            },
            {
              "claim": "CLM-f4445d82c8e42f3578d2cc7500c83859",
              "value": "security.vulnerability/cve-2025-68161",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        },
        "nones": {
          "affected_by": [
            {
              "claim": "CLM-e494006e42c7d0101744f5d3561721f8",
              "of": "security.vulnerability/cve-2021-44228",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.component/pkg-maven-org.slf4j-slf4j-api-1.7.32",
        "subject_id": "pkg-maven-org.slf4j-slf4j-api-1.7.32",
        "purl": "pkg:maven/org.slf4j/slf4j-api@1.7.32",
        "affected_by": [],
        "flags": [],
        "claims": {
          "purl": [
            {
              "claim": "CLM-e01bb45e424baa71f145284d2e53288b",
              "value": "pkg:maven/org.slf4j/slf4j-api@1.7.32",
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
      "spec_digest": "sha256:e17c0300281bf8be6599bb653178d54610a071707e7741a596f558af173c0dc5",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "evaluation_time": "2026-11-07T22:22:54.205827Z"
    }
  }
});
