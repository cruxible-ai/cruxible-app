// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/procedure-runs/RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/procedure-runs/{run_id}",
  "pathParams": {
    "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5"
  },
  "response": {
    "investigation": null,
    "trigger_binding": null,
    "tag": "playbill-procedure-run-state-v2",
    "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.sbom-import"
    },
    "procedure_artifact_digest": "sha256:a10f9e25ee884f3f9f07e739b7c882ec702fc3779781ca51fe37cf5b1968f3b2",
    "bound_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "c61c0166bbc6eb492a543ef826661e31c69e1db7",
      "semantic_root": "sha256:aa14a353f38b25ccda31c64c475825e0d8ddb2e13e0bdcb7f8152ee2fa360a0f",
      "generation_root": "sha256:5d1ccc2e76354d143b1ff176e00c2f5d63890571ee484b3ce5c58f87eda636af",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "head_at_admission": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "c61c0166bbc6eb492a543ef826661e31c69e1db7",
      "semantic_root": "sha256:aa14a353f38b25ccda31c64c475825e0d8ddb2e13e0bdcb7f8152ee2fa360a0f",
      "generation_root": "sha256:5d1ccc2e76354d143b1ff176e00c2f5d63890571ee484b3ce5c58f87eda636af",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "lane": "current",
    "evaluation_time": "2026-11-07T18:00:00Z",
    "status": "succeeded",
    "pending_inputs": [],
    "outcomes": [
      {
        "capture_event": {
          "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
          "partition_id": "line:805e61032fd79657f0b9d0b1d01df3e795432dec987fd555a098c8f0ff458ec7",
          "sequence": 8,
          "record_digest": "sha256:28b4336e5c7173ca281bd0894de2169bc5908a158a6a6f0a87e7026e2883b823"
        },
        "sequence": 8,
        "event_kind": "produced_capture",
        "node_id": "sbom",
        "payload_digest": "sha256:9cccec1f7337ccfa90371e71ed7390cc624178235ef2f973ce835b82ba38ffae"
      },
      {
        "capture_event": null,
        "sequence": 9,
        "event_kind": "node_fired",
        "node_id": "sbom",
        "payload_digest": "sha256:93e5797af434396f397a5fafd074253aa72a8808c4b9a832211a5778e7a407bd"
      },
      {
        "capture_event": {
          "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
          "partition_id": "line:805e61032fd79657f0b9d0b1d01df3e795432dec987fd555a098c8f0ff458ec7",
          "sequence": 14,
          "record_digest": "sha256:90cdc268b34b788fec298b88baf65eb8589d0c0b237b699703af643beef11a06"
        },
        "sequence": 14,
        "event_kind": "produced_capture",
        "node_id": "derived",
        "payload_digest": "sha256:bc68279ef2709b769eff3a81a8889e907909878de5e4d7be891531041b68aebc"
      },
      {
        "capture_event": null,
        "sequence": 15,
        "event_kind": "node_fired",
        "node_id": "derived",
        "payload_digest": "sha256:ce2f0a1f515964ddcc2a78f63bd41da6ac8d043c2edb48587602f24b424eb20d"
      },
      {
        "capture_event": null,
        "sequence": 16,
        "event_kind": "node_fired",
        "node_id": "listed",
        "payload_digest": "sha256:7595980c6fe1d4e7b107f76fcbaa6f2e800e9bde11705dee3d4f314f2cbd1346"
      },
      {
        "capture_event": null,
        "sequence": 29,
        "event_kind": "node_fired",
        "node_id": "write",
        "payload_digest": "sha256:2dbc8a417d74ccd12ddd5285c1db8a81fab520a7930d1efb13197c6c9a494ab8"
      },
      {
        "capture_event": null,
        "sequence": 30,
        "event_kind": "attempt_finalized",
        "node_id": null,
        "payload_digest": "sha256:89c9ab2bf310c9a35f725bc9406c0fdc069ca21c05c26719860c6149f08db6c4"
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
    "semantic_replay_key_digest": "sha256:57e179421e0d2ef8d0b5743e15940d2d060e03d311c47b381df63e0cbda2c312",
    "semantic_result_digest": "sha256:867959fad7598467c8e79b6fd4b55d9f970c762d73fa2533832328e18d582958",
    "receipt": {
      "tag": "playbill-procedure-run-receipt-v8",
      "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
      "admission_binding_digest": "sha256:b8693cab82287bc25d57caccde043aba52c896094524383c492303c678ec14e4",
      "semantic_replay_key_digest": "sha256:57e179421e0d2ef8d0b5743e15940d2d060e03d311c47b381df63e0cbda2c312",
      "semantic_result_digest": "sha256:867959fad7598467c8e79b6fd4b55d9f970c762d73fa2533832328e18d582958",
      "bound_coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "c61c0166bbc6eb492a543ef826661e31c69e1db7",
        "semantic_root": "sha256:aa14a353f38b25ccda31c64c475825e0d8ddb2e13e0bdcb7f8152ee2fa360a0f",
        "generation_root": "sha256:5d1ccc2e76354d143b1ff176e00c2f5d63890571ee484b3ce5c58f87eda636af",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "head_at_admission": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "c61c0166bbc6eb492a543ef826661e31c69e1db7",
        "semantic_root": "sha256:aa14a353f38b25ccda31c64c475825e0d8ddb2e13e0bdcb7f8152ee2fa360a0f",
        "generation_root": "sha256:5d1ccc2e76354d143b1ff176e00c2f5d63890571ee484b3ce5c58f87eda636af",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "lane": "current",
      "evaluation_time": "2026-11-07T18:00:00Z",
      "validated_pins": [
        {
          "role": "capture-contract",
          "target": {
            "kind": "CaptureContract",
            "name": "security.cyclonedx-sbom"
          },
          "artifact_digest": "sha256:4c31c8294b5cf31d9ca0532c3f6a46bf67f20c13f78a4c1ad7370e7137556915"
        },
        {
          "role": "capture-contract",
          "target": {
            "kind": "CaptureContract",
            "name": "security.sbom-components"
          },
          "artifact_digest": "sha256:ecd1944bc2c13ded50645ccd6ea57abf31ed6614beebecc7c6fd47ccbab7789c"
        },
        {
          "role": "claim-type",
          "target": {
            "kind": "ClaimType",
            "name": "security.occurrence.scope"
          },
          "artifact_digest": "sha256:5bce85117e09dbe805f7fa6d0939acdb687d5799da92ccf067a20da11d7d2216"
        },
        {
          "role": "contract-in",
          "target": {
            "kind": "Contract",
            "name": "security.sbom-import.input/v1"
          },
          "artifact_digest": "sha256:a20f93116adbcfd7108143dd6fde3904613c17974411004f99a78bf642035d3a"
        },
        {
          "role": "contract-out",
          "target": {
            "kind": "Contract",
            "name": "security.sbom-import.output/v1"
          },
          "artifact_digest": "sha256:c44563f4f4c55787787b0189f2b62ce65e6692997f9137cbb09b105f2494e4a8"
        },
        {
          "role": "parameter-contract",
          "target": {
            "kind": "Contract",
            "name": "security.sbom-import.params/v1"
          },
          "artifact_digest": "sha256:15847ee44e36f885389e9855cab40f62773801d9cd90fed02323b39651aace13"
        },
        {
          "role": "provider",
          "target": {
            "kind": "Provider",
            "name": "cruxible-builtin"
          },
          "artifact_digest": "sha256:e78137f1a9a3078828a661580dc05b7a91764bff489b34512ef6298202be5bd0"
        },
        {
          "role": "provider",
          "target": {
            "kind": "Provider",
            "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
          },
          "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728"
        },
        {
          "role": "subject-kind",
          "target": {
            "kind": "SubjectKind",
            "name": "security.occurrence"
          },
          "artifact_digest": "sha256:5d248c80bf76e4455a93f3fc861a4fa867f9e249c87d72304c30bc7bd1ef4e60"
        }
      ],
      "admitted_inputs": [],
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
      "partition_id": "line:805e61032fd79657f0b9d0b1d01df3e795432dec987fd555a098c8f0ff458ec7",
      "first_sequence": 1,
      "last_sequence": 30,
      "record_digests": [
        "sha256:99abbc05dc40f41ee732a72012621b1f48e0abfb55862001972d9d72b934618f",
        "sha256:fd723e740db429ee64acf60b942d27ee6507098e40cd5ad1011be8b8371466dc",
        "sha256:659df0964bfda6c621881f700ee15df6ab2c26f55376b471dacd9d27cfb7b42c",
        "sha256:c6f0e477ac91909a3e647700859f3479b46405e1fea9cc4230b9addd7fc28c6c",
        "sha256:a31708a09a57cbf68aaf0069a85b4ba8a501a23754892970b38fb434352b9638",
        "sha256:3a610dec916209c0a7e7dfb40c8eaa824b0001a60e4103dee78fc9d0f5737506",
        "sha256:da7b9b098248373d4955d0d55111e66621a9f9f4c7144ca50ef56aab4b1728d5",
        "sha256:28b4336e5c7173ca281bd0894de2169bc5908a158a6a6f0a87e7026e2883b823",
        "sha256:8682f4c601550281625617719590c8bdc92513ff5e05a98e909954bf1ccb0e2b",
        "sha256:d2bf22fe2932004595c8e9f82928a2d6e166edf9cf5ae0e8897be7a424a7ccc3",
        "sha256:9cb32f02652b671c0f6aecba64726ac1a4f2a0356d622fb4384d6b828da8c547",
        "sha256:1f461fae0727fbaab843bba26acfaacfb089aa9c198695360f611ac3851d95fa",
        "sha256:619a73b99d433fcbda26d256199b9fb6d1006d53998434e8a0f5ae973e8c4370",
        "sha256:90cdc268b34b788fec298b88baf65eb8589d0c0b237b699703af643beef11a06",
        "sha256:4838c6049ac06090c0d6ddeb5c78e9a6edc661145a16a749ba7db070bf1bdd96",
        "sha256:318dd0627bfcba0b5361fd162792ceaeb899a2d361b10436168fb3230851cad5",
        "sha256:b33572de3a71e868f47f22991905e2343c4ae646e18a3d0a4a07b3dcc9ca34d0",
        "sha256:617cf4d435260752eb2fcc318abeb95282199654ef7913a1f5de6020efc0db3b",
        "sha256:7250ad1ab6064f776d148181cd51fa47f0f3c2a4b3529c3e059b545efab5ae27",
        "sha256:2b662eb8b26d2adfac078865869f11cc1dbc7c484b205fce3de3de63943f8db1",
        "sha256:b3e9717578dc4b8bc6ffec39cad9beae3226a0d9736cbc158fdb77ec44e982c9",
        "sha256:eccc2f496018abc348094897f9d0d3d2614b4e02ef5bfcb3f496debfe8700b58",
        "sha256:fe0cfee9b1741ac68cd755ba4c82baeeed9c5b8be4edf3f0eccbafb01b72b99c",
        "sha256:aa10148cba795dabf4b6940898b6c06262427369afc4f3e7bd2a1f568032a1db",
        "sha256:2d80b283be96cf8d88cd9c9fd5a0cebf284ead6d8b3e423831a343ae8de01de9",
        "sha256:41ddd088d23099dee34a0fdfb4a3d50d507de92bf7bf6e66d19b756199a82c31",
        "sha256:7df6e5826c762e1f2f8dfe72cbaa3f321537e224aced74ee6fefbc627660c15a",
        "sha256:1dd4fafd936a7b600ef26a7bcfc425e4b6ddbb70bdff7f04ed29de9b06f2ea98",
        "sha256:2d04298ab0a1c154b8199244cb100c265ca4144f1f7c0ee86851e9ad404c2199",
        "sha256:ebf0172057a273c895a602194a7785810e4573cf6c527011bf4e72076b9964e0"
      ],
      "chain_head_digest": "sha256:ebf0172057a273c895a602194a7785810e4573cf6c527011bf4e72076b9964e0",
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
              "microseconds": 120000000
            },
            "max_provider_calls": 2,
            "max_capture_bytes": 8388608,
            "max_items": 40000,
            "max_read_rows": 20000
          },
          "hard_caps": {
            "tag": "playbill-procedure-hard-caps-v1",
            "max_wall_clock": {
              "tag": "playbill-duration-v1",
              "microseconds": 120000000
            },
            "max_provider_calls": 2,
            "max_capture_bytes": 8388608,
            "max_items": 40000,
            "max_repeat_attempts": 1,
            "max_read_rows": 20000
          },
          "result_bytes_cap": 1048576,
          "provider_output_bytes_cap": 67108864
        },
        "observed": {
          "tag": "playbill-procedure-run-budget-observed-v1",
          "max_items": {
            "tag": "playbill-procedure-budget-boundary-observation-v1",
            "high_water": 45,
            "boundary": "operation-out:workspace.file",
            "field_path": "content.lines"
          },
          "result_bytes": {
            "tag": "playbill-procedure-budget-boundary-observation-v1",
            "high_water": 2,
            "boundary": "procedure-return",
            "field_path": "write"
          },
          "provider_calls": 2,
          "capture_bytes": 2161,
          "wall_clock_microseconds": 313304
        }
      },
      "invocation_origin": "line",
      "line_identity": {
        "kind": "Line",
        "name": "security.sbom-import.app"
      },
      "line_spec_digest": "sha256:b616bff7e90c5dab6cc528caf2a940620e2acb2b795feb919c56d426ad0956e9",
      "occurrence_id": "sha256:ac34a73a637d6d7fa3d081a03de2c7e609d7d7156528549454ca1f885a6f25f5",
      "occurrence_evaluation_time": "2026-11-07T18:00:00Z",
      "node_pin_sets": [
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "derived",
          "pins": [
            {
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.sbom-components"
              },
              "artifact_digest": "sha256:ecd1944bc2c13ded50645ccd6ea57abf31ed6614beebecc7c6fd47ccbab7789c"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "listed",
          "pins": []
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "sbom",
          "pins": [
            {
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.cyclonedx-sbom"
              },
              "artifact_digest": "sha256:4c31c8294b5cf31d9ca0532c3f6a46bf67f20c13f78a4c1ad7370e7137556915"
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
                "name": "security.occurrence.scope"
              },
              "artifact_digest": "sha256:5bce85117e09dbe805f7fa6d0939acdb687d5799da92ccf067a20da11d7d2216"
            },
            {
              "role": "subject-kind",
              "target": {
                "kind": "SubjectKind",
                "name": "security.occurrence"
              },
              "artifact_digest": "sha256:5d248c80bf76e4455a93f3fc861a4fa867f9e249c87d72304c30bc7bd1ef4e60"
            }
          ]
        }
      ],
      "pin_set_digest": "sha256:557e58b99d5f3f59d40374f47d645b3354c63353f31758aeef84f59b31853f6e",
      "replay_input_vector": [],
      "deployment_snapshot_digest": "sha256:a548b56aab6e9f7fdc0d44c0791619318f909ead1476651d51d71de41b2f64e4",
      "acquisition_policy_digest": "sha256:b23401b1fd32307a461cb2e9b4c1e9e2305f17c799b4a3c96588fd978364d3b8",
      "selection_receipt_digest": null,
      "selection_decision": {
        "tag": "playbill-procedure-selection-decision-v1",
        "policy_digest": "sha256:b23401b1fd32307a461cb2e9b4c1e9e2305f17c799b4a3c96588fd978364d3b8",
        "verdict": "selected",
        "decisions": [
          {
            "input_name": "derived.document",
            "disposition": "selected",
            "considered_capture_digests": [],
            "selected_capture_digests": [],
            "selected_cursors": [],
            "default_value": null,
            "reason_codes": []
          },
          {
            "input_name": "sbom.capture",
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
      "selection_decision_digest": "sha256:c00f7df528df732ace6da84f5c10680fbc00476d8b50b6667799b9c02b432716",
      "resolved_provider_bindings": [
        {
          "tag": "cruxible-procedure-provider-binding-v5",
          "node_id": "derived",
          "slot": "derive",
          "capability": {
            "name": "sbom.components",
            "version": 1
          },
          "operation": "sbom.components",
          "operation_signature_digest": "sha256:c36457ecb886370a37fd8956ed99aaa6e07ece3d1c2310333d82a035f5fa0117",
          "provider_artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
          "implementation_digest": "sha256:61678d99af35fa5c9f67f2df09f2fbf0bfd99b3accde15d8a536f8f6b7bbdae7",
          "effect_class": "pure",
          "secret_binding_identity_digests": []
        },
        {
          "tag": "cruxible-procedure-provider-binding-v5",
          "node_id": "sbom",
          "slot": "read",
          "capability": {
            "name": "workspace.file",
            "version": 1
          },
          "operation": "workspace.file",
          "operation_signature_digest": "sha256:949991e75506cdc59a6f1bae70a369fd555dcccc448b5ee951914d0a2b1e48f2",
          "provider_artifact_digest": "sha256:e78137f1a9a3078828a661580dc05b7a91764bff489b34512ef6298202be5bd0",
          "implementation_digest": "sha256:0e8608f13ed88c76d9706250787e8a447d75756e6a10c02199d578bdcda29994",
          "effect_class": "pure",
          "secret_binding_identity_digests": []
        }
      ],
      "sensitivity_policy_digest": "sha256:1af89f7a9b451fc151ab690001505520eeeafe3b349f35239cdc06d302c939a9",
      "mandate_coordinate_digest": "sha256:eb98609d52b7acc336cfc94eefbb7f52924e851a376c7930be74b65a60356195",
      "taint_labels": [],
      "epsilon_member": false,
      "admission_material_manifest": {
        "tag": "playbill-procedure-admission-material-v1",
        "members": []
      },
      "admission_material_manifest_digest": "sha256:66bfabe7130485c3b736f34f5f2e8d357848a8c9c8f1996b8a8ef6cd01ff2937",
      "acquisition_plan_digest": "sha256:3a122b03f810f3ea6aae8a6b80aa0e60d874d274001c126fbbb5d6c3935c104e",
      "exhaust_access_binding_digest": null,
      "invocation_receipt_digests": [
        "sha256:1879f6876ce00e12d308242346381560c0c2556a56d1e3c48e187f1ba31909b9",
        "sha256:e19c6e77edc34cd9c883f72b40be41f0e5ad0651313f627de80407c93e31ea08"
      ],
      "source_capture_associations": [
        {
          "tag": "playbill-procedure-source-capture-association-v1",
          "occurrence_path": "source/derived",
          "field": "document",
          "invocation_receipt_digest": "sha256:e19c6e77edc34cd9c883f72b40be41f0e5ad0651313f627de80407c93e31ea08",
          "capture_digest": "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87"
        },
        {
          "tag": "playbill-procedure-source-capture-association-v1",
          "occurrence_path": "source/sbom",
          "field": "capture",
          "invocation_receipt_digest": "sha256:1879f6876ce00e12d308242346381560c0c2556a56d1e3c48e187f1ba31909b9",
          "capture_digest": "sha256:8b43761cea52b3eceec019a5ef25b6248f63f9831f8a9698a684c02489d74df2"
        }
      ]
    },
    "receipt_digest": "sha256:98453211d1dca871fd272ea8842d38dbde2bc33900eb6ee73d9df8769265286d",
    "terminal": null,
    "children": [],
    "source_observations": [
      {
        "tag": "playbill-procedure-source-observation-v1",
        "occurrence_path": "source/derived",
        "node_id": "derived",
        "input_name": "derived.document",
        "field": "document",
        "source_read_receipt": null,
        "source_read_receipt_digest": null,
        "invocation_receipt_digest": "sha256:e19c6e77edc34cd9c883f72b40be41f0e5ad0651313f627de80407c93e31ea08",
        "capture_digest": "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87"
      },
      {
        "tag": "playbill-procedure-source-observation-v1",
        "occurrence_path": "source/sbom",
        "node_id": "sbom",
        "input_name": "sbom.capture",
        "field": "capture",
        "source_read_receipt": {
          "tag": "playbill-source-read-receipt-v1",
          "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
          "admission_binding_digest": "sha256:b8693cab82287bc25d57caccde043aba52c896094524383c492303c678ec14e4",
          "occurrence_path": "source/sbom",
          "logical_source": "cyclonedx.sbom.app",
          "workspace_binding_digest": "sha256:9b459e140f70aca961cd40fac6db2dc191a1c590978ae6b0d61f4a3e5ef8404d",
          "relative_path": "sbom.cdx.json",
          "requested_path": "sbom.cdx.json",
          "bytes_digest": "sha256:c3b27bcff76ed582f4d2da67cf13fbe462fac3f823b2e28a9cef2ec04a730fed",
          "byte_length": 1472,
          "policy_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "c61c0166bbc6eb492a543ef826661e31c69e1db7",
            "semantic_root": "sha256:aa14a353f38b25ccda31c64c475825e0d8ddb2e13e0bdcb7f8152ee2fa360a0f",
            "generation_root": "sha256:5d1ccc2e76354d143b1ff176e00c2f5d63890571ee484b3ce5c58f87eda636af",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "resolved_max_bytes": 1048576,
          "derived_request_digest": "sha256:1db7b96b1778b41e1cbe6eef770be681ab03fa56b51d73a52179e93af57080c2",
          "provider_input_digest": "sha256:47b191145ab4ee5b604f4cce72611c2b28f91cae38d55dc87b31b373753e51cc",
          "read_at": "2026-11-07T18:00:00Z"
        },
        "source_read_receipt_digest": "sha256:d76f02d86df255988bef8cbaf0f6065daca176da126e5b4c42973063f261c353",
        "invocation_receipt_digest": "sha256:1879f6876ce00e12d308242346381560c0c2556a56d1e3c48e187f1ba31909b9",
        "capture_digest": "sha256:8b43761cea52b3eceec019a5ef25b6248f63f9831f8a9698a684c02489d74df2"
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
        "operation_key": "sha256:99e95ebefa3e22911e70df3aae13452b7e451d85f9637f3cd3c7a2389f1d770d",
        "procedure_mandate_digest": "sha256:8f38698dfd19c87438f7c15a34829d74905efc7aee4112504423f169f4581975",
        "target_paths": [
          "claims/08/CLM-082b9629ce4f8617014132248bf464c2.json",
          "claims/08/CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf.json",
          "claims/0e/CLM-0edce0aae1b86e5820bf4796a93904fd.json",
          "claims/16/CLM-166eec02c1a8488e6d50e1887a93c8a2.json",
          "claims/19/CLM-192c7c7acdf45706da7f6166755eb680.json",
          "claims/26/CLM-26a8f13c7043a67741f93284b0207957.json",
          "claims/2b/CLM-2bbe4f9217105bdd4ebd3beb25fe3e29.json",
          "claims/4f/CLM-4fced8fc4b88a529fe10693cf071bcf8.json",
          "claims/8a/CLM-8a2aa0b007172937744ad435748008d3.json",
          "claims/8c/CLM-8cb485b714e115292d9f48f2dbc178f9.json",
          "claims/e0/CLM-e01bb45e424baa71f145284d2e53288b.json",
          "claims/ef/CLM-ef31d541ed4121c834f9a78861197043.json",
          "claims/f3/CLM-f37229fc9fc2cda5714cd728b89a6e57.json",
          "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
          "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
          "subjects/security.component/pkg-maven-org.slf4j-slf4j-api-1.7.32.json",
          "subjects/security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0.json",
          "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
          "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
          "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32.json"
        ],
        "proposal_id": "sha256:dbb590e201d200fa506dca388612e00be4dc681a7bdab4ca4e1e64cdc7a031ed",
        "candidate_digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20",
        "refusal_code": null,
        "children": [
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 0,
            "item_key": "00000000.ece6f55816259af495cf893419871e2a",
            "manifest_digest": "sha256:d08439063a78f8fb5492d99555672d8a8e7eae82e704a44263e3d08d722f4e18",
            "egress_digest": "sha256:5d117090f46bdc22f034cf4e198f370d8037e14e1f5e26fc187ef2169f27a579",
            "path": "subjects/security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:88fa32765024d2e926b08518a9e47eff8f444e4d3fc83581f4f132f13be53492",
            "change_kind": "subject",
            "change_digest": "sha256:f59cbcc1afd2b38c83facd2b7c54da4bdb1d92de4d5f66afbde5a391fb60b001"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 1,
            "item_key": "00000001.0f0e975df73d2d5ee8cfab19d1920ab3",
            "manifest_digest": "sha256:5c70a64e8e89aad4eda511bfe01c1a349ffa507174e92571f2472c8a87539639",
            "egress_digest": "sha256:732f405a482d244dd3a2684ad1a8fba2b36fd4121138e4997248f3df201739cf",
            "path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:e22f2f485f7b291aaedb507652028fda211997d028756fb68fd9cff1b887b41b",
            "change_kind": "subject",
            "change_digest": "sha256:6ae16e477dec32df8726372e40b9ec7bc1f99ba42fdf5080da0c0ef66dbab404"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 2,
            "item_key": "00000002.a450aa70c05fae4e2e15014981c42478",
            "manifest_digest": "sha256:1b750c524715529c8e7b77bc5723e71cf3a38a1034f65167d8d4dc463ff15b51",
            "egress_digest": "sha256:e1a055da3eeff34ad675a5e655689cefcf59a03795ea9bca688df65f17928b9c",
            "path": "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:b2bbbe0d273a26f56a376b4c8d35e44b4dfe30c54597587e4377196ec1ca37eb",
            "change_kind": "subject",
            "change_digest": "sha256:d1a2e9413107fe39980e7d0451f9cca9c3de0eff2cace843df75e3fae189ff41"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 3,
            "item_key": "00000003.b0c2f159dc724862634410067fcd4397",
            "manifest_digest": "sha256:a1682de1643bb25bf0e6122555304a4695368739efc103ba9d02036188f14be5",
            "egress_digest": "sha256:f52f5f7125368159e691536247470248944108f728fadcc48cdd5224b32385ad",
            "path": "claims/08/CLM-082b9629ce4f8617014132248bf464c2.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:70e3fc6e64efebfb3bc1e0cb205d05c3902795790f34658631e0e255b0453241",
            "change_kind": "claim",
            "change_digest": "sha256:f4fc103600d207e303c89f04876de4b428f2e6fa92e1362c8c8e971f63d3ff16"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 4,
            "item_key": "00000004.450a15ef22f51bf7e0765008fb8d49e7",
            "manifest_digest": "sha256:cf5cc8b943c9dcb3181b994aba7e0566cde7b6f6c51dadc8ec619c4e66b01fb6",
            "egress_digest": "sha256:5e8c276b983d4fcaf3a4ff9ef4f67132cd831142b1bee9bd4814bb8d170b0b80",
            "path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:631860455ce1ef9bc54e54d7881b276eb494668d89557b4a22ea1a4b407e02fb",
            "change_kind": "subject",
            "change_digest": "sha256:fb26a59c8d666004466808fc83ce3559da441b8ce50457cfac07dcd42afb6228"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 5,
            "item_key": "00000005.f774a89b58705bcbffff58c51440b5aa",
            "manifest_digest": "sha256:b4f7d1c6dc35ed18f85de25d2618e211cbb41d9cb7e6e7e57606b954888e342c",
            "egress_digest": "sha256:fe98dcc23d8d8fb3271d822d6b35cb7f980953a380b52ff557e2fed361c775e8",
            "path": "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:6a957ed59411adafed87b278b0a4587315c4af7bead70be01f5892352a752fc7",
            "change_kind": "subject",
            "change_digest": "sha256:8c927cd0f475e1596e972c58169747d5b646c89311e41301a5a6fa59c786d47d"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 6,
            "item_key": "00000006.72f60ff6e5995484f1d2404667570a29",
            "manifest_digest": "sha256:c25ecadbc67f4547bfeeb308d086fdbcb6200093f86d24b86b9e7d8d240190b5",
            "egress_digest": "sha256:7eebcdda0031f6875a8ceec89838e5c7e490fd2075a4ca2cb9c6b3c981525ea1",
            "path": "claims/19/CLM-192c7c7acdf45706da7f6166755eb680.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:f9a6077318dcce36cd2ff96a34b95c8626458b917c465392e9c45f06bde35103",
            "change_kind": "claim",
            "change_digest": "sha256:7d14085c7458a69cc8b3fba552e5945b8cc993ee4fe63e52aa98c7ed8966f5d6"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 7,
            "item_key": "00000007.7eb954f8554f6b967e22d9bcfbd48199",
            "manifest_digest": "sha256:661a96b0d4cc51ac362ecfebd2285e5b1aea38f4f32751eea5e5df9975fac076",
            "egress_digest": "sha256:96ffc09be520654e89578215fc91ee797147768ef408b8b1088c5ca1867db81c",
            "path": "subjects/security.component/pkg-maven-org.slf4j-slf4j-api-1.7.32.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:71a2b2e7a63d4f50ea6a58ad90d313b27b8e98baea7aead3485c0e0819051889",
            "change_kind": "subject",
            "change_digest": "sha256:d5d387e54d4276e0088a26d47b6ad2f081c82e7aeebf42d6c43f362f1fb16e86"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 8,
            "item_key": "00000008.8120c0eaf570b03e81cb1f19fefb0a30",
            "manifest_digest": "sha256:d1c3d694cd181b0bc2a350af0793972b4dd8803ac14b3b7f44af4d09befb1025",
            "egress_digest": "sha256:31eb623feef0fb7ec12be44260c447fd247cd66022a52ca7f0f66fcb157fa54c",
            "path": "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.slf4j-slf4j-api-1.7.32.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:d97a170b5ba22896a4a48732f5a8ebd91e7b85fe35ea6d086a375f9eb45c4a78",
            "change_kind": "subject",
            "change_digest": "sha256:f8406e23dfbdb4d46d3d7627bedf4eb81e4e6afe8575651e9514821d8e326710"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 9,
            "item_key": "00000009.e9affe1d2c4cae16f073eb7461b6cb4f",
            "manifest_digest": "sha256:1755bf1301e1a4bc44f5c20e46f7d607b2885ee62a3a3becc2a4fce269cd26e8",
            "egress_digest": "sha256:92bde5530262e21387c2c5eee91066bbcd865108a24b920aa47be37233fc7506",
            "path": "claims/8c/CLM-8cb485b714e115292d9f48f2dbc178f9.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:85623e96c9f8b249b5aadfc3057cc61fe2a755d262e6cc936a181a330af64d32",
            "change_kind": "claim",
            "change_digest": "sha256:849f6aedb15e87f1a2dabbb1cdf46c279c2d7a9ab6d05e5888b15b7d156340c2"
          }
        ],
        "journal_coordinate": {
          "tag": "playbill-procedure-journal-coordinate-v1",
          "stream_instance_id": "inst_console05",
          "journal_family": "procedure-exhaust-v1",
          "stream_id": "procedures",
          "partition_id": "line:805e61032fd79657f0b9d0b1d01df3e795432dec987fd555a098c8f0ff458ec7",
          "sequence": 28,
          "record_digest": "sha256:1dd4fafd936a7b600ef26a7bcfc425e4b6ddbb70bdff7f04ed29de9b06f2ea98"
        },
        "settle_outcome": "settled",
        "accepted_git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
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
        "node": "sbom",
        "kind": "call",
        "verdict": "succeeded",
        "sequence": 9,
        "summary": {
          "kind": "call",
          "captures": 1,
          "capture_digests": [
            "sha256:8b43761cea52b3eceec019a5ef25b6248f63f9831f8a9698a684c02489d74df2"
          ]
        }
      },
      {
        "node": "derived",
        "kind": "call",
        "verdict": "succeeded",
        "sequence": 15,
        "summary": {
          "kind": "call",
          "captures": 1,
          "capture_digests": [
            "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87"
          ]
        }
      },
      {
        "node": "listed",
        "kind": "extract",
        "verdict": "succeeded",
        "sequence": 16,
        "summary": {
          "kind": "extract",
          "records": 3,
          "invalid_records": 0,
          "duplicates": 0,
          "invalid_fields": 0,
          "complete": true,
          "complete_when": {
            "count_at": "/count",
            "expected": 3,
            "observed": 3,
            "held": true
          }
        }
      },
      {
        "node": "write",
        "kind": "claims",
        "verdict": "succeeded",
        "sequence": 29,
        "summary": {
          "kind": "claims",
          "written": 3,
          "revised": 0,
          "inverse_written": 0,
          "subjects_created": 7,
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
