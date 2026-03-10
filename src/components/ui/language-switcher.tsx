import { Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	deLocalizeUrl,
	getLocale,
	locales,
	localizeHref,
} from "@/paraglide/runtime.js";

const localeCodes: Record<string, string> = {
	en: "EN",
	sv: "SE",
	de: "DE",
	fr: "FR",
};

const localeFlags: Record<string, string> = {
	en: "🇬🇧",
	sv: "🇸🇪",
	de: "🇩🇪",
	fr: "🇫🇷",
};

function getCurrentDeLocalizedHref(): string {
	const currentUrl = new URL(window.location.href);
	const deLocalizedUrl = deLocalizeUrl(currentUrl);

	return `${deLocalizedUrl.pathname}${deLocalizedUrl.search}${deLocalizedUrl.hash}`;
}

export function LanguageSwitcher() {
	const currentLocale = getLocale();
	const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

	const handleLocaleChange = (newLocale: string) => {
		if (newLocale === currentLocale) {
			return;
		}

		const deLocalizedHref = getCurrentDeLocalizedHref();
		const href = localizeHref(deLocalizedHref, { locale: newLocale });

		window.location.href = href;
	};

	return (
		<Sheet onOpenChange={setLanguageMenuOpen} open={languageMenuOpen}>
			<SheetTrigger asChild>
				<Button
					aria-label="Select language"
					className="h-9 w-auto gap-1.5 border-none bg-transparent px-2 text-muted-foreground shadow-none hover:bg-transparent hover:text-foreground"
					size="icon"
					variant="ghost"
				>
					<Globe className="h-4 w-4" />
					<span className="ml-1.5">{localeCodes[currentLocale]}</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				className="w-[min(100vw,18rem)] max-w-full sm:max-w-[200px] md:w-[10vw] md:max-w-[120px]"
				side="right"
			>
				<SheetTitle className="sr-only">Language Menu</SheetTitle>
				<SheetDescription className="sr-only">
					Select your preferred language
				</SheetDescription>
				<nav className="px-4 py-4 mt-4 flex flex-col gap-4 items-center">
					{locales.map((locale) => {
						const isActive = locale === currentLocale;
						return (
							<button
								className={`flex items-center justify-center gap-3 font-medium text-lg transition-colors ${
									isActive ? "text-bl-red" : "text-foreground hover:text-bl-red"
								}`}
								key={locale}
								onClick={() => {
									setLanguageMenuOpen(false);
									handleLocaleChange(locale);
								}}
								type="button"
							>
								<span className="text-4xl">{localeFlags[locale]}</span>
							</button>
						);
					})}
				</nav>
			</SheetContent>
		</Sheet>
	);
}

export function LanguageSwitcherMobile() {
	const currentLocale = getLocale();

	return (
		<div className="grid grid-cols-2 gap-2">
			{locales.map((locale) => {
				const isActive = locale === currentLocale;
				// Use a simple base path for SSR - the actual navigation will be handled client-side
				const basePath = "/";
				const href = localizeHref(basePath, { locale });
				return (
					<a
						className={`inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-sm font-medium transition-colors min-h-[44px] ${
							isActive
								? "bg-bl-red/10 text-bl-red"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
						href={href}
						key={locale}
						onClick={(e) => {
							e.preventDefault();
							const deLocalizedHref = getCurrentDeLocalizedHref();
							const actualHref = localizeHref(deLocalizedHref, { locale });
							window.location.href = actualHref;
						}}
					>
						<span className="text-base">{localeFlags[locale]}</span>
						<span className="text-xs leading-tight">{localeCodes[locale]}</span>
					</a>
				);
			})}
		</div>
	);
}
