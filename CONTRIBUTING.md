# Contributing to Cruxible App

Thanks for your interest in contributing! This document covers the basics.

## Development Setup

```bash
git clone https://github.com/cruxible-ai/cruxible-app.git
cd cruxible-app
pnpm install
pnpm dev
```

The app expects a running Cruxible daemon; point it at your instance via the
connection settings (base URL + optional bearer token).

## Tests

```bash
pnpm test        # unit tests (vitest)
pnpm test:e2e    # end-to-end tests (playwright)
```

## Tables and lists: three shapes

Pick the shape by what the data is, then use its shared component. Do not
hand-roll a `<table>`, a `<dl>` grid or a divided list of rows.

| Data shape | Component | Used for |
|---|---|---|
| A collection of like rows (many things, the same fields) | `DataTable` (`src/components/DataTable.tsx`) | lists of things: Subjects, contracts, Captures, Triggers |
| One thing's fields (a record) | `FieldList` (`src/components/FieldList.tsx`) | detail panels: a Subject's fields, a card, a contract's terms |
| Changes over time (an event log) | `ChangeLog` (`src/components/ChangeLog.tsx`) | histories: a Subject's changes, the ledger |

How to pick:

- Would a reader compare rows column by column, sort or filter them? `DataTable`.
- Is it one thing, and the rows are its named fields? `FieldList`.
- Is each row a change, read newest first, with who made it? `ChangeLog`.

### DataTable

`rows`, `columns: Column<T>[]` (`id`, `header`, `cell(row)`, optional
`sortValue`, `filter`, `className`, `title`, `numeric`), `rowKey`, `label`.
Sort, filters and hidden columns live in the URL; give `urlKey` when a page
has more than one table. A paged read passes `partial` so a sort never claims
to be complete. `expanded`/`canExpand` add a per-row disclosure. A short table
inside a card passes `toolbar={false}` and `maxHeight="none"`.

### FieldList

`<FieldList fields={[{ key, label, value, provenance?, status?, labelHref?, labelTitle? }]} />`:
a fixed label column, the value, a trailing `status` (the `key` mark from
`KeyMark`, evidence, flag chips), rows divided by a hairline. `provenance` is a
quiet line under the value (since when, by whom, why).

- `labels`: `"names"` (default, mono: field names) or `"words"` (body face: "Fires", "Kept").
- `density`: `"regular"` (9–15rem label column) or `"compact"` (labels as wide as they are, up to 12rem; a side panel or a record nested in a value).
- Rows with their own state (an expandable field) are `FieldRow` children of
  `<FieldList expandable>`, each with `toggle={{ open, onToggle, name }}` and `detail`.

### ChangeLog

`<ChangeLog label>` holds one `<ChangeEntry>` per change:

- `header`: the change's labelled line, built from `HeaderLabel` (a quiet
  uppercase label), `HeaderDot` and the values: `GENERATION g9 · date · LINE x ↗ · RUN … · APPROVED BY …`.
  `GenerationLink` links a generation to the current page as it stood then;
  `ChangeAuthor` (`src/components/ChangeAuthor.tsx`) names a run's Line, a
  direct run's Procedure, or the principal, then the approvers.
- `notes`: the change's own words, once, under the header.
- `changes: ChangeItem[]` (`id`, `field`, `change`, `value`, `reason?`,
  `render?`, `mark?`): the fields it changed, one line each, not columns. The
  reason reads muted under the value. A field changed more than once folds to
  `× N` with the first three values and "show all"; reasons that are one
  sentence around each value read once (`sharedReason`).
- `children`: anything after (a disclosure into the full change set).

## Pull Requests

- Keep changes focused; one concern per PR.
- Include tests for behavior changes.
- Match the existing code style; the linter is the arbiter.

## License

By contributing, you agree that your contributions will be licensed under the
Apache License 2.0.
