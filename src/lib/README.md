# lib/

**Purpose:** Framework-agnostic, domain-free utilities (formatting, http, date, text).

**Here now:**
- `http.ts` ← was `utils/axios-helper.ts` (the `api()` wrapper + `urls` registry).
- `format.ts` ← was `utils/number-helper.ts` (`toReadable`, `toReadableAmount`, …).
- `date.ts` ← was `utils/datetime-helper.ts`.
- `text.ts` ← was `utils/content-helper.ts`.

**Still in `src/utils/` (domain-flavored or pending):**
- `country-helper.ts`, `slug-iso2.ts`, `country-mapping.json` → move to `src/domain/` (PR6).
- `store.ts`, `forestChange.store.ts` → consolidate under `src/stores/` (PR3).
- `errors.ts`, `prop-types.ts`, `types.ts`, `env.ts`, `download-map.ts` → re-home later.

**Later:** `utils.ts` (`cn()`) lands with the shadcn/ui migration. Domain logic stays in `src/domain/`, not here.
