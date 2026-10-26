// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch fb29a608
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-9e4f8791743a16db325166310248d6d2",
      "CLM-4e1b9e461c6145b7edef755aba170415",
      "CLM-709a88c60fd24902ef8ba3a974e99d7a",
      "CLM-56fd1b8ae5704e251b220c4e289cab4a",
      "CLM-98f75f5e4cd545d223ba0b1ce0e0427e",
      "CLM-76f9a4e45c6e684f32582bf12b1c690c",
      "CLM-d8674016342604fe9cf0b887fdb4ade5",
      "CLM-40eaf84ec507878cf8bf96ef60469512"
    ],
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    }
  },
  "response": {
    "tag": "playbill-claim-read-batch-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "claims": [
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-9e4f8791743a16db325166310248d6d2",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/9e/CLM-9e4f8791743a16db325166310248d6d2.json",
          "artifact_digest": "sha256:43137acabb74cd143c352a70253c0a2f53f6d00c937a8581be69accbc2bb597f",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "claim_attestations": [],
              "coverage_binding": {
                "coverage": "containing_change_set",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "subject_path": {
                  "$path": "claims/9e/CLM-9e4f8791743a16db325166310248d6d2.json"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.backing",
            "schema_version": 1,
            "fact_key": "evidence",
            "value": {
              "attestation_digests": [],
              "capture_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
                  "citation_id": "sha256:77963b24883757a9d41ffc6c7f5be7911dbb5d38a1f76246b4bfcfe82958ef26",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:44:38.124878Z",
                "subject_content_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                      "end_byte": 129261,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/9e/CLM-9e4f8791743a16db325166310248d6d2.json",
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
            }
          },
          {
            "schema_id": "cruxible.claim.current_verdict",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "adjudication_rule_digest": "sha256:7b9fbf3ff183750a39e49413a99d0b08bbb5a878cdd1640881e320a6344e393f",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:37a0220d40147e7a58c04277af72636568419c8b6a2d223ba2d698d650d4e253",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-10-26T17:44:38.124878Z",
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "tag": "playbill-claim-verdict-v1",
              "unsure_evidence_digests": [],
              "verdict": "uncovered"
            }
          },
          {
            "schema_id": "cruxible.claim.evidence_basis",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "admissions": [
                "direct"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
                ],
                "unsure": []
              }
            }
          },
          {
            "schema_id": "cruxible.claim.governance",
            "schema_version": 1,
            "fact_key": "accepted_governance",
            "value": {
              "activation_policy": "snapshot",
              "approval_requirements": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
              },
              "law_identifier": "playbill.claim.v2",
              "required_tier": "governed_write"
            }
          },
          {
            "schema_id": "cruxible.claim.history",
            "schema_version": 1,
            "fact_key": "ledger_history",
            "value": {
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  },
                  "sequence": 7
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000007.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.identity",
            "schema_version": 1,
            "fact_key": "lineage",
            "value": {
              "artifact_digest": {
                "$digest": "sha256:43137acabb74cd143c352a70253c0a2f53f6d00c937a8581be69accbc2bb597f"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-9e4f8791743a16db325166310248d6d2"
              },
              "input_digest": {
                "$digest": "sha256:7565590dd3785b6fd59cbfbe522566353d0de48ef8325323d6f18749be74a201"
              },
              "statement_address": {
                "artifact_path": "claims/9e/CLM-9e4f8791743a16db325166310248d6d2.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:37a0220d40147e7a58c04277af72636568419c8b6a2d223ba2d698d650d4e253"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.lifecycle",
            "schema_version": 1,
            "fact_key": "accepted_revision",
            "value": {
              "lifecycle": {
                "predecessor_digest": null,
                "state": "live"
              },
              "pins": [
                {
                  "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.fetched-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:5a68fc86eadcab471ec9b4eb02430579a2a71fe5265f11a58cac21b56d760923",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.component"
                  }
                },
                {
                  "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
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
            "schema_id": "cruxible.claim.provenance",
            "schema_version": 1,
            "fact_key": "accepted_source",
            "value": {
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:43137acabb74cd143c352a70253c0a2f53f6d00c937a8581be69accbc2bb597f"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:7565590dd3785b6fd59cbfbe522566353d0de48ef8325323d6f18749be74a201"
              },
              "source_compilation_digest": {
                "$digest": "sha256:cdc9c01de219aa82cc7cee9be798ea00d605f32b390ba00930732d90a4c9fbb1"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.source_mapping",
            "schema_version": 1,
            "fact_key": "source_0000",
            "value": {
              "spans": [
                {
                  "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                  "end_byte": 129261,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/9e/CLM-9e4f8791743a16db325166310248d6d2.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "tag": "playbill-source-mapping-v1"
            }
          },
          {
            "schema_id": "cruxible.claim.statement",
            "schema_version": 1,
            "fact_key": "proposition",
            "value": {
              "claim_type": {
                "kind": "ClaimType",
                "name": "security.assessment.component"
              },
              "claim_type_digest": "sha256:5a68fc86eadcab471ec9b4eb02430579a2a71fe5265f11a58cac21b56d760923",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              },
              "predicate": "security.assessment.component",
              "qualifier": null,
              "role": "observation",
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
          }
        ],
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:77963b24883757a9d41ffc6c7f5be7911dbb5d38a1f76246b4bfcfe82958ef26",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "source-verdict",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "source-verdict"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.component",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
          },
          "role": "observation",
          "qualifier": null,
          "lifecycle": "live",
          "predecessor_digest": null
        }
      },
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-4e1b9e461c6145b7edef755aba170415",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/4e/CLM-4e1b9e461c6145b7edef755aba170415.json",
          "artifact_digest": "sha256:db0dfe6deb09c4f4b76979d7c33eee2feb419a2aad7580b877583fed6301ed13",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "claim_attestations": [],
              "coverage_binding": {
                "coverage": "containing_change_set",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "subject_path": {
                  "$path": "claims/4e/CLM-4e1b9e461c6145b7edef755aba170415.json"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.backing",
            "schema_version": 1,
            "fact_key": "evidence",
            "value": {
              "attestation_digests": [],
              "capture_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
                  "citation_id": "sha256:bfc15e35483893a84f858f5230fb163fd79306d94e8711142fae8454c78ab9b8",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:44:38.124878Z",
                "subject_content_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                      "end_byte": 129261,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/4e/CLM-4e1b9e461c6145b7edef755aba170415.json",
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
            }
          },
          {
            "schema_id": "cruxible.claim.current_verdict",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "adjudication_rule_digest": "sha256:57bff4ccf02b5075bd6314239a8dab2905bf5c8f3a6e5b9dc853ba187bd65e5c",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:3e214d88535c892ce9618e27049565c3c79beb9f86e394da4b6fc044240f8900",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-10-26T17:44:38.124878Z",
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "tag": "playbill-claim-verdict-v1",
              "unsure_evidence_digests": [],
              "verdict": "uncovered"
            }
          },
          {
            "schema_id": "cruxible.claim.evidence_basis",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "admissions": [
                "origin_only"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
                ],
                "unsure": []
              }
            }
          },
          {
            "schema_id": "cruxible.claim.governance",
            "schema_version": 1,
            "fact_key": "accepted_governance",
            "value": {
              "activation_policy": "snapshot",
              "approval_requirements": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
              },
              "law_identifier": "playbill.claim.v2",
              "required_tier": "governed_write"
            }
          },
          {
            "schema_id": "cruxible.claim.history",
            "schema_version": 1,
            "fact_key": "ledger_history",
            "value": {
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  },
                  "sequence": 7
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000007.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.identity",
            "schema_version": 1,
            "fact_key": "lineage",
            "value": {
              "artifact_digest": {
                "$digest": "sha256:db0dfe6deb09c4f4b76979d7c33eee2feb419a2aad7580b877583fed6301ed13"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-4e1b9e461c6145b7edef755aba170415"
              },
              "input_digest": {
                "$digest": "sha256:b86de2c2bdcecc828ff4afe8dcc2a201d867b6e8a2bc2fad7ed39558faed3397"
              },
              "statement_address": {
                "artifact_path": "claims/4e/CLM-4e1b9e461c6145b7edef755aba170415.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:3e214d88535c892ce9618e27049565c3c79beb9f86e394da4b6fc044240f8900"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.lifecycle",
            "schema_version": 1,
            "fact_key": "accepted_revision",
            "value": {
              "lifecycle": {
                "predecessor_digest": null,
                "state": "live"
              },
              "pins": [
                {
                  "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.fetched-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:47ee58b1b7ed926d10ae9e9b5956f154d563e83e75800b20bc9cf7f044955200",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.cve_id"
                  }
                },
                {
                  "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
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
            "schema_id": "cruxible.claim.provenance",
            "schema_version": 1,
            "fact_key": "accepted_source",
            "value": {
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:db0dfe6deb09c4f4b76979d7c33eee2feb419a2aad7580b877583fed6301ed13"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:b86de2c2bdcecc828ff4afe8dcc2a201d867b6e8a2bc2fad7ed39558faed3397"
              },
              "source_compilation_digest": {
                "$digest": "sha256:cdc9c01de219aa82cc7cee9be798ea00d605f32b390ba00930732d90a4c9fbb1"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.source_mapping",
            "schema_version": 1,
            "fact_key": "source_0000",
            "value": {
              "spans": [
                {
                  "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                  "end_byte": 129261,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/4e/CLM-4e1b9e461c6145b7edef755aba170415.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "tag": "playbill-source-mapping-v1"
            }
          },
          {
            "schema_id": "cruxible.claim.statement",
            "schema_version": 1,
            "fact_key": "proposition",
            "value": {
              "claim_type": {
                "kind": "ClaimType",
                "name": "security.assessment.cve_id"
              },
              "claim_type_digest": "sha256:47ee58b1b7ed926d10ae9e9b5956f154d563e83e75800b20bc9cf7f044955200",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "CVE-2021-44228"
              },
              "predicate": "security.assessment.cve_id",
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
          }
        ],
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:bfc15e35483893a84f858f5230fb163fd79306d94e8711142fae8454c78ab9b8",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "not_admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "not_admitted",
              "rule_id": null,
              "admission": null,
              "refusal_code": "cruxible.evidence.undeclared_contract_kind",
              "closest_rule_id": null
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.cve_id",
          "object": {
            "kind": "literal",
            "value": "CVE-2021-44228"
          },
          "role": "normative",
          "qualifier": null,
          "lifecycle": "live",
          "predecessor_digest": null
        }
      },
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-709a88c60fd24902ef8ba3a974e99d7a",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
          "artifact_digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:9e01954582ee1ae70fae5d9fd35b93522a7cabbe85a1c3e68f22d0074f39d7c2"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:dadcd8bf7d2f80050f4fa34f743d153bb13367719298427a7732ac93ceca15b1"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:9e01954582ee1ae70fae5d9fd35b93522a7cabbe85a1c3e68f22d0074f39d7c2"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:dadcd8bf7d2f80050f4fa34f743d153bb13367719298427a7732ac93ceca15b1"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                    }
                  }
                }
              ],
              "claim_attestations": [],
              "coverage_binding": {
                "coverage": "containing_change_set",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:9e01954582ee1ae70fae5d9fd35b93522a7cabbe85a1c3e68f22d0074f39d7c2"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:dadcd8bf7d2f80050f4fa34f743d153bb13367719298427a7732ac93ceca15b1"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000011.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                },
                "subject_path": {
                  "$path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.backing",
            "schema_version": 1,
            "fact_key": "evidence",
            "value": {
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
            }
          },
          {
            "schema_id": "cruxible.claim.current_verdict",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
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
            }
          },
          {
            "schema_id": "cruxible.claim.evidence_basis",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "admissions": [
                "direct"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac"
                ],
                "unsure": []
              }
            }
          },
          {
            "schema_id": "cruxible.claim.governance",
            "schema_version": 1,
            "fact_key": "accepted_governance",
            "value": {
              "activation_policy": "snapshot",
              "approval_requirements": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:9e01954582ee1ae70fae5d9fd35b93522a7cabbe85a1c3e68f22d0074f39d7c2"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:dadcd8bf7d2f80050f4fa34f743d153bb13367719298427a7732ac93ceca15b1"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:9e01954582ee1ae70fae5d9fd35b93522a7cabbe85a1c3e68f22d0074f39d7c2"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:dadcd8bf7d2f80050f4fa34f743d153bb13367719298427a7732ac93ceca15b1"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
              },
              "law_identifier": "playbill.claim.v2",
              "required_tier": "governed_write"
            }
          },
          {
            "schema_id": "cruxible.claim.history",
            "schema_version": 1,
            "fact_key": "ledger_history",
            "value": {
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:9e01954582ee1ae70fae5d9fd35b93522a7cabbe85a1c3e68f22d0074f39d7c2"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:dadcd8bf7d2f80050f4fa34f743d153bb13367719298427a7732ac93ceca15b1"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000011.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                  },
                  "sequence": 11
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:9e01954582ee1ae70fae5d9fd35b93522a7cabbe85a1c3e68f22d0074f39d7c2"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:dadcd8bf7d2f80050f4fa34f743d153bb13367719298427a7732ac93ceca15b1"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000011.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.identity",
            "schema_version": 1,
            "fact_key": "lineage",
            "value": {
              "artifact_digest": {
                "$digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-709a88c60fd24902ef8ba3a974e99d7a"
              },
              "input_digest": {
                "$digest": "sha256:a53cfd7ad6068ce148eff33880514ec4ab3380c1c479b1774775ecf26dbcdf8e"
              },
              "statement_address": {
                "artifact_path": "claims/70/CLM-709a88c60fd24902ef8ba3a974e99d7a.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:f3dbc969f2c448932d861db15c94fa7c46afa04c2cb6845d99b1fe6805877810"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.lifecycle",
            "schema_version": 1,
            "fact_key": "accepted_revision",
            "value": {
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
              ]
            }
          },
          {
            "schema_id": "cruxible.claim.provenance",
            "schema_version": 1,
            "fact_key": "accepted_source",
            "value": {
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:397fae3852cd93f556d9f099953eabcc2b291dffd5470ec1b88bbf49eaa1c108"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:9e01954582ee1ae70fae5d9fd35b93522a7cabbe85a1c3e68f22d0074f39d7c2"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "69c4e2897899af0f7ae6932e0ffd55a0064f238e",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:dadcd8bf7d2f80050f4fa34f743d153bb13367719298427a7732ac93ceca15b1"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b17011c3a1c146983a4e436947911174e2b1eeb4105daaf802e5e94f91d75d2d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:363377ec21f2b2754b614989115bf006a53a4793c1d13fbe2ec25aa69444f307"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:a53cfd7ad6068ce148eff33880514ec4ab3380c1c479b1774775ecf26dbcdf8e"
              },
              "source_compilation_digest": null
            }
          },
          {
            "schema_id": "cruxible.claim.source_mapping",
            "schema_version": 1,
            "fact_key": "source_0000",
            "value": {
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
          },
          {
            "schema_id": "cruxible.claim.statement",
            "schema_version": 1,
            "fact_key": "proposition",
            "value": {
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
          }
        ],
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:1f788972abb2773739aa7d2d855aa95fcbdd3bf80ffadb3548883b1b5628c06b",
            "capture_digest": "sha256:c096fb37824fb6e2d200763335513ef9c4edecf3289330c81c16de716d2e90ac",
            "citation_role": "copy",
            "citation_origin": "self_source",
            "capture_contract_identity": "CaptureContract:playbill.coordinator-self-source-v1",
            "capture_contract_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "analyst-judgment",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "analyst-judgment"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.justification",
          "object": {
            "kind": "literal",
            "value": "inline_mitigations_already_exist"
          },
          "role": "normative",
          "qualifier": null,
          "lifecycle": "live",
          "predecessor_digest": null
        }
      },
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-56fd1b8ae5704e251b220c4e289cab4a",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/56/CLM-56fd1b8ae5704e251b220c4e289cab4a.json",
          "artifact_digest": "sha256:40a35fde26a6ab6f72146ade4b15628f312a073149f782f0d51432087cea3175",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "claim_attestations": [],
              "coverage_binding": {
                "coverage": "containing_change_set",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "subject_path": {
                  "$path": "claims/56/CLM-56fd1b8ae5704e251b220c4e289cab4a.json"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.backing",
            "schema_version": 1,
            "fact_key": "evidence",
            "value": {
              "attestation_digests": [],
              "capture_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
                  "citation_id": "sha256:d56289a409e9c6b439224c916fdbd5ef271799ccc18fcfee8ea9972f6d3c61bd",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                "observed_at": "2026-10-26T17:44:38.124878Z",
                "subject_content_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                      "end_byte": 129261,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/56/CLM-56fd1b8ae5704e251b220c4e289cab4a.json",
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
            }
          },
          {
            "schema_id": "cruxible.claim.current_verdict",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "adjudication_rule_digest": "sha256:c8ed4e1289d26794dcc5a93c1f4753f73f4a3efe1715e046021fb17ad8518bed",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:a74d3647060219fde77bd9505cf3efa0877f1fb5becbbe86f9f83ca9d8545cba",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-10-26T17:44:38.124878Z",
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "tag": "playbill-claim-verdict-v1",
              "unsure_evidence_digests": [],
              "verdict": "uncovered"
            }
          },
          {
            "schema_id": "cruxible.claim.evidence_basis",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "admissions": [
                "direct"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
                ],
                "unsure": []
              }
            }
          },
          {
            "schema_id": "cruxible.claim.governance",
            "schema_version": 1,
            "fact_key": "accepted_governance",
            "value": {
              "activation_policy": "snapshot",
              "approval_requirements": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
              },
              "law_identifier": "playbill.claim.v2",
              "required_tier": "governed_write"
            }
          },
          {
            "schema_id": "cruxible.claim.history",
            "schema_version": 1,
            "fact_key": "ledger_history",
            "value": {
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  },
                  "sequence": 7
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000007.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.identity",
            "schema_version": 1,
            "fact_key": "lineage",
            "value": {
              "artifact_digest": {
                "$digest": "sha256:40a35fde26a6ab6f72146ade4b15628f312a073149f782f0d51432087cea3175"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-56fd1b8ae5704e251b220c4e289cab4a"
              },
              "input_digest": {
                "$digest": "sha256:aa4e608a9ddf60cf5f586647d4dd8be12bfb40b15dd13acc4653329571fcbda1"
              },
              "statement_address": {
                "artifact_path": "claims/56/CLM-56fd1b8ae5704e251b220c4e289cab4a.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:a74d3647060219fde77bd9505cf3efa0877f1fb5becbbe86f9f83ca9d8545cba"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.lifecycle",
            "schema_version": 1,
            "fact_key": "accepted_revision",
            "value": {
              "lifecycle": {
                "predecessor_digest": null,
                "state": "live"
              },
              "pins": [
                {
                  "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.fetched-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:c2b4ce11f53975128f9af82d6671c241e56df909212bff9bb46447b5200be94a",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.release"
                  }
                },
                {
                  "artifact_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/gate-app--1.0.0"
                  }
                },
                {
                  "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
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
            "schema_id": "cruxible.claim.provenance",
            "schema_version": 1,
            "fact_key": "accepted_source",
            "value": {
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:40a35fde26a6ab6f72146ade4b15628f312a073149f782f0d51432087cea3175"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:aa4e608a9ddf60cf5f586647d4dd8be12bfb40b15dd13acc4653329571fcbda1"
              },
              "source_compilation_digest": {
                "$digest": "sha256:cdc9c01de219aa82cc7cee9be798ea00d605f32b390ba00930732d90a4c9fbb1"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.source_mapping",
            "schema_version": 1,
            "fact_key": "source_0000",
            "value": {
              "spans": [
                {
                  "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                  "end_byte": 129261,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/56/CLM-56fd1b8ae5704e251b220c4e289cab4a.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "tag": "playbill-source-mapping-v1"
            }
          },
          {
            "schema_id": "cruxible.claim.statement",
            "schema_version": 1,
            "fact_key": "proposition",
            "value": {
              "claim_type": {
                "kind": "ClaimType",
                "name": "security.assessment.release"
              },
              "claim_type_digest": "sha256:c2b4ce11f53975128f9af82d6671c241e56df909212bff9bb46447b5200be94a",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
                  "selector": {
                    "scheme": "artifact-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "kind": "subject"
              },
              "predicate": "security.assessment.release",
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
          }
        ],
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:d56289a409e9c6b439224c916fdbd5ef271799ccc18fcfee8ea9972f6d3c61bd",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "stated-by-source",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "stated-by-source"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.release",
          "object": {
            "kind": "subject",
            "address": {
              "tag": "playbill-semantic-address-v1",
              "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              }
            }
          },
          "role": "normative",
          "qualifier": null,
          "lifecycle": "live",
          "predecessor_digest": null
        }
      },
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-98f75f5e4cd545d223ba0b1ce0e0427e",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/98/CLM-98f75f5e4cd545d223ba0b1ce0e0427e.json",
          "artifact_digest": "sha256:f46e89d21ef095fbe8f30e428974b60b5740775c9b68f411c3e4ca7c39a3d2e3",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "claim_attestations": [],
              "coverage_binding": {
                "coverage": "containing_change_set",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "subject_path": {
                  "$path": "claims/98/CLM-98f75f5e4cd545d223ba0b1ce0e0427e.json"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.backing",
            "schema_version": 1,
            "fact_key": "evidence",
            "value": {
              "attestation_digests": [],
              "capture_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
                  "citation_id": "sha256:6a0fd5e117f94913d2287268006817cacea48408321cbf119bb8efe2208fae00",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:44:38.124878Z",
                "subject_content_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                      "end_byte": 129261,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/98/CLM-98f75f5e4cd545d223ba0b1ce0e0427e.json",
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
            }
          },
          {
            "schema_id": "cruxible.claim.current_verdict",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "adjudication_rule_digest": "sha256:9a7996852ca56d22a126d2ba80735ea9ae32b47d06fcdd8956b68306b8607eb6",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:4416860dbc4b083f8a655e7f04aac86b7271bdc65213352f0e22d90818d12104",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-10-26T17:44:38.124878Z",
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "tag": "playbill-claim-verdict-v1",
              "unsure_evidence_digests": [],
              "verdict": "uncovered"
            }
          },
          {
            "schema_id": "cruxible.claim.evidence_basis",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "admissions": [
                "origin_only"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
                ],
                "unsure": []
              }
            }
          },
          {
            "schema_id": "cruxible.claim.governance",
            "schema_version": 1,
            "fact_key": "accepted_governance",
            "value": {
              "activation_policy": "snapshot",
              "approval_requirements": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
              },
              "law_identifier": "playbill.claim.v2",
              "required_tier": "governed_write"
            }
          },
          {
            "schema_id": "cruxible.claim.history",
            "schema_version": 1,
            "fact_key": "ledger_history",
            "value": {
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  },
                  "sequence": 7
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000007.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.identity",
            "schema_version": 1,
            "fact_key": "lineage",
            "value": {
              "artifact_digest": {
                "$digest": "sha256:f46e89d21ef095fbe8f30e428974b60b5740775c9b68f411c3e4ca7c39a3d2e3"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-98f75f5e4cd545d223ba0b1ce0e0427e"
              },
              "input_digest": {
                "$digest": "sha256:330197eaf95c4375b4dd10a2948f270db4deac72681967fc7f97b5c2e30c2b41"
              },
              "statement_address": {
                "artifact_path": "claims/98/CLM-98f75f5e4cd545d223ba0b1ce0e0427e.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:4416860dbc4b083f8a655e7f04aac86b7271bdc65213352f0e22d90818d12104"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.lifecycle",
            "schema_version": 1,
            "fact_key": "accepted_revision",
            "value": {
              "lifecycle": {
                "predecessor_digest": null,
                "state": "live"
              },
              "pins": [
                {
                  "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.fetched-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:c293c0af2ec8fd9ddd6a9f9d8ef99ed18c559cfc8eacd89917654b320a74a13f",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.release_id"
                  }
                },
                {
                  "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
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
            "schema_id": "cruxible.claim.provenance",
            "schema_version": 1,
            "fact_key": "accepted_source",
            "value": {
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:f46e89d21ef095fbe8f30e428974b60b5740775c9b68f411c3e4ca7c39a3d2e3"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:330197eaf95c4375b4dd10a2948f270db4deac72681967fc7f97b5c2e30c2b41"
              },
              "source_compilation_digest": {
                "$digest": "sha256:cdc9c01de219aa82cc7cee9be798ea00d605f32b390ba00930732d90a4c9fbb1"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.source_mapping",
            "schema_version": 1,
            "fact_key": "source_0000",
            "value": {
              "spans": [
                {
                  "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                  "end_byte": 129261,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/98/CLM-98f75f5e4cd545d223ba0b1ce0e0427e.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "tag": "playbill-source-mapping-v1"
            }
          },
          {
            "schema_id": "cruxible.claim.statement",
            "schema_version": 1,
            "fact_key": "proposition",
            "value": {
              "claim_type": {
                "kind": "ClaimType",
                "name": "security.assessment.release_id"
              },
              "claim_type_digest": "sha256:c293c0af2ec8fd9ddd6a9f9d8ef99ed18c559cfc8eacd89917654b320a74a13f",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "gate-app--1.0.0"
              },
              "predicate": "security.assessment.release_id",
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
          }
        ],
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:6a0fd5e117f94913d2287268006817cacea48408321cbf119bb8efe2208fae00",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "not_admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "not_admitted",
              "rule_id": null,
              "admission": null,
              "refusal_code": "cruxible.evidence.undeclared_contract_kind",
              "closest_rule_id": null
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.release_id",
          "object": {
            "kind": "literal",
            "value": "gate-app--1.0.0"
          },
          "role": "normative",
          "qualifier": null,
          "lifecycle": "live",
          "predecessor_digest": null
        }
      },
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-76f9a4e45c6e684f32582bf12b1c690c",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/76/CLM-76f9a4e45c6e684f32582bf12b1c690c.json",
          "artifact_digest": "sha256:f28cd61cba66cd454d895c9e6079f389b4694712ada480d0e5ed0ed697a531cf",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "claim_attestations": [],
              "coverage_binding": {
                "coverage": "containing_change_set",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "subject_path": {
                  "$path": "claims/76/CLM-76f9a4e45c6e684f32582bf12b1c690c.json"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.backing",
            "schema_version": 1,
            "fact_key": "evidence",
            "value": {
              "attestation_digests": [],
              "capture_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
                  "citation_id": "sha256:733e98195a8a97f022e1ffdbff7b0e16c47d5ab8ca1676f536ce69dcbb7bfa8e",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:44:38.124878Z",
                "subject_content_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                      "end_byte": 129261,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/76/CLM-76f9a4e45c6e684f32582bf12b1c690c.json",
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
            }
          },
          {
            "schema_id": "cruxible.claim.current_verdict",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "adjudication_rule_digest": "sha256:06e4463120da6740afd9fbc2a4a80d6a64c4d0c00f5b0bea5a9568ff49d458d9",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:d37bbcba2c1a5da9a9965450bf8706c4d9e43601f0cc5decf2880c1b9ebaf228",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-10-26T17:44:38.124878Z",
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "tag": "playbill-claim-verdict-v1",
              "unsure_evidence_digests": [],
              "verdict": "uncovered"
            }
          },
          {
            "schema_id": "cruxible.claim.evidence_basis",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "admissions": [
                "direct"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
                ],
                "unsure": []
              }
            }
          },
          {
            "schema_id": "cruxible.claim.governance",
            "schema_version": 1,
            "fact_key": "accepted_governance",
            "value": {
              "activation_policy": "snapshot",
              "approval_requirements": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
              },
              "law_identifier": "playbill.claim.v2",
              "required_tier": "governed_write"
            }
          },
          {
            "schema_id": "cruxible.claim.history",
            "schema_version": 1,
            "fact_key": "ledger_history",
            "value": {
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  },
                  "sequence": 7
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000007.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.identity",
            "schema_version": 1,
            "fact_key": "lineage",
            "value": {
              "artifact_digest": {
                "$digest": "sha256:f28cd61cba66cd454d895c9e6079f389b4694712ada480d0e5ed0ed697a531cf"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-76f9a4e45c6e684f32582bf12b1c690c"
              },
              "input_digest": {
                "$digest": "sha256:789567ab463227b6a556f8dafa3a20cbfb5a6c9066e2afe86ad6b720dbaab762"
              },
              "statement_address": {
                "artifact_path": "claims/76/CLM-76f9a4e45c6e684f32582bf12b1c690c.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:d37bbcba2c1a5da9a9965450bf8706c4d9e43601f0cc5decf2880c1b9ebaf228"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.lifecycle",
            "schema_version": 1,
            "fact_key": "accepted_revision",
            "value": {
              "lifecycle": {
                "predecessor_digest": null,
                "state": "live"
              },
              "pins": [
                {
                  "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.fetched-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:d052bbbea33d407aef7db585dda471f8e00204d427e7fb0d492f2b97fde87ee8",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.status"
                  }
                },
                {
                  "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
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
            "schema_id": "cruxible.claim.provenance",
            "schema_version": 1,
            "fact_key": "accepted_source",
            "value": {
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:f28cd61cba66cd454d895c9e6079f389b4694712ada480d0e5ed0ed697a531cf"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:789567ab463227b6a556f8dafa3a20cbfb5a6c9066e2afe86ad6b720dbaab762"
              },
              "source_compilation_digest": {
                "$digest": "sha256:cdc9c01de219aa82cc7cee9be798ea00d605f32b390ba00930732d90a4c9fbb1"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.source_mapping",
            "schema_version": 1,
            "fact_key": "source_0000",
            "value": {
              "spans": [
                {
                  "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                  "end_byte": 129261,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/76/CLM-76f9a4e45c6e684f32582bf12b1c690c.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "tag": "playbill-source-mapping-v1"
            }
          },
          {
            "schema_id": "cruxible.claim.statement",
            "schema_version": 1,
            "fact_key": "proposition",
            "value": {
              "claim_type": {
                "kind": "ClaimType",
                "name": "security.assessment.status"
              },
              "claim_type_digest": "sha256:d052bbbea33d407aef7db585dda471f8e00204d427e7fb0d492f2b97fde87ee8",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "affected"
              },
              "predicate": "security.assessment.status",
              "qualifier": null,
              "role": "observation",
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
          }
        ],
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:733e98195a8a97f022e1ffdbff7b0e16c47d5ab8ca1676f536ce69dcbb7bfa8e",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "source-verdict",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "source-verdict"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.status",
          "object": {
            "kind": "literal",
            "value": "affected"
          },
          "role": "observation",
          "qualifier": null,
          "lifecycle": "live",
          "predecessor_digest": null
        }
      },
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-d8674016342604fe9cf0b887fdb4ade5",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/d8/CLM-d8674016342604fe9cf0b887fdb4ade5.json",
          "artifact_digest": "sha256:7d31070eca11c8a2976827e9a702769c453de220efa997193262fe8aec3c85f2",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000012.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000012.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                    }
                  }
                }
              ],
              "claim_attestations": [],
              "coverage_binding": {
                "coverage": "containing_change_set",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000012.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                },
                "subject_path": {
                  "$path": "claims/d8/CLM-d8674016342604fe9cf0b887fdb4ade5.json"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.backing",
            "schema_version": 1,
            "fact_key": "evidence",
            "value": {
              "attestation_digests": [],
              "capture_digests": [
                "sha256:11cd95900072696eb79b868c082d6198080eac67a7980fffa45f4b336faec10f"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:11cd95900072696eb79b868c082d6198080eac67a7980fffa45f4b336faec10f",
                  "citation_id": "sha256:82b1c4c8adee5c2434770ceaadb468dbc5c59b7df9ae94de5017f8b8f5e8346d",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T19:00:09.706610Z",
                "subject_content_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:3ea0a24232f7f91cd995f70ac664e964070e8ec008ef2bf1b2cfb73a311d13e5",
                      "end_byte": 74,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/d8/CLM-d8674016342604fe9cf0b887fdb4ade5.json",
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
            }
          },
          {
            "schema_id": "cruxible.claim.current_verdict",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "adjudication_rule_digest": "sha256:06e4463120da6740afd9fbc2a4a80d6a64c4d0c00f5b0bea5a9568ff49d458d9",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:d7cde6299f2698b4a2103d7c77f2e72bd510c22fdc691f1e774f2f111b9e3ae2",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "principal.robertmalone"
                  ],
                  "evidence_digests": [
                    "sha256:11cd95900072696eb79b868c082d6198080eac67a7980fffa45f4b336faec10f"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T19:00:09.706610Z",
              "provenance_grades": [
                "self-asserted"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:11cd95900072696eb79b868c082d6198080eac67a7980fffa45f4b336faec10f"
              ],
              "tag": "playbill-claim-verdict-v1",
              "unsure_evidence_digests": [],
              "verdict": "supported"
            }
          },
          {
            "schema_id": "cruxible.claim.evidence_basis",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "admissions": [
                "direct"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:11cd95900072696eb79b868c082d6198080eac67a7980fffa45f4b336faec10f"
                ],
                "unsure": []
              }
            }
          },
          {
            "schema_id": "cruxible.claim.governance",
            "schema_version": 1,
            "fact_key": "accepted_governance",
            "value": {
              "activation_policy": "snapshot",
              "approval_requirements": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000012.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000012.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
              },
              "law_identifier": "playbill.claim.v2",
              "required_tier": "governed_write"
            }
          },
          {
            "schema_id": "cruxible.claim.history",
            "schema_version": 1,
            "fact_key": "ledger_history",
            "value": {
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000012.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000012.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                  },
                  "sequence": 12
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000012.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.identity",
            "schema_version": 1,
            "fact_key": "lineage",
            "value": {
              "artifact_digest": {
                "$digest": "sha256:7d31070eca11c8a2976827e9a702769c453de220efa997193262fe8aec3c85f2"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-d8674016342604fe9cf0b887fdb4ade5"
              },
              "input_digest": {
                "$digest": "sha256:e63b171f55f71081c72b085e5a90ba53c0b24abd9745665d853ffa25bbbe6eb2"
              },
              "statement_address": {
                "artifact_path": "claims/d8/CLM-d8674016342604fe9cf0b887fdb4ade5.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:d7cde6299f2698b4a2103d7c77f2e72bd510c22fdc691f1e774f2f111b9e3ae2"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.lifecycle",
            "schema_version": 1,
            "fact_key": "accepted_revision",
            "value": {
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
                  "artifact_digest": "sha256:d052bbbea33d407aef7db585dda471f8e00204d427e7fb0d492f2b97fde87ee8",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.status"
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
            "schema_id": "cruxible.claim.provenance",
            "schema_version": 1,
            "fact_key": "accepted_source",
            "value": {
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:7d31070eca11c8a2976827e9a702769c453de220efa997193262fe8aec3c85f2"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1d0b3ff22c8c40f1c082d2d7d3071184b46bc28630dbb22b5f496ff81419bf16"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000012.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:fdc53578dca263777ff69088810a7feaee127479d94e75157728cead6b262842"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:e63b171f55f71081c72b085e5a90ba53c0b24abd9745665d853ffa25bbbe6eb2"
              },
              "source_compilation_digest": null
            }
          },
          {
            "schema_id": "cruxible.claim.source_mapping",
            "schema_version": 1,
            "fact_key": "source_0000",
            "value": {
              "spans": [
                {
                  "content_digest": "sha256:3ea0a24232f7f91cd995f70ac664e964070e8ec008ef2bf1b2cfb73a311d13e5",
                  "end_byte": 74,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/d8/CLM-d8674016342604fe9cf0b887fdb4ade5.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "tag": "playbill-source-mapping-v1"
            }
          },
          {
            "schema_id": "cruxible.claim.statement",
            "schema_version": 1,
            "fact_key": "proposition",
            "value": {
              "claim_type": {
                "kind": "ClaimType",
                "name": "security.assessment.status"
              },
              "claim_type_digest": "sha256:d052bbbea33d407aef7db585dda471f8e00204d427e7fb0d492f2b97fde87ee8",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "not_affected"
              },
              "predicate": "security.assessment.status",
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
          }
        ],
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:82b1c4c8adee5c2434770ceaadb468dbc5c59b7df9ae94de5017f8b8f5e8346d",
            "capture_digest": "sha256:11cd95900072696eb79b868c082d6198080eac67a7980fffa45f4b336faec10f",
            "citation_role": "copy",
            "citation_origin": "self_source",
            "capture_contract_identity": "CaptureContract:playbill.coordinator-self-source-v1",
            "capture_contract_digest": "sha256:583891fc749d7d36d0fbf975e90fc00d2eb4befd17774e463115a403636436ef",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "analyst-judgment",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "analyst-judgment"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.status",
          "object": {
            "kind": "literal",
            "value": "not_affected"
          },
          "role": "normative",
          "qualifier": null,
          "lifecycle": "live",
          "predecessor_digest": null
        }
      },
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-40eaf84ec507878cf8bf96ef60469512",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/40/CLM-40eaf84ec507878cf8bf96ef60469512.json",
          "artifact_digest": "sha256:5362ad9e3685654b0016d859bb39b9cf77c803157534171991860a826fe0f09d",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "claim_attestations": [],
              "coverage_binding": {
                "coverage": "containing_change_set",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "subject_path": {
                  "$path": "claims/40/CLM-40eaf84ec507878cf8bf96ef60469512.json"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.backing",
            "schema_version": 1,
            "fact_key": "evidence",
            "value": {
              "attestation_digests": [],
              "capture_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
                  "citation_id": "sha256:af2dbc12dd7b12beae7d86d990f09ef52364c8ef5ba7272c59efb52339911129",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "observed_at": "2026-10-26T17:44:38.124878Z",
                "subject_content_digest": "sha256:fddb3a64f3888a6d4412bca8e8cf8b2b04a74e374c04242479949a193e1dce3f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                      "end_byte": 129261,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/40/CLM-40eaf84ec507878cf8bf96ef60469512.json",
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
            }
          },
          {
            "schema_id": "cruxible.claim.current_verdict",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "adjudication_rule_digest": "sha256:3d5236efa5f4e181ade3784fb3570fd6c89e2724409c7b794bc3f9dd45271034",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:2ca0b41ed9102a03e119801cfa3a621a8433e7105bd489034385deafdc441fa5",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-10-26T17:44:38.124878Z",
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "tag": "playbill-claim-verdict-v1",
              "unsure_evidence_digests": [],
              "verdict": "uncovered"
            }
          },
          {
            "schema_id": "cruxible.claim.evidence_basis",
            "schema_version": 1,
            "fact_key": "accepted_evaluation",
            "value": {
              "admissions": [
                "direct"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
                ],
                "unsure": []
              }
            }
          },
          {
            "schema_id": "cruxible.claim.governance",
            "schema_version": 1,
            "fact_key": "accepted_governance",
            "value": {
              "activation_policy": "snapshot",
              "approval_requirements": [],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
              },
              "law_identifier": "playbill.claim.v2",
              "required_tier": "governed_write"
            }
          },
          {
            "schema_id": "cruxible.claim.history",
            "schema_version": 1,
            "fact_key": "ledger_history",
            "value": {
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  },
                  "sequence": 7
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000007.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                }
              }
            }
          },
          {
            "schema_id": "cruxible.claim.identity",
            "schema_version": 1,
            "fact_key": "lineage",
            "value": {
              "artifact_digest": {
                "$digest": "sha256:5362ad9e3685654b0016d859bb39b9cf77c803157534171991860a826fe0f09d"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-40eaf84ec507878cf8bf96ef60469512"
              },
              "input_digest": {
                "$digest": "sha256:e9a42ccf9d1af967426e6d5ba382360c05762a382e45d60b2b7c21857f864da7"
              },
              "statement_address": {
                "artifact_path": "claims/40/CLM-40eaf84ec507878cf8bf96ef60469512.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:2ca0b41ed9102a03e119801cfa3a621a8433e7105bd489034385deafdc441fa5"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.lifecycle",
            "schema_version": 1,
            "fact_key": "accepted_revision",
            "value": {
              "lifecycle": {
                "predecessor_digest": null,
                "state": "live"
              },
              "pins": [
                {
                  "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.fetched-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:6cf6c1ad19c0403dd0fd8ff68fd8462e02172db92ae52fd983ac2a93e13a9f48",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.vulnerability"
                  }
                },
                {
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
                  }
                },
                {
                  "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
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
            "schema_id": "cruxible.claim.provenance",
            "schema_version": 1,
            "fact_key": "accepted_source",
            "value": {
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:5362ad9e3685654b0016d859bb39b9cf77c803157534171991860a826fe0f09d"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:e9a42ccf9d1af967426e6d5ba382360c05762a382e45d60b2b7c21857f864da7"
              },
              "source_compilation_digest": {
                "$digest": "sha256:cdc9c01de219aa82cc7cee9be798ea00d605f32b390ba00930732d90a4c9fbb1"
              }
            }
          },
          {
            "schema_id": "cruxible.claim.source_mapping",
            "schema_version": 1,
            "fact_key": "source_0000",
            "value": {
              "spans": [
                {
                  "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                  "end_byte": 129261,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/40/CLM-40eaf84ec507878cf8bf96ef60469512.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "tag": "playbill-source-mapping-v1"
            }
          },
          {
            "schema_id": "cruxible.claim.statement",
            "schema_version": 1,
            "fact_key": "proposition",
            "value": {
              "claim_type": {
                "kind": "ClaimType",
                "name": "security.assessment.vulnerability"
              },
              "claim_type_digest": "sha256:6cf6c1ad19c0403dd0fd8ff68fd8462e02172db92ae52fd983ac2a93e13a9f48",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
                  "selector": {
                    "scheme": "artifact-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "kind": "subject"
              },
              "predicate": "security.assessment.vulnerability",
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
          }
        ],
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:af2dbc12dd7b12beae7d86d990f09ef52364c8ef5ba7272c59efb52339911129",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "stated-by-source",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "stated-by-source"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.vulnerability",
          "object": {
            "kind": "subject",
            "address": {
              "tag": "playbill-semantic-address-v1",
              "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              }
            }
          },
          "role": "normative",
          "qualifier": null,
          "lifecycle": "live",
          "predecessor_digest": null
        }
      }
    ],
    "truncated": false,
    "cursor": null
  }
});
