/**
 * JSON-LD Structured Data for The Builder Coil
 *
 * Provides schema.org structured data for SEO:
 * - WebSite schema on home page
 * - BlogPosting schema on post pages
 * - Organization schema on about page
 */

interface Post {
	slug: string;
	title: string;
	summary: string;
	publishedAt: string;
	updatedAt?: string;
	author?: string;
	heroImage?: string;
	tags?: string[];
	readingTime?: number;
	type: string;
}

const SITE_URL = "https://balllightning.cloud";
const SITE_NAME = "Ball Lightning AB";
const ORGANIZATION_NAME = "Ball Lightning AB";
const AUTHOR_NAME = "Nicolas Brulay";
const BALL_LIGHTNING_URL = "https://balllightning.cloud";
const CHRONOMATION_URL = "https://chronomation.com";

const ORGANIZATION_ID = `${BALL_LIGHTNING_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const CHRONOMATION_PRODUCT_ID = `${CHRONOMATION_URL}/#product`;

export function generateRootEntityGraphSchema() {
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "Organization",
				"@id": ORGANIZATION_ID,
				name: ORGANIZATION_NAME,
				url: BALL_LIGHTNING_URL,
				description:
					"Software consulting and product development company specializing in full-stack web, systems integration, and AI-driven solutions.",
				founder: {
					"@type": "Person",
					name: AUTHOR_NAME,
				},
				sameAs: [
					"https://github.com/BallLightningAB",
					"https://x.com/nicbrulay",
					"https://linkedin.com/in/nicolas-brulay-vip",
				],
			},
			{
				"@type": "WebSite",
				"@id": WEBSITE_ID,
				name: SITE_NAME,
				description:
					"Software consulting and product development. Full-stack web, systems integration, and AI-driven solutions by Ball Lightning AB.",
				url: SITE_URL,
				publisher: {
					"@id": ORGANIZATION_ID,
				},
				potentialAction: {
					"@type": "SearchAction",
					target: {
						"@type": "EntryPoint",
						urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
					},
					"query-input": "required name=search_term_string",
				},
			},
			{
				"@type": "Product",
				"@id": CHRONOMATION_PRODUCT_ID,
				name: "Chronomation",
				description:
					"Multi-tenant content engine that turns work artifacts into narrative blog posts and social content.",
				url: CHRONOMATION_URL,
				brand: {
					"@id": ORGANIZATION_ID,
				},
			},
		],
	};
}

/**
 * WebSite schema for home page
 */
export function generateWebSiteSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		"@id": WEBSITE_ID,
		name: SITE_NAME,
		description:
			"Software consulting and product development. Full-stack web, systems integration, and AI-driven solutions by Ball Lightning AB.",
		url: SITE_URL,
		publisher: {
			"@id": ORGANIZATION_ID,
		},
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};
}

/**
 * Organization schema for about page
 */
export function generateOrganizationSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		"@id": ORGANIZATION_ID,
		name: ORGANIZATION_NAME,
		url: BALL_LIGHTNING_URL,
		logo: `${SITE_URL}/logo-60.svg`,
		description:
			"Software consulting and product development company specializing in full-stack web, systems integration, and AI-driven solutions.",
		founder: {
			"@type": "Person",
			name: AUTHOR_NAME,
		},
		sameAs: [
			"https://github.com/BallLightningAB",
			"https://x.com/nicbrulay",
			"https://linkedin.com/in/nicolas-brulay-vip",
		],
	};
}

/**
 * BlogPosting schema for blog/news post pages
 */
