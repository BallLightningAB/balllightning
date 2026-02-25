import { createFileRoute } from "@tanstack/react-router";
import blightfellArchitecture from "@/assets/portfolio/blightfell/blightfell-architecture.jpg";
import blightfellIngame from "@/assets/portfolio/blightfell/blightfell-ingame.jpg";
import blightfellSite from "@/assets/portfolio/blightfell/blightfell-site.jpg";
import blightfellSteam from "@/assets/portfolio/blightfell/blightfell-steam.jpg";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import { ProjectImageGallery } from "@/components/ui/project-image-gallery";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";

export const Route = createFileRoute("/portfolio/blightfell")({
	head: () => ({
		meta: [
			{
				title: "Blightfell — Web3 Game Integration | Ball Lightning AB",
			},
			{
				name: "description",
				content:
					"End-to-end Web3 integration for Blightfell: on-chain purchase flows, anti-double-spend protections, and server-to-server game backend APIs powering in-game currency.",
			},
			{
				property: "og:title",
				content: "Blightfell — Web3 Game Integration | Ball Lightning AB",
			},
			{
				property: "og:description",
				content:
					"End-to-end Web3 integration for Blightfell: on-chain purchase flows, anti-double-spend protections, and server-to-server game backend APIs.",
			},
			{
				property: "og:image",
				content: blightfellSite,
			},
			{
				property: "og:type",
				content: "article",
			},
		],
		links: [
			{
				rel: "canonical",
				href: generateCanonical("/portfolio/blightfell"),
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdScript(
					generateProjectSchema({
						name: "Blightfell — Web3 Game Integration",
						description:
							"End-to-end Web3 integration for a blockchain-integrated strategy autobattler, including on-chain purchase flows, anti-double-spend protections, and server-to-server game backend APIs.",
						slug: "blightfell",
						schemaType: "SoftwareApplication",
						applicationCategory: "GameApplication",
						url: "https://blightfell.com",
						dateCreated: "2025-09",
						keywords: [
							"web3 game integration",
							"blockchain game backend",
							"Node.js",
							"PostgreSQL",
						],
					})
				),
			},
		],
	}),
	component: BlightfellPage,
});

function BlightfellPage() {
	const galleryImages = [
		{
			src: blightfellSite,
			alt: "Blightfell.com — live purchase site where players connect a wallet and acquire Favor",
		},
		{
			src: blightfellSteam,
			alt: "Blightfell on Steam — Early Access store page",
		},
		{
			src: blightfellIngame,
			alt: "In-game Favor balance — spendable session currency UI",
		},
		{
			src: blightfellArchitecture,
			alt: "System architecture diagram showing the Favor economy: purchase flow, ledger, Redis guards, and game backend integrations",
		},
	];

	return (
		<PortfolioSubpageLayout
			heroImage={blightfellSite}
			heroImageAlt="Blightfell.com — purchase site for the Favor in-game currency"
			links={[
				{
					label: "Blightfell.com",
					url: "https://blightfell.com",
					external: true,
				},
				{
					label: "Steam Store Page",
					url: "https://store.steampowered.com/app/3883980/Blightfell/",
					external: true,
				},
			]}
			nextProject={{ title: "Jorild.se", slug: "jorild-se" }}
			projectRole="Lead Integrations Engineer"
			subtitle="End-to-end Web3 integration for a blockchain-integrated strategy autobattler"
			tags={["Web3", "Node.js", "PostgreSQL", "Game Backend", "API Design"]}
			techStack={[
				"Next.js",
				"React",
				"TypeScript",
				"Tailwind CSS",
				"Node.js",
				"Neon Postgres",
				"Upstash Redis",
				"Abstract Global Wallet",
				"Arbitrum L2",
			]}
			timeline="Sep 2025 – Present"
			title="Blightfell"
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Overview</h2>
				<p className="text-muted-foreground leading-relaxed">
					Blightfell is a blockchain-integrated strategy autobattler by Merlyn
					Labs. As Lead Integrations Engineer contracted through Ball Lightning
					AB, I owned the entire Favor system — the in-game currency that
					bridges on-chain purchases to gameplay. The work spans from the
					purchase UX on Blightfell.com through backend verification, ledger
					accounting, and Unity server-to-server endpoints.
				</p>
			</section>

			{/* Favor System Architecture */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Favor System Architecture</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					The Favor economy follows a strict pipeline: on-chain purchase →
					backend verification → Neon Postgres ledger entry → in-game balance
					update. Every transaction is idempotent and auditable, with recovery
					paths for failed states.
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>
						Wallet linking and auth flow integrated with Abstract Global Wallet
						and Arbitrum L2
					</li>
					<li>
						Idempotent ledger writes with full audit trail in Neon Postgres
					</li>
					<li>
						Anti-double-spend protections using Upstash Redis guards and
						distributed locks
					</li>
					<li>Credit and reconciliation cron jobs for production operations</li>
				</ul>
			</section>

			{/* Purchase Flow */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					Purchase Flow & Anti-Double-Spend
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					Built the Blightfell.com purchase experience using Next.js, React,
					TypeScript, Tailwind, and shadcn/ui. The flow covers auth + wallet
					linking, pricing/quantity UX, and transaction handoff to credit Favor
					reliably. Every spend operation uses Redis-backed guards and Neon
					ledger semantics to handle concurrency and retries safely.
				</p>
			</section>

			{/* Blood Moon Bundle */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Blood Moon Bundle</h2>
				<p className="text-muted-foreground leading-relaxed">
					Delivered the Blood Moon bundle flow spanning a second chain
					(Arbitrum) with automated crediting and airdrops to Abstract Global
					Wallet. This required integrating auth and ownership checks across
					multiple systems, coordinating cross-chain state, and building
					production-ready runbooks for Early Access operations.
				</p>
			</section>

			{/* Gallery */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Gallery</h2>
				<ProjectImageGallery columns={2} images={galleryImages} />
			</section>
		</PortfolioSubpageLayout>
	);
}
