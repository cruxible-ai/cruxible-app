// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/procedure-runs/RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/procedure-runs/{run_id}",
  "pathParams": {
    "run_id": "RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305"
  },
  "response": {
    "investigation": null,
    "trigger_binding": null,
    "tag": "playbill-procedure-run-state-v2",
    "run_id": "RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.epss-triage"
    },
    "procedure_artifact_digest": "sha256:006d069a6e3943dd18b2d2f4cb3b69ce1a100b1141c1e089ebd533fd0098a722",
    "bound_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "head_at_admission": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "lane": "current",
    "evaluation_time": "2026-11-03T00:58:59.674323Z",
    "status": "succeeded",
    "pending_inputs": [],
    "outcomes": [
      {
        "capture_event": {
          "run_id": "RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305",
          "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
          "sequence": 52,
          "record_digest": "sha256:2d2811f20d77d7a532a571549940561f6b5fca20907cb8aad32c99b50ac8f4ea"
        },
        "sequence": 52,
        "event_kind": "produced_capture",
        "node_id": "scores_api",
        "payload_digest": "sha256:79f40e54fb4721974c23d08d83bfe8058adb0c03e5d4b3bfdf0534f4ea97f7d7"
      },
      {
        "capture_event": null,
        "sequence": 53,
        "event_kind": "node_fired",
        "node_id": "scores_api",
        "payload_digest": "sha256:3ca56f4fe73ad81e09cb6a773d11bd5c648910a89edb56154cdb25275c3a7824"
      },
      {
        "capture_event": null,
        "sequence": 54,
        "event_kind": "node_fired",
        "node_id": "watched",
        "payload_digest": "sha256:e7c0faba6079a89ff417d0b4ae9a513cb221cd64652197a41681a0482346a707"
      },
      {
        "capture_event": null,
        "sequence": 55,
        "event_kind": "node_fired",
        "node_id": "watch_keys",
        "payload_digest": "sha256:fc036dc431e5c70f7751e51e578ed2279572edb11ce577c24079d137381c0aa5"
      },
      {
        "capture_event": null,
        "sequence": 56,
        "event_kind": "node_fired",
        "node_id": "scores",
        "payload_digest": "sha256:b79740e247b2a502f3fdb3f94859336034e40c864d702a4eb266d675e9bd95f2"
      },
      {
        "capture_event": null,
        "sequence": 89,
        "event_kind": "node_fired",
        "node_id": "write",
        "payload_digest": "sha256:eaac153652207a01aa07a49937d20b7927bd64ebc8f682cddb872fdbd6f350bc"
      },
      {
        "capture_event": null,
        "sequence": 90,
        "event_kind": "attempt_finalized",
        "node_id": null,
        "payload_digest": "sha256:e11b0c0aecd6d9f4079a80b482649ed6ca1d08f43660daa279d9b39921de0181"
      }
    ],
    "next_operation": {
      "kind": "done"
    },
    "result": {},
    "attribution": {
      "tag": "playbill-procedure-run-attribution-v1",
      "actor_type": "service_account",
      "actor_id": "pilot-owner",
      "org_id": "local",
      "operation_id": "op_450570b642be4c94",
      "request_id": null,
      "recorded_time": "2026-11-03T00:58:59.674323Z"
    },
    "semantic_replay_key_digest": "sha256:e14d6ea9593e7b2157cbac04c7b591e47131b5bef81383f7668cd63df5b2afd7",
    "semantic_result_digest": "sha256:6a9e6ee5cf0843b63ab17c20b628fd792f7873af7285e94c2fb99fdf01e0c24a",
    "receipt": {
      "tag": "playbill-procedure-run-receipt-v8",
      "run_id": "RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305",
      "admission_binding_digest": "sha256:ae03f0e6824312769276cc71a8dc8e58d3efa2c115d2142a811fccff19fb5546",
      "semantic_replay_key_digest": "sha256:e14d6ea9593e7b2157cbac04c7b591e47131b5bef81383f7668cd63df5b2afd7",
      "semantic_result_digest": "sha256:6a9e6ee5cf0843b63ab17c20b628fd792f7873af7285e94c2fb99fdf01e0c24a",
      "bound_coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
        "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
        "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
        "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
      },
      "head_at_admission": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
        "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
        "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
        "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
      },
      "lane": "current",
      "evaluation_time": "2026-11-03T00:58:59.674323Z",
      "validated_pins": [
        {
          "role": "capture-contract",
          "target": {
            "kind": "CaptureContract",
            "name": "security.epss-scores"
          },
          "artifact_digest": "sha256:e8ba787a61c986ca4c53fda09578c61a18110138958218b65e65e350bdd0f070"
        },
        {
          "role": "claim-type",
          "target": {
            "kind": "ClaimType",
            "name": "security.vulnerability.epss_percentile"
          },
          "artifact_digest": "sha256:c7c91826673d95a34ddefa68641bd4d1b78fcd55368edb167cca165c6ac558e3"
        },
        {
          "role": "claim-type",
          "target": {
            "kind": "ClaimType",
            "name": "security.vulnerability.epss_score"
          },
          "artifact_digest": "sha256:8d575546bf95dce83fe71f971c38885e77f2d3630e8798f694fd67dba8b15870"
        },
        {
          "role": "claim-type",
          "target": {
            "kind": "ClaimType",
            "name": "security.vulnerability.epss_score_date"
          },
          "artifact_digest": "sha256:fc4ca2f108d1756392349d7ac3da42e40628eb37fc383163e1790969fa4e844c"
        },
        {
          "role": "contract-in",
          "target": {
            "kind": "Contract",
            "name": "security.epss-triage.input/v1"
          },
          "artifact_digest": "sha256:29ca89ecfb05f4806d23940661f6e0758f2fc0262f28b4a1fadf057157ab3384"
        },
        {
          "role": "contract-out",
          "target": {
            "kind": "Contract",
            "name": "security.epss-triage.output/v1"
          },
          "artifact_digest": "sha256:2926acf7963e22972153d7b6d140cb80ad45b91e35ea1f57192dd4b0a76881e7"
        },
        {
          "role": "parameter-contract",
          "target": {
            "kind": "Contract",
            "name": "security.epss-triage.params/v1"
          },
          "artifact_digest": "sha256:1f70a5018e707cdb0332bc8315317e64c25eb18a90a4fd4b06264cc775551b80"
        },
        {
          "role": "provider",
          "target": {
            "kind": "Provider",
            "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
          },
          "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f"
        },
        {
          "role": "query",
          "target": {
            "kind": "QueryDefinition",
            "name": "security.watched_vulnerabilities"
          },
          "artifact_digest": "sha256:d9b4b892da243a83f9c61a88ac40e9cf6178d7c0d51bbf664f40b53933e48419"
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
            "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
            "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
            "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
            "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
          },
          "query_definition_digest": "sha256:d9b4b892da243a83f9c61a88ac40e9cf6178d7c0d51bbf664f40b53933e48419",
          "parameters_digest": "sha256:6ea45fd7162a1c5d28f1a29ca2f875d5914c2c0eae34da4d64b80c30171a1ad0",
          "result_digest": "sha256:a84153e81027e8ebd0779525fa4d6af67e6ed2dbded512bb4f7c65ce468616e9",
          "effective_query_budgets": {
            "tag": "playbill-query-budgets-v1",
            "max_results": 50000,
            "max_traversal_depth": 1,
            "max_paths": 50000,
            "max_paths_per_result": 50000
          },
          "material_body_digest": "sha256:a9118f1e05b362adcff28398466189dc8405c15a1ce52894b6cb2c53476b0b71"
        }
      ],
      "attribution": {
        "tag": "playbill-procedure-run-attribution-v1",
        "actor_type": "service_account",
        "actor_id": "pilot-owner",
        "org_id": "local",
        "operation_id": "op_450570b642be4c94",
        "request_id": null,
        "recorded_time": "2026-11-03T00:58:59.674323Z"
      },
      "stream_instance_id": "inst_d8e6dcb48e6a4d0d",
      "journal_family": "procedure-exhaust-v1",
      "stream_id": "procedures",
      "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
      "first_sequence": 46,
      "last_sequence": 90,
      "record_digests": [
        "sha256:e228e12da05b73f84dd939fe30df9e3d35ef08ff6970aece288b8a8a3c8eaad0",
        "sha256:405592b4132a5f01d631671452b819940ef97c0ede87c99fe48bdd1144790186",
        "sha256:93086db02a3eb09d4d5314eeebe41ae51b8973334264a479616781c3efaac0b2",
        "sha256:e38e9f07a5687e9321b5f9c72868ce1714ff1b073e599ce92e58a095a08190c3",
        "sha256:f9687d6c59019c070ae8da8c113f9c26325cfcc52c5a540c4820bc1d2a0002f4",
        "sha256:7f2adc88e22b254ba15878bf5aba7da15f97292a90a1f58bcadd291bf5b9a849",
        "sha256:2d2811f20d77d7a532a571549940561f6b5fca20907cb8aad32c99b50ac8f4ea",
        "sha256:517fe3c03054bc45012635d2b04651d189ce75805961e6e4a1cd06b5b22da385",
        "sha256:ad017936c86a80cbebe674337a1e96ab9b619bd67422228f01188578eeec27ff",
        "sha256:b2b9c275bbecf1183ccec03e5194fb09eac40569a4726d6fd5bf2e6af5f8d787",
        "sha256:e94b1152d637608dcbe2d0e89e25e48df416b8943dfcac8c1e60d449bba6feae",
        "sha256:fd30aebe10b400e705f76f971666d2f7cd77c7c69b0c68b1c5937e83019190b6",
        "sha256:abc74042dab8c238e97244ee73d27b8c466e712df5cfd2b75c678599e32bfd42",
        "sha256:3a364443537ac27025d39667c78bf167209c4049effaf62ce053070850ad8f59",
        "sha256:cd125a5fb6f61547f9126e7614d7d1c471b1536eafef54b0f2b488c099a50849",
        "sha256:d53a9b9538faf8f7089e48b6314aea10057f81d16270eb04ba11909c49c7b7dc",
        "sha256:a628f451b19ac6c2dda5c76cb0e178a5ef40e47924bcbcb9ec56e6e0abb6b329",
        "sha256:386c581fb06ef8555bc53d048901499191dad2b9d135a7a6e724ad4e53f33172",
        "sha256:9af15e7229e8af0da9dc6eeeb05ef3f4b40a0832f540797b49382cb810a63f60",
        "sha256:ed141081dc547876ba29b3f379b43d337887fc4fddc24b0f0e9b1540f8e4a05c",
        "sha256:295eac268a5a05e4d037966f33bd4011abe83a79668a235de83c11df6decc756",
        "sha256:dc88025d314489af6bc62aaeb0c6c72d1516f4686d874b26e160b5e15482b7b3",
        "sha256:be70b99b8be91dc3de4652a58ccf36687db91f8d24f70b875223820c1972ebe1",
        "sha256:76095ed1a6a33fa551b5622153c3bc554d702bd05101799c36c245653bed2527",
        "sha256:370c492ff42a66f97fb43f0a6981c8076f909c4ab27b88cda9b7c7e32a0bb354",
        "sha256:d3ac4a3a1177cbb744178e1e53d28206d3e36f914513a41928483f2404011ecf",
        "sha256:4d9bf16130d3791f04218f883458ff8006e90484dd7f4975261577e3e0a2cf02",
        "sha256:c46a39ff65d9014385438b99568bae75b28e35aa3c59f35c0b7e678cff0aee3e",
        "sha256:5e8acbe97d43409c8dbf16b348d7246e071914cba962d7286369fd56cabcb411",
        "sha256:c05577aa36c6fcb89d3281937b90ce9d214aba1d8f8ad489e9878a58cbd306f4",
        "sha256:42ee956c94dc1a6b2ca7f8d5dae3b2bb0abe555e45f39080b184dce1c389c167",
        "sha256:2b8b4d370f92623c922fd34cb44e269c0cce5c9a24d33910c22d22ad118f5057",
        "sha256:d32ceef3958387bbef6a1b49b143b36ed25ae91a4a222558d714ad94271f64d8",
        "sha256:4cc20abc2dddfa5ec52aaf112310485c8d48f60b77bb9ea83a953f1e82b9792d",
        "sha256:8f07db9ded6fb952bfc769c789ed16e909cd0b7e90b9869748542ead4c303d67",
        "sha256:83202b600cc55fb45333397f9ee6abdbce7e9bf0dbb050ce49bd4a24acf4ff5d",
        "sha256:b53a18befd9a2a75d4b266a96be407cb2c56c0a91a3130d314fbf52fc1de0987",
        "sha256:f9cadd02d02a1aab26e4c45e3d41c7a8df12740a1b1e4a7f68ab1fb1847f14fd",
        "sha256:d992f73aa4e39ebaa650abd79ad7218125b0204ff35673b09982ea99420d50d6",
        "sha256:aabc61ef6b78729531b631dddd8c02e6979fd00a2038abaf387f3684ccb98fe8",
        "sha256:b999beeaecda6d99760fe7383c130202416f35e9fa6585213186095319873121",
        "sha256:cbac86bc449704e8c56dbe49909dbedab638eb35d6c4e2df0aed4bb3c187e557",
        "sha256:94bedcfef91d4dc364d308da084e65cb44a984bf1542d2d0e003713926b0b453",
        "sha256:f78ed7a7e76add6f299a4bc671a4bbc95b22a367d72d6c7d3faff538df229903",
        "sha256:ee1de972c8e6bb767b0f38272c68f8d2aa081192d020e801c0a08d15623d9238"
      ],
      "chain_head_digest": "sha256:ee1de972c8e6bb767b0f38272c68f8d2aa081192d020e801c0a08d15623d9238",
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
            "high_water": 30,
            "boundary": "terminal:write",
            "field_path": "claims"
          },
          "result_bytes": {
            "tag": "playbill-procedure-budget-boundary-observation-v1",
            "high_water": 2,
            "boundary": "procedure-return",
            "field_path": "write"
          },
          "provider_calls": 1,
          "capture_bytes": 1036,
          "wall_clock_microseconds": 780765,
          "read_rows": 10
        }
      },
      "invocation_origin": "line",
      "line_identity": {
        "kind": "Line",
        "name": "security.epss-triage"
      },
      "line_spec_digest": "sha256:f2359364007565e74ba5fee2b404eefa98fd8a321b0412f523fc0663840ab415",
      "occurrence_id": "sha256:4f09053d842ebfb1edc9c966d91eda6b89ee5f4a3867255fd79e4ce5571ba671",
      "occurrence_evaluation_time": "2026-11-03T00:58:59.674323Z",
      "node_pin_sets": [
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "scores",
          "pins": []
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "scores_api",
          "pins": [
            {
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.epss-scores"
              },
              "artifact_digest": "sha256:e8ba787a61c986ca4c53fda09578c61a18110138958218b65e65e350bdd0f070"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "watch_keys",
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
              "artifact_digest": "sha256:d9b4b892da243a83f9c61a88ac40e9cf6178d7c0d51bbf664f40b53933e48419"
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
                "name": "security.vulnerability.epss_percentile"
              },
              "artifact_digest": "sha256:c7c91826673d95a34ddefa68641bd4d1b78fcd55368edb167cca165c6ac558e3"
            },
            {
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.vulnerability.epss_score"
              },
              "artifact_digest": "sha256:8d575546bf95dce83fe71f971c38885e77f2d3630e8798f694fd67dba8b15870"
            },
            {
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.vulnerability.epss_score_date"
              },
              "artifact_digest": "sha256:fc4ca2f108d1756392349d7ac3da42e40628eb37fc383163e1790969fa4e844c"
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
      "pin_set_digest": "sha256:ffea10d14ca0a3e3b9348e4659dd37c87ed7d007a78564f8206bef13e312255c",
      "replay_input_vector": [
        {
          "tag": "playbill-procedure-replay-input-projection-v1",
          "input_name": "watched",
          "plane": "accepted_state",
          "kind": "query_result",
          "value_or_body_digest": "sha256:a84153e81027e8ebd0779525fa4d6af67e6ed2dbded512bb4f7c65ce468616e9",
          "provenance_digest": "sha256:9b80227513aed4017f6d47531fe7e1b24ebec0ae7828b0e36f1c8c29f282c917"
        }
      ],
      "deployment_snapshot_digest": "sha256:53d35f1ee1dcc786b2e23da3e3d4948b59862de4afa82b798f4c6a228d1b93f2",
      "acquisition_policy_digest": "sha256:1909658c3160fc6df5ca562234e7eba6fbdfc6ddd48ebcb758df24c9f26c36c8",
      "selection_receipt_digest": null,
      "selection_decision": {
        "tag": "playbill-procedure-selection-decision-v1",
        "policy_digest": "sha256:1909658c3160fc6df5ca562234e7eba6fbdfc6ddd48ebcb758df24c9f26c36c8",
        "verdict": "selected",
        "decisions": [
          {
            "input_name": "scores_api.capture",
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
      "selection_decision_digest": "sha256:d653587f4e524d3ded85dfd20629426166695b4f98465f6d16a358165bfb60d4",
      "resolved_provider_bindings": [
        {
          "tag": "cruxible-procedure-provider-binding-v4",
          "node_id": "scores_api",
          "slot": "fetch",
          "operation": "web.fetch",
          "operation_signature_digest": "sha256:5949f5dfdc3cb815a1730821a183083734de785048789a7afa34e2cb7832f015",
          "provider_artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
          "implementation_digest": "sha256:7a26856d4f10560781aeeb5303965d67f4c987becc2eb8f340db7d348ac1e64b",
          "effect_class": "external_read",
          "secret_binding_identity_digests": []
        }
      ],
      "sensitivity_policy_digest": "sha256:b8b8aa7e755f90a933c1ef02df7c8865a0cfc94dc0a3a9fbbcde3207a40379b7",
      "mandate_coordinate_digest": "sha256:fb52bc20ffd7777519503131e8b569de4bb4e543abc4dfd36dbcaeab7e8d31e8",
      "taint_labels": [],
      "epsilon_member": false,
      "admission_material_manifest": {
        "tag": "playbill-procedure-admission-material-v1",
        "members": []
      },
      "admission_material_manifest_digest": "sha256:66bfabe7130485c3b736f34f5f2e8d357848a8c9c8f1996b8a8ef6cd01ff2937",
      "acquisition_plan_digest": "sha256:0305a37186fed99123474c147cdcdfc8566ab025c2e9eacd1d836f8747d6e213",
      "exhaust_access_binding_digest": null,
      "invocation_receipt_digests": [
        "sha256:16ecdf4f2042dc9a15a714920d4381d37688297ecccf70236ed5b56b9bf54030"
      ],
      "source_capture_associations": [
        {
          "tag": "playbill-procedure-source-capture-association-v1",
          "occurrence_path": "source/scores_api",
          "field": "capture",
          "invocation_receipt_digest": "sha256:16ecdf4f2042dc9a15a714920d4381d37688297ecccf70236ed5b56b9bf54030",
          "capture_digest": "sha256:339fbfb2440ac156739177fc09cd5b490a67cedbdfe9346063e4e4d12a28bb4f"
        }
      ]
    },
    "receipt_digest": "sha256:61da6d84bffacd509aba1d5a3212c5d59e4c4542d7585ce7c04ec30c435ed04f",
    "terminal": null,
    "children": [],
    "source_observations": [
      {
        "tag": "playbill-procedure-source-observation-v1",
        "occurrence_path": "source/scores_api",
        "node_id": "scores_api",
        "input_name": "scores_api.capture",
        "field": "capture",
        "source_read_receipt": null,
        "source_read_receipt_digest": null,
        "invocation_receipt_digest": "sha256:16ecdf4f2042dc9a15a714920d4381d37688297ecccf70236ed5b56b9bf54030",
        "capture_digest": "sha256:339fbfb2440ac156739177fc09cd5b490a67cedbdfe9346063e4e4d12a28bb4f"
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
            "item_key": "00000000.ace616de4cbd8c666d65ef25b95fabd2",
            "manifest_digest": "sha256:6b001cb9e2f86a71abb677bf7e26449d3f8f7664b4801253039f80d2e89f754a",
            "egress_digest": "sha256:844bea1b084844d033b55e35cb8dcd4e183e402ee1b2217cd51e1846c2af55cd",
            "path": "claims/0b/CLM-0b915ccfb90fa143634a556606b3138f.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 1,
            "item_key": "00000001.a3b986881c041ba9e495bc408e9cb016",
            "manifest_digest": "sha256:62e7486634c26c650657cc316e5de031e337c33ec4f793ea4f0abf491b7dd7d1",
            "egress_digest": "sha256:82881fb572190bacec8bba4bd2e19249ca739f0d63f70b55630aa55082f64574",
            "path": "claims/06/CLM-0643b623d53bc341e4ce73302509a6d8.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 2,
            "item_key": "00000002.baba0f97f1278be81b57ed51d5f5cb5b",
            "manifest_digest": "sha256:3ce5651561b169866a48cbc0f5a05b4c7742cb02415c755a50461bdfe8b086d2",
            "egress_digest": "sha256:ffed348ac497c98f7a4e9e1283e1648955dd751c9e28faa5ae384b03e23c995f",
            "path": "claims/36/CLM-3610bd271ea3f895fd1b4cf529f4e9f7.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 3,
            "item_key": "00000003.3bb9a01cfd57fabfb696d4a284a691ed",
            "manifest_digest": "sha256:493fee423cd06e4b315b6b1e5db9ef14ed1f24da5a14958ad9906719b463ffef",
            "egress_digest": "sha256:a1976805bd6a3aa3cee3398ba4bc390c2313032549b974a13816c01d1a1628da",
            "path": "claims/08/CLM-08474610f2820081ba9aba71fd69f05f.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 4,
            "item_key": "00000004.7e7cb60e4053b4c328b40545f7eae944",
            "manifest_digest": "sha256:6842d2c6a7d4638d9c0355b1a85b3f6ecb8f4b3ef392f10ef2c2ee5407fd025b",
            "egress_digest": "sha256:1b5c028dd02876a5f320b4fcbbf2f7c937ff30e04bc9b543d6ac813f22cdd5c7",
            "path": "claims/c5/CLM-c5c8494d72033ba64795a82b545cb4c1.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 5,
            "item_key": "00000005.1eb54b8897e1c30d304ceab9b06c7a47",
            "manifest_digest": "sha256:33b90cbd34ae080ca598d952081fa68e583f9de1e697c3ae8ea62a2e1d4f1c3f",
            "egress_digest": "sha256:a8719336af33071ce6ad5fc32d6a8c680444753a289c5fb2be14db7e2ef01037",
            "path": "claims/25/CLM-2563da5e7c5f4a2880d488a30bc8aeb8.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 6,
            "item_key": "00000006.e89ec6be233933b0458721f5e799cd06",
            "manifest_digest": "sha256:8482a27d1f942b5a36b4b31e8bf5df29beaacc223c0b4f4e0905b68c97210c35",
            "egress_digest": "sha256:17c4119cf3d2adf4b90eed4c5969ea673d9980a2107a8562e3ee39bf67d4fb5f",
            "path": "claims/92/CLM-923bfe61a7bb723a636a86fe7cc6bdb4.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 7,
            "item_key": "00000007.478441ca304abc17dfc2e1a3725f7f30",
            "manifest_digest": "sha256:090b028077b5400555f19222ee666c6fbb3155eeff9b85b631694ffd1221fcad",
            "egress_digest": "sha256:8a642e534fda0241c438e91672bd3f73fa10225ed0597bc1b6fd11d4a4f5c970",
            "path": "claims/50/CLM-5051bb5ab5bdb80237a10647d01da1e8.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 8,
            "item_key": "00000008.9f7eaf3737157b3a24c595462a6ae260",
            "manifest_digest": "sha256:f78cfe1a43f4961b6b157ba217458cfe397dff356824f5cd7f0de12152cc2311",
            "egress_digest": "sha256:7fe6f50655fbd04dcb9e0d19660aeab16172ed483ce3a1504d09f7d5fae62e08",
            "path": "claims/2c/CLM-2c559d9ffa815754e4723c04144f4e90.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 9,
            "item_key": "00000009.f7d7b6a933e91888e0af12db77f3787c",
            "manifest_digest": "sha256:effa5bfaa965ff2891f6cd707e36ca8fe30ec1a09e34fa04db5736e827d01174",
            "egress_digest": "sha256:1ed27bb95f57f92aaec309832f14bca6e6632e264d6932ada96932b3a914f5e1",
            "path": "claims/83/CLM-83df7ec10f3dc98f8c7c9dddd97ef4b3.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 10,
            "item_key": "00000010.df6b6607548c76d5f52b740c25c03a4b",
            "manifest_digest": "sha256:3b3665159935cdae610458ee434e0491b735be0bfa7fd1ced3ffb7f20e0a5d9b",
            "egress_digest": "sha256:6e22935e8504499fa57f7b7ee2b24dff89101f7474541725c4d4226dc1fb3fe6",
            "path": "claims/fc/CLM-fce8d312fa8d5eda08946b050a9f42fc.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 11,
            "item_key": "00000011.ad7626f3a2b39741594979bfe0b55b29",
            "manifest_digest": "sha256:3ca0142cf165ef0825039c39838eb9b674546368d853b9cc4066339d40f482aa",
            "egress_digest": "sha256:75e8d1e11d3d692afe9ff84ccd0de18108a262c1fefef6df70d4dfef508809b7",
            "path": "claims/bd/CLM-bd18e9d73508c2538ecc837201a7a684.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 12,
            "item_key": "00000012.04ccb34bd7b2f2e8a8308994ac4a1a13",
            "manifest_digest": "sha256:7401c9fb0df757a5d34e2e6b6a173e12c4fa364819d6ff248bd94ba6f6a78e51",
            "egress_digest": "sha256:0d60f5d6ec5d2c75cb9123163bd415e69df4cfd603fe10688b49a17b4c8547f5",
            "path": "claims/b0/CLM-b06137d17d73d74aa9025958e367c5f3.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 13,
            "item_key": "00000013.9262019f753838e78ea517d8e968add5",
            "manifest_digest": "sha256:ba416fd08c2b475cc790aea08f42b89a38fbc454c8410d59857cb05f2e1c0e75",
            "egress_digest": "sha256:30ffe6597a11716416e163915c07d6881ac87a98963211088d46bc37f4013ca0",
            "path": "claims/83/CLM-83343aa00c2daeaaa660aff3c675e79a.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 14,
            "item_key": "00000014.52eb5123ee3a64f480c1f1b1873fc468",
            "manifest_digest": "sha256:4e721afeaa431493f7b1a095d21c498be164c32cfb83192268f1b53d20f8ef57",
            "egress_digest": "sha256:5ddc1de9b53243bccdb12aba063110329e1e9585c6b5a7bd84928696272c9f02",
            "path": "claims/e0/CLM-e0d001bfa037b46ba807400b28663877.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 15,
            "item_key": "00000015.e42ac4efe67ae4c1b076e1d38e84b8a8",
            "manifest_digest": "sha256:e5429bb445638ac2ae56ad112555ba8519e6d5db6d8498db898874235fed6d45",
            "egress_digest": "sha256:aef6e8cd27bfab283f0eead4275a9bfebfa643fcaa67cfe40f57092a09e008e7",
            "path": "claims/45/CLM-4511b29cdb22b5e7cdfb1dfc0389606b.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 16,
            "item_key": "00000016.a665df9b2b3645a5a5e9b4be64184599",
            "manifest_digest": "sha256:297ce74c492d058d87d52c86354a451d9242404be7a4a8d3da8c31fa29912a8c",
            "egress_digest": "sha256:6159186ddec7ac6794bced87c8cd3ff6795d21b386e34c6a25f7662e3ce2cb25",
            "path": "claims/4d/CLM-4df58eb72bec4dee52bb30b8e4add839.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 17,
            "item_key": "00000017.396c0932b405b0b8cdec2e362cafe4a9",
            "manifest_digest": "sha256:bfd32b5ee9ca792882e5f29aebf960aa739304dc16449dffe82c80168f277bef",
            "egress_digest": "sha256:f2601b89ea213429dd85163bd03f108b0ab5660c27e8ee14bf7c7f6b6d9a12bb",
            "path": "claims/b1/CLM-b1852c865047b78ec7df433c70f6cef5.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 18,
            "item_key": "00000018.1b080915302b7e040b45d155311c95f8",
            "manifest_digest": "sha256:46577a246a4cd8e766692ce026494a525106bef66d3a48ec2a929f8b209b0fc5",
            "egress_digest": "sha256:375649b6f29925d4c5ad0281a4d5b1990a668e9b555102aebf9139efb55eba38",
            "path": "claims/70/CLM-70e677cf193f6f3445d8b2243e1c1bfc.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 19,
            "item_key": "00000019.46aa0889c159d93ea2e822dbc6ae3d5d",
            "manifest_digest": "sha256:0597fc6de172e269914ab4d69fa9314564ccf7a1b14a393d5a6151f485069d06",
            "egress_digest": "sha256:c1b9c6f1688d27f1393c8debe79864805277d17dc70eabf913b237d44a9d9475",
            "path": "claims/67/CLM-672ebf5cf0ad4bc0347122365cbe0ca2.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 20,
            "item_key": "00000020.8c9a6d45748b2f8531cfa48ea7a348e8",
            "manifest_digest": "sha256:0226edcc43ad33e9de4017b51aeab14a2d706f60fc3345c80414dc3e6f0699c6",
            "egress_digest": "sha256:1109804eeee0efce5247284a3dd98b763d9bc08e3888540a842b7eaf42e5bb4e",
            "path": "claims/6d/CLM-6d420817c821fc09e8a191c036374799.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 21,
            "item_key": "00000021.5c4e1751fe3d95610e104c017540f01d",
            "manifest_digest": "sha256:d066dc6b27a78f33773b402f1f63584c85349bf48c541b35eee8c17f254bdeaa",
            "egress_digest": "sha256:870cff3e4cbd1435db8fa8262e158b812373b6449f9931d380fe2d2637e4211f",
            "path": "claims/91/CLM-912147bf8d9528ee51018115082a5a4d.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 22,
            "item_key": "00000022.862cf48a8ce8c0a97eb2d2a9bef72875",
            "manifest_digest": "sha256:1ff42e0566bc720ccee7d36e5113d0a59610b41f8b3d78c55ed82b6bff0d8ea1",
            "egress_digest": "sha256:e02c67afb4a47e1f069b4b1e539397e46f1ac95d0199a25d1eb83231eabf157f",
            "path": "claims/2c/CLM-2c034ee9dc396f67452410972bb98664.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 23,
            "item_key": "00000023.3e6bf4d6708a403a17ef9c980ac8d5f7",
            "manifest_digest": "sha256:a521469d28e82b1c989c021f683d0d9697083ab4fcce035bb9bdd53f575e92d5",
            "egress_digest": "sha256:5eb609e33c5d684d1bf00693b9102a8fbbf39c47e3583d76f90480c1efacb588",
            "path": "claims/bd/CLM-bd5d6bde10d4d1daf0e15d0a03a5c40d.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 24,
            "item_key": "00000024.888411ec29ee1d1e74d9dd6c1dfe1254",
            "manifest_digest": "sha256:bd5d75fea81def7bde107f80e06932b73c33954534fdc088c8e3a29f0fdffb5a",
            "egress_digest": "sha256:f3baeaf1fa78c36d56021b3ad54a3d788fed943cbc83fad818689cbe52cdcbaa",
            "path": "claims/10/CLM-101186fdb5cf6a0b627f10ece8f2fe20.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 25,
            "item_key": "00000025.7528e1b780949c9385c3b3aeb7bb2f17",
            "manifest_digest": "sha256:3c92a49ac408bc3ead8e6cdac0feb8ab48c9a8af4ec7203ce16bf674100213a4",
            "egress_digest": "sha256:132e0375ca89b9ad4315b642f69c901bc7196f323406faea0b4517775029e5e6",
            "path": "claims/6a/CLM-6a349dfab5a909d105d645defb3ff369.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 26,
            "item_key": "00000026.9359e14286b726867a831e19641893f6",
            "manifest_digest": "sha256:0c22485168f8a5b5593301c009dcfb02ea065ffed40fc639b25d518502eb4b54",
            "egress_digest": "sha256:55f92a8dfca58645ee29dee06b62b2e715b204952b1994b881d12ea267554d88",
            "path": "claims/61/CLM-610a77949e602c3fef982e0288fe2735.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 27,
            "item_key": "00000027.d833493cb73099e0cab73ab014ec481c",
            "manifest_digest": "sha256:1d6d3913742fd871eea8e352c030ac607c0528f120de0f207946f0411c8ada21",
            "egress_digest": "sha256:a86716644b8626bc1142b98ff9aebdfe88bad19f18e4dcc068e2dadaefd3b6fe",
            "path": "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 28,
            "item_key": "00000028.71d89745d7474283213be62abd206694",
            "manifest_digest": "sha256:284b7c5166d5e69e6bb687eefc7a6ad68ba78751d25602ef89e7bb42bda5d54f",
            "egress_digest": "sha256:106fb6f216d4ba669b6cf88a7ccca6c0f2bfdbead6222326fdc334ba71c996ce",
            "path": "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json",
            "unchanged": true,
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 29,
            "item_key": "00000029.2c8bc92438175d96252f95144523983a",
            "manifest_digest": "sha256:db742902c6ecccd5d4d680ab1d5093eaa1a029205a074d8cc3ee62ecc9d8fbcf",
            "egress_digest": "sha256:8255bb4ce2293e9b9f92ff45125422c3a07c242632687bf089cc90b0db522201",
            "path": "claims/58/CLM-58325fbdd5bff786556a30110917b174.json",
            "unchanged": true,
            "prior_refusals": []
          }
        ],
        "journal_coordinate": {
          "tag": "playbill-procedure-journal-coordinate-v1",
          "stream_instance_id": "inst_d8e6dcb48e6a4d0d",
          "journal_family": "procedure-exhaust-v1",
          "stream_id": "procedures",
          "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
          "sequence": 88,
          "record_digest": "sha256:94bedcfef91d4dc364d308da084e65cb44a984bf1542d2d0e003713926b0b453"
        },
        "settle_outcome": null,
        "accepted_git_oid": null,
        "fallback_reason": null,
        "outside_scope": [],
        "capped_by": null,
        "prior_refusal_coverage": null,
        "claims_same_count": 30
      }
    ],
    "findings": [],
    "findings_count": 0,
    "nodes": [
      {
        "node": "scores_api",
        "kind": "call",
        "verdict": "succeeded",
        "sequence": 53,
        "summary": {
          "kind": "call",
          "captures": 1,
          "capture_digests": [
            "sha256:339fbfb2440ac156739177fc09cd5b490a67cedbdfe9346063e4e4d12a28bb4f"
          ]
        }
      },
      {
        "node": "watched",
        "kind": "read",
        "verdict": "succeeded",
        "sequence": 54,
        "summary": {
          "kind": "read",
          "rows": 10
        }
      },
      {
        "node": "watch_keys",
        "kind": "transform",
        "verdict": "succeeded",
        "sequence": 55,
        "summary": {
          "kind": "transform",
          "transform_kind": "shape",
          "rows_in": 10,
          "rows_out": 10
        }
      },
      {
        "node": "scores",
        "kind": "extract",
        "verdict": "succeeded",
        "sequence": 56,
        "summary": {
          "kind": "extract",
          "records": 10,
          "invalid_records": 0,
          "duplicates": 0,
          "invalid_fields": 0,
          "complete": true,
          "complete_when": {
            "count_at": "/total",
            "expected": 10,
            "observed": 10,
            "held": true
          }
        }
      },
      {
        "node": "write",
        "kind": "claims",
        "verdict": "succeeded",
        "sequence": 89,
        "summary": {
          "kind": "claims",
          "written": 0,
          "revised": 0,
          "inverse_written": 0,
          "subjects_created": 0,
          "re_observed": 30,
          "no_op": 0,
          "retired": 0,
          "surfaced": 0,
          "downgraded": 0,
          "delivery": "unchanged"
        }
      }
    ]
  }
});
