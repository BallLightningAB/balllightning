import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { headerSocialLinks, SocialLinks } from "@/components/site/social-links";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import * as m from "@/paraglide/messages.js";

function useNavLinks() {
	return [
		{ href: "/", label: m.nav_home() },
		{ href: "/services", label: m.nav_services() },
		{ href: "/technologies", label: m.nav_technologies() },
		{ href: "/portfolio", label: m.nav_portfolio() },
		{ href: "/contact", label: m.nav_contact() },
	];
}

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navLinks = useNavLinks();

	return (
		<header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
				{/* Logo */}
				<Link className="flex items-center gap-2" to="/">
					<picture>
						<img
							alt="Ball Lightning AB"
							className="h-12 w-12"
							decoding="async"
							height={48}
							src="/logo-120x120-transparent.webp"
							width={48}
						/>
					</picture>
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
					{/* Language switcher - mobile only (next to hamburger) */}
					<div className="md:hidden">
						<LanguageSwitcher />
					</div>

					{/* Language switcher - desktop only */}
					<div className="hidden md:block">
						<LanguageSwitcher />
					</div>

					{/* Social icons - desktop only */}
					<SocialLinks
						className="hidden items-center gap-1 md:flex"
						itemClassName="rounded-md p-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						links={headerSocialLinks}
					/>

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
							<nav className="px-4 mt-8 flex flex-col gap-4">
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
							<SocialLinks
								className="px-4 mt-8 flex gap-4 border-border border-t pt-8"
								itemClassName="text-muted-foreground transition-colors hover:text-foreground"
								links={headerSocialLinks}
							/>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
