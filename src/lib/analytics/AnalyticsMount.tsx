import { Analytics } from "@vercel/analytics/react";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { GtagEventParameters } from "@/lib/consent/types";

type AnalyticsMode = "none" | "ga4" | "ga4_vercel_analytics";

function getAnalyticsMode(): AnalyticsMode {
	const mode = import.meta.env.VITE_ANALYTICS_MODE;

	if (mode === "ga4" || mode === "ga4_vercel_analytics") {
		return mode;
	}

	return "none";
}

export function AnalyticsMount() {
	const analyticsMode = getAnalyticsMode();
	const ga4Id = import.meta.env.VITE_GA4;
	const routerState = useRouterState();
	const [isGa4Ready, setIsGa4Ready] = useState(false);
	const pathname = routerState.location.pathname;
	const search = routerState.location.searchStr;
	const shouldRenderGa4 =
		(analyticsMode === "ga4" || analyticsMode === "ga4_vercel_analytics") &&
		Boolean(ga4Id);
	const shouldRenderVercelAnalytics = analyticsMode === "ga4_vercel_analytics";
	const pageLocation = useMemo(() => {
		if (typeof window === "undefined") {
			return `https://balllightning.cloud${pathname}${search}`;
		}

		return `${window.location.origin}${pathname}${search}`;
	}, [pathname, search]);

	useEffect(() => {
		if (!shouldRenderGa4 || typeof window === "undefined") {
			setIsGa4Ready(false);
			return;
		}

		if (typeof window.gtag === "function") {
			setIsGa4Ready(true);
		}
	}, [shouldRenderGa4]);

	useEffect(() => {
		if (
			!(shouldRenderGa4 && ga4Id && isGa4Ready) ||
			typeof window.gtag !== "function"
		) {
			return;
		}

		const pageViewParameters: GtagEventParameters = {
			page_title: document.title,
			page_path: `${pathname}${search}`,
			page_location: pageLocation,
			language: document.documentElement.lang || undefined,
		};

		window.gtag("event", "page_view", pageViewParameters);
	}, [isGa4Ready, pageLocation, pathname, search, shouldRenderGa4]);

	return (
		<>
			{shouldRenderGa4 ? (
				<>
					<script
						async
						src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
						onLoad={() => setIsGa4Ready(true)}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4Id}',{send_page_view:false});`,
						}}
						suppressHydrationWarning
					/>
				</>
			) : null}
			{shouldRenderVercelAnalytics ? <Analytics /> : null}
		</>
	);
}
