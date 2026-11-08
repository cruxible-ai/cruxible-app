// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient a7d1d3fa
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
    "evaluation_time": "2026-11-08T19:47:54.658443Z",
    "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
    "retention_generations": 64,
    "you": {
      "actor": "operator",
      "can_author": false,
      "authoring_refusal": {
        "code": "cruxible.identity.principal_unconfigured",
        "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
        "repair": {
          "operation": "cruxible.orient",
          "arguments": {
            "section": "principals",
            "configure": "CRUXIBLE_PRINCIPAL_ID"
          }
        }
      }
    },
    "kinds": [
      {
        "kind": "security.app_exposure",
        "subjects": 1,
        "identity": "keys: security.app_exposure.occurrence: subject<security.occurrence>, security.app_exposure.vulnerability: subject<security.vulnerability> (unique)",
        "fields": [
          "justification",
          "occurrence",
          "vulnerability"
        ]
      },
      {
        "kind": "security.catalog",
        "subjects": 1,
        "identity": "keys: security.catalog.catalog_id (unique)",
        "fields": [
          "catalog_id"
        ]
      },
      {
        "kind": "security.component",
        "subjects": 3,
        "identity": "keys: security.component.purl (unique)",
        "fields": [
          "affected_by",
          "purl"
        ]
      },
      {
        "kind": "security.exposure",
        "subjects": 1,
        "identity": "keys: security.exposure.component: subject<security.component>, security.exposure.vulnerability: subject<security.vulnerability> (unique)",
        "fields": [
          "component",
          "justification",
          "vulnerability"
        ]
      },
      {
        "kind": "security.inventory",
        "subjects": 1,
        "identity": "keys: security.inventory.inventory_id (unique)",
        "fields": [
          "inventory_id"
        ]
      },
      {
        "kind": "security.occurrence",
        "subjects": 3,
        "identity": "keys: security.occurrence.inventory: subject<security.inventory>, security.occurrence.component: subject<security.component> (unique)",
        "fields": [
          "component",
          "inventory",
          "scope"
        ]
      },
      {
        "kind": "security.vulnerability",
        "subjects": 9,
        "identity": "keys: security.vulnerability.cve_id (unique)",
        "fields": [
          "cve_id",
          "epss_percentile",
          "epss_score",
          "epss_score_date",
          "kev_date_added"
        ],
        "more_fields": 3
      }
    ],
    "artifacts": {
      "claim_types": 23,
      "procedures": 4,
      "documents": 1,
      "queries": 8,
      "operations": 9,
      "lines": 4,
      "runbooks": 2,
      "captures": 14,
      "capture_contracts": 8,
      "resolution_contracts": 0,
      "mandates": 8,
      "runs": 5,
      "running": 0,
      "claims": {
        "accepted": 52,
        "conflicted": 2,
        "overturned": 0,
        "ineligible": 0,
        "retired": 1
      }
    },
    "attention": {
      "next_items": 3,
      "open_proposals": 2,
      "top": [
        "blocking claim_conflicted: subjects/security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046.json",
        "warning claim_new_evidence_unreviewed: Claim:CLM-260724b6a176569d560f4d889ca9e36a",
        "warning claim_new_evidence_unreviewed: Claim:CLM-260724b6a176569d560f4d889ca9e36a"
      ],
      "setup_items": 4
    },
    "queries": [
      {
        "name": "security.app_not_affected_judgments",
        "description": "Every app-level not_affected judgment: the inventory, the component, the vulnerability and the VEX justification.",
        "params": []
      },
      {
        "name": "security.inventory_components",
        "description": "One inventory's current components: each occurrence holding a scope, with the component's purl and its scope.",
        "params": [
          "inventory: subject_reference"
        ]
      },
      {
        "name": "security.kev_triage_backlog",
        "description": "The KEV-listed exposures nobody has judged yet, by EPSS score (pairs under investigation stay).",
        "params": []
      },
      {
        "name": "security.not_affected_judgments",
        "description": "Every package-level not_affected judgment: the component, the vulnerability and the VEX justification.",
        "params": []
      },
      {
        "name": "security.osv_components",
        "description": "Every component some inventory holds (an occurrence with a scope), one row each: what OSV is asked.",
        "params": []
      },
      {
        "name": "security.urgent_exposures",
        "description": "Every occurrence (an inventory's component) a vulnerability affects, KEV-listed first, then by EPSS score; a package-level or app-level judgment removes it.",
        "params": []
      },
      {
        "name": "security.watched_cve_keys",
        "description": "The CVE id of every watched vulnerability: EPSS's key list.",
        "params": []
      },
      {
        "name": "security.watched_vulnerabilities",
        "description": "Every vulnerability that affects a component of an imported inventory.",
        "params": []
      }
    ],
    "truncated": false,
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "30e90cc6ad34",
        "generation": 22
      },
      "fields": [
        "artifacts.runs",
        "artifacts.running"
      ]
    },
    "next": [
      "cx.orient(kind=\"security.vulnerability\")",
      "cx.query(kind=\"security.vulnerability\", select=[\"cve_id\", \"epss_percentile\", \"epss_score\"], limit=10)",
      "cx.next(expiring_within=Duration.days(count=7))",
      "cx.orient(section=\"operations\")",
      "cx.orient(section=\"lines\")",
      "cx.orient(section=\"runbooks\")"
    ]
  }
});
