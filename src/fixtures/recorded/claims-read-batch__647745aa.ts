// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 87748bb8
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-3da109f05a7fad21f8831270af0299db",
      "CLM-453b457d0b9ce1afd675c2f914ed8a69"
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
          "identity": "Claim:CLM-3da109f05a7fad21f8831270af0299db",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/3d/CLM-3da109f05a7fad21f8831270af0299db.json",
          "artifact_digest": "sha256:598b23d1f82b5e9b69a8d1cde3485eef0ed81d33ccbcbb931878fc5b8cc50b16",
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
                        "$digest": "sha256:3af06fd9c12c3c0869e17c52c36a5a8bc223d5ce8f19dbe3a6c9a0bdda3787d9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:4ab622e82e2bfb6718a9ea1861fe0bc41e8fa4b711dbcbe3c4b7e41a3f0e1985"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
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
                        "$digest": "sha256:3af06fd9c12c3c0869e17c52c36a5a8bc223d5ce8f19dbe3a6c9a0bdda3787d9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:4ab622e82e2bfb6718a9ea1861fe0bc41e8fa4b711dbcbe3c4b7e41a3f0e1985"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
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
                      "$digest": "sha256:3af06fd9c12c3c0869e17c52c36a5a8bc223d5ce8f19dbe3a6c9a0bdda3787d9"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:4ab622e82e2bfb6718a9ea1861fe0bc41e8fa4b711dbcbe3c4b7e41a3f0e1985"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                },
                "subject_path": {
                  "$path": "claims/3d/CLM-3da109f05a7fad21f8831270af0299db.json"
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
                "sha256:8d9201de171f085e3f60f069c45f43001acab63d0d9aa5dc8c2c0faee69c12f3"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:8d9201de171f085e3f60f069c45f43001acab63d0d9aa5dc8c2c0faee69c12f3",
                  "citation_id": "sha256:bc801d380044cc0d8f001cf3d3ef72e532434de7f4bc685bdb0dc155a4dad910",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T22:22:25.229631Z",
                "subject_content_digest": "sha256:9ff22e65d44392d4aec93f7300f0dfc52e44085372615534fd0dc3de11dfef36",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:70e4c3fc94ccb2ca99fdfd9e62518f41e982248bfeac2d6a938c3e330f065e10",
                      "end_byte": 68,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/3d/CLM-3da109f05a7fad21f8831270af0299db.json",
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
              "adjudication_rule_digest": "sha256:1affa7b0567ef9cab1ec2ddb6792f12f96d490b50354ad389cbcc16ad5fd3977",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:6421d2ff81d96aab192dad967e5bd1f8ef3dbae122f7a9cbd00c712cbccd31b7",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "principal.owner"
                  ],
                  "evidence_digests": [
                    "sha256:8d9201de171f085e3f60f069c45f43001acab63d0d9aa5dc8c2c0faee69c12f3"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-11-07T22:22:25.229631Z",
              "freshness_expirations": [],
              "provenance_grades": [
                "self-asserted"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:8d9201de171f085e3f60f069c45f43001acab63d0d9aa5dc8c2c0faee69c12f3"
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
                  "sha256:8d9201de171f085e3f60f069c45f43001acab63d0d9aa5dc8c2c0faee69c12f3"
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
                        "$digest": "sha256:3af06fd9c12c3c0869e17c52c36a5a8bc223d5ce8f19dbe3a6c9a0bdda3787d9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:4ab622e82e2bfb6718a9ea1861fe0bc41e8fa4b711dbcbe3c4b7e41a3f0e1985"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
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
                        "$digest": "sha256:3af06fd9c12c3c0869e17c52c36a5a8bc223d5ce8f19dbe3a6c9a0bdda3787d9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:4ab622e82e2bfb6718a9ea1861fe0bc41e8fa4b711dbcbe3c4b7e41a3f0e1985"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
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
                        "$digest": "sha256:3af06fd9c12c3c0869e17c52c36a5a8bc223d5ce8f19dbe3a6c9a0bdda3787d9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:4ab622e82e2bfb6718a9ea1861fe0bc41e8fa4b711dbcbe3c4b7e41a3f0e1985"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000021.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
                  },
                  "sequence": 21
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:3af06fd9c12c3c0869e17c52c36a5a8bc223d5ce8f19dbe3a6c9a0bdda3787d9"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:4ab622e82e2bfb6718a9ea1861fe0bc41e8fa4b711dbcbe3c4b7e41a3f0e1985"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000021.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
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
                "$digest": "sha256:598b23d1f82b5e9b69a8d1cde3485eef0ed81d33ccbcbb931878fc5b8cc50b16"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-3da109f05a7fad21f8831270af0299db"
              },
              "input_digest": {
                "$digest": "sha256:91d56834f04b53cb6930a3eebae24e81fa0bf4717b8f2ea77c42cf5e0033c960"
              },
              "statement_address": {
                "artifact_path": "claims/3d/CLM-3da109f05a7fad21f8831270af0299db.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:6421d2ff81d96aab192dad967e5bd1f8ef3dbae122f7a9cbd00c712cbccd31b7"
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
                  "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:1987de88492aab71a3672027b1e069cee4f8ba466ec1a94c2df2ffd27cde9e00",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.app_exposure.justification"
                  }
                },
                {
                  "artifact_digest": "sha256:9ff22e65d44392d4aec93f7300f0dfc52e44085372615534fd0dc3de11dfef36",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046"
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
                "$digest": "sha256:598b23d1f82b5e9b69a8d1cde3485eef0ed81d33ccbcbb931878fc5b8cc50b16"
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
                        "$digest": "sha256:3af06fd9c12c3c0869e17c52c36a5a8bc223d5ce8f19dbe3a6c9a0bdda3787d9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "9403bd46ead4110c9a77632bedbb44168f1947eb",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:4ab622e82e2bfb6718a9ea1861fe0bc41e8fa4b711dbcbe3c4b7e41a3f0e1985"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:e6b9eb9969d4d0cf592327e9d6955fcba53caa9a6b74fd1869e7f2b1ca520089"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000021.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:90ed194ac7316b370725627c7000f11485bfc7af955d6c2c244b53d3c2bca1f8"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:91d56834f04b53cb6930a3eebae24e81fa0bf4717b8f2ea77c42cf5e0033c960"
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
                  "content_digest": "sha256:70e4c3fc94ccb2ca99fdfd9e62518f41e982248bfeac2d6a938c3e330f065e10",
                  "end_byte": 68,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/3d/CLM-3da109f05a7fad21f8831270af0299db.json",
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
                "name": "security.app_exposure.justification"
              },
              "claim_type_digest": "sha256:1987de88492aab71a3672027b1e069cee4f8ba466ec1a94c2df2ffd27cde9e00",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "vulnerable_code_not_in_execute_path"
              },
              "predicate": "security.app_exposure.justification",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046.json",
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
            "citation_id": "sha256:bc801d380044cc0d8f001cf3d3ef72e532434de7f4bc685bdb0dc155a4dad910",
            "capture_digest": "sha256:8d9201de171f085e3f60f069c45f43001acab63d0d9aa5dc8c2c0faee69c12f3",
            "citation_role": "copy",
            "citation_origin": "self_source",
            "capture_contract_identity": "CaptureContract:playbill.coordinator-self-source-v1",
            "capture_contract_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "self",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "self"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.app_exposure.justification",
          "object": {
            "kind": "literal",
            "value": "vulnerable_code_not_in_execute_path"
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-453b457d0b9ce1afd675c2f914ed8a69",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/45/CLM-453b457d0b9ce1afd675c2f914ed8a69.json",
          "artifact_digest": "sha256:d29a524536c39e4f43cfdeedf2af5ef1dff69da077bc54341335ce519c1c6be6",
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
                        "$digest": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000022.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
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
                        "$digest": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000022.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
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
                      "$digest": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000022.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                },
                "subject_path": {
                  "$path": "claims/45/CLM-453b457d0b9ce1afd675c2f914ed8a69.json"
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
                "sha256:7ec0c6bd59318ca681d72b422a9758816936514777188a9f39d1108d8b672de2"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:7ec0c6bd59318ca681d72b422a9758816936514777188a9f39d1108d8b672de2",
                  "citation_id": "sha256:67d6ae687ee640af9209d7aee0aef22d69b85132c838a0b357c62ebd91294195",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T22:22:25.432116Z",
                "subject_content_digest": "sha256:9ff22e65d44392d4aec93f7300f0dfc52e44085372615534fd0dc3de11dfef36",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:05405bcf96c3a3cc79bbb68cbe7e467b88bf787d95558ea4a5f21d39e1a324c5",
                      "end_byte": 57,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/45/CLM-453b457d0b9ce1afd675c2f914ed8a69.json",
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
              "adjudication_rule_digest": "sha256:1affa7b0567ef9cab1ec2ddb6792f12f96d490b50354ad389cbcc16ad5fd3977",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:f5a118ecbfcd6bc55c94e530f4c6c4971823db282612dd5da8e91449eb4029bf",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "principal.reviewer"
                  ],
                  "evidence_digests": [
                    "sha256:7ec0c6bd59318ca681d72b422a9758816936514777188a9f39d1108d8b672de2"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-11-07T22:22:25.432116Z",
              "freshness_expirations": [],
              "provenance_grades": [
                "self-asserted"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:7ec0c6bd59318ca681d72b422a9758816936514777188a9f39d1108d8b672de2"
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
                  "sha256:7ec0c6bd59318ca681d72b422a9758816936514777188a9f39d1108d8b672de2"
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
                        "$digest": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000022.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
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
                        "$digest": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000022.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
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
                        "$digest": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000022.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000022.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
                  },
                  "sequence": 22
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000022.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
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
                "$digest": "sha256:d29a524536c39e4f43cfdeedf2af5ef1dff69da077bc54341335ce519c1c6be6"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-453b457d0b9ce1afd675c2f914ed8a69"
              },
              "input_digest": {
                "$digest": "sha256:a7b12e5377c92e3199965e57c24402f1df2692ead16de2d403754e863524c689"
              },
              "statement_address": {
                "artifact_path": "claims/45/CLM-453b457d0b9ce1afd675c2f914ed8a69.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:f5a118ecbfcd6bc55c94e530f4c6c4971823db282612dd5da8e91449eb4029bf"
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
                  "artifact_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.coordinator-self-source-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:1987de88492aab71a3672027b1e069cee4f8ba466ec1a94c2df2ffd27cde9e00",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.app_exposure.justification"
                  }
                },
                {
                  "artifact_digest": "sha256:9ff22e65d44392d4aec93f7300f0dfc52e44085372615534fd0dc3de11dfef36",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046"
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
              "actor_id": "reviewer",
              "artifact_digest": {
                "$digest": "sha256:d29a524536c39e4f43cfdeedf2af5ef1dff69da077bc54341335ce519c1c6be6"
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
                        "$digest": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:7413538dcec310dd3a4dce3f1fee9ce59ca51027aaa73a391dec99a79b99ede0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000022.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d141764e7102b6f1ad4073e367f939fe507fe24e45c0b30867116ac186e6e1ea"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:a7b12e5377c92e3199965e57c24402f1df2692ead16de2d403754e863524c689"
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
                  "content_digest": "sha256:05405bcf96c3a3cc79bbb68cbe7e467b88bf787d95558ea4a5f21d39e1a324c5",
                  "end_byte": 57,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/45/CLM-453b457d0b9ce1afd675c2f914ed8a69.json",
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
                "name": "security.app_exposure.justification"
              },
              "claim_type_digest": "sha256:1987de88492aab71a3672027b1e069cee4f8ba466ec1a94c2df2ffd27cde9e00",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "inline_mitigations_already_exist"
              },
              "predicate": "security.app_exposure.justification",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046.json",
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
            "citation_id": "sha256:67d6ae687ee640af9209d7aee0aef22d69b85132c838a0b357c62ebd91294195",
            "capture_digest": "sha256:7ec0c6bd59318ca681d72b422a9758816936514777188a9f39d1108d8b672de2",
            "citation_role": "copy",
            "citation_origin": "self_source",
            "capture_contract_identity": "CaptureContract:playbill.coordinator-self-source-v1",
            "capture_contract_digest": "sha256:24934a988a47eb9f6bd485b637b436bafb903572f8e26ab5f36b3d8e80771e47",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "self",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "self"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.app_exposure.justification",
          "object": {
            "kind": "literal",
            "value": "inline_mitigations_already_exist"
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