export function generateBlogPostingSchema(post: Post) {
	const postUrl = `${SITE_URL}/${post.type}/${post.slug}`;

	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.summary,
		url: postUrl,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt || post.publishedAt,
		author: {
			"@type": "Person",
			name: post.author || AUTHOR_NAME,
		},
		publisher: {
			"@id": ORGANIZATION_ID,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/logo-60.svg`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": postUrl,
		},
		...(post.heroImage && {
			image: post.heroImage.startsWith("http")
				? post.heroImage
				: `${SITE_URL}${post.heroImage}`,
		}),
		...(post.tags?.length && {
			keywords: post.tags.join(", "),
		}),
		...(post.readingTime && {
			timeRequired: `PT${post.readingTime}M`,
		}),
	};
}

/**
 * Blog schema for blog index page
 */
export function generateBlogSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "Blog",
		name: `${SITE_NAME} Portfolio`,
		description:
			"Portfolio of projects and case studies from Ball Lightning AB.",
		url: `${SITE_URL}/portfolio`,
		publisher: {
			"@id": ORGANIZATION_ID,
		},
	};
}

export function generateNewsSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: `${SITE_NAME} News`,
		description:
			"Updates, announcements, and press releases from Ball Lightning AB.",
		url: `${SITE_URL}/news`,
		publisher: {
			"@id": ORGANIZATION_ID,
		},
	};
}

export function generateNewsArticleSchema(post: Post) {
	const postUrl = `${SITE_URL}/news/${post.slug}`;

	return {
		"@context": "https://schema.org",
		"@type": "NewsArticle",
		headline: post.title,
		description: post.summary,
		url: postUrl,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt || post.publishedAt,
		author: {
			"@type": "Person",
			name: post.author || AUTHOR_NAME,
		},
		publisher: {
			"@id": ORGANIZATION_ID,
			logo: {
				"@type": "ImageObject",
				url: `${SITE_URL}/logo-60.svg`,
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": postUrl,
		},
		...(post.heroImage && {
			image: post.heroImage.startsWith("http")
				? post.heroImage
				: `${SITE_URL}${post.heroImage}`,
		}),
		...(post.tags?.length && {
			keywords: post.tags.join(", "),
		}),
		...(post.readingTime && {
			timeRequired: `PT${post.readingTime}M`,
		}),
	};
}

/**
 * Project schema for portfolio subpages
 */
interface ProjectSchemaOptions {
	name: string;
	description: string;
	slug: string;
	schemaType: "SoftwareApplication" | "CreativeWork" | "VideoGame" | "WebSite";
	applicationCategory?: string;
	operatingSystem?: string;
	image?: string;
	dateCreated?: string;
	keywords?: string[];
	url?: string;
}

export function generateProjectSchema(options: ProjectSchemaOptions) {
	const projectUrl = options.url ?? `${SITE_URL}/portfolio/${options.slug}`;

	return {
		"@context": "https://schema.org",
		"@type": options.schemaType,
		name: options.name,
		description: options.description,
		url: projectUrl,
		author: {
			"@type": "Organization",
			"@id": ORGANIZATION_ID,
			name: ORGANIZATION_NAME,
		},
		...(options.applicationCategory && {
			applicationCategory: options.applicationCategory,
		}),
		...(options.operatingSystem && {
			operatingSystem: options.operatingSystem,
		}),
		...(options.image && {
			image: options.image.startsWith("http")
				? options.image
				: `${SITE_URL}${options.image}`,
		}),
		...(options.dateCreated && {
			dateCreated: options.dateCreated,
		}),
		...(options.keywords?.length && {
			keywords: options.keywords.join(", "),
		}),
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `${SITE_URL}/portfolio/${options.slug}`,
		},
	};
}

const LOCALES = ["en", "sv", "de", "fr"] as const;

/**
 * Generate canonical URL for a page (locale-aware)
 */
export function generateCanonical(path: string, locale?: string): string {
	const prefix = locale ? `/${locale}` : "";
	return `${SITE_URL}${prefix}${path}`;
}

/**
 * Generate hreflang link objects for all locales
 */
export function generateHreflangLinks(path: string) {
	return [
		...LOCALES.map((locale) => ({
			rel: "alternate",
			hreflang: locale,
			href: `${SITE_URL}/${locale}${path}`,
		})),
		{
			rel: "alternate",
			hreflang: "x-default",
			href: `${SITE_URL}/en${path}`,
		},
	];
}

/**
 * Generate script tag content for JSON-LD
 */
export function jsonLdScript(data: object): string {
	return JSON.stringify(data);
}
