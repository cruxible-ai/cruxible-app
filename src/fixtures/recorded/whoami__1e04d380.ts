// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/whoami 1fb099fc
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/whoami",
  "response": {
    "tag": "playbill-whoami-v1",
    "actor_id": "operator",
    "credential_label": null,
    "actor_id_source": "local_operator",
    "authenticated": false,
    "credential_permission_mode": "read_only",
    "principal_registration_status": "absent",
    "active_principal_ids": [
      "daemon",
      "owner",
      "reviewer"
    ],
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "can_author": false,
    "authoring_refusal": {
      "code": "cruxible.identity.principal_unconfigured",
      "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_console05; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: owner, reviewer)",
      "repair": {
        "operation": "cruxible.orient",
        "arguments": {
          "section": "principals",
          "configure": "CRUXIBLE_PRINCIPAL_ID"
        }
      }
    }
  }
});
