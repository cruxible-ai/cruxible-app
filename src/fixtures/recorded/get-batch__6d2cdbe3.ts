// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 622745d3
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.epss-triage"
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
        "ref": "Procedure:security.epss-triage",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.epss-triage",
            "description": "Read the EPSS daily file Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle epss_score and epss_percentile for each watched CVE whose scores changed, exactly as the file states them (or propose them under a propose cap). Halts no_change when nothing changed. Runs as a Line with trigger_input epss.",
            "input": {},
            "returns": {
              "fields": {
                "changed": "$parse.changed",
                "model_version": "$parse.model_version",
                "score_date": "$parse.score_date",
                "scored": "$parse.scored",
                "watched": "$parse.watched"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "capture_bytes": 33554432
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 2,
              "capture_bytes": 33554432,
              "items": 5000
            },
            "slots": {
              "epss": "security.epss-daily@1",
              "parse": "security.epss-scores@1"
            },
            "steps": [
              {
                "id": "epss",
                "source": "epss",
                "contract": "security.fetched-v1",
                "interface": "security.epss-daily/v1",
                "provider": "epss",
                "request": {}
              },
              {
                "id": "watched",
                "tap": "watched",
                "query": "security.watched_vulnerabilities"
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.epss-scores/v1",
                "provider": "parse",
                "input": {
                  "daily_base64": "$epss.retrieved.body_base64",
                  "watched": "$watched.result.rows"
                }
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The EPSS file changes no watched Claim.",
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
            "output_contract": "security-epss-summary",
            "output": {
              "changed": {
                "type": "integer"
              },
              "model_version": {
                "type": "string"
              },
              "score_date": {
                "type": "string"
              },
              "scored": {
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
              "security-epss-summary": {
                "fields": {
                  "changed": {
                    "type": "integer"
                  },
                  "model_version": {
                    "type": "string"
                  },
                  "score_date": {
                    "type": "string"
                  },
                  "scored": {
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
            ]
          },
          "procedure": "security.epss-triage",
          "description": "Read the EPSS daily file Capture that triggered the Line (security.fetched-v1) and the watched vulnerabilities, and settle epss_score and epss_percentile for each watched CVE whose scores changed, exactly as the file states them (or propose them under a propose cap). Halts no_change when nothing changed. Runs as a Line with trigger_input epss.",
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
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.epss-triage\"}])",
            "cx.get(\"Procedure:security.epss-triage\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:12.708646Z"
      }
    ]
  }
});
