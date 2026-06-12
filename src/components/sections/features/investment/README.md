# features/investment/

**Purpose:** Page-section components for the investment-tracker domain.

**Here now:** `InvestmentTracker`, `InvestmentTrackerContent`, `InvestmentProgress`, `CountryListChips`, `RichToHTML`.

**Note:** `RichToHTML` is a cross-cutting rich-text renderer co-located here for now (its only live importer is `InvestmentTrackerContent`). Revisit in the architecture phase — it likely belongs in `src/lib/ui` or `src/components/ui`.

**Later (architecture phase — C01/C06):** lift data-fetching out of `InvestmentTracker` (currently a client `useEffect`) into `src/content/`; types → `src/domain/`. See `docs/refactor/04-architecture.md`.
