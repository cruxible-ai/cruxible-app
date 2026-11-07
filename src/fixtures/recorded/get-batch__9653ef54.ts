// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 188f3187
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "originating_line": {
            "identity": {
              "kind": "Line",
              "name": "security.epss-triage"
            },
            "artifact_digest": "sha256:dff66cdcfae4daeb94703b92f790bd99683e6b3b3f9e87e7f3df53b2b87505c0"
          },
          "proposal": "sha256:b466ed8f1bb5284fcd491ee57870f4fea225a9e19bf954a70f07717831942c96",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "owner",
          "admitted_at": "2026-11-07T18:00:00.000000Z",
          "rationale": "Proposed by Procedure security.epss-triage run RUN-ce695e418822256a528acec295a4d682e319adc434522cda7507bff918606165 terminal write\n\n3 items; each item's reason is recorded with the Claim or Subject it explains.",
          "generation": 19,
          "changes": [
            {
              "path": "claims/18/CLM-1817b5bf41dbacad208487b99a2a275d.json",
              "change": "create"
            },
            {
              "path": "claims/c7/CLM-c79e9d236b888bada73738d2f0dc0e1d.json",
              "change": "create"
            },
            {
              "path": "claims/df/CLM-df2e21236111d6da62b2da4022a65fdb.json",
              "change": "create"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "30e90cc6ad34",
          "generation": 22
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
          "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
          "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
          "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
        },
        "evaluation_time": "2026-11-07T22:23:00.091492Z"
      }
    ]
  }
});
