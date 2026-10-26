// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 277ba390
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
    "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
    "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
    "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924",
    "surface": "sdk",
    "section": "pins",
    "limit": 500,
    "cursor": "eyJjb29yZGluYXRlIjp7ImNvbXBpbGVyX2RpZ2VzdCI6InNoYTI1NjplNzdkOWFhYWM1MTE2Yjc2YWFmN2I3MDYwZGVkZGU2YmNhMmNkYWFlYWE5MDljNTljMzkxYmQyMGYzNzc5OTI0IiwiZ2VuZXJhdGlvbl9yb290Ijoic2hhMjU2OjgwNzU0MGIxNzdjYmM3OGUxOWUxYzU3NmMzNWM4N2ZjMmJkNWQxYzcwZDU3YWY5MzVjZmZkZGMzNGZlMDliZmIiLCJnaXRfb2lkIjoiZjM3NjUwMTVmNzhmNWVjODAwZjk1OWUxMGI1Y2ZkYzJjZjA2MjFmMyIsInNlbWFudGljX3Jvb3QiOiJzaGEyNTY6NDkyNWVmNjljMjFmMDgxMTRlODNhZjg5MTk3MTIwMzQ0NjRhN2FlY2Q5MmMwNTkxMjBiZTBlMzYyNDRkNDEyMSIsInRhZyI6InBsYXliaWxsLWFjY2VwdGVkLWNvb3JkaW5hdGUtdjEifSwiZGlnZXN0Ijoic2hhMjU2OmViZTI3ZTQxODMwYmExNGExYmFhZDRhYTAzN2I4YTUyY2RlZDMwODg1ZjdmZDUzNWVhN2I4NTA0NWI2ODI1MWYiLCJsYXN0X2tleSI6WyJUcmlnZ2VyOnNlY3VyaXR5LmhhcmRlbi1vbi1yZWdpc3RyeSIsIjEiXSwibGlzdCI6Im9yaWVudCIsInNlbGVjdGlvbiI6eyJ2aWV3IjoicGlucyJ9LCJzbmFwc2hvdCI6ImtleXNldCJ9"
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_bff87e924cbb4f7f",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "f3765015f78f5ec800f959e10b5cfdc2cf0621f3",
      "semantic_root": "sha256:4925ef69c21f08114e83af8919712034464a7aecd92c059120be0e36244d4121",
      "generation_root": "sha256:807540b177cbc78e19e1c576c35c87fc2bd5d1c70d57af935cffddc34fe09bfb",
      "compiler_digest": "sha256:e77d9aaac5116b76aaf7b7060dedde6bca2cdaaeaa909c59c391bd20f3779924"
    },
    "generation": 12,
    "accepted_at": "2026-10-26T19:00:09.706610Z",
    "evaluation_time": "2026-10-26T19:05:01.162977Z",
    "section": "pins",
    "pins": [
      {
        "source": "Trigger:security.harden-on-snapshot",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.harden-on-snapshot",
        "role": "line",
        "target": "Line:security.harden",
        "current": true
      },
      {
        "source": "Trigger:security.inventory-landed.prod",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-erasable-v1",
        "current": true
      },
      {
        "source": "Trigger:security.inventory-landed.prod",
        "role": "line",
        "target": "Line:security.inventory-import.prod",
        "current": true
      },
      {
        "source": "Trigger:security.kev-daily",
        "role": "line",
        "target": "Line:security.kev-daily",
        "current": true
      },
      {
        "source": "Trigger:security.kev-landed",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.kev-landed",
        "role": "line",
        "target": "Line:security.kev-triage",
        "current": true
      },
      {
        "source": "Trigger:security.kev-landed-attention",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.kev-landed-attention",
        "role": "line",
        "target": "Line:security.kev-attention",
        "current": true
      },
      {
        "source": "Trigger:security.osv-daily",
        "role": "line",
        "target": "Line:security.osv-applicability",
        "current": true
      },
      {
        "source": "Trigger:security.registry-landed.cruxible",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.registry-landed.cruxible",
        "role": "line",
        "target": "Line:security.registry-parse.cruxible",
        "current": true
      },
      {
        "source": "Trigger:security.registry-landed.cruxible-client",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.registry-landed.cruxible-client",
        "role": "line",
        "target": "Line:security.registry-parse.cruxible-client",
        "current": true
      },
      {
        "source": "Trigger:security.registry-pull.cruxible",
        "role": "line",
        "target": "Line:security.registry-pull.cruxible",
        "current": true
      },
      {
        "source": "Trigger:security.registry-pull.cruxible-client",
        "role": "line",
        "target": "Line:security.registry-pull.cruxible-client",
        "current": true
      },
      {
        "source": "Trigger:security.repo-landed.cruxible-ci",
        "role": "capture-contract",
        "target": "CaptureContract:security.fetched-v1",
        "current": true
      },
      {
        "source": "Trigger:security.repo-landed.cruxible-ci",
        "role": "line",
        "target": "Line:security.repo-parse.cruxible-ci",
        "current": true
      },
      {
        "source": "Trigger:security.repo-pull.cruxible-ci",
        "role": "line",
        "target": "Line:security.repo-pull.cruxible-ci",
        "current": true
      },
      {
        "source": "Trigger:security.sarif-landed-attention.cruxible",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Trigger:security.sarif-landed-attention.cruxible",
        "role": "line",
        "target": "Line:security.sarif-attention.cruxible",
        "current": true
      },
      {
        "source": "Trigger:security.sarif-landed.cruxible",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Trigger:security.sarif-landed.cruxible",
        "role": "line",
        "target": "Line:security.sarif-import.cruxible",
        "current": true
      },
      {
        "source": "Trigger:security.sbom-landed",
        "role": "capture-contract",
        "target": "CaptureContract:security.file-v1",
        "current": true
      },
      {
        "source": "Trigger:security.sbom-landed",
        "role": "line",
        "target": "Line:security.sbom-import",
        "current": true
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"Trigger:security.harden-on-snapshot\")"
    ]
  }
});
