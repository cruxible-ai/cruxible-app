// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch da1fe106
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "ProcedureRun:RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d",
          "procedure": "Procedure:security.cve-applicability",
          "status": "succeeded",
          "nodes_done": 8,
          "nodes_total": 9,
          "started_at": "2026-10-19T21:31:46.272392Z",
          "elapsed_us": 802733,
          "elapsed_basis": "measured_wall_clock",
          "nodes": [
            {
              "node": "record",
              "kind": "source",
              "verdict": "succeeded",
              "sequence": 3
            },
            {
              "node": "releases",
              "kind": "state_tap",
              "verdict": "succeeded",
              "sequence": 4
            },
            {
              "node": "watched",
              "kind": "state_tap",
              "verdict": "succeeded",
              "sequence": 5
            },
            {
              "node": "assessments",
              "kind": "state_tap",
              "verdict": "succeeded",
              "sequence": 6
            },
            {
              "node": "decide",
              "kind": "call",
              "verdict": "succeeded",
              "sequence": 9
            },
            {
              "node": "summary",
              "kind": "project",
              "verdict": "succeeded",
              "sequence": 10
            },
            {
              "node": "changed",
              "kind": "guard",
              "verdict": "succeeded",
              "sequence": 12
            },
            {
              "node": "propose",
              "kind": "propose_change_set",
              "verdict": "succeeded",
              "sequence": 27
            }
          ],
          "pending_inputs": [],
          "triggered_by": {
            "line": "Line:security.cve-applicability",
            "occurrence": "sha256:35276470e431ca868957df0a2c609f62f595cd9187ad9c267d477167bd1995b8",
            "enablement": "a84224fdf92640a79139cd64d3ec745e",
            "principal_kind": "principal_claim",
            "enabled_by": "gate-owner"
          },
          "actor": "gate-owner",
          "receipt_digest": "sha256:f179d03fe47b5f63a1293dffa21f101e1acae4971440698199ddec6a4a47ba88",
          "result": {
            "affected": 1,
            "changed": 12,
            "cve_id": "CVE-2021-44228",
            "inconclusive": 1,
            "judged": 0,
            "not_affected": 2,
            "unchanged": 0
          },
          "outcomes": [
            {
              "sequence": 3,
              "event_kind": "node_fired",
              "node_id": "record",
              "payload_digest": "sha256:2c43286fc1eb7e093404df8e3e0857c96dcb975313e16bbde2f6a3286034bcfc"
            },
            {
              "sequence": 4,
              "event_kind": "node_fired",
              "node_id": "releases",
              "payload_digest": "sha256:c0f81462879991452f3c62e026f199c70e0b08c89ecb1439611598d3faf0b567"
            },
            {
              "sequence": 5,
              "event_kind": "node_fired",
              "node_id": "watched",
              "payload_digest": "sha256:cc7ce505fb2b9c890463153a0dfcd8dd73c4c5a231242e988f5d20ace6a0ec3a"
            },
            {
              "sequence": 6,
              "event_kind": "node_fired",
              "node_id": "assessments",
              "payload_digest": "sha256:85d5dd3eef45346831614f71ede7bcbf5da2aa3f10d0d99b421a218a4a4b68b1"
            },
            {
              "sequence": 9,
              "event_kind": "node_fired",
              "node_id": "decide",
              "payload_digest": "sha256:fb7cc48910e2cddccff1519f534f98a344861490b553102e1213bc2f3ed6f751"
            },
            {
              "sequence": 10,
              "event_kind": "node_fired",
              "node_id": "summary",
              "payload_digest": "sha256:c6d9b6d7204106c4786f27db0495a1d1edadd0bf11fda838c417a975d3494eba"
            },
            {
              "sequence": 12,
              "event_kind": "node_fired",
              "node_id": "changed",
              "payload_digest": "sha256:736bc91a65ae272fcc374f31e805234f7d26e99ff3245f2fee2b6e17c2ed980b"
            },
            {
              "sequence": 27,
              "event_kind": "node_fired",
              "node_id": "propose",
              "payload_digest": "sha256:79bdbd771a6446db2bbb51d7908dd7de797e15e9c338ff1dc0e26db331c9c2cf"
            },
            {
              "sequence": 28,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:d2b6f079e0a30c2906ee91d88f1a3bc8d6bada144f7719cf186a31042157c7dc"
            }
          ],
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
          ],
          "next": [
            "cx.get(\"Procedure:security.cve-applicability\")",
            "cx.get(\"Line:security.cve-applicability\")",
            "cx.get(\"ProcedureRun:RUN-8748d49f00f18b286e9699acc7c02a9bbd0874041c95220b43cb1209fc13812d\", detail=\"proof\")"
          ]
        },
        "coordinate": {
          "git_oid": "97040dbfdd1e",
          "generation": 58
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "97040dbfdd1e",
            "generation": 58
          },
          "fields": [
            "card"
          ]
        },
        "evaluation_time": "2026-10-19T22:13:04.457652Z"
      }
    ]
  }
});
