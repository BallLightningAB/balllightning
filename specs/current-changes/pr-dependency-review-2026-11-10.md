# Dependency PR review — 2026-11-10

Completed. All four original PRs are handled.

## Sequence

1. Review #54 (Vite), #57 (Zod), #58 (grouped dependencies), and #56 (CodeQL upload).
2. Merge #58 first: it includes newer Vite and Zod fixes, superseding #54 and #57.
   The old focused branches now fail the audit on unrelated newly published advisories.
3. Wait for main CI, Gitleaks, and production deployment; run the 52-route production
   smoke check twice, with at least two minutes between passes, before rebasing #56.
4. Rebase #56, validate its checks and SARIF upload, then merge and repeat production validation.

## #58 changes

- Accepted application dependency updates, including Paraglide 2.29.3, React 19.3.1,
  TanStack Start 1.169.4, Vite 8.3.6, Zod 4.6.7, and Vitest 4.1.12.
- Retained Biome 2.5.14 and Ultracite 7.8.3. The proposed newer pair fails config
  parsing because Ultracite still uses the removed `useSortedClasses` rule.
- Migrated the contributions server function from removed `inputValidator` to
  `validator`, verified against official TanStack docs and TypeScript.
- Raised seroval and minimatch security floors and updated Ultracite's glob dependency.
- Patched unfixable upstream deepmerge prototype poisoning locally; added three
  regression cases and a single documented audit exception (see patches/README.md).
- Included the previous local-only security-review finalization commit a6e34c0.
- Applied required Ultracite formatting and import/type member ordering.

## Validation before push

- Frozen install, Paraglide compile, 393-key/placeholder parity across four locales.
- 14 Vitest tests pass, including the installed deepmerge patch regression cases.
- Typecheck, formatting, lint, production build, private-key pre-commit scan pass.
- Audit passes with one explicitly ignored advisory for patched development-only deepmerge;
  there are no other findings. The exception does not represent an upstream fix.
- All 52 built SSR routes pass language isolation, metadata, canonical, hreflang,
  headings, status, and localized internal links under conflicting cookie/header values.
- Browser /privacy switches en → se → de → fr while preserving the path; analytics
  rejection persists and Swedish settings reopen with analytics disabled. No warnings/errors.
- Windows production build succeeds; the prior Nitro EPERM limitation did not recur.

## #58 deployment evidence

- Follow-up 89d31138ad0b0fc6c6e8a7c01a5aa2deb40ab5ca passed CI, Gitleaks,
  Vercel, and all 52 authenticated preview routes.
- Merged as 8c49b1100ecd1b13a8b8ef17d4daac3743f8b238.
- Main CI 42884259672 and Gitleaks 42884259386 succeeded.
- Production deployment 7691900332 succeeded at 19:20:50 UTC.
- All 52 production routes passed at 19:21:45 and 19:24:08 UTC (over two minutes apart).
- /sv, /sv/, /sv/privacy, and /sv/portfolio/jorild-se redirect with 308 to /se;
  localized HTML sends Cache-Control: no-store.
- Production Swedish mobile privacy/settings check passed: rejection persisted,
  canonical and language correct, no browser warnings/errors.
- Main Gitleaks SARIF analysis 2138176061 has zero results.
- Closed #54 and #57 as superseded by merged Vite 8.3.6 and Zod 4.6.7.
- GitHub automatically closed all 13 previous dependency alerts. Only #61 for
  locally patched deepmerge remains open; none were dismissed. The installed-package
  audit has no unignored findings. See patches/README.md for the mitigation.

## #56

- Rebased after the second production pass, at 19:24 UTC.
- Code change is solely upload-sarif v4.37.3 to v4.39.1; results.sarif and blocking
  Gitleaks remain intact. No existing reviews or unresolved review threads.
- Frozen install, i18n, 14 tests, format, lint, typecheck, and pre-commit rerun.
- Follow-up head 7c003d0c56f9d055a3a2a798f92d5f86577ee98b passed CI 42885156812,
  Gitleaks 42885156847, Vercel, and authenticated privacy routes in all four locales.
- Application/source/dependency tree is identical to validated #58.
- PR SARIF analysis 2138218842 contains zero results.
- Merged as 2bb136687a36650eeda210997301c6bc74eedd79.
- Main CI 42885403843 and Gitleaks 42885403853 passed.
- Production deployment 7692059852 succeeded at 19:27:36 UTC.
- All 52 final production localization routes passed at 19:28:28 UTC.
- Main SARIF analysis 2138230612 contains zero results.

## Final state

- Zero open PRs, secret-scanning alerts, or code-scanning alerts.
- One low upstream-version Dependabot alert (#61): development-only deepmerge,
  locally patched and covered by three security regression cases. No dismissals.
- Main contains Vite 8.3.6 and Zod 4.6.7, superseding #54/#57.
- Memory bank YAML parses after repairing its pre-existing indentation error.
- Final documentation committed on codex/finalize-november-review following user
  authorization. User's untracked directory is untouched.
