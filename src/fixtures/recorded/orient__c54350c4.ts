// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 36539ff0
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:05:02.376075Z",
    "you": {
      "actor": "operator",
      "can_author": false,
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
    },
    "kinds": [
      {
        "kind": "security.artifact",
        "subjects": 6,
        "identity": "keys: security.artifact.target_ref, security.artifact.name (unique)",
        "fields": [
          "built_from",
          "declared_sha256",
          "name",
          "publish_environment",
          "published_by"
        ],
        "more_fields": 5
      },
      {
        "kind": "security.assessment",
        "subjects": 14,
        "identity": "keys: security.assessment.release_id, security.assessment.cve_id (unique)",
        "fields": [
          "component",
          "cve_id",
          "expected_status",
          "justification",
          "release"
        ],
        "more_fields": 3
      },
      {
        "kind": "security.asset",
        "subjects": 0,
        "identity": "keys: security.asset.hostname (unique)",
        "fields": [
          "environment",
          "hostname",
          "installs",
          "internet_exposed",
          "runs"
        ],
        "more_fields": 2
      },
      {
        "kind": "security.audit",
        "subjects": 0,
        "identity": "keys: security.audit.incident_ref, security.audit.service_ref (unique)",
        "fields": [
          "incident",
          "incident_ref",
          "log_source",
          "read",
          "result"
        ],
        "more_fields": 3
      },
      {
        "kind": "security.change",
        "subjects": 3,
        "identity": "keys: security.change.repo_ref, security.change.commit_sha (unique)",
        "fields": [
          "commit_sha",
          "repo_ref"
        ]
      },
      {
        "kind": "security.control",
        "subjects": 0,
        "identity": "minted",
        "fields": [
          "activation",
          "security.control.kind",
          "security.work.assessment",
          "security.work.asset",
          "security.work.audit"
        ],
        "more_fields": 7
      },
      {
        "kind": "security.coverage",
        "subjects": 2,
        "identity": "keys: security.coverage.source, security.coverage.scope (unique)",
        "fields": [
          "looked_for",
          "of",
          "revision",
          "scope",
          "source"
        ]
      },
      {
        "kind": "security.credential",
        "subjects": 0,
        "identity": "keys: security.credential.issuer, security.credential.name (unique)",
        "fields": [
          "issued_at",
          "issued_by",
          "issuer",
          "key_id",
          "name"
        ],
        "more_fields": 3
      },
      {
        "kind": "security.exception",
        "subjects": 0,
        "identity": "minted",
        "fields": [
          "approval",
          "expires_at",
          "security.work.assessment",
          "security.work.asset",
          "security.work.audit"
        ],
        "more_fields": 7
      },
      {
        "kind": "security.finding",
        "subjects": 0,
        "identity": "keys: security.finding.repo_ref, security.finding.weakness, security.finding.locus (unique)",
        "fields": [
          "affects",
          "fixed_by",
          "justification",
          "location",
          "locus"
        ],
        "more_fields": 10
      },
      {
        "kind": "security.incident",
        "subjects": 0,
        "identity": "keys: security.incident.name (unique)",
        "fields": [
          "name",
          "rotation_policy",
          "status",
          "vulnerability",
          "window_start"
        ]
      },
      {
        "kind": "security.job",
        "subjects": 13,
        "identity": "keys: security.job.workflow_ref, security.job.job_key (unique)",
        "fields": [
          "environment",
          "job_key",
          "needs",
          "permission",
          "publishes_to"
        ],
        "more_fields": 4
      },
      {
        "kind": "security.product",
        "subjects": 1,
        "identity": "keys: security.product.name (hint)",
        "fields": [
          "name",
          "supplied_by"
        ]
      },
      {
        "kind": "security.release",
        "subjects": 4,
        "identity": "keys: security.release.product_name, security.release.version (unique)",
        "fields": [
          "component",
          "osv_coverage",
          "product",
          "product_alias",
          "product_name"
        ],
        "more_fields": 2
      },
      {
        "kind": "security.remediation",
        "subjects": 0,
        "identity": "minted",
        "fields": [
          "due_at",
          "progress",
          "revokes_key",
          "security.work.assessment",
          "security.work.asset"
        ],
        "more_fields": 9
      },
      {
        "kind": "security.repo",
        "subjects": 1,
        "identity": "keys: security.repo.forge_host, security.repo.full_name (unique)",
        "fields": [
          "forge_host",
          "full_name"
        ]
      },
      {
        "kind": "security.service",
        "subjects": 0,
        "identity": "keys: security.service.name (hint)",
        "fields": [
          "criticality",
          "log_source",
          "name",
          "owned_by"
        ]
      },
      {
        "kind": "security.signal",
        "subjects": 0,
        "identity": "keys: security.signal.detector, security.signal.fingerprint (unique)",
        "fields": [
          "detector",
          "explained_by",
          "fingerprint",
          "observed"
        ]
      },
      {
        "kind": "security.supplier",
        "subjects": 1,
        "identity": "keys: security.supplier.name (hint)",
        "fields": [
          "name"
        ]
      },
      {
        "kind": "security.target",
        "subjects": 1,
        "identity": "keys: security.target.registry, security.target.name (unique)",
        "fields": [
          "name",
          "publish_gate",
          "registry",
          "source_repo"
        ]
      },
      {
        "kind": "security.team",
        "subjects": 0,
        "identity": "keys: security.team.name (hint)",
        "fields": [
          "name"
        ]
      },
      {
        "kind": "security.vulnerability",
        "subjects": 14,
        "identity": "keys: security.vulnerability.cve_id (unique)",
        "fields": [
          "affected_product",
          "cve_id",
          "epss_percentile",
          "epss_score",
          "kev_date_added"
        ],
        "more_fields": 7
      },
      {
        "kind": "security.workflow",
        "subjects": 8,
        "identity": "keys: security.workflow.source, security.workflow.path (unique)",
        "fields": [
          "coverage",
          "path",
          "repo",
          "source",
          "trigger"
        ]
      }
    ],
    "artifacts": {
      "claim_types": 139,
      "procedures": 28,
      "documents": 1,
      "queries": 50,
      "interfaces": 23,
      "lines": 19,
      "captures": 7,
      "capture_contracts": 6,
      "resolution_contracts": 0,
      "mandates": 11,
      "runs": 21,
      "running": 0,
      "claims": {
        "accepted": 374,
        "conflicted": 2,
        "overturned": 0,
        "ineligible": 0,
        "retired": 0
      }
    },
    "attention": {
      "next_items": 7,
      "open_proposals": 1,
      "top": [
        "blocking claim_conflicted: subjects/security.assessment/gate-app-1.0.0--cve-2021-44228.json",
        "warning line_not_enabled: Line:security.credential-import",
        "warning line_not_enabled: Line:security.inventory-import.prod"
      ],
      "enablements": {
        "running": 13,
        "stalled": 0,
        "stopped": 0
      }
    },
    "queries": [
      {
        "name": "security.applicability_coverage",
        "description": "Every installed release with its assessment for one vulnerability. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": [
          "vulnerability: subject_reference"
        ]
      },
      {
        "name": "security.assessment_index",
        "description": "Every assessment with its key, status, the status's role (normative: an analyst's judgment) and justification. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": []
      },
      {
        "name": "security.audit_status",
        "description": "RQ3 for one incident: every audit (one per service) with its log sources and the service's (service_log_source), complete reads, window end and result (conflict while disputed); the respond Line unions the reads per source against the window. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": [
          "incident: string"
        ]
      },
      {
        "name": "security.change_impact",
        "description": "Asset links to one vulnerability's assessments and remediation. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": [
          "vulnerability: subject_reference"
        ]
      },
      {
        "name": "security.controls",
        "description": "Compensating controls and evidence. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": []
      },
      {
        "name": "security.coverage_gaps",
        "description": "Installed releases unassessed or inconclusive for one vulnerability. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": [
          "vulnerability: subject_reference"
        ]
      },
      {
        "name": "security.coverage_index",
        "description": "One source's coverage (source, scope) with the revision it was read at and what it belongs to, stale or current: the parse Procedures' tap. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": [
          "scope: string",
          "source: string"
        ]
      },
      {
        "name": "security.credentialed_jobs",
        "description": "HQ2: every job of a covered source of a gated target's repository, with its permissions, secrets, environment and triggers. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": []
      },
      {
        "name": "security.deployments",
        "description": "Every asset, with its inventory coverage (revision and looked_for: stale, missing or erased reads absent), its current nones (include runs: asset.runs inverses) and every release it declares installing (components, OSV coverage): the respond Line enumerates deployments from it, never through assessments, so an unscanned or unassessed deployment is a gap, never silence. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": []
      },
      {
        "name": "security.exceptions",
        "description": "Scoped risk exceptions and expiry. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": []
      }
    ],
    "truncated": false,
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "f3765015f78f",
        "generation": 12
      },
      "fields": [
        "attention.enablements",
        "artifacts.runs",
        "artifacts.running"
      ]
    },
    "next": [
      "cx.orient(kind=\"security.vulnerability\")",
      "cx.query(kind=\"security.vulnerability\", select=[\"affected_product\", \"cve_id\", \"epss_percentile\"], limit=10)",
      "cx.next(expiring_within=Duration.days(count=7))",
      "cx.orient(section=\"queries\")",
      "cx.orient(section=\"interfaces\")",
      "cx.orient(section=\"lines\")"
    ]
  }
});
