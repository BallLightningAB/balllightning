import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Layout } from "@/components/layout/Layout";
import {
	generateRootEntityGraphSchema,
	jsonLdScript,
} from "@/lib/seo/structured-data";
import appCss from "../styles.css?url";

function RootNotFound() {
	return (
		<main className="py-20">
			<div className="container mx-auto max-w-3xl px-4 text-center">
				<h1 className="mb-4 font-bold text-3xl">Page not found</h1>
				<p className="mb-6 text-muted-foreground">
					The page you are looking for does not exist.
				</p>
				<a className="text-bl-red hover:underline" href="/">
					Go back home
				</a>
			</div>
		</main>
	);
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Ball Lightning AB | Software Consulting & Development",
			},
			{
				name: "description",
				content:
					"Software consulting and product development. Full-stack web, systems integration, and AI-driven solutions by Ball Lightning AB.",
			},
			{
				name: "theme-color",
				content: "#DD3A28",
			},
			{
				name: "msapplication-TileColor",
				content: "#DD3A28",
			},
			// Open Graph
			{
				property: "og:title",
				content: "Ball Lightning AB | Software Consulting & Development",
			},
			{
				property: "og:description",
				content:
					"Software consulting and product development. Full-stack web, systems integration, and AI-driven solutions by Ball Lightning AB.",
			},
			{
				property: "og:image",
				content: "/og-home.png",
			},
			{
				property: "og:image:width",
				content: "1200",
			},
			{
				property: "og:image:height",
				content: "630",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "Ball Lightning AB",
			},
			// Twitter Card
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Ball Lightning AB | Software Consulting & Development",
			},
			{
				name: "twitter:description",
				content:
					"Software consulting and product development. Full-stack web, systems integration, and AI-driven solutions.",
			},
			{
				name: "twitter:image",
				content: "/og-home.png",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			// DNS prefetch for external domains
			{
				rel: "dns-prefetch",
				href: "https://api.github.com",
			},
			{
				rel: "dns-prefetch",
				href: "https://github.com",
			},
			// Prefetch likely next pages
			{
				rel: "prefetch",
				href: "/portfolio",
				as: "document",
			},
			{
				rel: "prefetch",
				href: "/services",
				as: "document",
			},
			// Preload only critical fonts used in initial render
			{
				rel: "preload",
				href: "/fonts/BigShouldersStencilText-400.ttf",
				as: "font",
				type: "font/ttf",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				href: "/fonts/JetBrainsMono-400.ttf",
				as: "font",
				type: "font/ttf",
				crossOrigin: "anonymous",
			},
			// Self-hosted fonts
			{
				rel: "stylesheet",
				href: "/fonts/fonts.css",
			},
			// Favicon
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "any",
			},
			{
				rel: "icon",
				href: "/favicon-16x16.png",
				sizes: "16x16",
				type: "image/png",
			},
			{
				rel: "icon",
				href: "/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			// Apple Touch Icon
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png",
			},
			// Manifest
			{
				rel: "manifest",
				href: "/site.webmanifest",
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: jsonLdScript(generateRootEntityGraphSchema()),
			},
		],
	}),
	notFoundComponent: RootNotFound,
	shellComponent: RootDocument,
	component: RootComponent,
});

function RootComponent() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	const isDev = import.meta.env.DEV;
	const ga4Id = import.meta.env.VITE_GA4;

	return (
		<html className="dark" lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="scroll-smooth">
				{children}
				{ga4Id && !isDev && (
					<>
						<script
							async
							src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
						/>
						<script
							dangerouslySetInnerHTML={{
								__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`,
							}}
							suppressHydrationWarning
						/>
					</>
				)}
				{isDev && (
					<TanStackDevtools
						config={{
							position: "bottom-right",
						}}
						plugins={[
							{
								name: "Tanstack Router",
								render: <TanStackRouterDevtoolsPanel />,
							},
						]}
					/>
				)}
				<Scripts />
			</body>
		</html>
	);
}
