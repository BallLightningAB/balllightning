# Issue #15 SEO Lastmod Update

Issue #15 follow-up to add lastmod timestamps to sitemap for faster Google recrawling.

## Status

- Issue: `#15`
- State: `pending-validation`
- Scope: sitemap lastmod timestamps for Google recrawling

## Changes Applied

- Updated `scripts/generate-sitemap.ts` to include `lastmod="2026-03-18"` for all static pages
- Regenerated `public/sitemap.xml` with fresh timestamps for 24 static pages (6 pages × 4 locales)
- Portfolio pages remain without lastmod (preserving existing behavior)

## Files Updated

- `scripts/generate-sitemap.ts` - Added lastmod parameter for static entries
- `public/sitemap.xml` - Regenerated with `<lastmod>2026-03-18</lastmod>` for static pages
- `specs/memory-bank/active-context.yaml` - Bumped version to 0.2.8.8
- `specs/memory-bank/CHANGELOG.yaml` - Added v0.2.8.8 entry

## Expected Impact

- **Google Recrawling**: Fresh lastmod dates should trigger Google to recrawl static pages
- **Privacy Pages**: Should accelerate indexing of the 4 new privacy pages
- **GSC Resolution**: Should reduce "Discovered - currently not indexed" count from 8 to ~4

## Validation Completed

- `pnpm run typecheck`
- `pnpm run i18n:check`
- `pnpm run build`
- `pnpm run lint`
- `pnpm run format`

## Ready for Production

Sitemap with fresh lastmod timestamps prepared for deployment to accelerate Google indexing.
