import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Code, Globe, Puzzle } from "lucide-react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { COMPETENCE_TO_SLUG } from "@/lib/technologies/data";
import * as m from "@/paraglide/messages.js";

export const Route = createFileRoute("/services")({
	component: ServicesPage,
});

function useServiceTiers() {
	return [
		{
			icon: Globe,
			title: m.services_tier_landing_title(),
			price: m.services_tier_landing_price(),
			description: m.services_tier_landing_description(),
			features: [
				m.services_tier_landing_f1(),
				m.services_tier_landing_f2(),
				m.services_tier_landing_f3(),
				m.services_tier_landing_f4(),
				m.services_tier_landing_f5(),
			],
		},
		{
			icon: Code,
			title: m.services_tier_smart_title(),
			price: m.services_tier_smart_price(),
			description: m.services_tier_smart_description(),
			features: [
				m.services_tier_smart_f1(),
				m.services_tier_smart_f2(),
				m.services_tier_smart_f3(),
				m.services_tier_smart_f4(),
				m.services_tier_smart_f5(),
				m.services_tier_smart_f6(),
			],
			highlighted: true,
		},
		{
			icon: Puzzle,
			title: m.services_tier_integrations_title(),
			price: m.services_tier_integrations_price(),
			description: m.services_tier_integrations_description(),
			features: [
				m.services_tier_integrations_f1(),
				m.services_tier_integrations_f2(),
				m.services_tier_integrations_f3(),
				m.services_tier_integrations_f4(),
				m.services_tier_integrations_f5(),
				m.services_tier_integrations_f6(),
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
	const serviceTiers = useServiceTiers();

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
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">
						{m.services_title()}
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						{m.services_subtitle()}
					</p>
				</div>

				{/* Service Tiers */}
				<div className="mb-20 grid gap-8 md:grid-cols-3">
					{serviceTiers.map((tier) => (
						<Card
							className={`relative flex flex-col ${
								tier.highlighted
									? "border-bl-red/40 shadow-[0_0_30px_rgba(221,58,40,0.1)]"
									: ""
							}`}
							key={tier.title}
						>
							{tier.highlighted && (
								<div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#DD3A28] to-[#FF7268] px-3 py-1 text-xs font-medium text-white">
									{m.services_recommended()}
								</div>
							)}
							<CardHeader>
								<tier.icon className="mb-3 h-8 w-8 text-bl-red" />
								<CardTitle className="text-xl">{tier.title}</CardTitle>
								<p className="font-semibold text-lg text-bl-red">
									{tier.price}
								</p>
								<CardDescription className="text-sm">
									{tier.description}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-1 flex-col">
								<ul className="mb-6 flex-1 space-y-2">
									{tier.features.map((feature) => (
										<li
											className="flex items-start gap-2 text-sm text-muted-foreground"
											key={feature}
										>
											<Check className="mt-0.5 h-4 w-4 shrink-0 text-bl-red" />
											{feature}
										</li>
									))}
								</ul>
								<Button
									asChild
									className="w-full gap-2"
									variant={tier.highlighted ? "default" : "outline"}
								>
									<Link to="/contact">
										{m.services_get_started()}
										<ArrowRight className="h-4 w-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Competence */}
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

				{/* Selected Work */}
				<div className="text-center">
					<h2 className="mb-4 font-semibold text-3xl">
						{m.services_selected_work_title()}
					</h2>
					<p className="mx-auto mb-8 max-w-xl text-muted-foreground">
						{m.services_selected_work_description()}
					</p>
					<Button asChild className="gap-2" size="lg">
						<Link to="/portfolio">
							{m.services_see_past_work()}
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</AnimatedGroup>
		</div>
	);
}
