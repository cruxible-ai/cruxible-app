// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/proposals/sha256:0ed594993b3e4bcabbb9609c5f2bf7dbe4ca3d2a44da6cc0007b5a5a71baa8e6/review aa860519
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/proposals/{proposal_id}/review",
  "pathParams": {
    "proposal_id": "sha256:0ed594993b3e4bcabbb9609c5f2bf7dbe4ca3d2a44da6cc0007b5a5a71baa8e6"
  },
  "body": {},
  "response": {
    "tag": "playbill-proposal-review-v1",
    "coordinate_kind": "provisional",
    "proposal_id": "sha256:0ed594993b3e4bcabbb9609c5f2bf7dbe4ca3d2a44da6cc0007b5a5a71baa8e6",
    "candidate": {
      "tag": "playbill-validated-candidate-v3",
      "candidate": {
        "tag": "playbill-candidate-v2",
        "parent_semantic_root": "sha256:7b5fbd271a4f4ede93d8e2fec62d49a265e11357ebefe085a9fd4b2edc75080c",
        "candidate_manifest_root": "merkle-sha256:789b479a9f9b3d58dc8a3b18fe96d0cbbd06769a2792f20bf662416a0fe924fd",
        "semantic_diff_digest": "sha256:19ea104d43aa321b0d4149297d68d62f81a39c87889304696f33a26bdee25cd3",
        "scope": [
          "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json"
        ],
        "timestamp": "2026-10-26T19:00:07.921167Z"
      },
      "candidate_digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d",
      "required_tier": "governed_write",
      "approval_requirements": [],
      "activation_policy": "snapshot",
      "closure_proof": {
        "tag": "playbill-closure-proof-v3",
        "strategy": "dependency-closure-v3",
        "paths": [
          "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json"
        ],
        "dependency_edge_root": "depgraph-sha256:69be25cabfaa9534de3492a8defd127555b8d1743079ecb2e8efb85f3b40870d",
        "member_evidence_digest": "sha256:5f676937984b816fd75ec9164cb8531cffb05eeb7d110763a32266057628742e"
      },
      "members": [
        {
          "tag": "playbill-candidate-member-law-evidence-v2",
          "path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
          "artifact_kind": "claim",
          "disposition": "create",
          "predecessor_artifact_digest": null,
          "candidate_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
          "law_identifier": "playbill.claim.v2",
          "law_digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31",
          "law_evidence_digest": "sha256:4cc975c4f7283351d2b176c464cfcdc1878125b0928aa250c88bcac99fa1c537",
          "closure_role": "authored",
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "claim-types/security.assessment/justification.json",
              "target_artifact_digest": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
              "target_artifact_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
              "pin_role": "subject"
            }
          ]
        }
      ],
      "law_evidence": [
        {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
          "law_identifier": "playbill.claim.v2",
          "law_digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31",
          "evaluation_time": "2026-10-26T19:00:07.921167Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "4019b67c5537ab5721f8720d1d052047ce4b49fa",
            "semantic_root": "sha256:7b5fbd271a4f4ede93d8e2fec62d49a265e11357ebefe085a9fd4b2edc75080c",
            "generation_root": "sha256:e3beb009b4d18bcd874be3ce97e44ce6cc4c9c34e0e2cf63a6accc7e85dc0641",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "claim-types/security.assessment/justification.json",
              "target_artifact_digest": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
              "target_artifact_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:122ef6b742785585eb18c39c96a2637a0d865062a3f3b9ab31639d8a42d4efef",
            "sha256:315cccfed20a863b0155c8bdf91d26a73723c4665e12b8761112c50418f6480a",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:9a69b22fe9ae0c9a3efad6d4d48eb70bd6a16bb97523ee7ef7bf6e38319d8778",
              "artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "evaluation_time": "2026-10-26T19:00:07.921167Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31",
              "statement_digest": "sha256:f3dbc969f2c448932d861db15c94fa7c46afa04c2cb6845d99b1fe6805877810",
              "tag": "playbill-claim-law-evidence-v1",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac",
                  "control_domain": "principal.robertmalone",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-10-26T19:00:07.921167Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "robertmalone"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:9a69b22fe9ae0c9a3efad6d4d48eb70bd6a16bb97523ee7ef7bf6e38319d8778",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:f3dbc969f2c448932d861db15c94fa7c46afa04c2cb6845d99b1fe6805877810",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.robertmalone"
                    ],
                    "evidence_digests": [
                      "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-10-26T19:00:07.921167Z",
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac"
                ],
                "tag": "playbill-claim-verdict-v1",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:f3dbc969f2c448932d861db15c94fa7c46afa04c2cb6845d99b1fe6805877810",
            "verdict": "accepted"
          },
          "diagnostics": []
        }
      ],
      "law_digests": {
        "playbill.claim.v2": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
      },
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "candidate_digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d",
    "parent_semantic_root": "sha256:7b5fbd271a4f4ede93d8e2fec62d49a265e11357ebefe085a9fd4b2edc75080c",
    "settlement_base": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "4019b67c5537ab5721f8720d1d052047ce4b49fa",
      "semantic_root": "sha256:7b5fbd271a4f4ede93d8e2fec62d49a265e11357ebefe085a9fd4b2edc75080c",
      "generation_root": "sha256:e3beb009b4d18bcd874be3ce97e44ce6cc4c9c34e0e2cf63a6accc7e85dc0641",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "base_oid": "4019b67c5537ab5721f8720d1d052047ce4b49fa",
    "complete_members": [
      {
        "tag": "playbill-candidate-member-law-evidence-v2",
        "path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
        "law_identifier": "playbill.claim.v2",
        "law_digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31",
        "law_evidence_digest": "sha256:4cc975c4f7283351d2b176c464cfcdc1878125b0928aa250c88bcac99fa1c537",
        "closure_role": "authored",
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
            "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
            "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
            "target_path": "claim-types/security.assessment/justification.json",
            "target_artifact_digest": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
            "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
            "target_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "target_artifact_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
            "pin_role": "subject"
          }
        ]
      }
    ],
    "members": [
      {
        "path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
        "artifact_kind": "claim",
        "disposition": "create",
        "closure_role": "authored",
        "predecessor_artifact_digest": null,
        "candidate_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
        "base_semantic_artifact": null,
        "candidate_semantic_artifact": {
          "artifact_format": "playbill-claim-v2",
          "backing": {
            "attestation_digests": [],
            "capture_digests": [
              "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac"
            ],
            "citations": [
              {
                "capture_digest": "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac",
                "citation_id": "sha256:1f788972abb2773739aa7d2d855aa95fcbdd3bf80ffadb3548883b1b5628c06b",
                "origin": "self_source",
                "role": "copy",
                "tag": "playbill-claim-citation-v1"
              }
            ],
            "input_claim_digests": [],
            "reducer_digest": null,
            "referent_context": {
              "object_content_digest": null,
              "observed_at": "2026-10-26T19:00:07.921167Z",
              "subject_content_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
              "tag": "playbill-claim-referent-context-v1"
            },
            "source_mappings": [
              {
                "spans": [
                  {
                    "content_digest": "sha256:2850fd877c3da5c1784c5c5f5dfb9def0f16f373adeb1c1793c1a39cd2182eba",
                    "end_byte": 107,
                    "start_byte": 0,
                    "tag": "playbill-content-span-v1"
                  }
                ],
                "subject": {
                  "artifact_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
                  "selector": {
                    "scheme": "claim-statement-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "tag": "playbill-source-mapping-v1"
              }
            ],
            "tag": "playbill-claim-backing-v2"
          },
          "identity": {
            "kind": "Claim",
            "name": "CLM-709a88c60fd24902ef8ba3a974e99d7a"
          },
          "lifecycle": {
            "predecessor_digest": null,
            "state": "live"
          },
          "pins": [
            {
              "artifact_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
              "role": "capture-contract",
              "target": {
                "kind": "CaptureContract",
                "name": "playbill.coordinator-self-source-v1"
              }
            },
            {
              "artifact_digest": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b",
              "role": "claim-type",
              "target": {
                "kind": "ClaimType",
                "name": "security.assessment.justification"
              }
            },
            {
              "artifact_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
              "role": "subject",
              "target": {
                "kind": "Subject",
                "name": "security.assessment/gate-app-1.0.0--cve-2021-44228"
              }
            }
          ],
          "statement": {
            "claim_type": {
              "kind": "ClaimType",
              "name": "security.assessment.justification"
            },
            "claim_type_digest": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b",
            "effective_from": null,
            "effective_until": null,
            "object": {
              "kind": "literal",
              "value": "inline_mitigations_already_exist"
            },
            "predicate": "security.assessment.justification",
            "qualifier": null,
            "role": "normative",
            "shell_context_digest": null,
            "subject": {
              "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "tag": "playbill-claim-statement-v1"
          }
        },
        "semantic_delta": [
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/artifact_format",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-v2"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/attestation_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/capture_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac"
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/citations",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "capture_digest": "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac",
                  "citation_id": "sha256:1f788972abb2773739aa7d2d855aa95fcbdd3bf80ffadb3548883b1b5628c06b",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/input_claim_digests",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": []
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/reducer_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/object_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/observed_at",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "2026-10-26T19:00:07.921167Z"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/subject_content_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/referent_context/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-referent-context-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/source_mappings",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:2850fd877c3da5c1784c5c5f5dfb9def0f16f373adeb1c1793c1a39cd2182eba",
                      "end_byte": 107,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
                    "selector": {
                      "scheme": "claim-statement-v1",
                      "value": ""
                    },
                    "tag": "playbill-semantic-address-v1"
                  },
                  "tag": "playbill-source-mapping-v1"
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/backing/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-backing-v2"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "Claim"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/identity/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "CLM-709a88c60fd24902ef8ba3a974e99d7a"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/predecessor_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/lifecycle/state",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "live"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/pins",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": [
                {
                  "artifact_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.justification"
                  }
                },
                {
                  "artifact_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.assessment/gate-app-1.0.0--cve-2021-44228"
                  }
                }
              ]
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "ClaimType"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type/name",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.assessment.justification"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/claim_type_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_from",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/effective_until",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/kind",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "literal"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/object/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "inline_mitigations_already_exist"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/predicate",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "security.assessment.justification"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/qualifier",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/role",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "normative"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/shell_context_digest",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": null
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/artifact_path",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/scheme",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "artifact-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/selector/value",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": ""
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/subject/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-semantic-address-v1"
            }
          },
          {
            "tag": "playbill-semantic-field-delta-v1",
            "field_path": "/statement/tag",
            "before": {
              "state": "absent",
              "value": null
            },
            "after": {
              "state": "present",
              "value": "playbill-claim-statement-v1"
            }
          }
        ],
        "law_identifier": "playbill.claim.v2",
        "law_digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31",
        "law_evidence": {
          "tag": "playbill-member-law-evaluation-v2",
          "path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
          "law_identifier": "playbill.claim.v2",
          "law_digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31",
          "evaluation_time": "2026-10-26T19:00:07.921167Z",
          "evaluation_coordinate": {
            "tag": "playbill-law-evaluation-coordinate-v1",
            "git_oid": "4019b67c5537ab5721f8720d1d052047ce4b49fa",
            "semantic_root": "sha256:7b5fbd271a4f4ede93d8e2fec62d49a265e11357ebefe085a9fd4b2edc75080c",
            "generation_root": "sha256:e3beb009b4d18bcd874be3ce97e44ce6cc4c9c34e0e2cf63a6accc7e85dc0641",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "dependency_proof_refs": [
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "target_artifact_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
              "pin_role": "capture-contract"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "claim-types/security.assessment/justification.json",
              "target_artifact_digest": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b",
              "pin_role": "claim-type"
            },
            {
              "tag": "playbill-dependency-proof-ref-v1",
              "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
              "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "target_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
              "target_artifact_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
              "pin_role": "subject"
            }
          ],
          "policy_digests": [
            "sha256:122ef6b742785585eb18c39c96a2637a0d865062a3f3b9ab31639d8a42d4efef",
            "sha256:315cccfed20a863b0155c8bdf91d26a73723c4665e12b8761112c50418f6480a",
            "sha256:9a1bab9f2ee864ef054fd8c81cf81029d8837b3c5f55860e8693ce1e8ac461e2"
          ],
          "query_receipt_digests": [],
          "result": {
            "artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
            "claim_admission": [],
            "claim_evidence": {
              "adjudication_rule_digest": "sha256:9a69b22fe9ae0c9a3efad6d4d48eb70bd6a16bb97523ee7ef7bf6e38319d8778",
              "artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
              "evaluation_time": "2026-10-26T19:00:07.921167Z",
              "evidence_basis": [
                "direct"
              ],
              "initial_verdict": "supported",
              "law_digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31",
              "statement_digest": "sha256:f3dbc969f2c448932d861db15c94fa7c46afa04c2cb6845d99b1fe6805877810",
              "tag": "playbill-claim-law-evidence-v1",
              "verdict_captures": [
                {
                  "admission": "direct",
                  "basis_kind": "replay_verified",
                  "capture_digest": "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac",
                  "control_domain": "principal.robertmalone",
                  "current_replay_available": true,
                  "epistemic_grade": "observed",
                  "observed_at": "2026-10-26T19:00:07.921167Z",
                  "producer": {
                    "kind": "Principal",
                    "name": "robertmalone"
                  },
                  "provenance_grade": "self-asserted",
                  "source_effective_until": null,
                  "tag": "playbill-capture-verdict-evidence-v1",
                  "upstream_provenance": []
                }
              ],
              "verdict_result": {
                "adjudication_rule_digest": "sha256:9a69b22fe9ae0c9a3efad6d4d48eb70bd6a16bb97523ee7ef7bf6e38319d8778",
                "authority_basis": [],
                "basis_kinds": [
                  "replay_verified"
                ],
                "claim_statement_digest": "sha256:f3dbc969f2c448932d861db15c94fa7c46afa04c2cb6845d99b1fe6805877810",
                "contradicting_evidence_digests": [],
                "control_components": [
                  {
                    "control_domains": [
                      "principal.robertmalone"
                    ],
                    "evidence_digests": [
                      "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac"
                    ],
                    "provider_identities": []
                  }
                ],
                "currency": "current",
                "epistemic_grades": [
                  "observed"
                ],
                "evaluation_time": "2026-10-26T19:00:07.921167Z",
                "provenance_grades": [
                  "self-asserted"
                ],
                "refusal_codes": [],
                "supporting_evidence_digests": [
                  "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac"
                ],
                "tag": "playbill-claim-verdict-v1",
                "unsure_evidence_digests": [],
                "verdict": "supported"
              },
              "verified_attestation_digests": [],
              "verified_attestations": []
            },
            "referrers": [],
            "statement_digest": "sha256:f3dbc969f2c448932d861db15c94fa7c46afa04c2cb6845d99b1fe6805877810",
            "verdict": "accepted"
          },
          "diagnostics": []
        },
        "dependency_proof_refs": [
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
            "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
            "target_path": "capture-contracts/playbill.coordinator-self-source-v1.json",
            "target_artifact_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
            "pin_role": "capture-contract"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
            "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
            "target_path": "claim-types/security.assessment/justification.json",
            "target_artifact_digest": "sha256:08655a4f8af4244bf3381cb8b6e88dcbed48a35596a9b2ca0acc9b16a16c3b8b",
            "pin_role": "claim-type"
          },
          {
            "tag": "playbill-dependency-proof-ref-v1",
            "source_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
            "source_artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
            "target_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "target_artifact_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
            "pin_role": "subject"
          }
        ],
        "prior_refusals": []
      }
    ],
    "governance": {
      "activation_policy": "snapshot",
      "approval_requirements": [],
      "law_digests": {
        "playbill.claim.v2": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
      },
      "required_tier": "governed_write"
    },
    "provenance": {
      "actor_id": "robertmalone",
      "source_compilation_digest": null
    },
    "rationale": "gate-app launches log4j-core 2.14.1 with formatMsgNoLookups=true, so JNDI lookups in messages are disabled.",
    "item_reasons": [],
    "item_reason_count": 0,
    "item_reasons_next_cursor": null,
    "attestation_coverage": {
      "attestations": [],
      "coverage": "containing_change_set",
      "coverage_basis": {
        "candidate_digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d",
        "scope": [
          "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json"
        ]
      }
    },
    "documents": [],
    "redactions": [
      "body",
      "readable_diff",
      "source_mapping"
    ],
    "projection_advisory": null,
    "projection_evidence": null,
    "prior_refusal_coverage": null
  }
});
