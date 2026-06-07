"use client";

import { useState, FormEvent } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/utils";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gdprConsent, setGdprConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

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

      if (!response.ok) throw new Error("Failed to join");

      setStatus("success");
      trackEvent("waitlist_joined_modal", { email_domain: email.split("@")[1] });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-mint/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-mint" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              You&apos;re on the list!
            </h3>
            <p className="text-gray-600 mb-6">
              We&apos;ll email you when your spot is ready.
            </p>
            <button
              onClick={onClose}
              className="text-sky-blue hover:underline text-sm font-medium"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-semibold text-gray-900 mb-2">
                Join the Waitlist
              </h2>
              <p className="text-gray-600">
                Be the first to experience calmer meetings.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-blue/50"
              />

              <input
                type="email"
                placeholder="Work email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-blue/50"
              />

              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="modal-gdpr"
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 rounded border-gray-300 text-sky-blue focus:ring-sky-blue"
                />
                <label
                  htmlFor="modal-gdpr"
                  className="text-xs text-gray-600"
                >
                  I agree to receive product updates. You can unsubscribe anytime.
                  See our Privacy Policy.
                </label>
              </div>

              {status === "error" && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-sky-blue hover:bg-sky-blue/90 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Join the Waitlist"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
