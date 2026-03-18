# Issue #15 SEO Sitemap Update

Issue #15 follow-up work to add missing privacy pages to sitemap and complete validation preparation.

## Status

- Issue: `#15`
- State: `pending-validation`
- Scope: sitemap completeness, acceptance criteria verification

## Changes Applied

- Updated `scripts/generate-sitemap.ts` to include `/privacy` pages with priority 0.6
- Regenerated `public/sitemap.xml` now contains 44 URLs (40 + 4 privacy pages)
- Checked off all 14 acceptance criteria on GitHub issue #20
- Updated memory bank to mark issue #20 as completed
- Fixed sub_issues structure to maintain issue URL references for completed issues

## Files Updated

- `scripts/generate-sitemap.ts` - Added privacy page entry
- `public/sitemap.xml` - Regenerated with 44 total URLs
- `specs/memory-bank/active-context.yaml` - Updated issue statuses and sub_issues
- `specs/memory-bank/CHANGELOG.yaml` - Added v0.2.8.7 entry

## GSC Impact Analysis

**Before**: 40 URLs in sitemap, GSC reported 51 total pages discovered
**After**: 44 URLs in sitemap, should reduce "Discovered - currently not indexed" pages

**Expected improvement**: 
- 4 privacy pages should move from "discovered" to "indexed"
- Remaining 7 discrepancy pages likely are `/sv/*` redirects and URL variants

## Validation Completed

- `pnpm run typecheck`
- `pnpm run i18n:check`
- `pnpm run build`
- `pnpm run lint`
- `pnpm run format`

## Ready for Production

All changes prepared and validated. Ready for deployment to resolve GSC indexing issues.
