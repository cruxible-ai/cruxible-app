// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 71301062
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514"
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
        "ref": "ProcedureRun:RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
          "procedure": "Procedure:security.kev-triage",
          "status": "succeeded",
          "nodes_done": 4,
          "nodes_total": 4,
          "started_at": "2026-11-03T00:58:48.471271Z",
          "elapsed_us": 4850343,
          "elapsed_basis": "measured_wall_clock",
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
                  "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
              "node": "entries",
              "kind": "extract",
              "verdict": "succeeded",
              "sequence": 10,
              "summary": {
                "kind": "extract",
                "records": 1766,
                "invalid_records": 0,
                "duplicates": 0,
                "invalid_fields": 0,
                "complete": true,
                "complete_when": {
                  "count_at": "/count",
                  "expected": 1766,
                  "observed": 1766,
                  "held": true
                }
              }
            },
            {
              "node": "write",
              "kind": "claims",
              "verdict": "succeeded",
              "sequence": 47,
              "summary": {
                "kind": "claims",
                "written": 32,
                "revised": 0,
                "inverse_written": 2,
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
            "line": "Line:security.kev-triage",
            "occurrence": "sha256:5eb6284995ebf6018dee807723ba0b67a9235844ca9edaa5146eecfd26662074"
          },
          "actor": "pilot-owner",
          "receipt_digest": "sha256:f34a1ce3a59b4429a7c8b2b46d8400b60a8c0f1f8ebb290f696855b152c61cb2",
          "result": {},
          "outcomes": [
            {
              "sequence": 7,
              "event_kind": "produced_capture",
              "node_id": "catalog",
              "payload_digest": "sha256:3fe3f1ab3696415bd9871ce34e4c0d6f5ed8f6eb5ec58658fae0aa6bf1356376",
              "capture_event": {
                "run_id": "RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514",
                "partition_id": "line:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
                "sequence": 7,
                "record_digest": "sha256:a7be0469b908d6fe7d2d35174c070c3e40295ee9faf9b3a558c7e1090fa650e5"
              }
            },
            {
              "sequence": 8,
              "event_kind": "node_fired",
              "node_id": "catalog",
              "payload_digest": "sha256:ef81d158c93a0c6879b89d129e9cbc6255147f95049880be3bdd691d83af10cb"
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
              "node_id": "entries",
              "payload_digest": "sha256:bcad99ef49a596c4f79c866de471e66e1896fcacc6f26f36782007733243860e"
            },
            {
              "sequence": 47,
              "event_kind": "node_fired",
              "node_id": "write",
              "payload_digest": "sha256:45bb9f51004b37bf415e668c2dc78c4bc23b3e7157292431fbbdda553763442f"
            },
            {
              "sequence": 48,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:c96ca2b896673cba0f2143ecec9d7395214b955d7a59e748a86e6fda75335e75"
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
              "operation_key": "sha256:2b4c7ab1a4c830ced83784ab397f1bf6b3337260fa72ff8625baf8ae1d932c26",
              "procedure_mandate_digest": "sha256:f655a12d200eecb67143d499d09f6d16067049d2335d1bec0ad14da72e5c2e26",
              "target_paths": [
                "claims/01/CLM-0173d827b066541d388ec3ee6c909907.json",
                "claims/01/CLM-01c64bf0ccf601c73fb5d9e48000da68.json",
                "claims/07/CLM-07e2523e79d50bba041f0fa492be4ca1.json",
                "claims/0a/CLM-0a1e056fd6a201a37d010031c94e2c44.json",
                "claims/0b/CLM-0bee18e34962365ca30ea6da3b0b7277.json",
                "claims/12/CLM-12c364b5fbc11638bf6980fef83d7588.json",
                "claims/15/CLM-152f2406ffa3a32588dced1cde97b73c.json",
                "claims/17/CLM-177af6df24a732c72ed8c7acadd7c55f.json",
                "claims/20/CLM-209643542f5a95a150f993a1e3ba2123.json",
                "claims/21/CLM-21aba7f86e63c712d490f516c283bd68.json",
                "claims/30/CLM-30255eec7ddf7f503364165a9064c0b0.json",
                "claims/3f/CLM-3f6b80fb033f0d7166cec0884675bed1.json",
                "claims/3f/CLM-3f8684f0274ff24aea88562eeb6325d0.json",
                "claims/45/CLM-451fc26cb4344c5253459630a039526b.json",
                "claims/54/CLM-54671d178d5d851bc9838e2b28c1aedc.json",
                "claims/56/CLM-564e79925ecc63bdc6891c631a54855f.json",
                "claims/65/CLM-65471ed24f3c502ccbf845d20373af7f.json",
                "claims/65/CLM-65c923eaaea18ff84416d7753c4c8a5a.json",
                "claims/73/CLM-73f152cd6eb8478d4388a9dd23a95bca.json",
                "claims/86/CLM-860b75b55b2444f9ae5bc16d8a596cf1.json",
                "claims/8c/CLM-8c170a81886a7384663c02c35ce7f965.json",
                "claims/99/CLM-99f7d94306a1c9859b9159048faa11d2.json",
                "claims/9c/CLM-9c9dcad72dd788abd42f0fb68224add9.json",
                "claims/a1/CLM-a1241eb46fd7481831f246d6b99b2320.json",
                "claims/a4/CLM-a4469c2acfb762a32d395e01fddf7d81.json",
                "claims/a5/CLM-a5feef846323fbf1ee6839e6cc7b6b95.json",
                "claims/b7/CLM-b7eb930d785b6434da97a1d851cf317c.json",
                "claims/c3/CLM-c3a2b8bb89cbce7bab07604bd9acbf78.json",
                "claims/c8/CLM-c899c993589b6485b057c0436b4eae23.json",
                "claims/cf/CLM-cfd405bb350f048db4ea6f5044164b1f.json",
                "claims/d3/CLM-d31651a6d9ff0bc5e02331b26415678e.json",
                "claims/dc/CLM-dcffe8369cc7211a981764da419d81c7.json",
                "claims/e2/CLM-e2e520017872ad9a69448bbee6b6b61b.json",
                "claims/fe/CLM-fe11831a9a82599a44e551a146008de0.json"
              ],
              "proposal_id": "sha256:cf46c1f5742452ad5ed4fb9fdfa6571b3848503bed9d54b223027409540e23d5",
              "candidate_digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319",
              "refusal_code": null,
              "children": [
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 0,
                  "item_key": "00000000.703a655b3265a94e1147c9b1d197ce8e",
                  "manifest_digest": "sha256:88cd958340993ce932e8bf71de87802b5334edb595b4e59a2567a6cf0892cf5a",
                  "egress_digest": "sha256:8145096194734f0d5e3b6123c4cd6aa8b1d365584ea506a2ed6377ee8f58469e",
                  "path": "claims/07/CLM-07e2523e79d50bba041f0fa492be4ca1.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 1,
                  "item_key": "00000001.7422a6048898d20ae688bde4992558d5",
                  "manifest_digest": "sha256:fbfebf39e1f3ce315e968ca5a1879d4d3e51a1cfe160c091bad9b1c7dfbd3f2c",
                  "egress_digest": "sha256:ff8e8e2daf111984e02733ab750bb67986eed0e358bc0e496416713142af64a5",
                  "path": "claims/65/CLM-65471ed24f3c502ccbf845d20373af7f.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 2,
                  "item_key": "00000002.363d6368b3ea305bea1c989ca9f566f4",
                  "manifest_digest": "sha256:8b1af3ff8541b630169afd6cbaf00370a1130acffc5dc1319d84c3d79b247bde",
                  "egress_digest": "sha256:4ad4f0395e87071f7be8be6a4f739fad3f41e0f8a23420b0c2ae6f226b27b55c",
                  "path": "claims/56/CLM-564e79925ecc63bdc6891c631a54855f.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 3,
                  "item_key": "00000003.e0a824c6b3c817a5a73eb81ab15ab92d",
                  "manifest_digest": "sha256:c253d5b037a85dda5179399e0bc18fff096cc2d170439bb6d4fdbd894001f020",
                  "egress_digest": "sha256:1c73c6c3cbeac1dbdf5754873ff8f9e0bb3594e118ddc2bbef3f9088935c4f06",
                  "path": "claims/dc/CLM-dcffe8369cc7211a981764da419d81c7.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 4,
                  "item_key": "00000004.2d5e34adf3df1f48a480909c43a948b8",
                  "manifest_digest": "sha256:38cf40a1c1313531e4e012dac96351ef16b461906f231a87a53cd87cb8878555",
                  "egress_digest": "sha256:3c4f473029848ea58c2a7d7ae193fb26ef79cbf36063509f280338e9617a2eb8",
                  "path": "claims/45/CLM-451fc26cb4344c5253459630a039526b.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 5,
                  "item_key": "00000005.2ad42d13da0ee7eee4f87a825db16b48",
                  "manifest_digest": "sha256:ea20957880f7ca10c6aa9ea75b7e2d8669bd49a05686faaadf49623d2cad286e",
                  "egress_digest": "sha256:2c7bf02d3a576aade9b34407162150c086d1aa3f340523c3779b18048be136e2",
                  "path": "claims/a5/CLM-a5feef846323fbf1ee6839e6cc7b6b95.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 6,
                  "item_key": "00000006.9dbdffbebee1585b97ee2e26824c6a5d",
                  "manifest_digest": "sha256:671f231ca595d220fa8d8a8cdb0a9cc46b0f259d118a174e7c6cd93b8140d775",
                  "egress_digest": "sha256:3d208f70f9d5c4a89f8e5ab6647512f10c91df5a1850037b4cd3bf4f69917d4a",
                  "path": "claims/86/CLM-860b75b55b2444f9ae5bc16d8a596cf1.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 7,
                  "item_key": "00000007.a155983b0252e1375bea1351964dbe96",
                  "manifest_digest": "sha256:d75343163f62996126f221ae256f9ce32ed3875fdbc736dc9d3189d20b5541a3",
                  "egress_digest": "sha256:f822e185631eb3ad8d0250f6c8b06dbde90d63f25be675eb45ef15349b76e006",
                  "path": "claims/b7/CLM-b7eb930d785b6434da97a1d851cf317c.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 8,
                  "item_key": "00000008.7169b09a71fdd31282a7785213fef2eb",
                  "manifest_digest": "sha256:47f5bfbca8b6c96c3f7741a89d10968907e3dc190832b22b29fd6afb77a78a11",
                  "egress_digest": "sha256:c7b347f7b64251718dfdc9349d92c955783fe34284f5366bf8fc62d23369bc5f",
                  "path": "claims/0a/CLM-0a1e056fd6a201a37d010031c94e2c44.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 9,
                  "item_key": "00000009.ca2d98909b80e142cab7ecf5cc347cd7",
                  "manifest_digest": "sha256:cf5dbe871a980747a1baedfcffd3cbb5d94bc3503f6c38bfa17945da8e1fe1fd",
                  "egress_digest": "sha256:4017542f809a3a3e46f0aed04e24239cd1bd6cf6855a619a3a7f83d0afbf6a1d",
                  "path": "claims/3f/CLM-3f6b80fb033f0d7166cec0884675bed1.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 10,
                  "item_key": "00000010.1165cde8d651de1c795d34535f3735f4",
                  "manifest_digest": "sha256:e9464077666ecdb9f1f59ede41edaa42b301cdb7708729aefb25358a164f8fbf",
                  "egress_digest": "sha256:c07c72aa8bc6e58978d0a5f4a28789c75df07e792ab2f26555fdd3a27e8f5d7c",
                  "path": "claims/0b/CLM-0bee18e34962365ca30ea6da3b0b7277.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 11,
                  "item_key": "00000011.e40f451d8ec28cab4df4d68832eedad3",
                  "manifest_digest": "sha256:e1982173092d23d48628aabb0b26957357151a4ab8ee6e6fe324322cc27e9582",
                  "egress_digest": "sha256:07a67c7cb7af3b290e1809f83fce7cfaf5d5983952f19bff66486ec51bfca48b",
                  "path": "claims/73/CLM-73f152cd6eb8478d4388a9dd23a95bca.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 12,
                  "item_key": "00000012.aedaeacad264dbd65ad7246cf00c5add",
                  "manifest_digest": "sha256:c419fc0b4419488a316425e566123e732d0a9471f20a63460fea87f1e616180c",
                  "egress_digest": "sha256:8cd9614a5a2a3c8592cfb55422d7353e5b7ca84a6e5e737549a2e02540b91c0d",
                  "path": "claims/12/CLM-12c364b5fbc11638bf6980fef83d7588.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 13,
                  "item_key": "00000013.02d068aa91316217b2e1086c3dfa380b",
                  "manifest_digest": "sha256:49a1dfa44525eacf7d24ae2e3712c1c95f08ea47bdd0dda1b4f6d672a7c96a20",
                  "egress_digest": "sha256:df95422fe2a0cde8e248b8f307a4765ff36bcae921e7562e0b7cf2eb317a7f52",
                  "path": "claims/a4/CLM-a4469c2acfb762a32d395e01fddf7d81.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 14,
                  "item_key": "00000014.9ea3572c69f1327a7138724d76690bfe",
                  "manifest_digest": "sha256:af7e0a1954b08689590f28518bfba8bd633d5da8af247445c19049d3ecf537b1",
                  "egress_digest": "sha256:8c38f287ea4451bee55f6fa9e135d29584920ea95a9d9169c9c25c4c02535aa7",
                  "path": "claims/17/CLM-177af6df24a732c72ed8c7acadd7c55f.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 15,
                  "item_key": "00000015.15b3c967cf7b1812a4790153a17db988",
                  "manifest_digest": "sha256:660b65e5e3cd833c700aa79a52ba536559069f1aee13c4f8b3f2ad264e44ec3a",
                  "egress_digest": "sha256:aae48455edc6736fca76405379835a0715cbaacc556b6ab48d767a56a1f34871",
                  "path": "claims/01/CLM-01c64bf0ccf601c73fb5d9e48000da68.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 16,
                  "item_key": "00000016.e76fb3d883f9e055651d4138cad691a2",
                  "manifest_digest": "sha256:ddcacbcdf1dc4c72ca2ee082d544d85ab89486fbcd31f43ab11beb445ad24658",
                  "egress_digest": "sha256:97e4f08cceefe8929c5f34452b0bbe7cb7458d7aec9cef09b3df3676db52f024",
                  "path": "claims/a1/CLM-a1241eb46fd7481831f246d6b99b2320.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 17,
                  "item_key": "00000017.60d32c484b2c51b8cd8e9344715fe955",
                  "manifest_digest": "sha256:94186c590c0a66987362122209bfc30715ba508bdf36abc5c738812944da15df",
                  "egress_digest": "sha256:11e8cbf0809c74af5f26e56fdc79a5659cd413264b008cf46c21392e5accab91",
                  "path": "claims/cf/CLM-cfd405bb350f048db4ea6f5044164b1f.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 18,
                  "item_key": "00000018.696c9d41cd87444a1824155044b4cee4",
                  "manifest_digest": "sha256:999854ef0a8208ed0f7679bd27e0bc9749239fc6ee7624bafcec940a885b4917",
                  "egress_digest": "sha256:3a8f544127b2fa9cf6b39646a4839c29e59562e8340c54a161adaec065e8ab95",
                  "path": "claims/9c/CLM-9c9dcad72dd788abd42f0fb68224add9.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 19,
                  "item_key": "00000019.66688f89f8c9658eba1fa91877d86f72",
                  "manifest_digest": "sha256:f946485c08ca9a1ac230a653e5bbd16fa658e48cd3312cec6ed480045c04a403",
                  "egress_digest": "sha256:9aa5618f8d3f247aec87d0c69cda2d9768bbab95936925273ef4a6b1cc113e37",
                  "path": "claims/21/CLM-21aba7f86e63c712d490f516c283bd68.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 20,
                  "item_key": "00000020.c2919469bcf232f4d4e341858aa1deaa",
                  "manifest_digest": "sha256:e953954dcfc95f83e98bb7bf8f0d90c9c7c5547fc433d4b5819908a2448ab63e",
                  "egress_digest": "sha256:ca0066c40d6bee2bcd22b6f82fb087b8d19fb967c5be1c835d608182095f8ce1",
                  "path": "claims/15/CLM-152f2406ffa3a32588dced1cde97b73c.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 21,
                  "item_key": "00000021.99ea5074f1393646a508bbae58f74ae8",
                  "manifest_digest": "sha256:878844bf3073bd000ea31d9329fcaaa6c1c2e6fa399c9d04f3f5da0f7a11a11f",
                  "egress_digest": "sha256:a6ef61a54967829a77ea2261fe072a6dc51e34a4f5650dca34f064c565985a32",
                  "path": "claims/01/CLM-0173d827b066541d388ec3ee6c909907.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 22,
                  "item_key": "00000022.a882bff437ca81d18e80eccac0912087",
                  "manifest_digest": "sha256:a27d41c93e9b6de2f565feb4285be7b00107a6ac2d88942b5a7b2b76ca22ad90",
                  "egress_digest": "sha256:1aea5219a3c903cb998066301b02c9fc24bfafb6ababfefebe4a4c95ab4fadd5",
                  "path": "claims/c3/CLM-c3a2b8bb89cbce7bab07604bd9acbf78.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 23,
                  "item_key": "00000023.34dabbb4360ebb5d58f46ce83e0b1d7d",
                  "manifest_digest": "sha256:be4c8b311e31ff42a6778726fc2acb020d60e310e794958797dc65ed5daf28b3",
                  "egress_digest": "sha256:053ea1a24162e9e9941b09338814938cc0dbc7a5496ed66fe10785c69b4275da",
                  "path": "claims/e2/CLM-e2e520017872ad9a69448bbee6b6b61b.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 24,
                  "item_key": "00000024.28c2d9d1657e169a2427bcf5feee93d8",
                  "manifest_digest": "sha256:f01902b5aa098dbcea02b339811a573a48ffb10306b073d0767024d34afebf5f",
                  "egress_digest": "sha256:01cb7cc92c0042944ea1984daf1355d9f7609fc3ae5854a153584a2ae5f88099",
                  "path": "claims/3f/CLM-3f8684f0274ff24aea88562eeb6325d0.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 25,
                  "item_key": "00000025.b9b7df88a1f4a0f1fc4e610db5c8be0f",
                  "manifest_digest": "sha256:4c04b620b913f99c2ca056dd55281a2d7fe52a3f33d85c25cfe45a44ac8c9bab",
                  "egress_digest": "sha256:9bc274655d1b562a6422c69b555da00dcf7dc6a20a478a17bc4ed2d9c3ba531a",
                  "path": "claims/54/CLM-54671d178d5d851bc9838e2b28c1aedc.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 26,
                  "item_key": "00000026.ddecc6a0e4f54d3fee039bab095db285",
                  "manifest_digest": "sha256:d93e8077c88daccae0c0766a0f7c98b4da3f78a848beaadc17060f03906f6a06",
                  "egress_digest": "sha256:70740fa54983080a9be98d7ca658f05434ec6fcf2d22bc9d828548780cdf70c9",
                  "path": "claims/65/CLM-65c923eaaea18ff84416d7753c4c8a5a.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 27,
                  "item_key": "00000027.2d12e78f04f4f59a5edab954d3084723",
                  "manifest_digest": "sha256:f7256ffe6e825a1a380fccc2f2999e68d2103720452e10ce9707dbfab4f47340",
                  "egress_digest": "sha256:b76269d7315e87ece101db8bf9de968e3d0ad0e50351685bd1ea54fc34f3bebe",
                  "path": "claims/c8/CLM-c899c993589b6485b057c0436b4eae23.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 28,
                  "item_key": "00000028.5d0f8dbe256ff1d71275bf1cb613711c",
                  "manifest_digest": "sha256:0ed6cd3b0c8852d86ea5353cc22b91b8e925537eb8ddaca10a5c4f2672650f71",
                  "egress_digest": "sha256:fde107d2e133c8faaf10ba099e611faeba8cdbb5769e36079125de6b97c104ac",
                  "path": "claims/d3/CLM-d31651a6d9ff0bc5e02331b26415678e.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 29,
                  "item_key": "00000029.34ebe8f5db556668b11ba83e02805705",
                  "manifest_digest": "sha256:518a5c4fbbdd71c7fdbad3ffdde7c9813bc5d503d728201e11ff9e766128769f",
                  "egress_digest": "sha256:61621f8cf947aab18cf45c8a4ff93039227b6fdfc7989793eca1f7d9a03e758d",
                  "path": "claims/fe/CLM-fe11831a9a82599a44e551a146008de0.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 30,
                  "item_key": "00000030.57b5b08f018191b61e85e164efd3072c",
                  "manifest_digest": "sha256:f5b7f853b876b7e0aeef0b7ab2bde4aadf21ddd69dbaff8de1e8970a01648436",
                  "egress_digest": "sha256:c37de625e957b58f687ceed83a2a28e9af63976deb56c06e67d4dd456a5de6d1",
                  "path": "claims/30/CLM-30255eec7ddf7f503364165a9064c0b0.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 31,
                  "item_key": "00000031.a4a3fa0858624dd3abd4aaae82e92d12",
                  "manifest_digest": "sha256:0474e35b22b19c0e0cbb6fc7cb7cc37cc5b873a22085149c58d44afd7c28bc04",
                  "egress_digest": "sha256:027c120a46f900e2f69cc5c12b19fc8ee283b62a1146a6c1157d01215120032a",
                  "path": "claims/8c/CLM-8c170a81886a7384663c02c35ce7f965.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 32,
                  "item_key": "00000032.844cba210dbd2289c8678db6788c12e9",
                  "manifest_digest": "sha256:d94b69a97d711fed5d49ccee013367479fc041a0ce0ead17f5f4cb3aad9089aa",
                  "egress_digest": "sha256:1183e1fae90cb3c30981666227e00c268c2ae585bfcc6de0bb92476ba6cdf3b2",
                  "path": "claims/20/CLM-209643542f5a95a150f993a1e3ba2123.json",
                  "prior_refusals": []
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 33,
                  "item_key": "00000033.97f002c83e6b86779c25393287b5bbcd",
                  "manifest_digest": "sha256:992f9c0de9a03a57c70330f237518d8ee2ae998980c4689f7c4f9e96a980e1d3",
                  "egress_digest": "sha256:3a265be67b8b19aabcdd288d59ae144f9b1897f854b25091902a915db1d38aff",
                  "path": "claims/99/CLM-99f7d94306a1c9859b9159048faa11d2.json",
                  "prior_refusals": []
                }
              ],
              "journal_coordinate": {
                "tag": "playbill-procedure-journal-coordinate-v1",
                "stream_instance_id": "inst_d8e6dcb48e6a4d0d",
                "journal_family": "procedure-exhaust-v1",
                "stream_id": "procedures",
                "partition_id": "line:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
                "sequence": 46,
                "record_digest": "sha256:6406971d98e10163feaffc7f78399093857daaaa9029b23bdb3940a228d82285"
              },
              "settle_outcome": "settled",
              "accepted_git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
              "fallback_reason": null,
              "outside_scope": [],
              "capped_by": null,
              "prior_refusal_coverage": null
            }
          ],
          "next": [
            "cx.get(\"Procedure:security.kev-triage\")",
            "cx.get(\"Line:security.kev-triage\")",
            "cx.get(\"ProcedureRun:RUN-bd2b6268c25c1128991c60a2b55e4c1ca2ceaa7bfcae1521db7fe50d092c9514\", detail=\"proof\")"
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
        "evaluation_time": "2026-11-03T02:20:50.135251Z"
      }
    ]
  }
});
