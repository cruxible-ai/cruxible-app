// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 11c2518b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-2305c382d9122e1cd851a2b4d377a1d6",
      "CLM-ed9a04bee32a5d93af355e3646dc68bf"
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
          "identity": "Claim:CLM-2305c382d9122e1cd851a2b4d377a1d6",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/23/CLM-2305c382d9122e1cd851a2b4d377a1d6.json",
          "artifact_digest": "sha256:ba04e79e5506d5d094a36a58304e1f96be7d658889474b39de7e9d59f9172a34",
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                      "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000042.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                },
                "subject_path": {
                  "$path": "claims/23/CLM-2305c382d9122e1cd851a2b4d377a1d6.json"
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
                "sha256:0ed0f0cd358bdc24f56ac937c0479cf17a79af6b374f184d05cf9b7d29dc5707"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:0ed0f0cd358bdc24f56ac937c0479cf17a79af6b374f184d05cf9b7d29dc5707",
                  "citation_id": "sha256:9ef13682b9e4761ca182c3aaea76cb8a21fad6211427b75c56b35f648a2ee390",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:43:44.788859Z",
                "subject_content_digest": "sha256:a5630f1683d8dee72385f33ac6b155eee7be8e4f144df985a9a9c4274e20a085",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:6179d617865e9ffd848bcd38c4ba071830c335e3d2c27f105cf9c4e30e0b316a",
                      "end_byte": 22,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/23/CLM-2305c382d9122e1cd851a2b4d377a1d6.json",
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
              "adjudication_rule_digest": "sha256:da81abea799d047128b51ea8aed75d132ae2b7210fc91e0899018f95dc4f9bd7",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:80afcf834dd079d80e7da8fa1c6a639d7056112331bfa5ec67ee3614c7daa859",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "principal.gate-owner"
                  ],
                  "evidence_digests": [
                    "sha256:0ed0f0cd358bdc24f56ac937c0479cf17a79af6b374f184d05cf9b7d29dc5707"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:43:44.788859Z",
              "provenance_grades": [
                "self-asserted"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:0ed0f0cd358bdc24f56ac937c0479cf17a79af6b374f184d05cf9b7d29dc5707"
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
                  "sha256:0ed0f0cd358bdc24f56ac937c0479cf17a79af6b374f184d05cf9b7d29dc5707"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000042.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
                  },
                  "sequence": 42
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000042.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                "$digest": "sha256:ba04e79e5506d5d094a36a58304e1f96be7d658889474b39de7e9d59f9172a34"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-2305c382d9122e1cd851a2b4d377a1d6"
              },
              "input_digest": {
                "$digest": "sha256:8babdf5f165c221dc39c90ea553eea3ebb0ebf1d8474ace11628f5fa7b8891bb"
              },
              "statement_address": {
                "artifact_path": "claims/23/CLM-2305c382d9122e1cd851a2b4d377a1d6.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:80afcf834dd079d80e7da8fa1c6a639d7056112331bfa5ec67ee3614c7daa859"
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
                  "artifact_digest": "sha256:ab6e6a1d57c92944d5262423ea907d0e54837229a84dc677e3a3cac10d2bc8c4",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:f001db1be300047b8c216d36510db92f910ebb3a11d874341ce660e2a89645bf",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.repo.forge_host"
                  }
                },
                {
                  "artifact_digest": "sha256:a5630f1683d8dee72385f33ac6b155eee7be8e4f144df985a9a9c4274e20a085",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.repo/github.com--cruxible-ai-cruxible"
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
                "$digest": "sha256:ba04e79e5506d5d094a36a58304e1f96be7d658889474b39de7e9d59f9172a34"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:8babdf5f165c221dc39c90ea553eea3ebb0ebf1d8474ace11628f5fa7b8891bb"
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
                  "content_digest": "sha256:6179d617865e9ffd848bcd38c4ba071830c335e3d2c27f105cf9c4e30e0b316a",
                  "end_byte": 22,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/23/CLM-2305c382d9122e1cd851a2b4d377a1d6.json",
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
                "name": "security.repo.forge_host"
              },
              "claim_type_digest": "sha256:f001db1be300047b8c216d36510db92f910ebb3a11d874341ce660e2a89645bf",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "github.com"
              },
              "predicate": "security.repo.forge_host",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.repo/github.com--cruxible-ai-cruxible.json",
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
            "citation_id": "sha256:9ef13682b9e4761ca182c3aaea76cb8a21fad6211427b75c56b35f648a2ee390",
            "capture_digest": "sha256:0ed0f0cd358bdc24f56ac937c0479cf17a79af6b374f184d05cf9b7d29dc5707",
            "citation_role": "copy",
            "citation_origin": "self_source",
            "capture_contract_identity": "CaptureContract:playbill.coordinator-self-source-v1",
            "capture_contract_digest": "sha256:ab6e6a1d57c92944d5262423ea907d0e54837229a84dc677e3a3cac10d2bc8c4",
            "status": "not_evidence",
            "decisions": []
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.repo/github.com--cruxible-ai-cruxible.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.repo.forge_host",
          "object": {
            "kind": "literal",
            "value": "github.com"
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
          "identity": "Claim:CLM-ed9a04bee32a5d93af355e3646dc68bf",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/ed/CLM-ed9a04bee32a5d93af355e3646dc68bf.json",
          "artifact_digest": "sha256:d2f354e86b90cc42e38b0fb01b7595b1244783a88acb40fe10236ac0407f8e29",
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                      "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000042.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                },
                "subject_path": {
                  "$path": "claims/ed/CLM-ed9a04bee32a5d93af355e3646dc68bf.json"
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
                "sha256:348481f1b8ba1435069aa8fd82ca159350641d370737b031110dcbbf5ec8d4d0"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:348481f1b8ba1435069aa8fd82ca159350641d370737b031110dcbbf5ec8d4d0",
                  "citation_id": "sha256:81d3eaf0e1fb331115844d0cec17c6f6f4aaf391ff07830d65c8975063980e96",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:43:44.788859Z",
                "subject_content_digest": "sha256:a5630f1683d8dee72385f33ac6b155eee7be8e4f144df985a9a9c4274e20a085",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:6179d617865e9ffd848bcd38c4ba071830c335e3d2c27f105cf9c4e30e0b316a",
                      "end_byte": 22,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/ed/CLM-ed9a04bee32a5d93af355e3646dc68bf.json",
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
              "adjudication_rule_digest": "sha256:4ff0376b2b737b6187264b2939eb5a643619bff83af901ded635d4c9bcee2545",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:1399176919620a34b9f0d3f37f800df8c5d2efbe15ee81b20e3914067f857f2d",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "principal.gate-owner"
                  ],
                  "evidence_digests": [
                    "sha256:348481f1b8ba1435069aa8fd82ca159350641d370737b031110dcbbf5ec8d4d0"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:43:44.788859Z",
              "provenance_grades": [
                "self-asserted"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:348481f1b8ba1435069aa8fd82ca159350641d370737b031110dcbbf5ec8d4d0"
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
                  "sha256:348481f1b8ba1435069aa8fd82ca159350641d370737b031110dcbbf5ec8d4d0"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000042.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
                  },
                  "sequence": 42
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000042.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
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
                "$digest": "sha256:d2f354e86b90cc42e38b0fb01b7595b1244783a88acb40fe10236ac0407f8e29"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-ed9a04bee32a5d93af355e3646dc68bf"
              },
              "input_digest": {
                "$digest": "sha256:eb6a2dde6c519d2078a5ad954072cad6a99ff7ba48562bfc40e9d394076ef147"
              },
              "statement_address": {
                "artifact_path": "claims/ed/CLM-ed9a04bee32a5d93af355e3646dc68bf.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:1399176919620a34b9f0d3f37f800df8c5d2efbe15ee81b20e3914067f857f2d"
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
                  "artifact_digest": "sha256:ab6e6a1d57c92944d5262423ea907d0e54837229a84dc677e3a3cac10d2bc8c4",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.repo.full_name"
                  }
                },
                {
                  "artifact_digest": "sha256:a5630f1683d8dee72385f33ac6b155eee7be8e4f144df985a9a9c4274e20a085",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.repo/github.com--cruxible-ai-cruxible"
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
                "$digest": "sha256:d2f354e86b90cc42e38b0fb01b7595b1244783a88acb40fe10236ac0407f8e29"
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
                        "$digest": "sha256:bb3054571cbb4dbfe28d938b92a592c4f6060c5f1747cc24d8022919c25fc425"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2dcd31013e4c75cb9ffccd705aaba0400b72c13e",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:84e1e088203a0de57cc7be4eb32c8f6ac3f44d1996fcb8d88a3fae211fa0995f"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:ae1553a67dcfb52a000b73dc45646167bc9e11f2b6f61ecafb919752d0067a8e"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000042.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:01e72b6604f2dc22f248ae2822b295b08ea28fee570bc6a2a6f0b4df29899321"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:eb6a2dde6c519d2078a5ad954072cad6a99ff7ba48562bfc40e9d394076ef147"
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
                  "content_digest": "sha256:6179d617865e9ffd848bcd38c4ba071830c335e3d2c27f105cf9c4e30e0b316a",
                  "end_byte": 22,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/ed/CLM-ed9a04bee32a5d93af355e3646dc68bf.json",
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
                "name": "security.repo.full_name"
              },
              "claim_type_digest": "sha256:de2369769823e07700c961d7ffe1174c2a12b37d1ffde5f7ccc0eb4b3a04cac2",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "cruxible-ai/cruxible"
              },
              "predicate": "security.repo.full_name",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.repo/github.com--cruxible-ai-cruxible.json",
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
            "citation_id": "sha256:81d3eaf0e1fb331115844d0cec17c6f6f4aaf391ff07830d65c8975063980e96",
            "capture_digest": "sha256:348481f1b8ba1435069aa8fd82ca159350641d370737b031110dcbbf5ec8d4d0",
            "citation_role": "copy",
            "citation_origin": "self_source",
            "capture_contract_identity": "CaptureContract:playbill.coordinator-self-source-v1",
            "capture_contract_digest": "sha256:ab6e6a1d57c92944d5262423ea907d0e54837229a84dc677e3a3cac10d2bc8c4",
            "status": "not_evidence",
            "decisions": []
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.repo/github.com--cruxible-ai-cruxible.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.repo.full_name",
          "object": {
            "kind": "literal",
            "value": "cruxible-ai/cruxible"
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
