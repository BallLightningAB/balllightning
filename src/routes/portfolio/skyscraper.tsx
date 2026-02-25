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

export const Route = createFileRoute("/portfolio/skyscraper")({
	head: () => ({
		meta: [
			{
				title:
					"Skyscraper — Empires Rise | Strategic MMO Deckbattler | Ball Lightning AB",
			},
			{
				name: "description",
				content:
					"Strategic MMO deckbattler set in 1980s Manhattan. Co-founded and managed from concept to live operations — game systems design, server architecture, and community management.",
			},
			{
				property: "og:title",
				content: "Skyscraper — Empires Rise | Ball Lightning AB",
			},
			{
				property: "og:description",
				content:
					"Strategic MMO deckbattler: game systems design, server architecture, and community management for a 2.5k+ Discord community.",
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
				href: generateCanonical("/portfolio/skyscraper"),
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdScript(
					generateProjectSchema({
						name: "Skyscraper — Empires Rise",
						description:
							"A massively multiplayer online deckbuilding strategy game set in 1980s Manhattan, combining tactical card battles with empire management.",
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
	}),
	component: SkyscraperPage,
});

function SkyscraperPage() {
	const galleryImages = [
		{
			src: skyscraperWp,
			alt: "Skyscraper — Empires Rise game wallpaper featuring the Manhattan skyline",
		},
		{
			src: skyscraperHero,
			alt: "Hero section from the Skyscraper website featuring game artwork and navigation",
		},
		{
			src: skyscraperPlot,
			alt: "Game plot visualization showing the narrative arc and story progression",
		},
		{
			src: skyscraperLogo,
			alt: "Skyscraper — Empires Rise logo",
		},
	];

	return (
		<PortfolioSubpageLayout
			heroImage={skyscraperWp}
			heroImageAlt="Skyscraper — Empires Rise game wallpaper"
			nextProject={{ title: "Chronomation", slug: "chronomation" }}
			projectRole="Co-Founder, COO & Lead Game Designer"
			subtitle="A massively multiplayer online deckbuilding strategy game set in 1980s Manhattan"
			tags={["Game Dev", "MMO", "Project Management", "Systems Design"]}
			techStack={[
				"Unity",
				"C#",
				"Node.js",
				"Discord.js",
				"Game Design",
				"Community Management",
			]}
			timeline="2022 – 2023"
			title="Skyscraper — Empires Rise"
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Project Overview</h2>
				<p className="text-muted-foreground leading-relaxed">
					An ambitious multiplayer online game that combined strategic deck
					battling with empire management in 1980s Manhattan. As one of three
					co-founders, serving as COO and Lead Game Designer from 2022–2023, I
					played a pivotal role in developing this project from concept to
					execution over 18 months of production.
				</p>
			</section>

			{/* Key Features */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Key Features</h2>
				<ul className="list-disc space-y-3 pl-5 text-muted-foreground">
					<li>
						<strong className="text-foreground">Dynamic Deck Battling</strong> —
						Real-time strategic battles using customizable decks filled with
						unique cards and infinite combinations.
					</li>
					<li>
						<strong className="text-foreground">Empire Management</strong> —
						Build and manage your own empire by constructing iconic Skyscrapers
						producing resources and cards for the deckbattles.
					</li>
					<li>
						<strong className="text-foreground">Cross-genre Play</strong> —
						Tactical deckbattles combined with strategic MMO empire management.
					</li>
					<li>
						<strong className="text-foreground">
							Rich Narrative Experience
						</strong>{" "}
						— A captivating storyline set in bustling 1980s Manhattan with rich
						lore and character development.
					</li>
				</ul>
			</section>

			{/* Accomplishments */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Accomplishments</h2>
				<ul className="list-disc space-y-3 pl-5 text-muted-foreground">
					<li>
						Co-founded the project, driving its vision from inception through
						successful community-building efforts.
					</li>
					<li>
						Managed cross-functional teams including staff coordination on
						Discord (2.5k+ members) and X (10k+ followers), overseeing external
						studios for game development and marketing.
					</li>
					<li>
						Built vibrant community engagement through events and social games
						that fostered player loyalty throughout 18 months of production.
					</li>
				</ul>
			</section>

			{/* Media Gallery */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Media</h2>
				<ProjectImageGallery columns={2} images={galleryImages} />

				{/* Video player */}
				<div className="mt-6">
					<h3 className="mb-3 text-lg font-semibold">Trailer</h3>
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
							Your browser does not support the video tag.
						</video>
					</div>
				</div>
			</section>
		</PortfolioSubpageLayout>
	);
}
