// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 6fda65df
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.repo-parse"
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
        "ref": "Procedure:security.repo-parse",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.repo-parse",
            "description": "Read the repository snapshot that triggered the Line (security.fetched-v1) for the Line's source (parameters: source, repo_source, forge_host, full_name, ref, scope, path) and propose what changed: workflows, jobs and their triggers, permissions, secrets, environment, actions and publish targets, or a manifest's declared digests, plus the source's coverage restated (an unchanged snapshot re-observes it; a new revision revises it). Halts other_source for another source's snapshot. Runs as a Line with trigger_input snapshot.",
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
              "repo_source": {
                "type": "string"
              },
              "scope": {
                "type": "string"
              },
              "source": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "jobs": "$parse.jobs",
                "locator": "$parse.locator",
                "restated": "$parse.restated",
                "retired": "$parse.retired",
                "revised": "$parse.revised",
                "revision": "$parse.revision",
                "scope": "$parse.scope",
                "unparsed": "$parse.unparsed",
                "workflows": "$parse.workflows"
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
              "parse": "security.workflow-facts@1",
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
              },
              {
                "id": "mine",
                "guard": "snapshot.locator == input.source",
                "refusal_code": "other_source",
                "message": "The landed snapshot is another source's.",
                "else_id": "other",
                "else": "halt(other_source)"
              },
              {
                "id": "coverage",
                "tap": "coverage",
                "query": "security.coverage_index",
                "params": {
                  "scope": "$input.scope",
                  "source": "$input.source"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.source_facts",
                "params": {
                  "source": "$input.repo_source"
                }
              },
              {
                "id": "targets",
                "tap": "targets",
                "query": "security.repo_targets",
                "params": {
                  "forge_host": "$input.forge_host",
                  "full_name": "$input.full_name"
                }
              },
              {
                "id": "releases",
                "tap": "releases",
                "query": "security.registry_facts",
                "params": {
                  "name": "$input.full_name",
                  "registry": "github_release"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.workflow-facts/v1",
                "provider": "parse",
                "input": {
                  "coverage": "$coverage.result.rows",
                  "held": "$held.result.rows",
                  "releases": "$releases.result.rows",
                  "snapshot": "$snapshot",
                  "targets": "$targets.result.rows"
                }
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              }
            ],
            "input_contract": "security-repo-parse-input",
            "output_contract": "security-repo-parse-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "jobs": {
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
              },
              "scope": {
                "type": "string"
              },
              "unparsed": {
                "type": "json"
              },
              "workflows": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-repo-parse-input": {
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
                  "repo_source": {
                    "type": "string"
                  },
                  "scope": {
                    "type": "string"
                  },
                  "source": {
                    "type": "string"
                  }
                }
              },
              "security-repo-parse-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "jobs": {
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
                  },
                  "scope": {
                    "type": "string"
                  },
                  "unparsed": {
                    "type": "json"
                  },
                  "workflows": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "other"
            ]
          },
          "procedure": "security.repo-parse",
          "description": "Read the repository snapshot that triggered the Line (security.fetched-v1) for the Line's source (parameters: source, repo_source, forge_host, full_name, ref, scope, path) and propose what changed: workflows, jobs and their triggers, permissions, secrets, environment, actions and publish targets, or a manifest's declared digests, plus the source's coverage restated (an unchanged snapshot re-observes it; a new revision revises it). Halts other_source for another source's snapshot. Runs as a Line with trigger_input snapshot.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-repo-parse-input"
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
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.repo-parse\"}])",
            "cx.get(\"Procedure:security.repo-parse\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:15.942479Z"
      }
    ]
  }
});
