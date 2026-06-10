# Security Dependencies Update — PR #29

**Branch**: `chore/security-and-dependabot`
**PR**: https://github.com/BallLightningAB/balllightning/pull/29
**Version**: 0.2.8.11
**Status**: in-review

## Objective

Establish the security baseline for the repo: enable Dependabot automated updates, add
security policy and secret scanning, and patch all addressable CVEs in the dependency tree.

## Changes

### GitHub Security Infrastructure
- `.github/dependabot.yml` — weekly automated PRs for npm, GitHub Actions, and Docker
- `.github/SECURITY.md` — responsible disclosure policy
- `.github/workflows/secret-scan.yml` — Gitleaks secret scanning on push/PR

### Direct Dependency Bumps
| Package | Before | After | Reason |
|---------|--------|-------|--------|
| `react-icons` | ^5.5.0 | ^5.6.0 | `SiCss3` renamed to `SiCss`; fixes TS build error |
| `vite` | ^7.3.1 | ^7.3.5 | 3 high CVEs patched |
| `vitest` | ^4.0.16 | ^4.1.8 | 1 critical CVE patched |

### pnpm.overrides (transitive CVE patches)
`seroval`, `uuid`, `diff`, `undici`, `ws`, `shell-quote`, `rollup`, `picomatch`,
`postcss`, `kysely`, `h3`, `minimatch`

### TypeScript / CI Fixes
- `tsconfig.json`: removed `"vite/client"` from `types[]` (no longer resolves as a
  type-definition package in Vite 7); added `src/vite-env.d.ts` with triple-slash ref
- `ci.yml`: added `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` at job level to silence
  Node.js 20 action deprecation warnings ahead of June 16 forced migration
- `pnpm-lock.yaml`: regenerated with `--no-frozen-lockfile` so `overrides` block is
  recorded; CI `--frozen-lockfile` now passes

### Source Fix
- `src/components/kibo-ui/code-block/index.tsx`: `SiCss3` → `SiCss`

## Vulnerability Summary

| Severity | Before | After |
|----------|--------|-------|
| Critical | 1 | 0 |
| High | 27 | 10 |
| Moderate | 23 | 7 |
| Low | 3 | 1 |
| **Total** | **55** | **18** |

## Remaining 18 Vulnerabilities (unfixable in this PR)

All remaining issues (`seroval`, `kysely`, `srvx`, `uuid@10`, `h3` rc flags) are
**peer dependencies locked by `@tanstack/react-start@1.145.7`**. Cannot be resolved
without a coordinated TanStack + Vite major version upgrade.

## Commits

| Hash | Description |
|------|-------------|
| 7ad6aeb | chore(ci): add dependabot, SECURITY.md, and secret-scan workflow |
| eef8a70 | fix(deps): bump react-icons, vite, vitest + add pnpm.overrides for transitive CVEs |
| cbf925d | fix(ci): sync pnpm-lock.yaml overrides + opt CI into Node.js 24 actions |
| 4a910d1 | fix(types): move vite/client ref from tsconfig types[] to src/vite-env.d.ts |
| TBD | chore(memory): bump version + update memory-bank for PR #29 |

## Validation

- [x] `pre-commit run --all-files` — passed
- [x] `pnpm format` — passed (2 files formatted)
- [x] `pnpm lint` — passed
- [x] `pnpm run typecheck` — passed
- [x] `pnpm run build` — passed

## Follow-up Work (separate issue/PR)

To resolve the remaining 18 vulnerabilities a coordinated upgrade is needed:
- TanStack Start/Router from `1.145.7` to latest (unblocks `seroval`, `kysely`, `srvx`)
- Vite from `^7.x` to `^8.x` if/when released (unblocks additional toolchain CVEs)
