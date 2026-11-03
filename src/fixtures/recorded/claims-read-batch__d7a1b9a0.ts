// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch bd724c42
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-671cda403929b9199d624791a43b7a3b",
      "CLM-39f4a52b3c2d4f423c663447a6bcaf89",
      "CLM-55252b46e04077d5b9bbd4005b25f76f",
      "CLM-58325fbdd5bff786556a30110917b174",
      "CLM-3f6b80fb033f0d7166cec0884675bed1",
      "CLM-0bee18e34962365ca30ea6da3b0b7277",
      "CLM-73f152cd6eb8478d4388a9dd23a95bca",
      "CLM-0a1e056fd6a201a37d010031c94e2c44"
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
          "identity": "Claim:CLM-671cda403929b9199d624791a43b7a3b",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/67/CLM-671cda403929b9199d624791a43b7a3b.json",
          "artifact_digest": "sha256:779e6ef226ad1240d62595f09c8c58d522e69efe55b0dffca041d8a59348fbc4",
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
                  "$path": "claims/67/CLM-671cda403929b9199d624791a43b7a3b.json"
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
                "sha256:192b3fc652bb5ad842724cf7a340ea50f9c8a26587f58f14aca029c869a2f474"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:192b3fc652bb5ad842724cf7a340ea50f9c8a26587f58f14aca029c869a2f474",
                  "citation_id": "sha256:406f741ece022cba4a9e11627729df0df5b3eb1cda4ccd8960cc7406b71f42a6",
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
                "subject_content_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:ce3c3dedd9951d2df51b6687e388ff823b48c60a91fd65d228d80c5eb3846d69",
                      "end_byte": 34,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/67/CLM-671cda403929b9199d624791a43b7a3b.json",
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
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:5dad7ad615fb7640a31fb79aaf0488a136955b20ca0c057e9d39efe7c4921e0f",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "principal.pilot-owner"
                  ],
                  "evidence_digests": [
                    "sha256:192b3fc652bb5ad842724cf7a340ea50f9c8a26587f58f14aca029c869a2f474"
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
                "sha256:192b3fc652bb5ad842724cf7a340ea50f9c8a26587f58f14aca029c869a2f474"
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
                  "sha256:192b3fc652bb5ad842724cf7a340ea50f9c8a26587f58f14aca029c869a2f474"
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
                "$digest": "sha256:779e6ef226ad1240d62595f09c8c58d522e69efe55b0dffca041d8a59348fbc4"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-671cda403929b9199d624791a43b7a3b"
              },
              "input_digest": {
                "$digest": "sha256:f486b43d774754b5cf8ffadfa679952401e20622dcffa324845eadceb9777316"
              },
              "statement_address": {
                "artifact_path": "claims/67/CLM-671cda403929b9199d624791a43b7a3b.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:5dad7ad615fb7640a31fb79aaf0488a136955b20ca0c057e9d39efe7c4921e0f"
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
                  "artifact_digest": "sha256:3c8bff4bf143e6c9716bf77437a81b553f2b78945b5632a1c4ec5d0f02113277",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.vulnerability.cve_id"
                  }
                },
                {
                  "artifact_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2014-0160"
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
                "$digest": "sha256:779e6ef226ad1240d62595f09c8c58d522e69efe55b0dffca041d8a59348fbc4"
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
                "$digest": "sha256:f486b43d774754b5cf8ffadfa679952401e20622dcffa324845eadceb9777316"
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
                  "content_digest": "sha256:ce3c3dedd9951d2df51b6687e388ff823b48c60a91fd65d228d80c5eb3846d69",
                  "end_byte": 34,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/67/CLM-671cda403929b9199d624791a43b7a3b.json",
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
                "value": "CVE-2014-0160"
              },
              "predicate": "security.vulnerability.cve_id",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
            "citation_id": "sha256:406f741ece022cba4a9e11627729df0df5b3eb1cda4ccd8960cc7406b71f42a6",
            "capture_digest": "sha256:192b3fc652bb5ad842724cf7a340ea50f9c8a26587f58f14aca029c869a2f474",
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
            "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.cve_id",
          "object": {
            "kind": "literal",
            "value": "CVE-2014-0160"
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
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "envelope": {
          "identity": "Claim:CLM-39f4a52b3c2d4f423c663447a6bcaf89",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json",
          "artifact_digest": "sha256:106fb6f216d4ba669b6cf88a7ccca6c0f2bfdbead6222326fdc334ba71c996ce",
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                      "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                    "instance_id": "inst_d8e6dcb48e6a4d0d",
                    "semantic_root": {
                      "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000010.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                },
                "subject_path": {
                  "$path": "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json"
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
                "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
                  "citation_id": "sha256:cef2991b622c56c3a25ce85eb69e5eba3e0bcb2beb86c714d297ca9f71837610",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:006d069a6e3943dd18b2d2f4cb3b69ce1a100b1141c1e089ebd533fd0098a722",
                "template": 1,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
                  "extract_spec_digest": "sha256:4cc982fc7f714491506c3ba7870e5d1710d8be75cade24de0a26eb2d3ddc0de4",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/data/9/percentile",
                  "record_key": {
                    "cve_id": "CVE-2014-0160"
                  },
                  "record_locator": "/data/9",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-03T00:58:54.573196Z",
                "subject_content_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
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
                    "artifact_path": "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json",
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
              "claim_statement_digest": "sha256:d3fe9195b09cf60eb88ad0235c489c4df98c5d0d0f12b09850cf61a4e6cb5ef7",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-03T00:58:54.573196Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
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
                  "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000010.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                  },
                  "sequence": 10
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                  },
                  "generation_root": {
                    "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                  "instance_id": "inst_d8e6dcb48e6a4d0d",
                  "semantic_root": {
                    "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000010.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                "$digest": "sha256:106fb6f216d4ba669b6cf88a7ccca6c0f2bfdbead6222326fdc334ba71c996ce"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-39f4a52b3c2d4f423c663447a6bcaf89"
              },
              "input_digest": {
                "$digest": "sha256:13b31381aa0be9ef162623fc68dd07d61e4abac606d2d32a8190eaa6cff7686c"
              },
              "statement_address": {
                "artifact_path": "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:d3fe9195b09cf60eb88ad0235c489c4df98c5d0d0f12b09850cf61a4e6cb5ef7"
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
                  "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
                  }
                },
                {
                  "artifact_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2014-0160"
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
                "$digest": "sha256:106fb6f216d4ba669b6cf88a7ccca6c0f2bfdbead6222326fdc334ba71c996ce"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:13b31381aa0be9ef162623fc68dd07d61e4abac606d2d32a8190eaa6cff7686c"
              },
              "source_compilation_digest": {
                "$digest": "sha256:ce1ec743af60f565cf1f4fb4f6ac09d0d96f611c2e73d3e759e45259cc5b4045"
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
                "artifact_path": "claims/39/CLM-39f4a52b3c2d4f423c663447a6bcaf89.json",
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
                "value": "0.99996"
              },
              "predicate": "security.vulnerability.epss_percentile",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
            "citation_id": "sha256:cef2991b622c56c3a25ce85eb69e5eba3e0bcb2beb86c714d297ca9f71837610",
            "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
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
            "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.epss_percentile",
          "object": {
            "kind": "literal",
            "value": "0.99996"
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
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "envelope": {
          "identity": "Claim:CLM-55252b46e04077d5b9bbd4005b25f76f",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json",
          "artifact_digest": "sha256:a86716644b8626bc1142b98ff9aebdfe88bad19f18e4dcc068e2dadaefd3b6fe",
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                      "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                    "instance_id": "inst_d8e6dcb48e6a4d0d",
                    "semantic_root": {
                      "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000010.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                },
                "subject_path": {
                  "$path": "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json"
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
                "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
                  "citation_id": "sha256:d18e72931126a751041f9d395c3e2dde3909876e06ada0b05819a9f37d49a11d",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:006d069a6e3943dd18b2d2f4cb3b69ce1a100b1141c1e089ebd533fd0098a722",
                "template": 0,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
                  "extract_spec_digest": "sha256:4cc982fc7f714491506c3ba7870e5d1710d8be75cade24de0a26eb2d3ddc0de4",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/data/9/epss",
                  "record_key": {
                    "cve_id": "CVE-2014-0160"
                  },
                  "record_locator": "/data/9",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-03T00:58:54.573196Z",
                "subject_content_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
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
                    "artifact_path": "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json",
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
              "claim_statement_digest": "sha256:a677f45d5fcb4a4ba907380f3437a545c56f94e90c84b1a360090a92fcaf42ba",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-03T00:58:54.573196Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
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
                  "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000010.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                  },
                  "sequence": 10
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                  },
                  "generation_root": {
                    "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                  "instance_id": "inst_d8e6dcb48e6a4d0d",
                  "semantic_root": {
                    "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000010.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                "$digest": "sha256:a86716644b8626bc1142b98ff9aebdfe88bad19f18e4dcc068e2dadaefd3b6fe"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-55252b46e04077d5b9bbd4005b25f76f"
              },
              "input_digest": {
                "$digest": "sha256:9463766c0a5e85c36efc62a393858bafb0a46d3df3d2adb79415ab2a1536ddd8"
              },
              "statement_address": {
                "artifact_path": "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:a677f45d5fcb4a4ba907380f3437a545c56f94e90c84b1a360090a92fcaf42ba"
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
                  "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
                  }
                },
                {
                  "artifact_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2014-0160"
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
                "$digest": "sha256:a86716644b8626bc1142b98ff9aebdfe88bad19f18e4dcc068e2dadaefd3b6fe"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:9463766c0a5e85c36efc62a393858bafb0a46d3df3d2adb79415ab2a1536ddd8"
              },
              "source_compilation_digest": {
                "$digest": "sha256:ce1ec743af60f565cf1f4fb4f6ac09d0d96f611c2e73d3e759e45259cc5b4045"
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
                "artifact_path": "claims/55/CLM-55252b46e04077d5b9bbd4005b25f76f.json",
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
                "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
            "citation_id": "sha256:d18e72931126a751041f9d395c3e2dde3909876e06ada0b05819a9f37d49a11d",
            "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
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
            "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "envelope": {
          "identity": "Claim:CLM-58325fbdd5bff786556a30110917b174",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/58/CLM-58325fbdd5bff786556a30110917b174.json",
          "artifact_digest": "sha256:8255bb4ce2293e9b9f92ff45125422c3a07c242632687bf089cc90b0db522201",
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                      "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                    "instance_id": "inst_d8e6dcb48e6a4d0d",
                    "semantic_root": {
                      "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000010.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                },
                "subject_path": {
                  "$path": "claims/58/CLM-58325fbdd5bff786556a30110917b174.json"
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
                "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
                  "citation_id": "sha256:a6df57455182a013631b092d9e27d59a6b1ef827d5ce2ff9b1d640c98b8a45d3",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:006d069a6e3943dd18b2d2f4cb3b69ce1a100b1141c1e089ebd533fd0098a722",
                "template": 2,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
                  "extract_spec_digest": "sha256:4cc982fc7f714491506c3ba7870e5d1710d8be75cade24de0a26eb2d3ddc0de4",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/data/9/date",
                  "record_key": {
                    "cve_id": "CVE-2014-0160"
                  },
                  "record_locator": "/data/9",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-03T00:58:54.573196Z",
                "subject_content_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
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
                    "artifact_path": "claims/58/CLM-58325fbdd5bff786556a30110917b174.json",
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
              "claim_statement_digest": "sha256:aff24fc6c923e971cd9b022d97ee46396679d9a562cec7aa4e7e596d96d75290",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-03T00:58:54.573196Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
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
                  "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000010.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                  },
                  "sequence": 10
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                  },
                  "generation_root": {
                    "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                  "instance_id": "inst_d8e6dcb48e6a4d0d",
                  "semantic_root": {
                    "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000010.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
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
                "$digest": "sha256:8255bb4ce2293e9b9f92ff45125422c3a07c242632687bf089cc90b0db522201"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-58325fbdd5bff786556a30110917b174"
              },
              "input_digest": {
                "$digest": "sha256:0d2efb963c5d1528805a6c1fff8b4a816ac46307bb660c61ba476b4017df053c"
              },
              "statement_address": {
                "artifact_path": "claims/58/CLM-58325fbdd5bff786556a30110917b174.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:aff24fc6c923e971cd9b022d97ee46396679d9a562cec7aa4e7e596d96d75290"
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
                  "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
                  }
                },
                {
                  "artifact_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2014-0160"
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
                "$digest": "sha256:8255bb4ce2293e9b9f92ff45125422c3a07c242632687bf089cc90b0db522201"
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
                        "$digest": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:0935fe8e1c2341fe8009ef86381f73f3100e19ac1ddfea262f05345c2def28e3"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000010.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:3255f80bdbf359e1ceeb772784b8f67383f6340af768e36fa7e1a0fd043ef294"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:0d2efb963c5d1528805a6c1fff8b4a816ac46307bb660c61ba476b4017df053c"
              },
              "source_compilation_digest": {
                "$digest": "sha256:ce1ec743af60f565cf1f4fb4f6ac09d0d96f611c2e73d3e759e45259cc5b4045"
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
                "artifact_path": "claims/58/CLM-58325fbdd5bff786556a30110917b174.json",
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
                "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
            "citation_id": "sha256:a6df57455182a013631b092d9e27d59a6b1ef827d5ce2ff9b1d640c98b8a45d3",
            "capture_digest": "sha256:9bdf26382c73e2507b49046595f98f79b56f2111b9abf33737ed4ee47823efc3",
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
            "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "envelope": {
          "identity": "Claim:CLM-3f6b80fb033f0d7166cec0884675bed1",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/3f/CLM-3f6b80fb033f0d7166cec0884675bed1.json",
          "artifact_digest": "sha256:4017542f809a3a3e46f0aed04e24239cd1bd6cf6855a619a3a7f83d0afbf6a1d",
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                      "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                    "instance_id": "inst_d8e6dcb48e6a4d0d",
                    "semantic_root": {
                      "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                },
                "subject_path": {
                  "$path": "claims/3f/CLM-3f6b80fb033f0d7166cec0884675bed1.json"
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
                "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
                  "citation_id": "sha256:7c5b27320de68af9b86bc5889ac49f8c5050fbe5d00bb766c3b162b4c27633b1",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:4efc7585c46beab2685ecc18f90955f19e94789ce356271d6c76d7d6bd5ae3e9",
                "template": 1,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
                  "extract_spec_digest": "sha256:b81d33bcda0707d425301778325721c53bdbc3acf764b4980a4d67cffe9ca45d",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/vulnerabilities/1111/dateAdded",
                  "record_key": {
                    "cve_id": "CVE-2014-0160"
                  },
                  "record_locator": "/vulnerabilities/1111",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-03T00:58:48.471271Z",
                "subject_content_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:3aa9cf3c01f116362a29d111702979175453c425e3733bde80fc4f6f8e2294e5",
                      "end_byte": 1826755,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/3f/CLM-3f6b80fb033f0d7166cec0884675bed1.json",
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
              "claim_statement_digest": "sha256:debb52abe94b592def0998a5117843ea9c10706a96f8912247f99bc97bf1024b",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-03T00:58:48.471271Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
                  "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                  },
                  "generation_root": {
                    "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                  "instance_id": "inst_d8e6dcb48e6a4d0d",
                  "semantic_root": {
                    "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                "$digest": "sha256:4017542f809a3a3e46f0aed04e24239cd1bd6cf6855a619a3a7f83d0afbf6a1d"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-3f6b80fb033f0d7166cec0884675bed1"
              },
              "input_digest": {
                "$digest": "sha256:9e556be281f76392751b6da0d105f94bf84e8928771cd13141a9113d3797829a"
              },
              "statement_address": {
                "artifact_path": "claims/3f/CLM-3f6b80fb033f0d7166cec0884675bed1.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:debb52abe94b592def0998a5117843ea9c10706a96f8912247f99bc97bf1024b"
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
                  "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
                  }
                },
                {
                  "artifact_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2014-0160"
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
                "$digest": "sha256:4017542f809a3a3e46f0aed04e24239cd1bd6cf6855a619a3a7f83d0afbf6a1d"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:9e556be281f76392751b6da0d105f94bf84e8928771cd13141a9113d3797829a"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1a8c85062138b4a16eb96750ef05cd6e93970397f3a2f54075832df0b2db58a4"
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
                  "content_digest": "sha256:3aa9cf3c01f116362a29d111702979175453c425e3733bde80fc4f6f8e2294e5",
                  "end_byte": 1826755,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/3f/CLM-3f6b80fb033f0d7166cec0884675bed1.json",
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
                "value": "2022-05-04"
              },
              "predicate": "security.vulnerability.kev_date_added",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
            "citation_id": "sha256:7c5b27320de68af9b86bc5889ac49f8c5050fbe5d00bb766c3b162b4c27633b1",
            "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
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
            "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.kev_date_added",
          "object": {
            "kind": "literal",
            "value": "2022-05-04"
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
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "envelope": {
          "identity": "Claim:CLM-0bee18e34962365ca30ea6da3b0b7277",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/0b/CLM-0bee18e34962365ca30ea6da3b0b7277.json",
          "artifact_digest": "sha256:c07c72aa8bc6e58978d0a5f4a28789c75df07e792ab2f26555fdd3a27e8f5d7c",
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                      "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                    "instance_id": "inst_d8e6dcb48e6a4d0d",
                    "semantic_root": {
                      "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                },
                "subject_path": {
                  "$path": "claims/0b/CLM-0bee18e34962365ca30ea6da3b0b7277.json"
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
                "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
                  "citation_id": "sha256:70fbd6045864f2f322d776dd8b4fa70b7066046c5668b992e6fe82a894cbd8c3",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:4efc7585c46beab2685ecc18f90955f19e94789ce356271d6c76d7d6bd5ae3e9",
                "template": 2,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
                  "extract_spec_digest": "sha256:b81d33bcda0707d425301778325721c53bdbc3acf764b4980a4d67cffe9ca45d",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/vulnerabilities/1111/dueDate",
                  "record_key": {
                    "cve_id": "CVE-2014-0160"
                  },
                  "record_locator": "/vulnerabilities/1111",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-03T00:58:48.471271Z",
                "subject_content_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:3aa9cf3c01f116362a29d111702979175453c425e3733bde80fc4f6f8e2294e5",
                      "end_byte": 1826755,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/0b/CLM-0bee18e34962365ca30ea6da3b0b7277.json",
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
              "claim_statement_digest": "sha256:f153540c225eb1749df9c8a1b14acbb7033337c78a47605f817c9ac15b806024",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-03T00:58:48.471271Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
                  "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                  },
                  "generation_root": {
                    "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                  "instance_id": "inst_d8e6dcb48e6a4d0d",
                  "semantic_root": {
                    "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                "$digest": "sha256:c07c72aa8bc6e58978d0a5f4a28789c75df07e792ab2f26555fdd3a27e8f5d7c"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-0bee18e34962365ca30ea6da3b0b7277"
              },
              "input_digest": {
                "$digest": "sha256:b84e4a123e76cb0dd232b2bd3f25a8bb06a9130c017e467812f6756b22ee306c"
              },
              "statement_address": {
                "artifact_path": "claims/0b/CLM-0bee18e34962365ca30ea6da3b0b7277.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:f153540c225eb1749df9c8a1b14acbb7033337c78a47605f817c9ac15b806024"
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
                  "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
                  }
                },
                {
                  "artifact_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2014-0160"
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
                "$digest": "sha256:c07c72aa8bc6e58978d0a5f4a28789c75df07e792ab2f26555fdd3a27e8f5d7c"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:b84e4a123e76cb0dd232b2bd3f25a8bb06a9130c017e467812f6756b22ee306c"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1a8c85062138b4a16eb96750ef05cd6e93970397f3a2f54075832df0b2db58a4"
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
                  "content_digest": "sha256:3aa9cf3c01f116362a29d111702979175453c425e3733bde80fc4f6f8e2294e5",
                  "end_byte": 1826755,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/0b/CLM-0bee18e34962365ca30ea6da3b0b7277.json",
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
                "value": "2022-05-25"
              },
              "predicate": "security.vulnerability.kev_due_date",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
            "citation_id": "sha256:70fbd6045864f2f322d776dd8b4fa70b7066046c5668b992e6fe82a894cbd8c3",
            "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
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
            "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.kev_due_date",
          "object": {
            "kind": "literal",
            "value": "2022-05-25"
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
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "envelope": {
          "identity": "Claim:CLM-73f152cd6eb8478d4388a9dd23a95bca",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/73/CLM-73f152cd6eb8478d4388a9dd23a95bca.json",
          "artifact_digest": "sha256:07a67c7cb7af3b290e1809f83fce7cfaf5d5983952f19bff66486ec51bfca48b",
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                      "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                    "instance_id": "inst_d8e6dcb48e6a4d0d",
                    "semantic_root": {
                      "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                },
                "subject_path": {
                  "$path": "claims/73/CLM-73f152cd6eb8478d4388a9dd23a95bca.json"
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
                "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
                  "citation_id": "sha256:142705661f1f29b5f3f30d75ffd417824005fd7850de40b2987af413cea182af",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:4efc7585c46beab2685ecc18f90955f19e94789ce356271d6c76d7d6bd5ae3e9",
                "template": 3,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
                  "extract_spec_digest": "sha256:b81d33bcda0707d425301778325721c53bdbc3acf764b4980a4d67cffe9ca45d",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "/vulnerabilities/1111/knownRansomwareCampaignUse",
                  "record_key": {
                    "cve_id": "CVE-2014-0160"
                  },
                  "record_locator": "/vulnerabilities/1111",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-11-03T00:58:48.471271Z",
                "subject_content_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:3aa9cf3c01f116362a29d111702979175453c425e3733bde80fc4f6f8e2294e5",
                      "end_byte": 1826755,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/73/CLM-73f152cd6eb8478d4388a9dd23a95bca.json",
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
              "claim_statement_digest": "sha256:87518b01adc573b9aedf7b85acc729310c314c9f97ed04989f92862ec6435f64",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-03T00:58:48.471271Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
                  "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                  },
                  "generation_root": {
                    "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                  "instance_id": "inst_d8e6dcb48e6a4d0d",
                  "semantic_root": {
                    "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                "$digest": "sha256:07a67c7cb7af3b290e1809f83fce7cfaf5d5983952f19bff66486ec51bfca48b"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-73f152cd6eb8478d4388a9dd23a95bca"
              },
              "input_digest": {
                "$digest": "sha256:85ddba3247137b1798684b7c0afc193509e14fc789d74789299d723ac1450fba"
              },
              "statement_address": {
                "artifact_path": "claims/73/CLM-73f152cd6eb8478d4388a9dd23a95bca.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:87518b01adc573b9aedf7b85acc729310c314c9f97ed04989f92862ec6435f64"
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
                  "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
                  }
                },
                {
                  "artifact_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2014-0160"
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
                "$digest": "sha256:07a67c7cb7af3b290e1809f83fce7cfaf5d5983952f19bff66486ec51bfca48b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:85ddba3247137b1798684b7c0afc193509e14fc789d74789299d723ac1450fba"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1a8c85062138b4a16eb96750ef05cd6e93970397f3a2f54075832df0b2db58a4"
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
                  "content_digest": "sha256:3aa9cf3c01f116362a29d111702979175453c425e3733bde80fc4f6f8e2294e5",
                  "end_byte": 1826755,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/73/CLM-73f152cd6eb8478d4388a9dd23a95bca.json",
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
                "value": "Unknown"
              },
              "predicate": "security.vulnerability.kev_ransomware_use",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
            "citation_id": "sha256:142705661f1f29b5f3f30d75ffd417824005fd7850de40b2987af413cea182af",
            "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
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
            "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.vulnerability.kev_ransomware_use",
          "object": {
            "kind": "literal",
            "value": "Unknown"
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
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "envelope": {
          "identity": "Claim:CLM-0a1e056fd6a201a37d010031c94e2c44",
          "kind": "claim",
          "format_tag": "playbill-claim-v4",
          "path": "claims/0a/CLM-0a1e056fd6a201a37d010031c94e2c44.json",
          "artifact_digest": "sha256:c7b347f7b64251718dfdc9349d92c955783fe34284f5366bf8fc62d23369bc5f",
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                      "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                    "instance_id": "inst_d8e6dcb48e6a4d0d",
                    "semantic_root": {
                      "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                },
                "subject_path": {
                  "$path": "claims/0a/CLM-0a1e056fd6a201a37d010031c94e2c44.json"
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
                "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
                  "citation_id": "sha256:57533871e8561fc6eb66dadd87fb56635bfb1fcbc3f09ffa3f9b65dbe30a3a3d",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "procedure_evidence": {
                "law": "claim-evidence-v2",
                "node_id": "write",
                "procedure_digest": "sha256:4efc7585c46beab2685ecc18f90955f19e94789ce356271d6c76d7d6bd5ae3e9",
                "template": 0,
                "value": {
                  "basis": "extracted",
                  "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
                  "extract_spec_digest": "sha256:b81d33bcda0707d425301778325721c53bdbc3acf764b4980a4d67cffe9ca45d",
                  "extractor_version": "json-pointer-v1",
                  "field_path": "",
                  "record_key": {
                    "cve_id": "CVE-2014-0160"
                  },
                  "record_locator": "/vulnerabilities/1111",
                  "transform_node_ids": []
                }
              },
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:c0cecc4ac444f48a2d3b346e06072a1a3a456a5c791c580e51b73b4a83e9038d",
                "observed_at": "2026-11-03T00:58:48.471271Z",
                "subject_content_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:3aa9cf3c01f116362a29d111702979175453c425e3733bde80fc4f6f8e2294e5",
                      "end_byte": 1826755,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/0a/CLM-0a1e056fd6a201a37d010031c94e2c44.json",
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
              "claim_statement_digest": "sha256:944042c00eda3bb88d563df66b5cba9685198e71997ce5639507d924b2c8388a",
              "contradicting_evidence_digests": [],
              "control_components": [],
              "currency": "current",
              "epistemic_grades": [],
              "evaluation_time": "2026-11-03T00:58:48.471271Z",
              "freshness_expirations": [],
              "provenance_grades": [],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
                  "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
                  },
                  "generation_root": {
                    "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                  "instance_id": "inst_d8e6dcb48e6a4d0d",
                  "semantic_root": {
                    "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
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
                "$digest": "sha256:c7b347f7b64251718dfdc9349d92c955783fe34284f5366bf8fc62d23369bc5f"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-0a1e056fd6a201a37d010031c94e2c44"
              },
              "input_digest": {
                "$digest": "sha256:e9e930f17385278587fbc116959153c2f5befe66841f85e1caef7f2998b95404"
              },
              "statement_address": {
                "artifact_path": "claims/0a/CLM-0a1e056fd6a201a37d010031c94e2c44.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:944042c00eda3bb88d563df66b5cba9685198e71997ce5639507d924b2c8388a"
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
                  "artifact_digest": "sha256:3990bef3c0b3ba88af91c93537f2c5a3b01f356f6e03a79091dae2c04113011f",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "cruxible-provider-web/fc021b9e1727f37d5f3673208d4d402e14f88304e4c4a945506166b667f85c0c"
                  }
                },
                {
                  "artifact_digest": "sha256:11ec1c8730edf55be42d3d1fa9e52c52c6ca11acf4b2fee0a75ee512068fc12f",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.vulnerability/cve-2014-0160"
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
                "$digest": "sha256:c7b347f7b64251718dfdc9349d92c955783fe34284f5366bf8fc62d23369bc5f"
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
                        "$digest": "sha256:909a27f5b9378fa846f6220f6b9ff7f7939af25f657d6f99bdbaabc6d5938fc4"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "677ae9bd9620117467b3bda5a6668cfdf5e43b41",
                      "instance_id": "inst_d8e6dcb48e6a4d0d",
                      "semantic_root": {
                        "$digest": "sha256:aeb255192e62edbf35ea7b0d7ac0cf0ecfde285b21afa0d9889f1aa41671e6ca"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f0cacc060217a2250f93d1d241397b035e63faab5e3313426a582d385781e319"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:93c49a51ccf37a17109ae5d124a03e6c0e0c6a80c52b4d4fcd62d54bd81e126b"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:e9e930f17385278587fbc116959153c2f5befe66841f85e1caef7f2998b95404"
              },
              "source_compilation_digest": {
                "$digest": "sha256:1a8c85062138b4a16eb96750ef05cd6e93970397f3a2f54075832df0b2db58a4"
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
                  "content_digest": "sha256:3aa9cf3c01f116362a29d111702979175453c425e3733bde80fc4f6f8e2294e5",
                  "end_byte": 1826755,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/0a/CLM-0a1e056fd6a201a37d010031c94e2c44.json",
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
              "effective_from": "2022-05-04T00:00:00Z",
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
                "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
            "citation_id": "sha256:57533871e8561fc6eb66dadd87fb56635bfb1fcbc3f09ffa3f9b65dbe30a3a3d",
            "capture_digest": "sha256:aa5996a121bf2515d397ddf859995bee3125eed5dd179406da5c6ef0e0add1fc",
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
            "artifact_path": "subjects/security.vulnerability/cve-2014-0160.json",
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
