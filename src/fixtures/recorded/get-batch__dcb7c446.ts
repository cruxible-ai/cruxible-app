// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch a163cda5
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:ebbf602ba826f129634fb6113de1e90c0cdeec44387253b179ef01af64500e03"
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
        "ref": "Proposal:sha256:ebbf602ba826f129634fb6113de1e90c0cdeec44387253b179ef01af64500e03",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:ebbf602ba826f129634fb6113de1e90c0cdeec44387253b179ef01af64500e03",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "pilot-owner",
          "admitted_at": "2026-11-03T00:58:36.041669Z",
          "rationale": "Security kit pilot vocabulary: KEV and EPSS facts about watched CVEs.",
          "changes": [
            {
              "path": "capture-contracts/playbill.coordinator-self-source-v1.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.catalog/catalog_id.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/cve_id.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/epss_percentile.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/epss_score.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/epss_score_date.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/kev_date_added.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/kev_due_date.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/kev_ransomware_use.json",
              "change": "create"
            },
            {
              "path": "claim-types/security.vulnerability/listed_in.json",
              "change": "create"
            },
            {
              "path": "contracts/security.epss-row/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/security.kev-record/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/security.watched-vulnerability/v1.json",
              "change": "create"
            },
            {
              "path": "query-definitions/security.watched_vulnerabilities.json",
              "change": "create"
            },
            {
              "path": "subject-kinds/security.catalog.json",
              "change": "create"
            },
            {
              "path": "subject-kinds/security.vulnerability.json",
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
        "evaluation_time": "2026-11-03T02:20:51.283163Z"
      }
    ]
  }
});
