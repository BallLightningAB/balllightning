import { createRouter } from "@tanstack/react-router";

import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime.js";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
		defaultStructuralSharing: true,
		defaultPreload: "intent",
		rewrite: {
			input: ({ url }) => deLocalizeUrl(url),
			output: ({ url }) => localizeUrl(url),
		},
	});

	return router;
};
