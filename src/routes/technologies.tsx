import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";

import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { generateCanonical, jsonLdScript } from "@/lib/seo/structured-data";
import type { Technology } from "@/lib/technologies/data";
import {
	CATEGORY_LABELS,
	technologiesByCategory,
} from "@/lib/technologies/data";
import * as m from "@/paraglide/messages.js";

export const Route = createFileRoute("/technologies")({
	head: () => ({
		meta: [
			{
				title: "Technologies We Use | Ball Lightning AB",
			},
			{
				name: "description",
				content:
					"Full-stack technology expertise: React 19, TanStack Start, TypeScript, Node.js, PostgreSQL, Vercel, and more — with real project case studies for each.",
			},
			{
				property: "og:title",
				content: "Technologies We Use | Ball Lightning AB",
			},
			{
				property: "og:description",
				content:
					"Full-stack technology expertise with real project case studies. React, TanStack, TypeScript, Node.js, PostgreSQL, and more.",
			},
			{
				property: "og:image",
				content: "/og-home.png",
			},
			{
				property: "og:type",
				content: "website",
			},
		],
		links: [
			{
				rel: "canonical",
				href: generateCanonical("/technologies"),
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdScript(generateTechnologiesSchema()),
			},
		],
	}),
	component: TechnologiesPage,
});

function generateTechnologiesSchema() {
	const grouped = technologiesByCategory();
	const items = grouped.flatMap(([, techs]) => techs);

	return {
		"@context": "https://schema.org",
		"@type": "ItemList",
		name: "Technologies Used by Ball Lightning AB",
		description:
			"Full-stack technology expertise with real project case studies.",
		url: "https://balllightning.cloud/technologies",
		numberOfItems: items.length,
		itemListElement: items.map((tech, i) => ({
			"@type": "ListItem",
			position: i + 1,
			name: tech.name,
			description: tech.description,
			url: `https://balllightning.cloud/technologies#${tech.slug}`,
		})),
	};
}

function TechnologiesPage() {
	const grouped = technologiesByCategory();
	const categories = grouped.map(([cat]) => cat);

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
							transition: { duration: 0.7 },
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
				<div className="mb-12 text-center">
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">
						{m.technologies_title()}
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						{m.technologies_subtitle()}
					</p>
				</div>

				{/* Anchor navigation */}
				<nav
					aria-label="Technology categories"
					className="mb-16 flex flex-wrap justify-center gap-2"
				>
					{categories.map((cat) => (
						<a
							className="rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium transition-colors hover:border-bl-red/30 hover:bg-bl-red/5 hover:text-foreground"
							href={`#${cat}`}
							key={cat}
						>
							{CATEGORY_LABELS[cat]}
						</a>
					))}
				</nav>

				{/* Category sections */}
				{grouped.map(([category, techs]) => (
					<section className="mb-16" id={category} key={category}>
						<h2 className="mb-8 font-semibold text-2xl md:text-3xl">
							{CATEGORY_LABELS[category]}
						</h2>
						<div className="grid gap-6 md:grid-cols-2">
							{techs.map((tech) => (
								<TechnologyCard key={tech.slug} tech={tech} />
							))}
						</div>
					</section>
				))}

				{/* CTA */}
				<div className="mt-8 text-center">
					<h2 className="mb-4 font-semibold text-3xl">
						{m.technologies_cta_title()}
					</h2>
					<p className="mx-auto mb-8 max-w-xl text-muted-foreground">
						{m.technologies_cta_description()}
					</p>
					<div className="flex flex-wrap justify-center gap-4">
						<Button asChild className="gap-2" size="lg">
							<Link to="/portfolio">
								{m.technologies_cta_portfolio()}
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
						<Button asChild className="gap-2" size="lg" variant="outline">
							<Link to="/services">
								{m.technologies_cta_services()}
								<ArrowRight className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
			</AnimatedGroup>
		</div>
	);
}

function TechnologyCard({ tech }: { tech: Technology }) {
	return (
		<Card className="flex flex-col" id={tech.slug}>
			<CardHeader>
				<CardTitle className="text-lg">{tech.name}</CardTitle>
				<CardDescription className="text-sm leading-relaxed">
					{tech.description}
				</CardDescription>
			</CardHeader>
			<CardContent className="mt-auto">
				<p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
					{m.technologies_used_in()}
				</p>
				<div className="flex flex-wrap gap-2">
					{tech.projects.map((project) => (
						<Badge asChild key={project.slug} variant="secondary">
							<Link
								className="gap-1"
								to={`/portfolio/${project.slug}` as "/portfolio"}
							>
								{project.title}
								<ExternalLink className="h-3 w-3" />
							</Link>
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
