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
			// Route rules for static asset caching
			routeRules: {
				// Fonts and media files - long term caching
				"/fonts/**": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				"/media/**": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				// Images - long term caching
				"/**/*.png": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				"/**/*.jpg": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				"/**/*.jpeg": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				"/**/*.webp": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				"/**/*.avif": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				"/**/*.svg": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				"/**/*.ico": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				// CSS and JS - long term caching with content hashes
				"/**/*.css": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				"/**/*.js": {
					headers: {
						"Cache-Control": "public, max-age=31536000, immutable",
					},
				},
				// SEO files - shorter caching
				"/robots.txt": {
					headers: {
						"Cache-Control": "public, max-age=86400",
					},
				},
				"/sitemap.xml": {
					headers: {
						"Cache-Control": "public, max-age=86400",
					},
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
