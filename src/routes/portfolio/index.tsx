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

export const Route = createFileRoute("/portfolio/")({
	component: PortfolioPage,
});

interface Project {
	slug: string;
	title: string;
	subtitle: string;
	description: string;
	tags: string[];
	image?: string;
	externalUrl?: string;
}

const projects: Project[] = [
	{
		slug: "blightfell",
		title: "Blightfell",
		subtitle: "Web3 Integration for a Strategy Autobattler",
		description:
			"Designed and implemented the Favor system for a blockchain-integrated autobattler — purchase flows, concurrency protection, and backend endpoints powering in-game currency mechanics.",
		tags: ["Web3", "Node.js", "PostgreSQL", "Game Backend", "API Design"],
	},
	{
		slug: "jorild-se",
		title: "Jorild.se",
		subtitle: "Modern Bilingual Clinic Website",
		description:
			"Built a fast, accessible bilingual website for a physiotherapy clinic. Features include Swedish/English content, Google Business integration, and performance-first architecture.",
		tags: ["Next.js", "i18n", "SEO", "Accessibility", "Google Business"],
		externalUrl: "https://jorild.se",
	},
	{
		slug: "skyscraper",
		title: "Skyscraper — Empires Rise",
		subtitle: "Strategic MMO Deckbattler",
		description:
			"A massively multiplayer online deckbuilding strategy game. Managed the project from concept to live operations, including game systems design, server architecture, and community management.",
		tags: ["Game Dev", "MMO", "Project Management", "Systems Design"],
	},
	{
		slug: "data-driven-systems",
		title: "Data-Driven Functional Systems",
		subtitle: "Enterprise Systems Design",
		description:
			"Designed and implemented data-driven functional systems for enterprise clients — optimizing data pipelines, reporting workflows, and cross-system integrations for measurable business impact.",
		tags: ["Data Engineering", "Systems Design", "ETL", "Analytics"],
	},
	{
		slug: "big-data-optimization",
		title: "Big Data Optimization",
		subtitle: "Performance at Scale",
		description:
			"Built high-performance data processing systems handling large-scale datasets. Focused on query optimization, caching strategies, and infrastructure tuning for throughput and reliability.",
		tags: ["Big Data", "Performance", "PostgreSQL", "Infrastructure"],
	},
	{
		slug: "the-builder-coil",
		title: "The Builder Coil",
		subtitle: "Developer Blog & Content Platform",
		description:
			"A public builder's log documenting the journey of shipping software. Built with TanStack Start, featuring a custom CMS, RSS feed API, newsletter system, and structured SEO — the same stack powering this site.",
		tags: ["TanStack Start", "CMS", "SEO", "Newsletter", "Full-Stack"],
		externalUrl: "https://thebuildercoil.com",
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
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">Portfolio</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						Shipped projects across game development, web applications, data
						engineering, and content platforms — each built to last.
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
								{project.externalUrl && (
									<a
										className="inline-flex items-center gap-1 text-sm text-bl-red hover:underline"
										href={project.externalUrl}
										rel="noopener noreferrer"
										target="_blank"
									>
										Visit site <ExternalLink className="h-3 w-3" />
									</a>
								)}
							</CardContent>
						</Card>
					))}
				</div>

				{/* CTA */}
				<div className="mt-16 text-center">
					<h2 className="mb-4 font-semibold text-2xl">
						Ready to build something?
					</h2>
					<p className="mb-6 text-muted-foreground">
						Tell us what you need and we'll scope it within 48 hours.
					</p>
					<Button asChild className="gap-2" size="lg">
						<Link to="/contact">
							Start a Conversation
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</AnimatedGroup>
		</div>
	);
}
