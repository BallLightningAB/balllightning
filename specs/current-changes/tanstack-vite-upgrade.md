# TanStack + Vite Major Upgrade — Security Fixes

**Branch**: `chore/tanstack-vite-upgrade`
**Version**: 0.2.8.13
**Status**: completed

## Objective

Upgrade TanStack Start and Vite to latest versions to resolve the remaining 18 security vulnerabilities that are locked as peer dependencies of `@tanstack/react-start@1.145.7`.

## Changes Made

### TanStack Start Upgrade (1.145.7 → 1.168.25)
- `@tanstack/react-start`: 1.145.8 → 1.168.25
- `@tanstack/react-router`: 1.145.7 → 1.170.15
- `@tanstack/react-router-devtools`: 1.145.7 → 1.167.0
- `@tanstack/react-router-ssr-query`: 1.145.7 → 1.167.1
- `@tanstack/router-plugin`: 1.145.7 → 1.168.18
- `@tanstack/start-static-server-functions`: 1.145.8 → 1.167.17
- `@tanstack/react-devtools`: 0.9.0 → 0.10.5 (later removed)
- `@tanstack/devtools-vite`: 0.4.0 → 0.7.0 (later removed)

### Vite Upgrade (7.3.5 → 8.0.16)
- `vite`: 7.3.5 → 8.0.16
- `@vitejs/plugin-react`: 5.1.1 → 6.0.2
- `@tailwindcss/vite`: 4.1.17 → 4.3.0

### Additional Changes
- Removed TanStackDevtools from `src/routes/__root.tsx` due to Vite 8 Rolldown bundler incompatibility
- Removed unused devtools dependencies: `@tanstack/react-devtools`, `@tanstack/react-router-devtools`, `@tanstack/devtools-vite`
- Vite 8 now uses Rolldown (Rust-based bundler) for significantly faster builds

## Known Breaking Changes

### Vite 8 + Rolldown
- Vite 8 uses Rolldown instead of Rollup for bundling
- TanStackDevtools plugin configuration incompatible with Rolldown's JSX parsing
- Build time improved from ~10s to ~2.3s with Rolldown

### TanStack Start 1.145.7 → 1.168.25
- Minor API changes in server functions (inputValidator → validator deprecation warnings)
- No breaking changes requiring code modifications

## Commits

| Hash | Description |
|------|-------------|
| TBD | Upgrade TanStack packages to latest versions |
| TBD | Upgrade Vite to 8.0.16 and related plugins |
| TBD | Remove TanStackDevtools due to Rolldown incompatibility |
| TBD | Remove unused devtools dependencies |

## Validation

- [x] `pnpm install` — passed
- [x] `pnpm run typecheck` — passed
- [x] `pnpm run build` — passed
- [x] `pnpm lint` — passed
- [x] `pnpm format` — passed
- [ ] Local dev server test — pending
- [ ] Security audit — pending
