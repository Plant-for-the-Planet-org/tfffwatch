# data/

**Purpose:** Bundled static datasets imported at build time (geojson, country mappings).

**Here now:** nothing — scaffold only.

**Later (architecture phase — see `docs/refactor/02-directory-structure.md`):**
- `countries-optimized.geo.json` ← currently `src/components/maps/` (imported via relative `../countries-optimized.geo.json` by WorldMap, EndorsementMap, CountryMap).
- `country-mapping.json` ← currently `src/utils/` (imported by `country-helper.ts`).
- **Resolve the duplication trap:** the same geojson exists in BOTH `public/` and `src/components/maps/`. `scripts/optimize-geojson.js` writes only to `public/`, but the bundled copy is the `src/` one. Decide one source of truth here.
- `ne_50m_admin_0_countries.geo.json` in `src/components/maps/` has no importers → deletion candidate (do not delete in directory phase).

Until then this dir stays empty.
