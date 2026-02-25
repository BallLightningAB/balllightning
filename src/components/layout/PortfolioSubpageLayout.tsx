import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/ui/responsive-image";

interface ProjectLink {
	label: string;
	url: string;
	external?: boolean;
}

interface NextProject {
	title: string;
	slug: string;
}

interface PortfolioSubpageLayoutProps {
	title: string;
	subtitle: string;
	tags: string[];
	projectRole?: string;
	timeline?: string;
	techStack?: string[];
	links?: ProjectLink[];
	heroImage?: string;
	heroImageAlt?: string;
	heroGradient?: string;
	nextProject?: NextProject;
	children: ReactNode;
}

export function PortfolioSubpageLayout({
	title,
	subtitle,
	tags,
	projectRole,
	timeline,
	techStack,
	links,
	heroImage,
	heroImageAlt,
	heroGradient,
	nextProject,
	children,
}: PortfolioSubpageLayoutProps) {
	return (
		<div className="py-12 md:py-20">
			<AnimatedGroup
				className="container mx-auto max-w-5xl px-4"
				variants={{
					container: {
						hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
						visible: {
							opacity: 1,
							y: 0,
							filter: "blur(0px)",
							transition: { duration: 0.9, delayChildren: 0.1 },
						},
					},
					item: {
						hidden: { opacity: 0, y: 16 },
						visible: {
							opacity: 1,
							y: 0,
							transition: { duration: 0.7 },
						},
					},
				}}
			>
				{/* Back link */}
				<div className="mb-8">
					<Button asChild className="gap-2" size="sm" variant="ghost">
						<Link to="/portfolio">
							<ArrowLeft className="h-4 w-4" />
							Back to Portfolio
						</Link>
					</Button>
				</div>

				{/* Hero */}
				<div className="mb-12">
					{heroImage && (
						<div className="mb-8 overflow-hidden rounded-xl">
							<ResponsiveImage
								alt={heroImageAlt ?? title}
								className="h-auto w-full object-cover"
								fetchPriority="high"
								height={600}
								loading="eager"
								src={heroImage}
								width={1200}
							/>
						</div>
					)}
					{!heroImage && heroGradient && (
						<div
							className="mb-8 flex h-64 items-center justify-center rounded-xl md:h-80"
							style={{ background: heroGradient }}
						>
							{/* PLACEHOLDER: replace with real image */}
							<span className="text-2xl font-bold text-white/90 drop-shadow-lg md:text-4xl">
								{title}
							</span>
						</div>
					)}

					<div className="flex flex-wrap gap-2 mb-4">
						{tags.map((tag) => (
							<Badge
								className="bg-bl-red/10 text-bl-red border-transparent"
								key={tag}
							>
								{tag}
							</Badge>
						))}
					</div>

					<h1 className="mb-2 text-3xl font-bold md:text-5xl">{title}</h1>
					<p className="text-lg text-muted-foreground md:text-xl">{subtitle}</p>
				</div>

				{/* Two-column layout: content + sidebar */}
				<div className="grid gap-12 md:grid-cols-[1fr_280px]">
					{/* Main content */}
					<div className="space-y-12">{children}</div>

					{/* Sidebar */}
					<aside className="space-y-8">
						{projectRole && (
							<div>
								<h3 className="mb-1 text-sm font-medium uppercase tracking-wide text-bl-red">
									Role
								</h3>
								<p className="text-sm text-muted-foreground">{projectRole}</p>
							</div>
						)}

						{timeline && (
							<div>
								<h3 className="mb-1 text-sm font-medium uppercase tracking-wide text-bl-red">
									Timeline
								</h3>
								<p className="text-sm text-muted-foreground">{timeline}</p>
							</div>
						)}

						{techStack && techStack.length > 0 && (
							<div>
								<h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-bl-red">
									Tech Stack
								</h3>
								<div className="flex flex-wrap gap-1.5">
									{techStack.map((tech) => (
										<Badge
											className="bg-muted text-muted-foreground border-transparent text-xs"
											key={tech}
										>
											{tech}
										</Badge>
									))}
								</div>
							</div>
						)}

						{links && links.length > 0 && (
							<div>
								<h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-bl-red">
									Links
								</h3>
								<div className="flex flex-col gap-2">
									{links.map((link) =>
										link.external ? (
											<a
												className="inline-flex items-center gap-1.5 text-sm text-bl-red hover:underline"
												href={link.url}
												key={link.url}
												rel="noopener noreferrer"
												target="_blank"
											>
												{link.label}
												<ExternalLink className="h-3 w-3" />
											</a>
										) : (
											<Link
												className="inline-flex items-center gap-1.5 text-sm text-bl-red hover:underline"
												key={link.url}
												to={link.url}
											>
												{link.label}
											</Link>
										)
									)}
								</div>
							</div>
						)}
					</aside>
				</div>

				{/* Navigation footer */}
				<div className="mt-16 flex items-center justify-between border-t border-border pt-8">
					<Button asChild className="gap-2" variant="outline">
						<Link to="/portfolio">
							<ArrowLeft className="h-4 w-4" />
							All Projects
						</Link>
					</Button>
					{nextProject && (
						<Button asChild className="gap-2" variant="outline">
							<a href={`/portfolio/${nextProject.slug}`}>
								{nextProject.title}
								<ArrowRight className="h-4 w-4" />
							</a>
						</Button>
					)}
				</div>
			</AnimatedGroup>
		</div>
	);
}
