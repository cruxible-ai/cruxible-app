// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 81a26ffb
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.harden"
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
        "ref": "Procedure:security.harden",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.harden",
            "description": "Ask the six hardening questions (HQ1-HQ6) about every gated target (a target with a security.target.publish_gate) and answer each in three states: found (posted as a finding), none (a current coverage answers it; run summary only) or unknown (posted as one gap item per source, naming the pull: {source, pull, input}). HQ6 (an open confirmed code finding in a release the target serves) is found or not recorded, never none. Observe-only. Runs as a Line (parameters: default_ref, repo_pull, registry_pull, release_pull, versions): daily, on a pull landing, or line run.",
            "input": {
              "default_ref": {
                "type": "string"
              },
              "registry_pull": {
                "type": "string"
              },
              "release_pull": {
                "type": "string"
              },
              "repo_pull": {
                "type": "string"
              },
              "versions": {
                "type": "integer"
              }
            },
            "returns": {
              "fields": {
                "answers": "$classify.answers",
                "found": "$classify.found",
                "gaps": "$classify.gaps",
                "none": "$classify.none",
                "posted": "$classify.posted",
                "targets": "$classify.targets",
                "unknown": "$classify.unknown"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT120S",
              "provider_calls": 1
            },
            "caps": {
              "wall_clock": "PT300S",
              "provider_calls": 1,
              "items": 200
            },
            "slots": {
              "classify": "security.harden@1"
            },
            "steps": [
              {
                "id": "hq1",
                "tap": "hq1",
                "query": "security.publish_paths"
              },
              {
                "id": "hq2",
                "tap": "hq2",
                "query": "security.credentialed_jobs"
              },
              {
                "id": "hq3",
                "tap": "hq3",
                "query": "security.mutable_actions"
              },
              {
                "id": "hq4",
                "tap": "hq4",
                "query": "security.shared_dependencies"
              },
              {
                "id": "hq5",
                "tap": "hq5",
                "query": "security.served_vs_declared"
              },
              {
                "id": "hq6",
                "tap": "hq6",
                "query": "security.published_findings"
              },
              {
                "id": "classify",
                "call": "classify",
                "interface": "security.harden/v1",
                "provider": "classify",
                "input": {
                  "hq1": "$hq1.result.rows",
                  "hq2": "$hq2.result.rows",
                  "hq3": "$hq3.result.rows",
                  "hq4": "$hq4.result.rows",
                  "hq5": "$hq5.result.rows",
                  "hq6": "$hq6.result.rows",
                  "params": "$input",
                  "truncated": {
                    "hq1": "$hq1.truncated",
                    "hq2": "$hq2.truncated",
                    "hq3": "$hq3.truncated",
                    "hq4": "$hq4.truncated",
                    "hq5": "$hq5.truncated",
                    "hq6": "$hq6.truncated"
                  }
                }
              },
              {
                "id": "posted",
                "guard": "classify.posted > 0",
                "refusal_code": "nothing_to_post",
                "message": "Every hardening answer is none: nothing to post.",
                "else_id": "quiet",
                "else": "halt(nothing_to_post)"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$classify.items"
                },
                "max_items": 200
              }
            ],
            "input_contract": "security-harden-input",
            "output_contract": "security-harden-summary",
            "output": {
              "answers": {
                "type": "json"
              },
              "found": {
                "type": "integer"
              },
              "gaps": {
                "type": "integer"
              },
              "none": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "targets": {
                "type": "integer"
              },
              "unknown": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-harden-input": {
                "fields": {
                  "default_ref": {
                    "type": "string"
                  },
                  "registry_pull": {
                    "type": "string"
                  },
                  "release_pull": {
                    "type": "string"
                  },
                  "repo_pull": {
                    "type": "string"
                  },
                  "versions": {
                    "type": "integer"
                  }
                }
              },
              "security-harden-summary": {
                "fields": {
                  "answers": {
                    "type": "json"
                  },
                  "found": {
                    "type": "integer"
                  },
                  "gaps": {
                    "type": "integer"
                  },
                  "none": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "targets": {
                    "type": "integer"
                  },
                  "unknown": {
                    "type": "integer"
                  }
                }
              }
            },
            "halt_order": [
              "quiet"
            ]
          },
          "procedure": "security.harden",
          "description": "Ask the six hardening questions (HQ1-HQ6) about every gated target (a target with a security.target.publish_gate) and answer each in three states: found (posted as a finding), none (a current coverage answers it; run summary only) or unknown (posted as one gap item per source, naming the pull: {source, pull, input}). HQ6 (an open confirmed code finding in a release the target serves) is found or not recorded, never none. Observe-only. Runs as a Line (parameters: default_ref, repo_pull, registry_pull, release_pull, versions): daily, on a pull landing, or line run.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-harden-input"
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
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.harden\"}])",
            "cx.get(\"Procedure:security.harden\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:12.919318Z"
      }
    ]
  }
});
