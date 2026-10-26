import { describe, expect, it } from "vitest";
import {
  cellSortValue,
  claimFlags,
  isWholeAnswer,
  kindCell,
  kindColumn,
  pushDown,
  selectFields,
  serverFilterable,
  serverSortable,
  SUBJECT_ID,
  type KindColumn,
} from "./kind-table";
import { kindQuery } from "../api/requests";
import type { TableState } from "./table-state";

const status = kindColumn({ name: "status", predicate: "security.assessment.status", type: "enum", members: ["affected", "not_affected"], cardinality: "one" });
const related = kindColumn({ name: "related", predicate: "security.vulnerability.related", type: "subject:security.vulnerability", cardinality: "many" });
const release = kindColumn({ name: "release", predicate: "security.assessment.release", type: "subject:security.release" });
const downloads = kindColumn({ name: "weekly_downloads", predicate: "security.package.weekly_downloads", type: "integer" });
const blob = kindColumn({ name: "body", predicate: "security.document.body", type: "exact_content" });
const subject: KindColumn = { key: SUBJECT_ID, field: SUBJECT_ID, name: "Subject", type: "string", targets: [], members: null, cardinality: "one" };

const claim = (id: string, value: unknown, verdict = "supported", status = "accepted") => ({ claim: id, value, verdict, status, role: "normative" });

describe("kind columns", () => {
  it("reads a served column: the row key, the full predicate, the base type and a Subject field's target kinds", () => {
    expect(release).toEqual({
      key: "release",
      field: "security.assessment.release",
      name: "release",
      type: "subject",
      targets: ["security.release"],
      members: null,
      cardinality: "one",
    });
  });

  it("selects identity keys first, then the rest by predicate, at most 64", () => {
    expect(selectFields(["k.b", "k.a", "k.id"], ["k.id", "k.missing"])).toEqual({ select: ["k.id", "k.a", "k.b"], left: [] });
    const many = Array.from({ length: 70 }, (_, i) => `k.f${String(i).padStart(2, "0")}`);
    const { select, left } = selectFields(many, []);
    expect(select).toHaveLength(64);
    expect(left).toEqual(["k.f64", "k.f65", "k.f66", "k.f67", "k.f68", "k.f69"]);
  });

  it("asks for each cell's Claims, one page of 100, and only the narrowing it has", () => {
    expect(kindQuery({ kind: "k", select: ["k.a"] })).toEqual({ kind: "k", select: ["k.a"], claims: true, limit: 100 });
    expect(kindQuery({ kind: "k", select: [], where: [], orderBy: ["-k.a"], cursor: "c1" })).toEqual({
      kind: "k",
      select: [],
      claims: true,
      limit: 100,
      order_by: ["-k.a"],
      cursor: "c1",
    });
  });
});

describe("cell rules", () => {
  it("a one-valued field reads as its value, linked to the Claim that states it", () => {
    const cell = kindCell({ status: "affected", claims: { status: [claim("CLM-1", "affected")] } }, status);
    expect(cell).toMatchObject({ display: "value", values: ["affected"], entries: [{ value: "affected", claim: "CLM-1" }], flags: [], signal: null });
  });

  it("a contested one-valued slot shows every rival with the amber dot", () => {
    const cell = kindCell(
      { status: ["affected", "not_affected"], claims: { status: [claim("CLM-1", "affected", "supported", "conflicted"), claim("CLM-2", "not_affected", "supported", "conflicted")] } },
      status,
    );
    expect(cell.display).toBe("values");
    expect(cell.entries.map((e) => e.claim)).toEqual(["CLM-1", "CLM-2"]);
    expect(cell.flags).toEqual(["contested"]);
    expect(cell.signal).toBe("waiting");
  });

  it("two distinct values in a one-valued slot are contested even when no Claim says conflicted", () => {
    expect(kindCell({ status: ["affected", "not_affected"] }, status).flags).toEqual(["contested"]);
  });

  it("a many-valued field with two or more values reads as a count that expands; one value reads as itself", () => {
    const two = kindCell(
      { related: ["security.vulnerability/a", "security.vulnerability/b"], claims: { related: [claim("CLM-1", "security.vulnerability/a"), claim("CLM-2", "security.vulnerability/b")] } },
      related,
    );
    expect(two.display).toBe("count");
    expect(two.flags).toEqual([]); // many values are not a contest
    expect(kindCell({ related: ["security.vulnerability/a"] }, related).display).toBe("value");
    expect(kindCell({ related: [] }, related).display).toBe("empty");
    expect(kindCell({ status: null }, status).display).toBe("empty");
  });

  it("a stated none reads as none, linked to its Claim, with its flags", () => {
    const cell = kindCell({ status: null, nones: { status: [{ claim: "CLM-9", verdict: "stale", status: "accepted", flags: ["stale"] }] } }, status);
    expect(cell).toMatchObject({ display: "none", nones: ["CLM-9"], flags: ["stale"], signal: "waiting" });
  });

  it("flags follow core's verdict rule; red beats amber; overturned Claims raise nothing", () => {
    expect(claimFlags({ verdict: "stale_evidence", status: "accepted" })).toEqual(["stale"]);
    expect(claimFlags({ verdict: "unresolved", status: "accepted" })).toEqual(["contested"]);
    expect(claimFlags({ verdict: "contradicted", status: "conflicted" })).toEqual(["contested", "contradicted"]);
    expect(claimFlags({ verdict: "uncovered", status: "accepted" })).toEqual(["uncovered"]);
    const both = kindCell(
      { status: ["affected", "not_affected"], claims: { status: [claim("CLM-1", "affected", "contradicted"), claim("CLM-2", "not_affected", "stale")] } },
      status,
    );
    expect(both.flags).toEqual(["stale", "contested", "contradicted"]);
    expect(both.signal).toBe("wrong");
    const quiet = kindCell({ status: "affected", claims: { status: [claim("CLM-1", "affected"), claim("CLM-0", "not_affected", "contradicted", "overturned")] } }, status);
    expect(quiet.flags).toEqual([]);
  });

  it("sorts a one-valued field by its value and a many-valued one by how many", () => {
    expect(cellSortValue({ weekly_downloads: 12 }, downloads)).toBe(12);
    expect(cellSortValue({ status: null }, status)).toBeNull();
    expect(cellSortValue({ related: ["a", "b", "c"] }, related)).toBe(3);
  });
});

