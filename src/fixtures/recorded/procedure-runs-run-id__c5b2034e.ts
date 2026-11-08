// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/procedure-runs/RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/procedure-runs/{run_id}",
  "pathParams": {
    "run_id": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3"
  },
  "response": {
    "investigation": null,
    "trigger_binding": null,
    "tag": "playbill-procedure-run-state-v2",
    "run_id": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.kev-triage"
    },
    "procedure_artifact_digest": "sha256:370213f2d63f980a324c1e5e4571e025bd548df87d04c1635be533a4652a6f17",
    "bound_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
      "semantic_root": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b",
      "generation_root": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "head_at_admission": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
      "semantic_root": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b",
      "generation_root": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "lane": "current",
    "evaluation_time": "2026-11-07T18:00:00Z",
    "status": "succeeded",
    "pending_inputs": [],
    "outcomes": [
      {
        "capture_event": {
          "run_id": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
          "partition_id": "line:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
          "sequence": 7,
          "record_digest": "sha256:3fa6b0b5390fb2bd3e266c4bf98adad663377a96624a8d880a8fb647fd60915a"
        },
        "sequence": 7,
        "event_kind": "produced_capture",
        "node_id": "catalog",
        "payload_digest": "sha256:3f078d1aaac447b12cf45fa32659218e4ad55c08538267715c03ff85adcc5b37"
      },
      {
        "capture_event": null,
        "sequence": 8,
        "event_kind": "node_fired",
        "node_id": "catalog",
        "payload_digest": "sha256:9f9d3ac0b084c3fbd19172a88ca9ec8eae20e4737c6fbc891c07040cf18ce7a7"
      },
      {
        "capture_event": null,
        "sequence": 9,
        "event_kind": "node_fired",
        "node_id": "watched",
        "payload_digest": "sha256:9b0a231ac4713737ae4511d2c78353bf5ec683698d4fdc5addad8863d5030a58"
      },
      {
        "capture_event": null,
        "sequence": 10,
        "event_kind": "node_fired",
        "node_id": "entries",
        "payload_digest": "sha256:5a59c9c1e16e98f5541f4a39cffcb886bec3a86e740ecf9dbe5b83ba680a5e53"
      },
      {
        "capture_event": null,
        "sequence": 25,
        "event_kind": "node_fired",
        "node_id": "write",
        "payload_digest": "sha256:63e3df01a68e653842b49c8a7df691cc63876a33b4b1f5d33b0f2c7888cecdc3"
      },
      {
        "capture_event": null,
        "sequence": 26,
        "event_kind": "attempt_finalized",
        "node_id": null,
        "payload_digest": "sha256:00a99a354a300254c9ced120ed6965e972ee7b67f8da53b132849cca003a0f06"
      }
    ],
    "next_operation": {
      "kind": "done"
    },
    "result": {},
    "attribution": {
      "tag": "playbill-procedure-run-attribution-v1",
      "actor_type": "human_user",
      "actor_id": "owner",
      "org_id": "test",
      "operation_id": "b2-operations",
      "request_id": null,
      "recorded_time": "2026-11-07T18:00:00Z"
    },
    "semantic_replay_key_digest": "sha256:759febb02650d4114794b285de5614000ede3e972a302c4579009e359b6a701a",
    "semantic_result_digest": "sha256:4e2686ede00e7a2e5e79e365f5a304afd45eabce4bddc39f05afb51fc353583c",
    "receipt": {
      "tag": "playbill-procedure-run-receipt-v8",
      "run_id": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
      "admission_binding_digest": "sha256:1dfa05b766026e9a9d2a67daef6f1b4674d1778eb04c98b49ae8ff6baeadd8f0",
      "semantic_replay_key_digest": "sha256:759febb02650d4114794b285de5614000ede3e972a302c4579009e359b6a701a",
      "semantic_result_digest": "sha256:4e2686ede00e7a2e5e79e365f5a304afd45eabce4bddc39f05afb51fc353583c",
      "bound_coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
        "semantic_root": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b",
        "generation_root": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "head_at_admission": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
        "semantic_root": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b",
        "generation_root": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "lane": "current",
      "evaluation_time": "2026-11-07T18:00:00Z",
      "validated_pins": [
        {
          "role": "capture-contract",
          "target": {
            "kind": "CaptureContract",
            "name": "security.kev-catalog"
          },
          "artifact_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3"
        },
        {
          "role": "claim-type",
          "target": {
            "kind": "ClaimType",
            "name": "security.vulnerability.kev_date_added"
          },
          "artifact_digest": "sha256:b498918cb60ffca06c35a7b1ea11d9473f2c3b49b29507fb19ff20c5f65c9dbd"
        },
        {
          "role": "claim-type",
          "target": {
            "kind": "ClaimType",
            "name": "security.vulnerability.kev_due_date"
          },
          "artifact_digest": "sha256:2eaa22246720660fea9399f3e0602e07dc53cabde356ec8ae3c601f04ec9e116"
        },
        {
          "role": "claim-type",
          "target": {
            "kind": "ClaimType",
            "name": "security.vulnerability.kev_ransomware_use"
          },
          "artifact_digest": "sha256:7390ad1531fba16a6357144227caa596db3e24c63894332d9ce6fd1f19954caf"
        },
        {
          "role": "claim-type",
          "target": {
            "kind": "ClaimType",
            "name": "security.vulnerability.listed_in"
          },
          "artifact_digest": "sha256:6a3538367406ae23fb18e6951a3cdd452812c4b2f236b4cb7880dc3488bba69f"
        },
        {
          "role": "contract-in",
          "target": {
            "kind": "Contract",
            "name": "security.kev-triage.input/v1"
          },
          "artifact_digest": "sha256:fc5087e97e17fbf9fe954e2b9fed82f0e3f41a8a659529b2e12c3067b2043fc7"
        },
        {
          "role": "contract-out",
          "target": {
            "kind": "Contract",
            "name": "security.kev-triage.output/v1"
          },
          "artifact_digest": "sha256:956680a0e8619d2e01a72c00fef6cbd573649bdf6008095ee9005d49f0480264"
        },
        {
          "role": "parameter-contract",
          "target": {
            "kind": "Contract",
            "name": "security.kev-triage.params/v1"
          },
          "artifact_digest": "sha256:3041914d805e4dfc7afd3562cd1dc50776506ade90f386a47bf4906bc3ef86fc"
        },
        {
          "role": "provider",
          "target": {
            "kind": "Provider",
            "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
          },
          "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72"
        },
        {
          "role": "query",
          "target": {
            "kind": "QueryDefinition",
            "name": "security.watched_vulnerabilities"
          },
          "artifact_digest": "sha256:b64563bad1dcaab9f28ebeb7ed53201974ddcb1bc0ea197e31f294e02015e621"
        },
        {
          "role": "subject-kind",
          "target": {
            "kind": "SubjectKind",
            "name": "security.vulnerability"
          },
          "artifact_digest": "sha256:064d771fdad95e2e8082849368444bb21d3f2c3d96efa486cba21cb433815f6c"
        }
      ],
      "admitted_inputs": [
        {
          "tag": "playbill-accepted-state-run-input-v2",
          "kind": "accepted_state_v2",
          "input_name": "watched",
          "read_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
            "semantic_root": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b",
            "generation_root": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "query_definition_digest": "sha256:b64563bad1dcaab9f28ebeb7ed53201974ddcb1bc0ea197e31f294e02015e621",
          "parameters_digest": "sha256:6ea45fd7162a1c5d28f1a29ca2f875d5914c2c0eae34da4d64b80c30171a1ad0",
          "result_digest": "sha256:f338f6a3868b2aed60d8f421d77754c2c13039680e84b5378816483ee774eec1",
          "effective_query_budgets": {
            "tag": "playbill-query-budgets-v1",
            "max_results": 50000,
            "max_traversal_depth": 10,
            "max_paths": 50000,
            "max_paths_per_result": 50000
          },
          "material_body_digest": "sha256:a6edd27390f3d19f5195315c4ea6bb50a3d08202cd8e66f67d920daadbc09dfd"
        }
      ],
      "attribution": {
        "tag": "playbill-procedure-run-attribution-v1",
        "actor_type": "human_user",
        "actor_id": "owner",
        "org_id": "test",
        "operation_id": "b2-operations",
        "request_id": null,
        "recorded_time": "2026-11-07T18:00:00Z"
      },
      "stream_instance_id": "inst_console05",
      "journal_family": "procedure-exhaust-v1",
      "stream_id": "procedures",
      "partition_id": "line:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
      "first_sequence": 1,
      "last_sequence": 26,
      "record_digests": [
        "sha256:2ca0974584493d3be3431c462eb5250679e88c0b4e8eaa7d4afe6e8b750256a1",
        "sha256:ce7d9fc1ce6128686bdbf25cc96fa4ce73980343953d54dacfecb9740530195b",
        "sha256:ce9b23d05a49d341e90e49e8dc91c410fa872effcb321a34d1671802418566b6",
        "sha256:2f85e72bd6cb403bddf3955c862f174d8f8e4da9a10a341bf3b459dfe97abff9",
        "sha256:02ef2d80d529060cb7d9f61cebf79f9573eea3b7996fa1681dc566b5d536212e",
        "sha256:2626bcba8441bff737acc6958658a4df57d1d82c2a2b5e411c8b3a2d6fc47808",
        "sha256:3fa6b0b5390fb2bd3e266c4bf98adad663377a96624a8d880a8fb647fd60915a",
        "sha256:df080d5021be2d8967ce77bc414fc1c0a8cc2a644e949327d143878d23de1971",
        "sha256:5a1c01fffa5878cf4b62a9d5b7bd5b4c1a29320070808451894af25b3e92e616",
        "sha256:b926dc887d26970a207f6694753548df8161ac0fbb380acad7a4e66cde67616b",
        "sha256:960aabc296e6e669a45cdf1c0856d0065899a64122dfbbf9f2172c4046d15e16",
        "sha256:f0f70f19f5cca84f9731a26a2b826a7aa04bf1a54b3281243524c01424fb5e3f",
        "sha256:45b40e545ecc317eb144ece7a2a2c9adce2f0450a61e84db343d7155890759e5",
        "sha256:d3c8d85154b2755eac85b24be61a66061f058375750b49d4e93f1f36f5ed496e",
        "sha256:6c82c15b067b3f4e8f4fa7277968c2e83adb6377013755f854676b22027154fc",
        "sha256:28a0a5bed86f790a127553da0c3ff46f5658caaa14fe7a533e3e103ad60202e9",
        "sha256:a0ec224fc0c75462d7ab8b77c7439ab7b8e0ca6e5a2bec0d078af3436111ecbb",
        "sha256:3c03fb21bbdfeb4e8fc6809ca892ec327bf8e6cdf954e5efea2911f691de5d72",
        "sha256:25a2fc2349f264124f0c1ecc3b008728ab861517e8cf6389afde3007a1103684",
        "sha256:f2017322f497900d6135e779186ee78fbcc2d485548a0024937526166f71996d",
        "sha256:18c555806241177ce6d92487898edded810bf872427ea2bd4ae37036a7f2202f",
        "sha256:4515621e9f11f7591083fa62c89e975b7bfee6b1b204648d678e68f7f086c335",
        "sha256:8f090e8be19b034c90635a858e07e250a97bbc9b80374cebf407572a613eb2ad",
        "sha256:135424dcfbcb6e7dc56b65ca38e24e0c893c6c0badcb3e0c20d498a2a4d70b22",
        "sha256:b71e5dd1cd53e5fe2d2b91a50fc96fd0b36de744bab4579d15733434e9f66fcc",
        "sha256:0eb8af54bc02a4656c471b397239d4def5c317a78cff77a4e965cabb84d633c7"
      ],
      "chain_head_digest": "sha256:0eb8af54bc02a4656c471b397239d4def5c317a78cff77a4e965cabb84d633c7",
      "status": "succeeded",
      "terminal": null,
      "budget": {
        "tag": "playbill-procedure-run-budget-v3",
        "declared": {
          "tag": "playbill-procedure-run-budget-declared-v3",
          "budget": {
            "tag": "playbill-procedure-budget-v1",
            "wall_clock": {
              "tag": "playbill-duration-v1",
              "microseconds": 300000000
            },
            "max_provider_calls": 1,
            "max_capture_bytes": 16777216,
            "max_items": 20000,
            "max_read_rows": 50000
          },
          "hard_caps": {
            "tag": "playbill-procedure-hard-caps-v1",
            "max_wall_clock": {
              "tag": "playbill-duration-v1",
              "microseconds": 300000000
            },
            "max_provider_calls": 1,
            "max_capture_bytes": 16777216,
            "max_items": 20000,
            "max_repeat_attempts": 1,
            "max_read_rows": 50000
          },
          "result_bytes_cap": 1048576,
          "provider_output_bytes_cap": 67108864
        },
        "observed": {
          "tag": "playbill-procedure-run-budget-observed-v1",
          "max_items": {
            "tag": "playbill-procedure-budget-boundary-observation-v1",
            "high_water": 20,
            "boundary": "extract:entries",
            "field_path": "results"
          },
          "result_bytes": {
            "tag": "playbill-procedure-budget-boundary-observation-v1",
            "high_water": 2,
            "boundary": "procedure-return",
            "field_path": "write"
          },
          "provider_calls": 1,
          "capture_bytes": 30884,
          "wall_clock_microseconds": 284301,
          "read_rows": 9
        }
      },
      "invocation_origin": "line",
      "line_identity": {
        "kind": "Line",
        "name": "security.kev-triage"
      },
      "line_spec_digest": "sha256:bfd95a272507803b77568b19c1278f51d9ad9748ae566aeb0205f6001a6d1593",
      "occurrence_id": "sha256:14f0c4fb4ba0092b4537bbad96524c9aad91f5df4104d3515a714c842dcd605c",
      "occurrence_evaluation_time": "2026-11-07T18:00:00Z",
      "node_pin_sets": [
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "catalog",
          "pins": [
            {
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.kev-catalog"
              },
              "artifact_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "entries",
          "pins": []
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "watched",
          "pins": [
            {
              "role": "query",
              "target": {
                "kind": "QueryDefinition",
                "name": "security.watched_vulnerabilities"
              },
              "artifact_digest": "sha256:b64563bad1dcaab9f28ebeb7ed53201974ddcb1bc0ea197e31f294e02015e621"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "write",
          "pins": [
            {
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.vulnerability.kev_date_added"
              },
              "artifact_digest": "sha256:b498918cb60ffca06c35a7b1ea11d9473f2c3b49b29507fb19ff20c5f65c9dbd"
            },
            {
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.vulnerability.kev_due_date"
              },
              "artifact_digest": "sha256:2eaa22246720660fea9399f3e0602e07dc53cabde356ec8ae3c601f04ec9e116"
            },
            {
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.vulnerability.kev_ransomware_use"
              },
              "artifact_digest": "sha256:7390ad1531fba16a6357144227caa596db3e24c63894332d9ce6fd1f19954caf"
            },
            {
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.vulnerability.listed_in"
              },
              "artifact_digest": "sha256:6a3538367406ae23fb18e6951a3cdd452812c4b2f236b4cb7880dc3488bba69f"
            },
            {
              "role": "subject-kind",
              "target": {
                "kind": "SubjectKind",
                "name": "security.vulnerability"
              },
              "artifact_digest": "sha256:064d771fdad95e2e8082849368444bb21d3f2c3d96efa486cba21cb433815f6c"
            }
          ]
        }
      ],
      "pin_set_digest": "sha256:d1df1f5373ad775b0a28f6f3995994bc5028f64ebca881e5e986d7d070c27c02",
      "replay_input_vector": [
        {
          "tag": "playbill-procedure-replay-input-projection-v1",
          "input_name": "watched",
          "plane": "accepted_state",
          "kind": "query_result",
          "value_or_body_digest": "sha256:f338f6a3868b2aed60d8f421d77754c2c13039680e84b5378816483ee774eec1",
          "provenance_digest": "sha256:9b84599cb28c51cb842bb64a6c77a97db792bd5424e9a62d5b5d1e2ce6e8176e"
        }
      ],
      "deployment_snapshot_digest": "sha256:8f6d73e5b27319ca2259f2c61e73e931329ca710594768d966d653a444c5a766",
      "acquisition_policy_digest": "sha256:8d2ca5e0c738f9beda291e31208971384ebb4c178ad025cd8e83d0a0ef726afa",
      "selection_receipt_digest": null,
      "selection_decision": {
        "tag": "playbill-procedure-selection-decision-v1",
        "policy_digest": "sha256:8d2ca5e0c738f9beda291e31208971384ebb4c178ad025cd8e83d0a0ef726afa",
        "verdict": "selected",
        "decisions": [
          {
            "input_name": "catalog.capture",
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
      "selection_decision_digest": "sha256:07c6c1c6b3b8fa9ad71b04aa50b8b5ad01207d6ed3d16cb17974d33c29be4f61",
      "resolved_provider_bindings": [
        {
          "tag": "cruxible-procedure-provider-binding-v4",
          "node_id": "catalog",
          "slot": "fetch",
          "operation": "web.fetch",
          "operation_signature_digest": "sha256:97d85d6cf99e7e0e0452a6efee67c3381ed731e11dd103197b672366011de4ea",
          "provider_artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
          "implementation_digest": "sha256:613b67a56c42613f6703708fc09c5f92ebd0fd7c1f2061b9e8ce1c2b1e487a48",
          "effect_class": "external_read",
          "secret_binding_identity_digests": []
        }
      ],
      "sensitivity_policy_digest": "sha256:dc15b5c74ae6a68b958bc5f9f9b10bb7789636d11469de1b63cc11d8cb0429b8",
      "mandate_coordinate_digest": "sha256:a502299f0c228e58ce5bdc55f808262f1de498bffd9837c5da6e0745a2814947",
      "taint_labels": [],
      "epsilon_member": false,
      "admission_material_manifest": {
        "tag": "playbill-procedure-admission-material-v1",
        "members": []
      },
      "admission_material_manifest_digest": "sha256:66bfabe7130485c3b736f34f5f2e8d357848a8c9c8f1996b8a8ef6cd01ff2937",
      "acquisition_plan_digest": "sha256:470b570efc74c6623d576a7fceb632c8384c82f5cfb7097ae2c91b038d2c8f92",
      "exhaust_access_binding_digest": null,
      "invocation_receipt_digests": [
        "sha256:b1c4cd9926f546213ed7e7a7551ce8eb1586df04a34b74d7f5c0387693db5f49"
      ],
      "source_capture_associations": [
        {
          "tag": "playbill-procedure-source-capture-association-v1",
          "occurrence_path": "source/catalog",
          "field": "capture",
          "invocation_receipt_digest": "sha256:b1c4cd9926f546213ed7e7a7551ce8eb1586df04a34b74d7f5c0387693db5f49",
          "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
        }
      ]
    },
    "receipt_digest": "sha256:39379c9e85546c22456a4d57aa9a40d212e8a36b2211f4ca36bb1c693c2333c8",
    "terminal": null,
    "children": [],
    "source_observations": [
      {
        "tag": "playbill-procedure-source-observation-v1",
        "occurrence_path": "source/catalog",
        "node_id": "catalog",
        "input_name": "catalog.capture",
        "field": "capture",
        "source_read_receipt": null,
        "source_read_receipt_digest": null,
        "invocation_receipt_digest": "sha256:b1c4cd9926f546213ed7e7a7551ce8eb1586df04a34b74d7f5c0387693db5f49",
        "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
      }
    ],
    "terminal_egress": [
      {
        "tag": "playbill-procedure-terminal-egress-v1",
        "node_id": "write",
        "kind": "claims",
        "verdict": "delivered",
        "required_authority": "settle",
        "effective_authority": "settle",
        "limiting_term": "procedure_terminal_capability",
        "operation_key": "sha256:c499947384511d15a5646dd2c16e4677045474bd8ba71eea7e4df707cd945a5b",
        "procedure_mandate_digest": "sha256:d04a2dc2166a86cc54c8440024e39a152756ac956d0ace3cf874af1c63102537",
        "target_paths": [
          "claims/09/CLM-0955dffd8ac7482b3b2dfb54ebaaf39d.json",
          "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
          "claims/19/CLM-192c23be74b94747f2483672df1690f0.json",
          "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
          "claims/32/CLM-32c458928f64935b2e56d78d29834a69.json",
          "claims/35/CLM-35d6991a854e209eb6b1690c901dede0.json",
          "claims/45/CLM-451efce0eb50eafd9c199f90f8b74897.json",
          "claims/76/CLM-76f60748854f8fe0e4b701d4d9555417.json",
          "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
          "claims/b9/CLM-b975b2a8663904b11048323f620948ea.json",
          "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
          "claims/c7/CLM-c72168eed420b1b72725188c23a0b32a.json"
        ],
        "proposal_id": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
        "candidate_digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1",
        "refusal_code": null,
        "children": [
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 0,
            "item_key": "00000000.dca89cf0c8e2e03101f9b0992d7c0b06",
            "manifest_digest": "sha256:8521bd807a4acad9724e21107584f31b3fb7bd62958c0238e5913dd8d5e8d152",
            "egress_digest": "sha256:c1b8f8f80ee6b929d67d7488ab3b1e2e9d9abea28f1a3db45aeb789b8c954de7",
            "path": "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:9cd529f0f3b1511c05bbce0b5007e51607ce42829860a3144e8feea8c6f4f32e",
            "change_kind": "claim",
            "change_digest": "sha256:57768d4a884df713a8d882ccddf071219ce0d1ad0aac19b2b868db6a48183aa5"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 1,
            "item_key": "00000001.4402bf0000f884cb9aa29ac6871878de",
            "manifest_digest": "sha256:54f91dfb215136639566a4a9b1794b9afef450072f3e6a348d7ee642d0cb4700",
            "egress_digest": "sha256:929e4012d89f563fcf7b2c3c6c7e20bb8dadb00aa4f7c4163326ea16a749f81c",
            "path": "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:58b7305f8e26a8e6969acf7608f5a4f8e938d5b02e00e083a6566f5d1bba5dba",
            "change_kind": "claim",
            "change_digest": "sha256:b9c98c5216079f43e7724467c2711bd169eb8ddee1a8d621e0938916128ed4c9"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 2,
            "item_key": "00000002.b5ae51d372e977ea4d52f77d90e58e3e",
            "manifest_digest": "sha256:88de2852a86625f3f414d4d4b17da1a601f2c262ed8732903e42d08c250581f6",
            "egress_digest": "sha256:e36377908796716263680429883771de78d71509daa6d1dac2e9bae01d678605",
            "path": "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:342c6b05c7125aa09f35a10256cc11f4a2e48e9cc122ca10f0d34c92f1415562",
            "change_kind": "claim",
            "change_digest": "sha256:428eb5c5592bfcf3372bd4937641fe0d36d75af3cc34eab419ce5eede1dbfd83"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 3,
            "item_key": "00000003.05e070bf49354c8c767038901b021608",
            "manifest_digest": "sha256:d07999d4148487426dd08130ff1ef84e4ba6e852b901c7b021553af4743b27c1",
            "egress_digest": "sha256:0558068170061a68fb2a189ed38c1c0d940ebe5004b15cc68735c88c93e1d883",
            "path": "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:633c6ab5595423584f527b42b0a118a6bfe8362e294dbf10686db6f87915ef30",
            "change_kind": "claim",
            "change_digest": "sha256:c721de06b86c2f7150a21fccce79b1f02f0a58f2fd37d25739e86d6900e6e234"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 4,
            "item_key": "00000004.2c75d49f6395f6ff825ba40533f99c5b",
            "manifest_digest": "sha256:694953a89a0c1d0763fa8cfdf203fcd50a99c44302afbac6ee90e36c3e7baf09",
            "egress_digest": "sha256:5a99586a2e53e28b3ee882a0fbb5ca6b079b7daacc137098c5cfd4e995d48503",
            "path": "claims/45/CLM-451efce0eb50eafd9c199f90f8b74897.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:897aa11c737730d67873c09401e38db7d4cffe141c1e23403cadf159844617b7",
            "change_kind": "claim",
            "change_digest": "sha256:9dfe4fa3cb55e6d6bc766600eb68bf39be5a2312efd84663239bb2ffd2a26331"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 5,
            "item_key": "00000005.c3bf579bcc061721c406be05a193d496",
            "manifest_digest": "sha256:6a24820c749eeeb896dac37c6d7b84647ea11918d2b337110380af70355f8048",
            "egress_digest": "sha256:10222e335f1dd8f196b80ebfddcfbad31385ecd76ae8c3716d966e2b0bd261b4",
            "path": "claims/35/CLM-35d6991a854e209eb6b1690c901dede0.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:c71ac0e0d2714424964839d503a9f58741b159e7c01db5dc78083f037824a57f",
            "change_kind": "claim",
            "change_digest": "sha256:f7c5f54371fc08d3b88ffcd7b2de9a81eb50e20a61c394fb260b0c348aff832f"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 6,
            "item_key": "00000006.0a5eb46d00f44fd81654336d2d6117bf",
            "manifest_digest": "sha256:05b512d7a455d35e957db7d19c242b18a264a823f9a7e484791b41969bec4886",
            "egress_digest": "sha256:ee74cfe03024ae15e9028a749a5bdf91a8c446be4d74597f6410683b9f584692",
            "path": "claims/c7/CLM-c72168eed420b1b72725188c23a0b32a.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:925dc743c2cef542a447c832a65be9c8263de40d97f5a6a360b58258fd19b2b6",
            "change_kind": "claim",
            "change_digest": "sha256:6af339a001efed238c0408e2073682ea671d0950d4affbe59a01922b03a96e1d"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 7,
            "item_key": "00000007.a75c14c155fc1eef2619d963bb07bfb4",
            "manifest_digest": "sha256:ca92ac9b97380a423eba8506bc631f1de647137dca6d8a6dffe0ed608d0e5607",
            "egress_digest": "sha256:06485a78a0f33a7caf31e2773e62605df879d143e62e5bd7c64bf6c43dca6395",
            "path": "claims/09/CLM-0955dffd8ac7482b3b2dfb54ebaaf39d.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:1de1b610a1b55ed75b3f1ddd75418e38318d26cc65caccda37ba171ec1ba1781",
            "change_kind": "claim",
            "change_digest": "sha256:314d433e68544f758efce63063d66991b4272bbe254f9807a232b27823caa6a4"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 8,
            "item_key": "00000008.0aa255512bd3c0e27bcb21113cb07cbb",
            "manifest_digest": "sha256:011070e4ee5569c756d618ebbfbafe9171e0f9e27b9bee59b75f323587345763",
            "egress_digest": "sha256:a08d7352ff69f20df3e483e3cee3c83e832968a17a2ae74b0ce5e560ee073fc9",
            "path": "claims/32/CLM-32c458928f64935b2e56d78d29834a69.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:1842204bfef3a9fe3c46b892de1b3bd297c39362ce4cfc453c526118e75cb1a3",
            "change_kind": "claim",
            "change_digest": "sha256:a1593011dffcd4d86dab847f87b53265354ae4bc6677465a5b476aea1b085c8b"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 9,
            "item_key": "00000009.05ebb1e92ad143cfacde56938630401c",
            "manifest_digest": "sha256:02d7a4c5dfc73bbc0685e9e7c4590d8ee26a03bcf6d90898a4224aebcfa9a15b",
            "egress_digest": "sha256:8da7282c92db2b819e7429742452e91f2286f015aa6ea14fbcf84c35295e61ff",
            "path": "claims/76/CLM-76f60748854f8fe0e4b701d4d9555417.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:bf29afefed0ee48925f34e8c3c23f151ea85b2e0571b5543fc42bd5be2ed1c7f",
            "change_kind": "claim",
            "change_digest": "sha256:58781f9d72a8cf7f8062fc4bc9fb01f8a4e2581987fa2dbb535a8a301642280d"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 10,
            "item_key": "00000010.ac3f9db8ea9104736200d5a8ded08a02",
            "manifest_digest": "sha256:99a34f9a472299ac03b4b89b178cd16cff4e467403d5ed6d9b67b55691d7c69e",
            "egress_digest": "sha256:fcc944c08410383ecd319bf7b4e7f0a2772f2d14632f729694a386a378331dfa",
            "path": "claims/b9/CLM-b975b2a8663904b11048323f620948ea.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:912a14085cdb41a567fe202c80fff026f7c8e4ea31f15671ccbdad1e2e71db13",
            "change_kind": "claim",
            "change_digest": "sha256:848b20d27bc037c96dadebbdef9e09bcd6972a3ef34c6da33c1964a016cd36b0"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 11,
            "item_key": "00000011.d9ffc27bf4f9c326376965f9c90f0ff6",
            "manifest_digest": "sha256:a833eef87be18fda8ae2035973e83a3bd16173805b58ffa81a53b050ae8a3676",
            "egress_digest": "sha256:5ab89af1543dd6b1d38f0e020a66d24b119d07451e3304e8fc1c8615021bae10",
            "path": "claims/19/CLM-192c23be74b94747f2483672df1690f0.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:9b7b45b9177eb2023a4930732df600cdbac235b0e7b3a71c41bf38b88f04a33e",
            "change_kind": "claim",
            "change_digest": "sha256:eca7370188e4fa73797dcb5b31bca26c7a521dd3835eb602534cfd199141d185"
          }
        ],
        "journal_coordinate": {
          "tag": "playbill-procedure-journal-coordinate-v1",
          "stream_instance_id": "inst_console05",
          "journal_family": "procedure-exhaust-v1",
          "stream_id": "procedures",
          "partition_id": "line:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
          "sequence": 24,
          "record_digest": "sha256:135424dcfbcb6e7dc56b65ca38e24e0c893c6c0badcb3e0c20d498a2a4d70b22"
        },
        "settle_outcome": "settled",
        "accepted_git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
        "fallback_reason": null,
        "outside_scope": [],
        "capped_by": null,
        "prior_refusal_coverage": null
      }
    ],
    "findings": [],
    "findings_count": 0,
    "nodes": [
      {
        "node": "catalog",
        "kind": "call",
        "verdict": "succeeded",
        "sequence": 8,
        "summary": {
          "kind": "call",
          "captures": 1,
          "capture_digests": [
            "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
          ]
        }
      },
      {
        "node": "watched",
        "kind": "read",
        "verdict": "succeeded",
        "sequence": 9,
        "summary": {
          "kind": "read",
          "rows": 9
        }
      },
      {
        "node": "entries",
        "kind": "extract",
        "verdict": "succeeded",
        "sequence": 10,
        "summary": {
          "kind": "extract",
          "records": 20,
          "invalid_records": 0,
          "duplicates": 0,
          "invalid_fields": 0,
          "complete": true,
          "complete_when": {
            "count_at": "/count",
            "expected": 20,
            "observed": 20,
            "held": true
          }
        }
      },
      {
        "node": "write",
        "kind": "claims",
        "verdict": "succeeded",
        "sequence": 25,
        "summary": {
          "kind": "claims",
          "written": 4,
          "revised": 0,
          "inverse_written": 8,
          "subjects_created": 0,
          "re_observed": 0,
          "no_op": 0,
          "retired": 0,
          "surfaced": 0,
          "downgraded": 0,
          "delivery": "settled"
        }
      }
    ]
  }
});
