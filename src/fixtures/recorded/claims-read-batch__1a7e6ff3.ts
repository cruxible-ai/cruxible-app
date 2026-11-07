// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch edb9e0e9
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-260724b6a176569d560f4d889ca9e36a",
      "CLM-8a2aa0b007172937744ad435748008d3"
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
          "identity": "Claim:CLM-260724b6a176569d560f4d889ca9e36a",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/26/CLM-260724b6a176569d560f4d889ca9e36a.json",
          "artifact_digest": "sha256:fdebf7abdfed7b5e5c303c7733481cdc04a5d055c76dd7d6956066c2dc835e0f",
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
                  "$path": "claims/26/CLM-260724b6a176569d560f4d889ca9e36a.json"
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
                  "citation_id": "sha256:2d713ad0bfb0193288b728c38b693637fb6f8f02596351744f085f8be3401c81",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:1e0a678683e0b487fb661477e48a5daad716d174c144828946dc95533b3e79e1",
                "template": 0,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
                  "extract_spec_digest": "sha256:1eb4d726adaef24325ef74c46394d117c285f066eed9c777312512d4705b1b22",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "",
                  "record_key": {
                    "cve_id": "CVE-2026-49844",
                    "purl": "pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1"
                  },
                  "record_locator": "/affected/0",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:16cf8602ccd3afed7b3668b2cdac34a07ac09bb84de11119569a8bbed55e1837",
                "observed_at": "2026-11-07T18:00:00Z",
                "subject_content_digest": "sha256:732f405a482d244dd3a2684ad1a8fba2b36fd4121138e4997248f3df201739cf",
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
                    "artifact_path": "claims/26/CLM-260724b6a176569d560f4d889ca9e36a.json",
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
              "adjudication_rule_digest": "sha256:2e15430bea259bdee993db9035f0162ecdbf9baaacf4f8faac1aee9c3af49999",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:031b8196fa9685287d0bddd8013339bd77a9c4b6b0368ebe2d7b0cd4f8eb6249",
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
                "direct"
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
                "$digest": "sha256:fdebf7abdfed7b5e5c303c7733481cdc04a5d055c76dd7d6956066c2dc835e0f"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-260724b6a176569d560f4d889ca9e36a"
              },
              "input_digest": {
                "$digest": "sha256:d4e052d91d53a2febf0eeb2d6824cf56ca9ec21b119bb703dfe032dde323b7a9"
              },
              "statement_address": {
                "artifact_path": "claims/26/CLM-260724b6a176569d560f4d889ca9e36a.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:031b8196fa9685287d0bddd8013339bd77a9c4b6b0368ebe2d7b0cd4f8eb6249"
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
                  "artifact_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.component.affected_by"
                  }
                },
                {
                  "artifact_digest": "sha256:16cf8602ccd3afed7b3668b2cdac34a07ac09bb84de11119569a8bbed55e1837",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2026-49844"
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
                  "artifact_digest": "sha256:732f405a482d244dd3a2684ad1a8fba2b36fd4121138e4997248f3df201739cf",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1"
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
                "$digest": "sha256:fdebf7abdfed7b5e5c303c7733481cdc04a5d055c76dd7d6956066c2dc835e0f"
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
                "$digest": "sha256:d4e052d91d53a2febf0eeb2d6824cf56ca9ec21b119bb703dfe032dde323b7a9"
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
                "artifact_path": "claims/26/CLM-260724b6a176569d560f4d889ca9e36a.json",
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
                "name": "security.component.affected_by"
              },
              "claim_type_digest": "sha256:511b6826cf5434bb466ce9caf8fd4a36e36ed87c1a8de1ed5df3cb9d5987301a",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.vulnerability/cve-2026-49844.json",
                  "selector": {
                    "scheme": "artifact-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "kind": "subject"
              },
              "predicate": "security.component.affected_by",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
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
            "citation_id": "sha256:2d713ad0bfb0193288b728c38b693637fb6f8f02596351744f085f8be3401c81",
            "capture_digest": "sha256:8e305600ffec357289a0fb4fcad6b74a968d53fde1b968cdc33e0096e386d217",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.osv-matches",
            "capture_contract_digest": "sha256:8355945df3404d83fc741c0361e09bb7ee67b590bffe5f4613a47ef8ad1ad6bc",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "osv",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "osv"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.component.affected_by",
          "object": {
            "kind": "subject",
            "address": {
              "tag": "playbill-semantic-address-v1",
              "artifact_path": "subjects/security.vulnerability/cve-2026-49844.json",
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
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "envelope": {
          "identity": "Claim:CLM-8a2aa0b007172937744ad435748008d3",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/8a/CLM-8a2aa0b007172937744ad435748008d3.json",
          "artifact_digest": "sha256:3835010df0fb1d207541997267eb792c51ed68442d8d3b39578d5dc8dca7a22f",
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
                  "$path": "claims/8a/CLM-8a2aa0b007172937744ad435748008d3.json"
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
                  "citation_id": "sha256:cd85fabea602f31bb46d76780e2b2b3cf6926ab2d0b14ac06022de7a5aca4c97",
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
                "subject_content_digest": "sha256:732f405a482d244dd3a2684ad1a8fba2b36fd4121138e4997248f3df201739cf",
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
                    "artifact_path": "claims/8a/CLM-8a2aa0b007172937744ad435748008d3.json",
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
              "adjudication_rule_digest": "sha256:5ec272387f13e77301d869908585cf35020b90f3dcad37c03e174cbd37c409a1",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:7ae46ae529d279123c973b999df39627204a751dbe0d97ec29da98653f7afb70",
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
                "$digest": "sha256:3835010df0fb1d207541997267eb792c51ed68442d8d3b39578d5dc8dca7a22f"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-8a2aa0b007172937744ad435748008d3"
              },
              "input_digest": {
                "$digest": "sha256:920ffa170f3cb51843cb40157b76520726b7272098612f74fda051d713487ea1"
              },
              "statement_address": {
                "artifact_path": "claims/8a/CLM-8a2aa0b007172937744ad435748008d3.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:7ae46ae529d279123c973b999df39627204a751dbe0d97ec29da98653f7afb70"
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
                  "artifact_digest": "sha256:a773f9540e76a99a781783134d5d8eec2a12b086bdb754ff733dd3a9add625f4",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.component.purl"
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
                  "artifact_digest": "sha256:732f405a482d244dd3a2684ad1a8fba2b36fd4121138e4997248f3df201739cf",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1"
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
                "$digest": "sha256:3835010df0fb1d207541997267eb792c51ed68442d8d3b39578d5dc8dca7a22f"
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
                "$digest": "sha256:920ffa170f3cb51843cb40157b76520726b7272098612f74fda051d713487ea1"
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
                "artifact_path": "claims/8a/CLM-8a2aa0b007172937744ad435748008d3.json",
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
                "name": "security.component.purl"
              },
              "claim_type_digest": "sha256:a773f9540e76a99a781783134d5d8eec2a12b086bdb754ff733dd3a9add625f4",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1"
              },
              "predicate": "security.component.purl",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
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
            "citation_id": "sha256:cd85fabea602f31bb46d76780e2b2b3cf6926ab2d0b14ac06022de7a5aca4c97",
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
            "artifact_path": "subjects/security.component/pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.component.purl",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/org.apache.logging.log4j/log4j-api@2.14.1"
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
