// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/procedure-runs/RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/procedure-runs/{run_id}",
  "pathParams": {
    "run_id": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165"
  },
  "response": {
    "investigation": null,
    "trigger_binding": null,
    "tag": "playbill-procedure-run-state-v2",
    "run_id": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.epss-triage"
    },
    "procedure_artifact_digest": "sha256:c3fab91633d80ae933a1a2ba9f39e2952f59ae215cfe5bf7bfd0b8cbbc495166",
    "bound_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
      "semantic_root": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229",
      "generation_root": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "head_at_admission": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
      "semantic_root": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229",
      "generation_root": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "lane": "current",
    "evaluation_time": "2026-11-07T18:00:00Z",
    "status": "succeeded",
    "pending_inputs": [],
    "outcomes": [
      {
        "capture_event": {
          "run_id": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
          "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
          "sequence": 7,
          "record_digest": "sha256:dad7ab62a26ead6ca46fde8540d931239807f3c6b544a80061e23513e1cab539"
        },
        "sequence": 7,
        "event_kind": "produced_capture",
        "node_id": "scores_api",
        "payload_digest": "sha256:306ad906396d32668b1ecad1e02c7196b294aca4bee5ed369583787a2f326b7d"
      },
      {
        "capture_event": null,
        "sequence": 8,
        "event_kind": "node_fired",
        "node_id": "scores_api",
        "payload_digest": "sha256:c3593344f2784a5d6ea12ecbcb9d47e10e5b247e8ef44e4dea63bf4c65392c7e"
      },
      {
        "capture_event": null,
        "sequence": 9,
        "event_kind": "node_fired",
        "node_id": "watched",
        "payload_digest": "sha256:e7f87251d8f8a3e0bd665753d472d0f2ac3bfa72efcaeaf75b392c615142b605"
      },
      {
        "capture_event": null,
        "sequence": 10,
        "event_kind": "node_fired",
        "node_id": "watch_keys",
        "payload_digest": "sha256:1a700d7c6b42ac41606a2393456a8c7ff4414d1381301487bce2ca035173ca11"
      },
      {
        "capture_event": null,
        "sequence": 11,
        "event_kind": "node_fired",
        "node_id": "scores",
        "payload_digest": "sha256:1ca73f323dd64e460de91263f28aaf590015b4d5e33fb8bd6914ca4e73d10bfa"
      },
      {
        "capture_event": null,
        "sequence": 17,
        "event_kind": "node_fired",
        "node_id": "write",
        "payload_digest": "sha256:60f7c314aa7df0ef26a0d67fe51f70219a54dea5673174f4df734a7a35b57a57"
      },
      {
        "capture_event": null,
        "sequence": 18,
        "event_kind": "attempt_finalized",
        "node_id": null,
        "payload_digest": "sha256:715b14c4a24b8aa6c2a0880d8187228a0df4150f61afabed670feaff758faf70"
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
    "semantic_replay_key_digest": "sha256:bd4a53c71e9cda717ebdb7726f809dc54b0e2ba5ae7126e5901f6728afcfa864",
    "semantic_result_digest": "sha256:12ec86faba30998a92dac421c8ae34c491cbfc7ce2c7e0ce679321e2b7e04ad8",
    "receipt": {
      "tag": "playbill-procedure-run-receipt-v8",
      "run_id": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
      "admission_binding_digest": "sha256:89596db9a1694c3a597064183100236de468798fb3e35f5170bc0e4e6c3befdd",
      "semantic_replay_key_digest": "sha256:bd4a53c71e9cda717ebdb7726f809dc54b0e2ba5ae7126e5901f6728afcfa864",
      "semantic_result_digest": "sha256:12ec86faba30998a92dac421c8ae34c491cbfc7ce2c7e0ce679321e2b7e04ad8",
      "bound_coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
        "semantic_root": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229",
        "generation_root": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "head_at_admission": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
        "semantic_root": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229",
        "generation_root": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "lane": "current",
      "evaluation_time": "2026-11-07T18:00:00Z",
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
            "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
          },
          "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72"
        },
        {
          "role": "query",
          "target": {
            "kind": "QueryDefinition",
            "name": "security.watched_cve_keys"
          },
          "artifact_digest": "sha256:ff324890533bf2fcfe4cfa38d18d68ff4a8574f7d4e68d9a8afa5e31861b9741"
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
          "input_name": "watch_keys",
          "read_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
            "semantic_root": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229",
            "generation_root": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "query_definition_digest": "sha256:ff324890533bf2fcfe4cfa38d18d68ff4a8574f7d4e68d9a8afa5e31861b9741",
          "parameters_digest": "sha256:6ea45fd7162a1c5d28f1a29ca2f875d5914c2c0eae34da4d64b80c30171a1ad0",
          "result_digest": "sha256:66e45c12fc2811dcd7675924d8a67809e45538a4b248127cde5c9bc601239970",
          "effective_query_budgets": {
            "tag": "playbill-query-budgets-v1",
            "max_results": 49991,
            "max_traversal_depth": 10,
            "max_paths": 49991,
            "max_paths_per_result": 49991
          },
          "material_body_digest": "sha256:069bcada6fa94ca5928b0fb87ca3a1ab84366b0a58fb946c67b7d60bbed769a8"
        },
        {
          "tag": "playbill-accepted-state-run-input-v2",
          "kind": "accepted_state_v2",
          "input_name": "watched",
          "read_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
            "semantic_root": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229",
            "generation_root": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201",
            "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
          },
          "query_definition_digest": "sha256:b64563bad1dcaab9f28ebeb7ed53201974ddcb1bc0ea197e31f294e02015e621",
          "parameters_digest": "sha256:6ea45fd7162a1c5d28f1a29ca2f875d5914c2c0eae34da4d64b80c30171a1ad0",
          "result_digest": "sha256:e89bbf782c4288456fe0a74a68d2369a0a2e22f9185678cb1258fc85eee3d161",
          "effective_query_budgets": {
            "tag": "playbill-query-budgets-v1",
            "max_results": 50000,
            "max_traversal_depth": 10,
            "max_paths": 50000,
            "max_paths_per_result": 50000
          },
          "material_body_digest": "sha256:751825e954e4e95a576f6bbd0e25b66087c4e9fe8b28ba66f9ef9dba052a58db"
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
      "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
      "first_sequence": 1,
      "last_sequence": 18,
      "record_digests": [
        "sha256:afb78302cbc5976f65951dee06f8ee02563ddb382e52ff2d0248498a91e7edc8",
        "sha256:08f33bd2aa4ad79f64d1306d75edddeb1f427f0ac2c8c2abe8464db45eb6e5de",
        "sha256:b79ce545c73bbeb5a32ffc129c17795e14954e0fead3d8b168ca78a1b0827b3a",
        "sha256:97b7e79377dd13c7c2e0f038d209dd2324d2525752bd6641f852c81928855d73",
        "sha256:10a410a4475f9a6159e25f9a0132d71df03aa29565444ae21791501480d08d0e",
        "sha256:10a976996d17af381bd7f7a364ca64dd19a8ef3c8d36319c8386be851444894f",
        "sha256:dad7ab62a26ead6ca46fde8540d931239807f3c6b544a80061e23513e1cab539",
        "sha256:cda6011d301267d890c297fa7f4491395f87a08962b316c6a854fac197ab1a87",
        "sha256:90c3b87afb4bc140eca0852cee3e8af0dad1a73021b8b2dcf01e1076ce19a43c",
        "sha256:38353702075a566a618c3c38c2d92496f3edcbfe196824390f5a6598201f10a3",
        "sha256:2cf527afde896f8ab376641a95ab566b86674fe4e8e8fc6808fcbf6a13ceb5eb",
        "sha256:b43487edc2a62c2d8e5f4c1e964ab714a57a90ad95c800dbad405004ceb94587",
        "sha256:0d6cebc2aef57be2c68eb1cd346704c3ea3710efac233bae3a91763a72c623e4",
        "sha256:1ce84662d27d3746c3998c2c3638f4c0ac65403da1d67bf43c9517e49dc3eae4",
        "sha256:2c8ab9ed15f6558884adcbdfb3f54d6a28186d42703a2df1e658230a1acdaba8",
        "sha256:6fa02cb159a5be069cb6931b6f1df62b1cd677f87a0c81b0b9a62a32f13947b3",
        "sha256:d5cccc2a047ffe5201bfee4c893a944ef103edd1fa036524711f0bf85bdd1f64",
        "sha256:529ee5a5bb459b5e4f5fc72d6c05b07faac616e98e1360876d8beb523e4a8dfc"
      ],
      "chain_head_digest": "sha256:529ee5a5bb459b5e4f5fc72d6c05b07faac616e98e1360876d8beb523e4a8dfc",
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
            "high_water": 3,
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
          "wall_clock_microseconds": 226724,
          "read_rows": 18
        }
      },
      "invocation_origin": "line",
      "line_identity": {
        "kind": "Line",
        "name": "security.epss-triage"
      },
      "line_spec_digest": "sha256:dff66cdcfae4daeb94703b92f790bd99683e6b3b3f9e87e7f3df53b2b87505c0",
      "occurrence_id": "sha256:8a22c93d91635c75630f28ae4ff1d4093ee35e16c3f82565da03140762f38c10",
      "occurrence_evaluation_time": "2026-11-07T18:00:00Z",
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
          "pins": [
            {
              "role": "query",
              "target": {
                "kind": "QueryDefinition",
                "name": "security.watched_cve_keys"
              },
              "artifact_digest": "sha256:ff324890533bf2fcfe4cfa38d18d68ff4a8574f7d4e68d9a8afa5e31861b9741"
            }
          ]
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
      "pin_set_digest": "sha256:2a0ee4faf8cc357983e7bd091aeef506a0f51cf18f2d8b6c9d24507b97b6d5f3",
      "replay_input_vector": [
        {
          "tag": "playbill-procedure-replay-input-projection-v1",
          "input_name": "watch_keys",
          "plane": "accepted_state",
          "kind": "query_result",
          "value_or_body_digest": "sha256:66e45c12fc2811dcd7675924d8a67809e45538a4b248127cde5c9bc601239970",
          "provenance_digest": "sha256:5dd861ab599b2f17e09d5d814336137cf70c1bb2e307b83c1d98cdb185992ae9"
        },
        {
          "tag": "playbill-procedure-replay-input-projection-v1",
          "input_name": "watched",
          "plane": "accepted_state",
          "kind": "query_result",
          "value_or_body_digest": "sha256:e89bbf782c4288456fe0a74a68d2369a0a2e22f9185678cb1258fc85eee3d161",
          "provenance_digest": "sha256:5a43e25597c02a0af7b2f965dd637c9205a2e9b5f8d46f3cdf4117ab17053000"
        }
      ],
      "deployment_snapshot_digest": "sha256:8f6d73e5b27319ca2259f2c61e73e931329ca710594768d966d653a444c5a766",
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
          "operation_signature_digest": "sha256:97d85d6cf99e7e0e0452a6efee67c3381ed731e11dd103197b672366011de4ea",
          "provider_artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
          "implementation_digest": "sha256:613b67a56c42613f6703708fc09c5f92ebd0fd7c1f2061b9e8ce1c2b1e487a48",
          "effect_class": "external_read",
          "secret_binding_identity_digests": []
        }
      ],
      "sensitivity_policy_digest": "sha256:b3cf85edc1559c5be11ca7d74018e0482ec713e845562375491eb222b12ce399",
      "mandate_coordinate_digest": "sha256:f81632bb0493c5171579414255c73add6e69f0693a00da833f2236f24dc216f9",
      "taint_labels": [],
      "epsilon_member": false,
      "admission_material_manifest": {
        "tag": "playbill-procedure-admission-material-v1",
        "members": []
      },
      "admission_material_manifest_digest": "sha256:66bfabe7130485c3b736f34f5f2e8d357848a8c9c8f1996b8a8ef6cd01ff2937",
      "acquisition_plan_digest": "sha256:c9fb617fab099d30acaa4c7773fbe0b60449cc0ec0c74cd090164fa8cbb4db8e",
      "exhaust_access_binding_digest": null,
      "invocation_receipt_digests": [
        "sha256:f7ac0d5cc332541fab004fb3f3b8e1f9264b5e0bc80d8ed0000879caa1c7076f"
      ],
      "source_capture_associations": [
        {
          "tag": "playbill-procedure-source-capture-association-v1",
          "occurrence_path": "source/scores_api",
          "field": "capture",
          "invocation_receipt_digest": "sha256:f7ac0d5cc332541fab004fb3f3b8e1f9264b5e0bc80d8ed0000879caa1c7076f",
          "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
        }
      ]
    },
    "receipt_digest": "sha256:9d713014fe601df8ba2eca8b584936157fb609ef0eef848b386f073b44ac9706",
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
        "invocation_receipt_digest": "sha256:f7ac0d5cc332541fab004fb3f3b8e1f9264b5e0bc80d8ed0000879caa1c7076f",
        "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
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
        "operation_key": "sha256:c02ddfb72844c87ad7d7ff5de69ff5c0ce7d712d016b34aea4d0569b34237ff3",
        "procedure_mandate_digest": "sha256:607c0296b8ef711af7f16c3394ed9c7cb36f3eb2df9996947f030c18bd6aa291",
        "target_paths": [
          "claims/18/CLM-1817b5bf41dbacad208487b99a2a275d.json",
          "claims/c7/CLM-c79e9d236b888bada73738d2f0dc0e1d.json",
          "claims/df/CLM-df2e21236111d6da62b2da4022a65fdb.json"
        ],
        "proposal_id": "sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96",
        "candidate_digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3",
        "refusal_code": null,
        "children": [
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 0,
            "item_key": "00000000.b3a4b41e71ac38fba6dc5ea178aed7b8",
            "manifest_digest": "sha256:1612c968aca038bd441a3571d22052ea870242725e2ad22c74bb1e5a247c8511",
            "egress_digest": "sha256:89d8e95893a8699a090efe1af0a39e9bac5facb61e41ce4574aa1f1121a91e70",
            "path": "claims/df/CLM-df2e21236111d6da62b2da4022a65fdb.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:4b78f4149ec8466ff350ebca26ca2074bb11eed4d87747e7aad954a813150ae0",
            "change_kind": "claim",
            "change_digest": "sha256:37d28b6f2956ea8bff467c04d141fd92a8c25eef4d7bef984a2fc3a047aafc15"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 1,
            "item_key": "00000001.6b639f093e5b3033b6fa0c4529af22bd",
            "manifest_digest": "sha256:ce4230fb75f12d796e95c7d5ffc454f6af80caf081bb8c8bd191e93dedaaca22",
            "egress_digest": "sha256:906caf13d88761e319a9c589702c6829a80c749844768a2c903f87b45168bcea",
            "path": "claims/18/CLM-1817b5bf41dbacad208487b99a2a275d.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:7cbf23838dbd092b9aaad0f932338a7917dfb4be4382dfaa6de33980b0d4ed7d",
            "change_kind": "claim",
            "change_digest": "sha256:32ef58fd0ea7f66dc94c1731c4f20799f4b4fdcd8a5790aff9613f16ffeee6bb"
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 2,
            "item_key": "00000002.a465e95368a94d275d6c096db9227d4b",
            "manifest_digest": "sha256:e71026c92a312e4f071b47612e3bdbafeaa0e954f8b7ce32af8fe6efd134f5ed",
            "egress_digest": "sha256:0a1db3af4dffe34e486c33e5d14410533e8ee713d92eca92e5afd001e2361855",
            "path": "claims/c7/CLM-c79e9d236b888bada73738d2f0dc0e1d.json",
            "prior_refusals": [],
            "item_identity_digest": "sha256:63c7866866b95de5016594162e56dcd7177944a2e2731b50e04b525ca11941ac",
            "change_kind": "claim",
            "change_digest": "sha256:2b143d03d5b23a149797b679c802781ddb4190c61873e8aaaa64869670bedeb0"
          }
        ],
        "journal_coordinate": {
          "tag": "playbill-procedure-journal-coordinate-v1",
          "stream_instance_id": "inst_console05",
          "journal_family": "procedure-exhaust-v1",
          "stream_id": "procedures",
          "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
          "sequence": 16,
          "record_digest": "sha256:6fa02cb159a5be069cb6931b6f1df62b1cd677f87a0c81b0b9a62a32f13947b3"
        },
        "settle_outcome": "settled",
        "accepted_git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
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
        "node": "scores_api",
        "kind": "call",
        "verdict": "succeeded",
        "sequence": 8,
        "summary": {
          "kind": "call",
          "captures": 1,
          "capture_digests": [
            "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
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
        "node": "watch_keys",
        "kind": "read",
        "verdict": "succeeded",
        "sequence": 10,
        "summary": {
          "kind": "read",
          "rows": 9
        }
      },
      {
        "node": "scores",
        "kind": "extract",
        "verdict": "succeeded",
        "sequence": 11,
        "summary": {
          "kind": "extract",
          "records": 1,
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
        "sequence": 17,
        "summary": {
          "kind": "claims",
          "written": 3,
          "revised": 0,
          "inverse_written": 0,
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
