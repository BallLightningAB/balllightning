import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { AtSignIcon } from "@/components/ui/at-sign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkIcon as UrlLinkIcon } from "@/components/ui/link";
import { MapPinIcon } from "@/components/ui/map-pin";
import { generateCanonical } from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

const contactLinks = [
	{
		href: "mailto:info@balllightning.cloud",
		label: "info@balllightning.cloud",
		title: "Email",
	},
	{
		href: "https://linkedin.com/in/nicolas-brulay-vip",
		label: "Nicolas Brulay",
		title: "LinkedIn",
	},
	{
		href: "https://github.com/BallLightningAB",
		label: "BallLightningAB",
		title: "GitHub",
	},
	{
		href: "https://x.com/BallLightningAB",
		label: "@BallLightningAB",
		title: "X",
	},
];

export const Route = createFileRoute("/contact")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{ title: `${m.contact_title()} | Ball Lightning AB` },
				{ name: "description", content: m.contact_subtitle() },
				{
					property: "og:title",
					content: `${m.contact_title()} | Ball Lightning AB`,
				},
				{ property: "og:description", content: m.contact_subtitle() },
			],
			links: [
				{ rel: "canonical", href: generateCanonical("/contact", locale) },
			],
		};
	},
	component: ContactPage,
});

function ContactPage() {
	return (
		<div className="py-12 md:py-20">
			<AnimatedGroup
				className="container mx-auto max-w-4xl px-4"
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
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">
						{m.contact_title()}
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						{m.contact_subtitle()}
					</p>
				</div>

				<div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center gap-2 text-xl">
								<AtSignIcon className="text-bl-red" size={18} />
								{m.contact_direct_title()}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-5">
							<p className="text-muted-foreground leading-relaxed">
								{m.contact_direct_body()}
							</p>
							<div className="grid gap-3">
								{contactLinks.map((link) => (
									<a
										className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card/50 px-4 py-3 text-sm transition-colors hover:border-bl-red/40 hover:text-bl-red"
										href={link.href}
										key={link.href}
										rel={
											link.href.startsWith("mailto:")
												? undefined
												: "noopener noreferrer"
										}
										target={link.href.startsWith("mailto:") ? undefined : "_blank"}
									>
										<span>
											<span className="block font-medium">{link.title}</span>
											<span className="text-muted-foreground">{link.label}</span>
										</span>
										{link.href.startsWith("mailto:") ? (
											<AtSignIcon className="h-4 w-4 shrink-0" />
										) : (
											<ExternalLink className="h-4 w-4 shrink-0" />
										)}
									</a>
								))}
							</div>
						</CardContent>
					</Card>

					<div className="space-y-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2 text-base">
									<MapPinIcon className="text-bl-rose" size={16} />
									{m.contact_info_location()}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground">
									{m.contact_info_location_value()}
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2 text-base">
									<UrlLinkIcon className="text-bl-ember" size={16} />
									{m.contact_context_title()}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{m.contact_context_body()}
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</AnimatedGroup>
		</div>
	);
}
