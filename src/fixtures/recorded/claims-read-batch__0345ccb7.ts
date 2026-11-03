// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 9e9c9cad
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-a405b2a08fbc949bac5794292efc9d27"
    ],
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    }
  },
  "response": {
    "tag": "playbill-claim-read-batch-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "claims": [
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "envelope": {
          "identity": "Claim:CLM-a405b2a08fbc949bac5794292efc9d27",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/a4/CLM-a405b2a08fbc949bac5794292efc9d27.json",
          "artifact_digest": "sha256:29eff3ca819b2ea978db7e18f71f3beb13ad44d3d9ed1ed3cb9eb3cba35eb90c",
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
                        "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                      },
                      "generation_root": {
                        "$digest": "sha256:4182bfffdf010197a7428bc5106bb0c6598ed0bd010a338bc1137234d660bf77"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:535e70e0c175d2984d7a44cbf579bc7f95f7db408fb587aff15e235731f3c83a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                      },
                      "generation_root": {
                        "$digest": "sha256:4182bfffdf010197a7428bc5106bb0c6598ed0bd010a338bc1137234d660bf77"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:535e70e0c175d2984d7a44cbf579bc7f95f7db408fb587aff15e235731f3c83a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
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
                      "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                    },
                    "generation_root": {
                      "$digest": "sha256:4182bfffdf010197a7428bc5106bb0c6598ed0bd010a338bc1137234d660bf77"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
                    "instance_id": "inst_d8e6dcb48e6a4d0d",
                    "semantic_root": {
                      "$digest": "sha256:535e70e0c175d2984d7a44cbf579bc7f95f7db408fb587aff15e235731f3c83a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                },
                "subject_path": {
                  "$path": "claims/a4/CLM-a405b2a08fbc949bac5794292efc9d27.json"
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
                "sha256:669d14caf7fe5a788c4ea9c02c7433fa5a9aa95bb160f4676b6c488f2b7bbf79"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:669d14caf7fe5a788c4ea9c02c7433fa5a9aa95bb160f4676b6c488f2b7bbf79",
                  "citation_id": "sha256:e7ab1c8aaa210560eb77cc19fd1d005969931a023896f8583bc2512df32d7b7e",
                  "origin": "self_source",
                  "role": "copy",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-03T00:58:38.787504Z",
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
                    "artifact_path": "claims/a4/CLM-a405b2a08fbc949bac5794292efc9d27.json",
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
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:1e2c61811730d0fdaca2555fd9e69f8221eba3efd4a773ac42d750bc5e38111d",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "principal.pilot-owner"
                  ],
                  "evidence_digests": [
                    "sha256:669d14caf7fe5a788c4ea9c02c7433fa5a9aa95bb160f4676b6c488f2b7bbf79"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-11-03T00:58:38.787504Z",
              "freshness_expirations": [],
              "provenance_grades": [
                "self-asserted"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:669d14caf7fe5a788c4ea9c02c7433fa5a9aa95bb160f4676b6c488f2b7bbf79"
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
                  "sha256:669d14caf7fe5a788c4ea9c02c7433fa5a9aa95bb160f4676b6c488f2b7bbf79"
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
                        "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                      },
                      "generation_root": {
                        "$digest": "sha256:4182bfffdf010197a7428bc5106bb0c6598ed0bd010a338bc1137234d660bf77"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:535e70e0c175d2984d7a44cbf579bc7f95f7db408fb587aff15e235731f3c83a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                      },
                      "generation_root": {
                        "$digest": "sha256:4182bfffdf010197a7428bc5106bb0c6598ed0bd010a338bc1137234d660bf77"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:535e70e0c175d2984d7a44cbf579bc7f95f7db408fb587aff15e235731f3c83a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
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
                        "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                      },
                      "generation_root": {
                        "$digest": "sha256:4182bfffdf010197a7428bc5106bb0c6598ed0bd010a338bc1137234d660bf77"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:535e70e0c175d2984d7a44cbf579bc7f95f7db408fb587aff15e235731f3c83a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000007.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
                  },
                  "sequence": 7
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                  },
                  "generation_root": {
                    "$digest": "sha256:4182bfffdf010197a7428bc5106bb0c6598ed0bd010a338bc1137234d660bf77"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
                  "instance_id": "inst_d8e6dcb48e6a4d0d",
                  "semantic_root": {
                    "$digest": "sha256:535e70e0c175d2984d7a44cbf579bc7f95f7db408fb587aff15e235731f3c83a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000007.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
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
                "$digest": "sha256:29eff3ca819b2ea978db7e18f71f3beb13ad44d3d9ed1ed3cb9eb3cba35eb90c"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-a405b2a08fbc949bac5794292efc9d27"
              },
              "input_digest": {
                "$digest": "sha256:df4460ce3c68b549a60451f5245d5483bb3a04f8195b57d3c0a01fc867b4acb2"
              },
              "statement_address": {
                "artifact_path": "claims/a4/CLM-a405b2a08fbc949bac5794292efc9d27.json",
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
              "actor_id": "pilot-owner",
              "artifact_digest": {
                "$digest": "sha256:29eff3ca819b2ea978db7e18f71f3beb13ad44d3d9ed1ed3cb9eb3cba35eb90c"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                      },
                      "generation_root": {
                        "$digest": "sha256:4182bfffdf010197a7428bc5106bb0c6598ed0bd010a338bc1137234d660bf77"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "bd4d2aaab78ace9b7daae61a7b66174f63761b0d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:535e70e0c175d2984d7a44cbf579bc7f95f7db408fb587aff15e235731f3c83a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:bdb715043e8f161f47a7616138417e452f7d1dc2d8e766e51ff11ceeabb25a2c"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000007.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:ea12e76998f974118f2f8619ff44ce13f7cb02a2f22bf65ccd92cb4f8038991c"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:df4460ce3c68b549a60451f5245d5483bb3a04f8195b57d3c0a01fc867b4acb2"
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
                "artifact_path": "claims/a4/CLM-a405b2a08fbc949bac5794292efc9d27.json",
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
        "admission_evaluation_time": "2026-11-03T00:58:54.573196Z",
        "admission_accounts": [
          {
            "tag": "cruxible-capture-admission-account-v2",
            "citation_id": "sha256:e7ab1c8aaa210560eb77cc19fd1d005969931a023896f8583bc2512df32d7b7e",
            "capture_digest": "sha256:669d14caf7fe5a788c4ea9c02c7433fa5a9aa95bb160f4676b6c488f2b7bbf79",
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
