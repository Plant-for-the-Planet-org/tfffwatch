# Phase 3 Audit — Site-Identity Structured Data

**Date:** 23 Jul 2026
**Branch:** `features/SEO_GEO_AEO__Improvements`
**Scope:** Server-rendered JSON-LD from existing facts only. No invented data.
**Verification:** `npx tsc --noEmit` → exit 0.

---

## Artifact findings addressed

| Artifact finding | Severity | Status |
|---|---|---|
| §04 GEO · No JSON-LD structured data on any page | **High** | ✅ First JSON-LD shipped (`Organization` + `WebSite`); `Dataset`/`NewsArticle`/`Breadcrumb` follow in Phase 4 |
| §04 GEO · Publisher identity & authorship under-declared | Medium | ✅ Publisher now machine-declared (footer already linked Plant-for-the-Planet; now reflected in schema) |

---

## Changes made

### 1. Reusable JSON-LD injector
- **New** `src/lib/json-ld.tsx` — a server component that renders one `<script type="application/ld+json">` per object (accepts a single object or an array). No client JS, no hydration. Matches the existing `<script>` usage already in `layout.tsx`. This is the shared mechanism Phase 4 will reuse.

### 2. `Organization` + `WebSite` schema
- **New** `src/lib/structured-data.ts` — a `@graph` with two linked nodes:
  - **Organization** (`#organization`): `name` "TFFF Watch", `url`, `logo` (existing header SVG, absolute), `description` (verbatim from root metadata), `parentOrganization` → Plant-for-the-Planet (`https://www.plant-for-the-planet.org`).
  - **WebSite** (`#website`): `name`, `url`, `inLanguage: "en"`, `publisher` → `@id` ref to the Organization.
- **Edited** `src/app/layout.tsx` — imports and renders `<JsonLd data={siteStructuredData} />` in the body.

### Deliberate omissions (no facts to support them)
- **No `sameAs`** — TFFF Watch has no social profiles in the codebase.
- **No `SearchAction`** — there is no site-search endpoint, so a `SearchAction` would advertise a feature that doesn't exist.
- **No named authors** — analyses aren't attributed to individuals in the code; only the organization is declared.

---

## Files touched
```
NEW  src/lib/json-ld.tsx
NEW  src/lib/structured-data.ts
     src/app/layout.tsx
```

## Drift check
Invisible, additive `<script>` — no visual or behavioral change. The publisher relationship it encodes already existed in the footer; this just makes it machine-readable.

## Verify at deploy
- View source / DOM → one `application/ld+json` block with the `@graph`.
- Google Rich Results Test / Schema Markup Validator → `Organization` + `WebSite` parse with no errors.
