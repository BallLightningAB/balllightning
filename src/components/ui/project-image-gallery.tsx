import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryImage {
	src: string;
	alt: string;
	width?: number;
	height?: number;
}

interface ProjectImageGalleryProps {
	images: GalleryImage[];
	columns?: 2 | 3;
	className?: string;
}

export function ProjectImageGallery({
	images,
	columns = 2,
	className,
}: ProjectImageGalleryProps) {
	const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

	return (
		<>
			<div
				className={cn(
					"grid gap-4",
					columns === 3 ? "md:grid-cols-3" : "md:grid-cols-2",
					className
				)}
			>
				{images.map((image) => (
					<motion.button
						className="group relative overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-bl-red"
						key={image.src}
						onClick={() => setSelectedImage(image)}
						transition={{ duration: 0.2 }}
						type="button"
						whileHover={{ scale: 1.02 }}
					>
						<img
							alt={image.alt}
							className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
							decoding="async"
							height={image.height ?? 400}
							loading="lazy"
							src={image.src}
							width={image.width ?? 600}
						/>
						<div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
					</motion.button>
				))}
			</div>

			<Dialog.Root
				onOpenChange={(open) => !open && setSelectedImage(null)}
				open={!!selectedImage}
			>
				<Dialog.Portal>
					<Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
					<Dialog.Content className="fixed inset-4 z-50 flex items-center justify-center focus:outline-none">
						<Dialog.Close className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-bl-red">
							<X className="h-5 w-5" />
							<span className="sr-only">Close</span>
						</Dialog.Close>
						{selectedImage && (
							<img
								alt={selectedImage.alt}
								className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
								height={selectedImage.height ?? 800}
								src={selectedImage.src}
								width={selectedImage.width ?? 1200}
							/>
						)}
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
