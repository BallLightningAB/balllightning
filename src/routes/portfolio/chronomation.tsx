import { createFileRoute } from "@tanstack/react-router";
import chronomationHero from "@/assets/portfolio/chronomation/chronomation-hero.webp";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/portfolio/chronomation")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{
					title: m.portfolio_chronomation_meta_title(),
				},
				{
					name: "description",
					content: m.portfolio_chronomation_meta_description(),
				},
				{
					property: "og:title",
					content: m.portfolio_chronomation_og_title(),
				},
				{
					property: "og:description",
					content: m.portfolio_chronomation_og_description(),
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
					href: generateCanonical("/portfolio/chronomation", locale),
				},
			],
			scripts: [
				{
					type: "application/ld+json",
					children: jsonLdScript(
						generateProjectSchema({
							name: "Chronomation",
							description: m.portfolio_chronomation_schema_description(),
							slug: "chronomation",
							schemaType: "CreativeWork",
							url: generateCanonical("/portfolio/chronomation", locale),
							dateCreated: "2025",
							keywords: [
								"archived concept",
								"scheduling",
								"content automation",
								"AI-assisted workflows",
							],
						})
					),
				},
			],
		};
	},
	component: ChronomationPage,
});

function ChronomationPage() {
	return (
		<PortfolioSubpageLayout
			heroImage={chronomationHero}
			heroImageAlt={m.portfolio_chronomation_hero_alt()}
			links={[
				{
					label: m.portfolio_chronomation_link_primary(),
					url: "/chronomation",
				},
			]}
			nextProject={{
				title: m.portfolio_the_builder_coil_title(),
				slug: "the-builder-coil",
			}}
			projectRole={m.portfolio_chronomation_role()}
			subtitle={m.portfolio_chronomation_subtitle_long()}
			tags={[
				m.portfolio_tag_archived_concept(),
				m.portfolio_tag_scheduling(),
				m.portfolio_tag_content_automation(),
				m.portfolio_tag_ai(),
			]}
			techStack={[
				"TanStack Start",
				"React 19",
				"TypeScript",
				"Tailwind CSS",
				"Neon Postgres",
				"Drizzle ORM",
				"Vercel",
			]}
			timeline={m.portfolio_chronomation_timeline()}
			title={m.portfolio_chronomation_title()}
		>
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_chronomation_overview_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_chronomation_overview_body()}
				</p>
			</section>

			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_chronomation_core_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_chronomation_core_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_chronomation_core_list_1()}</li>
					<li>{m.portfolio_chronomation_core_list_2()}</li>
					<li>{m.portfolio_chronomation_core_list_3()}</li>
					<li>{m.portfolio_chronomation_core_list_4()}</li>
				</ul>
			</section>

			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_chronomation_tech_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_chronomation_tech_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_chronomation_tech_list_1()}</li>
					<li>{m.portfolio_chronomation_tech_list_2()}</li>
					<li>{m.portfolio_chronomation_tech_list_3()}</li>
					<li>{m.portfolio_chronomation_tech_list_4()}</li>
				</ul>
				<p className="mt-6 text-muted-foreground leading-relaxed">
					{m.portfolio_chronomation_archive_note()}
				</p>
			</section>
		</PortfolioSubpageLayout>
	);
}
