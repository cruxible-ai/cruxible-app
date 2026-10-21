// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient d9922545
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
    "kind": "security.artifact"
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
    "evaluation_time": "2026-10-21T19:49:22.271985Z",
    "kind_detail": {
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
          "path": "claim-types/security.artifact/built_from.json",
          "live_claims": 12,
          "subjects_with_value": 12
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
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.artifact/declared_sha256.json",
          "live_claims": 7,
          "subjects_with_value": 7
        },
        {
          "name": "name",
          "predicate": "security.artifact.name",
          "cardinality": "one",
          "type": "string",
          "description": "The published file's name (a release asset as tag/asset); with target_ref, the artifact's key.",
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
          "live_claims": 19,
          "subjects_with_value": 19
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
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.artifact/publish_environment.json",
          "live_claims": 12,
          "subjects_with_value": 12
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
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.artifact/published_by.json",
          "live_claims": 12,
          "subjects_with_value": 12
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
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.artifact/release.json",
          "live_claims": 12,
          "subjects_with_value": 12
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
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.artifact/sha256.json",
          "live_claims": 13,
          "subjects_with_value": 13
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
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.artifact/target.json",
          "live_claims": 19,
          "subjects_with_value": 19
        },
        {
          "name": "target_ref",
          "predicate": "security.artifact.target_ref",
          "cardinality": "one",
          "type": "string",
          "description": "The artifact's target as registry/name; with name, the artifact's key.",
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
          "live_claims": 19,
          "subjects_with_value": 19
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
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.artifact/uploaded_by.json",
          "live_claims": 1,
          "subjects_with_value": 1
        }
      ],
      "incoming": [
        "security.signal.observed"
      ],
      "sample_subject_ids": [
        "github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz",
        "github-release-cruxible-ai-cruxible--v0.3.2-agent-release-0.3.2.tar.gz",
        "github-release-cruxible-ai-cruxible--v0.3.2-case-law-monitoring-0.3.2.tar.gz",
        "github-release-cruxible-ai-cruxible--v0.3.2-kev-reference-0.3.2.tar.gz",
        "github-release-cruxible-ai-cruxible--v0.3.2-kev-triage-0.3.2.tar.gz"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.artifact\", select=[\"built_from\", \"declared_sha256\", \"name\"], limit=10)",
      "cx.query(kind=\"security.artifact\", follow=[{\"field\": \"security.signal.observed\", \"as\": \"signal\", \"direction\": \"reverse\"}], select=[\"signal\"], limit=10)",
      "cx.get(\"security.artifact/github-release-cruxible-ai-cruxible--v0.3.2-agent-operation-0.3.2.tar.gz\")"
    ]
  }
});
