// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 9f024ead
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-091ae7da5940fd85d4b8d852f407029e",
      "CLM-92d552d36719072cc59cb34f7f4aa520",
      "CLM-b01afaa7c56208ff1d7265159b576e12",
      "CLM-101f30bf11587e2ccf791fe27f376bbe"
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
          "identity": "Claim:CLM-091ae7da5940fd85d4b8d852f407029e",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/09/CLM-091ae7da5940fd85d4b8d852f407029e.json",
          "artifact_digest": "sha256:5f13494a2f7720d4e0c97ebc6688a5678e2e7fd18543ad19c14663fcc1314f2d",
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                      "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000050.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                },
                "subject_path": {
                  "$path": "claims/09/CLM-091ae7da5940fd85d4b8d852f407029e.json"
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
                "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
                  "citation_id": "sha256:81883ebdc8a8baeae8a16d425d6a42090123f3622f8a954fdc379c9fcbc7359c",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:45.436923Z",
                "subject_content_digest": "sha256:13699ace869426c32c89a507e9ad9efc5d48ce44bc914529cad299a294729965",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:99392beccbe48e832776138288f12215aca01bd71d0f1bab3490ed12da040b8a",
                      "end_byte": 3266,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/09/CLM-091ae7da5940fd85d4b8d852f407029e.json",
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
              "adjudication_rule_digest": "sha256:e07b651e4dbb145e457862accb9b97a9ca8d1588911904b5debb789a6395788f",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:67eef70340ec55e2f249c1a6be4250bdad6a2a9d127101b5a5c612680c90583f",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:45.436923Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
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
                  "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000050.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                  },
                  "sequence": 50
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000050.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                "$digest": "sha256:5f13494a2f7720d4e0c97ebc6688a5678e2e7fd18543ad19c14663fcc1314f2d"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-091ae7da5940fd85d4b8d852f407029e"
              },
              "input_digest": {
                "$digest": "sha256:9dddd8c7559cfe480050737154cbe131f5b31decb8c9fa6fedab4babf9ddf308"
              },
              "statement_address": {
                "artifact_path": "claims/09/CLM-091ae7da5940fd85d4b8d852f407029e.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:67eef70340ec55e2f249c1a6be4250bdad6a2a9d127101b5a5c612680c90583f"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:f6fec93280a318e9d1f43db80b79f344c9eb34c1ba5a0626809b752bc4be1bfd",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.artifact.declared_sha256"
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
                  "artifact_digest": "sha256:13699ace869426c32c89a507e9ad9efc5d48ce44bc914529cad299a294729965",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz"
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
                "$digest": "sha256:5f13494a2f7720d4e0c97ebc6688a5678e2e7fd18543ad19c14663fcc1314f2d"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:9dddd8c7559cfe480050737154cbe131f5b31decb8c9fa6fedab4babf9ddf308"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c08f56de82e635d487d635a67f7093bdcc9aa50f617b68f23c032bcc7f10bde"
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
                  "content_digest": "sha256:99392beccbe48e832776138288f12215aca01bd71d0f1bab3490ed12da040b8a",
                  "end_byte": 3266,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/09/CLM-091ae7da5940fd85d4b8d852f407029e.json",
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
                "name": "security.artifact.declared_sha256"
              },
              "claim_type_digest": "sha256:f6fec93280a318e9d1f43db80b79f344c9eb34c1ba5a0626809b752bc4be1bfd",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b"
              },
              "predicate": "security.artifact.declared_sha256",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz.json",
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
            "citation_id": "sha256:81883ebdc8a8baeae8a16d425d6a42090123f3622f8a954fdc379c9fcbc7359c",
            "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "retained-security-evidence",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "retained-security-evidence"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.artifact.declared_sha256",
          "object": {
            "kind": "literal",
            "value": "sha256:c5167fd102a6497e82d48f6aeac556870f6915a83353e06f11131ed01e3a1b5b"
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
          "identity": "Claim:CLM-92d552d36719072cc59cb34f7f4aa520",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/92/CLM-92d552d36719072cc59cb34f7f4aa520.json",
          "artifact_digest": "sha256:cc256dba3a1185d3d8eb354afd22ee3671508a39e6a618ea21a97b5057a4d51b",
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                      "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000050.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                },
                "subject_path": {
                  "$path": "claims/92/CLM-92d552d36719072cc59cb34f7f4aa520.json"
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
                "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
                  "citation_id": "sha256:cbae965d354d6df48d10e039ee3bab5ff9fc4028d712c0ea240a060a595d284a",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:45.436923Z",
                "subject_content_digest": "sha256:13699ace869426c32c89a507e9ad9efc5d48ce44bc914529cad299a294729965",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:99392beccbe48e832776138288f12215aca01bd71d0f1bab3490ed12da040b8a",
                      "end_byte": 3266,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/92/CLM-92d552d36719072cc59cb34f7f4aa520.json",
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
              "adjudication_rule_digest": "sha256:ffdb725690e63609966e7dd35f697ee027ceac373506173a8576232919b841f6",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:a136b6af494e380e42b5c4bf3a8f00b6764bb1f8c51d4c831f0554dc093b0cce",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:45.436923Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
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
                  "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000050.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                  },
                  "sequence": 50
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000050.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                "$digest": "sha256:cc256dba3a1185d3d8eb354afd22ee3671508a39e6a618ea21a97b5057a4d51b"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-92d552d36719072cc59cb34f7f4aa520"
              },
              "input_digest": {
                "$digest": "sha256:2fd041e4acc243c45005e13112e93db1aced2f346f52cff28196e37546a78f6e"
              },
              "statement_address": {
                "artifact_path": "claims/92/CLM-92d552d36719072cc59cb34f7f4aa520.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:a136b6af494e380e42b5c4bf3a8f00b6764bb1f8c51d4c831f0554dc093b0cce"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:380bd13e23ed8f0f70f29471b9651608dbe1efb30a7cc37245f0005008d05886",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.artifact.name"
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
                  "artifact_digest": "sha256:13699ace869426c32c89a507e9ad9efc5d48ce44bc914529cad299a294729965",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz"
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
                "$digest": "sha256:cc256dba3a1185d3d8eb354afd22ee3671508a39e6a618ea21a97b5057a4d51b"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:2fd041e4acc243c45005e13112e93db1aced2f346f52cff28196e37546a78f6e"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c08f56de82e635d487d635a67f7093bdcc9aa50f617b68f23c032bcc7f10bde"
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
                  "content_digest": "sha256:99392beccbe48e832776138288f12215aca01bd71d0f1bab3490ed12da040b8a",
                  "end_byte": 3266,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/92/CLM-92d552d36719072cc59cb34f7f4aa520.json",
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
                "name": "security.artifact.name"
              },
              "claim_type_digest": "sha256:380bd13e23ed8f0f70f29471b9651608dbe1efb30a7cc37245f0005008d05886",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "v0.3.2/agent-operation-0.3.2.tar.gz"
              },
              "predicate": "security.artifact.name",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz.json",
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
            "citation_id": "sha256:cbae965d354d6df48d10e039ee3bab5ff9fc4028d712c0ea240a060a595d284a",
            "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
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
            "artifact_path": "subjects/security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.artifact.name",
          "object": {
            "kind": "literal",
            "value": "v0.3.2/agent-operation-0.3.2.tar.gz"
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
          "identity": "Claim:CLM-b01afaa7c56208ff1d7265159b576e12",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/b0/CLM-b01afaa7c56208ff1d7265159b576e12.json",
          "artifact_digest": "sha256:8688e41308784403343ce7b5e07ef768677d95abfc3728857f1981861c709dc8",
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                      "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000050.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                },
                "subject_path": {
                  "$path": "claims/b0/CLM-b01afaa7c56208ff1d7265159b576e12.json"
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
                "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
                  "citation_id": "sha256:ebd29609446a1e6f8612010cb1e0d335d057f8ef828e5d5d188bc218b22327af",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:2d8348d4e96c93feca91c964bdba1641847611eb9b7eca3ef749e29dcfbad3be",
                "observed_at": "2026-10-19T21:47:45.436923Z",
                "subject_content_digest": "sha256:13699ace869426c32c89a507e9ad9efc5d48ce44bc914529cad299a294729965",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:99392beccbe48e832776138288f12215aca01bd71d0f1bab3490ed12da040b8a",
                      "end_byte": 3266,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/b0/CLM-b01afaa7c56208ff1d7265159b576e12.json",
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
              "adjudication_rule_digest": "sha256:db8fdc8fc23ccbbe27df9a56aac79efad8dd475368597bc1bc5e01e5696893e1",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:a1f21770a0fd1d6a851a528463fa5c5653ff319c0335f501be6fd57d705c6652",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:45.436923Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
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
                  "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000050.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                  },
                  "sequence": 50
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000050.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                "$digest": "sha256:8688e41308784403343ce7b5e07ef768677d95abfc3728857f1981861c709dc8"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-b01afaa7c56208ff1d7265159b576e12"
              },
              "input_digest": {
                "$digest": "sha256:36038e2c43706c41febf175355382aed4c35c79b5d3659c8f087d6678d2be76c"
              },
              "statement_address": {
                "artifact_path": "claims/b0/CLM-b01afaa7c56208ff1d7265159b576e12.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:a1f21770a0fd1d6a851a528463fa5c5653ff319c0335f501be6fd57d705c6652"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:55d32de621428fc02ea467f506405ce281401be8fd6cb965dc4070114e4db024",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.artifact.target"
                  }
                },
                {
                  "artifact_digest": "sha256:2d8348d4e96c93feca91c964bdba1641847611eb9b7eca3ef749e29dcfbad3be",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.target/github-release--cruxible-ai-cruxible"
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
                  "artifact_digest": "sha256:13699ace869426c32c89a507e9ad9efc5d48ce44bc914529cad299a294729965",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz"
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
                "$digest": "sha256:8688e41308784403343ce7b5e07ef768677d95abfc3728857f1981861c709dc8"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:36038e2c43706c41febf175355382aed4c35c79b5d3659c8f087d6678d2be76c"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c08f56de82e635d487d635a67f7093bdcc9aa50f617b68f23c032bcc7f10bde"
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
                  "content_digest": "sha256:99392beccbe48e832776138288f12215aca01bd71d0f1bab3490ed12da040b8a",
                  "end_byte": 3266,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/b0/CLM-b01afaa7c56208ff1d7265159b576e12.json",
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
                "name": "security.artifact.target"
              },
              "claim_type_digest": "sha256:55d32de621428fc02ea467f506405ce281401be8fd6cb965dc4070114e4db024",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.target/github-release--cruxible-ai-cruxible.json",
                  "selector": {
                    "scheme": "artifact-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "kind": "subject"
              },
              "predicate": "security.artifact.target",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz.json",
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
            "citation_id": "sha256:ebd29609446a1e6f8612010cb1e0d335d057f8ef828e5d5d188bc218b22327af",
            "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "retained-security-evidence",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "retained-security-evidence"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.artifact.target",
          "object": {
            "kind": "subject",
            "address": {
              "tag": "playbill-semantic-address-v1",
              "artifact_path": "subjects/security.target/github-release--cruxible-ai-cruxible.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              }
            }
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
          "identity": "Claim:CLM-101f30bf11587e2ccf791fe27f376bbe",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/10/CLM-101f30bf11587e2ccf791fe27f376bbe.json",
          "artifact_digest": "sha256:5e70e30051e9ba4222d3d10ed8157e7a220fe9d7fab6ede2370ad9446fa2c8a9",
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                      "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000050.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                },
                "subject_path": {
                  "$path": "claims/10/CLM-101f30bf11587e2ccf791fe27f376bbe.json"
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
                "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
                  "citation_id": "sha256:76a365462a6c72c63930d2f89041ae398ce48e21507243fa9fd6934b01f88171",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:45.436923Z",
                "subject_content_digest": "sha256:13699ace869426c32c89a507e9ad9efc5d48ce44bc914529cad299a294729965",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:99392beccbe48e832776138288f12215aca01bd71d0f1bab3490ed12da040b8a",
                      "end_byte": 3266,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/10/CLM-101f30bf11587e2ccf791fe27f376bbe.json",
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
              "adjudication_rule_digest": "sha256:450b0257a0cc6b60f30c12b66ecf4789ca6a5fb24f3c73ecfcaa5689df8894d1",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:5a1bdc6a602e81560b56446b974c1c6ee98e6fb8e9f934c98367381740dc4e92",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:45.436923Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
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
                  "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000050.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                  },
                  "sequence": 50
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000050.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
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
                "$digest": "sha256:5e70e30051e9ba4222d3d10ed8157e7a220fe9d7fab6ede2370ad9446fa2c8a9"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-101f30bf11587e2ccf791fe27f376bbe"
              },
              "input_digest": {
                "$digest": "sha256:b61cd74c22516d5d758f53a36fa0c1b21bdf73b5061a8191f9de7fe2ae7308de"
              },
              "statement_address": {
                "artifact_path": "claims/10/CLM-101f30bf11587e2ccf791fe27f376bbe.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:5a1bdc6a602e81560b56446b974c1c6ee98e6fb8e9f934c98367381740dc4e92"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:5b6106c0f59a53152e99656a955096a4f6edbf09c08f163d72a6490bfd1bb0a7",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.artifact.target_ref"
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
                  "artifact_digest": "sha256:13699ace869426c32c89a507e9ad9efc5d48ce44bc914529cad299a294729965",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz"
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
                "$digest": "sha256:5e70e30051e9ba4222d3d10ed8157e7a220fe9d7fab6ede2370ad9446fa2c8a9"
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
                        "$digest": "sha256:508eec793075fc9df838bed9d31c937a8086195eacb21b66170fbd24314c5e52"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "36764557ad52c5e5667470778618a8782604296c",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:540b7cebc37be28d2649da345d12780fcabb8af2b24eae5ebf7de6be24d50dc6"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f5898c321bfc1283a6be50d1926c0164d420a19b0dc120d82ad81ce9a577663e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000050.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:65100135ea60825236b3dcc1c8d23b0c7fe8048fb76979dfe70b3b768009c285"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:b61cd74c22516d5d758f53a36fa0c1b21bdf73b5061a8191f9de7fe2ae7308de"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c08f56de82e635d487d635a67f7093bdcc9aa50f617b68f23c032bcc7f10bde"
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
                  "content_digest": "sha256:99392beccbe48e832776138288f12215aca01bd71d0f1bab3490ed12da040b8a",
                  "end_byte": 3266,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/10/CLM-101f30bf11587e2ccf791fe27f376bbe.json",
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
                "name": "security.artifact.target_ref"
              },
              "claim_type_digest": "sha256:5b6106c0f59a53152e99656a955096a4f6edbf09c08f163d72a6490bfd1bb0a7",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "github_release/cruxible-ai/cruxible"
              },
              "predicate": "security.artifact.target_ref",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz.json",
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
            "citation_id": "sha256:76a365462a6c72c63930d2f89041ae398ce48e21507243fa9fd6934b01f88171",
            "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
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
            "artifact_path": "subjects/security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.artifact.target_ref",
          "object": {
            "kind": "literal",
            "value": "github_release/cruxible-ai/cruxible"
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
