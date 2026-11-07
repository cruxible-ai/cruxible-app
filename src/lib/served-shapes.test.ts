import { describe, expect, it } from "vitest";
import { accountOf, attestationAccounts, citationOf, citationWords } from "./attestation-evidence";
import { documentLinks } from "./document-links";
import { mirrorStatus } from "./mirror";
import { authorityRows, targetOf } from "./runbooks";

describe("attestation evidence (D-R42)", () => {
  const why = {
    attestation_accounts: [
      { record: "event", event_digest: "sha256:e1", principal: "owner", attested_at: "2026-11-07T18:40:00Z", stance: "unsure", valid_until: "2026-12-07T18:00:00Z", cited_capture_digests: ["sha256:a", "sha256:b"] },
      { record: "accepted", attestation_digest: "sha256:t2", principal: "reviewer", attested_at: "2026-11-07T19:00:00Z", stance: "support", cited_capture_digests: ["sha256:c"] },
      "not a record",
    ],
  };
  it("reads each account's cited Captures, and matches an attestation by its event, else by who, when and stance", () => {
    const accounts = attestationAccounts(why);
    expect(accounts).toHaveLength(2);
    expect(accounts[0]).toMatchObject({ event: "sha256:e1", validUntil: "2026-12-07T18:00:00Z", cited: ["sha256:a", "sha256:b"] });
    const base = { current: true, basis: "new_capture", counts: false, counts_reason: "not_accepted" } as const;
    expect(accountOf({ ...base, stance: "unsure", principal: "owner", at: "x", record: "event", event: "sha256:e1" }, accounts)?.cited).toHaveLength(2);
    expect(accountOf({ ...base, stance: "support", principal: "reviewer", at: "2026-11-07T19:00:00Z", record: "accepted" }, accounts)?.cited).toEqual(["sha256:c"]);
    expect(accountOf({ ...base, stance: "support", principal: "someone", at: "2026-11-07T19:00:00Z", record: "accepted" }, accounts)).toBeUndefined();
    expect(attestationAccounts(null)).toEqual([]);
  });
  it("names a cited Capture from its envelope: a section, a passage, the attester's own words, or evidence", () => {
    const selection = (section?: string[]) => ({
      envelope: {
        producer: { kind: "Principal", name: "owner" },
        source: { kind: "external", source_identity: "triage.notes", selector: { working_selection: { anchor: "### X", ...(section ? { section: { path: section } } : {}) } } },
      },
    });
    const name = (n: string) => n.replace(/^playbill\./, "cruxible.");
    expect(citationWords(citationOf(selection(["Notes", "X"])), name)).toBe("Section Notes › X of triage.notes");
    expect(citationWords(citationOf(selection()), name)).toBe("Passage of triage.notes");
    expect(citationOf({ envelope: { producer: { kind: "Principal", name: "owner" }, source: { kind: "cas" } } })).toEqual({ kind: "own_words" });
    expect(citationOf({ envelope: { producer: { kind: "Provider", name: "web" }, source: { kind: "external", source_identity: "cisa" } } })).toEqual({ kind: "evidence" });
  });
});

describe("a Document's own links", () => {
  it("reads the declared references fact; other facts and malformed links are left out", () => {
    const proof = {
      facts: [
        { schema_id: "cruxible.document.metadata", value: { links: [{ relation: "x", target_identity: "y" }] } },
        { schema_id: "cruxible.document.references", value: { links: [{ relation: "guides", target_identity: "ClaimType:a.b" }, { relation: "about" }], pins: [] } },
      ],
    };
    expect(documentLinks(proof)).toEqual([{ relation: "guides", target: "ClaimType:a.b" }]);
    expect(documentLinks(undefined)).toEqual([]);
  });
});

