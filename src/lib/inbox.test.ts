import { describe, expect, it } from "vitest";
import type { Schemas } from "@/api/schemas";
import { URGENT_EXPOSURES, URGENT_EXPOSURES_CARD } from "@/fixtures/authored/queries";
import {
  contractSubjectField,
  foldedFields,
  keyLookups,
  lineageQuery,
  lineageSubjectFields,
  lookupKey,
  subjectRefOf,
  type SubjectField,
} from "./inbox";
import { readQueryView } from "./query-view";

const KEYS = new Map<string, Set<string>>([
  ["security.component", new Set(["security.component.purl"])],
  ["security.vulnerability", new Set(["security.vulnerability.cve_id"])],
  ["security.inventory", new Set(["security.inventory.inventory_id"])],
  ["security.occurrence", new Set(["security.occurrence.inventory", "security.occurrence.component"])],
  ["security.release", new Set(["security.release.product", "security.release.version"])],
]);

/** The security kit's posting step (security.exposure-attention.unjudged, as served), reading urgent_exposures's rows. */
const SPEC = {
  procedure: "security.exposure-attention.unjudged",
  steps: [
    { read: "pairs", query: URGENT_EXPOSURES },
    {
      id: "post",
      inbox: "security.exposure-attention@1",
      fields: {
        component: { $ref: "item", path: ["component"] },
        cve_id: { $ref: "item", path: ["cve_id"] },
        inventory: { $ref: "item", path: ["inventory"] },
        occurrence: { $ref: "item", path: ["occurrence"] },
        state: "unjudged",
      },
      for_each: { $ref: "step", step: "pairs", path: ["rows"] },
      dedupe_key: ["occurrence", "cve_id", "state"],
      max_items: 100,
    },
  ],
} as unknown as Schemas["ProcedureSpec"];

/** Two of the walkthrough's served payloads. */
const PAYLOADS = [
  { component: "pkg:pypi/django@4.2", cve_id: "CVE-2025-57833", inventory: "sboms/app.cdx.json", occurrence: "sboms-app.cdx.json--pkg-pypi-django-4.2", state: "unjudged" },
  { component: "pkg:pypi/requests@2.31", cve_id: "CVE-2024-35195", inventory: "sboms/api.cdx.json", occurrence: "sboms-api.cdx.json--pkg-pypi-requests-2.31", state: "unjudged" },
];

describe("contractSubjectField", () => {
  it("reads the Subject a typed Contract field names", () => {
    expect(contractSubjectField("subject<security.release>", KEYS)).toEqual({ by: "id", kind: "security.release", from: "contract" });
    expect(contractSubjectField("subject<security.release | security.product>", KEYS)).toEqual({ by: "ref", kind: null, from: "contract" });
    expect(contractSubjectField("key<security.vulnerability>", KEYS)).toEqual({ by: "key", kind: "security.vulnerability", key: "security.vulnerability.cve_id", from: "contract" });
    expect(contractSubjectField("key_part<security.vulnerability:cve_id>", KEYS)).toMatchObject({ by: "key", kind: "security.vulnerability" });
    // a part of a composite key does not name one Subject; nor does plain text
    expect(contractSubjectField("key_part<security.release:version>", KEYS)).toBeNull();
    expect(contractSubjectField("key<security.release>", KEYS)).toBeNull();
    expect(contractSubjectField("string", KEYS)).toBeNull();
    expect(contractSubjectField('enum["unjudged", "contested"]', KEYS)).toBeNull();
  });
});

