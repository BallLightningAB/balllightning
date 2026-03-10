import { Button } from "@/components/ui/button";
import { useConsent } from "@/lib/consent/ConsentProvider";
import * as m from "@/paraglide/messages.js";

export function CookieBanner() {
	const {
		acceptAnalytics,
		consentState,
		hasResolved,
		openSettings,
		rejectAnalytics,
	} = useConsent();

	if (!hasResolved || consentState !== "unknown") {
		return null;
	}

	return (
		<div className="fixed inset-x-0 bottom-0 z-[60] border-border border-t bg-background/95 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/85">
			<div className="container mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-end md:justify-between">
				<div className="max-w-3xl space-y-2">
					<h2 className="font-heading font-semibold text-base text-foreground">
						{m.cookie_banner_title()}
					</h2>
					<p className="text-muted-foreground text-sm">
						{m.cookie_banner_description()}
					</p>
				</div>
				<div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap md:justify-end">
					<Button onClick={acceptAnalytics} size="sm" type="button">
						{m.cookie_banner_accept()}
					</Button>
					<Button
						onClick={rejectAnalytics}
						size="sm"
						type="button"
						variant="outline"
					>
						{m.cookie_banner_reject()}
					</Button>
					<Button
						onClick={openSettings}
						size="sm"
						type="button"
						variant="ghost"
					>
						{m.cookie_banner_settings()}
					</Button>
				</div>
			</div>
		</div>
	);
}
