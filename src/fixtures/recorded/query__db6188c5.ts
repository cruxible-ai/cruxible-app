// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query 579e853b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "security.occurrence",
    "select": [
      "security.occurrence.inventory",
      "security.occurrence.component",
      "security.occurrence.scope"
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
    "kind": "security.occurrence",
    "columns": [
      {
        "name": "inventory",
        "predicate": "security.occurrence.inventory",
        "type": "subject<security.inventory>",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "component",
        "predicate": "security.occurrence.component",
        "type": "subject<security.component>",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "scope",
        "predicate": "security.occurrence.scope",
        "type": "enum",
        "members": [
          "required",
          "optional",
          "excluded"
        ],
        "cardinality": "one"
      }
    ],
    "rows": [
      {
        "subject": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
        "subject_id": "pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
        "inventory": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
        "component": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
        "scope": "required",
        "flags": [],
        "claims": {
          "inventory": [
            {
              "claim": "CLM-f37229fc9fc2cda5714cd728b89a6e57",
              "value": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "component": [
            {
              "claim": "CLM-166eec02c1a8488e6d50e1887a93c8a2",
              "value": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "scope": [
            {
              "claim": "CLM-082b9629ce4f8617014132248bf464c2",
              "value": "required",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
        "subject_id": "pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
        "inventory": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
        "component": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
        "scope": "required",
        "flags": [],
        "claims": {
          "inventory": [
            {
              "claim": "CLM-26a8f13c7043a67741f93284b0207957",
              "value": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "component": [
            {
              "claim": "CLM-4fced8fc4b88a529fe10693cf071bcf8",
              "value": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "scope": [
            {
              "claim": "CLM-192c7c7acdf45706da7f6166755eb680",
              "value": "required",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32",
        "subject_id": "pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32",
        "inventory": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
        "component": "security.component/pkg-maven-org.slf4j-slf4j-api-1.7.32",
        "scope": "required",
        "flags": [],
        "claims": {
          "inventory": [
            {
              "claim": "CLM-0edce0aae1b86e5820bf4796a93904fd",
              "value": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "component": [
            {
              "claim": "CLM-2bbe4f9217105bdd4ebd3beb25fe3e29",
              "value": "security.component/pkg-maven-org.slf4j-slf4j-api-1.7.32",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "scope": [
            {
              "claim": "CLM-8cb485b714e115292d9f48f2dbc178f9",
              "value": "required",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
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
      "spec_digest": "sha256:84af340b57cb279228e2740ba8f8a08ff03e51704cf0b06f77ae1143040ef7d1",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "evaluation_time": "2026-11-07T22:22:54.383820Z"
    }
  }
});
