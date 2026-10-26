// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query 73fab097
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "Trigger",
    "where": [
      {
        "field": "schedule",
        "eq": "capture_landing"
      }
    ],
    "select": [
      "name",
      "schedule",
      "target",
      "capture_contract",
      "logical_sources"
    ],
    "limit": 500,
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    }
  },
  "response": {
    "tag": "playbill-query-page-v1",
    "kind": "Trigger",
    "columns": [
      {
        "name": "name",
        "predicate": null,
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "schedule",
        "predicate": null,
        "type": "enum",
        "members": [
          "cadence",
          "capture_landing",
          "cron",
          "generation_accepted",
          "window_close"
        ],
        "cardinality": "one"
      },
      {
        "name": "target",
        "predicate": null,
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "capture_contract",
        "predicate": null,
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "logical_sources",
        "predicate": null,
        "type": "string",
        "members": null,
        "cardinality": "many"
      }
    ],
    "rows": [
      {
        "name": "security.credential-landed",
        "schedule": "capture_landing",
        "target": "Line:security.credential-import",
        "capture_contract": "CaptureContract:security.file-erasable-v1",
        "logical_sources": [
          "security.credential-state"
        ]
      },
      {
        "name": "security.cve-landed",
        "schedule": "capture_landing",
        "target": "Line:security.cve-applicability",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "cve.record"
        ]
      },
      {
        "name": "security.epss-landed",
        "schedule": "capture_landing",
        "target": "Line:security.epss-triage",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "first.epss.daily"
        ]
      },
      {
        "name": "security.harden-on-registry",
        "schedule": "capture_landing",
        "target": "Line:security.harden",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "pypi.release"
        ]
      },
      {
        "name": "security.harden-on-snapshot",
        "schedule": "capture_landing",
        "target": "Line:security.harden",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "github.repo.snapshot"
        ]
      },
      {
        "name": "security.inventory-landed.prod",
        "schedule": "capture_landing",
        "target": "Line:security.inventory-import.prod",
        "capture_contract": "CaptureContract:security.file-erasable-v1",
        "logical_sources": [
          "security.inventory"
        ]
      },
      {
        "name": "security.kev-landed",
        "schedule": "capture_landing",
        "target": "Line:security.kev-triage",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "cisa.kev.catalog"
        ]
      },
      {
        "name": "security.kev-landed-attention",
        "schedule": "capture_landing",
        "target": "Line:security.kev-attention",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "cisa.kev.catalog"
        ]
      },
      {
        "name": "security.registry-landed.cruxible",
        "schedule": "capture_landing",
        "target": "Line:security.registry-parse.cruxible",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "pypi.release"
        ]
      },
      {
        "name": "security.registry-landed.cruxible-client",
        "schedule": "capture_landing",
        "target": "Line:security.registry-parse.cruxible-client",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "pypi.release"
        ]
      },
      {
        "name": "security.repo-landed.cruxible-ci",
        "schedule": "capture_landing",
        "target": "Line:security.repo-parse.cruxible-ci",
        "capture_contract": "CaptureContract:security.fetched-v1",
        "logical_sources": [
          "github.repo.snapshot"
        ]
      },
      {
        "name": "security.sarif-landed-attention.cruxible",
        "schedule": "capture_landing",
        "target": "Line:security.sarif-attention.cruxible",
        "capture_contract": "CaptureContract:security.file-v1",
        "logical_sources": [
          "sarif.log"
        ]
      },
      {
        "name": "security.sarif-landed.cruxible",
        "schedule": "capture_landing",
        "target": "Line:security.sarif-import.cruxible",
        "capture_contract": "CaptureContract:security.file-v1",
        "logical_sources": [
          "sarif.log"
        ]
      },
      {
        "name": "security.sbom-landed",
        "schedule": "capture_landing",
        "target": "Line:security.sbom-import",
        "capture_contract": "CaptureContract:security.file-v1",
        "logical_sources": [
          "cyclonedx.sbom"
        ]
      }
    ],
    "truncated": false,
    "next_cursor": null,
    "remaining": 0,
    "capped": [],
    "notes": [],
    "receipt": {
      "mode": "inline",
      "spec_digest": "sha256:01b482e209ee3955579cb9842edb9e36af371ed1343474714244e13ed0cfdc19",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
        "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
        "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
        "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
      },
      "evaluation_time": "2026-10-26T19:05:01.346137Z"
    }
  }
});
