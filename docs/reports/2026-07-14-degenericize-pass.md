# De-genericize pass — status report

> Audience: AI coding agents (and humans) picking up this repo later.
> Date: 2026-07-14. Branch: `degenericize-landing`.

## Concept commitment

The landing page no longer uses generic AI-SaaS template copy. It is now written
to **one concrete fictional concept**: AuraAI is a natural-language analytics
tool for **solo SaaS founders** who connect **Postgres/Stripe** and ask
plain-English questions instead of writing SQL. Any future copy edits must stay
specific to this concept. If the concept changes, all copy needs a full rewrite —
do not drift back to generic phrasing.

## Done in this pass

| File | Change |
|---|---|
| `app/page.tsx` | Removed `LogoStrip` import/usage; comment explains why. |
| `app/components/Hero.tsx` | New concept-specific headline/subtext/CTAs ("Ask your database what happened. In English, not SQL."). Removed the fabricated "NEW — Aura Engine 2.0" badge. |
| `app/components/Features.tsx` | Restructured 3 equal cards → 1 wide lead card + 2 supporting cards. All copy rewritten to the concept. Removed fabricated stats ("98% accuracy", "sub-second latency"). |
| `app/components/CTA.tsx` | New concept-specific headline ("Stop exporting CSVs at midnight.") and button labels. |
| `app/components/DashboardPreview.tsx` | Rebuilt from generic BI-dashboard mockup ("$2.84M revenue", nav sidebar) into the actual product interaction: typed question → plain-English answer → chart → the SQL behind it, with a "recent questions" sidebar. |
| `app/components/LogoStrip.tsx` | **Deleted.** It hardcoded fake customer names (Nebula, Vertex, Quanta, Loomly, Fathom) under "TRUSTED BY" — fabricated social proof, high-risk for a portfolio piece. |
| `app/layout.tsx` | **Not in the original handoff — added during application.** The `<title>` and meta description still carried the old generic copy ("The Future of Analytics, Powered by Intelligence"). Updated both to match the new concept. |

### Verification performed

- `npm run dev` (Next.js 16.2.10 / Turbopack): compiles cleanly, no missing-import errors.
- Rendered HTML at `/` checked programmatically: all new copy present; all removed
  strings (Aura Engine 2.0, Nebula, TRUSTED BY, $2.84M, 98% accuracy,
  Future of Analytics) confirmed absent.

## NOT done — waiting on user decisions

1. **Brand color palette.** The violet→cyan gradient tokens in `app/globals.css`
   (`--color-aura-violet`, `--color-aura-cyan`) are themselves a known
   generic-AI-SaaS signal (purple/blue gradient on near-black). Whether to keep
   or replace them is a **brand decision the user has not made**. Do NOT change
   `globals.css` unless explicitly asked.
2. **Metadata wording.** The new `<title>`/description in `app/layout.tsx` were
   written by the agent, not specified in the handoff. User may want different
   wording; the concept constraint above still applies.

## Guardrails for future edits

Do not reintroduce:

- Fabricated stats or precision claims ("98% accuracy", "$2.84M").
- Fake customer logos or invented social proof.
- Generic "The Future of X, Powered by Y"-style headlines.
- Unlabeled version/"NEW" badges implying releases that don't exist.
