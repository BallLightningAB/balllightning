# Asset Manifest — Ball Lightning Site
**Date**: 2026-02-17  
**Issue**: [#1](https://github.com/BallLightningAB/balllightning/issues/3)  
**Purpose**: Comprehensive inventory of all required assets for balllightning.cloud

---

## 1. Logo Assets

### Current Status
| File | Location | Size | Format | Status | Notes |
|------|----------|------|--------|--------|-------|
| `logo.png` | `/public/logo.png` | 32×32px | PNG | ⚠️ Placeholder | Currently TBC placeholder |
| `logo.svg` | `/public/logo.svg` | Vector | SVG | ⚠️ Placeholder | Vector version |
| `logo192.png` | `/public/logo192.png` | 192×192px | PNG | ⚠️ Placeholder | PWA manifest icon |
| `logo512.png` | `/public/logo512.png` | 512×512px | PNG | ⚠️ Placeholder | PWA manifest icon |

### Required Deliverables

#### Primary Logo Package
**Usage**: Header, footer, favicon, PWA icons

**Note**: Site uses dark-only theme — no light mode variant needed

| Asset Name | Dimensions | Format | Purpose | Priority |
|------------|------------|--------|---------|----------|
| `logo.svg` | Vector | SVG | Master logo file (optimized for dark bg) | � Critical |
| `logo-32.png` | 32×32px | PNG, WebP | Header logo (1×) | 🔴 Critical |
| `logo-64.png` | 64×64px | PNG, WebP | Header logo (2×) | 🔴 Critical |
| `logo-128.png` | 128×128px | PNG, WebP | General use | 🟢 Low |

#### Favicon Package
**Usage**: Browser tabs, bookmarks, OS integrations

| Asset Name | Dimensions | Format | Purpose | Priority |
|------------|------------|--------|---------|----------|
| `favicon.ico` | 16×16, 32×32, 48×48 | ICO | Legacy favicon | 🔴 Critical |
| `favicon-16x16.png` | 16×16px | PNG | Modern browsers | 🔴 Critical |
| `favicon-32x32.png` | 32×32px | PNG | Modern browsers | 🔴 Critical |
| `apple-touch-icon.png` | 180×180px | PNG | iOS home screen | 🟡 Medium |
| `safari-pinned-tab.svg` | Vector | SVG | Safari pinned tabs | 🟢 Low |

#### PWA / Manifest Icons
**Usage**: Progressive Web App, Android home screen

| Asset Name | Dimensions | Format | Purpose | Priority |
|------------|------------|--------|---------|----------|
| `android-chrome-192x192.png` | 192×192px | PNG | Android icon (1×) | 🟡 Medium |
| `android-chrome-512x512.png` | 512×512px | PNG | Android icon (2×) | 🟡 Medium |
| `maskable-icon-512x512.png` | 512×512px | PNG | Maskable icon | 🟢 Low |

**Design Requirements**:
- **Style**: Minimal, bold, modern
- **Colors**: Use BL palette (molten red #DD3A28, warm rose #FF7268, cream #F5E6D3)
- **Background**: Site is dark-only (#05070A void background) — logo must be optimized for dark background with cream/red/rose colors
- **Simplicity**: Must work at 16×16px (highly simplified)
- **Format**: SVG master file + exported PNG/WebP at various sizes

---

## 2. Open Graph (OG) Images

### Current Status
**Status**: ❌ Missing — No OG images created

### Required Deliverables

#### OG Image — Homepage
**Filename**: `og-home.png` or `og-image.png`  
**Dimensions**: 1200×630px  
**Format**: PNG or JPEG (optimized)  
**Purpose**: Social sharing preview (LinkedIn, X, Facebook, Slack)

**Content Suggestions**:
- Ball Lightning logo
- Tagline: "Full-Stack Web Development & AI Solutions"
- Location: "Mölndal, Sweden"
- Background: BL brand gradient or void with molten accents
- Typography: Big Shoulders Variable

**Priority**: 🔴 Critical

#### OG Image — Services
**Filename**: `og-services.png`  
**Dimensions**: 1200×630px  
**Format**: PNG or JPEG

**Content Suggestions**:
- "Services" heading
- 3 service tiers: Landing Page, Smart Site, Integrations
- Pricing indicators (From 15k SEK, From 30k SEK, Custom)
- BL branding

**Priority**: 🟡 Medium

#### OG Image — Portfolio
**Filename**: `og-portfolio.png`  
**Dimensions**: 1200×630px  
**Format**: PNG or JPEG

**Content Suggestions**:
- "Portfolio" heading
- Showcase 3-4 project names with tags
- "6 Shipped Projects" callout
- BL branding

**Priority**: 🟡 Medium

#### OG Image — Contact
**Filename**: `og-contact.png`  
**Dimensions**: 1200×630px  
**Format**: PNG or JPEG

**Content Suggestions**:
- "Get in Touch" heading
- Email: info@balllightning.cloud
- Location: Mölndal, Sweden
- CTA: "Let's Build Something"

**Priority**: 🟢 Low

**Technical Notes**:
- File size should be < 1MB (preferably < 500KB)
- Use PNG for graphics with text, JPEG for photos
- Test on LinkedIn, X, Facebook, Slack preview tools
- Implement via `<meta property="og:image">` tags

---

## 3. Founder / Team Assets

### Current Status
| File | Location | Status | Notes |
|------|----------|--------|-------|
| `face.png` | `/public/media/face.png` | ✅ Ready | Nicolas Brulay photo |

**Status**: ✅ Complete — No additional founder assets needed

---

## 4. Portfolio Project Assets

### Overview
Each portfolio project can have images, videos, or media to enhance case study pages (future implementation).

---

#### Project 1: Blightfell
**Status**: ⚠️ Assets Needed  
**Priority**: 🟡 Medium (when subpages implemented)

**Suggested Assets**:
- `blightfell-hero.png` — Game screenshot or key art (1920×1080px)
- `blightfell-favor-system.png` — Screenshot of Favor mechanic (1200×800px)
- `blightfell-backend.png` — Code snippet or architecture diagram (1200×800px)
- `blightfell-logo.svg` — Game logo (if available)

**Storage**: `/public/media/portfolio/blightfell/`

---

#### Project 2: The Builder Coil
**Status**: ✅ No assets needed (external site)  
**Priority**: 🟢 Low

**Notes**: Links to thebuildercoil.com — no local assets required

---

#### Project 3: Jorild.se
**Status**: ⚠️ Assets Needed  
**Priority**: 🟡 Medium (when subpages implemented)

**Suggested Assets**:
- `jorild-hero.png` — Homepage screenshot (1920×1080px)
- `jorild-bilingual.png` — Language toggle or translated page (1200×800px)
- `jorild-mobile.png` — Mobile view screenshot (750×1334px)

**Storage**: `/public/media/portfolio/jorild/`

---

#### Project 4: Skyscraper — Empires Rise
**Status**: ⚠️ Assets Ready (user noted 5 files exist)  
**Priority**: 🔴 Critical (user wants this featured)

**Suggested Organization**:
- `skyscraper-hero.png` — Key art or main screenshot (1920×1080px)
- `skyscraper-gameplay-1.png` — Gameplay screenshot 1
- `skyscraper-gameplay-2.png` — Gameplay screenshot 2
- `skyscraper-deck-building.png` — Deck builder UI
- `skyscraper-mmo-map.png` — World map or MMO features
- `skyscraper-demo.mp4` — Gameplay trailer (optional, <10MB)

**Storage**: `/public/media/portfolio/skyscraper/`

**Notes**: User specifically mentioned adding image/video material for this project when creating subpages.

---

#### Project 5: Big Data Optimization
**Status**: ⚠️ Assets Needed  
**Priority**: 🟢 Low (enterprise project, may not need visuals)

**Suggested Assets** (if needed):
- `big-data-dashboard.png` — Analytics dashboard screenshot
- `big-data-performance.png` — Performance metrics chart
- `big-data-architecture.svg` — System architecture diagram

**Storage**: `/public/media/portfolio/big-data/`

---

#### Project 6: Data-Driven Functional Systems
**Status**: ⚠️ Assets Needed  
**Priority**: 🟢 Low (enterprise project, may not need visuals)

**Suggested Assets** (if needed):
- `data-systems-pipeline.svg` — Data pipeline diagram
- `data-systems-dashboard.png` — Reporting dashboard
- `data-systems-etl.png` — ETL workflow visualization

**Storage**: `/public/media/portfolio/data-systems/`

---

## 5. Background / Decorative Assets

### Current Status
**Status**: ❌ None required currently

### Future Considerations
- Hero background patterns or gradients (CSS-based currently ✅)
- Noise textures for depth (can be added as SVG or CSS filter)
- Geometric shapes for accents

**Priority**: 🟢 Low — CSS gradients and patterns sufficient for v1

---

## 6. Icon Assets

### Current Status
**Status**: ✅ Using Lucide React icons throughout

**Icons Used**:
- Navigation: `ArrowRight`, `ExternalLink`, `Menu`
- Services: `Globe`, `Code`, `Puzzle`, `Check`
- Contact: `Mail`, `MapPin`, `ExternalLink`
- Social: `Github`, `Twitter`, `Linkedin`

**Priority**: ✅ Complete — No custom icons needed

---

## 7. Font Assets

### Current Status
| Font | Location | Status | Format |
|------|----------|--------|--------|
| Big Shoulders Variable | `/public/fonts/` or Google Fonts | ✅ Loaded | WOFF2 |
| JetBrains Mono | `/public/fonts/` or Google Fonts | ✅ Loaded | WOFF2 |

**Status**: ✅ Complete — Fonts loading correctly via `@import` in `src/fonts.css`

---

## 8. Miscellaneous Assets

### robots.txt
**Location**: `/public/robots.txt`  
**Status**: ✅ Present and configured

### sitemap.xml
**Location**: `/public/sitemap.xml`  
**Status**: ✅ Present and configured

### manifest.json
**Location**: `/public/manifest.json`  
**Status**: ⚠️ Needs update (currently has TBC/TanStack branding)

**Required Updates**:
```json
{
  "name": "Ball Lightning AB",
  "short_name": "Ball Lightning",
  "description": "Full-stack web development and AI solutions",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#DD3A28",
  "background_color": "#05070A",
  "display": "standalone"
}
```

---

## Implementation Priority Summary

### 🔴 Critical (Blocking v1 Launch)
1. **Logo Package**: SVG master + PNG exports (16px, 32px, 64px, 192px, 512px)
2. **Favicon Package**: ICO multi-size + PNG variants
3. **OG Image (Homepage)**: 1200×630px social sharing image
4. **manifest.json Update**: Replace TanStack branding with BL

### 🟡 Medium (Pre-launch Polish)
1. **OG Images (Services, Portfolio)**: Additional social previews
2. **Apple Touch Icon**: 180×180px for iOS
3. **Skyscraper Assets**: Organize existing 5 files for future subpage

### 🟢 Low (Post-launch Enhancement)
1. **Portfolio Subpage Assets**: Blightfell, Jorild.se, Big Data, Data Systems
2. **OG Image (Contact)**: Contact page social preview
3. **Maskable PWA Icon**: 512×512px with safe zone

---

## Next Steps for Asset Assembly

### For Logo Design:
1. Create master SVG logo using BL brand colors (optimized for dark background)
2. Ensure logo works at small sizes (16×16px favicon test)
3. Export PNG variants at required sizes
4. Generate favicon.ico multi-size file
5. Test logo on dark (#05070A) background (site is dark-only)

### For OG Images:
1. Design homepage OG image template (1200×630px)
2. Include: logo, tagline, location, BL branding
3. Export optimized PNG/JPEG (< 500KB)
4. Create variants for Services and Portfolio
5. Test previews on social platforms

### For Portfolio Subpages (Future):
1. Gather/create Skyscraper assets (5 files noted by user)
2. Organize assets by project in `/public/media/portfolio/`
3. Create hero images for each project (1920×1080px)
4. Optional: Create short gameplay/demo videos (< 10MB)
5. Implement subpage routes: `/portfolio/[slug]`

---

## Recommendations for Subpage Implementation

Based on user's note about creating subpages for the four latest projects:

### Recommended Subpages:
1. **Blightfell** (`/portfolio/blightfell`)
   - Technical deep-dive into Web3 integration
   - Favor system architecture
   - Code samples and challenges solved
   
2. **The Builder Coil** (`/portfolio/the-builder-coil`)
   - TanStack Start implementation details
   - CMS architecture and newsletter system
   - Performance optimizations

3. **Jorild.se** (`/portfolio/jorild-se`)
   - Bilingual i18n implementation
   - SEO strategy and Google Business integration
   - Accessibility features

4. **Skyscraper** (`/portfolio/skyscraper`)
   - MMO deckbattler game systems
   - Server architecture and scaling
   - Project management and live ops
   - **Image/video gallery** (user specifically requested)

### SEO/GEO Benefits:
- **Local SEO**: Project subpages targeting "web developer Mölndal", "freelance developer Sweden"
- **Technical SEO**: Long-form content with code examples, architecture diagrams
- **Schema.org**: Add `SoftwareApplication` or `CreativeWork` markup per project
- **Internal Linking**: Projects cross-link to relevant services
- **Content Depth**: Demonstrates expertise through detailed case studies

### File Structure:
```
/src/routes/portfolio/
  index.tsx              (grid view)
  blightfell.tsx         (subpage)
  the-builder-coil.tsx   (subpage)
  jorild-se.tsx          (subpage)
  skyscraper.tsx         (subpage)
```

**This implementation should be tracked as a separate issue** (as user noted).

---

## Asset Checklist for Handoff

- [ ] Logo SVG master file
- [ ] Logo PNG exports (16px, 32px, 64px, 192px, 512px)
- [ ] Favicon.ico (multi-size)
- [ ] Apple touch icon (180×180px)
- [ ] OG image homepage (1200×630px)
- [ ] OG images for Services and Portfolio (optional)
- [ ] manifest.json updated with BL branding
- [ ] Skyscraper project assets organized (5 files)
- [ ] Portfolio subpage hero images (if implementing subpages)

**Total Estimated Assets**: 15-25 files depending on scope

---

**End of Asset Manifest**
