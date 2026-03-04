import { createFileRoute } from "@tanstack/react-router";
import blightfellArchitecture from "@/assets/portfolio/blightfell/blightfell-architecture.webp";
import blightfellIngame from "@/assets/portfolio/blightfell/blightfell-ingame.webp";
import blightfellSite from "@/assets/portfolio/blightfell/blightfell-site.webp";
import blightfellSteam from "@/assets/portfolio/blightfell/blightfell-steam.webp";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import { ProjectImageGallery } from "@/components/ui/project-image-gallery";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/portfolio/blightfell")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{
					title: m.portfolio_blightfell_meta_title(),
				},
				{
					name: "description",
					content: m.portfolio_blightfell_meta_description(),
				},
				{
					property: "og:title",
					content: m.portfolio_blightfell_og_title(),
				},
				{
					property: "og:description",
					content: m.portfolio_blightfell_og_description(),
				},
				{
					property: "og:image",
					content: blightfellSite,
				},
				{
					property: "og:type",
					content: "article",
				},
			],
			links: [
				{
					rel: "canonical",
					href: generateCanonical("/portfolio/blightfell", locale),
				},
			],
			scripts: [
				{
					type: "application/ld+json",
					children: jsonLdScript(
						generateProjectSchema({
							name: "Blightfell — Web3 Game Integration",
							description: m.portfolio_blightfell_schema_description(),
							slug: "blightfell",
							schemaType: "SoftwareApplication",
							applicationCategory: "GameApplication",
							url: generateCanonical("/portfolio/blightfell", locale),
							dateCreated: "2025-09",
							keywords: [
								"web3 game integration",
								"blockchain game backend",
								"Node.js",
								"PostgreSQL",
							],
						})
					),
				},
			],
		};
	},
	component: BlightfellPage,
});

function BlightfellPage() {
	const galleryImages = [
		{
			src: blightfellSite,
			alt: m.portfolio_blightfell_gallery_alt_site(),
		},
		{
			src: blightfellSteam,
			alt: m.portfolio_blightfell_gallery_alt_steam(),
		},
		{
			src: blightfellIngame,
			alt: m.portfolio_blightfell_gallery_alt_ingame(),
		},
		{
			src: blightfellArchitecture,
			alt: m.portfolio_blightfell_gallery_alt_architecture(),
		},
	];

	return (
		<PortfolioSubpageLayout
			heroImage={blightfellSite}
			heroImageAlt={m.portfolio_blightfell_hero_alt()}
			links={[
				{
					label: m.portfolio_blightfell_link_primary(),
					url: "https://blightfell.com",
					external: true,
				},
				{
					label: m.portfolio_blightfell_link_steam(),
					url: "https://store.steampowered.com/app/3883980/Blightfell/",
					external: true,
				},
			]}
			nextProject={{ title: m.portfolio_jorild_se_title(), slug: "jorild-se" }}
			projectRole={m.portfolio_blightfell_role()}
			subtitle={m.portfolio_blightfell_subtitle_long()}
			tags={["Web3", "Node.js", "PostgreSQL", "Game Backend", "API Design"]}
			techStack={[
				"Next.js",
				"React",
				"TypeScript",
				"Tailwind CSS",
				"Node.js",
				"Neon Postgres",
				"Upstash Redis",
				"Abstract Global Wallet",
				"Arbitrum L2",
			]}
			timeline={m.portfolio_blightfell_timeline()}
			title={m.portfolio_blightfell_title()}
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_blightfell_overview_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_blightfell_overview_body()}
				</p>
			</section>

			{/* Favor System Architecture */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_blightfell_architecture_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_blightfell_architecture_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_blightfell_architecture_list_1()}</li>
					<li>{m.portfolio_blightfell_architecture_list_2()}</li>
					<li>{m.portfolio_blightfell_architecture_list_3()}</li>
					<li>{m.portfolio_blightfell_architecture_list_4()}</li>
				</ul>
			</section>

			{/* Purchase Flow */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_blightfell_purchase_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_blightfell_purchase_body()}
				</p>
			</section>

			{/* Blood Moon Bundle */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_blightfell_bundle_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_blightfell_bundle_body()}
				</p>
			</section>

			{/* Gallery */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_blightfell_gallery_heading()}
				</h2>
				<ProjectImageGallery columns={2} images={galleryImages} />
			</section>
		</PortfolioSubpageLayout>
	);
}
