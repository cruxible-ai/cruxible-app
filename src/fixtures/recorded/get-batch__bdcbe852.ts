// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get-batch 1b475c46
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get-batch",
  "body": {
    "refs": [
      "security.vulnerability/cve-2023-44487",
      "security.vulnerability/cve-2014-0160",
      "security.vulnerability/cve-2022-22965",
      "security.vulnerability/cve-2021-44228",
      "security.vulnerability/cve-2019-0708",
      "security.vulnerability/cve-2023-4863",
      "security.vulnerability/cve-2017-0144",
      "security.vulnerability/cve-2021-26855"
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
        "ref": "security.vulnerability/cve-2023-44487",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2023-44487",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-1096bb2f883d4f839654cba4d9d99d74",
              "value": "CVE-2023-44487",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-5051bb5ab5bdb80237a10647d01da1e8",
              "value": "0.99998",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-923bfe61a7bb723a636a86fe7cc6bdb4",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-2c559d9ffa815754e4723c04144f4e90",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-65471ed24f3c502ccbf845d20373af7f",
              "value": "2023-10-10",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-564e79925ecc63bdc6891c631a54855f",
              "value": "2023-10-31",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-dcffe8369cc7211a981764da419d81c7",
              "value": "Unknown",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-07e2523e79d50bba041f0fa492be4ca1"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2023-44487\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.789089Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2014-0160",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2014-0160",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-671cda403929b9199d624791a43b7a3b",
              "value": "CVE-2014-0160",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-39f4a52b3c2d4f423c663447a6bcaf89",
              "value": "0.99996",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-55252b46e04077d5b9bbd4005b25f76f",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-58325fbdd5bff786556a30110917b174",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-3f6b80fb033f0d7166cec0884675bed1",
              "value": "2022-05-04",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-0bee18e34962365ca30ea6da3b0b7277",
              "value": "2022-05-25",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-73f152cd6eb8478d4388a9dd23a95bca",
              "value": "Unknown",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-0a1e056fd6a201a37d010031c94e2c44"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2014-0160\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.816094Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2022-22965",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2022-22965",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-0271b9294403b969583fbb4b96bb8aaa",
              "value": "CVE-2022-22965",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-83343aa00c2daeaaa660aff3c675e79a",
              "value": "0.9995",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-b06137d17d73d74aa9025958e367c5f3",
              "value": "0.99638",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-e0d001bfa037b46ba807400b28663877",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-a4469c2acfb762a32d395e01fddf7d81",
              "value": "2022-04-04",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-177af6df24a732c72ed8c7acadd7c55f",
              "value": "2022-04-25",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-01c64bf0ccf601c73fb5d9e48000da68",
              "value": "Unknown",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-12c364b5fbc11638bf6980fef83d7588"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2022-22965\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.841565Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2021-44228",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2021-44228",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-0de2f307a5be2bad2be482b4a841d9e6",
              "value": "CVE-2021-44228",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-4df58eb72bec4dee52bb30b8e4add839",
              "value": "1",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-4511b29cdb22b5e7cdfb1dfc0389606b",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-b1852c865047b78ec7df433c70f6cef5",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-0173d827b066541d388ec3ee6c909907",
              "value": "2021-12-10",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-c3a2b8bb89cbce7bab07604bd9acbf78",
              "value": "2021-12-24",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-e2e520017872ad9a69448bbee6b6b61b",
              "value": "Known",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-152f2406ffa3a32588dced1cde97b73c"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2021-44228\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.867577Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2019-0708",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2019-0708",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-6e10fbb4d3da24812ddc9e95133d1c99",
              "value": "CVE-2019-0708",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-2c034ee9dc396f67452410972bb98664",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-912147bf8d9528ee51018115082a5a4d",
              "value": "0.99999",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-bd5d6bde10d4d1daf0e15d0a03a5c40d",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-54671d178d5d851bc9838e2b28c1aedc",
              "value": "2021-11-03",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-65c923eaaea18ff84416d7753c4c8a5a",
              "value": "2022-05-03",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-c899c993589b6485b057c0436b4eae23",
              "value": "Known",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-3f8684f0274ff24aea88562eeb6325d0"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2019-0708\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.896328Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2023-4863",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2023-4863",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-aefb09a9e4ae7b803d11a7a4765707ff",
              "value": "CVE-2023-4863",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-c5c8494d72033ba64795a82b545cb4c1",
              "value": "0.9998",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-08474610f2820081ba9aba71fd69f05f",
              "value": "0.99979",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-2563da5e7c5f4a2880d488a30bc8aeb8",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-a5feef846323fbf1ee6839e6cc7b6b95",
              "value": "2023-09-13",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-860b75b55b2444f9ae5bc16d8a596cf1",
              "value": "2023-10-04",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-b7eb930d785b6434da97a1d851cf317c",
              "value": "Unknown",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-451fc26cb4344c5253459630a039526b"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2023-4863\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.930344Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2017-0144",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2017-0144",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-401958558f2c68bbf7de5ff9d57c755d",
              "value": "CVE-2017-0144",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-6a349dfab5a909d105d645defb3ff369",
              "value": "0.99936",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-101186fdb5cf6a0b627f10ece8f2fe20",
              "value": "0.9923",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-610a77949e602c3fef982e0288fe2735",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-cfd405bb350f048db4ea6f5044164b1f",
              "value": "2022-02-10",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-9c9dcad72dd788abd42f0fb68224add9",
              "value": "2022-08-10",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-21aba7f86e63c712d490f516c283bd68",
              "value": "Known",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-a1241eb46fd7481831f246d6b99b2320"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2017-0144\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.968590Z"
      },
      {
        "tag": "playbill-get-result-v1",
        "ref": "security.vulnerability/cve-2021-26855",
        "kind": "subject",
        "detail": "summary",
        "card": {
          "subject": "security.vulnerability/cve-2021-26855",
          "kind": "security.vulnerability",
          "lifecycle": "live",
          "claims": [
            {
              "predicate": "cve_id",
              "claim": "CLM-8f15a1e289dd4e69bf7a665177cc1143",
              "value": "CVE-2021-26855",
              "flags": []
            },
            {
              "predicate": "epss_percentile",
              "claim": "CLM-672ebf5cf0ad4bc0347122365cbe0ca2",
              "value": "0.99988",
              "flags": []
            },
            {
              "predicate": "epss_score",
              "claim": "CLM-70e677cf193f6f3445d8b2243e1c1bfc",
              "value": "0.99996",
              "flags": []
            },
            {
              "predicate": "epss_score_date",
              "claim": "CLM-6d420817c821fc09e8a191c036374799",
              "value": "2026-11-02",
              "flags": []
            },
            {
              "predicate": "kev_date_added",
              "claim": "CLM-fe11831a9a82599a44e551a146008de0",
              "value": "2021-11-03",
              "flags": []
            },
            {
              "predicate": "kev_due_date",
              "claim": "CLM-30255eec7ddf7f503364165a9064c0b0",
              "value": "2022-05-03",
              "flags": []
            },
            {
              "predicate": "kev_ransomware_use",
              "claim": "CLM-8c170a81886a7384663c02c35ce7f965",
              "value": "Known",
              "flags": []
            },
            {
              "predicate": "listed_in",
              "claim": [
                "CLM-d31651a6d9ff0bc5e02331b26415678e"
              ],
              "value": [
                "security.catalog/cisa-kev"
              ],
              "flags": []
            }
          ],
          "incoming_count": 0,
          "next": [
            "cx.get(\"security.vulnerability/cve-2021-26855\", detail=\"history\")"
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
        "evaluation_time": "2026-11-03T02:20:49.998046Z"
      }
    ]
  }
});
