import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { ComponentType } from "react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { ArrowRightIcon } from "@/components/ui/arrow-right";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { EarthIcon } from "@/components/ui/earth";
import { FolderCodeIcon } from "@/components/ui/folder-code";
import { WebhookIcon } from "@/components/ui/webhook";
import { generateCanonical } from "@/lib/seo/structured-data";
import { COMPETENCE_TO_SLUG } from "@/lib/technologies/data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

type CapabilityIcon = ComponentType<{
	className?: string;
	size?: number;
}>;

interface CapabilityCard {
	description: string;
	features: string[];
	icon: CapabilityIcon;
	title: string;
}

export const Route = createFileRoute("/services")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{ title: `${m.services_title()} | Ball Lightning AB` },
				{ name: "description", content: m.services_subtitle() },
				{
					property: "og:title",
					content: `${m.services_title()} | Ball Lightning AB`,
				},
				{ property: "og:description", content: m.services_subtitle() },
			],
			links: [
				{ rel: "canonical", href: generateCanonical("/services", locale) },
			],
		};
	},
	component: ServicesPage,
});

function useCapabilityCards(): CapabilityCard[] {
	return [
		{
			icon: WebhookIcon,
			title: m.services_capability_integration_title(),
			description: m.services_capability_integration_description(),
			features: [
				m.services_capability_integration_f1(),
				m.services_capability_integration_f2(),
				m.services_capability_integration_f3(),
			],
		},
		{
			icon: EarthIcon,
			title: m.services_capability_web_title(),
			description: m.services_capability_web_description(),
			features: [
				m.services_capability_web_f1(),
				m.services_capability_web_f2(),
				m.services_capability_web_f3(),
			],
		},
		{
			icon: FolderCodeIcon,
			title: m.services_capability_ai_title(),
			description: m.services_capability_ai_description(),
			features: [
				m.services_capability_ai_f1(),
				m.services_capability_ai_f2(),
				m.services_capability_ai_f3(),
			],
		},
	];
}

const competences = [
	"TypeScript / JavaScript",
	"React / Next.js / TanStack",
	"Node.js / Server Functions",
	"PostgreSQL / Drizzle ORM",
	"TailwindCSS / shadcn/ui",
	"Vercel / Cloud Deployment",
	"SEO & Web Performance",
	"AI / LLM Integration",
	"Project Management",
	"Systems Design",
	"Data Engineering",
	"Agile / Scrum",
];

function ServicesPage() {
	const capabilityCards = useCapabilityCards();

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
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">
						{m.services_title()}
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						{m.services_subtitle()}
					</p>
				</div>

				<div className="mb-20 grid gap-8 md:grid-cols-3">
					{capabilityCards.map((capability) => (
						<Card
							className="flex flex-col transition-colors hover:border-bl-red/30"
							key={capability.title}
						>
							<CardHeader>
								<capability.icon className="mb-3 text-bl-red" size={32} />
								<CardTitle className="text-xl">{capability.title}</CardTitle>
								<CardDescription className="text-sm leading-relaxed">
									{capability.description}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ul className="space-y-2">
									{capability.features.map((feature) => (
										<li
											className="flex items-start gap-2 text-sm text-muted-foreground"
											key={feature}
										>
											<Check className="mt-0.5 h-4 w-4 shrink-0 text-bl-red" />
											{feature}
										</li>
									))}
								</ul>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mb-20">
					<h2 className="mb-8 text-center font-semibold text-3xl">
						{m.services_competence_title()}
					</h2>
					<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
						{competences.map((skill) => {
							const slug = COMPETENCE_TO_SLUG[skill];
							if (slug) {
								return (
									<Link
										className="rounded-lg border border-border bg-card/50 px-4 py-3 text-center text-sm font-medium transition-colors hover:border-bl-red/30 hover:bg-bl-red/5"
										hash={slug}
										key={skill}
										to="/technologies"
									>
										{skill}
									</Link>
								);
							}
							return (
								<div
									className="rounded-lg border border-border bg-card/50 px-4 py-3 text-center text-sm font-medium transition-colors hover:border-bl-red/30 hover:bg-bl-red/5"
									key={skill}
								>
									{skill}
								</div>
							);
						})}
					</div>
				</div>

				<div className="text-center">
					<h2 className="mb-4 font-semibold text-3xl">
						{m.services_selected_work_title()}
					</h2>
					<p className="mx-auto mb-8 max-w-xl text-muted-foreground">
						{m.services_selected_work_description()}
					</p>
					<Button asChild className="gap-2" size="lg" variant="outline">
						<Link to="/portfolio">
							{m.services_see_past_work()}
							<ArrowRightIcon size={16} />
						</Link>
					</Button>
				</div>
			</AnimatedGroup>
		</div>
	);
}
