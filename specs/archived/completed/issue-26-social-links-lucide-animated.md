# Issue #26 Social Links + Lucide Animated

Issue `#26` covers social-link reuse on the homepage and header plus a user-facing Lucide Animated icon migration.

## Status

- Issue: `#26`
- State: `completed`
- Scope: shared social-link rendering, founder LinkedIn CTA, animated icon migration, and validation

## Implemented changes

- Added `src/components/site/social-links.tsx` as the shared social-link data and renderer
- Updated the header social links to use the shared renderer and changed the header LinkedIn URL to `https://www.linkedin.com/company/ball-lightning-ab`
- Added the founder LinkedIn icon button on the home page using the personal profile URL `https://linkedin.com/in/nicolas-brulay-vip`
- Installed Lucide Animated components through shadcn for:
  - `github`
  - `linkedin`
  - `x`
  - `earth`
  - `link`
  - `webhook`
  - `folder-code`
  - `at-sign`
  - `map-pin`
  - `arrow-right`
  - `arrow-left`
  - `shield-check`
- Replaced user-facing icon usage on header, homepage CTAs, footer CTA, language switcher, services, contact, technologies, portfolio index, and portfolio subpage layout
- Updated the privacy page to use animated `shield-check` while keeping missing registry icons on `lucide-react`

## Registry fallback notes

- `external-link`
- `info`
- `bar-chart-3`
- `settings-2`
- `cookie`
- `mail`

These Lucide Animated registry items were not available from `lucide-animated.com/r/...json` during implementation, so the current `lucide-react` icons were preserved for those cases.

## Baseline validation before edits

- `pnpm run lint` passed
- `pnpm run typecheck` passed
- `pnpm run i18n:check` passed
- `pnpm run build` passed
- `pnpm run check` failed because of pre-existing formatting drift in existing files

## Validation after implementation

- `pnpm format`
- `pnpm exec biome check --write`
- `pnpm run check`
- `pnpm run lint`
- `pnpm run i18n:check`
- `pnpm run typecheck`
- `pnpm run build`

## Notes

- The generated Lucide Animated component files were left untouched.
- Biome was updated to exclude the generated animated icon files because they fail the repo's accessibility lint rules out of the box and should remain upstream-generated.
