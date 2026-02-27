import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
	site: [
		{ href: "/", label: "Home" },
		{ href: "/services", label: "Services" },
		{ href: "/technologies", label: "Technologies" },
		{ href: "/portfolio", label: "Portfolio" },
		{ href: "/contact", label: "Contact" },
	],
	ecosystem: [
		{
			href: "https://thebuildercoil.com",
			label: "The Builder Coil",
			external: true,
		},
		{ href: "https://chronomation.com", label: "Chronomation", external: true },
		{
			href: "https://github.com/BallLightningAB",
			label: "GitHub",
			external: true,
		},
	],
};

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="border-border border-t bg-background">
			<div className="container mx-auto max-w-6xl px-4 py-12">
				<div className="grid gap-8 md:grid-cols-4">
					{/* Brand */}
					<div className="md:col-span-1">
						<Link className="flex items-center gap-2" to="/">
							<img
								alt="Ball Lightning AB"
								className="h-12 w-12"
								height={48}
								src="/logo-60.svg"
								width={48}
							/>
							<span className="font-heading font-semibold text-xl sm:text-3xl">
								Ball Lightning
							</span>
						</Link>
						<p className="mt-3 text-muted-foreground text-sm">
							Software consulting and product development. Full-stack web,
							systems integration, and AI-driven solutions.
						</p>
					</div>

					{/* Site Links */}
					<div>
						<h3 className="font-heading mb-3 font-semibold text-foreground text-sm">
							Site
						</h3>
						<ul className="space-y-2">
							{footerLinks.site.map((link) => (
								<li key={link.href}>
									<Link
										className="text-muted-foreground text-sm transition-colors hover:text-foreground"
										to={link.href}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Ecosystem */}
					<div>
						<h3 className="font-heading mb-3 font-semibold text-foreground text-sm">
							Ecosystem
						</h3>
						<ul className="space-y-2">
							{footerLinks.ecosystem.map((link) => (
								<li key={link.href}>
									<a
										className="text-muted-foreground text-sm transition-colors hover:text-foreground"
										href={link.href}
										rel="noopener noreferrer"
										target="_blank"
									>
										{link.label} ↗
									</a>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter CTA (link to TBC only) */}
					<div className="space-y-3">
						<h3 className="font-heading font-semibold text-foreground text-sm">
							The Upkeep
						</h3>
						<p className="text-muted-foreground text-sm">
							Devlogs and updates from The Builder Coil, our public builder's
							log.
						</p>
						<Button asChild className="gap-2" size="sm" variant="outline">
							<a
								href="https://thebuildercoil.com/newsletter"
								rel="noopener noreferrer"
								target="_blank"
							>
								Subscribe
								<ArrowRight className="h-4 w-4" />
							</a>
						</Button>
					</div>
				</div>

				{/* Bottom */}
				<div className="mt-8 flex flex-col items-center justify-between gap-4 border-border border-t pt-8 md:flex-row">
					<p className="text-muted-foreground text-sm">
						© {currentYear} Ball Lightning AB. All rights reserved.
					</p>
					<p className="text-muted-foreground text-sm">Mölndal, Sweden</p>
				</div>
			</div>
		</footer>
	);
}
