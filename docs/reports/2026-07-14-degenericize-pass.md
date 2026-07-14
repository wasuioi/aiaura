# De-genericize pass — status report (v2 → v3)

> Audience: AI coding agents (and humans) picking up this repo later.
> Started 2026-07-14, last updated 2026-07-15. Branch: `degenericize-landing`,
> PR #1. Read in order: v2 (design system) → follow-up fixes → v3 (the preview
> is now interactive). v2 superseded v1; v1 is not recorded here.

## Concept commitment

AuraAI is a fictional portfolio piece: a natural-language analytics tool for
**solo SaaS founders** — connect Postgres/Stripe, ask questions in plain English
instead of writing SQL, and **every answer shows the query behind it**. All copy
is written to that concept. Keep any future copy equally specific; do not drift
back to generic AI-SaaS phrasing.

## Design system (v2) — the brand decision is now made

The violet→cyan gradient on blue-violet black (the single most recognizable "AI
default" scheme) has been **replaced**. New system:

| Token | Hex | Use |
|---|---|---|
| `background` | `#100b0a` | Page background (warm black) |
| `brick-300` | `#e08573` | SQL text, light accents |
| `brick-400` | `#d4664f` | Hover states, chart line, headline accent |
| `brick-500` | `#c4483a` | Primary buttons, logo mark |
| `brick-600` | `#9e3527` | Borders/tints of active items |
| `warm-050` | `#f0ebe7` | Primary text |
| `warm-200` | `#cfc7c0` | Secondary text |
| `warm-400` | `#a89f98` | Muted text |
| `warm-600` | `#6e655f` | Labels, faint text |
| `warm-800` | `#3a322e` | Borders |
| `warm-900` | `#1c1512` | Card surfaces |
| `delta-up` | `#7fb069` | Positive deltas in charts ONLY (semantic) |

Tokens live in `app/globals.css` under `@theme inline` (Tailwind v4), so
`bg-brick-500`, `text-warm-400`, `border-warm-800` etc. work everywhere.

**Rules:** one accent hue only — never introduce a second. Never put a two-hue
gradient on any UI element. `delta-up` green is semantic-only.

**Typography:** Geist (create-next-app default) is gone. `Space Grotesk`
(`--font-display`) for headlines/body; `JetBrains Mono` (`--font-code`) for
labels, the typed question, and SQL — the mono face does concept work.

**Motion:** exactly ONE animated flourish on the page — the question in
`DashboardPreview` types itself, then answer/chart/SQL fade in, gated on typing
completion. `prefers-reduced-motion` shows the final state immediately. Do not
add more animation (no scroll-following lines, meteors, cursor glows, floating
blobs). The stillness everywhere else is what makes the one moment read as
intentional.

## Done

| File | Change |
|---|---|
| `app/globals.css` | Brick + warm-gray token system; removed violet/cyan tokens, `.text-gradient-aura`, `.grid-overlay`, glow keyframes. Added `cursorBlink` / `fadeUp`. |
| `app/layout.tsx` | Space Grotesk + JetBrains Mono; concept-specific title/description (old generic headline was leaking into browser tabs and link previews). |
| `app/page.tsx` | Removed `LogoStrip` and `BackgroundGlows`. |
| `app/components/Nav.tsx` | Solid brick logo mark + button (no gradient); nav links match the concept. |
| `app/components/Hero.tsx` | Concept headline/subtext/CTAs; solid brick accent instead of gradient text. |
| `app/components/Features.tsx` | 1 lead card + 2 supporting (not 3 equal); concept copy; no fabricated stats. |
| `app/components/FeatureCard.tsx` | Accents cut from 3 (violet/cyan/mixed) to 2 (`brick` / `neutral`); removed the pointer-tracking glow. |
| `app/components/DashboardPreview.tsx` | The product's actual interaction: typed question → answer → chart → the SQL that ran. Hosts the page's one animation. |
| `app/components/RevenueChart.tsx` | Single brick hue; the old violet→cyan line gradient is gone. Area fill is one hue at varying opacity (shade ramp, not a two-hue gradient). |
| `app/components/CTA.tsx` | Concept copy; both animated radial-glow blobs removed. |
| `app/components/Footer.tsx` | Solid brick mark; warm-gray text. |
| `BackgroundGlows.tsx`, `LogoStrip.tsx` | **Deleted** (glow blobs; fabricated customer logos). |

### Verification performed

- `next build` passes clean (TypeScript OK, static pages generated, fonts fetch).
- Production CSS inspected: contains Space Grotesk, JetBrains Mono, `#c4483a`,
  `#d4664f`, `#100b0a`, `cursorBlink`. Contains **no** `a855f7` / `22d3ee`.
- Dev server: page renders with the answer block hidden on first paint and the
  question typing on the client — i.e. the sequence works as designed.

## Follow-up fixes (after v2, user-driven)

All three verified in a real browser (Playwright against a production build),
not just typecheck.

### 1. Typing starts on scroll-into-view, not on mount (`9bba09d`)

User feedback: the preview sits below the hero, so a visitor reading the
headline first missed the whole typing animation and arrived at a finished mock.

- `DashboardPreview` now gates the sequence on an `IntersectionObserver`
  (threshold 0.35, one-shot, 400ms start delay so it doesn't begin mid-scroll).
- `RevenueChart` is now **mounted at reveal** rather than at page mount — its
  line-draw is a CSS animation, so mounting earlier would finish it off-screen.
  A 180px placeholder holds the height; no layout shift.
- `prefers-reduced-motion` still shows the complete final state immediately at
  load, with no waiting on scroll. Deliberate: reduced-motion users should not
  have to wait for anything. (If "reveal on scroll without animation" is wanted
  instead, that's a one-line change in the reduced-motion branch.)
- Verified: at load the question box is empty / answer hidden / chart unmounted
  even after 2.5s; after scrolling, typing is observably incremental; settled
  state shows everything.

### 2. Preview no longer overflows its card (`9bba09d`)

Found while screenshotting fix 1 (also visible in the user's screenshot): the
nowrap SQL line widened the grid's main column past the card — squeezed sidebar,
clipped right edge. Root cause: grid items default to `min-width: auto`, which
prevents the `overflow-x-auto` container from shrinking. Fix: `min-w-0` on the
preview's `<main>` column. Verified: grid `scrollWidth == clientWidth`, sidebar
at its full 190px, no horizontal page scroll at 390px viewport.

### 3. SQL strip scrollbar themed (`21f6e4c`)

User feedback: the horizontal scrollbar under the SQL line rendered as the
bright Windows default — stray light chrome inside a dark card. Added
`.scroll-warm` in `globals.css` (thin, 6px; thumb `warm-800`, hover
`brick-700`, transparent track; both `scrollbar-color` and the
`::-webkit-scrollbar-*` properties) and applied it to the SQL container.
Verified via computed style in the browser: `scrollbar-width: thin`,
`scrollbar-color: rgb(58,50,46) transparent`.

### Operational note

Turbopack's dev server served **stale CSS twice** in this session. That note now
lives in `AGENTS.md` (read by every agent) rather than here, since it is a
standing repo gotcha, not a record of this pass.

## v3 — the preview is interactive (`645118d`)

The mock played one canned answer and stopped. The four sidebar entries are now
real `<button>`s: click one and the question re-types, then its answer, chart,
and SQL replace what was there.

- **`app/data/cannedQueries.ts` (new)** — single source of truth: four entries
  with question, split answer (`before` / `stat` / `after`), chart label, 12-point
  normalized `chartData`, `chartDirection`, and SQL. All four are hardcoded.
  **There is no engine and no input field**, and adding either is out of scope —
  it would imply a backend that does not exist.
- **`RevenueChart`** now takes `data` / `label` / `direction` as props instead of
  hardcoding one ascending series. `direction` deliberately **does not touch the
  palette** — a falling line stays brick, it does not turn red, and `delta-up`
  green stays reserved. It only describes the trend in `aria-label`, for readers
  who cannot see the shape.
- **Each dataset matches its sentence.** The old chart climbed while the answer
  said signups *fell 18%* — the same fabricated-dashboard tell this project keeps
  removing. Rule for future edits: **change a stat, change its chart.**

Behaviour worth preserving:

- Switching cancels in-flight typing, so rapid clicks cannot interleave two
  questions into one string. Clicking the active question is a no-op.
- The chart is keyed by question id so its line-draw replays on switch, and still
  mounts only on reveal behind the 180px placeholder (from `9bba09d`).
- A user-initiated switch **disconnects the scroll observer** — otherwise a
  pending first play would type over the question the visitor just chose. Intent
  outranks the automatic trigger.
- Below `sm` the sidebar is hidden, which would have made the whole feature
  invisible on a phone; the questions ride above the input as a scrollable chip
  row reusing `.scroll-warm` (from `21f6e4c`).
- Accessibility: the typed text is `aria-hidden` with the full question in an
  `sr-only` sibling, so screen readers hear the question **once** instead of one
  character at a time; `aria-live="polite"` sits on the answer block alone.

### Verification performed

Real browser (Playwright, production build), all eight checks from the v3 spec:
first play on scroll; each of the four switches (typed text, stat, SQL and chart
trend all matching); rapid-click with no interleaving; active-click no-op;
keyboard Tab/Enter with a visible focus ring; reduced-motion instant complete
swap; 390px chip row scrolling with no page overflow; and the a11y structure
above.

## Still open

Nothing is blocked on a user decision. The brand-palette question left open in v1
was answered by v2 (brick). Remaining items are ordinary polish, not decisions:
responsive checks on a physical phone, a real screen-reader pass (the a11y
structure was verified by DOM inspection, not by listening to one), and a copy
pass on the `layout.tsx` title/description if different wording is wanted.

## Guardrails — do not reintroduce

- Fabricated stats ("98% accuracy", "$2.84M") or fake customer logos.
- A stat whose chart tells a different story than its sentence.
- Generic "The Future of X, Powered by Y" headlines; unlabeled "NEW" badges.
- Two-hue gradients on UI elements; a second accent hue; decorative glow blobs.
- New animation types — reuse `cursorBlink`, `fadeUp`, `auraDraw` only.
- A working input field or anything else implying a backend behind the mock.
- Inter/Geist as the page font.
