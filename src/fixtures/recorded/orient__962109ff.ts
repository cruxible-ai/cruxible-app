// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 16a36d15
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
    "section": "claim_types",
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
    "evaluation_time": "2026-10-26T19:05:02.593174Z",
    "section": "claim_types",
    "claim_types": [
      {
        "name": "built_from",
        "predicate": "security.artifact.built_from",
        "cardinality": "one",
        "type": "subject:security.change",
        "description": "The commit the artifact was built from.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.artifact/built_from.json",
        "kit": "security"
      },
      {
        "name": "declared_sha256",
        "predicate": "security.artifact.declared_sha256",
        "cardinality": "one",
        "type": "string",
        "description": "The digest a release manifest in the repository declares for the artifact.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.artifact/declared_sha256.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.artifact/name.json",
        "kit": "security"
      },
      {
        "name": "publish_environment",
        "predicate": "security.artifact.publish_environment",
        "cardinality": "one",
        "type": "string",
        "description": "The deployment environment the publishing run used, as provenance states it, or none.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.artifact/publish_environment.json",
        "kit": "security"
      },
      {
        "name": "published_by",
        "predicate": "security.artifact.published_by",
        "cardinality": "one",
        "type": "subject:security.workflow",
        "description": "The workflow (at the commit it ran from) that published the artifact, as its provenance states.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.artifact/published_by.json",
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
          "security.fetched-v1"
        ],
        "subject_kinds": [
          "security.artifact"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.artifact/release.json",
        "kit": "security"
      },
      {
        "name": "sha256",
        "predicate": "security.artifact.sha256",
        "cardinality": "one",
        "type": "string",
        "description": "The digest of the bytes the target serves (PyPI's digest, or a fetched asset's).",
        "evidence": [
          "security.fetched-large-v1",
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.artifact/sha256.json",
        "kit": "security"
      },
      {
        "name": "target",
        "predicate": "security.artifact.target",
        "cardinality": "one",
        "type": "subject:security.target",
        "description": "The target the artifact is published to.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.artifact/target.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.artifact/target_ref.json",
        "kit": "security"
      },
      {
        "name": "uploaded_by",
        "predicate": "security.artifact.uploaded_by",
        "cardinality": "one",
        "type": "string",
        "description": "Who uploaded the release asset (login).",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.artifact/uploaded_by.json",
        "kit": "security"
      },
      {
        "name": "component",
        "predicate": "security.assessment.component",
        "cardinality": "many",
        "type": "string",
        "description": "The release's component that brings the vulnerability in (purl@version): which dependency an affected release needs to change. An observation is a source's word (OSV's answer for the component, or a CVE record whose packageName names it); a normative Claim is an analyst's, citing their own words or a workspace file (security.file-v1, via security.evidence-acquire).",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.fetched-v1",
          "security.file-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.assessment/component.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.assessment/cve_id.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.assessment/expected_status.json",
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
        "description": "Why a not_affected release is not affected (the VEX/CSAF justification): an observation from a source, or (normative) an analyst's judgment citing their own words or a workspace file (security.file-v1). Required in practice with every not_affected status; core cannot require it.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.fetched-v1",
          "security.file-v1",
          "security.observation-output-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.assessment/justification.json",
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
          "security.fetched-v1"
        ],
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.assessment/release.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.assessment/release_id.json",
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
        "description": "Whether the release is affected by the vulnerability. An observation is a source's verdict (OSV, a CVE record) citing its Capture; a normative Claim is an analyst's judgment citing their own words or a workspace file (security.file-v1, retained by security.evidence-acquire: a source's Capture is not citable for a judgment), with their reasoning in its because. The kit's Procedures never revise a normative status; retire it to hand the assessment back to them.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.fetched-v1",
          "security.file-v1",
          "security.observation-output-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.assessment/status.json",
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
          "security.fetched-v1"
        ],
        "subject_kinds": [
          "security.assessment"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.assessment/vulnerability.json",
        "kit": "security"
      },
      {
        "name": "environment",
        "predicate": "security.asset.environment",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "ci",
          "development",
          "production",
          "staging",
          "workstation"
        ],
        "description": "The environment the asset runs in: production, staging, development, a workstation (a developer's or maintainer's machine) or ci (a CI runner).",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.asset/environment.json",
        "kit": "security"
      },
      {
        "name": "hostname",
        "predicate": "security.asset.hostname",
        "cardinality": "one",
        "type": "string",
        "description": "The asset's hostname (a host, or a workload such as k8s:prod/storefront-a); its key.",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.asset/hostname.json",
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.asset/installs.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.asset/internet_exposed.json",
        "kit": "security"
      },
      {
        "name": "runs",
        "predicate": "security.asset.runs",
        "cardinality": "many",
        "type": "subject:security.release",
        "description": "A release a runtime-inventory scan observed running on the asset (beside the declared installs). A full scan retires a run it no longer sees. Its none (an inverse, keyed by the release's product_name) says the asset runs no release of that product: only a full scan that looked for the product states it (never for a product it did not look for), it goes stale on the coverage horizon, and a run of the product seen again retires it. No run and no current none is unknown.",
        "evidence": [
          "security.file-erasable-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.asset"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 9,
        "revision": 1,
        "path": "claim-types/security.asset/runs.json",
        "kit": "security"
      },
      {
        "name": "scanned_in",
        "predicate": "security.asset.scanned_in",
        "cardinality": "many",
        "type": "subject:security.coverage",
        "description": "The inventory scope coverage that read the asset: its runs are complete there while that coverage is current.",
        "evidence": [
          "security.file-erasable-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.asset"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.asset/scanned_in.json",
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.asset/serves.json",
        "kit": "security"
      },
      {
        "name": "incident",
        "predicate": "security.audit.incident",
        "cardinality": "one",
        "type": "subject:security.incident",
        "description": "The incident the audit answers (the key's incident_ref as a Subject).",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.file-erasable-v1"
        ],
        "subject_kinds": [
          "security.audit"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.audit/incident.json",
        "kit": "security"
      },
      {
        "name": "incident_ref",
        "predicate": "security.audit.incident_ref",
        "cardinality": "one",
        "type": "string",
        "description": "The incident's name; with service_ref, the audit's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.audit"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.audit/incident_ref.json",
        "kit": "security"
      },
      {
        "name": "log_source",
        "predicate": "security.audit.log_source",
        "cardinality": "many",
        "type": "string",
        "description": "A log source this incident's audit reads in full over the window (storefront/nginx-access). Stating it is what asks the question. Start from the service's service.log_source list (the respond Line names it): a source the service lists and the audit does not state leaves the answer unknown.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.audit"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.audit/log_source.json",
        "kit": "security"
      },
      {
        "name": "read",
        "predicate": "security.audit.read",
        "cardinality": "many",
        "type": "string",
        "description": "One complete read of a log source, as SOURCE FROM/TO (ISO 8601, Z): the tool searched every record in the interval. Only the log import writes these; an incomplete read is posted, never recorded.",
        "evidence": [
          "security.file-erasable-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.audit"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.audit/read.json",
        "kit": "security"
      },
      {
        "name": "result",
        "predicate": "security.audit.result",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "exploited",
          "inconclusive",
          "not_exploited"
        ],
        "description": "The auditor's judgment: exploited, not_exploited or inconclusive, citing the decisive log read (security.file-erasable-v1) or a workspace file (security.file-v1); own words are refused. Reasoning goes in a section of the incident's note. A disagreeing auditor contends (set --contend): while the slot reads conflict the answer is unknown. Never settled by a Mandate.",
        "evidence": [
          "security.file-erasable-v1",
          "security.file-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.audit"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "member_descriptions": [
          {
            "member": "exploited",
            "description": "The window's logs show exploitation: cite the decisive read."
          },
          {
            "member": "inconclusive",
            "description": "The logs cannot decide it (a gap, a missing source, ambiguous matches)."
          },
          {
            "member": "not_exploited",
            "description": "Every stated log source (the audit's, which must include every source the service lists) was read in full over the window and shows no exploitation; counts as none only when the reads cover [window_start, window_end]."
          }
        ],
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.audit/result.json",
        "kit": "security"
      },
      {
        "name": "service",
        "predicate": "security.audit.service",
        "cardinality": "one",
        "type": "subject:security.service",
        "description": "The service the audit answers for (the key's service_ref as a Subject).",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.file-erasable-v1"
        ],
        "subject_kinds": [
          "security.audit"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.audit/service.json",
        "kit": "security"
      },
      {
        "name": "service_ref",
        "predicate": "security.audit.service_ref",
        "cardinality": "one",
        "type": "string",
        "description": "The service's name; with incident_ref, the audit's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.audit"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.audit/service_ref.json",
        "kit": "security"
      },
      {
        "name": "window_end",
        "predicate": "security.audit.window_end",
        "cardinality": "one",
        "type": "datetime",
        "description": "When the service's last affected asset was verified patched (the verifying scan's time): the audit's window is [incident.window_start, window_end].",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.audit"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.audit/window_end.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.change/commit_sha.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.change/repo_ref.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.control/activation.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.control/kind.json",
        "kit": "security"
      },
      {
        "name": "looked_for",
        "predicate": "security.coverage.looked_for",
        "cardinality": "many",
        "type": "string",
        "description": "A product a full runtime-inventory scan looked for, named as its releases are (php, debian/php8.2: a purl's namespace and name), or * for everything: the record of the question the scan asked. The scan states each asset's absence as an asset.runs none, only for a product it looked for (under *: a product the asset ran before or declares installing; name any other in looked_for); which versions of a looked-for product an asset runs are its runs, complete while the coverage is current.",
        "evidence": [
          "security.file-erasable-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.coverage/looked_for.json",
        "kit": "security"
      },
      {
        "name": "of",
        "predicate": "security.coverage.of",
        "cardinality": "one",
        "type": "subject:security.repo,security.target",
        "description": "What the source belongs to: a repository, or a registry target.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.coverage/of.json",
        "kit": "security"
      },
      {
        "name": "revision",
        "predicate": "security.coverage.revision",
        "cardinality": "one",
        "type": "string",
        "description": "The revision every file was read at: a commit SHA, the digest of a registry's served file set, or the digest of a full runtime-inventory scan's (asset, runs) set; re-read on every pull and stale 12 h after the last. Absence inside current coverage is an answer; outside it, unknown.",
        "evidence": [
          "security.fetched-v1",
          "security.file-erasable-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.coverage/revision.json",
        "kit": "security"
      },
      {
        "name": "scope",
        "predicate": "security.coverage.scope",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "ci.workflows",
          "inventory.runtime",
          "registry.files",
          "release.manifest"
        ],
        "description": "What was read in full: ci.workflows, release.manifest, registry.files, or inventory.runtime (every asset of one inventory scope, with what it runs).",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.coverage/scope.json",
        "kit": "security"
      },
      {
        "name": "source",
        "predicate": "security.coverage.source",
        "cardinality": "one",
        "type": "string",
        "description": "The fully read source (host/owner/repo@ref:path, registry/name, or an inventory scope's name); with scope, the coverage's key.",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.coverage/source.json",
        "kit": "security"
      },
      {
        "name": "issued_at",
        "predicate": "security.credential.issued_at",
        "cardinality": "one",
        "type": "datetime",
        "description": "When the current key was issued, as the issuer states it: a rotation must post-date incident.window_start.",
        "evidence": [
          "security.file-erasable-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.credential"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.credential/issued_at.json",
        "kit": "security"
      },
      {
        "name": "issued_by",
        "predicate": "security.credential.issued_by",
        "cardinality": "one",
        "type": "string",
        "description": "Who issued the current key, as the issuer states it.",
        "evidence": [
          "security.file-erasable-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.credential"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.credential/issued_by.json",
        "kit": "security"
      },
      {
        "name": "issuer",
        "predicate": "security.credential.issuer",
        "cardinality": "one",
        "type": "string",
        "description": "Who issues the credential (aws-iam/111122223333, stripe, postgres/partners-db); with name, the credential's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.credential"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.credential/issuer.json",
        "kit": "security"
      },
      {
        "name": "key_id",
        "predicate": "security.credential.key_id",
        "cardinality": "one",
        "type": "string",
        "description": "The current key's non-secret id: the issuer's key id, or fp: and 16 hex of the secret's sha256. Never the secret.",
        "evidence": [
          "security.file-erasable-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.credential"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.credential/key_id.json",
        "kit": "security"
      },
      {
        "name": "name",
        "predicate": "security.credential.name",
        "cardinality": "one",
        "type": "string",
        "description": "The credential's name at its issuer (storefront-app); with issuer, its key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.credential"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.credential/name.json",
        "kit": "security"
      },
      {
        "name": "reaches",
        "predicate": "security.credential.reaches",
        "cardinality": "many",
        "type": "subject:security.service",
        "description": "A service the credential grants access to: the blast radius.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.credential"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.credential/reaches.json",
        "kit": "security"
      },
      {
        "name": "revoked_key",
        "predicate": "security.credential.revoked_key",
        "cardinality": "many",
        "type": "string",
        "description": "A key id a separate state read observed revoked or deleted.",
        "evidence": [
          "security.file-erasable-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.credential"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.credential/revoked_key.json",
        "kit": "security"
      },
      {
        "name": "used_by",
        "predicate": "security.credential.used_by",
        "cardinality": "many",
        "type": "subject:security.service",
        "description": "A service that uses the credential: whoever compromised the service could read it.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.credential"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.credential/used_by.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.exception/approval.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.exception/expires_at.json",
        "kit": "security"
      },
      {
        "name": "affects",
        "predicate": "security.finding.affects",
        "cardinality": "many",
        "type": "subject:security.artifact,security.job,security.release,security.service",
        "description": "What the finding is in: a release, a service, a job or an artifact (joins the system model; HQ6 asks it of every gated target).",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.fetched-v1"
        ],
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.finding/affects.json",
        "kit": "security"
      },
      {
        "name": "fixed_by",
        "predicate": "security.finding.fixed_by",
        "cardinality": "one",
        "type": "subject:security.change",
        "description": "The commit that fixes the finding.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.fetched-v1"
        ],
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.finding/fixed_by.json",
        "kit": "security"
      },
      {
        "name": "justification",
        "predicate": "security.finding.justification",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "not_attacker_controlled",
          "not_reachable",
          "rule_misfire",
          "sanitized",
          "test_or_dead_code"
        ],
        "description": "Why a finding is not_exploitable or a false_positive: an analyst's judgment (normative), or a scan's stated suppression.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.file-v1"
        ],
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "member_descriptions": [
          {
            "member": "not_attacker_controlled",
            "description": "The input reaching the sink is not attacker-controlled."
          },
          {
            "member": "not_reachable",
            "description": "No path from an entry point reaches the code."
          },
          {
            "member": "rule_misfire",
            "description": "The rule matched code that is not the pattern it describes."
          },
          {
            "member": "sanitized",
            "description": "The input is sanitized or validated before the sink."
          },
          {
            "member": "test_or_dead_code",
            "description": "The code is a test, an example or never shipped."
          }
        ],
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/justification.json",
        "kit": "security"
      },
      {
        "name": "location",
        "predicate": "security.finding.location",
        "cardinality": "many",
        "type": "string",
        "description": "Where the sink is now, as path:start-end, cited by a file citation of the sink line (PATH#ANCHOR): origin-only, so `cruxible next` resurfaces it (citation_drifted) when the cited code changes. One per sink.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/location.json",
        "kit": "security"
      },
      {
        "name": "locus",
        "predicate": "security.finding.locus",
        "cardinality": "one",
        "type": "string",
        "description": "Where in the code: <repo-relative path>#<locator>, the first tier that applies (the symbol, snippet:<12 hex of the sink line>, line-hash:<the tool's>). Never a line number; with repo_ref and weakness, the finding's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/locus.json",
        "kit": "security"
      },
      {
        "name": "repo",
        "predicate": "security.finding.repo",
        "cardinality": "one",
        "type": "subject:security.repo",
        "description": "The repository the finding is in (the key's repo_ref as a Subject).",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.file-v1"
        ],
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.finding/repo.json",
        "kit": "security"
      },
      {
        "name": "repo_ref",
        "predicate": "security.finding.repo_ref",
        "cardinality": "one",
        "type": "string",
        "description": "The repository as host/owner/repo (github.com/owner/repo); with weakness and locus, the finding's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/repo_ref.json",
        "kit": "security"
      },
      {
        "name": "reported_by",
        "predicate": "security.finding.reported_by",
        "cardinality": "many",
        "type": "string",
        "description": "A finder that reported the finding: a tool (semgrep, codeql) or an agent's principal; the grain of the finder track record.",
        "evidence": [
          "security.file-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/reported_by.json",
        "kit": "security"
      },
      {
        "name": "reproduction",
        "predicate": "security.finding.reproduction",
        "cardinality": "one",
        "type": "string",
        "description": "The proof-of-concept test that reproduces the finding (tests/security/test_x.py::test_y), in the writer's own words or a section of the finding's note; the PoC run is the verdict's evidence.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.file-v1"
        ],
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/reproduction.json",
        "kit": "security"
      },
      {
        "name": "rule",
        "predicate": "security.finding.rule",
        "cardinality": "many",
        "type": "string",
        "description": "A tool rule that reported the finding, as tool:ruleId (semgrep:python.lang.security...), observed in a SARIF scan.",
        "evidence": [
          "security.file-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/rule.json",
        "kit": "security"
      },
      {
        "name": "severity",
        "predicate": "security.finding.severity",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "critical",
          "high",
          "low",
          "medium"
        ],
        "description": "How severe the finding is: a scan's severity (security-severity, else the level) citing its SARIF, or (normative) an analyst's judgment.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.file-v1"
        ],
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative",
          "observation"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/severity.json",
        "kit": "security"
      },
      {
        "name": "verdict",
        "predicate": "security.finding.verdict",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "confirmed",
          "false_positive",
          "not_exploitable"
        ],
        "description": "The adjudicated verdict: confirmed, not_exploitable or false_positive, citing a reproduction (the PoC run) or the code read (workspace evidence); own words are refused. A disputed verdict contends (set --contend) and reads conflict until one contender remains. Never settled by a Mandate.",
        "evidence": [
          "security.file-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "member_descriptions": [
          {
            "member": "confirmed",
            "description": "The weakness is real and exploitable: a reproduction (the PoC run) or the code read shows it. Needs retained evidence, never own words."
          },
          {
            "member": "false_positive",
            "description": "The tool or finder was wrong: there is no such weakness here."
          },
          {
            "member": "not_exploitable",
            "description": "The weakness is in the code but cannot be exploited here; the justification says why (for example not_reachable)."
          }
        ],
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/verdict.json",
        "kit": "security"
      },
      {
        "name": "verification",
        "predicate": "security.finding.verification",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "fixed",
          "present"
        ],
        "description": "Whether a fix is verified: fixed when a full scan of the finder's rules no longer reports it or the PoC passes; present when a full scan reports it after it was fixed (a regression).",
        "evidence": [
          "security.file-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "observation"
        ],
        "default_role": "observation",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/verification.json",
        "kit": "security"
      },
      {
        "name": "vulnerability",
        "predicate": "security.finding.vulnerability",
        "cardinality": "one",
        "type": "subject:security.vulnerability",
        "description": "The known CVE the finding is (vendored code with a published vulnerability).",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.fetched-v1"
        ],
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.finding/vulnerability.json",
        "kit": "security"
      },
      {
        "name": "weakness",
        "predicate": "security.finding.weakness",
        "cardinality": "one",
        "type": "string",
        "description": "CWE-<n>, the smallest CWE the reporting rule names, else RULE:<tool>/<ruleId>; with repo_ref and locus, the finding's key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.finding"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.finding/weakness.json",
        "kit": "security"
      },
      {
        "name": "name",
        "predicate": "security.incident.name",
        "cardinality": "one",
        "type": "string",
        "description": "The incident's name (PHP2Shell); its key.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.incident"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.incident/name.json",
        "kit": "security"
      },
      {
        "name": "rotation_policy",
        "predicate": "security.incident.rotation_policy",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "all_exposed",
          "on_found_or_unknown"
        ],
        "description": "What raises a rotation: on_found_or_unknown (a service's audit found or cannot rule out exploitation) or all_exposed.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.incident"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "member_descriptions": [
          {
            "member": "all_exposed",
            "description": "Rotate every credential a service of an exposed asset uses."
          },
          {
            "member": "on_found_or_unknown",
            "description": "Rotate the credentials of a service whose audit found exploitation or cannot rule it out (unknown)."
          }
        ],
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.incident/rotation_policy.json",
        "kit": "security"
      },
      {
        "name": "status",
        "predicate": "security.incident.status",
        "cardinality": "one",
        "type": "enum",
        "members": [
          "closed",
          "open"
        ],
        "description": "Whether the incident is open; close it only after its respond Line posts ready_to_close.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.incident"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.incident/status.json",
        "kit": "security"
      },
      {
        "name": "vulnerability",
        "predicate": "security.incident.vulnerability",
        "cardinality": "many",
        "type": "subject:security.vulnerability",
        "description": "A CVE this incident responds to: one response, one audit per service, however many CVEs.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.incident"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.incident/vulnerability.json",
        "kit": "security"
      },
      {
        "name": "window_start",
        "predicate": "security.incident.window_start",
        "cardinality": "one",
        "type": "datetime",
        "description": "The start of the exposure window (the lead's call, e.g. the earliest known exploitation minus a margin): audits read from it, rotations must post-date it.",
        "evidence": [],
        "evidence_requirement": "none",
        "subject_kinds": [
          "security.incident"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.incident/window_start.json",
        "kit": "security"
      },
      {
        "name": "environment",
        "predicate": "security.job.environment",
        "cardinality": "one",
        "type": "string",
        "description": "The deployment environment the job runs in, or none.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.job/environment.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.job/job_key.json",
        "kit": "security"
      },
      {
        "name": "needs",
        "predicate": "security.job.needs",
        "cardinality": "many",
        "type": "subject:security.job",
        "description": "A job this job waits for.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.job/needs.json",
        "kit": "security"
      },
      {
        "name": "permission",
        "predicate": "security.job.permission",
        "cardinality": "many",
        "type": "string",
        "description": "An effective token permission as scope:level (the workflow default applied; token:repository-default when none is declared).",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.job/permission.json",
        "kit": "security"
      },
      {
        "name": "publishes_to",
        "predicate": "security.job.publishes_to",
        "cardinality": "many",
        "type": "subject:security.target",
        "description": "A target the job can publish to: it holds the credential the registry accepts (the analysis provider's publish rule table).",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.job/publishes_to.json",
        "kit": "security"
      },
      {
        "name": "secret",
        "predicate": "security.job.secret",
        "cardinality": "many",
        "type": "string",
        "description": "A secret the job references (GITHUB_TOKEN included; *inherit for secrets: inherit).",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.job/secret.json",
        "kit": "security"
      },
      {
        "name": "uses",
        "predicate": "security.job.uses",
        "cardinality": "many",
        "type": "string",
        "description": "An action or reusable workflow the job runs, as pkg:githubactions/owner/repo[/path]@ref.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.job/uses.json",
        "kit": "security"
      },
      {
        "name": "workflow",
        "predicate": "security.job.workflow",
        "cardinality": "one",
        "type": "subject:security.workflow",
        "description": "The workflow the job is declared in.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.job/workflow.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.job/workflow_ref.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.product/name.json",
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
          "security.file-v1"
        ],
        "subject_kinds": [
          "security.product"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.product/supplied_by.json",
        "kit": "security"
      },
      {
        "name": "component",
        "predicate": "security.release.component",
        "cardinality": "many",
        "type": "string",
        "description": "A component of the release, as its package URL with version (purl@version), observed in an SBOM; for a runtime a scan observed running, the runtime's own purl (OSV decides distro builds by it).",
        "evidence": [
          "security.file-erasable-v1",
          "security.file-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.release/component.json",
        "kit": "security"
      },
      {
        "name": "osv_coverage",
        "predicate": "security.release.osv_coverage",
        "cardinality": "one",
        "type": "string",
        "description": "Whether OSV answered for every component of the release, as the OSV query Capture shows: complete (N of N components answered), or partial with how many it answered, the purl types it does not index (brew, generic: never asked, since OSV's empty answer there would read as no advisories) and how many went unanswered. What OSV indexes is its own word (its ecosystems.txt, captured beside every query) read through the kit's purl type map. An empty OSV answer is a negative only under complete coverage. It is bound to the exact component set OSV answered for (set: 16 hex of the sha256 of the sorted component purls): another set, even of the same size, is unanswered until OSV answers again. Components the SBOM lists without a purl (unidentified) keep it partial.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.release/osv_coverage.json",
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
          "security.file-v1"
        ],
        "subject_kinds": [
          "security.release"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.release/product.json",
        "kit": "security"
      },
      {
        "name": "product_alias",
        "predicate": "security.release.product_alias",
        "cardinality": "many",
        "type": "string",
        "description": "Another name the release's product goes by in vulnerability records, as an analyst states it citing evidence (a workspace file retained by security.evidence-acquire: the formula, the project page): vendor/product as a CVE record's affected entry names it (cli/cli for a Homebrew gh release), a package URL without version (pkg:golang/github.com/cli/cli/v2), a repository URL (https://github.com/cli/cli) or a CPE prefix (cpe:2.3:a:github:cli). security.cve-applicability matches a record by it as by the release's own name; re-acquire the record after stating it.",
        "evidence": [
          "security.file-v1"
        ],
        "evidence_requirement": "captured",
        "subject_kinds": [
          "security.release"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.release/product_alias.json",
        "kit": "security"
      },
      {
        "name": "product_name",
        "predicate": "security.release.product_name",
        "cardinality": "one",
        "type": "string",
        "description": "The product's name; with version, the release's key. A release a runtime scan observed is named by its purl's whole namespace and name (debian/php8.2, github.com/cli/cli/v2), never a last segment.",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.release/product_name.json",
        "kit": "security"
      },
      {
        "name": "unidentified_components",
        "predicate": "security.release.unidentified_components",
        "cardinality": "one",
        "type": "integer",
        "description": "How many components the release's SBOM lists without a package URL with a version (an operating-system component too): what they are is unknown, OSV is never asked about them, so the release's OSV coverage stays partial and no negative rests on OSV's silence. Restated (revised) when a later SBOM of the release counts differently.",
        "evidence": [
          "security.file-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.release/unidentified_components.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.release/version.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.remediation/due_at.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.remediation/progress.json",
        "kit": "security"
      },
      {
        "name": "revokes_key",
        "predicate": "security.remediation.revokes_key",
        "cardinality": "one",
        "type": "string",
        "description": "The key id a rotation must retire: the credential's key_id when the rotation was raised.",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.remediation/revokes_key.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.remediation/target_release.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.repo/forge_host.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.repo/full_name.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.service/criticality.json",
        "kit": "security"
      },
      {
        "name": "log_source",
        "predicate": "security.service.log_source",
        "cardinality": "many",
        "type": "string",
        "description": "Where one of the service's logs lives, as a short identifier (caddy:app-1:/var/log/caddy/access.log): a pointer, nothing else. Retention, how to query it, who owns it and any reasoning go in a doc section the Claim cites, never in the value. An incident's audit of the service starts from this list (the respond Line names it); audit.log_source is the set that incident audits.",
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.service/log_source.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.service/name.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.service/owned_by.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.signal/detector.json",
        "kit": "security"
      },
      {
        "name": "explained_by",
        "predicate": "security.signal.explained_by",
        "cardinality": "one",
        "type": "subject:security.change,security.finding,security.job,security.target,security.workflow",
        "description": "A hypothesis for the signal: what is responsible (a finding: the anomaly is exploitation of that weakness). Competing hypotheses contend (set --contend); the slot resolves when one remains.",
        "evidence": [
          "playbill.coordinator-self-source-v1",
          "security.fetched-large-v1",
          "security.fetched-v1"
        ],
        "subject_kinds": [
          "security.signal"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.signal/explained_by.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.signal/fingerprint.json",
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
          "security.fetched-large-v1",
          "security.fetched-v1",
          "security.file-v1",
          "security.observation-output-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.signal/observed.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.supplier/name.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.target/name.json",
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.target/publish_gate.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.target/registry.json",
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
          "security.fetched-v1"
        ],
        "subject_kinds": [
          "security.target"
        ],
        "roles": [
          "normative"
        ],
        "default_role": "normative",
        "revision_evidence": "replace",
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.target/source_repo.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.team/name.json",
        "kit": "security"
      },
      {
        "name": "affected_product",
        "predicate": "security.vulnerability.affected_product",
        "cardinality": "many",
        "type": "string",
        "description": "A product the vulnerability's CVE record names as affected, named as the kit names releases (an affected entry's product, or its packageName: php, cli/cli), whether or not inventory holds it: with OSV's packages and the releases assessed affected, the products an incident's RQ1 must rule out on an asset before it answers the asset none. A release the record names by another name is matched through its product_alias.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/affected_product.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/cve_id.json",
        "kit": "security"
      },
      {
        "name": "epss_percentile",
        "predicate": "security.vulnerability.epss_percentile",
        "cardinality": "one",
        "type": "string",
        "description": "The EPSS score's percentile among all scored CVEs, as the daily file states it.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/epss_percentile.json",
        "kit": "security"
      },
      {
        "name": "epss_score",
        "predicate": "security.vulnerability.epss_score",
        "cardinality": "one",
        "type": "string",
        "description": "FIRST's EPSS probability of exploitation in the next 30 days, as the daily file states it.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/epss_score.json",
        "kit": "security"
      },
      {
        "name": "kev_date_added",
        "predicate": "security.vulnerability.kev_date_added",
        "cardinality": "one",
        "type": "string",
        "description": "The date CISA added the vulnerability to the KEV catalog (dateAdded).",
        "evidence": [
          "security.fetched-v1",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/kev_date_added.json",
        "kit": "security"
      },
      {
        "name": "kev_due_date",
        "predicate": "security.vulnerability.kev_due_date",
        "cardinality": "one",
        "type": "string",
        "description": "The KEV remediation due date for federal agencies (dueDate).",
        "evidence": [
          "security.fetched-v1",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/kev_due_date.json",
        "kit": "security"
      },
      {
        "name": "kev_listed",
        "predicate": "security.vulnerability.kev_listed",
        "cardinality": "one",
        "type": "boolean",
        "description": "Whether the CISA Known Exploited Vulnerabilities catalog lists the vulnerability.",
        "evidence": [
          "security.fetched-v1",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/kev_listed.json",
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
          "security.fetched-v1",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/kev_ransomware_use.json",
        "kit": "security"
      },
      {
        "name": "package",
        "predicate": "security.vulnerability.package",
        "cardinality": "many",
        "type": "string",
        "description": "A package OSV's records say the vulnerability affects, as a package URL without version (pkg:deb/debian/php8.2, pkg:pypi/jinja2): OSV knows the CVE. A release whose components OSV answered in full and that holds none of these packages is not affected (an incident's RQ1 reads it none, citing both); with none stated, OSV's silence decides nothing.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/package.json",
        "kit": "security"
      },
      {
        "name": "title",
        "predicate": "security.vulnerability.title",
        "cardinality": "one",
        "type": "string",
        "description": "The vulnerability's title as a retained source states it.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/title.json",
        "kit": "security"
      },
      {
        "name": "vendor_product",
        "predicate": "security.vulnerability.vendor_product",
        "cardinality": "one",
        "type": "string",
        "description": "The affected vendor and product as a retained source states it.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/vendor_product.json",
        "kit": "security"
      },
      {
        "name": "watch_reason",
        "predicate": "security.vulnerability.watch_reason",
        "cardinality": "one",
        "type": "string",
        "description": "The decision to track the vulnerability, and why. A vulnerability is tracked when it has one, when an affected or inconclusive assessment links it to a release in inventory, or when an incident responds to it; a bare vulnerability Subject is tracked by nothing.",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.vulnerability/watch_reason.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.work/assessment.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.work/asset.json",
        "kit": "security"
      },
      {
        "name": "security.work.audit",
        "predicate": "security.work.audit",
        "cardinality": "one",
        "type": "subject:security.audit",
        "description": "The audit whose answer raised this work item (a rotation).",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.work/audit.json",
        "kit": "security"
      },
      {
        "name": "security.work.credential",
        "predicate": "security.work.credential",
        "cardinality": "one",
        "type": "subject:security.credential",
        "description": "The credential this work item rotates.",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.work/credential.json",
        "kit": "security"
      },
      {
        "name": "security.work.finding",
        "predicate": "security.work.finding",
        "cardinality": "one",
        "type": "subject:security.finding",
        "description": "The finding this work item answers (a remediation fixes it; an approved exception accepts its risk).",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.work/finding.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.work/job.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.work/owner.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.work/rationale.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.work/review_at.json",
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
        "description": "Whether the work was verified, as observed from retained evidence: a patch by a full runtime-inventory scan (the asset no longer runs the affected release), a rotation by a separate state read of the credential (the old key revoked, a new one issued). A self-report (remediation.progress completed) never sets it.",
        "evidence": [
          "security.file-erasable-v1",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.work/verification.json",
        "kit": "security"
      },
      {
        "name": "coverage",
        "predicate": "security.workflow.coverage",
        "cardinality": "one",
        "type": "subject:security.coverage",
        "description": "The coverage (source at a revision) the workflow was read under.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.workflow/coverage.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.workflow/path.json",
        "kit": "security"
      },
      {
        "name": "repo",
        "predicate": "security.workflow.repo",
        "cardinality": "one",
        "type": "subject:security.repo",
        "description": "The repository the workflow file is in.",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/security.workflow/repo.json",
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
        "contention": {
          "selector": "only_contender",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.workflow/source.json",
        "kit": "security"
      },
      {
        "name": "trigger",
        "predicate": "security.workflow.trigger",
        "cardinality": "many",
        "type": "string",
        "description": "An event that triggers the workflow, as event[:filter:pattern] (push:tags:v*, workflow_dispatch, schedule:cron:0 6 * * *).",
        "evidence": [
          "security.fetched-v1"
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
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/security.workflow/trigger.json",
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
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 8,
        "revision": 1,
        "path": "claim-types/semantic/alias.json"
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
        "revision_evidence": "replace",
        "contention": {
          "selector": "all",
          "on_conflict": "unresolved"
        },
        "format": 7,
        "revision": 1,
        "path": "claim-types/semantic/distinct_from.json"
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"ClaimType:security.artifact.built_from\")"
    ]
  }
});
