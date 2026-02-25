import { createFileRoute } from "@tanstack/react-router";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import { ProjectImageGallery } from "@/components/ui/project-image-gallery";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";

export const Route = createFileRoute("/portfolio/the-builder-coil")({
	head: () => ({
		meta: [
			{
				title: "The Builder Coil — Developer Blog & CMS | Ball Lightning AB",
			},
			{
				name: "description",
				content:
					"Public builder's log documenting the journey of shipping software. Built with TanStack Start, featuring a custom CMS, RSS feed API, newsletter system, and structured SEO.",
			},
			{
				property: "og:title",
				content: "The Builder Coil — Developer Blog & CMS",
			},
			{
				property: "og:description",
				content:
					"Developer blog platform built with TanStack Start — custom CMS, RSS feed, newsletter, and structured SEO.",
			},
			{
				property: "og:image",
				content: "/og-portfolio.png",
			},
			{
				property: "og:type",
				content: "article",
			},
		],
		links: [
			{
				rel: "canonical",
				href: generateCanonical("/portfolio/the-builder-coil"),
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdScript(
					generateProjectSchema({
						name: "The Builder Coil",
						description:
							"Developer blog and content platform built with TanStack Start, featuring a custom CMS, RSS feed API, newsletter system, and structured SEO.",
						slug: "the-builder-coil",
						schemaType: "SoftwareApplication",
						applicationCategory: "WebApplication",
						operatingSystem: "Web",
						url: "https://thebuildercoil.com",
						dateCreated: "2025",
						keywords: [
							"TanStack Start blog",
							"developer blog CMS",
							"builder's log",
							"RSS feed",
						],
					})
				),
			},
		],
	}),
	component: TheBuilderCoilPage,
});

function TheBuilderCoilPage() {
	return (
		<PortfolioSubpageLayout
			heroImage="/src/assets/portfolio/the-builder-coil/tbc-hero.webp"
			heroImageAlt="The Builder Coil landing page"
			links={[
				{
					label: "TheBuilderCoil.com",
					url: "https://thebuildercoil.com",
					external: true,
				},
				{
					label: "GitHub",
					url: "https://github.com/BallLightningAB/thebuildercoil",
					external: true,
				},
			]}
			nextProject={{
				title: "Shipping API Dojo",
				slug: "shipping-api-dojo",
			}}
			projectRole="Founder & Developer"
			subtitle="A public builder's log documenting the journey of shipping software"
			tags={["TanStack Start", "CMS", "SEO", "Newsletter", "Full-Stack"]}
			techStack={[
				"TanStack Start",
				"TanStack Router",
				"React 19",
				"TypeScript",
				"Tailwind CSS",
				"shadcn/ui",
				"Resend",
				"Vercel",
			]}
			timeline="2025 – Present"
			title="The Builder Coil"
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Overview</h2>
				<p className="text-muted-foreground leading-relaxed">
					The Builder Coil is a developer blog and content platform where I
					document the journey of shipping software — from architecture
					decisions to production incidents. It serves as the public voice of
					Ball Lightning AB, built with the same TanStack Start stack powering
					this very site.
				</p>
			</section>

			{/* Content System */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Content System</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					A custom file-based CMS using JSON content files with frontmatter
					metadata. Blog posts and news articles support Markdown rendering,
					syntax-highlighted code blocks via Shiki, and automatic reading time
					estimation.
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>File-based JSON CMS with typed frontmatter</li>
					<li>Markdown rendering with syntax highlighting (Shiki)</li>
					<li>Automatic reading time and word count</li>
					<li>Blog + News content types with separate feeds</li>
				</ul>
			</section>

			{/* Feed API */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Feed API</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					A public RSS/JSON feed API that powers the "Latest from The Builder
					Coil" section on the Ball Lightning homepage. The feed is consumed
					cross-site, demonstrating how the content platform integrates into the
					broader Ball Lightning ecosystem.
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>RSS 2.0 and JSON Feed endpoints</li>
					<li>Cross-origin feed consumption for BL homepage</li>
					<li>Automatic sitemap generation</li>
				</ul>
			</section>

			{/* Screenshots */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Screenshots</h2>
				<ProjectImageGallery
					columns={2}
					images={[
						{
							src: "/src/assets/portfolio/the-builder-coil/tbc-blog.webp",
							alt: "The Builder Coil blog post page",
							width: 1200,
							height: 800,
						},
						{
							src: "/src/assets/portfolio/the-builder-coil/tbc-feed.webp",
							alt: "The Builder Coil feed API response",
							width: 1200,
							height: 800,
						},
					]}
				/>
			</section>
		</PortfolioSubpageLayout>
	);
}
