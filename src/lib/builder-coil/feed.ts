import { createServerFn } from "@tanstack/react-start";

export interface FeedItem {
	excerpt: string;
	image?: { url: string; alt: string };
	publishedAt: string;
	slug: string;
	title: string;
	type: "blog" | "news";
	url: string;
}

export interface FeedResponse {
	items: FeedItem[];
	updatedAt: string;
}

const FEED_URL = "https://thebuildercoil.com/api/feed";

async function fetchFeed(): Promise<FeedResponse | null> {
	try {
		const response = await fetch(FEED_URL, {
			signal: AbortSignal.timeout(5000),
		});

		if (!response.ok) {
			console.error("Builder Coil feed unavailable:", response.status);
			return null;
		}

		return (await response.json()) as FeedResponse;
	} catch (error) {
		console.error("Builder Coil feed error:", error);
		return null;
	}
}

export const getBuilderCoilFeed = createServerFn({ method: "GET" }).handler(
	async () => {
		return await fetchFeed();
	}
);
