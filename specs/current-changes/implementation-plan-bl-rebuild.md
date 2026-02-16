# Ball Lightning Site Rebuild — Implementation Plan

**Date**: 2026-02-13  
**Ref**: specs/current-changes/hubert_build_brief_balllightning.yaml  
**PDD**: specs/balllightning-pdd.yaml  
**Shared docs**: github.com/BallLightningAB/brand-system

---

## Step 1 — Debrand & Clean Boilerplate

| Target | Action |
|--------|--------|
| `package.json` | Rename from `thebuildercoil` → `balllightning` |
| `__root.tsx` | Update title, description, theme storage key |
| `styles.css` | Replace TBC brand colors with BL molten red/orange palette |
| `structured-data.ts` | Update SITE_URL, SITE_NAME, descriptions for BL |
| `Header.tsx` | Replace nav links, logo alt text, brand name |
| `Footer.tsx` | Replace brand copy, links, remove TBC newsletter CTA |
| `email-service.ts` | Update recipient, sender identity, copy for BL |
| `sitemap.xml` | Update URLs for BL routes |
| `manifest.json` | Update name and colors |
| Newsletter routes | Remove `/newsletter/*` routes and `src/lib/newsletter/` |
| Blog/News routes | Remove `/blog/*` and `/news/*` routes and `src/data/` |
| Blog components | Remove `src/components/blog/` |
| Content lib | Remove `src/lib/content/` (TBC blog loader) |

### Files to keep (reuse)
- GitHub activity graph (`src/lib/github.ts`, `src/components/kibo-ui/contribution-graph/`)
- Contact form plumbing (`src/lib/contact/`, `src/routes/contact.tsx`)
- shadcn/ui components (`src/components/ui/`)
- Motion primitives (`src/components/motion-primitives/`)
- Theme provider + toggle (`src/components/theme-provider.tsx`, `theme-toggle.tsx`)
- Layout system (`src/components/layout/`)
- Biome/Ultracite config, .vscode, .windsurf, .github

---

## Step 2 — Build Ball Lightning Site

### 2a. Brand Colors (styles.css)
Apply BL palette from `shared-design-system.yaml#balllightning`:
- Replace `--tbc-*` CSS custom properties with `--bl-*` equivalents
- Dark: deep_molten `#9C1B12`, mid_red `#DD3A28`, warm_rose `#FF7268`, pale_ember `#FFD4C9`
- Gradient: `linear-gradient(135deg, #DD3A28, #FF7268)`
- Keep shared dark/cream foundations (`#05070A` / `#F5E6D3`)

### 2b. Home Page (`/`)
- **Hero**: 2-column (desktop), stacked (mobile)
  - Left: MTG-inspired trading card component (logo placeholder, motto, short positioning, CTA)
  - Right: GitHub activity graph (reuse existing)
- **TBC Content Embed**: 1 news + 2 blog cards from TBC feed endpoint (graceful fallback)
- **Newsletter CTA**: Link-only to TBC signup
- **About the Founder**: Inline section with `face.png` photo

### 2c. Services Page (`/services`)
- Source: `specs/current-changes/content-addition/Services-text.md`
- Three service tiers: Landing Page, Smart Site, Integrations & APIs
- Competence section
- Selected work brief (links to Portfolio)
- Exclude: Book a Meeting

### 2d. Portfolio Page (`/portfolio`)
- Grid of project cards
- Initial projects (4-6):
  1. Blightfell (web3 integration)
  2. Jorild.se (bilingual clinic site)
  3. Skyscraper (MMO deckbattler)
  4. Data-Driven Systems
  5. Big Data Optimization
- Optional: `/portfolio/:slug` for case study detail pages

### 2e. Contact Page (`/contact`)
- Reuse existing contact form (update branding)
- Update email/location to BL info
- Update links section

### 2f. SEO & Metadata
- Update structured data for BL organization
- Update `sitemap.xml` with BL routes
- Update `robots.txt`
- Update OG images and meta descriptions

---

## Asset Manifest (for Nicolas)

| Asset | Purpose | Ratio | Status |
|-------|---------|-------|--------|
| BL Logo (new) | Header, hero card, favicon | Square + wide | In redesign |
| `face.png` | About the Founder section | Square | ✅ Ready |
| Blightfell images | Portfolio case study | Various | Folder exists, images TBD |
| Jorild.se images | Portfolio case study | Various | Folder exists, images TBD |
| Skyscraper assets | Portfolio case study | Various | ✅ Ready (5 files) |
| OG Image | Social sharing | 1200x630 | TBD |

---

## Acceptance Criteria (from build brief)
- [ ] No visible TBC branding (except explicit "From The Builder Coil" embeds)
- [ ] Home hero: trading card left + GH graph right (desktop)
- [ ] Home shows 1 latest TBC news + 2 latest TBC blog cards → canonical URLs
- [ ] Services page present and populated; Book a Meeting excluded
- [ ] Portfolio exists with at least 2 projects scaffolded
- [ ] Newsletter CTA-only to TBC; no subscriber storage on BL
- [ ] Build + lint pass; no accidental generated directories committed
- [ ] memory-bank-usage.yaml remains intact
