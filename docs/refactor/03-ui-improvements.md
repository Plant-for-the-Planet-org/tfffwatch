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
