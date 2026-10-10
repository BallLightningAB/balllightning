import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

// Run against a built preview or deployment: node scripts/smoke-locales.mjs <base-url>
const baseUrl = process.argv[2];
assert.ok(baseUrl, "Provide the base URL of a running preview or deployment");
const locales = { en: "en", se: "sv", de: "de", fr: "fr" };
const paths = [
	"", "/services", "/technologies", "/portfolio", "/chronomation",
	"/contact", "/privacy", "/portfolio/chronomation",
	"/portfolio/the-builder-coil", "/portfolio/shipping-api-dojo",
	"/portfolio/jorild-se", "/portfolio/blightfell", "/portfolio/skyscraper",
];
let checked = 0;
for (const [prefix, locale] of Object.entries(locales)) {
	const messages = JSON.parse(await readFile(new URL(`../messages/${locale}.json`, import.meta.url)));
	for (const path of paths) {
		const localizedPath = `/${prefix}${path}`;
		const response = await fetch(new URL(localizedPath, baseUrl), {
			headers: { "Accept-Language": "fr", Cookie: "locale=de" },
			redirect: "manual",
			signal: AbortSignal.timeout(30_000),
		});
		assert.equal(response.status, 200, `${localizedPath}: status`);
		const dom = new JSDOM(await response.text());
		const { document } = dom.window;
		assert.equal(document.documentElement.lang, locale, `${localizedPath}: URL must override cookie and language header`);
		assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1, `${localizedPath}: one canonical`);
		assert.equal(document.querySelector('link[rel="canonical"]').href.replace(/\/$/, ""), `https://balllightning.cloud${localizedPath}`, `${localizedPath}: canonical`);
		assert.ok(document.querySelector("main h1"), `${localizedPath}: rendered heading`);
		assert.ok(document.querySelector('meta[name="description"]')?.content, `${localizedPath}: description`);
		for (const [alternatePrefix, alternateLocale] of Object.entries(locales)) {
			assert.equal(document.querySelector(`link[hreflang="${alternateLocale}"]`)?.href.replace(/\/$/, ""), `https://balllightning.cloud/${alternatePrefix}${path}`, `${localizedPath}: ${alternateLocale} alternate`);
		}
		if (!path) assert.equal(document.title, messages.home_meta_title, `${localizedPath}: localized title`);
		for (const anchor of document.querySelectorAll('a[href^="/"]')) {
			const href = anchor.getAttribute("href");
			assert.ok(href === `/${prefix}` || href.startsWith(`/${prefix}/`) || href.startsWith(`/${prefix}#`), `${localizedPath}: internal link ${href}`);
		}
		dom.window.close();
		checked++;
	}
	console.log(`${prefix} (${locale}): ${paths.length} routes passed`);
}
console.log(`${checked} localized SSR routes passed: status, language isolation, metadata, canonical, hreflang, and internal links`);
