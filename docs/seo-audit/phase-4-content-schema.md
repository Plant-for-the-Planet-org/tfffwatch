# Phase 4 Audit — Content Structured Data

**Date:** 23 Jul 2026
**Branch:** `features/SEO_GEO_AEO__Improvements`
**Scope:** Server-rendered JSON-LD derived from existing data only. `FAQPage`/`HowTo` deferred.
**Verification:** `npx tsc --noEmit` → exit 0.

---

## Artifact findings addressed

| Artifact finding | Severity | Status |
|---|---|---|
| §04 GEO · A data platform with no `Dataset` schema | **High** | ✅ Fixed (payout + tracker pages) |
| Action plan #6 · `NewsArticle` on news items | Medium | ✅ Fixed (`ItemList` of `NewsArticle`) |
| Action plan #6 · `BreadcrumbList` on nested routes | Medium | ✅ Fixed |
| §05 AEO · `FAQPage` / `HowTo` schema | High/Med | ⏸ **Deferred** — no FAQ/HowTo content exists yet (content-team dependency) |

---

## Changes made

All builders live in `src/lib/structured-data.ts` and render through the Phase 3 `<JsonLd>` component.

### 1. `Dataset` schema — the distinctive GEO win
- **Payout pages `/[country]/[year]`** — `buildPayoutDatasetSchema(...)`: `name`/`description` from country + year + dataset label, `creator` → the Organization (`@id` ref), `temporalCoverage` (year), `spatialCoverage` (country), `variableMeasured` (the 10 `CountryForestRecord` measures, names only), `isBasedOn` (GFW-Hansen, Dinerstein, Tyukavina, JRC-Vancutsem — real citation URLs from the About page), and `distribution` → the public Google Sheet.
- **Tracker pages `/investment-tracker/[country]`** — `buildTrackerDatasetSchema(...)`: sponsor-capital pledges/investments dataset, same creator + distribution.
- **No `license`** on either — none is stated anywhere on the site, so none is asserted.
- Values that are fetched at request time (the actual numbers) are **not** hardcoded; the schema describes the dataset and its measured properties, which is valid and accurate.

### 2. `NewsArticle` on `/news`
- **`buildNewsListSchema(...)`** wraps the visible items in an **`ItemList`** whose elements are `NewsArticle` objects (`headline`, `url`, `datePublished`, `publisher`, `image`).
- **Why `ItemList`, not bare `NewsArticle`:** these are *curated links to external publishers*, not articles we authored. `ItemList` accurately represents a collection of external articles and avoids implying TFFF Watch is the publisher.
- **Date format resolved defensively:** the data uses `DD.MM.YYYY` (dots) but the render code parsed `dd/MM/yyyy`. `toIsoDate()` accepts `.`, `/`, or `-` separators and emits a date-only ISO string, or drops `datePublished` if it can't parse confidently. Items missing `title` or `url` are skipped; other fields are guarded as optional.
- Rendered in `AllNews.tsx` (already a server component with the data) over the same 12 items shown on the page.

### 3. `BreadcrumbList` on nested routes
- **`buildBreadcrumbSchema(crumbs)`** — generic builder.
- `investment-tracker/[country]` → Home ▸ Investment Tracker ▸ {Country}.
- `[country]/[year]` → Home ▸ {Country · TFFF Payout Estimate}. **The intermediate `/[country]` crumb is intentionally skipped** — no such route exists, so linking it would create a dead breadcrumb.

---

## Files touched
```
     src/lib/structured-data.ts   (added Dataset / NewsArticle / Breadcrumb builders + date helper)
     src/app/(content)/[country]/[year]/page.tsx
     src/app/(content)/investment-tracker/[country]/page.tsx
     src/components/sections/features/news/AllNews.tsx
```

## Drift check
Invisible, additive `<script>` blocks only. No visual or behavioral change. No numbers hardcoded — schema is derived from route params and the typed data shape.

## Deferred (revisit later)
- `FAQPage` + `HowTo` schema and question-phrased headings — blocked on FAQ/HowTo content the content team owns; escalated, not built.
