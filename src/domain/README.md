# domain/

**Purpose:** Domain types + pure, framework-free rules (no React, no fetch). The single source of truth for the ubiquitous language (see `CONTEXT.md`).

**Here now:** nothing — scaffold only.

**Later (architecture phase, candidates C01/C05 — see `docs/refactor/04-architecture.md`):**
- `forest-record.types.ts` — unify `TFFFData` (maps/shared/types.ts) and `ForestCoverChange` (utils/types.ts) into one `CountryForestRecord`; branded `Iso2`/`CountrySlug`/`Year`/`Dataset`.
- `country.ts` — merge `utils/country-helper.ts` + `utils/slug-iso2.ts`.
- `eligibility.ts` — `classify()` · `colorFor()` · `legend()`; absorbs the duplicate logic in `utils/map-colors.ts`.

Until then this dir stays empty. Do not move logic here during the directory phase.
