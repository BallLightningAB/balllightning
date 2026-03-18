import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { generateCanonical } from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale, localizeHref } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/portfolio/")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{ title: `${m.portfolio_title()} | Ball Lightning AB` },
				{ name: "description", content: m.portfolio_subtitle() },
				{
					property: "og:title",
					content: `${m.portfolio_title()} | Ball Lightning AB`,
				},
				{ property: "og:description", content: m.portfolio_subtitle() },
			],
			links: [
				{ rel: "canonical", href: generateCanonical("/portfolio", locale) },
			],
		};
	},
	component: PortfolioPage,
});

interface Project {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	tags: string[];
	externalUrl?: string;
	secondaryUrl?: string;
}

const projects: Project[] = [
	{
		slug: "chronomation",
		title: m.portfolio_chronomation_title(),
		subtitle: m.portfolio_chronomation_subtitle(),
		description: m.portfolio_chronomation_description(),
		tags: [
			m.portfolio_tag_saas(),
			m.portfolio_tag_multi_tenant(),
			m.portfolio_tag_bankid(),
			m.portfolio_tag_pdf_editor(),
			m.portfolio_tag_content_automation(),
		],
	},
	{
		slug: "the-builder-coil",
		title: m.portfolio_the_builder_coil_title(),
		subtitle: m.portfolio_the_builder_coil_subtitle(),
		description: m.portfolio_the_builder_coil_description(),
		tags: [
			m.portfolio_tag_tanstack_start(),
			m.portfolio_tag_cms(),
			m.portfolio_tag_seo(),
			m.portfolio_tag_newsletter(),
			m.portfolio_tag_full_stack(),
		],
		externalUrl: "https://thebuildercoil.com",
	},
	{
		slug: "shipping-api-dojo",
		title: m.portfolio_shipping_api_dojo_title(),
		subtitle: m.portfolio_shipping_api_dojo_subtitle(),
		description: m.portfolio_shipping_api_dojo_description(),
		tags: [
			m.portfolio_tag_education(),
			m.portfolio_tag_api_integration(),
			m.portfolio_tag_rest(),
			m.portfolio_tag_soap(),
			m.portfolio_tag_developer_tools(),
		],
	},
	{
		slug: "jorild-se",
		title: m.portfolio_jorild_se_title(),
		subtitle: m.portfolio_jorild_se_subtitle(),
		description: m.portfolio_jorild_se_description(),
		tags: [
			"Next.js",
			m.portfolio_tag_i18n(),
			m.portfolio_tag_seo(),
			m.portfolio_tag_accessibility(),
			m.portfolio_tag_google_business(),
		],
		externalUrl: "https://jorild.se",
	},
	{
		slug: "blightfell",
		title: m.portfolio_blightfell_title(),
		subtitle: m.portfolio_blightfell_subtitle(),
		description: m.portfolio_blightfell_description(),
		tags: [
			m.portfolio_tag_web3(),
			m.portfolio_tag_nodejs(),
			m.portfolio_tag_postgresql(),
			m.portfolio_tag_game_backend(),
			m.portfolio_tag_api_design(),
		],
		externalUrl: "https://blightfell.com",
		secondaryUrl: "https://store.steampowered.com/app/3883980/Blightfell/",
	},
	{
		slug: "skyscraper",
		title: m.portfolio_skyscraper_title(),
		subtitle: m.portfolio_skyscraper_subtitle(),
		description: m.portfolio_skyscraper_description(),
		tags: [
			m.portfolio_tag_game_dev(),
			m.portfolio_tag_mmo(),
			m.portfolio_tag_project_management(),
			m.portfolio_tag_systems_design(),
		],
	},
];

function PortfolioPage() {
	return (
		<div className="py-12 md:py-20">
			<AnimatedGroup
				className="container mx-auto max-w-6xl px-4"
				variants={{
					container: {
						hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
						visible: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: { duration: 0.9, delayChildren: 0.1 },
						},
					},
					item: {
						hidden: { opacity: 0, y: 16 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.7 },
						},
					},
				}}
			>
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">
						{m.portfolio_title()}
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						{m.portfolio_subtitle()}
					</p>
				</div>

				{/* Projects Grid */}
				<div className="grid gap-8 md:grid-cols-2">
					{projects.map((project) => (
						<Card
							className="group flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-bl-red/30 hover:shadow-lg"
							key={project.slug}
						>
							<CardHeader>
								<div className="mb-2 flex flex-wrap gap-2">
									{project.tags.map((tag) => (
										<span
											className="rounded-full bg-bl-red/10 px-2 py-0.5 text-xs font-medium text-bl-red"
											key={tag}
										>
											{tag}
										</span>
									))}
								</div>
								<CardTitle className="text-xl group-hover:text-bl-red transition-colors">
									{project.title}
								</CardTitle>
								<CardDescription>{project.subtitle}</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-1 flex-col">
								<p className="mb-4 flex-1 text-sm text-muted-foreground">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-3">
									<a
										className="inline-flex items-center gap-1 text-sm font-medium text-bl-red hover:underline"
										href={localizeHref(`/portfolio/${project.slug}`)}
									>
										{m.portfolio_view_case_study()}{" "}
										<ArrowRight className="h-3 w-3" />
									</a>
									{project.externalUrl && (
										<a
											className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-bl-red hover:underline"
											href={project.externalUrl}
											rel="noopener noreferrer"
											target="_blank"
										>
											{m.portfolio_visit_site()}{" "}
											<ExternalLink className="h-3 w-3" />
										</a>
									)}
									{project.secondaryUrl && (
										<a
											className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-bl-red hover:underline"
											href={project.secondaryUrl}
											rel="noopener noreferrer"
											target="_blank"
										>
											{m.portfolio_view_on_steam()}{" "}
											<ExternalLink className="h-3 w-3" />
										</a>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* CTA */}
				<div className="mt-16 text-center">
					<h2 className="mb-4 font-semibold text-2xl">
						{m.portfolio_cta_title()}
					</h2>
					<p className="mb-6 text-muted-foreground">
						{m.portfolio_cta_description()}
					</p>
					<Button asChild className="gap-2" size="lg">
						<Link to="/contact">
							{m.portfolio_cta_button()}
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</AnimatedGroup>
		</div>
	);
}
