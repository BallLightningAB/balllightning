import { createRequire } from "node:module";
import { expect, it } from "vitest";

// Resolve the actual patched transitive dependency used by the Ultracite CLI.
const requireFromUltracite = createRequire(
	import.meta.resolve("ultracite/biome/core")
);
const deepmerge: (target: object, source: object) => object =
	requireFromUltracite("deepmerge");

it.each(["target", "source"])(
	"blocks prototype keys in the %s, including nested objects and arrays",
	(side) => {
		const malicious = JSON.parse(
			'{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"prototype":{"polluted":true},"safe":{"__proto__":{"polluted":true},"value":1},"items":[{"__proto__":{"polluted":true},"value":2}]}'
		);
		const result =
			side === "target"
				? deepmerge(malicious, {})
				: deepmerge(Object.create(null), malicious);

		expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
		expect(result).toEqual({ safe: { value: 1 }, items: [{ value: 2 }] });
		expect(Object.hasOwn(result, "__proto__")).toBe(false);
		expect(Object.hasOwn(result, "constructor")).toBe(false);
		expect(Object.hasOwn(result, "prototype")).toBe(false);
	}
);

it("preserves normal config merging and enumerable symbols", () => {
	const marker = Symbol("config");
	expect(
		deepmerge(
			{ rules: { first: true }, items: [1], [marker]: "retained" },
			{ rules: { second: true }, items: [2] }
		)
	).toEqual({
		rules: { first: true, second: true },
		items: [1, 2],
		[marker]: "retained",
	});
});
