import { createFileRoute } from "@tanstack/react-router";
import jorildAboutOsteopathy from "@/assets/portfolio/jorild-se/jorild-se-about-osteopathy.webp";
import jorildAboutSection from "@/assets/portfolio/jorild-se/jorild-se-about-section.webp";
import jorildGbp from "@/assets/portfolio/jorild-se/jorild-se-gbp.webp";
import jorildHero from "@/assets/portfolio/jorild-se/jorild-se-hero-section.webp";
import jorildKaddio from "@/assets/portfolio/jorild-se/jorild-se-kaddio-online-booking.webp";
import jorildLanding from "@/assets/portfolio/jorild-se/jorild-se-landing-page.webp";
import jorildServices from "@/assets/portfolio/jorild-se/jorild-se-services-section.webp";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import { ProjectImageGallery } from "@/components/ui/project-image-gallery";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/portfolio/jorild-se")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{
					title: m.portfolio_jorild_se_meta_title(),
				},
				{
					name: "description",
					content: m.portfolio_jorild_se_meta_description(),
				},
				{
					property: "og:title",
					content: m.portfolio_jorild_se_og_title(),
				},
				{
					property: "og:description",
					content: m.portfolio_jorild_se_og_description(),
				},
				{
					property: "og:image",
					content: jorildLanding,
				},
				{
					property: "og:type",
					content: "article",
				},
			],
			links: [
				{
					rel: "canonical",
					href: generateCanonical("/portfolio/jorild-se", locale),
				},
			],
			scripts: [
				{
					type: "application/ld+json",
					children: jsonLdScript(
						generateProjectSchema({
							name: m.portfolio_jorild_se_schema_name(),
							description: m.portfolio_jorild_se_schema_description(),
							slug: "jorild-se",
							schemaType: "CreativeWork",
							url: "https://jorild.se",
							dateCreated: "2025-05",
							keywords: [
								"bilingual website",
								"Next.js clinic website",
								"i18n",
								"accessibility",
								"SEO",
							],
						})
					),
				},
			],
		};
	},
	component: JorildSePage,
});

function JorildSePage() {
	const galleryImages = [
		{
			src: jorildLanding,
			alt: m.portfolio_jorild_se_gallery_alt_landing(),
		},
		{
			src: jorildHero,
			alt: m.portfolio_jorild_se_gallery_alt_hero(),
		},
		{
			src: jorildAboutOsteopathy,
			alt: m.portfolio_jorild_se_gallery_alt_about_osteopathy(),
		},
		{
			src: jorildAboutSection,
			alt: m.portfolio_jorild_se_gallery_alt_about_clinic(),
		},
		{
			src: jorildServices,
			alt: m.portfolio_jorild_se_gallery_alt_services(),
		},
		{
			src: jorildGbp,
			alt: m.portfolio_jorild_se_gallery_alt_gbp(),
		},
		{
			src: jorildKaddio,
			alt: m.portfolio_jorild_se_gallery_alt_kaddio(),
		},
	];

	return (
		<PortfolioSubpageLayout
			heroImage={jorildLanding}
			heroImageAlt={m.portfolio_jorild_se_hero_alt()}
			links={[
				{
					label: m.portfolio_jorild_se_link_primary(),
					url: "https://jorild.se",
					external: true,
				},
				{
					label: m.portfolio_jorild_se_link_booking(),
					url: "https://kaddio.com/c/jorildosteopati",
					external: true,
				},
			]}
			nextProject={{
				title: m.portfolio_skyscraper_title(),
				slug: "skyscraper",
			}}
			projectRole={m.portfolio_jorild_se_role()}
			subtitle={m.portfolio_jorild_se_subtitle_long()}
			tags={["Next.js", "i18n", "SEO", "Accessibility", "Google Business"]}
			techStack={[
				"Next.js 15",
				"React 19",
				"TypeScript",
				"Tailwind CSS",
				"shadcn/ui",
				"Edge Runtime",
			]}
			timeline={m.portfolio_jorild_se_timeline()}
			title={m.portfolio_jorild_se_title()}
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_jorild_se_overview_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_jorild_se_overview_body()}
				</p>
			</section>

			{/* i18n Implementation */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_jorild_se_i18n_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_jorild_se_i18n_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_jorild_se_i18n_list_1()}</li>
					<li>{m.portfolio_jorild_se_i18n_list_2()}</li>
					<li>{m.portfolio_jorild_se_i18n_list_3()}</li>
				</ul>
			</section>

			{/* SEO & Google Business */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_jorild_se_seo_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_jorild_se_seo_body()}
				</p>
			</section>

			{/* Facebook & LinkedIn Management */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_jorild_se_social_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_jorild_se_social_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_jorild_se_social_list_1()}</li>
					<li>{m.portfolio_jorild_se_social_list_2()}</li>
					<li>{m.portfolio_jorild_se_social_list_3()}</li>
					<li>{m.portfolio_jorild_se_social_list_4()}</li>
					<li>{m.portfolio_jorild_se_social_list_5()}</li>
				</ul>
			</section>

			{/* Performance & Accessibility */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_jorild_se_performance_heading()}
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					{m.portfolio_jorild_se_performance_body()}
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>{m.portfolio_jorild_se_performance_list_1()}</li>
					<li>{m.portfolio_jorild_se_performance_list_2()}</li>
					<li>{m.portfolio_jorild_se_performance_list_3()}</li>
					<li>{m.portfolio_jorild_se_performance_list_4()}</li>
				</ul>
			</section>

			{/* Gallery */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_jorild_se_screenshots_heading()}
				</h2>
				<ProjectImageGallery columns={2} images={galleryImages} />
			</section>
		</PortfolioSubpageLayout>
	);
}
