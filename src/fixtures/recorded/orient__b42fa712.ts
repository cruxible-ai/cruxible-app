// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 835eb63b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "section": "interfaces",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:05:02.302143Z",
    "section": "interfaces",
    "interfaces": [
      {
        "name": "search.web",
        "input": [
          "language?: string",
          "limit?: integer",
          "max_age_hours?: integer",
          "query: string"
        ],
        "output": [
          "playbill-provider-result-to-external-capture-v1"
        ],
        "effect": "external_read",
        "providers": [
          {
            "provider": "cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "language": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": "en",
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "limit": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": 10,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "max_age_hours": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "query": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": "playbill-provider-result-to-external-capture-v1"
        }
      },
      {
        "name": "security.credential-state",
        "input": [
          "held: json",
          "state_text: string",
          "truncated: json"
        ],
        "output": [
          "added: integer",
          "changed: integer",
          "credential: string",
          "failed: integer",
          "inbox: json",
          "items: json",
          "keys: integer",
          "posted: integer",
          "read: string",
          "revised: integer",
          "unproven: integer",
          "verified: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "held": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "state_text": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "truncated": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "added": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "credential": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "failed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "inbox": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "keys": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "posted": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "read": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revised": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "unproven": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "verified": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.cve-applicability",
        "input": [
          "assessments: json",
          "collections: json",
          "record_base64: string",
          "releases: json",
          "sources: json",
          "watched: json"
        ],
        "output": [
          "affected: integer",
          "changed: integer",
          "cve_id: string",
          "inconclusive: integer",
          "items: json",
          "judged: integer",
          "not_affected: integer",
          "unchanged: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "assessments": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "collections": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "record_base64": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "releases": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "sources": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "watched": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "affected": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "cve_id": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "inconclusive": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "judged": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "not_affected": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "unchanged": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.cyclonedx-components",
        "input": [
          "osv_ecosystems?: json",
          "releases: json",
          "sbom_text: string"
        ],
        "output": [
          "added: integer",
          "changed: integer",
          "components: integer",
          "items: json",
          "osv_not_indexed: json",
          "osv_unindexed: integer",
          "product: string",
          "skipped: integer",
          "version: string"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "osv_ecosystems": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": {},
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "releases": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "sbom_text": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "added": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "components": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "osv_not_indexed": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "osv_unindexed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "product": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "skipped": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "version": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.epss-daily",
        "input": [
          "url?: string"
        ],
        "output": [
          "playbill-provider-result-to-external-capture-v1"
        ],
        "effect": "external_read",
        "providers": [
          {
            "provider": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "url": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": "https://epss.empiricalsecurity.com/epss_scores-current.csv.gz",
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": "playbill-provider-result-to-external-capture-v1",
          "material": {
            "description": null,
            "fields": {
              "input_bucket": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "retrieved": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.epss-scores",
        "input": [
          "daily_base64: string",
          "watched: json"
        ],
        "output": [
          "changed: integer",
          "items: json",
          "model_version: string",
          "score_date: string",
          "scored: integer",
          "watched: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "daily_base64": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "watched": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "model_version": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "score_date": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "scored": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "watched": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.harden",
        "input": [
          "hq1: json",
          "hq2: json",
          "hq3: json",
          "hq4: json",
          "hq5: json",
          "hq6: json",
          "params: json",
          "truncated: json"
        ],
        "output": [
          "answers: json",
          "found: integer",
          "gaps: integer",
          "items: json",
          "none: integer",
          "posted: integer",
          "targets: integer",
          "unknown: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "hq1": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "hq2": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "hq3": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "hq4": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "hq5": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "hq6": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "params": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "truncated": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "answers": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "found": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "gaps": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "none": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "posted": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "targets": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "unknown": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.kev-attention",
        "input": [
          "assessments: json",
          "catalog_base64: string",
          "releases: json",
          "watched: json"
        ],
        "output": [
          "catalog_version: string",
          "items: json",
          "newly_listed: integer",
          "posted: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "assessments": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "catalog_base64": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "releases": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "watched": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "catalog_version": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "newly_listed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "posted": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.kev-catalog",
        "input": [
          "catalog_base64: string",
          "watched: json"
        ],
        "output": [
          "catalog_count: integer",
          "catalog_version: string",
          "changed: integer",
          "items: json",
          "listed: integer",
          "watched: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "catalog_base64": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "watched": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "catalog_count": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "catalog_version": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "listed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "watched": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.log-reads",
        "input": [
          "held: json",
          "incident: string",
          "read_text: string",
          "truncated: json"
        ],
        "output": [
          "added: integer",
          "changed: integer",
          "inbox: json",
          "incident: string",
          "items: json",
          "matches: integer",
          "mine: integer",
          "posted: integer",
          "read: string",
          "recordable: integer",
          "service: string",
          "source: string"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "held": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "incident": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "read_text": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "truncated": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "added": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "inbox": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "incident": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "matches": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "mine": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "posted": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "read": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "recordable": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "service": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "source": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.osv-applicability",
        "input": [
          "assessments: json",
          "osv: json",
          "releases: json",
          "watched: json"
        ],
        "output": [
          "affected: integer",
          "changed: integer",
          "coverage: integer",
          "inconclusive: integer",
          "items: json",
          "judged: integer",
          "not_affected: integer",
          "packages: integer",
          "unchanged: integer",
          "unkeyed: json"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "assessments": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "osv": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "releases": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "watched": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "affected": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "coverage": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "inconclusive": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "judged": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "not_affected": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "packages": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "unchanged": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "unkeyed": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.osv-ecosystems",
        "input": [
          "url?: string"
        ],
        "output": [
          "playbill-provider-result-to-external-capture-v1"
        ],
        "effect": "external_read",
        "providers": [
          {
            "provider": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "url": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": "https://osv-vulnerabilities.storage.googleapis.com/ecosystems.txt",
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": "playbill-provider-result-to-external-capture-v1",
          "material": {
            "description": null,
            "fields": {
              "input_bucket": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "retrieved": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.osv-query",
        "input": [
          "ecosystems: json",
          "purl_types: json",
          "releases: json",
          "watched: json"
        ],
        "output": [
          "playbill-provider-result-to-external-capture-v1"
        ],
        "effect": "external_read",
        "providers": [
          {
            "provider": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "ecosystems": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "purl_types": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "releases": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "watched": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": "playbill-provider-result-to-external-capture-v1",
          "material": {
            "description": null,
            "fields": {
              "exchanges": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "input_bucket": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "not_indexed": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "osv_ecosystems": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "purl_types": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "service": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "source": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.pypi-release",
        "input": [
          "project: string",
          "versions?: integer"
        ],
        "output": [
          "playbill-provider-result-to-external-capture-v1"
        ],
        "effect": "external_read",
        "providers": [
          {
            "provider": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "project": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "versions": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": 3,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": "playbill-provider-result-to-external-capture-v1",
          "material": {
            "description": null,
            "fields": {
              "input_bucket": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "project": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "source": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "versions": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.registry-facts",
        "input": [
          "coverage: json",
          "held: json",
          "release: json"
        ],
        "output": [
          "added: integer",
          "changed: integer",
          "files: integer",
          "items: json",
          "locator: string",
          "restated: integer",
          "retired: integer",
          "revised: integer",
          "revision: string"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "coverage": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "held": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "release": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "added": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "files": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "locator": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "restated": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "retired": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revised": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revision": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.release-asset",
        "input": [
          "url: string"
        ],
        "output": [
          "playbill-provider-result-to-external-capture-v1"
        ],
        "effect": "external_read",
        "providers": [
          {
            "provider": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "url": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": "playbill-provider-result-to-external-capture-v1",
          "material": {
            "description": null,
            "fields": {
              "input_bucket": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "retrieved": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.repo-snapshot",
        "input": [
          "forge_host: string",
          "full_name: string",
          "path: string",
          "ref: string",
          "scope: string"
        ],
        "output": [
          "playbill-provider-result-to-external-capture-v1"
        ],
        "effect": "external_read",
        "providers": [
          {
            "provider": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "forge_host": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "full_name": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "path": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "ref": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "scope": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": "playbill-provider-result-to-external-capture-v1",
          "material": {
            "description": null,
            "fields": {
              "files": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "forge_host": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "full_name": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "input_bucket": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "locator": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "path": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "ref": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revision": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "scope": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "source": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.respond",
        "input": [
          "audits: json",
          "credentials: json",
          "deployments: json",
          "exceptions: json",
          "exposure: json",
          "hosts: json",
          "overdue: json",
          "params: json",
          "patches: json",
          "truncated: json"
        ],
        "output": [
          "answers: json",
          "found: integer",
          "incident: string",
          "items: json",
          "none: integer",
          "posted: integer",
          "ready_to_close: integer",
          "status: string",
          "unknown: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "audits": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "credentials": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "deployments": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "exceptions": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "exposure": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "hosts": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "overdue": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "params": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "patches": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "truncated": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "answers": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "found": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "incident": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "none": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "posted": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "ready_to_close": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "status": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "unknown": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.runtime-inventory",
        "input": [
          "held: json",
          "inventory_text: string",
          "osv_ecosystems?: json",
          "patches: json",
          "runs: json",
          "scope: string",
          "truncated: json"
        ],
        "output": [
          "added: integer",
          "assets: integer",
          "changed: integer",
          "coverage: string",
          "failed: integer",
          "format: string",
          "items: json",
          "mine: integer",
          "nones: integer",
          "osv_not_indexed: json",
          "osv_unindexed: integer",
          "proposes: integer",
          "regressions: json",
          "restated: integer",
          "retired: integer",
          "revised: integer",
          "revision: string",
          "runs: integer",
          "scope: string",
          "unidentified: integer",
          "verified: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "held": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "inventory_text": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "osv_ecosystems": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": {},
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "patches": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "runs": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "scope": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "truncated": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "added": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "assets": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "coverage": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "failed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "format": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "mine": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "nones": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "osv_not_indexed": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "osv_unindexed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "proposes": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "regressions": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "restated": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "retired": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revised": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revision": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "runs": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "scope": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "unidentified": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "verified": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.sarif-findings",
        "input": [
          "held: json",
          "repo_ref: string",
          "sarif_text: string",
          "truncated: json"
        ],
        "output": [
          "added: integer",
          "changed: integer",
          "findings: integer",
          "fixed: integer",
          "full: json",
          "gaps: integer",
          "inbox: json",
          "items: json",
          "mine: integer",
          "new: integer",
          "posted: integer",
          "regressed: integer",
          "repo_ref: string",
          "results: integer",
          "revisions: json",
          "routed_to_assessment: integer",
          "tools: json"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "held": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "repo_ref": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "sarif_text": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "truncated": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "added": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "findings": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "fixed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "full": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "gaps": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "inbox": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "mine": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "new": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "posted": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "regressed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "repo_ref": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "results": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revisions": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "routed_to_assessment": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "tools": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "security.workflow-facts",
        "input": [
          "coverage: json",
          "held: json",
          "releases: json",
          "snapshot: json",
          "targets: json"
        ],
        "output": [
          "added: integer",
          "changed: integer",
          "items: json",
          "jobs: integer",
          "locator: string",
          "restated: integer",
          "retired: integer",
          "revised: integer",
          "revision: string",
          "scope: string",
          "unparsed: json",
          "workflows: integer"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "coverage": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "held": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "releases": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "snapshot": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "targets": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "added": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "changed": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "items": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "jobs": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "locator": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "restated": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "retired": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revised": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "revision": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "scope": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "unparsed": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "workflows": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "web.fetch",
        "input": [
          "credential_header?: string",
          "credential_ref?: string",
          "expected_format?: string",
          "extract?: bool",
          "logical_source?: string",
          "max_bytes?: integer",
          "paced?: bool",
          "render?: bool",
          "url: string"
        ],
        "output": [
          "playbill-provider-result-to-external-capture-v1"
        ],
        "effect": "external_read",
        "providers": [
          {
            "provider": "cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "credential_header": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": "authorization",
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "credential_ref": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "expected_format": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": "auto",
                "enum": [
                  "auto",
                  "html",
                  "json",
                  "csv",
                  "text",
                  "bytes"
                ],
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "extract": {
                "type": "bool",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": true,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "logical_source": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": "web.response",
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "max_bytes": {
                "type": "integer",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": 262144,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "paced": {
                "type": "bool",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": false,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "render": {
                "type": "bool",
                "primary_key": false,
                "indexed": false,
                "optional": true,
                "default": false,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "url": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": "playbill-provider-result-to-external-capture-v1",
          "material": {
            "description": null,
            "fields": {
              "derived": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": {
                  "additionalProperties": false,
                  "properties": {
                    "assembled_document": {
                      "additionalProperties": false,
                      "properties": {
                        "assembly": {
                          "type": "string"
                        },
                        "byte_count": {
                          "type": "integer"
                        },
                        "engine": {
                          "type": [
                            "string",
                            "null"
                          ]
                        },
                        "sha256": {
                          "type": "string"
                        }
                      },
                      "required": [
                        "assembly",
                        "engine",
                        "byte_count",
                        "sha256"
                      ],
                      "type": "object"
                    },
                    "engine": {
                      "type": [
                        "string",
                        "null"
                      ]
                    },
                    "kind": {
                      "type": "string"
                    },
                    "metadata": {
                      "type": "object"
                    },
                    "text": {
                      "type": [
                        "string",
                        "null"
                      ]
                    }
                  },
                  "required": [
                    "kind",
                    "engine",
                    "text",
                    "metadata"
                  ],
                  "type": "object"
                }
              },
              "input_bucket": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "retrieved": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": {
                  "additionalProperties": false,
                  "properties": {
                    "body_base64": {
                      "type": "string"
                    },
                    "body_sha256": {
                      "type": "string"
                    },
                    "byte_count": {
                      "type": "integer"
                    },
                    "final_url": {
                      "type": "string"
                    },
                    "headers": {
                      "additionalProperties": {
                        "type": "string"
                      },
                      "type": "object"
                    },
                    "renderer": {
                      "type": [
                        "string",
                        "null"
                      ]
                    },
                    "source": {
                      "enum": [
                        "packaged-recording",
                        "network"
                      ],
                      "type": "string"
                    },
                    "status_code": {
                      "type": "integer"
                    },
                    "url": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "url",
                    "final_url",
                    "status_code",
                    "headers",
                    "byte_count",
                    "body_sha256",
                    "body_base64",
                    "source",
                    "renderer"
                  ],
                  "type": "object"
                }
              }
            },
            "allow_extra": false
          }
        }
      },
      {
        "name": "workspace.file",
        "input": [
          "byte_length: json",
          "bytes: string",
          "bytes_digest: json",
          "commitment_digest: json",
          "content_encoding: string",
          "logical_source: string"
        ],
        "output": [
          "content: json",
          "input_bucket: string",
          "source: json"
        ],
        "effect": "pure",
        "providers": [
          {
            "provider": "cruxible-builtin"
          }
        ],
        "operation_contract": {
          "input": {
            "description": null,
            "fields": {
              "byte_length": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": {
                  "minimum": 0,
                  "type": "integer"
                }
              },
              "bytes": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "bytes_digest": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": {
                  "pattern": "^sha256:[0-9a-f]{64}$",
                  "type": "string"
                }
              },
              "commitment_digest": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": {
                  "pattern": "^sha256:[0-9a-f]{64}$",
                  "type": "string"
                }
              },
              "content_encoding": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": [
                  "base64"
                ],
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "logical_source": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              }
            },
            "allow_extra": false
          },
          "output": {
            "description": null,
            "fields": {
              "content": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": {
                  "oneOf": [
                    {
                      "properties": {
                        "bom": {
                          "type": "boolean"
                        },
                        "character_count": {
                          "type": "integer"
                        },
                        "encoding": {
                          "const": "utf-8"
                        },
                        "kind": {
                          "const": "text"
                        },
                        "line_count": {
                          "type": "integer"
                        },
                        "lines": {
                          "items": {
                            "type": "string"
                          },
                          "type": "array"
                        },
                        "newline": {
                          "enum": [
                            "lf",
                            "crlf",
                            "cr",
                            "mixed",
                            "none"
                          ],
                          "type": "string"
                        },
                        "text": {
                          "type": "string"
                        },
                        "trailing_newline": {
                          "type": "boolean"
                        }
                      },
                      "required": [
                        "kind",
                        "encoding",
                        "bom",
                        "newline",
                        "trailing_newline",
                        "line_count",
                        "character_count",
                        "text",
                        "lines"
                      ],
                      "type": "object"
                    },
                    {
                      "properties": {
                        "byte_length": {
                          "type": "integer"
                        },
                        "bytes": {
                          "type": "string"
                        },
                        "encoding": {
                          "const": "base64"
                        },
                        "kind": {
                          "const": "bytes"
                        }
                      },
                      "required": [
                        "kind",
                        "encoding",
                        "byte_length",
                        "bytes"
                      ],
                      "type": "object"
                    }
                  ],
                  "type": "object"
                }
              },
              "input_bucket": {
                "type": "string",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": null
              },
              "source": {
                "type": "json",
                "primary_key": false,
                "indexed": false,
                "optional": false,
                "default": null,
                "enum": null,
                "enum_ref": null,
                "description": null,
                "json_schema": {
                  "additionalProperties": true,
                  "properties": {
                    "byte_length": {
                      "type": "integer"
                    },
                    "bytes_digest": {
                      "type": "string"
                    },
                    "commitment_digest": {
                      "type": "string"
                    },
                    "logical_source": {
                      "type": "string"
                    }
                  },
                  "required": [
                    "logical_source",
                    "commitment_digest",
                    "bytes_digest",
                    "byte_length"
                  ],
                  "type": "object"
                }
              }
            },
            "allow_extra": false
          }
        }
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"ProviderInterface:search.web\")"
    ]
  }
});
