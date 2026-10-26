// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 4cd8ff0b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.sarif-attention"
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
        "ref": "Procedure:security.sarif-attention",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.sarif-attention",
            "description": "Read the SARIF log Capture that triggered the Line for the Line's repository (parameter repo_ref) and post one inbox item per location gap (a result with no repository-relative path or no stable locus: one per tool, rule and path) and per regression (a fixed finding a full scan reports again). Never changes accepted state. Runs as a Line with trigger_input sarif, beside security.sarif-import.",
            "input": {
              "repo_ref": {
                "type": "string"
              }
            },
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "findings": "$parse.findings",
                "fixed": "$parse.fixed",
                "full": "$parse.full",
                "gaps": "$parse.gaps",
                "mine": "$parse.mine",
                "new": "$parse.new",
                "posted": "$parse.posted",
                "regressed": "$parse.regressed",
                "repo_ref": "$parse.repo_ref",
                "results": "$parse.results",
                "revisions": "$parse.revisions",
                "routed_to_assessment": "$parse.routed_to_assessment",
                "tools": "$parse.tools"
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
              "parse": "security.sarif-findings@1",
              "sarif": "workspace.file"
            },
            "steps": [
              {
                "id": "sarif",
                "source": "sarif",
                "contract": "security.file-v1",
                "interface": "workspace.file",
                "provider": "sarif",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "sarif.log",
                  "relative_path": "scan.sarif",
                  "replayability": "exact",
                  "selector": {
                    "whole": true
                  },
                  "selector_type": "whole-response-v1",
                  "tag": "playbill-workspace-file-source-request-v2"
                }
              },
              {
                "id": "held",
                "tap": "held",
                "query": "security.finding_index",
                "params": {
                  "repo_ref": "$input.repo_ref"
                }
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.sarif-findings/v1",
                "provider": "parse",
                "input": {
                  "held": "$held.result.rows",
                  "repo_ref": "$input.repo_ref",
                  "sarif_text": "$sarif.content.text",
                  "truncated": "$held.truncated"
                }
              },
              {
                "id": "mine",
                "guard": "parse.mine > 0",
                "refusal_code": "wrong_repo",
                "message": "The landed SARIF log has no run of the Line's repository.",
                "else_id": "other",
                "else": "halt(wrong_repo)"
              },
              {
                "id": "posted",
                "guard": "parse.posted > 0",
                "refusal_code": "nothing_to_post",
                "message": "The scan has no location gap and no regression.",
                "else_id": "quiet",
                "else": "halt(nothing_to_post)"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$parse.inbox"
                },
                "max_items": 1000
              }
            ],
            "input_contract": "security-sarif-import-input",
            "output_contract": "security-sarif-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "findings": {
                "type": "integer"
              },
              "fixed": {
                "type": "integer"
              },
              "full": {
                "type": "json"
              },
              "gaps": {
                "type": "integer"
              },
              "mine": {
                "type": "integer"
              },
              "new": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "regressed": {
                "type": "integer"
              },
              "repo_ref": {
                "type": "string"
              },
              "results": {
                "type": "integer"
              },
              "revisions": {
                "type": "json"
              },
              "routed_to_assessment": {
                "type": "integer"
              },
              "tools": {
                "type": "json"
              }
            },
            "contracts": {
              "security-sarif-import-input": {
                "fields": {
                  "repo_ref": {
                    "type": "string"
                  }
                }
              },
              "security-sarif-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "findings": {
                    "type": "integer"
                  },
                  "fixed": {
                    "type": "integer"
                  },
                  "full": {
                    "type": "json"
                  },
                  "gaps": {
                    "type": "integer"
                  },
                  "mine": {
                    "type": "integer"
                  },
                  "new": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "regressed": {
                    "type": "integer"
                  },
                  "repo_ref": {
                    "type": "string"
                  },
                  "results": {
                    "type": "integer"
                  },
                  "revisions": {
                    "type": "json"
                  },
                  "routed_to_assessment": {
                    "type": "integer"
                  },
                  "tools": {
                    "type": "json"
                  }
                }
              }
            },
            "halt_order": [
              "quiet",
              "other"
            ]
          },
          "procedure": "security.sarif-attention",
          "description": "Read the SARIF log Capture that triggered the Line for the Line's repository (parameter repo_ref) and post one inbox item per location gap (a result with no repository-relative path or no stable locus: one per tool, rule and path) and per regression (a fixed finding a full scan reports again). Never changes accepted state. Runs as a Line with trigger_input sarif, beside security.sarif-import.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-sarif-import-input"
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
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.sarif-attention\"}])",
            "cx.get(\"Procedure:security.sarif-attention\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:16.370716Z"
      }
    ]
  }
});