describe("lineageSubjectFields", () => {
  const views = new Map([[URGENT_EXPOSURES, readQueryView(URGENT_EXPOSURES_CARD)!]]);

  it("follows each $item field to the Query field that fills it: a box's one key, or the box's Subject id", () => {
    expect(lineageQuery(SPEC, "post")).toBe(URGENT_EXPOSURES);
    const fields = lineageSubjectFields(SPEC, "post", views, KEYS);
    expect(Object.fromEntries(fields)).toEqual({
      component: { by: "key", kind: "security.component", key: "security.component.purl", from: "lineage" },
      cve_id: { by: "key", kind: "security.vulnerability", key: "security.vulnerability.cve_id", from: "lineage" },
      inventory: { by: "key", kind: "security.inventory", key: "security.inventory.inventory_id", from: "lineage" },
      occurrence: { by: "id", kind: "security.occurrence", from: "lineage" },
    });
    // a literal field (state) has no lineage
    expect(fields.has("state")).toBe(false);
  });

  it("says nothing without the read Query, or for a step that does not fan out over a read's rows", () => {
    expect(lineageSubjectFields(SPEC, "post", new Map(), KEYS).size).toBe(0);
    expect(lineageSubjectFields(SPEC, "other", views, KEYS).size).toBe(0);
    // a field filled from a non-key ClaimType names no Subject
    const scoped = { ...SPEC, steps: [SPEC.steps[0], { ...(SPEC.steps[1] as object), fields: { scope: { $ref: "item", path: ["scope"] } } }] } as unknown as Schemas["ProcedureSpec"];
    expect(lineageSubjectFields(scoped, "post", views, KEYS).size).toBe(0);
  });
});

describe("subjectRefOf and keyLookups", () => {
  const fields = new Map<string, SubjectField>([
    ["cve_id", { by: "key", kind: "security.vulnerability", key: "security.vulnerability.cve_id", from: "lineage" }],
    ["occurrence", { by: "id", kind: "security.occurrence", from: "lineage" }],
    ["release", { by: "id", kind: "security.release", from: "contract" }],
  ]);

  it("asks one lookup per kind, over the page's distinct key values", () => {
    const rows = [...PAYLOADS, PAYLOADS[0]!].map((payload) => ({ payload, fields }));
    expect(keyLookups(rows)).toEqual([{ kind: "security.vulnerability", key: "security.vulnerability.cve_id", values: ["CVE-2024-35195", "CVE-2025-57833"] }]);
  });

  it("links an id under its kind, a ref as served, a key value only once the lookup found its Subject", () => {
    const found = new Map([[lookupKey("security.vulnerability", "CVE-2025-57833"), "security.vulnerability/cve-2025-57833"]]);
    expect(subjectRefOf(fields.get("occurrence")!, "sboms-app.cdx.json--pkg-pypi-django-4.2", found)).toBe("security.occurrence/sboms-app.cdx.json--pkg-pypi-django-4.2");
    expect(subjectRefOf(fields.get("release")!, "security.release/acme-2.4.0", found)).toBe("security.release/acme-2.4.0");
    expect(subjectRefOf(fields.get("cve_id")!, "CVE-2025-57833", found)).toBe("security.vulnerability/cve-2025-57833");
    expect(subjectRefOf(fields.get("cve_id")!, "CVE-2024-35195", found)).toBeNull();
    expect(subjectRefOf(fields.get("cve_id")!, 7, found)).toBeNull();
  });
});

describe("foldedFields", () => {
  const names = ["component", "cve_id", "inventory", "occurrence", "state"];

  it("folds a field with one value on every row, and an id built from two other fields", () => {
    const { constant, composite } = foldedFields(names, PAYLOADS);
    expect([...constant]).toEqual([["state", "unjudged"]]);
    expect([...composite]).toEqual(["occurrence"]);
  });

  it("keeps a Subject field on its row even when every row shares it", () => {
    const same = PAYLOADS.map((payload) => ({ ...payload, component: "pkg:pypi/django@4.2" }));
    expect([...foldedFields(names, same, new Set(["component"])).constant.keys()]).toEqual(["state"]);
    expect([...foldedFields(names, same).constant.keys()]).toEqual(["component", "state"]);
  });

  it("folds nothing on a single row, and never a field that one other field explains alone", () => {
    expect(foldedFields(names, [PAYLOADS[0]!]).constant.size).toBe(0);
    const one = [{ a: "acme-2.4.0", b: "acme 2.4.0" }, { a: "beta-1", b: "beta 1" }];
    expect(foldedFields(["a", "b"], one).composite.size).toBe(0);
  });
});
