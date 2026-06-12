# features/tfff/

**Purpose:** Page-section components explaining the TFFF and its mechanism.

**Here now:** `TFFFHero`, `HowTFFFWorks`, `HowTFFFWorksContent`, `HowTFFFWorksFlowChart`, `FlowChartArrow`, `InterestedInDivingDeeper`, `WhatsTheTFFF`.

**Note:** `WhatsTheTFFF` has no live importer (commented out in `InfoGrid`). `FlowChartArrow` (renamed from the `FlowChartArrorw` typo) is only referenced by a commented line in `HowTFFFWorksFlowChart`. Both are deletion candidates — do not delete in the directory phase.

**Later (architecture phase):** extract any inline content/transform logic; pure helpers → `src/lib`. See `docs/refactor/04-architecture.md`.
