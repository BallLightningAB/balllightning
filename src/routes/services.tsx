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

export const Route = createFileRoute("/services")({
	component: ServicesPage,
});

const serviceTiers = [
	{
		icon: Globe,
		title: "Landing Page",
		price: "From 15 000 SEK",
		description:
			"A single-page marketing site designed to convert visitors into leads or customers.",
		features: [
			"Responsive design (mobile-first)",
			"SEO-optimized structure",
			"Contact form integration",
			"Analytics setup",
			"Fast load times",
		],
	},
	{
		icon: Code,
		title: "Smart Site (Light)",
		price: "From 30 000 SEK",
		description:
			"A multi-page site with dynamic content, CMS integration, and advanced interactions.",
		features: [
			"Everything in Landing Page",
			"Multi-page routing",
			"CMS or headless content",
			"Blog / news section",
			"Custom components",
			"Performance optimization",
		],
		highlighted: true,
	},
	{
		icon: Puzzle,
		title: "Integrations & APIs",
		price: "Custom quote",
		description:
			"Connect your systems with third-party services, build APIs, or automate workflows.",
		features: [
			"REST / GraphQL API development",
			"Third-party service integration",
			"Data pipeline design",
			"Webhook implementations",
			"Authentication & authorization",
			"Documentation & handoff",
		],
	},
];

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
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">Services</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						From landing pages to complex integrations — we build fast, modern
						web applications that rank, convert, and scale. Every project ships
						with performance, SEO, and clean code baked in.
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
									Recommended
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
										Get Started
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
						Competence
					</h2>
					<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
						{competences.map((skill) => (
							<div
								className="rounded-lg border border-border bg-card/50 px-4 py-3 text-center text-sm font-medium transition-colors hover:border-bl-red/30 hover:bg-bl-red/5"
								key={skill}
							>
								{skill}
							</div>
						))}
					</div>
				</div>

				{/* Selected Work */}
				<div className="text-center">
					<h2 className="mb-4 font-semibold text-3xl">Selected Work</h2>
					<p className="mx-auto mb-8 max-w-xl text-muted-foreground">
						From game backends to clinic websites — six shipped projects across
						web, data, and game development.
					</p>
					<Button asChild className="gap-2" size="lg">
						<Link to="/portfolio">
							See Past Work
							<ArrowRight className="h-4 w-4" />
						</Link>
					</Button>
				</div>
			</AnimatedGroup>
		</div>
	);
}
