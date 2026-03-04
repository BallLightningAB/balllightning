import { createFileRoute } from "@tanstack/react-router";
import skyscraperHero from "@/assets/portfolio/skyscraper/skyscraper-hero-section.webp";
import skyscraperLogo from "@/assets/portfolio/skyscraper/skyscraper-logo.webp";
import skyscraperPlot from "@/assets/portfolio/skyscraper/skyscraper-plot.webp";
import skyscraperTrailer from "@/assets/portfolio/skyscraper/skyscraper-trailer.webm";
import skyscraperWp from "@/assets/portfolio/skyscraper/skyscraper-wp.webp";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import { ProjectImageGallery } from "@/components/ui/project-image-gallery";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/portfolio/skyscraper")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{
					title: m.portfolio_skyscraper_meta_title(),
				},
				{
					name: "description",
					content: m.portfolio_skyscraper_meta_description(),
				},
				{
					property: "og:title",
					content: m.portfolio_skyscraper_og_title(),
				},
				{
					property: "og:description",
					content: m.portfolio_skyscraper_og_description(),
				},
				{
					property: "og:image",
					content: skyscraperWp,
				},
				{
					property: "og:type",
					content: "article",
				},
			],
			links: [
				{
					rel: "canonical",
					href: generateCanonical("/portfolio/skyscraper", locale),
				},
			],
			scripts: [
				{
					type: "application/ld+json",
					children: jsonLdScript(
						generateProjectSchema({
							name: m.portfolio_skyscraper_schema_name(),
							description: m.portfolio_skyscraper_schema_description(),
							slug: "skyscraper",
							schemaType: "VideoGame",
							dateCreated: "2022",
							keywords: [
								"strategic MMO deckbattler",
								"game project management",
								"deckbuilding",
								"MMO",
							],
						})
					),
				},
			],
		};
	},
	component: SkyscraperPage,
});

function SkyscraperPage() {
	const galleryImages = [
		{
			src: skyscraperWp,
			alt: m.portfolio_skyscraper_gallery_alt_wallpaper(),
		},
		{
			src: skyscraperHero,
			alt: m.portfolio_skyscraper_gallery_alt_hero(),
		},
		{
			src: skyscraperPlot,
			alt: m.portfolio_skyscraper_gallery_alt_plot(),
		},
		{
			src: skyscraperLogo,
			alt: m.portfolio_skyscraper_gallery_alt_logo(),
		},
	];

	return (
		<PortfolioSubpageLayout
			heroImage={skyscraperWp}
			heroImageAlt={m.portfolio_skyscraper_hero_alt()}
			nextProject={{
				title: m.portfolio_chronomation_title(),
				slug: "chronomation",
			}}
			projectRole={m.portfolio_skyscraper_role()}
			subtitle={m.portfolio_skyscraper_subtitle_long()}
			tags={["Game Dev", "MMO", "Project Management", "Systems Design"]}
			techStack={[
				"Unity",
				"C#",
				"Node.js",
				"Discord.js",
				"Game Design",
				"Community Management",
			]}
			timeline={m.portfolio_skyscraper_timeline()}
			title={m.portfolio_skyscraper_schema_name()}
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_skyscraper_overview_heading()}
				</h2>
				<p className="text-muted-foreground leading-relaxed">
					{m.portfolio_skyscraper_overview_body()}
				</p>
			</section>

			{/* Key Features */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_skyscraper_features_heading()}
				</h2>
				<ul className="list-disc space-y-3 pl-5 text-muted-foreground">
					<li>
						<strong className="text-foreground">
							{m.portfolio_skyscraper_feature_1_title()}
						</strong>{" "}
						— {m.portfolio_skyscraper_feature_1_body()}
					</li>
					<li>
						<strong className="text-foreground">
							{m.portfolio_skyscraper_feature_2_title()}
						</strong>{" "}
						— {m.portfolio_skyscraper_feature_2_body()}
					</li>
					<li>
						<strong className="text-foreground">
							{m.portfolio_skyscraper_feature_3_title()}
						</strong>{" "}
						— {m.portfolio_skyscraper_feature_3_body()}
					</li>
					<li>
						<strong className="text-foreground">
							{m.portfolio_skyscraper_feature_4_title()}
						</strong>{" "}
						— {m.portfolio_skyscraper_feature_4_body()}
					</li>
				</ul>
			</section>

			{/* Accomplishments */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_skyscraper_accomplishments_heading()}
				</h2>
				<ul className="list-disc space-y-3 pl-5 text-muted-foreground">
					<li>{m.portfolio_skyscraper_accomplishments_list_1()}</li>
					<li>{m.portfolio_skyscraper_accomplishments_list_2()}</li>
					<li>{m.portfolio_skyscraper_accomplishments_list_3()}</li>
				</ul>
			</section>

			{/* Media Gallery */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					{m.portfolio_skyscraper_media_heading()}
				</h2>
				<ProjectImageGallery columns={2} images={galleryImages} />

				{/* Video player */}
				<div className="mt-6">
					<h3 className="mb-3 text-lg font-semibold">
						{m.portfolio_skyscraper_trailer_heading()}
					</h3>
					<div className="relative aspect-video overflow-hidden rounded-lg">
						<video
							className="h-full w-full object-cover"
							controls
							height={720}
							playsInline
							poster={skyscraperWp}
							preload="none"
							width={1280}
						>
							<source src={skyscraperTrailer} type="video/webm" />
							<track default kind="captions" label="English" />
							{m.portfolio_skyscraper_video_fallback()}
						</video>
					</div>
				</div>
			</section>
		</PortfolioSubpageLayout>
	);
}
