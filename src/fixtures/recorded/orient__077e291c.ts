// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 40deb41d
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
    "kind": "security.coverage"
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
    "evaluation_time": "2026-10-20T21:42:28.966325Z",
    "kind_detail": {
      "kind": "security.coverage",
      "subjects": 5,
      "identity": "keys: security.coverage.source, security.coverage.scope (unique)",
      "predicates": [
        {
          "name": "of",
          "predicate": "security.coverage.of",
          "cardinality": "one",
          "type": "subject:security.repo,security.target",
          "description": "What the source belongs to: a repository, or a registry target.",
          "evidence": [
            "security.pypi-release-v1",
            "security.repo-snapshot-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.coverage"
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
          "path": "claim-types/security.coverage/of.json",
          "live_claims": 5,
          "subjects_with_value": 5
        },
        {
          "name": "revision",
          "predicate": "security.coverage.revision",
          "cardinality": "one",
          "type": "string",
          "description": "The revision every file was read at: a commit SHA, or the digest of a registry's served file set, re-read on every pull and stale 12 h after the last. Absence inside current coverage is an answer; outside it, unknown.",
          "evidence": [
            "security.pypi-release-v1",
            "security.repo-snapshot-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.coverage"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "stale_after": "12h",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.coverage/revision.json",
          "live_claims": 5,
          "subjects_with_value": 5
        },
        {
          "name": "scope",
          "predicate": "security.coverage.scope",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "ci.workflows",
            "registry.files",
            "release.manifest"
          ],
          "description": "What was read in full: ci.workflows, release.manifest or registry.files.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.coverage"
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
          "path": "claim-types/security.coverage/scope.json",
          "live_claims": 5,
          "subjects_with_value": 5
        },
        {
          "name": "source",
          "predicate": "security.coverage.source",
          "cardinality": "one",
          "type": "string",
          "description": "The fully read source (host/owner/repo@ref:path, or registry/name); with scope, the coverage's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.coverage"
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
          "path": "claim-types/security.coverage/source.json",
          "live_claims": 5,
          "subjects_with_value": 5
        }
      ],
      "incoming": [
        "security.workflow.coverage"
      ],
      "sample_subject_ids": [
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows",
        "github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
        "github.com-cruxible-ai-cruxible-v0.3.2-src-cruxible-core-kit-distribution-manifest.json--release.manifest",
        "pypi-cruxible--registry.files",
        "pypi-cruxible-client--registry.files"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.coverage\", select=[\"of\", \"revision\", \"scope\"], limit=10)",
      "cx.query(kind=\"security.coverage\", where=[{\"field\": \"scope\", \"eq\": \"ci.workflows\"}])",
      "cx.query(kind=\"security.coverage\", follow=[{\"field\": \"security.workflow.coverage\", \"as\": \"workflow\", \"direction\": \"reverse\"}], select=[\"workflow\"], limit=10)",
      "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows--ci.workflows\")"
    ]
  }
});
