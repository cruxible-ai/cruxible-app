// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 4c433a03
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
    "kind": "security.credential"
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
    "evaluation_time": "2026-10-26T19:04:58.130359Z",
    "kind_detail": {
      "kind": "security.credential",
      "subjects": 0,
      "identity": "keys: security.credential.issuer, security.credential.name (unique)",
      "predicates": [
        {
          "name": "issued_at",
          "predicate": "security.credential.issued_at",
          "cardinality": "one",
          "type": "datetime",
          "description": "When the current key was issued, as the issuer states it: a rotation must post-date incident.window_start.",
          "evidence": [
            "security.file-erasable-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.credential"
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
          "path": "claim-types/security.credential/issued_at.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "issued_by",
          "predicate": "security.credential.issued_by",
          "cardinality": "one",
          "type": "string",
          "description": "Who issued the current key, as the issuer states it.",
          "evidence": [
            "security.file-erasable-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.credential"
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
          "path": "claim-types/security.credential/issued_by.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "issuer",
          "predicate": "security.credential.issuer",
          "cardinality": "one",
          "type": "string",
          "description": "Who issues the credential (aws-iam/111122223333, stripe, postgres/partners-db); with name, the credential's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.credential"
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
          "path": "claim-types/security.credential/issuer.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "key_id",
          "predicate": "security.credential.key_id",
          "cardinality": "one",
          "type": "string",
          "description": "The current key's non-secret id: the issuer's key id, or fp: and 16 hex of the secret's sha256. Never the secret.",
          "evidence": [
            "security.file-erasable-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.credential"
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
          "path": "claim-types/security.credential/key_id.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "name",
          "predicate": "security.credential.name",
          "cardinality": "one",
          "type": "string",
          "description": "The credential's name at its issuer (storefront-app); with issuer, its key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.credential"
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
          "path": "claim-types/security.credential/name.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "reaches",
          "predicate": "security.credential.reaches",
          "cardinality": "many",
          "type": "subject:security.service",
          "description": "A service the credential grants access to: the blast radius.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.credential"
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
          "path": "claim-types/security.credential/reaches.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "revoked_key",
          "predicate": "security.credential.revoked_key",
          "cardinality": "many",
          "type": "string",
          "description": "A key id a separate state read observed revoked or deleted.",
          "evidence": [
            "security.file-erasable-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.credential"
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
          "path": "claim-types/security.credential/revoked_key.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "used_by",
          "predicate": "security.credential.used_by",
          "cardinality": "many",
          "type": "subject:security.service",
          "description": "A service that uses the credential: whoever compromised the service could read it.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.credential"
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
          "path": "claim-types/security.credential/used_by.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "incoming": [
        "security.work.credential"
      ],
      "sample_subject_ids": []
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.credential\", select=[\"issued_at\", \"issued_by\", \"issuer\"], limit=10)",
      "cx.query(kind=\"security.credential\", follow=[{\"field\": \"security.work.credential\", \"as\": \"control\", \"direction\": \"reverse\"}], select=[\"control\"], limit=10)"
    ]
  }
});
