// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 8a6e649f
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
    "section": "pins",
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
    "evaluation_time": "2026-10-26T19:05:01.113037Z",
    "section": "pins",
    "pins": [
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.coordinator-claim-self-source-v1"
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.coordinator-proposer-observed-v1"
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.coordinator-retained-cas-v1"
      },
      {
        "source": "CaptureContract:playbill.coordinator-self-source-v1",
        "role": "commitment-canonicalizer",
        "target": "Contract:sha256-bytes-v1"
      },
      {
        "source": "CaptureContract:security.fetched-large-v1",
        "role": "commitment-canonicalizer",
        "target": "Contract:canonical-json-v1"
      },
      {
        "source": "CaptureContract:security.fetched-large-v1",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.fetched-large-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.fetched-large-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.fetched-large-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:security.fetched-large-v1",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "CaptureContract:security.fetched-v1",
        "role": "commitment-canonicalizer",
        "target": "Contract:canonical-json-v1"
      },
      {
        "source": "CaptureContract:security.fetched-v1",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.fetched-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.fetched-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.fetched-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.retained-selection-replay-v1"
      },
      {
        "source": "CaptureContract:security.fetched-v1",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "CaptureContract:security.file-erasable-v1",
        "role": "commitment-canonicalizer",
        "target": "Contract:canonical-json-v1"
      },
      {
        "source": "CaptureContract:security.file-erasable-v1",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.file-erasable-v1",
        "role": "erasure-rule",
        "target": "Contract:playbill.capture-erasure-authority-v1"
      },
      {
        "source": "CaptureContract:security.file-erasable-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.file-erasable-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1"
      },
      {
        "source": "CaptureContract:security.file-erasable-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.file-erasable-v1",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "CaptureContract:security.file-v1",
        "role": "commitment-canonicalizer",
        "target": "Contract:canonical-json-v1"
      },
      {
        "source": "CaptureContract:security.file-v1",
        "role": "coordinate-schema",
        "target": "Contract:http-response-v1"
      },
      {
        "source": "CaptureContract:security.file-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.file-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1"
      },
      {
        "source": "CaptureContract:security.file-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "CaptureContract:security.file-v1",
        "role": "selector-schema",
        "target": "Contract:whole-response-v1"
      },
      {
        "source": "CaptureContract:security.observation-output-v1",
        "role": "commitment-canonicalizer",
        "target": "Contract:canonical-json-v1"
      },
      {
        "source": "CaptureContract:security.observation-output-v1",
        "role": "provenance-rule",
        "target": "Contract:playbill.external.daemon-fetched-v1"
      },
      {
        "source": "CaptureContract:security.observation-output-v1",
        "role": "replay-policy",
        "target": "Contract:playbill.external.exact-replay-v1"
      },
      {
        "source": "CaptureContract:security.observation-output-v1",
        "role": "source-subject-mapping",
        "target": "Contract:playbill.external.record-subject-v1"
      },
      {
        "source": "ClaimType:security.artifact.built_from",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.declared_sha256",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.publish_environment",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.published_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.release",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.release",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.sha256",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-large-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.sha256",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.target",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.artifact.uploaded_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.component",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.component",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.component",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.justification",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.justification",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.justification",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.justification",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.release",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.release",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.status",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.status",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.status",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.status",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.vulnerability",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.assessment.vulnerability",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.asset.runs",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.asset.scanned_in",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.audit.incident",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.audit.incident",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.audit.read",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.audit.result",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.audit.result",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.audit.service",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.audit.service",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.coverage.looked_for",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.coverage.of",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.coverage.revision",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.coverage.revision",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.credential.issued_at",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.credential.issued_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.credential.key_id",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.credential.revoked_key",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.affects",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.affects",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.fixed_by",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.fixed_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.justification",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.justification",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.repo",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.repo",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.reported_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.reproduction",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.reproduction",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.rule",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.severity",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.severity",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.verdict",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.verification",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.vulnerability",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.finding.vulnerability",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.job.environment",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.job.needs",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.job.permission",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.job.publishes_to",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.job.secret",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.job.uses",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.job.workflow",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.product.supplied_by",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.product.supplied_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.release.component",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.release.component",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.release.osv_coverage",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.release.product",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.release.product",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.release.product_alias",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.release.unidentified_components",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.signal.explained_by",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.signal.explained_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-large-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.signal.explained_by",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.signal.observed",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.signal.observed",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-large-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.signal.observed",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.signal.observed",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.signal.observed",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.target.source_repo",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.target.source_repo",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.affected_product",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.epss_percentile",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.epss_score",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_date_added",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_date_added",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_due_date",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_due_date",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_listed",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_listed",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_ransomware_use",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.kev_ransomware_use",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.package",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.title",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.vulnerability.vendor_product",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.work.verification",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.work.verification",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.workflow.coverage",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.workflow.repo",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:security.workflow.trigger",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "ClaimType:semantic.alias",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "ClaimType:semantic.distinct_from",
        "role": "capture-contract",
        "target": "CaptureContract:playbill.coordinator-self-source-v1",
        "current": true
      },
      {
        "source": "Line:security.credential-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Line:security.credential-import",
        "role": "procedure",
        "target": "Procedure:security.credential-import",
        "current": true
      },
      {
        "source": "Line:security.cve-applicability",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Line:security.cve-applicability",
        "role": "procedure",
        "target": "Procedure:security.cve-applicability",
        "current": true
      },
      {
        "source": "Line:security.epss-daily",
        "role": "procedure",
        "target": "Procedure:security.epss-acquire",
        "current": true
      },
      {
        "source": "Line:security.epss-triage",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Line:security.epss-triage",
        "role": "procedure",
        "target": "Procedure:security.epss-triage",
        "current": true
      },
      {
        "source": "Line:security.harden",
        "role": "procedure",
        "target": "Procedure:security.harden",
        "current": true
      },
      {
        "source": "Line:security.inventory-import.prod",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Line:security.inventory-import.prod",
        "role": "procedure",
        "target": "Procedure:security.inventory-import",
        "current": true
      },
      {
        "source": "Line:security.kev-attention",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Line:security.kev-attention",
        "role": "procedure",
        "target": "Procedure:security.kev-attention",
        "current": true
      },
      {
        "source": "Line:security.kev-daily",
        "role": "procedure",
        "target": "Procedure:security.fetch-observed",
        "current": true
      },
      {
        "source": "Line:security.kev-triage",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Line:security.kev-triage",
        "role": "procedure",
        "target": "Procedure:security.kev-triage",
        "current": true
      },
      {
        "source": "Line:security.osv-applicability",
        "role": "procedure",
        "target": "Procedure:security.osv-applicability",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible",
        "role": "procedure",
        "target": "Procedure:security.registry-parse",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible-client",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Line:security.registry-parse.cruxible-client",
        "role": "procedure",
        "target": "Procedure:security.registry-parse",
        "current": true
      },
      {
        "source": "Line:security.registry-pull.cruxible",
        "role": "procedure",
        "target": "Procedure:security.registry-acquire",
        "current": true
      },
      {
        "source": "Line:security.registry-pull.cruxible-client",
        "role": "procedure",
        "target": "Procedure:security.registry-acquire",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-ci",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Line:security.repo-parse.cruxible-ci",
        "role": "procedure",
        "target": "Procedure:security.repo-parse",
        "current": true
      },
      {
        "source": "Line:security.repo-pull.cruxible-ci",
        "role": "procedure",
        "target": "Procedure:security.repo-acquire",
        "current": true
      },
      {
        "source": "Line:security.sarif-attention.cruxible",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Line:security.sarif-attention.cruxible",
        "role": "procedure",
        "target": "Procedure:security.sarif-attention",
        "current": true
      },
      {
        "source": "Line:security.sarif-import.cruxible",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Line:security.sarif-import.cruxible",
        "role": "procedure",
        "target": "Procedure:security.sarif-import",
        "current": true
      },
      {
        "source": "Line:security.sbom-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Line:security.sbom-import",
        "role": "procedure",
        "target": "Procedure:security.sbom-import",
        "current": true
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-large-v1",
        "current": true
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "contract-out",
        "target": "Contract:security-http-evidence"
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "contract-in",
        "target": "Contract:security.asset-fetch-input"
      },
      {
        "source": "Procedure:security.asset-fetch",
        "role": "provider-interface",
        "target": "ProviderInterface:security.release-asset/v1",
        "current": true
      },
      {
        "source": "Procedure:security.credential-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Procedure:security.credential-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence"
      },
      {
        "source": "Procedure:security.credential-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input"
      },
      {
        "source": "Procedure:security.credential-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.credential-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Procedure:security.credential-import",
        "role": "contract-out",
        "target": "Contract:security-credential-state-summary"
      },
      {
        "source": "Procedure:security.credential-import",
        "role": "contract-in",
        "target": "Contract:security-empty-input"
      },
      {
        "source": "Procedure:security.credential-import",
        "role": "provider-interface",
        "target": "ProviderInterface:security.credential-state/v1",
        "current": true
      },
      {
        "source": "Procedure:security.credential-import",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.credential-import",
        "role": "query",
        "target": "QueryDefinition:security.rotation_work",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "contract-out",
        "target": "Contract:security-cve-applicability-summary"
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "contract-in",
        "target": "Contract:security-empty-input"
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cve-applicability/v1",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/v3",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "query",
        "target": "QueryDefinition:security.assessment_index",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "query",
        "target": "QueryDefinition:security.release_sources",
        "current": true
      },
      {
        "source": "Procedure:security.cve-applicability",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "current": true
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "contract-out",
        "target": "Contract:security-http-evidence"
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "contract-in",
        "target": "Contract:security.epss-acquire-input"
      },
      {
        "source": "Procedure:security.epss-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-daily/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract-in",
        "target": "Contract:security-empty-input"
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "contract-out",
        "target": "Contract:security-epss-summary"
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-daily/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-scores/v1",
        "current": true
      },
      {
        "source": "Procedure:security.epss-triage",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "current": true
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence"
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input"
      },
      {
        "source": "Procedure:security.evidence-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.fetch",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.fetch",
        "role": "contract-out",
        "target": "Contract:security-http-evidence"
      },
      {
        "source": "Procedure:security.fetch",
        "role": "contract-in",
        "target": "Contract:security.fetch-input"
      },
      {
        "source": "Procedure:security.fetch",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/v3",
        "current": true
      },
      {
        "source": "Procedure:security.fetch-observed",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.fetch-observed",
        "role": "capture-contract",
        "target": "CaptureContract:security.observation-output-v1",
        "current": true
      },
      {
        "source": "Procedure:security.fetch-observed",
        "role": "contract-out",
        "target": "Contract:security-http-evidence"
      },
      {
        "source": "Procedure:security.fetch-observed",
        "role": "contract-in",
        "target": "Contract:security.fetch-observed-input"
      },
      {
        "source": "Procedure:security.fetch-observed",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/v3",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "contract-in",
        "target": "Contract:security-harden-input"
      },
      {
        "source": "Procedure:security.harden",
        "role": "contract-out",
        "target": "Contract:security-harden-summary"
      },
      {
        "source": "Procedure:security.harden",
        "role": "provider-interface",
        "target": "ProviderInterface:security.harden/v1",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.credentialed_jobs",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.mutable_actions",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.publish_paths",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.published_findings",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.served_vs_declared",
        "current": true
      },
      {
        "source": "Procedure:security.harden",
        "role": "query",
        "target": "QueryDefinition:security.shared_dependencies",
        "current": true
      },
      {
        "source": "Procedure:security.inventory-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Procedure:security.inventory-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence"
      },
      {
        "source": "Procedure:security.inventory-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input"
      },
      {
        "source": "Procedure:security.inventory-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.inventory-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Procedure:security.inventory-import",
        "role": "contract-in",
        "target": "Contract:security-inventory-import-input"
      },
      {
        "source": "Procedure:security.inventory-import",
        "role": "contract-out",
        "target": "Contract:security-runtime-inventory-summary"
      },
      {
        "source": "Procedure:security.inventory-import",
        "role": "provider-interface",
        "target": "ProviderInterface:security.runtime-inventory/v1",
        "current": true
      },
      {
        "source": "Procedure:security.inventory-import",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.inventory-import",
        "role": "query",
        "target": "QueryDefinition:security.inventory_index",
        "current": true
      },
      {
        "source": "Procedure:security.inventory-import",
        "role": "query",
        "target": "QueryDefinition:security.inventory_patches",
        "current": true
      },
      {
        "source": "Procedure:security.inventory-import",
        "role": "query",
        "target": "QueryDefinition:security.inventory_runs",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "contract-in",
        "target": "Contract:security-empty-input"
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "contract-out",
        "target": "Contract:security-kev-attention-summary"
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-attention/v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/v3",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "query",
        "target": "QueryDefinition:security.assessment_index",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "current": true
      },
      {
        "source": "Procedure:security.kev-attention",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract-in",
        "target": "Contract:security-empty-input"
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "contract-out",
        "target": "Contract:security-kev-triage-summary"
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-catalog/v2",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/v3",
        "current": true
      },
      {
        "source": "Procedure:security.kev-triage",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "current": true
      },
      {
        "source": "Procedure:security.log-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Procedure:security.log-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence"
      },
      {
        "source": "Procedure:security.log-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input"
      },
      {
        "source": "Procedure:security.log-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.log-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Procedure:security.log-import",
        "role": "contract-in",
        "target": "Contract:security-log-import-input"
      },
      {
        "source": "Procedure:security.log-import",
        "role": "contract-out",
        "target": "Contract:security-log-read-summary"
      },
      {
        "source": "Procedure:security.log-import",
        "role": "provider-interface",
        "target": "ProviderInterface:security.log-reads/v1",
        "current": true
      },
      {
        "source": "Procedure:security.log-import",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.log-import",
        "role": "query",
        "target": "QueryDefinition:security.audit_status",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "contract-in",
        "target": "Contract:security.osv-applicability-input"
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "contract-out",
        "target": "Contract:security.osv-applicability-output"
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-applicability/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-ecosystems/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-query/v1",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.assessment_index",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "current": true
      },
      {
        "source": "Procedure:security.osv-applicability",
        "role": "query",
        "target": "QueryDefinition:security.watched_vulnerabilities",
        "current": true
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "contract-in",
        "target": "Contract:security.registry-acquire-input"
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "contract-out",
        "target": "Contract:security.registry-acquire-output"
      },
      {
        "source": "Procedure:security.registry-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.pypi-release/v1",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "contract-in",
        "target": "Contract:security-registry-parse-input"
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "contract-out",
        "target": "Contract:security-registry-parse-summary"
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "provider-interface",
        "target": "ProviderInterface:security.pypi-release/v1",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "provider-interface",
        "target": "ProviderInterface:security.registry-facts/v1",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "query",
        "target": "QueryDefinition:security.coverage_index",
        "current": true
      },
      {
        "source": "Procedure:security.registry-parse",
        "role": "query",
        "target": "QueryDefinition:security.registry_facts",
        "current": true
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "contract-in",
        "target": "Contract:security.repo-acquire-input"
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "contract-out",
        "target": "Contract:security.repo-acquire-output"
      },
      {
        "source": "Procedure:security.repo-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:security.repo-snapshot/v1",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "contract-in",
        "target": "Contract:security-repo-parse-input"
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "contract-out",
        "target": "Contract:security-repo-parse-summary"
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "provider-interface",
        "target": "ProviderInterface:security.repo-snapshot/v1",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "provider-interface",
        "target": "ProviderInterface:security.workflow-facts/v1",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "query",
        "target": "QueryDefinition:security.coverage_index",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "query",
        "target": "QueryDefinition:security.registry_facts",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "query",
        "target": "QueryDefinition:security.repo_targets",
        "current": true
      },
      {
        "source": "Procedure:security.repo-parse",
        "role": "query",
        "target": "QueryDefinition:security.source_facts",
        "current": true
      },
      {
        "source": "Procedure:security.reproduction-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Procedure:security.reproduction-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence"
      },
      {
        "source": "Procedure:security.reproduction-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input"
      },
      {
        "source": "Procedure:security.reproduction-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "contract-in",
        "target": "Contract:security-respond-input"
      },
      {
        "source": "Procedure:security.respond",
        "role": "contract-out",
        "target": "Contract:security-respond-summary"
      },
      {
        "source": "Procedure:security.respond",
        "role": "provider-interface",
        "target": "ProviderInterface:security.respond/v1",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "query",
        "target": "QueryDefinition:security.audit_status",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "query",
        "target": "QueryDefinition:security.deployments",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "query",
        "target": "QueryDefinition:security.incident_credentials",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "query",
        "target": "QueryDefinition:security.incident_exceptions",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "query",
        "target": "QueryDefinition:security.incident_exposure",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "query",
        "target": "QueryDefinition:security.incident_patches",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "query",
        "target": "QueryDefinition:security.overdue_patches",
        "current": true
      },
      {
        "source": "Procedure:security.respond",
        "role": "query",
        "target": "QueryDefinition:security.scanned_runs",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence"
      },
      {
        "source": "Procedure:security.sarif-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input"
      },
      {
        "source": "Procedure:security.sarif-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-attention",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-attention",
        "role": "contract-in",
        "target": "Contract:security-sarif-import-input"
      },
      {
        "source": "Procedure:security.sarif-attention",
        "role": "contract-out",
        "target": "Contract:security-sarif-summary"
      },
      {
        "source": "Procedure:security.sarif-attention",
        "role": "provider-interface",
        "target": "ProviderInterface:security.sarif-findings/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-attention",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-attention",
        "role": "query",
        "target": "QueryDefinition:security.finding_index",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-import",
        "role": "contract-in",
        "target": "Contract:security-sarif-import-input"
      },
      {
        "source": "Procedure:security.sarif-import",
        "role": "contract-out",
        "target": "Contract:security-sarif-summary"
      },
      {
        "source": "Procedure:security.sarif-import",
        "role": "provider-interface",
        "target": "ProviderInterface:security.sarif-findings/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-import",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.sarif-import",
        "role": "query",
        "target": "QueryDefinition:security.finding_index",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "contract-out",
        "target": "Contract:security-file-evidence"
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "contract-in",
        "target": "Contract:security-path-input"
      },
      {
        "source": "Procedure:security.sbom-acquire",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract-in",
        "target": "Contract:security-empty-input"
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "contract-out",
        "target": "Contract:security-sbom-summary"
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cyclonedx-components/v1",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Procedure:security.sbom-import",
        "role": "query",
        "target": "QueryDefinition:security.release_inventory",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.credential-import-propose",
        "role": "procedure",
        "target": "Procedure:security.credential-import",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.cve-applicability-propose",
        "role": "procedure",
        "target": "Procedure:security.cve-applicability",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.epss-triage-propose",
        "role": "procedure",
        "target": "Procedure:security.epss-triage",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.inventory-import-propose",
        "role": "procedure",
        "target": "Procedure:security.inventory-import",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.kev-triage-propose",
        "role": "procedure",
        "target": "Procedure:security.kev-triage",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.log-import-propose",
        "role": "procedure",
        "target": "Procedure:security.log-import",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.osv-applicability-propose",
        "role": "procedure",
        "target": "Procedure:security.osv-applicability",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.registry-parse-propose",
        "role": "procedure",
        "target": "Procedure:security.registry-parse",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.repo-parse-propose",
        "role": "procedure",
        "target": "Procedure:security.repo-parse",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.sarif-import-propose",
        "role": "procedure",
        "target": "Procedure:security.sarif-import",
        "current": true
      },
      {
        "source": "ProcedureMandate:security.sbom-import-propose",
        "role": "procedure",
        "target": "Procedure:security.sbom-import",
        "current": true
      },
      {
        "source": "Provider:cruxible-builtin",
        "role": "provider-interface",
        "target": "ProviderInterface:workspace.file",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b",
        "role": "provider-interface",
        "target": "ProviderInterface:search.web/v2",
        "current": true
      },
      {
        "source": "Provider:cruxible-provider-web/ddc99c153ce3ca4226d991f11ab40f1d96fa0ad4364c8918f8aa82b0c840218b",
        "role": "provider-interface",
        "target": "ProviderInterface:web.fetch/v3",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.credential-state/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cve-applicability/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.cyclonedx-components/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-scores/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.harden/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-attention/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.kev-catalog/v2",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.log-reads/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-applicability/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.registry-facts/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.respond/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.runtime-inventory/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.sarif-findings/v1",
        "current": true
      },
      {
        "source": "Provider:security-analysis-provider/270ffc253cbd64aa2132c9a8ea9a53191c8c39fe5a3119a73ad2802c71d4fe21",
        "role": "provider-interface",
        "target": "ProviderInterface:security.workflow-facts/v1",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3",
        "role": "provider-interface",
        "target": "ProviderInterface:security.epss-daily/v1",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-ecosystems/v1",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3",
        "role": "provider-interface",
        "target": "ProviderInterface:security.osv-query/v1",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3",
        "role": "provider-interface",
        "target": "ProviderInterface:security.pypi-release/v1",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3",
        "role": "provider-interface",
        "target": "ProviderInterface:security.release-asset/v1",
        "current": true
      },
      {
        "source": "Provider:security-sources-provider/56caaa4d2c2b4e95421ca1927fdce2c4a6132ca237d2db12c1e9ca046d0c75e3",
        "role": "provider-interface",
        "target": "ProviderInterface:security.repo-snapshot/v1",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "current": true
      },
      {
        "source": "QueryDefinition:security.applicability_coverage",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.expected_status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.assessment_index",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.incident",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.log_source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.read",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.result",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.service",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.service_ref",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.window_end",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.incident.rotation_policy",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.incident.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.service.log_source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.audit_status",
        "role": "claim-type",
        "target": "ClaimType:security.service.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.change_impact",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.control.activation",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.control.kind",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.review_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.controls",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.coverage_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.environment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.permission",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.secret",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "current": true
      },
      {
        "source": "QueryDefinition:security.credentialed_jobs",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.looked_for",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.release.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.release.osv_coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.release.unidentified_components",
        "current": true
      },
      {
        "source": "QueryDefinition:security.deployments",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.approval",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.expires_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "current": true
      },
      {
        "source": "QueryDefinition:security.exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.review_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.approval",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.expires_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "current": true
      },
      {
        "source": "QueryDefinition:security.expired_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.review_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finder_record",
        "role": "claim-type",
        "target": "ClaimType:security.finding.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finder_record",
        "role": "claim-type",
        "target": "ClaimType:security.finding.locus",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finder_record",
        "role": "claim-type",
        "target": "ClaimType:security.finding.repo_ref",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finder_record",
        "role": "claim-type",
        "target": "ClaimType:security.finding.reported_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finder_record",
        "role": "claim-type",
        "target": "ClaimType:security.finding.rule",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finder_record",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verdict",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finder_record",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finder_record",
        "role": "claim-type",
        "target": "ClaimType:security.finding.weakness",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_index",
        "role": "claim-type",
        "target": "ClaimType:security.finding.locus",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_index",
        "role": "claim-type",
        "target": "ClaimType:security.finding.repo_ref",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_index",
        "role": "claim-type",
        "target": "ClaimType:security.finding.reported_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_index",
        "role": "claim-type",
        "target": "ClaimType:security.finding.rule",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_index",
        "role": "claim-type",
        "target": "ClaimType:security.finding.severity",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_index",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verdict",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_index",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_index",
        "role": "claim-type",
        "target": "ClaimType:security.finding.weakness",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_settle_condition",
        "role": "claim-type",
        "target": "ClaimType:security.finding.locus",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_settle_condition",
        "role": "claim-type",
        "target": "ClaimType:security.finding.repo_ref",
        "current": true
      },
      {
        "source": "QueryDefinition:security.finding_settle_condition",
        "role": "claim-type",
        "target": "ClaimType:security.finding.weakness",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      }
    ],
    "truncated": true,
    "next_cursor": "eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1NjplNzdkOWFhYWM1MTE2Yjc2YWFmN2I3MDYwZGVkZGU2YmNhMmNkYWFlYWE5MDljNTljMzkxYmQyMGYzNzc5OTI0IiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjgwNzU0MGIxNzdjYmM3OGUxOWUxYzU3NmMzNWM4N2ZjMmJkNWQxYzcwZDU3YWY5MzVjZmZkZGMzNGZlMDliZmIiLCJnaXRfb2lkIjoiZjM3NjUwMTVmNzhmNWVjODAwZjk1OWUxMGI1Y2ZkYzJjZjA2MjFmMyIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6NDkyNWVmNjljMjFmMDgxMTRlODNhZjg5MTk3MTIwMzQ0NjRhN2FlY2Q5MmMwNTkxMjBiZTBlMzYyNDRkNDEyMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OjIzNjJmYjNjZTFkYWUzY2IzNGFiODE2NDI2MjQyODA5YzU2Y2ZjNmUxNjRiMTIyMjk1YmE2NjIwOGFmYTg3YTMiLCJsYXN0X2tleSI6WyJRdWVyeURlZmluaXRpb246c2VjdXJpdHkuaW5jaWRlbnRfYWZmZWN0ZWQiLCIwIl0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6InBpbnMifSwic25hcHNob3QiOiJrZXlzZXQifQ==",
    "next": [
      "cx.get(\"CaptureContract:playbill.coordinator-self-source-v1\")",
      "cx.orient(section=\"pins\", cursor=\"eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1NjplNzdkOWFhYWM1MTE2Yjc2YWFmN2I3MDYwZGVkZGU2YmNhMmNkYWFlYWE5MDljNTljMzkxYmQyMGYzNzc5OTI0IiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjgwNzU0MGIxNzdjYmM3OGUxOWUxYzU3NmMzNWM4N2ZjMmJkNWQxYzcwZDU3YWY5MzVjZmZkZGMzNGZlMDliZmIiLCJnaXRfb2lkIjoiZjM3NjUwMTVmNzhmNWVjODAwZjk1OWUxMGI1Y2ZkYzJjZjA2MjFmMyIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6NDkyNWVmNjljMjFmMDgxMTRlODNhZjg5MTk3MTIwMzQ0NjRhN2FlY2Q5MmMwNTkxMjBiZTBlMzYyNDRkNDEyMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OjIzNjJmYjNjZTFkYWUzY2IzNGFiODE2NDI2MjQyODA5YzU2Y2ZjNmUxNjRiMTIyMjk1YmE2NjIwOGFmYTg3YTMiLCJsYXN0X2tleSI6WyJRdWVyeURlZmluaXRpb246c2VjdXJpdHkuaW5jaWRlbnRfYWZmZWN0ZWQiLCIwIl0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6InBpbnMifSwic25hcHNob3QiOiJrZXlzZXQifQ==\")"
    ]
  }
});
