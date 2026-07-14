# De-genericize pass — status report (v2)

> Audience: AI coding agents (and humans) picking up this repo later.
> Date: 2026-07-14. Branch: `degenericize-landing`. v2 supersedes v1.

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

## Still open

Nothing is blocked on a user decision. The brand-palette question left open in v1
has been answered by v2 (brick). Remaining items are ordinary polish, not
decisions: real responsive checks on a physical phone, and a copy pass on the
`layout.tsx` title/description if the user wants different wording.

## Guardrails — do not reintroduce

- Fabricated stats ("98% accuracy", "$2.84M") or fake customer logos.
- Generic "The Future of X, Powered by Y" headlines; unlabeled "NEW" badges.
- Two-hue gradients on UI elements; a second accent hue; decorative glow blobs.
- Extra animations beyond the single typing moment.
- Inter/Geist as the page font.
