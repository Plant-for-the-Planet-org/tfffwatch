# Phase 2 Audit — Heading Structure & Page Metadata

**Date:** 23 Jul 2026
**Branch:** `features/SEO_GEO_AEO__Improvements`
**Scope:** Technical/structural only. New copy (H1 wording, descriptions, meaningful-alt wording) stays with the content team.
**Verification:** `npx tsc --noEmit` → exit 0. CSS grep confirmed no `h1`/`h2` *tag* selectors (only `.typo-*` classes), and Tailwind v4 preflight zeroes default heading styles → **tag swaps are pixel-identical**.

---

## Artifact findings addressed

| Artifact finding | Severity | Status |
|---|---|---|
| §03 On-page · The only H1 on every page is the logo image | **High** | ✅ Fixed |
| §03 On-page · `/friends-of-the-tfff` has no title/description | Medium | ✅ Fixed (title + canonical; description deferred to content) |
| §03 On-page · 6 of 46 images lack alt text | Medium | ✅ Fixed (factual/decorative split) |
| §03 On-page · Heading levels used for styling, not hierarchy | Low | ✅ Fixed |
| *(bonus)* latent double-`<h1>` on error / not-found pages | — | ✅ Resolved as a side effect |

---

## Changes made

### 1. One descriptive `<h1>` per route (was: logo image on every page)
- **`Header.tsx`** — the logo is no longer wrapped in `<h1>` (now the plain image inside its link). Removes the duplicate site-wide H1. Visually unchanged.
- **`SecondaryHero.tsx`** — all 6 hero overlay titles `<h2 className="…typo-h1">` → `<h1>` (class kept → identical size). Covers `the-tfff-explained`, `news`, `press`, `about-tfff-watch`, `policy-papers-commentary`, `friends-of-the-tfff`.
- **`TFFFHero.tsx`** — homepage: first hero heading "The TFFF" `<h2 typo-h2>` → `<h1>` (class kept). Now the homepage's single H1; the parallel "TFFF Watch" card stays `<h2>` so the outline reads H1 → H2.
- **Data routes with no hero** — added a **visually-hidden** (`sr-only`) `<h1>`, derived from each route's existing metadata title (no invented copy, no layout change):
  - `investment-tracker/[country]` → `{Country} Investment Tracker`
  - `[country]/[year]` → `{Country} · TFFF Payout Estimate`

**Result:** every route now renders exactly one descriptive `<h1>`. The logo demotion also removed a second `<h1>` that had been stacking with the real `<h1>` on `error.tsx` / `not-found.tsx`.

### 2. Heading hierarchy tidy (§03 Low)
- **`AboutTFFFWatch.tsx`** — the two methodology sub-headings "Tree cover loss estimate (GFW-based)" and "Standard estimate (JRC + GFW-based)" were `<h2 className="typo-h3">` (an H2 sized like an H3, sitting inside the "Analysis Methodology" H2). Changed to `<h3>` (visual size unchanged). Outline now descends H1 → H2 → H3 logically.

### 3. `friends-of-the-tfff` metadata (§03 Medium)
- Added a `metadata` export: `title: "Friends of the TFFF · TFFF Watch"` + self-referencing `alternates.canonical`. **Description omitted** (naming the featured NGOs/supporters is content-team copy). It no longer inherits the homepage title.

### 4. Alt text on 6 images (§03 Medium)
- **Decorative/functional icons kept `alt=""`** (intentionally skipped by AT): tooltip-info icons ×2 (`InvestmentGaugeChart`, `DatasetTabs`), `finger-tap.gif` (`ClickTooltip`).
- **`WorldMap.tsx`** download button icon → `alt="Download map"` (functional control, previously unlabeled).
- **`Top10BarChart.tsx`** data-chart images → factual alt: "Top 10 countries by tree cover loss (Global Forest Watch)" / "…forest cover loss (JRC)". Content team may refine wording; not blocking.

---

## Files touched
```
src/components/Header.tsx
src/components/sections/hero/SecondaryHero.tsx
src/components/sections/features/tfff/TFFFHero.tsx
src/components/sections/features/about/AboutTFFFWatch.tsx
src/components/maps/world/WorldMap.tsx
src/components/sections/charts/Top10BarChart.tsx
src/app/(content)/friends-of-the-tfff/page.tsx
src/app/(content)/investment-tracker/[country]/page.tsx
src/app/(content)/[country]/[year]/page.tsx
```

## Drift check
No visual change: every promoted/demoted heading keeps its original `typo-*` class, Tailwind preflight already neutralizes default heading styling, and the two data-route H1s are `sr-only` (invisible). No behavior change.

## Deferred to content team (unchanged)
- A keyword-rich homepage H1 (currently reusing "The TFFF").
- `friends-of-the-tfff` meta description.
- Refined descriptive wording for the two Top-10 chart images.
