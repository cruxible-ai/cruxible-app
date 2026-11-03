// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch b01bf11b
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-1096bb2f883d4f839654cba4d9d99d74",
      "CLM-5051bb5ab5bdb80237a10647d01da1e8",
      "CLM-923bfe61a7bb723a636a86fe7cc6bdb4",
      "CLM-2c559d9ffa815754e4723c04144f4e90",
      "CLM-65471ed24f3c502ccbf845d20373af7f",
      "CLM-564e79925ecc63bdc6891c631a54855f",
      "CLM-dcffe8369cc7211a981764da419d81c7",
      "CLM-07e2523e79d50bba041f0fa492be4ca1"
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
        "ref": "CLM-1096bb2f883d4f839654cba4d9d99d74",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-1096bb2f883d4f839654cba4d9d99d74",
          "subject": "security.vulnerability/cve-2023-44487",
          "predicate": "cve_id",
          "predicate_full": "security.vulnerability.cve_id",
          "value": "CVE-2023-44487",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:38.787504Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-1096bb2f883d4f839654cba4d9d99d74\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2023-44487\")"
          ]
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
        "evaluation_time": "2026-11-03T02:20:50.190165Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-5051bb5ab5bdb80237a10647d01da1e8",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-5051bb5ab5bdb80237a10647d01da1e8",
          "subject": "security.vulnerability/cve-2023-44487",
          "predicate": "epss_percentile",
          "predicate_full": "security.vulnerability.epss_percentile",
          "value": "0.99998",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:54.573196Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-5051bb5ab5bdb80237a10647d01da1e8\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2023-44487\")"
          ]
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
        "evaluation_time": "2026-11-03T02:20:50.215173Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-923bfe61a7bb723a636a86fe7cc6bdb4",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-923bfe61a7bb723a636a86fe7cc6bdb4",
          "subject": "security.vulnerability/cve-2023-44487",
          "predicate": "epss_score",
          "predicate_full": "security.vulnerability.epss_score",
          "value": "0.99999",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:54.573196Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-923bfe61a7bb723a636a86fe7cc6bdb4\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2023-44487\")"
          ]
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
        "evaluation_time": "2026-11-03T02:20:50.239989Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-2c559d9ffa815754e4723c04144f4e90",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-2c559d9ffa815754e4723c04144f4e90",
          "subject": "security.vulnerability/cve-2023-44487",
          "predicate": "epss_score_date",
          "predicate_full": "security.vulnerability.epss_score_date",
          "value": "2026-11-02",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:54.573196Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-2c559d9ffa815754e4723c04144f4e90\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2023-44487\")"
          ]
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
        "evaluation_time": "2026-11-03T02:20:50.265963Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-65471ed24f3c502ccbf845d20373af7f",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-65471ed24f3c502ccbf845d20373af7f",
          "subject": "security.vulnerability/cve-2023-44487",
          "predicate": "kev_date_added",
          "predicate_full": "security.vulnerability.kev_date_added",
          "value": "2023-10-10",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:48.471271Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-65471ed24f3c502ccbf845d20373af7f\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2023-44487\")"
          ]
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
        "evaluation_time": "2026-11-03T02:20:50.290238Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-564e79925ecc63bdc6891c631a54855f",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-564e79925ecc63bdc6891c631a54855f",
          "subject": "security.vulnerability/cve-2023-44487",
          "predicate": "kev_due_date",
          "predicate_full": "security.vulnerability.kev_due_date",
          "value": "2023-10-31",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:48.471271Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-564e79925ecc63bdc6891c631a54855f\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2023-44487\")"
          ]
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
        "evaluation_time": "2026-11-03T02:20:50.314180Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-dcffe8369cc7211a981764da419d81c7",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-dcffe8369cc7211a981764da419d81c7",
          "subject": "security.vulnerability/cve-2023-44487",
          "predicate": "kev_ransomware_use",
          "predicate_full": "security.vulnerability.kev_ransomware_use",
          "value": "Unknown",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:48.471271Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-dcffe8369cc7211a981764da419d81c7\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2023-44487\")"
          ]
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
        "evaluation_time": "2026-11-03T02:20:50.338615Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-07e2523e79d50bba041f0fa492be4ca1",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "literal",
          "claim": "CLM-07e2523e79d50bba041f0fa492be4ca1",
          "subject": "security.vulnerability/cve-2023-44487",
          "predicate": "listed_in",
          "predicate_full": "security.vulnerability.listed_in",
          "value": "security.catalog/cisa-kev",
          "effective_from": "2023-10-10T00:00:00Z",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:48.471271Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-07e2523e79d50bba041f0fa492be4ca1\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2023-44487\")"
          ]
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
        "evaluation_time": "2026-11-03T02:20:50.364161Z"
      }
    ]
  }
});
