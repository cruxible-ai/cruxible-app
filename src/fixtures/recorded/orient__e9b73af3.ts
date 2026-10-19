// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient ea6a292a
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
    "section": "claim_types",
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
    "evaluation_time": "2026-10-19T22:13:00.708486Z",
    "section": "claim_types",
    "claim_types": [
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "name",
        "predicate": "security.artifact.name",
        "cardinality": "one",
        "type": "string",
        "description": "The published file's name (a release asset as tag/asset); with target_ref, the artifact's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        ],
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "target_ref",
        "predicate": "security.artifact.target_ref",
        "cardinality": "one",
        "type": "string",
        "description": "The artifact's target as registry/name; with name, the artifact's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "cve_id",
        "predicate": "security.assessment.cve_id",
        "cardinality": "one",
        "type": "string",
        "description": "The CVE this assessment is about; with release_id, the assessment's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "description": "Why a not_affected release is not affected (the VEX/CSAF justification): an observation from a source, or (normative) an analyst's judgment. Required in practice with every not_affected status; core cannot require it.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.cve-record-http-v1",
          "security.observation-output-v1",
          "security.osv-query-v1",
          "security.workspace-evidence-v1"
        ],
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "member_descriptions": [
          {
            "member": "component_not_present",
            "description": "The vulnerable component is not in the release."
          },
          {
            "member": "inline_mitigations_already_exist",
            "description": "Built-in protections prevent exploitation."
          },
          {
            "member": "vulnerable_code_cannot_be_controlled_by_adversary",
            "description": "The vulnerable code cannot be reached with adversary-controlled input."
          },
          {
            "member": "vulnerable_code_not_in_execute_path",
            "description": "The vulnerable code is present but never runs."
          },
          {
            "member": "vulnerable_code_not_present",
            "description": "The component is present but not the vulnerable code (for example, a fixed version)."
          }
        ],
        "revision_evidence": "replace",
        "kit": "security"
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
        ],
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "release_id",
        "predicate": "security.assessment.release_id",
        "cardinality": "one",
        "type": "string",
        "description": "The id of the release this assessment is about; with cve_id, the assessment's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "description": "Whether the release is affected by the vulnerability. An observation is a source's verdict (OSV, a CVE record) citing its Capture; a normative Claim is an analyst's judgment citing their own words or a workspace file, with their reasoning in its because. The kit's Procedures never revise a normative status; retire it to hand the assessment back to them.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.cve-record-http-v1",
          "security.observation-output-v1",
          "security.osv-query-v1",
          "security.workspace-evidence-v1"
        ],
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        ],
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.asset"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "hostname",
        "predicate": "security.asset.hostname",
        "cardinality": "one",
        "type": "string",
        "description": "The asset's hostname; its key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.asset"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "installs",
        "predicate": "security.asset.installs",
        "cardinality": "many",
        "type": "subject:security.release",
        "description": "A software release installed on the asset.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.asset"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "internet_exposed",
        "predicate": "security.asset.internet_exposed",
        "cardinality": "one",
        "type": "boolean",
        "description": "Whether the asset is reachable from the internet.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.asset"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "serves",
        "predicate": "security.asset.serves",
        "cardinality": "many",
        "type": "subject:security.service",
        "description": "A service the asset serves.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.asset"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "commit_sha",
        "predicate": "security.change.commit_sha",
        "cardinality": "one",
        "type": "string",
        "description": "The commit SHA; with repo_ref, the change's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.change"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "repo_ref",
        "predicate": "security.change.repo_ref",
        "cardinality": "one",
        "type": "string",
        "description": "The change's repository as host/owner/repo; with commit_sha, its key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.change"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.control"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.control"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.coverage"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "revision",
        "predicate": "security.coverage.revision",
        "cardinality": "one",
        "type": "string",
        "description": "The revision every file was read at: a commit SHA, or the digest of a registry's served file set, re-read on every pull and stale 12 h after the last. Absence inside current coverage is an answer; outside it, unknown.",
        "evidence": [
          "security.pypi-release-v1",
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.coverage"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "stale_after": "12h",
        "kit": "security"
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.coverage"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "source",
        "predicate": "security.coverage.source",
        "cardinality": "one",
        "type": "string",
        "description": "The fully read source (host/owner/repo@ref:path, or registry/name); with scope, the coverage's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.coverage"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.exception"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "expires_at",
        "predicate": "security.exception.expires_at",
        "cardinality": "one",
        "type": "datetime",
        "description": "When the risk exception expires.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.exception"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "environment",
        "predicate": "security.job.environment",
        "cardinality": "one",
        "type": "string",
        "description": "The deployment environment the job runs in, or none.",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "job_key",
        "predicate": "security.job.job_key",
        "cardinality": "one",
        "type": "string",
        "description": "The job's key in its workflow file; with workflow_ref, the job's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "needs",
        "predicate": "security.job.needs",
        "cardinality": "many",
        "type": "subject:security.job",
        "description": "A job this job waits for.",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "permission",
        "predicate": "security.job.permission",
        "cardinality": "many",
        "type": "string",
        "description": "An effective token permission as scope:level (the workflow default applied; token:repository-default when none is declared).",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "publishes_to",
        "predicate": "security.job.publishes_to",
        "cardinality": "many",
        "type": "subject:security.target",
        "description": "A target the job can publish to: it holds the credential the registry accepts (the analysis provider's publish rule table).",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "secret",
        "predicate": "security.job.secret",
        "cardinality": "many",
        "type": "string",
        "description": "A secret the job references (GITHUB_TOKEN included; *inherit for secrets: inherit).",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "uses",
        "predicate": "security.job.uses",
        "cardinality": "many",
        "type": "string",
        "description": "An action or reusable workflow the job runs, as pkg:githubactions/owner/repo[/path]@ref.",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "workflow",
        "predicate": "security.job.workflow",
        "cardinality": "one",
        "type": "subject:security.workflow",
        "description": "The workflow the job is declared in.",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "workflow_ref",
        "predicate": "security.job.workflow_ref",
        "cardinality": "one",
        "type": "string",
        "description": "The job's workflow as source:path; with job_key, the job's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.job"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "name",
        "predicate": "security.product.name",
        "cardinality": "one",
        "type": "string",
        "description": "The product's name; its key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.product"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        ],
        "subject_kinds": [
          "security.product"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "component",
        "predicate": "security.release.component",
        "cardinality": "many",
        "type": "string",
        "description": "A component of the release, as its package URL with version (purl@version), observed in an SBOM.",
        "evidence": [
          "security.cyclonedx-sbom-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.release"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        ],
        "subject_kinds": [
          "security.release"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "product_name",
        "predicate": "security.release.product_name",
        "cardinality": "one",
        "type": "string",
        "description": "The product's name; with version, the release's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.release"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "version",
        "predicate": "security.release.version",
        "cardinality": "one",
        "type": "string",
        "description": "The release's version string; with product_name, the release's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.release"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "due_at",
        "predicate": "security.remediation.due_at",
        "cardinality": "one",
        "type": "datetime",
        "description": "When the remediation is due.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "target_release",
        "predicate": "security.remediation.target_release",
        "cardinality": "one",
        "type": "subject:security.release",
        "description": "The release the remediation moves to.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "forge_host",
        "predicate": "security.repo.forge_host",
        "cardinality": "one",
        "type": "string",
        "description": "The forge host (github.com); with full_name, the repository's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.repo"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "full_name",
        "predicate": "security.repo.full_name",
        "cardinality": "one",
        "type": "string",
        "description": "owner/repository; with forge_host, the repository's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.repo"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.service"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "name",
        "predicate": "security.service.name",
        "cardinality": "one",
        "type": "string",
        "description": "The service's name; its key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.service"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "owned_by",
        "predicate": "security.service.owned_by",
        "cardinality": "one",
        "type": "subject:security.team",
        "description": "The team accountable for the service.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.service"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "detector",
        "predicate": "security.signal.detector",
        "cardinality": "one",
        "type": "string",
        "description": "What observed the signal (a question such as security.hq5, or manual); with fingerprint, the signal's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.signal"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "explained_by",
        "predicate": "security.signal.explained_by",
        "cardinality": "one",
        "type": "subject:security.change,security.job,security.target,security.workflow",
        "description": "A hypothesis for the signal: what is responsible. Competing hypotheses contend (set --contend); the slot resolves when one remains.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.github-api-v1",
          "security.github-release-v1",
          "security.pypi-release-v1",
          "security.release-asset-v1",
          "security.repo-snapshot-v1"
        ],
        "subject_kinds": [
          "security.signal"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "fingerprint",
        "predicate": "security.signal.fingerprint",
        "cardinality": "one",
        "type": "string",
        "description": "What identifies the observation; with detector, the signal's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.signal"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        ],
        "subject_kinds": [
          "security.signal"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "name",
        "predicate": "security.supplier.name",
        "cardinality": "one",
        "type": "string",
        "description": "The supplier's name; its key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.supplier"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "name",
        "predicate": "security.target.name",
        "cardinality": "one",
        "type": "string",
        "description": "The target's name in its registry (a PyPI project, an image, owner/repo for a release or Pages site); with registry, the target's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.target"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "publish_gate",
        "predicate": "security.target.publish_gate",
        "cardinality": "many",
        "type": "string",
        "description": "A trigger the organization allows to publish to the target (push:tags:v*). Stating a gate is what asks the hardening questions about the target.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.target"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.target"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        ],
        "subject_kinds": [
          "security.target"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "name",
        "predicate": "security.team.name",
        "cardinality": "one",
        "type": "string",
        "description": "The team's name; its key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.team"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "cve_id",
        "predicate": "security.vulnerability.cve_id",
        "cardinality": "one",
        "type": "string",
        "description": "The CVE identifier; the vulnerability's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "kev_cwes",
        "predicate": "security.vulnerability.kev_cwes",
        "cardinality": "many",
        "type": "string",
        "description": "A CWE identifier the KEV catalog lists for the vulnerability (cwes).",
        "evidence": [
          "security.kev-http-v1",
          "security.observation-output-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "kev_date_added",
        "predicate": "security.vulnerability.kev_date_added",
        "cardinality": "one",
        "type": "string",
        "description": "The date CISA added the vulnerability to the KEV catalog (dateAdded).",
        "evidence": [
          "security.kev-http-v1",
          "security.observation-output-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "kev_due_date",
        "predicate": "security.vulnerability.kev_due_date",
        "cardinality": "one",
        "type": "string",
        "description": "The KEV remediation due date for federal agencies (dueDate).",
        "evidence": [
          "security.kev-http-v1",
          "security.observation-output-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "kev_listed",
        "predicate": "security.vulnerability.kev_listed",
        "cardinality": "one",
        "type": "boolean",
        "description": "Whether the CISA Known Exploited Vulnerabilities catalog lists the vulnerability.",
        "evidence": [
          "security.kev-http-v1",
          "security.observation-output-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence": [
          "security.kev-http-v1",
          "security.observation-output-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "watch_reason",
        "predicate": "security.vulnerability.watch_reason",
        "cardinality": "one",
        "type": "string",
        "description": "The decision to track the vulnerability, and why. A vulnerability is tracked when it has one, or when an affected or inconclusive assessment links it to a release in inventory; a bare vulnerability Subject is tracked by nothing.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.vulnerability"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "security.work.assessment",
        "predicate": "security.work.assessment",
        "cardinality": "one",
        "type": "subject:security.assessment",
        "description": "The assessment this work item answers.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.control",
          "security.exception",
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "security.work.asset",
        "predicate": "security.work.asset",
        "cardinality": "one",
        "type": "subject:security.asset",
        "description": "The asset this work item covers.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.control",
          "security.exception",
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "security.work.job",
        "predicate": "security.work.job",
        "cardinality": "one",
        "type": "subject:security.job",
        "description": "The job this work item changes.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.control",
          "security.exception",
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "security.work.owner",
        "predicate": "security.work.owner",
        "cardinality": "one",
        "type": "subject:security.team",
        "description": "The team accountable for this work item.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.control",
          "security.exception",
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "security.work.rationale",
        "predicate": "security.work.rationale",
        "cardinality": "one",
        "type": "string",
        "description": "Why this work item exists.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.control",
          "security.exception",
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "security.work.review_at",
        "predicate": "security.work.review_at",
        "cardinality": "one",
        "type": "datetime",
        "description": "When this work item is next reviewed.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.control",
          "security.exception",
          "security.remediation"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
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
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.control",
          "security.exception",
          "security.remediation"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "coverage",
        "predicate": "security.workflow.coverage",
        "cardinality": "one",
        "type": "subject:security.coverage",
        "description": "The coverage (source at a revision) the workflow was read under.",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.workflow"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "path",
        "predicate": "security.workflow.path",
        "cardinality": "one",
        "type": "string",
        "description": "The workflow file's path in the repository; with source, the workflow's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.workflow"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "repo",
        "predicate": "security.workflow.repo",
        "cardinality": "one",
        "type": "subject:security.repo",
        "description": "The repository the workflow file is in.",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.workflow"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "source",
        "predicate": "security.workflow.source",
        "cardinality": "one",
        "type": "string",
        "description": "The source the workflow was read from (host/owner/repo@ref); with path, the workflow's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.workflow"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "trigger",
        "predicate": "security.workflow.trigger",
        "cardinality": "many",
        "type": "string",
        "description": "An event that triggers the workflow, as event[:filter:pattern] (push:tags:v*, workflow_dispatch, schedule:cron:0 6 * * *).",
        "evidence": [
          "security.repo-snapshot-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.workflow"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "kit": "security"
      },
      {
        "name": "semantic.alias",
        "predicate": "semantic.alias",
        "cardinality": "many",
        "type": "string",
        "description": "Another name the Subject is known by. A Subject reference that names no Subject resolves through the aliases of its kind: one match resolves, several refuse naming each.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "semantic.subject"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "revision_evidence": "replace"
      },
      {
        "name": "semantic.distinct_from",
        "predicate": "semantic.distinct_from",
        "cardinality": "many",
        "type": "subject:semantic.subject",
        "description": "The object Subject is a different thing from this one, whatever names or keys they share: the duplicates audit never groups the pair.",
        "evidence": [
          "playbill.coordinator-self-source-v1"
        ],
        "subject_kinds": [
          "semantic.subject"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "revision_evidence": "replace"
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"ClaimType:security.artifact.built_from\")"
    ]
  }
});
