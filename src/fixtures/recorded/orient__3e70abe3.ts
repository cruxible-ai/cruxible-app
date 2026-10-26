// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 86ec2c4f
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
    "kind": "security.service"
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
    "evaluation_time": "2026-10-26T19:04:58.617366Z",
    "kind_detail": {
      "kind": "security.service",
      "subjects": 0,
      "identity": "keys: security.service.name (hint)",
      "predicates": [
        {
          "name": "criticality",
          "predicate": "security.service.criticality",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "critical",
            "standard"
          ],
          "description": "How critical the service is to the organization.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.service"
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
          "path": "claim-types/security.service/criticality.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "log_source",
          "predicate": "security.service.log_source",
          "cardinality": "many",
          "type": "string",
          "description": "Where one of the service's logs lives, as a short identifier (caddy:app-1:/var/log/caddy/access.log): a pointer, nothing else. Retention, how to query it, who owns it and any reasoning go in a doc section the Claim cites, never in the value. An incident's audit of the service starts from this list (the respond Line names it); audit.log_source is the set that incident audits.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.service"
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
          "path": "claim-types/security.service/log_source.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "name",
          "predicate": "security.service.name",
          "cardinality": "one",
          "type": "string",
          "description": "The service's name; its key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.service"
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
          "path": "claim-types/security.service/name.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "owned_by",
          "predicate": "security.service.owned_by",
          "cardinality": "one",
          "type": "subject:security.team",
          "description": "The team accountable for the service.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.service"
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
          "path": "claim-types/security.service/owned_by.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "incoming": [
        "security.asset.serves",
        "security.audit.service",
        "security.credential.reaches",
        "security.credential.used_by",
        "security.finding.affects"
      ],
      "sample_subject_ids": []
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.service\", select=[\"criticality\", \"log_source\", \"name\"], limit=10)",
      "cx.query(kind=\"security.service\", where=[{\"field\": \"criticality\", \"eq\": \"critical\"}])",
      "cx.query(kind=\"security.service\", follow=[{\"field\": \"security.asset.serves\", \"as\": \"asset\", \"direction\": \"reverse\"}], select=[\"asset\"], limit=10)"
    ]
  }
});
