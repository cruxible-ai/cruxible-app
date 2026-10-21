// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient fda5f09f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-21T19:49:21.843415Z",
    "you": {
      "actor": "operator",
      "can_author": false,
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
    },
    "kinds": [
      {
        "kind": "security.artifact",
        "subjects": 19,
        "identity": "keys: security.artifact.target_ref, security.artifact.name (unique)",
        "predicates": [
          {
            "name": "built_from",
            "predicate": "security.artifact.built_from",
            "cardinality": "one",
            "type": "subject:security.change",
            "description": "The commit the artifact was built from.",
            "evidence": [
              "security.github-api-v1",
              "security.github-release-v1",
              "security.pypi-release-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "declared_sha256",
            "predicate": "security.artifact.declared_sha256",
            "cardinality": "one",
            "type": "string",
            "description": "The digest a release manifest in the repository declares for the artifact.",
            "evidence": [
              "security.repo-snapshot-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "name",
            "predicate": "security.artifact.name",
            "cardinality": "one",
            "type": "string",
            "description": "The published file's name (a release asset as tag/asset); with target_ref, the artifact's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "publish_environment",
            "predicate": "security.artifact.publish_environment",
            "cardinality": "one",
            "type": "string",
            "description": "The deployment environment the publishing run used, as provenance states it, or none.",
            "evidence": [
              "security.pypi-release-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "published_by",
            "predicate": "security.artifact.published_by",
            "cardinality": "one",
            "type": "subject:security.workflow",
            "description": "The workflow (at the commit it ran from) that published the artifact, as its provenance states.",
            "evidence": [
              "security.github-release-v1",
              "security.pypi-release-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "release",
            "predicate": "security.artifact.release",
            "cardinality": "one",
            "type": "subject:security.release",
            "description": "The release the artifact is a file of: joins the SBOM, OSV and KEV path.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.github-release-v1",
              "security.pypi-release-v1"
            ]
          },
          {
            "name": "sha256",
            "predicate": "security.artifact.sha256",
            "cardinality": "one",
            "type": "string",
            "description": "The digest of the bytes the target serves (PyPI's digest, or a fetched asset's).",
            "evidence": [
              "security.github-release-v1",
              "security.pypi-release-v1",
              "security.release-asset-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "target",
            "predicate": "security.artifact.target",
            "cardinality": "one",
            "type": "subject:security.target",
            "description": "The target the artifact is published to.",
            "evidence": [
              "security.github-release-v1",
              "security.pypi-release-v1",
              "security.repo-snapshot-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "target_ref",
            "predicate": "security.artifact.target_ref",
            "cardinality": "one",
            "type": "string",
            "description": "The artifact's target as registry/name; with name, the artifact's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "uploaded_by",
            "predicate": "security.artifact.uploaded_by",
            "cardinality": "one",
            "type": "string",
            "description": "Who uploaded the release asset (login).",
            "evidence": [
              "security.github-release-v1"
            ],
            "evidence_requirement": "captured"
          }
        ]
      },
      {
        "kind": "security.assessment",
        "subjects": 31,
        "identity": "keys: security.assessment.release_id, security.assessment.cve_id (unique)",
        "predicates": [
          {
            "name": "cve_id",
            "predicate": "security.assessment.cve_id",
            "cardinality": "one",
            "type": "string",
            "description": "The CVE this assessment is about; with release_id, the assessment's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "expected_status",
            "predicate": "security.assessment.expected_status",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "affected",
              "not_affected"
            ],
            "description": "An agent's stated bet on the assessment's status before a source observes it; predictions test it against security.assessment.status.",
            "evidence_requirement": "none"
          },
          {
            "name": "justification",
            "predicate": "security.assessment.justification",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "component_not_present",
              "inline_mitigations_already_exist",
              "vulnerable_code_cannot_be_controlled_by_adversary",
              "vulnerable_code_not_in_execute_path",
              "vulnerable_code_not_present"
            ],
            "description": "Why a not_affected release is not affected (the VEX/CSAF justification): an observation from a source, or (normative) an analyst's judgment.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.cve-record-http-v1",
              "security.observation-output-v1",
              "security.osv-query-v1",
              "security.workspace-evidence-v1"
            ]
          },
          {
            "name": "release",
            "predicate": "security.assessment.release",
            "cardinality": "one",
            "type": "subject:security.release",
            "description": "The release this applicability assessment is about.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.cve-record-http-v1",
              "security.osv-query-v1"
            ]
          },
          {
            "name": "release_id",
            "predicate": "security.assessment.release_id",
            "cardinality": "one",
            "type": "string",
            "description": "The id of the release this assessment is about; with cve_id, the assessment's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "status",
            "predicate": "security.assessment.status",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "affected",
              "inconclusive",
              "not_affected"
            ],
            "description": "Whether the release is affected by the vulnerability.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.cve-record-http-v1",
              "security.observation-output-v1",
              "security.osv-query-v1",
              "security.workspace-evidence-v1"
            ]
          },
          {
            "name": "vulnerability",
            "predicate": "security.assessment.vulnerability",
            "cardinality": "one",
            "type": "subject:security.vulnerability",
            "description": "The vulnerability this applicability assessment is about.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.cve-record-http-v1",
              "security.osv-query-v1"
            ]
          }
        ]
      },
      {
        "kind": "security.asset",
        "subjects": 1,
        "identity": "keys: security.asset.hostname (unique)",
        "predicates": [
          {
            "name": "environment",
            "predicate": "security.asset.environment",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "production",
              "staging"
            ],
            "description": "The environment the asset runs in.",
            "evidence_requirement": "none"
          },
          {
            "name": "hostname",
            "predicate": "security.asset.hostname",
            "cardinality": "one",
            "type": "string",
            "description": "The asset's hostname; its key.",
            "evidence_requirement": "none"
          },
          {
            "name": "installs",
            "predicate": "security.asset.installs",
            "cardinality": "many",
            "type": "subject:security.release",
            "description": "A software release installed on the asset.",
            "evidence_requirement": "none"
          },
          {
            "name": "internet_exposed",
            "predicate": "security.asset.internet_exposed",
            "cardinality": "one",
            "type": "boolean",
            "description": "Whether the asset is reachable from the internet.",
            "evidence_requirement": "none"
          },
          {
            "name": "serves",
            "predicate": "security.asset.serves",
            "cardinality": "many",
            "type": "subject:security.service",
            "description": "A service the asset serves.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.change",
        "subjects": 4,
        "identity": "keys: security.change.repo_ref, security.change.commit_sha (unique)",
        "predicates": [
          {
            "name": "commit_sha",
            "predicate": "security.change.commit_sha",
            "cardinality": "one",
            "type": "string",
            "description": "The commit SHA; with repo_ref, the change's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "repo_ref",
            "predicate": "security.change.repo_ref",
            "cardinality": "one",
            "type": "string",
            "description": "The change's repository as host/owner/repo; with commit_sha, its key.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.control",
        "subjects": 0,
        "identity": "minted",
        "predicates": [
          {
            "name": "activation",
            "predicate": "security.control.activation",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "declared_active",
              "planned",
              "retired"
            ],
            "description": "Whether the compensating control is active.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.control.kind",
            "predicate": "security.control.kind",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "access_restriction",
              "monitoring",
              "network_isolation"
            ],
            "description": "The kind of compensating control.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.assessment",
            "predicate": "security.work.assessment",
            "cardinality": "one",
            "type": "subject:security.assessment",
            "description": "The assessment this work item answers.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.asset",
            "predicate": "security.work.asset",
            "cardinality": "one",
            "type": "subject:security.asset",
            "description": "The asset this work item covers.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.job",
            "predicate": "security.work.job",
            "cardinality": "one",
            "type": "subject:security.job",
            "description": "The job this work item changes.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.owner",
            "predicate": "security.work.owner",
            "cardinality": "one",
            "type": "subject:security.team",
            "description": "The team accountable for this work item.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.rationale",
            "predicate": "security.work.rationale",
            "cardinality": "one",
            "type": "string",
            "description": "Why this work item exists.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.review_at",
            "predicate": "security.work.review_at",
            "cardinality": "one",
            "type": "datetime",
            "description": "When this work item is next reviewed.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.verification",
            "predicate": "security.work.verification",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "failed",
              "inconclusive",
              "verified"
            ],
            "description": "Whether the work was verified, as observed from retained evidence.",
            "evidence": [
              "security.observation-output-v1"
            ],
            "evidence_requirement": "captured"
          }
        ]
      },
      {
        "kind": "security.coverage",
        "subjects": 5,
        "identity": "keys: security.coverage.source, security.coverage.scope (unique)",
        "predicates": [
          {
            "name": "of",
            "predicate": "security.coverage.of",
            "cardinality": "one",
            "type": "subject:security.repo,security.target",
            "description": "What the source belongs to: a repository, or a registry target.",
            "evidence": [
              "security.pypi-release-v1",
              "security.repo-snapshot-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "revision",
            "predicate": "security.coverage.revision",
            "cardinality": "one",
            "type": "string",
            "description": "The revision every file was read at: a commit SHA, or the digest of a registry's served file set, re-read on every pull and stale 12 h after the last.",
            "evidence": [
              "security.pypi-release-v1",
              "security.repo-snapshot-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "scope",
            "predicate": "security.coverage.scope",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "ci.workflows",
              "registry.files",
              "release.manifest"
            ],
            "description": "What was read in full: ci.workflows, release.manifest or registry.files.",
            "evidence_requirement": "none"
          },
          {
            "name": "source",
            "predicate": "security.coverage.source",
            "cardinality": "one",
            "type": "string",
            "description": "The fully read source (host/owner/repo@ref:path, or registry/name); with scope, the coverage's key.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.exception",
        "subjects": 0,
        "identity": "minted",
        "predicates": [
          {
            "name": "approval",
            "predicate": "security.exception.approval",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "approved",
              "revoked"
            ],
            "description": "Whether the risk exception is approved.",
            "evidence_requirement": "none"
          },
          {
            "name": "expires_at",
            "predicate": "security.exception.expires_at",
            "cardinality": "one",
            "type": "datetime",
            "description": "When the risk exception expires.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.assessment",
            "predicate": "security.work.assessment",
            "cardinality": "one",
            "type": "subject:security.assessment",
            "description": "The assessment this work item answers.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.asset",
            "predicate": "security.work.asset",
            "cardinality": "one",
            "type": "subject:security.asset",
            "description": "The asset this work item covers.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.job",
            "predicate": "security.work.job",
            "cardinality": "one",
            "type": "subject:security.job",
            "description": "The job this work item changes.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.owner",
            "predicate": "security.work.owner",
            "cardinality": "one",
            "type": "subject:security.team",
            "description": "The team accountable for this work item.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.rationale",
            "predicate": "security.work.rationale",
            "cardinality": "one",
            "type": "string",
            "description": "Why this work item exists.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.review_at",
            "predicate": "security.work.review_at",
            "cardinality": "one",
            "type": "datetime",
            "description": "When this work item is next reviewed.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.verification",
            "predicate": "security.work.verification",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "failed",
              "inconclusive",
              "verified"
            ],
            "description": "Whether the work was verified, as observed from retained evidence.",
            "evidence": [
              "security.observation-output-v1"
            ],
            "evidence_requirement": "captured"
          }
        ]
      },
      {
        "kind": "security.job",
        "subjects": 26,
        "identity": "keys: security.job.workflow_ref, security.job.job_key (unique)",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "predicates": [
          {
            "name": "environment",
            "predicate": "security.job.environment",
            "cardinality": "one",
            "type": "string",
            "description": "The deployment environment the job runs in, or none.",
            "evidence_requirement": "captured"
          },
          {
            "name": "job_key",
            "predicate": "security.job.job_key",
            "cardinality": "one",
            "type": "string",
            "description": "The job's key in its workflow file; with workflow_ref, the job's key.",
            "evidence": [],
            "evidence_requirement": "none"
          },
          {
            "name": "needs",
            "predicate": "security.job.needs",
            "cardinality": "many",
            "type": "subject:security.job",
            "description": "A job this job waits for.",
            "evidence_requirement": "captured"
          },
          {
            "name": "permission",
            "predicate": "security.job.permission",
            "cardinality": "many",
            "type": "string",
            "description": "An effective token permission as scope:level (the workflow default applied; token:repository-default when none is declared).",
            "evidence_requirement": "captured"
          },
          {
            "name": "publishes_to",
            "predicate": "security.job.publishes_to",
            "cardinality": "many",
            "type": "subject:security.target",
            "description": "A target the job can publish to: it holds the credential the registry accepts (the analysis provider's publish rule table).",
            "evidence_requirement": "captured"
          },
          {
            "name": "secret",
            "predicate": "security.job.secret",
            "cardinality": "many",
            "type": "string",
            "description": "A secret the job references (GITHUB_TOKEN included; *inherit for secrets: inherit).",
            "evidence_requirement": "captured"
          },
          {
            "name": "uses",
            "predicate": "security.job.uses",
            "cardinality": "many",
            "type": "string",
            "description": "An action or reusable workflow the job runs, as pkg:githubactions/owner/repo[/path]@ref.",
            "evidence_requirement": "captured"
          },
          {
            "name": "workflow",
            "predicate": "security.job.workflow",
            "cardinality": "one",
            "type": "subject:security.workflow",
            "description": "The workflow the job is declared in.",
            "evidence_requirement": "captured"
          },
          {
            "name": "workflow_ref",
            "predicate": "security.job.workflow_ref",
            "cardinality": "one",
            "type": "string",
            "description": "The job's workflow as source:path; with job_key, the job's key.",
            "evidence": [],
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.product",
        "subjects": 4,
        "identity": "keys: security.product.name (hint)",
        "predicates": [
          {
            "name": "name",
            "predicate": "security.product.name",
            "cardinality": "one",
            "type": "string",
            "description": "The product's name; its key.",
            "evidence_requirement": "none"
          },
          {
            "name": "supplied_by",
            "predicate": "security.product.supplied_by",
            "cardinality": "one",
            "type": "subject:security.supplier",
            "description": "The supplier of the product.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.cyclonedx-sbom-v1"
            ]
          }
        ]
      },
      {
        "kind": "security.release",
        "subjects": 13,
        "identity": "keys: security.release.product_name, security.release.version (unique)",
        "predicates": [
          {
            "name": "component",
            "predicate": "security.release.component",
            "cardinality": "many",
            "type": "string",
            "description": "A component of the release, as its package URL with version (purl@version), observed in an SBOM.",
            "evidence": [
              "security.cyclonedx-sbom-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "product",
            "predicate": "security.release.product",
            "cardinality": "one",
            "type": "subject:security.product",
            "description": "The product this release is a version of.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.cyclonedx-sbom-v1"
            ]
          },
          {
            "name": "product_name",
            "predicate": "security.release.product_name",
            "cardinality": "one",
            "type": "string",
            "description": "The product's name; with version, the release's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "version",
            "predicate": "security.release.version",
            "cardinality": "one",
            "type": "string",
            "description": "The release's version string; with product_name, the release's key.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.remediation",
        "subjects": 1,
        "identity": "minted",
        "predicates": [
          {
            "name": "due_at",
            "predicate": "security.remediation.due_at",
            "cardinality": "one",
            "type": "datetime",
            "description": "When the remediation is due.",
            "evidence_requirement": "none"
          },
          {
            "name": "progress",
            "predicate": "security.remediation.progress",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "cancelled",
              "completed",
              "in_progress",
              "planned"
            ],
            "description": "Where the remediation stands.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.assessment",
            "predicate": "security.work.assessment",
            "cardinality": "one",
            "type": "subject:security.assessment",
            "description": "The assessment this work item answers.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.asset",
            "predicate": "security.work.asset",
            "cardinality": "one",
            "type": "subject:security.asset",
            "description": "The asset this work item covers.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.job",
            "predicate": "security.work.job",
            "cardinality": "one",
            "type": "subject:security.job",
            "description": "The job this work item changes.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.owner",
            "predicate": "security.work.owner",
            "cardinality": "one",
            "type": "subject:security.team",
            "description": "The team accountable for this work item.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.rationale",
            "predicate": "security.work.rationale",
            "cardinality": "one",
            "type": "string",
            "description": "Why this work item exists.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.review_at",
            "predicate": "security.work.review_at",
            "cardinality": "one",
            "type": "datetime",
            "description": "When this work item is next reviewed.",
            "evidence_requirement": "none"
          },
          {
            "name": "security.work.verification",
            "predicate": "security.work.verification",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "failed",
              "inconclusive",
              "verified"
            ],
            "description": "Whether the work was verified, as observed from retained evidence.",
            "evidence": [
              "security.observation-output-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "target_release",
            "predicate": "security.remediation.target_release",
            "cardinality": "one",
            "type": "subject:security.release",
            "description": "The release the remediation moves to.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.repo",
        "subjects": 1,
        "identity": "keys: security.repo.forge_host, security.repo.full_name (unique)",
        "predicates": [
          {
            "name": "forge_host",
            "predicate": "security.repo.forge_host",
            "cardinality": "one",
            "type": "string",
            "description": "The forge host (github.com); with full_name, the repository's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "full_name",
            "predicate": "security.repo.full_name",
            "cardinality": "one",
            "type": "string",
            "description": "owner/repository; with forge_host, the repository's key.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.service",
        "subjects": 1,
        "identity": "keys: security.service.name (hint)",
        "predicates": [
          {
            "name": "criticality",
            "predicate": "security.service.criticality",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "critical",
              "standard"
            ],
            "description": "How critical the service is to the organization.",
            "evidence_requirement": "none"
          },
          {
            "name": "name",
            "predicate": "security.service.name",
            "cardinality": "one",
            "type": "string",
            "description": "The service's name; its key.",
            "evidence_requirement": "none"
          },
          {
            "name": "owned_by",
            "predicate": "security.service.owned_by",
            "cardinality": "one",
            "type": "subject:security.team",
            "description": "The team accountable for the service.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.signal",
        "subjects": 1,
        "identity": "keys: security.signal.detector, security.signal.fingerprint (unique)",
        "predicates": [
          {
            "name": "detector",
            "predicate": "security.signal.detector",
            "cardinality": "one",
            "type": "string",
            "description": "What observed the signal (a question such as security.hq5, or manual); with fingerprint, the signal's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "explained_by",
            "predicate": "security.signal.explained_by",
            "cardinality": "one",
            "type": "subject:security.change,security.job,security.target,security.workflow",
            "description": "A hypothesis for the signal: what is responsible.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.github-api-v1",
              "security.github-release-v1",
              "security.pypi-release-v1",
              "security.release-asset-v1",
              "security.repo-snapshot-v1"
            ]
          },
          {
            "name": "fingerprint",
            "predicate": "security.signal.fingerprint",
            "cardinality": "one",
            "type": "string",
            "description": "What identifies the observation; with detector, the signal's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "observed",
            "predicate": "security.signal.observed",
            "cardinality": "many",
            "type": "subject:security.artifact,security.job,security.target,security.workflow",
            "description": "What the signal was observed on: a source's observation, or someone's own words.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.github-api-v1",
              "security.github-release-v1",
              "security.observation-output-v1",
              "security.pypi-release-v1",
              "security.release-asset-v1",
              "security.repo-snapshot-v1",
              "security.workspace-evidence-v1"
            ]
          }
        ]
      },
      {
        "kind": "security.supplier",
        "subjects": 3,
        "identity": "keys: security.supplier.name (hint)",
        "predicates": [
          {
            "name": "name",
            "predicate": "security.supplier.name",
            "cardinality": "one",
            "type": "string",
            "description": "The supplier's name; its key.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.target",
        "subjects": 4,
        "identity": "keys: security.target.registry, security.target.name (unique)",
        "predicates": [
          {
            "name": "name",
            "predicate": "security.target.name",
            "cardinality": "one",
            "type": "string",
            "description": "The target's name in its registry (a PyPI project, an image, owner/repo for a release or Pages site); with registry, the target's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "publish_gate",
            "predicate": "security.target.publish_gate",
            "cardinality": "many",
            "type": "string",
            "description": "A trigger the organization allows to publish to the target (push:tags:v*).",
            "evidence_requirement": "none"
          },
          {
            "name": "registry",
            "predicate": "security.target.registry",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "ghcr",
              "github_pages",
              "github_release",
              "pypi"
            ],
            "description": "Where artifacts land (pypi, ghcr, github_release, github_pages); with name, the target's key.",
            "evidence_requirement": "none"
          },
          {
            "name": "source_repo",
            "predicate": "security.target.source_repo",
            "cardinality": "one",
            "type": "subject:security.repo",
            "description": "The repository the target is published from: its provenance's, or the owner's words.",
            "evidence": [
              "playbill.coordinator-self-source-v1",
              "security.pypi-release-v1",
              "security.repo-snapshot-v1"
            ]
          }
        ]
      },
      {
        "kind": "security.team",
        "subjects": 1,
        "identity": "keys: security.team.name (hint)",
        "predicates": [
          {
            "name": "name",
            "predicate": "security.team.name",
            "cardinality": "one",
            "type": "string",
            "description": "The team's name; its key.",
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.vulnerability",
        "subjects": 18,
        "identity": "keys: security.vulnerability.cve_id (unique)",
        "evidence": [
          "security.kev-http-v1",
          "security.observation-output-v1"
        ],
        "predicates": [
          {
            "name": "cve_id",
            "predicate": "security.vulnerability.cve_id",
            "cardinality": "one",
            "type": "string",
            "description": "The CVE identifier; the vulnerability's key.",
            "evidence": [],
            "evidence_requirement": "none"
          },
          {
            "name": "epss_percentile",
            "predicate": "security.vulnerability.epss_percentile",
            "cardinality": "one",
            "type": "string",
            "description": "The EPSS score's percentile among all scored CVEs, as the daily file states it.",
            "evidence": [
              "security.epss-daily-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "epss_score",
            "predicate": "security.vulnerability.epss_score",
            "cardinality": "one",
            "type": "string",
            "description": "FIRST's EPSS probability of exploitation in the next 30 days, as the daily file states it.",
            "evidence": [
              "security.epss-daily-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "kev_cwes",
            "predicate": "security.vulnerability.kev_cwes",
            "cardinality": "many",
            "type": "string",
            "description": "A CWE identifier the KEV catalog lists for the vulnerability (cwes).",
            "evidence_requirement": "captured"
          },
          {
            "name": "kev_date_added",
            "predicate": "security.vulnerability.kev_date_added",
            "cardinality": "one",
            "type": "string",
            "description": "The date CISA added the vulnerability to the KEV catalog (dateAdded).",
            "evidence_requirement": "captured"
          },
          {
            "name": "kev_due_date",
            "predicate": "security.vulnerability.kev_due_date",
            "cardinality": "one",
            "type": "string",
            "description": "The KEV remediation due date for federal agencies (dueDate).",
            "evidence_requirement": "captured"
          },
          {
            "name": "kev_listed",
            "predicate": "security.vulnerability.kev_listed",
            "cardinality": "one",
            "type": "boolean",
            "description": "Whether the CISA Known Exploited Vulnerabilities catalog lists the vulnerability.",
            "evidence_requirement": "captured"
          },
          {
            "name": "kev_ransomware_use",
            "predicate": "security.vulnerability.kev_ransomware_use",
            "cardinality": "one",
            "type": "enum",
            "members": [
              "known",
              "unknown"
            ],
            "description": "Whether KEV reports known ransomware campaign use (knownRansomwareCampaignUse).",
            "evidence_requirement": "captured"
          },
          {
            "name": "title",
            "predicate": "security.vulnerability.title",
            "cardinality": "one",
            "type": "string",
            "description": "The vulnerability's title as a retained source states it.",
            "evidence": [
              "security.cve-record-http-v1",
              "security.kev-http-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "vendor_product",
            "predicate": "security.vulnerability.vendor_product",
            "cardinality": "one",
            "type": "string",
            "description": "The affected vendor and product as a retained source states it.",
            "evidence": [
              "security.cve-record-http-v1",
              "security.kev-http-v1"
            ],
            "evidence_requirement": "captured"
          },
          {
            "name": "watch_reason",
            "predicate": "security.vulnerability.watch_reason",
            "cardinality": "one",
            "type": "string",
            "description": "The decision to track the vulnerability, and why.",
            "evidence": [],
            "evidence_requirement": "none"
          }
        ]
      },
      {
        "kind": "security.workflow",
        "subjects": 12,
        "identity": "keys: security.workflow.source, security.workflow.path (unique)",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "predicates": [
          {
            "name": "coverage",
            "predicate": "security.workflow.coverage",
            "cardinality": "one",
            "type": "subject:security.coverage",
            "description": "The coverage (source at a revision) the workflow was read under.",
            "evidence_requirement": "captured"
          },
          {
            "name": "path",
            "predicate": "security.workflow.path",
            "cardinality": "one",
            "type": "string",
            "description": "The workflow file's path in the repository; with source, the workflow's key.",
            "evidence": [],
            "evidence_requirement": "none"
          },
          {
            "name": "repo",
            "predicate": "security.workflow.repo",
            "cardinality": "one",
            "type": "subject:security.repo",
            "description": "The repository the workflow file is in.",
            "evidence_requirement": "captured"
          },
          {
            "name": "source",
            "predicate": "security.workflow.source",
            "cardinality": "one",
            "type": "string",
            "description": "The source the workflow was read from (host/owner/repo@ref); with path, the workflow's key.",
            "evidence": [],
            "evidence_requirement": "none"
          },
          {
            "name": "trigger",
            "predicate": "security.workflow.trigger",
            "cardinality": "many",
            "type": "string",
            "description": "An event that triggers the workflow, as event[:filter:pattern] (push:tags:v*, workflow_dispatch, schedule:cron:0 6 * * *).",
            "evidence_requirement": "captured"
          }
        ]
      }
    ],
    "artifacts": {
      "claim_types": 90,
      "procedures": 19,
      "documents": 1,
      "queries": 28,
      "interfaces": 17,
      "lines": 17,
      "captures": 104,
      "capture_contracts": 14,
      "resolution_contracts": 2,
      "mandates": 9,
      "runs": 84,
      "running": 0,
      "claims": {
        "accepted": 786,
        "conflicted": 0,
        "overturned": 0,
        "refused": 5,
        "retired": 3
      }
    },
    "attention": {
      "next_items": 9,
      "open_proposals": 0,
      "top": [
        "repair claim_stale_evidence: Claim:CLM-5958666f8557aa56531b939f7e092e60",
        "repair claim_stale_evidence: Claim:CLM-7052ca2a7c9a819389901f9dfa41993b",
        "repair claim_stale_evidence: Claim:CLM-8535bf9214bc303f5c01763e0a47b2e9"
      ],
      "enablements": {
        "running": 10,
        "stalled": 0,
        "stopped": 3,
        "needs_attention": [
          "Line:security.epss-daily stopped (permission_insufficient)",
          "Line:security.harden stopped (permission_insufficient)",
          "Line:security.osv-applicability stopped (permission_insufficient)"
        ]
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
        "name": "security.exceptions",
        "description": "Scoped risk exceptions and expiry. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": []
      },
      {
        "name": "security.expired_exceptions",
        "description": "Expired approved exceptions requiring review. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": []
      },
      {
        "name": "security.incomplete_work",
        "description": "Remediation actions missing accountable information. Scoped to supported, current Claims; missing evidence is not a negative finding.",
        "params": []
      }
    ],
    "truncated": false,
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "97040dbfdd1e",
        "generation": 58
      },
      "fields": [
        "attention.enablements",
        "artifacts.runs",
        "artifacts.running"
      ]
    },
    "next": [
      "cx.orient(kind=\"security.assessment\")",
      "cx.query(kind=\"security.assessment\", select=[\"cve_id\", \"expected_status\", \"justification\"], limit=10)",
      "cx.next(expiring_within=Duration.days(count=7))",
      "cx.orient(section=\"queries\")",
      "cx.orient(section=\"interfaces\")",
      "cx.orient(section=\"lines\")"
    ]
  }
});
