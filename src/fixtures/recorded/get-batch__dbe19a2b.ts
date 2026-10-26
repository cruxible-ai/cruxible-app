// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 8e488d8b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.epss-acquire"
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
        "ref": "Procedure:security.epss-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.epss-acquire",
            "description": "Fetch FIRST's current EPSS daily scores and emit their retained summary; security.epss-triage reads the first.epss.daily landing.",
            "input": {},
            "returns": {
              "fields": {
                "body_digest": "$epss.retrieved.body_sha256",
                "status": "$epss.retrieved.status_code",
                "url": "$epss.retrieved.final_url"
              }
            },
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 33554432
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "capture_bytes": 33554432,
              "items": 1
            },
            "slots": {
              "epss": "security.epss-daily@1"
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
                "id": "step_2",
                "emit": "security.observation-output-v1",
                "input": "$summary",
                "result": "$summary"
              }
            ],
            "input_contract": "security.epss-acquire-input",
            "output_contract": "security-http-evidence",
            "output": {
              "body_digest": {
                "type": "string"
              },
              "status": {
                "type": "int"
              },
              "url": {
                "type": "string"
              }
            },
            "contracts": {
              "security-http-evidence": {
                "fields": {
                  "body_digest": {
                    "type": "string"
                  },
                  "status": {
                    "type": "int"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              },
              "security.epss-acquire-input": {
                "fields": {}
              }
            }
          },
          "procedure": "security.epss-acquire",
          "description": "Fetch FIRST's current EPSS daily scores and emit their retained summary; security.epss-triage reads the first.epss.daily landing.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.epss-acquire-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "step_2",
              "kind": "emit_capture",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.epss-acquire\"}])",
            "cx.get(\"Procedure:security.epss-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:12.555333Z"
      }
    ]
  }
});
