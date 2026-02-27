export type TechCategory =
	| "frontend"
	| "backend"
	| "deployment"
	| "tools"
	| "game-dev";

export interface PortfolioProject {
	title: string;
	slug: string;
}

export interface Technology {
	slug: string;
	name: string;
	category: TechCategory;
	description: string;
	projects: PortfolioProject[];
}

export const CATEGORY_LABELS: Record<TechCategory, string> = {
	frontend: "Frontend",
	backend: "Backend",
	deployment: "Deployment & Infrastructure",
	tools: "Tools & Practices",
	"game-dev": "Game Development",
};

export const CATEGORY_ORDER: TechCategory[] = [
	"frontend",
	"backend",
	"deployment",
	"tools",
	"game-dev",
];

const chronomation: PortfolioProject = {
	title: "Chronomation",
	slug: "chronomation",
};
const tbc: PortfolioProject = {
	title: "The Builder Coil",
	slug: "the-builder-coil",
};
const sad: PortfolioProject = {
	title: "Shipping API Dojo",
	slug: "shipping-api-dojo",
};
const jorild: PortfolioProject = {
	title: "Jorild.se",
	slug: "jorild-se",
};
const blightfell: PortfolioProject = {
	title: "Blightfell",
	slug: "blightfell",
};
const skyscraper: PortfolioProject = {
	title: "Skyscraper",
	slug: "skyscraper",
};

