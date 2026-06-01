# Cruxible App

Standalone Next.js application for the Cruxible marketing website and product experience.

## Getting Started

Install dependencies:

```bash
npm ci
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Backend API requests are proxied through `NEXT_PUBLIC_API_URL` when set. If it is unset, Next.js uses the local API route defaults in `next.config.mjs`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Structure

- `src/app`: App Router pages and API routes
- `src/components`: UI, marketing, dashboard, chat, report, and canvas components
- `src/lib`: API clients, types, fixtures, and utility helpers
- `public`: Static images and icons
- `test-data`: Local CSV fixtures for upload flows

## Environment

Local environment files are intentionally ignored by Git:

```bash
.env.local
```

Keep deployment secrets in the hosting provider or local ignored env files.
