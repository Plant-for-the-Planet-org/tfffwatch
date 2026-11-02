# Aspect 3 — UI Improvements (shadcn/ui)

**Phase: 4** (needs only Phase 0). **Decision recorded: ADR-0005 — standardize on shadcn/ui (Radix), one primitive engine. Migrate the 3 existing Headless UI usages too, then remove `@headlessui/react`.**

## Rationale
- Org standard = shadcn/ui clean design.
- Today: `@headlessui/react` (3 usages) + Tailwind v4 + `tailwind-merge` already present.
- Shipping both Radix *and* Headless UI = two headless engines. Pick one → shadcn.
- Biggest wins are real a11y bugs in hand-rolled primitives (Dialog focus trap, Tooltip keyboard).

## Setup (Phase 4, step 0)
- `npx shadcn@latest init` → `components.json`, `lib/utils.ts` (`cn()`), CSS vars.
- Deps added: `class-variance-authority`, `clsx`, per-component `@radix-ui/*`. Keep `tailwind-merge`.
- Tailwind v4 + React 19 → use latest/canary shadcn CLI (CSS-first config, React 19 peers).
- Map shadcn CSS vars → existing tokens (`bg-primary`, `primary-dark`, `base-gray`) so visuals are unchanged.

## Component migration list

| Step | Add (shadcn) | Replaces | Call sites | Why / a11y gain | Risk |
|---|---|---|---|---|---|
| 0 | `cn()` util + init | — | — | foundation | none |
| 1 | `Dialog` | `ui/Dialog.tsx` (hand-rolled) | `CountrySignatories` + consumers | adds **focus trap, focus restore, `aria-labelledby`**; today only manual click-outside+Esc | low |
| 2 | `Select` | `ui/Select.tsx` (**dead stub** returns `<></>`) + native YearSelect | YearSelect consumers | one accessible select; **deletes dead code + dual YearSelect** | low |
| 3 | `HoverCard` / `Tooltip` | `ui/PersistentTooltip.tsx` | tooltip consumers | adds keyboard/focus trigger + ARIA + positioning; today hover-only manual timers | low |
| 4 | `Tabs` (controlled) | `maps/shared/DatasetTabs.tsx` | WorldMap | `role=tablist` + roving focus; **keep dataset↔URL-param sync** | med |
| 5a | `DropdownMenu` | `HeaderMenu.tsx` (Headless `Menu`) | Header | removes Headless dep #1 | low |
| 5b | `Popover` | chart `Popover` (Headless) | `PotentialPayout…BarChart` | removes Headless dep #2 | low |
| 5c | (covered by step 2) | `ui/YearSelect.tsx` (Headless `Menu`, 155L) | — | removes Headless dep #3 | low |
| 6 | `Button` (cva variants + `asChild`) | `ui/Button.tsx` + `IconButton` | **many** | variants, `className` not `cn`, `asChild`+`<Link>` instead of `type:"button"\|"link"` | **high** churn |

After step 5: `npm rm @headlessui/react`.

## Keep as-is (not shadcn targets)
- `Br.tsx`, `Hr.tsx`, `SectionHeader.tsx`, `ContentSection.tsx` — layout primitives.
- `LinkWithParams.tsx` — app-specific param-preserving Link, no equivalent.

## Delete (pass-through, deletion-test fail)
- `ui/Container.tsx` → `ResponsiveContainer` is `twMerge("", cn)` around a `<div>`. Inline + delete.

## Button redesign (step 6, the careful one)

Current `Button` smells: overloaded `type:"button"|"link"`, `cn` prop, empty-span layout hack, separate `IconButton`, `"External Arror"` typo in alt text.

Target interface (cva + Slot):
```tsx
// components/ui/button.tsx  (shadcn base) + project variants
const buttonVariants = cva("inline-flex items-center justify-center rounded-xl transition-colors", {
  variants: {
    variant: { primary: "bg-primary hover:bg-primary-dark text-white", icon: "rounded-full" },
    size: { default: "min-w-64 px-6 py-3", icon: "h-10 w-10", iconSm: "h-8 w-8" },
  },
  defaultVariants: { variant: "primary", size: "default" },
})
// Link usage: <Button asChild><Link href=…>…</Link></Button>
```
Migration: codemod `cn=` → `className=`, `type="link"` → `asChild` + `<Link>`, fold `IconButton` into `variant="icon"`. One PR, visual diff every button.

## Sync notes
- `cn()` lands in `lib/utils.ts` — consistent with [02-directory-structure.md](02-directory-structure.md) `lib/`.
- Chart primitives in [04-architecture.md](04-architecture.md) **C04** (`<DonutChart>`, `<ChartTooltip>`) are *project* components built on recharts — separate from shadcn, but live beside `components/ui` discipline.
- UI decision = ADR-0005 in [01-ai-documentation.md](01-ai-documentation.md).
- Independent of domain phases → can run in parallel with Phase 1–3 if a second contributor is free, but merge after Phase 0.

## Shared brand with CaliWatch

CaliWatch (`../caliwatch`) is a sibling Plant-for-the-Planet tracker. Both
sites must read as one brand. **TFFF Watch is the source of truth**; CaliWatch's
`DESIGN.md` copies the values below and records its own departures.

| Area | TFFF is canonical for | Where it lives here |
|---|---|---|
| Colour | `primary`, `primary-dark`, `primary-light`, `secondary-light`, `base-gray`, `base-text`, `danger`, `danger-light` (`#FFE6E6`) | `src/app/globals.css` |
| Rounding | `rounding-lg`, `rounding-xl`, `outer-rounding` (square below `xl`), `outer-padding-3` | `src/styles/dynamics.css` |
| Type scale | `typo-h1` · `typo-h2` · `typo-h3` · `typo-p`; headings Open Sans bold | `src/styles/dynamics.css` |
| Section bands | `outer-rounding outer-padding-3`, alternating `primary-light` / `secondary-light` | home sections |
| Cards | `bg-white border border-primary-medium-light rounding-xl padding-3` | `ui/card.tsx` |
| Chips | `rounded-full px-5 py-1.5`, 16px label, selected `bg-base-text text-white` | `CountryListChips` |
| Info tooltip | grey (i) icon, white `rounded-lg` bubble, `text-xs` | `PersistentTooltip` |
| Footer | `bg-base-gray/30 outer-rounding outer-padding-3`, Donate `min-w-40` | `Footer.tsx` |

Changing any value above is a cross-site change: update CaliWatch's
`DESIGN.md` in the same piece of work.

**CaliWatch departs on purpose** (do not copy back into TFFF):
- CTA buttons are Planet green (`#007A49`), `rounded-full`, in two sizes
  (`md` for section actions, `sm` inside cards). The layout (centred
  semibold label, white up-right `Arrow.svg`) still matches TFFF's `Button`.
- Extra section tones: red (`danger-light`) for outstanding contributions,
  grey for legislation.
- Its type scale used to be larger; it now follows the TFFF scale above, so
  TFFF no longer needs to sync to CaliWatch's typography.

The Button redesign in step 6 should keep TFFF's colour and `rounded-xl`; only
the API changes.
