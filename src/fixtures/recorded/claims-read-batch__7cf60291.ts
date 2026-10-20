// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 82641123
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-cbd32c835b2adaf3209581ada13e4b56",
      "CLM-a8f0e5ebe0d59c830dfd78a963da64a8",
      "CLM-8e3979a108f833d3d026632499e534e0",
      "CLM-ec55359f4141d7e3a8027003b4ee4f03",
      "CLM-df5b029f629819e35047abaa5f6644a8"
    ],
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    }
  },
  "response": {
    "tag": "playbill-claim-read-batch-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "claims": [
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-cbd32c835b2adaf3209581ada13e4b56",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/cb/CLM-cbd32c835b2adaf3209581ada13e4b56.json",
          "artifact_digest": "sha256:b49dd7044a0305da5e40dbd4d50407f8ae166ca9231791f44cceaced44c57e5d",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "subject_path": {
                  "$path": "claims/cb/CLM-cbd32c835b2adaf3209581ada13e4b56.json"
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
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
                  "citation_id": "sha256:c231e991ec2161dfdc0ca9e96328176f5015ad35ce4039250a3cc7e82cd215b7",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:31:46.272392Z",
                "subject_content_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                      "end_byte": 24935,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/cb/CLM-cbd32c835b2adaf3209581ada13e4b56.json",
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
              "adjudication_rule_digest": "sha256:75f46fddce8ac6d77a9d1b18141f5b5250b7849f216b10f76444526dd3cbdde5",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:aa9a185dbd9147ee2277c12e4c3cbb966770b6d9e29ae07abb2bb5b946cea2a9",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:31:46.272392Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                "origin_only"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  },
                  "sequence": 21
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000021.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                "$digest": "sha256:b49dd7044a0305da5e40dbd4d50407f8ae166ca9231791f44cceaced44c57e5d"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-cbd32c835b2adaf3209581ada13e4b56"
              },
              "input_digest": {
                "$digest": "sha256:c9b5d780d310164982eb15e12ee8ed81862cbc008e374776a9df3bd4d8175ff5"
              },
              "statement_address": {
                "artifact_path": "claims/cb/CLM-cbd32c835b2adaf3209581ada13e4b56.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:aa9a185dbd9147ee2277c12e4c3cbb966770b6d9e29ae07abb2bb5b946cea2a9"
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
                  "artifact_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.cve-record-http-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:0b62bdc6ed1ef9c6f669fc5f7c52f232a53bb6ef7a33e1ce5275901d460644f2",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.cve_id"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.assessment/apache-log4j-1.2.17--cve-2021-44228"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:b49dd7044a0305da5e40dbd4d50407f8ae166ca9231791f44cceaced44c57e5d"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:c9b5d780d310164982eb15e12ee8ed81862cbc008e374776a9df3bd4d8175ff5"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1291ba757db61b576e882acdbccca69eb27e65863563bed9284df215b03f76bd"
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
                  "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                  "end_byte": 24935,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/cb/CLM-cbd32c835b2adaf3209581ada13e4b56.json",
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
              "claim_type_digest": "sha256:0b62bdc6ed1ef9c6f669fc5f7c52f232a53bb6ef7a33e1ce5275901d460644f2",
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
                "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:c231e991ec2161dfdc0ca9e96328176f5015ad35ce4039250a3cc7e82cd215b7",
            "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.cve-record-http-v1",
            "capture_contract_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
            "status": "not_admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "not_admitted",
                "rule_id": null,
                "admission": null,
                "refusal_code": "cruxible.evidence.undeclared_contract_kind",
                "closest_rule_id": null
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-a8f0e5ebe0d59c830dfd78a963da64a8",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/a8/CLM-a8f0e5ebe0d59c830dfd78a963da64a8.json",
          "artifact_digest": "sha256:3e2746f17347a38b662af9ff35e0b7c31bd0ede4422367e0e6873664e47ec4e1",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "subject_path": {
                  "$path": "claims/a8/CLM-a8f0e5ebe0d59c830dfd78a963da64a8.json"
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
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
                  "citation_id": "sha256:fc2b140261112220b704813aa3bf6a6d07a13ce44b035bcc34a9d5cf3dd9d2bb",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:0707726744d6f60fe7a3df2adbf82c34505d88b3cc9e0390ef07536ce1842eea",
                "observed_at": "2026-10-19T21:31:46.272392Z",
                "subject_content_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                      "end_byte": 24935,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/a8/CLM-a8f0e5ebe0d59c830dfd78a963da64a8.json",
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
              "adjudication_rule_digest": "sha256:7112d5b2bc8b7ac98abbcec3b596fb9759d606177b949fda251974e3743852cf",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:7ce44ccad4623483df21d61bac397001458978789f48405fef64089a4b1e6000",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:31:46.272392Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                  "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  },
                  "sequence": 21
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000021.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                "$digest": "sha256:3e2746f17347a38b662af9ff35e0b7c31bd0ede4422367e0e6873664e47ec4e1"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-a8f0e5ebe0d59c830dfd78a963da64a8"
              },
              "input_digest": {
                "$digest": "sha256:51c7eeff74543deffcc16c1b354998ba6db4af6c46b6cee1e345ec26029a4466"
              },
              "statement_address": {
                "artifact_path": "claims/a8/CLM-a8f0e5ebe0d59c830dfd78a963da64a8.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:7ce44ccad4623483df21d61bac397001458978789f48405fef64089a4b1e6000"
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
                  "artifact_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.cve-record-http-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.release"
                  }
                },
                {
                  "artifact_digest": "sha256:0707726744d6f60fe7a3df2adbf82c34505d88b3cc9e0390ef07536ce1842eea",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/apache-log4j--1.2.17"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.assessment/apache-log4j-1.2.17--cve-2021-44228"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:3e2746f17347a38b662af9ff35e0b7c31bd0ede4422367e0e6873664e47ec4e1"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:51c7eeff74543deffcc16c1b354998ba6db4af6c46b6cee1e345ec26029a4466"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1291ba757db61b576e882acdbccca69eb27e65863563bed9284df215b03f76bd"
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
                  "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                  "end_byte": 24935,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/a8/CLM-a8f0e5ebe0d59c830dfd78a963da64a8.json",
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
              "claim_type_digest": "sha256:3943580408f5ba36b2d327ff765256478de74163a43928debd3d910d3dae0304",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.release/apache-log4j--1.2.17.json",
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
                "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:fc2b140261112220b704813aa3bf6a6d07a13ce44b035bcc34a9d5cf3dd9d2bb",
            "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.cve-record-http-v1",
            "capture_contract_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "stated-by-source",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "stated-by-source"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
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
              "artifact_path": "subjects/security.release/apache-log4j--1.2.17.json",
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-8e3979a108f833d3d026632499e534e0",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/8e/CLM-8e3979a108f833d3d026632499e534e0.json",
          "artifact_digest": "sha256:55739b531e29d4a385e63afe8e49ea30041882e913c5ee14ba31cc438f980017",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "subject_path": {
                  "$path": "claims/8e/CLM-8e3979a108f833d3d026632499e534e0.json"
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
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
                  "citation_id": "sha256:4109cabdadf43c8808e19f33aeaef061aef47e055d864913ef3aa6d5b56d27ff",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:31:46.272392Z",
                "subject_content_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                      "end_byte": 24935,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/8e/CLM-8e3979a108f833d3d026632499e534e0.json",
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
              "adjudication_rule_digest": "sha256:7ac157db424be4dda34e0d3600cf829995218742c0c10492c4f8356bf20c4a5c",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:8ce42078dd85a10c683fd34de81e1321517b77b88f87fe783434af1a5928f380",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:31:46.272392Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                "origin_only"
              ],
              "attestations": [],
              "verdict_evidence": {
                "contradicting": [],
                "supporting": [
                  "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  },
                  "sequence": 21
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000021.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                "$digest": "sha256:55739b531e29d4a385e63afe8e49ea30041882e913c5ee14ba31cc438f980017"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-8e3979a108f833d3d026632499e534e0"
              },
              "input_digest": {
                "$digest": "sha256:de25eca978ae0a4fde1434cd25f02ea7c2775f9faa6d9d7a11e0b104af2d71cb"
              },
              "statement_address": {
                "artifact_path": "claims/8e/CLM-8e3979a108f833d3d026632499e534e0.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:8ce42078dd85a10c683fd34de81e1321517b77b88f87fe783434af1a5928f380"
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
                  "artifact_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.cve-record-http-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:a24aa7d4af2dcd216ec99481a708e1961888815dace147c5a0f6eb3a0074eb64",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.release_id"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.assessment/apache-log4j-1.2.17--cve-2021-44228"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:55739b531e29d4a385e63afe8e49ea30041882e913c5ee14ba31cc438f980017"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:de25eca978ae0a4fde1434cd25f02ea7c2775f9faa6d9d7a11e0b104af2d71cb"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1291ba757db61b576e882acdbccca69eb27e65863563bed9284df215b03f76bd"
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
                  "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                  "end_byte": 24935,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/8e/CLM-8e3979a108f833d3d026632499e534e0.json",
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
              "claim_type_digest": "sha256:a24aa7d4af2dcd216ec99481a708e1961888815dace147c5a0f6eb3a0074eb64",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "apache-log4j--1.2.17"
              },
              "predicate": "security.assessment.release_id",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:4109cabdadf43c8808e19f33aeaef061aef47e055d864913ef3aa6d5b56d27ff",
            "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.cve-record-http-v1",
            "capture_contract_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
            "status": "not_admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "not_admitted",
                "rule_id": null,
                "admission": null,
                "refusal_code": "cruxible.evidence.undeclared_contract_kind",
                "closest_rule_id": null
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.release_id",
          "object": {
            "kind": "literal",
            "value": "apache-log4j--1.2.17"
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-ec55359f4141d7e3a8027003b4ee4f03",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/ec/CLM-ec55359f4141d7e3a8027003b4ee4f03.json",
          "artifact_digest": "sha256:1fcc09895d3f8818d58012b95a9a94c1b052468151c2fd68420501a108c1302e",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "subject_path": {
                  "$path": "claims/ec/CLM-ec55359f4141d7e3a8027003b4ee4f03.json"
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
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
                  "citation_id": "sha256:a87faeea71bb47819ebd3ab1f3a504576cc88a87dbeb3e5a6dd1e695fe29a77c",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:31:46.272392Z",
                "subject_content_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                      "end_byte": 24935,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/ec/CLM-ec55359f4141d7e3a8027003b4ee4f03.json",
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
              "adjudication_rule_digest": "sha256:04d7d7113c33fbd76fbbeb56b2ad301ff868189ef8dfafa6aac2c8d2bace358e",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:fed8d0ec94c90945eda932ce6fd36b61aeb852262cb421601e2614cab7c8ae97",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:31:46.272392Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                  "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  },
                  "sequence": 21
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000021.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                "$digest": "sha256:1fcc09895d3f8818d58012b95a9a94c1b052468151c2fd68420501a108c1302e"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-ec55359f4141d7e3a8027003b4ee4f03"
              },
              "input_digest": {
                "$digest": "sha256:a28452e36ff2259f827950479dd0609ba20fc9f25151066ec9f3bde628a21d28"
              },
              "statement_address": {
                "artifact_path": "claims/ec/CLM-ec55359f4141d7e3a8027003b4ee4f03.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:fed8d0ec94c90945eda932ce6fd36b61aeb852262cb421601e2614cab7c8ae97"
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
                  "artifact_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.cve-record-http-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.assessment.status"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.assessment/apache-log4j-1.2.17--cve-2021-44228"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:1fcc09895d3f8818d58012b95a9a94c1b052468151c2fd68420501a108c1302e"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:a28452e36ff2259f827950479dd0609ba20fc9f25151066ec9f3bde628a21d28"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1291ba757db61b576e882acdbccca69eb27e65863563bed9284df215b03f76bd"
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
                  "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                  "end_byte": 24935,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/ec/CLM-ec55359f4141d7e3a8027003b4ee4f03.json",
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
              "claim_type_digest": "sha256:af3ce1531dba3d67329952c3ce2833d90318c3f19e5bedea85b5dbc200fab2aa",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "inconclusive"
              },
              "predicate": "security.assessment.status",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:a87faeea71bb47819ebd3ab1f3a504576cc88a87dbeb3e5a6dd1e695fe29a77c",
            "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.cve-record-http-v1",
            "capture_contract_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "source-verdict",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "source-verdict"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.assessment.status",
          "object": {
            "kind": "literal",
            "value": "inconclusive"
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-df5b029f629819e35047abaa5f6644a8",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/df/CLM-df5b029f629819e35047abaa5f6644a8.json",
          "artifact_digest": "sha256:6fe3c77c282bbd8ae8e9dc0c3d087f2f9521ad6b4820f5a3b00f9f895142e77a",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "subject_path": {
                  "$path": "claims/df/CLM-df5b029f629819e35047abaa5f6644a8.json"
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
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
                  "citation_id": "sha256:11aede4581bb81d6300c3fd1c98d04e9d83b7b4bfeb3fb8d6f5685d89d1d8f0d",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "observed_at": "2026-10-19T21:31:46.272392Z",
                "subject_content_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                      "end_byte": 24935,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/df/CLM-df5b029f629819e35047abaa5f6644a8.json",
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
              "adjudication_rule_digest": "sha256:6eb55eb1f366a4b66df8676449e55ecb718112b4947a611efcebb7e54d5ae180",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:f4fe7fb77fec45d555aa054b1cb31e5264b87b9647e1d2b51c83b6d8bedb42b8",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:31:46.272392Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                  "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                  },
                  "sequence": 21
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000021.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
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
                "$digest": "sha256:6fe3c77c282bbd8ae8e9dc0c3d087f2f9521ad6b4820f5a3b00f9f895142e77a"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-df5b029f629819e35047abaa5f6644a8"
              },
              "input_digest": {
                "$digest": "sha256:bb1df08ebdd6f894d9922014f71e22d1e02e3daa1e5dc9ec33de4b90d705dd43"
              },
              "statement_address": {
                "artifact_path": "claims/df/CLM-df5b029f629819e35047abaa5f6644a8.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:f4fe7fb77fec45d555aa054b1cb31e5264b87b9647e1d2b51c83b6d8bedb42b8"
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
                  "artifact_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.cve-record-http-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
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
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:8360518619530b7ab9a09e777aa52f8d2ee825ec6dc2f369261d0f7444f738fd",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.assessment/apache-log4j-1.2.17--cve-2021-44228"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:6fe3c77c282bbd8ae8e9dc0c3d087f2f9521ad6b4820f5a3b00f9f895142e77a"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:95ce4483174d06a5caaa1fc129f4dff98b2facb44780bb1c99ececd2996a499a"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "02cb71eab326a9366620f75f6e170281aa465973",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:00fbc938112cb6b3b641565fffd8084e9855b60284137986a4c22b4e20f5cae5"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:1942d02d4188f290fbf6ff1983eaee9c75612b45486e8c1d571a6709ed079442"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:c3e6429f0c3d00ca54489170a17390ad2b454d0c643eb80e862a0e2fd27c9d5e"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:bb1df08ebdd6f894d9922014f71e22d1e02e3daa1e5dc9ec33de4b90d705dd43"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1291ba757db61b576e882acdbccca69eb27e65863563bed9284df215b03f76bd"
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
                  "content_digest": "sha256:11bca930848c1360cf241704e21d8915ed18ab3cafeec99f81a1ea3783faa144",
                  "end_byte": 24935,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/df/CLM-df5b029f629819e35047abaa5f6644a8.json",
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
              "claim_type_digest": "sha256:97b3d2b4c70eca2f81cf880ef40a18312af4fccf801f2d51b283d6125df02538",
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
                "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:11aede4581bb81d6300c3fd1c98d04e9d83b7b4bfeb3fb8d6f5685d89d1d8f0d",
            "capture_digest": "sha256:72e7a0d8035a1a60ae5e7fd7f880bf404cab9d3126c54f19f38bb301456bae6b",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.cve-record-http-v1",
            "capture_contract_digest": "sha256:e87a15358ef33484e29f58bfbc27c6d4a0d01cc375819b36a596786abb4b70f2",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "stated-by-source",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "stated-by-source"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.assessment/apache-log4j-1.2.17--cve-2021-44228.json",
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
