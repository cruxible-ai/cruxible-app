// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 18e945ea
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-44ef6ae26ec37a36ef086b3cd329b469"
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
          "identity": "Claim:CLM-44ef6ae26ec37a36ef086b3cd329b469",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/44/CLM-44ef6ae26ec37a36ef086b3cd329b469.json",
          "artifact_digest": "sha256:e4f09e32c56b94be747888466a9763a866163eee08bb9826c3672b74333977f4",
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
                        "$digest": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000017.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
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
                        "$digest": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000017.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
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
                      "$digest": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000017.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                },
                "subject_path": {
                  "$path": "claims/44/CLM-44ef6ae26ec37a36ef086b3cd329b469.json"
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
                "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                  "citation_id": "sha256:6b32770460bafd867cb15027d95731c227cef2811d0e4513d99833776e809647",
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
                "subject_content_digest": "sha256:16cf8602ccd3afed7b3668b2cdac34a07ac09bb84de11119569a8bbed55e1837",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4749bb075129c9fbbe322d18f5232e88fa5dbc5c23594820a795faefb257bbaa",
                      "end_byte": 1550,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/44/CLM-44ef6ae26ec37a36ef086b3cd329b469.json",
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
              "adjudication_rule_digest": "sha256:969d5597c23e8054a008b73c0a687af9bc03c6e625138e5ab2764c4d98463106",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:42d5e98948228336191a941d8af744e5f297dd1c6a0a58c95e44ff80cb1c665c",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "security-osv-provider"
                  ],
                  "evidence_digests": [
                    "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
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
                "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
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
                  "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217"
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
                        "$digest": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000017.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
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
                        "$digest": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000017.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
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
                        "$digest": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000017.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000017.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
                  },
                  "sequence": 17
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000017.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
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
                "$digest": "sha256:e4f09e32c56b94be747888466a9763a866163eee08bb9826c3672b74333977f4"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-44ef6ae26ec37a36ef086b3cd329b469"
              },
              "input_digest": {
                "$digest": "sha256:db65c1f4d646c8ad4a97c48f5db03aa370393a40f9b292f7b3f234876673e348"
              },
              "statement_address": {
                "artifact_path": "claims/44/CLM-44ef6ae26ec37a36ef086b3cd329b469.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:42d5e98948228336191a941d8af744e5f297dd1c6a0a58c95e44ff80cb1c665c"
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
                  "artifact_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.osv-matches"
                  }
                },
                {
                  "artifact_digest": "sha256:3c8bff4bf143e6c9716bf77437a81b553f2b78945b5632a1c4ec5d0f02113277",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.cve_id"
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
                  "artifact_digest": "sha256:16cf8602ccd3afed7b3668b2cdac34a07ac09bb84de11119569a8bbed55e1837",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2026-49844"
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
                "$digest": "sha256:e4f09e32c56b94be747888466a9763a866163eee08bb9826c3672b74333977f4"
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
                        "$digest": "sha256:2901b91a4403fc11603526e955e6a2e244e4ed98be41569492da6687824b6299"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "395f0a9e96f00bb3d4234f978d8df6b76b8067f1",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:13472489f18a94e45a0037e274323558b09a215f2e570a273c78faba7a257c0b"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:abd2f14219e48d7a7a730f93e40007f88d4a21aec401ef31f1fdf67d87054d4f"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000017.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:d74ed5e2a37bf1694ce487afddfbe300307ebf765d7fb31ebbec1ec3f3ef6e10"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:db65c1f4d646c8ad4a97c48f5db03aa370393a40f9b292f7b3f234876673e348"
              },
              "source_compilation_digest": {
                "$digest": "sha256:5a547be0a63f09673a27f9e9cfd615e4c9a6c130e830e378621222c357684e44"
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
                  "content_digest": "sha256:4749bb075129c9fbbe322d18f5232e88fa5dbc5c23594820a795faefb257bbaa",
                  "end_byte": 1550,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/44/CLM-44ef6ae26ec37a36ef086b3cd329b469.json",
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
              "claim_type_digest": "sha256:3c8bff4bf143e6c9716bf77437a81b553f2b78945b5632a1c4ec5d0f02113277",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "CVE-2026-49844"
              },
              "predicate": "security.vulnerability.cve_id",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2026-49844.json",
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
            "citation_id": "sha256:6b32770460bafd867cb15027d95731c227cef2811d0e4513d99833776e809647",
            "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.osv-matches",
            "capture_contract_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
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
            "artifact_path": "subjects/security.vulnerability/cve-2026-49844.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.cve_id",
          "object": {
            "kind": "literal",
            "value": "CVE-2026-49844"
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
