import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Menu, Twitter } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/services", label: "Services" },
	{ href: "/portfolio", label: "Portfolio" },
	{ href: "/contact", label: "Contact" },
];

const socialLinks = [
	{
		href: "https://github.com/BallLightningAB",
		label: "GitHub",
		icon: Github,
	},
	{ href: "https://x.com/nicbrulay", label: "X", icon: Twitter },
	{
		href: "https://linkedin.com/in/nicolas-brulay-vip",
		label: "LinkedIn",
		icon: Linkedin,
	},
];

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
				{/* Logo */}
				<Link className="flex items-center gap-2" to="/">
					<img
						alt="Ball Lightning AB"
						className="h-12 w-12"
						height={48}
						src="/logo.png"
						width={48}
					/>
					<span className="font-heading font-semibold text-xl sm:text-3xl text-bl-cream">
						Ball Lightning
					</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden items-center gap-6 md:flex">
					{navLinks.map((link) => (
						<Link
							className={
								"font-medium text-muted-foreground text-base transition-colors hover:text-foreground"
							}
							key={link.href}
							to={link.href}
						>
							{link.label}
						</Link>
					))}
				</nav>

				{/* Actions */}
				<div className="flex items-center gap-3">
					{/* Social icons - desktop only */}
					<div className="hidden items-center gap-1 md:flex">
						{socialLinks.map((link) => (
							<a
								aria-label={link.label}
								className="rounded-md p-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
								href={link.href}
								key={link.href}
								rel="noopener noreferrer"
								target="_blank"
							>
								<link.icon className="h-4 w-4" />
							</a>
						))}
					</div>

					{/* Mobile Menu */}
					<Sheet onOpenChange={setMobileMenuOpen} open={mobileMenuOpen}>
						<SheetTrigger asChild className="md:hidden">
							<Button size="icon" variant="ghost">
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent className="w-[280px]" side="right">
							<SheetHeader>
								<SheetTitle className="text-left">Navigation Menu</SheetTitle>
								<SheetDescription className="sr-only">
									Main navigation links for mobile devices
								</SheetDescription>
							</SheetHeader>
							<nav className="mt-8 flex flex-col gap-4">
								{navLinks.map((link) => (
									<Link
										className={
											"font-medium text-foreground text-lg transition-colors hover:text-bl-red"
										}
										key={link.href}
										onClick={() => setMobileMenuOpen(false)}
										to={link.href}
									>
										{link.label}
									</Link>
								))}
							</nav>
							{/* Social icons in mobile menu */}
							<div className="mt-8 flex gap-4 border-border border-t pt-6">
								{socialLinks.map((link) => (
									<a
										aria-label={link.label}
										className="text-muted-foreground transition-colors hover:text-foreground"
										href={link.href}
										key={link.href}
										rel="noopener noreferrer"
										target="_blank"
									>
										<link.icon className="h-5 w-5" />
									</a>
								))}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
