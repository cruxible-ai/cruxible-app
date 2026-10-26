// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 675e7f0f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.registry-acquire"
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
        "ref": "Procedure:security.registry-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.registry-acquire",
            "description": "Read the newest requested PyPI versions and their provenance; retain under security.fetched-v1, logical source pypi.release.",
            "input": {
              "project": {
                "type": "string"
              },
              "versions": {
                "type": "integer"
              }
            },
            "returns": {
              "fields": {
                "project": "$registry.project",
                "versions": "$registry.versions"
              }
            },
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1,
              "capture_bytes": 16777216
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "capture_bytes": 16777216,
              "items": 1
            },
            "slots": {
              "registry": "security.pypi-release@1"
            },
            "steps": [
              {
                "id": "registry",
                "source": "registry",
                "contract": "security.fetched-v1",
                "interface": "security.pypi-release/v1",
                "provider": "registry",
                "request": {
                  "project": "$input.project",
                  "versions": "$input.versions"
                }
              }
            ],
            "input_contract": "security.registry-acquire-input",
            "output_contract": "security.registry-acquire-output",
            "output": {
              "project": {
                "type": "string"
              },
              "versions": {
                "type": "json"
              }
            },
            "contracts": {
              "security.registry-acquire-input": {
                "fields": {
                  "project": {
                    "type": "string"
                  },
                  "versions": {
                    "type": "integer"
                  }
                }
              },
              "security.registry-acquire-output": {
                "fields": {
                  "project": {
                    "type": "string"
                  },
                  "versions": {
                    "type": "json"
                  }
                }
              }
            }
          },
          "procedure": "security.registry-acquire",
          "description": "Read the newest requested PyPI versions and their provenance; retain under security.fetched-v1, logical source pypi.release.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.registry-acquire-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.registry-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.registry-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:15.596381Z"
      }
    ]
  }
});
