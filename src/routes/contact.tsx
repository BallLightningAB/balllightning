import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/lib/contact/server";
import * as m from "@/paraglide/messages.js";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

function ContactPage() {
	const [formState, setFormState] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState("loading");
		setErrorMessage("");

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			message: formData.get("message") as string,
		};

		try {
			await submitContactForm({ data });
			setFormState("success");
		} catch (err) {
			setFormState("error");
			setErrorMessage(
				err instanceof Error ? err.message : m.contact_form_error_default()
			);
		}
	};

	return (
		<div className="py-12 md:py-20">
			<AnimatedGroup
				className="container mx-auto max-w-4xl px-4"
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
				{/* Header */}
				<div className="mb-16 text-center">
					<h1 className="mb-4 font-bold text-4xl md:text-5xl">
						{m.contact_title()}
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						{m.contact_subtitle()}
					</p>
				</div>

				<div className="grid gap-12 md:grid-cols-2">
					{/* Contact Form */}
					<div>
						<h2 className="mb-6 font-semibold text-2xl">
							{m.contact_form_title()}
						</h2>

						{formState === "success" ? (
							<Card className="border-green-500/50 bg-green-500/10">
								<CardContent className="pt-6">
									<p className="text-center text-green-400">
										{m.contact_form_success()}
									</p>
								</CardContent>
							</Card>
						) : (
							<form className="space-y-6" onSubmit={handleSubmit}>
								<div className="space-y-2">
									<Label htmlFor="name">{m.contact_form_name_label()}</Label>
									<Input
										id="name"
										name="name"
										placeholder={m.contact_form_name_placeholder()}
										required
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="email">{m.contact_form_email_label()}</Label>
									<Input
										id="email"
										name="email"
										placeholder={m.contact_form_email_placeholder()}
										required
										type="email"
									/>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">
										{m.contact_form_message_label()}
									</Label>
									<Textarea
										id="message"
										name="message"
										placeholder={m.contact_form_message_placeholder()}
										required
										rows={5}
									/>
								</div>

								{formState === "error" && (
									<p className="text-destructive text-sm">{errorMessage}</p>
								)}

								<Button
									className="w-full"
									disabled={formState === "loading"}
									size="lg"
									type="submit"
								>
									{formState === "loading"
										? m.contact_form_sending()
										: m.contact_form_submit()}
								</Button>
							</form>
						)}
					</div>

					{/* Contact Info */}
					<div>
						<h2 className="mb-6 font-semibold text-2xl">
							{m.contact_info_title()}
						</h2>

						<div className="space-y-4">
							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="flex items-center gap-2 text-base">
										<Mail className="h-4 w-4 text-bl-red" />
										{m.contact_info_email()}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<a
										className="text-muted-foreground hover:text-bl-red"
										href="mailto:info@balllightning.cloud"
									>
										info@balllightning.cloud
									</a>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="flex items-center gap-2 text-base">
										<MapPin className="h-4 w-4 text-bl-rose" />
										{m.contact_info_location()}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										{m.contact_info_location_value()}
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="pb-2">
									<CardTitle className="flex items-center gap-2 text-base">
										<ExternalLink className="h-4 w-4 text-bl-ember" />
										{m.contact_info_links()}
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-2">
									<a
										className="block text-muted-foreground hover:text-bl-red"
										href="https://thebuildercoil.com"
										rel="noopener noreferrer"
										target="_blank"
									>
										The Builder Coil ↗
									</a>
									<a
										className="block text-muted-foreground hover:text-bl-red"
										href="https://chronomation.com"
										rel="noopener noreferrer"
										target="_blank"
									>
										Chronomation ↗
									</a>
									<a
										className="block text-muted-foreground hover:text-bl-red"
										href="https://github.com/BallLightningAB"
										rel="noopener noreferrer"
										target="_blank"
									>
										GitHub ↗
									</a>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</AnimatedGroup>
		</div>
	);
}
