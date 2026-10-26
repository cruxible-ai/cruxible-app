// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 7e706b43
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
    "kind": "security.target"
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
    "evaluation_time": "2026-10-26T19:04:58.784417Z",
    "kind_detail": {
      "kind": "security.target",
      "subjects": 1,
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
          "live_claims": 1,
          "subjects_with_value": 1
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
          "live_claims": 0,
          "subjects_with_value": 0
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
          "live_claims": 1,
          "subjects_with_value": 1
        },
        {
          "name": "source_repo",
          "predicate": "security.target.source_repo",
          "cardinality": "one",
          "type": "subject:security.repo",
          "description": "The repository the target is published from: its provenance's, or the owner's words.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1"
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.target/source_repo.json",
          "live_claims": 1,
          "subjects_with_value": 1
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
        "pypi--cruxible"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.target\", select=[\"name\", \"publish_gate\", \"registry\"], limit=10)",
      "cx.query(kind=\"security.target\", where=[{\"field\": \"registry\", \"eq\": \"ghcr\"}])",
      "cx.query(kind=\"security.target\", follow=[{\"field\": \"security.artifact.target\", \"as\": \"artifact\", \"direction\": \"reverse\"}], select=[\"artifact\"], limit=10)",
      "cx.get(\"security.target/pypi--cruxible\")"
    ]
  }
});
