# data/

**Purpose:** Bundled static datasets imported at build time (geojson, country mappings).

**Here now:** nothing — scaffold only.

**Later (architecture phase — see `docs/refactor/02-directory-structure.md`):**
- `countries-optimized.geo.json` ← currently `src/components/maps/` (imported via relative `../countries-optimized.geo.json` by WorldMap, EndorsementMap, CountryMap).
- `country-mapping.json` ← currently `src/utils/` (imported by `country-helper.ts`).
- The `src/components/maps/` copy is the only geojson. It has manual boundary edits (commit `762e0ab`), so do not regenerate it from Natural Earth.

Until then this dir stays empty.
