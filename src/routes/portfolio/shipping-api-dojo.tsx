import { createFileRoute } from "@tanstack/react-router";
import sadArena from "@/assets/portfolio/shipping-api-dojo/sad-arena.webp";
import sadHero from "@/assets/portfolio/shipping-api-dojo/sad-hero.webp";
import sadLesson from "@/assets/portfolio/shipping-api-dojo/sad-lesson.webp";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import { ProjectImageGallery } from "@/components/ui/project-image-gallery";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/portfolio/shipping-api-dojo")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{
					title: m.portfolio_shipping_api_dojo_meta_title(),
				},
				{
					name: "description",
					content: m.portfolio_shipping_api_dojo_meta_description(),
				},
				{
					property: "og:title",
					content: m.portfolio_shipping_api_dojo_og_title(),
				},
				{
					property: "og:description",
					content: m.portfolio_shipping_api_dojo_og_description(),
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
					href: generateCanonical("/portfolio/shipping-api-dojo", locale),
				},
			],
			scripts: [
				{
					type: "application/ld+json",
					children: jsonLdScript(
						generateProjectSchema({
							name: "Shipping API Dojo",
							description: m.portfolio_shipping_api_dojo_schema_description(),
							slug: "shipping-api-dojo",
							schemaType: "SoftwareApplication",
							applicationCategory: "EducationalApplication",
							operatingSystem: "Web",
							url: "https://api-trainer.balllightning.cloud",
							dateCreated: "2026-02",
							keywords: [
								"shipping API integration",
								"carrier API tutorial",
								"FedEx API",
								"UPS API",
								"DHL API",
							],
						})
					),
				},
			],
		};
	},
	component: ShippingApiDojoPage,
});

function ShippingApiDojoPage() {
	return (
		<PortfolioSubpageLayout
			heroImage={sadHero}
			heroImageAlt={m.portfolio_shipping_api_dojo_hero_alt()}
			links={[
				{
					label: m.portfolio_shipping_api_dojo_link_live(),
					url: "https://api-trainer.balllightning.cloud",
					external: true,
				},
				{
					label: m.portfolio_shipping_api_dojo_link_github(),
					url: "https://github.com/BallLightningAB/api-trainer",
					external: true,
				},
			]}
			nextProject={{
				title: m.portfolio_blightfell_title(),
				slug: "blightfell",
			}}
			projectRole={m.portfolio_shipping_api_dojo_role()}
			subtitle={m.portfolio_shipping_api_dojo_subtitle_long()}
			tags={["Education", "API Integration", "REST", "SOAP", "Developer Tools"]}
			techStack={[
				"TanStack Start",
				"React 19",
				"TypeScript",
				"Tailwind CSS",
				"shadcn/ui",
				"Vercel",
			]}
			timeline={m.portfolio_shipping_api_dojo_timeline()}
			title={m.portfolio_shipping_api_dojo_title()}
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_shipping_api_dojo_overview_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_shipping_api_dojo_overview_body()}
				</p>
			</section>

			{/* Learning Tracks */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_shipping_api_dojo_tracks_heading()}
				</h2>
				<div className="space-y-6">
					<div>
						<h3 className="mb-2 text-lg font-semibold text-foreground">
							{m.portfolio_shipping_api_dojo_track_rest_heading()}
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							{m.portfolio_shipping_api_dojo_track_rest_body()}
						</p>
					</div>
					<div>
						<h3 className="mb-2 text-lg font-semibold text-foreground">
							{m.portfolio_shipping_api_dojo_track_soap_heading()}
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							{m.portfolio_shipping_api_dojo_track_soap_body()}
						</p>
					</div>
					<div>
						<h3 className="mb-2 text-lg font-semibold text-foreground">
							{m.portfolio_shipping_api_dojo_track_incident_heading()}
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							{m.portfolio_shipping_api_dojo_track_incident_body()}
						</p>
					</div>
				</div>
			</section>

			{/* Wiki & Directory */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_shipping_api_dojo_wiki_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_shipping_api_dojo_wiki_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_shipping_api_dojo_wiki_list_1()}</li>
					<li>{m.portfolio_shipping_api_dojo_wiki_list_2()}</li>
					<li>{m.portfolio_shipping_api_dojo_wiki_list_3()}</li>
					<li>{m.portfolio_shipping_api_dojo_wiki_list_4()}</li>
				</ul>
			</section>

			{/* Screenshots */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_shipping_api_dojo_screenshots_heading()}
				</h2>
				<ProjectImageGallery
					columns={2}
					images={[
						{
							src: sadLesson,
							alt: m.portfolio_shipping_api_dojo_gallery_alt_lesson(),
							width: 1200,
							height: 800,
						},
						{
							src: sadArena,
							alt: m.portfolio_shipping_api_dojo_gallery_alt_arena(),
							width: 1200,
							height: 800,
						},
					]}
				/>
			</section>
		</PortfolioSubpageLayout>
	);
}
