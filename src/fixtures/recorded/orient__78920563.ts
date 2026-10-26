// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 7d00beed
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
    "kind": "security.control"
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
    "evaluation_time": "2026-10-26T19:04:57.969474Z",
    "kind_detail": {
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
          "live_claims": 0,
          "subjects_with_value": 0
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.assessment",
          "predicate": "security.work.assessment",
          "cardinality": "one",
          "type": "subject:security.assessment",
          "description": "The assessment this work item answers.",
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.asset",
          "predicate": "security.work.asset",
          "cardinality": "one",
          "type": "subject:security.asset",
          "description": "The asset this work item covers.",
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.audit",
          "predicate": "security.work.audit",
          "cardinality": "one",
          "type": "subject:security.audit",
          "description": "The audit whose answer raised this work item (a rotation).",
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.credential",
          "predicate": "security.work.credential",
          "cardinality": "one",
          "type": "subject:security.credential",
          "description": "The credential this work item rotates.",
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.finding",
          "predicate": "security.work.finding",
          "cardinality": "one",
          "type": "subject:security.finding",
          "description": "The finding this work item answers (a remediation fixes it; an approved exception accepts its risk).",
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.job",
          "predicate": "security.work.job",
          "cardinality": "one",
          "type": "subject:security.job",
          "description": "The job this work item changes.",
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.owner",
          "predicate": "security.work.owner",
          "cardinality": "one",
          "type": "subject:security.team",
          "description": "The team accountable for this work item.",
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.rationale",
          "predicate": "security.work.rationale",
          "cardinality": "one",
          "type": "string",
          "description": "Why this work item exists.",
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
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "security.work.review_at",
          "predicate": "security.work.review_at",
          "cardinality": "one",
          "type": "datetime",
          "description": "When this work item is next reviewed.",
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
          "live_claims": 0,
          "subjects_with_value": 0
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
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "sample_subject_ids": []
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.control\", select=[\"activation\", \"security.control.kind\", \"security.work.assessment\"], limit=10)",
      "cx.query(kind=\"security.control\", where=[{\"field\": \"activation\", \"eq\": \"declared_active\"}])"
    ]
  }
});
