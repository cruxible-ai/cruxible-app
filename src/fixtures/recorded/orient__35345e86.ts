// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient f9b88ec7
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
    "kind": "security.job"
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
    "evaluation_time": "2026-10-26T19:05:03.001007Z",
    "kind_detail": {
      "kind": "security.job",
      "subjects": 13,
      "identity": "keys: security.job.workflow_ref, security.job.job_key (unique)",
      "evidence": [
        "security.fetched-v1"
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
          "live_claims": 13,
          "subjects_with_value": 13
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
          "live_claims": 13,
          "subjects_with_value": 13
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.job/needs.json",
          "live_claims": 6,
          "subjects_with_value": 5
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
          "live_claims": 22,
          "subjects_with_value": 13
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.job/publishes_to.json",
          "live_claims": 0,
          "subjects_with_value": 0
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
          "live_claims": 5,
          "subjects_with_value": 4
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
          "live_claims": 32,
          "subjects_with_value": 13
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.job/workflow.json",
          "live_claims": 13,
          "subjects_with_value": 13
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
          "live_claims": 13,
          "subjects_with_value": 13
        }
      ],
      "incoming": [
        "security.finding.affects",
        "security.job.needs",
        "security.signal.explained_by",
        "security.signal.observed",
        "security.work.job"
      ],
      "sample_subject_ids": [
        "github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test",
        "github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--kit-lockfiles",
        "github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--test",
        "github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--wheel-install-test",
        "github.com-cruxible-ai-cruxible-main-.github-workflows-docs.yml--build"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.job\", select=[\"environment\", \"job_key\", \"needs\"], limit=10)",
      "cx.query(kind=\"security.job\", follow=[{\"field\": \"security.finding.affects\", \"as\": \"finding\", \"direction\": \"reverse\"}], select=[\"finding\"], limit=10)",
      "cx.get(\"security.job/github.com-cruxible-ai-cruxible-main-.github-workflows-ci.yml--docker-image-test\")"
    ]
  }
});
