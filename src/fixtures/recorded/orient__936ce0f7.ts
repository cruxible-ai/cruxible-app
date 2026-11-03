// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 8ae3b3da
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
    "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
    "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
    "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07",
    "surface": "sdk",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_d8e6dcb48e6a4d0d",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    },
    "generation": 10,
    "accepted_at": "2026-11-03T00:58:54.573196Z",
    "evaluation_time": "2026-11-03T02:20:48.052371Z",
    "you": {
      "actor": "operator",
      "can_author": false,
      "authoring_refusal": {
        "code": "cruxible.identity.principal_unconfigured",
        "detail": "this process names no principal, and the local operator identity 'operator' is not a registered principal on inst_d8e6dcb48e6a4d0d; repair: set CRUXIBLE_PRINCIPAL_ID (or pass --principal-id) to your registered principal ID (active principals: pilot-owner)",
        "repair": {
          "operation": "cruxible.orient",
          "arguments": {
            "section": "principals",
            "configure": "CRUXIBLE_PRINCIPAL_ID"
          }
        }
      }
    },
    "kinds": [
      {
        "kind": "security.catalog",
        "subjects": 1,
        "identity": "keys: security.catalog.catalog_id (unique)",
        "fields": [
          "catalog_id"
        ]
      },
      {
        "kind": "security.vulnerability",
        "subjects": 10,
        "identity": "keys: security.vulnerability.cve_id (unique)",
        "fields": [
          "cve_id",
          "epss_percentile",
          "epss_score",
          "epss_score_date",
          "kev_date_added"
        ],
        "more_fields": 3
      }
    ],
    "artifacts": {
      "claim_types": 11,
      "procedures": 2,
      "documents": 0,
      "queries": 1,
      "operations": 4,
      "lines": 2,
      "captures": 13,
      "capture_contracts": 3,
      "resolution_contracts": 0,
      "mandates": 4,
      "runs": 4,
      "running": 0,
      "claims": {
        "accepted": 75,
        "conflicted": 0,
        "overturned": 0,
        "ineligible": 0,
        "retired": 0
      }
    },
    "attention": {
      "next_items": 0,
      "open_proposals": 0,
      "top": [],
      "setup_items": 2
    },
    "queries": [
      {
        "name": "security.watched_vulnerabilities",
        "description": "Every vulnerability this instance tracks, with its CVE id.",
        "params": []
      }
    ],
    "truncated": false,
    "live": {
      "tag": "playbill-live-view-v1",
      "as_of": {
        "git_oid": "7f513078c490",
        "generation": 10
      },
      "fields": [
        "artifacts.runs",
        "artifacts.running"
      ]
    },
    "next": [
      "cx.orient(kind=\"security.vulnerability\")",
      "cx.query(kind=\"security.vulnerability\", select=[\"cve_id\", \"epss_percentile\", \"epss_score\"], limit=10)",
      "cx.next(expiring_within=Duration.days(count=7))",
      "cx.orient(section=\"operations\")",
      "cx.orient(section=\"lines\")"
    ]
  }
});
