// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/next 6045ac91
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/next",
  "body": {
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "evaluation_time": "2026-10-26T19:05:02.812Z",
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
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "evaluation_time": "2026-10-26T19:05:02.812000Z",
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
        "state": "not_configured",
        "detail": {},
        "repair": null,
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
          "accepted_compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
          "accepted_compiler_revision": "light-artifacts-v1",
          "running_compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
          "running_compiler_revision": "light-artifacts-v1"
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
          "line_enablements": {
            "running": 13,
            "stalled": 0,
            "stopped": 0
          },
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
                "generation": 12,
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
                "generation": 12,
                "generations_behind": 0,
                "inputs_changed": false,
                "last_error": null,
                "pending_expiry": false,
                "state": "running",
                "sweep_pending": false
              },
              "kind": "next",
              "line_upgrades": {
                "generation": 12,
                "state": "running"
              },
              "prediction": {
                "anchor_retry_position": 9,
                "capture_position": 522,
                "completed_anchor_retry_position": 9,
                "contract_backfill_in_progress": false,
                "contracts": 0,
                "generation": 12,
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
            },
            {
              "covered": 13,
              "kind": "floor",
              "outcome": {
                "error": null,
                "file_count": 127,
                "generation": 12,
                "status": "written",
                "tag": "playbill-floor-consumer-outcome-v1"
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
        "item_id": "sha256:797d114261ca104319efb8b727597d10cffad09d27bd58a5c9343b871eee7495",
        "severity": "blocking",
        "reason": "claim_conflicted",
        "subject_identity": "subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
        "related_identities": [
          "Claim:CLM-76f9a4e45c6e684f32582bf12b1c690c",
          "Claim:CLM-d8674016342604fe9cf0b887fdb4ade5"
        ],
        "detail": {
          "contender_count": 2,
          "predicate": "security.assessment.status",
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
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_bff87e924cbb4f7f; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: robertmalone)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:370f934edae5a16b635aff8a484b99dce3ce997fa28eff42af30c2c6eaad4deb",
        "severity": "warning",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.credential-import",
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
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_bff87e924cbb4f7f; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: robertmalone)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:77233f24b9d8d4c398ee340ade14878b2f65b0c31eab0f3697d9fbbbcbeba9d3",
        "severity": "warning",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.inventory-import.prod",
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
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_bff87e924cbb4f7f; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: robertmalone)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:4f2a0ff776e60247ea204b31a1b59dd7a89d2fcd80a03a2962b9bbcb2273866d",
        "severity": "warning",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.registry-parse.cruxible-client",
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
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_bff87e924cbb4f7f; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: robertmalone)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:45f67a1f2a91ec8cb6cd64476e8ed68c6239e7ae988121bd34ba844f5a60b9d8",
        "severity": "warning",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.registry-pull.cruxible-client",
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
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_bff87e924cbb4f7f; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: robertmalone)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:dbf7288f3769b86387bc72fcc019da506e0c9ea5a30b284185ce6ac449e57062",
        "severity": "warning",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.sarif-attention.cruxible",
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
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_bff87e924cbb4f7f; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: robertmalone)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:c5279867882e081533d058779749084e5c92b46a60ab3c91a0535147f3f8dd8d",
        "severity": "warning",
        "reason": "line_not_enabled",
        "subject_identity": "Line:security.sarif-import.cruxible",
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
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_bff87e924cbb4f7f; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: robertmalone)",
            "repair": {
              "operation": "cruxible.orient",
              "arguments": {
                "section": "principals",
                "configure": "CRUXIBLE_PRINCIPAL_ID"
              }
            }
          }
        }
      }
    ],
    "total_items": 7,
    "next_cursor": null,
    "result_digest": "sha256:9897f2ca4c8aa968ff8deee5b0ed175a3e1f17a9a11f33ec15f6ef06fc75ca4f",
    "delta_since": null,
    "attestation_head_digest": "sha256:92d2d058e0795709e31de40b6b0ea2315f706eb9c098d9e4be45d51efa4113cd"
  }
});
