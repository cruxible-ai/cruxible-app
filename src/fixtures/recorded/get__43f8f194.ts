// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get c05137aa
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.release/gate-app--1.0.0",
    "detail": "incoming",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "limit": 50
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.release/gate-app--1.0.0",
    "kind": "subject",
    "detail": "incoming",
    "incoming": {
      "kind": "incoming",
      "claims": [
        {
          "claim": "CLM-4285037ca8e65050fb6cb84bd2a9b131",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-45046",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-56fd1b8ae5704e251b220c4e289cab4a",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44228",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-6649162727db8e81374a28a19181842f",
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-47081",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-685b2c65e4af04ede217346425a493a0",
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34477",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-7273c5bbca09752f8af3b504c370275a",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-44832",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-79556a79f74a70bfa23edc08d11667d2",
          "subject": "security.assessment/gate-app-1.0.0--cve-2025-68161",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-8466ab583451270c1d6a2806b25704f8",
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-25645",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-8d09cdce645c0919c7470e0c4fc42a4e",
          "subject": "security.assessment/gate-app-1.0.0--cve-2025-27516",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-afa2b686c3615b4ae001f2bb43bba441",
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34480",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-c88e9ff9d1383e14e52a99efb7777040",
          "subject": "security.assessment/gate-app-1.0.0--cve-2026-34479",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-c98b0a58ab4536bf8da8647db45eb870",
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-56201",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-cfc71d34eaced019c284cefb19e8318f",
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-56326",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-d501722b33c2be8cfa0a15f386e99208",
          "subject": "security.assessment/gate-app-1.0.0--cve-2024-34064",
          "predicate": "security.assessment.release"
        },
        {
          "claim": "CLM-de777e5da46995304c685ca2758f1640",
          "subject": "security.assessment/gate-app-1.0.0--cve-2021-45105",
          "predicate": "security.assessment.release"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:09.657286Z"
  }
});
