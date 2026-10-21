// Recorded from cruxible-core a725d832046a0c951064eb2792a23a1d3c2f02ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient fc628b9c
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
    "kind": "security.target"
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
    "evaluation_time": "2026-10-21T19:49:19.820548Z",
    "kind_detail": {
      "kind": "security.target",
      "subjects": 4,
      "identity": "keys: security.target.registry, security.target.name (unique)",
      "predicates": [
        {
          "name": "name",
          "predicate": "security.target.name",
          "cardinality": "one",
          "type": "string",
          "description": "The target's name in its registry (a PyPI project, an image, owner/repo for a release or Pages site); with registry, the target's key.",
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
          "live_claims": 4,
          "subjects_with_value": 4
        },
        {
          "name": "publish_gate",
          "predicate": "security.target.publish_gate",
          "cardinality": "many",
          "type": "string",
          "description": "A trigger the organization allows to publish to the target (push:tags:v*). Stating a gate is what asks the hardening questions about the target.",
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
          "live_claims": 4,
          "subjects_with_value": 4
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
          "live_claims": 4,
          "subjects_with_value": 4
        },
        {
          "name": "source_repo",
          "predicate": "security.target.source_repo",
          "cardinality": "one",
          "type": "subject:security.repo",
          "description": "The repository the target is published from: its provenance's, or the owner's words.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.pypi-release-v1",
            "security.repo-snapshot-v1"
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
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.target/source_repo.json",
          "live_claims": 4,
          "subjects_with_value": 4
        }
      ],
      "incoming": [
        "security.artifact.target",
        "security.coverage.of",
        "security.job.publishes_to",
        "security.signal.explained_by",
        "security.signal.observed"
      ],
      "sample_subject_ids": [
        "ghcr--cruxible-ai-cruxible-runtime",
        "github-release--cruxible-ai-cruxible",
        "pypi--cruxible",
        "pypi--cruxible-client"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.target\", select=[\"name\", \"publish_gate\", \"registry\"], limit=10)",
      "cx.query(kind=\"security.target\", where=[{\"field\": \"registry\", \"eq\": \"ghcr\"}])",
      "cx.query(kind=\"security.target\", follow=[{\"field\": \"security.artifact.target\", \"as\": \"artifact\", \"direction\": \"reverse\"}], select=[\"artifact\"], limit=10)",
      "cx.get(\"security.target/ghcr--cruxible-ai-cruxible-runtime\")"
    ]
  }
});