export const TECHNOLOGIES: Technology[] = [
	// ── Frontend ──────────────────────────────────────────────
	{
		slug: "react",
		name: "React 19",
		category: "frontend",
		description:
			"Component-driven UI library powering every web project in the portfolio. Used with server components and hooks-first patterns for fast, accessible interfaces.",
		projects: [chronomation, tbc, sad, jorild, blightfell],
	},
	{
		slug: "tanstack-start",
		name: "TanStack Start",
		category: "frontend",
		description:
			"Full-stack React framework with type-safe routing, server functions, and SSR. The foundation for Chronomation, The Builder Coil, and Shipping API Dojo.",
		projects: [chronomation, tbc, sad],
	},
	{
		slug: "tanstack-router",
		name: "TanStack Router",
		category: "frontend",
		description:
			"Type-safe client-side routing with file-based route generation, loaders, and search params. Provides end-to-end type safety from URL to component.",
		projects: [tbc],
	},
	{
		slug: "nextjs",
		name: "Next.js",
		category: "frontend",
		description:
			"Production-grade React framework with edge rendering, image optimization, and i18n support. Used for client projects requiring maximum SEO performance.",
		projects: [jorild, blightfell],
	},
	{
		slug: "typescript",
		name: "TypeScript",
		category: "frontend",
		description:
			"Strict TypeScript across all projects — from route params and database schemas to API contracts. Eliminates entire classes of runtime errors.",
		projects: [chronomation, tbc, sad, jorild, blightfell],
	},
	{
		slug: "tailwind-css",
		name: "Tailwind CSS",
		category: "frontend",
		description:
			"Utility-first CSS framework for responsive, mobile-first designs. Paired with design tokens for consistent theming across projects.",
		projects: [chronomation, tbc, sad, jorild, blightfell],
	},
	{
		slug: "shadcn-ui",
		name: "shadcn/ui",
		category: "frontend",
		description:
			"Accessible, composable component library built on Radix primitives and Tailwind. Provides a consistent design system without sacrificing flexibility.",
		projects: [tbc, sad, jorild],
	},

	// ── Backend ───────────────────────────────────────────────
	{
		slug: "nodejs",
		name: "Node.js",
		category: "backend",
		description:
			"Server runtime for APIs, game backends, and server functions. Powers real-time systems, webhook processors, and background jobs.",
		projects: [blightfell, skyscraper],
	},
	{
		slug: "postgresql",
		name: "PostgreSQL (Neon)",
		category: "backend",
		description:
			"Serverless Postgres via Neon for multi-tenant data isolation, ledger accounting, and full audit trails. Row-level security and branching for safe migrations.",
		projects: [chronomation, blightfell],
	},
	{
		slug: "drizzle-orm",
		name: "Drizzle ORM",
		category: "backend",
		description:
			"Type-safe SQL toolkit that generates queries at build time. Provides zero-overhead database access with full TypeScript inference.",
		projects: [chronomation],
	},
	{
		slug: "upstash-redis",
		name: "Upstash Redis",
		category: "backend",
		description:
			"Serverless Redis for distributed locks, anti-double-spend guards, and rate limiting in high-concurrency payment flows.",
		projects: [blightfell],
	},
	{
		slug: "resend",
		name: "Resend",
		category: "backend",
		description:
			"Modern email API for transactional emails and newsletters. Handles subscription management, delivery tracking, and React-based email templates.",
		projects: [tbc],
	},

	// ── Deployment & Infrastructure ──────────────────────────
	{
		slug: "vercel",
		name: "Vercel",
		category: "deployment",
		description:
			"Edge-first deployment platform with automatic previews, analytics, and sub-100ms TTFB. The default hosting target for all TanStack Start projects.",
		projects: [chronomation, tbc, sad],
	},
	{
		slug: "edge-runtime",
		name: "Edge Runtime",
		category: "deployment",
		description:
			"Lightweight V8-based runtime for middleware, i18n detection, and geo-routing at the CDN edge. Minimizes latency for global visitors.",
		projects: [jorild],
	},
	{
		slug: "bankid",
		name: "BankID",
		category: "deployment",
		description:
			"Swedish electronic identification for legally binding digital signatures. Integrated via official BankID infrastructure for document signing workflows.",
		projects: [chronomation],
	},
	{
		slug: "web3",
		name: "Web3 / Arbitrum L2",
		category: "deployment",
		description:
			"On-chain purchase flows, wallet linking, and cross-chain state management via Abstract Global Wallet on Arbitrum L2.",
		projects: [blightfell],
	},

	// ── Tools & Practices ────────────────────────────────────
	{
		slug: "seo-performance",
		name: "SEO & Web Performance",
		category: "tools",
		description:
			"End-to-end SEO strategy including structured data, Core Web Vitals optimization, sitemap generation, and mobile-first performance tuning.",
		projects: [chronomation, tbc, sad, jorild],
	},
	{
		slug: "ai-llm",
		name: "AI / LLM Integration",
		category: "tools",
		description:
			"AI-powered content generation, automated workflows, and LLM-assisted development tooling integrated into production systems.",
		projects: [chronomation],
	},
	{
		slug: "systems-design",
		name: "Systems Design",
		category: "tools",
		description:
			"Architecture planning for multi-tenant systems, distributed ledgers, cross-chain state, and event-driven pipelines.",
		projects: [chronomation, blightfell, skyscraper],
	},
	{
		slug: "agile",
		name: "Agile / Scrum",
		category: "tools",
		description:
			"Iterative delivery with sprint planning, retrospectives, and cross-functional team coordination across distributed teams.",
		projects: [skyscraper, blightfell],
	},

	// ── Game Development ─────────────────────────────────────
	{
		slug: "api",
		name: "APIs",
		category: "game-dev",
		description:
			"Supported Unity integration, focusing on API development for Blockchain and Database connectivity rather than direct game logic implementation.",
		projects: [blightfell],
	},
	{
		slug: "discordjs",
		name: "Discord.js",
		category: "game-dev",
		description:
			"Bot framework for community management, social games, and automated moderation across a 2.5k+ member Discord server.",
		projects: [skyscraper],
	},
	{
		slug: "game-design",
		name: "Game Design",
		category: "game-dev",
		description:
			"Gameplay leadership and design direction for multiplayer games. Served as Gameplay Lead on Skyscraper MMO deckbattler and supported game design & testing for Blightfell Web3 strategy autobattler.",
		projects: [skyscraper, blightfell],
	},
];

/**
 * Map from services-page competence label → technology slug for deep linking.
 * Keys must match the exact strings in the `competences` array on services.tsx.
 */
export const COMPETENCE_TO_SLUG: Record<string, string> = {
	"TypeScript / JavaScript": "typescript",
	"React / Next.js / TanStack": "react",
	"Node.js / Server Functions": "nodejs",
	"PostgreSQL / Drizzle ORM": "postgresql",
	"TailwindCSS / shadcn/ui": "tailwind-css",
	"Vercel / Cloud Deployment": "vercel",
	"SEO & Web Performance": "seo-performance",
	"AI / LLM Integration": "ai-llm",
	"Project Management": "agile",
	"Systems Design": "systems-design",
	"Data Engineering": "postgresql",
	"Agile / Scrum": "agile",
};

/** Group technologies by category, preserving CATEGORY_ORDER. */
export function technologiesByCategory(): [TechCategory, Technology[]][] {
	return CATEGORY_ORDER.map((cat) => [
		cat,
		TECHNOLOGIES.filter((t) => t.category === cat),
	]).filter(([, techs]) => (techs as Technology[]).length > 0) as [
		TechCategory,
		Technology[],
	][];
}
