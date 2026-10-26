// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 5a1051e2
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
    "kind": "security.asset"
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
    "evaluation_time": "2026-10-26T19:04:57.682343Z",
    "kind_detail": {
      "kind": "security.asset",
      "subjects": 0,
      "identity": "keys: security.asset.hostname (unique)",
      "predicates": [
        {
          "name": "environment",
          "predicate": "security.asset.environment",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "ci",
            "development",
            "production",
            "staging",
            "workstation"
          ],
          "description": "The environment the asset runs in: production, staging, development, a workstation (a developer's or maintainer's machine) or ci (a CI runner).",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.asset"
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
          "path": "claim-types/security.asset/environment.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "hostname",
          "predicate": "security.asset.hostname",
          "cardinality": "one",
          "type": "string",
          "description": "The asset's hostname (a host, or a workload such as k8s:prod/storefront-a); its key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.asset"
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
          "path": "claim-types/security.asset/hostname.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "installs",
          "predicate": "security.asset.installs",
          "cardinality": "many",
          "type": "subject:security.release",
          "description": "A software release installed on the asset.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.asset"
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.asset/installs.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "internet_exposed",
          "predicate": "security.asset.internet_exposed",
          "cardinality": "one",
          "type": "boolean",
          "description": "Whether the asset is reachable from the internet.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.asset"
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
          "path": "claim-types/security.asset/internet_exposed.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "runs",
          "predicate": "security.asset.runs",
          "cardinality": "many",
          "type": "subject:security.release",
          "description": "A release a runtime-inventory scan observed running on the asset (beside the declared installs). A full scan retires a run it no longer sees. Its none (an inverse, keyed by the release's product_name) says the asset runs no release of that product: only a full scan that looked for the product states it (never for a product it did not look for), it goes stale on the coverage horizon, and a run of the product seen again retires it. No run and no current none is unknown.",
          "evidence": [
            "security.file-erasable-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.asset"
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
          "format": 9,
          "revision": 1,
          "path": "claim-types/security.asset/runs.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "scanned_in",
          "predicate": "security.asset.scanned_in",
          "cardinality": "many",
          "type": "subject:security.coverage",
          "description": "The inventory scope coverage that read the asset: its runs are complete there while that coverage is current.",
          "evidence": [
            "security.file-erasable-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.asset"
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
          "path": "claim-types/security.asset/scanned_in.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "serves",
          "predicate": "security.asset.serves",
          "cardinality": "many",
          "type": "subject:security.service",
          "description": "A service the asset serves.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.asset"
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
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.asset/serves.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "incoming": [
        "security.work.asset"
      ],
      "sample_subject_ids": []
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.asset\", select=[\"environment\", \"hostname\", \"installs\"], limit=10)",
      "cx.query(kind=\"security.asset\", where=[{\"field\": \"environment\", \"eq\": \"ci\"}])",
      "cx.query(kind=\"security.asset\", follow=[{\"field\": \"security.work.asset\", \"as\": \"control\", \"direction\": \"reverse\"}], select=[\"control\"], limit=10)"
    ]
  }
});
