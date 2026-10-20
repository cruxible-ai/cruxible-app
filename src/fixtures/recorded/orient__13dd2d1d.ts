// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient ed6bbdaa
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
    "kind": "security.control"
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
    "evaluation_time": "2026-10-20T21:42:28.914154Z",
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
          "format": 8,
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
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.work/asset.json",
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
          "format": 8,
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
          "format": 8,
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
