import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import {
	ContributionGraph,
	ContributionGraphBlock,
	ContributionGraphCalendar,
	ContributionGraphFooter,
	ContributionGraphLegend,
	ContributionGraphTotalCount,
} from "@/components/kibo-ui/contribution-graph";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type FeedItem, getBuilderCoilFeed } from "@/lib/builder-coil/feed";
import { getGitHubContributions } from "@/lib/github";
import * as m from "@/paraglide/messages.js";

export const Route = createFileRoute("/")({
	component: HomePage,
	loader: async () => {
		const [feed, github] = await Promise.all([
			getBuilderCoilFeed(),
			getGitHubContributions({ data: { username: "BallLightningAB" } }),
		]);

		return { feed, github };
	},
});

function HomePage() {
	const { feed, github } = Route.useLoaderData();

	// Filter to 4 months only on mobile (memoized for performance)
	const mobileGithub = useMemo(() => {
		if (!github) {
			return github;
		}

		const fourMonthsAgo = new Date();
		fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

		// Filter once, reuse result for both activities and count
		const filteredActivities = github.activities.filter(
			(day) => new Date(day.date) >= fourMonthsAgo
		);

		return {
			...github,
			activities: filteredActivities,
			totalCount: filteredActivities.reduce((sum, day) => sum + day.count, 0),
		};
	}, [github]);

	const newsItems =
		feed?.items.filter((i: FeedItem) => i.type === "news").slice(0, 1) ?? [];
	const blogItems =
		feed?.items.filter((i: FeedItem) => i.type === "blog").slice(0, 2) ?? [];
	const feedCards = [...newsItems, ...blogItems];

	return (
		<div className="flex flex-col">
			{/* Hero Section */}
			<section className="relative overflow-hidden py-20 md:py-32">
				<div className="container mx-auto max-w-6xl px-4">
					<AnimatedGroup
						className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
						variants={{
							container: {
								hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
								visible: {
									opacity: 1,
									y: 0,
									filter: "blur(0px)",
									transition: {
										duration: 0.7,
									},
								},
							},
						}}
					>
						{/* Left column: Content */}
						<motion.div
							animate={{ opacity: 1, x: 0 }}
							className="flex flex-col justify-center"
							initial={{ opacity: 0, x: -20 }}
							transition={{ duration: 0.7 }}
						>
							<TextEffect
								as="h1"
								className="mb-6 font-heading text-3xl min-[400px]:text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter"
								preset="fade-in-blur"
							>
								{m.home_hero_title_line1()}
								<br />
								<span className="bg-gradient-to-r from-[#DD3A28] to-[#FF7268] bg-clip-text text-transparent">
									{m.home_hero_title_line2()}
								</span>
							</TextEffect>

							<TextEffect
								className="mb-8 max-w-[40ch] text-muted-foreground pr-4"
								delay={0.3}
								preset="fade-in-blur"
							>
								{m.home_hero_subtitle()}
							</TextEffect>

							<AnimatedGroup
								className="flex flex-col gap-4 sm:flex-row md:gap-6"
								variants={{
									container: {
										hidden: { opacity: 0 },
										visible: {
											opacity: 1,
											transition: {
												staggerChildren: 0.1,
											},
										},
									},
									item: {
										hidden: { opacity: 0, y: 20 },
										visible: {
											opacity: 1,
											y: 0,
											transition: {
												type: "spring",
												bounce: 0.3,
											},
										},
									},
								}}
							>
								<Button asChild className="gap-2" size="lg">
									<Link to="/services">
										{m.home_hero_cta_services()}
										<ArrowRight className="h-4 w-4" />
									</Link>
								</Button>
								<Button asChild size="lg" variant="outline">
									<Link to="/portfolio">{m.home_hero_cta_portfolio()}</Link>
								</Button>
							</AnimatedGroup>
						</motion.div>

						{/* Right column: GitHub contribution graph */}
						<motion.div
							animate={{ opacity: 1, x: 0 }}
							className="mt-10 md:mt-0"
							initial={{ opacity: 0, x: 20 }}
							transition={{ duration: 0.7, delay: 0.2 }}
						>
							<div className="relative overflow-hidden rounded-3xl border border-bl-red/30 bg-gradient-to-br from-[#9C1B12]/10 via-card to-[#FF7268]/5 p-6 shadow-[0_20px_60px_rgba(221,58,40,0.15)] md:p-8">
								<div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_32px),repeating-linear-gradient(to_bottom,rgba(255,255,255,0.02)_0,rgba(255,255,255,0.02)_1px,transparent_1px,transparent_32px)]" />
								<div className="relative z-10">
									<div className="mb-4 text-sm font-medium uppercase tracking-wide text-bl-red">
										{m.home_activity_label()}
									</div>
									<div className="w-full">
										{github ? (
											<>
												{/* Mobile: 4 months */}
												<div className="block md:hidden">
													<ContributionGraph
														blockRadius={2}
														blockSize={10}
														data={mobileGithub.activities}
														totalCount={mobileGithub.totalCount}
													>
														<ContributionGraphCalendar>
															{(blockProps) => (
																<ContributionGraphBlock
																	{...blockProps}
																	className="stroke-[1px] stroke-border data-[level=0]:fill-muted data-[level=1]:fill-bl-red/20 data-[level=2]:fill-bl-red/40 data-[level=3]:fill-bl-red/60 data-[level=4]:fill-bl-red/80"
																/>
															)}
														</ContributionGraphCalendar>
														<ContributionGraphFooter className="mt-2 items-center">
															<ContributionGraphTotalCount
																className="text-muted-foreground text-xs"
																label="{{count}} activities/4 months"
															/>
															<ContributionGraphLegend className="text-muted-foreground text-xs" />
														</ContributionGraphFooter>
													</ContributionGraph>
												</div>

												{/* Desktop: 12 months */}
												<div className="hidden md:block">
													<ContributionGraph
														blockRadius={2}
														blockSize={10}
														data={github.activities}
														totalCount={github.totalCount}
													>
														<ContributionGraphCalendar>
															{(blockProps) => (
																<ContributionGraphBlock
																	{...blockProps}
																	className="stroke-[1px] stroke-border data-[level=0]:fill-muted data-[level=1]:fill-bl-red/20 data-[level=2]:fill-bl-red/40 data-[level=3]:fill-bl-red/60 data-[level=4]:fill-bl-red/80"
																/>
															)}
														</ContributionGraphCalendar>
														<ContributionGraphFooter className="mt-2 items-center">
															<ContributionGraphTotalCount
																className="text-muted-foreground text-xs"
																label="{{count}} activities/12 months"
															/>
															<ContributionGraphLegend className="text-muted-foreground text-xs" />
														</ContributionGraphFooter>
													</ContributionGraph>
												</div>
											</>
										) : (
											<div className="flex h-32 items-center justify-center">
												<div className="text-muted-foreground text-sm">
													{m.home_activity_loading()}
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</motion.div>
					</AnimatedGroup>
				</div>
			</section>
			{/* About the Founder */}
			<section className="py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<AnimatedGroup
						className="grid gap-12 md:grid-cols-2"
						variants={{
							container: {
								hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
								visible: {
									opacity: 1,
									y: 0,
									filter: "blur(0px)",
									transition: {
										duration: 0.7,
									},
								},
							},
						}}
					>
						<div>
							<picture>
								{/* Mobile-first: use 200x200 for mobile (8KB) */}
								<source
									media="(max-width: 767px)"
									sizes="100vw"
									srcSet="/media/face_200x200.webp"
								/>
								{/* Desktop: larger images */}
								<source
									media="(min-width: 768px)"
									sizes="50vw"
									srcSet="/media/face_400x400.webp 400w, /media/face_1024x1024.webp 1024w"
								/>
								<img
									alt="Nicolas Brulay"
									className="h-auto w-full rounded-2xl"
									decoding="async"
									fetchPriority="high"
									height={400}
									loading="eager"
									src="/media/face_400x400.webp"
									width={400}
								/>
							</picture>
						</div>
						<div>
							<h2 className="mb-4 font-semibold text-3xl">
								{m.home_founder_name()}
							</h2>
							<p className="mb-2 text-sm font-medium uppercase tracking-wide text-bl-red">
								{m.home_founder_role()}
							</p>
							<p className="mb-4 max-w-2xl text-muted-foreground">
								{m.home_founder_bio()}
							</p>
							<div className="flex gap-4">
								<Button asChild size="sm" variant="outline">
									<Link to="/contact">{m.home_founder_cta_contact()}</Link>
								</Button>
								<Button asChild size="sm" variant="ghost">
									<a
										href="https://thebuildercoil.com"
										rel="noopener noreferrer"
										target="_blank"
									>
										{m.home_founder_cta_tbc()}
										<ExternalLink className="ml-2 h-3 w-3" />
									</a>
								</Button>
							</div>
						</div>
					</AnimatedGroup>
				</div>
			</section>
			{/* Latest from The Builder Coil */}
			{feedCards.length > 0 && (
				<section className="border-border border-t bg-background py-16 md:py-24">
					<div className="container mx-auto max-w-6xl px-4">
						<AnimatedGroup
							className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
							variants={{
								container: {
									hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
									visible: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)",
										transition: {
											duration: 0.7,
										},
									},
								},
							}}
						>
							<div>
								<h2 className="mb-2 font-semibold text-3xl">
									{m.home_feed_title()}
								</h2>
								<p className="text-muted-foreground">
									{m.home_feed_subtitle()}
								</p>
							</div>
							<Button asChild variant="outline">
								<a
									href="https://thebuildercoil.com"
									rel="noopener noreferrer"
									target="_blank"
								>
									{m.home_feed_view_all()}
									<ExternalLink className="ml-2 h-4 w-4" />
								</a>
							</Button>
						</AnimatedGroup>

						<AnimatedGroup
							className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
							variants={{
								container: {
									hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
									visible: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)",
										transition: {
											duration: 0.7,
											delayChildren: 0.2,
											staggerChildren: 0.1,
										},
									},
								},
								item: {
									hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
									visible: {
										opacity: 1,
										y: 0,
										filter: "blur(0px)",
										transition: {
											type: "spring",
											bounce: 0.3,
											duration: 0.6,
										},
									},
								},
							}}
						>
							{feedCards.map((item) => (
								<Card
									className="group transition-all duration-200 hover:-translate-y-0.5 hover:border-bl-red/30"
									key={item.url}
								>
									<CardHeader>
										<div className="mb-2 flex items-center gap-2">
											<span
												className={`rounded-full px-2 py-1 text-xs font-medium ${
													item.type === "news"
														? "bg-bl-red/10 text-bl-red"
														: "bg-bl-rose/10 text-bl-rose"
												}`}
											>
												{item.type === "news"
													? m.home_feed_type_news()
													: m.home_feed_type_blog()}
											</span>
											<span className="text-muted-foreground text-xs">
												{new Date(item.publishedAt || "").toLocaleDateString(
													"en-US",
													{
														year: "numeric",
														month: "short",
														day: "numeric",
													}
												)}
											</span>
										</div>
										<CardTitle className="font-semibold text-lg leading-tight group-hover:text-bl-red">
											{item.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="mb-4 line-clamp-3 text-muted-foreground text-sm">
											{item.excerpt}
										</p>
										<Button asChild className="gap-2" size="sm" variant="ghost">
											<a
												href={item.url}
												rel="noopener noreferrer"
												target="_blank"
											>
												{m.home_feed_read({ title: item.title })}
												<ExternalLink className="h-3 w-3" />
											</a>
										</Button>
									</CardContent>
								</Card>
							))}
						</AnimatedGroup>
					</div>
				</section>
			)}
			{/* Newsletter CTA — link to TBC only */}
			<section className="border-border border-t bg-background py-16 md:py-24">
				<div className="container mx-auto max-w-6xl px-4">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="mb-4 font-semibold text-3xl">
							{m.home_newsletter_title()}
						</h2>
						<p className="mb-2 font-medium text-lg text-bl-red">
							{m.home_newsletter_subtitle()}
						</p>
						<p className="mb-8 text-muted-foreground">
							{m.home_newsletter_description()}
						</p>
						<Button asChild className="gap-2" size="lg">
							<a
								href="https://thebuildercoil.com/newsletter"
								rel="noopener noreferrer"
								target="_blank"
							>
								{m.home_newsletter_cta()}
								<ArrowRight className="h-4 w-4" />
							</a>
						</Button>
					</div>
				</div>
			</section>
			;
		</div>
	);
}
