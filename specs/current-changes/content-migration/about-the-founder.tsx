"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import chapterBg from "@/src/assets/backgrounds/chapter-1-bg.webp";
import chapterBgJpg from "@/src/assets/backgrounds/chapter-1-bg.jpg";
import { ChapterLayout } from "@/app/components/ChapterLayout";

interface AboutTheFounderProps {
	id?: string;
}

export function AboutTheFounder({
	id = "about-the-founder",
}: AboutTheFounderProps) {
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
								About the Founder
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-lg text-white/80 mb-12 scroll-animate">
								I&#39;m a multidisciplinary technologist with over 15 years of
								experience bridging design, development, and systems
								integration. My journey in the tech industry has been marked by
								a passion for creating AI-powered, full-stack digital
								experiences that seamlessly integrate user-centric design with
								robust backend development.
							</p>
							<p className="text-lg text-white/80 mb-12 scroll-animate">
								As the founder of Ball Lightning AB, I have led cross-functional
								teams, architected data-centric applications, and integrated
								complex enterprise IT ecosystems. My role as co-founder and COO
								of a Web3 MMO has further honed my ability to translate business
								needs into innovative tech solutions, ensuring that every
								project, from rapid prototyping to scalable deployment, is
								executed with a blend of creativity, technical expertise, and
								strategic thinking.
							</p>
							<p className="text-lg text-white/80 mb-12 scroll-animate">
								My top skills include:
							</p>
							<ul className="text-lg text-white/80 mb-12 scroll-animate list-disc pl-8">
								<li>Translating business needs into tech solutions</li>
								<li>System development and integration</li>
								<li>AI-driven full-stack development</li>
								<li>Cross-functional leadership</li>
								<li>Multidisciplinary communication</li>
							</ul>
							<p className="text-lg text-white/80 mb-12 scroll-animate">
								I am committed to pushing the boundaries of what&#39;s possible
								in the tech and AI sectors, always striving to deliver solutions
								that are not only technically sound but also user-friendly and
								impactful.
							</p>
							<h3 className="text-2xl md:text-3xl font-semibold mb-4 scroll-animate">
								Let&#39;s Collaborate
							</h3>
							<p className="text-lg text-white/80 mb-12 scroll-animate">
								I&#39;m always excited to connect with like-minded individuals
								and organizations who share my passion for innovation and
								creativity. If you&#39;re looking to turn a complex challenge
								into a seamless, user-friendly solution, I&#39;d love to hear
								from you. Let&#39;s discuss how we can collaborate on your next
								project and bring your vision to life.
								<br />
								<br />
								<span className="font-medium italic">
									Nicolas Brulay - Founder of Ball Lightning
								</span>
							</p>
						</CardContent>
					</Card>
				</div>
			</ChapterLayout>
		</section>
	);
}
