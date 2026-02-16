"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import chapterBg from "@/src/assets/backgrounds/chapter-1-bg.webp";
import chapterBgJpg from "@/src/assets/backgrounds/chapter-1-bg.jpg";
import { ChapterLayout } from "@/app/components/ChapterLayout";

interface ChapterThreeProps {
	id?: string;
}

export function ChapterThree({ id = "chapter-3" }: ChapterThreeProps) {
	const sectionRef = React.useRef<HTMLDivElement>(null);
	const [isWebpFailed, setIsWebpFailed] = React.useState(false);

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

	const handleImageError = React.useCallback(() => {
		setIsWebpFailed(true);
	}, []);

	return (
		<section
			id={id}
			ref={sectionRef}
			className="relative min-h-screen w-full flex flex-col justify-center items-start snap-start"
		>
			{/* Background */}
			<div className="absolute inset-0 z-0">
				<img
					src={isWebpFailed ? chapterBgJpg.src : chapterBg.src}
					alt=""
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
							<CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12">
								Community Engagement and Online Branding
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-lg text-white/80 mb-12 scroll-animate">
								I co-created and managed a vibrant invite-only global investment
								community that connects over 40 members from diverse
								backgrounds. This community fosters daily engagement with
								hundreds of messages exchanged, focusing on 5-10 active
								opportunities at any given time. By leveraging the collective
								expertise of our members, we ensure informed decision-making and
								drive mutual growth. This thriving network has become a hub for
								innovation and collaboration, enabling participants to access
								insights and opportunities that would otherwise be out of reach
								for any single individual!
							</p>
							<p className="text-lg text-white/80 mb-12 scroll-animate">
								Additionally, I have served as a brand ambassador for several
								emerging AI companies, representing their innovative solutions
								and thought leadership in the industry. In this role, I have
								effectively communicated complex technologies to diverse
								audiences, enhancing brand visibility while driving engagement
								through strategic content creation.
							</p>
							<p className="text-lg text-white/80 mb-12 scroll-animate">
								Furthermore, I have managed multiple X accounts, ensuring
								consistent branding messaging across platforms while engaging
								with followers to strengthen online communities around these
								brands.
							</p>
						</CardContent>
					</Card>
				</div>
			</ChapterLayout>
		</section>
	);
}
