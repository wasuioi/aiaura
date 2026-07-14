# Behind this build

AuraAI is a **concept landing page for a fictional product** — a
natural-language analytics tool for solo founders. Nothing here is a real
company: there is no backend, no customers, and the "Connect your database"
button connects nothing. What's real is every decision on this page, and
this document is the record of them.

I built it with AI coding tools (Claude Code did most of the typing). That's
not a disclaimer — it's the point. The gap between "AI-made" and "made with
AI" is not the tool; it's whether anyone made decisions. Here are mine.

## Starting point: a template, faithfully reproduced

The first version was built from a "Premium Dark SaaS Landing" template:
violet-to-cyan gradient on near-black, a fake "NEW — Aura Engine 2.0" badge,
a headline ("The Future of Analytics, Powered by Intelligence") that fits any
AI product ever pitched, a dashboard mockup with invented numbers, and a
"Trusted by" strip of customer logos that don't exist.

Technically fine. Also instantly recognizable as the default AI output —
which, for a portfolio, is the one thing it cannot be.

## Decision 1: commit to a concept, then make everything answer to it

Generic copy is a symptom; the disease is having nothing specific to say. So
I picked something specific: *a founder who used to open a SQL editor at
midnight to figure out why signups dropped.* Every subsequent choice —
headline, feature hierarchy, the demo, even the monospace font — answers to
that one sentence.

## Decision 2: subtract the fake proof

The fabricated customer logos and invented stats ("$2.84M revenue") went
first. For a portfolio piece this is doubly important: the people reviewing
it are exactly the audience most likely to check. No trust section beats a
fake one.

## Decision 3: one hue, one animated moment

- **Color:** brick red (`#c4483a`) in several shades over a warm-gray ramp,
  on warm black. One hue plus neutrals — the third color that "just looks
  nice" is what reads as random. The violet→cyan gradient is gone entirely;
  buttons are solid.
- **Type:** Space Grotesk for display/body, JetBrains Mono for labels and
  SQL. The mono face is doing concept work — the product's whole story is
  "the query behind the answer."
- **Motion:** exactly one animated moment. The demo question types itself,
  then the answer, chart, and SQL appear in sequence. Everything else on the
  page holds still, because the stillness is what makes the one moment read
  as intentional. It starts when scrolled into view (an animation that plays
  before anyone sees it doesn't exist), and `prefers-reduced-motion` gets
  the complete final state immediately — reduced-motion users never wait.

## Decision 4: interactive, but honest about its limits

The four sidebar questions are real buttons: click one and its answer,
chart, and SQL swap in, with the line-draw replaying. All four responses are
hardcoded. There is deliberately **no input field** — a text box would
promise an engine that doesn't exist, and a demo that takes real input and
fails is worse than a mock that's honest about being one.

## Bugs worth remembering

- **The chart contradicted the copy.** The answer said signups *fell 18%*;
  the chart climbed cheerfully upward. Same fabricated-dashboard tell I'd
  been removing everywhere else, hiding in my own mockup. Rule since then:
  change a stat, change its chart.
- **`min-width: auto` strikes again.** The nowrap SQL line blew the CSS grid
  open past its card because grid items refuse to shrink by default.
  `min-w-0` on the column, not `overflow: hidden` over the symptom.
- **Intent vs. automation.** If a visitor clicked a question before the
  scroll-triggered first play fired, the pending auto-play would type over
  their choice. The user-initiated switch now disconnects the observer:
  intent outranks the automatic trigger.
- **Trust the browser, not the typecheck.** Every round was verified in a
  real browser (Playwright against a production build) — which is how the
  grid overflow and a stale-CSS dev-server quirk were caught at all.

## What I'd do differently

Start from the concept instead of a template. Every hour spent
de-genericizing the template was an hour the template cost me.

---

*Stack: Next.js (App Router), Tailwind v4, TypeScript. Built with Claude
Code, directed by a human with opinions.*
