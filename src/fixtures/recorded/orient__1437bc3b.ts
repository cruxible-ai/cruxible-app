// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient f2e05de2
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
    "kind": "security.coverage"
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
    "evaluation_time": "2026-10-26T19:04:58.057577Z",
    "kind_detail": {
      "kind": "security.coverage",
      "subjects": 2,
      "identity": "keys: security.coverage.source, security.coverage.scope (unique)",
      "predicates": [
        {
          "name": "looked_for",
          "predicate": "security.coverage.looked_for",
          "cardinality": "many",
          "type": "string",
          "description": "A product a full runtime-inventory scan looked for, named as its releases are (php, debian/php8.2: a purl's namespace and name), or * for everything: the record of the question the scan asked. The scan states each asset's absence as an asset.runs none, only for a product it looked for (under *: a product the asset ran before or declares installing; name any other in looked_for); which versions of a looked-for product an asset runs are its runs, complete while the coverage is current.",
          "evidence": [
            "security.file-erasable-v1"
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
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.coverage/looked_for.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "of",
          "predicate": "security.coverage.of",
          "cardinality": "one",
          "type": "subject:security.repo,security.target",
          "description": "What the source belongs to: a repository, or a registry target.",
          "evidence": [
            "security.fetched-v1"
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.coverage/of.json",
          "live_claims": 2,
          "subjects_with_value": 2
        },
        {
          "name": "revision",
          "predicate": "security.coverage.revision",
          "cardinality": "one",
          "type": "string",
          "description": "The revision every file was read at: a commit SHA, the digest of a registry's served file set, or the digest of a full runtime-inventory scan's (asset, runs) set; re-read on every pull and stale 12 h after the last. Absence inside current coverage is an answer; outside it, unknown.",
          "evidence": [
            "security.fetched-v1",
            "security.file-erasable-v1"
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
          "live_claims": 2,
          "subjects_with_value": 2
        },
        {
          "name": "scope",
          "predicate": "security.coverage.scope",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "ci.workflows",
            "inventory.runtime",
            "registry.files",
            "release.manifest"
          ],
          "description": "What was read in full: ci.workflows, release.manifest, registry.files, or inventory.runtime (every asset of one inventory scope, with what it runs).",
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
          "live_claims": 2,
          "subjects_with_value": 2
        },
        {
          "name": "source",
          "predicate": "security.coverage.source",
          "cardinality": "one",
          "type": "string",
          "description": "The fully read source (host/owner/repo@ref:path, registry/name, or an inventory scope's name); with scope, the coverage's key.",
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
          "live_claims": 2,
          "subjects_with_value": 2
        }
      ],
      "incoming": [
        "security.asset.scanned_in",
        "security.workflow.coverage"
      ],
      "sample_subject_ids": [
        "github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows",
        "pypi-cruxible--registry.files"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.coverage\", select=[\"looked_for\", \"of\", \"revision\"], limit=10)",
      "cx.query(kind=\"security.coverage\", where=[{\"field\": \"scope\", \"eq\": \"ci.workflows\"}])",
      "cx.query(kind=\"security.coverage\", follow=[{\"field\": \"security.asset.scanned_in\", \"as\": \"asset\", \"direction\": \"reverse\"}], select=[\"asset\"], limit=10)",
      "cx.get(\"security.coverage/github.com-cruxible-ai-cruxible-main-.github-workflows--ci.workflows\")"
    ]
  }
});
