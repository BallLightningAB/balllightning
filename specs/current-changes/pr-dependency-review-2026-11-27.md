# Dependency PR review — 2026-11-27

## Scope and sequence

- The sole open PR is #61, the grouped dependency update from November 23.
- Base main: 9c55fc8daf15023bd4b1337fa069355cf1c7791b.
- Original PR head: 560cf3d51e2cd4375a38befa22a6b8b16df91be8.
- No existing review submissions or unresolved threads. GitHub reports zero open
  Dependabot, secret-scanning, and code-scanning alerts at review start.
- Repair and validate #61, require fresh CI/Gitleaks/Vercel, then merge. Require
  successful main checks/deployment and two 52-route production passes at least
  two minutes apart before rebasing any subsequent PR. Recheck the open PR list.

## Findings and changes

- Original CI run 45130522566 fails lint configuration parsing; preview and secret
  scanning passed. The proposed Biome 2.6.8/Ultracite 7.12.4 pair still references
  the removed `useSortedClasses` rule. Retain Biome 2.5.14 and Ultracite 7.8.3.
- Accept Tailwind/Vite 4.3.5, React Query 5.108.1, TanStack Start 1.169.7,
  Router plugin 1.169.0, React Hook Form 7.92.0, tailwind-merge 3.7.1,
  React Vite plugin 6.3.0, Tailwind CSS 4.3.5, and Vite 8.3.8.
- GitHub withdrew GHSA-gcqx-w48m-w2h4 / CVE-2026-93753 on November 16,
  stating it does not describe a security vulnerability. Remove the temporary
  deepmerge patch, its three patch-only cases, and the audit exception together.
  The normal localization and consent tests remain. No alert was dismissed.
- Preserve all other dependency security floors and blocking CI/secret scanning.
- No application route or translation content changes are needed.

Reference: https://github.com/advisories/GHSA-gcqx-w48m-w2h4

## Local validation

- pnpm 10.23.0 frozen install passes.
- Full `pnpm audit --audit-level low`: no known vulnerabilities, no exceptions.
- Paraglide compile and 393 keys/placeholder parity pass for en/sv/de/fr.
- All 11 remaining Vitest localization/consent tests pass.
- Typecheck, Ultracite fix, formatting, lint, package-manager guard, YAML parsing,
  staged whitespace check, and pre-commit private-key scan pass.
- Production build passes outside the sandbox; the sandboxed attempt failed at
  Nitro static-asset chmod with EPERM. No application workaround was needed.
- All 52 built SSR routes pass status, URL/cookie/header language isolation,
  localized homepage titles, metadata, canonical/hreflang, and internal links.
- Browser /privacy switches en -> se -> de -> fr while preserving the path.
  Consent can be enabled, reopened showing enabled, withdrawn, and reopened in
  Swedish showing disabled. No browser warnings/errors; rendered French page checked.
- The private-key hook initially reported line-ending changes; staging normalized
  the reviewed files and its subsequent run passed.

## Deployment evidence

Pending current-head preview, merge, main checks, SARIF ingestion, production
checks, observation interval, and final security/PR reconciliation.
