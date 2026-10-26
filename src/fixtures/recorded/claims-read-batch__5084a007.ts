// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch b66f4b98
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-4642cf991ae7141668e684f415235edd",
      "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
      "CLM-0ba682d76516d92976ce066cae115b97",
      "CLM-4c740f542205fd08336df797e00b487b",
      "CLM-89f7cfb21f1f04019960beecae869a62",
      "CLM-0c0cfd1dd4e36ad6aab1593f26883065",
      "CLM-4de94887cc52ea1517d2da2cfdaecdba",
      "CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
      "CLM-94f06e40aea84c55bc21c503376650a8",
      "CLM-f9165ed7c97a78e3d7745c550644fb1e"
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
          "identity": "Claim:CLM-4642cf991ae7141668e684f415235edd",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/46/CLM-4642cf991ae7141668e684f415235edd.json",
          "artifact_digest": "sha256:0afe0055d0754daddde07991efcb31da8bc9b37ee3d5ded2de984af4d1b46cc0",
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
                  "$path": "claims/46/CLM-4642cf991ae7141668e684f415235edd.json"
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
                  "citation_id": "sha256:1d126711ba0f2d583eafca73ffde8f33c9357c14acf44dd72d0d2c56e53cb1aa",
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
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
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
                    "artifact_path": "claims/46/CLM-4642cf991ae7141668e684f415235edd.json",
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
              "adjudication_rule_digest": "sha256:5ad3a619293f02d4559f25a18dcd8cb68801988e4a572ab8f04c2a5d49e5fa7b",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:8acf0f20db347f162b8a28a60129309531938331aa350fddf9ab52bd02c8bf1d",
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
                "$digest": "sha256:0afe0055d0754daddde07991efcb31da8bc9b37ee3d5ded2de984af4d1b46cc0"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-4642cf991ae7141668e684f415235edd"
              },
              "input_digest": {
                "$digest": "sha256:d9ff86abd510f98ee17074b84c9bc1a76658d095fbc26fb48c0097c11fa36ab4"
              },
              "statement_address": {
                "artifact_path": "claims/46/CLM-4642cf991ae7141668e684f415235edd.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:8acf0f20db347f162b8a28a60129309531938331aa350fddf9ab52bd02c8bf1d"
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
                  "artifact_digest": "sha256:aa7cb15b04aa878e14fcf732c69b07263648c73076a284eca236ef08a2b74e47",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.cve_id"
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
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:0afe0055d0754daddde07991efcb31da8bc9b37ee3d5ded2de984af4d1b46cc0"
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
                "$digest": "sha256:d9ff86abd510f98ee17074b84c9bc1a76658d095fbc26fb48c0097c11fa36ab4"
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
                "artifact_path": "claims/46/CLM-4642cf991ae7141668e684f415235edd.json",
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
                "name": "security.vulnerability.cve_id"
              },
              "claim_type_digest": "sha256:aa7cb15b04aa878e14fcf732c69b07263648c73076a284eca236ef08a2b74e47",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "CVE-2021-44228"
              },
              "predicate": "security.vulnerability.cve_id",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:1d126711ba0f2d583eafca73ffde8f33c9357c14acf44dd72d0d2c56e53cb1aa",
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
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.cve_id",
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
          "identity": "Claim:CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/a1/CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c.json",
          "artifact_digest": "sha256:d77e6f49b95e854fdb32e0027b3e7eb43ea0ca7ae7a4316241d563c9ba3c62d8",
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
                    "$digest": "sha256:c945da9caa6ed545468662bbce318103fe532284e4e2972a6a7d770d7fccac0a"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:c945da9caa6ed545468662bbce318103fe532284e4e2972a6a7d770d7fccac0a"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                      "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000008.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                },
                "subject_path": {
                  "$path": "claims/a1/CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c.json"
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
                "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb",
                  "citation_id": "sha256:996e8baa8bcc6a6f620a15f09b2bd64aa63b36a42a6caf1a283b551b0f16dc85",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:45:00.485705Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:31cb9f2309b75c6c44ef64bf23629a81a7051ace7dbbaf6b6f77e541bfb4aa15",
                      "end_byte": 2410089,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/a1/CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c.json",
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
              "adjudication_rule_digest": "sha256:1364b7874df5dd32b7778181e532edc97f7bb2e186a0bc96587aa9f0ad72fa2f",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:5b2df7373f87d6c4479ea8aa5765283c0c3a323aec011f05b6850f01264528f5",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:45:00.485705Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
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
                  "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000008.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                  },
                  "sequence": 8
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000008.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                "$digest": "sha256:d77e6f49b95e854fdb32e0027b3e7eb43ea0ca7ae7a4316241d563c9ba3c62d8"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c"
              },
              "input_digest": {
                "$digest": "sha256:7fe427a0b8549ceaf54178c52d71ffb794aff087b7471bcab3e41e1ded017515"
              },
              "statement_address": {
                "artifact_path": "claims/a1/CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:5b2df7373f87d6c4479ea8aa5765283c0c3a323aec011f05b6850f01264528f5"
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
                  "artifact_digest": "sha256:4638a73a22c7370bd48720f19c8cced87fca326c4a4c083f37b8d9663b410db1",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.kev_date_added"
                  }
                },
                {
                  "artifact_digest": "sha256:c088b29072ec2c1d398c014b4bbc190e913dbdaa86685c375e4e8251bbd16f29",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b"
                  }
                },
                {
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:d77e6f49b95e854fdb32e0027b3e7eb43ea0ca7ae7a4316241d563c9ba3c62d8"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:7fe427a0b8549ceaf54178c52d71ffb794aff087b7471bcab3e41e1ded017515"
              },
              "source_compilation_digest": {
                "$digest": "sha256:8a277bdd8cf0c9737bb578236f4e712d338210dcd1be4efb276afd0e2c45a32f"
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
                  "content_digest": "sha256:31cb9f2309b75c6c44ef64bf23629a81a7051ace7dbbaf6b6f77e541bfb4aa15",
                  "end_byte": 2410089,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/a1/CLM-a1bb1c6c1cb15c94b4d908c92cac5f5c.json",
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
                "name": "security.vulnerability.kev_date_added"
              },
              "claim_type_digest": "sha256:4638a73a22c7370bd48720f19c8cced87fca326c4a4c083f37b8d9663b410db1",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "2021-12-10"
              },
              "predicate": "security.vulnerability.kev_date_added",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:996e8baa8bcc6a6f620a15f09b2bd64aa63b36a42a6caf1a283b551b0f16dc85",
            "capture_digest": "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.kev_date_added",
          "object": {
            "kind": "literal",
            "value": "2021-12-10"
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
          "identity": "Claim:CLM-0ba682d76516d92976ce066cae115b97",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/0b/CLM-0ba682d76516d92976ce066cae115b97.json",
          "artifact_digest": "sha256:e1dba4e3cb0dfc625d13d47acbde0642d83e1b328d1993bde99c99ad969eb1ad",
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
                    "$digest": "sha256:c945da9caa6ed545468662bbce318103fe532284e4e2972a6a7d770d7fccac0a"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:c945da9caa6ed545468662bbce318103fe532284e4e2972a6a7d770d7fccac0a"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                      "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000008.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                },
                "subject_path": {
                  "$path": "claims/0b/CLM-0ba682d76516d92976ce066cae115b97.json"
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
                "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb",
                  "citation_id": "sha256:33626c044ec393ad3c37fe795e5fc0e6ee9851cf5c1e1699c42cc520842a9180",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:45:00.485705Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:31cb9f2309b75c6c44ef64bf23629a81a7051ace7dbbaf6b6f77e541bfb4aa15",
                      "end_byte": 2410089,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/0b/CLM-0ba682d76516d92976ce066cae115b97.json",
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
              "adjudication_rule_digest": "sha256:9840969fda719a3b8833a28dd7843738a2b6c5566f9e917d78cadec69174d96b",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:35cad9bb1e887817b20b2f64d098d9ffea125c0d81202ab194e788d486e8b1c5",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:45:00.485705Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
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
                  "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000008.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                  },
                  "sequence": 8
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000008.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                "$digest": "sha256:e1dba4e3cb0dfc625d13d47acbde0642d83e1b328d1993bde99c99ad969eb1ad"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-0ba682d76516d92976ce066cae115b97"
              },
              "input_digest": {
                "$digest": "sha256:c82fd561af0c9a743aa22fcc5d77c09c4f4480725f8945a30b9f6869bffd3b15"
              },
              "statement_address": {
                "artifact_path": "claims/0b/CLM-0ba682d76516d92976ce066cae115b97.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:35cad9bb1e887817b20b2f64d098d9ffea125c0d81202ab194e788d486e8b1c5"
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
                  "artifact_digest": "sha256:861026e443671df82eaaadb0441183e4a26cd4a7e8f91fd36b85f8a9d5be16ce",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.kev_due_date"
                  }
                },
                {
                  "artifact_digest": "sha256:c088b29072ec2c1d398c014b4bbc190e913dbdaa86685c375e4e8251bbd16f29",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b"
                  }
                },
                {
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:e1dba4e3cb0dfc625d13d47acbde0642d83e1b328d1993bde99c99ad969eb1ad"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:c82fd561af0c9a743aa22fcc5d77c09c4f4480725f8945a30b9f6869bffd3b15"
              },
              "source_compilation_digest": {
                "$digest": "sha256:8a277bdd8cf0c9737bb578236f4e712d338210dcd1be4efb276afd0e2c45a32f"
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
                  "content_digest": "sha256:31cb9f2309b75c6c44ef64bf23629a81a7051ace7dbbaf6b6f77e541bfb4aa15",
                  "end_byte": 2410089,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/0b/CLM-0ba682d76516d92976ce066cae115b97.json",
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
                "name": "security.vulnerability.kev_due_date"
              },
              "claim_type_digest": "sha256:861026e443671df82eaaadb0441183e4a26cd4a7e8f91fd36b85f8a9d5be16ce",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "2021-12-24"
              },
              "predicate": "security.vulnerability.kev_due_date",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:33626c044ec393ad3c37fe795e5fc0e6ee9851cf5c1e1699c42cc520842a9180",
            "capture_digest": "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.kev_due_date",
          "object": {
            "kind": "literal",
            "value": "2021-12-24"
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
          "identity": "Claim:CLM-4c740f542205fd08336df797e00b487b",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/4c/CLM-4c740f542205fd08336df797e00b487b.json",
          "artifact_digest": "sha256:d884908214495511bef15853b65272dab5b645fdf787070a842f0cb854ec34ae",
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
                    "$digest": "sha256:c945da9caa6ed545468662bbce318103fe532284e4e2972a6a7d770d7fccac0a"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:c945da9caa6ed545468662bbce318103fe532284e4e2972a6a7d770d7fccac0a"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                      "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000008.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                },
                "subject_path": {
                  "$path": "claims/4c/CLM-4c740f542205fd08336df797e00b487b.json"
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
                "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb",
                  "citation_id": "sha256:ca751ef5fd1c0d00b640e3490276bacf5998ea88c1fafb35f51b77301fee256e",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:45:00.485705Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:31cb9f2309b75c6c44ef64bf23629a81a7051ace7dbbaf6b6f77e541bfb4aa15",
                      "end_byte": 2410089,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/4c/CLM-4c740f542205fd08336df797e00b487b.json",
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
              "adjudication_rule_digest": "sha256:cd8e275e0d9249800956609c80bbd8abfab773ea05b5ac5d314b4233917b239c",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:8a53883b94aa0600dd3b5ddb0cf80c5635bf8e239c62b6050fff58e8fd90f15d",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:45:00.485705Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
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
                  "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000008.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                  },
                  "sequence": 8
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000008.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                "$digest": "sha256:d884908214495511bef15853b65272dab5b645fdf787070a842f0cb854ec34ae"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-4c740f542205fd08336df797e00b487b"
              },
              "input_digest": {
                "$digest": "sha256:7ee1727b7635d2137acf0f7dcafb2f4e061227a35a37f534ae3b87b9762879a5"
              },
              "statement_address": {
                "artifact_path": "claims/4c/CLM-4c740f542205fd08336df797e00b487b.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:8a53883b94aa0600dd3b5ddb0cf80c5635bf8e239c62b6050fff58e8fd90f15d"
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
                  "artifact_digest": "sha256:88ef5e352f5f0f0dad9d2a5e6635211282d37f644fa9623ad218ff867505e85d",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.kev_listed"
                  }
                },
                {
                  "artifact_digest": "sha256:c088b29072ec2c1d398c014b4bbc190e913dbdaa86685c375e4e8251bbd16f29",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b"
                  }
                },
                {
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:d884908214495511bef15853b65272dab5b645fdf787070a842f0cb854ec34ae"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:7ee1727b7635d2137acf0f7dcafb2f4e061227a35a37f534ae3b87b9762879a5"
              },
              "source_compilation_digest": {
                "$digest": "sha256:8a277bdd8cf0c9737bb578236f4e712d338210dcd1be4efb276afd0e2c45a32f"
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
                  "content_digest": "sha256:31cb9f2309b75c6c44ef64bf23629a81a7051ace7dbbaf6b6f77e541bfb4aa15",
                  "end_byte": 2410089,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/4c/CLM-4c740f542205fd08336df797e00b487b.json",
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
                "name": "security.vulnerability.kev_listed"
              },
              "claim_type_digest": "sha256:88ef5e352f5f0f0dad9d2a5e6635211282d37f644fa9623ad218ff867505e85d",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": true
              },
              "predicate": "security.vulnerability.kev_listed",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:ca751ef5fd1c0d00b640e3490276bacf5998ea88c1fafb35f51b77301fee256e",
            "capture_digest": "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.kev_listed",
          "object": {
            "kind": "literal",
            "value": true
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
          "identity": "Claim:CLM-89f7cfb21f1f04019960beecae869a62",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/89/CLM-89f7cfb21f1f04019960beecae869a62.json",
          "artifact_digest": "sha256:00892b0fcba8db58d8af8da06b5e78bd472b2e3b6f4405ee7daf8ab79693a2db",
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
                    "$digest": "sha256:c945da9caa6ed545468662bbce318103fe532284e4e2972a6a7d770d7fccac0a"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:c945da9caa6ed545468662bbce318103fe532284e4e2972a6a7d770d7fccac0a"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                      "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000008.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                },
                "subject_path": {
                  "$path": "claims/89/CLM-89f7cfb21f1f04019960beecae869a62.json"
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
                "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb",
                  "citation_id": "sha256:926836fc6b39be9f2eafa971533b32aa4cfcb6800e49acd3213acc497ce9a41b",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:45:00.485705Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:31cb9f2309b75c6c44ef64bf23629a81a7051ace7dbbaf6b6f77e541bfb4aa15",
                      "end_byte": 2410089,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/89/CLM-89f7cfb21f1f04019960beecae869a62.json",
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
              "adjudication_rule_digest": "sha256:9824155e00d65918f2f1ecc73d4b31aaea47b49b15794beaa082f64dad1bd1b5",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:be8be4ab2aa1976b5327abd0bde7c1e2009da3d950e9987cd75a34ff67a9bf13",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:45:00.485705Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
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
                  "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000008.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                  },
                  "sequence": 8
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000008.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
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
                "$digest": "sha256:00892b0fcba8db58d8af8da06b5e78bd472b2e3b6f4405ee7daf8ab79693a2db"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-89f7cfb21f1f04019960beecae869a62"
              },
              "input_digest": {
                "$digest": "sha256:72ae186c2bd7a47a389530566c138f5682f6276055fc113745d173f58619aa8d"
              },
              "statement_address": {
                "artifact_path": "claims/89/CLM-89f7cfb21f1f04019960beecae869a62.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:be8be4ab2aa1976b5327abd0bde7c1e2009da3d950e9987cd75a34ff67a9bf13"
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
                  "artifact_digest": "sha256:6a2e3855eeb03fdad5fd97c48710444ff6811b65add958ec25c4c9a946b9ada2",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.kev_ransomware_use"
                  }
                },
                {
                  "artifact_digest": "sha256:c088b29072ec2c1d398c014b4bbc190e913dbdaa86685c375e4e8251bbd16f29",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b"
                  }
                },
                {
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:00892b0fcba8db58d8af8da06b5e78bd472b2e3b6f4405ee7daf8ab79693a2db"
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
                        "$digest": "sha256:c7001151044918e61e2995d6b2ec95dbb54e59221c553bc58fee606c45598114"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "41dc120513a2efa957abc743f62d788a5cebe96f",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8616dc1de0b183bc50c49f1b6542d18abf8bff71dd2af548490fd5502b6d18d9"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000008.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:6b430ebe3ffa24607bcfa8df32ea1ec680d73fd9fe64b898c1fa12ba58266874"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:72ae186c2bd7a47a389530566c138f5682f6276055fc113745d173f58619aa8d"
              },
              "source_compilation_digest": {
                "$digest": "sha256:8a277bdd8cf0c9737bb578236f4e712d338210dcd1be4efb276afd0e2c45a32f"
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
                  "content_digest": "sha256:31cb9f2309b75c6c44ef64bf23629a81a7051ace7dbbaf6b6f77e541bfb4aa15",
                  "end_byte": 2410089,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/89/CLM-89f7cfb21f1f04019960beecae869a62.json",
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
                "name": "security.vulnerability.kev_ransomware_use"
              },
              "claim_type_digest": "sha256:6a2e3855eeb03fdad5fd97c48710444ff6811b65add958ec25c4c9a946b9ada2",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "known"
              },
              "predicate": "security.vulnerability.kev_ransomware_use",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:926836fc6b39be9f2eafa971533b32aa4cfcb6800e49acd3213acc497ce9a41b",
            "capture_digest": "sha256:f2c9c7e27d623d449eeac396ce9c1f888b34841a88b9bd3a4ea96da7d59c26fb",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.kev_ransomware_use",
          "object": {
            "kind": "literal",
            "value": "known"
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
          "identity": "Claim:CLM-0c0cfd1dd4e36ad6aab1593f26883065",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/0c/CLM-0c0cfd1dd4e36ad6aab1593f26883065.json",
          "artifact_digest": "sha256:fe9044f655927ad589e8330da29e57d918fb2d540c555b592d14d7bf4389ae34",
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
                  "$path": "claims/0c/CLM-0c0cfd1dd4e36ad6aab1593f26883065.json"
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
                  "citation_id": "sha256:32ff999a85bed61c5bf62f8fd8562daaf9779df30eea11e0314358715dea99ee",
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
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
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
                    "artifact_path": "claims/0c/CLM-0c0cfd1dd4e36ad6aab1593f26883065.json",
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
              "adjudication_rule_digest": "sha256:30218ec3760730b9326bb76f56c75b9e3038c0aebbce61a8970e4303a3ea1b6f",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:61cfdb4b903f2b59c486b5889140f31e168281b1629adb298d3a66e1ee872066",
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
                "$digest": "sha256:fe9044f655927ad589e8330da29e57d918fb2d540c555b592d14d7bf4389ae34"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-0c0cfd1dd4e36ad6aab1593f26883065"
              },
              "input_digest": {
                "$digest": "sha256:8000addbc5e4d31ab2b404aa8ce8406264a13681c5cc42e72c5c2a0151e1a074"
              },
              "statement_address": {
                "artifact_path": "claims/0c/CLM-0c0cfd1dd4e36ad6aab1593f26883065.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:61cfdb4b903f2b59c486b5889140f31e168281b1629adb298d3a66e1ee872066"
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
                  "artifact_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.package"
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
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:fe9044f655927ad589e8330da29e57d918fb2d540c555b592d14d7bf4389ae34"
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
                "$digest": "sha256:8000addbc5e4d31ab2b404aa8ce8406264a13681c5cc42e72c5c2a0151e1a074"
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
                "artifact_path": "claims/0c/CLM-0c0cfd1dd4e36ad6aab1593f26883065.json",
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
                "name": "security.vulnerability.package"
              },
              "claim_type_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/org.apache.logging.log4j/log4j-core"
              },
              "predicate": "security.vulnerability.package",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:32ff999a85bed61c5bf62f8fd8562daaf9779df30eea11e0314358715dea99ee",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.package",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/org.apache.logging.log4j/log4j-core"
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
          "identity": "Claim:CLM-4de94887cc52ea1517d2da2cfdaecdba",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/4d/CLM-4de94887cc52ea1517d2da2cfdaecdba.json",
          "artifact_digest": "sha256:008df48525d48763086daea8f7ef31929cc8cfb7ecb29b195feb5f5748097703",
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
                  "$path": "claims/4d/CLM-4de94887cc52ea1517d2da2cfdaecdba.json"
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
                  "citation_id": "sha256:30db404724ae508b33a118f154e09ebc783029d9015631909c871295963e49c4",
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
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
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
                    "artifact_path": "claims/4d/CLM-4de94887cc52ea1517d2da2cfdaecdba.json",
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
              "adjudication_rule_digest": "sha256:30218ec3760730b9326bb76f56c75b9e3038c0aebbce61a8970e4303a3ea1b6f",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:76846f6d1b4d2da4debe393182620525f30742ce598d67221351495658712be9",
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
                "$digest": "sha256:008df48525d48763086daea8f7ef31929cc8cfb7ecb29b195feb5f5748097703"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-4de94887cc52ea1517d2da2cfdaecdba"
              },
              "input_digest": {
                "$digest": "sha256:055de5b3b6d05e71d75c7065b860bef543da8561426ed9f88b38baae281b001d"
              },
              "statement_address": {
                "artifact_path": "claims/4d/CLM-4de94887cc52ea1517d2da2cfdaecdba.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:76846f6d1b4d2da4debe393182620525f30742ce598d67221351495658712be9"
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
                  "artifact_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.package"
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
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:008df48525d48763086daea8f7ef31929cc8cfb7ecb29b195feb5f5748097703"
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
                "$digest": "sha256:055de5b3b6d05e71d75c7065b860bef543da8561426ed9f88b38baae281b001d"
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
                "artifact_path": "claims/4d/CLM-4de94887cc52ea1517d2da2cfdaecdba.json",
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
                "name": "security.vulnerability.package"
              },
              "claim_type_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/org.xbib.elasticsearch/log4j"
              },
              "predicate": "security.vulnerability.package",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:30db404724ae508b33a118f154e09ebc783029d9015631909c871295963e49c4",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.package",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/org.xbib.elasticsearch/log4j"
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
          "identity": "Claim:CLM-7e131bcf8fec6478c4a7e5ec6df506c7",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/7e/CLM-7e131bcf8fec6478c4a7e5ec6df506c7.json",
          "artifact_digest": "sha256:269bc7eeb26ef4aee4d84e82933498f161188bc5d34c6c56b0b369d9f48dd74d",
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
                  "$path": "claims/7e/CLM-7e131bcf8fec6478c4a7e5ec6df506c7.json"
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
                  "citation_id": "sha256:a26d81d37fa5c9786c5726b3f6edb0bb933d964ab58f2362eed6fd38d0a7b45f",
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
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
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
                    "artifact_path": "claims/7e/CLM-7e131bcf8fec6478c4a7e5ec6df506c7.json",
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
              "adjudication_rule_digest": "sha256:30218ec3760730b9326bb76f56c75b9e3038c0aebbce61a8970e4303a3ea1b6f",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:bc9a3ebc19a297efcea895a35b4ab1056fda43a73a63da14eada7217078cf000",
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
                "$digest": "sha256:269bc7eeb26ef4aee4d84e82933498f161188bc5d34c6c56b0b369d9f48dd74d"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-7e131bcf8fec6478c4a7e5ec6df506c7"
              },
              "input_digest": {
                "$digest": "sha256:b482e192ba54ba582a87ceed720367baa9af2b2fe9cd3498f47210c84d262844"
              },
              "statement_address": {
                "artifact_path": "claims/7e/CLM-7e131bcf8fec6478c4a7e5ec6df506c7.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:bc9a3ebc19a297efcea895a35b4ab1056fda43a73a63da14eada7217078cf000"
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
                  "artifact_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.package"
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
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:269bc7eeb26ef4aee4d84e82933498f161188bc5d34c6c56b0b369d9f48dd74d"
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
                "$digest": "sha256:b482e192ba54ba582a87ceed720367baa9af2b2fe9cd3498f47210c84d262844"
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
                "artifact_path": "claims/7e/CLM-7e131bcf8fec6478c4a7e5ec6df506c7.json",
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
                "name": "security.vulnerability.package"
              },
              "claim_type_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/com.guicedee.services/log4j-core"
              },
              "predicate": "security.vulnerability.package",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:a26d81d37fa5c9786c5726b3f6edb0bb933d964ab58f2362eed6fd38d0a7b45f",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.package",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/com.guicedee.services/log4j-core"
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
          "identity": "Claim:CLM-94f06e40aea84c55bc21c503376650a8",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/94/CLM-94f06e40aea84c55bc21c503376650a8.json",
          "artifact_digest": "sha256:c9f2c756a499e20a7b12768f204389939d12bec62ff0fd23bfd966c4cc1effe5",
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
                  "$path": "claims/94/CLM-94f06e40aea84c55bc21c503376650a8.json"
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
                  "citation_id": "sha256:a1fa76698324b5422601b65a2a21d118e727a5d2267fa01691188dd4b6b04286",
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
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
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
                    "artifact_path": "claims/94/CLM-94f06e40aea84c55bc21c503376650a8.json",
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
              "adjudication_rule_digest": "sha256:30218ec3760730b9326bb76f56c75b9e3038c0aebbce61a8970e4303a3ea1b6f",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:dff4d429391c992bba6dda414ebc38d97d6d8d3d0067a3ce9fc154fb1ac9a326",
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
                "$digest": "sha256:c9f2c756a499e20a7b12768f204389939d12bec62ff0fd23bfd966c4cc1effe5"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-94f06e40aea84c55bc21c503376650a8"
              },
              "input_digest": {
                "$digest": "sha256:4a3327d828d903d39137d1f8f9d3b2f61a31b6deaa0ec7acdc54fe09450441bd"
              },
              "statement_address": {
                "artifact_path": "claims/94/CLM-94f06e40aea84c55bc21c503376650a8.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:dff4d429391c992bba6dda414ebc38d97d6d8d3d0067a3ce9fc154fb1ac9a326"
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
                  "artifact_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.package"
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
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:c9f2c756a499e20a7b12768f204389939d12bec62ff0fd23bfd966c4cc1effe5"
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
                "$digest": "sha256:4a3327d828d903d39137d1f8f9d3b2f61a31b6deaa0ec7acdc54fe09450441bd"
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
                "artifact_path": "claims/94/CLM-94f06e40aea84c55bc21c503376650a8.json",
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
                "name": "security.vulnerability.package"
              },
              "claim_type_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2"
              },
              "predicate": "security.vulnerability.package",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:a1fa76698324b5422601b65a2a21d118e727a5d2267fa01691188dd4b6b04286",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.package",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/org.ops4j.pax.logging/pax-logging-log4j2"
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
          "identity": "Claim:CLM-f9165ed7c97a78e3d7745c550644fb1e",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/f9/CLM-f9165ed7c97a78e3d7745c550644fb1e.json",
          "artifact_digest": "sha256:9902a466da810f65952935b87993818439a0913b36c65f3df780141c4a8dccd1",
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
                  "$path": "claims/f9/CLM-f9165ed7c97a78e3d7745c550644fb1e.json"
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
                  "citation_id": "sha256:479ee4baaa0d921fbd51e073f1ed39ca642d74ff3d4efc53de4cad7f77e76f68",
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
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
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
                    "artifact_path": "claims/f9/CLM-f9165ed7c97a78e3d7745c550644fb1e.json",
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
              "adjudication_rule_digest": "sha256:30218ec3760730b9326bb76f56c75b9e3038c0aebbce61a8970e4303a3ea1b6f",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:f5f10fe826456086767529e4f20f29db18a487ead7161f9cd4c9253f93e75842",
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
                "$digest": "sha256:9902a466da810f65952935b87993818439a0913b36c65f3df780141c4a8dccd1"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-f9165ed7c97a78e3d7745c550644fb1e"
              },
              "input_digest": {
                "$digest": "sha256:cf4149bfc9646e14ffed01b7ee8ce3fbf684646282f4d37810261d137f9ced3a"
              },
              "statement_address": {
                "artifact_path": "claims/f9/CLM-f9165ed7c97a78e3d7745c550644fb1e.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:f5f10fe826456086767529e4f20f29db18a487ead7161f9cd4c9253f93e75842"
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
                  "artifact_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.package"
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
                  "artifact_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2021-44228"
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
                "$digest": "sha256:9902a466da810f65952935b87993818439a0913b36c65f3df780141c4a8dccd1"
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
                "$digest": "sha256:cf4149bfc9646e14ffed01b7ee8ce3fbf684646282f4d37810261d137f9ced3a"
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
                "artifact_path": "claims/f9/CLM-f9165ed7c97a78e3d7745c550644fb1e.json",
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
                "name": "security.vulnerability.package"
              },
              "claim_type_digest": "sha256:beb45e7dd86f829d103d0cfdd9a60d44bd5767f4369087e23a5fd54ba117f7cc",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core"
              },
              "predicate": "security.vulnerability.package",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
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
            "citation_id": "sha256:479ee4baaa0d921fbd51e073f1ed39ca642d74ff3d4efc53de4cad7f77e76f68",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.vulnerability/cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.package",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/uk.co.nichesolutions.logging.log4j/log4j-core"
          },
          "role": "observation",
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
