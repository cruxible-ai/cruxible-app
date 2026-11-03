// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 4bf681f9
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "ProcedureRun:RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305",
          "procedure": "Procedure:security.epss-triage",
          "status": "succeeded",
          "nodes_done": 5,
          "nodes_total": 5,
          "started_at": "2026-11-03T00:58:59.674323Z",
          "elapsed_us": 780765,
          "elapsed_basis": "measured_wall_clock",
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
          ],
          "pending_inputs": [],
          "triggered_by": {
            "line": "Line:security.epss-triage",
            "occurrence": "sha256:4f09053d842ebfb1edc9c966d91eda6b89ee5f4a3867255fd79e4ce5571ba671"
          },
          "actor": "pilot-owner",
          "receipt_digest": "sha256:61da6d84bffacd509aba1d5a3212c5d59e4c4542d7585ce7c04ec30c435ed04f",
          "result": {},
          "outcomes": [
            {
              "sequence": 52,
              "event_kind": "produced_capture",
              "node_id": "scores_api",
              "payload_digest": "sha256:79f40e54fb4721974c23d08d83bfe8058adb0c03e5d4b3bfdf0534f4ea97f7d7",
              "capture_event": {
                "run_id": "RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305",
                "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
                "sequence": 52,
                "record_digest": "sha256:2d2811f20d77d7a532a571549940561f6b5fca20907cb8aad32c99b50ac8f4ea"
              }
            },
            {
              "sequence": 53,
              "event_kind": "node_fired",
              "node_id": "scores_api",
              "payload_digest": "sha256:3ca56f4fe73ad81e09cb6a773d11bd5c648910a89edb56154cdb25275c3a7824"
            },
            {
              "sequence": 54,
              "event_kind": "node_fired",
              "node_id": "watched",
              "payload_digest": "sha256:e7c0faba6079a89ff417d0b4ae9a513cb221cd64652197a41681a0482346a707"
            },
            {
              "sequence": 55,
              "event_kind": "node_fired",
              "node_id": "watch_keys",
              "payload_digest": "sha256:fc036dc431e5c70f7751e51e578ed2279572edb11ce577c24079d137381c0aa5"
            },
            {
              "sequence": 56,
              "event_kind": "node_fired",
              "node_id": "scores",
              "payload_digest": "sha256:b79740e247b2a502f3fdb3f94859336034e40c864d702a4eb266d675e9bd95f2"
            },
            {
              "sequence": 89,
              "event_kind": "node_fired",
              "node_id": "write",
              "payload_digest": "sha256:eaac153652207a01aa07a49937d20b7927bd64ebc8f682cddb872fdbd6f350bc"
            },
            {
              "sequence": 90,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:e11b0c0aecd6d9f4079a80b482649ed6ca1d08f43660daa279d9b39921de0181"
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
          "next": [
            "cx.get(\"Procedure:security.epss-triage\")",
            "cx.get(\"Line:security.epss-triage\")",
            "cx.get(\"ProcedureRun:RUN-90d01481cbef78449562fcba6032c844daeac707042b2271bcc991f690e15305\", detail=\"proof\")"
          ]
        },
        "coordinate": {
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "live": {
          "tag": "playbill-live-view-v1",
          "as_of": {
            "git_oid": "7f513078c490",
            "generation": 10
          },
          "fields": [
            "card"
          ]
        },
        "evaluation_time": "2026-11-03T02:20:51.668466Z"
      }
    ]
  }
});
