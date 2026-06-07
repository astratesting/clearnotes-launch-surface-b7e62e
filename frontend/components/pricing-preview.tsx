"use client";

import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const plans = [
  {
    name: "Harbor",
    price: "Free",
    period: "during beta",
    description: "Perfect for trying out calm meetings",
    features: [
      "5 meetings per month",
      "Auto-join from calendar",
      "Email action items",
      "Basic transcription",
      "7-day storage",
    ],
    cta: "Start for Free",
    highlighted: false,
    badge: null,
  },
  {
    name: "Voyager",
    price: "$12",
    period: "/month",
    description: "For professionals who live in meetings",
    features: [
      "Unlimited meetings",
      "Auto-join from calendar",
      "Email action items",
      "Advanced AI summarization",
      "30-day storage",
      "Priority support",
      "Integrations (Slack, Notion)",
    ],
    cta: "Join Waitlist",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Fleet",
    price: "$49",
    period: "/month",
    description: "For teams that need clarity together",
    features: [
      "Everything in Voyager",
      "Team dashboard",
      "Shared action items",
      "Admin controls",
      "SAML SSO",
      "Custom retention",
      "Dedicated support",
    ],
    cta: "Contact Sales",
    highlighted: false,
    badge: null,
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="section-padding bg-soft-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Start free during beta. No credit card required. Upgrade when you&apos;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative p-8 border-0 shadow-sm ${
                plan.highlighted
                  ? "bg-gradient-calm ring-2 ring-sky-blue/50"
                  : "bg-white"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-blue text-white text-xs font-medium px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="font-display text-4xl font-semibold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-sky-blue hover:bg-sky-blue/90 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
                onClick={() => {
                  const waitlist = document.getElementById("waitlist");
                  waitlist?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {plan.cta}
                {plan.highlighted && <Zap className="ml-2 w-4 h-4" />}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            All plans include GDPR compliance, 256-bit encryption, and the calm design
            you love.{" "}
            <a href="/pricing" className="text-sky-blue hover:underline">
              See full comparison →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
