# Phase 1 Audit — Crawl & Indexation Infrastructure

**Date:** 23 Jul 2026
**Branch:** `features/SEO_GEO_AEO__Improvements`
**Scope:** Technical fixes only. Content-team copy (per `tfffwatch-seo-todos.xlsx`) excluded.
**Verification:** `npx tsc --noEmit` → exit 0 (no type errors).

---

## Artifact findings addressed

| Artifact finding | Severity | Status |
|---|---|---|
| §02 Technical · Referenced `sitemap.xml` returns 404 | **Critical** | ✅ Fixed |
| §02 Technical · No canonical tags, parameterized URLs in play | Medium | ✅ Fixed |
| §02 Technical · Investment-tracker redirect hardcoded & mislabelled | Low | ✅ Fixed (comment/constant path; overview-page option excluded per Sheet 2) |
| §03 On-page · Minor title & Open Graph polish | Low | ✅ Fixed (double-space + `og:type`/`og:site_name`; `og:url` on home) |
| Action plan #1 (sitemap), #4 (metadata + canonical) | — | ✅ / partial (friends-metadata + alt text land in Phase 2) |

---

## Changes made

### 1. XML sitemap (fixes the `robots.txt` → `/sitemap.xml` 404)
- **New** `src/app/sitemap.ts` — `MetadataRoute.Sitemap` covering 8 static routes + 17 `investment-tracker/[country]` routes.
- **New** `src/domain/investing-countries.ts` — hoisted the country list out of `investment-tracker/[country]/page.tsx` so the sitemap and the route share one source (no duplication).
- **Edited** `src/app/(content)/investment-tracker/[country]/page.tsx` — now imports `investingCountries` from the shared module (behavior identical).
- *Deliberately excluded:* `/[country]/[year]` payout URLs — their year values are not enumerable at build time. Noted as a follow-up; no years invented.

### 2. `metadataBase` + Open Graph + Twitter (root)
- **Edited** `src/app/layout.tsx` — added `metadataBase: new URL("https://tfffwatch.org")`, `openGraph: { type: "website", siteName: "TFFF Watch" }`, `twitter: { card: "summary_large_image" }`.
- **Why no `og:url` in the layout:** Next.js merges `openGraph` *shallowly*, so a cascading `url` would wrongly stamp every subpage's `og:url` as the homepage. `type` + `siteName` cascade correctly; `og:url` is set only on the homepage.

### 3. Self-referencing canonicals (collapses `?dataset=` / `?year` duplicates)
- **Edited** (added `alternates.canonical`): `src/app/page.tsx` (+ full `openGraph` incl. `url: "/"`), `the-tfff-explained`, `news`, `press`, `about-tfff-watch`, `policy-papers-commentary`, `investment-tracker/[country]` (built from `country`), `[country]/[year]` (built from `country`/`year`, stripping `?dataset=`).
- *Not done here:* `friends-of-the-tfff` has no metadata export yet → added in Phase 2 with its canonical.

### 4. Policy title double-space
- **Edited** `src/app/(content)/policy-papers-commentary/page.tsx` — `"Policy Papers & Commentary  · TFFF Watch"` → single space.

### 5. Investment-tracker redirect
- **Edited** `src/app/(content)/investment-tracker/page.tsx` — introduced `DEFAULT_TRACKER_COUNTRY = "Norway"`, corrected the stale "Germany" comment. **Behavior unchanged** (still redirects to Norway, a confirmed TFFF contributor).

---

## Files touched
```
NEW  src/app/sitemap.ts
NEW  src/domain/investing-countries.ts
     src/app/layout.tsx
     src/app/page.tsx
     src/app/(content)/investment-tracker/page.tsx
     src/app/(content)/investment-tracker/[country]/page.tsx
     src/app/(content)/[country]/[year]/page.tsx
     src/app/(content)/the-tfff-explained/page.tsx
     src/app/(content)/news/page.tsx
     src/app/(content)/press/page.tsx
     src/app/(content)/about-tfff-watch/page.tsx
     src/app/(content)/policy-papers-commentary/page.tsx
```

## Drift check
No visual or behavioral change. All edits are additive metadata, one new file, a comment/constant rename, and a whitespace fix. Redirect target unchanged.

## Follow-ups noted (not in this phase)
- `/[country]/[year]` sitemap entries once a year source is available.
- `friends-of-the-tfff` metadata + canonical → **Phase 2**.
- Recommend submitting the sitemap in Google Search Console after deploy (external, user action).
