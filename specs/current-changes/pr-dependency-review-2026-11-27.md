# Dependency PR review — 2026-11-27

Completed. PR #61 is merged and production validation passed.

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

- Follow-up head e1492cedaf9dfdc92f6633759a05a88c56cc6e63 passed CI run
  45950763040, Gitleaks 45950762991, and Vercel. All CI steps succeeded.
- Preview deployment 8103232456 passed all 52 authenticated SSR locale routes.
- PR SARIF analysis 2261059864 contains zero results.
- Merged as 91912a7681bcd78d3c30f3d5cf84fd6c663115e1.
- Main CI 45951038790 and Gitleaks 45951038830 passed.
- Main SARIF analysis 2261069873 contains zero results.
- Production deployment 8103273986 succeeded at 06:19:26 UTC.
- First 52-route production pass completed at 06:20:04 UTC.
- /sv, /sv/, /sv/privacy, and /sv/portfolio/jorild-se redirect with 308 to /se
  equivalents; localized HTML has Cache-Control: no-store.
- Production Swedish privacy/settings checked at a mobile breakpoint: correct
  language/canonical, persisted disabled consent, no horizontal overflow or
  browser warnings/errors. Viewport override reset afterwards.
- At 06:20 UTC GitHub reported zero open PRs and zero Dependabot,
  secret-scanning, or code-scanning alerts. No alerts were dismissed.
- Second 52-route production pass completed at 06:22:31 UTC, over two minutes
  after the first. No regressions were detected before the final documentation branch.
- Final documentation is submitted through a separate protected-branch PR;
  application code and dependencies are identical to validated #61.

## Final status

- Full dependency audit passes with zero exceptions and no known vulnerabilities.
- All original PRs handled; the only deferred updates are the incompatible lint
  tool pair, with the existing compatible versions retained in package.json.
- Memory bank and this evidence record updated. User's untracked directory is untouched.

The changelog exceeded 600 lines and was rotated with scripts/rotate-changelog.sh.
The existing archive destination was retained; all historical entry blocks were
verified preserved, and the active changelog is 192 lines. YAML parsing passes.
Moved-entry trailing whitespace was normalized before the final whitespace check.
