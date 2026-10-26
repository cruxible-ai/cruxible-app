// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/procedure-runs/RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/procedure-runs/{run_id}",
  "pathParams": {
    "run_id": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a"
  },
  "response": {
    "investigation": null,
    "trigger_binding": null,
    "tag": "playbill-procedure-run-state-v2",
    "run_id": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.epss-acquire"
    },
    "procedure_artifact_digest": "sha256:dc9a91aeb9aab76b65e896551308f11f34493a1a4c9d514bbd1e9dbd22971b4b",
    "bound_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
      "semantic_root": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0",
      "generation_root": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "head_at_admission": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
      "semantic_root": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0",
      "generation_root": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "lane": "current",
    "evaluation_time": "2026-10-26T17:45:37.203290Z",
    "status": "succeeded",
    "pending_inputs": [],
    "outcomes": [
      {
        "capture_event": {
          "run_id": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
          "partition_id": "line:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
          "sequence": 7,
          "record_digest": "sha256:7d715ab900a26518784103ef484323a3526295174061c62afea914d6a48725c9"
        },
        "sequence": 7,
        "event_kind": "produced_capture",
        "node_id": "epss",
        "payload_digest": "sha256:5413c3379dbe1dc3c91b16ed2de1eca9575e73ed2c8a164d74f719a2d00184e6"
      },
      {
        "capture_event": null,
        "sequence": 8,
        "event_kind": "node_fired",
        "node_id": "epss",
        "payload_digest": "sha256:4469d1fc834963d4c52af0b8f9f2e4526365f741f42a27761241b843472aa8ae"
      },
      {
        "capture_event": null,
        "sequence": 9,
        "event_kind": "node_fired",
        "node_id": "summary",
        "payload_digest": "sha256:c6d9b6d7204106c4786f27db0495a1d1edadd0bf11fda838c417a975d3494eba"
      },
      {
        "capture_event": {
          "run_id": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
          "partition_id": "line:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
          "sequence": 12,
          "record_digest": "sha256:a21fed82f75da3c958fd526889d508da090f8fd63b1b626e2e874673dd9b318e"
        },
        "sequence": 12,
        "event_kind": "produced_capture",
        "node_id": "step_2",
        "payload_digest": "sha256:49e120420031139380612fb87694d05cf1f66ed385c324acd4d5f0fddcdb956a"
      },
      {
        "capture_event": null,
        "sequence": 13,
        "event_kind": "node_fired",
        "node_id": "step_2",
        "payload_digest": "sha256:d4aeee7ce965173db3acd83386ace87926c25e22ac64426d64005b6c7059d753"
      },
      {
        "capture_event": null,
        "sequence": 14,
        "event_kind": "attempt_finalized",
        "node_id": null,
        "payload_digest": "sha256:cc56d13d5a4a30005c768b0ae649fbdae1eb9e453356b876259e5a4cc156d86e"
      }
    ],
    "next_operation": {
      "kind": "done"
    },
    "result": {
      "body_digest": "sha256:321ba69d752fe4e807c12a53d3459e5589499901709f5317ae87361ee16e60a8",
      "status": 200,
      "url": "https://epss.empiricalsecurity.com/epss_scores-2026-10-26.csv.gz"
    },
    "attribution": {
      "tag": "playbill-procedure-run-attribution-v1",
      "actor_type": "service_account",
      "actor_id": "robertmalone",
      "org_id": "local",
      "operation_id": "op_da42ac6de6f04679",
      "request_id": null,
      "recorded_time": "2026-10-26T17:45:37.203290Z"
    },
    "semantic_replay_key_digest": "sha256:c16967ea990af2a1638149de358d239d3ce11bbd22b4f500df01817afdb0c90d",
    "semantic_result_digest": "sha256:9332660a6eceaaa51e88672cd478027cf23e34a5357f3a411008262586ed7939",
    "receipt": {
      "tag": "playbill-procedure-run-receipt-v7",
      "run_id": "RUN-4f299b589ad6d516c092d9438e1929324a54231364b2847e3d5e7efe0ec2ab5a",
      "admission_binding_digest": "sha256:678ac1880a8c23df498742c787e2928290356bd8aa0ae520d853e059b4140429",
      "semantic_replay_key_digest": "sha256:c16967ea990af2a1638149de358d239d3ce11bbd22b4f500df01817afdb0c90d",
      "semantic_result_digest": "sha256:9332660a6eceaaa51e88672cd478027cf23e34a5357f3a411008262586ed7939",
      "bound_coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
        "semantic_root": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0",
        "generation_root": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114",
        "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
      },
      "head_at_admission": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
        "semantic_root": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0",
        "generation_root": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114",
        "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
      },
      "lane": "current",
      "evaluation_time": "2026-10-26T17:45:37.203290Z",
      "validated_pins": [
        {
          "role": "capture-contract",
          "target": {
            "kind": "CaptureContract",
            "name": "security.fetched-v1"
          },
          "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71"
        },
        {
          "role": "capture-contract",
          "target": {
            "kind": "CaptureContract",
            "name": "security.observation-output-v1"
          },
          "artifact_digest": "sha256:8c034c41e71640b3eb8ce287ff52f61a22817fb3f2bcc6551c203f3fc0db50ad"
        },
        {
          "role": "contract-in",
          "target": {
            "kind": "Contract",
            "name": "security.epss-acquire-input"
          },
          "artifact_digest": "sha256:b70378bd74bc4ecfb99fbe28f783298c570f35d1f797cb24f2d4ad449041fd2c"
        },
        {
          "role": "contract-out",
          "target": {
            "kind": "Contract",
            "name": "security-http-evidence"
          },
          "artifact_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
        },
        {
          "role": "provider",
          "target": {
            "kind": "Provider",
            "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
          },
          "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e"
        },
        {
          "role": "provider-interface",
          "target": {
            "kind": "ProviderInterface",
            "name": "security.epss-daily/v1"
          },
          "artifact_digest": "sha256:ddcd9d2a4a343e1564712be5cb72e32b2d6892e32a7203946237d4c8392754db"
        }
      ],
      "admitted_inputs": [],
      "attribution": {
        "tag": "playbill-procedure-run-attribution-v1",
        "actor_type": "service_account",
        "actor_id": "robertmalone",
        "org_id": "local",
        "operation_id": "op_da42ac6de6f04679",
        "request_id": null,
        "recorded_time": "2026-10-26T17:45:37.203290Z"
      },
      "stream_instance_id": "inst_bff87e924cbb4f7f",
      "journal_family": "procedure-exhaust-v1",
      "stream_id": "procedures",
      "partition_id": "line:dca0de9ff0cc644a69cb568dd0ecf8f3dcff93d1264ea9a89310323c034dcc3d",
      "first_sequence": 1,
      "last_sequence": 14,
      "record_digests": [
        "sha256:6b134e8e3fcc2d8ced7949f89f74bd00801d88f2bab41a9e8db061d0c8639c72",
        "sha256:144ecd9bb71e7f8ebaccae85af49df3469a4077790162c485641638da0a8f632",
        "sha256:f214f64f082b907015e726dd4d6a429c6cca2121a1c829ef56018ae1b9b8649d",
        "sha256:b3bd0caa6b4c5832b58425e1cc89b36a49273abbc285a973203e78ff197f4a80",
        "sha256:501db7e0403c7edfd0db4d6c142b8d8e4c5884c91fcb330f40e3f77b3be58549",
        "sha256:3090be9c1875ff093953212f21ed6af63daf4dffaf044a68da1119700a68e738",
        "sha256:7d715ab900a26518784103ef484323a3526295174061c62afea914d6a48725c9",
        "sha256:550e08f4fcedf588bc0cb861c48c87c9287cb6a92363afc2afab12fb91720bf9",
        "sha256:fcf1d3917af935b35e7ad52a7d97d39671e8f1ee98fb25843292471131edd54b",
        "sha256:1bb2f74693d421b4f6e011ddbbafc03841fb3dfb7e28b91ec94a50c44f5651b7",
        "sha256:b50055c8ac02c5cc5ba081bc7ebb772649d74bc5f315c9d6aa350bd84025e2da",
        "sha256:a21fed82f75da3c958fd526889d508da090f8fd63b1b626e2e874673dd9b318e",
        "sha256:4c5786672bbeb9b63eae33bebc2b248a729ebd86d189205561e4b966ea87ac03",
        "sha256:43b4ca525b311c717713d576658272629ac3d3936c1c97cbf96a4a5f0c27b62a"
      ],
      "chain_head_digest": "sha256:43b4ca525b311c717713d576658272629ac3d3936c1c97cbf96a4a5f0c27b62a",
      "status": "succeeded",
      "terminal": null,
      "budget": {
        "tag": "playbill-procedure-run-budget-v2",
        "declared": {
          "tag": "playbill-procedure-run-budget-declared-v2",
          "budget": {
            "tag": "playbill-procedure-budget-v1",
            "wall_clock": {
              "tag": "playbill-duration-v1",
              "microseconds": 300000000
            },
            "max_provider_calls": 1,
            "max_capture_bytes": 33554432,
            "max_items": 1
          },
          "hard_caps": {
            "tag": "playbill-procedure-hard-caps-v1",
            "max_wall_clock": {
              "tag": "playbill-duration-v1",
              "microseconds": 300000000
            },
            "max_provider_calls": 1,
            "max_capture_bytes": 33554432,
            "max_items": 1,
            "max_repeat_attempts": 1
          },
          "result_bytes_cap": 1048576,
          "provider_output_bytes_cap": 67108864
        },
        "observed": {
          "tag": "playbill-procedure-run-budget-observed-v1",
          "max_items": {
            "tag": "playbill-procedure-budget-boundary-observation-v1",
            "high_water": 0,
            "boundary": null,
            "field_path": null
          },
          "result_bytes": {
            "tag": "playbill-procedure-budget-boundary-observation-v1",
            "high_water": 175,
            "boundary": "procedure-return",
            "field_path": "summary"
          },
          "provider_calls": 1,
          "capture_bytes": 3701420,
          "wall_clock_microseconds": 1260750
        }
      },
      "invocation_origin": "line",
      "line_identity": {
        "kind": "Line",
        "name": "security.epss-daily"
      },
      "line_spec_digest": "sha256:588bb1d8c9f02eddd6262110e60930b6aa045d0a172b8290f63d1de792b71462",
      "occurrence_id": "sha256:007cd5732c26eb13064b4df5a1e4dd2fdfc1fa29b744e9d491d6b24a05a676d4",
      "occurrence_evaluation_time": "2026-10-26T17:45:37.203290Z",
      "node_pin_sets": [
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "epss",
          "pins": [
            {
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.fetched-v1"
              },
              "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71"
            },
            {
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
              },
              "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e"
            },
            {
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "security.epss-daily/v1"
              },
              "artifact_digest": "sha256:ddcd9d2a4a343e1564712be5cb72e32b2d6892e32a7203946237d4c8392754db"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "step_2",
          "pins": [
            {
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.observation-output-v1"
              },
              "artifact_digest": "sha256:8c034c41e71640b3eb8ce287ff52f61a22817fb3f2bcc6551c203f3fc0db50ad"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "summary",
          "pins": [
            {
              "role": "contract-out",
              "target": {
                "kind": "Contract",
                "name": "security-http-evidence"
              },
              "artifact_digest": "sha256:bb6c83d34b8e5d80b21150f59347988392e7a1efe60024e0e6f2d3da128a6115"
            }
          ]
        }
      ],
      "pin_set_digest": "sha256:f1056e5ee720e8e692ae788b8a516f28ab1f78e51d8f479ff8d808d89ffcbc2b",
      "replay_input_vector": [],
      "deployment_snapshot_digest": "sha256:e0fe52707202a30ac1371109a154d09c76ed77f0a73ab182e452f6bb54bd35a4",
      "acquisition_policy_digest": "sha256:1f5d6657ee31b7500e7f76feb7f357288a2b8466fb29e7e1511724739a2fe8e2",
      "selection_receipt_digest": null,
      "selection_decision": {
        "tag": "playbill-procedure-selection-decision-v1",
        "policy_digest": "sha256:1f5d6657ee31b7500e7f76feb7f357288a2b8466fb29e7e1511724739a2fe8e2",
        "verdict": "selected",
        "decisions": [
          {
            "input_name": "epss",
            "disposition": "selected",
            "considered_capture_digests": [],
            "selected_capture_digests": [],
            "selected_cursors": [],
            "default_value": null,
            "reason_codes": []
          }
        ],
        "coherence_proof_digest": null
      },
      "selection_decision_digest": "sha256:942366e0783b5edb3aaac2e55e6c7e0be5069210698520885477ab36139e7b3b",
      "resolved_provider_bindings": [
        {
          "tag": "playbill-procedure-provider-binding-v3",
          "node_id": "epss",
          "interface": {
            "kind": "ProviderInterface",
            "name": "security.epss-daily"
          },
          "interface_digest": "sha256:bdac36d3b002287344e03f620ee7bca94c0f9a18008618f0b8ab380517db6a96",
          "provider_artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e",
          "implementation_digest": "sha256:46fbd91cdfb63f4343135eacd820b9fc7fdf785a4137219d00c7b055c9d1eba9",
          "effect_class": "external_read",
          "secret_binding_identity_digests": []
        }
      ],
      "sensitivity_policy_digest": "sha256:dc556fb35a92ccd3157e7769f42cb8cbe4c4b4491028dfa7751bca6aa93656c7",
      "mandate_coordinate_digest": "sha256:bc06f2c0e6f133ce25a07620b8a54d0f119cef9f0b8e5d92da84d63e20f40930",
      "taint_labels": [],
      "epsilon_member": false,
      "admission_material_manifest": {
        "tag": "playbill-procedure-admission-material-v1",
        "members": []
      },
      "admission_material_manifest_digest": "sha256:66bfabe7130485c3b736f34f5f2e8d357848a8c9c8f1996b8a8ef6cd01ff2937",
      "acquisition_plan_digest": "sha256:d551a5e963f3c09b8fa0017ca8641dbf791fc25e522b62f240d089449f74ae14",
      "exhaust_access_binding_digest": null,
      "invocation_receipt_digests": [
        "sha256:cd53f43192fd9dd9dfa4b948ba6719d4acea8d529714d2e59af615fa59f04024"
      ],
      "source_capture_associations": [
        {
          "tag": "playbill-procedure-source-capture-association-v1",
          "occurrence_path": "source/epss",
          "invocation_receipt_digest": "sha256:cd53f43192fd9dd9dfa4b948ba6719d4acea8d529714d2e59af615fa59f04024",
          "capture_digest": "sha256:c670628be26d1afa56b7a2250cfaf9dbe08fe63b328f90d357024188daa4946a"
        }
      ]
    },
    "receipt_digest": "sha256:c0dc3636ec1277eeae594ef07155c161e4637fbd43b3d82cf31bd8aafffa14b4",
    "terminal": null,
    "children": [],
    "source_observations": [
      {
        "tag": "playbill-procedure-source-observation-v1",
        "occurrence_path": "source/epss",
        "node_id": "epss",
        "input_name": "epss",
        "source_read_receipt": null,
        "source_read_receipt_digest": null,
        "invocation_receipt_digest": "sha256:cd53f43192fd9dd9dfa4b948ba6719d4acea8d529714d2e59af615fa59f04024",
        "capture_digest": "sha256:c670628be26d1afa56b7a2250cfaf9dbe08fe63b328f90d357024188daa4946a"
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
    ]
  }
});
