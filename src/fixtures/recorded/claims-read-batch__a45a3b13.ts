// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch f3e10796
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-3c7114565fccbe38877d8f3857f865e6",
      "CLM-67780731f7941176d4fc282295b10d75",
      "CLM-d24dc11c9022ce848f5f3492d43ce457",
      "CLM-21f26c2241a321129da9500c1f536891",
      "CLM-026f0ff9aa151a74d05a5a21013218b3",
      "CLM-af8c77e54da26f349d472526336e70d1",
      "CLM-63717d756e5ffebd62beae615b040327"
    ],
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    }
  },
  "response": {
    "tag": "playbill-claim-read-batch-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "claims": [
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-3c7114565fccbe38877d8f3857f865e6",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/3c/CLM-3c7114565fccbe38877d8f3857f865e6.json",
          "artifact_digest": "sha256:a01485996fe6491485c3d5eb41726f802892be82cc4b2bac2effa322b1904fcb",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:f7188b14377834dc591aba263e1ffc4e45a249385487bcc82050650eae8b3d20"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "subject_path": {
                  "$path": "claims/3c/CLM-3c7114565fccbe38877d8f3857f865e6.json"
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
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
                  "citation_id": "sha256:9d2f340c1cc330f93d6e55d24f522913f4acc7be68f1e82d02473b4b0a96e9ba",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:43:01.517331Z",
                "subject_content_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                      "end_byte": 1855,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/3c/CLM-3c7114565fccbe38877d8f3857f865e6.json",
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
              "adjudication_rule_digest": "sha256:8c8f57fb1a8c10a5dd346845a4b82942892cda00aa2aa560fd46ed16443ef1c6",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:f6d969cbf60b6dca1cc0b3d5877308b842e22a4ad3d7a4921aaf1f89fc482089",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "cruxible-builtin"
                  ],
                  "evidence_digests": [
                    "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:43:01.517331Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                  "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
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
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  },
                  "sequence": 6
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000006.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                "$digest": "sha256:a01485996fe6491485c3d5eb41726f802892be82cc4b2bac2effa322b1904fcb"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-3c7114565fccbe38877d8f3857f865e6"
              },
              "input_digest": {
                "$digest": "sha256:1fb1797dbd50fd74314e13f336a2a3ef528cb9d711e957aff4b1a94bee2bbc60"
              },
              "statement_address": {
                "artifact_path": "claims/3c/CLM-3c7114565fccbe38877d8f3857f865e6.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:f6d969cbf60b6dca1cc0b3d5877308b842e22a4ad3d7a4921aaf1f89fc482089"
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
                  "artifact_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.file-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:ec066adf1d95b014bbc4696da7d5228efcaf25784bec37e59891f54661aa214c",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.release.component"
                  }
                },
                {
                  "artifact_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-builtin"
                  }
                },
                {
                  "artifact_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/gate-app--1.0.0"
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
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:a01485996fe6491485c3d5eb41726f802892be82cc4b2bac2effa322b1904fcb"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:1fb1797dbd50fd74314e13f336a2a3ef528cb9d711e957aff4b1a94bee2bbc60"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c69776c694b9ee0c4a6775b3fa0ae3b78d03758cbdbf9e185f12e63630d2a6d5"
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
                  "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                  "end_byte": 1855,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/3c/CLM-3c7114565fccbe38877d8f3857f865e6.json",
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
                "name": "security.release.component"
              },
              "claim_type_digest": "sha256:ec066adf1d95b014bbc4696da7d5228efcaf25784bec37e59891f54661aa214c",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:pypi/jinja2@3.1.3"
              },
              "predicate": "security.release.component",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
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
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:9d2f340c1cc330f93d6e55d24f522913f4acc7be68f1e82d02473b4b0a96e9ba",
            "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.file-v1",
            "capture_contract_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.release.component",
          "object": {
            "kind": "literal",
            "value": "pkg:pypi/jinja2@3.1.3"
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
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-67780731f7941176d4fc282295b10d75",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/67/CLM-67780731f7941176d4fc282295b10d75.json",
          "artifact_digest": "sha256:407709592d9284a16acf84d8e665d00f042be37d7802bb60b90ee898169f5ae3",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:f7188b14377834dc591aba263e1ffc4e45a249385487bcc82050650eae8b3d20"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "subject_path": {
                  "$path": "claims/67/CLM-67780731f7941176d4fc282295b10d75.json"
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
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
                  "citation_id": "sha256:e62379c140fe45a0630ce8f191864e218e72e65aa18362c5a19ec364447fbd61",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:43:01.517331Z",
                "subject_content_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                      "end_byte": 1855,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/67/CLM-67780731f7941176d4fc282295b10d75.json",
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
              "adjudication_rule_digest": "sha256:8c8f57fb1a8c10a5dd346845a4b82942892cda00aa2aa560fd46ed16443ef1c6",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:00ea2cee41923af459e417c83cb594730ef6da064593ee9a696f78fcef032fce",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "cruxible-builtin"
                  ],
                  "evidence_digests": [
                    "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:43:01.517331Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                  "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
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
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  },
                  "sequence": 6
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000006.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                "$digest": "sha256:407709592d9284a16acf84d8e665d00f042be37d7802bb60b90ee898169f5ae3"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-67780731f7941176d4fc282295b10d75"
              },
              "input_digest": {
                "$digest": "sha256:4233d8e93c0af0a82b31897bf9a07471f268d143277efe85639111c69df6d7a3"
              },
              "statement_address": {
                "artifact_path": "claims/67/CLM-67780731f7941176d4fc282295b10d75.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:00ea2cee41923af459e417c83cb594730ef6da064593ee9a696f78fcef032fce"
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
                  "artifact_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.file-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:ec066adf1d95b014bbc4696da7d5228efcaf25784bec37e59891f54661aa214c",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.release.component"
                  }
                },
                {
                  "artifact_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-builtin"
                  }
                },
                {
                  "artifact_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/gate-app--1.0.0"
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
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:407709592d9284a16acf84d8e665d00f042be37d7802bb60b90ee898169f5ae3"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:4233d8e93c0af0a82b31897bf9a07471f268d143277efe85639111c69df6d7a3"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c69776c694b9ee0c4a6775b3fa0ae3b78d03758cbdbf9e185f12e63630d2a6d5"
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
                  "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                  "end_byte": 1855,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/67/CLM-67780731f7941176d4fc282295b10d75.json",
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
                "name": "security.release.component"
              },
              "claim_type_digest": "sha256:ec066adf1d95b014bbc4696da7d5228efcaf25784bec37e59891f54661aa214c",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:pypi/requests@2.32.3"
              },
              "predicate": "security.release.component",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
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
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:e62379c140fe45a0630ce8f191864e218e72e65aa18362c5a19ec364447fbd61",
            "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.file-v1",
            "capture_contract_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.release.component",
          "object": {
            "kind": "literal",
            "value": "pkg:pypi/requests@2.32.3"
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
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-d24dc11c9022ce848f5f3492d43ce457",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/d2/CLM-d24dc11c9022ce848f5f3492d43ce457.json",
          "artifact_digest": "sha256:7c5f6b4f28872333cb3890b6b7da5ba4ae258a0d9f15573800109f40b7be3c47",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:f7188b14377834dc591aba263e1ffc4e45a249385487bcc82050650eae8b3d20"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "subject_path": {
                  "$path": "claims/d2/CLM-d24dc11c9022ce848f5f3492d43ce457.json"
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
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
                  "citation_id": "sha256:5225a244e58537c3f6bc599614f7880ad771bc33efa83a36896dc65041b5c780",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:43:01.517331Z",
                "subject_content_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                      "end_byte": 1855,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/d2/CLM-d24dc11c9022ce848f5f3492d43ce457.json",
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
              "adjudication_rule_digest": "sha256:8c8f57fb1a8c10a5dd346845a4b82942892cda00aa2aa560fd46ed16443ef1c6",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:4534d69e76923e62a3478c96a8495b266cc7faeabcfa241f50f06d25da70a8f3",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "cruxible-builtin"
                  ],
                  "evidence_digests": [
                    "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:43:01.517331Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                  "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
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
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  },
                  "sequence": 6
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000006.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                "$digest": "sha256:7c5f6b4f28872333cb3890b6b7da5ba4ae258a0d9f15573800109f40b7be3c47"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-d24dc11c9022ce848f5f3492d43ce457"
              },
              "input_digest": {
                "$digest": "sha256:90eff3c0f1e3cfffa248b05d7db93d1d377be7d50dc2e7e7513fada808d6a998"
              },
              "statement_address": {
                "artifact_path": "claims/d2/CLM-d24dc11c9022ce848f5f3492d43ce457.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:4534d69e76923e62a3478c96a8495b266cc7faeabcfa241f50f06d25da70a8f3"
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
                  "artifact_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.file-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:ec066adf1d95b014bbc4696da7d5228efcaf25784bec37e59891f54661aa214c",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.release.component"
                  }
                },
                {
                  "artifact_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-builtin"
                  }
                },
                {
                  "artifact_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/gate-app--1.0.0"
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
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:7c5f6b4f28872333cb3890b6b7da5ba4ae258a0d9f15573800109f40b7be3c47"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:90eff3c0f1e3cfffa248b05d7db93d1d377be7d50dc2e7e7513fada808d6a998"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c69776c694b9ee0c4a6775b3fa0ae3b78d03758cbdbf9e185f12e63630d2a6d5"
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
                  "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                  "end_byte": 1855,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/d2/CLM-d24dc11c9022ce848f5f3492d43ce457.json",
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
                "name": "security.release.component"
              },
              "claim_type_digest": "sha256:ec066adf1d95b014bbc4696da7d5228efcaf25784bec37e59891f54661aa214c",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
              },
              "predicate": "security.release.component",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
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
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:5225a244e58537c3f6bc599614f7880ad771bc33efa83a36896dc65041b5c780",
            "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.file-v1",
            "capture_contract_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.release.component",
          "object": {
            "kind": "literal",
            "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1"
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
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-21f26c2241a321129da9500c1f536891",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/21/CLM-21f26c2241a321129da9500c1f536891.json",
          "artifact_digest": "sha256:d69e6ce041d1bc2b287fd0df18a3a1a5c63f49cbfee5c54fca5d52687b89f65c",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:9361f2f537508bc28d840a6d7620077f1623f28304a44e7caf92dcb18b837cb2"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
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
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "subject_path": {
                  "$path": "claims/21/CLM-21f26c2241a321129da9500c1f536891.json"
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
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
                  "citation_id": "sha256:b1137afa7162c5e710e3b316fdc86e71a154756f713764fe16469daf1ac938d8",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:44:38.124878Z",
                "subject_content_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                      "end_byte": 129261,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/21/CLM-21f26c2241a321129da9500c1f536891.json",
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
              "adjudication_rule_digest": "sha256:7242b352a220f56b4cb7a351bf1b9e71ff95a10f4380a40be572018c48686c94",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:b03b00d80b2023e884e67395c211a7dedb4382f34fa264fc3c370b7700d505c6",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-10-26T17:44:38.124878Z",
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
              ],
              "tag": "playbill-claim-verdict-v1",
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
                  "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8"
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
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
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
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                  },
                  "sequence": 7
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000007.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
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
                "$digest": "sha256:d69e6ce041d1bc2b287fd0df18a3a1a5c63f49cbfee5c54fca5d52687b89f65c"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-21f26c2241a321129da9500c1f536891"
              },
              "input_digest": {
                "$digest": "sha256:d8964adac5377f42cebdf0f768c67fe42ad43b558c97ce608b76c1d7b94a52f2"
              },
              "statement_address": {
                "artifact_path": "claims/21/CLM-21f26c2241a321129da9500c1f536891.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:b03b00d80b2023e884e67395c211a7dedb4382f34fa264fc3c370b7700d505c6"
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
                  "artifact_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.fetched-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:2f2067d7ad2ee7b85642a52ea67890278b044a0003cabd14c2eee6996c908d8d",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.release.osv_coverage"
                  }
                },
                {
                  "artifact_digest": "sha256:156c8871031c804079e1182a0327a5561b17cd889710528800bd1f7ea0f9390e",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3"
                  }
                },
                {
                  "artifact_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/gate-app--1.0.0"
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
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:d69e6ce041d1bc2b287fd0df18a3a1a5c63f49cbfee5c54fca5d52687b89f65c"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:391a6c962a01ff8faac955b534076d4cdce4b4941b5b545cb3778ffe500acda9"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "d23ea5d983e92f48d425a32a142029fa8ffc17e7",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:cb527d558d5c31b8c23393d20710e9314f6aa4a87d2292762506d86d0c8d9b0a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:07181f66e6a0905c68bf79a638ede7946658a96aa08e6b5af76c18e2ac21cc66"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:70d22ce6943265f6106f25ff97307d668293a68c832101d0ed129320344477e5"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:d8964adac5377f42cebdf0f768c67fe42ad43b558c97ce608b76c1d7b94a52f2"
              },
              "source_compilation_digest": {
                "$digest": "sha256:cdc9c01de219aa82cc7cee9be798ea00d605f32b390ba00930732d90a4c9fbb1"
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
                  "content_digest": "sha256:4b62c56636915a188d9d8538c5587e554eb77cb167a4a3b2c19babba5e918506",
                  "end_byte": 129261,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/21/CLM-21f26c2241a321129da9500c1f536891.json",
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
                "name": "security.release.osv_coverage"
              },
              "claim_type_digest": "sha256:2f2067d7ad2ee7b85642a52ea67890278b044a0003cabd14c2eee6996c908d8d",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "complete: 3 of 3 components answered; set b0388f454ae8d358"
              },
              "predicate": "security.release.osv_coverage",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
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
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:b1137afa7162c5e710e3b316fdc86e71a154756f713764fe16469daf1ac938d8",
            "capture_digest": "sha256:c963c7cf6d514f57ce10ebd3376be786fc44da859d2cd5a2dae49be770a453e8",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "retained-security-evidence",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "retained-security-evidence"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.release.osv_coverage",
          "object": {
            "kind": "literal",
            "value": "complete: 3 of 3 components answered; set b0388f454ae8d358"
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
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-026f0ff9aa151a74d05a5a21013218b3",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/02/CLM-026f0ff9aa151a74d05a5a21013218b3.json",
          "artifact_digest": "sha256:5a945a4217f1a94afde55da0e79c261e709f8ebac6d2b6d2f3c06f509526a97b",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:f7188b14377834dc591aba263e1ffc4e45a249385487bcc82050650eae8b3d20"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "subject_path": {
                  "$path": "claims/02/CLM-026f0ff9aa151a74d05a5a21013218b3.json"
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
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
                  "citation_id": "sha256:48dbc4e1d70443441076079732947c7dfc6f264b3eb2e096d05f42c4c1cc24e2",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:3baebf6d63e2faff9a3d55398d8967eb1ed2865ee6f12defd80939c18051d611",
                "observed_at": "2026-10-26T17:43:01.517331Z",
                "subject_content_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                      "end_byte": 1855,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/02/CLM-026f0ff9aa151a74d05a5a21013218b3.json",
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
              "adjudication_rule_digest": "sha256:6d03147acde3c6c4d1c835225a227956fa808093feb6a9da39430c08da668b97",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:bc5e7ecc24deec8cc7b85245caf699741871ffdcb0d39c0fd2e13838f7cc946d",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "cruxible-builtin"
                  ],
                  "evidence_digests": [
                    "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:43:01.517331Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                  "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
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
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  },
                  "sequence": 6
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000006.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                "$digest": "sha256:5a945a4217f1a94afde55da0e79c261e709f8ebac6d2b6d2f3c06f509526a97b"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-026f0ff9aa151a74d05a5a21013218b3"
              },
              "input_digest": {
                "$digest": "sha256:2d9817b7d16f2eba4fb1b7f35c87bcd00933091e3624b0d64df9f7f41f8fd54d"
              },
              "statement_address": {
                "artifact_path": "claims/02/CLM-026f0ff9aa151a74d05a5a21013218b3.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:bc5e7ecc24deec8cc7b85245caf699741871ffdcb0d39c0fd2e13838f7cc946d"
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
                  "artifact_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.file-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:c3b5c0fa7ef2d272f66952a17cd2d78864857a4ac074f5cbe310e8b3f4d58654",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.release.product"
                  }
                },
                {
                  "artifact_digest": "sha256:3baebf6d63e2faff9a3d55398d8967eb1ed2865ee6f12defd80939c18051d611",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.product/gate-app"
                  }
                },
                {
                  "artifact_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-builtin"
                  }
                },
                {
                  "artifact_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/gate-app--1.0.0"
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
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:5a945a4217f1a94afde55da0e79c261e709f8ebac6d2b6d2f3c06f509526a97b"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:2d9817b7d16f2eba4fb1b7f35c87bcd00933091e3624b0d64df9f7f41f8fd54d"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c69776c694b9ee0c4a6775b3fa0ae3b78d03758cbdbf9e185f12e63630d2a6d5"
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
                  "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                  "end_byte": 1855,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/02/CLM-026f0ff9aa151a74d05a5a21013218b3.json",
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
                "name": "security.release.product"
              },
              "claim_type_digest": "sha256:c3b5c0fa7ef2d272f66952a17cd2d78864857a4ac074f5cbe310e8b3f4d58654",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.product/gate-app.json",
                  "selector": {
                    "scheme": "artifact-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "kind": "subject"
              },
              "predicate": "security.release.product",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
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
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:48dbc4e1d70443441076079732947c7dfc6f264b3eb2e096d05f42c4c1cc24e2",
            "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.file-v1",
            "capture_contract_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
            "status": "admitted",
            "decision": {
              "tag": "cruxible-capture-evidence-admission-v2",
              "status": "admitted",
              "rule_id": "stated-by-source",
              "admission": "direct",
              "refusal_code": null,
              "closest_rule_id": "stated-by-source"
            }
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.release.product",
          "object": {
            "kind": "subject",
            "address": {
              "tag": "playbill-semantic-address-v1",
              "artifact_path": "subjects/security.product/gate-app.json",
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
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-af8c77e54da26f349d472526336e70d1",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/af/CLM-af8c77e54da26f349d472526336e70d1.json",
          "artifact_digest": "sha256:429f28a35018bf603abfe5be211b71698f40c1088d20a70d18d7f7e2d848fbe0",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:f7188b14377834dc591aba263e1ffc4e45a249385487bcc82050650eae8b3d20"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "subject_path": {
                  "$path": "claims/af/CLM-af8c77e54da26f349d472526336e70d1.json"
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
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
                  "citation_id": "sha256:7dc0d1ce477eab8156c69efebafd6319608df10acf08d5b232157377061c4acc",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:43:01.517331Z",
                "subject_content_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                      "end_byte": 1855,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/af/CLM-af8c77e54da26f349d472526336e70d1.json",
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
              "adjudication_rule_digest": "sha256:fae4f2b9ce3b072074f32bdcb4d9c151086a8e9cab0f9280486aaf4a96994c25",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:803644ca8290224d7d43ef5d4d8501929552e05d53b38ca506700e8026068f9e",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "cruxible-builtin"
                  ],
                  "evidence_digests": [
                    "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:43:01.517331Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                  "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
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
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  },
                  "sequence": 6
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000006.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                "$digest": "sha256:429f28a35018bf603abfe5be211b71698f40c1088d20a70d18d7f7e2d848fbe0"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-af8c77e54da26f349d472526336e70d1"
              },
              "input_digest": {
                "$digest": "sha256:34c69e2e14fc2bfb0382fe9b00864d62bc5d922b46a837674fe9113b3f3b7668"
              },
              "statement_address": {
                "artifact_path": "claims/af/CLM-af8c77e54da26f349d472526336e70d1.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:803644ca8290224d7d43ef5d4d8501929552e05d53b38ca506700e8026068f9e"
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
                  "artifact_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.file-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:6100a7f7df11ed880cd232efc98cedae0200327c976f19c0b3805df1b545d43a",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.release.product_name"
                  }
                },
                {
                  "artifact_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-builtin"
                  }
                },
                {
                  "artifact_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/gate-app--1.0.0"
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
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:429f28a35018bf603abfe5be211b71698f40c1088d20a70d18d7f7e2d848fbe0"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:34c69e2e14fc2bfb0382fe9b00864d62bc5d922b46a837674fe9113b3f3b7668"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c69776c694b9ee0c4a6775b3fa0ae3b78d03758cbdbf9e185f12e63630d2a6d5"
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
                  "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                  "end_byte": 1855,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/af/CLM-af8c77e54da26f349d472526336e70d1.json",
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
                "name": "security.release.product_name"
              },
              "claim_type_digest": "sha256:6100a7f7df11ed880cd232efc98cedae0200327c976f19c0b3805df1b545d43a",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "gate-app"
              },
              "predicate": "security.release.product_name",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
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
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:7dc0d1ce477eab8156c69efebafd6319608df10acf08d5b232157377061c4acc",
            "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.file-v1",
            "capture_contract_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
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
            "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.release.product_name",
          "object": {
            "kind": "literal",
            "value": "gate-app"
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
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-63717d756e5ffebd62beae615b040327",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/63/CLM-63717d756e5ffebd62beae615b040327.json",
          "artifact_digest": "sha256:bdd169f6bb4c6387efaa784a34ccc414e92c2a7fd7b598f7fdab92a03b526893",
          "predecessor_digest": null,
          "revision": 1
        },
        "facts": [
          {
            "schema_id": "cruxible.claim.attestation_coverage",
            "schema_version": 1,
            "fact_key": "accepted_approvals",
            "value": {
              "attestations": [
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:f7188b14377834dc591aba263e1ffc4e45a249385487bcc82050650eae8b3d20"
                    }
                  },
                  "signer_id": "robertmalone",
                  "submitted_by": "robertmalone"
                }
              ],
              "basis": [
                {
                  "kind": "authority_ruled",
                  "law_digest": {
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:d1452da614340317b10d01150642626aff9dac8347922edd30453997c9182c6d"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                      "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                    },
                    "generation_root": {
                      "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "subject_path": {
                  "$path": "claims/63/CLM-63717d756e5ffebd62beae615b040327.json"
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
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
                  "citation_id": "sha256:4a5e0dd365afa42a6c052e93707f3f9c6f2beeabe9e3e4e599e362e2b7b0f122",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T17:43:01.517331Z",
                "subject_content_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                      "end_byte": 1855,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/63/CLM-63717d756e5ffebd62beae615b040327.json",
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
              "adjudication_rule_digest": "sha256:870156b0dd1ae1e3b66578707d9d0a798d6fa4b6bd3f8c278e84afe1085b9d8b",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:944a6426b22f159b2f0757650a36fb30efefee359aff658af5784bf389c1af46",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "cruxible-builtin"
                  ],
                  "evidence_digests": [
                    "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T17:43:01.517331Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                  "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933"
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
                    "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:d2d8bde91f63883aadd803b9c2794ae5a8cb310e3319c5e5a89610d7ed7dfb31"
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
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000006.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                  },
                  "sequence": 6
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000006.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
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
                "$digest": "sha256:bdd169f6bb4c6387efaa784a34ccc414e92c2a7fd7b598f7fdab92a03b526893"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-63717d756e5ffebd62beae615b040327"
              },
              "input_digest": {
                "$digest": "sha256:357c32db03e11432da0d46e7f22f3d5455f3b26c4f287c503663623f7f945e1c"
              },
              "statement_address": {
                "artifact_path": "claims/63/CLM-63717d756e5ffebd62beae615b040327.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:944a6426b22f159b2f0757650a36fb30efefee359aff658af5784bf389c1af46"
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
                  "artifact_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.file-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:c0392daf2c2e7b3737a31cf153f8665027ecd266669c5448b97ed76aacdcdfb4",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.release.version"
                  }
                },
                {
                  "artifact_digest": "sha256:fdc53fb334f8a9c45ebb575762fb187b1fe4b12173118058cfa55c557d29cd70",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-builtin"
                  }
                },
                {
                  "artifact_digest": "sha256:ced1e096669272594a442e070585300af50706f5f70c5a0660bf466794b84876",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.release/gate-app--1.0.0"
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
              "actor_id": "robertmalone",
              "artifact_digest": {
                "$digest": "sha256:bdd169f6bb4c6387efaa784a34ccc414e92c2a7fd7b598f7fdab92a03b526893"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:09bf9f67ed5256048f75173c680e433a0f8b52959d13f82c6d53d0da540236fa"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "a021b33e7af8f654743d5861c70f83f11022b6ae",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:c9d0f05af30ba9ebe9c10ceb4a168a934628b73d67ee926350f024c2b5832420"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:6e2173ed1f5b72774abf5d306ed3c2407cf3321d969b7529da2daaf297f965d5"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000006.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:a62457205d84d9d79f79a579930775e95ad783a1c5b365fd289e793a5ca28281"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:357c32db03e11432da0d46e7f22f3d5455f3b26c4f287c503663623f7f945e1c"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c69776c694b9ee0c4a6775b3fa0ae3b78d03758cbdbf9e185f12e63630d2a6d5"
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
                  "content_digest": "sha256:e7ad5f2f737436fb6618df8db3596d790cdaf7673a315f3beed2ea8209794da7",
                  "end_byte": 1855,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/63/CLM-63717d756e5ffebd62beae615b040327.json",
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
                "name": "security.release.version"
              },
              "claim_type_digest": "sha256:c0392daf2c2e7b3737a31cf153f8665027ecd266669c5448b97ed76aacdcdfb4",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "1.0.0"
              },
              "predicate": "security.release.version",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
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
        "admission_evaluation_time": "2026-10-26T19:00:09.706610Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:4a5e0dd365afa42a6c052e93707f3f9c6f2beeabe9e3e4e599e362e2b7b0f122",
            "capture_digest": "sha256:937ec966102f5d7de279e66c0b55a3e836744a0c39687784d222b0536e73e933",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.file-v1",
            "capture_contract_digest": "sha256:afd5503751e7a0e6acb72032c934c7245150c595646af997cc78960aacbaee67",
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
            "artifact_path": "subjects/security.release/gate-app--1.0.0.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.release.version",
          "object": {
            "kind": "literal",
            "value": "1.0.0"
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
