// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient e296fd43
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
    "kind": "security.workflow"
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
    "evaluation_time": "2026-10-26T19:04:58.948486Z",
    "kind_detail": {
      "kind": "security.workflow",
      "subjects": 8,
      "identity": "keys: security.workflow.source, security.workflow.path (unique)",
      "evidence": [
        "security.fetched-v1"
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.workflow/coverage.json",
          "live_claims": 5,
          "subjects_with_value": 5
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
          "live_claims": 8,
          "subjects_with_value": 8
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.workflow/repo.json",
          "live_claims": 5,
          "subjects_with_value": 5
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
          "live_claims": 8,
          "subjects_with_value": 8
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
          "live_claims": 9,
          "subjects_with_value": 5
        }
      ],
      "incoming": [
        "security.artifact.published_by",
        "security.job.workflow",
        "security.signal.explained_by",
        "security.signal.observed"
      ],
      "sample_subject_ids": [
        "github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml",
        "github.com-cruxible-ai-cruxible-ea6582844b23b81fe0bdeed9303fa975b4faff8c--.github-workflows-publish.yml",
        "github.com-cruxible-ai-cruxible-f88f4a6567331c4810c93894efc252db501e876c--.github-workflows-publish.yml",
        "github.com-cruxible-ai-cruxible-main--.github-workflows-ci.yml",
        "github.com-cruxible-ai-cruxible-main--.github-workflows-docs.yml"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.workflow\", select=[\"coverage\", \"path\", \"repo\"], limit=10)",
      "cx.query(kind=\"security.workflow\", follow=[{\"field\": \"security.artifact.published_by\", \"as\": \"artifact\", \"direction\": \"reverse\"}], select=[\"artifact\"], limit=10)",
      "cx.get(\"security.workflow/github.com-cruxible-ai-cruxible-e848cbb6787262db349912c48d9c008d8068ede8--.github-workflows-publish.yml\")"
    ]
  }
});
