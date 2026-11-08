// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch ed19424c
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3"
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
        "ref": "ProcedureRun:RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
          "procedure": "Procedure:security.kev-triage",
          "status": "succeeded",
          "nodes_done": 4,
          "nodes_total": 4,
          "started_at": "2026-11-07T18:00:00Z",
          "elapsed_us": 284301,
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
                  "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
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
              "node": "entries",
              "kind": "extract",
              "verdict": "succeeded",
              "sequence": 10,
              "summary": {
                "kind": "extract",
                "records": 20,
                "invalid_records": 0,
                "duplicates": 0,
                "invalid_fields": 0,
                "complete": true,
                "complete_when": {
                  "count_at": "/count",
                  "expected": 20,
                  "observed": 20,
                  "held": true
                }
              }
            },
            {
              "node": "write",
              "kind": "claims",
              "verdict": "succeeded",
              "sequence": 25,
              "summary": {
                "kind": "claims",
                "written": 4,
                "revised": 0,
                "inverse_written": 8,
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
            "occurrence": "sha256:14f0c4fb4ba0092b4537bbad96524c9aad91f5df4104d3515a714c842dcd605c"
          },
          "actor": "owner",
          "receipt_digest": "sha256:39379c9e85546c22456a4d57aa9a40d212e8a36b2211f4ca36bb1c693c2333c8",
          "result": {},
          "outcomes": [
            {
              "sequence": 7,
              "event_kind": "produced_capture",
              "node_id": "catalog",
              "payload_digest": "sha256:3f078d1aaac447b12cf45fa32659218e4ad55c08538267715c03ff85adcc5b37",
              "capture_event": {
                "run_id": "RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3",
                "partition_id": "line:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
                "sequence": 7,
                "record_digest": "sha256:3fa6b0b5390fb2bd3e266c4bf98adad663377a96624a8d880a8fb647fd60915a"
              }
            },
            {
              "sequence": 8,
              "event_kind": "node_fired",
              "node_id": "catalog",
              "payload_digest": "sha256:9f9d3ac0b084c3fbd19172a88ca9ec8eae20e4737c6fbc891c07040cf18ce7a7"
            },
            {
              "sequence": 9,
              "event_kind": "node_fired",
              "node_id": "watched",
              "payload_digest": "sha256:9b0a231ac4713737ae4511d2c78353bf5ec683698d4fdc5addad8863d5030a58"
            },
            {
              "sequence": 10,
              "event_kind": "node_fired",
              "node_id": "entries",
              "payload_digest": "sha256:5a59c9c1e16e98f5541f4a39cffcb886bec3a86e740ecf9dbe5b83ba680a5e53"
            },
            {
              "sequence": 25,
              "event_kind": "node_fired",
              "node_id": "write",
              "payload_digest": "sha256:63e3df01a68e653842b49c8a7df691cc63876a33b4b1f5d33b0f2c7888cecdc3"
            },
            {
              "sequence": 26,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:00a99a354a300254c9ced120ed6965e972ee7b67f8da53b132849cca003a0f06"
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
              "operation_key": "sha256:c499947384511d15a5646dd2c16e4677045474bd8ba71eea7e4df707cd945a5b",
              "procedure_mandate_digest": "sha256:d04a2dc2166a86cc54c8440024e39a152756ac956d0ace3cf874af1c63102537",
              "target_paths": [
                "claims/09/CLM-0955dffd8ac7482b3b2dfb54ebaaf39d.json",
                "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
                "claims/19/CLM-192c23be74b94747f2483672df1690f0.json",
                "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
                "claims/32/CLM-32c458928f64935b2e56d78d29834a69.json",
                "claims/35/CLM-35d6991a854e209eb6b1690c901dede0.json",
                "claims/45/CLM-451efce0eb50eafd9c199f90f8b74897.json",
                "claims/76/CLM-76f60748854f8fe0e4b701d4d9555417.json",
                "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
                "claims/b9/CLM-b975b2a8663904b11048323f620948ea.json",
                "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
                "claims/c7/CLM-c72168eed420b1b72725188c23a0b32a.json"
              ],
              "proposal_id": "sha256:c842362f107ede13a7255800a53f5149252a5b10f4118f1d4fb50248f4a559a8",
              "candidate_digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1",
              "refusal_code": null,
              "children": [
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 0,
                  "item_key": "00000000.dca89cf0c8e2e03101f9b0992d7c0b06",
                  "manifest_digest": "sha256:8521bd807a4acad9724e21107584f31b3fb7bd62958c0238e5913dd8d5e8d152",
                  "egress_digest": "sha256:c1b8f8f80ee6b929d67d7488ab3b1e2e9d9abea28f1a3db45aeb789b8c954de7",
                  "path": "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:9cd529f0f3b1511c05bbce0b5007e51607ce42829860a3144e8feea8c6f4f32e",
                  "change_kind": "claim",
                  "change_digest": "sha256:57768d4a884df713a8d882ccddf071219ce0d1ad0aac19b2b868db6a48183aa5"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 1,
                  "item_key": "00000001.4402bf0000f884cb9aa29ac6871878de",
                  "manifest_digest": "sha256:54f91dfb215136639566a4a9b1794b9afef450072f3e6a348d7ee642d0cb4700",
                  "egress_digest": "sha256:929e4012d89f563fcf7b2c3c6c7e20bb8dadb00aa4f7c4163326ea16a749f81c",
                  "path": "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:58b7305f8e26a8e6969acf7608f5a4f8e938d5b02e00e083a6566f5d1bba5dba",
                  "change_kind": "claim",
                  "change_digest": "sha256:b9c98c5216079f43e7724467c2711bd169eb8ddee1a8d621e0938916128ed4c9"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 2,
                  "item_key": "00000002.b5ae51d372e977ea4d52f77d90e58e3e",
                  "manifest_digest": "sha256:88de2852a86625f3f414d4d4b17da1a601f2c262ed8732903e42d08c250581f6",
                  "egress_digest": "sha256:e36377908796716263680429883771de78d71509daa6d1dac2e9bae01d678605",
                  "path": "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:342c6b05c7125aa09f35a10256cc11f4a2e48e9cc122ca10f0d34c92f1415562",
                  "change_kind": "claim",
                  "change_digest": "sha256:428eb5c5592bfcf3372bd4937641fe0d36d75af3cc34eab419ce5eede1dbfd83"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 3,
                  "item_key": "00000003.05e070bf49354c8c767038901b021608",
                  "manifest_digest": "sha256:d07999d4148487426dd08130ff1ef84e4ba6e852b901c7b021553af4743b27c1",
                  "egress_digest": "sha256:0558068170061a68fb2a189ed38c1c0d940ebe5004b15cc68735c88c93e1d883",
                  "path": "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:633c6ab5595423584f527b42b0a118a6bfe8362e294dbf10686db6f87915ef30",
                  "change_kind": "claim",
                  "change_digest": "sha256:c721de06b86c2f7150a21fccce79b1f02f0a58f2fd37d25739e86d6900e6e234"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 4,
                  "item_key": "00000004.2c75d49f6395f6ff825ba40533f99c5b",
                  "manifest_digest": "sha256:694953a89a0c1d0763fa8cfdf203fcd50a99c44302afbac6ee90e36c3e7baf09",
                  "egress_digest": "sha256:5a99586a2e53e28b3ee882a0fbb5ca6b079b7daacc137098c5cfd4e995d48503",
                  "path": "claims/45/CLM-451efce0eb50eafd9c199f90f8b74897.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:897aa11c737730d67873c09401e38db7d4cffe141c1e23403cadf159844617b7",
                  "change_kind": "claim",
                  "change_digest": "sha256:9dfe4fa3cb55e6d6bc766600eb68bf39be5a2312efd84663239bb2ffd2a26331"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 5,
                  "item_key": "00000005.c3bf579bcc061721c406be05a193d496",
                  "manifest_digest": "sha256:6a24820c749eeeb896dac37c6d7b84647ea11918d2b337110380af70355f8048",
                  "egress_digest": "sha256:10222e335f1dd8f196b80ebfddcfbad31385ecd76ae8c3716d966e2b0bd261b4",
                  "path": "claims/35/CLM-35d6991a854e209eb6b1690c901dede0.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:c71ac0e0d2714424964839d503a9f58741b159e7c01db5dc78083f037824a57f",
                  "change_kind": "claim",
                  "change_digest": "sha256:f7c5f54371fc08d3b88ffcd7b2de9a81eb50e20a61c394fb260b0c348aff832f"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 6,
                  "item_key": "00000006.0a5eb46d00f44fd81654336d2d6117bf",
                  "manifest_digest": "sha256:05b512d7a455d35e957db7d19c242b18a264a823f9a7e484791b41969bec4886",
                  "egress_digest": "sha256:ee74cfe03024ae15e9028a749a5bdf91a8c446be4d74597f6410683b9f584692",
                  "path": "claims/c7/CLM-c72168eed420b1b72725188c23a0b32a.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:925dc743c2cef542a447c832a65be9c8263de40d97f5a6a360b58258fd19b2b6",
                  "change_kind": "claim",
                  "change_digest": "sha256:6af339a001efed238c0408e2073682ea671d0950d4affbe59a01922b03a96e1d"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 7,
                  "item_key": "00000007.a75c14c155fc1eef2619d963bb07bfb4",
                  "manifest_digest": "sha256:ca92ac9b97380a423eba8506bc631f1de647137dca6d8a6dffe0ed608d0e5607",
                  "egress_digest": "sha256:06485a78a0f33a7caf31e2773e62605df879d143e62e5bd7c64bf6c43dca6395",
                  "path": "claims/09/CLM-0955dffd8ac7482b3b2dfb54ebaaf39d.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:1de1b610a1b55ed75b3f1ddd75418e38318d26cc65caccda37ba171ec1ba1781",
                  "change_kind": "claim",
                  "change_digest": "sha256:314d433e68544f758efce63063d66991b4272bbe254f9807a232b27823caa6a4"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 8,
                  "item_key": "00000008.0aa255512bd3c0e27bcb21113cb07cbb",
                  "manifest_digest": "sha256:011070e4ee5569c756d618ebbfbafe9171e0f9e27b9bee59b75f323587345763",
                  "egress_digest": "sha256:a08d7352ff69f20df3e483e3cee3c83e832968a17a2ae74b0ce5e560ee073fc9",
                  "path": "claims/32/CLM-32c458928f64935b2e56d78d29834a69.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:1842204bfef3a9fe3c46b892de1b3bd297c39362ce4cfc453c526118e75cb1a3",
                  "change_kind": "claim",
                  "change_digest": "sha256:a1593011dffcd4d86dab847f87b53265354ae4bc6677465a5b476aea1b085c8b"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 9,
                  "item_key": "00000009.05ebb1e92ad143cfacde56938630401c",
                  "manifest_digest": "sha256:02d7a4c5dfc73bbc0685e9e7c4590d8ee26a03bcf6d90898a4224aebcfa9a15b",
                  "egress_digest": "sha256:8da7282c92db2b819e7429742452e91f2286f015aa6ea14fbcf84c35295e61ff",
                  "path": "claims/76/CLM-76f60748854f8fe0e4b701d4d9555417.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:bf29afefed0ee48925f34e8c3c23f151ea85b2e0571b5543fc42bd5be2ed1c7f",
                  "change_kind": "claim",
                  "change_digest": "sha256:58781f9d72a8cf7f8062fc4bc9fb01f8a4e2581987fa2dbb535a8a301642280d"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 10,
                  "item_key": "00000010.ac3f9db8ea9104736200d5a8ded08a02",
                  "manifest_digest": "sha256:99a34f9a472299ac03b4b89b178cd16cff4e467403d5ed6d9b67b55691d7c69e",
                  "egress_digest": "sha256:fcc944c08410383ecd319bf7b4e7f0a2772f2d14632f729694a386a378331dfa",
                  "path": "claims/b9/CLM-b975b2a8663904b11048323f620948ea.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:912a14085cdb41a567fe202c80fff026f7c8e4ea31f15671ccbdad1e2e71db13",
                  "change_kind": "claim",
                  "change_digest": "sha256:848b20d27bc037c96dadebbdef9e09bcd6972a3ef34c6da33c1964a016cd36b0"
                },
                {
                  "tag": "playbill-procedure-terminal-egress-child-v1",
                  "child_index": 11,
                  "item_key": "00000011.d9ffc27bf4f9c326376965f9c90f0ff6",
                  "manifest_digest": "sha256:a833eef87be18fda8ae2035973e83a3bd16173805b58ffa81a53b050ae8a3676",
                  "egress_digest": "sha256:5ab89af1543dd6b1d38f0e020a66d24b119d07451e3304e8fc1c8615021bae10",
                  "path": "claims/19/CLM-192c23be74b94747f2483672df1690f0.json",
                  "prior_refusals": [],
                  "item_identity_digest": "sha256:9b7b45b9177eb2023a4930732df600cdbac235b0e7b3a71c41bf38b88f04a33e",
                  "change_kind": "claim",
                  "change_digest": "sha256:eca7370188e4fa73797dcb5b31bca26c7a521dd3835eb602534cfd199141d185"
                }
              ],
              "journal_coordinate": {
                "tag": "playbill-procedure-journal-coordinate-v1",
                "stream_instance_id": "inst_console05",
                "journal_family": "procedure-exhaust-v1",
                "stream_id": "procedures",
                "partition_id": "line:49312bd14c1ec1b55a2c30cf3158b7f6a17180abad247d8c935714fdab9381b9",
                "sequence": 24,
                "record_digest": "sha256:135424dcfbcb6e7dc56b65ca38e24e0c893c6c0badcb3e0c20d498a2a4d70b22"
              },
              "settle_outcome": "settled",
              "accepted_git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
              "fallback_reason": null,
              "outside_scope": [],
              "capped_by": null,
              "prior_refusal_coverage": null
            }
          ],
          "next": [
            "cx.get(\"Procedure:security.kev-triage\")",
            "cx.get(\"Line:security.kev-triage\")",
            "cx.get(\"ProcedureRun:RUN-bd554f3047572f1b8a48daf9e7222d4b01c6cc61cd0ec24afe202a5c05f832d3\", detail=\"proof\")"
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
        "evaluation_time": "2026-11-08T19:48:02.137615Z"
      }
    ]
  }
});
