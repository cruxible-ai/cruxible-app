// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query ef9b0492
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
      "capture_contract"
    ],
    "limit": 500,
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
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
      }
    ],
    "rows": [
      {
        "name": "security.cve-landed",
        "schedule": "capture_landing",
        "target": "Line:security.cve-applicability",
        "capture_contract": "CaptureContract:security.cve-record-http-v1"
      },
      {
        "name": "security.epss-landed",
        "schedule": "capture_landing",
        "target": "Line:security.epss-triage",
        "capture_contract": "CaptureContract:security.epss-daily-v1"
      },
      {
        "name": "security.harden-on-registry",
        "schedule": "capture_landing",
        "target": "Line:security.harden",
        "capture_contract": "CaptureContract:security.pypi-release-v1"
      },
      {
        "name": "security.harden-on-snapshot",
        "schedule": "capture_landing",
        "target": "Line:security.harden",
        "capture_contract": "CaptureContract:security.repo-snapshot-v1"
      },
      {
        "name": "security.kev-landed",
        "schedule": "capture_landing",
        "target": "Line:security.kev-triage",
        "capture_contract": "CaptureContract:security.kev-http-v1"
      },
      {
        "name": "security.kev-landed-attention",
        "schedule": "capture_landing",
        "target": "Line:security.kev-attention",
        "capture_contract": "CaptureContract:security.kev-http-v1"
      },
      {
        "name": "security.registry-landed.cruxible",
        "schedule": "capture_landing",
        "target": "Line:security.registry-parse.cruxible",
        "capture_contract": "CaptureContract:security.pypi-release-v1"
      },
      {
        "name": "security.registry-landed.cruxible-client",
        "schedule": "capture_landing",
        "target": "Line:security.registry-parse.cruxible-client",
        "capture_contract": "CaptureContract:security.pypi-release-v1"
      },
      {
        "name": "security.repo-landed.cruxible-ci",
        "schedule": "capture_landing",
        "target": "Line:security.repo-parse.cruxible-ci",
        "capture_contract": "CaptureContract:security.repo-snapshot-v1"
      },
      {
        "name": "security.repo-landed.cruxible-released",
        "schedule": "capture_landing",
        "target": "Line:security.repo-parse.cruxible-released",
        "capture_contract": "CaptureContract:security.repo-snapshot-v1"
      },
      {
        "name": "security.repo-landed.cruxible-v0.3.2-manifest",
        "schedule": "capture_landing",
        "target": "Line:security.repo-parse.cruxible-v0.3.2-manifest",
        "capture_contract": "CaptureContract:security.repo-snapshot-v1"
      },
      {
        "name": "security.sbom-landed",
        "schedule": "capture_landing",
        "target": "Line:security.sbom-import",
        "capture_contract": "CaptureContract:security.cyclonedx-sbom-v1"
      }
    ],
    "truncated": false,
    "next_cursor": null,
    "remaining": 0,
    "capped": [],
    "notes": [],
    "receipt": {
      "mode": "inline",
      "spec_digest": "sha256:2a779cc412caae17c0b1e07462d1c0849bb4136fb2502bf803d7b3470528bfad",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
        "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
        "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
        "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
      },
      "evaluation_time": "2026-10-21T19:49:21.818922Z"
    }
  }
});
