# features/shared/

**Purpose:** Cross-cutting page-section components used by the home page and across domains.

**Here now:** `InfoGrid`, `WhatsAppInvite`.

**Note:** `RichToHTML` (rich-text renderer) was considered for this folder but is co-located in `features/investment/` for now (its only live importer is `InvestmentTrackerContent`). In the architecture phase, reconsider moving it to `src/components/ui` or `src/lib/ui` as a true shared primitive.

**Later (architecture phase):** see `docs/refactor/04-architecture.md`.
