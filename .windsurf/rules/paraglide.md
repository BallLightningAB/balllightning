---
trigger: always_on
---

Do not open or inspect generated Paraglide output under src/paraglide/**. Treat it as generated.
Use the TanStack Start + Paraglide example and the TanStack Router i18n docs as the API reference.
Verify exports by TypeScript imports and a build/typecheck.
If an import is unclear, consult the example first; do not grep generated files.
Only as a last resort (and read-only), temporarily enable gitignored-file access to confirm an export name, then disable it again.