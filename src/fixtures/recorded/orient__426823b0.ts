// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient d3720f0b
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
    "section": "subject_kinds",
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
    "evaluation_time": "2026-10-26T19:05:02.648077Z",
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
        "kind": "security.audit",
        "rule": "keys",
        "keys": [
          "security.audit.incident_ref",
          "security.audit.service_ref"
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
        "kind": "security.credential",
        "rule": "keys",
        "keys": [
          "security.credential.issuer",
          "security.credential.name"
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
        "kind": "security.finding",
        "rule": "keys",
        "keys": [
          "security.finding.repo_ref",
          "security.finding.weakness",
          "security.finding.locus"
        ],
        "uniqueness": "unique",
        "kit": "security"
      },
      {
        "kind": "security.incident",
        "rule": "keys",
        "keys": [
          "security.incident.name"
        ],
        "uniqueness": "unique",
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
