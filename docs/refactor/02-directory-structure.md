# Aspect 2 — Directory Structure & Naming

**Phases: spread across 1–7** (each move rides the phase that gives it meaning). Pure mechanical moves (typos, fixtures) ride Phase 0. The big rename sweep (`utils/`→`lib/`, section folders) is **Phase 7, last** — it churns every import path.

## Problems (from review)

1. `utils/` is a junk drawer — types, formatters, stores, colors, JSON maps, env all mixed (16 files).
2. Stores in 3 places, 3 naming styles: `stores/mapStore.ts`, `utils/store.ts`, `utils/forestChange.store.ts`.
3. Types in 3 files with duplication: `utils/types.ts`, `utils/prop-types.ts`, `maps/shared/types.ts`.
4. Country domain split: `country-helper.ts` + `slug-iso2.ts` + `country-mapping.json`.
5. `sections/features/` = 34 flat files; only some domains foldered.
6. Fixture shipped inside a route: `app/(group-ContainerWidth)/investment-tracker/[country]/richDataExample.json`.
7. Large geo JSON colocated with components.

## Naming fixes

| Item | Now | Target |
|---|---|---|
| typo file | `FlowChartArrorw.tsx` | `FlowChartArrow.tsx` |
| typo type | `InvesmentTrackerParams` (prop-types.ts) | `InvestmentTrackerParams` |
| route group | `(group-ContainerWidth)` | `(content)` |
| store files | `mapStore.ts` / `store.ts` / `forestChange.store.ts` | unify `*.store.ts` under `stores/` |
| helper suffix | `*-helper.ts` ×5 | `format.ts` `date.ts` `http.ts` `country.ts` (by role) |
| type files | `types.ts` / `prop-types.ts` | `*.types.ts` per domain in `domain/` |

Casing rule (repo-wide): components `PascalCase.tsx`; everything else `kebab-case.ts`; stores `*.store.ts`; types `*.types.ts`.

## Target tree

(Canonical copy in [README.md](README.md#target-directory-tree-shared-by-all-docs). Repeated here for convenience.)

```
src/
  app/                      (group-ContainerWidth) → (content)
  domain/        forest-record.types.ts · country.ts · eligibility.ts   [C01,C05]
  content/       news.ts · investment.ts · endorsements.ts · forest.ts  [C06]
  stores/        map-selection.store.ts                                 [C02]
  lib/           http.ts · format.ts · date.ts · env.ts        (was utils/)
  components/
    ui/  layout/
    maps/   base/ world/ country/                                       [C03]
    charts/ primitives/ transforms/                                     [C04]
    sections/ investment/ endorsement/ tfff/ news/ press/ policies/
  data/          *.geo.json · country-mapping.json
public/fixtures/ richDataExample.json
```

## Move map (source → dest, tied to phase)

| Phase | From | To | Notes |
|---|---|---|---|
| 0 | `components/sections/features/FlowChartArrorw.tsx` | `…/FlowChartArrow.tsx` | typo |
| 0 | `app/…/[country]/richDataExample.json` | `public/fixtures/richDataExample.json` | out of route tree |
| 0 | `components/maps/*.geo.json`, `utils/country-mapping.json` | `src/data/` | static data home |
| 1 | `utils/types.ts` + `maps/shared/types.ts` (forest) + `prop-types.ts` | `domain/*.types.ts` | C01 unify |
| 1 | `utils/country-helper.ts` + `slug-iso2.ts` | `domain/country.ts` | merge |
| 1 | eligibility logic in `country-helper.ts` + `map-colors.ts` | `domain/eligibility.ts` | C05 |
| 2 | `stores/mapStore.ts` + `utils/store.ts` | `stores/map-selection.store.ts` | C02; delete dead `useCountryMapStore` |
| 3 | `utils/forestChange.store.ts` (fetch part) | `content/forest.ts` | C06; it's a fetcher not a store |
| 7 | `utils/{number,datetime,axios,content}-helper.ts` | `lib/{format,date,http}.ts` | rename sweep |
| 7 | `sections/features/*` flat files | `sections/<domain>/` | folder by domain |

## Rollout rules (production)

- One move per PR. Use `git mv` to preserve history.
- Lean on the TS compiler + path alias (`@/`) to catch broken imports; fix until typecheck clean.
- Keep a thin re-export shim at the old path for one release if a move is wide, then delete (avoids a 200-file PR).
- Phase 7 is intentionally last: renaming `utils/`→`lib/` touches ~every file's imports. Do it once, after logic has settled.

## Sync notes
- `domain/`, `content/`, `stores/` are *created by* architecture C01/C06/C02 — see [04-architecture.md](04-architecture.md). This doc only tracks *where files land*.
- Folder names match [01-ai-documentation.md](01-ai-documentation.md) `CONTEXT.md` and `CLAUDE.md` conventions.
- `components/ui/` reorg coordinates with [03-ui-improvements.md](03-ui-improvements.md) (shadcn lands components there).
