# domain/

**Purpose:** Domain types + pure, framework-free rules (no React, no fetch). The single source of truth for the ubiquitous language (see `CONTEXT.md`).

**Here now (landed: C01 + C05):**
- `forest-record.types.ts` — `CountryForestRecord`, the single canonical forest shape (replaced the former duplicate `TFFFData` + `ForestCoverChange`).
- `country.types.ts` — `CountryDetails` (slug-less) and `Country extends CountryDetails` (with slug; replaced `CountryData`).
- `eligibility.ts` — `Eligibility` type + `classify()` + `eligibilityColor()` + `endorsementColor()` (absorbed the inline classify copies and the duplicate `map-colors.ts` color functions, now deleted).

**Later (deferred):**
- Branded `Iso2`/`CountrySlug`/`Year`/`Dataset` primitives.
- `parseCountryForestRecord()` runtime parser at the fetch seam (with `src/content/`, C06).
- Move `DatasetType` here from `maps/shared/types.ts`.
- Fold `slug-iso2.ts` + `country-mapping.json` lookups into a `country.ts` here.
