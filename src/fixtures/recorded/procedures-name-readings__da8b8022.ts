// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/procedures/security.kev-triage/readings b8437401
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/procedures/{name}/readings",
  "pathParams": {
    "name": "security.kev-triage"
  },
  "body": {
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "limit": 50
  },
  "response": {
    "tag": "playbill-procedure-readings-result-v1",
    "procedure_identity": {
      "kind": "Procedure",
      "name": "security.kev-triage"
    },
    "procedure_artifact_digest": "sha256:dbbafff76d11750625cd0d0e9b5a82f557839062fcdeceb60c87487388c8d095",
    "activation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "76d1aabc3311a9e9b1f3137b5fa346ce3bea994b",
      "semantic_root": "sha256:33e3a5aff5053369e17c16f04eeca67479d7d636d85af83401311ce449e8a3a3",
      "generation_root": "sha256:5ee4ba3a80528089b3b9617b90d419c72c9f6fff1617eb366f5d31fd30dd4927",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "observation_coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "observation_time": "2026-10-26T19:05:14.449473+00:00",
    "contracts": [
      {
        "tag": "playbill-procedure-measurement-contract-status-v1",
        "measurement_name": "kev-backlog-cleared",
        "measurement_kind": "accepted_query",
        "contract_id": "RSC-f238e760f259d752ee66d803b70bb47d",
        "activation_id": "RSA-adf606ac0fddf8f9baec6da7824d7542",
        "subject_grain": "procedure_unit",
        "subject": {
          "tag": "playbill-semantic-address-v1",
          "artifact_path": "procedures/security.kev-triage.json",
          "selector": {
            "scheme": "procedure-unit-v1",
            "value": ""
          }
        },
        "status": "pending",
        "eligibility": {
          "tag": "playbill-procedure-measurement-eligibility-v1",
          "activation_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "76d1aabc3311a9e9b1f3137b5fa346ce3bea994b",
            "semantic_root": "sha256:33e3a5aff5053369e17c16f04eeca67479d7d636d85af83401311ce449e8a3a3",
            "generation_root": "sha256:5ee4ba3a80528089b3b9617b90d419c72c9f6fff1617eb366f5d31fd30dd4927",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "activated_at": "2026-10-26T17:42:00.919051+00:00",
          "check_at": "2026-10-29T17:42:00.919051+00:00",
          "expires_at": "2026-11-05T17:42:00.919051+00:00",
          "observation_coordinate": {
            "tag": "playbill-accepted-coordinate-v1",
            "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
            "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
            "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
            "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
          },
          "observation_time": "2026-10-26T19:05:14.449473+00:00",
          "window": "before_check"
        },
        "resolution": null,
        "review": {
          "measurement_name": "kev-backlog-cleared",
          "contract_id": "RSC-f238e760f259d752ee66d803b70bb47d",
          "latest_resolution_id": null,
          "standing_resolution_id": null,
          "unavailable": false,
          "last_disposition": null,
          "history": [],
          "history_total": 0,
          "history_truncated": false
        },
        "reading_count": 0
      }
    ],
    "readings": [],
    "truncated": false,
    "cursor": null
  }
});
