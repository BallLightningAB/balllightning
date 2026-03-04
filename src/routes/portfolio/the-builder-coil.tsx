import { createFileRoute } from "@tanstack/react-router";
import tbcBlog from "@/assets/portfolio/the-builder-coil/tbc-blog.webp";
import tbcFeed from "@/assets/portfolio/the-builder-coil/tbc-feed.webp";
import tbcHero from "@/assets/portfolio/the-builder-coil/tbc-hero.webp";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import { ProjectImageGallery } from "@/components/ui/project-image-gallery";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/portfolio/the-builder-coil")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{
					title: m.portfolio_the_builder_coil_meta_title(),
				},
				{
					name: "description",
					content: m.portfolio_the_builder_coil_meta_description(),
				},
				{
					property: "og:title",
					content: m.portfolio_the_builder_coil_og_title(),
				},
				{
					property: "og:description",
					content: m.portfolio_the_builder_coil_og_description(),
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
					href: generateCanonical("/portfolio/the-builder-coil", locale),
				},
			],
			scripts: [
				{
					type: "application/ld+json",
					children: jsonLdScript(
						generateProjectSchema({
							name: "The Builder Coil",
							description: m.portfolio_the_builder_coil_schema_description(),
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
		};
	},
	component: TheBuilderCoilPage,
});

function TheBuilderCoilPage() {
	return (
		<PortfolioSubpageLayout
			heroImage={tbcHero}
			heroImageAlt={m.portfolio_the_builder_coil_hero_alt()}
			links={[
				{
					label: m.portfolio_the_builder_coil_link_primary(),
					url: "https://thebuildercoil.com",
					external: true,
				},
				{
					label: m.portfolio_the_builder_coil_link_github(),
					url: "https://github.com/BallLightningAB/thebuildercoil",
					external: true,
				},
			]}
			nextProject={{
				title: m.portfolio_shipping_api_dojo_title(),
				slug: "shipping-api-dojo",
			}}
			projectRole={m.portfolio_the_builder_coil_role()}
			subtitle={m.portfolio_the_builder_coil_subtitle_long()}
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
			timeline={m.portfolio_the_builder_coil_timeline()}
			title={m.portfolio_the_builder_coil_title()}
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_the_builder_coil_overview_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_the_builder_coil_overview_body()}
				</p>
			</section>

			{/* Content System */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_the_builder_coil_content_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_the_builder_coil_content_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_the_builder_coil_content_list_1()}</li>
					<li>{m.portfolio_the_builder_coil_content_list_2()}</li>
					<li>{m.portfolio_the_builder_coil_content_list_3()}</li>
					<li>{m.portfolio_the_builder_coil_content_list_4()}</li>
				</ul>
			</section>

			{/* Feed API */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_the_builder_coil_feed_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_the_builder_coil_feed_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_the_builder_coil_feed_list_1()}</li>
					<li>{m.portfolio_the_builder_coil_feed_list_2()}</li>
					<li>{m.portfolio_the_builder_coil_feed_list_3()}</li>
				</ul>
			</section>

			{/* Screenshots */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_the_builder_coil_screenshots_heading()}
				</h2>
				<ProjectImageGallery
					columns={2}
					images={[
						{
							src: tbcBlog,
							alt: m.portfolio_the_builder_coil_gallery_alt_blog(),
							width: 1200,
							height: 800,
						},
						{
							src: tbcFeed,
							alt: m.portfolio_the_builder_coil_gallery_alt_feed(),
							width: 1200,
							height: 800,
						},
					]}
				/>
			</section>
		</PortfolioSubpageLayout>
	);
}
