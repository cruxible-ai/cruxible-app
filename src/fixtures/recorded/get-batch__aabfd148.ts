// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch f6fdd20b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "sha256:22daa10e73922ae265d87d13a55e1470354e8f8b0647f9d43e7a465e1545d515"
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
        "ref": "Proposal:sha256:22daa10e73922ae265d87d13a55e1470354e8f8b0647f9d43e7a465e1545d515",
        "kind": "proposal",
        "detail": "summary",
        "card": {
          "proposal": "sha256:22daa10e73922ae265d87d13a55e1470354e8f8b0647f9d43e7a465e1545d515",
          "status": "settled",
          "verdict": "candidate",
          "reason": "accepted",
          "actor": "pilot-owner",
          "admitted_at": "2026-11-03T00:58:23.075097Z",
          "rationale": "The Contracts cruxible-provider-web's operations pin, as shipped.",
          "changes": [
            {
              "path": "contracts/search.web.refusal.cross_origin_credentialed_redirect/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/search.web.refusal.provider_declined/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/search.web.refusal.redirect_limit/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/search.web.refusal.undeclared_instance/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/search.web.refusal.unsupported_redirect_scheme/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/search.web.request/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/search.web.result/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.capture.coordinate/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.capture.headers/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.capture.page/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.capture.selector/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.capture.source_effective_time/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.fetch.refusal.credential_unavailable/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.fetch.refusal.cross_origin_credentialed_redirect/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.fetch.refusal.provider_declined/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.fetch.refusal.redirect_limit/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.fetch.refusal.unsupported_redirect_scheme/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.fetch.request/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.fetch.result/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.render.refusal.engine_unavailable/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.render.refusal.provider_declined/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.render.request/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.render.result/v1.json",
              "change": "create"
            },
            {
              "path": "contracts/web.render.source/v1.json",
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
        "evaluation_time": "2026-11-03T02:20:51.203779Z"
      }
    ]
  }
});
