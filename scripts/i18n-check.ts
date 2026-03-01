/**
 * i18n QA Check Script
 *
 * Reports missing keys per locale vs. `en` baseline.
 * Reports {placeholder} parity mismatches.
 * Exit code 1 on failures (CI-ready).
 *
 * Run with: pnpm tsx scripts/i18n-check.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";

const MESSAGES_DIR = path.join(process.cwd(), "messages");
const BASE_LOCALE = "en";

interface Messages {
	[key: string]: string;
}

function loadMessages(locale: string): Messages {
	const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
	if (!fs.existsSync(filePath)) {
		console.error(`❌ Message file not found: ${filePath}`);
		process.exit(1);
	}
	const raw = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Messages;
	// Remove $schema key
	const { $schema, ...messages } = raw;
	return messages;
}

function extractPlaceholders(value: string): string[] {
	const matches = value.match(/\{[^}]+\}/g);
	return matches ? matches.sort() : [];
}

function checkLocale(
	locale: string,
	messages: Messages,
	baseMessages: Messages,
	baseKeys: string[]
): boolean {
	const localeKeys = Object.keys(messages);
	let localeHasErrors = false;

	const missingKeys = baseKeys.filter((k) => !(k in messages));
	const extraKeys = localeKeys.filter((k) => !(k in baseMessages));

	if (missingKeys.length > 0) {
		localeHasErrors = true;
		console.log(`❌ [${locale}] Missing ${missingKeys.length} key(s):`);
		for (const key of missingKeys) {
			console.log(`   - ${key}`);
		}
	}

	if (extraKeys.length > 0) {
		console.log(`⚠️  [${locale}] Extra ${extraKeys.length} key(s) not in base:`);
		for (const key of extraKeys) {
			console.log(`   - ${key}`);
		}
	}

	const sharedKeys = baseKeys.filter((k) => k in messages);
	const placeholderMismatches = findPlaceholderMismatches(
		sharedKeys,
		baseMessages,
		messages
	);

	if (placeholderMismatches.length > 0) {
		localeHasErrors = true;
		console.log(
			`❌ [${locale}] Placeholder mismatch in ${placeholderMismatches.length} key(s):`
		);
		for (const key of placeholderMismatches) {
			const bp = extractPlaceholders(baseMessages[key]).join(", ");
			const lp = extractPlaceholders(messages[key]).join(", ");
			console.log(`   - ${key}: base=[${bp}] ${locale}=[${lp}]`);
		}
	}

	if (!localeHasErrors && extraKeys.length === 0) {
		console.log(`✅ [${locale}] All ${sharedKeys.length} keys OK`);
	}

	console.log();
	return localeHasErrors;
}

function findPlaceholderMismatches(
	keys: string[],
	baseMessages: Messages,
	localeMessages: Messages
): string[] {
	return keys.filter((key) => {
		const bp = extractPlaceholders(baseMessages[key]);
		const lp = extractPlaceholders(localeMessages[key]);
		return JSON.stringify(bp) !== JSON.stringify(lp);
	});
}

function main() {
	console.log("🌐 i18n QA Check\n");

	const localeFiles = fs
		.readdirSync(MESSAGES_DIR)
		.filter((f) => f.endsWith(".json"))
		.map((f) => f.replace(".json", ""));

	if (!localeFiles.includes(BASE_LOCALE)) {
		console.error(
			`❌ Base locale "${BASE_LOCALE}" not found in ${MESSAGES_DIR}`
		);
		process.exit(1);
	}

	const baseMessages = loadMessages(BASE_LOCALE);
	const baseKeys = Object.keys(baseMessages);
	const otherLocales = localeFiles.filter((l) => l !== BASE_LOCALE);

	console.log(`Base locale: ${BASE_LOCALE} (${baseKeys.length} keys)`);
	console.log(`Other locales: ${otherLocales.join(", ")}\n`);

	let hasErrors = false;

	for (const locale of otherLocales) {
		const messages = loadMessages(locale);
		if (checkLocale(locale, messages, baseMessages, baseKeys)) {
			hasErrors = true;
		}
	}

	if (hasErrors) {
		console.log("❌ i18n check FAILED");
		process.exit(1);
	}

	console.log("✅ i18n check PASSED");
}

main();
