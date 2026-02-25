import { createFileRoute } from "@tanstack/react-router";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";

export const Route = createFileRoute("/portfolio/chronomation")({
	head: () => ({
		meta: [
			{
				title:
					"Chronomation — Multi-tenant Productivity Platform | Ball Lightning AB",
			},
			{
				name: "description",
				content:
					"Multi-tenant productivity platform with PDF editing, BankID document signing, and content automation — built for Swedish SMEs.",
			},
			{
				property: "og:title",
				content: "Chronomation — Multi-tenant Productivity Platform",
			},
			{
				property: "og:description",
				content:
					"PDF editing, BankID document signing, and content automation for Swedish SMEs.",
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
				href: generateCanonical("/portfolio/chronomation"),
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdScript(
					generateProjectSchema({
						name: "Chronomation",
						description:
							"Multi-tenant productivity platform with PDF editing, BankID document signing, and content automation for Swedish SMEs.",
						slug: "chronomation",
						schemaType: "SoftwareApplication",
						applicationCategory: "ProductivityApplication",
						operatingSystem: "Web",
						url: "https://chronomation.com",
						dateCreated: "2025",
						keywords: [
							"BankID document signing",
							"PDF editor",
							"multi-tenant SaaS",
							"Swedish SME",
						],
					})
				),
			},
		],
	}),
	component: ChronomotionPage,
});

function ChronomotionPage() {
	return (
		<PortfolioSubpageLayout
			heroImage="/src/assets/portfolio/chronomation/chronomation-hero.webp"
			heroImageAlt="Chronomation landing page"
			links={[
				{
					label: "Chronomation.com",
					url: "https://chronomation.com",
					external: true,
				},
			]}
			nextProject={{
				title: "The Builder Coil",
				slug: "the-builder-coil",
			}}
			projectRole="Founder & Lead Developer"
			subtitle="Multi-tenant productivity platform with PDF editing and BankID signing as its main pillars"
			tags={[
				"SaaS",
				"Multi-tenant",
				"BankID",
				"PDF Editor",
				"Content Automation",
			]}
			techStack={[
				"TanStack Start",
				"React 19",
				"TypeScript",
				"Tailwind CSS",
				"Neon Postgres",
				"Drizzle ORM",
				"BankID",
				"Vercel",
			]}
			timeline="2025 – Present"
			title="Chronomation"
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Overview & Vision</h2>
				<p className="text-muted-foreground leading-relaxed">
					Chronomation is a multi-tenant Productivity Suite. Currently in active
					development, it targets Swedish SMEs who need streamlined document
					workflows with legally binding signatures via BankID.
				</p>
			</section>

			{/* Core Product */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					Core Product: PDF Editor & BankID Signing
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					The platform centers on two pillars: a collaborative PDF editor for
					creating and annotating documents, and a BankID integration for
					legally binding digital signatures — critical for contracts and
					agreements in the Swedish market.
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>In-browser PDF editing with annotation and markup tools</li>
					<li>BankID-verified document signing with audit trail</li>
					<li>Multi-tenant workspace isolation and user management</li>
					<li>Automated content generation from work artifacts</li>
				</ul>
			</section>

			{/* Technical Architecture */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Technical Architecture</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					Built on TanStack Start with React 19, using Neon Postgres with
					Drizzle ORM for multi-tenant data isolation. The architecture supports
					per-tenant configuration, role-based access, and edge-deployed
					middleware for fast response times across Sweden.
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>
						Multi-tenant data model with row-level security in Neon Postgres
					</li>
					<li>Drizzle ORM for type-safe database queries</li>
					<li>Edge-deployed on Vercel for sub-100ms TTFB</li>
					<li>BankID integration via official Swedish e-ID infrastructure</li>
				</ul>
			</section>

			{/* Build in Public */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Build-in-Public Journey</h2>
				<p className="text-muted-foreground leading-relaxed">
					Chronomation is being built publicly through{" "}
					<a
						className="text-bl-red hover:underline"
						href="https://thebuildercoil.com"
						rel="noopener noreferrer"
						target="_blank"
					>
						The Builder Coil
					</a>
					, documenting architecture decisions, technical challenges, and
					lessons learned. This transparency serves both as a learning resource
					for the developer community and as a marketing channel for the product
					itself.
				</p>

				{/* Screenshots */}
				<section>
					<h2 className="mb-4 text-2xl font-bold">Screenshots</h2>
					{/* TODO: Add real screenshots when app alpha is ready. Uncomment the gallery below once
					images exist in src/assets/portfolio/chronomation/:
					- chronomation-app.webp — app.chronomation.com PDF editor or signing UI
					- chronomation-architecture.webp — architecture diagram showing multi-tenant setup
					<ProjectImageGallery
						columns={2}
						images={[
							{
								src: "/src/assets/portfolio/chronomation/chronomation-app.webp",
								alt: "Chronomation app interface showing PDF editor and BankID signing UI",
								width: 1200,
								height: 800,
							},
							{
								src: "/src/assets/portfolio/chronomation/chronomation-architecture.webp",
								alt: "Chronomation multi-tenant architecture diagram showing database and service layers",
								width: 1200,
								height: 800,
							},
						]}
					/>
					*/}
				</section>
			</section>
		</PortfolioSubpageLayout>
	);
}
