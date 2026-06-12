# Aspect 4 — Architecture (Deepening Candidates)

**Phases: 0–6.** Turns shallow modules into deep ones (small interface, much behavior → testable, AI-navigable). Vocabulary: **deep / shallow / seam / deletion-test**. Full visual report was generated at review time; this is the actionable spec.

Sequencing principle for a **zero-test production app**: front-load the *pure* extractions (parse, classify, transform). They become the first unit suite — and that suite makes the riskier map/fetch refactors (C03/C06) safe to attempt.

---

## C08 — Re-enable revalidate secret check  ·  Phase 0  ·  SECURITY

**File:** `app/api/revalidate/investment-tracker/route.ts:9`
**Problem:** secret gate hardcoded `if (false)` → check never runs. Anyone with the path can trigger cache revalidation (cache-bust / mild DoS on webhook origin).
**Fix:** compare a header/query secret against an env var with a constant-time compare; return 401 on mismatch. Verify the legit caller sends the header. Smallest diff, ship immediately, independent of the rest.

---

## C01 — One forest-data schema  ·  Phase 1  ·  Strong

**Files:** `components/maps/shared/types.ts:16` · `utils/types.ts:66` · `utils/country-helper.ts:8`
**Problem:** `TFFFData` ≡ `ForestCoverChange` (same shape, two declarations, used interchangeably). `CountryData` (slug) vs `CountryDetails` (flagImgUrl) overlap. ISO2/slug/year travel as bare strings (`query["country-iso2"]`).
**Solution:** `domain/` seam — one `CountryForestRecord`, one `Country`, branded `Iso2`/`CountrySlug`/`Year`/`Dataset`. One `parseCountryForestRecord(raw)` validates webhook JSON at the fetch seam.
**Tests:** the parser is pure → first unit test. Branded keys make `query["country-iso2"] = name` a compile error.
**Unblocks:** C04 (transforms type against it), C05, C06 (parser lives in content layer).

```ts
// domain/forest-record.types.ts
export type Iso2 = string & { readonly __brand: "Iso2" }
export type CountrySlug = string & { readonly __brand: "CountrySlug" }
export type Dataset = "JRC" | "GFW"
export interface CountryForestRecord { iso2: Iso2; slug: CountrySlug; year: Year; dataset: Dataset; /* metrics… */ }
export function parseCountryForestRecord(raw: unknown): CountryForestRecord { /* validate + normalize field typos */ }
```

---

## C05 — Eligibility module  ·  Phase 1  ·  Worth exploring

**Files:** `utils/country-helper.ts:80-87` · `utils/map-colors.ts` · `maps/MapLegends.tsx`
**Problem:** core rule scattered — 3 raw booleans, inline classify, never-defined string enum, duplicate identical `getJRCColorKey`/`getGFWColorKey`, legends hardcode same hexes and **aren't rendered**. Dead: `getColorKeyForDataset`, `updateFeaturesWithColorKeys`.
**Solution:** `domain/eligibility.ts` — `Eligibility` enum + `classify(record)` + `colorFor(eligibility)` + `legend()`. Maps/charts/legends read it. Delete dead color fns + unrendered legends.
**Tests:** `classify` truth table — pure, this is where policy bugs hide.

---

## C02 — Collapse three stores  ·  Phase 2  ·  Strong

**Files:** `stores/mapStore.ts` · `utils/store.ts` · `utils/forestChange.store.ts` · `WorldMap.tsx:43-53`
**Problem:** `useWorldMapStore` (new) + `useWorldMap` (legacy) both track country/year/dataset; `WorldMap` writes **both** every click (drift risk). `useCountryMapStore` = **dead** (no readers). `forestChange.store` is a fetcher mislabeled as store, ships v1 + near-dup v2.
**Solution:** one `stores/map-selection.store.ts` (country, year, dataset, click position). Delete dead store. Move fetch into `content/` (→ C06). Charts read the single store. Retire `useWorldMap` after migrating readers.
**Deletion test:** `useCountryMapStore` deletes cleanly today — pure waste.

---

## C06 — Server-first content layer  ·  Phase 3  ·  Worth exploring

