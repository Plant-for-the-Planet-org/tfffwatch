# features/forest-cover/

**Purpose:** Page-section components for forest-cover change and payout views (country/year pages).

**Here now:** `ForestCoverChange`, `AnnualPayout`, `PotentialPayoutVsExistingConservationFunding`.

**Note:** these import sibling charts via relative path — now `../../charts/...` (one level deeper than before the move). `PotentialPayoutVsExistingConservationFunding` is commented out in the country/year page (deletion candidate; do not delete in directory phase).

**Later (architecture phase — C04):** chart data-shaping logic moves to `charts/transforms/`; pure transforms become the test surface. See `docs/refactor/04-architecture.md`.
