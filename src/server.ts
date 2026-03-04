// Import URLPattern polyfill for Vercel Node runtime compatibility if needed
if (typeof globalThis.URLPattern === "undefined") {
	await import("urlpattern-polyfill");
}

import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server.js";

const handler = createStartHandler(defaultStreamHandler);

export default createServerEntry({
	fetch(request: Request) {
		return paraglideMiddleware(request, async () => {
			const response = await handler(request);

			// Clone response to modify headers
			const clonedResponse = new Response(response.body, response);

			// Add authoritative cache-busting headers for HTML responses
			const contentType = clonedResponse.headers.get("content-type") || "";
			if (contentType.includes("text/html")) {
				// Vercel targeted headers - Vercel-CDN-Cache-Control has highest priority
				clonedResponse.headers.set("Cache-Control", "no-store");
				clonedResponse.headers.set("CDN-Cache-Control", "no-store");
				clonedResponse.headers.set("Vercel-CDN-Cache-Control", "no-store");
			}

			return clonedResponse;
		});
	},
});
