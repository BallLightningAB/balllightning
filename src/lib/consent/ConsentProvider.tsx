import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";
import {
	applyGoogleConsentDefaults,
	updateGoogleConsent,
} from "@/lib/consent/google-consent";
import {
	readPersistedConsentState,
	writePersistedConsentState,
} from "@/lib/consent/storage";
import type { ConsentState, PersistedConsentState } from "@/lib/consent/types";

interface ConsentContextValue {
	analyticsEnabled: boolean;
	consentState: ConsentState;
	hasResolved: boolean;
	isSettingsOpen: boolean;
	acceptAnalytics: () => void;
	closeSettings: () => void;
	openSettings: () => void;
	rejectAnalytics: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

function useConsentState(): ConsentContextValue {
	const [consentState, setConsentState] = useState<ConsentState>("unknown");
	const [hasResolved, setHasResolved] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	useEffect(() => {
		applyGoogleConsentDefaults();

		const persistedConsentState = readPersistedConsentState();

		if (persistedConsentState) {
			updateGoogleConsent(persistedConsentState);
			setConsentState(persistedConsentState);
		}

		setHasResolved(true);
	}, []);

	const setPersistedConsentState = useCallback(
		(nextConsentState: PersistedConsentState) => {
			writePersistedConsentState(nextConsentState);
			updateGoogleConsent(nextConsentState);
			setConsentState(nextConsentState);
			setHasResolved(true);
			setIsSettingsOpen(false);
		},
		[]
	);

	const openSettings = useCallback(() => {
		setIsSettingsOpen(true);
	}, []);

	const closeSettings = useCallback(() => {
		setIsSettingsOpen(false);
	}, []);

	const acceptAnalytics = useCallback(() => {
		setPersistedConsentState("accepted");
	}, [setPersistedConsentState]);

	const rejectAnalytics = useCallback(() => {
		setPersistedConsentState("rejected");
	}, [setPersistedConsentState]);

	return useMemo(
		() => ({
			analyticsEnabled: hasResolved && consentState === "accepted",
			consentState,
			hasResolved,
			isSettingsOpen,
			acceptAnalytics,
			closeSettings,
			openSettings,
			rejectAnalytics,
		}),
		[
			acceptAnalytics,
			closeSettings,
			consentState,
			hasResolved,
			isSettingsOpen,
			openSettings,
			rejectAnalytics,
		]
	);
}

export function ConsentProvider({ children }: { children: ReactNode }) {
	const value = useConsentState();

	return (
		<ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
	);
}

export function useConsent(): ConsentContextValue {
	const context = useContext(ConsentContext);

	if (!context) {
		throw new Error("useConsent must be used within a ConsentProvider");
	}

	return context;
}
