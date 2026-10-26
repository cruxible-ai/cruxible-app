// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get e3688155
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "security.release/gate-app--1.0.0",
    "detail": "history",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "surface": "sdk",
    "limit": 20
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "security.release/gate-app--1.0.0",
    "kind": "subject",
    "detail": "history",
    "history": {
      "kind": "subject",
      "revisions": [
        {
          "revision": 1,
          "sequence": 6,
          "git_oid": "a021b33e7af8",
          "accepted": "2026-10-26T17:43:01.517331Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "lifecycle": "live",
          "digest": "sha256:ced1e0966692",
          "reason": {
            "kind": "procedure_item",
            "reason": "CycloneDX SBOM for gate-app 1.0.0 describes release 1.0.0 of gate-app.",
            "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
            "procedure": "Procedure:security.sbom-import",
            "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
            "terminal": "propose"
          }
        }
      ],
      "events": [
        {
          "field": "osv_coverage",
          "predicate": "security.release.osv_coverage",
          "claim": "CLM-21f26c2241a321129da9500c1f536891",
          "sequence": 7,
          "git_oid": "d23ea5d983e9",
          "accepted": "2026-10-26T17:44:38.124878Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "OSV's answer for gate-app--1.0.0's 3 components: complete: 3 of 3 components answered; set b0388f454ae8d358.",
            "proposal": "sha256:e75b67c614a81f220865d8c4c07e0c8941274d01a8e994763cae8fe78e40e0e9",
            "procedure": "Procedure:security.osv-applicability",
            "run": "RUN-859df9cd20e8e24cf59a7cf3a1189262a7e77363d10675f38fddd8060b62f6a8",
            "terminal": "propose"
          },
          "value": "complete: 3 of 3 components answered; set b0388f454ae8d358",
          "change": "stated"
        },
        {
          "field": "product",
          "predicate": "security.release.product",
          "claim": "CLM-026f0ff9aa151a74d05a5a21013218b3",
          "sequence": 6,
          "git_oid": "a021b33e7af8",
          "accepted": "2026-10-26T17:43:01.517331Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "CycloneDX SBOM for gate-app 1.0.0: the release is a version of gate-app.",
            "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
            "procedure": "Procedure:security.sbom-import",
            "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
            "terminal": "propose"
          },
          "value": "security.product/gate-app",
          "change": "stated"
        },
        {
          "field": "component",
          "predicate": "security.release.component",
          "claim": "CLM-3c7114565fccbe38877d8f3857f865e6",
          "sequence": 6,
          "git_oid": "a021b33e7af8",
          "accepted": "2026-10-26T17:43:01.517331Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "CycloneDX SBOM for gate-app 1.0.0 lists the component pkg:pypi/jinja2@3.1.3.",
            "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
            "procedure": "Procedure:security.sbom-import",
            "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
            "terminal": "propose"
          },
          "value": "pkg:pypi/jinja2@3.1.3",
          "change": "stated"
        },
        {
          "field": "version",
          "predicate": "security.release.version",
          "claim": "CLM-63717d756e5ffebd62beae615b040327",
          "sequence": 6,
          "git_oid": "a021b33e7af8",
          "accepted": "2026-10-26T17:43:01.517331Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.sbom-import run RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1 terminal propose\n\n8 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7"
          },
          "value": "1.0.0",
          "change": "stated"
        },
        {
          "field": "component",
          "predicate": "security.release.component",
          "claim": "CLM-67780731f7941176d4fc282295b10d75",
          "sequence": 6,
          "git_oid": "a021b33e7af8",
          "accepted": "2026-10-26T17:43:01.517331Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "CycloneDX SBOM for gate-app 1.0.0 lists the component pkg:pypi/requests@2.32.3.",
            "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
            "procedure": "Procedure:security.sbom-import",
            "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
            "terminal": "propose"
          },
          "value": "pkg:pypi/requests@2.32.3",
          "change": "stated"
        },
        {
          "field": "product_name",
          "predicate": "security.release.product_name",
          "claim": "CLM-af8c77e54da26f349d472526336e70d1",
          "sequence": 6,
          "git_oid": "a021b33e7af8",
          "accepted": "2026-10-26T17:43:01.517331Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "change_set",
            "text": "Proposed by Procedure security.sbom-import run RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1 terminal propose\n\n8 items; each item's reason is recorded with the Claim or Subject it explains.",
            "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7"
          },
          "value": "gate-app",
          "change": "stated"
        },
        {
          "field": "component",
          "predicate": "security.release.component",
          "claim": "CLM-d24dc11c9022ce848f5f3492d43ce457",
          "sequence": 6,
          "git_oid": "a021b33e7af8",
          "accepted": "2026-10-26T17:43:01.517331Z",
          "actor": "robertmalone",
          "approved_by": [
            "robertmalone"
          ],
          "reason": {
            "kind": "procedure_item",
            "reason": "CycloneDX SBOM for gate-app 1.0.0 lists the component pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1.",
            "proposal": "sha256:86a68fdc145181fc856af9a4542938ce217a405f88958b8a0afbd855233a4cf7",
            "procedure": "Procedure:security.sbom-import",
            "run": "RUN-2379da5c89cea09c80cab1f24363b0c5068742527c9a86f5ab9d6ce84f0812b1",
            "terminal": "propose"
          },
          "value": "pkg:maven/org.apache.logging.log4j/log4j-core@2.14.1",
          "change": "stated"
        }
      ]
    },
    "truncated": false,
    "coordinate": {
      "git_oid": "f3765015f78f",
      "generation": 12
    },
    "evaluation_time": "2026-10-26T19:05:07.988327Z"
  }
});
