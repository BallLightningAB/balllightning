import { Globe } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getLocale, locales, localizeHref } from "@/paraglide/runtime.js";

const localeLabels: Record<string, string> = {
	en: "English",
	sv: "Svenska",
	de: "Deutsch",
	fr: "Français",
};

const localeFlags: Record<string, string> = {
	en: "🇬🇧",
	sv: "🇸🇪",
	de: "🇩🇪",
	fr: "🇫🇷",
};

export function LanguageSwitcher() {
	const currentLocale = getLocale();
	const currentPath =
		typeof window !== "undefined" ? window.location.pathname : "/";

	const handleLocaleChange = (newLocale: string) => {
		if (newLocale === currentLocale) {
			return;
		}
		const href = localizeHref(currentPath, { locale: newLocale });
		window.location.href = href;
	};

	return (
		<Select onValueChange={handleLocaleChange} value={currentLocale}>
			<SelectTrigger
				aria-label="Select language"
				className="h-9 w-auto gap-1.5 border-none bg-transparent px-2 text-muted-foreground shadow-none hover:text-foreground focus:ring-0"
			>
				<Globe className="h-4 w-4" />
				<SelectValue />
			</SelectTrigger>
			<SelectContent align="end">
				{locales.map((locale) => (
					<SelectItem key={locale} value={locale}>
						<span className="flex items-center gap-2">
							<span>{localeFlags[locale]}</span>
							<span>{localeLabels[locale]}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}

export function LanguageSwitcherMobile() {
	const currentLocale = getLocale();
	const currentPath =
		typeof window !== "undefined" ? window.location.pathname : "/";

	return (
		<div className="flex flex-wrap gap-2">
			{locales.map((locale) => {
				const isActive = locale === currentLocale;
				const href = localizeHref(currentPath, { locale });
				return (
					<a
						className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
							isActive
								? "bg-bl-red/10 text-bl-red"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
						href={href}
						key={locale}
					>
						<span>{localeFlags[locale]}</span>
						<span>{localeLabels[locale]}</span>
					</a>
				);
			})}
		</div>
	);
}
