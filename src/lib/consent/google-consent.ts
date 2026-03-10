import type {
	ConsentState,
	GtagConsentParameters,
	GtagArguments,
} from "@/lib/consent/types";

const CONSENT_DENIED: GtagConsentParameters = {
	ad_storage: "denied",
	analytics_storage: "denied",
	ad_user_data: "denied",
	ad_personalization: "denied",
};

const CONSENT_GRANTED: GtagConsentParameters = {
	ad_storage: "granted",
	analytics_storage: "granted",
	ad_user_data: "granted",
	ad_personalization: "granted",
};

function ensureDataLayer(): void {
	window.dataLayer = window.dataLayer || [];
}

function ensureGtagFunction(): void {
	ensureDataLayer();
	if (typeof window.gtag === "function") {
		return;
	}
	window.gtag = function (this: void, ..._args: GtagArguments) {
		// biome-ignore lint/complexity/noArguments: required for gtag queue semantics
		window.dataLayer.push(arguments);
	};
}

function syncGa4DisableFlag(isEnabled: boolean): void {
	const ga4Id = import.meta.env.VITE_GA4;

	if (!ga4Id || typeof window === "undefined") {
		return;
	}

	Reflect.set(window, `ga-disable-${ga4Id}`, !isEnabled);
	window.__blAnalyticsConsentGranted = isEnabled;
}

export function applyGoogleConsentDefaults(): void {
	if (typeof window === "undefined") {
		return;
	}

	ensureGtagFunction();
	syncGa4DisableFlag(false);

	if (window.__blConsentDefaultsApplied) {
		return;
	}

	window.gtag?.("consent", "default", CONSENT_DENIED);
	window.__blConsentDefaultsApplied = true;
}

export function updateGoogleConsent(consentState: ConsentState): void {
	if (typeof window === "undefined") {
		return;
	}

	applyGoogleConsentDefaults();

	if (consentState === "accepted") {
		syncGa4DisableFlag(true);
		window.gtag?.("consent", "update", CONSENT_GRANTED);
		return;
	}

	syncGa4DisableFlag(false);
	window.gtag?.("consent", "update", CONSENT_DENIED);
}
