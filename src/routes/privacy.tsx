import { createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
	BarChart3,
	Cookie,
	Info,
	Mail,
	Settings2,
	ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConsent } from "@/lib/consent/ConsentProvider";
import { generateCanonical } from "@/lib/seo/structured-data";
import * as m from "@/paraglide/messages.js";
import { getLocale } from "@/paraglide/runtime.js";

export const Route = createFileRoute("/privacy")({
	head: () => {
		const locale = getLocale();

		return {
			meta: [
				{ title: `${m.privacy_title()} | Ball Lightning AB` },
				{ name: "description", content: m.privacy_meta_description() },
				{
					property: "og:title",
					content: `${m.privacy_title()} | Ball Lightning AB`,
				},
				{
					property: "og:description",
					content: m.privacy_meta_description(),
				},
			],
			links: [
				{ rel: "canonical", href: generateCanonical("/privacy", locale) },
			],
		};
	},
	component: PrivacyPage,
});

interface SectionCardProps {
	icon: LucideIcon;
	title: string;
	children: ReactNode;
}

function SectionCard({ children, icon: Icon, title }: SectionCardProps) {
	return (
		<Card className="h-full border-border/70 bg-card/70 backdrop-blur">
			<CardHeader className="space-y-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-bl-red">
					<Icon className="h-5 w-5" />
				</div>
				<CardTitle className="font-heading text-2xl">{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3 text-muted-foreground text-sm leading-7">
				{children}
			</CardContent>
		</Card>
	);
}

function PrivacyPage() {
	const { openSettings } = useConsent();

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
							transition: { duration: 0.8, delayChildren: 0.08 },
						},
					},
					item: {
						hidden: { opacity: 0, y: 16 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.6 },
						},
					},
				}}
			>
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">
						{m.privacy_title()}
					</h1>
					<p className="text-balance text-lg text-muted-foreground">
						{m.privacy_subtitle()}
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<SectionCard icon={ShieldCheck} title={m.privacy_who_title()}>
						<p>{m.privacy_who_body_1()}</p>
						<p>{m.privacy_who_body_2()}</p>
						<a
							className="font-medium text-bl-red transition-colors hover:text-bl-rose hover:underline"
								href={`mailto:${m.privacy_contact_email()}`}
								>
								{m.privacy_contact_email()}
						</a>
					</SectionCard>

					<SectionCard icon={Info} title={m.privacy_scope_title()}>
						<p>{m.privacy_scope_body_1()}</p>
						<p>{m.privacy_scope_body_2()}</p>
					</SectionCard>

					<SectionCard icon={BarChart3} title={m.privacy_analytics_title()}>
						<p>{m.privacy_analytics_body_1()}</p>
						<p>{m.privacy_analytics_body_2()}</p>
						<p>{m.privacy_analytics_body_3()}</p>
						<p>{m.privacy_analytics_body_4()}</p>
					</SectionCard>

					<SectionCard icon={Settings2} title={m.privacy_consent_title()}>
						<p>{m.privacy_consent_body_1()}</p>
						<p>{m.privacy_consent_body_2()}</p>
						<Button
							className="mt-2 w-full sm:w-auto"
							onClick={openSettings}
							type="button"
							variant="outline"
						>
							{m.privacy_manage_button()}
						</Button>
					</SectionCard>

					<SectionCard icon={Cookie} title={m.privacy_cookies_title()}>
						<p>{m.privacy_cookies_body_1()}</p>
						<p>{m.privacy_cookies_body_2()}</p>
					</SectionCard>

					<SectionCard icon={Mail} title={m.privacy_contact_title()}>
						<p>{m.privacy_contact_body_1()}</p>
						<p>{m.privacy_contact_body_2()}</p>
						<a
							className="font-medium text-bl-red transition-colors hover:text-bl-rose hover:underline"
								href={`mailto:${m.privacy_contact_email()}`}
		>
								{m.privacy_contact_email()}
						</a>
					</SectionCard>
				</div>
			</AnimatedGroup>
		</div>
	);
}
