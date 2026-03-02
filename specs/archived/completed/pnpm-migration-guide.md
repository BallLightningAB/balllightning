# pnpm Migration Guide for Ball Lightning AB Repositories

## Overview
Complete migration from npm to pnpm for chronomation, thebuildercoil, and api-trainer repositories. Jorild-se remains on npm due to different tech stack requirements.

## Prerequisites
- pnpm@10.23.0 installed globally
- Node.js 24.x
- Git access to target repositories

## Migration Steps

### 1. Update .gitignore
Add `package-lock.json` to .gitignore (if not already present):

```gitignore
# Package managers
package-lock.json
```

### 2. Update package.json
Add packageManager field and update scripts:

```json
{
  "packageManager": "pnpm@10.23.0",
  "scripts": {
    // Add typecheck script if missing
    "typecheck": "tsc --noEmit",
    // Add guard script
    "guard:pm": "bash scripts/guard-pnpm.sh"
  }
}
```

### 3. Create Guard Script
Create `scripts/guard-pnpm.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

if [ -f package-lock.json ]; then
  echo "package-lock.json found. Use pnpm only."
  exit 1
fi
```

Make it executable:
```bash
chmod +x scripts/guard-pnpm.sh
```

### 4. Remove npm Lock Files
```bash
rm package-lock.json
rm -rf node_modules
```

### 5. Install with pnpm
```bash
pnpm install
```

### 6. Update CI/CD Workflows
Create/update `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read
  pull-requests: write

jobs:
  ci:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Fail if npm lockfile exists
        shell: bash
        run: |
          if [ -f package-lock.json ]; then
            echo "package-lock.json found. Use pnpm only."
            exit 1
          fi

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '24'
          cache: 'pnpm'

      - name: Enable corepack
        run: corepack enable

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Guard package manager
        run: pnpm run guard:pm

      - name: Type check
        run: pnpm run typecheck

      - name: Lint
        run: pnpm run lint

      - name: Test
        run: pnpm run test

      - name: Build
        run: pnpm run build
```

### 7. Update Memory Bank Usage Files
Remove status, risk, and size labels from memory-bank-usage.yaml files (if present):

**Remove these labels:**
- status: blocked, status: needs-info, status: ready, status: planned
- risk: high, risk: medium, risk: low  
- size: S, size: M, size: L

**Keep these labels:**
- type: question, type: bug, type: feature, type: chore, type: docs, type: refactor, type: test, type: security, type: dependency
- area: frontend, area: api, area: db, area: web3, area: infra, area: ci, area: documentation, area: research-and-planning
- wontfix, breaking-change, needs-triage

## Repository-Specific Notes

### chronomation
- Check for any Next.js specific pnpm configurations
- Verify .next directory is in .gitignore
- Update any deployment scripts to use pnpm

### thebuildercoil  
- Verify TanStack Start compatibility with pnpm
- Check for any build scripts that reference npm
- Test development server with pnpm dev

### api-trainer
- Update any API-related scripts to use pnpm
- Verify test runners work with pnpm
- Check for any npm-specific environment variables

## Validation Steps

After migration, verify:

1. **Installation**: `pnpm install` works without errors
2. **Development**: `pnpm dev` starts successfully
3. **Build**: `pnpm build` completes successfully  
4. **Tests**: `pnpm test` runs all tests
5. **Linting**: `pnpm lint` passes
6. **Type checking**: `pnpm typecheck` passes
7. **Guard script**: `pnpm guard:pm` passes (no package-lock.json)
8. **CI**: GitHub Actions workflow runs successfully

## Troubleshooting

### Common Issues

**Issue**: pnpm install fails with peer dependency errors
**Solution**: Use `pnpm install --strict-peer-dependencies=false` or update dependencies

**Issue**: Build scripts reference npm
**Solution**: Update all scripts to use pnpm or remove explicit package manager calls

**Issue**: CI fails on pnpm setup
**Solution**: Ensure corepack is enabled and pnpm version is specified

**Issue**: Memory bank file still has old labels
**Solution**: Manually edit the markdown file to remove status/risk/size labels

## Rollback Plan

If migration fails, rollback steps:

1. Restore package-lock.json from git
2. Remove pnpm-lock.json
3. Install with npm: `npm install`
4. Revert CI workflow changes
5. Remove guard script and packageManager field

## Post-Migration

1. Commit all changes with descriptive message
2. Update team documentation to specify pnpm usage
3. Update README.md files to mention pnpm
4. Remove any npm-specific documentation

## Files to Modify Summary

For each repository (chronomation, thebuildercoil, api-trainer):

- `.gitignore` - Add package-lock.json
- `package.json` - Add packageManager field and guard script
- `scripts/guard-pnpm.sh` - Create new guard script
- `.github/workflows/ci.yml` - Create/update CI workflow
- `specs/memory-bank/memory-bank-usage.yaml` - Remove status/risk/size labels (if exists)
- Remove `package-lock.json` and `node_modules`

## Success Criteria

- All repositories use pnpm exclusively
- CI/CD workflows use pnpm
- Guard scripts prevent npm usage
- No package-lock.json files in any repository
- All existing functionality preserved
