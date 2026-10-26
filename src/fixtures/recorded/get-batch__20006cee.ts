// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 55cea1f6
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "Procedure:security.credential-import"
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
        "ref": "Procedure:security.credential-import",
        "kind": "procedure",
        "detail": "summary",
        "card": {
          "authored": {
            "procedure": "security.credential-import",
            "description": "Read the credential-state Capture that triggered the Line (security.file-erasable-v1) and propose what changed: the credential's current key_id, issued_at and issued_by from a receipt or a state read; revoked_key and a rotation's verification only from a state read (verified: the rotation's revokes_key is listed revoked or deleted, or absent from a listing that says complete, and an active key was issued after the incident's window_start; failed: claimed completed while revokes_key is still listed). A body outside the allow-list, or a key id, issuer, name or principal shaped like a secret, proposes nothing and is posted (secret_shape, with a fixed message: nothing from the body is echoed). Runs as a Line with trigger_input credential.",
            "input": {},
            "returns": {
              "fields": {
                "added": "$parse.added",
                "changed": "$parse.changed",
                "credential": "$parse.credential",
                "failed": "$parse.failed",
                "keys": "$parse.keys",
                "posted": "$parse.posted",
                "read": "$parse.read",
                "revised": "$parse.revised",
                "unproven": "$parse.unproven",
                "verified": "$parse.verified"
              }
            },
            "activation": "drain",
            "budget": {
              "wall_clock": "PT60S",
              "provider_calls": 2
            },
            "caps": {
              "wall_clock": "PT120S",
              "provider_calls": 2,
              "items": 500
            },
            "slots": {
              "credential": "workspace.file",
              "parse": "security.credential-state@1"
            },
            "steps": [
              {
                "id": "credential",
                "source": "credential",
                "contract": "security.file-erasable-v1",
                "interface": "workspace.file",
                "provider": "credential",
                "request": {
                  "coordinate": {
                    "revision": "working"
                  },
                  "coordinate_type": "http-response-v1",
                  "logical_source": "security.credential-state",
                  "relative_path": "credential.json",
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
                "query": "security.rotation_work"
              },
              {
                "id": "parse",
                "call": "parse",
                "interface": "security.credential-state/v1",
                "provider": "parse",
                "input": {
                  "held": "$held.result.rows",
                  "state_text": "$credential.content.text",
                  "truncated": "$held.truncated"
                }
              },
              {
                "id": "allowed",
                "guard": "parse.posted == 0",
                "refusal_code": "secret_shape",
                "message": "The body is not the credential-state allow-list.",
                "else": "post"
              },
              {
                "id": "changed",
                "guard": "parse.changed > 0",
                "refusal_code": "no_change",
                "message": "The read changes no held key state.",
                "else_id": "nochange",
                "else": "halt(no_change)"
              },
              {
                "id": "propose",
                "propose": "$parse.items",
                "result": "$summary"
              },
              {
                "id": "post",
                "inbox": {
                  "items": "$parse.inbox"
                },
                "max_items": 10
              }
            ],
            "input_contract": "security-empty-input",
            "output_contract": "security-credential-state-summary",
            "output": {
              "added": {
                "type": "integer"
              },
              "changed": {
                "type": "integer"
              },
              "credential": {
                "type": "string"
              },
              "failed": {
                "type": "integer"
              },
              "keys": {
                "type": "integer"
              },
              "posted": {
                "type": "integer"
              },
              "read": {
                "type": "string"
              },
              "revised": {
                "type": "integer"
              },
              "unproven": {
                "type": "integer"
              },
              "verified": {
                "type": "integer"
              }
            },
            "contracts": {
              "security-credential-state-summary": {
                "fields": {
                  "added": {
                    "type": "integer"
                  },
                  "changed": {
                    "type": "integer"
                  },
                  "credential": {
                    "type": "string"
                  },
                  "failed": {
                    "type": "integer"
                  },
                  "keys": {
                    "type": "integer"
                  },
                  "posted": {
                    "type": "integer"
                  },
                  "read": {
                    "type": "string"
                  },
                  "revised": {
                    "type": "integer"
                  },
                  "unproven": {
                    "type": "integer"
                  },
                  "verified": {
                    "type": "integer"
                  }
                }
              },
              "security-empty-input": {
                "fields": {}
              }
            },
            "halt_order": [
              "nochange"
            ]
          },
          "procedure": "security.credential-import",
          "description": "Read the credential-state Capture that triggered the Line (security.file-erasable-v1) and propose what changed: the credential's current key_id, issued_at and issued_by from a receipt or a state read; revoked_key and a rotation's verification only from a state read (verified: the rotation's revokes_key is listed revoked or deleted, or absent from a listing that says complete, and an active key was issued after the incident's window_start; failed: claimed completed while revokes_key is still listed). A body outside the allow-list, or a key id, issuer, name or principal shaped like a secret, proposes nothing and is posted (secret_shape, with a fixed message: nothing from the body is echoed). Runs as a Line with trigger_input credential.",
          "lifecycle": "live",
          "inputs": {
            "input": "Contract:security-empty-input"
          },
          "runnable": "line",
          "unsupported_nodes": [
            {
              "node_id": "propose",
              "kind": "propose_change_set",
              "runs_on": "line"
            },
            {
              "node_id": "post",
              "kind": "post_inbox",
              "runs_on": "line"
            }
          ],
          "track_record": [],
          "next": [
            "cx.query(\"Line\", where=[{\"field\": \"procedure\", \"eq\": \"Procedure:security.credential-import\"}])",
            "cx.get(\"Procedure:security.credential-import\", detail=\"proof\")"
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
        "evaluation_time": "2026-10-26T19:05:12.183004Z"
      }
    ]
  }
});
