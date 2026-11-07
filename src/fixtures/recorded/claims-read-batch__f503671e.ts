// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 5c9bff43
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-9eff1367310e902cdc436efb18e64336",
      "CLM-1817b5bf41dbacad208487b99a2a275d",
      "CLM-df2e21236111d6da62b2da4022a65fdb",
      "CLM-c79e9d236b888bada73738d2f0dc0e1d",
      "CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
      "CLM-0c497ce6493bc6eea94579dbc0e294fa",
      "CLM-7d0e73b0e07c961fb1024d98d258f43a",
      "CLM-2383f94f7b8c2128e24ea365a8f1e736"
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
          "identity": "Claim:CLM-9eff1367310e902cdc436efb18e64336",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/9e/CLM-9eff1367310e902cdc436efb18e64336.json",
          "artifact_digest": "sha256:b6356f4ff68b3ccbb47ec430fecd7497e2ba1fc486020efeeed661d590888e05",
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
                  "$path": "claims/9e/CLM-9eff1367310e902cdc436efb18e64336.json"
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
                  "citation_id": "sha256:9e0a419badfa15356533d7934cb5c8ea58c3fb3a31c9979f0d9dfc4ee5e59a08",
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
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
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
                    "artifact_path": "claims/9e/CLM-9eff1367310e902cdc436efb18e64336.json",
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
              "claim_statement_digest": "sha256:9c0dc3c2e3b487c30d2f417080ce8e1a19c25f1f9eae69764078c82dba78d3c9",
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
                "$digest": "sha256:b6356f4ff68b3ccbb47ec430fecd7497e2ba1fc486020efeeed661d590888e05"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-9eff1367310e902cdc436efb18e64336"
              },
              "input_digest": {
                "$digest": "sha256:eded19d3adb7fe0b5a766cef05241a2977d2a5ce8de33b20a6047d8e0881acb4"
              },
              "statement_address": {
                "artifact_path": "claims/9e/CLM-9eff1367310e902cdc436efb18e64336.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:9c0dc3c2e3b487c30d2f417080ce8e1a19c25f1f9eae69764078c82dba78d3c9"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:b6356f4ff68b3ccbb47ec430fecd7497e2ba1fc486020efeeed661d590888e05"
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
                "$digest": "sha256:eded19d3adb7fe0b5a766cef05241a2977d2a5ce8de33b20a6047d8e0881acb4"
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
                "artifact_path": "claims/9e/CLM-9eff1367310e902cdc436efb18e64336.json",
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:9e0a419badfa15356533d7934cb5c8ea58c3fb3a31c9979f0d9dfc4ee5e59a08",
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-1817b5bf41dbacad208487b99a2a275d",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/18/CLM-1817b5bf41dbacad208487b99a2a275d.json",
          "artifact_digest": "sha256:906caf13d88761e319a9c589702c6829a80c749844768a2c903f87b45168bcea",
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                      "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000019.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                },
                "subject_path": {
                  "$path": "claims/18/CLM-1817b5bf41dbacad208487b99a2a275d.json"
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
                "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
                  "citation_id": "sha256:8c3a5548a3197d71022cd40de849c74617881df2520b416074674c49e207fdb2",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:c3fab91633d80ae933a1a2ba9f39e2952f59ae215cfe5bf7bfd0b8cbbc495166",
                "template": 1,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
                  "extract_spec_digest": "sha256:4cc982fc7f714491506c3ba7870e5d1710d8be75cade24de0a26eb2d3ddc0de4",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/data/5/percentile",
                  "record_key": {
                    "cve_id": "CVE-2021-44228"
                  },
                  "record_locator": "/data/5",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:2a5963ed2d1346d38226e6180002d16f886835b98f42284a21858b00f460e640",
                      "end_byte": 1036,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/18/CLM-1817b5bf41dbacad208487b99a2a275d.json",
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
              "adjudication_rule_digest": "sha256:e058b0448321a54c9de8540c88f87704e0650a798dd7d63e431d2efc986849ea",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:080bdcea956483ed906edc2266f07b41b47c2949a925c64c32f03829ef80f0ab",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-07T18:00:00Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
              ],
              "tag": "cruxible-claim-verdict-v3",
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
                  "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000019.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                  },
                  "sequence": 19
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000019.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                "$digest": "sha256:906caf13d88761e319a9c589702c6829a80c749844768a2c903f87b45168bcea"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-1817b5bf41dbacad208487b99a2a275d"
              },
              "input_digest": {
                "$digest": "sha256:4ec3cfd058c2c86cc19804a52b8a4b77797944f68b7e0be9a6cc35c0f5777da2"
              },
              "statement_address": {
                "artifact_path": "claims/18/CLM-1817b5bf41dbacad208487b99a2a275d.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:080bdcea956483ed906edc2266f07b41b47c2949a925c64c32f03829ef80f0ab"
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
                  "artifact_digest": "sha256:e8ba787a61c986ca4c53fda09578c61a18110138958218b65e65e350bdd0f070",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.epss-scores"
                  }
                },
                {
                  "artifact_digest": "sha256:c7c91826673d95a34ddefa68641bd4d1b78fcd55368edb167cca165c6ac558e3",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.epss_percentile"
                  }
                },
                {
                  "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:906caf13d88761e319a9c589702c6829a80c749844768a2c903f87b45168bcea"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:4ec3cfd058c2c86cc19804a52b8a4b77797944f68b7e0be9a6cc35c0f5777da2"
              },
              "source_compilation_digest": {
                "$digest": "sha256:17102224089485e50a7fc15d6f80466051dba14755ddd9af395220ecc88925e4"
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
                  "content_digest": "sha256:2a5963ed2d1346d38226e6180002d16f886835b98f42284a21858b00f460e640",
                  "end_byte": 1036,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/18/CLM-1817b5bf41dbacad208487b99a2a275d.json",
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
                "name": "security.vulnerability.epss_percentile"
              },
              "claim_type_digest": "sha256:c7c91826673d95a34ddefa68641bd4d1b78fcd55368edb167cca165c6ac558e3",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "1"
              },
              "predicate": "security.vulnerability.epss_percentile",
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:8c3a5548a3197d71022cd40de849c74617881df2520b416074674c49e207fdb2",
            "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.epss-scores",
            "capture_contract_digest": "sha256:e8ba787a61c986ca4c53fda09578c61a18110138958218b65e65e350bdd0f070",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "epss-api",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "epss-api"
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
          "predicate": "security.vulnerability.epss_percentile",
          "object": {
            "kind": "literal",
            "value": "1"
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-df2e21236111d6da62b2da4022a65fdb",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/df/CLM-df2e21236111d6da62b2da4022a65fdb.json",
          "artifact_digest": "sha256:89d8e95893a8699a090efe1af0a39e9bac5facb61e41ce4574aa1f1121a91e70",
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                      "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000019.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                },
                "subject_path": {
                  "$path": "claims/df/CLM-df2e21236111d6da62b2da4022a65fdb.json"
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
                "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
                  "citation_id": "sha256:4c1c83ed826fc3933fb0807677a06e4997193f2d3941c1438e37affe48164afa",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:c3fab91633d80ae933a1a2ba9f39e2952f59ae215cfe5bf7bfd0b8cbbc495166",
                "template": 0,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
                  "extract_spec_digest": "sha256:4cc982fc7f714491506c3ba7870e5d1710d8be75cade24de0a26eb2d3ddc0de4",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/data/5/epss",
                  "record_key": {
                    "cve_id": "CVE-2021-44228"
                  },
                  "record_locator": "/data/5",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:2a5963ed2d1346d38226e6180002d16f886835b98f42284a21858b00f460e640",
                      "end_byte": 1036,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/df/CLM-df2e21236111d6da62b2da4022a65fdb.json",
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
              "adjudication_rule_digest": "sha256:be415704da4a2c78fc97efc0d668e521afd61d489baf7af1b48b61b24483557b",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:623bb1a2cd64d1580864c80bd37c4059dbe099701f6a79af415856b7b3b984c6",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-07T18:00:00Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
              ],
              "tag": "cruxible-claim-verdict-v3",
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
                  "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000019.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                  },
                  "sequence": 19
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000019.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                "$digest": "sha256:89d8e95893a8699a090efe1af0a39e9bac5facb61e41ce4574aa1f1121a91e70"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-df2e21236111d6da62b2da4022a65fdb"
              },
              "input_digest": {
                "$digest": "sha256:9e0388794628cccf01bf4f2145ab6c997d69bfea63c761248b3af0f42edee597"
              },
              "statement_address": {
                "artifact_path": "claims/df/CLM-df2e21236111d6da62b2da4022a65fdb.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:623bb1a2cd64d1580864c80bd37c4059dbe099701f6a79af415856b7b3b984c6"
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
                  "artifact_digest": "sha256:e8ba787a61c986ca4c53fda09578c61a18110138958218b65e65e350bdd0f070",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.epss-scores"
                  }
                },
                {
                  "artifact_digest": "sha256:8d575546bf95dce83fe71f971c38885e77f2d3630e8798f694fd67dba8b15870",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.epss_score"
                  }
                },
                {
                  "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:89d8e95893a8699a090efe1af0a39e9bac5facb61e41ce4574aa1f1121a91e70"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:9e0388794628cccf01bf4f2145ab6c997d69bfea63c761248b3af0f42edee597"
              },
              "source_compilation_digest": {
                "$digest": "sha256:17102224089485e50a7fc15d6f80466051dba14755ddd9af395220ecc88925e4"
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
                  "content_digest": "sha256:2a5963ed2d1346d38226e6180002d16f886835b98f42284a21858b00f460e640",
                  "end_byte": 1036,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/df/CLM-df2e21236111d6da62b2da4022a65fdb.json",
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
                "name": "security.vulnerability.epss_score"
              },
              "claim_type_digest": "sha256:8d575546bf95dce83fe71f971c38885e77f2d3630e8798f694fd67dba8b15870",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "0.99999"
              },
              "predicate": "security.vulnerability.epss_score",
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:4c1c83ed826fc3933fb0807677a06e4997193f2d3941c1438e37affe48164afa",
            "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.epss-scores",
            "capture_contract_digest": "sha256:e8ba787a61c986ca4c53fda09578c61a18110138958218b65e65e350bdd0f070",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "epss-api",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "epss-api"
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
          "predicate": "security.vulnerability.epss_score",
          "object": {
            "kind": "literal",
            "value": "0.99999"
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-c79e9d236b888bada73738d2f0dc0e1d",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/c7/CLM-c79e9d236b888bada73738d2f0dc0e1d.json",
          "artifact_digest": "sha256:0a1db3af4dffe34e486c33e5d14410533e8ee713d92eca92e5afd001e2361855",
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                      "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000019.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                },
                "subject_path": {
                  "$path": "claims/c7/CLM-c79e9d236b888bada73738d2f0dc0e1d.json"
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
                "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
                  "citation_id": "sha256:5b1a586e799b2e78a7203a899d1324fbfd3e14a9b6169abc12ab23a461c65f7e",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:c3fab91633d80ae933a1a2ba9f39e2952f59ae215cfe5bf7bfd0b8cbbc495166",
                "template": 2,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
                  "extract_spec_digest": "sha256:4cc982fc7f714491506c3ba7870e5d1710d8be75cade24de0a26eb2d3ddc0de4",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/data/5/date",
                  "record_key": {
                    "cve_id": "CVE-2021-44228"
                  },
                  "record_locator": "/data/5",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:2a5963ed2d1346d38226e6180002d16f886835b98f42284a21858b00f460e640",
                      "end_byte": 1036,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/c7/CLM-c79e9d236b888bada73738d2f0dc0e1d.json",
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
              "adjudication_rule_digest": "sha256:5db4a57f4f3e60c4067639348a77b4ca3c021642a144704dca13ec3648dd864b",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:11b7f4e87073bb464f04321a5d6a54ebc4827b57164275222061739e972d261c",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-07T18:00:00Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
              ],
              "tag": "cruxible-claim-verdict-v3",
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
                  "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000019.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                  },
                  "sequence": 19
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000019.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
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
                "$digest": "sha256:0a1db3af4dffe34e486c33e5d14410533e8ee713d92eca92e5afd001e2361855"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-c79e9d236b888bada73738d2f0dc0e1d"
              },
              "input_digest": {
                "$digest": "sha256:47cedddb1dbdf9f1650de73cc72ed42ba9013ff30a299e24553b1aea69ccf8f8"
              },
              "statement_address": {
                "artifact_path": "claims/c7/CLM-c79e9d236b888bada73738d2f0dc0e1d.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:11b7f4e87073bb464f04321a5d6a54ebc4827b57164275222061739e972d261c"
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
                  "artifact_digest": "sha256:e8ba787a61c986ca4c53fda09578c61a18110138958218b65e65e350bdd0f070",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.epss-scores"
                  }
                },
                {
                  "artifact_digest": "sha256:fc4ca2f108d1756392349d7ac3da42e40628eb37fc383163e1790969fa4e844c",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.epss_score_date"
                  }
                },
                {
                  "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:0a1db3af4dffe34e486c33e5d14410533e8ee713d92eca92e5afd001e2361855"
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
                        "$digest": "sha256:8f4fed48d03fb8443c1bab01a20d265ed77a0472c6afbc1f73d3c007b0662516"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "2d033ee7b7af7dfea2f893850fd097ad35fb2943",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:812345248c82bd3f824ac3b6c5fd7f81baed03e042a57d22d1fe95e00233fd86"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b9b5bc84b2a9e3675a3c25a27221a778f921ee180c05588bb50aa76e17e9aad3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000019.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:64f5068ba3c673994abca57f2d48d24c5dadee847f7d9574f1e6f23422befff6"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:47cedddb1dbdf9f1650de73cc72ed42ba9013ff30a299e24553b1aea69ccf8f8"
              },
              "source_compilation_digest": {
                "$digest": "sha256:17102224089485e50a7fc15d6f80466051dba14755ddd9af395220ecc88925e4"
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
                  "content_digest": "sha256:2a5963ed2d1346d38226e6180002d16f886835b98f42284a21858b00f460e640",
                  "end_byte": 1036,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/c7/CLM-c79e9d236b888bada73738d2f0dc0e1d.json",
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
                "name": "security.vulnerability.epss_score_date"
              },
              "claim_type_digest": "sha256:fc4ca2f108d1756392349d7ac3da42e40628eb37fc383163e1790969fa4e844c",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "2026-11-02"
              },
              "predicate": "security.vulnerability.epss_score_date",
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:5b1a586e799b2e78a7203a899d1324fbfd3e14a9b6169abc12ab23a461c65f7e",
            "capture_digest": "sha256:3e0f61df85dd807c73e813a3131f1bf49043bf5249219b900762ab4dc1920d87",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.epss-scores",
            "capture_contract_digest": "sha256:e8ba787a61c986ca4c53fda09578c61a18110138958218b65e65e350bdd0f070",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "epss-api",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "epss-api"
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
          "predicate": "security.vulnerability.epss_score_date",
          "object": {
            "kind": "literal",
            "value": "2026-11-02"
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-bed7e93c75f3e67bc9a0431a4d3725b7",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
          "artifact_digest": "sha256:929e4012d89f563fcf7b2c3c6c7e20bb8dadb00aa4f7c4163326ea16a749f81c",
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                      "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000018.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                },
                "subject_path": {
                  "$path": "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json"
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
                "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
                  "citation_id": "sha256:7bce032fa2e9b57ec7d890e01d34d22fd354f5cdc6107d211e9c20ebe2fb2466",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:370213f2d63f980a324c1e5e4571e025bd548df87d04c1635be533a4652a6f17",
                "template": 1,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
                  "extract_spec_digest": "sha256:b81d33bcda0707d425301778325721c53bdbc3acf764b4980a4d67cffe9ca45d",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/vulnerabilities/11/dateAdded",
                  "record_key": {
                    "cve_id": "CVE-2021-44228"
                  },
                  "record_locator": "/vulnerabilities/11",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:91c6d0a48df92b16dfc2115cf9b8b4348bc49b6cb89044ff8373f833cca648bf",
                      "end_byte": 30884,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
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
              "adjudication_rule_digest": "sha256:fec028b18b1178e7d7192611c47718029409c6d8041eccd0da2ff543c8de5598",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:489468f2708b80fa3669e98d88c6824267ecd0238dc83db1f540873ee041c02f",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-07T18:00:00Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
              ],
              "tag": "cruxible-claim-verdict-v3",
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
                  "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000018.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                  },
                  "sequence": 18
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000018.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                "$digest": "sha256:929e4012d89f563fcf7b2c3c6c7e20bb8dadb00aa4f7c4163326ea16a749f81c"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-bed7e93c75f3e67bc9a0431a4d3725b7"
              },
              "input_digest": {
                "$digest": "sha256:9d1873af02ee4173cd8cc83b9cbd409fee35f46317e892d253d12167b05573af"
              },
              "statement_address": {
                "artifact_path": "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:489468f2708b80fa3669e98d88c6824267ecd0238dc83db1f540873ee041c02f"
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
                  "artifact_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.kev-catalog"
                  }
                },
                {
                  "artifact_digest": "sha256:b498918cb60ffca06c35a7b1ea11d9473f2c3b49b29507fb19ff20c5f65c9dbd",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.kev_date_added"
                  }
                },
                {
                  "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:929e4012d89f563fcf7b2c3c6c7e20bb8dadb00aa4f7c4163326ea16a749f81c"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:9d1873af02ee4173cd8cc83b9cbd409fee35f46317e892d253d12167b05573af"
              },
              "source_compilation_digest": {
                "$digest": "sha256:181e448c0f570eba091f4b20d6947bf2a1d171267b877af98ba3745634825507"
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
                  "content_digest": "sha256:91c6d0a48df92b16dfc2115cf9b8b4348bc49b6cb89044ff8373f833cca648bf",
                  "end_byte": 30884,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/be/CLM-bed7e93c75f3e67bc9a0431a4d3725b7.json",
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
              "claim_type_digest": "sha256:b498918cb60ffca06c35a7b1ea11d9473f2c3b49b29507fb19ff20c5f65c9dbd",
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:7bce032fa2e9b57ec7d890e01d34d22fd354f5cdc6107d211e9c20ebe2fb2466",
            "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.kev-catalog",
            "capture_contract_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "kev-catalog",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "kev-catalog"
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-0c497ce6493bc6eea94579dbc0e294fa",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
          "artifact_digest": "sha256:e36377908796716263680429883771de78d71509daa6d1dac2e9bae01d678605",
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                      "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000018.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                },
                "subject_path": {
                  "$path": "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json"
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
                "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
                  "citation_id": "sha256:4cdb726bb3f7bed5a1ef6c699cbc54de19ea3b444ffb6fd15d1b33ab9167fb1a",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:370213f2d63f980a324c1e5e4571e025bd548df87d04c1635be533a4652a6f17",
                "template": 2,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
                  "extract_spec_digest": "sha256:b81d33bcda0707d425301778325721c53bdbc3acf764b4980a4d67cffe9ca45d",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/vulnerabilities/11/dueDate",
                  "record_key": {
                    "cve_id": "CVE-2021-44228"
                  },
                  "record_locator": "/vulnerabilities/11",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:91c6d0a48df92b16dfc2115cf9b8b4348bc49b6cb89044ff8373f833cca648bf",
                      "end_byte": 30884,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
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
              "adjudication_rule_digest": "sha256:3413261e766320d86a7768b05a6af93e847e2e904b227561d685b3eb10a32ab4",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:284bb8afc9448d0d5df56149e595a19519c6a73a8a17eca7eb7516e874d3514b",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-07T18:00:00Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
              ],
              "tag": "cruxible-claim-verdict-v3",
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
                  "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000018.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                  },
                  "sequence": 18
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000018.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                "$digest": "sha256:e36377908796716263680429883771de78d71509daa6d1dac2e9bae01d678605"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-0c497ce6493bc6eea94579dbc0e294fa"
              },
              "input_digest": {
                "$digest": "sha256:ad3b4bf30f21c2fc2e5ee81f03e37512010b7ea74f591b3f57fc5532d2a2a6dc"
              },
              "statement_address": {
                "artifact_path": "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:284bb8afc9448d0d5df56149e595a19519c6a73a8a17eca7eb7516e874d3514b"
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
                  "artifact_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.kev-catalog"
                  }
                },
                {
                  "artifact_digest": "sha256:2eaa22246720660fea9399f3e0602e07dc53cabde356ec8ae3c601f04ec9e116",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.kev_due_date"
                  }
                },
                {
                  "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:e36377908796716263680429883771de78d71509daa6d1dac2e9bae01d678605"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:ad3b4bf30f21c2fc2e5ee81f03e37512010b7ea74f591b3f57fc5532d2a2a6dc"
              },
              "source_compilation_digest": {
                "$digest": "sha256:181e448c0f570eba091f4b20d6947bf2a1d171267b877af98ba3745634825507"
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
                  "content_digest": "sha256:91c6d0a48df92b16dfc2115cf9b8b4348bc49b6cb89044ff8373f833cca648bf",
                  "end_byte": 30884,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/0c/CLM-0c497ce6493bc6eea94579dbc0e294fa.json",
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
              "claim_type_digest": "sha256:2eaa22246720660fea9399f3e0602e07dc53cabde356ec8ae3c601f04ec9e116",
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:4cdb726bb3f7bed5a1ef6c699cbc54de19ea3b444ffb6fd15d1b33ab9167fb1a",
            "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.kev-catalog",
            "capture_contract_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "kev-catalog",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "kev-catalog"
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-7d0e73b0e07c961fb1024d98d258f43a",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
          "artifact_digest": "sha256:0558068170061a68fb2a189ed38c1c0d940ebe5004b15cc68735c88c93e1d883",
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                      "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000018.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                },
                "subject_path": {
                  "$path": "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json"
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
                "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
                  "citation_id": "sha256:d2ee4ffa2426ef103dc094d07407242a29dab3198be69d8a9e26ca7baf2d7e0a",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:370213f2d63f980a324c1e5e4571e025bd548df87d04c1635be533a4652a6f17",
                "template": 3,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
                  "extract_spec_digest": "sha256:b81d33bcda0707d425301778325721c53bdbc3acf764b4980a4d67cffe9ca45d",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/vulnerabilities/11/knownRansomwareCampaignUse",
                  "record_key": {
                    "cve_id": "CVE-2021-44228"
                  },
                  "record_locator": "/vulnerabilities/11",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:91c6d0a48df92b16dfc2115cf9b8b4348bc49b6cb89044ff8373f833cca648bf",
                      "end_byte": 30884,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
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
              "adjudication_rule_digest": "sha256:033c688f95bb0a375e182ce985d3c84172235df993a96bbbe6b77332d28c2737",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:9e3a3fe235508df6ae2c910cfba4c2537f3ba47cd2d78782ef9e21afd15537e4",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-07T18:00:00Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
              ],
              "tag": "cruxible-claim-verdict-v3",
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
                  "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000018.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                  },
                  "sequence": 18
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000018.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                "$digest": "sha256:0558068170061a68fb2a189ed38c1c0d940ebe5004b15cc68735c88c93e1d883"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-7d0e73b0e07c961fb1024d98d258f43a"
              },
              "input_digest": {
                "$digest": "sha256:b01aefb9fa295d824ad107c2563b1de59ee67653fc1d07546eb7e1ede2ed820c"
              },
              "statement_address": {
                "artifact_path": "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:9e3a3fe235508df6ae2c910cfba4c2537f3ba47cd2d78782ef9e21afd15537e4"
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
                  "artifact_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.kev-catalog"
                  }
                },
                {
                  "artifact_digest": "sha256:7390ad1531fba16a6357144227caa596db3e24c63894332d9ce6fd1f19954caf",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.kev_ransomware_use"
                  }
                },
                {
                  "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:0558068170061a68fb2a189ed38c1c0d940ebe5004b15cc68735c88c93e1d883"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:b01aefb9fa295d824ad107c2563b1de59ee67653fc1d07546eb7e1ede2ed820c"
              },
              "source_compilation_digest": {
                "$digest": "sha256:181e448c0f570eba091f4b20d6947bf2a1d171267b877af98ba3745634825507"
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
                  "content_digest": "sha256:91c6d0a48df92b16dfc2115cf9b8b4348bc49b6cb89044ff8373f833cca648bf",
                  "end_byte": 30884,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/7d/CLM-7d0e73b0e07c961fb1024d98d258f43a.json",
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
              "claim_type_digest": "sha256:7390ad1531fba16a6357144227caa596db3e24c63894332d9ce6fd1f19954caf",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "Known"
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:d2ee4ffa2426ef103dc094d07407242a29dab3198be69d8a9e26ca7baf2d7e0a",
            "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.kev-catalog",
            "capture_contract_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "kev-catalog",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "kev-catalog"
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
            "value": "Known"
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-2383f94f7b8c2128e24ea365a8f1e736",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
          "artifact_digest": "sha256:c1b8f8f80ee6b929d67d7488ab3b1e2e9d9abea28f1a3db45aeb789b8c954de7",
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                      "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000018.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                },
                "subject_path": {
                  "$path": "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json"
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
                "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
                  "citation_id": "sha256:b6bbe57f0ce57adbd586575e6dd8cf8088992f979fa1039bfcd72225c2d60816",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:370213f2d63f980a324c1e5e4571e025bd548df87d04c1635be533a4652a6f17",
                "template": 0,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
                  "extract_spec_digest": "sha256:b81d33bcda0707d425301778325721c53bdbc3acf764b4980a4d67cffe9ca45d",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "",
                  "record_key": {
                    "cve_id": "CVE-2021-44228"
                  },
                  "record_locator": "/vulnerabilities/11",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:c0cecc4ac444f48a2d3b346e06072a1a3a456a5c791c580e51b73b4a83e9038d",
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:509d9754b9e368a596130cc6bdc8c74a290335c4832cf6400ae737e5ab3be0b3",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:91c6d0a48df92b16dfc2115cf9b8b4348bc49b6cb89044ff8373f833cca648bf",
                      "end_byte": 30884,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
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
              "adjudication_rule_digest": "sha256:fa8ac373fd850544f2d940a6a587b86d5b1afb6ebfefa641fb3330ca5d12065b",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:ec04bdad40336bc33e6e1dc261ab195be45aa00de57fa79ccb6a44fbd40b11db",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-07T18:00:00Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
              ],
              "tag": "cruxible-claim-verdict-v3",
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
                  "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000018.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                  },
                  "sequence": 18
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000018.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
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
                "$digest": "sha256:c1b8f8f80ee6b929d67d7488ab3b1e2e9d9abea28f1a3db45aeb789b8c954de7"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-2383f94f7b8c2128e24ea365a8f1e736"
              },
              "input_digest": {
                "$digest": "sha256:45f02d6d5bd1cb5b4e94a3e0e9559fdcf97b14737596227f5029fb277b2abfe0"
              },
              "statement_address": {
                "artifact_path": "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:ec04bdad40336bc33e6e1dc261ab195be45aa00de57fa79ccb6a44fbd40b11db"
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
                  "artifact_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.kev-catalog"
                  }
                },
                {
                  "artifact_digest": "sha256:6a3538367406ae23fb18e6951a3cdd452812c4b2f236b4cb7880dc3488bba69f",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.listed_in"
                  }
                },
                {
                  "artifact_digest": "sha256:c0cecc4ac444f48a2d3b346e06072a1a3a456a5c791c580e51b73b4a83e9038d",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.catalog/cisa-kev"
                  }
                },
                {
                  "artifact_digest": "sha256:540436f6a8e9f50181328bdb4c58e36c56e7c0403cc6c5f20501596d06e53a72",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/4a0c491cc082ee536d9d90a8ec3afc33fac9722dc6a28e79bb600caec775e688"
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
              "actor_id": "owner",
              "artifact_digest": {
                "$digest": "sha256:c1b8f8f80ee6b929d67d7488ab3b1e2e9d9abea28f1a3db45aeb789b8c954de7"
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
                        "$digest": "sha256:0d9d2d5c4bae02bc39e176ead889fb8a4eefa1a648c4f75280bb8b6cdf69e201"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "031174cb01c3bb5e91c22320e3ba5e7d59864b3a",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:1562a91fc77ae555a08fdc74a93c53730091f01340f22572103f69d186984229"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:64ede263916f846e82e99c22f67f25d1f577908fb896a94fb8722ea214edd9c1"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000018.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:761fdc5908d367a4d2e9d2daf57d1806d4b17177d074f97654266c41115582dc"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:45f02d6d5bd1cb5b4e94a3e0e9559fdcf97b14737596227f5029fb277b2abfe0"
              },
              "source_compilation_digest": {
                "$digest": "sha256:181e448c0f570eba091f4b20d6947bf2a1d171267b877af98ba3745634825507"
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
                  "content_digest": "sha256:91c6d0a48df92b16dfc2115cf9b8b4348bc49b6cb89044ff8373f833cca648bf",
                  "end_byte": 30884,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/23/CLM-2383f94f7b8c2128e24ea365a8f1e736.json",
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
                "name": "security.vulnerability.listed_in"
              },
              "claim_type_digest": "sha256:6a3538367406ae23fb18e6951a3cdd452812c4b2f236b4cb7880dc3488bba69f",
              "effective_from": "2021-12-10T00:00:00Z",
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.catalog/cisa-kev.json",
                  "selector": {
                    "scheme": "artifact-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "kind": "subject"
              },
              "predicate": "security.vulnerability.listed_in",
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
        "admission_evaluation_time": "2026-11-07T22:22:25.432116Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:b6bbe57f0ce57adbd586575e6dd8cf8088992f979fa1039bfcd72225c2d60816",
            "capture_digest": "sha256:16c189ac69c683139ff04583e868a273f3e9d411bd1f232db28e5c1b16ee9386",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.kev-catalog",
            "capture_contract_digest": "sha256:e69d775977943e9241efb049241ed0f6badb88505435d2612a5d9dd5b2bdebf3",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "kev-catalog",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "kev-catalog"
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
          "predicate": "security.vulnerability.listed_in",
          "object": {
            "kind": "subject",
            "address": {
              "tag": "playbill-semantic-address-v1",
              "artifact_path": "subjects/security.catalog/cisa-kev.json",
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
      }
    ],
    "truncated": false,
    "cursor": null
  }
});