describe("the ledger mirror facet", () => {
  it("reads behind with Git's words and the publish command, and a never-published remote from its repair", () => {
    const behind = mirrorStatus({
      state: "behind",
      detail: { mirror_url: "https://h/x.git", attempted_at: "2026-11-07T22:00:00Z", requested_sequence: 2, published_sequence: 0, message: "fatal: x", publication_command: "cruxible ledger publish --json" },
      repair: { operation: "hand_edit", target: "https://h/x.git", required_change: "restore_the_ledger_mirror_remote_or_its_credential" },
    });
    expect(behind).toMatchObject({ state: "behind", url: "https://h/x.git", requested: 2, published: 0, message: "fatal: x", repair: "restore the ledger mirror remote or its credential" });
    expect(mirrorStatus({ state: "not_configured" })).toMatchObject({ state: "not_configured", url: null, repair: null });
    expect(mirrorStatus({ state: "current", detail: { mirror_url: "/srv/m.git" }, repair_hidden: true })?.url).toBe("/srv/m.git");
    expect(mirrorStatus(undefined)).toBeNull();
  });
});

describe("Runbook preview", () => {
  it("names a step's target, from the card's ref or the preview's typed target", () => {
    expect(targetOf("Line:security.osv-query")).toEqual({ kind: "line", name: "security.osv-query" });
    expect(targetOf({ kind: "line", line: { target: { kind: "Line", name: "a.b" } } })).toEqual({ kind: "line", name: "a.b" });
    expect(targetOf({ kind: "action", action: "floor.refresh" })).toEqual({ kind: "action", name: "floor.refresh" });
  });
  it("splits a step's Mandate scope into what settles and what goes to proposal, with the grant term that left a change out", () => {
    const rows = authorityRows(2, {
      max_authority: "settle",
      may_stop_run: false,
      settles: [{ claim_type: "c.affected_by", changes: [{ change: "create", basis: ["extracted"] }, { change: "retire", basis: ["absence"] }] }],
      settles_creation: ["c.vulnerability"],
      proposes: ["c.note"],
      review_gaps: [{ claim_type: "c.affected_by", change: "revise", basis: "derived", term: "basis" }],
      proposes_creation: ["c.other"],
    });
    expect(rows.map((r) => [r.what, r.goes])).toEqual([
      ["c.affected_by", "settles"],
      ["c.vulnerability", "settles"],
      ["c.affected_by", "proposes"],
      ["c.note", "proposes"],
      ["c.other", "proposes"],
    ]);
    expect(rows[2]!.gaps).toEqual([{ change: "revise", basis: "derived", term: "basis" }]);
    expect(authorityRows(1, null)).toEqual([]);
  });
});

describe("About: versions and health", () => {
  it("marks a daemon whose version or SDK contract differs from the console's pin, and only when both are known", async () => {
    const { versionRows } = await import("./about");
    const pin = { core_commit: "c", core_version: "0.5.1", sdk_contract_snapshot_digest: "sha256:a" };
    expect(versionRows({ version: "0.5.1", sdk_contract_snapshot_digest: "sha256:a" }, pin).map((r) => r.differs)).toEqual([false, false]);
    expect(versionRows({ version: "0.5.2", sdk_contract_snapshot_digest: "sha256:b" }, pin).map((r) => r.differs)).toEqual([true, true]);
    // a pin made before it recorded them, or a daemon not yet read: no mark
    expect(versionRows({ version: "0.5.2" }, { core_commit: "c" }).map((r) => r.differs)).toEqual([false, false]);
    expect(versionRows(undefined, pin).map((r) => r.daemon)).toEqual([null, null]);
  });

  it("lists every facet but the mirror, with the repair next names unless it is withheld", async () => {
    const { healthRows, HEALTH_FACETS } = await import("./about");
    const ok = { state: "current" };
    const status = Object.fromEntries([...HEALTH_FACETS, "ledger_mirror"].map((f) => [f, ok])) as never as Parameters<typeof healthRows>[0];
    (status as Record<string, unknown>).compiler = { state: "upgrade_available", detail: { running_compiler_revision: "r2" }, repair: { operation: "cruxible.compiler.upgrade", target: "x", required_change: "upgrade_the_compiler" } };
    (status as Record<string, unknown>).floor = { state: "stale", repair: { operation: "hand_edit", target: "y", required_change: "z" }, repair_hidden: true };
    const rows = healthRows(status);
    expect(rows.map((r) => r.facet)).not.toContain("ledger_mirror");
    expect(rows).toHaveLength(HEALTH_FACETS.length);
    expect(rows.find((r) => r.facet === "compiler")).toMatchObject({ repair: "upgrade the compiler", detail: "running_compiler_revision: r2" });
    expect(rows.find((r) => r.facet === "floor")!.repair).toBeNull();
  });
});
