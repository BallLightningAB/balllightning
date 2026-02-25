"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChapterLayout } from "../components/ChapterLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import contactBg from "@/src/assets/backgrounds/chapter-1-bg.webp";
import contactBgJpg from "@/src/assets/backgrounds/chapter-1-bg.jpg";
import { useOfflineStatus } from "@/src/hooks/useOfflineStatus";
import { addOfflineSubmission } from "@/src/lib/db";

interface ConnectProps {
	id?: string;
}

interface FormState {
	name: string;
	email: string;
	message: string;
	sendCopy: boolean;
	hp: string;
	startedAt: number;
	requestId: string;
}

// Helper function to detect Brave browser
const isBrave = () => {
	const userAgent = navigator.userAgent.toLowerCase();
	return userAgent.includes("brave");
};

export function Connect({ id = "connect" }: ConnectProps) {
	const sectionRef = React.useRef<HTMLElement>(null);
	const [isWebpFailed, setIsWebpFailed] = React.useState(false);
	const generateRequestId = React.useCallback(() => {
		try {
			// Prefer web crypto if available
			if (
				typeof crypto !== "undefined" &&
				typeof crypto.randomUUID === "function"
			) {
				return crypto.randomUUID();
			}
		} catch {}
		// Fallback
		return `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
	}, []);
	const [formState, setFormState] = React.useState<FormState>({
		name: "",
		email: "",
		message: "",
		sendCopy: false,
		hp: "",
		startedAt: Date.now(),
		requestId:
			typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
				? crypto.randomUUID()
				: `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`,
	});
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const [isQueued, setIsQueued] = React.useState(false);
	const [isMounted, setIsMounted] = React.useState(false);

	const isOffline = useOfflineStatus();

	// Set mounted state after initial render
	React.useEffect(() => {
		setIsMounted(true);
		setFormState((prev) => ({ ...prev, startedAt: Date.now() }));
	}, []);

	// Animation for elements when they come into view
	React.useEffect(() => {
		if (!sectionRef.current) return;
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const animatedElements =
							entry.target.querySelectorAll(".scroll-animate");
						animatedElements.forEach((el, index) => {
							setTimeout(() => {
								el.classList.add("animate");
							}, index * 150);
						});
					}
				});
			},
			{ threshold: 0.1 }
		);
		observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	// Handle image error
	const handleImageError = React.useCallback(() => {
		setIsWebpFailed(true);
	}, []);

	// Parallax scrolling effect with fading transition
	React.useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			const section = sectionRef.current;
			if (section) {
				const sectionTop = section.offsetTop;
				const sectionHeight = section.clientHeight;
				const opacity =
					1 -
					Math.max(
						0,
						Math.min(1, (scrollPosition - sectionTop) / sectionHeight)
					);
				section.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);
		setIsSubmitted(false);
		setIsQueued(false);

		if (isOffline) {
			try {
				await addOfflineSubmission(formState);
				// Attempt to register sync task
				if ("serviceWorker" in navigator && "SyncManager" in window) {
					const registration = await navigator.serviceWorker.ready;
					try {
						// Wait for the service worker to be active
						await new Promise<void>((resolve) => {
							if (registration.active) {
								resolve();
							} else {
								registration.addEventListener("statechange", (event) => {
									if (event.target?.state === "activated") {
										resolve();
									}
								});
							}
						});

						// Send a message to the service worker to register sync
						registration.active?.postMessage({ type: "REGISTER_SYNC" });
						console.log(
							"[Connect] Requested sync task registration via message."
						);

						// If we're in Brave, show a different success message
						if (isBrave()) {
							setError(
								"The contact form is unavailable when offline in Brave browser. Please wait until you are back online to submit your message."
							);
						} else {
							setIsQueued(true);
							setFormState({
								name: "",
								email: "",
								message: "",
								sendCopy: false,
								hp: "",
								startedAt: Date.now(),
								requestId: generateRequestId(),
							});
							// Show success message for offline submission
							setIsSubmitted(true);
							setError(null);
						}
					} catch (syncErr) {
						console.error("[Connect] Sync registration failed:", syncErr);
						// Don't show error if sync fails - data is still saved
						if (isBrave()) {
							setError(
								"The contact form is unavailable when offline in Brave browser. Please wait until you are back online to submit your message."
							);
						} else {
							setIsQueued(true);
							setFormState({
								name: "",
								email: "",
								message: "",
								sendCopy: false,
								hp: "",
								startedAt: Date.now(),
								requestId: generateRequestId(),
							});
							setIsSubmitted(true);
							setError(null);
						}
					}
				} else {
					console.warn(
						"[Connect] Background Sync not supported by this browser."
					);
					// Data is saved, just show success message
					setIsQueued(true);
					setFormState({
						name: "",
						email: "",
						message: "",
						sendCopy: false,
						hp: "",
						startedAt: Date.now(),
						requestId: generateRequestId(),
					});
					setIsSubmitted(true);
					setError(null);
				}
			} catch (dbError) {
				console.error("[Connect] Failed to save message offline:", dbError);
				setError("Could not save message offline. Please try again.");
			} finally {
				setIsSubmitting(false);
			}
			return;
		}

		try {
			const response = await fetch("/api/send-email", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formState),
			});

			const data = await response.json();

			if (!response.ok) {
				if (data.error === "Invalid origin") {
					throw new Error(
						`Invalid request origin: ${data.details?.origin}. ` +
							`Allowed origins: ${data.details?.allowed?.join(", ")}. ` +
							`Please try accessing the site without the 'www' prefix.`
					);
				}
				throw new Error(data.error || data.message || "Failed to send message");
			}

			setIsSubmitted(true);
			setFormState({
				name: "",
				email: "",
				message: "",
				sendCopy: false,
				hp: "",
				startedAt: Date.now(),
				requestId: generateRequestId(),
			});
		} catch (error) {
			console.error("Form submission error:", error);
			const errorMessage =
				error instanceof Error ? error.message : "An unknown error occurred";

			if (errorMessage.includes("authentication failed")) {
				setError(
					"Failed to send email. Please check the email configuration and try again."
				);
			} else {
				setError(errorMessage);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, type, checked } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	return (
		<section
			id={id}
			ref={sectionRef}
			className="relative w-full flex flex-col justify-center items-start snap-start"
			role="main"
		>
			{/* Background */}
			<div className="absolute inset-0 z-0">
				<img
					src={isWebpFailed ? contactBgJpg.src : contactBg.src}
					alt="Professional office space with modern decor and Ball Lightning branding"
					className="absolute inset-0 w-full h-full object-cover"
					onError={handleImageError}
				/>
				<div className="absolute inset-0 bg-black/50" />
			</div>
			{/* Content */}
			<ChapterLayout>
				<div className="relative z-10 chapter-content">
					<Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white overflow-hidden max-w-[1440px] mx-auto xl:max-w-[1440px]">
						<CardHeader>
							<h1
								id="connect-title"
								className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8"
							>
								Connect
							</h1>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-0">
								{/* Contact Info */}
								<div
									className="scroll-animate"
									role="region"
									aria-labelledby="contact-info-title"
								>
									<Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white overflow-hidden">
										<CardHeader>
											<h2
												id="contact-info-title"
												className="text-2xl font-medium mb-6"
											>
												Get In Touch
											</h2>
										</CardHeader>
										<CardContent>
											<p className="text-white/80 mb-8">
												Reach out to Nicolas directly to discuss how Ball
												Lightning can help bring your vision to life..
											</p>
											<div className="space-y-4">
												<div className="flex items-center space-x-3">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 text-accent"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
														<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
													</svg>
													<span>info@BallLightning.cloud</span>
												</div>
												<div className="flex items-center space-x-3">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 text-accent"
														viewBox="0 0 20 20"
														fill="currentColor"
														aria-hidden="true"
													>
														<path
															fillRule="evenodd"
															d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
															clipRule="evenodd"
														/>
													</svg>
													<span>Gothenburg, Sweden</span>
												</div>
											</div>
											{/* Social Links */}
											<div className="mt-8">
												<h3
													id="social-links-title"
													className="text-xl font-medium mb-4"
												>
													Follow Ball Lightning
												</h3>
												<div className="flex space-x-4">
													{/* Facebook */}
													<a
														href="https://www.facebook.com/balllightningab"
														target="_blank"
														rel="noopener noreferrer"
														className="text-white hover:text-[#1877F2] transition-colors"
														aria-label="Follow Ball Lightning on Facebook"
														role="link"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-6 w-6"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
														</svg>
													</a>
													{/* LinkedIn */}
													<a
														href="https://www.linkedin.com/company/ball-lightning-ab"
														target="_blank"
														rel="noopener noreferrer"
														className="text-white hover:text-[#0077B5] transition-colors"
														aria-label="Follow Ball Lightning on LinkedIn"
														role="link"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															className="h-6 w-6"
															fill="currentColor"
															viewBox="0 0 24 24"
														>
															<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
														</svg>
													</a>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
								{/* Contact Form */}
								<div
									className="scroll-animate"
									role="region"
									aria-labelledby="contact-form-title"
								>
									<Card className="bg-black/30 backdrop-blur-sm border-white/10 text-white overflow-hidden">
										<CardHeader>
											<h2
												id="contact-form-title"
												className="text-2xl font-medium mb-6"
											>
												Send me a Message
											</h2>
										</CardHeader>
										<CardContent>
											{isSubmitted ? (
												<div className="text-center">
													<div className="text-green-500 text-2xl mb-4">✓</div>
													<p className="text-white/80">
														Thank you for your message! We&#39;ll get back to
														you soon.
													</p>
												</div>
											) : (
												<form
													onSubmit={handleSubmit}
													className="space-y-4"
													aria-label="Contact form"
												>
													<div aria-hidden="true" className="sr-only">
														<label htmlFor="company">Company</label>
														<input
															type="text"
															id="company"
															name="hp"
															value={formState.hp}
															onChange={handleChange}
															autoComplete="off"
															tabIndex={-1}
														/>
													</div>
													<input
														type="hidden"
														name="startedAt"
														value={formState.startedAt.toString()}
													/>
													<div>
														<label
															htmlFor="name"
															className="block text-white/80 mb-2"
															aria-required="true"
														>
															Name
														</label>
														<input
															type="text"
															id="name"
															name="name"
															value={formState.name}
															onChange={handleChange}
															required
															className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-md focus:outline-none focus:border-white/50 text-white"
															aria-invalid={error ? "true" : "false"}
															autoComplete="name"
														/>
													</div>
													<div>
														<label
															htmlFor="email"
															className="block text-white/80 mb-2"
															aria-required="true"
														>
															Email
														</label>
														<input
															type="email"
															id="email"
															name="email"
															value={formState.email}
															onChange={handleChange}
															required
															className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-md focus:outline-none focus:border-white/50 text-white"
															aria-invalid={error ? "true" : "false"}
															autoComplete="email"
														/>
													</div>
													<div>
														<label
															htmlFor="message"
															className="block text-white/80 mb-2"
															aria-required="true"
														>
															Message
														</label>
														<textarea
															id="message"
															name="message"
															value={formState.message}
															onChange={handleChange}
															required
															rows={4}
															className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-md focus:outline-none focus:border-white/50 text-white resize-none"
															aria-invalid={error ? "true" : "false"}
														/>
													</div>
													<div className="flex items-center mb-4">
														<input
															type="checkbox"
															id="sendCopy"
															name="sendCopy"
															checked={formState.sendCopy}
															onChange={handleChange}
															className="mr-2"
															aria-checked={
																formState.sendCopy ? "true" : "false"
															}
														/>
														<label htmlFor="sendCopy" className="text-white/80">
															Send me a copy
														</label>
													</div>
													{isMounted && (
														<>
															{isSubmitted && (
																<p className="mt-4 text-green-400">
																	Message sent successfully!
																</p>
															)}
															{isQueued && (
																<p className="mt-4 text-yellow-400">
																	You are offline. Message queued and will be
																	sent when connection returns.
																</p>
															)}
															{error && (
																<p className="mt-4 text-red-500">
																	Error: {error}
																</p>
															)}
														</>
													)}
													<Button
														type="submit"
														disabled={isSubmitting}
														className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3"
														aria-label="Send your message to Ball Lightning"
													>
														{isSubmitting ? "Sending..." : "Send Message"}
													</Button>
												</form>
											)}
										</CardContent>
									</Card>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</ChapterLayout>
		</section>
	);
}
