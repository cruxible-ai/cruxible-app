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

## Pull Requests

- Keep changes focused; one concern per PR.
- Include tests for behavior changes.
- Match the existing code style; the linter is the arbiter.

## License

By contributing, you agree that your contributions will be licensed under the
Apache License 2.0.
