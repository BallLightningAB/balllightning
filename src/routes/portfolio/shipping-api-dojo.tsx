import { createFileRoute } from "@tanstack/react-router";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";

export const Route = createFileRoute("/portfolio/shipping-api-dojo")({
	head: () => ({
		meta: [
			{
				title:
					"Shipping API Dojo — Carrier API Tutorial Platform | Ball Lightning AB",
			},
			{
				name: "description",
				content:
					"Interactive learning platform for shipping carrier API integration — REST, SOAP, and incident scenarios for FedEx, UPS, DHL, and more.",
			},
			{
				property: "og:title",
				content: "Shipping API Dojo — Carrier API Tutorial Platform",
			},
			{
				property: "og:description",
				content:
					"Learn shipping carrier API integration through hands-on REST, SOAP, and incident scenarios.",
			},
			{
				property: "og:image",
				content: "/og-portfolio.png",
			},
			{
				property: "og:type",
				content: "article",
			},
		],
		links: [
			{
				rel: "canonical",
				href: generateCanonical("/portfolio/shipping-api-dojo"),
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdScript(
					generateProjectSchema({
						name: "Shipping API Dojo",
						description:
							"Interactive and Gamefied learning platform for shipping carrier API integration with REST, SOAP, and incident scenario training.",
						slug: "shipping-api-dojo",
						schemaType: "SoftwareApplication",
						applicationCategory: "EducationalApplication",
						operatingSystem: "Web",
						url: "https://api-trainer.balllightning.cloud",
						dateCreated: "2026-02",
						keywords: [
							"shipping API integration",
							"carrier API tutorial",
							"FedEx API",
							"UPS API",
							"DHL API",
						],
					})
				),
			},
		],
	}),
	component: ShippingApiDojoPage,
});

function ShippingApiDojoPage() {
	return (
		<PortfolioSubpageLayout
			heroGradient="linear-gradient(135deg, #3B82F6 0%, #22C55E 50%, #EAB308 100%)"
			links={[
				{
					label: "API Trainer (Live)",
					url: "https://api-trainer.balllightning.cloud",
					external: true,
				},
				{
					label: "GitHub",
					url: "https://github.com/BallLightningAB/api-trainer",
					external: true,
				},
			]}
			nextProject={{ title: "Blightfell", slug: "blightfell" }}
			projectRole="Creator & Developer"
			subtitle="Interactive and Gamefied learning platform for shipping carrier API integration"
			tags={["Education", "API Integration", "REST", "SOAP", "Developer Tools"]}
			techStack={[
				"TanStack Start",
				"React 19",
				"TypeScript",
				"Tailwind CSS",
				"shadcn/ui",
				"Vercel",
			]}
			timeline="2026 – Present"
			title="Shipping API Dojo"
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Overview</h2>
				<p className="text-muted-foreground leading-relaxed">
					Shipping API Dojo is an interactive and gamefied learning platform
					born from years of integrating carrier APIs at enterprise scale. It
					teaches developers how to work with FedEx, UPS, DHL, and other
					shipping providers through hands-on lessons, real API patterns, and
					incident scenarios that mirror production challenges. Progress is
					stored locally.
				</p>
			</section>

			{/* Learning Tracks */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Learning Tracks</h2>
				<div className="space-y-6">
					<div>
						<h3 className="mb-2 text-lg font-semibold text-foreground">
							REST Integration Track
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							Modern carrier APIs using RESTful patterns — authentication flows,
							rate quoting, label generation, tracking webhooks, and error
							handling for FedEx, UPS, and regional carriers.
						</p>
					</div>
					<div>
						<h3 className="mb-2 text-lg font-semibold text-foreground">
							SOAP Integration Track
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							Legacy carrier APIs still in active use — WSDL parsing, XML
							envelope construction, certificate auth, and migration strategies
							from SOAP to REST.
						</p>
					</div>
					<div>
						<h3 className="mb-2 text-lg font-semibold text-foreground">
							Incident Arena
						</h3>
						<p className="text-muted-foreground leading-relaxed">
							Scenario-based training where learners debug realistic shipping
							integration failures — rate limit storms, stale token cascades,
							label void races, and carrier outage fallbacks.
						</p>
					</div>
				</div>
			</section>

			{/* Wiki & Directory */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Wiki & Carrier Directory</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					A comprehensive reference directory covering major shipping carriers,
					their API capabilities, authentication methods, sandbox environments,
					and known quirks. Each entry includes quick-start guides and common
					pitfalls gathered from real integration projects.
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>Carrier-by-carrier API reference and comparison</li>
					<li>Authentication pattern guides (OAuth, API key, certificate)</li>
					<li>Sandbox setup walkthroughs</li>
					<li>Known edge cases and workarounds</li>
				</ul>
			</section>

			{/* Why This Exists */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Why This Exists</h2>
				<p className="text-muted-foreground leading-relaxed">
					Shipping API integration is one of the most under-documented areas in
					enterprise software. Carrier docs are often incomplete, inconsistent
					across regions, and assume deep domain knowledge. This platform exists
					to bridge that gap — giving developers a structured path from "never
					touched a shipping API" to "confidently integrating carriers in
					production."
				</p>
			</section>
		</PortfolioSubpageLayout>
	);
}
