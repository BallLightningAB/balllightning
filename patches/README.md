# Dependency security patches

## deepmerge 4.3.1

GHSA-gcqx-w48m-w2h4 (CVE-2026-93753) has no upstream patched release as of
2026-11-10. The dependency is used only by the Ultracite development CLI.

`deepmerge@4.3.1.patch` filters `__proto__`, `constructor`, and `prototype` from
both target and source key enumeration, including recursive merges. It patches
the source and both distributed entry points. Normal keys and symbols remain
supported.

pnpm applies the patch during installation and verifies its lockfile hash.
`src/__tests__/lib/dependency-patches.test.ts` resolves Ultracite's actual
installed dependency and verifies malicious target/source objects, nested objects,
arrays, ordinary configuration merging, and symbols. These tests run in CI.

The package-version audit cannot recognize local patches, so `package.json`
contains a single advisory-specific `pnpm.auditConfig.ignoreGhsas` entry.
All other audit findings continue to block CI at low severity. Remove the patch,
tests, and exception together when Ultracite drops deepmerge or an upstream fix
becomes available. Do not remove the patch while keeping the exception.

Reference: https://github.com/advisories/GHSA-gcqx-w48m-w2h4
