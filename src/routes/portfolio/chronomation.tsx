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
							schemaType: "SoftwareApplication",
							applicationCategory: "ProductivityApplication",
							operatingSystem: "Web",
							url: generateCanonical("/portfolio/chronomation", locale),
							dateCreated: "2025",
							keywords: [
								"BankID document signing",
								"PDF editor",
								"multi-tenant SaaS",
								"Swedish SME",
							],
						})
					),
				},
			],
		};
	},
	component: ChronomotionPage,
});

function ChronomotionPage() {
	return (
		<PortfolioSubpageLayout
			heroImage={chronomationHero}
			heroImageAlt={m.portfolio_chronomation_hero_alt()}
			links={[
				{
					label: m.portfolio_chronomation_link_primary(),
					url: "https://chronomation.com",
					external: true,
				},
			]}
			nextProject={{
				title: m.portfolio_the_builder_coil_title(),
				slug: "the-builder-coil",
			}}
			projectRole={m.portfolio_chronomation_role()}
			subtitle={m.portfolio_chronomation_subtitle_long()}
			tags={[
				"SaaS",
				"Multi-tenant",
				"BankID",
				"PDF Editor",
				"Content Automation",
			]}
			techStack={[
				"TanStack Start",
				"React 19",
				"TypeScript",
				"Tailwind CSS",
				"Neon Postgres",
				"Drizzle ORM",
				"BankID",
				"Vercel",
			]}
			timeline={m.portfolio_chronomation_timeline()}
			title={m.portfolio_chronomation_title()}
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_chronomation_overview_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_chronomation_overview_body()}
				</p>
			</section>

			{/* Core Product */}
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

			{/* Technical Architecture */}
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
			</section>

			{/* Build in Public */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_chronomation_build_public_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_chronomation_build_public_prefix()}{" "}
					<a
						className="text-bl-red hover:underline"
						href="https://thebuildercoil.com"
						rel="noopener noreferrer"
						target="_blank"
					>
						{m.portfolio_chronomation_build_public_link_text()}
					</a>
					, {m.portfolio_chronomation_build_public_suffix()}
				</p>

				{/* Screenshots */}
				<section>
					<h2 className="mb-4 text-2xl font-bold">
						{m.portfolio_chronomation_screenshots_heading()}
					</h2>
					{/* TODO: Add real screenshots when app alpha is ready. Uncomment the gallery below once
					images exist in src/assets/portfolio/chronomation/:
					- chronomation-app.webp — app.chronomation.com PDF editor or signing UI
					- chronomation-architecture.webp — architecture diagram showing multi-tenant setup
					<ProjectImageGallery
						columns={2}
						images={[
							{
								src: "/src/assets/portfolio/chronomation/chronomation-app.webp",
								alt: "Chronomation app interface showing PDF editor and BankID signing UI",
								width: 1200,
								height: 800,
							},
							{
								src: "/src/assets/portfolio/chronomation/chronomation-architecture.webp",
								alt: "Chronomation multi-tenant architecture diagram showing database and service layers",
								width: 1200,
								height: 800,
							},
						]}
					/>
					*/}
				</section>
			</section>
		</PortfolioSubpageLayout>
	);
}
