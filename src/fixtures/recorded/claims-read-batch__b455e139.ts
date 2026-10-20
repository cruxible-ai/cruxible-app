// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/claims/read-batch 9fae26e7
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/claims/read-batch",
  "body": {
    "claim_ids": [
      "CLM-44e6b964d199142e6b4862cb4c18d465",
      "CLM-f9d88825c8c21434b7291591df255b88",
      "CLM-710aca859fb647641f77cd51f4a94f61",
      "CLM-2c86cc92e24a453d7a4cd456d3599346",
      "CLM-c3e6789b20fe99255f75a87b762f71ab",
      "CLM-9d767fcc25f7f544bb7abe2beca7a275",
      "CLM-4c2631bbaddeb2277e7d6a94e575a0c3"
    ],
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    }
  },
  "response": {
    "tag": "playbill-claim-read-batch-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "claims": [
      {
        "tag": "playbill-claim-read-v2",
        "coordinate_kind": "canonical",
        "coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-44e6b964d199142e6b4862cb4c18d465",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/44/CLM-44e6b964d199142e6b4862cb4c18d465.json",
          "artifact_digest": "sha256:fda21e47e491b9d8ade75f3dd63b11b4381b2d656cf20ebec98e23dad322fd83",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "subject_path": {
                  "$path": "claims/44/CLM-44e6b964d199142e6b4862cb4c18d465.json"
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
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
                  "citation_id": "sha256:5dee8c51c1d6fa0378a987fa5c79ae7ee9c3d81ab7720a3cce64a3e712cf8565",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:00.552880Z",
                "subject_content_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                      "end_byte": 36674,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/44/CLM-44e6b964d199142e6b4862cb4c18d465.json",
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
              "adjudication_rule_digest": "sha256:d74d9b7ac1316486edfe15bae951dede9088c2e749950afb9f228646fe979593",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:742ebefe62c447ae8aae2e73e63b9e48e9423127bc244f06b278aa8f78e50c0a",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:00.552880Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                  "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  },
                  "sequence": 48
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000048.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                "$digest": "sha256:fda21e47e491b9d8ade75f3dd63b11b4381b2d656cf20ebec98e23dad322fd83"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-44e6b964d199142e6b4862cb4c18d465"
              },
              "input_digest": {
                "$digest": "sha256:4f0f257defd85ba662dec7dab13546998f1927c995d214bc3dcb118b930ef65e"
              },
              "statement_address": {
                "artifact_path": "claims/44/CLM-44e6b964d199142e6b4862cb4c18d465.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:742ebefe62c447ae8aae2e73e63b9e48e9423127bc244f06b278aa8f78e50c0a"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:f1bbdbfa2df81778d8e71d4eabc167b216c7fa32b89d47508c5a64ae150b8100",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.environment"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:fda21e47e491b9d8ade75f3dd63b11b4381b2d656cf20ebec98e23dad322fd83"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:4f0f257defd85ba662dec7dab13546998f1927c995d214bc3dcb118b930ef65e"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c9320ec4f14fc9b8317443335aeee4d29c64965e51d94548c05c424b7402fcf2"
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
                  "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                  "end_byte": 36674,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/44/CLM-44e6b964d199142e6b4862cb4c18d465.json",
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
              "claim_type_digest": "sha256:f1bbdbfa2df81778d8e71d4eabc167b216c7fa32b89d47508c5a64ae150b8100",
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
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:5dee8c51c1d6fa0378a987fa5c79ae7ee9c3d81ab7720a3cce64a3e712cf8565",
            "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "retained-security-evidence",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "retained-security-evidence"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-f9d88825c8c21434b7291591df255b88",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/f9/CLM-f9d88825c8c21434b7291591df255b88.json",
          "artifact_digest": "sha256:3079ea6ff81b5eb8c963bbb5b897b014992e0805c199c88c6c54922837dbdf15",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "subject_path": {
                  "$path": "claims/f9/CLM-f9d88825c8c21434b7291591df255b88.json"
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
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
                  "citation_id": "sha256:c2bf479045881be73e80e62a33a91ed35fc48c0ab5d1b8d27b07eda6bc1a633c",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:00.552880Z",
                "subject_content_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                      "end_byte": 36674,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/f9/CLM-f9d88825c8c21434b7291591df255b88.json",
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
              "adjudication_rule_digest": "sha256:f9a85e4c39810f57da21623ec34725852600586c135450bab2c28cd582eb5c8c",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:3dcc373321ecdcb52786186bb9da0b51c85f3a96124267ac8ba905b5f4a899a6",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:00.552880Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                  "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  },
                  "sequence": 48
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000048.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                "$digest": "sha256:3079ea6ff81b5eb8c963bbb5b897b014992e0805c199c88c6c54922837dbdf15"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-f9d88825c8c21434b7291591df255b88"
              },
              "input_digest": {
                "$digest": "sha256:895efba00bfd85f214385bdcee3c67e34cdc2c6fa3dc1afb5bf11fd31a3ac030"
              },
              "statement_address": {
                "artifact_path": "claims/f9/CLM-f9d88825c8c21434b7291591df255b88.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:3dcc373321ecdcb52786186bb9da0b51c85f3a96124267ac8ba905b5f4a899a6"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:081118527535ab25a8f79f48bcfccb8ebc7b6c7b1c3c76657e74776621fbca18",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.job_key"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:3079ea6ff81b5eb8c963bbb5b897b014992e0805c199c88c6c54922837dbdf15"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:895efba00bfd85f214385bdcee3c67e34cdc2c6fa3dc1afb5bf11fd31a3ac030"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c9320ec4f14fc9b8317443335aeee4d29c64965e51d94548c05c424b7402fcf2"
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
                  "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                  "end_byte": 36674,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/f9/CLM-f9d88825c8c21434b7291591df255b88.json",
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
              "claim_type_digest": "sha256:081118527535ab25a8f79f48bcfccb8ebc7b6c7b1c3c76657e74776621fbca18",
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
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:c2bf479045881be73e80e62a33a91ed35fc48c0ab5d1b8d27b07eda6bc1a633c",
            "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "not_admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "not_admitted",
                "rule_id": null,
                "admission": null,
                "refusal_code": "cruxible.evidence.undeclared_contract_kind",
                "closest_rule_id": null
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-710aca859fb647641f77cd51f4a94f61",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/71/CLM-710aca859fb647641f77cd51f4a94f61.json",
          "artifact_digest": "sha256:4b7508feca9d8396e9aa98f813fd85270d24737485dcc28fc9d12bff4598db56",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "subject_path": {
                  "$path": "claims/71/CLM-710aca859fb647641f77cd51f4a94f61.json"
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
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
                  "citation_id": "sha256:54a6f19f0703f586ad90b4fe61690bdd5e56471c7281774e395854f043a40a43",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:00.552880Z",
                "subject_content_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                      "end_byte": 36674,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/71/CLM-710aca859fb647641f77cd51f4a94f61.json",
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
              "adjudication_rule_digest": "sha256:a543e844292f2a81200b7cf84843f4fb137d3fdb6f5bc2a8b7651be68812b53f",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:e92ed3e989482d05b59eeffc7ef851beffa0ca08def14c2b8b3d7abc8177520c",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:00.552880Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                  "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  },
                  "sequence": 48
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000048.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                "$digest": "sha256:4b7508feca9d8396e9aa98f813fd85270d24737485dcc28fc9d12bff4598db56"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-710aca859fb647641f77cd51f4a94f61"
              },
              "input_digest": {
                "$digest": "sha256:0c9e14a9485fe189ffd3b4b7a69bd37cd3b871d7891f4bca061f3d6805429d16"
              },
              "statement_address": {
                "artifact_path": "claims/71/CLM-710aca859fb647641f77cd51f4a94f61.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:e92ed3e989482d05b59eeffc7ef851beffa0ca08def14c2b8b3d7abc8177520c"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:eaf3554965a0a46f147605f599cf901bc4240f4f32f4614d1042fb06564e414c",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.permission"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:4b7508feca9d8396e9aa98f813fd85270d24737485dcc28fc9d12bff4598db56"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:0c9e14a9485fe189ffd3b4b7a69bd37cd3b871d7891f4bca061f3d6805429d16"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c9320ec4f14fc9b8317443335aeee4d29c64965e51d94548c05c424b7402fcf2"
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
                  "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                  "end_byte": 36674,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/71/CLM-710aca859fb647641f77cd51f4a94f61.json",
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
              "claim_type_digest": "sha256:eaf3554965a0a46f147605f599cf901bc4240f4f32f4614d1042fb06564e414c",
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
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:54a6f19f0703f586ad90b4fe61690bdd5e56471c7281774e395854f043a40a43",
            "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "retained-security-evidence",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "retained-security-evidence"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-2c86cc92e24a453d7a4cd456d3599346",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/2c/CLM-2c86cc92e24a453d7a4cd456d3599346.json",
          "artifact_digest": "sha256:dbf70eeac7986eb11abbbd2c65f6ae340f0270112b112bce257c40e38734d092",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "subject_path": {
                  "$path": "claims/2c/CLM-2c86cc92e24a453d7a4cd456d3599346.json"
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
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
                  "citation_id": "sha256:f152aae179499105f7bb668e183a7570b7f2d11400c56b7c6da73fd47bd04940",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:00.552880Z",
                "subject_content_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                      "end_byte": 36674,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/2c/CLM-2c86cc92e24a453d7a4cd456d3599346.json",
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
              "adjudication_rule_digest": "sha256:d962a159bb083f00d3fd80851ac2044455a4b8e39c22d7c271bf2683a1ea2611",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:6eb37276526a0133710bff23760bb30ad8c22b64d67e166c3aaa71a4ffd3e9c0",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:00.552880Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                  "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  },
                  "sequence": 48
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000048.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                "$digest": "sha256:dbf70eeac7986eb11abbbd2c65f6ae340f0270112b112bce257c40e38734d092"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-2c86cc92e24a453d7a4cd456d3599346"
              },
              "input_digest": {
                "$digest": "sha256:1218d817184b3bb3dfb122b2373e779a375bed2775105ba31c04aa967b367a7a"
              },
              "statement_address": {
                "artifact_path": "claims/2c/CLM-2c86cc92e24a453d7a4cd456d3599346.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:6eb37276526a0133710bff23760bb30ad8c22b64d67e166c3aaa71a4ffd3e9c0"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:96de63dafda0341b0e984560fb40ea9c224dccd535aa5785067ec8667c0a899c",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.uses"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:dbf70eeac7986eb11abbbd2c65f6ae340f0270112b112bce257c40e38734d092"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:1218d817184b3bb3dfb122b2373e779a375bed2775105ba31c04aa967b367a7a"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c9320ec4f14fc9b8317443335aeee4d29c64965e51d94548c05c424b7402fcf2"
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
                  "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                  "end_byte": 36674,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/2c/CLM-2c86cc92e24a453d7a4cd456d3599346.json",
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
              "claim_type_digest": "sha256:96de63dafda0341b0e984560fb40ea9c224dccd535aa5785067ec8667c0a899c",
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
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:f152aae179499105f7bb668e183a7570b7f2d11400c56b7c6da73fd47bd04940",
            "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "retained-security-evidence",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "retained-security-evidence"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-c3e6789b20fe99255f75a87b762f71ab",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/c3/CLM-c3e6789b20fe99255f75a87b762f71ab.json",
          "artifact_digest": "sha256:2ef66df129fdb0b062c7330fdab75f44e881ad8e0ed60c614436246e649fa275",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "subject_path": {
                  "$path": "claims/c3/CLM-c3e6789b20fe99255f75a87b762f71ab.json"
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
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
                  "citation_id": "sha256:d7ed0c1215ff7f9d7b535c3f48ffd18493ae20993f879b7fa133be7a909ec22a",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:00.552880Z",
                "subject_content_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                      "end_byte": 36674,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/c3/CLM-c3e6789b20fe99255f75a87b762f71ab.json",
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
              "adjudication_rule_digest": "sha256:d962a159bb083f00d3fd80851ac2044455a4b8e39c22d7c271bf2683a1ea2611",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:62129122372e6b6bffe066c9fb19bb9d768d7dca1df7c1382bab5ec8ccbe1421",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:00.552880Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                  "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  },
                  "sequence": 48
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000048.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                "$digest": "sha256:2ef66df129fdb0b062c7330fdab75f44e881ad8e0ed60c614436246e649fa275"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-c3e6789b20fe99255f75a87b762f71ab"
              },
              "input_digest": {
                "$digest": "sha256:4a5ecfba6f09733f238a38a9231c5b8be62fca148fab836d8a4c17f1fb946964"
              },
              "statement_address": {
                "artifact_path": "claims/c3/CLM-c3e6789b20fe99255f75a87b762f71ab.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:62129122372e6b6bffe066c9fb19bb9d768d7dca1df7c1382bab5ec8ccbe1421"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:96de63dafda0341b0e984560fb40ea9c224dccd535aa5785067ec8667c0a899c",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.uses"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:2ef66df129fdb0b062c7330fdab75f44e881ad8e0ed60c614436246e649fa275"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:4a5ecfba6f09733f238a38a9231c5b8be62fca148fab836d8a4c17f1fb946964"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c9320ec4f14fc9b8317443335aeee4d29c64965e51d94548c05c424b7402fcf2"
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
                  "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                  "end_byte": 36674,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/c3/CLM-c3e6789b20fe99255f75a87b762f71ab.json",
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
              "claim_type_digest": "sha256:96de63dafda0341b0e984560fb40ea9c224dccd535aa5785067ec8667c0a899c",
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
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:d7ed0c1215ff7f9d7b535c3f48ffd18493ae20993f879b7fa133be7a909ec22a",
            "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "retained-security-evidence",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "retained-security-evidence"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-9d767fcc25f7f544bb7abe2beca7a275",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/9d/CLM-9d767fcc25f7f544bb7abe2beca7a275.json",
          "artifact_digest": "sha256:9c9c563ec4c4481516f79b94cda59d20de756c617d18680c8e5afcca663e0f14",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "subject_path": {
                  "$path": "claims/9d/CLM-9d767fcc25f7f544bb7abe2beca7a275.json"
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
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
                  "citation_id": "sha256:3f685b0a4bdf19faa2c1d2277f40dcf8642bd14282d0861a027b4f3a33fba5f2",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": "sha256:0e54bf7b1b1dac61e39d3ae454aa6a6938cb24e6b24c3451026863db7080bdbd",
                "observed_at": "2026-10-19T21:47:00.552880Z",
                "subject_content_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                      "end_byte": 36674,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/9d/CLM-9d767fcc25f7f544bb7abe2beca7a275.json",
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
              "adjudication_rule_digest": "sha256:79b1b105b960378a227c640c76b1bd85da9be1be06c69bd9884c5f66a3946587",
              "authority_basis": [],
              "basis_kinds": [
                "replay_verified"
              ],
              "claim_statement_digest": "sha256:55e58208bbc899f0be93bd6cf5b5ee5951e4ceb079f1d36af046714c6e9f336b",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:00.552880Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                  "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  },
                  "sequence": 48
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000048.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                "$digest": "sha256:9c9c563ec4c4481516f79b94cda59d20de756c617d18680c8e5afcca663e0f14"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-9d767fcc25f7f544bb7abe2beca7a275"
              },
              "input_digest": {
                "$digest": "sha256:76c3d5a8dc01c5be18034227c396e919f9c5f86beac945d2573865cb45023c12"
              },
              "statement_address": {
                "artifact_path": "claims/9d/CLM-9d767fcc25f7f544bb7abe2beca7a275.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:55e58208bbc899f0be93bd6cf5b5ee5951e4ceb079f1d36af046714c6e9f336b"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:79e29a86c903a369abf7019e67e6664bd7810b0ec7e8d8b6a1f36aa8ce221d67",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.workflow"
                  }
                },
                {
                  "artifact_digest": "sha256:0e54bf7b1b1dac61e39d3ae454aa6a6938cb24e6b24c3451026863db7080bdbd",
                  "role": "object-subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:9c9c563ec4c4481516f79b94cda59d20de756c617d18680c8e5afcca663e0f14"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:76c3d5a8dc01c5be18034227c396e919f9c5f86beac945d2573865cb45023c12"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c9320ec4f14fc9b8317443335aeee4d29c64965e51d94548c05c424b7402fcf2"
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
                  "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                  "end_byte": 36674,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/9d/CLM-9d767fcc25f7f544bb7abe2beca7a275.json",
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
              "claim_type_digest": "sha256:79e29a86c903a369abf7019e67e6664bd7810b0ec7e8d8b6a1f36aa8ce221d67",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "address": {
                  "artifact_path": "subjects/security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml.json",
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
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:3f685b0a4bdf19faa2c1d2277f40dcf8642bd14282d0861a027b4f3a33fba5f2",
            "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "admitted",
                "rule_id": "retained-security-evidence",
                "admission": "direct",
                "refusal_code": null,
                "closest_rule_id": "retained-security-evidence"
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
              "artifact_path": "subjects/security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml.json",
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
          "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
          "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
          "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
          "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
        },
        "envelope": {
          "identity": "Claim:CLM-4c2631bbaddeb2277e7d6a94e575a0c3",
          "kind": "claim",
          "format_tag": "playbill-claim-v2",
          "path": "claims/4c/CLM-4c2631bbaddeb2277e7d6a94e575a0c3.json",
          "artifact_digest": "sha256:4c980e006da9140f2fa79dbad852d5343ba51f2e0a4e0c5c868dc5cd0766e72a",
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                      "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                    },
                    "generation_root": {
                      "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                    "instance_id": "inst_be4d690f30d64371",
                    "semantic_root": {
                      "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  }
                },
                "signed_payload_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "subject_path": {
                  "$path": "claims/4c/CLM-4c2631bbaddeb2277e7d6a94e575a0c3.json"
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
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
              ],
              "citations": [
                {
                  "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
                  "citation_id": "sha256:162734a174f81b6141cc0b480b0a3e378b02d9be088cc9ea4cc50551255a1995",
                  "origin": "independent",
                  "role": "evidence",
                  "tag": "playbill-claim-citation-v1"
                }
              ],
              "input_claim_digests": [],
              "reducer_digest": null,
              "referent_context": {
                "object_content_digest": null,
                "observed_at": "2026-10-19T21:47:00.552880Z",
                "subject_content_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                "tag": "playbill-claim-referent-context-v1"
              },
              "source_mappings": [
                {
                  "spans": [
                    {
                      "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                      "end_byte": 36674,
                      "start_byte": 0,
                      "tag": "playbill-content-span-v1"
                    }
                  ],
                  "subject": {
                    "artifact_path": "claims/4c/CLM-4c2631bbaddeb2277e7d6a94e575a0c3.json",
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
              "adjudication_rule_digest": "sha256:b35702b54b65dedd5b4ffa40f6538a8d2e4465ee12e7f73c2cca624adf7655bb",
              "authority_basis": [],
              "basis_kinds": [
                "origin_only"
              ],
              "claim_statement_digest": "sha256:b63e9220e85610dfc231c2f86d017f6929e67ccaf81b3cc4f726833d99e02726",
              "contradicting_evidence_digests": [],
              "control_components": [
                {
                  "control_domains": [
                    "operator"
                  ],
                  "evidence_digests": [
                    "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
                  ],
                  "provider_identities": []
                }
              ],
              "currency": "current",
              "epistemic_grades": [
                "observed"
              ],
              "evaluation_time": "2026-10-19T21:47:00.552880Z",
              "provenance_grades": [
                "daemon-fetched"
              ],
              "refusal_codes": [],
              "supporting_evidence_digests": [
                "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                  "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1"
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
                    "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
                  },
                  "law_identifier": "playbill.claim.v2",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                },
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "law_digest": {
                "$digest": "sha256:eb9f5569f0cb6e444b75740cd57ed8b0c537c9ec2d7ae9a28e05311e32f72d0e"
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
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "history": [
                {
                  "candidate_digest": {
                    "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000048.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                  },
                  "sequence": 48
                }
              ],
              "predecessor_digest": null,
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                  },
                  "generation_root": {
                    "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                  "instance_id": "inst_be4d690f30d64371",
                  "semantic_root": {
                    "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000048.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
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
                "$digest": "sha256:4c980e006da9140f2fa79dbad852d5343ba51f2e0a4e0c5c868dc5cd0766e72a"
              },
              "identity": {
                "kind": "Claim",
                "name": "CLM-4c2631bbaddeb2277e7d6a94e575a0c3"
              },
              "input_digest": {
                "$digest": "sha256:0ad9f31efe0181ed23095d8d2edda9074bc508c555396ad42310bbaeb7518b03"
              },
              "statement_address": {
                "artifact_path": "claims/4c/CLM-4c2631bbaddeb2277e7d6a94e575a0c3.json",
                "selector": {
                  "scheme": "claim-statement-v1",
                  "value": ""
                },
                "tag": "playbill-semantic-address-v1"
              },
              "statement_digest": {
                "$digest": "sha256:b63e9220e85610dfc231c2f86d017f6929e67ccaf81b3cc4f726833d99e02726"
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
                  "artifact_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
                  "role": "capture-contract",
                  "target": {
                    "kind": "CaptureContract",
                    "name": "security.repo-snapshot-v1"
                  }
                },
                {
                  "artifact_digest": "sha256:2d6ba47783b831b48ea389cd41e62c128e32a1b59be0a953beac34dbb454c7ae",
                  "role": "claim-type",
                  "target": {
                    "kind": "ClaimType",
                    "name": "security.job.workflow_ref"
                  }
                },
                {
                  "artifact_digest": "sha256:7d640ecc69834296b8196b59e30b01192a87f02a4fd6c4c2835ba1c316683b6d",
                  "role": "provider",
                  "target": {
                    "kind": "Provider",
                    "name": "security-gate-sources/d2df67d89eacdb502af8f83de31b5c2b5fd5e93627f17a0eb8229d35ef71b065"
                  }
                },
                {
                  "artifact_digest": "sha256:50bcb07e74ec705b4516d60a6bb2c138d0fc3ad67b59767bbd8b5ac53b0f1c5c",
                  "role": "subject",
                  "target": {
                    "kind": "Subject",
                    "name": "security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test"
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
              "actor_id": "gate-owner",
              "artifact_digest": {
                "$digest": "sha256:4c980e006da9140f2fa79dbad852d5343ba51f2e0a4e0c5c868dc5cd0766e72a"
              },
              "basis": [
                {
                  "kind": "replay_verified",
                  "proof_ref": {
                    "accepted_coordinate": {
                      "compiler_digest": {
                        "$digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
                      },
                      "generation_root": {
                        "$digest": "sha256:21bb43181c7bc00789f5f12a12b6ef317da34fcc8577cf80a1b90e7b669cb449"
                      },
                      "git_object_format": "sha1",
                      "git_oid": "e06a4466b5d0d5abe3f981f9a1438635c27a31fc",
                      "instance_id": "inst_be4d690f30d64371",
                      "semantic_root": {
                        "$digest": "sha256:625a008ceba32f7926e1e657390d5326b7ef73526075cb10c338c687aa92b2aa"
                      }
                    },
                    "candidate_digest": {
                      "$digest": "sha256:f452ba638e439264f468154e271bdc770799c055cdfdd0b52e8365931845aa7d"
                    },
                    "change_set_path": {
                      "$path": "changesets/cs-00000000000000000048.json"
                    },
                    "changeset_digest": {
                      "$digest": "sha256:eaf2c2fa8bc12785ca9a8e8826f227240e059c2756c079c9a2deb14a8f3e7d98"
                    }
                  }
                }
              ],
              "input_digest": {
                "$digest": "sha256:0ad9f31efe0181ed23095d8d2edda9074bc508c555396ad42310bbaeb7518b03"
              },
              "source_compilation_digest": {
                "$digest": "sha256:c9320ec4f14fc9b8317443335aeee4d29c64965e51d94548c05c424b7402fcf2"
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
                  "content_digest": "sha256:eaa702896d393a1d459aff077dcef59b37f793924eab3d930f412e4524662b48",
                  "end_byte": 36674,
                  "start_byte": 0,
                  "tag": "playbill-content-span-v1"
                }
              ],
              "subject": {
                "artifact_path": "claims/4c/CLM-4c2631bbaddeb2277e7d6a94e575a0c3.json",
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
              "claim_type_digest": "sha256:2d6ba47783b831b48ea389cd41e62c128e32a1b59be0a953beac34dbb454c7ae",
              "effective_from": null,
              "effective_until": null,
              "object": {
                "kind": "literal",
                "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ci.yml"
              },
              "predicate": "security.job.workflow_ref",
              "qualifier": null,
              "role": "normative",
              "shell_context_digest": null,
              "subject": {
                "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
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
        "admission_evaluation_time": "2026-10-19T21:49:14.351998Z",
        "admission_accounts": [
          {
            "tag": "playbill-capture-admission-account-v1",
            "citation_id": "sha256:162734a174f81b6141cc0b480b0a3e378b02d9be088cc9ea4cc50551255a1995",
            "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
            "citation_role": "evidence",
            "citation_origin": "independent",
            "capture_contract_identity": "CaptureContract:security.repo-snapshot-v1",
            "capture_contract_digest": "sha256:f0d545a2ef769690442ff7b48c936e04fdf6630437deac995349e11b533faf02",
            "status": "not_admitted",
            "decisions": [
              {
                "tag": "playbill-capture-evidence-kind-admission-v1",
                "evidence_kind": "http_response",
                "status": "not_admitted",
                "rule_id": null,
                "admission": null,
                "refusal_code": "cruxible.evidence.undeclared_contract_kind",
                "closest_rule_id": null
              }
            ]
          }
        ],
        "statement": {
          "tag": "playbill-claim-statement-card-v1",
          "subject": {
            "tag": "playbill-semantic-address-v1",
            "artifact_path": "subjects/security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test.json",
            "selector": {
              "scheme": "artifact-v1",
              "value": ""
            }
          },
          "predicate": "security.job.workflow_ref",
          "object": {
            "kind": "literal",
            "value": "github.com/cruxible-ai/cruxible@e848cbb6787262db349912c48d9c008d8068ede8:.github/workflows/ci.yml"
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
