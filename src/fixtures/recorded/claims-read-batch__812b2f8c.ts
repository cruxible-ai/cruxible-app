// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 5b48699e
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-e23f7cd216e8b6e96ff16a3a7daac160"
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
          "identity": "Claim:CLM-e23f7cd216e8b6e96ff16a3a7daac160",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/e2/CLM-e23f7cd216e8b6e96ff16a3a7daac160.json",
          "artifact_digest": "sha256:3659c267b96116cc60261f14cffc9649fd041bd9cd5a5fc45dc10829cd08222d",
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
                        "$digest": "sha256:ca5b8b6a92e110ff8b53e34544af8c0ee3c826fc624ea70a46f2f161258a87cf"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:436bc66ec0bff73d563fcddbcaad84b8b64afaf556a116c1b606318d48452a22"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000020.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
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
                        "$digest": "sha256:ca5b8b6a92e110ff8b53e34544af8c0ee3c826fc624ea70a46f2f161258a87cf"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:436bc66ec0bff73d563fcddbcaad84b8b64afaf556a116c1b606318d48452a22"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000020.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
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
                      "$digest": "sha256:ca5b8b6a92e110ff8b53e34544af8c0ee3c826fc624ea70a46f2f161258a87cf"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:436bc66ec0bff73d563fcddbcaad84b8b64afaf556a116c1b606318d48452a22"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000020.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                },
                "subject_path": {
                  "$path": "claims/e2/CLM-e23f7cd216e8b6e96ff16a3a7daac160.json"
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
                "sha256:0b14087acd5cdd2a0f238066d991e08f723bd82acf89463c8662c6bd5e7760d9",
                "sha256:3ab2f5faae20c624593f1b1103d419485ea0fa427ff816c63dd89d33cf6a928e"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:3ab2f5faae20c624593f1b1103d419485ea0fa427ff816c63dd89d33cf6a928e",
                  "citation_id": "sha256:313c0ce1e8baa3c1fa9e472e441a8aa991ecb6ffc5fecd72c1d3c522c660790b",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                },
                {
                  "capture_digest": "sha256:0b14087acd5cdd2a0f238066d991e08f723bd82acf89463c8662c6bd5e7760d9",
                  "citation_id": "sha256:d81207e9de06d42c8fa54fa961109433f12e3871ddde4f67b926360cde21bf28",
                  "origin": "independent",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T22:22:24.799862Z",
                "subject_content_digest": "sha256:d53588265525e1a86269df2dcaea5fbb3c7a6fd326db7205ad65cecd5c8bc703",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:3be6f3f2d2f97b4a2908e9c30c46acaaa3761c5ce01432434a2a39f8079ea113",
                      "end_byte": 199,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/e2/CLM-e23f7cd216e8b6e96ff16a3a7daac160.json",
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
              "adjudication_rule_digest": "sha256:9ae1a1ccc50d5b81ff3078ec24fb535e96f8c0226e2cb9503ff62f8d2d52168c",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:9904b345815e0b2b27490bcb82d6a8a01abafb74956d65c9f7e75b31b8616423",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "principal.owner"
                  ],
                  "evidence_digests": [
                    "sha256:3ab2f5faae20c624593f1b1103d419485ea0fa427ff816c63dd89d33cf6a928e"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-11-07T22:22:24.799862Z",
              "freshness_expirations": [],
              "provenance_grades": [
                "self-asserted"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:3ab2f5faae20c624593f1b1103d419485ea0fa427ff816c63dd89d33cf6a928e"
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
                  "sha256:3ab2f5faae20c624593f1b1103d419485ea0fa427ff816c63dd89d33cf6a928e"
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
                        "$digest": "sha256:ca5b8b6a92e110ff8b53e34544af8c0ee3c826fc624ea70a46f2f161258a87cf"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:436bc66ec0bff73d563fcddbcaad84b8b64afaf556a116c1b606318d48452a22"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000020.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
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
                        "$digest": "sha256:ca5b8b6a92e110ff8b53e34544af8c0ee3c826fc624ea70a46f2f161258a87cf"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:436bc66ec0bff73d563fcddbcaad84b8b64afaf556a116c1b606318d48452a22"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000020.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
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
                        "$digest": "sha256:ca5b8b6a92e110ff8b53e34544af8c0ee3c826fc624ea70a46f2f161258a87cf"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:436bc66ec0bff73d563fcddbcaad84b8b64afaf556a116c1b606318d48452a22"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000020.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000020.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
                  },
                  "sequence": 20
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:ca5b8b6a92e110ff8b53e34544af8c0ee3c826fc624ea70a46f2f161258a87cf"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:436bc66ec0bff73d563fcddbcaad84b8b64afaf556a116c1b606318d48452a22"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000020.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
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
                "$digest": "sha256:3659c267b96116cc60261f14cffc9649fd041bd9cd5a5fc45dc10829cd08222d"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-e23f7cd216e8b6e96ff16a3a7daac160"
              },
              "input_digest": {
                "$digest": "sha256:db09599c0b47bf7b31e117844721d5770238125845099b26e7c8a313e1dc6431"
              },
              "statement_address": {
                "artifact_path": "claims/e2/CLM-e23f7cd216e8b6e96ff16a3a7daac160.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:9904b345815e0b2b27490bcb82d6a8a01abafb74956d65c9f7e75b31b8616423"
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
                  "artifact_digest": "sha256:ef90e905b1759f5874c2831b00321d0a323e16388debfb2299df8ae21bb1c172",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "playbill.foreign-source.triage.notes"
                  }
                },
                {
                  "artifact_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.exposure.justification"
                  }
                },
                {
                  "artifact_digest": "sha256:d53588265525e1a86269df2dcaea5fbb3c7a6fd326db7205ad65cecd5c8bc703",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228"
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
                "$digest": "sha256:3659c267b96116cc60261f14cffc9649fd041bd9cd5a5fc45dc10829cd08222d"
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
                        "$digest": "sha256:ca5b8b6a92e110ff8b53e34544af8c0ee3c826fc624ea70a46f2f161258a87cf"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2419b8847316011dac1d910214218b9bb1926366",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:436bc66ec0bff73d563fcddbcaad84b8b64afaf556a116c1b606318d48452a22"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:8ab905c1570efcf8949ab2691f25d050e80fb02ad16fe8d3268030e2ab257ea0"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000020.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:25918c238aef81afc7c7a451a84e4b21d9587213bd87ac6a824a4ae6a27ae612"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:db09599c0b47bf7b31e117844721d5770238125845099b26e7c8a313e1dc6431"
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
                  "content_digest": "sha256:3be6f3f2d2f97b4a2908e9c30c46acaaa3761c5ce01432434a2a39f8079ea113",
                  "end_byte": 199,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/e2/CLM-e23f7cd216e8b6e96ff16a3a7daac160.json",
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
                "name": "security.exposure.justification"
              },
              "claim_type_digest": "sha256:6c0b3ab0e370c8f0c8efa5e6c3bb1630c456cd0293726392033844deda6848c5",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "vulnerable_code_not_present"
              },
              "predicate": "security.exposure.justification",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228.json",
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
            "citation_id": "sha256:313c0ce1e8baa3c1fa9e472e441a8aa991ecb6ffc5fecd72c1d3c522c660790b",
            "capture_digest": "sha256:3ab2f5faae20c624593f1b1103d419485ea0fa427ff816c63dd89d33cf6a928e",
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
          },
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:d81207e9de06d42c8fa54fa961109433f12e3871ddde4f67b926360cde21bf28",
            "capture_digest": "sha256:0b14087acd5cdd2a0f238066d991e08f723bd82acf89463c8662c6bd5e7760d9",
            "citation_role": "copy",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:playbill.foreign-source.triage.notes",
            "capture_contract_digest": "sha256:ef90e905b1759f5874c2831b00321d0a323e16388debfb2299df8ae21bb1c172",
            "status": "not_evidence",
            "decision": null
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.exposure/pkg-maven-org.apache.logging.log4j-log4j-core-2.14.1--cve-2021-44228.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.exposure.justification",
          "object": {
            "kind": "literal",
            "value": "vulnerable_code_not_present"
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