describe("push-down to the daemon", () => {
  const state = (s: Partial<TableState>): TableState => ({ sort: null, filters: {}, hidden: [], ...s });

  it("orders by subject_id and one-valued scalar fields only", () => {
    expect(serverSortable(subject)).toBe(true);
    expect(serverSortable(status)).toBe(true);
    expect(serverSortable(release)).toBe(true);
    expect(serverSortable(downloads)).toBe(true);
    expect(serverSortable(related)).toBe(false);
    expect(serverSortable(blob)).toBe(false);
  });

  it("filters by contains on text and Subject fields and by picked values on enums; not numbers by contains", () => {
    expect(serverFilterable(subject)).toBe(true);
    expect(serverFilterable(status)).toBe(true);
    expect(serverFilterable(related)).toBe(true);
    expect(serverFilterable(downloads)).toBe(false);
    expect(serverFilterable(blob)).toBe(false);
  });

  it("turns the sort and filters into order_by and where on the full field", () => {
    const pushed = pushDown(
      state({
        sort: { column: "weekly_downloads", dir: "desc" },
        filters: { status: { kind: "enum", values: ["affected"] }, subject_id: { kind: "text", text: " cve " }, release: { kind: "text", text: "rel" } },
      }),
      [subject, status, release, downloads],
    );
    expect(pushed.orderBy).toEqual(["-security.package.weekly_downloads"]);
    expect(pushed.where).toEqual([
      { field: "security.assessment.status", in: ["affected"] },
      { field: "subject_id", contains: "cve" },
      { field: "security.assessment.release", contains: "rel" },
    ]);
    expect(pushDown(state({ sort: { column: "subject_id", dir: "asc" } }), [subject]).orderBy).toEqual(["subject_id"]);
  });

  it("sends booleans as booleans and pushes nothing the daemon cannot serve", () => {
    const maintained = kindColumn({ name: "maintained", predicate: "k.maintained", type: "boolean" });
    expect(pushDown(state({ filters: { maintained: { kind: "enum", values: ["false"] } } }), [maintained]).where).toEqual([
      { field: "k.maintained", in: [false] },
    ]);
    expect(pushDown(state({ sort: { column: "related", dir: "asc" }, filters: { weekly_downloads: { kind: "text", text: "1" } } }), [related, downloads])).toEqual({
      where: [],
      orderBy: [],
    });
  });

  it("knows a whole answer from a page with more behind it", () => {
    expect(isWholeAnswer({ next_cursor: null, remaining: 0, capped: [], truncated: false })).toBe(true);
    expect(isWholeAnswer({ next_cursor: "c", remaining: 30 })).toBe(false);
    expect(isWholeAnswer({ next_cursor: null, remaining: 0, capped: ["max_results=5000"] })).toBe(false);
  });
});
