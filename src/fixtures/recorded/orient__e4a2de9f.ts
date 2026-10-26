// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 5fb0074e
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
    "limit": 500,
    "cursor": "eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1NjplNzdkOWFhYWM1MTE2Yjc2YWFmN2I3MDYwZGVkZGU2YmNhMmNkYWFlYWE5MDljNTljMzkxYmQyMGYzNzc5OTI0IiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjgwNzU0MGIxNzdjYmM3OGUxOWUxYzU3NmMzNWM4N2ZjMmJkNWQxYzcwZDU3YWY5MzVjZmZkZGMzNGZlMDliZmIiLCJnaXRfb2lkIjoiZjM3NjUwMTVmNzhmNWVjODAwZjk1OWUxMGI1Y2ZkYzJjZjA2MjFmMyIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6NDkyNWVmNjljMjFmMDgxMTRlODNhZjg5MTk3MTIwMzQ0NjRhN2FlY2Q5MmMwNTkxMjBiZTBlMzYyNDRkNDEyMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OjIzNjJmYjNjZTFkYWUzY2IzNGFiODE2NDI2MjQyODA5YzU2Y2ZjNmUxNjRiMTIyMjk1YmE2NjIwOGFmYTg3YTMiLCJsYXN0X2tleSI6WyJRdWVyeURlZmluaXRpb246c2VjdXJpdHkuaW5jaWRlbnRfYWZmZWN0ZWQiLCIwIl0sImxpc3QiOiJvcmllbnQiLCJzZWxlY3Rpb24iOnsidmlldyI6InBpbnMifSwic25hcHNob3QiOiJrZXlzZXQifQ=="
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
    "evaluation_time": "2026-10-26T19:05:01.140365Z",
    "section": "pins",
    "pins": [
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.looked_for",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.incident.rotation_policy",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.incident.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.incident.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.release.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.service.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_affected",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.audit.incident",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.audit.service",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.credential.issued_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.credential.issued_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.credential.issuer",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.credential.key_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.credential.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.credential.used_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.incident.rotation_policy",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.incident.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.due_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.revokes_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.service.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.work.audit",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.work.credential",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_credentials",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.approval",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.exception.expires_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.incident.rotation_policy",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.incident.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.incident.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exceptions",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.looked_for",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.incident.rotation_policy",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.incident.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.incident.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.release.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.service.log_source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.service.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.affected_product",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.package",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.title",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.looked_for",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.rotation_policy",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.due_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.target_release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.service.log_source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.service.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.incident",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.result",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.audit.service",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.credential.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.credential.used_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.exception.approval",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.exception.expires_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.incident.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.service.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.work.credential",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incident_status",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.due_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.target_release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "current": true
      },
      {
        "source": "QueryDefinition:security.incomplete_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.asset.environment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.product.supplied_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.release.product",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_context",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.looked_for",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_index",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_runs",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_runs",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_runs",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_runs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_runs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_runs",
        "role": "claim-type",
        "target": "ClaimType:security.release.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_runs",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.inventory_runs",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_exposure",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.kev_triage_backlog",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.permission",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.secret",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.uses",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "current": true
      },
      {
        "source": "QueryDefinition:security.mutable_actions",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.location",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.locus",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.repo_ref",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.reported_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.reproduction",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.rule",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.severity",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verdict",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.weakness",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_findings",
        "role": "claim-type",
        "target": "ClaimType:security.work.finding",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.looked_for",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.rotation_policy",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.due_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.target_release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.service.log_source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.service.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.open_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.looked_for",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.rotation_policy",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.due_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.target_release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.service.log_source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.service.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.overdue_patches",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.ownership_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.ownership_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.ownership_gaps",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.job.publishes_to",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "current": true
      },
      {
        "source": "QueryDefinition:security.publish_paths",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.target",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.affects",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.locus",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.severity",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verdict",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.finding.weakness",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "current": true
      },
      {
        "source": "QueryDefinition:security.published_findings",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.built_from",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.declared_sha256",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.publish_environment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.published_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.sha256",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.target",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.change.commit_sha",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "current": true
      },
      {
        "source": "QueryDefinition:security.registry_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.product.supplied_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.osv_coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.product",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_alias",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.unidentified_components",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_inventory",
        "role": "claim-type",
        "target": "ClaimType:security.supplier.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_sources",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_sources",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.target",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_sources",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_sources",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.release_sources",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.due_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.target_release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.assessment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.asset",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.owner",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.rationale",
        "current": true
      },
      {
        "source": "QueryDefinition:security.remediation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "current": true
      },
      {
        "source": "QueryDefinition:security.repo_targets",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.audit.incident",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.credential.issued_at",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.credential.issued_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.credential.issuer",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.credential.key_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.credential.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.credential.revoked_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.incident.window_start",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.progress",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.remediation.revokes_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.audit",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.credential",
        "current": true
      },
      {
        "source": "QueryDefinition:security.rotation_work",
        "role": "claim-type",
        "target": "ClaimType:security.work.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.asset.hostname",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.asset.scanned_in",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.looked_for",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.release.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.release.osv_coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.release.unidentified_components",
        "current": true
      },
      {
        "source": "QueryDefinition:security.scanned_runs",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.declared_sha256",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.publish_environment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.published_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.sha256",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.artifact.target",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.job.environment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.job.publishes_to",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "current": true
      },
      {
        "source": "QueryDefinition:security.served_vs_declared",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.settle_condition",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.of",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.revision",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.scope",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.coverage.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.publishes_to",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.secret",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.uses",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.repo.forge_host",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.repo.full_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.target.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.target.publish_gate",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.target.registry",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.target.source_repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "current": true
      },
      {
        "source": "QueryDefinition:security.shared_dependencies",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.environment",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.job_key",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.needs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.permission",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.publishes_to",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.secret",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.uses",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.job.workflow",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.coverage",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.path",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.repo",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.source",
        "current": true
      },
      {
        "source": "QueryDefinition:security.source_facts",
        "role": "claim-type",
        "target": "ClaimType:security.workflow.trigger",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.product.supplied_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.release.product",
        "current": true
      },
      {
        "source": "QueryDefinition:security.supplier_concentration",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.justification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "current": true
      },
      {
        "source": "QueryDefinition:security.triage",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.unverified_fixes",
        "role": "claim-type",
        "target": "ClaimType:security.finding.fixed_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.unverified_fixes",
        "role": "claim-type",
        "target": "ClaimType:security.finding.locus",
        "current": true
      },
      {
        "source": "QueryDefinition:security.unverified_fixes",
        "role": "claim-type",
        "target": "ClaimType:security.finding.repo_ref",
        "current": true
      },
      {
        "source": "QueryDefinition:security.unverified_fixes",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verdict",
        "current": true
      },
      {
        "source": "QueryDefinition:security.unverified_fixes",
        "role": "claim-type",
        "target": "ClaimType:security.finding.verification",
        "current": true
      },
      {
        "source": "QueryDefinition:security.unverified_fixes",
        "role": "claim-type",
        "target": "ClaimType:security.finding.weakness",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.component",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.asset.installs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.asset.internet_exposed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.asset.runs",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.asset.serves",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.release.product_name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.release.version",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.service.criticality",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.service.owned_by",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "current": true
      },
      {
        "source": "QueryDefinition:security.urgent_exposures",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.release",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.status",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.assessment.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.incident.name",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.incident.vulnerability",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.affected_product",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.cve_id",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_percentile",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.epss_score",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_date_added",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_due_date",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_listed",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.kev_ransomware_use",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.package",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.title",
        "current": true
      },
      {
        "source": "QueryDefinition:security.watched_vulnerabilities",
        "role": "claim-type",
        "target": "ClaimType:security.vulnerability.watch_reason",
        "current": true
      },
      {
        "source": "Trigger:security.credential-landed",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Trigger:security.credential-landed",
        "role": "line",
        "target": "Line:security.credential-import",
        "current": true
      },
      {
        "source": "Trigger:security.cve-landed",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.cve-landed",
        "role": "line",
        "target": "Line:security.cve-applicability",
        "current": true
      },
      {
        "source": "Trigger:security.epss-daily",
        "role": "line",
        "target": "Line:security.epss-daily",
        "current": true
      },
      {
        "source": "Trigger:security.epss-landed",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.epss-landed",
        "role": "line",
        "target": "Line:security.epss-triage",
        "current": true
      },
      {
        "source": "Trigger:security.harden-daily",
        "role": "line",
        "target": "Line:security.harden",
        "current": true
      },
      {
        "source": "Trigger:security.harden-on-registry",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.harden-on-registry",
        "role": "line",
        "target": "Line:security.harden",
        "current": true
      }
    ],
    "truncated": true,
    "next_cursor": "eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1NjplNzdkOWFhYWM1MTE2Yjc2YWFmN2I3MDYwZGVkZGU2YmNhMmNkYWFlYWE5MDljNTljMzkxYmQyMGYzNzc5OTI0IiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjgwNzU0MGIxNzdjYmM3OGUxOWUxYzU3NmMzNWM4N2ZjMmJkNWQxYzcwZDU3YWY5MzVjZmZkZGMzNGZlMDliZmIiLCJnaXRfb2lkIjoiZjM3NjUwMTVmNzhmNWVjODAwZjk1OWUxMGI1Y2ZkYzJjZjA2MjFmMyIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6NDkyNWVmNjljMjFmMDgxMTRlODNhZjg5MTk3MTIwMzQ0NjRhN2FlY2Q5MmMwNTkxMjBiZTBlMzYyNDRkNDEyMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OmViZTI3ZTQxODMwYmExNGExYmFhZDRhYTAzN2I4YTUyY2RlZDMwODg1ZjdmZDUzNWVhN2I4NTA0NWI2ODI1MWYiLCJsYXN0X2tleSI6WyJUcmlnZ2VyOnNlY3VyaXR5LmhhcmRlbi1vbi1yZWdpc3RyeSIsIjEiXSwibGlzdCI6Im9yaWVudCIsInNlbGVjdGlvbiI6eyJ2aWV3IjoicGlucyJ9LCJzbmFwc2hvdCI6ImtleXNldCJ9",
    "next": [
      "cx.get(\"QueryDefinition:security.incident_affected\")",
      "cx.orient(section=\"pins\", cursor=\"eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1NjplNzdkOWFhYWM1MTE2Yjc2YWFmN2I3MDYwZGVkZGU2YmNhMmNkYWFlYWE5MDljNTljMzkxYmQyMGYzNzc5OTI0IiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjgwNzU0MGIxNzdjYmM3OGUxOWUxYzU3NmMzNWM4N2ZjMmJkNWQxYzcwZDU3YWY5MzVjZmZkZGMzNGZlMDliZmIiLCJnaXRfb2lkIjoiZjM3NjUwMTVmNzhmNWVjODAwZjk1OWUxMGI1Y2ZkYzJjZjA2MjFmMyIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6NDkyNWVmNjljMjFmMDgxMTRlODNhZjg5MTk3MTIwMzQ0NjRhN2FlY2Q5MmMwNTkxMjBiZTBlMzYyNDRkNDEyMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OmViZTI3ZTQxODMwYmExNGExYmFhZDRhYTAzN2I4YTUyY2RlZDMwODg1ZjdmZDUzNWVhN2I4NTA0NWI2ODI1MWYiLCJsYXN0X2tleSI6WyJUcmlnZ2VyOnNlY3VyaXR5LmhhcmRlbi1vbi1yZWdpc3RyeSIsIjEiXSwibGlzdCI6Im9yaWVudCIsInNlbGVjdGlvbiI6eyJ2aWV3IjoicGlucyJ9LCJzbmFwc2hvdCI6ImtleXNldCJ9\")"
    ]
  }
});
