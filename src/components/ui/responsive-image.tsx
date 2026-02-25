interface ResponsiveImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	loading?: "lazy" | "eager";
	fetchPriority?: "high" | "low" | "auto";
	decoding?: "async" | "sync" | "auto";
}

export function ResponsiveImage({
	src,
	alt,
	width = 600,
	height = 400,
	className,
	loading = "lazy",
	fetchPriority = "auto",
	decoding = "async",
}: ResponsiveImageProps) {
	// Extract file extension and base name
	const lastDotIndex = src.lastIndexOf(".");
	const baseName = src.substring(0, lastDotIndex);
	const extension = src.substring(lastDotIndex + 1);

	// Skip if already a WebP or AVIF, or if it's an external URL
	if (extension === "webp" || extension === "avif" || src.startsWith("http")) {
		return (
			<img
				alt={alt}
				className={className}
				decoding={decoding}
				fetchPriority={fetchPriority}
				height={height}
				loading={loading}
				src={src}
				width={width}
			/>
		);
	}

	// For JPG/PNG images, create picture element with WebP fallback
	// Note: WebP versions should be manually created and placed alongside originals
	const webpSrc = `${baseName}.webp`;

	return (
		<picture>
			<source srcSet={webpSrc} type="image/webp" />
			<img
				alt={alt}
				className={className}
				decoding={decoding}
				fetchPriority={fetchPriority}
				height={height}
				loading={loading}
				src={src}
				width={width}
			/>
		</picture>
	);
}
