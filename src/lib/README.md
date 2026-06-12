# lib/

**Purpose:** Framework-agnostic utilities — the intended new home of `src/utils/`. Generic, domain-free helpers (formatting, http, date).

**Here now:** nothing — scaffold only. `src/utils/` stays put this phase.

**Later (architecture phase — see `docs/refactor/02-directory-structure.md`):**
- `format.ts` ← `utils/number-helper.ts`
- `date.ts` ← `utils/datetime-helper.ts`
- `http.ts` ← `utils/axios-helper.ts`
- `utils.ts` ← `cn()` helper added with the shadcn/ui migration (UI phase)
- Domain-specific helpers go to `src/domain/`, not here. (`map-colors.ts` already removed — its logic now lives in `domain/eligibility.ts`.)

The `utils/`→`lib/` rename is deferred to the cleanup phase because it churns nearly every import path. Until then this dir stays empty.
