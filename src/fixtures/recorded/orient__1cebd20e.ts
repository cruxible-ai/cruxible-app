// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient a72b4d24
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
    "section": "subject_kinds",
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
    "evaluation_time": "2026-10-20T21:38:23.532574Z",
    "section": "subject_kinds",
    "subject_kinds": [
      {
        "kind": "security.artifact",
        "rule": "keys",
        "keys": [
          "security.artifact.target_ref",
          "security.artifact.name"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.assessment",
        "rule": "keys",
        "keys": [
          "security.assessment.release_id",
          "security.assessment.cve_id"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.asset",
        "rule": "keys",
        "keys": [
          "security.asset.hostname"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.change",
        "rule": "keys",
        "keys": [
          "security.change.repo_ref",
          "security.change.commit_sha"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.control",
        "rule": "minted",
        "kit": "security"
      },
      {
        "kind": "security.coverage",
        "rule": "keys",
        "keys": [
          "security.coverage.source",
          "security.coverage.scope"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.exception",
        "rule": "minted",
        "kit": "security"
      },
      {
        "kind": "security.job",
        "rule": "keys",
        "keys": [
          "security.job.workflow_ref",
          "security.job.job_key"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.product",
        "rule": "keys",
        "keys": [
          "security.product.name"
        ],
        "uniqueness": "hint",
        "kit": "security"
      },
      {
        "kind": "security.release",
        "rule": "keys",
        "keys": [
          "security.release.product_name",
          "security.release.version"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.remediation",
        "rule": "minted",
        "kit": "security"
      },
      {
        "kind": "security.repo",
        "rule": "keys",
        "keys": [
          "security.repo.forge_host",
          "security.repo.full_name"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.service",
        "rule": "keys",
        "keys": [
          "security.service.name"
        ],
        "uniqueness": "hint",
        "kit": "security"
      },
      {
        "kind": "security.signal",
        "rule": "keys",
        "keys": [
          "security.signal.detector",
          "security.signal.fingerprint"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.supplier",
        "rule": "keys",
        "keys": [
          "security.supplier.name"
        ],
        "uniqueness": "hint",
        "kit": "security"
      },
      {
        "kind": "security.target",
        "rule": "keys",
        "keys": [
          "security.target.registry",
          "security.target.name"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.team",
        "rule": "keys",
        "keys": [
          "security.team.name"
        ],
        "uniqueness": "hint",
        "kit": "security"
      },
      {
        "kind": "security.vulnerability",
        "rule": "keys",
        "keys": [
          "security.vulnerability.cve_id"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.workflow",
        "rule": "keys",
        "keys": [
          "security.workflow.source",
          "security.workflow.path"
        ],
        "uniqueness": "unique",
        "kit": "security"
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"SubjectKind:security.artifact\")"
    ]
  }
});
