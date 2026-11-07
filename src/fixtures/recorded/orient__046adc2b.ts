// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient bd084599
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
    "section": "subject_kinds",
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
    "accepted_at": "2026-11-07T22:22:25.432116Z",
    "evaluation_time": "2026-11-07T22:22:55.104597Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "section": "subject_kinds",
    "subject_kinds": [
      {
        "kind": "security.app_exposure",
        "rule": "keys",
        "keys": [
          "security.app_exposure.occurrence",
          "security.app_exposure.vulnerability"
        ],
        "uniqueness": "unique",
        "ends": [
          {
            "key": "security.app_exposure.occurrence",
            "kind": "security.occurrence"
          },
          {
            "key": "security.app_exposure.vulnerability",
            "kind": "security.vulnerability"
          }
        ]
      },
      {
        "kind": "security.catalog",
        "rule": "keys",
        "keys": [
          "security.catalog.catalog_id"
        ],
        "uniqueness": "unique"
      },
      {
        "kind": "security.component",
        "rule": "keys",
        "keys": [
          "security.component.purl"
        ],
        "uniqueness": "unique"
      },
      {
        "kind": "security.exposure",
        "rule": "keys",
        "keys": [
          "security.exposure.component",
          "security.exposure.vulnerability"
        ],
        "uniqueness": "unique",
        "ends": [
          {
            "key": "security.exposure.component",
            "kind": "security.component"
          },
          {
            "key": "security.exposure.vulnerability",
            "kind": "security.vulnerability"
          }
        ]
      },
      {
        "kind": "security.inventory",
        "rule": "keys",
        "keys": [
          "security.inventory.inventory_id"
        ],
        "uniqueness": "unique"
      },
      {
        "kind": "security.occurrence",
        "rule": "keys",
        "keys": [
          "security.occurrence.inventory",
          "security.occurrence.component"
        ],
        "uniqueness": "unique",
        "ends": [
          {
            "key": "security.occurrence.inventory",
            "kind": "security.inventory"
          },
          {
            "key": "security.occurrence.component",
            "kind": "security.component"
          }
        ]
      },
      {
        "kind": "security.vulnerability",
        "rule": "keys",
        "keys": [
          "security.vulnerability.cve_id"
        ],
        "uniqueness": "unique"
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"SubjectKind:security.app_exposure\")"
    ]
  }
});
