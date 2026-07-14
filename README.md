# AuraAI

A concept landing page for a fictional product: a natural-language analytics
tool for solo founders — connect Postgres or Stripe, ask a question in plain
English, and see the SQL behind every answer.

There is no backend and no company. The page is a portfolio piece, and the
interesting part is not the code — it's why the page looks and behaves the way
it does.

**→ [Behind this build](./BEHIND-THIS-BUILD.md)** — the decisions: the concept
it commits to, the template defaults it strips out (one hue, one animated
moment, no fake customer logos), and the bugs worth remembering.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The landing page is a single route — `app/page.tsx` composes it from the
sections in `app/components/`. The interactive demo lives in
`DashboardPreview.tsx`, and the four canned answers it shows are the only
"data" in the project: `app/data/cannedQueries.ts`.

## Stack

Next.js (App Router) · Tailwind v4 · TypeScript

Notes for anyone (or any agent) working on this: [`AGENTS.md`](./AGENTS.md) for
repo gotchas, [`docs/reports/`](./docs/reports/) for the full change log and the
constraints to keep.
