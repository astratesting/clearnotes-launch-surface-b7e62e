"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

const faqs = [
  {
    question: "How does ClearNotes join my meetings?",
    answer:
      "ClearNotes connects to your calendar (Google Calendar or Outlook). When a meeting starts, our AI assistant automatically joins using the meeting link. No invites to send, no bots to manage.",
  },
  {
    question: "Is it compatible with Zoom, Teams, and Google Meet?",
    answer:
      "Yes! ClearNotes works with all major video conferencing platforms: Zoom, Google Meet, Microsoft Teams, Webex, and any platform that generates a meeting link.",
  },
  {
    question: "What happens to my meeting data?",
    answer:
      "Your meetings are processed with enterprise-grade encryption. We only process what's needed to generate your action items, then the raw audio is deleted after 30 days (or 7 days on the free plan). You can request deletion anytime.",
  },
  {
    question: "Do other participants know ClearNotes is there?",
    answer:
      "Yes, ClearNotes appears as a participant in the call (like 'ClearNotes Notetaker'). We believe in transparency - everyone in the meeting knows the call is being transcribed.",
  },
  {
    question: "How accurate is the transcription?",
    answer:
      "Our AI-powered transcription achieves 95%+ accuracy for clear audio. It handles multiple speakers, technical jargon, and accents well. The action items are extracted using advanced language models.",
  },
  {
    question: "Can I try it for free?",
    answer:
      "Absolutely! During our beta period, you can use ClearNotes completely free for up to 5 meetings per month. No credit card required. Join the waitlist to get access.",
  },
  {
    question: "How do I cancel?",
    answer:
      "You can cancel anytime from your account settings. There are no long-term contracts or cancellation fees. If you cancel, you'll retain access until the end of your billing period.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-gradient-sand">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about ClearNotes. Can&apos;t find what you&apos;re
            looking for?{" "}
            <a href="mailto:hello@clearnotes.ai" className="text-sky-blue hover:underline">
              Email us
            </a>
            .
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm bg-white/80 backdrop-blur overflow-hidden"
            >
              <button
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-8 pb-6"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur rounded-2xl px-6 py-4 shadow-sm">
            <MessageCircle className="w-5 h-5 text-sky-blue" />
            <span className="text-gray-700">
              Still have questions?{" "}
              <a
                href="mailto:hello@clearnotes.ai"
                className="text-sky-blue font-medium hover:underline"
              >
                hello@clearnotes.ai
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
