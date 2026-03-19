# Issue #21 Privacy & Cookies Page

Issue `#21` adds a dedicated localized Privacy & Cookies page that matches the consent-gated analytics behavior already implemented under issue `#20`.

## Status

- Issue: `#21`
- State: `completed`
- Scope: route, footer, and content updates only

## Implemented deliverables

- `I21D1` localized `/privacy` route and page component
- `I21D2` footer `Privacy & Cookies` link alongside the existing `Cookie settings` action
- `I21D3` plain-language analytics disclosure aligned with the current GA4 and optional Vercel Analytics behavior
- `I21D4` consent-management guidance and privacy contact details

## Files added

- `src/routes/privacy.tsx`

## Files updated

- `src/components/layout/Footer.tsx`
- `src/routeTree.gen.ts`
- `messages/en.json`
- `messages/sv.json`
- `messages/de.json`
- `messages/fr.json`
- `specs/memory-bank/active-context.yaml`

## Validation completed

- `pnpm exec paraglide-js compile --project ./project.inlang --outdir ./src/paraglide`
- `pnpm run i18n:check`
- `pnpm run typecheck`
- `pnpm run build`
- `pnpm run lint`
- Local preview browser checks passed for `/en/privacy`, `/se/privacy`, `/de/privacy`, and `/fr/privacy`
- Verified the page CTA and footer `Cookie settings` buttons reopen the existing drawer and preserve rejected consent state in a `390x844` viewport

## Browser verification completed

- Footer shows both `Privacy & Cookies` and `Cookie settings`
- Localized routes render with the expected language and page heading
- No horizontal overflow was detected on `/en/privacy` at mobile width during the browser check
