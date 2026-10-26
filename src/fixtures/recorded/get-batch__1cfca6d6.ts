// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 665be70a
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.kev-attention"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Procedure:security.kev-attention",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.kev-attention",
            "description": "Read the KEV catalog Capture that triggered the Line and post one inbox item per CVE added in the catalog's last 7 days whose vendor/product matches a release in inventory that nobody watches the CVE for or nobody has assessed: possibly exposed, nobody has looked. Never changes accepted state. Runs as a Line with trigger_input catalog.",
            "input": {},
            "returns": {
              "fields": {
                "catalog_version": "$match.catalog_version",
                "newly_listed": "$match.newly_listed",
                "posted": "$match.posted"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 16777216,
              "items": 1000
            },
            "slots": {
              "catalog": "web.fetch@3",
              "match": "security.kev-attention@1"
            },
            "steps": [
              {
                "id": "catalog",
                "source": "catalog",
                "contract": "security.fetched-v1",
                "interface": "web.fetch/v3",
                "provider": "catalog",
                "request": {
                  "expected_format": "json",
                  "extract": false,
                  "logical_source": "cisa.kev.catalog",
                  "max_bytes": 4194304,
                  "render": false,
                  "url": "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json"
                }
              },
              {
                "id": "releases",
                "tap": "releases",
                "query": "security.release_inventory"
              },
              {
                "id": "watched",
                "tap": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "id": "assessments",
                "tap": "assessments",
                "query": "security.assessment_index"
              },
              {
                "id": "match",
                "call": "match",
                "interface": "security.kev-attention/v1",
                "provider": "match",
                "input": {
                  "assessments": "$assessments.result.rows",
                  "catalog_base64": "$catalog.retrieved.body_base64",
                  "releases": "$releases.result.rows",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "posted",
                "guard": "match.posted > 0",
                "refusal_code": "nothing_to_post",
                "message": "No newly listed CVE matches unwatched or unassessed inventory.",
                "else_id": "quiet",
                "else": "halt(nothing_to_post)"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$match.items"
                },
                "max_items": 1000
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-kev-attention-summary",
            "output": {
              "catalog_version": {
                "type": "string"
              },
              "newly_listed": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-empty-input": {
                "fields": {}
              },
              "security-kev-attention-summary": {
                "fields": {
                  "catalog_version": {
                    "type": "string"
                  },
                  "newly_listed": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "quiet"
            ]
          },
          "procedure": "security.kev-attention",
          "description": "Read the KEV catalog Capture that triggered the Line and post one inbox item per CVE added in the catalog's last 7 days whose vendor/product matches a release in inventory that nobody watches the CVE for or nobody has assessed: possibly exposed, nobody has looked. Never changes accepted state. Runs as a Line with trigger_input catalog.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "post",
              "kind": "post_inbox",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.kev-attention\"}])",
            "cx.get(\"Procedure:security.kev-attention\", detail=\"proof\")"
          ]
        },
        "coordinate": {
          "git_oid": "f3765015f78f",
          "generation": 12
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "evaluation_time": "2026-10-26T19:05:13.347813Z"
      }
    ]
  }
});
