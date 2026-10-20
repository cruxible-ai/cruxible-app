// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient cb3ff84f
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
    "kind": "security.change"
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
    "evaluation_time": "2026-10-20T21:42:28.861614Z",
    "kind_detail": {
      "kind": "security.change",
      "subjects": 4,
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
          "live_claims": 4,
          "subjects_with_value": 4
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
          "live_claims": 4,
          "subjects_with_value": 4
        }
      ],
      "incoming": [
        "security.artifact.built_from",
        "security.signal.explained_by"
      ],
      "sample_subject_ids": [
        "github.com-cruxible-ai-cruxible--6354e15bace2e97efa618a39d955b570ca5a6ee1",
        "github.com-cruxible-ai-cruxible--e848cbb6787262db349912c48d9c008d8068ede8",
        "github.com-cruxible-ai-cruxible--ea6582844b23b81fe0bdeed9303fa975b4faff8c",
        "github.com-cruxible-ai-cruxible--f88f4a6567331c4810c93894efc252db501e876c"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.change\", select=[\"commit_sha\", \"repo_ref\"], limit=10)",
      "cx.query(kind=\"security.change\", follow=[{\"field\": \"security.artifact.built_from\", \"as\": \"artifact\", \"direction\": \"reverse\"}], select=[\"artifact\"], limit=10)",
      "cx.get(\"security.change/github.com-cruxible-ai-cruxible--6354e15bace2e97efa618a39d955b570ca5a6ee1\")"
    ]
  }
});
