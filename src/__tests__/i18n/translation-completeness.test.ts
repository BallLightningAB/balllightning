import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Reusable test for i18n translation completeness
 * Can be copied to other TanStack Start projects with Paraglide
 */
describe("i18n Translation Completeness", () => {
	const locales = ["en", "sv", "de", "fr"];
	const messagesDir = join(process.cwd(), "messages");

	it("all locales have the same number of keys", () => {
		const keyCounts = locales.map((locale) => {
			const filePath = join(messagesDir, `${locale}.json`);
			const content = readFileSync(filePath, "utf-8");
			const messages = JSON.parse(content);
			return { locale, count: Object.keys(messages).length };
		});

		const counts = keyCounts.map((c) => c.count);
		const allEqual = counts.every((count) => count === counts[0]);

		if (!allEqual) {
			console.log("Key counts by locale:", keyCounts);
		}

		expect(allEqual).toBe(true);
	});

	it("all locales have the same keys", () => {
		const messagesByLocale = locales.map((locale) => {
			const filePath = join(messagesDir, `${locale}.json`);
			const content = readFileSync(filePath, "utf-8");
			return {
				locale,
				keys: Object.keys(JSON.parse(content)).sort(),
			};
		});

		const enKeys = messagesByLocale.find((m) => m.locale === "en")?.keys || [];
		const missingKeys: Record<string, string[]> = {};

		for (const { locale, keys } of messagesByLocale) {
			if (locale === "en") {
				continue;
			}

			const missing = enKeys.filter((key) => !keys.includes(key));
			if (missing.length > 0) {
				missingKeys[locale] = missing;
			}
		}

		if (Object.keys(missingKeys).length > 0) {
			console.log("Missing keys by locale:", missingKeys);
		}

		expect(Object.keys(missingKeys).length).toBe(0);
	});

	it("all translation values are non-empty strings", () => {
		for (const locale of locales) {
			const filePath = join(messagesDir, `${locale}.json`);
			const content = readFileSync(filePath, "utf-8");
			const messages = JSON.parse(content);

			const emptyValues: string[] = [];
			for (const [key, value] of Object.entries(messages)) {
				if (typeof value !== "string" || value.trim() === "") {
					emptyValues.push(key);
				}
			}

			if (emptyValues.length > 0) {
				console.log(`Empty values in ${locale}:`, emptyValues);
			}

			expect(emptyValues.length).toBe(0);
		}
	});
});
