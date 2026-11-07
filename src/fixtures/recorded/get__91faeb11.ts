// Recorded from cruxible-core ad70ccc439f11b25afbbd3b6ad9c831eae1ca2ad by scripts/record-fixtures.ts; do not edit.
// POST /api/v1/{instance_id}/get 249bad53
import { defineFixture } from "../fixture";

export default defineFixture({
  "method": "post",
  "path": "/api/v1/{instance_id}/get",
  "body": {
    "ref": "Document:security.guidance.dependency",
    "detail": "body",
    "at": {
      "tag": "playbill-accepted-coordinate-v1",
      "git_oid": "30e90cc6ad34f4237ffd2292af5a59e0cef2fa8e",
      "semantic_root": "sha256:b33d1f5292aa0730b794fd12f6a4615c81cc35a380e96fe0eece5e094e85b4b2",
      "generation_root": "sha256:77bcd8f847583c3f84492e8f156c888d836bb350fa250e77616e4d098e6c1e29",
      "compiler_digest": "sha256:368468b4786521ebebeb2b8a9de53d9ceb2a3f9e83985cad4d613895cc59eaaf"
    },
    "surface": "sdk",
    "range": {
      "start": 0,
      "end": 262144
    }
  },
  "response": {
    "tag": "playbill-get-result-v1",
    "ref": "Document:security.guidance.dependency",
    "kind": "document",
    "detail": "body",
    "body": {
      "document": "security.guidance.dependency",
      "media_type": "text/markdown",
      "size": 3748,
      "body_digest": "sha256:f39e13a9fd9290b9a623d5c01521c03ef8a04fe789c92c22b1af206fdd1f28f8",
      "range": {
        "start": 0,
        "end": 3748
      },
      "text": "# Judging a dependency exposure\n\nGuides: security.exposure.justification, security.app_exposure.justification.\n\nA worklist row (`security.urgent_exposures`, `security.kev_triage_backlog`) says: OSV lists\nthis vulnerability for this exact package release, and this inventory holds it. That is a\nlead, not a finding. Your job is to decide whether the vulnerable code can actually be\nreached here, and to show why.\n\n## What you are judging\n\n- **The package release** (`security.component`, keyed by purl@version) is the same in every\n  inventory. OSV's `affected_by` is about it.\n- **The occurrence** (`security.occurrence`: inventory, component) is how one inventory holds\n  it. Most reasons a vulnerability doesn't apply are about this use, not the package.\n\nRead the advisory and the fix versions in the `osv.match` document OSV's `affected_by` Claim\ncites (each record's `fixed`), then the code that uses the package.\n\n## The bar\n\nA not_affected judgment shows reachability or the boundary, from source and bounded local\nevidence. Name:\n\n1. the vulnerable function, class or option the advisory names;\n2. how this code reaches it, or why it can't (the entry points, the call path);\n3. for an input-driven bug, who controls the input and the boundary in between;\n4. the control or configuration you rely on, and where it lives.\n\nCite the code you read (file evidence, `path#anchor`) and put longer reasoning in a section\nyou cite. A low EPSS score, no KEV listing or a quiet advisory is not a reason.\n\n## The outcomes\n\n- **Affected**: leave the row. Remediate (the fixed versions are in the cited document) or\n  escalate. Write nothing.\n- **Not affected, package level**: only `vulnerable_code_not_present`. The vulnerable code is\n  not in this package release at all (OSV's range is wrong for it, the fix was backported, the\n  module is not built). It holds for every inventory, so it is one write that retires OSV's\n  observation, states `affected_by` none of the vulnerability and sets\n  `security.exposure.justification` (`triage.judgment`).\n- **Not affected, app level**: one of `component_not_present` (listed but not shipped or\n  loaded), `vulnerable_code_not_in_execute_path`,\n  `vulnerable_code_cannot_be_controlled_by_adversary` or `inline_mitigations_already_exist`.\n  It holds for this inventory only: one write setting `security.app_exposure.justification`\n  on the occurrence's pair (`triage.app_judgment`). It never states the global none.\n- **Blocked on a fact you can't see**: don't guess. Attest `--unsure` on OSV's `affected_by`\n  Claim, naming the missing fact and how an owner can check it, with `--valid-until` no later\n  than the KEV due date (`triage.investigation`). The pair stays in the backlog, marked.\n\n## Review\n\nWrite a judgment with `accept: never`. A different agent, under its own principal, approves it\nafter reading this guidance and trying once to break it: re-read the cited code, look for\nanother path to the vulnerable code, check the control really applies. Never approve your own\njudgment. No Mandate settles a justification.\n\nTo withdraw one, retire its justification and, for a package-level one, its none in one write\n(`triage.reverse_judgment`).\n\n## Anti-patterns\n\n- An app-level reason stated at package level: it would silence every inventory.\n- `vulnerable_code_not_present` for code that is present but unused: that is\n  `vulnerable_code_not_in_execute_path`, for one inventory.\n- Judging from the advisory summary without reading the code that uses the package.\n- Holding a KEV-listed pair past its due date instead of judging it.\n- Treating an exposure as fixed because a newer version exists somewhere: it leaves the\n  worklists when the inventory's SBOM no longer lists the vulnerable release.\n"
    },
    "coordinate": {
      "git_oid": "30e90cc6ad34",
      "generation": 22
    },
    "evaluation_time": "2026-11-07T22:22:59.936179Z"
  }
});
