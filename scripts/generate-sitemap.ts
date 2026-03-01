/**
 * Generate sitemap.xml for The Builder Coil
 *
 * Run with: pnpm tsx scripts/generate-sitemap.ts
 */

import * as fs from "node:fs";
import * as path from "node:path";

const SITE_URL = "https://balllightning.cloud";
const LOCALES = ["en", "sv", "de", "fr"] as const;
const CONTENT_DIR = path.join(process.cwd(), "src", "data");
const OUTPUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");

// Static pages with priorities and change frequencies
const STATIC_PAGES = [
	{ path: "/", priority: "1.0", changefreq: "weekly" },
	{ path: "/services", priority: "0.9", changefreq: "monthly" },
	{ path: "/technologies", priority: "0.8", changefreq: "monthly" },
	{ path: "/portfolio", priority: "0.9", changefreq: "weekly" },
	{ path: "/contact", priority: "0.7", changefreq: "monthly" },
];

// Portfolio subpages
const PORTFOLIO_SUBPAGES = [
	"/portfolio/chronomation",
	"/portfolio/the-builder-coil",
	"/portfolio/shipping-api-dojo",
	"/portfolio/jorild-se",
	"/portfolio/blightfell",
	"/portfolio/skyscraper",
];

function formatDate(date: string): string {
	return new Date(date).toISOString().split("T")[0];
}

function generateHreflangLinks(pagePath: string): string {
	const links = LOCALES.map(
		(locale) =>
			`    <xhtml:link rel="alternate" hreflang="${locale}" href="${SITE_URL}/${locale}${pagePath}" />`
	);
	links.push(
		`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${pagePath}" />`
	);
	return links.join("\n");
}

function generateUrlEntry(
	loc: string,
	lastmod?: string,
	changefreq = "weekly",
	priority = "0.5"
): string {
	const lastmodTag = lastmod
		? `\n    <lastmod>${formatDate(lastmod)}</lastmod>`
		: "";
	const hreflangLinks = generateHreflangLinks(loc);

	return LOCALES.map(
		(locale) => `  <url>
    <loc>${SITE_URL}/${locale}${loc}</loc>${lastmodTag}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${hreflangLinks}
  </url>`
	).join("\n");
}

interface PostMeta {
	slug: string;
	type: string;
	publishedAt: string;
	updatedAt?: string;
	status: string;
}

function loadPostsFromDir(dirPath: string, type: string): PostMeta[] {
	const posts: PostMeta[] = [];

	if (!fs.existsSync(dirPath)) {
		return posts;
	}

	const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));

	for (const file of files) {
		const filePath = path.join(dirPath, file);
		const content = fs.readFileSync(filePath, "utf-8");
		const post = JSON.parse(content);

		if (post.status === "published") {
			posts.push({
				slug: post.slug,
				type,
				publishedAt: post.publishedAt,
				updatedAt: post.updatedAt,
				status: post.status,
			});
		}
	}

	return posts;
}

function main() {
	console.log("Generating sitemap.xml...");

	// Load blog and news posts
	const blogPosts = loadPostsFromDir(path.join(CONTENT_DIR, "blog"), "blog");
	const newsPosts = loadPostsFromDir(path.join(CONTENT_DIR, "news"), "news");

	console.log(
		`Found ${blogPosts.length} blog posts and ${newsPosts.length} news posts`
	);

	// Build entries
	const staticEntries = STATIC_PAGES.map((page) =>
		generateUrlEntry(page.path, undefined, page.changefreq, page.priority)
	);

	const portfolioEntries = PORTFOLIO_SUBPAGES.map((subpage) =>
		generateUrlEntry(subpage, undefined, "monthly", "0.7")
	);

	const blogEntries = blogPosts.map((post) =>
		generateUrlEntry(
			`/blog/${post.slug}`,
			post.updatedAt || post.publishedAt,
			"monthly",
			"0.8"
		)
	);

	const newsEntries = newsPosts.map((post) =>
		generateUrlEntry(
			`/news/${post.slug}`,
			post.updatedAt || post.publishedAt,
			"monthly",
			"0.7"
		)
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticEntries.join("\n")}
${portfolioEntries.join("\n")}
${blogEntries.join("\n")}
${newsEntries.join("\n")}
</urlset>`;

	fs.writeFileSync(OUTPUT_PATH, xml, "utf-8");
	console.log(`Sitemap written to ${OUTPUT_PATH}`);
}

main();
