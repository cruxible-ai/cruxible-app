// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 0fafa81d
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "ProcedureRun:RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165"
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
        "ref": "ProcedureRun:RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
        "kind": "procedure_run",
        "detail": "summary",
        "card": {
          "run": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
          "procedure": "Procedure:security.epss-triage",
          "status": "succeeded",
          "nodes_done": 5,
          "nodes_total": 5,
          "started_at": "2026-11-07T18:00:00Z",
          "elapsed_us": 226724,
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
          ],
          "pending_inputs": [],
          "triggered_by": {
            "line": "Line:security.epss-triage",
            "occurrence": "sha256:8a22c93d91635c75630f28ae4ff1d4093ee35e16c3f82565da03140762f38c10"
          },
          "actor": "owner",
          "receipt_digest": "sha256:9d713014fe601df8ba2eca8b584936157fb609ef0eef848b386f073b44ac9706",
          "result": {},
          "outcomes": [
            {
              "sequence": 7,
              "event_kind": "produced_capture",
              "node_id": "scores_api",
              "payload_digest": "sha256:306ad906396d32668b1ecad1e02c7196b294aca4bee5ed369583787a2f326b7d",
              "capture_event": {
                "run_id": "RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165",
                "partition_id": "line:336467aba4829d68d1850315c1b706c4c9b614f8a345cb33a0be59635b67bd16",
                "sequence": 7,
                "record_digest": "sha256:dad7ab62a26ead6ca46fde8540d931239807f3c6b544a80061e23513e1cab539"
              }
            },
            {
              "sequence": 8,
              "event_kind": "node_fired",
              "node_id": "scores_api",
              "payload_digest": "sha256:c3593344f2784a5d6ea12ecbcb9d47e10e5b247e8ef44e4dea63bf4c65392c7e"
            },
            {
              "sequence": 9,
              "event_kind": "node_fired",
              "node_id": "watched",
              "payload_digest": "sha256:e7f87251d8f8a3e0bd665753d472d0f2ac3bfa72efcaeaf75b392c615142b605"
            },
            {
              "sequence": 10,
              "event_kind": "node_fired",
              "node_id": "watch_keys",
              "payload_digest": "sha256:1a700d7c6b42ac41606a2393456a8c7ff4414d1381301487bce2ca035173ca11"
            },
            {
              "sequence": 11,
              "event_kind": "node_fired",
              "node_id": "scores",
              "payload_digest": "sha256:1ca73f323dd64e460de91263f28aaf590015b4d5e33fb8bd6914ca4e73d10bfa"
            },
            {
              "sequence": 17,
              "event_kind": "node_fired",
              "node_id": "write",
              "payload_digest": "sha256:60f7c314aa7df0ef26a0d67fe51f70219a54dea5673174f4df734a7a35b57a57"
            },
            {
              "sequence": 18,
              "event_kind": "attempt_finalized",
              "payload_digest": "sha256:715b14c4a24b8aa6c2a0880d8187228a0df4150f61afabed670feaff758faf70"
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
          "next": [
            "cx.get(\"Procedure:security.epss-triage\")",
            "cx.get(\"Line:security.epss-triage\")",
            "cx.get(\"ProcedureRun:RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165\", detail=\"proof\")"
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
        "evaluation_time": "2026-11-07T22:23:00.898779Z"
      }
    ]
  }
});
