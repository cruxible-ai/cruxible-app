// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 0c92ad98
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
    "kind": "security.job"
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
    "evaluation_time": "2026-10-20T21:38:23.718288Z",
    "kind_detail": {
      "kind": "security.job",
      "subjects": 26,
      "identity": "keys: security.job.workflow_ref, security.job.job_key (unique)",
      "evidence": [
        "security.repo-snapshot-v1"
      ],
      "predicates": [
        {
          "name": "environment",
          "predicate": "security.job.environment",
          "cardinality": "one",
          "type": "string",
          "description": "The deployment environment the job runs in, or none.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/environment.json",
          "live_claims": 26,
          "subjects_with_value": 26
        },
        {
          "name": "job_key",
          "predicate": "security.job.job_key",
          "cardinality": "one",
          "type": "string",
          "description": "The job's key in its workflow file; with workflow_ref, the job's key.",
          "evidence": [],
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/job_key.json",
          "live_claims": 26,
          "subjects_with_value": 26
        },
        {
          "name": "needs",
          "predicate": "security.job.needs",
          "cardinality": "many",
          "type": "subject:security.job",
          "description": "A job this job waits for.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/needs.json",
          "live_claims": 12,
          "subjects_with_value": 10
        },
        {
          "name": "permission",
          "predicate": "security.job.permission",
          "cardinality": "many",
          "type": "string",
          "description": "An effective token permission as scope:level (the workflow default applied; token:repository-default when none is declared).",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/permission.json",
          "live_claims": 44,
          "subjects_with_value": 26
        },
        {
          "name": "publishes_to",
          "predicate": "security.job.publishes_to",
          "cardinality": "many",
          "type": "subject:security.target",
          "description": "A target the job can publish to: it holds the credential the registry accepts (the analysis provider's publish rule table).",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/publishes_to.json",
          "live_claims": 14,
          "subjects_with_value": 10
        },
        {
          "name": "secret",
          "predicate": "security.job.secret",
          "cardinality": "many",
          "type": "string",
          "description": "A secret the job references (GITHUB_TOKEN included; *inherit for secrets: inherit).",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/secret.json",
          "live_claims": 10,
          "subjects_with_value": 8
        },
        {
          "name": "uses",
          "predicate": "security.job.uses",
          "cardinality": "many",
          "type": "string",
          "description": "An action or reusable workflow the job runs, as pkg:githubactions/owner/repo[/path]@ref.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/uses.json",
          "live_claims": 64,
          "subjects_with_value": 26
        },
        {
          "name": "workflow",
          "predicate": "security.job.workflow",
          "cardinality": "one",
          "type": "subject:security.workflow",
          "description": "The workflow the job is declared in.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/workflow.json",
          "live_claims": 26,
          "subjects_with_value": 26
        },
        {
          "name": "workflow_ref",
          "predicate": "security.job.workflow_ref",
          "cardinality": "one",
          "type": "string",
          "description": "The job's workflow as source:path; with job_key, the job's key.",
          "evidence": [],
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.job"
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
          "path": "claim-types/security.job/workflow_ref.json",
          "live_claims": 26,
          "subjects_with_value": 26
        }
      ],
      "incoming": [
        "security.job.needs",
        "security.signal.explained_by",
        "security.signal.observed",
        "security.work.job"
      ],
      "sample_subject_ids": [
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test",
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--kit-lockfiles",
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--test",
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--wheel-install-test",
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-docs.yml--build"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.job\", select=[\"environment\", \"job_key\", \"needs\"], limit=10)",
      "cx.query(kind=\"security.job\", follow=[{\"field\": \"security.job.needs\", \"as\": \"job\", \"direction\": \"reverse\"}], select=[\"job\"], limit=10)",
      "cx.get(\"security.job/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8-.github-workflows-ci.yml--docker-image-test\")"
    ]
  }
});
