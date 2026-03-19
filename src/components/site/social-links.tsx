import type { ComponentType } from "react";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";
import { XIcon } from "@/components/ui/x";
import { cn } from "@/lib/utils";

type SocialIconComponent = ComponentType<{
	className?: string;
	size?: number;
}>;

export interface SocialLinkItem {
	href: string;
	icon: SocialIconComponent;
	id: "github" | "linkedin" | "x";
	label: string;
}

export const headerSocialLinks: SocialLinkItem[] = [
	{
		href: "https://github.com/BallLightningAB",
		icon: GithubIcon,
		id: "github",
		label: "GitHub",
	},
	{
		href: "https://x.com/BallLightningAB",
		icon: XIcon,
		id: "x",
		label: "X",
	},
	{
		href: "https://www.linkedin.com/company/ball-lightning-ab",
		icon: LinkedinIcon,
		id: "linkedin",
		label: "LinkedIn",
	},
];

export const founderSocialLinks: SocialLinkItem[] = [
	{
		href: "https://linkedin.com/in/nicolas-brulay-vip",
		icon: LinkedinIcon,
		id: "linkedin",
		label: "LinkedIn",
	},
];

interface SocialLinksProps {
	className?: string;
	iconSize?: number;
	itemClassName?: string;
	links: SocialLinkItem[];
}

export function SocialLinks({
	className,
	iconSize = 16,
	itemClassName,
	links,
}: SocialLinksProps) {
	return (
		<div className={cn(className)}>
			{links.map((link) => (
				<a
					aria-label={link.label}
					className={cn(itemClassName)}
					href={link.href}
					key={link.href}
					rel="noopener noreferrer"
					target="_blank"
				>
					<span className="sr-only">{link.label}</span>
					<link.icon className="shrink-0" size={iconSize} />
				</a>
			))}
		</div>
	);
}
