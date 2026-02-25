"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useOfflineStatus } from "@/src/hooks/useOfflineStatus";
import { Button } from "@/components/ui/button";
import logo from "@/src/assets/icons/bl-logo.webp";

interface NavigationItem {
	label: string;
	href: string;
	shortLabel?: string;
	children?: NavigationItem[];
}

const navigationItems: NavigationItem[] = [
	{ label: "About the Founder", href: "/#about-the-founder" },
	{
		label: "Portfolio",
		href: "#",
		shortLabel: "Portfolio",
		children: [
			{ label: "Chapter 4 (2025)", href: "/#chapter-4", shortLabel: "4" },
			{ label: "Chapter 3 (2024)", href: "/#chapter-3", shortLabel: "3" },
			{ label: "Chapter 2 (2024)", href: "/#chapter-2", shortLabel: "2" },
			{ label: "Chapter 1 (2022-23)", href: "/#chapter-1", shortLabel: "1" },
		],
	},
];

export function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
	const [activeDropdown, setActiveDropdown] = React.useState<number | null>(
		null
	);
	const [deferredPrompt, setDeferredPrompt] = React.useState<unknown>(null);
	const [isClient, setIsClient] = React.useState(false);
	const offlineStatus = useOfflineStatus();
	const isOffline = isClient ? offlineStatus : false;

	React.useEffect(() => {
		setIsClient(true);
	}, []);

	React.useEffect(() => {
		if (!isClient) return;
		function handler(e: Event) {
			e.preventDefault();
			setDeferredPrompt(e);
		}
		window.addEventListener("beforeinstallprompt", handler);
		return () => window.removeEventListener("beforeinstallprompt", handler);
	}, [isClient]);

	// Close mobile menu on navigation
	function handleMobileNav() {
		setIsMobileMenuOpen(false);
	}

	async function handleInstallClick() {
		if (!deferredPrompt) return;
		const dp = deferredPrompt as {
			prompt: () => void;
			userChoice: Promise<unknown>;
		};
		dp.prompt();
		await dp.userChoice;
		setDeferredPrompt(null);
	}

	return (
		<header className="fixed top-0 left-0 w-full z-40 bg-black bg-opacity-50 h-[100px] flex items-center px-4">
			{/* Logo Container and Home Link */}
			<div className="flex items-center">
				<Link
					href="/#hero"
					className="flex-shrink-0 w-[96px] h-[96px] flex items-center justify-center relative focus:outline-none"
				>
					<span
						className="w-[96px] h-[96px] block"
						tabIndex={0}
						aria-label="Ball Lightning Home"
						aria-current="page"
						style={{
							WebkitMaskImage:
								"radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 80%)",
							maskImage:
								"radial-gradient(circle, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 80%)",
							borderRadius: "50%",
						}}
					>
						<Image
							src={logo}
							alt="Ball Lightning Logo"
							width={96}
							height={96}
							placeholder="blur"
							priority
							className="w-[96px] h-[96px] object-cover"
						/>
					</span>
				</Link>
				{/* Ball Lightning Text */}
				<span
					className="text-white/80 text-[2.5rem] font-medium ml-4 hidden md:block"
					role="heading"
					aria-level={2}
				>
					Ball Lightning
				</span>
			</div>
			{/* Desktop Navigation */}
			<nav className="hidden md:flex ml-[50px] gap-8 items-center whitespace-nowrap">
				{navigationItems.map((item, idx) => (
					<div key={item.href} className="relative">
						{item.children ? (
							<button
								type="button"
								className="hover:text-white transition-colors px-2 py-1 bg-transparent border-none outline-none cursor-pointer flex items-center"
								aria-haspopup="true"
								aria-expanded={activeDropdown === idx}
								onClick={() =>
									setActiveDropdown(activeDropdown === idx ? null : idx)
								}
								tabIndex={0}
								onBlur={(e) => {
									// Only close if focus moves outside the dropdown
									if (
										!e.currentTarget.parentElement?.contains(e.relatedTarget)
									) {
										setActiveDropdown(null);
									}
								}}
							>
								<span>{item.shortLabel || item.label}</span>
								<span className="ml-1">▼</span>
							</button>
						) : (
							<Link
								href={item.href}
								className="hover:text-white transition-colors px-2 py-1"
							>
								<span>{item.shortLabel || item.label}</span>
							</Link>
						)}
						{/* Dropdown */}
						{item.children && isClient && (
							<div
								className={`absolute left-0 mt-2 w-48 bg-[black] bg-opacity-70 shadow-lg rounded-lg py-2 transition-all z-50 ${activeDropdown === idx ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
								onMouseDown={(e) => e.preventDefault()} // Prevent losing focus on click
							>
								{item.children.map((child) => (
									<div key={child.href}>
										<Link
											href={child.href}
											className="block px-4 py-2 hover:bg-[#020A1B] bg-opacity-70"
										>
											{child.label}
										</Link>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</nav>
			{/* Mobile Navigation */}
			{isClient && (
				<>
					<button
						className="ml-auto md:hidden text-white focus:outline-none"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						aria-label="Open navigation menu"
						aria-expanded={isMobileMenuOpen}
					>
						<svg
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="feather feather-menu"
						>
							<line x1="3" y1="12" x2="21" y2="12" />
							<line x1="3" y1="6" x2="21" y2="6" />
							<line x1="3" y1="18" x2="21" y2="18" />
						</svg>
					</button>
					{/* Mobile menu drawer */}
					{isMobileMenuOpen && (
						<div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-start p-6 md:hidden">
							<button
								className="self-end mb-6 text-white"
								onClick={() => setIsMobileMenuOpen(false)}
								aria-label="Close navigation menu"
							>
								<svg
									width="32"
									height="32"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="feather feather-x"
								>
									<line x1="18" y1="6" x2="6" y2="18" />
									<line x1="6" y1="6" x2="18" y2="18" />
								</svg>
							</button>
							<nav className="flex flex-col gap-6 w-full">
								{/* About the Founder as first mobile-only item */}
								<Link
									href="/#about-the-founder"
									className="block text-white text-2xl py-2"
									onClick={handleMobileNav}
								>
									About the Founder
								</Link>
								{/* Rest of navigation */}
								{navigationItems
									.filter((item) => item.label !== "About the Founder")
									.map((item) => (
										<div key={item.href} className="w-full">
											<Link
												href={item.href}
												className="block text-white text-2xl py-2"
												onClick={handleMobileNav}
											>
												{item.label}
											</Link>
											{item.children && (
												<div className="flex flex-col ml-4">
													{item.children.map((child) => (
														<div key={child.href}>
															<Link
																href={child.href}
																className="block text-white/80 text-xl py-1"
																onClick={handleMobileNav}
															>
																{child.label}
															</Link>
														</div>
													))}
												</div>
											)}
										</div>
									))}
								{/* Connect link (mobile only, at bottom) */}
								<Link
									href="/#connect"
									className="block text-white text-2xl py-2 mt-6 md:hidden"
									onClick={handleMobileNav}
								>
									Connect
								</Link>
							</nav>
						</div>
					)}
				</>
			)}
			{/* Social and PWA Install */}
			<div className="ml-auto flex items-center gap-4">
				{/* Connect link (desktop only) */}
				<Link
					href="/#connect"
					className="hidden md:inline-block text-white text-base font-medium px-3 py-1 rounded transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
				>
					Connect
				</Link>
				<a
					href="https://www.facebook.com/BallLightningAB/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Facebook"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-[30px] h-[30px] text-white"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
					</svg>
				</a>
				<a
					href="https://www.linkedin.com/company/ball-lightning-ab/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label="LinkedIn"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-[30px] h-[30px] text-white"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
					</svg>
				</a>
				{/* PWA Install Button (client only) */}
				{isClient && deferredPrompt && (
					<Button
						onClick={handleInstallClick}
						className="ml-2 bg-black bg-opacity-50 hover:bg-[#020A1B] text-white border border-white/20 shadow-none transition-colors focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none"
					>
						Install App
					</Button>
				)}
				{/* Offline status indicator (client only) */}
				{isClient && isOffline && (
					<span className="ml-2 text-yellow-400 text-xs">Offline</span>
				)}
			</div>
		</header>
	);
}
