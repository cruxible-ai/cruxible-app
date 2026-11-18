// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 77aa4995
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
    "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
    "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
    "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
    "surface": "sdk",
    "section": "graph",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_console05",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "generation": 22,
    "proposed_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-08T19:47:52.374719Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "section": "graph",
    "graph": {
      "nodes": [
        {
          "subject": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046",
          "kind": "security.app_exposure"
        },
        {
          "subject": "security.catalog/cisa-kev",
          "kind": "security.catalog"
        },
        {
          "subject": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "kind": "security.component"
        },
        {
          "subject": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "kind": "security.component"
        },
        {
          "subject": "security.component/pkg-maven-org.slf4j-slf4j-api-1.7.32",
          "kind": "security.component"
        },
        {
          "subject": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
          "kind": "security.exposure"
        },
        {
          "subject": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0",
          "kind": "security.inventory"
        },
        {
          "subject": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "kind": "security.occurrence"
        },
        {
          "subject": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "kind": "security.occurrence"
        },
        {
          "subject": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32",
          "kind": "security.occurrence"
        },
        {
          "subject": "security.vulnerability/cve-2021-44228",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-44832",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-45046",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-45105",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2025-68161",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-34477",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-34479",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-34480",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2026-49844",
          "kind": "security.vulnerability"
        }
      ],
      "edges": [
        {
          "claim": "CLM-2383f94f7b8c2128e24ea365a8f1e736",
          "source": "security.vulnerability/cve-2021-44228",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        },
        {
          "claim": "CLM-166eec02c1a8488e6d50e1887a93c8a2",
          "source": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "predicate": "security.occurrence.component",
          "target": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1"
        },
        {
          "claim": "CLM-2b351352867e7803c2da8e754369dfbe",
          "source": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
          "predicate": "security.exposure.component",
          "target": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1"
        },
        {
          "claim": "CLM-4fced8fc4b88a529fe10693cf071bcf8",
          "source": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.occurrence.component",
          "target": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1"
        },
        {
          "claim": "CLM-2bbe4f9217105bdd4ebd3beb25fe3e29",
          "source": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32",
          "predicate": "security.occurrence.component",
          "target": "security.component/pkg-maven-org.slf4j-slf4j-api-1.7.32"
        },
        {
          "claim": "CLM-0edce0aae1b86e5820bf4796a93904fd",
          "source": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32",
          "predicate": "security.occurrence.inventory",
          "target": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0"
        },
        {
          "claim": "CLM-26a8f13c7043a67741f93284b0207957",
          "source": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.occurrence.inventory",
          "target": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0"
        },
        {
          "claim": "CLM-f37229fc9fc2cda5714cd728b89a6e57",
          "source": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "predicate": "security.occurrence.inventory",
          "target": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0"
        },
        {
          "claim": "CLM-fcfd853d0c1478e3c149ab00d2fc304b",
          "source": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046",
          "predicate": "security.app_exposure.occurrence",
          "target": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1"
        },
        {
          "claim": "CLM-31a877b93a71cb6ab36ad21553ba2337",
          "source": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228",
          "predicate": "security.exposure.vulnerability",
          "target": "security.vulnerability/cve-2021-44228"
        },
        {
          "claim": "CLM-9c9b10a978593f401d38b503968eada5",
          "source": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.component.affected_by",
          "target": "security.vulnerability/cve-2021-44832"
        },
        {
          "claim": "CLM-37ba310abdd6002b57407a07cbead4dd",
          "source": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.component.affected_by",
          "target": "security.vulnerability/cve-2021-45046"
        },
        {
          "claim": "CLM-ea8fa8387a70ed8887e40f9fe161a192",
          "source": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046",
          "predicate": "security.app_exposure.vulnerability",
          "target": "security.vulnerability/cve-2021-45046"
        },
        {
          "claim": "CLM-8a7df48883d0287639a5050cd99023c3",
          "source": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.component.affected_by",
          "target": "security.vulnerability/cve-2021-45105"
        },
        {
          "claim": "CLM-f4445d82c8e42f3578d2cc7500c83859",
          "source": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.component.affected_by",
          "target": "security.vulnerability/cve-2025-68161"
        },
        {
          "claim": "CLM-f1a9799dbbfdebf1249a5126d94a8806",
          "source": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.component.affected_by",
          "target": "security.vulnerability/cve-2026-34477"
        },
        {
          "claim": "CLM-e577b61eec8d3ba18cfba0ab124e0e5a",
          "source": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.component.affected_by",
          "target": "security.vulnerability/cve-2026-34479"
        },
        {
          "claim": "CLM-6e6f9abfeae22de66a67ba1e6a49be8a",
          "source": "security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1",
          "predicate": "security.component.affected_by",
          "target": "security.vulnerability/cve-2026-34480"
        },
        {
          "claim": "CLM-260724b6a176569d560f4d889ca9e36a",
          "source": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1",
          "predicate": "security.component.affected_by",
          "target": "security.vulnerability/cve-2026-49844"
        }
      ],
      "totals": {
        "subjects": 19
      }
    },
    "truncated": false,
    "next": [
      "cx.get(\"security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046\")"
    ]
  }
});
