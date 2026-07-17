# AuraAI

**Concept project — no backend, built to showcase design and frontend execution.**

A landing page for a fictional product: a natural-language analytics tool for
solo founders. Connect Postgres or Stripe, ask your database a question in plain
English, and see the SQL behind every answer.

**→ [Live demo](https://aiaura-three.vercel.app)**

The page started as a generic "Premium Dark SaaS Landing" template — violet-to-cyan
gradient, fake customer logos, a headline that fits any AI product ever pitched —
and was rebuilt into a single-hue design system (brick red over warm neutrals)
with one interactive mock dashboard: four canned questions, each with its own
answer, matching chart, and SQL.

There is no company, no engine, and the "Connect your database" button connects
nothing. That's by design. This is a frontend and design demo, not a functioning
SaaS, and the interesting part isn't the code — it's why the page looks and
behaves the way it does.

## Design decisions

The full record is in **[BEHIND-THIS-BUILD.md](./BEHIND-THIS-BUILD.md)** — the
concept the page commits to, the template defaults it strips out, and the bugs
worth remembering. The short version:

- **One hue, one animated moment.** Brick red (`#c4483a`) in a few shades over a
  warm-gray ramp on warm black. One hue plus neutrals — the third color that
  "just looks nice" is what reads as random. Motion is spent in exactly one
  place: the demo question types itself, then the answer, chart, and SQL land in
  sequence. Everything else holds still, which is what makes that one moment read
  as intentional.
- **Interactive, but honest about its limits.** The four sidebar questions are
  real buttons — click one and its answer, chart, and SQL swap in with the
  line-draw replaying. There is deliberately **no input field**: a text box would
  promise an engine that doesn't exist, and a demo that takes real input and
  fails is worse than a mock that admits what it is.
- **Motion that respects the user.** The sequence starts on scroll-into-view via
  `IntersectionObserver` (an animation that plays before anyone sees it doesn't
  exist), and a user-initiated click disconnects the observer so the pending
  auto-play can't type over their choice — intent outranks automation. Under
  `prefers-reduced-motion: reduce`, the complete final state appears immediately;
  reduced-motion users never wait for a typing effect.

For the deeper change log and the constraints to keep, see
[`docs/reports/`](./docs/reports/).

## Stack

- **[Next.js 16](https://nextjs.org)** (App Router) — single route, no API routes
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **next/font** — Space Grotesk (display/body), JetBrains Mono (labels + SQL)
- **ESLint 9** (`eslint-config-next`)

No data layer and no state library — the charts are hand-rolled SVG.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The landing page is a single route — `app/page.tsx` composes it from the sections
in `app/components/`. The interactive demo lives in `DashboardPreview.tsx`, and
the four canned answers it shows are the only "data" in the project:
`app/data/cannedQueries.ts`.

Notes for anyone (or any agent) working on this: [`AGENTS.md`](./AGENTS.md) for
repo gotchas.
