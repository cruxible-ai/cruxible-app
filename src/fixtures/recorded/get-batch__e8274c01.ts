// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 6d570da4
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051"
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
        "ref": "ProcedureRun:RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
          "procedure": "Procedure:security.osv-query",
          "status": "succeeded",
          "nodes_done": 5,
          "nodes_total": 5,
          "started_at": "2026-11-07T18:00:00Z",
          "elapsed_us": 454992,
          "elapsed_basis": "measured_wall_clock",
          "nodes": [
            {
              "node": "components",
              "kind": "read",
              "verdict": "succeeded",
              "sequence": 3,
              "summary": {
                "kind": "read",
                "rows": 3
              }
            },
            {
              "node": "osv",
              "kind": "call",
              "verdict": "succeeded",
              "sequence": 27,
              "summary": {
                "kind": "call",
                "captures": 10,
                "capture_digests": [
                  "sha256:cc9f893b25db09b717d709691e48b70d125ad5f82ab99eff8a33d5aa50fdec9e",
                  "sha256:bfb7d7faa47595240dc52862e1bafd9270e194f71a6bfdf727bcf975a379f8bb",
                  "sha256:cbfe692ca7cbb5439a95fceabbe37603d15cf74ed1ccf4bc74d2f1dbb570a0d1",
                  "sha256:db1e1cd0167400dce894ebd5658ab7ab97da43b076c25a85d6e1c11b553798f8",
                  "sha256:898f8e1ef2d7258e961b7a9ecdce1e81879e834dd418440aefc93d40baf58d14",
                  "sha256:216891a231bd705d46dff4586083815d8f1298dc3314e22a21608686fc78cd97",
                  "sha256:af89a20bd261ae3dc60bc2c6749ed1776dc1193ed81503fbd2ccb812820858af",
                  "sha256:6170c8026567cb65f945893280d4dc3c062e17fd0d0373111e911bb7d96b1973"
                ]
              },
              "members": [
                {
                  "field": "responses",
                  "index": 0,
                  "capture": "sha256:cc9f893b25db09b717d709691e48b70d125ad5f82ab99eff8a33d5aa50fdec9e",
                  "request": "sha256:b91c12c3c2fed33e89e081b0c0835b1ade4a768d1315349a4af29b6b4f48637e",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 1,
                  "capture": "sha256:bfb7d7faa47595240dc52862e1bafd9270e194f71a6bfdf727bcf975a379f8bb",
                  "request": "sha256:c4c9571ee9c20c692a19243c892414290ee3c9b76258f6a029787827f9b189db",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 2,
                  "capture": "sha256:cbfe692ca7cbb5439a95fceabbe37603d15cf74ed1ccf4bc74d2f1dbb570a0d1",
                  "request": "sha256:6ad50cfd1099cd884b925a0627c5e98e2f511df65202bd9233338fdae0a17b39",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 3,
                  "capture": "sha256:db1e1cd0167400dce894ebd5658ab7ab97da43b076c25a85d6e1c11b553798f8",
                  "request": "sha256:37cb1904daadd65a5eae21e95d5ff2c59f20414be93dad5666c27e9f851bee4c",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 4,
                  "capture": "sha256:898f8e1ef2d7258e961b7a9ecdce1e81879e834dd418440aefc93d40baf58d14",
                  "request": "sha256:54e4a720f7b9a76c51c6ecd4f31cb575c42b314d87abba879dd585a19cca9dd0",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 5,
                  "capture": "sha256:216891a231bd705d46dff4586083815d8f1298dc3314e22a21608686fc78cd97",
                  "request": "sha256:330694f52ead849e56071075f147900df0e9a1085d58b212ce304328fc745ba3",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 6,
                  "capture": "sha256:af89a20bd261ae3dc60bc2c6749ed1776dc1193ed81503fbd2ccb812820858af",
                  "request": "sha256:a355a4840713d64a29ed8afa7575b4195e31fe15768832e6091c3205cfad1a4b",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 7,
                  "capture": "sha256:6170c8026567cb65f945893280d4dc3c062e17fd0d0373111e911bb7d96b1973",
                  "request": "sha256:6e0030e37d290086c7e5be5e6995b071d300468fab543177f5e39b0ddfb662ab",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 8,
                  "capture": "sha256:41a682c7fef7a3f1565a01d86f7c86f413bcdd42a419363778b095e2683604c8",
                  "request": "sha256:9e12b1087a2959ddb412833dd9f1d1e2b7020a2d8f189952e583add5aa0de06c",
                  "status": "selected"
                },
                {
                  "field": "responses",
                  "index": 9,
                  "capture": "sha256:7bd88cad6d4864393ee00b32cf6a921c4ebc4d8770ec1f40a72a67458d24185a",
                  "request": "sha256:4d9e850f929d09cb7fb435d2385bc836958588d0713ba9782484e5328821549e",
                  "status": "selected"
                }
              ]
            },
            {
              "node": "matched",
              "kind": "call",
              "verdict": "succeeded",
              "sequence": 33,
              "summary": {
                "kind": "call",
                "captures": 1,
                "capture_digests": [
                  "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
                ]
              }
            },
            {
              "node": "affected",
              "kind": "extract",
              "verdict": "succeeded",
              "sequence": 34,
              "summary": {
                "kind": "extract",
                "records": 9,
                "invalid_records": 0,
                "duplicates": 0,
                "invalid_fields": 0,
                "complete": true,
                "complete_when": {
                  "count_at": "/count",
                  "expected": 9,
                  "observed": 9,
                  "held": true
                }
              }
            },
            {
              "node": "write",
              "kind": "claims",
              "verdict": "succeeded",
              "sequence": 55,
              "summary": {
                "kind": "claims",
                "written": 9,
                "revised": 0,
                "inverse_written": 0,
                "subjects_created": 9,
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
            "line": "Line:security.osv-query",
            "occurrence": "sha256:d271e48721d88f4bb29629586f94ce4ec4d9733c231751d0d560535d39bc8740"
          },
          "actor": "owner",
          "receipt_digest": "sha256:afc1e115f1a747a43c36f593a120a61a03c81ae6860fbc42cedb999c910c7428",
          "result": {},
          "outcomes": [
            {
              "sequence": 3,
              "event_kind": "node_fired",
              "node_id": "components",
              "payload_digest": "sha256:66bc0a984584e91c1bbbbdff3b55db9580aab58cf473d1ead8c63e3e6c9b0d9e"
            },
            {
              "sequence": 17,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:bed8923a89ac04940caa933c9869be1e2fd47ed3faa1efff4a5f865f4982abb0",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 17,
                "record_digest": "sha256:f5aeb53a7754824d1e7817303122109d08a65c961d1bc5b11c97fe90e77a70af"
              }
            },
            {
              "sequence": 18,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:302a8dbe83fed409264623b87eaf7a3f03ab212245ce8eb27a6b8fb8169d103b",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 18,
                "record_digest": "sha256:fb218f4ad7a5e776bf193e7eb24f0f9dd3026fad5f4b5318430368ac6811b48c"
              }
            },
            {
              "sequence": 19,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:ff5923199488885528bbd3da8ea8bb57bd4b1b384cddd68b06ecff861dee8b19",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 19,
                "record_digest": "sha256:bbc59e9e0a1a296318939816781986b63338c55f7de4c3786309a5097c86e8d8"
              }
            },
            {
              "sequence": 20,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:b3e81b50f3f9639523067e960f28ad83e332c80b1ad24015ce516204de6685bd",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 20,
                "record_digest": "sha256:6ccd907f6931e4310c3cd21f991ab1c8dbe136a922603518906a67fecaf0569a"
              }
            },
            {
              "sequence": 21,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:17ad519d999c09cb10a0a1e8fc736d179f103dee8cabbaa2d66558c4215529bb",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 21,
                "record_digest": "sha256:78aa421f7421ed2e8839acc85084ccf29214d95ec0bd8a70e4c2ea674fa6832f"
              }
            },
            {
              "sequence": 22,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:fe656837cee66f8bcfb84e577bdb85dced15fdef438347ed4a0395277e7684e0",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 22,
                "record_digest": "sha256:073e80c772b0b596f38203a0477a3cc7d9888de5f4c35305d98408b83e09c45b"
              }
            },
            {
              "sequence": 23,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:5a2c7234750c3b522b6496b876b5ec72307134646bcd2006e51782dfd1be0966",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 23,
                "record_digest": "sha256:93d656cd6be3643b9d9522922cee89096f3e5c105df8edc511f37e63f8a9f486"
              }
            },
            {
              "sequence": 24,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:6fd6a60b62d043ee2ad4b9329578cae60c602b19ee8c540eadea7549d142f0b8",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 24,
                "record_digest": "sha256:bd42be48e505de24abb21af4c6189529d5d12611da601d9eff01759219deec07"
              }
            },
            {
              "sequence": 25,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:0fdfe75b835307b26bb84236fddf647ee832c90127770811243094da546ce51b",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 25,
                "record_digest": "sha256:ab36d518804c7430c25128a419e84ef763b586a87ffddbcb22c057de980b0fc2"
              }
            },
            {
              "sequence": 26,
              "event_kind": "produced_capture",
              "node_id": "osv",
              "payload_digest": "sha256:22c57469b801a286fa9a55f75c258fd7691d0b48723ee5339ce577f7c171d25f",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 26,
                "record_digest": "sha256:52cf8a613eaf2b086cecc24ffc3fd5ec7d41a438e1a308d8165f00986ad4d21e"
              }
            },
            {
              "sequence": 27,
              "event_kind": "node_fired",
              "node_id": "osv",
              "payload_digest": "sha256:2dd49d1ae6d99d1862e469a648aa40de45938dab21884e56d246b3a6a46b6c40"
            },
            {
              "sequence": 32,
              "event_kind": "produced_capture",
              "node_id": "matched",
              "payload_digest": "sha256:435970d9444cf529601c7cc03d4bfc0e03457808450e9e1d0b1ef78d3346a06f",
              "capture_event": {
                "run_id": "RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 32,
                "record_digest": "sha256:f5c9b936a6bffb17c32ccf469c2ba8e3760e4c87fe359717ef5c362d82d9b58e"
              }
            },
            {
              "sequence": 33,
              "event_kind": "node_fired",
              "node_id": "matched",
              "payload_digest": "sha256:64e041dadad3abe2857b0a6791f529fad3e6027dec93928b11410b5fc08ac636"
            },
            {
              "sequence": 34,
              "event_kind": "node_fired",
              "node_id": "affected",
              "payload_digest": "sha256:0c5b8b2964256a4e5b6317d65b858d7ef2946d812814750d054f1d5b3153dc5b"
            },
            {
              "sequence": 55,
              "event_kind": "node_fired",
              "node_id": "write",
              "payload_digest": "sha256:de3b9e63b87d4ab383cd0a7d5a44d190134f3f3f6aa73942b6d50b6dd6fbb44c"
            },
            {
              "sequence": 56,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:f355c3e57e254a90a80a611766cc031b42ff401dcf154556ef8aaf5b35230543"
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
              "operation_key": "sha256:3565ea262a51980c8b3ee3e0162ab1413a5f6d5a48517b2dbc49b250cf68c25d",
              "procedure_mandate_digest": "sha256:8b395787cfe2e834002fe198800068763c52a69c4058b0027b43553ca56084be",
              "target_paths": [
                "claims/07/CLM-075404ffec9775e1fb4928ac66596f62.json",
                "claims/0e/CLM-0e6c4d9b01892c8050e62029ae961f1d.json",
                "claims/24/CLM-24f212930d41b0d8eb16330e48648629.json",
                "claims/26/CLM-260724b6a176569d560f4d889ca9e36a.json",
                "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
                "claims/42/CLM-420ea3f896570211129c42f3b1dfa5df.json",
                "claims/44/CLM-44ef6ae26ec37a36ef086b3cd329b469.json",
                "claims/49/CLM-49cde40ee49e69a461b75ed1cf8471c4.json",
                "claims/65/CLM-6560384e235d3930b9b35de1d980518e.json",
                "claims/68/CLM-68b8ad23bbe030671b6b79a0cff74ff9.json",
                "claims/6e/CLM-6e6f9abfeae22de66a67ba1e6a49be8a.json",
                "claims/8a/CLM-8a7df48883d0287639a5050cd99023c3.json",
                "claims/9c/CLM-9c9b10a978593f401d38b503968eada5.json",
                "claims/9e/CLM-9eff1367310e902cdc436efb18e64336.json",
                "claims/e5/CLM-e577b61eec8d3ba18cfba0ab124e0e5a.json",
                "claims/ee/CLM-ee9fdb042bee8315276c80153e402b49.json",
                "claims/f1/CLM-f1a9799dbbfdebf1249a5126d94a8806.json",
                "claims/f4/CLM-f4445d82c8e42f3578d2cc7500c83859.json",
                "subjects/security.vulnerability/cve-2021-44228.json",
                "subjects/security.vulnerability/cve-2021-44832.json",
                "subjects/security.vulnerability/cve-2021-45046.json",
                "subjects/security.vulnerability/cve-2021-45105.json",
                "subjects/security.vulnerability/cve-2025-68161.json",
                "subjects/security.vulnerability/cve-2026-34477.json",
                "subjects/security.vulnerability/cve-2026-34479.json",
                "subjects/security.vulnerability/cve-2026-34480.json",
                "subjects/security.vulnerability/cve-2026-49844.json"
              ],
              "proposal_id": "sha256:32612999e10ee8f8882e49d3cc7d5dccfd8f1ccd32f839161e31587d89435ba9",
              "candidate_digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f",
              "refusal_code": null,
              "children": [
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 0,
                  "item_key": "00000000.060f4b148db4852de1d49b086acbe88a",
                  "manifest_digest": "sha256:568ec6c72d688a3a210cb59b508b136d16856f725218afddd5af3fb9f6821fc7",
                  "egress_digest": "sha256:16cf8602ccd3afed7b3668b2cdac34a07ac09bb84de11119569a8bbed55e1837",
                  "path": "subjects/security.vulnerability/cve-2026-49844.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:87611874492315c081fbe342a920ebf1b0f59c1492fed203a9c1d090f31cdfa2",
                  "change_kind": "subject",
                  "change_digest": "sha256:31f70edd23173ae6d50afba8f3081ba6860da63b0dc67c4e0a8891dca5e7df63"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 1,
                  "item_key": "00000001.e9e74b73f982f69a42c83853f8552570",
                  "manifest_digest": "sha256:3e92561619ea85a09a6dfb87eb198f9dc0a9400e9a8c943bf6259e3a8a95e1b2",
                  "egress_digest": "sha256:fdebf7abdfed7b5e5c303c7733481cdc04a5d055c76dd7d6956066c2dc835e0f",
                  "path": "claims/26/CLM-260724b6a176569d560f4d889ca9e36a.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:9e28b01a3210c820059068cb7b70f953c0c3cf47c911c835c509b6dc614d987b",
                  "change_kind": "claim",
                  "change_digest": "sha256:efe6fc6c6eeadb660f6d015b912a6b2fd234a56d4956e49efbc5faec21115336"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 2,
                  "item_key": "00000002.ade95e94e87acfee0a61181f43e907a2",
                  "manifest_digest": "sha256:e5b287469df14ccd52f593c0db2a47e0fcd9405b59b17d2a7603fd9a92e237b2",
                  "egress_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "path": "subjects/security.vulnerability/cve-2021-44228.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:5ab863b5730f729bba438632d886d168400c0ad3c6a38cae5a2c150a0b488cab",
                  "change_kind": "subject",
                  "change_digest": "sha256:d8222dfc79f7b25eafa83b53c7bad497312a399634ce41c5c9d32aa498c71dd3"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 3,
                  "item_key": "00000003.3a3a0e1f95e3809a950ffc458221d73d",
                  "manifest_digest": "sha256:d3c585aea79ae68db53990d1a541df39626fc9b3059bc16eafcd31095c763cc1",
                  "egress_digest": "sha256:b78f53ac2182e946355c56cbc97b3c4dc21342d5afe29d19648b849f8e54e56a",
                  "path": "claims/24/CLM-24f212930d41b0d8eb16330e48648629.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:51cfe379b1a75460d99e26097e2777820becba7331d4c7e7561d940080f2e7ab",
                  "change_kind": "claim",
                  "change_digest": "sha256:b3f2f9e22cbe1a588cd16ba3c918626b51f33dda4e79a1c07331c2f185142a94"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 4,
                  "item_key": "00000004.51e926cac6b1a055a1165beab2c86400",
                  "manifest_digest": "sha256:d36f10f91d6e59bdc4a9f5d0290c0f2d996a5a10cdf7beb660d85c3a1dfd558e",
                  "egress_digest": "sha256:1537dd4d8b04575cbe25e11353f231e96b33267eb59d6e25a665b0324e430aa7",
                  "path": "subjects/security.vulnerability/cve-2021-44832.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:12851114c8022e1c7c731d0b1c63737031ce990a3849b0ac78ebd4497029accc",
                  "change_kind": "subject",
                  "change_digest": "sha256:d80c853f03266b5826e062d777e8ecbccda038c871589353287aea3c2a2cb880"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 5,
                  "item_key": "00000005.6dd3b4df398d0c08b9025dbad8106319",
                  "manifest_digest": "sha256:959a9f2ea5cb594befce75f8912e7d61c74123dfde124a991fd46197c4a1df29",
                  "egress_digest": "sha256:83f1ce2cb7ac215705a0d9d65ca378d1f837a1e72bedc9a4168332d5fa4dd634",
                  "path": "claims/9c/CLM-9c9b10a978593f401d38b503968eada5.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:338b14879e63fa70e24b01ba0db327a9712e3094595fb868ef65b974c5db91ea",
                  "change_kind": "claim",
                  "change_digest": "sha256:6640d649b9c6d00bac2bad252ce22ebdccea9df3aa961239adbbf78717b8173f"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 6,
                  "item_key": "00000006.5390466cbe99ab8cb7234a653e3a990c",
                  "manifest_digest": "sha256:43d4052146d08582228dd178209febf87ac97a5f4003faed89a8335cf32c3f7d",
                  "egress_digest": "sha256:d334a6d3d9cc59e6868983ec17882683039fd6bbc8af7a1a4c0c06b8e74919af",
                  "path": "subjects/security.vulnerability/cve-2021-45046.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:b0fc8cef2957e4f1b45d9a6b8ed90bfc2a3c2d4755ce86826de2c7da2fa38a83",
                  "change_kind": "subject",
                  "change_digest": "sha256:eb85fa8d88d280e0de1d3a6fd5fecbc493138a60237e428b1fe00f056f36ae25"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 7,
                  "item_key": "00000007.ee8be2d39c8cb8f713f3afd1d4720eff",
                  "manifest_digest": "sha256:202212e381f9458254b4297a9b5f9bf4e7603b3565824252ad4a7e47e14c5f2e",
                  "egress_digest": "sha256:ab3ee1b125394a27674ce70fd5d403baf9e1ab33d53204eb52865c42844c9cc0",
                  "path": "claims/37/CLM-37ba310abdd6002b57407a07cbead4dd.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:41ba19b19c5eaef279b48110012ef2c5b64d79ff35f39d9f87c6d0db9abd298c",
                  "change_kind": "claim",
                  "change_digest": "sha256:ba74f60b151d2965b525245289483dfd3839d231063bb43ceb544dffedb524aa"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 8,
                  "item_key": "00000008.3d6c01f9aa659b3a12889ec120c9f4b0",
                  "manifest_digest": "sha256:aec8c845cf1b29f1276d996d18e12e6c6884574dd781466c47d8f64ae6cf30f2",
                  "egress_digest": "sha256:a8769f71ca237cbb64a629ea75003a0ca07884bc9ec8d44e973ffde4f99b7924",
                  "path": "subjects/security.vulnerability/cve-2021-45105.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:052e70696f1537c2bf7d96e5552a70b8ad8550a05c91e5f0bfa9f5bf40bb8260",
                  "change_kind": "subject",
                  "change_digest": "sha256:315f91cfd640d94b7cb36319112f711eafff970251ccd2bc9fe8c183f41342ce"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 9,
                  "item_key": "00000009.ceb944fa711247ee101598caffad91e7",
                  "manifest_digest": "sha256:e3216fc20fdaa6682259f876f93bd797315f6308e12bd93426ce452136e0e37d",
                  "egress_digest": "sha256:0e178ecf70a0d73590370aee18ae4efb92235ec2c1c016ed2ebfd8dfff948add",
                  "path": "claims/8a/CLM-8a7df48883d0287639a5050cd99023c3.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:051862f2f9fc66f2c44f98e9e6006dc18ed9e63fdc12a079c1376f2a21589dd8",
                  "change_kind": "claim",
                  "change_digest": "sha256:2f6e5a46f1cb104a428587379f938653c5c58d683cb6a14abfac71c94586bf77"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 10,
                  "item_key": "00000010.f85d6a8b3b688e6673934ef8ea6e5519",
                  "manifest_digest": "sha256:d36352a99014263151a90de8200423267eb87e03394d9f66ab27269fecccab75",
                  "egress_digest": "sha256:284a1c59f4618a387ace30b03f73a3598fc5c6f5157d6310a699248d50c16e83",
                  "path": "subjects/security.vulnerability/cve-2025-68161.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:a085b77f25bf3496b6713f2ea3b5cc0551d5ca5c5f2bac9b7816c0f510a9e401",
                  "change_kind": "subject",
                  "change_digest": "sha256:d2a108ab43695c5ed7a4e2eb6d1880864f19bf62827b5a5ff196e535423dc181"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 11,
                  "item_key": "00000011.0345f3357d7a3be9577d888750eeacde",
                  "manifest_digest": "sha256:837fee0415d875c6a3038c3a9c64be0832be4057f5ab73fb086c19ac584c3369",
                  "egress_digest": "sha256:38a1a59475c0088fd5560ad21b5d9caae5a12cc44d79fbe8b22893fbd6d77666",
                  "path": "claims/f4/CLM-f4445d82c8e42f3578d2cc7500c83859.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:7bd3e234a2aa3f5c66ec507bdbaa2b893c668f9727d58381bbafe47c081c9224",
                  "change_kind": "claim",
                  "change_digest": "sha256:c7b457d962d1e05bbf83161d03bc6bae7f08d6ed11c73c6f40e88a7b9fc49d29"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 12,
                  "item_key": "00000012.bd9436b24e8713b42f6baa88328f7bfb",
                  "manifest_digest": "sha256:f2effc5605f25eac102546e642c87d2ae4cf0f3ef50a23d99a38958d3f132802",
                  "egress_digest": "sha256:12bb7080d3778cede76d21279a49f7ee4cc7f5097ca72bc17e89818229bebb10",
                  "path": "subjects/security.vulnerability/cve-2026-34477.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:ffb9420b741b5368d9f277a3c6ba913de6c4d9bcbb45b602bcac28a6e0285ec4",
                  "change_kind": "subject",
                  "change_digest": "sha256:e075c017979902cb1a8355ea48e764db6b42947331625acb5a690084bf85070b"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 13,
                  "item_key": "00000013.a46870f8579086c016324efb40cb9fb1",
                  "manifest_digest": "sha256:4f77d899adc84ae58ab300b896b51152c01b9fda1f6397c678ea436e18ea0b89",
                  "egress_digest": "sha256:4cc4cac6f36eb3dcd2608993576b7a1af0ed09447184023759b3b125ab8ba383",
                  "path": "claims/f1/CLM-f1a9799dbbfdebf1249a5126d94a8806.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:e50a3d19e695910e8520d642d34d184200aacceca0d5643b0c376e381e45c2b8",
                  "change_kind": "claim",
                  "change_digest": "sha256:f68557e195afae399207a31206f285421820bb04d374b968b14e2387fd169c4a"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 14,
                  "item_key": "00000014.017f6749db7ad2ef131c3e27fff36d9d",
                  "manifest_digest": "sha256:31080a9c9980af1166361022c54eaab2e548ae82cd9078b2cca717ada513b483",
                  "egress_digest": "sha256:18542b724eaf2bf045d2144e3b340123ca41d449f16cac3997f34e46261045bd",
                  "path": "subjects/security.vulnerability/cve-2026-34479.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:fbfd92602e65cf4c355dd239d6d7ae92a92b91c5d35666f995319922f1d02d40",
                  "change_kind": "subject",
                  "change_digest": "sha256:99fa7574ffe2d4c44541e2c2bc9b0c4e898e665fd267c570dcf6feb614e6727d"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 15,
                  "item_key": "00000015.5136c76412984481941981be87653307",
                  "manifest_digest": "sha256:ef89ad03ed963db6a75f6c96209638cbbc5b5ba21369bfbb6700d4737df82436",
                  "egress_digest": "sha256:0e22d1de353f842c911d6dd7111f52fb9547e5fdb0d3483425c4c294217ba40b",
                  "path": "claims/e5/CLM-e577b61eec8d3ba18cfba0ab124e0e5a.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:3887ec4ac5acd32356b9f77b0a5af4119fda60a5b5723d9aae2064c520d10d19",
                  "change_kind": "claim",
                  "change_digest": "sha256:e45ee067850e81adfbb398f2f58a8ead610f727d4aabdb249166caf7441b0c96"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 16,
                  "item_key": "00000016.b29ee077bf57689eb6b574bafc17b187",
                  "manifest_digest": "sha256:f858ba8b3bf7752faeb2640129374f34efdee2f828731aff5d30b1945d2adbd6",
                  "egress_digest": "sha256:114632f4326ed9fe2820bc9afeb4a81ceb6eee61a762a0126f5f22aa4a20c61b",
                  "path": "subjects/security.vulnerability/cve-2026-34480.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:7ac6fe4c5e322c5b05079a23cde3e2f8966405faadb95afc1ad6807064c79ca4",
                  "change_kind": "subject",
                  "change_digest": "sha256:20c863c65dd1283c59eb42919164445020d22556a524164a570831b8f131796e"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 17,
                  "item_key": "00000017.477d863789ddd9a216269459af991f6d",
                  "manifest_digest": "sha256:d83ae5ba2b57ae75dbf7ef912d4304603adccfd5f16573ac13a90eab3b6ddf97",
                  "egress_digest": "sha256:34608a76e8f73f0f9d61b89c109863d536f94b0a03a92f062e0729d85775d955",
                  "path": "claims/6e/CLM-6e6f9abfeae22de66a67ba1e6a49be8a.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:5d269db913b871fd78d704c826a6aab88b3f56e2ba16b3a0fd41644e94b2a64f",
                  "change_kind": "claim",
                  "change_digest": "sha256:d31798fa16257de6403129e7841136d455fc33a46442afb9865ded04ad5f1020"
                }
              ],
              "journal_coordinate": {
                "tag": "playbill-procedure-journal-coordinate-v1",
                "stream_instance_id": "inst_console05",
                "journal_family": "procedure-exhaust-v1",
                "stream_id": "procedures",
                "partition_id": "line:1b1bc4051f50aafb1a6694d1ccd9837434f6508973caef4e0896aec4aca92359",
                "sequence": 54,
                "record_digest": "sha256:8b57a131e26969b7c306786c65b44999dedbcf3b323651786706139de7d76c96"
              },
              "settle_outcome": "settled",
              "accepted_git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
              "fallback_reason": null,
              "outside_scope": [],
              "capped_by": null,
              "prior_refusal_coverage": null
            }
          ],
          "next": [
            "cx.get(\"Procedure:security.osv-query\")",
            "cx.get(\"Line:security.osv-query\")",
            "cx.get(\"ProcedureRun:RUN-16d63a8778a1f390e2eac150ccbc0700d31ef5be407fe4c261d91b950beaf051\", detail=\"proof\")"
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
        "evaluation_time": "2026-11-08T19:48:02.065641Z"
      }
    ]
  }
});
