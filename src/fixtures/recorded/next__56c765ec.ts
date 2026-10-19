// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/next 275ec514
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/next",
  "body": {
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "evaluation_time": "2026-10-19T22:16:28.820Z",
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
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "evaluation_time": "2026-10-19T22:16:28.820000Z",
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
          "accepted_compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
          "accepted_compiler_revision": "provider-builds-v1",
          "running_compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
          "running_compiler_revision": "provider-builds-v1"
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
                "generation": 58,
                "generations_behind": 0,
                "last_error": null,
                "pending_checks": 0,
                "state": "running",
                "sweep_in_progress": false,
                "sweep_position": 0
              },
              "facts": {
                "attestations_behind": false,
                "format": 8,
                "generation": 58,
                "generations_behind": 0,
                "inputs_changed": false,
                "last_error": null,
                "pending_expiry": false,
                "state": "running",
                "sweep_pending": false
              },
              "kind": "next",
              "line_upgrades": {
                "generation": 58,
                "state": "running"
              },
              "prediction": {
                "anchor_retry_position": 0,
                "capture_position": 1897,
                "completed_anchor_retry_position": 0,
                "contract_backfill_in_progress": false,
                "contracts": 2,
                "generation": 58,
                "generations_behind": 0,
                "last_error": null,
                "open_windows": 0,
                "pending_anchor_retries": 0,
                "pending_contracts": 0,
                "resolution_position": 236,
                "resolved_windows": 2,
                "state": "running",
                "unbindable_anchors": 0
              },
              "settled_refusals": {
                "settled_counts_pending": false,
                "state": "running"
              },
              "state": "running"
            },
            {
              "covered": 58,
              "kind": "floor",
              "outcome": {
                "error": null,
                "file_count": 200,
                "generation": 58,
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
        "item_id": "sha256:13f6adf84d2e1acc587a40a2f16eef6cf9ffa2f5a0dbcf696ee4287b1041c81c",
        "severity": "repair",
        "reason": "line_inbox_unread",
        "subject_identity": "Line:security.harden",
        "related_identities": [],
        "detail": {
          "detail": "23 new inbox items from Line:security.harden.",
          "unread": 23
        },
        "repair": {
          "operation": "cruxible.inbox.list",
          "target": "Line:security.harden",
          "required_change": "judge_the_lines_unread_inbox_items",
          "arguments": {
            "line": "security.harden",
            "status": "unread"
          },
          "command": "cx.inbox().list(line=\"security.harden\", status=\"unread\")"
        },
        "repair_requires": null
      },
      {
        "tag": "playbill-next-item-v1",
        "item_id": "sha256:734ab9065428179556bd0b648624bae3647b514af0ff57a5ad94aa27e75f353f",
        "severity": "warning",
        "reason": "evidence_expiring",
        "subject_identity": "Claim:CLM-5958666f8557aa56531b939f7e092e60",
        "related_identities": [
          "subjects/security.coverage/pypi-cruxible-client--registry.files.json"
        ],
        "detail": {
          "expirations": [
            {
              "capture_digest": "sha256:6566239b3c5810234913fe6f6bbd87127c541b7808d4408c2243dde42e835c85",
              "expires_at": "2026-10-20T09:44:12.310045Z",
              "observed_at": "2026-10-19T21:44:12.310045Z",
              "tag": "playbill-evidence-freshness-expiration-v1"
            }
          ],
          "predicate": "security.coverage.revision"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
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
        "item_id": "sha256:d497ff9e77b26d92d6bf53ebed1bd8c1b06f211e3d2ddc258054a15f73a4f05a",
        "severity": "warning",
        "reason": "evidence_expiring",
        "subject_identity": "Claim:CLM-7052ca2a7c9a819389901f9dfa41993b",
        "related_identities": [
          "subjects/security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows.json"
        ],
        "detail": {
          "expirations": [
            {
              "capture_digest": "sha256:c5384e30af3db569d3675e523c68c12fef019fb21ca9b73ba5ac3c9a4d7722c1",
              "expires_at": "2026-10-20T09:47:00.303570Z",
              "observed_at": "2026-10-19T21:47:00.303570Z",
              "tag": "playbill-evidence-freshness-expiration-v1"
            }
          ],
          "predicate": "security.coverage.revision"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
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
        "item_id": "sha256:c3aca581d372e397308aaf6333f4b89dd2dbbe574826a8211cd6bcd1f6378be8",
        "severity": "warning",
        "reason": "evidence_expiring",
        "subject_identity": "Claim:CLM-8535bf9214bc303f5c01763e0a47b2e9",
        "related_identities": [
          "subjects/security.coverage/github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest.json"
        ],
        "detail": {
          "expirations": [
            {
              "capture_digest": "sha256:8a5a91ecdacbd534cbe5158108bc7d3a271ca7357b82a55337f59d8f2d016a0d",
              "expires_at": "2026-10-20T09:47:40.693802Z",
              "observed_at": "2026-10-19T21:47:40.693802Z",
              "tag": "playbill-evidence-freshness-expiration-v1"
            }
          ],
          "predicate": "security.coverage.revision"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
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
        "item_id": "sha256:dbbb27338dd0fbff4bd7ce42194f5f284c451d9364ad6a48317a0a5fd55fd08c",
        "severity": "warning",
        "reason": "evidence_expiring",
        "subject_identity": "Claim:CLM-adf497c8bb094e3cf7caaf9a39e27562",
        "related_identities": [
          "subjects/security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows.json"
        ],
        "detail": {
          "expirations": [
            {
              "capture_digest": "sha256:67566c180892c4abaf81ea06481c3ae2a595df62da0453558d23fd7009bfd3ce",
              "expires_at": "2026-10-20T09:45:41.972939Z",
              "observed_at": "2026-10-19T21:45:41.972939Z",
              "tag": "playbill-evidence-freshness-expiration-v1"
            }
          ],
          "predicate": "security.coverage.revision"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
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
        "item_id": "sha256:803264d9dbe56ef8540ee95cf95138e4dd0967da2093c86a6cbdb86fc6d6290e",
        "severity": "warning",
        "reason": "evidence_expiring",
        "subject_identity": "Claim:CLM-dfcd9b564d73cd3f7663c10ed694bdee",
        "related_identities": [
          "subjects/security.coverage/pypi-cruxible--registry.files.json"
        ],
        "detail": {
          "expirations": [
            {
              "capture_digest": "sha256:456472d9f19806228387cf0fdca9e3fd24e9addb2281e631d6604f3095402c61",
              "expires_at": "2026-10-20T09:43:57.664636Z",
              "observed_at": "2026-10-19T21:43:57.664636Z",
              "tag": "playbill-evidence-freshness-expiration-v1"
            }
          ],
          "predicate": "security.coverage.revision"
        },
        "repair": null,
        "repair_requires": {
          "tag": "playbill-next-repair-requirement-v1",
          "operation": "cruxible.set",
          "tool": "cruxible_set",
          "tier": "governed_write",
          "profile": null,
          "because": [
            "tier",
            "authoring"
          ],
          "authoring_refusal": {
            "code": "cruxible.identity.principal_unconfigured",
            "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_be4d690f30d64371; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: gate-owner)",
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
    "total_items": 6,
    "next_cursor": null,
    "result_digest": "sha256:12fc953de3479e7d5ea7fdfd47521400508c85b22ec1952d8282c81851f1776a",
    "delta_since": null,
    "attestation_head_digest": "sha256:e0966becb8965e9dd07b22663a268118df10709dd80ed3ebfd9a673a180fecc5"
  }
});
