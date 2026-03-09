export type ConsentState = "unknown" | "accepted" | "rejected";

export type PersistedConsentState = Exclude<ConsentState, "unknown">;

export type GoogleConsentValue = "granted" | "denied";

export type GtagCommand = "js" | "config" | "event" | "consent";

export interface GtagEventParameters {
	[key: string]: string | number | boolean | undefined;
}

export interface GtagConsentParameters {
	ad_storage?: GoogleConsentValue;
	analytics_storage?: GoogleConsentValue;
	ad_user_data?: GoogleConsentValue;
	ad_personalization?: GoogleConsentValue;
	wait_for_update?: number;
}

export type GtagParameters = GtagEventParameters | GtagConsentParameters;

export type GtagArguments =
	| [
			command: GtagCommand,
			targetOrAction: Date | string,
			params?: GtagParameters,
	  ]
	| [command: string, ...rest: unknown[]];

export type GtagFunction = (...args: GtagArguments) => void;

declare global {
	interface Window {
		dataLayer: unknown[];
		gtag?: GtagFunction;
		__blConsentDefaultsApplied?: boolean;
		__blAnalyticsConsentGranted?: boolean;
	}
}
