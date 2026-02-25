import { Hero } from "./chapters/hero";
import { ChapterTwo } from "./chapters/chapter-2";
import { ChapterThree } from "./chapters/chapter-3";
import { ChapterFour } from "./chapters/chapter-4";
import { AboutTheFounder } from "./chapters/about-the-founder";
import React from "react";

// Lazy load components
// --- Hydration Debugging: Direct Import Test ---
// The following code is commented out for debugging hydration issues:
// const LazyConnect = React.lazy(() => import('./chapters/Connect').then(module => ({ default: module.Connect })));
// const LazyChapterOne = React.lazy(() => import('./chapters/chapter-1').then(module => ({ default: module.ChapterOne })));
import { Connect } from "./chapters/Connect";
import { ChapterOne } from "./chapters/chapter-1";

export default function Home() {
	return (
		<main className="relative overflow-hidden">
			{/* Header is in layout.tsx */}

			{/* Restore original scroll container classes */}
			{/* Add padding top to prevent overlap with fixed Header */}
			<div className="overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth pt-[100px]">
				<Hero />
				<AboutTheFounder />
				<ChapterFour />
				<ChapterThree />
				<ChapterTwo />

				{/* Lazy loaded components (commented out for hydration debugging) */}
				{/* <React.Suspense fallback={<div className="h-[100vh] flex items-center justify-center">Loading chapter...</div>}>
          <LazyChapterOne />
        </React.Suspense> */}
				{/* <React.Suspense fallback={<div className="h-[100vh] flex items-center justify-center">Loading...</div>}>
          <LazyConnect />
        </React.Suspense> */}
				{/* Direct import for hydration debugging */}
				<ChapterOne />
				<Connect />
			</div>
			{/* Footer is in layout.tsx */}
		</main>
	);
}
