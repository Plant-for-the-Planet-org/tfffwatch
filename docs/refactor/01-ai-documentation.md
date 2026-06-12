# Aspect 1 — AI / Agent Documentation

**Phase: 0 (foundations).** Docs lead, code follows. These files teach any agent (and human) the domain language *before* the code is renamed to match it (C01/C05). Without them, every future review re-derives the same map.

## Why first

- The architecture review found **no `CONTEXT.md`, no ADRs**. The domain model lives in three type files and nobody's head.
- The `improve-codebase-architecture` skill is *informed by* `CONTEXT.md` + `docs/adr/`. Writing them now makes every later phase sharper and stops re-litigating settled decisions.
- Naming in C01 (`CountryForestRecord`, `Eligibility`, `Dataset`) should be agreed in `CONTEXT.md` first, then code follows the doc.

## Files to create

| File | Purpose | Audience |
|---|---|---|
| `CLAUDE.md` | Claude Code project instructions (commands, conventions, guardrails) | Claude Code |
| `AGENTS.md` | Vendor-neutral agent instructions (symlink or mirror of CLAUDE.md core) | any agent |
| `CONTEXT.md` | Domain glossary — the ubiquitous language | humans + agents |
| `docs/adr/0001-*.md …` | Architecture Decision Records | humans + agents |

> Keep `CLAUDE.md` and `AGENTS.md` in sync. Simplest: `AGENTS.md` holds the canonical content, `CLAUDE.md` includes a pointer + Claude-specific extras. Or symlink. Decide in ADR-0002.

## `CONTEXT.md` — domain glossary (skeleton to fill)

Define each term once; code must use these exact names. Drawn from the review findings.

```markdown
# TFFF Watch — Domain Context

## Domain
TFFF = Tropical Forest Forever Facility. This app ("TFFF Watch") tracks forest cover,
eligibility, potential rewards, and investment pledges per country.

## Ubiquitous language
- **CountryForestRecord** — one country's forest metrics for one Year under one Dataset.
  The single shape replacing today's duplicated `TFFFData` (maps/shared/types.ts:16) and
  `ForestCoverChange` (utils/types.ts:66).
- **Country** — { iso2: Iso2, iso3, name, slug: CountrySlug, flagImgUrl }. Replaces the
  overlapping `CountryData` and `CountryDetails`.
- **Dataset** — "JRC" | "GFW". The two forest-data sources.
- **Eligibility** — ELIGIBLE | ALMOST_ELIGIBLE | INELIGIBLE. Derived from 3 booleans
  (deforestation rate, decreasing trend, combined). Owns its color + legend.
- **Iso2 / CountrySlug / Year** — branded primitives, not bare strings.
- **Reward** — base_reward_usd, reward_after_deductions_usd, IPLC split.
- **InvestmentPledge** — pledged vs invested capital per country (investment tracker).
- **Endorsement** — country has endorsed / invested (EndorsementMap).

## External data
n8n webhooks at automate.plant-for-the-planet.org (see content/ layer, C06).
Cached vs uncached endpoints; revalidation policy lives in content/.

## Out of scope / gotchas
- Some API field names carry typos (e.g. `responsibile_government_office`) — preserved at the
  edge, normalized in the parser (C01).
```

## `CLAUDE.md` — project instructions (skeleton)

```markdown
# CLAUDE.md

## Project
TFFF Watch. Next.js 15 (App Router), React 19, TypeScript, Tailwind v4, Zustand,
MapLibre, Recharts, shadcn/ui. See CONTEXT.md for domain language — use those terms exactly.

## Commands
- dev: `npm run dev`
- build: `npm run build`
- lint: `npm run lint`
- test: `npm run test`   # added in Phase 1

## Conventions
- Components PascalCase.tsx; domain/lib kebab-case.ts; stores *.store.ts; types *.types.ts.
- Pure logic (parse/classify/transform) lives outside React (domain/, charts/transforms/).
- Data fetching in Server Components via content/; client components render, not fetch.
- Use `className` prop (not `cn`). UI primitives = shadcn/ui in components/ui.
- One Zustand store: useMapSelection.

## Guardrails
- Never commit/push/PR unless explicitly asked.
- Production app: one concern per PR, verify build + visual parity.
- Don't reintroduce: 3 stores, duplicate forest types, hand-rolled Dialog/Tooltip.

## Architecture
See docs/refactor/ for the active refactor plan and docs/adr/ for decisions.
```

## ADRs to seed (`docs/adr/`)

Use a short MADR-style template. Seed these from decisions already made in this conversation:

| ADR | Decision | Source |
|---|---|---|
| 0001 | Adopt ADRs + CONTEXT.md | this phase |
| 0002 | CLAUDE.md ↔ AGENTS.md sync strategy | this phase |
| 0003 | One unified `CountryForestRecord`; branded domain primitives | C01 |
| 0004 | Single `useMapSelection` store; delete legacy + dead stores | C02 |
| 0005 | shadcn/ui (Radix) as the one UI primitive engine; remove Headless UI | UI decision (confirmed) |
| 0006 | Server-first data fetching via `content/` layer | C06 |
| 0007 | `<BaseMap>` owns MapLibre boot/geofence/click | C03 |

ADR template:
```markdown
# ADR-000X: <title>
## Status
Accepted
## Context
<why — the friction from the review>
## Decision
<what we will do>
## Consequences
<trade-offs, what becomes easier/harder, what we must not undo>
```

## Deliverables checklist (Phase 0)
- [ ] `CONTEXT.md` with the glossary above, terms agreed with team
- [ ] `CLAUDE.md` + `AGENTS.md` (synced)
- [ ] `docs/adr/0001`–`0007` seeded
- [ ] README.md links to `docs/refactor/`

## Sync notes
- Terms here are the **contract** for [04-architecture.md](04-architecture.md) C01/C05 naming.
- Folder names here match [02-directory-structure.md](02-directory-structure.md) target tree.
- ADR-0005 is the UI decision recorded in [03-ui-improvements.md](03-ui-improvements.md).
