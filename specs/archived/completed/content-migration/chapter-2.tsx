"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import chapterBg from "@/src/assets/backgrounds/chapter-1-bg.webp";
import chapterBgJpg from "@/src/assets/backgrounds/chapter-1-bg.jpg";
import { ChapterLayout } from "@/app/components/ChapterLayout";

interface ChapterTwoProps {
	id?: string;
}

export function ChapterTwo({ id = "chapter-2" }: ChapterTwoProps) {
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
								Portfolio Projects
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-12">
								{/* Project 1 */}
								<div className="scroll-animate">
									<h3 className="text-2xl md:text-3xl mb-4">
										Data-Driven Functional Systems Design
									</h3>
									<p className="text-lg text-white/80 mb-4">
										<strong>Objective:</strong> To develop a user-centric
										analytical framework for an investment team, translating
										complex datasets into actionable strategies aligned with
										user goals.
									</p>
									<h4 className="text-xl font-medium mb-2">Key Focus</h4>
									<ul className="list-disc pl-5 space-y-2 text-white/80 text-lg">
										<li>
											<strong>Clean UX Design:</strong> Simplified complex
											financial data into intuitive models and user profiles,
											ensuring accessibility for non-technical stakeholders.
										</li>
										<li>
											<strong>Collaborative Development:</strong> Partnered with
											a programmer to code the frontend and advanced backend
											logic, balancing functional rigor with seamless user
											interaction.
										</li>
										<li>
											<strong>Outcome-Driven Models:</strong> Built predictive
											algorithms and user preference profiles that optimized
											portfolio allocations.
										</li>
									</ul>
									<h4 className="text-xl font-medium mt-4 mb-2">
										Tools & Process
									</h4>
									<ul className="list-disc pl-5 space-y-2 text-white/80 text-lg">
										<li>
											Designed UX/UI prototypes to visualize risk-return
											tradeoffs and portfolio performance.
										</li>
										<li>
											Integrated real-time data streams to dynamically adjust
											recommendations based on user input.
										</li>
									</ul>
									<h4 className="text-xl font-medium mt-4 mb-2">Impact</h4>
									<p className="text-lg text-white/80 mb-4">
										The system streamlined decision-making for high-net-worth
										clients, reducing manual analysis time by 90% while
										improving portfolio diversification metrics.
									</p>
								</div>
								<hr className="my-8 border-white/10" />
								{/* Project 2 */}
								<div className="scroll-animate">
									<h3 className="text-2xl md:text-3xl mb-4">
										Big Data Optimization System
									</h3>
									<p className="text-lg text-white/80 mb-4">
										<strong>Objective:</strong> To optimize a multi-variable
										financial system by identifying optimal parameter values to
										maximize ROI per user and asset.
									</p>
									<h4 className="text-xl font-medium mb-2">
										Technical Execution
									</h4>
									<ul className="list-disc pl-5 space-y-2 text-white/80 text-lg">
										<li>
											<strong>Data Pipeline:</strong> Automated data extraction
											from legacy systems, cleaned datasets in Python, and
											deployed to Supabase for real-time querying.
										</li>
										<li>
											<strong>Formula Engineering:</strong> Developed a network
											of 10 interconnected mathematical formulas that:
											<ul className="list-disc pl-5 space-y-2 text-white/70 text-base">
												<li>
													Calculated $ value per item across 5+ variables (e.g.,
													volatility, liquidity, fees).
												</li>
												<li>
													Prioritized user-specific constraints (e.g., risk
													tolerance, cost efficiency).
												</li>
												<li>
													Dynamically adjusted weights in response to market
													shifts.
												</li>
											</ul>
										</li>
									</ul>
									<h4 className="text-xl font-medium mt-4 mb-2">
										Tools & Process
									</h4>
									<ul className="list-disc pl-5 space-y-2 text-white/80 text-lg">
										<li>
											Leveraged Python for statistical modeling and SQL for
											database management.
										</li>
									</ul>
									<h4 className="text-xl font-medium mt-4 mb-2">Outcome</h4>
									<p className="text-lg text-white/80 mb-4">
										The system provided a crystal clear picture of the value of
										each asset and the best allocation for each user.
									</p>
								</div>
								<hr className="my-8 border-white/10" />
								{/* Shared Themes */}
								<div className="scroll-animate">
									<h3 className="text-2xl md:text-3xl mb-4">
										Shared Themes Across Projects
									</h3>
									<ul className="list-disc pl-5 space-y-2 text-white/80 text-lg">
										<li>
											Bridging technical complexity with user-friendly design.
										</li>
										<li>
											Leveraging collaboration to merge UX strategy with backend
											execution.
										</li>
										<li>
											Turning abstract data into actionable, value-driven
											insights.
										</li>
									</ul>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</ChapterLayout>
		</section>
	);
}
