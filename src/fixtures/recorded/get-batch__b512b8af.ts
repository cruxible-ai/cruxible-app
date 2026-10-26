// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch cbeb72aa
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.repo-acquire"
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
        "ref": "Procedure:security.repo-acquire",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.repo-acquire",
            "description": "Read one GitHub repository at a ref for a declared scope and path; retain its files under security.fetched-v1, logical source github.repo.snapshot.",
            "input": {
              "forge_host": {
                "type": "string"
              },
              "full_name": {
                "type": "string"
              },
              "path": {
                "type": "string"
              },
              "ref": {
                "type": "string"
              },
              "scope": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "locator": "$snapshot.locator",
                "revision": "$snapshot.revision"
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
              "snapshot": "security.repo-snapshot@1"
            },
            "steps": [
              {
                "id": "snapshot",
                "source": "snapshot",
                "contract": "security.fetched-v1",
                "interface": "security.repo-snapshot/v1",
                "provider": "snapshot",
                "request": {
                  "forge_host": "$input.forge_host",
                  "full_name": "$input.full_name",
                  "path": "$input.path",
                  "ref": "$input.ref",
                  "scope": "$input.scope"
                }
              }
            ],
            "input_contract": "security.repo-acquire-input",
            "output_contract": "security.repo-acquire-output",
            "output": {
              "locator": {
                "type": "string"
              },
              "revision": {
                "type": "string"
              }
            },
            "contracts": {
              "security.repo-acquire-input": {
                "fields": {
                  "forge_host": {
                    "type": "string"
                  },
                  "full_name": {
                    "type": "string"
                  },
                  "path": {
                    "type": "string"
                  },
                  "ref": {
                    "type": "string"
                  },
                  "scope": {
                    "type": "string"
                  }
                }
              },
              "security.repo-acquire-output": {
                "fields": {
                  "locator": {
                    "type": "string"
                  },
                  "revision": {
                    "type": "string"
                  }
                }
              }
            }
          },
          "procedure": "security.repo-acquire",
          "description": "Read one GitHub repository at a ref for a declared scope and path; retain its files under security.fetched-v1, logical source github.repo.snapshot.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security.repo-acquire-input"
          },
          "runnable": "direct",
          "unsupported_nodes": [],
          "track_record": [],
          "next": [
            "cx.accepted_procedure(\"security.repo-acquire\").run(input=...)",
            "cx.get(\"Procedure:security.repo-acquire\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:16.196549Z"
      }
    ]
  }
});
