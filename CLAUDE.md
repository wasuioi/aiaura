@AGENTS.md

## Turbopack serves stale CSS after edits

The dev server has twice kept serving the *old* stylesheet after `globals.css`
changed or several files were swapped at once. The markup updates, but new CSS
classes have no effect — computed styles come back as if the rule doesn't exist
(e.g. `scrollbar-color: auto` when `.scroll-warm` sets it), and deleted colors
keep rendering.

Before debugging CSS that "didn't take", rule this out:

```
# kill the dev server, then:
rm -rf .next && npm run dev
```

Verify against the freshly served stylesheet (fetch the `/_next/static/**.css`
chunk and grep it, or check the computed style in the browser) rather than
trusting the source file — the source can be correct while the page is not.
