"use client";
import React from "react";
import dynamic from "next/dynamic";
import NextImage from "next/image";
import chapterBg from "@/src/assets/backgrounds/chapter-1-bg.webp";
import chapterBgJpg from "@/src/assets/backgrounds/chapter-1-bg.jpg";
import skyscraperHeroSection from "@/src/assets/media/skyscraper-hero-section.webp";
import skyscraperPlot from "@/src/assets/media/skyscraper-plot.webp";
import skyscraperWallpaper from "@/src/assets/media/skyscraper-wp.webp";
import skyscraperTrailerWebm from "@/src/assets/media/skyscraper-trailer.webm";
import skyscraperTrailerMp4 from "@/src/assets/media/skyscraper-trailer.mp4";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChapterLayout } from "@/app/components/ChapterLayout";

// Lazy load the VideoPlayer component
const VideoPlayer = dynamic(() => import("@/app/components/VideoPlayer"), {
	ssr: false,
});

interface ChapterOneProps {
	id?: string;
}

export function ChapterOne({ id = "chapter-1" }: ChapterOneProps) {
	const sectionRef = React.useRef<HTMLElement>(null);
	const [isWebpFailed, setIsWebpFailed] = React.useState(false);

	// Handle image error
	const handleImageError = React.useCallback(() => {
		setIsWebpFailed(true);
	}, []);

	// Log video sources for debugging
	React.useEffect(() => {
		console.log("Video sources:", {
			webm: skyscraperTrailerWebm,
			mp4: skyscraperTrailerMp4,
			poster: skyscraperWallpaper,
		});
	}, []);

	// Scroll animation for content elements
	React.useEffect(() => {
		if (!sectionRef.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const animatedElements =
							entry.target.querySelectorAll(".scroll-animate");
						animatedElements.forEach((el, index) => {
							setTimeout(() => {
								el.classList.add("animate");
							}, index * 150);
						});
					}
				});
			},
			{ threshold: 0.1 }
		);
		observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	// Parallax scrolling effect with fading transition
	React.useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const section = sectionRef.current;
			if (section) {
				const sectionTop = section.offsetTop;
				const sectionHeight = section.clientHeight;
				const opacity =
					1 -
					Math.max(
						0,
						Math.min(1, (scrollPosition - sectionTop) / sectionHeight)
					);
				section.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			<section
				id={id}
				ref={sectionRef}
				className="relative min-h-screen w-full flex flex-col justify-center items-start snap-start"
			>
				{/* Background */}
				<div className="absolute inset-0 z-0">
					<img
						src={isWebpFailed ? chapterBgJpg.src : chapterBg.src}
						alt="Strategic MMO Deckbattler game environment with cityscape and game elements"
						className="absolute inset-0 w-full h-full object-cover"
						onError={handleImageError}
					/>
					<div className="absolute inset-0 bg-black/50" />
				</div>
				{/* Content */}
				<ChapterLayout className="chapter-content">
					<div className="relative z-10">
						<Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white overflow-hidden scroll-animate max-w-[1440px] mx-auto xl:max-w-[1440px]">
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
										Strategic MMO Deckbattler
										<br />
										<span className="text-2xl md:text-3xl lg:text-4xl">
											Skyscraper - Empires Rise
										</span>
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<div className="space-y-6">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div className="flex flex-col gap-4">
											<div className="overflow-hidden rounded-lg shadow-lg">
												<NextImage
													src={skyscraperWallpaper}
													alt="Game Wallpaper"
													width={600}
													height={400}
													className="w-full h-auto transition-transform duration-500 hover:scale-110"
													priority
												/>
											</div>
											<div className="overflow-hidden rounded-lg shadow-lg">
												<img
													src={skyscraperHeroSection.src}
													alt="Skyscraper Hero"
													className="w-full h-auto object-cover"
												/>
											</div>
										</div>
										<div className="overflow-hidden rounded-lg shadow-lg">
											<NextImage
												src={skyscraperPlot}
												alt="Game Plot Visualization"
												width={600}
												height={400}
												className="w-full h-auto transition-transform duration-500 hover:scale-110"
												priority
											/>
										</div>
									</div>
									<div>
										<h3 className="text-2xl md:text-3xl font-semibold mb-4">
											Project Overview
										</h3>
										<p className="text-white/70 text-lg mb-6">
											An ambitious multiplayer online game that combined
											strategic deck battling with empire management in a
											1980&#39;s Manhattan. As one of three co-founders, serving
											as COO and Lead Game Designer from 2022-2023, I played a
											pivotal role in developing this project from concept to
											execution.
										</p>
									</div>
									<div>
										<h3 className="text-2xl md:text-3xl font-semibold mb-4">
											Key Features
										</h3>
										<ul className="list-disc pl-5 space-y-2 text-white/80">
											<li>
												Dynamic Deck Battling: Engage in real-time strategic
												battles using customizable decks filled with unique
												cards and infinite combinations.
											</li>
											<li>
												Empires Management: Build and manage your own empire by
												constructing iconic Skyscrapers producing resources and
												cards for the deckbattles.
											</li>
											<li>
												Cross-genre Play: Tactical Deckbattles combined with
												Strategic MMO Empire Management.
											</li>
											<li>
												Rich Narrative Experience: Immerse yourself in a
												captivating storyline set in a bustling 1980&#39;s
												Manhattan complete with rich lore and character
												development.
											</li>
										</ul>
									</div>
									<div>
										<h3 className="text-2xl md:text-3xl font-semibold mb-4">
											Accomplishments
										</h3>
										<ul className="list-disc pl-5 space-y-2 text-white/80">
											<li>
												Co-founded the Strategic MMO Deckbattler Skyscraper -
												Empires Rise, driving its vision from inception through
												successful community-building efforts.
											</li>
											<li>
												Managed Cross-functional Teams, including staff
												coordination on Discord (2.5k+ members) & X (formerly
												Twitter, 10k+ members), overseeing external studios for
												game development & marketing, and fostering partnerships
												& events that elevated brand visibility within gaming
												communities.
											</li>
											<li>
												Built Vibrant Community Engagement, hosting numerous
												events and social games that fostered player loyalty
												despite the project&#39;s eventual cancellation after 18
												months of production.
											</li>
										</ul>
									</div>
									<React.Suspense
										fallback={
											<div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
												Loading video...
											</div>
										}
									>
										<VideoPlayer
											src={skyscraperTrailerWebm}
											fallbackSrc={skyscraperTrailerMp4}
											poster={skyscraperWallpaper.src}
											isAutoPlay={true}
										/>
									</React.Suspense>
								</div>
							</CardContent>
						</Card>
					</div>
				</ChapterLayout>
			</section>
		</>
	);
}
