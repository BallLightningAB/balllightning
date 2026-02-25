import { createFileRoute } from "@tanstack/react-router";
import jorildAboutOsteopathy from "@/assets/portfolio/jorild-se/jorild-se-about-osteopathy.jpg";
import jorildAboutSection from "@/assets/portfolio/jorild-se/jorild-se-about-section.jpg";
import jorildGbp from "@/assets/portfolio/jorild-se/jorild-se-gbp.jpg";
import jorildHero from "@/assets/portfolio/jorild-se/jorild-se-hero-section.jpg";
import jorildKaddio from "@/assets/portfolio/jorild-se/jorild-se-kaddio-online-booking.jpg";
import jorildLanding from "@/assets/portfolio/jorild-se/jorild-se-landing-page.jpg";
import jorildServices from "@/assets/portfolio/jorild-se/jorild-se-services-section.jpg";
import { PortfolioSubpageLayout } from "@/components/layout/PortfolioSubpageLayout";
import { ProjectImageGallery } from "@/components/ui/project-image-gallery";
import {
	generateCanonical,
	generateProjectSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";

export const Route = createFileRoute("/portfolio/jorild-se")({
	head: () => ({
		meta: [
			{
				title: "Jorild.se — Bilingual Clinic Website | Ball Lightning AB",
			},
			{
				name: "description",
				content:
					"Modern bilingual website for Jorild Osteopati: Next.js 15, Swedish/English i18n, WCAG 2.1 AA accessibility, 100/100 Lighthouse SEO, and Google Business Profile integration.",
			},
			{
				property: "og:title",
				content: "Jorild.se — Bilingual Clinic Website | Ball Lightning AB",
			},
			{
				property: "og:description",
				content:
					"Modern bilingual website for a Swedish osteopathy clinic with i18n, accessibility, and performance-first architecture.",
			},
			{
				property: "og:image",
				content: jorildLanding,
			},
			{
				property: "og:type",
				content: "article",
			},
		],
		links: [
			{
				rel: "canonical",
				href: generateCanonical("/portfolio/jorild-se"),
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdScript(
					generateProjectSchema({
						name: "Jorild.se — Bilingual Clinic Website",
						description:
							"Modern bilingual website for Jorild Osteopati with Swedish/English i18n, WCAG 2.1 AA accessibility, and 100/100 Lighthouse SEO.",
						slug: "jorild-se",
						schemaType: "CreativeWork",
						url: "https://jorild.se",
						dateCreated: "2025-05",
						keywords: [
							"bilingual website",
							"Next.js clinic website",
							"i18n",
							"accessibility",
							"SEO",
						],
					})
				),
			},
		],
	}),
	component: JorildSePage,
});

function JorildSePage() {
	const galleryImages = [
		{
			src: jorildLanding,
			alt: "Jorild.se landing page — bilingual clinic website",
		},
		{
			src: jorildHero,
			alt: "Hero section with clinic branding, practitioner photo, and appointment call-to-action",
		},
		{
			src: jorildAboutOsteopathy,
			alt: "About Osteopathy informational section",
		},
		{
			src: jorildAboutSection,
			alt: "About the clinic section with practitioner information",
		},
		{
			src: jorildServices,
			alt: "Services section listing osteopathy treatment options with descriptions",
		},
		{
			src: jorildGbp,
			alt: "Google Business Profile integration showing clinic reviews and contact information",
		},
		{
			src: jorildKaddio,
			alt: "Kaddio online booking integration with calendar and appointment selection",
		},
	];

	return (
		<PortfolioSubpageLayout
			heroImage={jorildLanding}
			heroImageAlt="Jorild.se — bilingual osteopathy clinic website"
			links={[
				{
					label: "Jorild.se",
					url: "https://jorild.se",
					external: true,
				},
				{
					label: "Kaddio Online Booking",
					url: "https://kaddio.com/c/jorildosteopati",
					external: true,
				},
			]}
			nextProject={{ title: "Skyscraper", slug: "skyscraper" }}
			projectRole="Full-Stack Developer & Designer"
			subtitle="Modern bilingual website for a Swedish osteopathy clinic"
			tags={["Next.js", "i18n", "SEO", "Accessibility", "Google Business"]}
			techStack={[
				"Next.js 15",
				"React 19",
				"TypeScript",
				"Tailwind CSS",
				"shadcn/ui",
				"Edge Runtime",
			]}
			timeline="May – Jun 2025"
			title="Jorild.se"
		>
			{/* Overview */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Overview</h2>
				<p className="text-muted-foreground leading-relaxed">
					Designed and developed a modern, high-performance bilingual website
					for Jorild Osteopati, an osteopathy clinic in Sweden. The result is a
					conversion-focused, SEO-friendly platform delivering a seamless
					experience on both desktop and mobile, coupled with a new Google
					Business Profile. Integrated with Kaddio online booking.
				</p>
			</section>

			{/* i18n Implementation */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">i18n Implementation</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					Full Swedish/English bilingual support with geolocation-based language
					detection and a manual language switcher. Content is structured for
					both languages from the ground up, ensuring natural translations
					rather than machine-generated output.
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>Geolocation-based automatic language detection</li>
					<li>Manual language switch with persistent preference</li>
					<li>Fully localized content, metadata, and structured data</li>
				</ul>
			</section>

			{/* SEO & Google Business */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">
					SEO & Google Business Profile
				</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					Achieved a 100/100 Lighthouse SEO score with structured data for
					improved search visibility, optimized meta tags for both languages,
					and a new Google Business Profile connecting the clinic to local
					search results.
				</p>
			</section>

			{/* Performance & Accessibility */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Performance & Accessibility</h2>
				<p className="mb-4 text-muted-foreground leading-relaxed">
					WCAG 2.1 AA accessible with Core Web Vitals optimization throughout.
					Edge-optimized middleware, automatic image and font optimization, code
					splitting, and lazy loading ensure fast load times on all devices.
				</p>
				<ul className="list-disc space-y-2 pl-5 text-muted-foreground">
					<li>WCAG 2.1 AA compliance</li>
					<li>Core Web Vitals optimized</li>
					<li>Edge-optimized middleware for fast TTFB</li>
					<li>Automatic image optimization and lazy loading</li>
				</ul>
			</section>

			{/* Gallery */}
			<section>
				<h2 className="mb-4 text-2xl font-bold">Screenshots</h2>
				<ProjectImageGallery columns={2} images={galleryImages} />
			</section>
		</PortfolioSubpageLayout>
	);
}
