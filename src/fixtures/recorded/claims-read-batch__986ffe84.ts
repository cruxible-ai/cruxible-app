// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 638fd94b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-082b9629ce4f8617014132248bf464c2"
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
          "identity": "Claim:CLM-082b9629ce4f8617014132248bf464c2",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/08/CLM-082b9629ce4f8617014132248bf464c2.json",
          "artifact_digest": "sha256:f52f5f7125368159e691536247470248944108f728fadcc48cdd5224b32385ad",
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
                  "$path": "claims/08/CLM-082b9629ce4f8617014132248bf464c2.json"
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
                  "citation_id": "sha256:1211869cdc5c1aa08970f2c59154b64fbbbdfc923eb608ab5ebe7192aaa5890d",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:a10f9e25ee884f3f9f07e739b7c882ec702fc3779781ca51fe37cf5b1968f3b2",
                "template": 0,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87",
                  "extract_spec_digest": "sha256:2ad39af914b9c9c1ffed9e1fa117294144f374bbc6586a7ae91f58f8a13550ea",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/components/0/scope",
                  "record_key": {
                    "purl": "pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1"
                  },
                  "record_locator": "/components/0",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:e1a055da3eeff34ad675a5e655689cefcf59a03795ea9bca688df65f17928b9c",
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
                    "artifact_path": "claims/08/CLM-082b9629ce4f8617014132248bf464c2.json",
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
              "adjudication_rule_digest": "sha256:b3e337296968b75f1cd614ef941fbcd6c5eae4ba05dceeb634312078302a6827",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:6d2507cca735ea2aa98adbda8692523775a2c5c0bd707709434c891f99898e75",
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
                "direct"
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
                "$digest": "sha256:f52f5f7125368159e691536247470248944108f728fadcc48cdd5224b32385ad"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-082b9629ce4f8617014132248bf464c2"
              },
              "input_digest": {
                "$digest": "sha256:047fa8fb16971d2d8bcf6ce3defc6697b94b35c986aa4607b44d8afce88a4c47"
              },
              "statement_address": {
                "artifact_path": "claims/08/CLM-082b9629ce4f8617014132248bf464c2.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:6d2507cca735ea2aa98adbda8692523775a2c5c0bd707709434c891f99898e75"
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
                  "artifact_digest": "sha256:5bce85117e09dbe805f7fa6d0939acdb687d5799da92ccf067a20da11d7d2216",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.occurrence.scope"
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
                  "artifact_digest": "sha256:e1a055da3eeff34ad675a5e655689cefcf59a03795ea9bca688df65f17928b9c",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1"
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
                "$digest": "sha256:f52f5f7125368159e691536247470248944108f728fadcc48cdd5224b32385ad"
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
                "$digest": "sha256:047fa8fb16971d2d8bcf6ce3defc6697b94b35c986aa4607b44d8afce88a4c47"
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
                "artifact_path": "claims/08/CLM-082b9629ce4f8617014132248bf464c2.json",
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
                "name": "security.occurrence.scope"
              },
              "claim_type_digest": "sha256:5bce85117e09dbe805f7fa6d0939acdb687d5799da92ccf067a20da11d7d2216",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "required"
              },
              "predicate": "security.occurrence.scope",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
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
            "citation_id": "sha256:1211869cdc5c1aa08970f2c59154b64fbbbdfc923eb608ab5ebe7192aaa5890d",
            "capture_digest": "sha256:64fd45150feaca5f3f9fd4d0c3e53a6a284cf6391f0478f70348f58d76d1dd87",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.sbom-components",
            "capture_contract_digest": "sha256:ecd1944bc2c13ded50645ccd6ea57abf31ed6614beebecc7c6fd47ccbab7789c",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "sbom",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "sbom"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.occurrence/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.occurrence.scope",
          "object": {
            "kind": "literal",
            "value": "required"
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
