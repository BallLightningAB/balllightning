# Issue #24 – Post-PR Consent/UI Follow-up Fixes

## Scope
- Review Gemini Code Assist comments on the consent PR against the actual TanStack Start + React 19 + Radix stack
- Fix confirmed issues without weakening strict TypeScript guarantees
- Resolve mobile responsiveness regressions in sheet-based UI and homepage feed cards
- Resolve Radix dialog accessibility warnings
- Investigate CLS/layout-shift mitigation and verify sitemap impact

## Findings
- Gemini’s core concern about the `gtag` queue behavior was valid, but the suggested `(...args: any[]) => void` type was too loose for this codebase
- The `gtag` polyfill previously risked queueing a trailing `undefined` for omitted optional params
- Shared sheet sizing was too narrow on mobile in some usages and needed a viewport-safe width baseline
- The homepage feed card CTA inherited `whitespace-nowrap` behavior that could overflow on narrow screens
- The Radix accessibility warning was caused by `project-image-gallery` dialog content lacking a `Dialog.Title` and `Dialog.Description`
- The zustand deprecation warning does not come from the application source tree; no `zustand` imports exist under `src`
- Consent changes did not add a new public route, so the sitemap generator does not currently require route updates

## Changes applied so far
- Updated `src/lib/consent/types.ts` to use a typed variadic `GtagFunction` signature without `any`
- Updated `src/lib/consent/google-consent.ts` to queue the received variadic args directly into `dataLayer`
- Updated `src/components/ui/sheet.tsx` with viewport-safe side sheet sizing and `overflow-y-auto`
- Updated `src/components/site/CookieSettings.tsx` for mobile-safe width, spacing, and wrapping footer actions
- Updated `src/components/ui/language-switcher.tsx` so its sheet remains usable on small screens
- Updated `src/routes/index.tsx` feed card layout to allow wrapping metadata/title/CTA text without horizontal overflow
- Updated `src/components/ui/project-image-gallery.tsx` with hidden Radix dialog title/description for accessibility
- Updated `src/styles.css` with root overflow clipping and `scrollbar-gutter: stable both-edges` as a conservative CLS mitigation
- Fixed TypeScript locale type errors:
  - Updated `handleLocaleChange` parameter from `string` to `"en" | "sv" | "de" | "fr"` in language-switcher.tsx
  - Added type assertion `locale as "en" | "sv" | "de" | "fr"` for mobile language switcher
  - Updated `generateCanonical` locale parameter from `string` to `"en" | "sv" | "de" | "fr"` in structured-data.ts
- Created GitHub Issue #24 and linked it as a follow-up bug under Issue #20 in `active-context.yaml`

## GitHub review handling
- Replied to both Gemini review comments on PR #23 with the stack-correct resolution
- GitHub MCP session was invalid, so GitHub operations were completed through `gh` instead
- Added final queue fix that pushes the `arguments` object so the implementation now matches Google’s documented `gtag` snippet and satisfies the external review
- Confirmed the Issue #24 review thread and follow-up fixes are now resolved in the PR discussion

## Remaining checks
- [x] Run typecheck/build/format/lint/pre-commit again after the follow-up fixes
- [x] Fix TypeScript locale type errors in language-switcher.tsx and structured-data.ts
- [x] Confirm whether any additional sheet/mobile tweaks are needed after validation
- Run `/commitprocess` bookkeeping without committing
