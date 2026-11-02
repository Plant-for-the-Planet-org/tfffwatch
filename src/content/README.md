# content/

**Purpose:** Server-first data-fetch layer. One typed function per resource, wrapping `api()` with consistent `revalidate`, all going through the `urls` registry.

**Here now:** nothing — scaffold only.

**Later (architecture phase, candidates C06/C07 — see `docs/refactor/04-architecture.md`):**
- `forest.ts`, `investment.ts`, `endorsements.ts`, `news.ts` … — house the fetchers currently scattered as client `useEffect` calls and in `utils/forestChange.store.ts` (which is a fetcher mislabeled as a store).
- Move the hardcoded webhook URL in `EndorsementMap.tsx` into the `urls` registry here.
- One error contract at this seam (C07).

Until then this dir stays empty.
