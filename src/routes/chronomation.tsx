import { createFileRoute, Link } from "@tanstack/react-router";
import chronomationHero from "@/assets/portfolio/chronomation/chronomation-hero.webp";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/chronomation")({
	head: () => {
		const locale = getLocale();
		const canonical = generateCanonical("/chronomation", locale);

		return {
			meta: [
				{ title: m.chronomation_archive_meta_title() },
				{ name: "description", content: m.chronomation_archive_meta_description() },
				{ property: "og:title", content: m.chronomation_archive_og_title() },
				{
					property: "og:description",
					content: m.chronomation_archive_og_description(),
				},
				{ property: "og:image", content: "/og-portfolio.png" },
				{ property: "og:type", content: "article" },
			],
			links: [{ rel: "canonical", href: canonical }],
			scripts: [
				{
					type: "application/ld+json",
					children: jsonLdScript(
						generateProjectSchema({
							name: "Chronomation",
							description: m.chronomation_archive_schema_description(),
							slug: "chronomation",
							schemaType: "CreativeWork",
							url: canonical,
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
	component: ChronomationArchivePage,
});

function ChronomationArchivePage() {
	return (
		<div className="py-12 md:py-20">
			<AnimatedGroup
				className="container mx-auto max-w-5xl px-4"
				variants={{
					container: {
						hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
						visible: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: { duration: 0.8, delayChildren: 0.1 },
						},
					},
					item: {
						hidden: { opacity: 0, y: 16 },
						visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
					},
				}}
			>
				<div className="mb-10 overflow-hidden rounded-xl border border-border">
					<ResponsiveImage
						alt={m.chronomation_archive_hero_alt()}
						className="h-auto w-full object-cover"
						fetchPriority="high"
						height={600}
						loading="eager"
						src={chronomationHero}
						width={1200}
					/>
				</div>

				<div className="grid gap-10 md:grid-cols-[1fr_280px]">
					<main className="space-y-8">
						<div>
							<p className="mb-3 font-medium text-bl-red text-sm uppercase tracking-wide">
								{m.chronomation_archive_status()}
							</p>
							<h1 className="mb-4 font-bold text-4xl md:text-5xl">
								{m.chronomation_archive_title()}
							</h1>
							<p className="text-lg text-muted-foreground leading-relaxed">
								{m.chronomation_archive_intro()}
							</p>
						</div>

						<section>
							<h2 className="mb-3 font-semibold text-2xl">
								{m.chronomation_archive_why_heading()}
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{m.chronomation_archive_why_body()}
							</p>
						</section>

						<section>
							<h2 className="mb-3 font-semibold text-2xl">
								{m.chronomation_archive_now_heading()}
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{m.chronomation_archive_now_body()}
							</p>
						</section>
					</main>

					<aside className="space-y-6">
						<div>
							<h2 className="mb-3 font-semibold text-lg">
								{m.chronomation_archive_summary_heading()}
							</h2>
							<ul className="space-y-2 text-muted-foreground text-sm">
								<li>{m.chronomation_archive_summary_1()}</li>
								<li>{m.chronomation_archive_summary_2()}</li>
								<li>{m.chronomation_archive_summary_3()}</li>
								<li>{m.chronomation_archive_summary_4()}</li>
							</ul>
						</div>
						<Button asChild className="gap-2" variant="outline">
							<Link to="/portfolio/chronomation">
								{m.chronomation_archive_case_study_link()}
								<ArrowRightIcon size={16} />
							</Link>
						</Button>
					</aside>
				</div>
			</AnimatedGroup>
		</div>
	);
}
