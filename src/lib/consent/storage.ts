import type { PersistedConsentState } from "@/lib/consent/types";

export const CONSENT_STORAGE_KEY = "bl_analytics_consent";

export function readPersistedConsentState(): PersistedConsentState | null {
	if (typeof window === "undefined") {
		return null;
	}

	const storedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY);

	if (storedValue === "accepted" || storedValue === "rejected") {
		return storedValue;
	}

	return null;
}

export function writePersistedConsentState(
	consentState: PersistedConsentState
): void {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(CONSENT_STORAGE_KEY, consentState);
}
