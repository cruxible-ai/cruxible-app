// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 71907fe0
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
    "kind": "security.change"
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
    "evaluation_time": "2026-10-26T19:04:57.879902Z",
    "kind_detail": {
      "kind": "security.change",
      "subjects": 3,
      "identity": "keys: security.change.repo_ref, security.change.commit_sha (unique)",
      "predicates": [
        {
          "name": "commit_sha",
          "predicate": "security.change.commit_sha",
          "cardinality": "one",
          "type": "string",
          "description": "The commit SHA; with repo_ref, the change's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.change"
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
          "path": "claim-types/security.change/commit_sha.json",
          "live_claims": 3,
          "subjects_with_value": 3
        },
        {
          "name": "repo_ref",
          "predicate": "security.change.repo_ref",
          "cardinality": "one",
          "type": "string",
          "description": "The change's repository as host/owner/repo; with commit_sha, its key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.change"
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
          "path": "claim-types/security.change/repo_ref.json",
          "live_claims": 3,
          "subjects_with_value": 3
        }
      ],
      "incoming": [
        "security.artifact.built_from",
        "security.finding.fixed_by",
        "security.signal.explained_by"
      ],
      "sample_subject_ids": [
        "github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8",
        "github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c",
        "github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.change\", select=[\"commit_sha\", \"repo_ref\"], limit=10)",
      "cx.query(kind=\"security.change\", follow=[{\"field\": \"security.artifact.built_from\", \"as\": \"artifact\", \"direction\": \"reverse\"}], select=[\"artifact\"], limit=10)",
      "cx.get(\"security.change/github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8\")"
    ]
  }
});
