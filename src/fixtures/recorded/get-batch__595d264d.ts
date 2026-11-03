// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 1afa7ebb
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4"
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
        "ref": "ProcedureRun:RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4",
          "procedure": "Procedure:security.epss-triage",
          "status": "succeeded",
          "nodes_done": 5,
          "nodes_total": 5,
          "started_at": "2026-11-03T00:58:54.573196Z",
          "elapsed_us": 1537875,
          "elapsed_basis": "measured_wall_clock",
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
                  "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
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
                "rows": 10
              }
            },
            {
              "node": "watch_keys",
              "kind": "transform",
              "verdict": "succeeded",
              "sequence": 10,
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
              "sequence": 11,
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
              "sequence": 44,
              "summary": {
                "kind": "claims",
                "written": 30,
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
          ],
          "pending_inputs": [],
          "triggered_by": {
            "line": "Line:security.epss-triage",
            "occurrence": "sha256:34fe82ad9ea31a0a3a3ff7e0daf1f0022233bf217d6bfb0d2a3ed8d38fac70c4"
          },
          "actor": "pilot-owner",
          "receipt_digest": "sha256:7c4b77d5652a8fbee868a97e808ab7d05c7625181b2277b32289468abb17aefa",
          "result": {},
          "outcomes": [
            {
              "sequence": 7,
              "event_kind": "produced_capture",
              "node_id": "scores_api",
              "payload_digest": "sha256:49bd024d258f0d574805200201c8b0d0c2c52abcfe77b6d3532f18d7270a8244",
              "capture_event": {
                "run_id": "RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4",
                "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
                "sequence": 7,
                "record_digest": "sha256:973a3081fa1fc92701db36f3d2569beb55346d0c623faf5589eb23419435fd23"
              }
            },
            {
              "sequence": 8,
              "event_kind": "node_fired",
              "node_id": "scores_api",
              "payload_digest": "sha256:4a587bdc794d923a1e99eb1f4a927309b28a8c772815b61f4ca5293432f9bfbe"
            },
            {
              "sequence": 9,
              "event_kind": "node_fired",
              "node_id": "watched",
              "payload_digest": "sha256:e7c0faba6079a89ff417d0b4ae9a513cb221cd64652197a41681a0482346a707"
            },
            {
              "sequence": 10,
              "event_kind": "node_fired",
              "node_id": "watch_keys",
              "payload_digest": "sha256:fc036dc431e5c70f7751e51e578ed2279572edb11ce577c24079d137381c0aa5"
            },
            {
              "sequence": 11,
              "event_kind": "node_fired",
              "node_id": "scores",
              "payload_digest": "sha256:b79740e247b2a502f3fdb3f94859336034e40c864d702a4eb266d675e9bd95f2"
            },
            {
              "sequence": 44,
              "event_kind": "node_fired",
              "node_id": "write",
              "payload_digest": "sha256:ca35ebb1537d8dc503f08f461bb12274c7aedeff00236db465f2560b223b291d"
            },
            {
              "sequence": 45,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:60cd858ea26632e764ea3c1023d093f02fa61ebf95e4714386e533f9c80b0e64"
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
              "operation_key": "sha256:356a7a809686fb33aa167eec5cbf8ab587d910cd25f2743ca1f934ca9526cee7",
              "procedure_mandate_digest": "sha256:087121114c903e075a5af585b37ab3cfbd5301c497846accfb36c57e45b437b5",
              "target_paths": [
                "claims/06/CLM-0643b623d53bc341e4ce73302509a6d8.json",
                "claims/08/CLM-08474610f2820081ba9aba71fd69f05f.json",
                "claims/0b/CLM-0b915ccfb90fa143634a556606b3138f.json",
                "claims/10/CLM-101186fdb5cf6a0b627f10ece8f2fe20.json",
                "claims/25/CLM-2563da5e7c5f4a2880d488a30bc8aeb8.json",
                "claims/2c/CLM-2c034ee9dc396f67452410972bb98664.json",
                "claims/2c/CLM-2c559d9ffa815754e4723c04144f4e90.json",
                "claims/36/CLM-3610bd271ea3f895fd1b4cf529f4e9f7.json",
                "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json",
                "claims/45/CLM-4511b29cdb22b5e7cdfb1dfc0389606b.json",
                "claims/4d/CLM-4df58eb72bec4dee52bb30b8e4add839.json",
                "claims/50/CLM-5051bb5ab5bdb80237a10647d01da1e8.json",
                "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json",
                "claims/58/CLM-58325fbdd5bff786556a30110917b174.json",
                "claims/61/CLM-610a77949e602c3fef982e0288fe2735.json",
                "claims/67/CLM-672ebf5cf0ad4bc0347122365cbe0ca2.json",
                "claims/6a/CLM-6a349dfab5a909d105d645defb3ff369.json",
                "claims/6d/CLM-6d420817c821fc09e8a191c036374799.json",
                "claims/70/CLM-70e677cf193f6f3445d8b2243e1c1bfc.json",
                "claims/83/CLM-83343aa00c2daeaaa660aff3c675e79a.json",
                "claims/83/CLM-83df7ec10f3dc98f8c7c9dddd97ef4b3.json",
                "claims/91/CLM-912147bf8d9528ee51018115082a5a4d.json",
                "claims/92/CLM-923bfe61a7bb723a636a86fe7cc6bdb4.json",
                "claims/b0/CLM-b06137d17d73d74aa9025958e367c5f3.json",
                "claims/b1/CLM-b1852c865047b78ec7df433c70f6cef5.json",
                "claims/bd/CLM-bd18e9d73508c2538ecc837201a7a684.json",
                "claims/bd/CLM-bd5d6bde10d4d1daf0e15d0a03a5c40d.json",
                "claims/c5/CLM-c5c8494d72033ba64795a82b545cb4c1.json",
                "claims/e0/CLM-e0d001bfa037b46ba807400b28663877.json",
                "claims/fc/CLM-fce8d312fa8d5eda08946b050a9f42fc.json"
              ],
              "proposal_id": "sha256:1898312b0999a9a7823b8d23dea6b1c913aa1db07151f698fb25e627ff7df8eb",
              "candidate_digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3",
              "refusal_code": null,
              "children": [
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 0,
                  "item_key": "00000000.ace616de4cbd8c666d65ef25b95fabd2",
                  "manifest_digest": "sha256:7f1dec6e3747426e76f5b73059465d58abb4ba974c66ec45a1d9c2880c009f4e",
                  "egress_digest": "sha256:844bea1b084844d033b55e35cb8dcd4e183e402ee1b2217cd51e1846c2af55cd",
                  "path": "claims/0b/CLM-0b915ccfb90fa143634a556606b3138f.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 1,
                  "item_key": "00000001.a3b986881c041ba9e495bc408e9cb016",
                  "manifest_digest": "sha256:8d3115367476fb3d7ecbf04d61074f2e6b85ee8a244a63ed98342c8d24e3f401",
                  "egress_digest": "sha256:82881fb572190bacec8bba4bd2e19249ca739f0d63f70b55630aa55082f64574",
                  "path": "claims/06/CLM-0643b623d53bc341e4ce73302509a6d8.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 2,
                  "item_key": "00000002.baba0f97f1278be81b57ed51d5f5cb5b",
                  "manifest_digest": "sha256:f9fd3c0f448a4b2cd1982ac51152a71f48702255deb66ab13cf770bb4eb1f1fd",
                  "egress_digest": "sha256:ffed348ac497c98f7a4e9e1283e1648955dd751c9e28faa5ae384b03e23c995f",
                  "path": "claims/36/CLM-3610bd271ea3f895fd1b4cf529f4e9f7.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 3,
                  "item_key": "00000003.3bb9a01cfd57fabfb696d4a284a691ed",
                  "manifest_digest": "sha256:f883d57f979d815f641ec5ca7d871d73332bb56592fec281255fa6dc7927b88e",
                  "egress_digest": "sha256:a1976805bd6a3aa3cee3398ba4bc390c2313032549b974a13816c01d1a1628da",
                  "path": "claims/08/CLM-08474610f2820081ba9aba71fd69f05f.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 4,
                  "item_key": "00000004.7e7cb60e4053b4c328b40545f7eae944",
                  "manifest_digest": "sha256:50186908f576bb464f8e0882850abc138e2375234f2791b178c1531b13471549",
                  "egress_digest": "sha256:1b5c028dd02876a5f320b4fcbbf2f7c937ff30e04bc9b543d6ac813f22cdd5c7",
                  "path": "claims/c5/CLM-c5c8494d72033ba64795a82b545cb4c1.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 5,
                  "item_key": "00000005.1eb54b8897e1c30d304ceab9b06c7a47",
                  "manifest_digest": "sha256:82ff28850c30bc7eb9542b546fae192980de69fbca884cfec7e1c0352ef89996",
                  "egress_digest": "sha256:a8719336af33071ce6ad5fc32d6a8c680444753a289c5fb2be14db7e2ef01037",
                  "path": "claims/25/CLM-2563da5e7c5f4a2880d488a30bc8aeb8.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 6,
                  "item_key": "00000006.e89ec6be233933b0458721f5e799cd06",
                  "manifest_digest": "sha256:e1c67baea1ad62be40e2ab5826866b958fdf1872f422abf6c62fac8bd8cec0e5",
                  "egress_digest": "sha256:17c4119cf3d2adf4b90eed4c5969ea673d9980a2107a8562e3ee39bf67d4fb5f",
                  "path": "claims/92/CLM-923bfe61a7bb723a636a86fe7cc6bdb4.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 7,
                  "item_key": "00000007.478441ca304abc17dfc2e1a3725f7f30",
                  "manifest_digest": "sha256:e58a4929acb84900740c3971cf70a2eae6ad6c685b4ae413f6001c753f4b8aba",
                  "egress_digest": "sha256:8a642e534fda0241c438e91672bd3f73fa10225ed0597bc1b6fd11d4a4f5c970",
                  "path": "claims/50/CLM-5051bb5ab5bdb80237a10647d01da1e8.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 8,
                  "item_key": "00000008.9f7eaf3737157b3a24c595462a6ae260",
                  "manifest_digest": "sha256:a797bf7ec2298a94bad272eaed80c1516b48485396eada31b6f59f89a344585b",
                  "egress_digest": "sha256:7fe6f50655fbd04dcb9e0d19660aeab16172ed483ce3a1504d09f7d5fae62e08",
                  "path": "claims/2c/CLM-2c559d9ffa815754e4723c04144f4e90.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 9,
                  "item_key": "00000009.f7d7b6a933e91888e0af12db77f3787c",
                  "manifest_digest": "sha256:4a964be54e811c968943188d9303437330fcc7094342526b020712cd44082c3a",
                  "egress_digest": "sha256:1ed27bb95f57f92aaec309832f14bca6e6632e264d6932ada96932b3a914f5e1",
                  "path": "claims/83/CLM-83df7ec10f3dc98f8c7c9dddd97ef4b3.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 10,
                  "item_key": "00000010.df6b6607548c76d5f52b740c25c03a4b",
                  "manifest_digest": "sha256:a036b58204df15014864589249adbd11ae033acd7b8fc0cf404abfeed1b54cc0",
                  "egress_digest": "sha256:6e22935e8504499fa57f7b7ee2b24dff89101f7474541725c4d4226dc1fb3fe6",
                  "path": "claims/fc/CLM-fce8d312fa8d5eda08946b050a9f42fc.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 11,
                  "item_key": "00000011.ad7626f3a2b39741594979bfe0b55b29",
                  "manifest_digest": "sha256:64c8e48e4857bd847a77143ff5e497efd1a95a0b12b9f23b45f56cd004beec7c",
                  "egress_digest": "sha256:75e8d1e11d3d692afe9ff84ccd0de18108a262c1fefef6df70d4dfef508809b7",
                  "path": "claims/bd/CLM-bd18e9d73508c2538ecc837201a7a684.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 12,
                  "item_key": "00000012.04ccb34bd7b2f2e8a8308994ac4a1a13",
                  "manifest_digest": "sha256:c4c6a126bbcb4df387d9b6b2f4603540a538b181eefe5de9fd14b2c7b65266ac",
                  "egress_digest": "sha256:0d60f5d6ec5d2c75cb9123163bd415e69df4cfd603fe10688b49a17b4c8547f5",
                  "path": "claims/b0/CLM-b06137d17d73d74aa9025958e367c5f3.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 13,
                  "item_key": "00000013.9262019f753838e78ea517d8e968add5",
                  "manifest_digest": "sha256:9dcb09b6c00d4257335cbb96974b4d063aa6869948877c014c923db41db7b8f4",
                  "egress_digest": "sha256:30ffe6597a11716416e163915c07d6881ac87a98963211088d46bc37f4013ca0",
                  "path": "claims/83/CLM-83343aa00c2daeaaa660aff3c675e79a.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 14,
                  "item_key": "00000014.52eb5123ee3a64f480c1f1b1873fc468",
                  "manifest_digest": "sha256:4531f8bbe85b7d315874a06ff0f38fd4df93a646803b3ced1b1c5e6ad013dcf2",
                  "egress_digest": "sha256:5ddc1de9b53243bccdb12aba063110329e1e9585c6b5a7bd84928696272c9f02",
                  "path": "claims/e0/CLM-e0d001bfa037b46ba807400b28663877.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 15,
                  "item_key": "00000015.e42ac4efe67ae4c1b076e1d38e84b8a8",
                  "manifest_digest": "sha256:000dd0f833ccee961a716febe4c583c6532a0e41940c5f3481f9a8e202bf470e",
                  "egress_digest": "sha256:aef6e8cd27bfab283f0eead4275a9bfebfa643fcaa67cfe40f57092a09e008e7",
                  "path": "claims/45/CLM-4511b29cdb22b5e7cdfb1dfc0389606b.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 16,
                  "item_key": "00000016.a665df9b2b3645a5a5e9b4be64184599",
                  "manifest_digest": "sha256:f9effb5486ba58cf811f8304257cdf315c89c02badc27f320822832343904641",
                  "egress_digest": "sha256:6159186ddec7ac6794bced87c8cd3ff6795d21b386e34c6a25f7662e3ce2cb25",
                  "path": "claims/4d/CLM-4df58eb72bec4dee52bb30b8e4add839.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 17,
                  "item_key": "00000017.396c0932b405b0b8cdec2e362cafe4a9",
                  "manifest_digest": "sha256:61faf0905ed177f991d783688f1350ea30ad7381960970bc9f1b92ed80e0074c",
                  "egress_digest": "sha256:f2601b89ea213429dd85163bd03f108b0ab5660c27e8ee14bf7c7f6b6d9a12bb",
                  "path": "claims/b1/CLM-b1852c865047b78ec7df433c70f6cef5.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 18,
                  "item_key": "00000018.1b080915302b7e040b45d155311c95f8",
                  "manifest_digest": "sha256:f8cd2c4e4713fe04fdafd3bcee244eaee4c4a244b1fb8ac524c121279dec8aed",
                  "egress_digest": "sha256:375649b6f29925d4c5ad0281a4d5b1990a668e9b555102aebf9139efb55eba38",
                  "path": "claims/70/CLM-70e677cf193f6f3445d8b2243e1c1bfc.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 19,
                  "item_key": "00000019.46aa0889c159d93ea2e822dbc6ae3d5d",
                  "manifest_digest": "sha256:90cd26f856334ae85cfc60dfa61a2e243325d8cb3f1806e5f6452f7f0708c68f",
                  "egress_digest": "sha256:c1b9c6f1688d27f1393c8debe79864805277d17dc70eabf913b237d44a9d9475",
                  "path": "claims/67/CLM-672ebf5cf0ad4bc0347122365cbe0ca2.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 20,
                  "item_key": "00000020.8c9a6d45748b2f8531cfa48ea7a348e8",
                  "manifest_digest": "sha256:e9b2e9a4174a91e26f9c200da37e1d0b22a92e204c9838921820d12f3f726926",
                  "egress_digest": "sha256:1109804eeee0efce5247284a3dd98b763d9bc08e3888540a842b7eaf42e5bb4e",
                  "path": "claims/6d/CLM-6d420817c821fc09e8a191c036374799.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 21,
                  "item_key": "00000021.5c4e1751fe3d95610e104c017540f01d",
                  "manifest_digest": "sha256:1f767a98a6cce0d98d0d3ec66dd2d378ed7473090f2a53f1be05336fd0be5a6e",
                  "egress_digest": "sha256:870cff3e4cbd1435db8fa8262e158b812373b6449f9931d380fe2d2637e4211f",
                  "path": "claims/91/CLM-912147bf8d9528ee51018115082a5a4d.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 22,
                  "item_key": "00000022.862cf48a8ce8c0a97eb2d2a9bef72875",
                  "manifest_digest": "sha256:04b087a840276b56d901d769f5b2b55460b9297e230037823dc7f95a33d122d7",
                  "egress_digest": "sha256:e02c67afb4a47e1f069b4b1e539397e46f1ac95d0199a25d1eb83231eabf157f",
                  "path": "claims/2c/CLM-2c034ee9dc396f67452410972bb98664.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 23,
                  "item_key": "00000023.3e6bf4d6708a403a17ef9c980ac8d5f7",
                  "manifest_digest": "sha256:e4362ceea97be1a8074840b98fed2d96740d24eb30652813f1370017a423e611",
                  "egress_digest": "sha256:5eb609e33c5d684d1bf00693b9102a8fbbf39c47e3583d76f90480c1efacb588",
                  "path": "claims/bd/CLM-bd5d6bde10d4d1daf0e15d0a03a5c40d.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 24,
                  "item_key": "00000024.888411ec29ee1d1e74d9dd6c1dfe1254",
                  "manifest_digest": "sha256:6a3dc5e4489924caa10c9af5beb2c53ad05b8b3611cd6d4ae1e7379408aa84c1",
                  "egress_digest": "sha256:f3baeaf1fa78c36d56021b3ad54a3d788fed943cbc83fad818689cbe52cdcbaa",
                  "path": "claims/10/CLM-101186fdb5cf6a0b627f10ece8f2fe20.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 25,
                  "item_key": "00000025.7528e1b780949c9385c3b3aeb7bb2f17",
                  "manifest_digest": "sha256:4a24580dbdba25d736d79ea961548479e3834b09f42a220365e8d8440fe4ae03",
                  "egress_digest": "sha256:132e0375ca89b9ad4315b642f69c901bc7196f323406faea0b4517775029e5e6",
                  "path": "claims/6a/CLM-6a349dfab5a909d105d645defb3ff369.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 26,
                  "item_key": "00000026.9359e14286b726867a831e19641893f6",
                  "manifest_digest": "sha256:969d0da880032fa753c854c1b69ca418957ddea78b2977b18dbfa178f7e5cf12",
                  "egress_digest": "sha256:55f92a8dfca58645ee29dee06b62b2e715b204952b1994b881d12ea267554d88",
                  "path": "claims/61/CLM-610a77949e602c3fef982e0288fe2735.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 27,
                  "item_key": "00000027.d833493cb73099e0cab73ab014ec481c",
                  "manifest_digest": "sha256:ec88c2479dcccbd44838a49a5349af6deb7355c7a59f92f0c3a3ae3a35ea06df",
                  "egress_digest": "sha256:a86716644b8626bc1142b98ff9aebdfe88bad19f18e4dcc068e2dadaefd3b6fe",
                  "path": "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 28,
                  "item_key": "00000028.71d89745d7474283213be62abd206694",
                  "manifest_digest": "sha256:0d518b09933d4ec149cc0732c745bed331573b7217d9d1b5ef329dc767e0397f",
                  "egress_digest": "sha256:106fb6f216d4ba669b6cf88a7ccca6c0f2bfdbead6222326fdc334ba71c996ce",
                  "path": "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 29,
                  "item_key": "00000029.2c8bc92438175d96252f95144523983a",
                  "manifest_digest": "sha256:cd918529bcdfafbcab3e2493fdab9dc6c7ea9f6c21b75162fcf4a726717ba1b8",
                  "egress_digest": "sha256:8255bb4ce2293e9b9f92ff45125422c3a07c242632687bf089cc90b0db522201",
                  "path": "claims/58/CLM-58325fbdd5bff786556a30110917b174.json",
                  "prior_refusals": []
                }
              ],
              "journal_coordinate": {
                "tag": "playbill-procedure-journal-coordinate-v1",
                "stream_instance_id": "inst_d8e6dcb48e6a4d0d",
                "journal_family": "procedure-exhaust-v1",
                "stream_id": "procedures",
                "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
                "sequence": 43,
                "record_digest": "sha256:6ffb31e35df487c4971f0c6563f53ff8b961edeb42c1d5ae7260671c567ecab2"
              },
              "settle_outcome": "settled",
              "accepted_git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
              "fallback_reason": null,
              "outside_scope": [],
              "capped_by": null,
              "prior_refusal_coverage": null
            }
          ],
          "next": [
            "cx.get(\"Procedure:security.epss-triage\")",
            "cx.get(\"Line:security.epss-triage\")",
            "cx.get(\"ProcedureRun:RUN-8a5dbdc84ce4214d4ab3719107de9aac20950346fd3da947dd70a1279ad0c9f4\", detail=\"proof\")"
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
        "evaluation_time": "2026-11-03T02:20:50.092059Z"
      }
    ]
  }
});
