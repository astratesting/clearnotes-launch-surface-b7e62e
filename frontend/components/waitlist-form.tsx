"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/utils";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !gdprConsent) {
      setErrorMessage("Please provide your email and accept the privacy policy.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, gdprConsent }),
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }

      setStatus("success");
      trackEvent("waitlist_joined", { email_domain: email.split("@")[1] });
      setEmail("");
      setName("");
      setGdprConsent(false);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <section id="waitlist" className="section-padding bg-soft-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center bg-gradient-calm rounded-3xl p-12">
            <div className="w-16 h-16 bg-mint/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-mint"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              You&apos;re on the list!
            </h3>
            <p className="text-gray-600">
              We&apos;ll email you when your spot is ready. In the meantime, follow us on
              Twitter for updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="section-padding bg-soft-white">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Join the Waitlist
            </h2>
            <p className="text-lg text-gray-600">
              Be the first to experience calmer meetings. No spam, just product
              updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-blue/50 text-gray-900 placeholder-gray-400"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Work email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-sky-blue/50 text-gray-900 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <input
                id="gdpr"
                type="checkbox"
                checked={gdprConsent}
                onChange={(e) => setGdprConsent(e.target.checked)}
                required
                className="mt-1 w-4 h-4 rounded border-gray-300 text-sky-blue focus:ring-sky-blue"
              />
              <label htmlFor="gdpr" className="text-sm text-gray-600">
                I agree to receive product updates via email. You can unsubscribe
                anytime. See our{" "}
                <a href="/privacy" className="text-sky-blue hover:underline">
                  Privacy Policy
                </a>{" "}
                for details on how we protect your data.
              </label>
            </div>

            {status === "error" && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700 text-sm">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={status === "loading"}
              className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white text-lg py-6 h-auto"
            >
              {status === "loading" ? "Joining..." : "Join the Waitlist"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Free during beta. No credit card required.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
