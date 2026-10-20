// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 6d479fc3
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
    "kind": "security.signal"
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
    "evaluation_time": "2026-10-20T21:42:29.399453Z",
    "kind_detail": {
      "kind": "security.signal",
      "subjects": 1,
      "identity": "keys: security.signal.detector, security.signal.fingerprint (unique)",
      "predicates": [
        {
          "name": "detector",
          "predicate": "security.signal.detector",
          "cardinality": "one",
          "type": "string",
          "description": "What observed the signal (a question such as security.hq5, or manual); with fingerprint, the signal's key.",
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
          "live_claims": 1,
          "subjects_with_value": 1
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
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.signal/explained_by.json",
          "live_claims": 1,
          "subjects_with_value": 1
        },
        {
          "name": "fingerprint",
          "predicate": "security.signal.fingerprint",
          "cardinality": "one",
          "type": "string",
          "description": "What identifies the observation; with detector, the signal's key.",
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
          "live_claims": 1,
          "subjects_with_value": 1
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
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.signal/observed.json",
          "live_claims": 1,
          "subjects_with_value": 1
        }
      ],
      "sample_subject_ids": [
        "security.hq5--sha256-84e283f0451cc97a96323fe6c78724eab8bfcde34ff6e2f18c8785a4fbafdc6f"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.signal\", select=[\"detector\", \"explained_by\", \"fingerprint\"], limit=10)",
      "cx.get(\"security.signal/security.hq5--sha256-84e283f0451cc97a96323fe6c78724eab8bfcde34ff6e2f18c8785a4fbafdc6f\")"
    ]
  }
});
