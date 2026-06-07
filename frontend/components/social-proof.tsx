"use client";

import { Star, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager at Stripe",
    content:
      "ClearNotes changed how I run meetings. I'm actually present now instead of frantically typing notes. The action items email is gold.",
    avatar: "S",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Engineering Lead at Vercel",
    content:
      "Finally, a notetaker that doesn't interrupt the flow. It just joins, listens, and sends me exactly what I need afterward.",
    avatar: "M",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Design Director at Linear",
    content:
      "The calm design philosophy extends to everything they do. No noisy dashboards, no bloat. Just clear, actionable notes.",
    avatar: "E",
    rating: 5,
  },
];

const companyLogos = [
  { name: "Stripe", width: 80 },
  { name: "Vercel", width: 90 },
  { name: "Linear", width: 85 },
  { name: "Notion", width: 95 },
  { name: "Figma", width: 80 },
];

export function SocialProof() {
  return (
    <section className="section-padding bg-gradient-sand">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Trusted by Thoughtful Teams
          </h2>
          <p className="text-lg text-gray-600">
            Join 2,400+ professionals who've made their meetings calmer
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-20 opacity-60">
          {companyLogos.map((company) => (
            <div
              key={company.name}
              className="text-2xl font-display font-semibold text-gray-400"
              style={{ width: company.width }}
            >
              {company.name}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="p-8 border-0 shadow-sm bg-white/80 backdrop-blur"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-sky-blue/20 flex items-center justify-center">
                  <span className="text-sm font-medium text-sky-blue">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-mint ml-auto" />
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur rounded-full px-6 py-3 shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-blue to-mint border-2 border-white flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-white">
                    {String.fromCharCode(64 + i)}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              <strong className="text-gray-900">500+</strong> people joined this week
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
