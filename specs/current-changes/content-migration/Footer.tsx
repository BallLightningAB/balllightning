"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
	const [isAtBottom, setIsAtBottom] = React.useState(false);

	React.useEffect(() => {
		const handleScroll = () => {
			// Add a 100px buffer to make the footer appear sooner
			const buffer = 200;
			setIsAtBottom(
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - buffer
			);
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!isAtBottom) return null;

	return (
		<footer className="w-full bg-black/90 text-white/80">
			{/* Top separator line */}
			<div className="w-full border-t border-white/20"></div>

			<div className="h-[50px] relative">
				{/* Mobile layout */}
				<div className="absolute left-1/5 top-2 w-[60%] md:hidden">
					<p className="text-xs">
						&copy; {new Date().getFullYear()} Ball Lightning AB. All rights
						reserved
					</p>
				</div>
				<div className="absolute left-5/16 bottom-2 w-[50%] md:hidden">
					<div className="flex space-x-2">
						<Link
							href="/legal/privacy-policy"
							className="text-xs hover:text-white transition-colors duration-300"
							aria-label="View Ball Lightning Privacy Policy"
						>
							Privacy Policy
						</Link>
						<Link
							href="/legal/terms-of-service"
							className="text-xs hover:text-white transition-colors duration-300"
							aria-label="View Ball Lightning Terms of Service"
						>
							Terms of Service
						</Link>
					</div>
				</div>

				{/* Desktop layout */}
				<div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2">
					<p className="text-xs">
						&copy; {new Date().getFullYear()} Ball Lightning AB. All rights
						reserved
					</p>
				</div>
				<div className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2">
					<div className="flex space-x-6 text-xs">
						<Link
							href="/legal/privacy-policy"
							className="hover:text-white transition-colors duration-300"
							aria-label="View Ball Lightning Privacy Policy"
						>
							Privacy Policy
						</Link>
						<Link
							href="/legal/terms-of-service"
							className="hover:text-white transition-colors duration-300"
							aria-label="View Ball Lightning Terms of Service"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