**Files:** `utils/axios-helper.ts` · `EndorsementMap.tsx:79` · `InvestmentTracker.tsx:14-30` · `TFFFMapView.tsx:132-146`
**Problem:** `api()` wrapper is deep (good). Around it: `EndorsementMap` hardcodes a webhook URL bypassing the `urls` registry; `InvestmentTracker`/`TFFFMapView` fetch in `useEffect` client-side; `[country]/[year]` resolves country server-side then the client child **re-fetches** (waterfall); no `loading.tsx` anywhere; revalidate on only 2 of ~12 endpoints.
**Solution:** typed `content/` layer — one fn per resource wrapping `api()` (consistent `revalidate`, all via `urls`, parse with C01). Fetch in Server Components, pass data down. Add `loading.tsx` per segment.
**Pairs with C07.** Behavior-touching → per-route rollout, verify each page in prod preview.

---

## C07 — One error contract  ·  Phase 3  ·  Worth exploring

**Files:** `utils/errors.ts` · `axios-helper.ts:122-139` · `app/error.tsx`
**Problem:** three styles — `APIError` (wrapper), `PageError` (JSON-in-`Error.message`, used once), ad-hoc `console.log` + silent empty arrays. Client maps vary (Endorsement shows overlay, others swallow).
**Solution:** one error type at the fetch seam (extend `APIError`), small `<DataError>` fallback, rule: server components throw → segment `error.tsx`; content lists degrade visibly. Retire `PageError` hack. Stop masking webhook outages.

---

## C03 — Deep `<BaseMap>`  ·  Phase 5  ·  Strong

**Files:** `world/WorldMap.tsx:31-291` · `world/EndorsementMap.tsx:63-318` · `country/CountryMap.tsx` · `shared/MapContainer.tsx`
**Problem:** WorldMap + EndorsementMap duplicate MapLibre boot near line-for-line: responsive zoom (`:63-72` both), GEOFENCE polygon + `onMove` `booleanPointInPolygon` clamp (`:149-160`/`:135-146`), `attributionControl={false}` then re-add in `onLoad`, click→`queryRenderedFeatures`→extract iso/slug. Only shared module `MapContainer` is a CSS wrapper (abstracts nothing).
**Solution:** deep `<BaseMap>` (or `useMapEngine`) owns viewport + responsive zoom, geofence clamp, attribution, typed `onFeatureClick(f) → {iso2, slug, name}`. Each map supplies only layers + color expression.
**Real seam:** two adapters already exist (World + Endorsement share the boot). Geofence clamp + feature-extraction become pure, browser-free tested fns.
**Do after** types (C01) + stores (C02) settle.

---

## C04 — Pure chart transformers + primitives  ·  Phase 6  ·  Strong

**Files:** `CurrentRewardsChart.tsx` · `MaximumRewardsChart.tsx` · `InvestmentGaugeChart.tsx` (470L) · +5
**Problem:** Current/Max Rewards are near-twins (identical `CustomTooltip` 11-34, Pie config `60%/90%`, center text `(sum/1e9).toFixed(1)+"bn"`), differ by one reward field. Each hand-rolls `ResponsiveContainer`+tooltip. **Real bugs hide in 100-line inline `useMemo` data shaping** — untestable except through render. Gauge = 470L, 6 Pie layers for 1 visual.
**Solution:** two seams — (1) `charts/transforms/*.ts` pure `(records, dataset) → ChartData`, no React; (2) thin `<DonutChart>` / `<ChartTooltip>` over recharts defaults. Charts = call transform → render primitive. Route inline `.toFixed()` through `lib/format`.
**The interface is the test surface:** reward math (eligible/almost split, top-20, sums) becomes pure tested functions — depends on C01 types.

---

## Strength + phase summary

| ID | Strength | Phase | Depends on |
|---|---|---|---|
| C08 | Strong (sec) | 0 | — |
| C01 | Strong | 1 | — |
| C05 | Worth exploring | 1 | C01 |
| C02 | Strong | 2 | C01 |
| C06 | Worth exploring | 3 | C01, C02 |
| C07 | Worth exploring | 3 | C06 |
| C03 | Strong | 5 | C01, C02 |
| C04 | Strong | 6 | C01 |

## Sync notes
- `domain/`, `content/`, `stores/` folders defined in [02-directory-structure.md](02-directory-structure.md).
- Type/term names = `CONTEXT.md` contract in [01-ai-documentation.md](01-ai-documentation.md); each Strong candidate gets an ADR (0003/0004/0006/0007).
- C04 chart primitives coordinate with [03-ui-improvements.md](03-ui-improvements.md) component discipline (separate from shadcn).
