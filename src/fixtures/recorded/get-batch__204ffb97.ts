// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch cc2eae00
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.fetch-observed"
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
        "ref": "Procedure:security.fetch-observed",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.fetch-observed",
            "description": "Fetch one HTTP JSON response with the supplied URL, logical source and byte limit; retain it under security.fetched-v1. Emit the summary as run evidence; runs as a Line.",
            "input": {
              "logical_source": {
                "type": "string"
              },
              "max_bytes": {
                "type": "integer"
              },
              "url": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "body_digest": "$fetch.retrieved.body_sha256",
                "status": "$fetch.retrieved.status_code",
                "url": "$fetch.retrieved.final_url"
              }
            },
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 1,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 16777216,
              "items": 1
            },
            "slots": {
              "fetch": "web.fetch@3"
            },
            "steps": [
              {
                "id": "fetch",
                "source": "fetch",
                "contract": "security.fetched-v1",
                "interface": "web.fetch/v3",
                "provider": "fetch",
                "request": {
                  "expected_format": "json",
                  "extract": false,
                  "logical_source": "$input.logical_source",
                  "max_bytes": "$input.max_bytes",
                  "render": false,
                  "url": "$input.url"
                }
              },
              {
                "id": "step_2",
                "emit": "security.observation-output-v1",
                "input": "$summary",
                "result": "$summary"
              }
            ],
            "input_contract": "security.fetch-observed-input",
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
              "security.fetch-observed-input": {
                "fields": {
                  "logical_source": {
                    "type": "string"
                  },
                  "max_bytes": {
                    "type": "integer"
                  },
                  "url": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.fetch-observed",
          "description": "Fetch one HTTP JSON response with the supplied URL, logical source and byte limit; retain it under security.fetched-v1. Emit the summary as run evidence; runs as a Line.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.fetch-observed-input"
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
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.fetch-observed\"}])",
            "cx.get(\"Procedure:security.fetch-observed\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:13.679982Z"
      }
    ]
  }
});
