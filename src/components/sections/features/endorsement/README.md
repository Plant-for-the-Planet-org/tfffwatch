# features/endorsement/

**Purpose:** Page-section components for country endorsements / signatories.

**Here now:** `CountrySignatories`.

**Known pre-existing issue (not fixed in directory phase):** `CountrySignatories` renders `<RichToHTML content="See all signatories" />` but has **no import** for `RichToHTML` and no local definition. Latent bug predating this refactor — flagged for a follow-up, intentionally left untouched here (this phase is path-only, behavior byte-identical).

**Later (architecture phase):** see `docs/refactor/04-architecture.md`.
