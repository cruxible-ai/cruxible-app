// Recorded from cruxible-core f42e30daa0b62e7d98dbf3bbcd72072f928495c1 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient 593a32eb
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "get",
  "path": "/api/v1/{instance_id}/orient",
  "query": {
    "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
    "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
    "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
    "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd",
    "surface": "sdk",
    "section": "mandates",
    "limit": 500
  },
  "response": {
    "tag": "playbill-orient-v1",
    "instance": "inst_be4d690f30d64371",
    "coordinate": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "97040dbfdd1e7e284098b49ecc6504aecb211d80",
      "semantic_root": "sha256:888d39edd3ed8f7c63719121db28894105c74a3cfb7afc32608884f8f727f1d1",
      "generation_root": "sha256:149d2929610dbe1f6b9c78d1f1bbeb0e14386a0f9e96dff1d30231e720acccbf",
      "compiler_digest": "sha256:8b1fc4c429fbbdc9eee3915dc3c22af64fdbdba3465795ceb270b01371f899bd"
    },
    "generation": 58,
    "accepted_at": "2026-10-19T21:49:14.351998Z",
    "evaluation_time": "2026-10-19T22:13:03.838773Z",
    "section": "mandates",
    "mandates": [
      {
        "mandate": "ProcedureMandate:security.cve-applicability-propose",
        "procedure": "Procedure:security.cve-applicability",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-01-17T21:29:34Z"
      },
      {
        "mandate": "ProcedureMandate:security.epss-triage-propose",
        "procedure": "Procedure:security.epss-triage",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-01-17T21:29:34Z"
      },
      {
        "mandate": "ProcedureMandate:security.epss-triage-settle",
        "procedure": "Procedure:security.epss-triage",
        "grants": "settle",
        "state": "active",
        "expires_at": "2027-01-17T21:40:03Z"
      },
      {
        "mandate": "ProcedureMandate:security.kev-triage-propose",
        "procedure": "Procedure:security.kev-triage",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-01-17T21:29:34Z"
      },
      {
        "mandate": "ProcedureMandate:security.kev-triage-settle",
        "procedure": "Procedure:security.kev-triage",
        "grants": "settle",
        "state": "active",
        "expires_at": "2027-01-17T21:40:03Z"
      },
      {
        "mandate": "ProcedureMandate:security.osv-applicability-propose",
        "procedure": "Procedure:security.osv-applicability",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-01-17T21:29:34Z"
      },
      {
        "mandate": "ProcedureMandate:security.registry-parse-propose",
        "procedure": "Procedure:security.registry-parse",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-01-17T21:29:34Z"
      },
      {
        "mandate": "ProcedureMandate:security.repo-parse-propose",
        "procedure": "Procedure:security.repo-parse",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-01-17T21:29:34Z"
      },
      {
        "mandate": "ProcedureMandate:security.sbom-import-propose",
        "procedure": "Procedure:security.sbom-import",
        "grants": "propose",
        "state": "active",
        "expires_at": "2027-01-17T21:29:34Z"
      }
    ],
    "truncated": false,
    "next": [
      "cx.get(\"Mandate:security.cve-applicability-propose\")"
    ]
  }
});
