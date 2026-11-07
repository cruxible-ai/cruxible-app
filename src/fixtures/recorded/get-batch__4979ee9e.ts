// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 82b0ae2d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-9eff1367310e902cdc436efb18e64336",
      "CLM-1817b5bf41dbacad208487b99a2a275d",
      "CLM-df2e21236111d6da62b2da4022a65fdb",
      "CLM-c79e9d236b888bada73738d2f0dc0e1d",
      "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
      "CLM-0c497ce6493bc6eea94579dbc0e294fa",
      "CLM-7d0e73b0e07c961fb1024d98d258f43a",
      "CLM-2383f94f7b8c2128e24ea365a8f1e736"
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
        "ref": "CLM-9eff1367310e902cdc436efb18e64336",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-9eff1367310e902cdc436efb18e64336",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "cve_id",
          "predicate_full": "security.vulnerability.cve_id",
          "value": "CVE-2021-44228",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-9eff1367310e902cdc436efb18e64336\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-11-07T22:22:55.789676Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-1817b5bf41dbacad208487b99a2a275d",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-1817b5bf41dbacad208487b99a2a275d",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "epss_percentile",
          "predicate_full": "security.vulnerability.epss_percentile",
          "value": "1",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-1817b5bf41dbacad208487b99a2a275d\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-11-07T22:22:55.812649Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-df2e21236111d6da62b2da4022a65fdb",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-df2e21236111d6da62b2da4022a65fdb",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "epss_score",
          "predicate_full": "security.vulnerability.epss_score",
          "value": "0.99999",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-df2e21236111d6da62b2da4022a65fdb\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-11-07T22:22:55.834662Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-c79e9d236b888bada73738d2f0dc0e1d",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-c79e9d236b888bada73738d2f0dc0e1d",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "epss_score_date",
          "predicate_full": "security.vulnerability.epss_score_date",
          "value": "2026-11-02",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-c79e9d236b888bada73738d2f0dc0e1d\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-11-07T22:22:55.856256Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "kev_date_added",
          "predicate_full": "security.vulnerability.kev_date_added",
          "value": "2021-12-10",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-bed7e93c75f3e67bc9a0431a4d3725b7\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-11-07T22:22:55.878920Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-0c497ce6493bc6eea94579dbc0e294fa",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-0c497ce6493bc6eea94579dbc0e294fa",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "kev_due_date",
          "predicate_full": "security.vulnerability.kev_due_date",
          "value": "2021-12-24",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-0c497ce6493bc6eea94579dbc0e294fa\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-11-07T22:22:55.901061Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-7d0e73b0e07c961fb1024d98d258f43a",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-7d0e73b0e07c961fb1024d98d258f43a",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "kev_ransomware_use",
          "predicate_full": "security.vulnerability.kev_ransomware_use",
          "value": "Known",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-7d0e73b0e07c961fb1024d98d258f43a\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-11-07T22:22:55.922593Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-2383f94f7b8c2128e24ea365a8f1e736",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "literal",
          "claim": "CLM-2383f94f7b8c2128e24ea365a8f1e736",
          "subject": "security.vulnerability/cve-2021-44228",
          "predicate": "listed_in",
          "predicate_full": "security.vulnerability.listed_in",
          "value": "security.catalog/cisa-kev",
          "effective_from": "2021-12-10T00:00:00Z",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-07T18:00:00.000000Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-2383f94f7b8c2128e24ea365a8f1e736\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2021-44228\")"
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
        "evaluation_time": "2026-11-07T22:22:55.944706Z"
      }
    ]
  }
});
