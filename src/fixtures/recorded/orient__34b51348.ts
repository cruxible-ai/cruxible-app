// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 72f165fa
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
    "kind": "security.artifact"
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
    "evaluation_time": "2026-10-26T19:04:57.476083Z",
    "kind_detail": {
      "kind": "security.artifact",
      "subjects": 6,
      "identity": "keys: security.artifact.target_ref, security.artifact.name (unique)",
      "evidence": [
        "security.fetched-v1"
      ],
      "predicates": [
        {
          "name": "built_from",
          "predicate": "security.artifact.built_from",
          "cardinality": "one",
          "type": "subject:security.change",
          "description": "The commit the artifact was built from.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/built_from.json",
          "live_claims": 6,
          "subjects_with_value": 6
        },
        {
          "name": "declared_sha256",
          "predicate": "security.artifact.declared_sha256",
          "cardinality": "one",
          "type": "string",
          "description": "The digest a release manifest in the repository declares for the artifact.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/declared_sha256.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "name",
          "predicate": "security.artifact.name",
          "cardinality": "one",
          "type": "string",
          "description": "The published file's name (a release asset as tag/asset); with target_ref, the artifact's key.",
          "evidence": [],
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/name.json",
          "live_claims": 6,
          "subjects_with_value": 6
        },
        {
          "name": "publish_environment",
          "predicate": "security.artifact.publish_environment",
          "cardinality": "one",
          "type": "string",
          "description": "The deployment environment the publishing run used, as provenance states it, or none.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/publish_environment.json",
          "live_claims": 6,
          "subjects_with_value": 6
        },
        {
          "name": "published_by",
          "predicate": "security.artifact.published_by",
          "cardinality": "one",
          "type": "subject:security.workflow",
          "description": "The workflow (at the commit it ran from) that published the artifact, as its provenance states.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/published_by.json",
          "live_claims": 6,
          "subjects_with_value": 6
        },
        {
          "name": "release",
          "predicate": "security.artifact.release",
          "cardinality": "one",
          "type": "subject:security.release",
          "description": "The release the artifact is a file of: joins the SBOM, OSV and KEV path.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1"
          ],
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/release.json",
          "live_claims": 6,
          "subjects_with_value": 6
        },
        {
          "name": "sha256",
          "predicate": "security.artifact.sha256",
          "cardinality": "one",
          "type": "string",
          "description": "The digest of the bytes the target serves (PyPI's digest, or a fetched asset's).",
          "evidence": [
            "security.fetched-large-v1",
            "security.fetched-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/sha256.json",
          "live_claims": 6,
          "subjects_with_value": 6
        },
        {
          "name": "target",
          "predicate": "security.artifact.target",
          "cardinality": "one",
          "type": "subject:security.target",
          "description": "The target the artifact is published to.",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/target.json",
          "live_claims": 6,
          "subjects_with_value": 6
        },
        {
          "name": "target_ref",
          "predicate": "security.artifact.target_ref",
          "cardinality": "one",
          "type": "string",
          "description": "The artifact's target as registry/name; with name, the artifact's key.",
          "evidence": [],
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/target_ref.json",
          "live_claims": 6,
          "subjects_with_value": 6
        },
        {
          "name": "uploaded_by",
          "predicate": "security.artifact.uploaded_by",
          "cardinality": "one",
          "type": "string",
          "description": "Who uploaded the release asset (login).",
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.artifact"
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
          "path": "claim-types/security.artifact/uploaded_by.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "incoming": [
        "security.finding.affects",
        "security.signal.observed"
      ],
      "sample_subject_ids": [
        "pypi-cruxible--cruxible-0.3.0-py3-none-any.whl",
        "pypi-cruxible--cruxible-0.3.0.tar.gz",
        "pypi-cruxible--cruxible-0.3.1-py3-none-any.whl",
        "pypi-cruxible--cruxible-0.3.1.tar.gz",
        "pypi-cruxible--cruxible-0.3.2-py3-none-any.whl"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.artifact\", select=[\"built_from\", \"declared_sha256\", \"name\"], limit=10)",
      "cx.query(kind=\"security.artifact\", follow=[{\"field\": \"security.finding.affects\", \"as\": \"finding\", \"direction\": \"reverse\"}], select=[\"finding\"], limit=10)",
      "cx.get(\"security.artifact/pypi-cruxible--cruxible-0.3.0-py3-none-any.whl\")"
    ]
  }
});
