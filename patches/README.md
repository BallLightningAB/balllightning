# Dependency patch history

There are no active dependency patches or audit exceptions as of 2026-11-27.

The temporary deepmerge 4.3.1 patch, its three patch-specific regression cases,
and the audit exception were removed together during PR #61 review.
GitHub withdrew GHSA-gcqx-w48m-w2h4 (CVE-2026-93753) on 2026-11-16 because
it does not describe a security vulnerability. The upstream package is used
only by the Ultracite development CLI.

The full dependency audit continues to block CI at low severity.

Reference: https://github.com/advisories/GHSA-gcqx-w48m-w2h4
