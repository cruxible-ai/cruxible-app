// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 6aaec841
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CaptureContract:security.fetched-v1"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "CaptureContract:security.fetched-v1",
        "kind": "capture_contract",
        "detail": "summary",
        "card": {
          "contract": "CaptureContract:security.fetched-v1",
          "version": 1,
          "lifecycle": "live",
          "captures": {
            "grade": "observed",
            "source_kinds": [
              "external"
            ]
          },
          "admitted_by": [
            "security.artifact.built_from",
            "security.artifact.declared_sha256",
            "security.artifact.publish_environment",
            "security.artifact.published_by",
            "security.artifact.release",
            "security.artifact.sha256",
            "security.artifact.target",
            "security.artifact.uploaded_by",
            "security.assessment.component",
            "security.assessment.justification",
            "security.assessment.release",
            "security.assessment.status",
            "security.assessment.vulnerability",
            "security.coverage.of",
            "security.coverage.revision",
            "security.finding.affects",
            "security.finding.fixed_by",
            "security.finding.vulnerability",
            "security.job.environment",
            "security.job.needs",
            "security.job.permission",
            "security.job.publishes_to",
            "security.job.secret",
            "security.job.uses",
            "security.job.workflow",
            "security.release.osv_coverage",
            "security.signal.explained_by",
            "security.signal.observed",
            "security.target.source_repo",
            "security.vulnerability.affected_product",
            "security.vulnerability.epss_percentile",
            "security.vulnerability.epss_score",
            "security.vulnerability.kev_date_added",
            "security.vulnerability.kev_due_date",
            "security.vulnerability.kev_listed",
            "security.vulnerability.kev_ransomware_use",
            "security.vulnerability.package",
            "security.vulnerability.title",
            "security.vulnerability.vendor_product",
            "security.workflow.coverage",
            "security.workflow.repo",
            "security.workflow.trigger"
          ],
          "next": [
            "cx.get(\"CaptureContract:security.fetched-v1\", detail=\"history\")",
            "cx.get(\"ClaimType:security.artifact.built_from\")"
          ]
        },
        "coordinate": {
          "git_oid": "f3765015f78f",
          "generation": 12
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
          "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
          "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
          "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
        },
        "evaluation_time": "2026-10-26T19:05:00.799868Z"
      }
    ]
  }
});
