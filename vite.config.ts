import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/paraglide",
			outputStructure: "message-modules",
			strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
			urlPatterns: [
				{
					pattern: "/",
					localized: [
						["en", "/en"],
						["sv", "/sv"],
						["de", "/de"],
						["fr", "/fr"],
					],
				},
				{
					pattern: "/:path(.*)?",
					localized: [
						["en", "/en/:path(.*)?"],
						["sv", "/sv/:path(.*)?"],
						["de", "/de/:path(.*)?"],
						["fr", "/fr/:path(.*)?"],
					],
				},
			],
			cookieName: "locale",
			cookieDomain: "balllightning.cloud",
		}),
		devtools(),
		nitro({
			// Use Vercel preset for deployment
			preset: "vercel",
			vercel: {
				functions: {
					runtime: "nodejs24.x",
				},
			},
		}),
		// this is the plugin that enables path aliases
		viteTsConfigPaths({
			projects: ["./tsconfig.json"],
		}),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
	],
	// Mobile optimization build configuration
	build: {
		// Enable source maps for debugging (disable in production if needed)
		sourcemap: false,
	},
	// Development server optimization
	server: {
		fs: {
			// Allow serving files from the project root
			allow: [".."],
		},
	},
});

export default config;
