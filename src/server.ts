import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";
import { createServerEntry } from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server.js";

const handler = createStartHandler(defaultStreamHandler);

export default createServerEntry({
	fetch(request: Request) {
		return paraglideMiddleware(request, () => handler(request));
	},
});
