import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	readPersistedConsentState,
	writePersistedConsentState,
	CONSENT_STORAGE_KEY,
} from "@/lib/consent/storage";

/**
 * Reusable test for cookie consent storage
 * Can be copied to other TanStack Start projects with similar consent flows
 */
describe("Cookie Consent Storage", () => {
	const localStorageMock = {
		getItem: vi.fn(),
		setItem: vi.fn(),
		removeItem: vi.fn(),
		clear: vi.fn(),
	};

	beforeEach(() => {
		// Ensure window and localStorage exist
		global.window = {
			localStorage: localStorageMock,
		} as any;
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("reads accepted consent state from localStorage", () => {
		localStorageMock.getItem.mockReturnValue("accepted");

		const result = readPersistedConsentState();

		expect(result).toBe("accepted");
		expect(localStorageMock.getItem).toHaveBeenCalledWith(CONSENT_STORAGE_KEY);
	});

	it("reads rejected consent state from localStorage", () => {
		localStorageMock.getItem.mockReturnValue("rejected");

		const result = readPersistedConsentState();

		expect(result).toBe("rejected");
	});

	it("returns null for invalid consent state", () => {
		localStorageMock.getItem.mockReturnValue("invalid");

		const result = readPersistedConsentState();

		expect(result).toBeNull();
	});

	it("returns null when localStorage is empty", () => {
		localStorageMock.getItem.mockReturnValue(null);

		const result = readPersistedConsentState();

		expect(result).toBeNull();
	});

	it("returns null on server side (window undefined)", () => {
		// Testing server-side behavior
		global.window = undefined as any;

		const result = readPersistedConsentState();

		expect(result).toBeNull();

		// Restore window for other tests
		global.window = {} as any;
		global.localStorage = {
			getItem: vi.fn(),
			setItem: vi.fn(),
			removeItem: vi.fn(),
			clear: vi.fn(),
		} as any;
	});

	it("writes accepted consent state to localStorage", () => {
		writePersistedConsentState("accepted");

		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			CONSENT_STORAGE_KEY,
			"accepted"
		);
	});

	it("writes rejected consent state to localStorage", () => {
		writePersistedConsentState("rejected");

		expect(localStorageMock.setItem).toHaveBeenCalledWith(
			CONSENT_STORAGE_KEY,
			"rejected"
		);
	});

	it("does not write on server side (window undefined)", () => {
		// Testing server-side behavior
		global.window = undefined as any;

		writePersistedConsentState("accepted");

		expect(localStorageMock.setItem).not.toHaveBeenCalled();

		// Restore window for other tests
		global.window = {
			localStorage: localStorageMock,
		} as any;
	});
});
