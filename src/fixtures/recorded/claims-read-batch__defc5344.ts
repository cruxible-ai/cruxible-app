// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch c8935705
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-99492b94fc4f41594e609e2c05746b04"
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
          "identity": "Claim:CLM-99492b94fc4f41594e609e2c05746b04",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/99/CLM-99492b94fc4f41594e609e2c05746b04.json",
          "artifact_digest": "sha256:98c2f6e33c6bfdd6cee757516f12d4a7f781cd278fd24b665405a62a967807a9",
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
                        "$digest": "sha256:be2b8afdaaff2239daab0280719535724afe22b791ab57c3edf1bb56f4fe04c0"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:f7b09f28e72a7187730618a5c6219d2453476b72448bc96680c65765e9a56c16"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
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
                        "$digest": "sha256:be2b8afdaaff2239daab0280719535724afe22b791ab57c3edf1bb56f4fe04c0"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:f7b09f28e72a7187730618a5c6219d2453476b72448bc96680c65765e9a56c16"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
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
                      "$digest": "sha256:be2b8afdaaff2239daab0280719535724afe22b791ab57c3edf1bb56f4fe04c0"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:f7b09f28e72a7187730618a5c6219d2453476b72448bc96680c65765e9a56c16"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000011.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                },
                "subject_path": {
                  "$path": "claims/99/CLM-99492b94fc4f41594e609e2c05746b04.json"
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
                "sha256:47469db933029cfd3c2a7096f02e679f29d499aa03db5845b9f132a0186b7b54"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:47469db933029cfd3c2a7096f02e679f29d499aa03db5845b9f132a0186b7b54",
                  "citation_id": "sha256:b95c66c36ed09a5e2e816c2eddfdba00c30bcabdce07744b2719b63a4e5155d0",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-29T11:00:00Z",
                "subject_content_digest": "sha256:c0cecc4ac444f48a2d3b346e06072a1a3a456a5c791c580e51b73b4a83e9038d",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:1abadb4aeef1d2cac960e887e78b03753ae04ba7cb7194c7d92dff39ad2ac49d",
                      "end_byte": 49,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/99/CLM-99492b94fc4f41594e609e2c05746b04.json",
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
              "adjudication_rule_digest": "sha256:e87daf6c3d41ae86184b4592b9ebffab2ede0c772b3335de7881ae1375510715",
              "authority_basis": [],
              "basis_kinds": [],
              "claim_statement_digest": "sha256:1e2c61811730d0fdaca2555fd9e69f8221eba3efd4a773ac42d750bc5e38111d",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-10-09T11:59:00Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:47469db933029cfd3c2a7096f02e679f29d499aa03db5845b9f132a0186b7b54"
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
                  "sha256:47469db933029cfd3c2a7096f02e679f29d499aa03db5845b9f132a0186b7b54"
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
                        "$digest": "sha256:be2b8afdaaff2239daab0280719535724afe22b791ab57c3edf1bb56f4fe04c0"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:f7b09f28e72a7187730618a5c6219d2453476b72448bc96680c65765e9a56c16"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
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
                        "$digest": "sha256:be2b8afdaaff2239daab0280719535724afe22b791ab57c3edf1bb56f4fe04c0"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:f7b09f28e72a7187730618a5c6219d2453476b72448bc96680c65765e9a56c16"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
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
                        "$digest": "sha256:be2b8afdaaff2239daab0280719535724afe22b791ab57c3edf1bb56f4fe04c0"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:f7b09f28e72a7187730618a5c6219d2453476b72448bc96680c65765e9a56c16"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000011.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
                  },
                  "sequence": 11
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:be2b8afdaaff2239daab0280719535724afe22b791ab57c3edf1bb56f4fe04c0"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:f7b09f28e72a7187730618a5c6219d2453476b72448bc96680c65765e9a56c16"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000011.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
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
                "$digest": "sha256:98c2f6e33c6bfdd6cee757516f12d4a7f781cd278fd24b665405a62a967807a9"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-99492b94fc4f41594e609e2c05746b04"
              },
              "input_digest": {
                "$digest": "sha256:8a4c3b251c530af105c9b2c0dd5f4bce578446e6e62b00ec4aa76e0b4fa52664"
              },
              "statement_address": {
                "artifact_path": "claims/99/CLM-99492b94fc4f41594e609e2c05746b04.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:1e2c61811730d0fdaca2555fd9e69f8221eba3efd4a773ac42d750bc5e38111d"
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
                  "artifact_digest": "sha256:3f2357d01380f4798975cc91641bb1263e8409c9fba60d3b42b85e523fe1a4ea",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.catalog.catalog_id"
                  }
                },
                {
                  "artifact_digest": "sha256:c0cecc4ac444f48a2d3b346e06072a1a3a456a5c791c580e51b73b4a83e9038d",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.catalog/cisa-kev"
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
                "$digest": "sha256:98c2f6e33c6bfdd6cee757516f12d4a7f781cd278fd24b665405a62a967807a9"
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
                        "$digest": "sha256:be2b8afdaaff2239daab0280719535724afe22b791ab57c3edf1bb56f4fe04c0"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e2f40213c62e221a363f993f79fe4f6a8d11be32",
                      "instance_id": "inst_console05",
                      "semantic_root": {
                        "$digest": "sha256:f7b09f28e72a7187730618a5c6219d2453476b72448bc96680c65765e9a56c16"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bac557744f7261e1e23f3a9eb91260806d41f0565b30c87cd5f01073572c816a"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000011.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:729d87f1006af5575d1c1a34480172d7fe036948149cf4ed0055b7355186ee71"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:8a4c3b251c530af105c9b2c0dd5f4bce578446e6e62b00ec4aa76e0b4fa52664"
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
                  "content_digest": "sha256:1abadb4aeef1d2cac960e887e78b03753ae04ba7cb7194c7d92dff39ad2ac49d",
                  "end_byte": 49,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/99/CLM-99492b94fc4f41594e609e2c05746b04.json",
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
                "name": "security.catalog.catalog_id"
              },
              "claim_type_digest": "sha256:3f2357d01380f4798975cc91641bb1263e8409c9fba60d3b42b85e523fe1a4ea",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "cisa-kev"
              },
              "predicate": "security.catalog.catalog_id",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.catalog/cisa-kev.json",
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
            "citation_id": "sha256:b95c66c36ed09a5e2e816c2eddfdba00c30bcabdce07744b2719b63a4e5155d0",
            "capture_digest": "sha256:47469db933029cfd3c2a7096f02e679f29d499aa03db5845b9f132a0186b7b54",
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
            "artifact_path": "subjects/security.catalog/cisa-kev.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.catalog.catalog_id",
          "object": {
            "kind": "literal",
            "value": "cisa-kev"
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
