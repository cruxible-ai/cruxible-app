// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/procedure-runs/RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/procedure-runs/{run_id}",
  "pathParams": {
    "run_id": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d"
  },
  "response": {
    "investigation": null,
    "trigger_binding": {
      "kind": "capture_landing",
      "trigger": {
        "kind": "Trigger",
        "name": "security.cve-landed"
      },
      "generation": null,
      "event": {
        "run_id": "RUN-309b99b16924b58b06a58180b8cf83c8c80b271c38abaab5a0764205da24c8c0",
        "partition_id": "direct:9d0ab580e11b9ee199c77d22f5c53d39797d13541185eeae4a340b7246fee560",
        "sequence": 7,
        "record_digest": "sha256:29fd9d5bc17d5488d5adcd5e7f24d19f42dc236d2f7a3741fb9273066705ab99"
      },
      "window": null
    },
    "tag": "playbill-procedure-run-state-v2",
    "run_id": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.cve-applicability"
    },
    "procedure_artifact_digest": "sha256:402cefee7855091d6fa83bf375568c365bc67c102f874107e8d00f31db06846b",
    "bound_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "a641e510a50079df28ad881e870448532b4b68c6",
      "semantic_root": "sha256:fc8c0e3c71d1dad51bd75df3ad46c577a5b2bffed1ece616dc2d72d1252af46b",
      "generation_root": "sha256:eded08671e4a6eb3989cc30f2be0a9d7f104c1c1053c81950ae96d36f27550de",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "head_at_admission": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "a641e510a50079df28ad881e870448532b4b68c6",
      "semantic_root": "sha256:fc8c0e3c71d1dad51bd75df3ad46c577a5b2bffed1ece616dc2d72d1252af46b",
      "generation_root": "sha256:eded08671e4a6eb3989cc30f2be0a9d7f104c1c1053c81950ae96d36f27550de",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "lane": "current",
    "evaluation_time": "2026-10-19T21:31:46.272392Z",
    "status": "succeeded",
    "pending_inputs": [],
    "outcomes": [
      {
        "capture_event": null,
        "sequence": 3,
        "event_kind": "node_fired",
        "node_id": "record",
        "payload_digest": "sha256:2c43286fc1eb7e093404df8e3e0857c96dcb975313e16bbde2f6a3286034bcfc"
      },
      {
        "capture_event": null,
        "sequence": 4,
        "event_kind": "node_fired",
        "node_id": "releases",
        "payload_digest": "sha256:c0f81462879991452f3c62e026f199c70e0b08c89ecb1439611598d3faf0b567"
      },
      {
        "capture_event": null,
        "sequence": 5,
        "event_kind": "node_fired",
        "node_id": "watched",
        "payload_digest": "sha256:cc7ce505fb2b9c890463153a0dfcd8dd73c4c5a231242e988f5d20ace6a0ec3a"
      },
      {
        "capture_event": null,
        "sequence": 6,
        "event_kind": "node_fired",
        "node_id": "assessments",
        "payload_digest": "sha256:85d5dd3eef45346831614f71ede7bcbf5da2aa3f10d0d99b421a218a4a4b68b1"
      },
      {
        "capture_event": null,
        "sequence": 9,
        "event_kind": "node_fired",
        "node_id": "decide",
        "payload_digest": "sha256:fb7cc48910e2cddccff1519f534f98a344861490b553102e1213bc2f3ed6f751"
      },
      {
        "capture_event": null,
        "sequence": 10,
        "event_kind": "node_fired",
        "node_id": "summary",
        "payload_digest": "sha256:c6d9b6d7204106c4786f27db0495a1d1edadd0bf11fda838c417a975d3494eba"
      },
      {
        "capture_event": null,
        "sequence": 12,
        "event_kind": "node_fired",
        "node_id": "changed",
        "payload_digest": "sha256:736bc91a65ae272fcc374f31e805234f7d26e99ff3245f2fee2b6e17c2ed980b"
      },
      {
        "capture_event": null,
        "sequence": 27,
        "event_kind": "node_fired",
        "node_id": "propose",
        "payload_digest": "sha256:79bdbd771a6446db2bbb51d7908dd7de797e15e9c338ff1dc0e26db331c9c2cf"
      },
      {
        "capture_event": null,
        "sequence": 28,
        "event_kind": "attempt_finalized",
        "node_id": null,
        "payload_digest": "sha256:d2b6f079e0a30c2906ee91d88f1a3bc8d6bada144f7719cf186a31042157c7dc"
      }
    ],
    "next_operation": {
      "kind": "done"
    },
    "result": {
      "affected": 1,
      "changed": 12,
      "cve_id": "CVE-2021-44228",
      "inconclusive": 1,
      "judged": 0,
      "not_affected": 2,
      "unchanged": 0
    },
    "attribution": {
      "tag": "playbill-procedure-run-attribution-v1",
      "actor_type": "service_account",
      "actor_id": "gate-owner",
      "org_id": "local",
      "operation_id": "op_5aee89dd757247e1",
      "request_id": null,
      "recorded_time": "2026-10-19T21:31:46.272392Z"
    },
    "semantic_replay_key_digest": "sha256:2f3bf6716d08e3f96a6c49535621a426a9d19c2a1cb42a26cb0b111375c2a42a",
    "semantic_result_digest": "sha256:eb4d454857566971f0419c5b893de07a4ce7009ff34047dc509520df102a1685",
    "receipt": {
      "tag": "playbill-procedure-run-receipt-v7",
      "run_id": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
      "admission_binding_digest": "sha256:1ed937a99136f06044ab15cbfb8cce87291631ca140f82951e5219370bbdd9f7",
      "semantic_replay_key_digest": "sha256:2f3bf6716d08e3f96a6c49535621a426a9d19c2a1cb42a26cb0b111375c2a42a",
      "semantic_result_digest": "sha256:eb4d454857566971f0419c5b893de07a4ce7009ff34047dc509520df102a1685",
      "bound_coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "a641e510a50079df28ad881e870448532b4b68c6",
        "semantic_root": "sha256:fc8c0e3c71d1dad51bd75df3ad46c577a5b2bffed1ece616dc2d72d1252af46b",
        "generation_root": "sha256:eded08671e4a6eb3989cc30f2be0a9d7f104c1c1053c81950ae96d36f27550de",
        "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
      },
      "head_at_admission": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "a641e510a50079df28ad881e870448532b4b68c6",
        "semantic_root": "sha256:fc8c0e3c71d1dad51bd75df3ad46c577a5b2bffed1ece616dc2d72d1252af46b",
        "generation_root": "sha256:eded08671e4a6eb3989cc30f2be0a9d7f104c1c1053c81950ae96d36f27550de",
        "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
      },
      "lane": "current",
      "evaluation_time": "2026-10-19T21:31:46.272392Z",
      "validated_pins": [
        {
          "role": "acquisition-policy",
          "target": {
            "kind": "SourceAcquisitionPolicy",
            "name": "security.acquisition"
          },
          "artifact_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6"
        },
        {
          "role": "capture-contract",
          "target": {
            "kind": "CaptureContract",
            "name": "security.cve-record-http-v1"
          },
          "artifact_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2"
        },
        {
          "role": "contract-in",
          "target": {
            "kind": "Contract",
            "name": "security-cve-applicability-request"
          },
          "artifact_digest": "sha256:22e80e2da42813885c6817595f871b601f73d68dcc87d0a60d43d5e704db2033"
        },
        {
          "role": "contract-in",
          "target": {
            "kind": "Contract",
            "name": "security-empty-input"
          },
          "artifact_digest": "sha256:a4af462677245e193b86c2f96dbdb38fc0bc120024019be9afebb54df20e90cb"
        },
        {
          "role": "contract-out",
          "target": {
            "kind": "Contract",
            "name": "security-cve-applicability-result"
          },
          "artifact_digest": "sha256:8f2b762fb25be42aff804b4d1d67cbcebc74dd687b0153d8029ca909821f88ab"
        },
        {
          "role": "contract-out",
          "target": {
            "kind": "Contract",
            "name": "security-cve-applicability-summary"
          },
          "artifact_digest": "sha256:3821ac9e4333bf40959ffa5c99163a55030ee67d20f1ed397be8532e203061ff"
        },
        {
          "role": "provider",
          "target": {
            "kind": "Provider",
            "name": "cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b"
          },
          "artifact_digest": "sha256:75f19062850133aa30ca5c2845d590a0025c8a3121a2b518080751e34ceca44c"
        },
        {
          "role": "provider",
          "target": {
            "kind": "Provider",
            "name": "security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167"
          },
          "artifact_digest": "sha256:25beb8d75f2c4f3491d26dcc33da3a938e0395446464e8254a2505f284589544"
        },
        {
          "role": "provider-interface",
          "target": {
            "kind": "ProviderInterface",
            "name": "security.cve-applicability/fa65ba8a159a3fedd4114b3cfe0d61f02e950f71dc7cd22f54d9139fc0b6b7ab"
          },
          "artifact_digest": "sha256:4ae58ed19fc0df0e1ac157d4933b78e9326dd5ea49e3f9682a71a35df3832fdf"
        },
        {
          "role": "provider-interface",
          "target": {
            "kind": "ProviderInterface",
            "name": "web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c"
          },
          "artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4"
        },
        {
          "role": "query",
          "target": {
            "kind": "QueryDefinition",
            "name": "security.assessment_index"
          },
          "artifact_digest": "sha256:0eee96188ab6c97709201da08c0a689bb11820f21809fa4c4cffb4d5a24df989"
        },
        {
          "role": "query",
          "target": {
            "kind": "QueryDefinition",
            "name": "security.release_inventory"
          },
          "artifact_digest": "sha256:3085282fb5583edb323f4f651770a31ab3dcb197d31ae0838b3bf3c8fa7ae7a7"
        },
        {
          "role": "query",
          "target": {
            "kind": "QueryDefinition",
            "name": "security.watched_vulnerabilities"
          },
          "artifact_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d"
        }
      ],
      "admitted_inputs": [
        {
          "tag": "playbill-accepted-state-run-input-v2",
          "kind": "accepted_state_v2",
          "input_name": "assessments",
          "read_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "a641e510a50079df28ad881e870448532b4b68c6",
            "semantic_root": "sha256:fc8c0e3c71d1dad51bd75df3ad46c577a5b2bffed1ece616dc2d72d1252af46b",
            "generation_root": "sha256:eded08671e4a6eb3989cc30f2be0a9d7f104c1c1053c81950ae96d36f27550de",
            "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
          },
          "query_definition_digest": "sha256:0eee96188ab6c97709201da08c0a689bb11820f21809fa4c4cffb4d5a24df989",
          "parameters_digest": "sha256:6ea45fd7162a1c5d28f1a29ca2f875d5914c2c0eae34da4d64b80c30171a1ad0",
          "result_digest": "sha256:b17f5a3561f1be644b84f567db1150c5e7d5fbf559461836509e29733a3f0df8",
          "effective_query_budgets": {
            "tag": "playbill-query-budgets-v1",
            "max_results": 2000,
            "max_traversal_depth": 10,
            "max_paths": 20000,
            "max_paths_per_result": 100
          },
          "material_body_digest": "sha256:294a716829a010fc23ff9ed423b1cf79d9d90a120580c22295113b02ab637204"
        },
        {
          "tag": "playbill-landed-capture-run-input-v1",
          "kind": "landed_capture",
          "input_name": "record",
          "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
          "capture_contract_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
          "landing_cursor": "procedure-event:sha256:29fd9d5bc17d5488d5adcd5e7f24d19f42dc236d2f7a3741fb9273066705ab99"
        },
        {
          "tag": "playbill-accepted-state-run-input-v2",
          "kind": "accepted_state_v2",
          "input_name": "releases",
          "read_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "a641e510a50079df28ad881e870448532b4b68c6",
            "semantic_root": "sha256:fc8c0e3c71d1dad51bd75df3ad46c577a5b2bffed1ece616dc2d72d1252af46b",
            "generation_root": "sha256:eded08671e4a6eb3989cc30f2be0a9d7f104c1c1053c81950ae96d36f27550de",
            "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
          },
          "query_definition_digest": "sha256:3085282fb5583edb323f4f651770a31ab3dcb197d31ae0838b3bf3c8fa7ae7a7",
          "parameters_digest": "sha256:6ea45fd7162a1c5d28f1a29ca2f875d5914c2c0eae34da4d64b80c30171a1ad0",
          "result_digest": "sha256:ce7c0c28037d5e34d4ea61fbb293f5198314557920863cfefdad0d4c06d378cc",
          "effective_query_budgets": {
            "tag": "playbill-query-budgets-v1",
            "max_results": 2000,
            "max_traversal_depth": 10,
            "max_paths": 20000,
            "max_paths_per_result": 100
          },
          "material_body_digest": "sha256:fac02de9f2cb2fefc0db0f57083ad13f3077ce3ce9a4627e7e15aa39a6ae3b26"
        },
        {
          "tag": "playbill-accepted-state-run-input-v2",
          "kind": "accepted_state_v2",
          "input_name": "watched",
          "read_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "a641e510a50079df28ad881e870448532b4b68c6",
            "semantic_root": "sha256:fc8c0e3c71d1dad51bd75df3ad46c577a5b2bffed1ece616dc2d72d1252af46b",
            "generation_root": "sha256:eded08671e4a6eb3989cc30f2be0a9d7f104c1c1053c81950ae96d36f27550de",
            "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
          },
          "query_definition_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d",
          "parameters_digest": "sha256:6ea45fd7162a1c5d28f1a29ca2f875d5914c2c0eae34da4d64b80c30171a1ad0",
          "result_digest": "sha256:2fb7bdab8fd50e11cde4467a8e4d6e9c941e8bf9f9620c8ea26c1281cf94a775",
          "effective_query_budgets": {
            "tag": "playbill-query-budgets-v1",
            "max_results": 2000,
            "max_traversal_depth": 10,
            "max_paths": 20000,
            "max_paths_per_result": 100
          },
          "material_body_digest": "sha256:6652e647abe3b5d4dfd677ec160a92b05a7679565f42b7c4c96eda10c0cae100"
        }
      ],
      "attribution": {
        "tag": "playbill-procedure-run-attribution-v1",
        "actor_type": "service_account",
        "actor_id": "gate-owner",
        "org_id": "local",
        "operation_id": "op_5aee89dd757247e1",
        "request_id": null,
        "recorded_time": "2026-10-19T21:31:46.272392Z"
      },
      "stream_instance_id": "inst_be4d690f30d64371",
      "journal_family": "procedure-exhaust-v1",
      "stream_id": "procedures",
      "partition_id": "line:f9880a610fa060e85512a2557a96454c13fb0d72b2467f03fc19cbc9cda98e58",
      "first_sequence": 1,
      "last_sequence": 28,
      "record_digests": [
        "sha256:0ff2cd0b68cadc906accccdcb176e619a157b6944129b54efffb50d22acaaf2e",
        "sha256:b0d825a0244d5d46e6da3e0591d2986ed16acb40d9cfa15256472280f528b256",
        "sha256:c9b4ff3339048081813acc5295e51e29a83c6f4d70ed4cf60a0fbfa3a180c191",
        "sha256:7052fc28a134b7761e78cc036248ff37132acd7bc650bac69b6d0e14fa078d1b",
        "sha256:f3b3f0d02ff828846af5035a55a6641c88d471b905e983b8c4b013ca25c4dbcd",
        "sha256:7e6741117cd7b8bb8debf78dd01f4f2917204a8201e98d93166b55684854fbfc",
        "sha256:5dade5e06c46f67bf42b48bf12285b746da04f3895ded0cd40f1e6831fc72c16",
        "sha256:02c69597710b3f7d33caea920b4fb5114683fde8197ec6bda47e83ea7e6fef9e",
        "sha256:d8fb781a507b1939155372ad25f8a9b94ced63789086df1e3fcadca2146c7802",
        "sha256:01b74c11838164b56e0425c4ddbad8b6ed5508a3201319de68e5278a8ab2b1d2",
        "sha256:5e89711288ca44f33692aaec801617a14ff2bbedb755ee4f07669790aed515f8",
        "sha256:d2ec082a45aa45f4ee3532f6e459c6b77da02d99fba0faa87755fa8fef81be94",
        "sha256:831c30d4d61397139c4a555ff195bc5818ce6f315fe10df04262be1a05039222",
        "sha256:f32006a93111d1ee725af0cea2cd728d526d6f73c3d8fab4e60ed7cfb91d8623",
        "sha256:6a40d59635b6b8446781b9bb473f164524bbadba281a43a8b3ea392a92c29f10",
        "sha256:8d1634872a2f5431883d6a445fb339869bd393c82184098f1ce099c5c58921c3",
        "sha256:b2d1011c52d1133e8eaa0d34d4e534159d90d1227e36daa6a59d7af7468a9819",
        "sha256:9e28a8c7aca895faf3da7166a9eed22699d6de9b5a07e3d5a9fcf715aa492d73",
        "sha256:65e5f3b064510b7b26b4e044b8b183174837fedd3c10da52429d7c4c5880d025",
        "sha256:009d727a2bee53635180130aed354aa4f374113df92954059a67de202bdcd11c",
        "sha256:f0f977d7680bf0cf0adf0e832eea1a15f14e5bb0c70c4e0dc21d7eb73a527ce1",
        "sha256:87766db388e88ea5ccf08dccdad7e1bf648e0dcc5023d3b63678cb10731db8c8",
        "sha256:878294bd8edc01c1bf1039e7b480951e762d3492eb3f80646b8be5fb19dcb4d6",
        "sha256:2e273a26c38b845c46aafa982995371924337eaf065bf4edca2e0ceab1ade5cd",
        "sha256:ba726f8837856ae8fff0c354db9fcf2b677d01f48266f23acd600d8efedccea5",
        "sha256:3f46b1fda28fd5ee53f833e833bcce137d9a51643c3f39619bb62672aaca304f",
        "sha256:704c49f2101c689a75a8f4403fe709600c5c178c7ab156fe4c77f863f9b9119d",
        "sha256:05ec8ee17e592431f7d07fcc01554eed6f15318af31ebadb67f0a1fa5b6313fc"
      ],
      "chain_head_digest": "sha256:05ec8ee17e592431f7d07fcc01554eed6f15318af31ebadb67f0a1fa5b6313fc",
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
            "max_provider_calls": 2,
            "max_capture_bytes": 16777216,
            "max_items": 5000
          },
          "hard_caps": {
            "tag": "playbill-procedure-hard-caps-v1",
            "max_wall_clock": {
              "tag": "playbill-duration-v1",
              "microseconds": 300000000
            },
            "max_provider_calls": 2,
            "max_capture_bytes": 16777216,
            "max_items": 5000,
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
            "high_water": 112,
            "boundary": "procedure-return",
            "field_path": "summary"
          },
          "provider_calls": 1,
          "capture_bytes": 24935,
          "wall_clock_microseconds": 802733
        }
      },
      "invocation_origin": "line",
      "line_identity": {
        "kind": "Line",
        "name": "security.cve-applicability"
      },
      "line_spec_digest": "sha256:ffe3c6f336c771c8ad2d13855e74af033cf2f735d22a1268de501ee7b9eae154",
      "occurrence_id": "sha256:35276470e431ca868957df0a2c609f62f595cd9187ad9c267d477167bd1995b8",
      "occurrence_evaluation_time": "2026-10-19T21:31:46.272392Z",
      "node_pin_sets": [
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "assessments",
          "pins": [
            {
              "role": "query",
              "target": {
                "kind": "QueryDefinition",
                "name": "security.assessment_index"
              },
              "artifact_digest": "sha256:0eee96188ab6c97709201da08c0a689bb11820f21809fa4c4cffb4d5a24df989"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "changed",
          "pins": []
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "decide",
          "pins": [
            {
              "role": "contract-in",
              "target": {
                "kind": "Contract",
                "name": "security-cve-applicability-request"
              },
              "artifact_digest": "sha256:22e80e2da42813885c6817595f871b601f73d68dcc87d0a60d43d5e704db2033"
            },
            {
              "role": "contract-out",
              "target": {
                "kind": "Contract",
                "name": "security-cve-applicability-result"
              },
              "artifact_digest": "sha256:8f2b762fb25be42aff804b4d1d67cbcebc74dd687b0153d8029ca909821f88ab"
            },
            {
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "security-analysis-provider/9fb12d60e44c593af586d1bc836b99868ec201018aed88fe3b3bb38dadced167"
              },
              "artifact_digest": "sha256:25beb8d75f2c4f3491d26dcc33da3a938e0395446464e8254a2505f284589544"
            },
            {
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "security.cve-applicability/fa65ba8a159a3fedd4114b3cfe0d61f02e950f71dc7cd22f54d9139fc0b6b7ab"
              },
              "artifact_digest": "sha256:4ae58ed19fc0df0e1ac157d4933b78e9326dd5ea49e3f9682a71a35df3832fdf"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "nochange",
          "pins": []
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "propose",
          "pins": []
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "record",
          "pins": [
            {
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "security.cve-record-http-v1"
              },
              "artifact_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2"
            },
            {
              "role": "provider",
              "target": {
                "kind": "Provider",
                "name": "cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b"
              },
              "artifact_digest": "sha256:75f19062850133aa30ca5c2845d590a0025c8a3121a2b518080751e34ceca44c"
            },
            {
              "role": "provider-interface",
              "target": {
                "kind": "ProviderInterface",
                "name": "web.fetch/39b2b0bf01fe44bcbacf533344bfaeeeff70a04480135b1085708956bb9d6a3c"
              },
              "artifact_digest": "sha256:fb9d2c8b26c8c6a6c4425706dd53c2341896ac70cfdc8ce13aca6321aff3dad4"
            }
          ]
        },
        {
          "tag": "playbill-procedure-run-node-pin-set-v1",
          "node_id": "releases",
          "pins": [
            {
              "role": "query",
              "target": {
                "kind": "QueryDefinition",
                "name": "security.release_inventory"
              },
              "artifact_digest": "sha256:3085282fb5583edb323f4f651770a31ab3dcb197d31ae0838b3bf3c8fa7ae7a7"
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
                "name": "security-cve-applicability-summary"
              },
              "artifact_digest": "sha256:3821ac9e4333bf40959ffa5c99163a55030ee67d20f1ed397be8532e203061ff"
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
              "artifact_digest": "sha256:26cb0ddaf2c734b4a07174512398c9c799c4b7a9c25d2856e3c7fde60a60e12d"
            }
          ]
        }
      ],
      "pin_set_digest": "sha256:a57e35f79f50505cb9006a23c330675189a4da014c15d96b9809c5959fd53b57",
      "replay_input_vector": [
        {
          "tag": "playbill-procedure-replay-input-projection-v1",
          "input_name": "assessments",
          "plane": "accepted_state",
          "kind": "query_result",
          "value_or_body_digest": "sha256:b17f5a3561f1be644b84f567db1150c5e7d5fbf559461836509e29733a3f0df8",
          "provenance_digest": "sha256:2fb7f834beb09c81c370caf589a7ac05bcc7dc6bad8107b77db904ad3122dc54"
        },
        {
          "tag": "playbill-procedure-replay-input-projection-v1",
          "input_name": "record",
          "plane": "landed_capture",
          "kind": "capture",
          "value_or_body_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
          "provenance_digest": "sha256:4e2ac33f2f5d4897b2f649abfcf96a417cf050ab1d00174092c2dfd40500dcd8"
        },
        {
          "tag": "playbill-procedure-replay-input-projection-v1",
          "input_name": "releases",
          "plane": "accepted_state",
          "kind": "query_result",
          "value_or_body_digest": "sha256:ce7c0c28037d5e34d4ea61fbb293f5198314557920863cfefdad0d4c06d378cc",
          "provenance_digest": "sha256:7051459a0537c257dfd3d4aef4708baabfeb4e5bdb3959306e28d8b43a8433e7"
        },
        {
          "tag": "playbill-procedure-replay-input-projection-v1",
          "input_name": "watched",
          "plane": "accepted_state",
          "kind": "query_result",
          "value_or_body_digest": "sha256:2fb7bdab8fd50e11cde4467a8e4d6e9c941e8bf9f9620c8ea26c1281cf94a775",
          "provenance_digest": "sha256:1ad9907ef0d3e3b108fd4770d568f5e8e0e53b9ca795547810eef8231fe99709"
        }
      ],
      "deployment_snapshot_digest": "sha256:5458dcd0ad75d8bbbdb190b497ed87a9ad623fdb4e4ae15bc5b88fae279c48af",
      "acquisition_policy_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
      "selection_receipt_digest": null,
      "selection_decision": {
        "tag": "playbill-procedure-selection-decision-v1",
        "policy_digest": "sha256:a0ae3a70065690318057f95af938f4ca567bdb1f2baf487389fe7c69939af1e6",
        "verdict": "selected",
        "decisions": [
          {
            "input_name": "record",
            "disposition": "selected",
            "considered_capture_digests": [
              "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
            ],
            "selected_capture_digests": [
              "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
            ],
            "selected_cursors": [],
            "default_value": null,
            "reason_codes": []
          }
        ],
        "coherence_proof_digest": null
      },
      "selection_decision_digest": "sha256:36ca8ddfa491e1e407d053fbbf67d86977e4d2f1562d2356ca5808c79fb3fb37",
      "resolved_provider_bindings": [
        {
          "tag": "playbill-procedure-provider-binding-v3",
          "node_id": "decide",
          "interface": {
            "kind": "ProviderInterface",
            "name": "security.cve-applicability"
          },
          "interface_digest": "sha256:7553d895e064ebf17d1d80cbbce4d92f039aa36bfc80289f135ac1ded4ea3b28",
          "provider_artifact_digest": "sha256:25beb8d75f2c4f3491d26dcc33da3a938e0395446464e8254a2505f284589544",
          "implementation_digest": "sha256:b7cb1bbf4c34d6f22efe23c4d989df72ec35e26c41fb3e47d8b1759367e8f25d",
          "effect_class": "none",
          "secret_binding_identity_digests": []
        }
      ],
      "sensitivity_policy_digest": "sha256:bcb3647ee1209f2bb9b14f354aa37e8b1a92a3e2347c4560a8960b1e036372fd",
      "mandate_coordinate_digest": "sha256:aa5b1cbb2924ea4d0771860861997853e8781a73c4dfbe7512d81951487c066b",
      "taint_labels": [],
      "epsilon_member": false,
      "admission_material_manifest": {
        "tag": "playbill-procedure-admission-material-v1",
        "members": [
          {
            "tag": "playbill-procedure-admission-material-member-v1",
            "input_name": "record",
            "plane": "landed_capture",
            "semantic_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
            "body_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
            "retention_authority_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
            "body_retention": "required_for_duration",
            "retain_until": "2026-11-18T21:31:46.272392Z",
            "erasure_rule_digest": null
          }
        ]
      },
      "admission_material_manifest_digest": "sha256:0ea233e38fa183b56868aea5f0c5b21bdd76683b95a781fe53c32922e7389bee",
      "acquisition_plan_digest": "sha256:2a3f16846a48f566d6ea56e9e4ce29da92830dca2d2e1c0b38201e19c2b90541",
      "exhaust_access_binding_digest": null,
      "invocation_receipt_digests": [
        "sha256:1eddf628527ed82b7e17f37b7c09c9d97151cde08640bc4931b8aee282c12351"
      ],
      "source_capture_associations": []
    },
    "receipt_digest": "sha256:f179d03fe47b5f63a1293dffa21f101e1acae4971440698199ddec6a4a47ba88",
    "terminal": null,
    "children": [],
    "source_observations": [],
    "terminal_egress": [
      {
        "tag": "playbill-procedure-terminal-egress-v1",
        "node_id": "propose",
        "kind": "propose_change_set",
        "verdict": "delivered",
        "required_authority": "propose",
        "effective_authority": "propose",
        "limiting_term": "procedure_terminal_capability",
        "operation_key": "sha256:e4e03efaa2fa0c2436eb35c3429d70b8709c4817d77c9b68ee0299304b4821bc",
        "procedure_mandate_digest": "sha256:0dc4a28e240905958c534d854f3cbe3bb4b17aac1ebb1e8393101260c491f25c",
        "target_paths": [
          "claims/20/CLM-20a3031c6d56e6817ef398e2724a25a7.json",
          "claims/3c/CLM-3c63f2d9b9ab3328ce017c80513f7295.json",
          "claims/66/CLM-668646ecf8b270454450464a53f4212a.json",
          "claims/82/CLM-82aab5cb0f6bd82e916046c1b0b10d29.json",
          "claims/8e/CLM-8e3979a108f833d3d026632499e534e0.json",
          "claims/a8/CLM-a8f0e5ebe0d59c830dfd78a963da64a8.json",
          "claims/b3/CLM-b32c89868a7d8dda0c22306ede2555de.json",
          "claims/c7/CLM-c7b1aea2651991ecb606b215a98c9a08.json",
          "claims/cb/CLM-cbd32c835b2adaf3209581ada13e4b56.json",
          "claims/d3/CLM-d3fe8dcf73bbce9bc48f159c0fe39c26.json",
          "claims/df/CLM-df5b029f629819e35047abaa5f6644a8.json",
          "claims/eb/CLM-eb475351f8e24416e2d137f46cf5b41d.json",
          "claims/ec/CLM-ec55359f4141d7e3a8027003b4ee4f03.json",
          "claims/fb/CLM-fb87f87fa2fda550ed1babc11ab32553.json",
          "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
          "subjects/security.assessment/apache-log4j2-2.14.1--cve-2021-44228.json"
        ],
        "proposal_id": "sha256:3c6bb6ca1e62758386da41c5907b80d71fd3a3ddf7309f351b26a02c8c0a093c",
        "candidate_digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442",
        "refusal_code": null,
        "children": [
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 0,
            "item_key": "00000000.0dcf505d911ada148306269a2d5217e9",
            "manifest_digest": "sha256:ce1df9ee8c8c4b8bc4f5eaccb7ae4a8b78a99ceb8e77355b1993430cd3858d4c",
            "egress_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
            "path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 1,
            "item_key": "00000001.9c29324bb835dbcd6850d5965d8c9a7f",
            "manifest_digest": "sha256:f63dddb17a33ca27ca83720bf9e4c2d55a3a51a22de7563ac6d33e3c3d5c2f47",
            "egress_digest": "sha256:542385c85f80514b027db82ef19099acf42d14b871ff9055b350449120e813b8",
            "path": "subjects/security.assessment/apache-log4j2-2.14.1--cve-2021-44228.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 2,
            "item_key": "00000002.e330928a2e5abf4a296de4ffd26bdb43",
            "manifest_digest": "sha256:39b66715e4400f3da23a023e009ebaf8db30dad8654cb7d3aef2dddd59c02ea2",
            "egress_digest": "sha256:c0fe353b09da05a5dc1b80856127a277ca0b5e56b71124cc0c17697998eb387e",
            "path": "claims/20/CLM-20a3031c6d56e6817ef398e2724a25a7.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 3,
            "item_key": "00000003.084eec52c9a61ae9d8b35178a9158baf",
            "manifest_digest": "sha256:cdb16dd196a8189eacbff1ab76c3acd04ee9e16e67473f1bc5d1040b334585b1",
            "egress_digest": "sha256:f1202f31068239214dd9c0609b14f5436410dfb7f858140992c127ff37a94467",
            "path": "claims/82/CLM-82aab5cb0f6bd82e916046c1b0b10d29.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 4,
            "item_key": "00000004.73226d55edb7d5b41e6a819c9dd33cba",
            "manifest_digest": "sha256:72fececa183f89942d68e7dd5b334ab9d3e32781bce50994627b85a4b35b0ba9",
            "egress_digest": "sha256:9a7bc0429fc82f57941c9e4f3ca3ad5b2894612f019b6044fb2fa819ec5fac72",
            "path": "claims/3c/CLM-3c63f2d9b9ab3328ce017c80513f7295.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 5,
            "item_key": "00000005.921680b77fc629d5483cf82cf3ecf337",
            "manifest_digest": "sha256:49437b8537b3bf4e0179d033efbd72401d6527f381c90a9eec350f021213f39e",
            "egress_digest": "sha256:27106cfc6f97ed1a1b6641ba38709cb29b128b515b0aba21b3e34b30bf036a61",
            "path": "claims/fb/CLM-fb87f87fa2fda550ed1babc11ab32553.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 6,
            "item_key": "00000006.fb9c894dffa49b4b212cbc3d45547bcc",
            "manifest_digest": "sha256:61be596703c660fa8b4a72caeba0bc2c1abbe41d1d3ff4d65ef25498b16e0291",
            "egress_digest": "sha256:0d768b4cd48168b56e2e98f79283818da43b6e27af5130cf6d9213a6767b8220",
            "path": "claims/eb/CLM-eb475351f8e24416e2d137f46cf5b41d.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 7,
            "item_key": "00000007.9154a3cf26669a7bb54b907fde85147e",
            "manifest_digest": "sha256:4e25984ee64d9193d8cdad22e96b65767363e6110d9abefcc25771ef5a05bcb1",
            "egress_digest": "sha256:1fcc09895d3f8818d58012b95a9a94c1b052468151c2fd68420501a108c1302e",
            "path": "claims/ec/CLM-ec55359f4141d7e3a8027003b4ee4f03.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 8,
            "item_key": "00000008.dcf79e5150826f2ba6891a95d906c400",
            "manifest_digest": "sha256:50006f7e2df1b3bd868c91fe6f850947a2a89a8c858a74089be9b97e6c3e11d4",
            "egress_digest": "sha256:6fe3c77c282bbd8ae8e9dc0c3d087f2f9521ad6b4820f5a3b00f9f895142e77a",
            "path": "claims/df/CLM-df5b029f629819e35047abaa5f6644a8.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 9,
            "item_key": "00000009.1c6ed8326d0d5ba6481e536407f9ffa8",
            "manifest_digest": "sha256:b46bfffefca0bb6ca951e20582d609df11e3f3cb22711ac6a19af546442dbe07",
            "egress_digest": "sha256:ac44d3979a716791c08f5e2fc496333323f1c8c254b6b8436d41eabf64158faa",
            "path": "claims/66/CLM-668646ecf8b270454450464a53f4212a.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 10,
            "item_key": "00000010.41aa2ef3f79ade5d54752b6dc6bbc775",
            "manifest_digest": "sha256:71a1ec1eab7d707ef6cf87516d55bb96d0610ef85d2d7e5678eddbe317bf75d4",
            "egress_digest": "sha256:3e2746f17347a38b662af9ff35e0b7c31bd0ede4422367e0e6873664e47ec4e1",
            "path": "claims/a8/CLM-a8f0e5ebe0d59c830dfd78a963da64a8.json",
            "prior_refusals": []
          },
          {
            "tag": "playbill-procedure-terminal-egress-child-v1",
            "child_index": 11,
            "item_key": "00000011.77a77a3562b800884451d953f2b511c0",
            "manifest_digest": "sha256:756ab77d181aa5ab558562f97c2262eb8d555a2452b84bb4bfee033627dddca3",
            "egress_digest": "sha256:0cdbc3f3a39cef5dad634b9f2b6bb4afdd62253fccc3406d1d24acd9868e9bbe",
            "path": "claims/c7/CLM-c7b1aea2651991ecb606b215a98c9a08.json",
            "prior_refusals": []
          }
        ],
        "journal_coordinate": {
          "tag": "playbill-procedure-journal-coordinate-v1",
          "stream_instance_id": "inst_be4d690f30d64371",
          "journal_family": "procedure-exhaust-v1",
          "stream_id": "procedures",
          "partition_id": "line:f9880a610fa060e85512a2557a96454c13fb0d72b2467f03fc19cbc9cda98e58",
          "sequence": 26,
          "record_digest": "sha256:3f46b1fda28fd5ee53f833e833bcce137d9a51643c3f39619bb62672aaca304f"
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
