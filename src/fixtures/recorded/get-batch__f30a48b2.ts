// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 867e5265
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "ProcedureRun:RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
          "procedure": "Procedure:security.sbom-import",
          "status": "succeeded",
          "nodes_done": 4,
          "nodes_total": 4,
          "started_at": "2026-11-07T18:00:00Z",
          "elapsed_us": 313304,
          "elapsed_basis": "measured_wall_clock",
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
          ],
          "pending_inputs": [],
          "triggered_by": {
            "line": "Line:security.sbom-import.app",
            "occurrence": "sha256:ac34a73a637d6d7fa3d081a03de2c7e609d7d7156528549454ca1f885a6f25f5"
          },
          "actor": "owner",
          "receipt_digest": "sha256:98453211d1dca871fd272ea8842d38dbde2bc33900eb6ee73d9df8769265286d",
          "result": {},
          "outcomes": [
            {
              "sequence": 8,
              "event_kind": "produced_capture",
              "node_id": "sbom",
              "payload_digest": "sha256:9cccec1f7337ccfa90371e71ed7390cc624178235ef2f973ce835b82ba38ffae",
              "capture_event": {
                "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
                "partition_id": "line:805e61032fd79657f0b9d0b1d01df3e795432dec987fd555a098c8f0ff458ec7",
                "sequence": 8,
                "record_digest": "sha256:28b4336e5c7173ca281bd0894de2169bc5908a158a6a6f0a87e7026e2883b823"
              }
            },
            {
              "sequence": 9,
              "event_kind": "node_fired",
              "node_id": "sbom",
              "payload_digest": "sha256:93e5797af434396f397a5fafd074253aa72a8808c4b9a832211a5778e7a407bd"
            },
            {
              "sequence": 14,
              "event_kind": "produced_capture",
              "node_id": "derived",
              "payload_digest": "sha256:bc68279ef2709b769eff3a81a8889e907909878de5e4d7be891531041b68aebc",
              "capture_event": {
                "run_id": "RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5",
                "partition_id": "line:805e61032fd79657f0b9d0b1d01df3e795432dec987fd555a098c8f0ff458ec7",
                "sequence": 14,
                "record_digest": "sha256:90cdc268b34b788fec298b88baf65eb8589d0c0b237b699703af643beef11a06"
              }
            },
            {
              "sequence": 15,
              "event_kind": "node_fired",
              "node_id": "derived",
              "payload_digest": "sha256:ce2f0a1f515964ddcc2a78f63bd41da6ac8d043c2edb48587602f24b424eb20d"
            },
            {
              "sequence": 16,
              "event_kind": "node_fired",
              "node_id": "listed",
              "payload_digest": "sha256:7595980c6fe1d4e7b107f76fcbaa6f2e800e9bde11705dee3d4f314f2cbd1346"
            },
            {
              "sequence": 29,
              "event_kind": "node_fired",
              "node_id": "write",
              "payload_digest": "sha256:2dbc8a417d74ccd12ddd5285c1db8a81fab520a7930d1efb13197c6c9a494ab8"
            },
            {
              "sequence": 30,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:89c9ab2bf310c9a35f725bc9406c0fdc069ca21c05c26719860c6149f08db6c4"
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
          "next": [
            "cx.get(\"Procedure:security.sbom-import\")",
            "cx.get(\"Line:security.sbom-import.app\")",
            "cx.get(\"ProcedureRun:RUN-06a82721dc12f812771d74d2c0889434136090b85c3c1e8348a2afbfb8796cf5\", detail=\"proof\")"
          ]
        },
        "coordinate": {
          "git_oid": "30e90cc6ad34",
          "generation": 22
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "30e90cc6ad34",
            "generation": 22
          },
          "fields": [
            "card"
          ]
        },
        "evaluation_time": "2026-11-08T19:48:02.011579Z"
      }
    ]
  }
});
