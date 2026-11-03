// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch b8b6d2d4
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "CLM-671cda403929b9199d624791a43b7a3b",
      "CLM-39f4a52b3c2d4f423c663447a6bcaf89",
      "CLM-55252b46e04077d5b9bbd4005b25f76f",
      "CLM-58325fbdd5bff786556a30110917b174",
      "CLM-3f6b80fb033f0d7166cec0884675bed1",
      "CLM-0bee18e34962365ca30ea6da3b0b7277",
      "CLM-73f152cd6eb8478d4388a9dd23a95bca",
      "CLM-0a1e056fd6a201a37d010031c94e2c44"
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
        "ref": "CLM-671cda403929b9199d624791a43b7a3b",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "claim": "CLM-671cda403929b9199d624791a43b7a3b",
          "subject": "security.vulnerability/cve-2014-0160",
          "predicate": "cve_id",
          "predicate_full": "security.vulnerability.cve_id",
          "value": "CVE-2014-0160",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:38.787504Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-671cda403929b9199d624791a43b7a3b\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2014-0160\")"
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
        "evaluation_time": "2026-11-03T02:20:48.415976Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-39f4a52b3c2d4f423c663447a6bcaf89",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-39f4a52b3c2d4f423c663447a6bcaf89",
          "subject": "security.vulnerability/cve-2014-0160",
          "predicate": "epss_percentile",
          "predicate_full": "security.vulnerability.epss_percentile",
          "value": "0.99996",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:54.573196Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-39f4a52b3c2d4f423c663447a6bcaf89\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2014-0160\")"
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
        "evaluation_time": "2026-11-03T02:20:48.441531Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-55252b46e04077d5b9bbd4005b25f76f",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-55252b46e04077d5b9bbd4005b25f76f",
          "subject": "security.vulnerability/cve-2014-0160",
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
            "cx.get(\"CLM-55252b46e04077d5b9bbd4005b25f76f\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2014-0160\")"
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
        "evaluation_time": "2026-11-03T02:20:48.467616Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-58325fbdd5bff786556a30110917b174",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-58325fbdd5bff786556a30110917b174",
          "subject": "security.vulnerability/cve-2014-0160",
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
            "cx.get(\"CLM-58325fbdd5bff786556a30110917b174\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2014-0160\")"
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
        "evaluation_time": "2026-11-03T02:20:48.493042Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-3f6b80fb033f0d7166cec0884675bed1",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-3f6b80fb033f0d7166cec0884675bed1",
          "subject": "security.vulnerability/cve-2014-0160",
          "predicate": "kev_date_added",
          "predicate_full": "security.vulnerability.kev_date_added",
          "value": "2022-05-04",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:48.471271Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-3f6b80fb033f0d7166cec0884675bed1\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2014-0160\")"
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
        "evaluation_time": "2026-11-03T02:20:48.516740Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-0bee18e34962365ca30ea6da3b0b7277",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-0bee18e34962365ca30ea6da3b0b7277",
          "subject": "security.vulnerability/cve-2014-0160",
          "predicate": "kev_due_date",
          "predicate_full": "security.vulnerability.kev_due_date",
          "value": "2022-05-25",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:48.471271Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-0bee18e34962365ca30ea6da3b0b7277\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2014-0160\")"
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
        "evaluation_time": "2026-11-03T02:20:48.542680Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-73f152cd6eb8478d4388a9dd23a95bca",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "field",
          "claim": "CLM-73f152cd6eb8478d4388a9dd23a95bca",
          "subject": "security.vulnerability/cve-2014-0160",
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
            "cx.get(\"CLM-73f152cd6eb8478d4388a9dd23a95bca\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2014-0160\")"
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
        "evaluation_time": "2026-11-03T02:20:48.568872Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "CLM-0a1e056fd6a201a37d010031c94e2c44",
        "kind": "claim",
        "detail": "summary",
        "card": {
          "value_source": "literal",
          "claim": "CLM-0a1e056fd6a201a37d010031c94e2c44",
          "subject": "security.vulnerability/cve-2014-0160",
          "predicate": "listed_in",
          "predicate_full": "security.vulnerability.listed_in",
          "value": "security.catalog/cisa-kev",
          "effective_from": "2022-05-04T00:00:00Z",
          "verdict": "supported",
          "status": "accepted",
          "revision": 1,
          "accepted": "2026-11-03T00:58:48.471271Z",
          "contenders": [],
          "flags": [],
          "next": [
            "cx.get(\"CLM-0a1e056fd6a201a37d010031c94e2c44\", detail=\"evidence\")",
            "cx.get(\"security.vulnerability/cve-2014-0160\")"
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
        "evaluation_time": "2026-11-03T02:20:48.594808Z"
      }
    ]
  }
});
