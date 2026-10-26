// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 44647c52
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a"
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
        "ref": "ProcedureRun:RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
          "procedure": "Procedure:security.epss-acquire",
          "status": "succeeded",
          "nodes_done": 3,
          "nodes_total": 3,
          "started_at": "2026-10-26T17:45:37.203290Z",
          "elapsed_us": 1260750,
          "elapsed_basis": "measured_wall_clock",
          "nodes": [
            {
              "node": "epss",
              "kind": "source",
              "verdict": "succeeded",
              "sequence": 8
            },
            {
              "node": "summary",
              "kind": "project",
              "verdict": "succeeded",
              "sequence": 9
            },
            {
              "node": "step_2",
              "kind": "emit_capture",
              "verdict": "succeeded",
              "sequence": 13
            }
          ],
          "pending_inputs": [],
          "triggered_by": {
            "line": "Line:security.epss-daily",
            "occurrence": "sha256:007cd5732c26eb13064b4df5a1e4dd2fdfc1fa29b744e9d491d6b24a05a676d4"
          },
          "actor": "robertmalone",
          "receipt_digest": "sha256:c0dc3636ec1277eeae594ef07155c161e4637fbd43b3d82cf31bd8aafffa14b4",
          "result": {
            "body_digest": "sha256:321ba69d752fe4e807c12a53d3459e5589499901709f5317ae87361ee16e60a8",
            "status": 200,
            "url": "https://epss.empiricalsecurity.com/epss_scores-2026-10-26.csv.gz"
          },
          "outcomes": [
            {
              "sequence": 7,
              "event_kind": "produced_capture",
              "node_id": "epss",
              "payload_digest": "sha256:5413c3379dbe1dc3c91b16ed2de1eca9575e73ed2c8a164d74f719a2d00184e6",
              "capture_event": {
                "run_id": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
                "partition_id": "line:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
                "sequence": 7,
                "record_digest": "sha256:7d715ab900a26518784103ef484323a3526295174061c62afea914d6a48725c9"
              }
            },
            {
              "sequence": 8,
              "event_kind": "node_fired",
              "node_id": "epss",
              "payload_digest": "sha256:4469d1fc834963d4c52af0b8f9f2e4526365f741f42a27761241b843472aa8ae"
            },
            {
              "sequence": 9,
              "event_kind": "node_fired",
              "node_id": "summary",
              "payload_digest": "sha256:c6d9b6d7204106c4786f27db0495a1d1edadd0bf11fda838c417a975d3494eba"
            },
            {
              "sequence": 12,
              "event_kind": "produced_capture",
              "node_id": "step_2",
              "payload_digest": "sha256:49e120420031139380612fb87694d05cf1f66ed385c324acd4d5f0fddcdb956a",
              "capture_event": {
                "run_id": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
                "partition_id": "line:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
                "sequence": 12,
                "record_digest": "sha256:a21fed82f75da3c958fd526889d508da090f8fd63b1b626e2e874673dd9b318e"
              }
            },
            {
              "sequence": 13,
              "event_kind": "node_fired",
              "node_id": "step_2",
              "payload_digest": "sha256:d4aeee7ce965173db3acd83386ace87926c25e22ac64426d64005b6c7059d753"
            },
            {
              "sequence": 14,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:cc56d13d5a4a30005c768b0ae649fbdae1eb9e453356b876259e5a4cc156d86e"
            }
          ],
          "terminal_egress": [
            {
              "tag": "playbill-procedure-terminal-egress-v1",
              "node_id": "step_2",
              "kind": "emit_capture",
              "verdict": "delivered",
              "required_authority": "observe",
              "effective_authority": "observe",
              "limiting_term": "procedure_terminal_capability",
              "operation_key": null,
              "procedure_mandate_digest": null,
              "target_paths": [],
              "proposal_id": null,
              "candidate_digest": null,
              "refusal_code": null,
              "children": [
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 0,
                  "item_key": "00000000.4ceeee308347ab658c12b0eb4de33e1f",
                  "manifest_digest": "sha256:022998ba7e255f8481b339231c817b1bbc0f2a384110f35c126e19ca2233500b",
                  "egress_digest": "sha256:468281d39ddb06593713376878a5fe6a6de19df980cd4fec7077ad4993d5b135",
                  "path": null,
                  "prior_refusals": []
                }
              ],
              "journal_coordinate": {
                "tag": "playbill-procedure-journal-coordinate-v1",
                "stream_instance_id": "inst_bff87e924cbb4f7f",
                "journal_family": "procedure-exhaust-v1",
                "stream_id": "procedures",
                "partition_id": "line:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
                "sequence": 11,
                "record_digest": "sha256:b50055c8ac02c5cc5ba081bc7ebb772649d74bc5f315c9d6aa350bd84025e2da"
              },
              "settle_outcome": null,
              "accepted_git_oid": null,
              "fallback_reason": null,
              "outside_scope_claim_types": [],
              "capped_by": null,
              "prior_refusal_coverage": null
            }
          ],
          "next": [
            "cx.get(\"Procedure:security.epss-acquire\")",
            "cx.get(\"Line:security.epss-daily\")",
            "cx.get(\"ProcedureRun:RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a\", detail=\"proof\")"
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
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "f3765015f78f",
            "generation": 12
          },
          "fields": [
            "card"
          ]
        },
        "evaluation_time": "2026-10-26T19:05:17.255059Z"
      }
    ]
  }
});
