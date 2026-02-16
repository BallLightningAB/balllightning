"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import chapterBg from "@/src/assets/backgrounds/chapter-1-bg.webp";
import chapterBgJpg from "@/src/assets/backgrounds/chapter-1-bg.jpg";
import { ChapterLayout } from "@/app/components/ChapterLayout";

interface ChapterFourProps {
	id?: string;
}

export function ChapterFour({ id = "chapter-4" }: ChapterFourProps) {
	const sectionRef = React.useRef<HTMLDivElement>(null);
	const [isWebpFailed, setIsWebpFailed] = React.useState(false);

	// Project data
	const researchFocus = [
		"Analyzing emerging AI trends and technologies",
		"Identifying opportunities for innovation",
		"Staying at the forefront of AI advancements",
	];

	const solutionDesignFocus = [
		"Creating intuitive user experiences",
		"Optimizing workflows for efficiency",
		"Integrating seamlessly with existing systems",
	];

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
					alt="Professional office environment with modern AI technology elements"
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
								Innovating with AI Clusters
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-6">
								{/* Research Section */}
								<div>
									<h3 className="text-2xl md:text-3xl font-semibold mb-4">
										Researching Novel AI Tech
									</h3>
									<p className="text-white/70 text-lg mb-6">
										Exploring cutting-edge AI technologies and identifying
										innovation opportunities
									</p>
									<div className="space-y-6">
										<div>
											<h3 className="text-xl font-medium mb-2">Key Focus</h3>
											<ul className="list-disc pl-5 space-y-2 text-white/80">
												{researchFocus.map((item, index) => (
													<li key={index}>{item}</li>
												))}
											</ul>
										</div>

										<div>
											<h3 className="text-xl font-medium mb-2">Approach</h3>
											<p className="text-white/80">
												At the intersection of imagination and innovation lies
												my passion for crafting digital experiences that not
												only meet but exceed client expectations. My latest work
												focuses on researching novel AI technologies, designing
												cutting-edge solutions, and developing practical
												applications that drive meaningful outcomes.
											</p>
										</div>
									</div>
								</div>

								{/* Solution Design Section */}
								<div className="mt-12">
									<h3 className="text-2xl md:text-3xl font-semibold mb-4">
										Designing Solutions
									</h3>
									<p className="text-white/70 text-lg mb-6">
										Creating intuitive user experiences that optimize workflows
										and deliver results
									</p>
									<div className="space-y-6">
										<div>
											<h3 className="text-xl font-medium mb-2">
												Design Principles
											</h3>
											<ul className="list-disc pl-5 space-y-2 text-white/80">
												{solutionDesignFocus.map((item, index) => (
													<li key={index}>{item}</li>
												))}
											</ul>
										</div>

										<div>
											<h3 className="text-xl font-medium mb-2">
												Current Focus
											</h3>
											<p className="text-white/80">
												I am focused on building solutions that combine multiple
												AI agents in clusters, handling complex workflows. By
												leveraging the strengths of various AI models working
												together, we can achieve unprecedented levels of
												performance and adaptability.
											</p>
										</div>

										<div>
											<h3 className="text-xl font-medium mb-2">
												Implementation
											</h3>
											<p className="text-white/80">
												From concept to execution, I develop practical
												applications that bring innovative ideas to life.
												Whether it&#39;s building custom software or integrating
												multiple AI agents into clusters, my focus is on
												delivering tangible results that drive business value.
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</ChapterLayout>
		</section>
	);
}
