# Walking-skeleton direction checkpoint — 2026-06-12

Live renders of instance `inst_85fcd2ae17234029` at commit `910207f`.

| screenshot | route |
| --- | --- |
| `ui-overview.png` | `/i/…` — overview, every parameterless collection query as a queue card |
| `ui-view.png` | `/i/…/views/review_queue` — entity-shaped named query |
| `ui-context.png` | `/i/…/views/work_item_change_context?work_item_id=wi-ui-v1-scope-ia` — path-shaped context query via forwarded URL params |
| `ui-release.png` | `/i/…/views/release_readiness_context?release_line_id=release-0.2` |
| `ui-entity.png` | `/i/…/e/WorkItem/wi-ui-v1-scope-ia` — entity context panel with per-edge trust metadata |
| `ui-receipt.png` | `/i/…/receipts/RCP-f5385520549f` — receipt detail |

## IA rationale

- **The instance describes itself; the UI has no hardcoded screens.** The left
  nav is built from the API: parameterless `mode: collection` queries from
  `/queries` become the Queues section; entity types with counts from `/stats`
  become the Entities section. A schema change (new named query, new entity
  type) shows up in the UI with zero code changes.
- **URL is state.** Instance-scoped routes (`/i/:instanceId/…`); named-query
  views forward non-reserved search params to the daemon, so any parameterized
  context view (`?work_item_id=…`) is a shareable link. Entities, receipts,
  and pagination offsets are all addressable.
- **Trust artifacts are first-class.** Every query-backed surface footers the
  receipt id (linked to the receipt view), head snapshot, returned/total
  counts, relationship_state, and truncation. The entity panel renders each
  edge with its review status, provenance `source_ref`, evidence refs
  (artifact id, line range, label) and rationale inline — never in tooltips.
- **Two result grammars, one renderer.** `result_shape: entity` renders as a
  dense table; `result_shape: path` renders as entry → result groups. The
  `*_context` queries and queue views share the envelope and the receipt bar.
- **Read-only end to end**; density and legibility over decoration: dark
  neutral palette, color only carries meaning (status/priority chips from the
  config vocabularies), monospace ids, tabular numerals.
