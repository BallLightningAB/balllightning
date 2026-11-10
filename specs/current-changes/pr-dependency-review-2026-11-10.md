# Dependency PR review — 2026-11-10

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

## Pending

- Push #58 follow-up, wait for current-head checks and preview, merge and validate production.
- Reconcile superseded #54/#57 and complete #56 after the production observation interval.
- Record final merge/deployment evidence here.
