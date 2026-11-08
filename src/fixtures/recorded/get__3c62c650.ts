// Recorded from cruxible-core 43155c13550cd3423be94ac3831dbfba51f1dd79 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get f64d70b4
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Document:security.guidance.dependency",
    "detail": "proof",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk"
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "Document:security.guidance.dependency",
    "kind": "document",
    "detail": "proof",
    "proof": {
      "tag": "playbill-document-read-v1",
      "coordinate_kind": "canonical",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
        "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
        "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
        "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
      },
      "envelope": {
        "identity": "document:security.guidance.dependency",
        "kind": "document",
        "format_tag": "playbill-document-v1",
        "path": "documents/security.guidance.dependency.json",
        "artifact_digest": "sha256:6227df70d1c6dd3a83e982388c088379e82d58af84532ced77982d1a69b0e7fd",
        "predecessor_digest": null,
        "revision": 1
      },
      "facts": [
        {
          "schema_id": "cruxible.document.attestation_coverage",
          "schema_version": 1,
          "fact_key": "accepted_approvals",
          "value": {
            "attestations": [],
            "basis": [
              {
                "kind": "authority_ruled",
                "law_digest": {
                  "$digest": "sha256:90c2549db6b3eb98722a2adab2d5dd5f0eecf87bc90b539fc70407f982dd32ab"
                },
                "law_identifier": "playbill.document.v1",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                    },
                    "generation_root": {
                      "$digest": "sha256:d7a114f8d4776430e38f682889e9f21e10b567d83464c09e050702ea062f3144"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:ff4c2d37d9f03be4794321446838767a5d9589925d16f5fa5bdd2527ca23f881"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000012.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
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
                      "$digest": "sha256:d7a114f8d4776430e38f682889e9f21e10b567d83464c09e050702ea062f3144"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:ff4c2d37d9f03be4794321446838767a5d9589925d16f5fa5bdd2527ca23f881"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000012.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
                  }
                }
              }
            ],
            "coverage_binding": {
              "coverage": "containing_change_set",
              "proof_ref": {
                "accepted_coordinate": {
                  "compiler_digest": {
                    "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                  },
                  "generation_root": {
                    "$digest": "sha256:d7a114f8d4776430e38f682889e9f21e10b567d83464c09e050702ea062f3144"
                  },
                  "git_object_format": "sha1",
                  "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
                  "instance_id": "inst_console05",
                  "semantic_root": {
                    "$digest": "sha256:ff4c2d37d9f03be4794321446838767a5d9589925d16f5fa5bdd2527ca23f881"
                  }
                },
                "candidate_digest": {
                  "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000012.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
                }
              },
              "signed_payload_digest": {
                "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
              },
              "subject_path": {
                "$path": "documents/security.guidance.dependency.json"
              }
            }
          }
        },
        {
          "schema_id": "cruxible.document.governance",
          "schema_version": 1,
          "fact_key": "accepted_governance",
          "value": {
            "activation_policy": "snapshot",
            "approval_requirements": [],
            "basis": [
              {
                "kind": "authority_ruled",
                "law_digest": {
                  "$digest": "sha256:90c2549db6b3eb98722a2adab2d5dd5f0eecf87bc90b539fc70407f982dd32ab"
                },
                "law_identifier": "playbill.document.v1",
                "proof_ref": {
                  "accepted_coordinate": {
                    "compiler_digest": {
                      "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                    },
                    "generation_root": {
                      "$digest": "sha256:d7a114f8d4776430e38f682889e9f21e10b567d83464c09e050702ea062f3144"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:ff4c2d37d9f03be4794321446838767a5d9589925d16f5fa5bdd2527ca23f881"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000012.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
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
                      "$digest": "sha256:d7a114f8d4776430e38f682889e9f21e10b567d83464c09e050702ea062f3144"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:ff4c2d37d9f03be4794321446838767a5d9589925d16f5fa5bdd2527ca23f881"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000012.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
                  }
                }
              }
            ],
            "law_digest": {
              "$digest": "sha256:90c2549db6b3eb98722a2adab2d5dd5f0eecf87bc90b539fc70407f982dd32ab"
            },
            "law_identifier": "playbill.document.v1",
            "required_tier": "governed_write"
          }
        },
        {
          "schema_id": "cruxible.document.history",
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
                      "$digest": "sha256:d7a114f8d4776430e38f682889e9f21e10b567d83464c09e050702ea062f3144"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:ff4c2d37d9f03be4794321446838767a5d9589925d16f5fa5bdd2527ca23f881"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000012.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
                  }
                }
              }
            ],
            "history": [
              {
                "candidate_digest": {
                  "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
                },
                "change_set_path": {
                  "$path": "changesets/cs-00000000000000000012.json"
                },
                "changeset_digest": {
                  "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
                },
                "sequence": 12
              }
            ],
            "predecessor_digest": null,
            "proof_ref": {
              "accepted_coordinate": {
                "compiler_digest": {
                  "$digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
                },
                "generation_root": {
                  "$digest": "sha256:d7a114f8d4776430e38f682889e9f21e10b567d83464c09e050702ea062f3144"
                },
                "git_object_format": "sha1",
                "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
                "instance_id": "inst_console05",
                "semantic_root": {
                  "$digest": "sha256:ff4c2d37d9f03be4794321446838767a5d9589925d16f5fa5bdd2527ca23f881"
                }
              },
              "candidate_digest": {
                "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
              },
              "change_set_path": {
                "$path": "changesets/cs-00000000000000000012.json"
              },
              "changeset_digest": {
                "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
              }
            }
          }
        },
        {
          "schema_id": "cruxible.document.metadata",
          "schema_version": 1,
          "fact_key": "metadata",
          "value": {
            "document_kind": "security.guidance",
            "governance_scope": [
              "security"
            ],
            "lifecycle": {
              "activation_policy": "snapshot",
              "revision": 1,
              "status": "active"
            },
            "media_type": "text/markdown",
            "title": "Judging a dependency exposure"
          }
        },
        {
          "schema_id": "cruxible.document.provenance",
          "schema_version": 1,
          "fact_key": "accepted_source",
          "value": {
            "actor_id": "owner",
            "artifact_digest": {
              "$digest": "sha256:6227df70d1c6dd3a83e982388c088379e82d58af84532ced77982d1a69b0e7fd"
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
                      "$digest": "sha256:d7a114f8d4776430e38f682889e9f21e10b567d83464c09e050702ea062f3144"
                    },
                    "git_object_format": "sha1",
                    "git_oid": "73f0e957e88dd38b338e7acba70803bfe8207f40",
                    "instance_id": "inst_console05",
                    "semantic_root": {
                      "$digest": "sha256:ff4c2d37d9f03be4794321446838767a5d9589925d16f5fa5bdd2527ca23f881"
                    }
                  },
                  "candidate_digest": {
                    "$digest": "sha256:3e411d002d5f1d67fff612914f54f6ed47555bd566db0a1f36a8440b50e42796"
                  },
                  "change_set_path": {
                    "$path": "changesets/cs-00000000000000000012.json"
                  },
                  "changeset_digest": {
                    "$digest": "sha256:048472431132d649e9082908612bdb96b5d2adaf79daba57769d4fdb5f3cc6be"
                  }
                }
              }
            ],
            "input_digest": {
              "$digest": "sha256:bee11d6d9804c9504418339c8632964881e8bae2431925831e9cd4555cd2cb47"
            },
            "source_compilation_digest": null
          }
        },
        {
          "schema_id": "cruxible.document.references",
          "schema_version": 1,
          "fact_key": "declared",
          "value": {
            "links": [
              {
                "relation": "guides",
                "target_identity": "ClaimType:security.app_exposure.justification"
              },
              {
                "relation": "guides",
                "target_identity": "ClaimType:security.exposure.justification"
              }
            ],
            "pins": []
          }
        },
        {
          "schema_id": "cruxible.document.source_mapping",
          "schema_version": 1,
          "fact_key": "whole_body",
          "value": {
            "spans": [
              {
                "content_digest": "sha256:f39e13a9fd9290b9a623d5c01521c03ef8a04fe789c92c22b1af206fdd1f28f8",
                "end_byte": 3748,
                "start_byte": 0,
                "tag": "playbill-content-span-v1"
              }
            ],
            "subject": {
              "artifact_path": "documents/security.guidance.dependency.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "tag": "playbill-source-mapping-v1"
          }
        },
        {
          "schema_id": "cruxible.document.subject",
          "schema_version": 1,
          "fact_key": "whole_document",
          "value": {
            "address": {
              "artifact_path": "documents/security.guidance.dependency.json",
              "selector": {
                "scheme": "artifact-v1",
                "value": ""
              },
              "tag": "playbill-semantic-address-v1"
            },
            "body_digest": {
              "$digest": "sha256:f39e13a9fd9290b9a623d5c01521c03ef8a04fe789c92c22b1af206fdd1f28f8"
            },
            "envelope_digest": {
              "$digest": "sha256:6227df70d1c6dd3a83e982388c088379e82d58af84532ced77982d1a69b0e7fd"
            },
            "input_digest": {
              "$digest": "sha256:bee11d6d9804c9504418339c8632964881e8bae2431925831e9cd4555cd2cb47"
            }
          }
        }
      ]
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "accepted_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "evaluation_time": "2026-11-08T19:48:00.863556Z"
  }
});
