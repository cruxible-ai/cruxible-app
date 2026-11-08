// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 8283d64e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf"
    ],
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    }
  },
  "response": {
    "tag": "playbill-claim-read-batch-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "claims": [
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/08/CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf.json",
          "artifact_digest": "sha256:0b11714a44fc9efbb912ed19995fe3c49ad284b1ef9aef046dd5ad17c5726878",
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
                    "$digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7"
                  },
                  "law_identifier": "playbill.claim.v4",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                      },
                      "generation_root": {
                        "$digest": "sha256:8560bd4b414e8b54c134ca92b8131078c33e9c8b7fc2128bf67e1a4ca1fe1509"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:ed30e2c21de4b69889af2577ca954004b01b4cad48e2813cf68b3f58b06b5361"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000016.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                      },
                      "generation_root": {
                        "$digest": "sha256:8560bd4b414e8b54c134ca92b8131078c33e9c8b7fc2128bf67e1a4ca1fe1509"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:ed30e2c21de4b69889af2577ca954004b01b4cad48e2813cf68b3f58b06b5361"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000016.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
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
                      "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                    },
                    "generation_root": {
                      "$digest": "sha256:8560bd4b414e8b54c134ca92b8131078c33e9c8b7fc2128bf67e1a4ca1fe1509"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:ed30e2c21de4b69889af2577ca954004b01b4cad48e2813cf68b3f58b06b5361"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000016.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                },
                "subject_path": {
                  "$path": "claims/08/CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf.json"
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
                "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87",
                  "citation_id": "sha256:ce3da89ce7a71a22c519b35ec8e8d248dc42f357d6ebb07ae8ebb803c50e7cc6",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:5d117090f46bdc22f034cf4e198f370d8037e14e1f5e26fc187ef2169f27a579",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4b7b4ceef42f2e8f8b04b77525ea5ad1ac0073de67399f4143b18f9c9b2462bd",
                      "end_byte": 689,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/08/CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf.json",
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
              "adjudication_rule_digest": "sha256:a0eac7b0667560f6be162ed801282525509cd0a428dd3728aa0b6a47f2695a5b",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:b07cb93f74a9e9c8ec099f476ab138adb3bef4574a8afe97d16eed14b4eac5d7",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "security-osv-provider"
                  ],
                  "evidence_digests": [
                    "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "derived"
              ],
              "evaluation_time": "2026-11-07T18:00:00Z",
              "freshness_expirations": [],
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87"
              ],
              "tag": "cruxible-claim-verdict-v3",
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
                  "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87"
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
                    "$digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7"
                  },
                  "law_identifier": "playbill.claim.v4",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                      },
                      "generation_root": {
                        "$digest": "sha256:8560bd4b414e8b54c134ca92b8131078c33e9c8b7fc2128bf67e1a4ca1fe1509"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:ed30e2c21de4b69889af2577ca954004b01b4cad48e2813cf68b3f58b06b5361"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000016.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                      },
                      "generation_root": {
                        "$digest": "sha256:8560bd4b414e8b54c134ca92b8131078c33e9c8b7fc2128bf67e1a4ca1fe1509"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:ed30e2c21de4b69889af2577ca954004b01b4cad48e2813cf68b3f58b06b5361"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000016.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:690ecc226bcaf24f35c6f786b986c176359625dcd2b35b1a229edc7205afacf7"
              },
              "law_identifier": "playbill.claim.v4",
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
                        "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                      },
                      "generation_root": {
                        "$digest": "sha256:8560bd4b414e8b54c134ca92b8131078c33e9c8b7fc2128bf67e1a4ca1fe1509"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:ed30e2c21de4b69889af2577ca954004b01b4cad48e2813cf68b3f58b06b5361"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000016.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000016.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
                  },
                  "sequence": 16
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:8560bd4b414e8b54c134ca92b8131078c33e9c8b7fc2128bf67e1a4ca1fe1509"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:ed30e2c21de4b69889af2577ca954004b01b4cad48e2813cf68b3f58b06b5361"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000016.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
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
                "$digest": "sha256:0b11714a44fc9efbb912ed19995fe3c49ad284b1ef9aef046dd5ad17c5726878"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf"
              },
              "input_digest": {
                "$digest": "sha256:576614ec25dd6be6194d22653098ddca176e64b41dc074771f8aa0158440578b"
              },
              "statement_address": {
                "artifact_path": "claims/08/CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:b07cb93f74a9e9c8ec099f476ab138adb3bef4574a8afe97d16eed14b4eac5d7"
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
                  "artifact_digest": "sha256:ecd1944bc2c13ded50645ccd6ea57abf31ed6614beebecc7c6fd47ccbab7789c",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.sbom-components"
                  }
                },
                {
                  "artifact_digest": "sha256:d9bd62153196066c1aa978270c01df9532a696b1fef267793d907db73dc44e26",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.inventory.inventory_id"
                  }
                },
                {
                  "artifact_digest": "sha256:45084b75aed259e23245b697f6d57e2c69c671a608d72b6373f5631af2d42728",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-osv-provider/8f36b52a81e87cf0ec571a7a611651f1eda035fb29c55dd50f28c7fe0a9cfcec"
                  }
                },
                {
                  "artifact_digest": "sha256:5d117090f46bdc22f034cf4e198f370d8037e14e1f5e26fc187ef2169f27a579",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:0b11714a44fc9efbb912ed19995fe3c49ad284b1ef9aef046dd5ad17c5726878"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                      },
                      "generation_root": {
                        "$digest": "sha256:8560bd4b414e8b54c134ca92b8131078c33e9c8b7fc2128bf67e1a4ca1fe1509"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "278ed5bcdbdf45c9b0e6d940121c94e22ac85c4f",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:ed30e2c21de4b69889af2577ca954004b01b4cad48e2813cf68b3f58b06b5361"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:897eaba079ed3030de55e07ce3fae139ce05da2354e9f4cc90e18dc02247de20"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000016.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:1c69e497257499bfa7fb2da23ec9e9ff26f668c63ea89a6eabaa66d06f426322"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:576614ec25dd6be6194d22653098ddca176e64b41dc074771f8aa0158440578b"
              },
              "source_compilation_digest": {
                "$digest": "sha256:dfc2de13b885eaa034c45c725ad14056b94d71c62436b7a3d60d045ffdfa8d25"
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
                  "content_digest": "sha256:4b7b4ceef42f2e8f8b04b77525ea5ad1ac0073de67399f4143b18f9c9b2462bd",
                  "end_byte": 689,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/08/CLM-08f5ec3c3d0fc78fd866c0d7943fe8bf.json",
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
                "name": "security.inventory.inventory_id"
              },
              "claim_type_digest": "sha256:d9bd62153196066c1aa978270c01df9532a696b1fef267793d907db73dc44e26",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/com.example/log4j-demo-app@1.0.0"
              },
              "predicate": "security.inventory.inventory_id",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0.json",
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:ce3da89ce7a71a22c519b35ec8e8d248dc42f357d6ebb07ae8ebb803c50e7cc6",
            "capture_digest": "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.sbom-components",
            "capture_contract_digest": "sha256:ecd1944bc2c13ded50645ccd6ea57abf31ed6614beebecc7c6fd47ccbab7789c",
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
            "artifact_path": "subjects/security.inventory/pkg-maven-com.example-log4j-demo-app-1.0.0.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.inventory.inventory_id",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/com.example/log4j-demo-app@1.0.0"
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
