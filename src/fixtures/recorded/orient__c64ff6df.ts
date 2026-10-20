// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 8adcba1c
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
    "kind": "security.workflow"
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
    "evaluation_time": "2026-10-20T21:42:29.771337Z",
    "kind_detail": {
      "kind": "security.workflow",
      "subjects": 12,
      "identity": "keys: security.workflow.source, security.workflow.path (unique)",
      "evidence": [
        "security.repo-snapshot-v1"
      ],
      "predicates": [
        {
          "name": "coverage",
          "predicate": "security.workflow.coverage",
          "cardinality": "one",
          "type": "subject:security.coverage",
          "description": "The coverage (source at a revision) the workflow was read under.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.workflow"
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
          "path": "claim-types/security.workflow/coverage.json",
          "live_claims": 10,
          "subjects_with_value": 10
        },
        {
          "name": "path",
          "predicate": "security.workflow.path",
          "cardinality": "one",
          "type": "string",
          "description": "The workflow file's path in the repository; with source, the workflow's key.",
          "evidence": [],
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.workflow"
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
          "path": "claim-types/security.workflow/path.json",
          "live_claims": 12,
          "subjects_with_value": 12
        },
        {
          "name": "repo",
          "predicate": "security.workflow.repo",
          "cardinality": "one",
          "type": "subject:security.repo",
          "description": "The repository the workflow file is in.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.workflow"
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
          "path": "claim-types/security.workflow/repo.json",
          "live_claims": 10,
          "subjects_with_value": 10
        },
        {
          "name": "source",
          "predicate": "security.workflow.source",
          "cardinality": "one",
          "type": "string",
          "description": "The source the workflow was read from (host/owner/repo@ref); with path, the workflow's key.",
          "evidence": [],
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.workflow"
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
          "path": "claim-types/security.workflow/source.json",
          "live_claims": 12,
          "subjects_with_value": 12
        },
        {
          "name": "trigger",
          "predicate": "security.workflow.trigger",
          "cardinality": "many",
          "type": "string",
          "description": "An event that triggers the workflow, as event[:filter:pattern] (push:tags:v*, workflow_dispatch, schedule:cron:0 6 * * *).",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.workflow"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.workflow/trigger.json",
          "live_claims": 18,
          "subjects_with_value": 10
        }
      ],
      "incoming": [
        "security.artifact.published_by",
        "security.job.workflow",
        "security.signal.explained_by",
        "security.signal.observed"
      ],
      "sample_subject_ids": [
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml",
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-docs.yml",
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-kev-reference-world.yml",
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish-runtime-image.yml",
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.workflow\", select=[\"coverage\", \"path\", \"repo\"], limit=10)",
      "cx.query(kind=\"security.workflow\", follow=[{\"field\": \"security.artifact.published_by\", \"as\": \"artifact\", \"direction\": \"reverse\"}], select=[\"artifact\"], limit=10)",
      "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-ci.yml\")"
    ]
  }
});
