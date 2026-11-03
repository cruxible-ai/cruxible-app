// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch f9a7d17f
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:fd953fdd490da9b5b6034a2bff1ec7826891887adf6ffa9d98cb1731fb551a70"
    ],
    "detail": "summary",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "surface": "sdk",
    "subject_suggestions": false
  },
  "response": {
    "tag": "playbill-get-batch-result-v1",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "results": [
      {
        "tag": "playbill-get-result-v1",
        "ref": "Proposal:sha256:fd953fdd490da9b5b6034a2bff1ec7826891887adf6ffa9d98cb1731fb551a70",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:fd953fdd490da9b5b6034a2bff1ec7826891887adf6ffa9d98cb1731fb551a70",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "pilot-owner",
          "admitted_at": "2026-11-03T00:58:40.256215Z",
          "rationale": "Adopt the KEV and EPSS Lines: web.fetch from cisa.gov and api.first.org.",
          "changes": [
            {
              "path": "lines/security.epss-triage.json",
              "change": "create"
            },
            {
              "path": "lines/security.kev-triage.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.epss-triage-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.epss-triage-settle.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.kev-triage-propose.json",
              "change": "create"
            },
            {
              "path": "procedure-mandates/security.kev-triage-settle.json",
              "change": "create"
            },
            {
              "path": "triggers/security.epss-daily.json",
              "change": "create"
            },
            {
              "path": "triggers/security.kev-daily.json",
              "change": "create"
            }
          ],
          "next": []
        },
        "coordinate": {
          "git_oid": "7f513078c490",
          "generation": 10
        },
        "accepted_coordinate": {
          "tag": "playbill-accepted-coordinate-v1",
          "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
          "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
          "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
          "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
        },
        "evaluation_time": "2026-11-03T02:20:51.333062Z"
      }
    ]
  }
});
