# Cleanup + Naming Plan (PR9 → PR10)

## Context
After the C01–C07 architecture program, two low-risk hygiene passes remain: remove dead code / stale comments, and unify file/folder naming. Both are mechanical and `tsc`-verifiable (no behavior change). Sequenced **dead-code first** because several long-name targets are actually *dead* — deleting them removes any need to rename them.

Constraint: **no commits until asked.** Green gate each PR: `~/.vite-plus/bin/npx tsc --noEmit` (clear `.next` if stale route types) + `npm run build` (31/31) + `npm run lint` (only pre-existing `<img>` warnings). Findings below are all verified by importer-count greps.

---

## PR9 — Dead code, comments, unused imports

### 9a. Delete dead files (0 live importers — safe)
- `src/components/maps/TFFFEligibilityPopover.tsx` (empty, 0 bytes)
- `src/components/ui/Select.tsx` (dead stub `Select()` → `<></>`; real picker is `ui/YearSelect.tsx`)
- `src/components/maps/ne_50m_admin_0_countries.geo.json` (0 src refs; keep the `public/` copy — `scripts/optimize-geojson.js` reads it)

### 9b. Delete dead exports
- `components/maps/MapLegends.tsx` → remove `LegendForSponsorCapitalProviders` (0 refs)
- `components/sections/hero/TFFFMapView.tsx` → remove exported `VersionChip` (0 refs; `WorldMap` has its own local copy)
- `lib/text.ts` → remove `serializePersons`, `serializeEndorsements` (0 refs). Keep `extractLists`/`serialize` (used internally/externally), `hasContent`, `formatPublisherForCardBadge`.

### 9c. Remove commented-out imports (5)
`CountryListChips.tsx:7` · `HowTFFFWorksFlowChart.tsx:1,3` · `TFFFMapViewContent.tsx:3` · `PressReleaseCard.tsx:3`

### 9d. Remove commented-out JSX blocks (9)
`layout.tsx:53` · `[country]/[year]/page.tsx:54-55` · `WorldMap.tsx:208` · `CountryMap.tsx:132` · `CountrySignatories.tsx:69` · `PressReleases.tsx:54` · `PlansforthePlanetAnalysis.tsx:129` · `InfoGrid.tsx:27-28`

### 9e. GATED — parked features (delete only if abandoned, confirm with team)
Compile-dead now; referenced only in the commented JSX above:
- `features/tfff/WhatsTheTFFF.tsx`
- `features/about/WhatsTFFFWatch.tsx`
- `features/tfff/FlowChartArrow.tsx`
- `features/forest-cover/PotentialPayoutVsExistingConservationFunding.tsx` **+** `charts/PotentialPayoutVsExistingConservationFundingBarChart.tsx` (dead as a pair)

If abandoned → delete files + their commented refs together. If "coming soon" → keep files, still remove the commented JSX (re-add when shipping).

### 9f. OPTIONAL — `console.log`/`console.debug` (18 across src)
Debug noise (`forestChange.store` "API call with query", `CountryMap` "Layers Data", etc.). Not comments — separate decision. Remove or keep?

**PR9 order:** 9c+9d (comment strip) → 9b (dead exports) → 9a (dead files) → tsc/build. The FlowChartArrow / ui/Select commented imports (9c) are removed in the same pass that deletes those files (9a/9e), so no dangling refs.

---

## PR10 — Naming uniformity (after PR9, fewer files to touch)

Convention: components `PascalCase.tsx`; lib/domain/content `kebab-case.ts`; stores `*.store.ts` under `stores/`; types `*.types.ts`.

### 10a. Stores — one convention, one home
| Now | → |
|---|---|
| `stores/mapStore.ts` | `stores/map.store.ts` |
| `utils/store.ts` (holds `useForestCoverChangeData`) | `stores/forest-cover.store.ts` |
| `utils/forestChange.store.ts` | **fetcher, not a store** → `content/forest.ts` (fold into the deferred C06 server-fetch work, not here) |

### 10b. Casing fix
- `press/PlansforthePlanetAnalysis.tsx` → `PlansForThePlanetAnalysis.tsx`

### 10c. Drop redundant folder-implied context
- `policies/RecentPolicyPapersCommentary.tsx` → `RecentCommentary.tsx`
- `investment/InvestmentTrackerContent.tsx` → `TrackerContent.tsx` (optional)

### 10d. Misplaced file
- `components/cookieconsent-languages.ts` → colocate with `CookieConsentBanner.tsx` or move to `src/config/`

### 10e. SUPERSEDED by PR9
- The 56-char `PotentialPayoutVsExistingConservationFundingBarChart` + its feature wrapper: if deleted in 9e, no rename needed. If kept (parked), rename feature→`ConservationFunding.tsx`, chart→`ConservationFundingChart.tsx`.

### Leave alone
- **Public route `policy-papers-commentary/`** — changing the folder changes the URL (SEO/bookmarks). Keep unless adding a redirect.
- Chart `*AreaChart`/`*GaugeChart` suffixes, `TFFF*` prefixes, `*.types.ts` — already correct.

**PR10 mechanics:** `git mv` + rewrite importers (perl `while read` loop, single-quoted patterns — avoid the zsh `--include` glob + char-class pitfalls hit earlier) + tsc + build.

---

## Verification (both PRs)
`tsc --noEmit` → 0 · `next build` → 31/31 · `lint` clean · grep confirms zero stale refs to deleted/renamed symbols · `git status` shows only intended changes (renames as `R`). Run dev, smoke each route group. Nothing committed until asked.

## Open questions for you
1. **9e parked features** — abandoned (delete) or coming-soon (keep files, strip comments)?
2. **9f console.logs** — remove all 18, or keep?
3. **10c `InvestmentTrackerContent`→`TrackerContent`** — do it or leave?
