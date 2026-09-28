# Performance baseline (measured)

Measured against `next start` on the production build, gzip, homepage.
Re-measure with `scripts/measure-payload.sh` after any dependency change.

| | New site | Old WordPress site |
|---|---|---|
| HTML | **7.5 KB** gzip | 329 KB uncompressed (Divi inlines its critical CSS) |
| CSS | **5.1 KB** gzip | ~724 KB render-blocking across 15 stylesheets |
| JS | **177.6 KB** gzip | ~1.1 MB across 14 external scripts, incl. jQuery + jQuery Migrate |
| Requests (page shell) | 9 | ~45 |
| Our own client JS | **0 bytes** | — |

## The JS number, honestly

The plan set a budget of ≤110 KB First Load JS. **That budget was wrong**, and
this is the correction rather than a target we hit.

It assumed a Next 16 + React 19 App Router baseline of roughly 90 KB, leaving
~20 KB of headroom. The measured floor is **177.6 KB gzip with zero client
components in the entire codebase** — there is not a single `'use client'` in
`app/`, `components/`, `lib/` or `content/`, and the chunks were checked to
confirm no content data and no Zod validation leak into them. Every byte is
React DOM and the App Router runtime.

So the revised budget is:

| Metric | Budget |
|---|---|
| Framework floor (not ours to spend) | 178 KB |
| **Our own client JS, all routes** | **≤ 25 KB** on top of the floor |
| CSS, all routes | ≤ 12 KB |
| HTML per page | ≤ 20 KB (gallery is the outlier at 14 KB) |

What this does and does not cost:

- **It does not affect LCP.** The hero is a plain `next/image` with no client
  component anywhere in its subtree, so the largest paint never waits on
  JavaScript. If the bundle failed to load entirely, every page would still
  render complete and readable.
- **It does not affect CLS.** Every image carries intrinsic dimensions.
- **It is a bandwidth and INP-adjacent cost**, paid once and then cached.

If that floor ever becomes unacceptable, the lever is architectural — dropping
hydration for the purely static routes — not trimming our own code, because
there is no client code to trim. That trade is worth revisiting only once the
interactive surfaces (quote form, gallery lightbox, scroll choreography) are
built and their real cost is known.
