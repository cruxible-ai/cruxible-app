// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch a904f5da
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.kev-triage"
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
        "ref": "Procedure:security.kev-triage",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.kev-triage",
            "description": "Read the KEV catalog Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle one observation Claim per KEV field that changed (kev_listed, kev_date_added, kev_due_date, kev_ransomware_use) under a settle mandate, or propose it under a propose cap. Halts no_change when nothing changed. Runs as a Line with trigger_input catalog.",
            "input": {},
            "returns": {
              "fields": {
                "catalog_version": "$parse.catalog_version",
                "changed": "$parse.changed",
                "listed": "$parse.listed",
                "watched": "$parse.watched"
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
              "items": 5000
            },
            "slots": {
              "catalog": "web.fetch@3",
              "parse": "security.kev-catalog@2"
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
                "id": "watched",
                "tap": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.kev-catalog/v2",
                "provider": "parse",
                "input": {
                  "catalog_base64": "$catalog.retrieved.body_base64",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The catalog changes no watched Claim.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "settle",
                "settle": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-kev-triage-summary",
            "output": {
              "catalog_version": {
                "type": "string"
              },
              "changed": {
                "type": "integer"
              },
              "listed": {
                "type": "integer"
              },
              "watched": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-empty-input": {
                "fields": {}
              },
              "security-kev-triage-summary": {
                "fields": {
                  "catalog_version": {
                    "type": "string"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "listed": {
                    "type": "integer"
                  },
                  "watched": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "nochange"
            ],
            "measurements": [
              {
                "tag": "playbill-procedure-measurement-declaration-v1",
                "name": "kev-backlog-cleared",
                "subject_grain": "procedure_unit",
                "measurement": {
                  "tag": "playbill-procedure-accepted-query-measurement-v1",
                  "kind": "accepted_query",
                  "query": {
                    "role": "query",
                    "target": {
                      "kind": "QueryDefinition",
                      "name": "security.kev_triage_backlog"
                    },
                    "artifact_digest": "sha256:2bb6593d47adbe43240fcb12dc0ba27f1032834f209587a0603150baa04249a5"
                  },
                  "expect": {
                    "tag": "playbill-procedure-measurement-expectation-v1",
                    "max_count": 0
                  }
                },
                "check_after": {
                  "tag": "playbill-duration-v1",
                  "microseconds": 259200000000
                },
                "expires_after": {
                  "tag": "playbill-duration-v1",
                  "microseconds": 864000000000
                },
                "review_when": [
                  {
                    "tag": "playbill-procedure-measurement-review-trigger-v1",
                    "name": "satisfied-rate-low",
                    "metric": "satisfied_rate",
                    "operator": "lt",
                    "threshold": {
                      "$decimal": "0.8"
                    },
                    "min_readings": 5
                  }
                ]
              }
            ]
          },
          "measurement_reviews": [
            {
              "measurement_name": "kev-backlog-cleared",
              "contract_id": "RSC-f238e760f259d752ee66d803b70bb47d",
              "latest_resolution_id": null,
              "standing_resolution_id": null,
              "unavailable": false,
              "last_disposition": null,
              "history": [],
              "history_total": 0,
              "history_truncated": false
            }
          ],
          "procedure": "security.kev-triage",
          "description": "Read the KEV catalog Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle one observation Claim per KEV field that changed (kev_listed, kev_date_added, kev_due_date, kev_ransomware_use) under a settle mandate, or propose it under a propose cap. Halts no_change when nothing changed. Runs as a Line with trigger_input catalog.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "settle",
              "kind": "settle_change_set",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.kev-triage\"}])",
            "cx.get(\"Procedure:security.kev-triage\", detail=\"proof\")"
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "f3765015f78f",
            "generation": 12
          },
          "fields": [
            "measurement_reviews"
          ]
        },
        "evaluation_time": "2026-10-26T19:05:14.232941Z"
      }
    ]
  }
});
