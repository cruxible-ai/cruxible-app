// Recorded from cruxible-core fa36518ad92d9d8a2b453836f138bd1253e1baa7 by scripts/record-fixtures.ts; do not edit.
// GET /api/v1/{instance_id}/orient d4a468e5
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
    "kind": "security.finding"
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
    "evaluation_time": "2026-10-26T19:04:58.238548Z",
    "kind_detail": {
      "kind": "security.finding",
      "subjects": 0,
      "identity": "keys: security.finding.repo_ref, security.finding.weakness, security.finding.locus (unique)",
      "predicates": [
        {
          "name": "affects",
          "predicate": "security.finding.affects",
          "cardinality": "many",
          "type": "subject:security.artifact,security.job,security.release,security.service",
          "description": "What the finding is in: a release, a service, a job or an artifact (joins the system model; HQ6 asks it of every gated target).",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1"
          ],
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.finding/affects.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "fixed_by",
          "predicate": "security.finding.fixed_by",
          "cardinality": "one",
          "type": "subject:security.change",
          "description": "The commit that fixes the finding.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1"
          ],
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.finding/fixed_by.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "justification",
          "predicate": "security.finding.justification",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "not_attacker_controlled",
            "not_reachable",
            "rule_misfire",
            "sanitized",
            "test_or_dead_code"
          ],
          "description": "Why a finding is not_exploitable or a false_positive: an analyst's judgment (normative), or a scan's stated suppression.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.file-v1"
          ],
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative",
            "observation"
          ],
          "default_role": "normative",
          "member_descriptions": [
            {
              "member": "not_attacker_controlled",
              "description": "The input reaching the sink is not attacker-controlled."
            },
            {
              "member": "not_reachable",
              "description": "No path from an entry point reaches the code."
            },
            {
              "member": "rule_misfire",
              "description": "The rule matched code that is not the pattern it describes."
            },
            {
              "member": "sanitized",
              "description": "The input is sanitized or validated before the sink."
            },
            {
              "member": "test_or_dead_code",
              "description": "The code is a test, an example or never shipped."
            }
          ],
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/justification.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "location",
          "predicate": "security.finding.location",
          "cardinality": "many",
          "type": "string",
          "description": "Where the sink is now, as path:start-end, cited by a file citation of the sink line (PATH#ANCHOR): origin-only, so `cruxible next` resurfaces it (citation_drifted) when the cited code changes. One per sink.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/location.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "locus",
          "predicate": "security.finding.locus",
          "cardinality": "one",
          "type": "string",
          "description": "Where in the code: <repo-relative path>#<locator>, the first tier that applies (the symbol, snippet:<12 hex of the sink line>, line-hash:<the tool's>). Never a line number; with repo_ref and weakness, the finding's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/locus.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "repo",
          "predicate": "security.finding.repo",
          "cardinality": "one",
          "type": "subject:security.repo",
          "description": "The repository the finding is in (the key's repo_ref as a Subject).",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.file-v1"
          ],
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.finding/repo.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "repo_ref",
          "predicate": "security.finding.repo_ref",
          "cardinality": "one",
          "type": "string",
          "description": "The repository as host/owner/repo (github.com/owner/repo); with weakness and locus, the finding's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/repo_ref.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "reported_by",
          "predicate": "security.finding.reported_by",
          "cardinality": "many",
          "type": "string",
          "description": "A finder that reported the finding: a tool (semgrep, codeql) or an agent's principal; the grain of the finder track record.",
          "evidence": [
            "security.file-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/reported_by.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "reproduction",
          "predicate": "security.finding.reproduction",
          "cardinality": "one",
          "type": "string",
          "description": "The proof-of-concept test that reproduces the finding (tests/security/test_x.py::test_y), in the writer's own words or a section of the finding's note; the PoC run is the verdict's evidence.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.file-v1"
          ],
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/reproduction.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "rule",
          "predicate": "security.finding.rule",
          "cardinality": "many",
          "type": "string",
          "description": "A tool rule that reported the finding, as tool:ruleId (semgrep:python.lang.security...), observed in a SARIF scan.",
          "evidence": [
            "security.file-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "contention": {
            "selector": "all",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/rule.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "severity",
          "predicate": "security.finding.severity",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "critical",
            "high",
            "low",
            "medium"
          ],
          "description": "How severe the finding is: a scan's severity (security-severity, else the level) citing its SARIF, or (normative) an analyst's judgment.",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.file-v1"
          ],
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative",
            "observation"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/severity.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "verdict",
          "predicate": "security.finding.verdict",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "confirmed",
            "false_positive",
            "not_exploitable"
          ],
          "description": "The adjudicated verdict: confirmed, not_exploitable or false_positive, citing a reproduction (the PoC run) or the code read (workspace evidence); own words are refused. A disputed verdict contends (set --contend) and reads conflict until one contender remains. Never settled by a Mandate.",
          "evidence": [
            "security.file-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "member_descriptions": [
            {
              "member": "confirmed",
              "description": "The weakness is real and exploitable: a reproduction (the PoC run) or the code read shows it. Needs retained evidence, never own words."
            },
            {
              "member": "false_positive",
              "description": "The tool or finder was wrong: there is no such weakness here."
            },
            {
              "member": "not_exploitable",
              "description": "The weakness is in the code but cannot be exploited here; the justification says why (for example not_reachable)."
            }
          ],
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/verdict.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "verification",
          "predicate": "security.finding.verification",
          "cardinality": "one",
          "type": "enum",
          "members": [
            "fixed",
            "present"
          ],
          "description": "Whether a fix is verified: fixed when a full scan of the finder's rules no longer reports it or the PoC passes; present when a full scan reports it after it was fixed (a regression).",
          "evidence": [
            "security.file-v1"
          ],
          "evidence_requirement": "captured",
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "observation"
          ],
          "default_role": "observation",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/verification.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "vulnerability",
          "predicate": "security.finding.vulnerability",
          "cardinality": "one",
          "type": "subject:security.vulnerability",
          "description": "The known CVE the finding is (vendored code with a published vulnerability).",
          "evidence": [
            "playbill.coordinator-self-source-v1",
            "security.fetched-v1"
          ],
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 7,
          "revision": 1,
          "path": "claim-types/security.finding/vulnerability.json",
          "live_claims": 0,
          "subjects_with_value": 0
        },
        {
          "name": "weakness",
          "predicate": "security.finding.weakness",
          "cardinality": "one",
          "type": "string",
          "description": "CWE-<n>, the smallest CWE the reporting rule names, else RULE:<tool>/<ruleId>; with repo_ref and locus, the finding's key.",
          "evidence_requirement": "none",
          "subject_kinds": [
            "security.finding"
          ],
          "roles": [
            "normative"
          ],
          "default_role": "normative",
          "revision_evidence": "replace",
          "contention": {
            "selector": "only_contender",
            "on_conflict": "unresolved"
          },
          "format": 8,
          "revision": 1,
          "path": "claim-types/security.finding/weakness.json",
          "live_claims": 0,
          "subjects_with_value": 0
        }
      ],
      "incoming": [
        "security.signal.explained_by",
        "security.work.finding"
      ],
      "sample_subject_ids": []
    },
    "truncated": false,
    "next": [
      "cx.query(kind=\"security.finding\", select=[\"affects\", \"fixed_by\", \"justification\"], limit=10)",
      "cx.query(kind=\"security.finding\", where=[{\"field\": \"justification\", \"eq\": \"not_attacker_controlled\"}])",
      "cx.query(kind=\"security.finding\", follow=[{\"field\": \"security.signal.explained_by\", \"as\": \"signal\", \"direction\": \"reverse\"}], select=[\"signal\"], limit=10)"
    ]
  }
});
