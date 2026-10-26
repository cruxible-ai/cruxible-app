// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 868d51be
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.registry-parse"
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
        "ref": "Procedure:security.registry-parse",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.registry-parse",
            "description": "Read the PyPI release Capture that triggered the Line (security.fetched-v1) for the Line's project (parameters: source pypi/PROJECT, project, versions) and propose what changed: each served file as an artifact with its digest, release, and (from provenance) the workflow at the commit that published it, its environment and the commit; the target's source repository; the coverage restated. Halts other_source for another project. Runs as a Line with trigger_input registry.",
            "input": {
              "project": {
                "type": "string"
              },
              "source": {
                "type": "string"
              },
              "versions": {
                "type": "integer"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "files": "$parse.files",
                "locator": "$parse.locator",
                "restated": "$parse.restated",
                "retired": "$parse.retired",
                "revised": "$parse.revised",
                "revision": "$parse.revision"
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
              "parse": "security.registry-facts@1",
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
              },
              {
                "id": "mine",
                "guard": "registry.project == input.project",
                "refusal_code": "other_source",
                "message": "The landed release is another project's.",
                "else_id": "other",
                "else": "halt(other_source)"
              },
              {
                "id": "coverage",
                "tap": "coverage",
                "query": "security.coverage_index",
                "params": {
                  "scope": "registry.files",
                  "source": "$input.source"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.registry_facts",
                "params": {
                  "name": "$input.project",
                  "registry": "pypi"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.registry-facts/v1",
                "provider": "parse",
                "input": {
                  "coverage": "$coverage.result.rows",
                  "held": "$held.result.rows",
                  "release": "$registry"
                }
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-registry-parse-input",
            "output_contract": "security-registry-parse-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "files": {
                "type": "integer"
              },
              "locator": {
                "type": "string"
              },
              "restated": {
                "type": "integer"
              },
              "retired": {
                "type": "integer"
              },
              "revised": {
                "type": "integer"
              },
              "revision": {
                "type": "string"
              }
            },
            "contracts": {
              "security-registry-parse-input": {
                "fields": {
                  "project": {
                    "type": "string"
                  },
                  "source": {
                    "type": "string"
                  },
                  "versions": {
                    "type": "integer"
                  }
                }
              },
              "security-registry-parse-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "files": {
                    "type": "integer"
                  },
                  "locator": {
                    "type": "string"
                  },
                  "restated": {
                    "type": "integer"
                  },
                  "retired": {
                    "type": "integer"
                  },
                  "revised": {
                    "type": "integer"
                  },
                  "revision": {
                    "type": "string"
                  }
                }
              }
            },
            "halt_order": [
              "other"
            ]
          },
          "procedure": "security.registry-parse",
          "description": "Read the PyPI release Capture that triggered the Line (security.fetched-v1) for the Line's project (parameters: source pypi/PROJECT, project, versions) and propose what changed: each served file as an artifact with its digest, release, and (from provenance) the workflow at the commit that published it, its environment and the commit; the target's source repository; the coverage restated. Halts other_source for another project. Runs as a Line with trigger_input registry.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-registry-parse-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.registry-parse\"}])",
            "cx.get(\"Procedure:security.registry-parse\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:15.149199Z"
      }
    ]
  }
});
