"use client";
import React from "react";
import heroBgWebp from "@/src/assets/backgrounds/hero-bg.webp";
import heroVideoWebm from "@/src/assets/media/bl-logo-animated-12s-1080p-60fps.webm";
import heroVideoMp4 from "@/src/assets/media/bl-logo-animated-12s-1080p-60fps.mp4";

interface HeroProps {
	id?: string;
}

export function Hero({ id = "hero" }: HeroProps) {
	const [scrollPosition, setScrollPosition] = React.useState(0);
	const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
	const [isVideoError, setIsVideoError] = React.useState(false);
	const heroRef = React.useRef<HTMLElement>(null);
	const videoRef = React.useRef<HTMLVideoElement>(null);

	// Handle video sources
	const webmVideoSrc = React.useMemo(() => {
		console.log("Hero WebM source:", heroVideoWebm);
		return heroVideoWebm;
	}, []);

	const mp4VideoSrc = React.useMemo(() => {
		console.log("Hero MP4 source:", heroVideoMp4);
		return heroVideoMp4;
	}, []);

	React.useEffect(() => {
		const handleScroll = () => {
			setScrollPosition(window.scrollY);
			// Keep video playing as long as hero is partially visible
			if (videoRef.current && heroRef.current) {
				const heroRect = heroRef.current.getBoundingClientRect();
				const isHeroVisible =
					heroRect.bottom > 0 && heroRect.top < window.innerHeight;
				if (isHeroVisible) {
					const playPromise = videoRef.current.play();
					if (playPromise !== undefined) {
						playPromise.catch((error) => {
							console.error("Hero video play failed:", error);
						});
					}
				}
			}
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Handle video loading and errors
	const handleVideoLoaded = React.useCallback(() => {
		console.log("Hero video loaded successfully");
		setIsVideoLoaded(true);
		setIsVideoError(false);
		if (videoRef.current) {
			const playPromise = videoRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((error) => {
					console.error("Hero video play failed:", error);
					setIsVideoError(true);
				});
			}
		}
	}, []);

	const handleVideoError = React.useCallback((e: Event) => {
		console.error("Hero video failed to load:", e);
		setIsVideoLoaded(false);
		setIsVideoError(true);
	}, []);

	// Ensure video plays on mount
	React.useEffect(() => {
		if (videoRef.current) {
			const playPromise = videoRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((error) => {
					console.error("Hero video autoplay failed:", error);
				});
			}
		}
	}, []);

	// Calculate parallax effect based on scroll position
	const parallaxOffset = Math.max(-200, scrollPosition * 0.4);
	// Adjust opacity to fade out more gradually
	const opacityValue = Math.max(0, 1 - scrollPosition / 1500);

	return (
		<section
			id={id}
			ref={heroRef}
			className="relative full-height w-full overflow-hidden flex flex-col justify-center items-center snap-start"
		>
			{/* Video Background with Fallback */}
			<div className="absolute inset-0 z-0">
				<video
					ref={videoRef}
					className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
						isVideoLoaded && !isVideoError ? "opacity-100" : "opacity-0"
					}`}
					style={{
						transform: `translateY(${parallaxOffset}px)`,
						opacity: opacityValue,
					}}
					autoPlay
					muted
					loop
					playsInline
					preload="auto"
					onLoadedData={handleVideoLoaded}
					onError={handleVideoError}
					poster={heroBgWebp.src}
					aria-label="Ball Lightning logo animation"
					aria-describedby="video-description"
				>
					<source src={webmVideoSrc} type="video/webm" />
					<source src={mp4VideoSrc} type="video/mp4" />
					<div id="video-description" className="visually-hidden">
						Ball Lightning logo animation showing the company&#39;s brand
						identity. The logo begins to form, with elements animating into
						position. The logo completes its transformation, pulses, and
						stabilizes in a continuous loop.
					</div>
				</video>
				{/* Background Overlay */}
				<div className="absolute inset-0 bg-black/40 z-10" aria-hidden="true" />
				{/* Hero Content */}
				<div className="relative z-20 w-[90vw] mx-auto text-center max-w-6xl px-4 py-20 md:px-8 md:py-32 top-[42%] transform -translate-y-1/2">
					<h1
						className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
						id="main-content"
					>
						<span className="reveal-text">
							<span style={{ animationDelay: "0.1s" }}>Ball Lightning</span>
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto reveal-text">
						<span style={{ animationDelay: "0.3s" }}>
							Innovative AI Solutions for Complex Problems
						</span>
					</p>
				</div>
			</div>
		</section>
	);
}
