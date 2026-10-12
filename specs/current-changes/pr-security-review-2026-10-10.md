# PR security review — 2026-10-10

Continued on 2026-10-12 after the #46 preview and CI checks passed.

## Sequence and findings

The initial open PRs were #51 (39 dependency updates), #47 (SARIF upload action),
and #46 (Node setup action). Work began with #47, but Vercel rejected its preview
because the base TanStack Start version was vulnerable to CVE-2026-102989.
The sequence was changed to patch and deploy #51 first. Each subsequent branch
was rebased only after the preceding merge's CI, secret scan, and production
deployment succeeded. Force pushes of rebased Dependabot branches used explicit
leases against the previously fetched commit.

### #51 — dependency and critical security fixes

- Upgraded TanStack Start to 1.168.61 and aligned Router/plugin dependencies.
- Verified the resolved start-server-core is beyond the advisory's 1.169.39 fix.
- Raised security override floors for seroval, undici, postcss, source-map-js,
  postcss-selector-parser, and older srvx versions.
- Added the React Query peer explicitly to eliminate peer version mismatches.
- Kept Ultracite at 7.8.3: 7.12.0 introduces an unpatched `braces` dependency
  (GHSA-vfj7-8cjw-p6xm), as well as new lint failures. Do not update that CLI
  until its dependency issue is resolved or otherwise addressed.
- Baseline `pnpm audit`: 43 findings (1 critical, 20 high, 17 moderate, 5 low).
  After remediation: zero findings, including the development tree.
- Merged at 17:53:43 UTC; production deployment ready at 17:55:16 UTC.

### #47 — real, blocking secret scanning

- Removed `continue-on-error` from Gitleaks.
- Explicitly enabled built-in rules via `[extend] useDefault = true`.
  The old custom configuration did not load those rules.
- Removed broad path/content exclusions and added a single rule-specific
  exception for `portfolio_skyscraper_og_description` in locale catalogs.
  Four historical Discord-secret matches were verified as portfolio prose.
- Pinned Gitleaks binary version to 8.30.1 and disabled PR comments.
- Verified a synthetic token is detected and a full-history scan passes.
- The final security follow-up corrects the SARIF upload filename from
  `gitleaks.sarif` to the action's actual `results.sarif`; the old condition
  silently skipped uploads even though scans ran and blocked on leaks.
- Merged at 17:58:29 UTC; production CI, Gitleaks, and Vercel all succeeded
  before #46 was rebased.

### #46 — Node setup and reproducible validation

- Updated actions/setup-node to v7.
- Pinned Corepack preparation to pnpm 10.23.0 and used the installed Paraglide
  compiler instead of downloading an unpinned compiler with `pnpm dlx`.
- Added translation/placeholder checks, Vitest, and a full dependency audit to CI.
- Declared `tsx` explicitly: the newly exercised CI check exposed reliance on
  a local executable that was absent from a clean runner.
- Reduced CI token permissions to contents read and disabled persisted checkout
  credentials.
- Added `scripts/smoke-locales.mjs` for deployed/built SSR regression checks.
- Merged on 2026-10-12 at 20:02:18 UTC after successful CI, Gitleaks, and preview.
  Main CI, Gitleaks, and production deployment succeeded before the Nitro branch
  was created.

### Nitro follow-up

Enabling Dependabot exposed four medium alerts representing two Nitro advisories
(GHSA-9phm-9p8f-hw5m and GHSA-5w89-w975-hf9q). These were absent from `pnpm audit`.
Nitro was pinned to 3.0.1-alpha.2; the first patched beta is 3.0.260429-beta.
Dependabot cannot automatically find a compatible replacement for the exact pin.
A separate upgrade pins Nitro to 3.0.260903-beta. The existing H3 override
forced an incompatible prerelease lacking `h3/rules/compiler`; raising it to
2.0.2 restores compatibility. Removed the old srvx override because pnpm also
applied it to CrossWS's optional peer range, incorrectly excluding srvx 1.x.
Resolved srvx versions remain patched (0.11.22 and 1.0.5).

Official advisories:
- https://github.com/nitrojs/nitro/security/advisories/GHSA-9phm-9p8f-hw5m
- https://github.com/nitrojs/nitro/security/advisories/GHSA-5w89-w975-hf9q

Final deployment and GitHub alert reconciliation are checked after merge;
alerts must not be dismissed as fixed based solely on an npm audit.

## Repository protections

- Enabled Dependabot alerts and automatic security updates.
- Protected `main`: up-to-date CI and Gitleaks checks are required, unresolved
  conversations block merges, and admin enforcement is enabled.
- Disabled force pushes and deletions of `main`.
- Existing GitHub secret scanning and push protection remain enabled.

## Validation evidence

- Frozen pnpm install, package-manager guard, typecheck, lint, and Vercel build.
- 11 Vitest tests pass.
- 393 translation keys and placeholder parity pass for English, Swedish,
  German, and French.
- 52 built and 52 production SSR routes pass: status, locale isolation under
  conflicting cookie/Accept-Language headers, localized homepage titles,
  canonical URLs, hreflang alternates, headings, descriptions, and internal links.
- Browser language switching preserves `/privacy` through en → se → de → fr.
- Analytics rejection persists; Swedish Cookie settings reopen showing disabled
  analytics. No browser errors after successful hydration.
- Production `/sv`, `/sv/`, `/sv/privacy`, and a Swedish portfolio path redirect
  with 308 to `/se` equivalents; localized HTML sends `Cache-Control: no-store`.

## Limits and follow-up

- Biome emits an existing deprecated-configuration informational message.
- Existing memory-bank YAML syntax/duplicate-key errors are unchanged; the
  added release entries introduce no new parser diagnostics.
- Final Nitro production deployment and automatic GitHub alert reconciliation
  are verified after the upgrade PR merges.
- On Windows, the Nitro beta build reaches both Vite bundles but its parallel
  static-asset copies fail with `EPERM` on `chmod`. The Linux CI and Vercel
  builds must pass before merge; no filesystem workaround is shipped.
- The user's untracked `glantbyn-storyworld-windows-clean/` directory is untouched.
