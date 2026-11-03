// Recorded from cruxible-core d6ed45bc0e0eb7ab8fcd492739fbb17bcf1da025 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/query 71607fe1
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/query",
  "body": {
    "kind": "security.vulnerability",
    "select": [
      "security.vulnerability.cve_id",
      "security.vulnerability.epss_percentile",
      "security.vulnerability.epss_score",
      "security.vulnerability.epss_score_date",
      "security.vulnerability.kev_date_added",
      "security.vulnerability.kev_due_date",
      "security.vulnerability.kev_ransomware_use",
      "security.vulnerability.listed_in"
    ],
    "claims": true,
    "limit": 100,
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
      "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
      "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
      "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
    }
  },
  "response": {
    "tag": "playbill-query-page-v1",
    "kind": "security.vulnerability",
    "columns": [
      {
        "name": "cve_id",
        "predicate": "security.vulnerability.cve_id",
        "type": "string",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "epss_percentile",
        "predicate": "security.vulnerability.epss_percentile",
        "type": "decimal",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "epss_score",
        "predicate": "security.vulnerability.epss_score",
        "type": "decimal",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "epss_score_date",
        "predicate": "security.vulnerability.epss_score_date",
        "type": "date",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "kev_date_added",
        "predicate": "security.vulnerability.kev_date_added",
        "type": "date",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "kev_due_date",
        "predicate": "security.vulnerability.kev_due_date",
        "type": "date",
        "members": null,
        "cardinality": "one"
      },
      {
        "name": "kev_ransomware_use",
        "predicate": "security.vulnerability.kev_ransomware_use",
        "type": "enum",
        "members": [
          "Known",
          "Unknown"
        ],
        "cardinality": "one"
      },
      {
        "name": "listed_in",
        "predicate": "security.vulnerability.listed_in",
        "type": "subject:security.catalog",
        "members": null,
        "cardinality": "many"
      }
    ],
    "rows": [
      {
        "subject": "security.vulnerability/cve-2014-0160",
        "subject_id": "cve-2014-0160",
        "cve_id": "CVE-2014-0160",
        "epss_percentile": "0.99996",
        "epss_score": "0.99999",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2022-05-04",
        "kev_due_date": "2022-05-25",
        "kev_ransomware_use": "Unknown",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-671cda403929b9199d624791a43b7a3b",
              "value": "CVE-2014-0160",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-39f4a52b3c2d4f423c663447a6bcaf89",
              "value": "0.99996",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-55252b46e04077d5b9bbd4005b25f76f",
              "value": "0.99999",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-58325fbdd5bff786556a30110917b174",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-3f6b80fb033f0d7166cec0884675bed1",
              "value": "2022-05-04",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-0bee18e34962365ca30ea6da3b0b7277",
              "value": "2022-05-25",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-73f152cd6eb8478d4388a9dd23a95bca",
              "value": "Unknown",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-0a1e056fd6a201a37d010031c94e2c44",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2017-0144",
        "subject_id": "cve-2017-0144",
        "cve_id": "CVE-2017-0144",
        "epss_percentile": "0.99936",
        "epss_score": "0.9923",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2022-02-10",
        "kev_due_date": "2022-08-10",
        "kev_ransomware_use": "Known",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-401958558f2c68bbf7de5ff9d57c755d",
              "value": "CVE-2017-0144",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-6a349dfab5a909d105d645defb3ff369",
              "value": "0.99936",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-101186fdb5cf6a0b627f10ece8f2fe20",
              "value": "0.9923",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-610a77949e602c3fef982e0288fe2735",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-cfd405bb350f048db4ea6f5044164b1f",
              "value": "2022-02-10",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-9c9dcad72dd788abd42f0fb68224add9",
              "value": "2022-08-10",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-21aba7f86e63c712d490f516c283bd68",
              "value": "Known",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-a1241eb46fd7481831f246d6b99b2320",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2019-0708",
        "subject_id": "cve-2019-0708",
        "cve_id": "CVE-2019-0708",
        "epss_percentile": "0.99999",
        "epss_score": "0.99999",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2021-11-03",
        "kev_due_date": "2022-05-03",
        "kev_ransomware_use": "Known",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-6e10fbb4d3da24812ddc9e95133d1c99",
              "value": "CVE-2019-0708",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-2c034ee9dc396f67452410972bb98664",
              "value": "0.99999",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-912147bf8d9528ee51018115082a5a4d",
              "value": "0.99999",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-bd5d6bde10d4d1daf0e15d0a03a5c40d",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-54671d178d5d851bc9838e2b28c1aedc",
              "value": "2021-11-03",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-65c923eaaea18ff84416d7753c4c8a5a",
              "value": "2022-05-03",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-c899c993589b6485b057c0436b4eae23",
              "value": "Known",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-3f8684f0274ff24aea88562eeb6325d0",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2021-26855",
        "subject_id": "cve-2021-26855",
        "cve_id": "CVE-2021-26855",
        "epss_percentile": "0.99988",
        "epss_score": "0.99996",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2021-11-03",
        "kev_due_date": "2022-05-03",
        "kev_ransomware_use": "Known",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-8f15a1e289dd4e69bf7a665177cc1143",
              "value": "CVE-2021-26855",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-672ebf5cf0ad4bc0347122365cbe0ca2",
              "value": "0.99988",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-70e677cf193f6f3445d8b2243e1c1bfc",
              "value": "0.99996",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-6d420817c821fc09e8a191c036374799",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-fe11831a9a82599a44e551a146008de0",
              "value": "2021-11-03",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-30255eec7ddf7f503364165a9064c0b0",
              "value": "2022-05-03",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-8c170a81886a7384663c02c35ce7f965",
              "value": "Known",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-d31651a6d9ff0bc5e02331b26415678e",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2021-44228",
        "subject_id": "cve-2021-44228",
        "cve_id": "CVE-2021-44228",
        "epss_percentile": "1",
        "epss_score": "0.99999",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2021-12-10",
        "kev_due_date": "2021-12-24",
        "kev_ransomware_use": "Known",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-0de2f307a5be2bad2be482b4a841d9e6",
              "value": "CVE-2021-44228",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-4df58eb72bec4dee52bb30b8e4add839",
              "value": "1",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-4511b29cdb22b5e7cdfb1dfc0389606b",
              "value": "0.99999",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-b1852c865047b78ec7df433c70f6cef5",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-0173d827b066541d388ec3ee6c909907",
              "value": "2021-12-10",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-c3a2b8bb89cbce7bab07604bd9acbf78",
              "value": "2021-12-24",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-e2e520017872ad9a69448bbee6b6b61b",
              "value": "Known",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-152f2406ffa3a32588dced1cde97b73c",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2022-22965",
        "subject_id": "cve-2022-22965",
        "cve_id": "CVE-2022-22965",
        "epss_percentile": "0.9995",
        "epss_score": "0.99638",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2022-04-04",
        "kev_due_date": "2022-04-25",
        "kev_ransomware_use": "Unknown",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-0271b9294403b969583fbb4b96bb8aaa",
              "value": "CVE-2022-22965",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-83343aa00c2daeaaa660aff3c675e79a",
              "value": "0.9995",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-b06137d17d73d74aa9025958e367c5f3",
              "value": "0.99638",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-e0d001bfa037b46ba807400b28663877",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-a4469c2acfb762a32d395e01fddf7d81",
              "value": "2022-04-04",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-177af6df24a732c72ed8c7acadd7c55f",
              "value": "2022-04-25",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-01c64bf0ccf601c73fb5d9e48000da68",
              "value": "Unknown",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-12c364b5fbc11638bf6980fef83d7588",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2023-38545",
        "subject_id": "cve-2023-38545",
        "cve_id": "CVE-2023-38545",
        "epss_percentile": "0.99588",
        "epss_score": "0.78689",
        "epss_score_date": "2026-11-02",
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-0bfe93095b8b5556a4ae0b110a3a886b",
              "value": "CVE-2023-38545",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-fce8d312fa8d5eda08946b050a9f42fc",
              "value": "0.99588",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-83df7ec10f3dc98f8c7c9dddd97ef4b3",
              "value": "0.78689",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-bd18e9d73508c2538ecc837201a7a684",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-209643542f5a95a150f993a1e3ba2123",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2023-44487",
        "subject_id": "cve-2023-44487",
        "cve_id": "CVE-2023-44487",
        "epss_percentile": "0.99998",
        "epss_score": "0.99999",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2023-10-10",
        "kev_due_date": "2023-10-31",
        "kev_ransomware_use": "Unknown",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-1096bb2f883d4f839654cba4d9d99d74",
              "value": "CVE-2023-44487",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-5051bb5ab5bdb80237a10647d01da1e8",
              "value": "0.99998",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-923bfe61a7bb723a636a86fe7cc6bdb4",
              "value": "0.99999",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-2c559d9ffa815754e4723c04144f4e90",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-65471ed24f3c502ccbf845d20373af7f",
              "value": "2023-10-10",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-564e79925ecc63bdc6891c631a54855f",
              "value": "2023-10-31",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-dcffe8369cc7211a981764da419d81c7",
              "value": "Unknown",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-07e2523e79d50bba041f0fa492be4ca1",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2023-4863",
        "subject_id": "cve-2023-4863",
        "cve_id": "CVE-2023-4863",
        "epss_percentile": "0.9998",
        "epss_score": "0.99979",
        "epss_score_date": "2026-11-02",
        "kev_date_added": "2023-09-13",
        "kev_due_date": "2023-10-04",
        "kev_ransomware_use": "Unknown",
        "listed_in": [
          "security.catalog/cisa-kev"
        ],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-aefb09a9e4ae7b803d11a7a4765707ff",
              "value": "CVE-2023-4863",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-c5c8494d72033ba64795a82b545cb4c1",
              "value": "0.9998",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-08474610f2820081ba9aba71fd69f05f",
              "value": "0.99979",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-2563da5e7c5f4a2880d488a30bc8aeb8",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_date_added": [
            {
              "claim": "CLM-a5feef846323fbf1ee6839e6cc7b6b95",
              "value": "2023-09-13",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_due_date": [
            {
              "claim": "CLM-860b75b55b2444f9ae5bc16d8a596cf1",
              "value": "2023-10-04",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "kev_ransomware_use": [
            {
              "claim": "CLM-b7eb930d785b6434da97a1d851cf317c",
              "value": "Unknown",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "listed_in": [
            {
              "claim": "CLM-451fc26cb4344c5253459630a039526b",
              "value": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        }
      },
      {
        "subject": "security.vulnerability/cve-2024-3094",
        "subject_id": "cve-2024-3094",
        "cve_id": "CVE-2024-3094",
        "epss_percentile": "0.99806",
        "epss_score": "0.909",
        "epss_score_date": "2026-11-02",
        "kev_date_added": null,
        "kev_due_date": null,
        "kev_ransomware_use": null,
        "listed_in": [],
        "flags": [],
        "claims": {
          "cve_id": [
            {
              "claim": "CLM-3cb1f5c6e1c57c89d4b35183a3840167",
              "value": "CVE-2024-3094",
              "verdict": "supported",
              "status": "accepted",
              "role": "normative"
            }
          ],
          "epss_percentile": [
            {
              "claim": "CLM-0643b623d53bc341e4ce73302509a6d8",
              "value": "0.99806",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score": [
            {
              "claim": "CLM-0b915ccfb90fa143634a556606b3138f",
              "value": "0.909",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ],
          "epss_score_date": [
            {
              "claim": "CLM-3610bd271ea3f895fd1b4cf529f4e9f7",
              "value": "2026-11-02",
              "verdict": "supported",
              "status": "accepted",
              "role": "observation"
            }
          ]
        },
        "nones": {
          "listed_in": [
            {
              "claim": "CLM-99f7d94306a1c9859b9159048faa11d2",
              "of": "security.catalog/cisa-kev",
              "verdict": "supported",
              "status": "accepted"
            }
          ]
        }
      }
    ],
    "truncated": false,
    "next_cursor": null,
    "remaining": 0,
    "capped": [],
    "notes": [],
    "receipt": {
      "mode": "inline",
      "spec_digest": "sha256:3012040abab31499f882c9fd663b9324ce9afb76a2e1fa5967127ff41a104a50",
      "coordinate": {
        "tag": "playbill-accepted-coordinate-v1",
        "git_oid": "7f513078c4902b40f5dabc5115cc57b92dbfa84d",
        "semantic_root": "sha256:c3079d86a55a340d609702f6ae9e03dba310fc3a279540e880a1e190a22af223",
        "generation_root": "sha256:f76bfce21235f70992ccca80b6af524c2594ff1d4ce4e8410ff96cb3e56a1a61",
        "compiler_digest": "sha256:a0d23030f719c5467d73ee01b6c0cf9efe1b9da5ea0d2383eced21e370eb5d07"
      },
      "evaluation_time": "2026-11-03T02:20:47.674712Z"
    }
  }
});
