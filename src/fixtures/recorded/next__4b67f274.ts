// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/next 42025a73
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/next",
  "body": {
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "evaluation_time": "2026-11-07T22:22:55.134Z",
    "access_profile": {
      "tag": "playbill-coverage-access-profile-v1",
      "profile_id": "console",
      "permitted_access_classes": [
        "instance",
        "public"
      ]
    },
    "caller_surface": "sdk",
    "limit": 100
  },
  "response": {
    "tag": "playbill-next-result-v2",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "evaluation_time": "2026-11-07T22:22:55.134000Z",
    "observed_domains": [
      "accepted_state"
    ],
    "unobserved_domains": [
      "workspace_floor",
      "workspace_sources",
      "workspace_projections"
    ],
    "status": {
      "tag": "playbill-next-status-v1",
      "blocking": false,
      "instance": {
        "tag": "playbill-next-health-v1",
        "state": "active",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "floor": {
        "tag": "playbill-next-health-v1",
        "state": "not_observed",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "ledger_mirror": {
        "tag": "playbill-next-health-v1",
        "state": "behind",
        "detail": {
          "attempted_at": "2026-11-07T22:22:36.980689+00:00",
          "message": "fatal: unable to access 'https://127.0.0.1:9/cruxible/ledger.git/': Failed to connect to 127.0.0.1 port 9 after 0 ms: Couldn't connect to server",
          "mirror_url": "https://127.0.0.1:9/cruxible/ledger.git",
          "publication_command": "cruxible ledger publish --json",
          "published_sequence": 0,
          "requested_sequence": 2
        },
        "repair": {
          "operation": "hand_edit",
          "target": "https://127.0.0.1:9/cruxible/ledger.git",
          "required_change": "restore_the_ledger_mirror_remote_or_its_credential",
          "arguments": {},
          "command": null
        },
        "repair_hidden": false,
        "repair_requires": null
      },
      "provider_lane": {
        "tag": "playbill-next-health-v1",
        "state": "available",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "procedure_catalog": {
        "tag": "playbill-next-health-v1",
        "state": "not_observed",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "compiler": {
        "tag": "playbill-next-health-v1",
        "state": "current",
        "detail": {
          "accepted_compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
          "accepted_compiler_revision": "runbooks-v1",
          "running_compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf",
          "running_compiler_revision": "runbooks-v1"
        },
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "line_dispatch": {
        "tag": "playbill-next-health-v1",
        "state": "idle",
        "detail": {},
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "consumers": {
        "tag": "playbill-next-health-v1",
        "state": "current",
        "detail": {
          "workers": [
            {
              "curation": {
                "detected_through_generation": null,
                "detection_pending": false,
                "fire_position": 0,
                "last_error": null,
                "state": "running"
              },
              "evidence": {
                "generation": 22,
                "generations_behind": 0,
                "last_error": null,
                "pending_checks": 0,
                "state": "running",
                "sweep_in_progress": false,
                "sweep_position": 0
              },
              "facts": {
                "attestations_behind": false,
                "format": 13,
                "generation": 22,
                "generations_behind": 0,
                "inputs_changed": false,
                "last_error": null,
                "pending_expiry": false,
                "state": "running",
                "sweep_pending": false
              },
              "kind": "next",
              "line_upgrades": {
                "generation": 22,
                "state": "running"
              },
              "prediction": {
                "anchor_retry_position": 0,
                "capture_position": 137,
                "completed_anchor_retry_position": 0,
                "contract_backfill_in_progress": false,
                "contracts": 0,
                "generation": 22,
                "generations_behind": 0,
                "last_error": null,
                "open_windows": 0,
                "pending_anchor_retries": 0,
                "pending_contracts": 0,
                "resolution_position": 0,
                "resolved_windows": 0,
                "state": "running",
                "unbindable_anchors": 0
              },
              "run_failures": {
                "run_failures_pending": false,
                "state": "running"
              },
              "settled_refusals": {
                "settled_counts_pending": false,
                "state": "running"
              },
              "state": "running"
            }
          ]
        },
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "triggers": {
        "tag": "playbill-next-health-v1",
        "state": "scheduled",
        "detail": {
          "scheduled": {
            "evidence.sweep": [
              "Trigger:evidence-sweep"
            ],
            "floor.refresh": [
              "Trigger:floor-refresh"
            ],
            "prediction.anchor_retry": [
              "Trigger:prediction-anchor-retry"
            ]
          }
        },
        "repair": null,
        "repair_hidden": false,
        "repair_requires": null
      },
      "held": 0,
      "prior_refusal_coverage": null
    },
    "items": [
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:6ef72986296d60c7a3ceaff13bd51af32d0c26cc01355ee4613365136e67a667",
        "severity": "blocking",
        "reason": "claim_conflicted",
        "subject_identity": "subjects/security.app_exposure/pkg-maven-com.example-log4j-demo-app-1.0.0--pkg-maven-org.apache.logging.log4j-log4j-api-2.14.1--cve-2021-45046.json",
        "related_identities": [
          "Claim:CLM-3da109f05a7fad21f8831270af0299db",
          "Claim:CLM-453b457d0b9ce1afd675c2f914ed8a69"
        ],
        "detail": {
          "contender_count": 2,
          "predicate": "security.app_exposure.justification",
          "qualifier": null
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.claim.retire",
          "tool": "cruxible_retire",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-11-07T22:22:25.432116+00:00"
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:afd1cc091ad27d3910e7472957273b42e4c67f1bac87febeebb0f0288cf1883c",
        "severity": "warning",
        "reason": "claim_new_evidence_unreviewed",
        "subject_identity": "Claim:CLM-260724b6a176569d560f4d889ca9e36a",
        "related_identities": [
          "Capture:sha256:9b75f24c295fd579c649c7d9dd77967fd6948bf9b99ec84f185dd6f5028c4840",
          "Principal:owner"
        ],
        "detail": {
          "attestation_basis": "new_capture",
          "attestation_envelope_digest": "sha256:5eed1d9560b021670601fc0d997c914868e06e73ae60c1cc521c7abfbaf34a40",
          "attestation_event_digest": "sha256:99b3e68375483250af3bbb14b2f3a81bfe895b6a701c169d9a3751fc81c9f040",
          "attested_at": "2026-11-07T18:40:00+00:00",
          "attesting_principal": "owner",
          "capture_digest": "sha256:9b75f24c295fd579c649c7d9dd77967fd6948bf9b99ec84f185dd6f5028c4840",
          "claim_artifact_digest": "sha256:fdebf7abdfed7b5e5c303c7733481cdc04a5d055c76dd7d6956066c2dc835e0f",
          "claim_id": "CLM-260724b6a176569d560f4d889ca9e36a",
          "current_at_append": true,
          "lineage_status": "proven",
          "stance": "unsure"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.authoring.example",
          "tool": "cruxible_authoring_compile",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-11-07T18:40:00+00:00"
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:ea4ac14b299e5c17c669dc72e9464dc16b8a189aa12705c3d17c6ffed2c97ebc",
        "severity": "warning",
        "reason": "claim_new_evidence_unreviewed",
        "subject_identity": "Claim:CLM-260724b6a176569d560f4d889ca9e36a",
        "related_identities": [
          "Capture:sha256:0239f03a7356b68e57d96164fa3d28dc00efd37e23481e0ce94ba8f76cf769e5",
          "Principal:owner"
        ],
        "detail": {
          "attestation_basis": "new_capture",
          "attestation_envelope_digest": "sha256:5eed1d9560b021670601fc0d997c914868e06e73ae60c1cc521c7abfbaf34a40",
          "attestation_event_digest": "sha256:99b3e68375483250af3bbb14b2f3a81bfe895b6a701c169d9a3751fc81c9f040",
          "attested_at": "2026-11-07T18:40:00+00:00",
          "attesting_principal": "owner",
          "capture_digest": "sha256:0239f03a7356b68e57d96164fa3d28dc00efd37e23481e0ce94ba8f76cf769e5",
          "claim_artifact_digest": "sha256:fdebf7abdfed7b5e5c303c7733481cdc04a5d055c76dd7d6956066c2dc835e0f",
          "claim_id": "CLM-260724b6a176569d560f4d889ca9e36a",
          "current_at_append": true,
          "lineage_status": "proven",
          "stance": "unsure"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.authoring.example",
          "tool": "cruxible_authoring_compile",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-11-07T18:40:00+00:00"
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:b5b33d97317bfaa782c971e6de83de204e89f1b47127b4f692940559d5a6054d",
        "severity": "setup",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.epss-triage",
        "related_identities": [],
        "detail": {
          "detail": "accepted but never enabled; enable it to run on its Triggers"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-10-09T11:59:00+00:00"
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:190c7fbc1df1156ea9f8b9fc8b72b05eb679309b9a0a225e0ab4251479c6a129",
        "severity": "setup",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.kev-triage",
        "related_identities": [],
        "detail": {
          "detail": "accepted but never enabled; enable it to run on its Triggers"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-10-09T11:59:00+00:00"
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:3049d22e55e243c6bd5f8634796f8c6290c10539eccc3db196a3caf54bed19a1",
        "severity": "setup",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.osv-query",
        "related_identities": [],
        "detail": {
          "detail": "accepted but never enabled; enable it to run on its Triggers"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-10-09T11:59:00+00:00"
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:1d37ce725f4b141a7c0a8bde37eac000b7765a894042a5de1d44ed4d9f9116c2",
        "severity": "setup",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.sbom-import.app",
        "related_identities": [],
        "detail": {
          "detail": "accepted but never enabled; enable it to run on its Triggers"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.line.enable",
          "tool": "cruxible_line_enable",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        },
        "since": "2026-10-09T11:59:00+00:00"
      }
    ],
    "total_items": 7,
    "next_cursor": null,
    "result_digest": "sha256:1470dc8a89d38bc946849609afe2caa1dc91157ca4f88947d56374ae55ed5302",
    "delta_since": null,
    "attestation_head_digest": "sha256:6f1ea399a38db206f6558b5f6aa902a0ec10fc4491ca7dbc943910e9a6008986"
  }
});
