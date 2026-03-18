# Issue #15 SEO Follow-up Validation

Issue `#15` follow-up validation resumed after the 2026-03-15 Search Console exports became available and a production internal-link regression was identified on localized portfolio indexes.

## Status

- Issue: `#15`
- State: `in-review`
- Scope: follow-up monitoring results, internal-link regression fix, and validation evidence

## Follow-up findings

- Search Console `Indexing > Pages` latest export row (`2026-03-15`) shows `39` indexed pages and `12` not indexed pages
- Critical issue buckets from the export:
  - `Page with redirect`: `4`
  - `Discovered - currently not indexed`: `8`
  - `Crawled - currently not indexed`: `0`
- Search Console `Core Web Vitals` currently reports `Not enough usage data` for both Mobile and Desktop
- Production validation uncovered a locale discovery regression on `/en/portfolio`, `/se/portfolio`, `/de/portfolio`, and `/fr/portfolio`:
  - case-study links were rendered as root-relative `/portfolio/{slug}`
  - those URLs resolve into English detail pages, weakening localized internal linking for non-English portfolio variants

## Changes applied

- Updated `src/routes/portfolio/index.tsx` to use `localizeHref(\`/portfolio/${project.slug}\`)` for the case-study CTA
- Added GSC export artifacts under `specs/current-changes/gsc-reports/`
- Confirmed the recent `privacy_contact_email` localization change was blocked by stale generated Paraglide output, then regenerated `src/paraglide` locally before validation

## Files updated

- `src/routes/portfolio/index.tsx`
- `specs/memory-bank/active-context.yaml`
- `specs/memory-bank/CHANGELOG.yaml`

## Files added

- `specs/current-changes/issue-15-seo-follow-up-validation.md`
- `specs/current-changes/gsc-reports/Chart.csv`
- `specs/current-changes/gsc-reports/Critical issues.csv`
- `specs/current-changes/gsc-reports/Metadata.csv`
- `specs/current-changes/gsc-reports/Non-critical issues.csv`

## Validation completed

- `pre-commit run --all-files`
- `pnpm format`
- `pnpm lint`
- `pnpm exec paraglide-js compile --project ./project.inlang --outdir ./src/paraglide`
- `pnpm run typecheck`
- `pnpm run i18n:check`
- `pnpm run build`
- `pnpm exec biome check src/routes/portfolio/index.tsx`

## Pending after commit/push

- Validate the updated portfolio links on the branch deployment/preview
- Post the follow-up monitoring summary back to GitHub Issue `#15`
- Decide whether Issue `#15` can close immediately after deployment validation or should remain open until the fix is deployed to production
