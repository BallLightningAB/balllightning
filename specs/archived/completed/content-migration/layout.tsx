import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../src/styles/globals.css";
import "../src/styles/variables.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { faviconConfig } from "./favicon/config";

const jost = Jost({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	display: "swap",
	variable: "--font-jost",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://balllightning.cloud"),
	title: "Ball Lightning AB",
	description: "Visionary development and innovation in gaming and tech",
	icons: {
		icon: faviconConfig.icons.icon,
		apple: faviconConfig.icons.apple,
		shortcut: faviconConfig.icons.icon[0],
	},
	openGraph: {
		title: "Ball Lightning AB",
		description: "Visionary development and innovation in gaming and tech",
		type: "website",
		url: "https://balllightning.cloud",
		images: [faviconConfig.icons.icon[0]],
	},
	twitter: {
		card: "summary_large_image",
		title: "Ball Lightning AB",
		description: "Visionary development and innovation in gaming and tech",
		images: [faviconConfig.icons.icon[0]],
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		noarchive: true,
		nosnippet: true,
		notranslate: true,
		noimageindex: true,
	},
};

export const viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#000000",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${jost.variable} scroll-smooth dark`}>
			<head>
				{/* Google tag (gtag.js) */}
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-XG6LNZ2FP6"
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XG6LNZ2FP6');
          `,
					}}
				/>
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body className="min-h-screen bg-[var(--color-primary)] text-white font-jost">
				<Header />
				<main role="main" className="relative z-10">
					{children}
				</main>
				<Footer />
				<script
					dangerouslySetInnerHTML={{
						__html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                    console.log('[SW Script] ServiceWorker registration successful with scope: ', registration.scope);
                    
                    // Check if the app is already installed
                    if (window.matchMedia('(display-mode: standalone)').matches) {
                      console.log('[SW Script] App is already installed');
                      return;
                    }

                    // Listen for the beforeinstallprompt event
                    let deferredPrompt;
                    window.addEventListener('beforeinstallprompt', (e) => {
                      e.preventDefault();
                      // Stash the event so it can be triggered later.
                      deferredPrompt = e;
                      console.log('[SW Script] beforeinstallprompt event saved.');
                    });
                  }, function(err) {
                    console.log('[SW Script] ServiceWorker registration failed: ', err);
                  });
                });
              }
            `,
					}}
				/>
			</body>
		</html>
	);
}
