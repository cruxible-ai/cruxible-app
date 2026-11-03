// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 87d286c9
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
    "section": "graph",
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
    "evaluation_time": "2026-11-03T02:20:47.401692Z",
    "section": "graph",
    "graph": {
      "nodes": [
        {
          "subject": "security.catalog/cisa-kev",
          "kind": "security.catalog"
        },
        {
          "subject": "security.vulnerability/cve-2014-0160",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2017-0144",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2019-0708",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-26855",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2021-44228",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2022-22965",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2023-38545",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2023-44487",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2023-4863",
          "kind": "security.vulnerability"
        },
        {
          "subject": "security.vulnerability/cve-2024-3094",
          "kind": "security.vulnerability"
        }
      ],
      "edges": [
        {
          "claim": "CLM-07e2523e79d50bba041f0fa492be4ca1",
          "source": "security.vulnerability/cve-2023-44487",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        },
        {
          "claim": "CLM-0a1e056fd6a201a37d010031c94e2c44",
          "source": "security.vulnerability/cve-2014-0160",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        },
        {
          "claim": "CLM-12c364b5fbc11638bf6980fef83d7588",
          "source": "security.vulnerability/cve-2022-22965",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        },
        {
          "claim": "CLM-152f2406ffa3a32588dced1cde97b73c",
          "source": "security.vulnerability/cve-2021-44228",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        },
        {
          "claim": "CLM-3f8684f0274ff24aea88562eeb6325d0",
          "source": "security.vulnerability/cve-2019-0708",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        },
        {
          "claim": "CLM-451fc26cb4344c5253459630a039526b",
          "source": "security.vulnerability/cve-2023-4863",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        },
        {
          "claim": "CLM-a1241eb46fd7481831f246d6b99b2320",
          "source": "security.vulnerability/cve-2017-0144",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        },
        {
          "claim": "CLM-d31651a6d9ff0bc5e02331b26415678e",
          "source": "security.vulnerability/cve-2021-26855",
          "predicate": "security.vulnerability.listed_in",
          "target": "security.catalog/cisa-kev"
        }
      ],
      "totals": {
        "subjects": 11
      }
    },
    "truncated": false,
    "next": [
      "cx.get(\"security.catalog/cisa-kev\")"
    ]
  }
});
