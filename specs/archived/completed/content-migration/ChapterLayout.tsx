"use client";

import React from "react";

interface ChapterLayoutProps {
	children?: React.ReactNode;
	className?: string;
}

export function ChapterLayout({ children, className }: ChapterLayoutProps) {
	return (
		<div className={`relative w-full ${className}`}>
			<div className="relative w-full md:max-w-[66.666667%] pl-[16px] md:pl-[64px] pb-[16px] md:pb-[64px] -ml-[1rem]">
				{children}
			</div>
		</div>
	);
}
