// Recorded from cruxible-core db10d8ed366a9e8ccfea804be1ec06b3b84bc357 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient b414c6b2
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
    "kind": "security.release"
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
    "evaluation_time": "2026-10-20T21:42:29.172874Z",
    "kind_detail": {
      "kind": "security.release",
      "subjects": 13,
      "identity": "keys: security.release.product_name, security.release.version (unique)",
      "predicates": [
        {
          "name": "component",
          "predicate": "security.release.component",
          "cardinality": "many",
          "type": "string",
          "description": "A component of the release, as its package URL with version (purl@version), observed in an SBOM.",
          "evidence": [
            "security.cyclonedx-sbom-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.release"
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
          "path": "claim-types/security.release/component.json",
          "live_claims": 7,
          "subjects_with_value": 2
        },
        {
          "name": "product",
          "predicate": "security.release.product",
          "cardinality": "one",
          "type": "subject:security.product",
          "description": "The product this release is a version of.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.cyclonedx-sbom-v1"
          ],
          "subject_kinds": [
            "security.release"
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
          "path": "claim-types/security.release/product.json",
          "live_claims": 7,
          "subjects_with_value": 7
        },
        {
          "name": "product_name",
          "predicate": "security.release.product_name",
          "cardinality": "one",
          "type": "string",
          "description": "The product's name; with version, the release's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.release"
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
          "path": "claim-types/security.release/product_name.json",
          "live_claims": 13,
          "subjects_with_value": 13
        },
        {
          "name": "version",
          "predicate": "security.release.version",
          "cardinality": "one",
          "type": "string",
          "description": "The release's version string; with product_name, the release's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.release"
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
          "path": "claim-types/security.release/version.json",
          "live_claims": 13,
          "subjects_with_value": 13
        }
      ],
      "incoming": [
        "security.artifact.release",
        "security.assessment.release",
        "security.asset.installs",
        "security.remediation.target_release"
      ],
      "sample_subject_ids": [
        "apache-log4j--1.2.17",
        "apache-log4j2--2.12.2",
        "apache-log4j2--2.14.1",
        "apache-log4j2--2.17.1",
        "cruxible--0.3.0"
      ]
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.release\", select=[\"component\", \"product\", \"product_name\"], limit=10)",
      "cx.query(kind=\"security.release\", follow=[{\"field\": \"security.artifact.release\", \"as\": \"artifact\", \"direction\": \"reverse\"}], select=[\"artifact\"], limit=10)",
      "cx.get(\"security.release/apache-log4j--1.2.17\")"
    ]
  }
});
