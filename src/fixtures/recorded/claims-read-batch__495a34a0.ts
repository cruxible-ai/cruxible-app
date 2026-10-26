// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 9ec49d80
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-dc7df7e00c8ce96dce6407e0fd7783e4",
      "CLM-003d31d2f2e06ddcd8785837d7fa719d",
      "CLM-e23fb125cf42e285a33b466817c9a9eb",
      "CLM-43d7d3d84f4e701b4c03352351de26a9",
      "CLM-b0a99f4ab74a4d9809d5073181358066",
      "CLM-9deeb00b3d0b61a8df68f3ad666e84e7",
      "CLM-af3013cdabfe696e0c094a03c149640b"
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
          "identity": "Claim:CLM-dc7df7e00c8ce96dce6407e0fd7783e4",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/dc/CLM-dc7df7e00c8ce96dce6407e0fd7783e4.json",
          "artifact_digest": "sha256:e4323692de0f04c8b52e9c0d3da8639cb7155954b4b60fbe1c0347f2a0d96c15",
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
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                      "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "subject_path": {
                  "$path": "claims/dc/CLM-dc7df7e00c8ce96dce6407e0fd7783e4.json"
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
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
                  "citation_id": "sha256:9d3c85c37ad15ccc3637d202b7417897ea026dca8841c41b4b6321aa11a2e220",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T18:55:53.263624Z",
                "subject_content_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                      "end_byte": 36591,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/dc/CLM-dc7df7e00c8ce96dce6407e0fd7783e4.json",
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
              "adjudication_rule_digest": "sha256:74422adf1499feaec29ac181ca4de600d698e52732c39e57afe30ba2b78a5b51",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:0b1de825cb40da485b4d13ec4704d9463d984dbf36b0b4ef173d19f8da8c8d34",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T18:55:53.263624Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                  "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                "$digest": "sha256:e4323692de0f04c8b52e9c0d3da8639cb7155954b4b60fbe1c0347f2a0d96c15"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-dc7df7e00c8ce96dce6407e0fd7783e4"
              },
              "input_digest": {
                "$digest": "sha256:14f57d29f200b39024e832e9d46efb91d9ef10535a44e09a858235cf058ba3ff"
              },
              "statement_address": {
                "artifact_path": "claims/dc/CLM-dc7df7e00c8ce96dce6407e0fd7783e4.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:0b1de825cb40da485b4d13ec4704d9463d984dbf36b0b4ef173d19f8da8c8d34"
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
                  "artifact_digest": "sha256:54e1b2878f10278733238b9edd056147809f04446ff5afb741ea46be5176d9e0",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.environment"
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
                  "artifact_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test"
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
                "$digest": "sha256:e4323692de0f04c8b52e9c0d3da8639cb7155954b4b60fbe1c0347f2a0d96c15"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:14f57d29f200b39024e832e9d46efb91d9ef10535a44e09a858235cf058ba3ff"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c13eab01c68c7a32c3c02bc2806207bc2294311ae9acada7f4404363ccfdb40"
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
                  "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                  "end_byte": 36591,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/dc/CLM-dc7df7e00c8ce96dce6407e0fd7783e4.json",
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
                "name": "security.job.environment"
              },
              "claim_type_digest": "sha256:54e1b2878f10278733238b9edd056147809f04446ff5afb741ea46be5176d9e0",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "none"
              },
              "predicate": "security.job.environment",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
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
            "citation_id": "sha256:9d3c85c37ad15ccc3637d202b7417897ea026dca8841c41b4b6321aa11a2e220",
            "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
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
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.job.environment",
          "object": {
            "kind": "literal",
            "value": "none"
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
          "identity": "Claim:CLM-003d31d2f2e06ddcd8785837d7fa719d",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/00/CLM-003d31d2f2e06ddcd8785837d7fa719d.json",
          "artifact_digest": "sha256:2ae734936ba745052df1b09b808737bb460d58c3619995437838ec2e743abe24",
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
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                      "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "subject_path": {
                  "$path": "claims/00/CLM-003d31d2f2e06ddcd8785837d7fa719d.json"
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
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
                  "citation_id": "sha256:a15a64c0c0c531a084448f4dfb0dd4ed4153a88d39a0cb63845b6d5937eb4336",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T18:55:53.263624Z",
                "subject_content_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                      "end_byte": 36591,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/00/CLM-003d31d2f2e06ddcd8785837d7fa719d.json",
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
              "adjudication_rule_digest": "sha256:e31b464d72fb65218c8ba28004116a1e22eb9df784c351cb7c25d864270fb2ff",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:f2ce601a8e55cfac2b9d4976f2da6db1fdab40606443a3fba1b6026fc65a4444",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T18:55:53.263624Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                  "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                "$digest": "sha256:2ae734936ba745052df1b09b808737bb460d58c3619995437838ec2e743abe24"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-003d31d2f2e06ddcd8785837d7fa719d"
              },
              "input_digest": {
                "$digest": "sha256:6ff55b46a1dd7ad9eb3031c644b1d99f98b32c476ca69923ad023a79c5b66b47"
              },
              "statement_address": {
                "artifact_path": "claims/00/CLM-003d31d2f2e06ddcd8785837d7fa719d.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:f2ce601a8e55cfac2b9d4976f2da6db1fdab40606443a3fba1b6026fc65a4444"
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
                  "artifact_digest": "sha256:d1eb2450a1f7a3e1327ca09e58deef4d081d7ad2685db287c874babfc2026038",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.job_key"
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
                  "artifact_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test"
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
                "$digest": "sha256:2ae734936ba745052df1b09b808737bb460d58c3619995437838ec2e743abe24"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:6ff55b46a1dd7ad9eb3031c644b1d99f98b32c476ca69923ad023a79c5b66b47"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c13eab01c68c7a32c3c02bc2806207bc2294311ae9acada7f4404363ccfdb40"
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
                  "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                  "end_byte": 36591,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/00/CLM-003d31d2f2e06ddcd8785837d7fa719d.json",
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
                "name": "security.job.job_key"
              },
              "claim_type_digest": "sha256:d1eb2450a1f7a3e1327ca09e58deef4d081d7ad2685db287c874babfc2026038",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "docker-image-test"
              },
              "predicate": "security.job.job_key",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
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
            "citation_id": "sha256:a15a64c0c0c531a084448f4dfb0dd4ed4153a88d39a0cb63845b6d5937eb4336",
            "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
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
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.job.job_key",
          "object": {
            "kind": "literal",
            "value": "docker-image-test"
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
          "identity": "Claim:CLM-e23fb125cf42e285a33b466817c9a9eb",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/e2/CLM-e23fb125cf42e285a33b466817c9a9eb.json",
          "artifact_digest": "sha256:853d9eeac1e7472c42171943234b9e56f96196afaacec4db171ca97e53c5592f",
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
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                      "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "subject_path": {
                  "$path": "claims/e2/CLM-e23fb125cf42e285a33b466817c9a9eb.json"
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
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
                  "citation_id": "sha256:597e4d720b3410709d21792ffba5105734d7a8369d9689c65f10c9893cb7feb9",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T18:55:53.263624Z",
                "subject_content_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                      "end_byte": 36591,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/e2/CLM-e23fb125cf42e285a33b466817c9a9eb.json",
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
              "adjudication_rule_digest": "sha256:7ed3e2669adc4865fd2679278267760602f32ed79e2c9a1afc306e4bbf30269e",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:206a36e70e050d15f29ddb517b633e60ad39b53188f15a295de7bfd200483dd2",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T18:55:53.263624Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                  "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                "$digest": "sha256:853d9eeac1e7472c42171943234b9e56f96196afaacec4db171ca97e53c5592f"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-e23fb125cf42e285a33b466817c9a9eb"
              },
              "input_digest": {
                "$digest": "sha256:9e0dfc705bbbedb1baf5dc1772ee13ebabf59027e3f6eef1b8ab54f8850c7871"
              },
              "statement_address": {
                "artifact_path": "claims/e2/CLM-e23fb125cf42e285a33b466817c9a9eb.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:206a36e70e050d15f29ddb517b633e60ad39b53188f15a295de7bfd200483dd2"
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
                  "artifact_digest": "sha256:197489e42b5d292c332607d971855369a733a1c99a45e22096c4eb164f411f9d",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.permission"
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
                  "artifact_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test"
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
                "$digest": "sha256:853d9eeac1e7472c42171943234b9e56f96196afaacec4db171ca97e53c5592f"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:9e0dfc705bbbedb1baf5dc1772ee13ebabf59027e3f6eef1b8ab54f8850c7871"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c13eab01c68c7a32c3c02bc2806207bc2294311ae9acada7f4404363ccfdb40"
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
                  "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                  "end_byte": 36591,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/e2/CLM-e23fb125cf42e285a33b466817c9a9eb.json",
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
                "name": "security.job.permission"
              },
              "claim_type_digest": "sha256:197489e42b5d292c332607d971855369a733a1c99a45e22096c4eb164f411f9d",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "token:repository-default"
              },
              "predicate": "security.job.permission",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
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
            "citation_id": "sha256:597e4d720b3410709d21792ffba5105734d7a8369d9689c65f10c9893cb7feb9",
            "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
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
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.job.permission",
          "object": {
            "kind": "literal",
            "value": "token:repository-default"
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
          "identity": "Claim:CLM-43d7d3d84f4e701b4c03352351de26a9",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/43/CLM-43d7d3d84f4e701b4c03352351de26a9.json",
          "artifact_digest": "sha256:880e0cdf6bab701ea1a7e6c0fc7bf5e3d2e6be916f283d4770e5c5c8fed11973",
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
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                      "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "subject_path": {
                  "$path": "claims/43/CLM-43d7d3d84f4e701b4c03352351de26a9.json"
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
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
                  "citation_id": "sha256:57919757cbba0f3cc113666a33a003b24e31c8c646ff1a5ea549f3be97bc16fb",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T18:55:53.263624Z",
                "subject_content_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                      "end_byte": 36591,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/43/CLM-43d7d3d84f4e701b4c03352351de26a9.json",
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
              "adjudication_rule_digest": "sha256:2148b8a4b6933b214a5c32b4cd29f75a40fbd778220fb521cd0aef1ed0f65699",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:eee6aa2a97c257204bc7ee2edbd61d3f898ec9a41866a9e842166b2335123954",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T18:55:53.263624Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                  "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                "$digest": "sha256:880e0cdf6bab701ea1a7e6c0fc7bf5e3d2e6be916f283d4770e5c5c8fed11973"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-43d7d3d84f4e701b4c03352351de26a9"
              },
              "input_digest": {
                "$digest": "sha256:f6b21a640dccd68e86acbf978da77351373ad216c92b5cb61643ddd1f2b8109f"
              },
              "statement_address": {
                "artifact_path": "claims/43/CLM-43d7d3d84f4e701b4c03352351de26a9.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:eee6aa2a97c257204bc7ee2edbd61d3f898ec9a41866a9e842166b2335123954"
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
                  "artifact_digest": "sha256:e92cf56952cede47ff7100c55aa56f86d222162fc59439ca51a4e42ccda984bc",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.uses"
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
                  "artifact_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test"
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
                "$digest": "sha256:880e0cdf6bab701ea1a7e6c0fc7bf5e3d2e6be916f283d4770e5c5c8fed11973"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:f6b21a640dccd68e86acbf978da77351373ad216c92b5cb61643ddd1f2b8109f"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c13eab01c68c7a32c3c02bc2806207bc2294311ae9acada7f4404363ccfdb40"
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
                  "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                  "end_byte": 36591,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/43/CLM-43d7d3d84f4e701b4c03352351de26a9.json",
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
                "name": "security.job.uses"
              },
              "claim_type_digest": "sha256:e92cf56952cede47ff7100c55aa56f86d222162fc59439ca51a4e42ccda984bc",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:githubactions/astral-sh/setup-uv@v4"
              },
              "predicate": "security.job.uses",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
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
            "citation_id": "sha256:57919757cbba0f3cc113666a33a003b24e31c8c646ff1a5ea549f3be97bc16fb",
            "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
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
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.job.uses",
          "object": {
            "kind": "literal",
            "value": "pkg:githubactions/astral-sh/setup-uv@v4"
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
          "identity": "Claim:CLM-b0a99f4ab74a4d9809d5073181358066",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/b0/CLM-b0a99f4ab74a4d9809d5073181358066.json",
          "artifact_digest": "sha256:4e1bf3e4132a44be60e1a85d576ba63e2fe502cfbdd93a48fd1fec7fe2b54a06",
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
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                      "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "subject_path": {
                  "$path": "claims/b0/CLM-b0a99f4ab74a4d9809d5073181358066.json"
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
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
                  "citation_id": "sha256:c0ff2a38b83d2396cfdc81124ee7da699fdd38e82b5ae5131e629eefbacff275",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T18:55:53.263624Z",
                "subject_content_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                      "end_byte": 36591,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/b0/CLM-b0a99f4ab74a4d9809d5073181358066.json",
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
              "adjudication_rule_digest": "sha256:2148b8a4b6933b214a5c32b4cd29f75a40fbd778220fb521cd0aef1ed0f65699",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:7011c67136b7da3d8cec99de93c2bfef8a806c4e697b51da02f06732f14687d7",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T18:55:53.263624Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                  "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                "$digest": "sha256:4e1bf3e4132a44be60e1a85d576ba63e2fe502cfbdd93a48fd1fec7fe2b54a06"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-b0a99f4ab74a4d9809d5073181358066"
              },
              "input_digest": {
                "$digest": "sha256:2da1e85cac354eef5cfb9c867bf926b584d6e155e329fc8788e5c9f1633bd0c9"
              },
              "statement_address": {
                "artifact_path": "claims/b0/CLM-b0a99f4ab74a4d9809d5073181358066.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:7011c67136b7da3d8cec99de93c2bfef8a806c4e697b51da02f06732f14687d7"
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
                  "artifact_digest": "sha256:e92cf56952cede47ff7100c55aa56f86d222162fc59439ca51a4e42ccda984bc",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.uses"
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
                  "artifact_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test"
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
                "$digest": "sha256:4e1bf3e4132a44be60e1a85d576ba63e2fe502cfbdd93a48fd1fec7fe2b54a06"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:2da1e85cac354eef5cfb9c867bf926b584d6e155e329fc8788e5c9f1633bd0c9"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c13eab01c68c7a32c3c02bc2806207bc2294311ae9acada7f4404363ccfdb40"
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
                  "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                  "end_byte": 36591,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/b0/CLM-b0a99f4ab74a4d9809d5073181358066.json",
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
                "name": "security.job.uses"
              },
              "claim_type_digest": "sha256:e92cf56952cede47ff7100c55aa56f86d222162fc59439ca51a4e42ccda984bc",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "pkg:githubactions/actions/checkout@v4"
              },
              "predicate": "security.job.uses",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
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
            "citation_id": "sha256:c0ff2a38b83d2396cfdc81124ee7da699fdd38e82b5ae5131e629eefbacff275",
            "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
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
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.job.uses",
          "object": {
            "kind": "literal",
            "value": "pkg:githubactions/actions/checkout@v4"
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
          "identity": "Claim:CLM-9deeb00b3d0b61a8df68f3ad666e84e7",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/9d/CLM-9deeb00b3d0b61a8df68f3ad666e84e7.json",
          "artifact_digest": "sha256:0a0fc48eaf34b82e487660ed3fc39740438a084afd75e339256da2abb04ed705",
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
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                      "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "subject_path": {
                  "$path": "claims/9d/CLM-9deeb00b3d0b61a8df68f3ad666e84e7.json"
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
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
                  "citation_id": "sha256:bd013db1c5645b3bcaac4ba35b98770ec54dab87767e30826d68fe9b23fd4fe3",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:dc402a78330a8c8619a5e3e9eafdb76d67ac9ec9d0405e6652372a93728b7c6d",
                "observed_at": "2026-10-26T18:55:53.263624Z",
                "subject_content_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                      "end_byte": 36591,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/9d/CLM-9deeb00b3d0b61a8df68f3ad666e84e7.json",
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
              "adjudication_rule_digest": "sha256:d16ecc4e9648a3103dbb80ac71ed57111541a06229501840ca895d93484be954",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:a7efe43cb244633291fb5d6558369017067b39a4c67a171b01644303a400c688",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T18:55:53.263624Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                  "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                "$digest": "sha256:0a0fc48eaf34b82e487660ed3fc39740438a084afd75e339256da2abb04ed705"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-9deeb00b3d0b61a8df68f3ad666e84e7"
              },
              "input_digest": {
                "$digest": "sha256:efff5479fe2e6335a2559bd3a5d5be21853fc10c650cac2f8dedaee75862b80f"
              },
              "statement_address": {
                "artifact_path": "claims/9d/CLM-9deeb00b3d0b61a8df68f3ad666e84e7.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:a7efe43cb244633291fb5d6558369017067b39a4c67a171b01644303a400c688"
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
                  "artifact_digest": "sha256:4ab08afa87fe90bf7cc1865040b6c2fc244cae510bcbfa470ec4fd5ca86d6b05",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.workflow"
                  }
                },
                {
                  "artifact_digest": "sha256:dc402a78330a8c8619a5e3e9eafdb76d67ac9ec9d0405e6652372a93728b7c6d",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml"
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
                  "artifact_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test"
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
                "$digest": "sha256:0a0fc48eaf34b82e487660ed3fc39740438a084afd75e339256da2abb04ed705"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:efff5479fe2e6335a2559bd3a5d5be21853fc10c650cac2f8dedaee75862b80f"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c13eab01c68c7a32c3c02bc2806207bc2294311ae9acada7f4404363ccfdb40"
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
                  "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                  "end_byte": 36591,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/9d/CLM-9deeb00b3d0b61a8df68f3ad666e84e7.json",
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
                "name": "security.job.workflow"
              },
              "claim_type_digest": "sha256:4ab08afa87fe90bf7cc1865040b6c2fc244cae510bcbfa470ec4fd5ca86d6b05",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml.json",
                  "selector": {
                    "scheme": "artifact-v1",
                    "value": ""
                  },
                  "tag": "playbill-semantic-address-v1"
                },
                "kind": "subject"
              },
              "predicate": "security.job.workflow",
              "qualifier": null,
              "role": "observation",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
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
            "citation_id": "sha256:bd013db1c5645b3bcaac4ba35b98770ec54dab87767e30826d68fe9b23fd4fe3",
            "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
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
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.job.workflow",
          "object": {
            "kind": "subject",
            "address": {
              "tag": "playbill-semantic-address-v1",
              "artifact_path": "subjects/security.workflow/github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml.json",
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
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "envelope": {
          "identity": "Claim:CLM-af3013cdabfe696e0c094a03c149640b",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/af/CLM-af3013cdabfe696e0c094a03c149640b.json",
          "artifact_digest": "sha256:fd479bc016ea933494082eca9fd416c6fc96ce2efe9510ad898c46802a5bc543",
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
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "key_history_ref": {
                    "principal_path": {
                      "$path": "principals/robertmalone.json"
                    },
                    "semantic_root": {
                      "$digest": "sha256:00d740b46f7efbb82819ea6a99f820d060950a80fec9ad83f0b6448bcfc85dc0"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                },
                {
                  "attestation_digest": {
                    "$digest": "sha256:ca4b6f00866b2bca37c712ea9a915c34bb8ec93ab839760b07b6832c41af56b5"
                  },
                  "kind": "cryptographically_committed",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                      },
                      "generation_root": {
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                      "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                    "instance_id": "inst_bff87e924cbb4f7f",
                    "semantic_root": {
                      "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "subject_path": {
                  "$path": "claims/af/CLM-af3013cdabfe696e0c094a03c149640b.json"
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
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
                  "citation_id": "sha256:364332145d88e4eff49f7e1c10bcfd66d51cfa0889789c9559a7af8a907f848c",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-26T18:55:53.263624Z",
                "subject_content_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                      "end_byte": 36591,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/af/CLM-af3013cdabfe696e0c094a03c149640b.json",
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
              "adjudication_rule_digest": "sha256:22fa6a994de368775b38c2598684d12766bffdeb718ef4401c064d63cc85facd",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:522f6f1c10234e8d528fa640f527b0e07289a0b4049bcd84c1d61749aa21ccc3",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-26T18:55:53.263624Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                  "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000009.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                  },
                  "sequence": 9
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
                  },
                  "generation_root": {
                    "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                  "instance_id": "inst_bff87e924cbb4f7f",
                  "semantic_root": {
                    "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000009.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
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
                "$digest": "sha256:fd479bc016ea933494082eca9fd416c6fc96ce2efe9510ad898c46802a5bc543"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-af3013cdabfe696e0c094a03c149640b"
              },
              "input_digest": {
                "$digest": "sha256:aee194a4b269315baa688e4c52d4aaa7a31956865885bd8aa1004f8dc47649a5"
              },
              "statement_address": {
                "artifact_path": "claims/af/CLM-af3013cdabfe696e0c094a03c149640b.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:522f6f1c10234e8d528fa640f527b0e07289a0b4049bcd84c1d61749aa21ccc3"
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
                  "artifact_digest": "sha256:aa76c97434d258bb0c97f5b6dff866a91121cb9c88e685ff7711d907f6308a47",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.workflow_ref"
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
                  "artifact_digest": "sha256:0000382f589aface5c780acf092bb00c8dbc6cc94dbd9fbd37599d94399bd586",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test"
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
                "$digest": "sha256:fd479bc016ea933494082eca9fd416c6fc96ce2efe9510ad898c46802a5bc543"
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
                        "$digest": "sha256:500d14c1674f74c47a7f5d831d48bf1f03fb162c043cf7cd6a2314a2fe3670ce"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "8ea9f5e27c78a28808651b62c057e67c3fb421c3",
                      "instance_id": "inst_bff87e924cbb4f7f",
                      "semantic_root": {
                        "$digest": "sha256:d93ebf994255f6b8b085fce36eff547a76bb24cbdadcaa696471d5e02671c77a"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:b7fd996a1cde4885260b27123aed637aeee214f9af59694f995e34bd20819bd8"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000009.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:cc6ac0e77828a76547d62c924c5fd4f46639536de8d266f8fc793bc63a22eec2"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:aee194a4b269315baa688e4c52d4aaa7a31956865885bd8aa1004f8dc47649a5"
              },
              "source_compilation_digest": {
                "$digest": "sha256:7c13eab01c68c7a32c3c02bc2806207bc2294311ae9acada7f4404363ccfdb40"
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
                  "content_digest": "sha256:5ab166bcbddd1ccb8ec7cc4be1cee5d0af4491114f81e480528635f96503287e",
                  "end_byte": 36591,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/af/CLM-af3013cdabfe696e0c094a03c149640b.json",
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
                "name": "security.job.workflow_ref"
              },
              "claim_type_digest": "sha256:aa76c97434d258bb0c97f5b6dff866a91121cb9c88e685ff7711d907f6308a47",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "github.com/cruxible-ai/cruxible@main:.github/workflows/ci.yml"
              },
              "predicate": "security.job.workflow_ref",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
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
            "citation_id": "sha256:364332145d88e4eff49f7e1c10bcfd66d51cfa0889789c9559a7af8a907f848c",
            "capture_digest": "sha256:c29d52bc7d7858664916166c45f75e8f98cef5e72fb010b16aa8caa704e1bd13",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.fetched-v1",
            "capture_contract_digest": "sha256:29d4238f896e3ea71125d5072eadba92aba3b9b7568e014a24448a76e480de71",
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
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.job.workflow_ref",
          "object": {
            "kind": "literal",
            "value": "github.com/cruxible-ai/cruxible@main:.github/workflows/ci.yml"
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
