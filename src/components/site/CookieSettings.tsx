import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useConsent } from "@/lib/consent/ConsentProvider";
import * as m from "@/paraglide/messages.js";

export function CookieSettings() {
	const {
		acceptAnalytics,
		closeSettings,
		consentState,
		isSettingsOpen,
		rejectAnalytics,
	} = useConsent();

	const analyticsEnabled = consentState === "accepted";
	const statusMessage = analyticsEnabled
		? m.cookie_settings_status_on()
		: m.cookie_settings_status_off();

	return (
		<Sheet
			onOpenChange={(open) => (open ? undefined : closeSettings())}
			open={isSettingsOpen}
		>
			<SheetContent className="w-[min(100vw,28rem)] max-w-full" side="right">
				<SheetHeader className="pr-12">
					<SheetTitle>{m.cookie_settings_title()}</SheetTitle>
					<SheetDescription>{m.cookie_settings_description()}</SheetDescription>
				</SheetHeader>
				<div className="space-y-4 px-4 pb-4 sm:px-5">
					<div className="rounded-lg border border-border bg-muted/40 p-4">
						<p className="font-medium text-foreground text-sm">
							{m.cookie_settings_status_label()}
						</p>
						<p className="mt-1 text-muted-foreground text-sm">
							{statusMessage}
						</p>
					</div>
					<p className="text-muted-foreground text-sm">
						{m.cookie_settings_body()}
					</p>
				</div>
				<SheetFooter className="gap-3 sm:flex-row sm:justify-end">
					<Button
						className="h-auto w-full whitespace-normal px-4 py-3 text-center leading-tight sm:w-auto"
						onClick={acceptAnalytics}
						type="button"
					>
						{m.cookie_settings_accept()}
					</Button>
					<Button
						className="h-auto w-full whitespace-normal px-4 py-3 text-center leading-tight sm:w-auto"
						onClick={rejectAnalytics}
						type="button"
						variant="outline"
					>
						{m.cookie_settings_reject()}
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
